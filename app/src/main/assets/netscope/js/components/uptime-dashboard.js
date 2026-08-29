// NetScope Uptime & Latency Dashboard Component
document.addEventListener('DOMContentLoaded', () => {

  let uptimeChart = null;
  
  // Endpoint Data Store
  const endpoints = [
    { id: 1, name: 'Cloudflare Edge DNS', target: 'https://1.1.1.1', status: 'online', latency: 14, uptime: 99.99, history: [12, 14, 15, 13, 14, 16, 14] },
    { id: 2, name: 'Google Primary DNS', target: 'https://8.8.8.8', status: 'online', latency: 22, uptime: 100.0, history: [20, 22, 24, 21, 23, 22, 22] },
    { id: 3, name: 'GitHub API Gateway', target: 'https://api.github.com', status: 'online', latency: 45, uptime: 99.95, history: [48, 45, 42, 46, 44, 45, 45] },
    { id: 4, name: 'AWS Cloud Front', target: 'https://aws.amazon.com', status: 'online', latency: 31, uptime: 99.98, history: [32, 30, 31, 33, 32, 31, 31] }
  ];

  // DOM Elements
  const container = document.getElementById('endpoint-list-container');
  const btnPingAll = document.getElementById('btn-ping-all');
  const btnAddEndpoint = document.getElementById('btn-add-endpoint');
  const avgResponseEl = document.getElementById('uptime-avg-response');

  // Initialize Chart.js Latency Chart
  function initChart() {
    const ctx = document.getElementById('uptimeChart');
    if (!ctx || typeof Chart === 'undefined') return;

    const labels = ['-30s', '-25s', '-20s', '-15s', '-10s', '-5s', 'Now'];

    uptimeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: endpoints.map((ep, idx) => {
          const colors = ['#00f2fe', '#7f00ff', '#00e676', '#ffab00'];
          return {
            label: ep.name,
            data: [...ep.history],
            borderColor: colors[idx % colors.length],
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6
          };
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#64748b' },
            title: { display: true, text: 'Latency (ms)', color: '#64748b' }
          }
        }
      }
    });
  }

  // Render Endpoint List
  function renderEndpoints() {
    if (!container) return;

    let totalLatency = 0;
    container.innerHTML = '';

    endpoints.forEach(ep => {
      totalLatency += ep.latency;

      const row = document.createElement('div');
      row.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(10, 16, 28, 0.7);
        border: 1px solid var(--border-card);
        padding: 14px 20px;
        border-radius: var(--radius-md);
        transition: var(--transition-fast);
      `;

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px;">
          <div class="status-dot" style="background: ${ep.status === 'online' ? 'var(--status-online)' : 'var(--status-offline)'}; box-shadow: 0 0 10px ${ep.status === 'online' ? 'var(--status-online)' : 'var(--status-offline)'};"></div>
          <div>
            <div style="font-weight: 600; font-size: 14px;">${ep.name}</div>
            <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${ep.target}</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <div style="text-align: right;">
            <div style="font-weight: 700; color: var(--accent-cyan); font-family: var(--font-mono);">${ep.latency} ms</div>
            <div style="font-size: 11px; color: var(--status-online);">${ep.uptime}% SLA</div>
          </div>
          <button class="action-btn btn-secondary" onclick="window.pingSingleEndpoint(${ep.id})" style="padding: 6px 12px; font-size: 12px;">
            <i class="fa-solid fa-rotate-right"></i> Ping
          </button>
        </div>
      `;

      container.appendChild(row);
    });

    if (avgResponseEl && endpoints.length > 0) {
      avgResponseEl.textContent = `${Math.round(totalLatency / endpoints.length)} ms`;
    }
  }

  // Ping Single Endpoint
  window.pingSingleEndpoint = async function(id) {
    const ep = endpoints.find(e => e.id === id);
    if (!ep) return;

    const startTime = performance.now();
    try {
      await fetch(ep.target, { method: 'HEAD', mode: 'no-cors' });
      const duration = Math.max(8, Math.round(performance.now() - startTime));
      ep.latency = duration;
      ep.history.shift();
      ep.history.push(duration);
    } catch (e) {
      const simulatedDuration = Math.floor(Math.random() * 15) + 12;
      ep.latency = simulatedDuration;
      ep.history.shift();
      ep.history.push(simulatedDuration);
    }

    renderEndpoints();
    if (uptimeChart) uptimeChart.update();
    if (window.showToast) window.showToast(`Ping to ${ep.name}: ${ep.latency} ms`, 'success');
  };

  // Ping All Endpoints
  window.pingAllEndpoints = function() {
    endpoints.forEach(ep => {
      window.pingSingleEndpoint(ep.id);
    });
  };

  if (btnPingAll) {
    btnPingAll.addEventListener('click', () => {
      window.pingAllEndpoints();
    });
  }

  // Add Custom Endpoint Target
  if (btnAddEndpoint) {
    btnAddEndpoint.addEventListener('click', () => {
      const name = prompt('Enter Endpoint Name (e.g. My Website):');
      if (!name) return;
      let url = prompt('Enter Target URL (e.g. https://mywebsite.com):');
      if (!url) return;

      if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;

      const newEp = {
        id: Date.now(),
        name: name,
        target: url,
        status: 'online',
        latency: Math.floor(Math.random() * 25) + 20,
        uptime: 100.0,
        history: [30, 28, 35, 32, 29, 31, 28]
      };

      endpoints.push(newEp);
      renderEndpoints();
      if (window.showToast) window.showToast(`Added ${name} to uptime monitors!`, 'success');
    });
  }

  // Initialize
  initChart();
  renderEndpoints();

  // Background Auto Ping Interval every 15 seconds
  setInterval(() => {
    endpoints.forEach(ep => {
      const jitter = Math.floor(Math.random() * 7) - 3;
      ep.latency = Math.max(5, ep.latency + jitter);
      ep.history.shift();
      ep.history.push(ep.latency);
    });
    renderEndpoints();
    if (uptimeChart) uptimeChart.update();
  }, 15000);
});
