#!/usr/bin/env node
/**
 * Génère, pour chaque ressource du site (séquences, philosophes, notions,
 * glossaire, quiz, frise), une copie pré-rendue en .md brut + .html
 * minimaliste sous raw/, plus llms.txt / sitemap.xml / robots.txt à la
 * racine du site. Objectif : tout LLM, crawler ou visiteur sans JS doit
 * pouvoir lire le contenu intégral via de simples requêtes HTTP.
 *
 * Sources de vérité :
 *   - sequences/sequence_*.md       (markdown original par séquence)
 *   - js/data/*.js                  (philosophes, notions, glossaire, quiz)
 *
 * Tout ce qui est produit sous raw/, llms.txt, sitemap.xml, robots.txt est
 * 100 % généré et peut être supprimé sans perte d'information.
 */

const fs = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'js', 'data');
const SEQ_DIR  = path.join(ROOT, 'sequences');
const RAW      = path.join(ROOT, 'raw');

const SITE_BASE = 'https://arthurjeaugey.com/revisions-philo';
const SITE_NAME = 'Cogito';
const SITE_DESC = 'Cogito — Révisions Bac de philosophie : 6 séquences, fiches, philosophes, notions, glossaire, frise, quiz et flashcards.';

// --- Charge les data files comme le fait scripts/build-pdfs.js ---
global.window = global;
[
  'philosophers.js', 'notions.js', 'glossary.js', 'quiz.js',
  'seq1.js', 'seq1b.js',
  'seq2.js', 'seq2b.js',
  'seq3.js', 'seq3b.js',
  'seq4.js',
  'seq5.js',
  'seq6.js',
  'sequences.js',
].forEach(f => require(path.join(DATA_DIR, f)));

const SEQUENCES   = window.SEQUENCES;
const PHILOSOPHERS = window.PHILOSOPHERS;
const NOTIONS     = window.NOTIONS;
const GLOSSARY    = window.GLOSSARY;
const QUIZZES     = window.QUIZZES;

// --- Fichiers markdown originaux des séquences ---------------------------
// Mapping id → fichier source (présent dans /sequences).
const SEQ_MD_FILES = {
  1: 'sequence_1_conscience_connaissance_de_soi.md',
  2: 'sequence_2_verite_raison_science.md',
  3: 'sequence_3_langage_pensee.md',
  4: 'sequence_4_definir_art.md',
  5: 'sequence_5_etat_justice.md',
  6: 'sequence_6_devoir_bonheur.md',
};

// --- helpers --------------------------------------------------------------
const log = (...a) => console.log('[build-raw]', ...a);

let totalBytes = 0;
function writeOut(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  totalBytes += Buffer.byteLength(content);
}

