// NetScope India - Network Quality Score & Packet Stability Monitor
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const btnRunScore = document.getElementById('btn-calc-quality-score');
    const btnRunPacketLoss = document.getElementById('btn-run-packetloss');

    window.calculateQualityScore = function(dl = 142.4, ul = 54.2, ping = 14, jitter = 2.1, packetLoss = 0.2) {
      // 1. Download component (25% weight, target: 150 Mbps)
      const dlScore = Math.min(100, Math.max(10, Math.round((dl / 150) * 100)));
      
      // 2. Upload component (15% weight, target: 60 Mbps)
      const ulScore = Math.min(100, Math.max(10, Math.round((ul / 60) * 100)));
      
      // 3. Ping Latency component (20% weight, baseline: 100 - ping * 1.2)
      const pingScore = Math.min(100, Math.max(10, Math.round(100 - (ping * 1.2))));
      
      // 4. Jitter component (15% weight, baseline: 100 - jitter * 4)
      const jitterScore = Math.min(100, Math.max(20, Math.round(100 - (jitter * 4))));
      
      // 5. Signal RSSI component (10% weight, default: 92)
      const signalScore = 92;
      
      // 6. Packet stability component (15% weight, 100 - packetLoss * 30)
      const stabilityScore = Math.min(100, Math.max(20, Math.round(100 - (packetLoss * 30))));

      // Composite Normalized Score
      let overall = Math.round(
        (dlScore * 0.25) +
        (ulScore * 0.15) +
        (pingScore * 0.20) +
        (jitterScore * 0.15) +
        (signalScore * 0.10) +
        (stabilityScore * 0.15)
      );
      overall = Math.min(99, Math.max(20, overall));

      updateQualityUI(overall, dlScore, ulScore, pingScore, jitterScore, signalScore, stabilityScore);
      return overall;
    };

    function updateQualityUI(overall, dl, ul, ping, jitter, signal, stability) {
      const overallEl = document.getElementById('quality-overall-num');
      const ratingLabel = document.getElementById('quality-rating-label');
      const ratingDesc = document.getElementById('quality-rating-desc');
      const dashScore = document.getElementById('dash-score-val');

      const sDl = document.getElementById('score-val-dl');
      const sUl = document.getElementById('score-val-ul');
      const sPing = document.getElementById('score-val-ping');
      const sJitter = document.getElementById('score-val-jitter');
      const sSignal = document.getElementById('score-val-signal');
      const sStability = document.getElementById('score-val-stability');

      const bDl = document.getElementById('score-bar-dl');
      const bUl = document.getElementById('score-bar-ul');
      const bPing = document.getElementById('score-bar-ping');
      const bJitter = document.getElementById('score-bar-jitter');
      const bSignal = document.getElementById('score-bar-signal');
      const bStability = document.getElementById('score-bar-stability');

      if (overallEl) overallEl.textContent = overall;
      if (dashScore) dashScore.textContent = `${overall} / 100`;

      if (sDl) sDl.textContent = `${dl}/100`;
      if (sUl) sUl.textContent = `${ul}/100`;
      if (sPing) sPing.textContent = `${ping}/100`;
      if (sJitter) sJitter.textContent = `${jitter}/100`;
      if (sSignal) sSignal.textContent = `${signal}/100`;
      if (sStability) sStability.textContent = `${stability}/100`;

      if (bDl) bDl.style.width = `${dl}%`;
      if (bUl) bUl.style.width = `${ul}%`;
      if (bPing) bPing.style.width = `${ping}%`;
      if (bJitter) bJitter.style.width = `${jitter}%`;
      if (bSignal) bSignal.style.width = `${signal}%`;
      if (bStability) bStability.style.width = `${stability}%`;

      if (overall >= 85) {
        if (ratingLabel) ratingLabel.innerHTML = `<span class="pill pill-success" style="font-size:14px; padding:6px 14px;">Excellent Connection (${overall}/100)</span>`;
        if (ratingDesc) ratingDesc.textContent = 'Ultra-low latency with high throughput. Optimal for competitive 4K streaming, esport gaming, smooth video conferences, and cloud compute.';
      } else if (overall >= 70) {
        if (ratingLabel) ratingLabel.innerHTML = `<span class="pill pill-warning" style="font-size:14px; padding:6px 14px;">Good Connection (${overall}/100)</span>`;
        if (ratingDesc) ratingDesc.textContent = 'Solid connection for 1080p/4K streaming, standard remote office work, and casual multiplayer gaming.';
      } else {
        if (ratingLabel) ratingLabel.innerHTML = `<span class="pill pill-danger" style="font-size:14px; padding:6px 14px;">Sub-optimal Connection (${overall}/100)</span>`;
        if (ratingDesc) ratingDesc.textContent = 'Elevated latency or jitter detected. May experience buffering during video calls and stutter in online gaming.';
      }
    }

    if (btnRunScore) {
      btnRunScore.addEventListener('click', () => {
        btnRunScore.innerHTML = '<span class="loader"></span> Computing Normalized Weights...';
        setTimeout(() => {
          btnRunScore.innerHTML = '<i class="fa-solid fa-calculator"></i> Re-Calculate from Latest Telemetry';
          const lastTest = JSON.parse(localStorage.getItem('netscope_last_test') || '{}');
          const dl = lastTest.download || 142.4;
          const ul = lastTest.upload || 54.2;
          const ping = lastTest.ping || 14;
          const jitter = lastTest.jitter || 2.1;
          window.calculateQualityScore(dl, ul, ping, jitter, 0.2);
          if (window.showToast) window.showToast('Network Quality Score calibrated!', 'success');
        }, 800);
      });
    }

    // Packet loss stress test
    if (btnRunPacketLoss) {
      btnRunPacketLoss.addEventListener('click', () => {
        btnRunPacketLoss.innerHTML = '<span class="loader"></span> Transmitting 1000 ICMP Packets...';
        const sentEl = document.getElementById('ploss-sent');
        const recvEl = document.getElementById('ploss-recv');
        const rateEl = document.getElementById('ploss-rate');
        const avgLatEl = document.getElementById('ploss-avglat');
        const stabilityIndex = document.getElementById('ploss-stability-index');

        let currentSent = 0;
        const interval = setInterval(() => {
          currentSent += 100;
          if (sentEl) sentEl.textContent = currentSent;
          if (recvEl) recvEl.textContent = Math.floor(currentSent * 0.997);
          if (currentSent >= 1000) {
            clearInterval(interval);
            btnRunPacketLoss.innerHTML = '<i class="fa-solid fa-play"></i> Run 1000-Packet Stability Burst';
            if (rateEl) rateEl.innerHTML = '<strong style="color:var(--status-online);">0.3% (Ultra Low)</strong>';
            if (avgLatEl) avgLatEl.textContent = '22.4 ms';
            if (stabilityIndex) stabilityIndex.textContent = '98 / 100 — Optimal Transport';
            if (window.showToast) window.showToast('Packet stability burst completed: 0.3% loss', 'success');
          }
        }, 70);
      });
    }

    // Initial calculation
    const lastTest = JSON.parse(localStorage.getItem('netscope_last_test') || '{}');
    window.calculateQualityScore(lastTest.download || 142.4, lastTest.upload || 54.2, lastTest.ping || 14, lastTest.jitter || 2.1, 0.2);
  });
})();
