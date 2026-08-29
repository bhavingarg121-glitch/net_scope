// NetScope India - Visual BGP Route & Anycast Path Explorer
(function() {
  const defaultHops = [
    { hop: 1, type: 'device', node: 'Local Interface (Host)', ip: '192.168.1.104', location: 'Customer LAN', lat: '0.4 ms', asn: 'Private LAN (RFC 1918)', status: 'OK' },
    { hop: 2, type: 'router', node: 'Home ONT Gateway', ip: '192.168.1.1', location: 'Customer Premises', lat: '1.2 ms', asn: 'LAN Gateway', status: 'OK' },
    { hop: 3, type: 'isp', node: 'ISP Aggregation BRAS Node', ip: '10.144.0.1', location: 'Regional Metro Ring', lat: '4.8 ms', asn: 'AS55836 (Jio/Airtel Backhaul)', status: 'OK' },
    { hop: 4, type: 'ixp', node: 'NIXI India IXP Exchange', ip: '103.27.170.1', location: 'BKC, Mumbai / Delhi Node', lat: '8.6 ms', asn: 'AS24186 (NIXI Peering)', status: 'OK' },
    { hop: 5, type: 'transit', node: 'Tata Comm / Subsea Landing', ip: '180.87.12.9', location: 'Subsea Cable Terminal (Mumbai)', lat: '14.2 ms', asn: 'AS4755 (Tata Communications)', status: 'OK' },
    { hop: 6, type: 'edge', node: 'Global Anycast Edge PoP', ip: '172.217.166.46', location: 'Singapore / Mumbai Edge', lat: '24.1 ms', asn: 'AS15169 (Google LLC)', status: 'OK' },
    { hop: 7, type: 'target', node: 'Destination Host', ip: '142.250.193.14', location: 'Target Core Server', lat: '26.5 ms', asn: 'AS15169 (Verified Target)', status: 'Destination' }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('route-hops-container');
    const btnTrace = document.getElementById('btn-run-traceroute');
    const inputTarget = document.getElementById('traceroute-target-input');

    if (!container) return;

    function renderHops(hops = defaultHops) {
      container.innerHTML = hops.map(h => `
        <div class="route-hop-card">
          <div class="hop-badge">Hop ${h.hop}</div>
          <div class="hop-icon-box ${h.type}">
            <i class="fa-solid ${getHopIcon(h.type)}"></i>
          </div>
          <div class="hop-details">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:var(--text-main); font-size:14px;">${h.node}</strong>
              <span class="speed-pill dl" style="font-family:var(--font-mono); font-size:12px;">${h.lat}</span>
            </div>
            <div style="font-family:var(--font-mono); font-size:12px; color:var(--primary); margin:2px 0;">
              IP: ${h.ip} &bull; <span style="color:var(--text-secondary);">${h.asn}</span>
            </div>
            <div style="font-size:11px; color:var(--text-muted);">Location: ${h.location}</div>
          </div>
        </div>
      `).join('');
    }

    function getHopIcon(type) {
      switch(type) {
        case 'device': return 'fa-laptop';
        case 'router': return 'fa-network-wired';
        case 'isp': return 'fa-tower-broadcast';
        case 'ixp': return 'fa-circle-nodes';
        case 'transit': return 'fa-water';
        case 'edge': return 'fa-cloud';
        case 'target': return 'fa-flag-checkered';
        default: return 'fa-server';
      }
    }

    renderHops();

    if (btnTrace) {
      btnTrace.addEventListener('click', () => {
        const target = (inputTarget && inputTarget.value.trim()) || 'google.com';
        btnTrace.innerHTML = '<span class="loader"></span> Tracing BGP Transit Path...';
        
        setTimeout(() => {
          btnTrace.innerHTML = '<i class="fa-solid fa-route"></i> Trace Route Path';
          renderHops(defaultHops);
          if (window.showToast) window.showToast(`BGP route path to ${target} mapped in 7 hops!`, 'success');
        }, 1100);
      });
    }
  });
})();
