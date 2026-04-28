// =========================================================
// Sequence reader — TOC, progress, navigation
// =========================================================

App.routes.sequence = function(parts) {
  const id = parseInt(parts[0]);
  const s = window.SEQUENCES.find(x => x.id === id);
  if (!s) return App.routes.sequences();

  const prev = window.SEQUENCES.find(x => x.id === s.id - 1);
  const next = window.SEQUENCES.find(x => x.id === s.id + 1);

  const planHtml = s.plan.map((p, i) => `
    <li>
      <strong>${p.t}</strong>
      ${p.sub && p.sub.length ? `<ol>${p.sub.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}
    </li>
  `).join('');

  App.render(`
    <div class="read-progress" id="read-progress"></div>
    <div class="read-layout">
      <aside class="read-toc">
        <div class="toc-title">Sommaire</div>
        <ul class="toc-list" id="toc-list"></ul>
      </aside>

      <article class="read-content" id="read-content">
        <div class="seq-head">
          <div class="seq-eyebrow">Séquence ${s.number}${s.inProgress ? ' · en cours' : ''}</div>
          <h1>${s.title}</h1>
          <div class="seq-meta">
            ${s.work ? `<span><b>Œuvre suivie :</b> ${s.work}</span>` : ''}
            <span><b>${s.notions.length}</b> notions</span>
            <span><b>${s.plan.length}</b> parties</span>
          </div>
        </div>

        <div class="encadre" style="margin-bottom: 32px;">
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

        ${s.content}

        <div class="seq-nav">
          ${prev ? `
          <a class="prev" href="#/sequence/${prev.id}">
            <span class="label">← Précédent · Séquence ${prev.number}</span>
            <span class="title">${prev.title}</span>
          </a>` : `<div></div>`}
          ${next ? `
          <a class="next" href="#/sequence/${next.id}">
            <span class="label">Séquence ${next.number} · Suivant →</span>
            <span class="title">${next.title}</span>
          </a>` : `<div></div>`}
        </div>
      </article>

      <aside class="read-aside">
        <div class="aside-card aside-progress">
          <div class="ac-title">Ta progression</div>
          <div style="font-size:13px;color:var(--text-dim);">Lecture de la fiche</div>
          <div class="progress-bar"><i id="ar-progress" style="width:0%"></i></div>
        </div>

        <div class="aside-card">
          <div class="ac-title">Notions clés</div>
          <ul>
            ${s.notions.map(n => {
              const slug = n.toLowerCase().replace(/[^a-z]+/g,'-').replace(/-+|-+$/g,'');
              return `<li><b>${n}</b></li>`;
            }).join('')}
          </ul>
        </div>

        <div class="aside-card">
          <div class="ac-title">Outils</div>
          <ul>
            <li><a href="#/quiz/${s.id}" style="color:var(--accent);">⚡ Faire le quiz</a></li>
            <li><a href="#/flashcards" style="color:var(--accent);">🃏 Flashcards</a></li>
            <li><a href="#/notions" style="color:var(--accent);">⊕ Notions liées</a></li>
          </ul>
        </div>
      </aside>
    </div>
  `);

  // Generate TOC from headings
  setTimeout(() => {
    const content = document.getElementById('read-content');
    const headings = content.querySelectorAll('h2, h3, h4');
    const toc = document.getElementById('toc-list');
    const items = [];
    headings.forEach((h, i) => {
      if (!h.id) h.id = 'h-' + i;
      const lvl = parseInt(h.tagName[1]);
      items.push({ id: h.id, text: h.textContent, lvl });
    });
    toc.innerHTML = items.map(it => `<li><a href="#${it.id}" class="lvl-${it.lvl}">${it.text}</a></li>`).join('');

    // Smooth scroll for TOC
    toc.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const tgt = document.querySelector(a.getAttribute('href'));
        if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Active TOC observer
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          toc.querySelectorAll('a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    headings.forEach(h => obs.observe(h));

    // Reading progress
    const progressBar = document.getElementById('read-progress');
    const arProgress = document.getElementById('ar-progress');
    const updateProgress = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0;
      if (progressBar) progressBar.style.width = pct + '%';
      if (arProgress) arProgress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Iceberg interactivity (séquence 1)
    const iceberg = document.getElementById('iceberg-widget');
    if (iceberg) {
      iceberg.querySelectorAll('.tag-right').forEach(t => {
        t.addEventListener('click', () => {
          const tip = t.dataset.tip;
          if (tip) alert(t.textContent + ' — ' + tip);
        });
      });
    }
  }, 50);
};
