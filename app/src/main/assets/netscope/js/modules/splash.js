// NetScope India - Startup Splash Screen & Telemetry Engine Initialization
(function() {
  const splashEl = document.getElementById('app-splash-screen');
  const splashStatus = document.getElementById('splash-status-text');
  const splashProgress = document.getElementById('splash-progress-bar');

  if (!splashEl) return;

  const messages = [
    'Initializing NetScope India Telecom Telemetry...',
    'Calibrating NIXI & Submarine Gateway Endpoints...',
    'Fetching Live Carrier Benchmarks (Jio, Airtel, Vi, BSNL)...',
    'Starting AI Network Engine & Location Diagnostics...',
    'Ready!'
  ];

  let step = 0;
  const interval = setInterval(() => {
    step++;
    if (step < messages.length) {
      if (splashStatus) splashStatus.textContent = messages[step];
      if (splashProgress) splashProgress.style.width = `${(step / (messages.length - 1)) * 100}%`;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        splashEl.classList.add('splash-fade-out');
        setTimeout(() => {
          splashEl.style.display = 'none';
          document.body.classList.add('app-loaded');
          // Trigger dashboard map and telemetry initialization
          if (window.initDashboard) window.initDashboard();
        }, 500);
      }, 300);
    }
  }, 350);
})();
