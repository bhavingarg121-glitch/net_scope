// NetScope India - Core App Router, Location State & Global Controller
document.addEventListener('DOMContentLoaded', () => {
  console.log('NetScope India Telecom & Network Intelligence Platform Active');

  const navItems = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('current-tab-title');

  const tabTitles = {
    'tab-dashboard': 'Overview & Network Health Dashboard',
    'tab-speed': 'Speed Test & Telecom Carrier Benchmark',
    'tab-quality': 'Network Quality Score & Stability Index',
    'tab-gaming': 'Gaming Network Mode & Matchmaking Latency',
    'tab-wifi': 'Wi-Fi Health & RF Spectrum Analyzer',
    'tab-telecom-intel': 'India Telecom Intelligence & Regional Carrier Matrix',
    'tab-5g-analyzer': '5G Radio Band, RSRP & Spectrum Telemetry',
    'tab-map': 'Cell Tower Infrastructure & 5G Coverage Map',
    'tab-outage': 'Telecom Network Incident & Maintenance Dashboard',
    'tab-network': 'Autonomous System (ASN) & BGP Inspector',
    'tab-dns-bench': 'DNS Performance Benchmark (Live DoH Queries)',
    'tab-route': 'Visual BGP Route & Anycast Path Explorer',
    'tab-domain': 'Domain Intelligence & SSL/TLS Certificate Health',
    'tab-security': 'Client-Side TLS & Security Context Inspector',
    'tab-api': 'Safe Diagnostic API Runner (Allowlisted Endpoints)',
    'tab-history': 'My Network Test History & Performance Trends',
    'tab-reports': 'Network Diagnostic PDF Report Certificate',
    'tab-ai': 'NetScope AI Network Assistant',
    'tab-more-hub': 'Advanced Diagnostics & Tools Hub'
  };

  // Global Navigation function
  window.switchTab = function(targetTab) {
    if (!targetTab) return;

    navItems.forEach(nav => nav.classList.remove('active'));
    // Activate matching items (sidebar, mobile bottom nav)
    document.querySelectorAll(`.nav-item[data-tab="${targetTab}"]`).forEach(n => n.classList.add('active'));

    tabPanes.forEach(pane => {
      pane.classList.remove('active');
      if (pane.id === targetTab) {
        pane.classList.add('active');
      }
    });

    if (tabTitles[targetTab] && pageTitle) {
      pageTitle.textContent = tabTitles[targetTab];
    }

    // Scroll content area back to top
    const contentArea = document.querySelector('.content-area');
    if (contentArea) contentArea.scrollTop = 0;

    // Trigger tab specific initializers
    if (targetTab === 'tab-dashboard' && window.initDashboard) {
      window.initDashboard();
    } else if (targetTab === 'tab-map' && window.initTelecomMap) {
      window.initTelecomMap();
    } else if (targetTab === 'tab-speed' && window.drawSpeedometer) {
      window.drawSpeedometer(0);
    }
  };

  // Bind Nav Items
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      window.switchTab(targetTab);
    });
  });

  // Bind More Tools Hub Cards
  document.querySelectorAll('.hub-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetTab = card.getAttribute('data-open-tab');
      window.switchTab(targetTab);
    });
  });

  // Global Theme Toggler
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const htmlEl = document.documentElement;

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        htmlEl.setAttribute('data-theme', 'light');
        btnThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
        if (window.showToast) window.showToast('Switched to Light Theme', 'info');
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        btnThemeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
        if (window.showToast) window.showToast('Switched to Cyber Dark Theme', 'info');
      }

      window.dispatchEvent(new Event('themeChanged'));
      if (window.drawSpeedometer) window.drawSpeedometer(0);
    });
  }

  // Quick Audit Header Shortcut
  const btnHeaderAudit = document.getElementById('btn-quick-audit-header');
  const btnDashAudit = document.getElementById('btn-quick-audit-dash');
  const auditModal = document.getElementById('quick-audit-modal');
  const btnCloseAudit = document.getElementById('btn-close-audit-modal');

  function openAudit() {
    if (auditModal) auditModal.classList.add('active');
    if (window.runQuickAudit) window.runQuickAudit();
  }

  if (btnHeaderAudit) btnHeaderAudit.addEventListener('click', openAudit);
  if (btnDashAudit) btnDashAudit.addEventListener('click', openAudit);
  if (btnCloseAudit) btnCloseAudit.addEventListener('click', () => auditModal.classList.remove('active'));

  // Privacy Modal Controller
  const privacyModal = document.getElementById('privacy-modal');
  const btnOpenPrivacy = document.getElementById('btn-open-privacy-modal');
  const btnClosePrivacy = document.getElementById('btn-close-privacy-modal');
  const btnPrivacyOk = document.getElementById('btn-privacy-ok');
  const btnPrivacyClear = document.getElementById('btn-privacy-clear-all');

  if (btnOpenPrivacy) btnOpenPrivacy.addEventListener('click', () => privacyModal.classList.add('active'));
  if (btnClosePrivacy) btnClosePrivacy.addEventListener('click', () => privacyModal.classList.remove('active'));
  if (btnPrivacyOk) btnPrivacyOk.addEventListener('click', () => privacyModal.classList.remove('active'));
  if (btnPrivacyClear) {
    btnPrivacyClear.addEventListener('click', () => {
      if (confirm('Clear all stored test results and local cached telemetry?')) {
        localStorage.clear();
        privacyModal.classList.remove('active');
        if (window.showToast) window.showToast('All local telemetry deleted successfully', 'info');
        setTimeout(() => location.reload(), 600);
      }
    });
  }

  // Permissions Modal Controller
  const permModal = document.getElementById('permissions-modal');
  const btnOpenPerm = document.getElementById('btn-open-perm-modal');
  const btnClosePerm = document.getElementById('btn-close-perm-modal');
  const btnGrantGps = document.getElementById('perm-btn-location');

  if (btnOpenPerm) btnOpenPerm.addEventListener('click', () => permModal.classList.add('active'));
  if (btnClosePerm) btnClosePerm.addEventListener('click', () => permModal.classList.remove('active'));
  if (btnGrantGps) {
    btnGrantGps.addEventListener('click', () => {
      detectGpsLocation();
      permModal.classList.remove('active');
    });
  }

  // Scoring Formula Modal Controller
  const formulaModal = document.getElementById('scoring-formula-modal');
  const btnDashFormula = document.getElementById('btn-dash-view-formula');
  const btnCloseFormula = document.getElementById('btn-close-formula-modal');

  if (btnDashFormula) btnDashFormula.addEventListener('click', () => formulaModal.classList.add('active'));
  if (btnCloseFormula) btnCloseFormula.addEventListener('click', () => formulaModal.classList.remove('active'));

  // Location Selector Modal Controller
  const locModal = document.getElementById('location-modal');
  const btnOpenLoc = document.getElementById('btn-open-loc-modal');
  const btnCloseLoc = document.getElementById('btn-close-loc-modal');
  const modalSelectState = document.getElementById('modal-select-state');
  const modalSelectCity = document.getElementById('modal-select-city');
  const btnApplyLoc = document.getElementById('btn-apply-location');
  const btnDetectGps = document.getElementById('btn-detect-gps');

  const indiaRegions = {
    'Andhra Pradesh': ['Visakhapatnam (Rushikonda)', 'Vijayawada (Benz Circle)', 'Tirupati (Alipiri)', 'Guntur (Brodipet)'],
    'Arunachal Pradesh': ['Itanagar (Ganga Market)', 'Naharlagun', 'Tawang (Monastery Road)', 'Pasighat'],
    'Assam': ['Guwahati (GS Road)', 'Dibrugarh (Medical College)', 'Silchar (Tarapur)', 'Jorhat (Gar-Ali)'],
    'Bihar': ['Patna (Boring Road)', 'Gaya (Bodh Gaya Corridor)', 'Muzaffarpur (Mithanpura)', 'Bhagalpur'],
    'Chhattisgarh': ['Raipur (Pandri VIP)', 'Bhilai / Durg (Civic Centre)', 'Bilaspur (Vyapar Vihar)'],
    'Goa': ['Panaji (Miramar / Patto)', 'Margao (Colva Corridor)', 'Vasco da Gama (Airport Road)'],
    'Gujarat': ['Ahmedabad (SG Highway / GIFT)', 'Surat (Diamond Bourse)', 'Vadodara (Alkapuri)', 'Rajkot (Yagnik Road)'],
    'Haryana': ['Gurugram (Cyber City / Golf Course)', 'Faridabad (Sector 15)', 'Panipat (Model Town)', 'Karnal'],
    'Himachal Pradesh': ['Shimla (Mall Road / Ridge)', 'Dharamshala (McLeod Ganj)', 'Manali (Solang Corridor)'],
    'Jharkhand': ['Ranchi (Main Road / Morabadi)', 'Jamshedpur (Bistupur)', 'Dhanbad (Bank More)'],
    'Karnataka': ['Bengaluru (Electronic City / Whitefield)', 'Mysuru (Gokulam)', 'Mangaluru (Hampankatta)', 'Hubballi-Dharwad'],
    'Kerala': ['Kochi (Infopark / Marine Drive)', 'Thiruvananthapuram (Technopark)', 'Kozhikode (Cyberpark)', 'Thrissur'],
    'Madhya Pradesh': ['Indore (Vijay Nagar / Super Corridor)', 'Bhopal (MP Nagar)', 'Jabalpur (Civil Lines)', 'Gwalior (City Centre)'],
    'Maharashtra': ['Mumbai (BKC 5G Ultra)', 'Pune (Hinjawadi IT Park)', 'Nagpur (MIHAN SEZ)', 'Nashik (College Road)', 'Chhatrapati Sambhajinagar'],
    'Manipur': ['Imphal (Thangal Bazaar)', 'Churachandpur'],
    'Meghalaya': ['Shillong (Police Bazaar)', 'Tura (Hawakhana)'],
    'Mizoram': ['Aizawl (Bara Bazaar)', 'Lunglei'],
    'Nagaland': ['Kohima (Main Town)', 'Dimapur (Circular Road)'],
    'Odisha': ['Bhubaneswar (Infocity Patia)', 'Cuttack (Badambadi)', 'Rourkela (Civil Township)', 'Puri (Marine Drive)'],
    'Punjab': ['Ludhiana (Model Town)', 'Amritsar (Ranjit Avenue)', 'Jalandhar (Model Town)', 'Mohali / SAS Nagar (Quark City)'],
    'Rajasthan': ['Jaipur (Malviya Nagar / C-Scheme)', 'Jodhpur (Shastri Nagar)', 'Udaipur (Fateh Sagar)', 'Kota (Landmark City)'],
    'Sikkim': ['Gangtok (MG Marg)', 'Namchi (Char Dham)'],
    'Tamil Nadu': ['Chennai (OMR IT Corridor / Guindy)', 'Coimbatore (Tidel Park)', 'Madurai (KK Nagar)', 'Tiruchirappalli'],
    'Telangana': ['Hyderabad (HITEC City / Gachibowli)', 'Warangal (NIT / Hanamkonda)', 'Nizamabad'],
    'Tripura': ['Agartala (Akhaura Road / Kunjaban)', 'Udaipur'],
    'Uttar Pradesh': ['Lucknow (Gomti Nagar / Vibhuti Khand)', 'Kanpur (Civil Lines)', 'Varanasi (BHU / Cantt)', 'Noida / Gr. Noida (Sector 62)', 'Agra (Fatehabad Road)', 'Prayagraj (Civil Lines)'],
    'Uttarakhand': ['Dehradun (Rajpur Road / IT Park)', 'Haridwar / Roorkee (IIT Campus)', 'Haldwani / Nainital'],
    'West Bengal': ['Kolkata (Salt Lake Sector V / New Town)', 'Siliguri (Sevoke Road)', 'Durgapur / Asansol (City Centre)'],
    'Delhi NCR': ['New Delhi (Connaught Place / Aerocity)', 'North / West Delhi (Rohini / Netaji Subhash Place)', 'South Delhi (Saket / South Ex)'],
    'Jammu & Kashmir': ['Srinagar (Lal Chowk / Dal Lake)', 'Jammu (Gandhi Nagar / Bahu Plaza)'],
    'Ladakh': ['Leh (Main Bazaar)', 'Kargil'],
    'Chandigarh': ['Chandigarh (Sector 17 / IT Park)'],
    'Puducherry': ['Puducherry (White Town / Promenade)'],
    'Andaman & Nicobar Islands': ['Port Blair (CANI Undersea Landing)'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman / Silvassa (GIDC / Nani Daman)'],
    'Lakshadweep': ['Kavaratti (KLI Undersea Landing Gateway)']
  };

  if (modalSelectState && modalSelectCity) {
    modalSelectState.innerHTML = '';
    Object.keys(indiaRegions).forEach(st => {
      const opt = document.createElement('option');
      opt.value = st;
      opt.textContent = st;
      modalSelectState.appendChild(opt);
    });

    function populateModalCities(state) {
      modalSelectCity.innerHTML = '';
      (indiaRegions[state] || []).forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        modalSelectCity.appendChild(opt);
      });
    }

    modalSelectState.addEventListener('change', (e) => populateModalCities(e.target.value));
    populateModalCities('Maharashtra');
  }

  if (btnOpenLoc) btnOpenLoc.addEventListener('click', () => locModal.classList.add('active'));
  if (btnCloseLoc) btnCloseLoc.addEventListener('click', () => locModal.classList.remove('active'));

  if (btnApplyLoc) {
    btnApplyLoc.addEventListener('click', () => {
      const selectedState = modalSelectState.value;
      const selectedCity = modalSelectCity.value;
      updateActiveLocation(selectedCity, selectedState, 'Manual Circle Selection');
      if (window.setTelecomIntelRegion) {
        window.setTelecomIntelRegion(selectedState, selectedCity.split(' ')[0]);
      }
      locModal.classList.remove('active');
      if (window.showToast) window.showToast(`Active Region switched to ${selectedCity}, ${selectedState}`, 'success');
    });
  }

  if (btnDetectGps) {
    btnDetectGps.addEventListener('click', () => {
      if (window.liveLocator && window.liveLocator.start) {
        window.liveLocator.start(true);
      } else {
        detectGpsLocation();
      }
      window.switchTab('tab-map');
    });
  }

  window.onNativeLocationPermissionResult = function(granted) {
    if (granted) {
      if (window.showToast) window.showToast('High-Accuracy GPS hardware unlocked', 'success');
      if (window.liveLocator && window.liveLocator.start) {
        window.liveLocator.start(false);
      }
    }
  };

  function detectGpsLocation() {
    if (window.NetScopeNative && window.NetScopeNative.hasLocationPermission && !window.NetScopeNative.hasLocationPermission()) {
      window.NetScopeNative.requestLocationPermission();
    }

    if (!navigator.geolocation) {
      if (window.showToast) window.showToast('Geolocation is not supported by your device', 'error');
      return;
    }

    if (window.showToast) window.showToast('Acquiring real-time GPS coordinates...', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lng = pos.coords.longitude.toFixed(5);
        updateActiveLocation(`Lat: ${lat}, Lng: ${lng}`, 'India (GPS Node)', 'High-Accuracy Satellite Fix');
        if (window.showToast) window.showToast('GPS Satellite Fix Acquired!', 'success');
      },
      (err) => {
        if (window.showToast) window.showToast('GPS permission required. Using IP Node.', 'info');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function updateActiveLocation(city, region, source = 'IP Geolocation') {
    window.currentLocation = { city, region, source };
    const locText = document.getElementById('current-location-text');
    const locSource = document.getElementById('current-location-source');
    const dashLoc = document.getElementById('dash-loc-val');
    const dashHealthCity = document.getElementById('dash-health-city');
    const reportLoc = document.getElementById('report-meta-loc');

    if (locText) locText.textContent = `${city}, ${region}`;
    if (locSource) locSource.textContent = `Source: ${source}`;
    if (dashLoc) dashLoc.textContent = `${city}, ${region}`;
    if (dashHealthCity) dashHealthCity.textContent = `${city.split(' ')[0]}`;
    if (reportLoc) reportLoc.textContent = `${city}, ${region}, India`;
  }

  // Network Offline / Online Monitor
  const offlineBanner = document.getElementById('global-offline-banner');
  window.addEventListener('offline', () => {
    if (offlineBanner) offlineBanner.classList.add('active');
    if (window.showToast) window.showToast('Network disconnected. Operating in offline cache.', 'error');
  });
  window.addEventListener('online', () => {
    if (offlineBanner) offlineBanner.classList.remove('active');
    if (window.showToast) window.showToast('Internet connection restored!', 'success');
  });
});

