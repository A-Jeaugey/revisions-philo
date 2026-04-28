// =========================================================
// Philo·Révisions — entry point
// Loads sub-modules then boots App.init
// =========================================================
(function() {
  const scripts = [
    './js/app-core.js',
    './js/app-views.js',
    './js/app-reader.js',
    './js/app-quiz.js'
  ];

  let i = 0;
  function next() {
    if (i >= scripts.length) {
      // Boot
      if (window.App) window.App.init();
      else {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('app').innerHTML = '<div style="padding:60px 28px;text-align:center;color:#e08aa8;">Erreur : impossible de charger l\'application.</div>';
      }
      return;
    }
    const s = document.createElement('script');
    s.src = scripts[i++];
    s.onload = next;
    s.onerror = () => {
      console.error('Failed to load', s.src);
      next();
    };
    document.head.appendChild(s);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', next);
  } else {
    next();
  }
})();
