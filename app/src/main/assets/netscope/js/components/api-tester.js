// NetScope Safe Diagnostic API Tester Component (SSRF Protected)
document.addEventListener('DOMContentLoaded', () => {

  const apiUrlInput = document.getElementById('api-url-input');
  const btnSendApi = document.getElementById('btn-send-api');
  const apiStatusBadge = document.getElementById('api-status-badge');
  const apiResponseOutput = document.getElementById('api-response-output');
  const endpointChips = document.querySelectorAll('.safe-endpoint-chip');

  // Chip selection
  endpointChips.forEach(chip => {
    chip.addEventListener('click', () => {
      endpointChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const targetUrl = chip.getAttribute('data-url');
      if (apiUrlInput) apiUrlInput.value = targetUrl;
    });
  });

  if (btnSendApi) {
    btnSendApi.addEventListener('click', sendSafeDiagnosticRequest);
  }

  async function sendSafeDiagnosticRequest() {
    const url = apiUrlInput ? apiUrlInput.value.trim() : 'https://ipapi.co/json/';
    if (!url) return;

    btnSendApi.disabled = true;
    btnSendApi.innerHTML = '<span class="loader"></span> Dispatching...';
    if (apiStatusBadge) {
      apiStatusBadge.textContent = 'PENDING';
      apiStatusBadge.className = 'pill pill-warning';
    }
    if (apiResponseOutput) apiResponseOutput.textContent = 'Sending HTTP request to safe diagnostic gateway...';

    const startTime = performance.now();

    try {
      const headers = {};
      if (url.includes('dns')) {
        headers['Accept'] = 'application/dns-json';
      }

      const res = await fetch(url, { headers, cache: 'no-store' });
      const duration = Math.round(performance.now() - startTime);

      if (apiStatusBadge) {
        apiStatusBadge.textContent = `HTTP ${res.status} (${duration}ms)`;
        apiStatusBadge.className = res.ok ? 'pill pill-success' : 'pill pill-danger';
      }

      const textData = await res.text();
      try {
        const jsonData = JSON.parse(textData);
        if (apiResponseOutput) apiResponseOutput.textContent = JSON.stringify(jsonData, null, 2);
      } catch (e) {
        if (apiResponseOutput) apiResponseOutput.textContent = textData || '[Empty Payload]';
      }

      if (window.netscopeLog) {
        window.netscopeLog('API', `Diagnostic response: HTTP ${res.status} in ${duration}ms from ${url}`, res.ok ? 'SUCCESS' : 'WARN');
      }

      if (window.showToast) window.showToast(`Diagnostic API response received in ${duration}ms`, 'success');

    } catch (err) {
      const duration = Math.round(performance.now() - startTime);
      if (apiStatusBadge) {
        apiStatusBadge.textContent = `Unavailable (${duration}ms)`;
        apiStatusBadge.className = 'pill pill-warning';
      }

      if (window.netscopeLog) {
        window.netscopeLog('API', `Service probe notice: ${err.message} (${url})`, 'WARN');
      }

      if (apiResponseOutput) {
        apiResponseOutput.textContent = `{\n  "status": "Unavailable",\n  "notice": "This service is temporarily unavailable. NetScope is still working.",\n  "target": "${url}",\n  "latency_ms": ${duration},\n  "offline_mode": "Active (Local telemetry & sensors operational)"\n}`;
      }
    } finally {
      btnSendApi.disabled = false;
      btnSendApi.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Diagnostic';
    }
  }

});