function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Strip HTML tags for cleaner markdown output (fallback when source is HTML).
function stripTags(s) {
  return String(s == null ? '' : s)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// raw filename for a sequence : "sequence-{id}-{firstSlugSegment}.md"
function seqSlug(s) {
  const first = (s.slug || '').split('-')[0] || String(s.id);
  return `sequence-${s.id}-${first}`;
}

function mtimeIso(file) {
  try { return fs.statSync(file).mtime.toISOString(); }
  catch { return new Date().toISOString(); }
}

// --- markdown builders ----------------------------------------------------

function sequenceMarkdown(s) {
  const srcFile = path.join(SEQ_DIR, SEQ_MD_FILES[s.id] || '');
  let body = '';
  if (fs.existsSync(srcFile)) body = fs.readFileSync(srcFile, 'utf8');

  // En-tête synthétique reprenant les données structurées du JS.
  const head = [];
  head.push(`# Séquence ${s.number} — ${s.title}`);
  head.push('');
  head.push(`> ${s.short}`);
  head.push('');
  if (s.perspectives && s.perspectives.length)
    head.push(`**Perspectives.** ${s.perspectives.join(', ')}.`);
  if (s.notions && s.notions.length)
    head.push(`**Notions.** ${s.notions.join(', ')}.`);
  if (s.reperes && s.reperes.length)
    head.push(`**Repères.** ${s.reperes.join(' · ')}.`);
  if (s.work) head.push(`**Œuvre suivie.** ${s.work}.`);
  head.push('');

  if (s.essentiel) {
    head.push('## En clair');
    head.push('');
    head.push(stripTags(s.essentiel.question));
    head.push('');
    head.push(`**Pourquoi ça compte.** ${stripTags(s.essentiel.enjeu)}`);
    head.push('');
    head.push(`**Le débat.** ${stripTags(s.essentiel.tension)}`);
    head.push('');
    if (s.essentiel.pieges && s.essentiel.pieges.length) {
      head.push('**À ne pas confondre :**');
      s.essentiel.pieges.forEach(p => head.push(`- ${stripTags(p)}`));
      head.push('');
    }
    head.push(`**À retenir.** ${stripTags(s.essentiel.retenir)}`);
    head.push('');
  }

  if (s.plan && s.plan.length) {
    head.push('## Plan détaillé');
    head.push('');
    s.plan.forEach((p, i) => {
      head.push(`${i + 1}. **${p.t}**`);
      (p.sub || []).forEach(x => head.push(`   - ${x}`));
    });
    head.push('');
  }

  // Sépare la partie générée et le markdown source pour éviter les doublons
  // visuels (le source recommence souvent par "# Séquence n° X").
  if (body) {
    head.push('---');
    head.push('');
    head.push(body.trim());
  }
  return head.join('\n') + '\n';
}

function philosopherMarkdown(p) {
  const lines = [];
  lines.push(`# ${p.name}`);
  lines.push('');
  lines.push(`> ${p.dates}${p.country ? ' · ' + p.country : ''}`);
  lines.push('');
  if (p.thesis) { lines.push(`**Thèse.** ${stripTags(p.thesis)}`); lines.push(''); }
  if (p.keyIdeas && p.keyIdeas.length) {
    lines.push('## Idées clés');
    lines.push('');
    p.keyIdeas.forEach(k => lines.push(`- ${stripTags(k)}`));
    lines.push('');
  }
  if (p.tags && p.tags.length) {
    lines.push(`**Tags.** ${p.tags.join(', ')}.`);
    lines.push('');
  }
  if (p.sequences && p.sequences.length) {
    lines.push('## Apparaît dans');
    lines.push('');
    p.sequences.forEach(id => {
      const s = SEQUENCES.find(x => x.id === id);
      if (s) lines.push(`- Séquence ${s.number} — ${s.title}`);
    });
    lines.push('');
  }
  return lines.join('\n');
}

function notionMarkdown(n) {
  const lines = [];
  lines.push(`# ${n.name}`);
  lines.push('');
  if (n.short) { lines.push(`> ${stripTags(n.short)}`); lines.push(''); }
  if (n.long)  { lines.push(stripTags(n.long)); lines.push(''); }
  if (n.keyAuthors && n.keyAuthors.length) {
    lines.push('## Philosophes clés');
    lines.push('');
    n.keyAuthors.forEach(id => {
      const p = PHILOSOPHERS.find(x => x.id === id);
      if (p) lines.push(`- ${p.name}${p.dates ? ' (' + p.dates + ')' : ''}`);
    });
    lines.push('');
  }
  if (n.sequences && n.sequences.length) {
    lines.push('## Séquences associées');
    lines.push('');
    n.sequences.forEach(id => {
      const s = SEQUENCES.find(x => x.id === id);
      if (s) lines.push(`- Séquence ${s.number} — ${s.title}`);
    });
    lines.push('');
  }
  return lines.join('\n');
}

function glossaryMarkdown() {
  const lines = [];
  lines.push('# Glossaire');
  lines.push('');
  lines.push(`> Toutes les définitions clés du programme de philosophie (${GLOSSARY.length} entrées).`);
  lines.push('');
  const sorted = GLOSSARY.slice().sort((a, b) => a.term.localeCompare(b.term, 'fr'));
  for (const g of sorted) {
    lines.push(`## ${g.term}`);
    if (g.etym) lines.push(`*${g.etym}*`);
    lines.push('');
    lines.push(stripTags(g.def));
    lines.push('');
  }
  return lines.join('\n');
}

function quizMarkdown(q) {
  const lines = [];
  lines.push(`# Quiz — ${q.title}`);
  lines.push('');
  if (q.description) { lines.push(`> ${q.description}`); lines.push(''); }
  q.questions.forEach((it, i) => {
    lines.push(`### Question ${i + 1}`);
    lines.push('');
    lines.push(stripTags(it.q));
    lines.push('');
    it.o.forEach((opt, j) => {
      const mark = j === it.c ? '**[✓]**' : '[ ]';
      lines.push(`- ${mark} ${stripTags(opt)}`);
    });
    lines.push('');
    if (it.e) { lines.push(`*Explication.* ${stripTags(it.e)}`); lines.push(''); }
  });
  return lines.join('\n');
}

// --- HTML shell -----------------------------------------------------------

const PAGE_CSS = `
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
    line-height: 1.65; color: #1a1a1f; background: #fafafa;
    padding: 24px 16px 80px;
  }
  .wrap { max-width: 760px; margin: 0 auto; }
  .banner {
    background: #eef3ff; border: 1px solid #c8d6ff; color: #1f3a8a;
    padding: 12px 16px; border-radius: 10px; font-size: 14px; margin-bottom: 28px;
  }
  .banner a { color: #1d4ed8; font-weight: 600; }
  h1, h2, h3, h4 { line-height: 1.25; margin: 1.6em 0 0.6em; font-weight: 700; }
  h1 { font-size: 2rem; margin-top: 0; border-bottom: 1px solid #e2e2e6; padding-bottom: 12px; }
  h2 { font-size: 1.5rem; } h3 { font-size: 1.2rem; }
  p, ul, ol, blockquote, table { margin: 0.8em 0; }
  ul, ol { padding-left: 1.5em; }
  blockquote { border-left: 4px solid #c8d6ff; padding: 4px 16px; color: #555; background: #f5f7ff; }
  table { border-collapse: collapse; width: 100%; font-size: 0.95em; display: block; overflow-x: auto; }
  th, td { border: 1px solid #d8d8de; padding: 8px 12px; text-align: left; vertical-align: top; }
  th { background: #f0f0f3; }
  hr { border: none; border-top: 1px solid #d8d8de; margin: 2em 0; }
  a { color: #1d4ed8; }
  pre { background: #1a1a1f; color: #f5f5f5; padding: 14px 16px; border-radius: 8px; overflow-x: auto; }
  code { background: #f0f0f3; padding: 1px 5px; border-radius: 4px; font-size: 0.92em; }
  footer.foot { margin-top: 60px; padding-top: 24px; border-top: 1px solid #d8d8de;
                font-size: 13px; color: #555; }
  @media (prefers-color-scheme: dark) {
    body { background: #15151a; color: #eaeaea; }
    h1 { border-color: #2a2a32; } code { background: #25252c; }
    blockquote { background: #1d1f29; color: #bbb; border-color: #3b4f99; }
    th { background: #25252c; } td, th { border-color: #2a2a32; }
    .banner { background: #1d1f29; color: #b8caff; border-color: #2a3a6a; }
    footer.foot, hr { border-color: #2a2a32; }
  }
`;

function htmlShell({ title, description, canonical, body, jsonLd, banner }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(description)}">
<link rel="canonical" href="${escHtml(canonical)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(description)}">
<meta property="og:url" content="${escHtml(canonical)}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escHtml(title)}">
<meta name="twitter:description" content="${escHtml(description)}">
<style>${PAGE_CSS}</style>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body>
<div class="wrap">
${banner || ''}
${body}
<footer class="foot">
  Source : <a href="${escHtml(canonical)}">${escHtml(canonical)}</a> ·
  Version interactive : <a href="${SITE_BASE}/">${SITE_BASE}/</a>
</footer>
</div>
</body>
</html>
`;
}

function bannerFor(spaUrl) {
  return `<div class="banner">📘 Version brute (lisible sans JavaScript, optimisée IA &amp; partage). Pour la fiche interactive : <a href="${escHtml(spaUrl)}">${escHtml(spaUrl)}</a>.</div>`;
}

// Conversion markdown → HTML très minimaliste (sans dépendance externe).
// Suffisant pour exposer un rendu lisible aux crawlers ; le .md reste la
// source canonique pour les LLM.
function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = md.split('\n');
  const out = [];
  let inUl = false, inOl = false, inBq = false, inP = false;
  const closeP = () => { if (inP) { out.push('</p>'); inP = false; } };
  const closeUl = () => { if (inUl) { out.push('</ul>'); inUl = false; } };
  const closeOl = () => { if (inOl) { out.push('</ol>'); inOl = false; } };
  const closeBq = () => { if (inBq) { out.push('</blockquote>'); inBq = false; } };
  const closeAll = () => { closeP(); closeUl(); closeOl(); closeBq(); };

  const inline = (s) => {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return s;
  };

  for (const raw of lines) {
    const l = raw.replace(/\s+$/, '');
    if (!l.trim()) { closeAll(); continue; }
    let m;
    if ((m = l.match(/^(#{1,6})\s+(.*)$/))) {
      closeAll();
      const lvl = m[1].length;
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`);
      continue;
    }
    if (l.match(/^---+$/)) { closeAll(); out.push('<hr>'); continue; }
    if ((m = l.match(/^>\s?(.*)$/))) {
      closeP(); closeUl(); closeOl();
      if (!inBq) { out.push('<blockquote>'); inBq = true; }
      out.push(`<p>${inline(m[1])}</p>`);
      continue;
    } else { closeBq(); }
    if ((m = l.match(/^(\s*)[-*]\s+(.*)$/))) {
      closeP(); closeOl();
      if (!inUl) { out.push('<ul>'); inUl = true; }
      out.push(`<li>${inline(m[2])}</li>`);
      continue;
    }
    if ((m = l.match(/^(\s*)\d+\.\s+(.*)$/))) {
      closeP(); closeUl();
      if (!inOl) { out.push('<ol>'); inOl = true; }
      out.push(`<li>${inline(m[2])}</li>`);
      continue;
    }
    closeUl(); closeOl();
    if (!inP) { out.push('<p>'); inP = true; out.push(inline(l)); }
    else out.push(' ' + inline(l));
  }
  closeAll();
  return out.join('\n');
}

