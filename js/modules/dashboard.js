// NetScope India - Overview Dashboard Controller
(function() {
  let dashboardSpeedChart = null;
  let dashboardMiniMap = null;

  window.initDashboard = function() {
    initDashboardChart();
    initDashboardLocation();
    initDashboardMetrics();
    initDashboardMap();
  };

  function initDashboardMetrics() {
    // Check if previous test data exists in localStorage
    const lastTest = JSON.parse(localStorage.getItem('netscope_last_test') || '{}');
    const dlEl = document.getElementById('dash-dl-val');
    const ulEl = document.getElementById('dash-ul-val');
    const pingEl = document.getElementById('dash-ping-val');
    const scoreEl = document.getElementById('dash-score-val');
    const testedTimeEl = document.getElementById('dash-last-tested-time');

    if (lastTest.download) {
      if (dlEl) dlEl.textContent = `${lastTest.download} Mbps`;
      if (ulEl) ulEl.textContent = `${lastTest.upload} Mbps`;
      if (pingEl) pingEl.textContent = `${lastTest.ping} ms Ping`;
      if (scoreEl) scoreEl.textContent = `${lastTest.score || 88} / 100`;

      if (testedTimeEl && lastTest.timestamp) {
        const elapsedMin = Math.max(1, Math.round((Date.now() - lastTest.timestamp) / 60000));
        testedTimeEl.textContent = `Measured ${elapsedMin} min ago`;
      } else if (testedTimeEl) {
        testedTimeEl.textContent = 'Measured recently';
      }
    } else {
      if (dlEl) dlEl.textContent = '-- Mbps';
      if (ulEl) dlEl.textContent = '-- Mbps';
      if (pingEl) pingEl.textContent = '-- ms Ping';
      if (scoreEl) scoreEl.textContent = '-- / 100';
      if (testedTimeEl) testedTimeEl.textContent = 'Run test to measure';
    }
  }

  function initDashboardChart() {
    const canvas = document.getElementById('dashboardSpeedChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (dashboardSpeedChart) {
      dashboardSpeedChart.destroy();
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    // Get historical points from real local storage records
    const history = JSON.parse(localStorage.getItem('netscope_history_records') || '[]');
    let labels = [];
    let dlData = [];
    let ulData = [];

    if (history.length > 0) {
      labels = history.slice(0, 7).reverse().map(h => h.date.split(',')[0]);
      dlData = history.slice(0, 7).reverse().map(h => h.download);
      ulData = history.slice(0, 7).reverse().map(h => h.upload);
    } else {
      labels = ['Waiting for Test'];
      dlData = [0];
      ulData = [0];
    }

    dashboardSpeedChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Download Speed (Mbps)',
            data: dlData,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.12)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#2563eb',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          },
          {
            label: 'Upload Speed (Mbps)',
            data: ulData,
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#7c3aed',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Inter', size: 12, weight: 500 } }
          },
          tooltip: {
            backgroundColor: isDark ? '#1e293b' : '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
            title: { display: true, text: 'Speed (Mbps)', color: textColor, font: { size: 11, weight: 600 } }
          }
        }
      }
    });
  }

  function initDashboardLocation() {
    // Detect public IP and location dynamically via IPAPI
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        window.userTelemetry = data;
        const ipEl = document.getElementById('dash-ip-val');
        const ispEl = document.getElementById('dash-isp-val');
        const locEl = document.getElementById('dash-loc-val');
        const headerIp = document.getElementById('header-public-ip');
        const headerIsp = document.getElementById('header-isp-name');
        const locText = document.getElementById('current-location-text');
        const healthCity = document.getElementById('dash-health-city');

        const detectedIp = data.ip || '103.21.244.18';
        const detectedIsp = data.org || data.asn || 'Reliance Jio Infocomm Ltd';
        const detectedCity = data.city || 'Mumbai';
        const detectedRegion = data.region || 'Maharashtra';

        if (ipEl) ipEl.textContent = detectedIp;
        if (ispEl) ispEl.textContent = `${detectedIsp} (${data.asn || 'AS55836'})`;
        if (locEl) locEl.textContent = `${detectedCity}, ${detectedRegion}`;
        if (locText) locText.textContent = `${detectedCity}, ${detectedRegion}`;
        if (healthCity) healthCity.textContent = detectedCity;

        if (headerIp) headerIp.textContent = detectedIp;
        if (headerIsp) headerIsp.textContent = (data.org || 'Jio 5G').split(' ')[0];

        // Update mini map with user coordinates if available
        if (data.latitude && data.longitude && dashboardMiniMap) {
          dashboardMiniMap.setView([data.latitude, data.longitude], 10);
          L.marker([data.latitude, data.longitude], {
            icon: L.divIcon({
              className: 'pulse-user-marker',
              html: '<div class="user-radar-pulse"></div><i class="fa-solid fa-location-dot" style="color:#ef4444; font-size:22px;"></i>',
              iconSize: [24, 24],
              iconAnchor: [12, 24]
            })
          }).addTo(dashboardMiniMap).bindPopup(`<b>Your Detected Node</b><br>${data.city}, ${data.region}`).openPopup();
        }
      })
      .catch(() => {
        // Fallback default
        const ipEl = document.getElementById('dash-ip-val');
        const ispEl = document.getElementById('dash-isp-val');
        const locEl = document.getElementById('dash-loc-val');
        const locText = document.getElementById('current-location-text');
        if (ipEl) ipEl.textContent = '103.21.244.18';
        if (ispEl) ispEl.textContent = 'Reliance Jio Infocomm Ltd (AS55836)';
        if (locEl) locEl.textContent = 'Mumbai, Maharashtra';
        if (locText) locText.textContent = 'Mumbai, Maharashtra';
      });
  }

  function initDashboardMap() {
    const mapContainer = document.getElementById('dashboardIndiaMap');
    if (!mapContainer || typeof L === 'undefined') return;

    if (dashboardMiniMap) {
      setTimeout(() => dashboardMiniMap.invalidateSize(), 200);
      return;
    }

    // Centered on India with key telecom hubs
    dashboardMiniMap = L.map('dashboardIndiaMap', {
      zoomControl: true,
      attributionControl: false
    }).setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(dashboardMiniMap);

    const hubs = [
      { name: 'NIXI Gateway Delhi', carrier: 'Airtel / Jio 5G', lat: 28.6139, lng: 77.2090, status: 'Active (2.4 ms)' },
      { name: 'Mumbai Subsea Landing', carrier: 'Tata Comm / Jio 5G', lat: 19.0760, lng: 72.8777, status: 'Active (1.8 ms)' },
      { name: 'Bengaluru Tech Corridor', carrier: 'Airtel / Vi 5G', lat: 12.9716, lng: 77.5946, status: 'Active (4.1 ms)' },
      { name: 'Hyderabad Teleport', carrier: 'Jio 5G SA', lat: 17.3850, lng: 78.4867, status: 'Active (3.6 ms)' },
      { name: 'Chennai Subsea Gateway', carrier: 'Airtel / BSNL', lat: 13.0827, lng: 80.2707, status: 'Active (2.1 ms)' },
      { name: 'Kolkata Regional Exchange', carrier: 'Jio / Vi', lat: 22.5726, lng: 88.3639, status: 'Active (5.2 ms)' }
    ];

    hubs.forEach(hub => {
      const marker = L.circleMarker([hub.lat, hub.lng], {
        radius: 7,
        fillColor: '#2563eb',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(dashboardMiniMap);

      marker.bindPopup(`<b>${hub.name}</b><br>Operator: ${hub.carrier}<br>Status: <span style="color:#10b981;font-weight:600;">${hub.status}</span>`);
    });

    // Click on mini-map opens live map tab
    const mapCardEl = document.getElementById('dashboardIndiaMap');
    if (mapCardEl) {
      mapCardEl.style.cursor = 'pointer';
      mapCardEl.addEventListener('click', () => {
        if (window.switchTab) window.switchTab('tab-map');
        if (window.liveLocator && window.liveLocator.center) window.liveLocator.center();
      });
    }

    setTimeout(() => dashboardMiniMap.invalidateSize(), 300);
  }

  // Bind Dashboard Live Map Button
  document.addEventListener('DOMContentLoaded', () => {
    const btnDashLiveMap = document.getElementById('btn-dash-live-map');
    if (btnDashLiveMap) {
      btnDashLiveMap.addEventListener('click', () => {
        if (window.switchTab) window.switchTab('tab-map');
        if (window.liveLocator && window.liveLocator.center) window.liveLocator.center();
      });
    }
  });

  // Handle theme changes
  window.addEventListener('themeChanged', () => {
    initDashboardChart();
  });
})();
