// =========================================================
// Sequence reader — TOC, progress, navigation
// =========================================================

App.routes.sequence = function(parts) {
  const id = parseInt(parts[0]);
  const s = window.SEQUENCES.find(x => x.id === id);
  if (!s) return App.routes.sequences();

  // Démarre le compteur de temps pour cette séquence
  App.timeTracker.start(s.id);

  const prev = window.SEQUENCES.find(x => x.id === s.id - 1);
  const next = window.SEQUENCES.find(x => x.id === s.id + 1);

  const subLabel = (x) => {
    if (typeof x === 'string') return x;
    const auth = x.auteur ? ` (${x.auteur.toUpperCase()})` : '';
    return `${x.t || ''}${auth}`;
  };
  const planHtml = s.plan.map((p, i) => `
    <li>
      <strong>${p.t}</strong>
      ${p.sub && p.sub.length ? `<ol>${p.sub.map(x => `<li>${subLabel(x)}</li>`).join('')}</ol>` : ''}
    </li>
  `).join('');

  const hasExpress = s.plan.some(p =>
    Array.isArray(p.sub) && p.sub.some(it => it && typeof it === 'object' && (it.idee || it.apport))
  );
  const roman = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  const expressHtml = hasExpress ? `
    <section class="fiche-express">
      <div class="fx-eyebrow">§ Fiche express · réviser en un coup d'œil</div>
      <h2 class="fx-title">${s.title}</h2>
      ${s.plan.map((p, i) => `
        <article class="fx-part">
          <div class="fx-part-num">${roman[i] || (i+1)}</div>
          <div class="fx-part-body">
            <h3 class="fx-part-title">${p.t}</h3>
            ${p.enjeu ? `<p class="fx-why"><span class="fx-why-tag">Pourquoi ce moment</span> ${p.enjeu}</p>` : ''}
            <ul class="fx-list">
              ${(p.sub || []).map(it => {
                if (typeof it === 'string') return `<li class="fx-simple">${it}</li>`;
                return `
                  <li class="fx-item">
                    <div class="fx-head">
                      ${it.auteur ? `<span class="fx-auth">${it.auteur}</span>` : ''}
                      <span class="fx-thesis">${it.t || ''}</span>
                    </div>
                    ${it.idee ? `<p class="fx-idee">${it.idee}</p>` : ''}
                    ${it.apport ? `<p class="fx-apport"><span class="fx-apport-tag">Apport</span> ${it.apport}</p>` : ''}
                  </li>`;
              }).join('')}
            </ul>
          </div>
        </article>
      `).join('')}
    </section>
  ` : '';

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

        ${s.essentiel ? `
        <section class="essentiel">
          <div class="ess-eyebrow">§ En clair</div>
          <p class="ess-question">${s.essentiel.question}</p>
          <div class="ess-grid">
            <div class="ess-block">
              <div class="ess-label">Pourquoi ça compte</div>
              <p>${s.essentiel.enjeu}</p>
            </div>
            <div class="ess-block">
              <div class="ess-label">Le débat</div>
              <p>${s.essentiel.tension}</p>
            </div>
          </div>
          <div class="ess-warn">
            <div class="ess-label">À ne pas confondre</div>
            <ul>
              ${(s.essentiel.pieges||[]).map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
          <p class="ess-retenir"><b>À retenir.</b> ${s.essentiel.retenir}</p>
        </section>
        ` : ''}

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

        ${hasExpress ? `
        <section class="plan-section" data-mode="brief" id="plan-section">
          <div class="plan-toggle" role="tablist" aria-label="Format du plan">
            <span class="pt-thumb" aria-hidden="true"></span>
            <button class="pt-btn pt-active" data-mode="brief" role="tab" aria-selected="true">Plan</button>
            <button class="pt-btn" data-mode="detailed" role="tab" aria-selected="false">
              <span class="pt-spark" aria-hidden="true">✦</span> Fiche détaillée
            </button>
          </div>
          <div class="plan-views">
            <div class="plan-view plan-view-brief" role="tabpanel">
              <div class="plan-box">
                <div class="plan-title">Plan détaillé</div>
                <ol>${planHtml}</ol>
              </div>
            </div>
            <div class="plan-view plan-view-detailed" role="tabpanel" aria-hidden="true">
              ${expressHtml}
            </div>
          </div>
        </section>` : `
        <div class="plan-box">
          <div class="plan-title">Plan détaillé</div>
          <ol>${planHtml}</ol>
        </div>`}

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
          <div class="ac-time" id="ar-time" style="margin-top:14px;font-family:var(--font-mono);font-size:12px;letter-spacing:0.06em;color:var(--text-dim);"></div>
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

        <div class="aside-card">
          <div class="ac-title">Télécharger</div>
          <ul>
            <li><a href="./pdfs/seq-${s.id}-cours.pdf" download style="color:var(--accent);">📄 Cours complet · PDF</a></li>
            <li><a href="./pdfs/seq-${s.id}-fiche.pdf" download style="color:var(--accent);">📑 Fiche de révision · PDF</a></li>
          </ul>
        </div>

        <div class="aside-card">
          <div class="ac-title">Lien partageable</div>
          <p style="font-size:13px;color:var(--text-dim);margin:0 0 10px;">
            Version brute pour LLM, partage ou lecture sans JS.
          </p>
          <ul>
            <li><a href="./raw/sequence-${s.id}-${(s.slug||'').split('-')[0]}.md" style="color:var(--accent);">📝 Markdown brut</a></li>
            <li><a href="./raw/sequence-${s.id}-${(s.slug||'').split('-')[0]}.html" style="color:var(--accent);">🌐 HTML pré-rendu</a></li>
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

    // Reading progress (aside card only)
    const arProgress = document.getElementById('ar-progress');
    const updateProgress = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0;
      if (arProgress) arProgress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Affiche le temps cumulé sur cette séquence et le rafraîchit
    const arTime = document.getElementById('ar-time');
    const refreshTime = () => {
      if (!arTime) return;
      // total persisté + temps de la session courante
      let total = App.timeTracker.total(s.id);
      if (App.timeTracker.active && App.timeTracker.active.id === s.id && App.timeTracker._resume) {
        total += Date.now() - App.timeTracker._resume;
      }
      const fmt = App.timeTracker.format(total);
      arTime.textContent = fmt ? '⏱ Temps passé · ' + fmt : '⏱ Temps passé · démarrage…';
    };
    refreshTime();
    if (App._timeRefresh) clearInterval(App._timeRefresh);
    App._timeRefresh = setInterval(refreshTime, 30 * 1000);

    // Plan ↔ Fiche détaillée — toggle stylé
    const planSec = document.getElementById('plan-section');
    if (planSec) {
      const toggle = planSec.querySelector('.plan-toggle');
      const thumb = planSec.querySelector('.pt-thumb');
      const btns = planSec.querySelectorAll('.pt-btn');
      const panels = planSec.querySelectorAll('.plan-view');
      const positionThumb = () => {
        if (!thumb || !toggle) return;
        const active = planSec.querySelector('.pt-btn.pt-active');
        if (!active) return;
        thumb.style.width = active.offsetWidth + 'px';
        thumb.style.transform = `translateX(${active.offsetLeft}px)`;
      };
      const setMode = (mode) => {
        if (planSec.dataset.mode === mode) return;
        planSec.dataset.mode = mode;
        btns.forEach(b => {
          const active = b.dataset.mode === mode;
          b.classList.toggle('pt-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach(p => {
          const active = p.classList.contains('plan-view-' + mode);
          p.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        positionThumb();
        // Force re-trigger des animations en cascade côté détaillé
        if (mode === 'detailed') {
          const parts = planSec.querySelectorAll('.fx-part');
          parts.forEach(p => {
            p.classList.remove('fx-anim-in');
            void p.offsetWidth;
            p.classList.add('fx-anim-in');
          });
        }
      };
      btns.forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
      // Init du thumb (avec un léger délai pour laisser les fonts se charger)
      requestAnimationFrame(positionThumb);
      setTimeout(positionThumb, 250);
      window.addEventListener('resize', positionThumb, { passive: true });
    }

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
  }, 50);
};