// --- emit -----------------------------------------------------------------

function emitAsset({ md, outMd, outHtml, title, description, spaUrl, canonical, schemaKind }) {
  writeOut(outMd, md);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaKind || 'Article',
    headline: title,
    description,
    inLanguage: 'fr',
    url: canonical,
    mainEntityOfPage: canonical,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_BASE}/` },
    author: { '@type': 'Person', name: 'Arthur Jeaugey' },
  };
  const html = htmlShell({
    title, description, canonical,
    body: `<article>${mdToHtml(md)}</article>`,
    jsonLd, banner: bannerFor(spaUrl),
  });
  writeOut(outHtml, html);
  log(`wrote ${path.relative(ROOT, outHtml)}`);
}

function timelineMarkdown() {
  const lines = [];
  lines.push('# Frise des philosophes');
  lines.push('');
  lines.push('> Tous les auteurs étudiés, dans l\'ordre chronologique.');
  lines.push('');
  // tri par première année trouvée dans `dates`
  const parsed = PHILOSOPHERS.map(p => {
    const m = (p.dates || '').match(/-?\d{1,4}/);
    const y = m ? parseInt(m[0], 10) * (/av\.?\s*J/i.test(p.dates) ? -1 : 1) : 9999;
    return { p, y };
  }).sort((a, b) => a.y - b.y);
  for (const { p } of parsed) {
    lines.push(`- **${p.name}** — ${p.dates}${p.country ? ' · ' + p.country : ''}` +
               (p.thesis ? ` — ${stripTags(p.thesis)}` : ''));
  }
  lines.push('');
  return lines.join('\n');
}

// --- main -----------------------------------------------------------------

function emitRawIndex() {
  const seqRows = SEQUENCES.map(s => {
    const slug = seqSlug(s);
    return `<tr>
      <td><strong>SEQ.${String(s.id).padStart(2,'0')}</strong></td>
      <td><a href="${slug}.html">${escHtml(s.title)}</a><br><small>${escHtml(s.short)}</small></td>
      <td><a href="${slug}.md">.md</a> · <a href="${slug}.html">.html</a></td>
    </tr>`;
  }).join('\n');

  const philoRows = PHILOSOPHERS.map(p => `<tr>
      <td><a href="philosophes/${p.id}.html">${escHtml(p.name)}</a></td>
      <td>${escHtml(p.dates || '')}</td>
      <td><a href="philosophes/${p.id}.md">.md</a> · <a href="philosophes/${p.id}.html">.html</a></td>
    </tr>`).join('\n');

  const notionRows = NOTIONS.map(n => `<tr>
      <td><a href="notions/${n.id}.html">${escHtml(n.name)}</a></td>
      <td>${escHtml(n.short || '')}</td>
      <td><a href="notions/${n.id}.md">.md</a> · <a href="notions/${n.id}.html">.html</a></td>
    </tr>`).join('\n');

  const quizRows = QUIZZES.map(q => `<tr>
      <td>Quiz ${q.id}</td>
      <td><a href="quiz/${q.id}.html">${escHtml(q.title)}</a></td>
      <td><a href="quiz/${q.id}.md">.md</a> · <a href="quiz/${q.id}.html">.html</a></td>
    </tr>`).join('\n');

  const body = `
    <h1>${SITE_NAME} — version brute</h1>
    <p>${escHtml(SITE_DESC)}</p>
    <p>Ces pages sont des copies pré-rendues, lisibles sans JavaScript. Idéal pour
       les LLM, crawlers et lecteurs d'écran. La version interactive complète se
       trouve sur <a href="${SITE_BASE}/">${SITE_BASE}/</a>.</p>

    <h2>Séquences</h2>
    <table><thead><tr><th>#</th><th>Titre</th><th>Versions</th></tr></thead>
      <tbody>${seqRows}</tbody></table>

    <h2>Philosophes</h2>
    <table><thead><tr><th>Nom</th><th>Dates</th><th>Versions</th></tr></thead>
      <tbody>${philoRows}</tbody></table>

    <h2>Notions</h2>
    <table><thead><tr><th>Nom</th><th>Court</th><th>Versions</th></tr></thead>
      <tbody>${notionRows}</tbody></table>

    <h2>Glossaire & Frise</h2>
    <ul>
      <li><a href="glossaire.html">Glossaire complet</a> — <a href="glossaire.md">.md</a></li>
      <li><a href="timeline.html">Frise chronologique</a> — <a href="timeline.md">.md</a></li>
    </ul>

    <h2>Quiz</h2>
    <table><thead><tr><th>#</th><th>Titre</th><th>Versions</th></tr></thead>
      <tbody>${quizRows}</tbody></table>

    <h2>Pour les LLM</h2>
    <p>Voir <a href="${SITE_BASE}/llms.txt">/llms.txt</a> pour l'index machine-lisible.</p>
  `;

  const html = htmlShell({
    title: `${SITE_NAME} — index brut`,
    description: SITE_DESC,
    canonical: `${SITE_BASE}/raw/`,
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${SITE_NAME} — index brut`,
      description: SITE_DESC,
      url: `${SITE_BASE}/raw/`,
      inLanguage: 'fr',
    },
  });
  writeOut(path.join(RAW, 'index.html'), html);
  log('wrote raw/index.html');
}

