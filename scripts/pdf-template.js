/**
 * Template HTML+CSS pour les PDFs Cogito.
 * Reprend l'identité dark du site (Fraunces / DM Sans / safran).
 */

const { renderCSS } = require('./pdf-css.js');

function escAttr(s) { return String(s || '').replace(/"/g, '&quot;'); }

function essentielHTML(e) {
  if (!e) return '';
  return `
    <section class="essentiel">
      <div class="ess-eyebrow">§ En clair</div>
      <p class="ess-question">${e.question}</p>
      <div class="ess-grid">
        <div class="ess-block">
          <div class="ess-label">Pourquoi ça compte</div>
          <p>${e.enjeu}</p>
        </div>
        <div class="ess-block">
          <div class="ess-label">Le débat</div>
          <p>${e.tension}</p>
        </div>
      </div>
      <div class="ess-warn">
        <div class="ess-label">À ne pas confondre</div>
        <ul>${(e.pieges || []).map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
      <p class="ess-retenir"><b>À retenir.</b> ${e.retenir}</p>
    </section>
  `;
}

function renderCover(s, variant) {
  const isFiche = variant === 'fiche';
  const badge = isFiche ? 'FICHE DE RÉVISION' : 'COURS COMPLET';
  const tags = (s.notions || []).slice(0, 6).map(n =>
    `<span class="cover-tag">#${n.toLowerCase()}</span>`
  ).join('');
  return `
    <section class="cover">
      <div class="cover-eyebrow">
        <span><span class="num">SÉQ. ${s.number}</span> · ${badge}</span>
        <span>BAC PHILO · TERMINALE</span>
      </div>
      <div class="cover-mid">
        <div class="cover-icon">${s.number}</div>
        <h1 class="cover-title">${s.title}<span class="dot">.</span></h1>
        ${s.short ? `<p class="cover-subtitle">${s.short}</p>` : ''}
        <div class="cover-tags">${tags}</div>
      </div>
      <div class="cover-bot">
        <div class="cover-stats">
          <div>
            <div class="cover-stat-label">Notions</div>
            <div class="cover-stat-value accent">${s.notions.length}</div>
          </div>
          <div>
            <div class="cover-stat-label">Parties</div>
            <div class="cover-stat-value">${s.plan.length}</div>
          </div>
          <div>
            <div class="cover-stat-label">Session</div>
            <div class="cover-stat-value">2026</div>
          </div>
        </div>
        <div class="cover-footer">cogito · le bac de philosophie</div>
      </div>
    </section>
  `;
}

function renderEncadre(s) {
  return `
    <div class="encadre">
      ${s.perspectives && s.perspectives.length ? `
        <div class="encadre-block"><div class="label">Perspectives</div>
          <div class="vals">${s.perspectives.join(', ')}</div></div>` : ''}
      <div class="encadre-block"><div class="label">Notions</div>
        <div class="vals">${s.notions.join(' · ')}</div></div>
      ${s.reperes && s.reperes.length ? `
        <div class="encadre-block"><div class="label">Repères</div>
          <div class="vals">${s.reperes.join(' · ')}</div></div>` : ''}
      ${s.work ? `
        <div class="encadre-block"><div class="label">Œuvre suivie</div>
          <div class="vals">${s.work}</div></div>` : ''}
    </div>
  `;
}

function renderPlan(s) {
  const items = s.plan.map(p => `
    <li><strong>${p.t}</strong>
      ${p.sub && p.sub.length ? `<ol>${p.sub.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}
    </li>
  `).join('');
  return `
    <div class="plan-box">
      <div class="plan-title">Plan détaillé</div>
      <ol>${items}</ol>
    </div>
  `;
}

function renderCours(s) {
  return `
    <main class="doc-wrap">
      <div class="doc-body read-content">
        ${renderEncadre(s)}
        ${renderPlan(s)}
        ${essentielHTML(s.essentiel)}
        ${s.content || ''}
      </div>
    </main>
  `;
}

function renderFiche(s, { philosophers, notions }) {
  const auths = (philosophers || [])
    .filter(p => (p.sequences || []).includes(s.id))
    .slice(0, 14);
  const seqNotions = (notions || []).filter(n => (n.sequences || []).includes(s.id));

  const planItems = s.plan.map(p => `
    <li><strong>${p.t}</strong>
      ${p.sub && p.sub.length ? `<ol>${p.sub.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}
    </li>
  `).join('');

  const meta = `
    <section class="fiche-meta">
      ${s.perspectives && s.perspectives.length ? `
        <div><span class="meta-k">Perspectives</span><span>${s.perspectives.join(', ')}</span></div>` : ''}
      <div><span class="meta-k">Notions</span><span>${s.notions.join(' · ')}</span></div>
      ${s.reperes && s.reperes.length ? `
        <div><span class="meta-k">Repères</span><span>${s.reperes.join(' · ')}</span></div>` : ''}
      ${s.work ? `<div><span class="meta-k">Œuvre suivie</span><span>${s.work}</span></div>` : ''}
    </section>
  `;

  return `
    <main class="doc-wrap fiche">
      <div class="doc-body">
        ${essentielHTML(s.essentiel)}
        ${meta}
        <section><h2>Plan détaillé</h2><ol class="fiche-plan-list">${planItems}</ol></section>
        ${auths.length ? `
          <section>
            <h2>Auteurs-clés</h2>
            <div class="fiche-auteurs-grid">
              ${auths.map(p => `
                <div class="fiche-auteur">
                  <div class="fa-name">${p.name}<span class="fa-dates"> · ${p.dates}</span></div>
                  <p class="fa-thesis">${p.thesis}</p>
                </div>
              `).join('')}
            </div>
          </section>` : ''}
        ${seqNotions.length ? `
          <section>
            <h2>Notions à maîtriser</h2>
            <dl class="fiche-notions">
              ${seqNotions.map(n => `<dt>${n.name}</dt><dd>${n.short}</dd>`).join('')}
            </dl>
          </section>` : ''}
      </div>
    </main>
  `;
}

function renderTemplate(s, variant, ctx = {}) {
  const cover = renderCover(s, variant);
  const body = variant === 'fiche' ? renderFiche(s, ctx) : renderCours(s);
  const css = renderCSS({ tint: s.tint || '#e8a13a', variant });
  const title = `${s.title} — Cogito`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>${escAttr(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body data-variant="${variant}">
${cover}
${body}
</body>
</html>`;
}

module.exports = { renderTemplate };
