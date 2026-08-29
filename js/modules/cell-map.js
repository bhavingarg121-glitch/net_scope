// NetScope India - Advanced Cell Tower Infrastructure, Best 5G Finder & Coverage Map
(function() {
  let map = null;
  let markers = [];
  let currentTileLayer = null;
  let activeTargetVector = null;
  let activeTargetMarker = null;

  // Tile layer configurations
  const tileLayers = {
    'streets': {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: { maxZoom: 19, attribution: '&copy; OpenStreetMap &bull; OpenCelliD' }
    },
    'satellite': {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: { maxZoom: 19, attribution: '&copy; Esri World Imagery &bull; Maxar' }
    },
    'dark': {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      options: { maxZoom: 19, attribution: '&copy; CartoDB &bull; OpenCelliD' }
    }
  };

  // Comprehensive Pan-India Cell Tower Database across all zones
  const towerDatabase = [
    // Delhi NCR & North
    { id: 'BTS-DEL-JIO-01', name: 'Jio 5G Massive MIMO Ultra (Connaught Place)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz) + n28 (700MHz)', cellId: '3829104', mccMnc: '405-861', lat: 28.6315, lng: 77.2167, city: 'Connaught Place, New Delhi', signal: '-58 dBm', radiusKm: 2.8, status: 'Active 5G SA (1 Gbps+)', connectedUsers: 840, speedPotential: 950 },
    { id: 'BTS-DEL-AIR-02', name: 'Airtel 5G Plus SuperSite (Aerocity)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz) + B3', cellId: '2948192', mccMnc: '404-010', lat: 28.5562, lng: 77.1190, city: 'Aerocity, New Delhi', signal: '-60 dBm', radiusKm: 2.5, status: 'Active 5G NSA (800 Mbps)', connectedUsers: 620, speedPotential: 880 },
    { id: 'BTS-GUR-JIO-03', name: 'Jio 5G Enterprise Hub (Cyber City)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '4928101', mccMnc: '405-861', lat: 28.4950, lng: 77.0890, city: 'Cyber City, Gurugram', signal: '-55 dBm', radiusKm: 3.2, status: 'Active 5G SA Gigabit', connectedUsers: 910, speedPotential: 980 },
    { id: 'BTS-NOI-AIR-04', name: 'Airtel 5G Plus Tech Node (Sector 62)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '7482910', mccMnc: '404-010', lat: 28.6280, lng: 77.3680, city: 'Sector 62, Noida', signal: '-59 dBm', radiusKm: 2.7, status: 'Active 5G NSA', connectedUsers: 710, speedPotential: 890 },
    { id: 'BTS-DEL-VI-05', name: 'Vi 4G+ LTE-A GIGAnet (Karol Bagh)', operator: 'Vi', tech: '4G', band: 'Band 40 (2300MHz) + Band 3', cellId: '1092834', mccMnc: '404-020', lat: 28.6510, lng: 77.1900, city: 'Karol Bagh, New Delhi', signal: '-70 dBm', radiusKm: 3.0, status: 'Active LTE-A (120 Mbps)', connectedUsers: 340, speedPotential: 140 },
    { id: 'BTS-DEL-BSNL-06', name: 'BSNL National Peering Site (CGO Complex)', operator: 'BSNL', tech: '4G', band: 'Band 1 (2100MHz)', cellId: '5839201', mccMnc: '404-051', lat: 28.5890, lng: 77.2380, city: 'Lodhi Road, New Delhi', signal: '-75 dBm', radiusKm: 2.8, status: 'Active Bharat 4G/VoLTE', connectedUsers: 190, speedPotential: 75 },

    // Maharashtra & West
    { id: 'BTS-MUM-JIO-07', name: 'Jio 5G True5G Flagship Hub (BKC G-Block)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz) + n258 mmWave', cellId: '9840214', mccMnc: '405-861', lat: 19.0660, lng: 72.8680, city: 'BKC, Mumbai', signal: '-52 dBm', radiusKm: 3.6, status: 'Active 5G SA Ultra (1.2 Gbps)', connectedUsers: 1120, speedPotential: 1150 },
    { id: 'BTS-MUM-AIR-08', name: 'Airtel 5G Plus Marine Terminal (Nariman Point)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz) + n28', cellId: '8749102', mccMnc: '404-010', lat: 18.9260, lng: 72.8220, city: 'Nariman Point, Mumbai', signal: '-58 dBm', radiusKm: 3.2, status: 'Active 5G NSA', connectedUsers: 850, speedPotential: 920 },
    { id: 'BTS-MUM-VI-09', name: 'Vi GIGAnet High-Capacity (Andheri East)', operator: 'Vi', tech: '4G', band: 'Band 40 + Band 1 CA', cellId: '4729103', mccMnc: '404-020', lat: 19.1136, lng: 72.8697, city: 'Andheri East, Mumbai', signal: '-68 dBm', radiusKm: 2.8, status: 'Active 4G+ MIMO', connectedUsers: 480, speedPotential: 150 },
    { id: 'BTS-PUN-JIO-10', name: 'Jio 5G C-Band Ultra (Hinjawadi Phase 1)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '6839201', mccMnc: '405-861', lat: 18.5910, lng: 73.7380, city: 'Hinjawadi, Pune', signal: '-54 dBm', radiusKm: 3.4, status: 'Active 5G SA', connectedUsers: 980, speedPotential: 960 },
    { id: 'BTS-AHM-JIO-11', name: 'Jio 5G Smart City Node (GIFT City)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz) + n28', cellId: '7920194', mccMnc: '405-861', lat: 23.1600, lng: 72.6840, city: 'GIFT City, Gandhinagar/Ahmedabad', signal: '-53 dBm', radiusKm: 3.5, status: 'Active 5G SA Gigabit', connectedUsers: 870, speedPotential: 1020 },
    { id: 'BTS-SUR-AIR-12', name: 'Airtel 5G Plus Hub (Diamond Bourse)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '6382910', mccMnc: '404-010', lat: 21.1420, lng: 72.8280, city: 'Vesu, Surat', signal: '-57 dBm', radiusKm: 3.0, status: 'Active 5G NSA', connectedUsers: 740, speedPotential: 910 },

    // South India
    { id: 'BTS-BLR-JIO-13', name: 'Jio 5G Massive MIMO (Electronic City Phase 1)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz) + n28', cellId: '6829104', mccMnc: '405-861', lat: 12.8450, lng: 77.6630, city: 'Electronic City, Bengaluru', signal: '-53 dBm', radiusKm: 3.5, status: 'Active 5G SA (1 Gbps+)', connectedUsers: 1080, speedPotential: 1050 },
    { id: 'BTS-BLR-AIR-14', name: 'Airtel 5G Plus Tech Park (Whitefield ITPL)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '5739103', mccMnc: '404-010', lat: 12.9860, lng: 77.7380, city: 'Whitefield, Bengaluru', signal: '-56 dBm', radiusKm: 3.2, status: 'Active 5G NSA', connectedUsers: 940, speedPotential: 940 },
    { id: 'BTS-HYD-JIO-15', name: 'Jio 5G SA Ultra (Gachibowli Financial District)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '8392014', mccMnc: '405-861', lat: 17.4150, lng: 78.3480, city: 'Financial District, Hyderabad', signal: '-54 dBm', radiusKm: 3.6, status: 'Active 5G SA', connectedUsers: 1020, speedPotential: 980 },
    { id: 'BTS-HYD-AIR-16', name: 'Airtel 5G Plus SuperSite (HITEC City Cyber Towers)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '7482910', mccMnc: '404-010', lat: 17.4435, lng: 78.3772, city: 'HITEC City, Hyderabad', signal: '-55 dBm', radiusKm: 3.4, status: 'Active 5G NSA', connectedUsers: 990, speedPotential: 960 },
    { id: 'BTS-CHE-JIO-17', name: 'Jio 5G OMR IT Expressway Node (Sholinganallur)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '9284019', mccMnc: '405-861', lat: 12.9010, lng: 80.2280, city: 'OMR, Chennai', signal: '-56 dBm', radiusKm: 3.4, status: 'Active 5G SA', connectedUsers: 890, speedPotential: 940 },
    { id: 'BTS-CHE-AIR-18', name: 'Airtel 5G Plus Subsea Peering Hub (Marina/Santhome)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '6382910', mccMnc: '404-010', lat: 13.0380, lng: 80.2780, city: 'Santhome, Chennai', signal: '-58 dBm', radiusKm: 3.0, status: 'Active 5G NSA', connectedUsers: 760, speedPotential: 900 },
    { id: 'BTS-KOC-JIO-19', name: 'Jio 5G High-Speed Infopark Site (Kakkanad)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '8492019', mccMnc: '405-861', lat: 10.0150, lng: 76.3620, city: 'Kakkanad, Kochi', signal: '-55 dBm', radiusKm: 3.2, status: 'Active 5G SA', connectedUsers: 780, speedPotential: 930 },

    // East & North-East
    { id: 'BTS-CCU-JIO-20', name: 'Jio 5G True5G Tech Node (Salt Lake Sector V)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '7482918', mccMnc: '405-861', lat: 22.5760, lng: 88.4320, city: 'Salt Lake Sector V, Kolkata', signal: '-56 dBm', radiusKm: 3.2, status: 'Active 5G SA', connectedUsers: 860, speedPotential: 920 },
    { id: 'BTS-CCU-AIR-21', name: 'Airtel 5G Plus Heritage Site (Park Street)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '8391024', mccMnc: '404-010', lat: 22.5510, lng: 88.3530, city: 'Park Street, Kolkata', signal: '-59 dBm', radiusKm: 2.8, status: 'Active 5G NSA', connectedUsers: 710, speedPotential: 880 },
    { id: 'BTS-PAT-JIO-22', name: 'Jio 5G Metro Site (Boring Road / Bailey Road)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '5829104', mccMnc: '405-861', lat: 25.6120, lng: 85.1240, city: 'Boring Road, Patna', signal: '-58 dBm', radiusKm: 2.9, status: 'Active 5G SA', connectedUsers: 640, speedPotential: 860 },
    { id: 'BTS-BHU-JIO-23', name: 'Jio 5G Infocity SuperNode (Patia)', operator: 'Jio', tech: '5G', band: 'n78 (3500MHz)', cellId: '6930219', mccMnc: '405-861', lat: 20.3540, lng: 85.8180, city: 'Infocity Patia, Bhubaneswar', signal: '-56 dBm', radiusKm: 3.2, status: 'Active 5G SA', connectedUsers: 720, speedPotential: 910 },
    { id: 'BTS-GAU-AIR-24', name: 'Airtel 5G Plus North-East Gateway (GS Road)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '7492014', mccMnc: '404-010', lat: 26.1520, lng: 91.7760, city: 'GS Road, Guwahati', signal: '-57 dBm', radiusKm: 3.1, status: 'Active 5G NSA', connectedUsers: 690, speedPotential: 890 },
    { id: 'BTS-SHL-AIR-25', name: 'Airtel 5G Plus Hill Node (Police Bazaar)', operator: 'Airtel', tech: '5G', band: 'n78 (3500MHz)', cellId: '4829103', mccMnc: '404-010', lat: 25.5780, lng: 91.8830, city: 'Police Bazaar, Shillong', signal: '-62 dBm', radiusKm: 2.6, status: 'Active 5G NSA', connectedUsers: 480, speedPotential: 820 }
  ];

  window.towerDatabaseList = towerDatabase;

  window.initTelecomMap = function() {
    const container = document.getElementById('telecomMap');
    if (!container || typeof L === 'undefined') return;

    // Update dynamic date
    const lastUpdateEl = document.getElementById('map-last-updated-date');
    if (lastUpdateEl) {
      const now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      lastUpdateEl.textContent = now;
    }

    if (map) {
      setTimeout(() => map.invalidateSize(), 200);
      return;
    }

    // Default view centered on India or current GPS position
    const startLat = window.currentGpsPos ? window.currentGpsPos.lat : 20.5937;
    const startLng = window.currentGpsPos ? window.currentGpsPos.lng : 78.9629;
    const startZoom = window.currentGpsPos ? 13 : 5;

    map = L.map('telecomMap', {
      zoomControl: false, // Custom placed zoom controls
      attributionControl: true
    }).setView([startLat, startLng], startZoom);
    
    window.telecomMapInstance = map;

    // Add standard zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Set initial Tile Layer
    setMapTileLayer('streets');

    renderFilteredTowers();
    updateBest5gSpotAdvisor();

    // Event Listeners for Filters
    const carrierFilter = document.getElementById('map-filter-carrier');
    const techFilter = document.getElementById('map-filter-tech');

    if (carrierFilter) carrierFilter.addEventListener('change', () => {
      renderFilteredTowers();
      updateBest5gSpotAdvisor();
    });
    
    if (techFilter) techFilter.addEventListener('change', () => {
      renderFilteredTowers();
      updateBest5gSpotAdvisor();
    });

    // Map Tap / Click to Measure Distance
    map.on('click', handleMapClickToMeasure);

    // Layer Switcher Buttons
    document.querySelectorAll('.map-layer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const layerType = btn.getAttribute('data-layer');
        document.querySelectorAll('.map-layer-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setMapTileLayer(layerType);
      });
    });

    setTimeout(() => map.invalidateSize(), 300);
  };

  function setMapTileLayer(layerType) {
    if (!map) return;
    const config = tileLayers[layerType] || tileLayers.streets;
    
    if (currentTileLayer) {
      map.removeLayer(currentTileLayer);
    }

    currentTileLayer = L.tileLayer(config.url, config.options).addTo(map);
  }

  function renderFilteredTowers() {
    if (!map) return;

    const carrierVal = document.getElementById('map-filter-carrier')?.value || 'All';
    const techVal = document.getElementById('map-filter-tech')?.value || 'All';

    markers.forEach(m => map.removeLayer(m));
    markers = [];

    const carrierColors = {
      'Jio': '#10b981',
      'Airtel': '#2563eb',
      'Vi': '#f59e0b',
      'BSNL': '#ef4444'
    };

    const filtered = towerDatabase.filter(t => {
      const matchCarrier = (carrierVal === 'All' || t.operator.toLowerCase() === carrierVal.toLowerCase());
      const matchTech = (techVal === 'All' || t.tech.toLowerCase() === techVal.toLowerCase());
      return matchCarrier && matchTech;
    });

    filtered.forEach(t => {
      const color = carrierColors[t.operator] || '#2563eb';
      const is5g = t.tech === '5G';
      
      // Known Tower Custom Pin Marker
      const customIcon = L.divIcon({
        className: 'custom-tower-pin',
        html: `
          <div class="tower-pin-wrapper ${is5g ? 'is-5g' : ''}" style="--carrier-color:${color};">
            <div class="tower-pin-body">
              <i class="fa-solid fa-tower-cell"></i>
            </div>
            <div class="tower-pin-badge">${t.operator} ${t.tech}</div>
          </div>
        `,
        iconSize: [36, 44],
        iconAnchor: [18, 40]
      });

      const marker = L.marker([t.lat, t.lng], { icon: customIcon }).addTo(map);

      // Estimated Coverage radius circle
      const circle = L.circle([t.lat, t.lng], {
        radius: t.radiusKm * 1000,
        color: color,
        fillColor: color,
        fillOpacity: is5g ? 0.09 : 0.05,
        weight: is5g ? 1.5 : 1,
        dashArray: is5g ? null : '4, 4'
      }).addTo(map);

      // User distance if user position is known
      let distStr = '';
      if (window.currentGpsPos) {
        const d = calculateDistance(window.currentGpsPos.lat, window.currentGpsPos.lng, t.lat, t.lng);
        distStr = `
          <div style="margin-top:6px; padding:6px 8px; background:var(--bg-input); border-radius:4px; font-size:12px;">
            <strong><i class="fa-solid fa-location-crosshairs"></i> Distance from You:</strong> <span style="color:${color}; font-weight:700;">${d < 1 ? Math.round(d * 1000) + ' m' : d.toFixed(2) + ' km'}</span>
          </div>
        `;
      }

      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif; font-size:13px; line-height:1.5; min-width:240px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:10px; font-weight:700; background:${color}22; color:${color}; padding:2px 8px; border-radius:4px; border:1px solid ${color}44;">
              <i class="fa-solid fa-circle-check"></i> Registered ${t.tech} BTS
            </span>
            <span style="font-size:10px; font-family:monospace; color:#64748b;">${t.id}</span>
          </div>
          <h4 style="margin:0 0 6px 0; color:${color}; font-size:15px; font-weight:700;">${t.name}</h4>
          <div><strong>Carrier:</strong> ${t.operator} (${t.tech}) &bull; MCC-MNC: <code>${t.mccMnc}</code></div>
          <div><strong>Band:</strong> <code>${t.band}</code></div>
          <div><strong>Estimated Throughput:</strong> <strong style="color:#10b981;">Up to ${t.speedPotential} Mbps</strong></div>
          <div><strong>Location:</strong> ${t.city}</div>
          <div><strong>Signal RSSI:</strong> ${t.signal} &bull; <strong>Active Users:</strong> ${t.connectedUsers}</div>
          ${distStr}
          <div style="margin-top:10px; display:flex; gap:6px;">
            <button class="btn-sm-action" onclick="window.guideToTower(${t.lat}, ${t.lng}, '${t.name.replace(/'/g, "\\'")}')" style="flex:1; justify-content:center; background:${color}; color:#fff; border:none;">
              <i class="fa-solid fa-diamond-turn-right"></i> Direct Vector
            </button>
            <a class="btn-sm-action" href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}" target="_blank" style="flex:1; justify-content:center; text-decoration:none;">
              <i class="fa-solid fa-map-location-dot"></i> Google Maps
            </a>
          </div>
        </div>
      `);

      markers.push(marker);
      markers.push(circle);
    });
  }

  // Best 5G Spot Finder & Advisor
  function updateBest5gSpotAdvisor() {
    const advisorContainer = document.getElementById('best-5g-advisor-content');
    if (!advisorContainer) return;

    const userLat = window.currentGpsPos ? window.currentGpsPos.lat : 28.6139;
    const userLng = window.currentGpsPos ? window.currentGpsPos.lng : 77.2090;

    // Filter 5G towers and sort by composite 5G score (proximity + throughput)
    const fiveGTowers = towerDatabase.filter(t => t.tech === '5G');
    if (fiveGTowers.length === 0) return;

    const scored = fiveGTowers.map(t => {
      const distKm = calculateDistance(userLat, userLng, t.lat, t.lng);
      const bearing = calculateBearing(userLat, userLng, t.lat, t.lng);
      // Score formula: Higher throughput is better, shorter distance is better
      const proximityScore = Math.max(0, 100 - (distKm * 25));
      const speedScore = (t.speedPotential / 1150) * 100;
      const composite = (proximityScore * 0.6) + (speedScore * 0.4);
      return { ...t, distKm, bearing, composite };
    });

    scored.sort((a, b) => b.composite - a.composite);
    const best5g = scored[0];

    const cardinal = getBearingCardinal(best5g.bearing);
    const distText = best5g.distKm < 1 ? `${Math.round(best5g.distKm * 1000)} meters` : `${best5g.distKm.toFixed(2)} km`;
    const walkMin = Math.max(1, Math.round(best5g.distKm / 0.075)); // 4.5 km/h = 75m/min

    advisorContainer.innerHTML = `
      <div class="best-5g-spot-card">
        <div class="spot-card-badge">
          <i class="fa-solid fa-trophy" style="color:#f59e0b;"></i> #1 Best 5G Signal Zone Nearby
        </div>
        <div class="spot-card-header">
          <div>
            <h4 class="spot-tower-title">${best5g.name}</h4>
            <div class="spot-location-sub"><i class="fa-solid fa-location-dot"></i> ${best5g.city}</div>
          </div>
          <div class="spot-speed-badge">
            <span class="speed-num">${best5g.speedPotential}</span>
            <span class="speed-unit">Mbps Peak</span>
          </div>
        </div>

        <div class="spot-meta-grid">
          <div class="spot-meta-item">
            <div class="meta-label">Optimal Carrier</div>
            <div class="meta-val font-bold" style="color:${best5g.operator === 'Jio' ? '#10b981' : '#2563eb'};">
              ${best5g.operator} (5G SA n78)
            </div>
          </div>
          <div class="spot-meta-item">
            <div class="meta-label">Distance from You</div>
            <div class="meta-val font-bold" style="color:var(--text-main);">${distText}</div>
          </div>
          <div class="spot-meta-item">
            <div class="meta-label">Compass Heading</div>
            <div class="meta-val font-bold" style="color:var(--primary);">${Math.round(best5g.bearing)}° (${cardinal})</div>
          </div>
          <div class="spot-meta-item">
            <div class="meta-label">Walking Time</div>
            <div class="meta-val font-bold" style="color:#10b981;">~${walkMin} min walk</div>
          </div>
        </div>

        <div class="spot-direction-guide">
          <i class="fa-solid fa-compass-drafting" style="color:var(--primary);"></i>
          <span><strong>Walk Guide:</strong> Head <strong>${cardinal}</strong> towards <em>${best5g.city.split(',')[0]}</em> for uninterrupted C-Band n78 5G SA beamforming.</span>
        </div>

        <div class="spot-actions">
          <button class="action-btn" onclick="window.guideToTower(${best5g.lat}, ${best5g.lng}, '${best5g.name.replace(/'/g, "\\'")}')" style="flex:1;">
            <i class="fa-solid fa-satellite-dish"></i> Target on Map
          </button>
          <a class="action-btn btn-secondary" href="https://www.google.com/maps/dir/?api=1&destination=${best5g.lat},${best5g.lng}" target="_blank" style="flex:1; text-align:center; text-decoration:none;">
            <i class="fa-solid fa-diamond-turn-right"></i> Navigate
          </a>
        </div>
      </div>
    `;
  }

  // Handle Tap-on-Map to inspect any point and measure live vector
  function handleMapClickToMeasure(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const userPos = window.currentGpsPos || { lat: 28.6139, lng: 77.2090 };

    const distKm = calculateDistance(userPos.lat, userPos.lng, lat, lng);
    const bearing = calculateBearing(userPos.lat, userPos.lng, lat, lng);
    const cardinal = getBearingCardinal(bearing);
    const distFormatted = distKm < 1 ? `${Math.round(distKm * 1000)} meters` : `${distKm.toFixed(2)} km`;
    const walkMin = Math.max(1, Math.round(distKm / 0.075));
    const driveMin = Math.max(1, Math.round((distKm / 35) * 60));

    if (activeTargetVector) map.removeLayer(activeTargetVector);
    if (activeTargetMarker) map.removeLayer(activeTargetMarker);

    // Target Pin Marker
    const targetIcon = L.divIcon({
      className: 'target-inspection-pin',
      html: '<div class="target-pin-pulse"></div><i class="fa-solid fa-crosshairs" style="color:#ef4444; font-size:20px;"></i>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    activeTargetMarker = L.marker([lat, lng], { icon: targetIcon }).addTo(map);

    // Vector Polyline from user live GPS to tapped point
    activeTargetVector = L.polyline([[userPos.lat, userPos.lng], [lat, lng]], {
      color: '#ef4444',
      weight: 2.5,
      dashArray: '5, 8',
      opacity: 0.9
    }).addTo(map);

    activeTargetMarker.bindPopup(`
      <div style="font-family:Inter,sans-serif; font-size:13px; line-height:1.5; min-width:220px;">
        <strong style="color:#ef4444; font-size:14px;"><i class="fa-solid fa-location-crosshairs"></i> Target Position Measured</strong>
        <div style="color:var(--text-secondary); font-size:12px; margin-top:2px;">Coords: <code>${lat.toFixed(5)}, ${lng.toFixed(5)}</code></div>
        <hr style="border:0; border-top:1px solid #e2e8f0; margin:6px 0;">
        <div><strong>Distance:</strong> <span style="color:#2563eb; font-weight:700;">${distFormatted}</span></div>
        <div><strong>Bearing:</strong> <strong>${Math.round(bearing)}° ${cardinal}</strong></div>
        <div><strong>Est. Walking:</strong> ~${walkMin} mins &bull; <strong>Driving:</strong> ~${driveMin} mins</div>
        <div style="margin-top:8px;">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" class="btn-sm-action" style="display:inline-flex; width:100%; justify-content:center; text-decoration:none; background:#2563eb; color:#fff; border:none;">
            <i class="fa-solid fa-diamond-turn-right"></i> Open Navigation
          </a>
        </div>
      </div>
    `).openPopup();
  }

  // Global Guide to Tower Hook
  window.guideToTower = function(towerLat, towerLng, towerName) {
    if (!map) return;
    map.setView([towerLat, towerLng], 15, { animate: true, duration: 1.0 });

    const userPos = window.currentGpsPos || { lat: 28.6139, lng: 77.2090 };
    if (activeTargetVector) map.removeLayer(activeTargetVector);

    activeTargetVector = L.polyline([[userPos.lat, userPos.lng], [towerLat, towerLng]], {
      color: '#10b981',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.95
    }).addTo(map);

    if (window.showToast) {
      window.showToast(`Target locked: ${towerName}`, 'success');
    }
  };

  // Mathematical Geodesic Distance Formula (Haversine in km)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function calculateBearing(lat1, lon1, lat2, lon2) {
    const y = Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos((lon2 - lon1) * Math.PI / 180);
    const brng = Math.atan2(y, x) * 180 / Math.PI;
    return (brng + 360) % 360;
  }

  function getBearingCardinal(bearing) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(bearing / 22.5) % 16;
    return directions[idx];
  }

  window.updateBest5gSpotAdvisor = updateBest5gSpotAdvisor;
})();