function emitLlmsTxt() {
  const L = [];
  L.push(`# ${SITE_NAME} — Révisions Bac de philosophie`);
  L.push('');
  L.push(`> ${SITE_DESC}`);
  L.push('');
  L.push(`Site interactif : ${SITE_BASE}/`);
  L.push(`Index des ressources brutes : ${SITE_BASE}/raw/`);
  L.push('');

  L.push('## Séquences');
  L.push('');
  for (const s of SEQUENCES) {
    L.push(`- [Séquence ${s.number} — ${s.title}](${SITE_BASE}/raw/${seqSlug(s)}.md)`);
  }
  L.push('');

  L.push('## Philosophes');
  L.push('');
  for (const p of PHILOSOPHERS) {
    L.push(`- [${p.name}${p.dates ? ' — ' + p.dates : ''}](${SITE_BASE}/raw/philosophes/${p.id}.md)`);
  }
  L.push('');

  L.push('## Notions');
  L.push('');
  for (const n of NOTIONS) {
    L.push(`- [${n.name}](${SITE_BASE}/raw/notions/${n.id}.md)`);
  }
  L.push('');

  L.push('## Glossaire & Frise');
  L.push('');
  L.push(`- [Glossaire complet](${SITE_BASE}/raw/glossaire.md)`);
  L.push(`- [Frise chronologique](${SITE_BASE}/raw/timeline.md)`);
  L.push('');

  L.push('## Quiz');
  L.push('');
  for (const q of QUIZZES) {
    L.push(`- [Quiz ${q.id} — ${q.title}](${SITE_BASE}/raw/quiz/${q.id}.md)`);
  }
  L.push('');

  L.push('## Données structurées (JSON)');
  L.push('');
  L.push(`- [philosophers.json](${SITE_BASE}/raw/philosophers.json)`);
  L.push(`- [notions.json](${SITE_BASE}/raw/notions.json)`);
  L.push(`- [glossary.json](${SITE_BASE}/raw/glossary.json)`);
  L.push(`- [quiz.json](${SITE_BASE}/raw/quiz.json)`);
  L.push(`- [sequences.json](${SITE_BASE}/raw/sequences.json) (méta des séquences, sans le HTML détaillé)`);
  L.push('');

  writeOut(path.join(ROOT, 'llms.txt'), L.join('\n'));
  log('wrote llms.txt');
}

function emitSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  urls.push({ loc: `${SITE_BASE}/`,        lastmod: today });
  urls.push({ loc: `${SITE_BASE}/raw/`,    lastmod: today });
  urls.push({ loc: `${SITE_BASE}/llms.txt`,lastmod: today });

  for (const s of SEQUENCES) {
    const src = path.join(SEQ_DIR, SEQ_MD_FILES[s.id] || '');
    const lm = fs.existsSync(src) ? mtimeIso(src).slice(0,10) : today;
    urls.push({ loc: `${SITE_BASE}/raw/${seqSlug(s)}.html`, lastmod: lm });
  }
  for (const p of PHILOSOPHERS)
    urls.push({ loc: `${SITE_BASE}/raw/philosophes/${p.id}.html`, lastmod: today });
  for (const n of NOTIONS)
    urls.push({ loc: `${SITE_BASE}/raw/notions/${n.id}.html`, lastmod: today });
  urls.push({ loc: `${SITE_BASE}/raw/glossaire.html`, lastmod: today });
  urls.push({ loc: `${SITE_BASE}/raw/timeline.html`,  lastmod: today });
  for (const q of QUIZZES)
    urls.push({ loc: `${SITE_BASE}/raw/quiz/${q.id}.html`, lastmod: today });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`;
  writeOut(path.join(ROOT, 'sitemap.xml'), xml);
  log(`wrote sitemap.xml (${urls.length} URLs)`);
}

function emitRobots() {
  const txt =
`User-agent: *
Allow: /

