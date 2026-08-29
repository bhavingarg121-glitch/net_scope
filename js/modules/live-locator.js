// NetScope India - Real-Time Live Geolocation, Breadcrumb Radar & Navigation Engine
(function() {
  let watchId = null;
  let isTracking = false;
  let followUser = true;
  let userMarker = null;
  let accuracyCircle = null;
  let towerVectorLine = null;
  let movementTrailLine = null;
  let movementBreadcrumbs = [];
  let totalDistanceTraversedKm = 0;
  let lastGeocodeTime = 0;
  let cachedAddress = null;
  let sessionStartTime = null;
  let sessionTimerInterval = null;
  let nativeGpsPoller = null;

  // NIXI National Peering Hubs & Subsea Cable Landing Stations across India
  const nixiNodes = [
    { name: 'NIXI Delhi (Noida Exchange Hub)', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai Subsea Landing (BKC Gateway)', lat: 19.0760, lng: 72.8777 },
    { name: 'Bengaluru Tech Corridor (Peering Node)', lat: 12.9716, lng: 77.5946 },
    { name: 'Hyderabad Teleport Exchange', lat: 17.3850, lng: 78.4867 },
    { name: 'Chennai Subsea Landing Terminal', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata Regional Gateway', lat: 22.5726, lng: 88.3639 },
    { name: 'CANI Port Blair Undersea Station', lat: 11.6234, lng: 92.7265 },
    { name: 'KLI Kochi-Lakshadweep Gateway', lat: 9.9312, lng: 76.2673 },
    { name: 'Guwahati North-East Peering Node', lat: 26.1445, lng: 91.7362 }
  ];

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

  document.addEventListener('DOMContentLoaded', () => {
    initLiveLocatorUI();
    initDeviceCompassListener();
    initMapSearchBar();
  });

  function initLiveLocatorUI() {
    const btnToggleLive = document.getElementById('btn-toggle-live-gps');
    const btnCenterUser = document.getElementById('btn-center-user-gps');
    const btnCopyCoords = document.getElementById('btn-copy-coords');
    const btnShareLocation = document.getElementById('btn-share-live-location');
    const btnClearTrail = document.getElementById('btn-clear-trail');
    const btnFullscreen = document.getElementById('btn-fullscreen-map');
    const followToggle = document.getElementById('toggle-follow-user');

    if (btnToggleLive) btnToggleLive.addEventListener('click', toggleLiveTracking);
    if (btnCenterUser) btnCenterUser.addEventListener('click', centerOnUser);
    if (btnCopyCoords) btnCopyCoords.addEventListener('click', copyCoordinates);
    if (btnShareLocation) btnShareLocation.addEventListener('click', shareLiveLocation);
    if (btnClearTrail) btnClearTrail.addEventListener('click', clearMovementTrail);
    if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreenMap);

    if (followToggle) {
      followToggle.addEventListener('change', (e) => {
        followUser = e.target.checked;
        if (followUser && window.currentGpsPos) {
          centerOnUser();
        }
      });
    }

    // Auto-start initial location detection
    startLiveTracking(false);
  }

  function toggleLiveTracking() {
    if (isTracking) {
      stopLiveTracking();
    } else {
      startLiveTracking(true);
    }
  }

  function startLiveTracking(userTriggered = true) {
    // Check if Android Native bridge has location
    if (window.NetScopeNative && window.NetScopeNative.hasLocationPermission && !window.NetScopeNative.hasLocationPermission()) {
      window.NetScopeNative.requestLocationPermission();
    }

    if (!navigator.geolocation) {
      if (userTriggered && window.showToast) {
        window.showToast('Geolocation is not supported on this device', 'error');
      }
      fallbackToNativeOrIpLocating();
      return;
    }

    const btnToggle = document.getElementById('btn-toggle-live-gps');
    const gpsStatusBadge = document.getElementById('live-gps-status-badge');
    const gpsFixPill = document.getElementById('live-gps-fix-pill');

    if (btnToggle) {
      btnToggle.innerHTML = '<span class="loader"></span> Acquiring Satellite Lock...';
      btnToggle.classList.add('btn-active-tracking');
    }

    if (gpsStatusBadge) {
      gpsStatusBadge.className = 'data-origin-badge badge-measured';
      gpsStatusBadge.innerHTML = '<span class="loader"></span> GPS Tracking Active';
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 1000
    };

    sessionStartTime = Date.now();
    startSessionTimer();

    // Watch continuous high-accuracy position
    watchId = navigator.geolocation.watchPosition(
      handleGpsSuccess,
      (err) => handleGpsError(err, userTriggered),
      options
    );

    // Also poll Native Android GPS bridge every 2.5s for ultra reliability
    if (window.NetScopeNative && window.NetScopeNative.getNativeGpsLocation) {
      if (nativeGpsPoller) clearInterval(nativeGpsPoller);
      nativeGpsPoller = setInterval(() => {
        try {
          const raw = window.NetScopeNative.getNativeGpsLocation();
          const parsed = JSON.parse(raw);
          if (parsed && parsed.available && parsed.lat && parsed.lng) {
            handleGpsSuccess({
              coords: {
                latitude: parsed.lat,
                longitude: parsed.lng,
                accuracy: parsed.accuracy,
                altitude: parsed.altitude,
                speed: parsed.speedKmh / 3.6,
                heading: parsed.bearing
              },
              timestamp: parsed.timestamp || Date.now()
            });
          }
        } catch (_) {}
      }, 2500);
    }

    isTracking = true;
    if (userTriggered && window.showToast) {
      window.showToast('Real-Time Live GPS tracking activated', 'success');
    }
  }

  function stopLiveTracking() {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }

    if (nativeGpsPoller) {
      clearInterval(nativeGpsPoller);
      nativeGpsPoller = null;
    }

    if (sessionTimerInterval) {
      clearInterval(sessionTimerInterval);
      sessionTimerInterval = null;
    }

    isTracking = false;

    const btnToggle = document.getElementById('btn-toggle-live-gps');
    const gpsStatusBadge = document.getElementById('live-gps-status-badge');
    const gpsFixPill = document.getElementById('live-gps-fix-pill');

    if (btnToggle) {
      btnToggle.innerHTML = '<i class="fa-solid fa-satellite-dish"></i> Start Live GPS Radar';
      btnToggle.classList.remove('btn-active-tracking');
    }

    if (gpsStatusBadge) {
      gpsStatusBadge.className = 'data-origin-badge badge-reference';
      gpsStatusBadge.innerHTML = 'GPS Standby';
    }

    if (gpsFixPill) {
      gpsFixPill.className = 'pill pill-warning';
      gpsFixPill.innerHTML = '<i class="fa-solid fa-pause"></i> Tracking Paused';
    }

    if (window.showToast) window.showToast('Live GPS tracking paused', 'info');
  }

  let prevFix = null;

  function handleGpsSuccess(position) {
    const coords = position.coords;
    const lat = coords.latitude;
    const lng = coords.longitude;
    const accuracy = Math.round(coords.accuracy || 8);
    const altitude = coords.altitude ? `${Math.round(coords.altitude)} m MSL` : '18 m MSL';
    const now = position.timestamp || Date.now();

    // 1. Dynamic Speed Calculation
    let speedKmhVal = 0;
    let calculatedBearing = null;

    if (coords.speed !== null && !isNaN(coords.speed) && coords.speed > 0) {
      speedKmhVal = coords.speed * 3.6;
    } else if (prevFix && prevFix.timestamp) {
      const dtSec = (now - prevFix.timestamp) / 1000;
      if (dtSec > 0.5 && dtSec < 120) {
        const stepDistKm = calculateDistance(prevFix.lat, prevFix.lng, lat, lng);
        const derivedSpeed = (stepDistKm / (dtSec / 3600));
        // Discard GPS jitter noise (< 1.5m move when stationary)
        if (stepDistKm > 0.002 && derivedSpeed > 0.8 && derivedSpeed < 250) {
          speedKmhVal = derivedSpeed;
          calculatedBearing = calculateBearing(prevFix.lat, prevFix.lng, lat, lng);
        }
      }
    }

    const speedKmh = speedKmhVal.toFixed(1);

    // 2. Dynamic Heading / Compass Resolution
    let heading = 0;
    if (window.nativeCompassHeading !== undefined && window.nativeCompassHeading !== null) {
      heading = window.nativeCompassHeading;
    } else if (coords.heading !== null && !isNaN(coords.heading) && coords.heading >= 0) {
      heading = Math.round(coords.heading);
    } else if (calculatedBearing !== null && speedKmhVal > 1.5) {
      heading = Math.round(calculatedBearing);
    } else if (window.deviceOrientationHeading !== undefined && window.deviceOrientationHeading !== null) {
      heading = window.deviceOrientationHeading;
    } else if (window.currentGpsPos?.heading) {
      heading = window.currentGpsPos.heading;
    }

    // 3. Movement state & classification
    let movementState = 'Stationary';
    let movementIcon = 'fa-person';
    if (speedKmhVal > 25) {
      movementState = 'In Vehicle / Transit';
      movementIcon = 'fa-car';
    } else if (speedKmhVal > 1.8) {
      movementState = 'Walking / Active';
      movementIcon = 'fa-person-walking';
    }

    // 4. Accumulate breadcrumbs and distance
    if (prevFix) {
      const stepDist = calculateDistance(prevFix.lat, prevFix.lng, lat, lng);
      if (stepDist > 0.003 && stepDist < 5.0) {
        totalDistanceTraversedKm += stepDist;
        movementBreadcrumbs.push([lat, lng]);
        updateMovementBreadcrumbTrail();
      }
    } else {
      movementBreadcrumbs.push([lat, lng]);
    }

    prevFix = { lat, lng, timestamp: now };

    window.currentGpsPos = {
      lat,
      lng,
      accuracy,
      altitude,
      speedKmh,
      heading,
      movementState,
      totalDistanceTraversedKm,
      timestamp: now
    };

    const btnToggle = document.getElementById('btn-toggle-live-gps');
    const gpsStatusBadge = document.getElementById('live-gps-status-badge');
    const gpsFixPill = document.getElementById('live-gps-fix-pill');

    if (btnToggle) {
      btnToggle.innerHTML = '<i class="fa-solid fa-satellite"></i> Live GPS Radar Active';
      btnToggle.classList.add('btn-active-tracking');
    }

    if (gpsStatusBadge) {
      gpsStatusBadge.className = 'data-origin-badge badge-measured';
      gpsStatusBadge.innerHTML = 'High-Accuracy GPS Lock';
    }

    if (gpsFixPill) {
      gpsFixPill.className = 'pill pill-success';
      gpsFixPill.innerHTML = `<i class="fa-solid fa-circle-dot"></i> Live Fix &bull; ±${accuracy}m`;
    }

    updateHudTelemetry(lat, lng, accuracy, altitude, speedKmh, heading, movementState, movementIcon);
    updateCompassDisplay(heading, speedKmh);
    updateMapRadar(lat, lng, accuracy, heading);
    findNearestCellTower(lat, lng);
    findNearestNixiNode(lat, lng);

    if (window.netscopeLog && Math.random() < 0.3) {
      window.netscopeLog('GPS', `Fix updated: ${lat.toFixed(5)}, ${lng.toFixed(5)} | Acc: ±${accuracy}m | Speed: ${speedKmh} km/h (${movementState})`, 'SUCCESS');
    }

    if (window.updateBest5gSpotAdvisor) {
      window.updateBest5gSpotAdvisor();
    }

    // Reverse geocode street address if 25s elapsed or not cached
    if (Date.now() - lastGeocodeTime > 25000 || !cachedAddress) {
      reverseGeocodeAddress(lat, lng);
    }
  }

  function handleGpsError(err, userTriggered) {
    console.warn('GPS position error:', err.message);
    if (userTriggered && window.showToast) {
      window.showToast(`GPS: ${err.message}. Using Network Node fallback.`, 'info');
    }
    fallbackToNativeOrIpLocating();
  }

  function fallbackToNativeOrIpLocating() {
    // Try Native Android bridge first
    if (window.NetScopeNative && window.NetScopeNative.getNativeGpsLocation) {
      try {
        const raw = window.NetScopeNative.getNativeGpsLocation();
        const parsed = JSON.parse(raw);
        if (parsed && parsed.available && parsed.lat && parsed.lng) {
          handleGpsSuccess({
            coords: {
              latitude: parsed.lat,
              longitude: parsed.lng,
              accuracy: parsed.accuracy || 25,
              altitude: parsed.altitude || 18,
              speed: 0,
              heading: 0
            },
            timestamp: Date.now()
          });
          return;
        }
      } catch (_) {}
    }

    // IP Geolocation fallback
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.latitude && data.longitude) {
          const lat = data.latitude;
          const lng = data.longitude;
          window.currentGpsPos = {
            lat,
            lng,
            accuracy: 1500,
            altitude: '18 m MSL',
            speedKmh: '0.0',
            heading: 0,
            movementState: 'Stationary (Network Node)',
            totalDistanceTraversedKm: 0,
            timestamp: Date.now()
          };

          updateHudTelemetry(lat, lng, 1500, '18 m MSL', '0.0', 0, 'Network Node', 'fa-network-wired');
          updateMapRadar(lat, lng, 1500, 0);
          findNearestCellTower(lat, lng);
          findNearestNixiNode(lat, lng);

          const addrEl = document.getElementById('live-hud-address');
          if (addrEl) {
            addrEl.textContent = `${data.city || 'Mumbai'}, ${data.region || 'Maharashtra'}, ${data.postal || '400001'}, India`;
          }
        }
      })
      .catch(() => {});
  }

  function updateHudTelemetry(lat, lng, accuracy, altitude, speedKmh, heading, movementState, movementIcon) {
    const latEl = document.getElementById('live-hud-lat');
    const lngEl = document.getElementById('live-hud-lng');
    const accEl = document.getElementById('live-hud-accuracy');
    const altEl = document.getElementById('live-hud-altitude');
    const speedEl = document.getElementById('live-hud-speed');
    const compassNeedle = document.getElementById('live-compass-needle');
    const headingText = document.getElementById('live-compass-heading');
    const distTraversedEl = document.getElementById('live-hud-traversed-dist');
    const movementStateEl = document.getElementById('live-hud-movement-state');

    if (latEl) latEl.textContent = lat.toFixed(5);
    if (lngEl) lngEl.textContent = lng.toFixed(5);
    if (accEl) accEl.textContent = `±${accuracy} m`;
    if (altEl) altEl.textContent = altitude;
    if (speedEl) speedEl.textContent = `${speedKmh} km/h`;

    if (compassNeedle) {
      compassNeedle.style.transform = `rotate(${heading}deg)`;
    }
    if (headingText) {
      headingText.textContent = `${heading}° ${getBearingCardinal(heading)}`;
    }

    if (distTraversedEl) {
      const distStr = totalDistanceTraversedKm < 1 ? `${Math.round(totalDistanceTraversedKm * 1000)} m` : `${totalDistanceTraversedKm.toFixed(2)} km`;
      distTraversedEl.textContent = distStr;
    }

    if (movementStateEl) {
      movementStateEl.innerHTML = `<i class="fa-solid ${movementIcon}"></i> ${movementState}`;
    }
  }

  function updateMapRadar(lat, lng, accuracy, heading) {
    const map = window.telecomMapInstance;
    if (!map || typeof L === 'undefined') return;

    // Create or update animated live radar marker with heading orientation arrow
    if (!userMarker) {
      const radarIcon = L.divIcon({
        className: 'live-radar-marker',
        html: `
          <div class="live-radar-wrapper">
            <div class="live-radar-pulse-ring ring-1"></div>
            <div class="live-radar-pulse-ring ring-2"></div>
            <div class="live-radar-heading-arrow" id="marker-heading-arrow" style="transform:rotate(${heading}deg);"></div>
            <div class="live-radar-center-dot"></div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      userMarker = L.marker([lat, lng], { icon: radarIcon, zIndexOffset: 1000 }).addTo(map);
      
      userMarker.bindPopup(`
        <div style="font-family:Inter,sans-serif; font-size:13px; line-height:1.5; min-width:220px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong style="color:#2563eb; font-size:14px;"><i class="fa-solid fa-satellite"></i> My Live Location</strong>
            <span style="color:#10b981; font-size:11px; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Real-Time GPS</span>
          </div>
          <div>Coordinates: <code>${lat.toFixed(5)}, ${lng.toFixed(5)}</code></div>
          <div>Accuracy Buffer: <strong>±${accuracy} meters</strong></div>
          <div style="color:var(--text-secondary); font-size:12px; margin-top:4px;">
            Speed: <strong>${window.currentGpsPos?.speedKmh || 0} km/h</strong> &bull; Heading: <strong>${heading}°</strong>
          </div>
          <div style="margin-top:8px; display:flex; gap:6px;">
            <button class="btn-sm-action" onclick="window.liveLocator.share()" style="flex:1; justify-content:center; background:#2563eb; color:#fff; border:none;">
              <i class="fa-solid fa-share-nodes"></i> Share Spot
            </button>
          </div>
        </div>
      `);

      accuracyCircle = L.circle([lat, lng], {
        radius: Math.max(12, accuracy),
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.12,
        weight: 1.5,
        dashArray: '4, 6'
      }).addTo(map);

    } else {
      userMarker.setLatLng([lat, lng]);
      const arrowEl = document.getElementById('marker-heading-arrow');
      if (arrowEl) arrowEl.style.transform = `rotate(${heading}deg)`;

      if (accuracyCircle) {
        accuracyCircle.setLatLng([lat, lng]);
        accuracyCircle.setRadius(Math.max(12, accuracy));
      }
    }

    if (followUser) {
      map.panTo([lat, lng], { animate: true, duration: 0.8 });
    }
  }

  function updateMovementBreadcrumbTrail() {
    const map = window.telecomMapInstance;
    if (!map || typeof L === 'undefined' || movementBreadcrumbs.length < 2) return;

    if (!movementTrailLine) {
      movementTrailLine = L.polyline(movementBreadcrumbs, {
        color: '#3b82f6',
        weight: 4,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
    } else {
      movementTrailLine.setLatLngs(movementBreadcrumbs);
    }
  }

  function clearMovementTrail() {
    if (movementTrailLine && window.telecomMapInstance) {
      window.telecomMapInstance.removeLayer(movementTrailLine);
      movementTrailLine = null;
    }
    movementBreadcrumbs = [];
    totalDistanceTraversedKm = 0;
    if (window.currentGpsPos) {
      movementBreadcrumbs.push([window.currentGpsPos.lat, window.currentGpsPos.lng]);
    }
    const distTraversedEl = document.getElementById('live-hud-traversed-dist');
    if (distTraversedEl) distTraversedEl.textContent = '0 m';
    if (window.showToast) window.showToast('Movement path trail cleared', 'info');
  }

  function findNearestCellTower(userLat, userLng) {
    const map = window.telecomMapInstance;
    const towers = window.towerDatabaseList || [];
    if (towers.length === 0) return;

    let nearest = null;
    let shortestDist = Infinity;

    towers.forEach(t => {
      const d = calculateDistance(userLat, userLng, t.lat, t.lng);
      if (d < shortestDist) {
        shortestDist = d;
        nearest = t;
      }
    });

    if (nearest) {
      const bearing = calculateBearing(userLat, userLng, nearest.lat, nearest.lng);
      const cardinal = getBearingCardinal(bearing);
      const distFormatted = shortestDist < 1 ? `${Math.round(shortestDist * 1000)} meters` : `${shortestDist.toFixed(2)} km`;

      const towerNameEl = document.getElementById('live-nearest-tower-name');
      const towerDistEl = document.getElementById('live-nearest-tower-dist');
      const towerBearingEl = document.getElementById('live-nearest-tower-bearing');
      const towerBandEl = document.getElementById('live-nearest-tower-band');
      const towerSignalEl = document.getElementById('live-nearest-tower-signal');

      if (towerNameEl) towerNameEl.textContent = nearest.name;
      if (towerDistEl) towerDistEl.textContent = distFormatted;
      if (towerBearingEl) towerBearingEl.textContent = `${Math.round(bearing)}° ${cardinal}`;
      if (towerBandEl) towerBandEl.textContent = `${nearest.operator} &bull; ${nearest.band}`;
      if (towerSignalEl) towerSignalEl.textContent = `${nearest.signal} (Est. RSSI)`;

      // Draw animated dashed vector connecting user to nearest BTS
      if (map && typeof L !== 'undefined') {
        if (towerVectorLine) {
          map.removeLayer(towerVectorLine);
        }

        towerVectorLine = L.polyline([
          [userLat, userLng],
          [nearest.lat, nearest.lng]
        ], {
          color: nearest.operator === 'Jio' ? '#10b981' : '#2563eb',
          weight: 2.5,
          dashArray: '6, 8',
          opacity: 0.85
        }).addTo(map);

        towerVectorLine.bindPopup(`
          <b><i class="fa-solid fa-tower-cell"></i> Active Triangulation Vector</b><br>
          From your live GPS to <strong>${nearest.name}</strong><br>
          Distance: <strong>${distFormatted}</strong> &bull; Bearing: <strong>${Math.round(bearing)}° ${cardinal}</strong>
        `);
      }
    }
  }

  function findNearestNixiNode(userLat, userLng) {
    let nearestNixi = null;
    let minDist = Infinity;

    nixiNodes.forEach(node => {
      const d = calculateDistance(userLat, userLng, node.lat, node.lng);
      if (d < minDist) {
        minDist = d;
        nearestNixi = node;
      }
    });

    if (nearestNixi) {
      const nixiNameEl = document.getElementById('live-nearest-nixi-name');
      const nixiDistEl = document.getElementById('live-nearest-nixi-dist');
      const nixiHopEl = document.getElementById('live-nearest-nixi-hop');

      const estHopMs = (minDist * 0.05 + 1.2).toFixed(1);
      const distStr = minDist < 1 ? `${Math.round(minDist * 1000)} m` : `${minDist.toFixed(1)} km`;

      if (nixiNameEl) nixiNameEl.textContent = nearestNixi.name;
      if (nixiDistEl) nixiDistEl.textContent = distStr;
      if (nixiHopEl) nixiHopEl.textContent = `~${estHopMs} ms Optical Latency`;
    }
  }

  async function reverseGeocodeAddress(lat, lng) {
    lastGeocodeTime = Date.now();
    const addrEl = document.getElementById('live-hud-address');
    if (!addrEl) return;

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en-IN,en;q=0.9' } });
      if (res.ok) {
        const data = await res.json();
        const a = data.address || {};
        const road = a.road || a.suburb || a.neighbourhood || a.commercial || '';
        const city = a.city || a.town || a.county || a.state_district || 'City Center';
        const state = a.state || 'India';
        const postcode = a.postcode || '';

        const fullStr = [road, city, state, postcode].filter(Boolean).join(', ');
        cachedAddress = fullStr;
        addrEl.textContent = fullStr;

        // Also update dashboard location
        const dashLoc = document.getElementById('dash-loc-val');
        if (dashLoc) dashLoc.textContent = `${city}, ${state}`;
      }
    } catch (e) {
      if (cachedAddress) {
        addrEl.textContent = cachedAddress;
      }
    }
  }

  function centerOnUser() {
    if (window.currentGpsPos && window.telecomMapInstance) {
      window.telecomMapInstance.setView([window.currentGpsPos.lat, window.currentGpsPos.lng], 15, {
        animate: true,
        duration: 0.8
      });
      if (userMarker) userMarker.openPopup();
      if (window.showToast) window.showToast('Map centered on your Live Location', 'info');
    } else {
      startLiveTracking(true);
    }
  }

  function copyCoordinates() {
    if (!window.currentGpsPos) return;
    const str = `${window.currentGpsPos.lat.toFixed(6)}, ${window.currentGpsPos.lng.toFixed(6)}`;
    navigator.clipboard.writeText(str).then(() => {
      if (window.showToast) window.showToast(`Coordinates copied: ${str}`, 'success');
    });
  }

  function shareLiveLocation() {
    if (!window.currentGpsPos) {
      if (window.showToast) window.showToast('No active GPS fix to share', 'error');
      return;
    }

    const lat = window.currentGpsPos.lat.toFixed(6);
    const lng = window.currentGpsPos.lng.toFixed(6);
    const gmapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    const shareText = `My Live Location on NetScope India:\nCoordinates: ${lat}, ${lng}\nAddress: ${cachedAddress || 'India'}\nView on Map: ${gmapsUrl}`;

    if (navigator.share) {
      navigator.share({
        title: 'NetScope Live Location',
        text: shareText,
        url: gmapsUrl
      }).catch(() => {
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      if (window.showToast) window.showToast('Live Location link copied to clipboard!', 'success');
    });
  }

  function toggleFullscreenMap() {
    const mapCard = document.getElementById('map-main-card');
    const iconEl = document.getElementById('btn-fullscreen-map-icon');
    if (!mapCard) return;

    mapCard.classList.toggle('map-fullscreen-mode');
    const isFull = mapCard.classList.contains('map-fullscreen-mode');

    if (iconEl) {
      iconEl.className = isFull ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
    }

    setTimeout(() => {
      if (window.telecomMapInstance) {
        window.telecomMapInstance.invalidateSize();
      }
    }, 250);

    if (window.showToast) {
      window.showToast(isFull ? 'Fullscreen Map Mode Activated' : 'Exited Fullscreen Map', 'info');
    }
  }

  function initMapSearchBar() {
    const input = document.getElementById('map-search-input');
    const btnSearch = document.getElementById('btn-map-search');
    const btnClear = document.getElementById('btn-map-search-clear');
    const resultsContainer = document.getElementById('map-search-results');

    if (!input) return;

    async function performSearch() {
      const query = input.value.trim();
      if (!query || query.length < 2) return;

      if (btnClear) btnClear.style.display = 'block';

      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', India')}&limit=5`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'en-IN,en;q=0.9' } });
        if (res.ok) {
          const results = await res.json();
          renderSearchResults(results);
        }
      } catch (e) {
        console.warn('Search failed:', e);
      }
    }

    function renderSearchResults(results) {
      if (!resultsContainer) return;
      resultsContainer.innerHTML = '';

      if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-item-empty">No locations found. Try another place name.</div>';
        resultsContainer.classList.add('active');
        return;
      }

      results.forEach(r => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
          <i class="fa-solid fa-location-dot" style="color:#2563eb;"></i>
          <div class="search-item-text">
            <strong>${r.display_name.split(',')[0]}</strong>
            <small>${r.display_name.split(',').slice(1, 4).join(',')}</small>
          </div>
        `;
        item.addEventListener('click', () => {
          const lat = parseFloat(r.lat);
          const lng = parseFloat(r.lon);
          if (window.telecomMapInstance) {
            window.telecomMapInstance.setView([lat, lng], 14, { animate: true, duration: 1.0 });
            L.marker([lat, lng]).addTo(window.telecomMapInstance).bindPopup(`<b>${r.display_name}</b>`).openPopup();
          }
          resultsContainer.classList.remove('active');
        });
        resultsContainer.appendChild(item);
      });

      resultsContainer.classList.add('active');
    }

    if (btnSearch) btnSearch.addEventListener('click', performSearch);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') performSearch();
    });

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        input.value = '';
        btnClear.style.display = 'none';
        if (resultsContainer) resultsContainer.classList.remove('active');
      });
    }

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.map-search-bar-wrapper') && resultsContainer) {
        resultsContainer.classList.remove('active');
      }
    });
  }

  function updateCompassDisplay(heading, speedKmh) {
    if (heading === null || heading === undefined || isNaN(heading)) return;
    const rounded = Math.round((heading % 360 + 360) % 360);
    const cardinal = getBearingCardinal(rounded);

    const compassNeedle = document.getElementById('live-compass-needle');
    const headingText = document.getElementById('live-compass-heading');
    const speedEl = document.getElementById('live-hud-speed');
    const markerArrow = document.getElementById('marker-heading-arrow');

    if (compassNeedle) compassNeedle.style.transform = `rotate(${rounded}deg)`;
    if (headingText) headingText.textContent = `${rounded}° ${cardinal}`;
    if (speedEl && speedKmh !== undefined && speedKmh !== null) speedEl.textContent = `${speedKmh} km/h`;
    if (markerArrow) markerArrow.style.transform = `rotate(${rounded}deg)`;
  }

  function initDeviceCompassListener() {
    // 1. Android Native Hardware Compass Callback
    window.onNativeCompassHeading = function(degrees) {
      if (typeof degrees === 'number' && !isNaN(degrees)) {
        window.nativeCompassHeading = degrees;
        window.deviceOrientationHeading = degrees;
        updateCompassDisplay(degrees);
      }
    };

    // 2. Android Native Real-time GPS Location Stream Callback
    window.onNativeGpsLocationUpdate = function(jsonStr) {
      try {
        const parsed = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
        if (parsed && parsed.available && parsed.lat && parsed.lng) {
          handleGpsSuccess({
            coords: {
              latitude: parsed.lat,
              longitude: parsed.lng,
              accuracy: parsed.accuracy || 6,
              altitude: parsed.altitude || 18,
              speed: (parsed.speedKmh || 0) / 3.6,
              heading: parsed.bearing || 0
            },
            timestamp: parsed.timestamp || Date.now()
          });
        }
      } catch (e) {
        console.warn('Native GPS Stream parse error:', e);
      }
    };

    // 3. Web Standard DeviceOrientation / Absolute Orientation
    const handleOrientation = (e) => {
      let heading = null;
      if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
        // iOS Safari webkit compass heading (0 = True North)
        heading = e.webkitCompassHeading;
      } else if (e.alpha !== null && !isNaN(e.alpha)) {
        // Android Chrome standard alpha
        if (e.absolute === true || ('deviceorientationabsolute' in window)) {
          heading = 360 - e.alpha;
        } else {
          heading = 360 - e.alpha;
        }
      }

      if (heading !== null && !isNaN(heading)) {
        window.deviceOrientationHeading = Math.round((heading % 360 + 360) % 360);
        updateCompassDisplay(window.deviceOrientationHeading);
      }
    };

    if (window.DeviceOrientationEvent) {
      if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      }
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    // 4. Interactive Compass Tap / Calibration Demo
    const compassCard = document.getElementById('hud-compass-card') || document.getElementById('live-compass-needle')?.closest('.live-hud-card');
    if (compassCard) {
      compassCard.style.cursor = 'pointer';
      compassCard.title = 'Tap to calibrate or test dynamic compass';
      compassCard.addEventListener('click', () => {
        // Request iOS DeviceOrientation permission if required
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission().then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, true);
            }
          }).catch(() => {});
        }
        testCompassSweep();
      });
    }
  }

  function testCompassSweep() {
    let current = (window.deviceOrientationHeading || 0);
    let count = 0;
    const targetSteps = 12;
    const interval = setInterval(() => {
      current = (current + 30) % 360;
      const simSpeed = count < 6 ? (count * 4.5).toFixed(1) : ((12 - count) * 4.5).toFixed(1);
      updateCompassDisplay(current, simSpeed);
      count++;
      if (count >= targetSteps) {
        clearInterval(interval);
        if (window.showToast) {
          window.showToast(`Dynamic Compass Active: ${Math.round(current)}° ${getBearingCardinal(current)}`, 'success');
        }
      }
    }, 90);
  }

  function startSessionTimer() {
    if (sessionTimerInterval) clearInterval(sessionTimerInterval);
    const durationEl = document.getElementById('live-hud-session-duration');
    sessionTimerInterval = setInterval(() => {
      if (!sessionStartTime || !durationEl) return;
      const elapsedSec = Math.floor((Date.now() - sessionStartTime) / 1000);
      const min = Math.floor(elapsedSec / 60);
      const sec = elapsedSec % 60;
      durationEl.textContent = `${min}m ${sec < 10 ? '0' : ''}${sec}s`;
    }, 1000);
  }

  window.liveLocator = {
    start: startLiveTracking,
    stop: stopLiveTracking,
    center: centerOnUser,
    share: shareLiveLocation,
    clearTrail: clearMovementTrail,
    testCompass: testCompassSweep,
    updateCompass: updateCompassDisplay
  };
})();
