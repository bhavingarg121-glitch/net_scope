// NetScope India - Cell Tower & Coverage Leaflet Map Component
document.addEventListener('DOMContentLoaded', () => {

  let map = null;
  let markersGroup = [];

  const towers = [
    { name: 'Jio 5G Tower #101', carrier: 'Jio', lat: 28.6139, lng: 77.2090, city: 'New Delhi', signal: '98% (-62 dBm)', band: 'n78 (3500MHz)' },
    { name: 'Airtel 5G Plus #204', carrier: 'Airtel', lat: 28.7041, lng: 77.1025, city: 'North Delhi', signal: '95% (-65 dBm)', band: 'n28 (700MHz)' },
    { name: 'Vi GIGAnet #309', carrier: 'Vi', lat: 19.0760, lng: 72.8777, city: 'Mumbai', signal: '88% (-74 dBm)', band: 'Band 3 (1800MHz)' },
    { name: 'BSNL Bharat Fibre Node', carrier: 'BSNL', lat: 19.0176, lng: 72.8561, city: 'South Mumbai', signal: '82% (-80 dBm)', band: 'Band 1 (2100MHz)' },
    { name: 'Jio 5G Tower #508', carrier: 'Jio', lat: 12.9716, lng: 77.5946, city: 'Bengaluru', signal: '99% (-58 dBm)', band: 'n78 (3500MHz)' },
    { name: 'Airtel 5G Plus #612', carrier: 'Airtel', lat: 17.3850, lng: 78.4867, city: 'Hyderabad', signal: '94% (-68 dBm)', band: 'n78 (3500MHz)' },
    { name: 'Jio 5G Tower #714', carrier: 'Jio', lat: 13.0827, lng: 80.2707, city: 'Chennai', signal: '96% (-64 dBm)', band: 'n78 (3500MHz)' },
    { name: 'Vi GIGAnet #820', carrier: 'Vi', lat: 22.5726, lng: 88.3639, city: 'Kolkata', signal: '86% (-76 dBm)', band: 'Band 40 (2300MHz)' },
    { name: 'BSNL Tower #930', carrier: 'BSNL', lat: 26.9124, lng: 75.7873, city: 'Jaipur', signal: '80% (-82 dBm)', band: 'Band 8 (900MHz)' }
  ];

  window.initTelecomMap = function() {
    const mapContainer = document.getElementById('telecomMap');
    if (!mapContainer || typeof L === 'undefined') return;

    if (map) {
      setTimeout(() => map.invalidateSize(), 200);
      return;
    }

    // Initialize Leaflet Map centered on India
    map = L.map('telecomMap').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors | NetScope India'
    }).addTo(map);

    renderTowers('All');

    const filterSelect = document.getElementById('map-carrier-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        renderTowers(e.target.value);
      });
    }

    setTimeout(() => map.invalidateSize(), 300);
  };

  function renderTowers(filterCarrier) {
    if (!map) return;

    // Clear existing markers
    markersGroup.forEach(m => map.removeLayer(m));
    markersGroup = [];

    const carrierColors = {
      'Jio': '#00e676',
      'Airtel': '#2563eb',
      'Vi': '#f59e0b',
      'BSNL': '#ef4444'
    };

    towers.forEach(t => {
      if (filterCarrier !== 'All' && t.carrier !== filterCarrier) return;

      const color = carrierColors[t.carrier] || '#2563eb';

      // Coverage radius circle
      const circle = L.circle([t.lat, t.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.15,
        radius: 35000
      }).addTo(map);

      // Tower Marker
      const marker = L.circleMarker([t.lat, t.lng], {
        radius: 8,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; color: #0f172a; padding: 4px;">
          <strong style="font-size: 14px; color: ${color};">${t.name}</strong><br>
          <b>Location:</b> ${t.city}<br>
          <b>Signal Strength:</b> ${t.signal}<br>
          <b>Frequency Band:</b> ${t.band}
        </div>
      `);

      markersGroup.push(circle);
      markersGroup.push(marker);
    });
  }

});
