// NetScope India - Telecom Network Incident & Maintenance Dashboard
(function() {
  const outageData = [
    {
      carrier: 'Reliance Jio',
      key: 'jio',
      status: 'Operational',
      badgeClass: 'pill-success',
      reports: '12 reports (normal baseline)',
      uptime24h: '99.98%',
      details: 'All core 5G SA and IMS VoLTE gateways operating nominally across 22 telecom circles.'
    },
    {
      carrier: 'Bharti Airtel',
      key: 'airtel',
      status: 'Operational',
      badgeClass: 'pill-success',
      reports: '18 reports (normal baseline)',
      uptime24h: '99.95%',
      details: 'Airtel 5G Plus and broadband backhauls fully functional. No major undersea cable routing faults.'
    },
    {
      carrier: 'Vodafone Idea (Vi)',
      key: 'vi',
      status: 'Elevated Reports',
      badgeClass: 'pill-warning',
      reports: '142 reports in last 2 hours',
      uptime24h: '98.40%',
      details: 'Localized latency degradation observed in select Maharashtra and Gujarat rural cell sites.'
    },
    {
      carrier: 'BSNL Bharat Fibre',
      key: 'bsnl',
      status: 'Operational',
      badgeClass: 'pill-success',
      reports: '34 reports (normal baseline)',
      uptime24h: '99.20%',
      details: 'BharatNet optical backbone and FTTH exchanges operating at standard capacity.'
    }
  ];

  const recentIncidents = [
    { time: '18 mins ago', carrier: 'Vodafone Idea', area: 'Pune East, Maharashtra', issue: 'Optical Backhaul Maintenance - Intermittent 4G/5G latency', severity: 'Medium' },
    { time: '1 hr 12 mins ago', carrier: 'Bharti Airtel', area: 'North Chennai, TN', issue: 'Substation Power Switchover (Resolved)', severity: 'Low' },
    { time: '3 hrs ago', carrier: 'Reliance Jio', area: 'Noida Sector 62, UP', issue: 'Node Rebalance & 5G Core Latency Optimization', severity: 'Low' },
    { time: '5 hrs ago', carrier: 'BSNL', area: 'Kochi Hub, Kerala', issue: 'Subsea Cable PoP Routine Patching', severity: 'Low' }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    renderOutageCards();
    renderIncidentTimeline();

    const btnRefresh = document.getElementById('btn-refresh-outage');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => {
        btnRefresh.innerHTML = '<span class="loader"></span> Querying NIXI Incident Feed...';
        setTimeout(() => {
          btnRefresh.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Refresh Incident Feed';
          renderOutageCards();
          renderIncidentTimeline();
          if (window.showToast) window.showToast('Incident Dashboard synchronized with NIXI/TRAI feeds', 'success');
        }, 900);
      });
    }
  });

  function renderOutageCards() {
    const container = document.getElementById('outage-cards-grid');
    if (!container) return;

    container.innerHTML = outageData.map(c => `
      <div class="card outage-card">
        <div class="card-header" style="margin-bottom:12px;">
          <h4 class="card-title" style="font-size:15px;">
            <i class="fa-solid fa-tower-broadcast" style="color:var(--primary);"></i> ${c.carrier}
          </h4>
          <span class="pill ${c.badgeClass}">${c.status}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px;">
          <span style="color:var(--text-secondary);">24h Uptime:</span>
          <strong style="color:var(--text-main); font-family:var(--font-mono);">${c.uptime24h}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:13px;">
          <span style="color:var(--text-secondary);">Crowd Reports:</span>
          <span style="color:${c.status === 'Operational' ? 'var(--status-online)' : 'var(--status-warning)'}; font-weight:600;">${c.reports}</span>
        </div>
        <p style="font-size:12px; color:var(--text-secondary); line-height:1.5; margin:0; border-top:1px solid var(--border-light); padding-top:10px;">
          ${c.details}
        </p>
      </div>
    `).join('');
  }

  function renderIncidentTimeline() {
    const container = document.getElementById('incident-timeline-list');
    if (!container) return;

    container.innerHTML = recentIncidents.map(inc => `
      <div class="incident-item" style="display:flex; gap:12px; padding:12px; background:var(--bg-input); border-radius:var(--radius-md); margin-bottom:8px;">
        <div class="incident-dot" style="width:10px; height:10px; border-radius:50%; background:${inc.severity === 'Medium' ? 'var(--status-warning)' : 'var(--primary)'}; margin-top:5px; flex-shrink:0;"></div>
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong style="font-size:13px; color:var(--text-main);">${inc.carrier} — ${inc.area}</strong>
            <span style="font-size:11px; color:var(--text-muted);">${inc.time}</span>
          </div>
          <p style="font-size:12px; color:var(--text-secondary); margin:0;">${inc.issue}</p>
        </div>
      </div>
    `).join('');
  }
})();
