// =========================================================
// Philo·Révisions — boot
// =========================================================
(function () {
  function boot() {
    if (window.App && typeof window.App.init === 'function') {
      window.App.init();
    } else {
      var loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
      var app = document.getElementById('app');
      if (app) {
        app.innerHTML = '<div style="padding:60px 28px;text-align:center;color:#e08aa8;">'
          + 'Erreur : impossible de charger l\'application.</div>';
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
