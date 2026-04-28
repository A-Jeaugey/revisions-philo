// =========================================================
// Print views — PDF via window.print() en mode dark
// =========================================================

App._essentielHTML = function(e) {
  if (!e) return '';
  return `
    <section class="print-essentiel">
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
        <ul>${(e.pieges||[]).map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
      <p class="ess-retenir"><b>À retenir.</b> ${e.retenir}</p>
    </section>
  `;
};

App.routes.print = function(parts) {
  const variant = parts[0];           // 'cours' | 'fiche'
  const id = parseInt(parts[1]);
  const s = window.SEQUENCES.find(x => x.id === id);
  if (!s || !['cours','fiche'].includes(variant)) {
    window.location.hash = '#/sequences';
    return;
  }

  // Force dark theme + classe printing sur le body
  if (!App._prevTheme) {
    App._prevTheme = document.documentElement.getAttribute('data-theme') || 'light';
  }
  document.documentElement.setAttribute('data-theme', 'dark');
  document.body.classList.add('printing');

  if (variant === 'cours') App._printCours(s);
  else                     App._printFiche(s);

  // Restaure le thème dès qu'on quitte la route /print/...
  const restore = () => {
    if (!location.hash.startsWith('#/print/')) {
      document.documentElement.setAttribute('data-theme', App._prevTheme || 'light');
      document.body.classList.remove('printing');
      App._prevTheme = null;
      window.removeEventListener('hashchange', restore);
    }
  };
  window.addEventListener('hashchange', restore);

  // Auto-déclenche le dialog d'impression après chargement des polices
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setTimeout(() => window.print(), 250));
  } else {
    setTimeout(() => window.print(), 800);
  }
};

App._printCours = function(s) {
  const planHtml = s.plan.map(p => `
    <li>
      <strong>${p.t}</strong>
      ${p.sub && p.sub.length ? `<ol>${p.sub.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}
    </li>
  `).join('');

  App.render(`
    <div class="print-shell" data-variant="cours">
      <div class="print-bar">
        <button class="btn" onclick="window.print()">↓ Télécharger en PDF</button>
        <a class="btn" href="#/sequence/${s.id}">← Retour à la séquence</a>
      </div>

      <article class="print-page read-content">
        <header class="print-head">
          <div class="print-brand">Cogito</div>
          <div class="print-tag">Cours complet · Séquence ${s.number}</div>
        </header>

        <h1 class="print-title">${s.title}</h1>
        ${s.short ? `<p class="print-lead">${s.short}</p>` : ''}

        <div class="encadre">
          ${s.perspectives && s.perspectives.length ? `
          <div class="encadre-block">
            <div class="label">Perspectives</div>
            <div class="vals">${s.perspectives.join(', ')}</div>
          </div>` : ''}
          <div class="encadre-block">
            <div class="label">Notions</div>
            <div class="vals">${s.notions.join(' · ')}</div>
          </div>
          ${s.reperes && s.reperes.length ? `
          <div class="encadre-block">
            <div class="label">Repères</div>
            <div class="vals">${s.reperes.join(' · ')}</div>
          </div>` : ''}
          ${s.work ? `
          <div class="encadre-block">
            <div class="label">Œuvre suivie</div>
            <div class="vals">${s.work}</div>
          </div>` : ''}
        </div>

        <div class="plan-box">
          <div class="plan-title">Plan détaillé</div>
          <ol>${planHtml}</ol>
        </div>

        ${App._essentielHTML(s.essentiel)}

        ${s.content}

        <footer class="print-foot">
          Cogito · cogito-bac.local — Imprimé le ${new Date().toLocaleDateString('fr-FR')}
        </footer>
      </article>
    </div>
  `);
};

App._printFiche = function(s) {
  const auths = (App.data.philosophers.length ? App.data.philosophers : window.PHILOSOPHERS)
    .filter(p => (p.sequences || []).includes(s.id))
    .slice(0, 14);

  // Notions présentes dans cette séquence (pour le mini-glossaire)
  const seqNotions = (App.data.notions.length ? App.data.notions : window.NOTIONS)
    .filter(n => (n.sequences || []).includes(s.id));

  const planHtml = s.plan.map((p, i) => `
    <li>
      <strong>${p.t}</strong>
      ${p.sub && p.sub.length ? `<ol>${p.sub.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}
    </li>
  `).join('');

  App.render(`
    <div class="print-shell" data-variant="fiche">
      <div class="print-bar">
        <button class="btn" onclick="window.print()">↓ Télécharger en PDF</button>
        <a class="btn" href="#/sequence/${s.id}">← Retour à la séquence</a>
      </div>

      <article class="print-page fiche-page">
        <header class="print-head">
          <div class="print-brand">Cogito</div>
          <div class="print-tag">Fiche de révision · Séquence ${s.number}</div>
        </header>

        <h1 class="print-title">${s.title}</h1>
        ${s.short ? `<p class="print-lead">${s.short}</p>` : ''}

        ${App._essentielHTML(s.essentiel)}

        <section class="fiche-meta">
          ${s.perspectives && s.perspectives.length ? `
          <div><span class="meta-k">Perspectives</span><span>${s.perspectives.join(', ')}</span></div>` : ''}
          <div><span class="meta-k">Notions</span><span>${s.notions.join(' · ')}</span></div>
          ${s.reperes && s.reperes.length ? `
          <div><span class="meta-k">Repères</span><span>${s.reperes.join(' · ')}</span></div>` : ''}
          ${s.work ? `
          <div><span class="meta-k">Œuvre suivie</span><span>${s.work}</span></div>` : ''}
        </section>

        <section class="fiche-plan">
          <h2>Plan détaillé</h2>
          <ol class="fiche-plan-list">${planHtml}</ol>
        </section>

        ${auths.length ? `
        <section class="fiche-auteurs">
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
        <section class="fiche-notions">
          <h2>Notions à maîtriser</h2>
          <dl>
            ${seqNotions.map(n => `
              <dt>${n.name}</dt>
              <dd>${n.short}</dd>
            `).join('')}
          </dl>
        </section>` : ''}

        <footer class="print-foot">
          Cogito · fiche de révision — ${new Date().toLocaleDateString('fr-FR')}
        </footer>
      </article>
    </div>
  `);
};
