// =========================================================
// Philo·Révisions — Core (router, theme, utils, search)
// =========================================================
window.App = {
  routes: {},
  currentRoute: null,

  init() {
    this.data.build();
    this.theme.init();
    this.search.init();
    this.menu.init();
    this.scroll.init();
    this.timeTracker.init();
    this.pomodoro.init();
    this.router.init();

    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
      setTimeout(() => loader && loader.remove(), 600);
    }, 300);
  },

  _lastHash: null,
  render(html) {
    const app = document.getElementById('app');
    app.innerHTML = html;
    // Ne remonter en haut que si on change réellement de page.
    // Sinon (re-render interne d'une même vue : flashcard suivante,
    // question de quiz, etc.), on garde la position de scroll.
    const cur = window.location.hash || '#/';
    if (this._lastHash !== cur) {
      window.scrollTo({ top: 0 });
      this._lastHash = cur;
    }
  },

  // -------- DATA INDEX --------
  // Construit les listes filtrées : on ne garde que les entrées
  // qui apparaissent réellement dans le contenu des séquences.
  data: {
    philosophers: [],
    notions: [],
    glossary: [],
    _corpus: '',
    has(needle) {
      const q = (needle || '').toLowerCase().trim();
      if (!q) return false;
      return this._corpus.includes(q);
    },
    build() {
      // Concatène le contenu brut des séquences, dépouillé du HTML.
      const raw = (window.SEQUENCES || []).map(s => (s.content || '')).join(' ');
      this._corpus = ' ' + raw.replace(/<[^>]+>/g, ' ').toLowerCase() + ' ';

      // Philosophes : on garde celui dont le nom complet, le nom de
      // famille ou l'id apparaît dans le corpus.
      this.philosophers = (window.PHILOSOPHERS || []).filter(p => {
        const last = (p.name || '').split(/[\s.]+/).filter(Boolean).slice(-1)[0] || '';
        return this.has(p.name) || this.has(last) || this.has(p.id);
      });

      // Notions : nom direct.
      this.notions = (window.NOTIONS || []).filter(n => this.has(n.name));

      // Glossaire : terme direct.
      this.glossary = (window.GLOSSARY || []).filter(g => this.has(g.term));
    }
  },

  // -------- THEME --------
  theme: {
    init() {
      const saved = localStorage.getItem('philo-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', saved);
      document.getElementById('theme-btn').addEventListener('click', () => this.toggle());
      document.addEventListener('keydown', (e) => {
        if (e.key === 't' && !e.target.matches('input, textarea')) this.toggle();
      });
    },
    toggle() {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('philo-theme', next);
    }
  },

  // -------- MENU --------
  menu: {
    init() {
      document.getElementById('menu-btn').addEventListener('click', () => {
        document.querySelector('.topnav').classList.toggle('open');
      });
    }
  },

  // -------- SCROLL --------
  scroll: {
    init() {
      const btn = document.createElement('button');
      btn.className = 'to-top';
      btn.setAttribute('aria-label', 'Retour en haut');
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      document.body.appendChild(btn);
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
      }, { passive: true });
    }
  },

  // -------- ROUTER --------
  router: {
    init() {
      window.addEventListener('hashchange', () => this.handle());
      this.handle();
    },
    handle() {
      // Toute navigation arrête le compteur de temps en cours.
      // Les routes qui veulent en démarrer un (séquence) le feront à la main.
      App.timeTracker.stop();

      const hash = window.location.hash.replace(/^#/, '') || '/';
      const parts = hash.split('/').filter(Boolean);
      const root = parts[0] || 'home';

      // active link
      document.querySelectorAll('.nav-link').forEach(a => {
        const target = a.getAttribute('data-route').replace(/^\//, '') || 'home';
        a.classList.toggle('active', target === root || (root === '' && target === 'home'));
      });
      document.querySelector('.topnav').classList.remove('open');

      const handler = App.routes[root] || App.routes.home;
      handler(parts.slice(1));
    }
  },

  // -------- SEARCH --------
  search: {
    activeIdx: 0,
    items: [],
    init() {
      const modal = document.getElementById('search-modal');
      const input = document.getElementById('search-input');
      const btn = document.getElementById('search-btn');

      const open = () => {
        modal.hidden = false;
        setTimeout(() => input.focus(), 50);
        this.update('');
      };
      const close = () => { modal.hidden = true; input.value=''; };

      btn.addEventListener('click', open);
      modal.querySelector('[data-close]').addEventListener('click', close);
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
        if (e.key === 'Escape') close();
        if (!modal.hidden) {
          if (e.key === 'ArrowDown') { e.preventDefault(); this.move(1); }
          if (e.key === 'ArrowUp') { e.preventDefault(); this.move(-1); }
          if (e.key === 'Enter') {
            e.preventDefault();
            const item = this.items[this.activeIdx];
            if (item) { window.location.hash = item.href; close(); }
          }
        }
      });
      input.addEventListener('input', e => this.update(e.target.value));
    },
    move(dir) {
      this.activeIdx = Math.max(0, Math.min(this.items.length - 1, this.activeIdx + dir));
      this.render();
    },
    update(q) {
      this.activeIdx = 0;
      const items = [];
      const Q = q.toLowerCase().trim();

      window.SEQUENCES.forEach(s => {
        if (!Q || s.title.toLowerCase().includes(Q) || s.short.toLowerCase().includes(Q)) {
          items.push({ kind: 'Séquence ' + s.number, title: s.title, snippet: s.short, href: '/sequence/' + s.id });
        }
      });
      App.data.philosophers.forEach(p => {
        if (!Q || p.name.toLowerCase().includes(Q) || (p.thesis||'').toLowerCase().includes(Q)) {
          items.push({ kind: 'Philosophe', title: p.name, snippet: p.thesis, href: '/philosophes/' + p.id });
        }
      });
      App.data.notions.forEach(n => {
        if (!Q || n.name.toLowerCase().includes(Q) || n.short.toLowerCase().includes(Q)) {
          items.push({ kind: 'Notion', title: n.name, snippet: n.short, href: '/notions/' + n.id });
        }
      });
      App.data.glossary.forEach(g => {
        if (Q && (g.term.toLowerCase().includes(Q) || g.def.toLowerCase().includes(Q))) {
          items.push({ kind: 'Glossaire', title: g.term, snippet: g.def, href: '/glossaire' });
        }
      });

      this.items = items.slice(0, 30);
      this.render();
    },
    render() {
      const box = document.getElementById('search-results');
      if (!this.items.length) {
        box.innerHTML = '<div style="padding:30px;text-align:center;color:var(--text-mute);">Aucun résultat</div>';
        return;
      }
      box.innerHTML = this.items.map((it, i) => `
        <a href="#${it.href}" class="search-result ${i===this.activeIdx?'is-active':''}" data-idx="${i}">
          <div class="sr-kind">${it.kind}</div>
          <div class="sr-title">${it.title}</div>
          <div class="sr-snippet">${(it.snippet||'').slice(0,140)}</div>
        </a>
      `).join('');
      box.querySelectorAll('.search-result').forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.activeIdx = +el.dataset.idx; this.render();
        });
        el.addEventListener('click', () => {
          document.getElementById('search-modal').hidden = true;
        });
      });
    }
  },

  // -------- TIME TRACKER (par séquence) --------
  // Compte le temps passé sur chaque page de séquence. Pause auto
  // quand l'onglet est masqué. Persiste en localStorage.
  timeTracker: {
    key: 'cogito-time',
    active: null,    // { id }
    _resume: null,   // timestamp de la dernière reprise

    init() {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this._flush();
        else if (this.active) this._resume = Date.now();
      });
      window.addEventListener('beforeunload', () => this._flush());
    },

    _all() {
      try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
      catch { return {}; }
    },
    _save(t) { localStorage.setItem(this.key, JSON.stringify(t)); },

    _flush() {
      if (!this.active || !this._resume) return;
      const t = this._all();
      t[this.active.id] = (t[this.active.id] || 0) + (Date.now() - this._resume);
      this._save(t);
      this._resume = null;
    },

    start(id) {
      this.stop();
      this.active = { id };
      this._resume = Date.now();
    },

    stop() {
      this._flush();
      this.active = null;
    },

    total(id) { return this._all()[id] || 0; },

    format(ms) {
      if (!ms || ms < 30000) return null;
      const min = Math.floor(ms / 60000);
      if (min < 60) return min + ' min';
      const h = Math.floor(min / 60);
      const m = min % 60;
      return h + 'h' + (m ? ' ' + m + 'm' : '');
    }
  },

  // -------- POMODORO --------
  pomodoro: {
    key: 'cogito-pomo',
    state: 'idle',     // 'idle' | 'running' | 'paused'
    phase: 'focus',    // 'focus' | 'break'
    cycle: 1,
    remaining: 25 * 60,
    endAt: 0,
    open: false,
    tickId: null,

    config: {
      preset: '25/5',
      focus: 25 * 60,
      brk:   5  * 60,
    },

    init() {
      this._restore();
      this._build();
      this._wire();
      this._render();
    },

    _restore() {
      try {
        const s = JSON.parse(localStorage.getItem(this.key));
        if (s && s.config) {
          this.config = s.config;
          this.phase = s.phase || 'focus';
          this.cycle = s.cycle || 1;
          this.remaining = s.remaining || this.config.focus;
        } else {
          this.remaining = this.config.focus;
        }
      } catch { this.remaining = this.config.focus; }
    },

    _save() {
      localStorage.setItem(this.key, JSON.stringify({
        config: this.config,
        phase: this.phase,
        cycle: this.cycle,
        remaining: this.remaining
      }));
    },

    _build() {
      const root = document.createElement('div');
      root.className = 'pomo';
      root.innerHTML = `
        <button class="pomo-mini" id="pomo-mini" aria-label="Pomodoro">
          <span class="pomo-mini-dot"></span>
          <span class="pomo-mini-label">Pomodoro</span>
        </button>
        <div class="pomo-card" id="pomo-card" hidden>
          <div class="pomo-head">
            <span class="pomo-phase" id="pomo-phase" data-phase="focus">Focus</span>
            <button class="pomo-close" id="pomo-close" aria-label="Fermer">×</button>
          </div>
          <div class="pomo-time" id="pomo-time">25:00</div>
          <div class="pomo-cycle" id="pomo-cycle">Cycle 1</div>
          <div class="pomo-controls">
            <button class="pomo-btn pomo-primary" id="pomo-start">Démarrer</button>
            <button class="pomo-btn" id="pomo-reset">Reset</button>
          </div>
          <div class="pomo-presets" id="pomo-presets">
            <button class="pomo-preset" data-preset="25/5">25 / 5</button>
            <button class="pomo-preset" data-preset="50/10">50 / 10</button>
            <button class="pomo-preset" data-preset="15/3">15 / 3</button>
          </div>
        </div>
      `;
      document.body.appendChild(root);
      this.$ = {
        mini: document.getElementById('pomo-mini'),
        card: document.getElementById('pomo-card'),
        time: document.getElementById('pomo-time'),
        phase: document.getElementById('pomo-phase'),
        cycle: document.getElementById('pomo-cycle'),
        start: document.getElementById('pomo-start'),
        reset: document.getElementById('pomo-reset'),
        miniLabel: root.querySelector('.pomo-mini-label'),
        presets: root.querySelectorAll('.pomo-preset'),
      };
    },

    _wire() {
      this.$.mini.addEventListener('click', () => { this.open = !this.open; this._render(); });
      document.getElementById('pomo-close').addEventListener('click', () => { this.open = false; this._render(); });
      this.$.start.addEventListener('click', () => this._toggleRun());
      this.$.reset.addEventListener('click', () => this._reset());
      this.$.presets.forEach(b => b.addEventListener('click', () => this._setPreset(b.dataset.preset)));
      // Esc pour fermer
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.open && !document.getElementById('search-modal').hidden === false) {
          this.open = false; this._render();
        }
      });
    },

    _setPreset(p) {
      const map = {
        '25/5': { focus: 25*60, brk: 5*60  },
        '50/10':{ focus: 50*60, brk: 10*60 },
        '15/3': { focus: 15*60, brk: 3*60  },
      };
      const cfg = map[p]; if (!cfg) return;
      this.config = { preset: p, ...cfg };
      this._reset();
    },

    _toggleRun() {
      if (this.state === 'running') this._pause();
      else this._run();
    },

    _run() {
      this.state = 'running';
      this.endAt = Date.now() + this.remaining * 1000;
      clearInterval(this.tickId);
      this.tickId = setInterval(() => this._tick(), 250);
      this._render();
      this._save();
    },

    _pause() {
      if (this.state !== 'running') return;
      this.remaining = Math.max(0, Math.round((this.endAt - Date.now()) / 1000));
      this.state = 'paused';
      clearInterval(this.tickId); this.tickId = null;
      this._render();
      this._save();
    },

    _reset() {
      clearInterval(this.tickId); this.tickId = null;
      this.state = 'idle';
      this.phase = 'focus';
      this.cycle = 1;
      this.remaining = this.config.focus;
      this._render();
      this._save();
    },

    _tick() {
      this.remaining = Math.max(0, Math.round((this.endAt - Date.now()) / 1000));
      if (this.remaining <= 0) this._advance();
      this._render();
    },

    _advance() {
      // Fin de phase. On passe à la suivante.
      if (this.phase === 'focus') {
        this.phase = 'break';
        this.remaining = this.config.brk;
      } else {
        this.phase = 'focus';
        this.cycle++;
        this.remaining = this.config.focus;
      }
      this.endAt = Date.now() + this.remaining * 1000;
      this._notify();
      this._save();
    },

    _notify() {
      // Flash visuel + (optionnel) titre
      document.body.classList.add('pomo-flash');
      setTimeout(() => document.body.classList.remove('pomo-flash'), 1400);
      const original = document.title;
      const msg = this.phase === 'focus' ? '◉ Au boulot' : '☕ Pause';
      document.title = msg + ' — ' + original.replace(/^[◉☕]\s.+—\s/, '');
      setTimeout(() => { document.title = original; }, 6000);
    },

    _fmt(s) {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return m.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    },

    _render() {
      const $ = this.$; if (!$) return;
      $.card.hidden = !this.open;
      $.mini.classList.toggle('open', this.open);
      $.mini.classList.toggle('running', this.state === 'running');
      $.mini.classList.toggle('break', this.phase === 'break');
      $.miniLabel.textContent = (this.state === 'idle') ? 'Pomodoro' : this._fmt(this.remaining);
      $.time.textContent = this._fmt(this.remaining);
      $.phase.textContent = this.phase === 'focus' ? 'Focus' : 'Pause';
      $.phase.dataset.phase = this.phase;
      $.cycle.textContent = 'Cycle ' + this.cycle;
      $.start.textContent = (this.state === 'running') ? 'Pause' : 'Démarrer';
      $.start.classList.toggle('pomo-primary', this.state !== 'running');
      $.presets.forEach(b => b.classList.toggle('active', b.dataset.preset === this.config.preset));
    }
  },

  // -------- UTILS --------
  utils: {
    h(strings, ...vals) {
      return strings.map((s, i) => s + (vals[i] !== undefined ? vals[i] : '')).join('');
    },
    slug(t) { return (t||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); },
    progressKey: 'philo-progress',
    getProgress() {
      try { return JSON.parse(localStorage.getItem(this.progressKey)) || {}; }
      catch { return {}; }
    },
    setProgress(key, val) {
      const p = this.getProgress();
      p[key] = val;
      localStorage.setItem(this.progressKey, JSON.stringify(p));
    }
  }
};