Sitemap: ${SITE_BASE}/sitemap.xml

# Index machine-lisible (llmstxt.org)
# ${SITE_BASE}/llms.txt
`;
  writeOut(path.join(ROOT, 'robots.txt'), txt);
  log('wrote robots.txt');
}

function emitJsonData() {
  // Sérialisation propre des données : utile pour les LLM qui veulent
  // attaquer les données structurées sans parser du JS.
  // Pour les séquences on retire `content` (HTML lourd, déjà servi en MD).
  const seqLite = SEQUENCES.map(s => {
    const { content, ...rest } = s;
    return rest;
  });
  writeOut(path.join(RAW, 'sequences.json'),  JSON.stringify(seqLite, null, 2));
  writeOut(path.join(RAW, 'philosophers.json'), JSON.stringify(PHILOSOPHERS, null, 2));
  writeOut(path.join(RAW, 'notions.json'),     JSON.stringify(NOTIONS, null, 2));
  writeOut(path.join(RAW, 'glossary.json'),    JSON.stringify(GLOSSARY, null, 2));
  writeOut(path.join(RAW, 'quiz.json'),        JSON.stringify(QUIZZES, null, 2));
  log('wrote raw/*.json');
}

function main() {
  fs.mkdirSync(RAW, { recursive: true });

  // 1) Séquences
  for (const s of SEQUENCES) {
    const slug = seqSlug(s);
    emitAsset({
      md: sequenceMarkdown(s),
      outMd:  path.join(RAW, `${slug}.md`),
      outHtml:path.join(RAW, `${slug}.html`),
      title:  `Séquence ${s.number} — ${s.title} · ${SITE_NAME}`,
      description: `Fiche de révision Bac philosophie : ${s.title}. ${s.short}`,
      spaUrl: `${SITE_BASE}/#/sequence/${s.id}`,
      canonical: `${SITE_BASE}/raw/${slug}.html`,
      schemaKind: 'Article',
    });
  }

  // 2) Philosophes
  for (const p of PHILOSOPHERS) {
    emitAsset({
      md: philosopherMarkdown(p),
      outMd:  path.join(RAW, 'philosophes', `${p.id}.md`),
      outHtml:path.join(RAW, 'philosophes', `${p.id}.html`),
      title:  `${p.name} · ${SITE_NAME}`,
      description: `${p.name}${p.dates ? ' (' + p.dates + ')' : ''} : thèse, idées clés, séquences associées.`,
      spaUrl: `${SITE_BASE}/#/philosophes/${p.id}`,
      canonical: `${SITE_BASE}/raw/philosophes/${p.id}.html`,
      schemaKind: 'Person',
    });
  }

  // 3) Notions
  for (const n of NOTIONS) {
    emitAsset({
      md: notionMarkdown(n),
      outMd:  path.join(RAW, 'notions', `${n.id}.md`),
      outHtml:path.join(RAW, 'notions', `${n.id}.html`),
      title:  `${n.name} · ${SITE_NAME}`,
      description: `Notion philosophique : ${n.name}. ${stripTags(n.short || '')}`,
      spaUrl: `${SITE_BASE}/#/notions/${n.id}`,
      canonical: `${SITE_BASE}/raw/notions/${n.id}.html`,
      schemaKind: 'DefinedTerm',
    });
  }

  // 4) Glossaire
  emitAsset({
    md: glossaryMarkdown(),
    outMd:  path.join(RAW, 'glossaire.md'),
    outHtml:path.join(RAW, 'glossaire.html'),
    title:  `Glossaire · ${SITE_NAME}`,
    description: `Glossaire complet du programme de philosophie : toutes les définitions clés.`,
    spaUrl: `${SITE_BASE}/#/glossaire`,
    canonical: `${SITE_BASE}/raw/glossaire.html`,
    schemaKind: 'DefinedTermSet',
  });

  // 5) Frise
  emitAsset({
    md: timelineMarkdown(),
    outMd:  path.join(RAW, 'timeline.md'),
    outHtml:path.join(RAW, 'timeline.html'),
    title:  `Frise des philosophes · ${SITE_NAME}`,
    description: `Frise chronologique : tous les philosophes étudiés, d'Héraclite à Rawls.`,
    spaUrl: `${SITE_BASE}/#/timeline`,
    canonical: `${SITE_BASE}/raw/timeline.html`,
    schemaKind: 'CollectionPage',
  });

  // 6) Quiz
  for (const q of QUIZZES) {
    emitAsset({
      md: quizMarkdown(q),
      outMd:  path.join(RAW, 'quiz', `${q.id}.md`),
      outHtml:path.join(RAW, 'quiz', `${q.id}.html`),
      title:  `Quiz ${q.id} — ${q.title} · ${SITE_NAME}`,
      description: `Quiz de révision : ${q.title}.${q.description ? ' ' + q.description : ''}`,
      spaUrl: `${SITE_BASE}/#/quiz/${q.id}`,
      canonical: `${SITE_BASE}/raw/quiz/${q.id}.html`,
      schemaKind: 'Quiz',
    });
  }

  // 7) JSON data
  emitJsonData();

  // 8) Index + llms.txt + sitemap + robots
  emitRawIndex();
  emitLlmsTxt();
  emitSitemap();
  emitRobots();

  log(`done — ~${(totalBytes / 1024).toFixed(1)} KB written`);
}

main();
