// =========================================================
// Views — home, sequences index, philosophers, notions, glossary
// =========================================================

App.routes.home = function() {
  const seqCards = window.SEQUENCES.map(s => {
    const t = App.timeTracker.format(App.timeTracker.total(s.id));
    return `
    <a href="#/sequence/${s.id}" class="seq-card" style="--card-tint:${s.tint}">
      <div class="seq-num">${s.number}</div>
      <h3>${s.title}</h3>
      <div class="seq-tags">
        ${s.notions.slice(0,4).map(n => `<span class="seq-tag">${n.toLowerCase()}</span>`).join('')}
      </div>
      ${t ? `<div class="seq-time">⏱ ${t} étudiées</div>` : ''}
      <div class="seq-foot">
        <span>${s.inProgress ? '⏳ en cours' : (t ? 'Reprendre' : 'Étudier')}</span>
        <span class="arrow">→</span>
      </div>
    </a>`;
  }).join('');

  const stats = [
    { num: '6', lbl: 'séquences' },
    { num: App.data.philosophers.length+'', lbl: 'philosophes' },
    { num: App.data.notions.length+'', lbl: 'notions' },
    { num: window.QUIZZES.reduce((a,q)=>a+q.questions.length,0)+'', lbl: 'questions de quiz' }
  ];

  App.render(`
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <div class="hero-eyebrow">Cogito · le bac de philosophie</div>
        <h1>D'abord <em>douter</em>.<br/>Ensuite <em>comprendre</em>.</h1>
        <p class="hero-sub">L'intégralité du programme, séquence par séquence — fiches complètes, citations, frise, quiz et flashcards. Pour comprendre, pas seulement réviser.</p>
        <div class="hero-cta">
          <a href="#/sequences" class="btn btn-primary">Commencer à réviser <span class="btn-arrow">→</span></a>
          <a href="#/quiz" class="btn">Tester mes connaissances</a>
        </div>
        <div class="hero-stats">
          ${stats.map(s => `<div class="hero-stat"><div class="num">${s.num}</div><div class="lbl">${s.lbl}</div></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <div class="section-eyebrow">Le programme</div>
          <h2>Six <em>séquences</em> pour tout maîtriser</h2>
        </div>
        <p class="section-sub">Chaque fiche reprend l'intégralité des contenus étudiés en classe, augmentée d'éléments interactifs pour mieux comprendre et mémoriser.</p>
      </div>
      <div class="seq-grid">${seqCards}</div>

      <div class="features">
        <div class="feature">
          <div class="feature-icon">📜</div>
          <h4>Fiches complètes</h4>
          <p>Toutes les notions, citations, auteurs et arguments — fidèlement transcrits.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🃏</div>
          <h4>Flashcards</h4>
          <p>Mémorise les définitions et thèses essentielles par retournement.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">⚡</div>
          <h4>Quiz par séquence</h4>
          <p>QCM avec correction immédiate, score et explication détaillée.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">📅</div>
          <h4>Frise des philosophes</h4>
          <p>Situe chaque auteur dans le temps, d'Héraclite à Rawls.</p>
        </div>
      </div>
    </section>

    <div class="quote-banner">
      <blockquote>« L'homme n'est rien d'autre que son projet,<br/>il n'existe que dans la mesure où il se réalise. »</blockquote>
      <cite>Jean-Paul Sartre</cite>
    </div>

    <section class="section">
      <div class="section-head">
        <div>
          <div class="section-eyebrow">Outils complémentaires</div>
          <h2>Réviser <em>autrement</em></h2>
        </div>
      </div>
      <div class="features">
        <a class="feature" href="#/notions" style="cursor:pointer;text-decoration:none;color:inherit;">
          <div class="feature-icon">⊕</div>
          <h4>Notions clés</h4>
          <p>Cartographie de chaque grande notion du programme.</p>
        </a>
        <a class="feature" href="#/philosophes" style="cursor:pointer;text-decoration:none;color:inherit;">
          <div class="feature-icon">👤</div>
          <h4>Galerie des philosophes</h4>
          <p>Fiches biographiques et thèses essentielles.</p>
        </a>
        <a class="feature" href="#/glossaire" style="cursor:pointer;text-decoration:none;color:inherit;">
          <div class="feature-icon">📚</div>
          <h4>Glossaire</h4>
          <p>Toutes les définitions à portée de clic.</p>
        </a>
        <a class="feature" href="#/timeline" style="cursor:pointer;text-decoration:none;color:inherit;">
          <div class="feature-icon">🕒</div>
          <h4>Frise chronologique</h4>
          <p>2500 ans de pensée en un coup d'œil.</p>
        </a>
      </div>
    </section>
  `);
};

App.routes.sequences = function() {
  const cards = window.SEQUENCES.map(s => {
    const t = App.timeTracker.format(App.timeTracker.total(s.id));
    return `
    <a href="#/sequence/${s.id}" class="seq-card" style="--card-tint:${s.tint}">
      <div class="seq-num">${s.number}</div>
      <h3>${s.title}</h3>
      <div class="seq-tags">
        ${s.notions.slice(0,5).map(n => `<span class="seq-tag">${n.toLowerCase()}</span>`).join('')}
      </div>
      <div style="margin-top:14px;font-size:13px;color:var(--text-dim);line-height:1.5;">
        ${s.plan.length} parties · ${s.plan.reduce((a,p)=>a+(p.sub?p.sub.length:0),0)} sous-parties
      </div>
      ${t ? `<div class="seq-time">⏱ ${t} étudiées</div>` : ''}
      <div class="seq-foot">
        <span>${s.inProgress ? '⏳ en cours' : (t ? 'Reprendre' : 'Lire')}</span>
        <span class="arrow">→</span>
      </div>
    </a>`;
  }).join('');

  App.render(`
    <div class="page-head">
      <div class="crumbs"><a href="#/">Accueil</a> · Séquences</div>
      <h1>Les <em style="color:var(--accent);font-style:italic;">séquences</em></h1>
      <p class="lead">Six grandes questions pour le bac. Chacune est complètement transcrite et augmentée d'outils interactifs.</p>
    </div>
    <div class="container">
      <div class="seq-grid">${cards}</div>
    </div>
  `);
};

App.routes.philosophes = function(parts) {
  if (parts && parts[0]) {
    const p = window.PHILOSOPHERS.find(x => x.id === parts[0]);
    if (!p) return App.routes.philosophes([]);
    const seqs = (p.sequences||[]).map(id => {
      const s = window.SEQUENCES.find(x => x.id === id);
      return s ? `<a href="#/sequence/${s.id}" class="seq-tag" style="text-decoration:none;">Séq. ${s.number} · ${s.title.slice(0,40)}…</a>` : '';
    }).join(' ');
    return App.render(`
      <div class="page-head">
        <div class="crumbs"><a href="#/">Accueil</a> · <a href="#/philosophes">Philosophes</a> · ${p.name}</div>
        <div style="display:flex;align-items:center;gap:24px;margin-top:20px;">
          <div class="philo-avatar" style="width:80px;height:80px;font-size:36px;">${p.initials}</div>
          <div>
            <h1 style="font-size:48px;">${p.name}</h1>
            <div style="color:var(--text-dim);font-family:var(--font-mono);margin-top:6px;">${p.dates} · ${p.country}</div>
          </div>
        </div>
      </div>
      <div class="reading" style="padding-bottom:80px;">
        <blockquote class="author" style="font-size:24px;">${p.thesis}</blockquote>
        <h3 style="margin-top:32px;font-family:var(--font-display);">Idées clés</h3>
        <ul style="margin-top:12px;">
          ${(p.keyIdeas||[]).map(k => `<li>${k}</li>`).join('')}
        </ul>
        <h3 style="margin-top:32px;font-family:var(--font-display);">Apparaît dans</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">${seqs}</div>
      </div>
    `);
  }
  const cards = App.data.philosophers.map(p => `
    <a class="philo-card" href="#/philosophes/${p.id}" style="text-decoration:none;color:inherit;">
      <div class="philo-avatar">${p.initials}</div>
      <h3>${p.name}</h3>
      <div class="philo-dates">${p.dates}</div>
      <div class="philo-thesis">${(p.thesis||'').slice(0,150)}…</div>
      <div class="philo-tags">
        ${(p.tags||[]).slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </a>
  `).join('');
  App.render(`
    <div class="page-head">
      <div class="crumbs"><a href="#/">Accueil</a> · Philosophes</div>
      <h1>Les <em style="color:var(--accent);">philosophes</em></h1>
      <p class="lead">Tous les auteurs étudiés cette année — de Socrate à Rawls.</p>
    </div>
    <div class="philo-grid">${cards}</div>
  `);
};

App.routes.notions = function(parts) {
  if (parts && parts[0]) {
    const n = window.NOTIONS.find(x => x.id === parts[0]);
    if (!n) return App.routes.notions([]);
    const visibleIds = new Set(App.data.philosophers.map(p => p.id));
    const auths = (n.keyAuthors||[]).filter(id => visibleIds.has(id)).map(id => {
      const p = window.PHILOSOPHERS.find(x => x.id === id);
      return p ? `<a href="#/philosophes/${p.id}" class="seq-tag" style="text-decoration:none;">${p.name}</a>` : '';
    }).join(' ');
    const seqs = (n.sequences||[]).map(id => {
      const s = window.SEQUENCES.find(x => x.id === id);
      return s ? `<a href="#/sequence/${s.id}" class="seq-tag" style="text-decoration:none;">Séq. ${s.number}</a>` : '';
    }).join(' ');
    return App.render(`
      <div class="page-head">
        <div class="crumbs"><a href="#/">Accueil</a> · <a href="#/notions">Notions</a> · ${n.name}</div>
        <h1><em style="color:var(--accent);font-style:italic;">${n.name}</em></h1>
        <p class="lead">${n.short}</p>
      </div>
      <div class="reading" style="padding-bottom:80px;">
        <p style="font-size:18px;line-height:1.7;">${n.long}</p>
        <h3 style="margin-top:32px;">Philosophes clés</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">${auths}</div>
        <h3 style="margin-top:32px;">Séquences associées</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">${seqs}</div>
      </div>
    `);
  }
  const cards = App.data.notions.map(n => `
    <a class="notion-card" href="#/notions/${n.id}" data-glyph="${n.glyph}" style="text-decoration:none;color:inherit;">
      <h3>${n.name}</h3>
      <p class="notion-def">${n.short}</p>
      <span class="notion-link">explorer →</span>
    </a>
  `).join('');
  App.render(`
    <div class="page-head">
      <div class="crumbs"><a href="#/">Accueil</a> · Notions</div>
      <h1>Les <em style="color:var(--accent);">notions</em></h1>
      <p class="lead">Conscience, vérité, art, justice… toutes les grandes notions du programme.</p>
    </div>
    <div class="notion-grid">${cards}</div>
  `);
};

App.routes.glossaire = function() {
  const source = App.data.glossary;
  const letters = [...new Set(source.map(g => g.term[0].toUpperCase()))].sort();
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const list = source.slice().sort((a,b) => a.term.localeCompare(b.term));

  App.render(`
    <div class="page-head">
      <div class="crumbs"><a href="#/">Accueil</a> · Glossaire</div>
      <h1>Le <em style="color:var(--accent);">glossaire</em></h1>
      <p class="lead">Toutes les définitions clés en un endroit. Tape pour filtrer.</p>
    </div>
    <div class="glossary">
      <div class="glossary-search">
        <svg viewBox="0 0 24 24" width="18" height="18" style="color:var(--text-dim);"><path d="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
        <input id="gl-input" type="text" placeholder="Rechercher un terme…" />
      </div>
      <div class="glossary-letters" id="gl-letters">
        <button class="gl-letter active" data-letter="">Tout</button>
        ${allLetters.map(l => `<button class="gl-letter" data-letter="${l}" ${letters.includes(l)?'':'disabled'}>${l}</button>`).join('')}
      </div>
      <div id="gl-list">
        ${list.map(g => `
          <div class="glossary-entry" data-term="${g.term.toLowerCase()}" data-letter="${g.term[0].toUpperCase()}">
            <h3>${g.term}</h3>
            ${g.etym ? `<div class="gl-etym">${g.etym}</div>` : ''}
            <p>${g.def}</p>
            <div class="gl-tags">
              ${(g.tags||[]).map(t => `<span class="tag" style="font-size:10px;padding:2px 8px;background:var(--bg-3);border-radius:999px;color:var(--text-mute);">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `);

  const input = document.getElementById('gl-input');
  const filterLetter = (letter) => {
    document.querySelectorAll('#gl-letters .gl-letter').forEach(b => b.classList.toggle('active', b.dataset.letter === letter));
    document.querySelectorAll('.glossary-entry').forEach(e => {
      e.style.display = (!letter || e.dataset.letter === letter) ? '' : 'none';
    });
  };
  document.querySelectorAll('#gl-letters .gl-letter').forEach(b => {
    b.addEventListener('click', () => filterLetter(b.dataset.letter));
  });
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.glossary-entry').forEach(e => {
      e.style.display = e.dataset.term.includes(q) ? '' : 'none';
    });
  });
};
