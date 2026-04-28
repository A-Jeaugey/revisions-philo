#!/usr/bin/env node
/**
 * Génère un PDF par séquence × variante (cours / fiche).
 * Utilise Puppeteer (Chromium headless). Charge les données du site
 * (window.SEQUENCE_*, window.PHILOSOPHERS, window.NOTIONS) directement
 * depuis les fichiers JS du site, en simulant un global window.
 *
 * Utilisation :
 *   node scripts/build-pdfs.js              # tous les PDFs
 *   node scripts/build-pdfs.js 1            # séquence 1 uniquement
 *   node scripts/build-pdfs.js cours        # tous les "cours"
 *   node scripts/build-pdfs.js 1 fiche      # seq 1, fiche uniquement
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderTemplate } = require('./pdf-template.js');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'js', 'data');
const OUT = path.join(ROOT, 'pdfs');

// Charge les data files en simulant un environnement navigateur.
global.window = global;
const dataFiles = [
  'philosophers.js', 'notions.js', 'glossary.js',
  'seq1.js', 'seq1b.js',
  'seq2.js', 'seq2b.js',
  'seq3.js', 'seq3b.js',
  'seq4.js',
  'seq5.js',
  'seq6.js',
  'sequences.js',
];
dataFiles.forEach(f => require(path.join(DATA_DIR, f)));

const SEQUENCES = window.SEQUENCES;
const PHILOSOPHERS = window.PHILOSOPHERS;
const NOTIONS = window.NOTIONS;

async function buildOne(browser, s, variant) {
  const html = renderTemplate(s, variant, { philosophers: PHILOSOPHERS, notions: NOTIONS });
  const page = await browser.newPage();
  await page.emulateMediaType('screen');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() =>
    document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve()
  );
  // Petit délai pour stabiliser le rendu (gradients, etc.)
  await new Promise(r => setTimeout(r, 300));

  const fileName = `seq-${s.id}-${variant}.pdf`;
  const outPath = path.join(OUT, fileName);
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await page.close();

  const size = fs.statSync(outPath).size;
  console.log(`✓ ${fileName.padEnd(28)} ${(size / 1024).toFixed(0)} KB`);
}

(async () => {
  // Args: optionnel id de séquence (1..6) et/ou variante ('cours'|'fiche')
  const args = process.argv.slice(2);
  const idArg = args.find(a => /^[1-6]$/.test(a));
  const varArg = args.find(a => ['cours', 'fiche'].includes(a));

  const seqs = idArg
    ? SEQUENCES.filter(s => s.id === parseInt(idArg))
    : SEQUENCES;
  const variants = varArg ? [varArg] : ['cours', 'fiche'];

  if (!seqs.length) {
    console.error(`Aucune séquence pour id=${idArg}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });

  console.log(`Génération de ${seqs.length * variants.length} PDF(s) → ${path.relative(ROOT, OUT)}/`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  try {
    for (const s of seqs) {
      for (const v of variants) {
        await buildOne(browser, s, v);
      }
    }
  } finally {
    await browser.close();
  }
  console.log('Terminé.');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
