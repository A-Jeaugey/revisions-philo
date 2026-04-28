#!/usr/bin/env node
// Build step: parse each sequences/*.md once and write the resulting HTML
// into the matching js/data/seqN.js content field. After running this,
// the site does not need the markdown parser at runtime.
//
// Usage: node tools/build_seq_content.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Load parser (it self-attaches to global.window.App.md)
global.window = {};
require(path.join(ROOT, 'js', 'md-parser.js'));
const parse = window.App.md.parse.bind(window.App.md);

// id → md file
const MAP = {
  1: 'sequence_1_conscience_connaissance_de_soi.md',
  2: 'sequence_2_verite_raison_science.md',
  3: 'sequence_3_langage_pensee.md',
  4: 'sequence_4_definir_art.md',
  5: 'sequence_5_etat_justice.md',
  6: 'sequence_6_devoir_bonheur.md',
};

// id → list of seq*.js files that hold its content (in order, concatenated)
// Sequences 1, 2, 3 are split across two files (seqN.js + seqNb.js); the
// "b" files do `window.SEQUENCE_N.content += ...`. We put the full HTML in
// the primary file and reset the "b" file to a no-op for cleanliness.
const TARGETS = {
  1: { primary: 'seq1.js', extras: ['seq1b.js'] },
  2: { primary: 'seq2.js', extras: ['seq2b.js'] },
  3: { primary: 'seq3.js', extras: ['seq3b.js'] },
  4: { primary: 'seq4.js', extras: [] },
  5: { primary: 'seq5.js', extras: [] },
  6: { primary: 'seq6.js', extras: [] },
};

function escapeForBacktickTemplate(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function rewritePrimary(filePath, html) {
  const src = fs.readFileSync(filePath, 'utf8');
  // Replace the existing `content: \` ... \`` template literal.
  const re = /(content:\s*)`[\s\S]*?`(\s*\};?\s*)$/m;
  const escaped = '`\n' + escapeForBacktickTemplate(html.trim()) + '\n`';
  if (!re.test(src)) {
    throw new Error('No content: \\`...\\` block found in ' + filePath);
  }
  const out = src.replace(re, (_, head, tail) => head + escaped + tail);
  fs.writeFileSync(filePath, out);
}

function neutraliseExtra(filePath, parentId) {
  // Replace the file with a no-op (kept so existing <script> tags still load).
  const banner = `// Séquence ${parentId} — content is built from the .md by tools/build_seq_content.js\n`;
  const body = `// (intentionally empty: full content lives in the primary seq${parentId}.js file)\n`;
  fs.writeFileSync(filePath, banner + body);
}

function main() {
  for (const id of Object.keys(TARGETS)) {
    const idNum = Number(id);
    const mdPath = path.join(ROOT, 'sequences', MAP[idNum]);
    const html = parse(fs.readFileSync(mdPath, 'utf8'));
    const primary = path.join(ROOT, 'js', 'data', TARGETS[idNum].primary);
    rewritePrimary(primary, html);
    for (const extra of TARGETS[idNum].extras) {
      neutraliseExtra(path.join(ROOT, 'js', 'data', extra), idNum);
    }
    console.log(`seq${idNum}: ${html.length} chars → ${TARGETS[idNum].primary}` +
      (TARGETS[idNum].extras.length ? ` (cleared ${TARGETS[idNum].extras.join(', ')})` : ''));
  }
}

main();
