// =========================================================
// Philo·Révisions — Core (router, theme, utils, search)
// =========================================================
const App = {
  routes: {},
  currentRoute: null,

  init() {
    this.theme.init();
    this.search.init();
    this.menu.init();
    this.scroll.init();
    this.router.init();

    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
      setTimeout(() => loader && loader.remove(), 600);
    }, 300);
  },

  render(html) {
    const app = document.getElementById('app');
    app.innerHTML = html;
    window.scrollTo({ top: 0 });
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
      window.PHILOSOPHERS.forEach(p => {
        if (!Q || p.name.toLowerCase().includes(Q) || (p.thesis||'').toLowerCase().includes(Q)) {
          items.push({ kind: 'Philosophe', title: p.name, snippet: p.thesis, href: '/philosophes/' + p.id });
        }
      });
      window.NOTIONS.forEach(n => {
        if (!Q || n.name.toLowerCase().includes(Q) || n.short.toLowerCase().includes(Q)) {
          items.push({ kind: 'Notion', title: n.name, snippet: n.short, href: '/notions/' + n.id });
        }
      });
      window.GLOSSARY.forEach(g => {
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
