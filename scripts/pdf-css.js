/**
 * CSS du template PDF Cogito (mode dark + Fraunces / DM Sans).
 * Inliné dans <style> par pdf-template.js.
 */

function renderCSS({ tint, variant }) {
  const isFiche = variant === 'fiche';
  return `
:root {
  --tint: ${tint};
  --bg: #0d0c0a;
  --bg-2: #131210;
  --bg-3: #1c1b18;
  --paper: #1a1916;
  --paper-2: #21201c;
  --rule: rgba(255,244,215,0.10);
  --rule-strong: rgba(255,244,215,0.22);
  --ink: #f7f0db;
  --text: #ece4ce;
  --text-strong: #f9f3df;
  --text-dim: #a8a08a;
  --text-mute: #6e6856;
  --accent: #e8a13a;
  --accent-2: #f6c46b;
  --accent-3: #b67822;
  --accent-soft: rgba(232,161,58,0.16);
  --terra: #d3735a; --terra-soft: rgba(211,115,90,0.16);
  --sage: #9bbf75; --sage-soft: rgba(155,191,117,0.16);
  --plum: #c48cbe; --plum-soft: rgba(196,140,190,0.16);
  --indigo: #8aa6dc; --indigo-soft: rgba(138,166,220,0.16);
  --rose: #e7a0bb; --rose-soft: rgba(231,160,187,0.16);
}

@page {
  size: A4;
  margin: 16mm 14mm 18mm 14mm;
  background: var(--bg);
  @bottom-right {
    content: counter(page) " / " counter(pages);
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    color: #6e6856;
  }
  @bottom-left {
    content: "Cogito · ${isFiche ? 'Fiche de révision' : 'Cours complet'}";
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    color: #6e6856;
  }
}
@page :first {
  margin: 0;
  @bottom-right { content: ""; }
  @bottom-left { content: ""; }
}

* { box-sizing: border-box; }
html, body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: ${isFiche ? '10pt' : '10.5pt'};
  line-height: 1.6;
  margin: 0; padding: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* =================== COVER (page 1) =================== */
.cover {
  position: relative;
  width: 210mm; height: 297mm;
  padding: 26mm 22mm;
  overflow: hidden;
  page-break-after: always;
  background:
    radial-gradient(80% 60% at 0% 0%, color-mix(in srgb, var(--tint) 30%, transparent), transparent 60%),
    radial-gradient(70% 60% at 100% 100%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 60%),
    var(--bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cover::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,244,215,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,244,215,0.04) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.cover::after {
  content: '✻';
  position: absolute; top: 14mm; right: 14mm;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 64pt;
  color: var(--accent);
  opacity: 0.14;
}
.cover > * { position: relative; }

.cover-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,244,215,0.55);
  display: flex;
  justify-content: space-between;
}
.cover-eyebrow .num { color: var(--accent); font-weight: 700; }

.cover-mid {}
.cover-icon {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 130pt;
  font-weight: 500;
  line-height: 1;
  color: var(--accent);
  margin-bottom: 8mm;
  letter-spacing: -0.03em;
}
.cover-title {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 500;
  font-size: 48pt;
  line-height: 1.0;
  letter-spacing: -0.025em;
  margin: 0 0 6mm;
  color: var(--text-strong);
}
.cover-title .dot { color: var(--accent); font-style: italic; font-weight: 600; }

.cover-subtitle {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 14pt;
  color: var(--text-dim);
  max-width: 150mm;
  margin: 0 0 10mm;
  line-height: 1.35;
}
.cover-tags { display: flex; gap: 5px; flex-wrap: wrap; }
.cover-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8pt;
  padding: 2mm 4mm;
  border: 0.5pt solid var(--rule-strong);
  border-radius: 99px;
  color: var(--text-dim);
  letter-spacing: 0.04em;
}

.cover-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8mm;
  padding-top: 6mm;
  border-top: 0.5pt solid var(--rule-strong);
}
.cover-stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-mute);
  margin-bottom: 2mm;
}
.cover-stat-value {
  font-family: 'Fraunces', serif;
  font-size: 24pt;
  font-weight: 500;
  color: var(--text-strong);
  letter-spacing: -0.02em;
}
.cover-stat-value.accent { color: var(--accent); font-style: italic; }

.cover-footer {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8pt;
  color: var(--text-mute);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 7mm;
}

/* =================== BODY (cours + fiche) =================== */
.doc-wrap { padding: 0; }
.doc-body { color: var(--text); }
.doc-body > h2:first-child { margin-top: 0; }

.doc-body h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 500;
  font-size: 22pt;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 12mm 0 4mm;
  color: var(--text-strong);
  page-break-after: avoid; break-after: avoid;
  padding-bottom: 3mm;
  border-bottom: 0.5pt solid var(--rule-strong);
}
.doc-body h2::before {
  content: '✻ ';
  color: var(--accent);
  font-style: italic;
  font-size: 12pt;
  margin-right: 4pt;
  vertical-align: 4pt;
}
.doc-body h3 {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 500;
  font-size: 14pt;
  margin: 7mm 0 2.5mm;
  color: var(--text-strong);
  page-break-after: avoid;
}
.doc-body h4 {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 9pt;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 5mm 0 2mm;
  color: var(--accent);
  page-break-after: avoid;
}

.doc-body p { margin: 0 0 3mm; color: var(--text); orphans: 3; widows: 3; }
.doc-body strong { color: var(--text-strong); font-weight: 600; }
.doc-body em { color: var(--text-strong); font-style: italic; }
.doc-body u {
  text-decoration: none;
  background-image: linear-gradient(transparent 65%, color-mix(in srgb, var(--accent) 30%, transparent) 65%);
  padding: 0 1pt;
}

.doc-body ul, .doc-body ol {
  margin: 2mm 0 4mm 6mm;
  padding: 0;
  color: var(--text);
}
.doc-body li { margin-bottom: 1.5mm; }
.doc-body li::marker { color: var(--accent); }

/* Tables */
.doc-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 4mm 0;
  font-size: 9pt;
  border-top: 1pt solid var(--ink);
  border-bottom: 1pt solid var(--ink);
  page-break-inside: avoid;
}
.doc-body th {
  padding: 2.5mm 3mm;
  text-align: left;
  border-bottom: 0.5pt solid var(--ink);
  font-family: 'JetBrains Mono', monospace;
  font-size: 8pt;
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--accent);
}
.doc-body td {
  padding: 2.5mm 3mm;
  vertical-align: top;
  border-bottom: 0.5pt solid var(--rule);
  color: var(--text);
}
.doc-body tr:last-child td { border-bottom: 0; }

/* Blockquote / citations */
.doc-body blockquote {
  margin: 4mm 0;
  padding: 3mm 4mm 3mm 6mm;
  border-left: 1pt solid var(--accent);
  background: var(--paper);
  border-radius: 0 2pt 2pt 0;
  font-family: 'Fraunces', Georgia, serif;
  font-style: italic;
  font-size: 11.5pt;
  line-height: 1.4;
  color: var(--text-strong);
  page-break-inside: avoid;
}
.doc-body blockquote cite {
  display: block;
  margin-top: 2mm;
  font-style: normal;
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}
.doc-body blockquote.author { background: var(--paper-2); }

/* Callouts */
.doc-body .callout {
  margin: 4mm 0;
  padding: 3mm 4mm 3mm 5mm;
  background: var(--paper);
  border: 0.5pt solid var(--rule);
  border-left: 1pt solid var(--accent);
  border-radius: 0 2pt 2pt 0;
  page-break-inside: avoid;
}
.doc-body .callout.warn { border-left-color: var(--terra); background: var(--terra-soft); }
.doc-body .callout.note { border-left-color: var(--indigo); background: var(--indigo-soft); }
.doc-body .callout.tip { border-left-color: var(--sage); background: var(--sage-soft); }
.doc-body .callout-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8pt;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 1.5mm;
}
.doc-body .callout.warn .callout-title { color: var(--terra); }
.doc-body .callout.note .callout-title { color: var(--indigo); }
.doc-body .callout.tip .callout-title { color: var(--sage); }

/* Author card */
.doc-body .author-card {
  display: flex;
  gap: 4mm;
  align-items: center;
  margin: 4mm 0;
  padding: 3mm 4mm;
  background: var(--paper);
  border: 0.5pt solid var(--rule);
  border-left: 1pt solid var(--accent);
  border-radius: 0 2pt 2pt 0;
  page-break-inside: avoid;
}
.doc-body .author-card .ac-avatar {
  width: 12mm; height: 12mm;
  border-radius: 50%;
  background: var(--ink);
  color: var(--bg);
  display: grid; place-items: center;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 500;
  font-size: 16pt;
  flex-shrink: 0;
  border: 0.5pt solid var(--accent);
}
.doc-body .author-card .ac-name {
  font-family: 'Fraunces', serif;
  font-size: 13pt;
  font-weight: 500;
  color: var(--text-strong);
  letter-spacing: -0.01em;
}
.doc-body .author-card .ac-meta {
  color: var(--text-dim);
  font-size: 9pt;
  margin-top: 0.5mm;
}
.doc-body .author-card .ac-meta em {
  font-family: 'Fraunces', serif;
  font-style: italic;
  color: var(--text);
}

/* Doc / fiche */
.doc-body .doc {
  margin: 4mm 0;
  padding: 4mm 5mm;
  background: var(--paper-2);
  border: 0.5pt dashed var(--rule-strong);
  border-radius: 2pt;
  page-break-inside: avoid;
}

/* Surlignages */
.doc-body .hl-red, .doc-body .hl-green {
  margin: 4mm 0;
  padding: 3mm 4mm;
  border-left: 1pt solid;
  border-radius: 0 2pt 2pt 0;
  page-break-inside: avoid;
}
.doc-body .hl-red {
  border-left-color: var(--terra);
  background: var(--terra-soft);
}
.doc-body .hl-green {
  border-left-color: var(--sage);
  background: var(--sage-soft);
}
.doc-body .hl-red::before {
  display: block;
  content: '✕ Objection';
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: var(--terra);
  font-weight: 700;
  margin-bottom: 1.5mm;
}
.doc-body .hl-green::before {
  display: block;
  content: '✓ Commentaire';
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: var(--sage);
  font-weight: 700;
  margin-bottom: 1.5mm;
}

/* Annotation manuscrite */
.doc-body .ann-manu {
  display: block;
  margin: 3mm 0 3mm auto;
  max-width: 80%;
  padding: 2mm 4mm;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 9.5pt;
  color: var(--text-dim);
  background: var(--accent-soft);
  border-left: 1pt solid var(--accent);
  border-radius: 0 2pt 2pt 0;
}
.doc-body .ann-manu::before { content: '✎ '; color: var(--accent); font-weight: 600; }

/* Encadré (notions/perspectives) */
.doc-body .encadre {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3mm 6mm;
  padding: 4mm 5mm;
  border: 1pt solid var(--ink);
  border-radius: 2pt;
  background: var(--paper);
  margin: 4mm 0;
  page-break-inside: avoid;
}
.doc-body .encadre-block .label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 1mm;
}
.doc-body .encadre-block .vals {
  font-family: 'Fraunces', serif;
  font-size: 11pt;
  color: var(--text-strong);
  line-height: 1.4;
}

/* Plan box */
.doc-body .plan-box {
  margin: 4mm 0;
  padding: 5mm 6mm;
  border: 1pt solid var(--ink);
  border-radius: 2pt;
  background: var(--paper);
  page-break-inside: avoid;
}
.doc-body .plan-box .plan-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 3mm;
  padding-bottom: 2mm;
  border-bottom: 0.5pt solid var(--rule);
}
.doc-body .plan-box ol {
  list-style: none;
  padding: 0; margin: 0;
  counter-reset: pl;
}
.doc-body .plan-box > ol > li {
  counter-increment: pl;
  position: relative;
  padding: 1.5mm 0 1.5mm 14mm;
  font-family: 'Fraunces', serif;
  font-size: 13pt;
  font-weight: 500;
  color: var(--text-strong);
  letter-spacing: -0.01em;
}
.doc-body .plan-box > ol > li::before {
  content: counter(pl, upper-roman) '.';
  position: absolute; left: 0; top: 1.5mm;
  font-family: 'Fraunces', serif;
  font-style: italic;
  color: var(--accent);
  font-weight: 500;
  font-size: 14pt;
  width: 11mm;
  text-align: right;
}
.doc-body .plan-box ol ol {
  list-style: none;
  margin: 1.5mm 0 2mm 0;
  padding: 0;
  counter-reset: spl;
}
.doc-body .plan-box ol ol li {
  counter-increment: spl;
  padding: 0.5mm 0 0.5mm 6mm;
  font-family: 'DM Sans', sans-serif;
  font-size: 9.5pt;
  font-weight: 500;
  color: var(--text-dim);
  position: relative;
}
.doc-body .plan-box ol ol li::before {
  content: counter(spl) '.';
  position: absolute; left: 0;
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5pt;
  font-weight: 600;
}

/* Essentiel (En clair) */
.doc-body .essentiel {
  margin: 4mm 0 6mm;
  padding: 5mm 6mm;
  background: var(--paper);
  border: 1pt solid var(--ink);
  border-radius: 3pt;
  page-break-inside: avoid;
  position: relative;
}
.doc-body .essentiel::before {
  content: '';
  position: absolute; inset: 1.5mm;
  border: 0.5pt solid var(--rule);
  border-radius: 2pt;
  pointer-events: none;
}
.doc-body .essentiel > * { position: relative; }
.doc-body .essentiel .ess-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 2mm;
}
.doc-body .essentiel .ess-question {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 13pt;
  font-weight: 400;
  color: var(--text-strong);
  margin: 0 0 4mm;
  line-height: 1.3;
  letter-spacing: -0.01em;
  max-width: 150mm;
}
.doc-body .essentiel .ess-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3mm 6mm;
  padding-top: 3mm;
  border-top: 0.5pt solid var(--rule);
  margin-bottom: 4mm;
}
.doc-body .essentiel .ess-block p { font-size: 9.5pt; line-height: 1.5; color: var(--text); }
.doc-body .essentiel .ess-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7pt;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 1mm;
}
.doc-body .essentiel .ess-warn {
  margin-top: 2mm;
  padding: 3mm 4mm;
  background: var(--terra-soft);
  border-left: 1pt solid var(--terra);
  border-radius: 0 2pt 2pt 0;
}
.doc-body .essentiel .ess-warn .ess-label { color: var(--terra); }
.doc-body .essentiel .ess-warn ul { list-style: none; padding: 0; margin: 0; }
.doc-body .essentiel .ess-warn li {
  position: relative;
  padding: 1mm 0 1mm 5mm;
  font-size: 9.5pt;
  border-bottom: 0.5pt dashed color-mix(in srgb, var(--terra) 30%, transparent);
}
.doc-body .essentiel .ess-warn li:last-child { border-bottom: 0; }
.doc-body .essentiel .ess-warn li::before {
  content: '✕';
  position: absolute; left: 0; top: 1mm;
  color: var(--terra);
  font-weight: 700;
  font-size: 8pt;
}
.doc-body .essentiel .ess-retenir {
  margin-top: 3mm;
  padding: 2.5mm 4mm;
  border-left: 1pt solid var(--accent);
  background: var(--accent-soft);
  border-radius: 0 2pt 2pt 0;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 11pt;
  line-height: 1.4;
  color: var(--text-strong);
}
.doc-body .essentiel .ess-retenir b {
  font-style: normal;
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  margin-right: 2mm;
}

/* =================== FICHE-only =================== */
.fiche.doc-wrap .doc-body h2 {
  font-size: 16pt;
  margin: 8mm 0 3mm;
  padding-bottom: 2mm;
}
.fiche.doc-wrap .doc-body h2::before { font-size: 10pt; }

.fiche-meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5mm;
  padding: 4mm 5mm;
  border: 0.5pt solid var(--rule-strong);
  border-radius: 2pt;
  background: var(--paper);
  margin-bottom: 5mm;
  font-size: 10pt;
  page-break-inside: avoid;
}
.fiche-meta .meta-k {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  display: inline-block;
  min-width: 30mm;
  margin-right: 2mm;
}

.fiche-plan-list {
  list-style: none;
  padding: 0; margin: 0;
  counter-reset: fp;
}
.fiche-plan-list > li {
  counter-increment: fp;
  padding: 1.5mm 0 1.5mm 12mm;
  position: relative;
  font-family: 'Fraunces', serif;
  font-size: 12pt;
  font-weight: 500;
  color: var(--text-strong);
}
.fiche-plan-list > li::before {
  content: counter(fp, upper-roman) '.';
  position: absolute; left: 0; top: 1.5mm;
  color: var(--accent);
  font-style: italic;
  font-weight: 500;
  width: 10mm; text-align: right;
}
.fiche-plan-list ol {
  list-style: none;
  margin: 1mm 0 2mm 0;
  padding: 0;
  counter-reset: fsp;
}
.fiche-plan-list ol li {
  counter-increment: fsp;
  padding: 0.5mm 0 0.5mm 5mm;
  font-family: 'DM Sans', sans-serif;
  font-size: 9pt;
  font-weight: 500;
  color: var(--text-dim);
  position: relative;
}
.fiche-plan-list ol li::before {
  content: counter(fsp) '.';
  position: absolute; left: 0;
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
  font-size: 8pt;
  font-weight: 600;
}

.fiche-auteurs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3mm 5mm;
}
.fiche-auteur {
  padding: 2.5mm 3.5mm;
  border-left: 1pt solid var(--accent);
  background: var(--accent-soft);
  border-radius: 0 2pt 2pt 0;
  page-break-inside: avoid;
}
.fiche-auteur .fa-name {
  font-family: 'Fraunces', serif;
  font-size: 11pt;
  font-weight: 600;
  color: var(--text-strong);
  letter-spacing: -0.01em;
}
.fiche-auteur .fa-dates {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5pt;
  font-weight: 500;
  color: var(--text-dim);
  letter-spacing: 0.04em;
}
.fiche-auteur .fa-thesis {
  font-size: 9pt;
  line-height: 1.45;
  color: var(--text);
  margin-top: 1mm;
}

.fiche-notions {
  display: grid;
  grid-template-columns: 35mm 1fr;
  gap: 1.5mm 5mm;
  font-size: 9.5pt;
}
.fiche-notions dt {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  color: var(--accent);
  font-size: 11pt;
}
.fiche-notions dd {
  color: var(--text);
  line-height: 1.45;
  page-break-inside: avoid;
}
`;
}

module.exports = { renderCSS };
