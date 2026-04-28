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

        <div id="md-content">${s.mdFile ? '<div class="md-loading">Chargement…</div>' : s.content}</div>

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

  const finalize = () => {
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

    // Reading progress (aside card only)
    const arProgress = document.getElementById('ar-progress');
    const updateProgress = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0;
      if (arProgress) arProgress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Iceberg interactivity (séquence 1) — toggle inline tooltip
    const iceberg = document.getElementById('iceberg-widget');
    if (iceberg) {
      const tags = iceberg.querySelectorAll('.tag-right');
      tags.forEach(t => {
        if (t.dataset.tip && !t.querySelector('.tag-tip')) {
          const tip = document.createElement('span');
          tip.className = 'tag-tip';
          tip.textContent = t.dataset.tip;
          t.appendChild(tip);
        }
        t.addEventListener('click', (e) => {
          e.stopPropagation();
          const wasOpen = t.classList.contains('open');
          tags.forEach(x => x.classList.remove('open'));
          if (!wasOpen) t.classList.add('open');
        });
      });
      document.addEventListener('click', () => {
        tags.forEach(x => x.classList.remove('open'));
      });
    }
  };

  if (s.mdFile && window.App && App.md) {
    fetch(s.mdFile)
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(text => {
        const html = App.md.parse(text);
        const slot = document.getElementById('md-content');
        if (slot) slot.innerHTML = html;
        // sequence-specific widget injections (the iceberg lives in seq 1)
        if (s.id === 1) injectIcebergWidget();
        finalize();
      })
      .catch(err => {
        const slot = document.getElementById('md-content');
        if (slot) slot.innerHTML = '<div class="callout warn"><div class="callout-title">Impossible de charger la fiche</div><p>' + (err.message || err) + '</p><p style="font-size:13px;color:var(--text-dim)">Vérifie que le site est servi en HTTP (par ex. <code>python3 -m http.server</code>) — les <code>fetch()</code> ne fonctionnent pas via <code>file://</code>.</p></div>';
        finalize();
      });
  } else {
    setTimeout(finalize, 50);
  }
};

// Inject the interactive iceberg widget right after the schema placeholder
// in sequence 1 (Freud topiques).
function injectIcebergWidget() {
  const slot = document.getElementById('md-content');
  if (!slot) return;
  const figs = slot.querySelectorAll('.md-fig.md-schema');
  for (const fig of figs) {
    const cap = fig.textContent.toLowerCase();
    if (cap.includes('iceberg')) {
      const wrap = document.createElement('div');
      wrap.className = 'iceberg';
      wrap.id = 'iceberg-widget';
      wrap.innerHTML = `
        <div class="water-line"></div>
        <div class="water-label">SURFACE DE L'EAU</div>
        <div class="ib-zone conscience">
          <div class="lvl">Conscience</div>
          <div class="desc">Ce dont je me rends compte ici et maintenant</div>
        </div>
        <div class="ib-zone preconscient">
          <div class="lvl">Préconscient</div>
          <div class="desc">Souvenirs, automatismes accessibles</div>
        </div>
        <div class="ib-zone inconscient">
          <div class="lvl">Inconscient</div>
          <div class="desc">Désirs refoulés, pulsions, traumatismes</div>
        </div>
        <div class="tag-right moi" data-tip="Partie consciente ou préconsciente de l'esprit">MOI</div>
        <div class="tag-right surmoi" data-tip="Instance morale, refoulement">SURMOI</div>
        <div class="tag-right ca" data-tip="Pôle pulsionnel : Éros + Thanatos">ÇA</div>`;
      fig.replaceWith(wrap);
      break;
    }
  }
}
