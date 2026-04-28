#!/usr/bin/env python3
"""
Compare each sequence's .md source with the corresponding rendered HTML
content embedded in js/data/seq*.js. Reports which paragraphs/sentences
of the .md are missing (or only loosely paraphrased) in the JS.

Usage: python3 tools/compare_md_js.py [seq_id]
"""
import os, re, sys, json
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD_DIR = os.path.join(ROOT, 'sequences')
JS_DIR = os.path.join(ROOT, 'js', 'data')

MD_FILES = {
    1: 'sequence_1_conscience_connaissance_de_soi.md',
    2: 'sequence_2_verite_raison_science.md',
    3: 'sequence_3_langage_pensee.md',
    4: 'sequence_4_definir_art.md',
    5: 'sequence_5_etat_justice.md',
    6: 'sequence_6_devoir_bonheur.md',
}
JS_FILES = {
    1: ['seq1.js', 'seq1b.js'],
    2: ['seq2.js', 'seq2b.js'],
    3: ['seq3.js', 'seq3b.js'],
    4: ['seq4.js'],
    5: ['seq5.js'],
    6: ['seq6.js'],
}

# ---------------- MD normalization ----------------

def md_to_segments(md):
    """Strip MD markdown markers and return a list of normalized text segments."""
    # Drop the YAML-ish encadré headers (perspectives/notions/repere/plan) — they're metadata
    md = re.sub(r'<encadré>.*?</encadré>', '', md, flags=re.S)
    # Drop image_alt / schema brackets — purely descriptive
    md = re.sub(r'\[image_alt\s*:[^\]]+\]', '', md)
    md = re.sub(r'\[Schéma[^\]]*\]', '', md)
    # Replace document_imprimé tags by paragraph breaks
    md = re.sub(r'</?document_imprimé>', '\n\n', md)
    # Drop ruler lines, headings markers but keep the heading text
    md = re.sub(r'^---+\s*$', '', md, flags=re.M)
    md = re.sub(r'^#+\s*', '', md, flags=re.M)
    # Drop annotation manuscrite brackets but keep the inner text
    md = re.sub(r'\[annotation[s]? manuscrite[s]?[^"]*"([^"]+)"\]', r'\1', md)
    md = re.sub(r'\[annotation[s]? manuscrite[s]? en marge[^\]]*\]', '', md)
    md = re.sub(r'\[passage en (rouge|vert)\s*:\s*\]', '', md)
    # Strip MD bold/italic/code markers
    md = re.sub(r'\*\*([^*]+)\*\*', r'\1', md)
    md = re.sub(r'\*([^*]+)\*', r'\1', md)
    md = re.sub(r'`([^`]+)`', r'\1', md)
    md = re.sub(r'==([^=]+)==', r'\1', md)
    # Strip headings markers and blockquote chevrons
    md = re.sub(r'^>\s?', '', md, flags=re.M)
    return _segment_text(md)

# ---------------- JS content extraction ----------------

class _Stripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
    def handle_data(self, data):
        self.parts.append(data)

def js_to_segments(js):
    """Extract the `content` template literal(s) from a seq*.js file and strip HTML tags."""
    pieces = []
    # Match `content: \`...\``, `content = \`...\``, `content += \`...\``
    for m in re.finditer(r'content\s*(?::|\+?=)\s*`([^`]*)`', js, flags=re.S):
        pieces.append(m.group(1))
    if not pieces:
        return []
    text = '\n\n'.join(pieces)
    s = _Stripper()
    s.feed(text)
    plain = ''.join(s.parts)
    return _segment_text(plain)

# ---------------- common normalization ----------------

def _segment_text(t):
    # Decode HTML entities lightly
    t = t.replace('&nbsp;', ' ').replace('&amp;', '&')
    # Split into "paragraphs" by blank lines, then strip
    paras = [p.strip() for p in re.split(r'\n\s*\n', t)]
    paras = [re.sub(r'\s+', ' ', p) for p in paras]
    paras = [p for p in paras if len(p) >= 25]  # skip short bits
    return paras

def _norm_for_match(s):
    s = s.lower()
    s = re.sub(r"[‘’“”«»'\"]", ' ', s)
    s = re.sub(r"[^a-zàâäéèêëîïôöùûüç0-9]+", ' ', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def covered(md_para, js_norm_blob, threshold=0.7):
    """Return True if a long enough chunk of md_para appears verbatim in the JS blob."""
    norm = _norm_for_match(md_para)
    if len(norm) < 30:
        return True
    # Try a 60-char shingle: if any 60-char window of the md paragraph is found in the
    # JS blob, consider it covered. This catches verbatim copy.
    window = 60
    if len(norm) <= window:
        return norm in js_norm_blob
    # Try a few windows across the paragraph
    samples = max(3, len(norm) // 200)
    step = max(1, (len(norm) - window) // samples)
    hits = 0
    tries = 0
    for i in range(0, len(norm) - window + 1, step):
        tries += 1
        if norm[i:i+window] in js_norm_blob:
            hits += 1
    return tries > 0 and (hits / tries) >= threshold

# ---------------- main ----------------

def compare_seq(seq_id):
    md_path = os.path.join(MD_DIR, MD_FILES[seq_id])
    with open(md_path, encoding='utf-8') as f:
        md = f.read()
    js_blob_parts = []
    for name in JS_FILES[seq_id]:
        with open(os.path.join(JS_DIR, name), encoding='utf-8') as f:
            js_blob_parts.append(f.read())
    js_text = '\n\n'.join(js_blob_parts)

    md_paras = md_to_segments(md)
    js_paras = js_to_segments(js_text)
    js_norm_blob = ' '.join(_norm_for_match(p) for p in js_paras)

    missing = []
    for p in md_paras:
        if not covered(p, js_norm_blob):
            missing.append(p)
    return md_paras, js_paras, missing

def main():
    ids = [int(sys.argv[1])] if len(sys.argv) > 1 else list(MD_FILES.keys())
    for sid in ids:
        md_paras, js_paras, missing = compare_seq(sid)
        total = len(md_paras)
        miss = len(missing)
        cov = (total - miss) / total * 100 if total else 100
        print(f"\n===== Séquence {sid} =====")
        print(f"  paragraphes .md : {total}")
        print(f"  paragraphes .js : {len(js_paras)}")
        print(f"  couverture verbatim : {cov:.1f}%  ({total - miss}/{total})")
        print(f"  manquants : {miss}")
        if miss:
            print("  --- Premiers paragraphes non trouvés ---")
            for p in missing[:8]:
                snippet = p[:160] + ('…' if len(p) > 160 else '')
                print(f"  • {snippet}")

if __name__ == '__main__':
    main()