// Global Toast Notification Helper
window.showToast = function(message, type = 'info') {
  const existing = document.querySelectorAll('.toast');
  existing.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 74px;
    right: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-left: 4px solid ${type === 'success' ? 'var(--status-online)' : type === 'error' ? 'var(--status-offline)' : 'var(--primary)'};
    color: var(--text-main);
    padding: 10px 18px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    font-size: 13px;
    font-weight: 500;
    z-index: 100000;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  const icon = type === 'success' ? 'circle-check' : type === 'error' ? 'triangle-exclamation' : 'circle-info';
  const color = type === 'success' ? 'var(--status-online)' : type === 'error' ? 'var(--status-offline)' : 'var(--primary)';
  toast.innerHTML = `<i class="fa-solid fa-${icon}" style="color:${color};"></i> ${message}`;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// PWA Service Worker & Install Prompt Controller (100% Free App Installation)
let deferredPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      console.log('NetScope PWA Service Worker registered:', reg.scope);
    }).catch((err) => {
      console.log('ServiceWorker registration skipped (offline/file protocol):', err.message);
    });
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBanner = document.getElementById('pwa-install-banner');
  if (installBanner) installBanner.style.display = 'flex';
});

window.installNetScopePwa = function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        if (window.showToast) window.showToast('NetScope India installed successfully!', 'success');
      }
      deferredPrompt = null;
    });
  } else {
    if (window.showToast) window.showToast('To install: Tap Browser Menu (⋮) -> Add to Home screen', 'info');
  }
};
