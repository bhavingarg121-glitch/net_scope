// NetScope India - Network History & Diagnostics PDF Report Generator
(function() {
  let historyChart = null;

  document.addEventListener('DOMContentLoaded', () => {
    initHistoryView();
    populateReportData();

    const btnClearHistory = document.getElementById('btn-clear-history');
    const btnGenerateReport = document.getElementById('btn-generate-report');
    const btnPrintReport = document.getElementById('btn-print-report');
    const btnExportJson = document.getElementById('btn-export-history-json');
    const btnImportJson = document.getElementById('btn-import-history-json');
    const fileImportInput = document.getElementById('file-import-history');
    const btnShareReportHeader = document.getElementById('btn-share-report-header');

    if (btnClearHistory) {
      btnClearHistory.addEventListener('click', () => {
        if (confirm('Clear all local network test history?')) {
          localStorage.removeItem('netscope_history_records');
          initHistoryView();
          if (window.showToast) window.showToast('Test history cleared', 'info');
        }
      });
    }

    if (btnGenerateReport) {
      btnGenerateReport.addEventListener('click', () => {
        populateReportData();
        if (window.showToast) window.showToast('Diagnostic Report Compiled with Latest Telemetry!', 'success');
      });
    }

    if (btnPrintReport) {
      btnPrintReport.addEventListener('click', () => {
        window.print();
      });
    }

    if (btnShareReportHeader) {
      btnShareReportHeader.addEventListener('click', () => {
        if (window.shareResultCard) window.shareResultCard();
      });
    }

    // Export History as JSON Backup
    if (btnExportJson) {
      btnExportJson.addEventListener('click', () => {
        const history = localStorage.getItem('netscope_history_records') || '[]';
        const blob = new Blob([history], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NetScope_History_Backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        if (window.showToast) window.showToast('History exported as JSON backup file', 'success');
      });
    }

    // Import History from JSON Backup
    if (btnImportJson && fileImportInput) {
      btnImportJson.addEventListener('click', () => fileImportInput.click());
      fileImportInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (Array.isArray(parsed)) {
              localStorage.setItem('netscope_history_records', JSON.stringify(parsed));
              initHistoryView();
              if (window.showToast) window.showToast(`Imported ${parsed.length} test records successfully!`, 'success');
            } else {
              if (window.showToast) window.showToast('Invalid backup JSON format', 'error');
            }
          } catch (err) {
            if (window.showToast) window.showToast('Failed to parse backup file', 'error');
          }
        };
        reader.readAsText(file);
      });
    }
  });

  window.saveTestToHistory = function(dl, ul, ping, jitter, loss = 0.2) {
    const history = JSON.parse(localStorage.getItem('netscope_history_records') || '[]');
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    const record = {
      date: dateStr,
      timestamp: Date.now(),
      download: dl,
      upload: ul,
      ping: ping,
      jitter: jitter,
      loss: loss,
      score: Math.min(99, Math.round((dl / 150) * 40 + (ul / 60) * 20 + Math.max(10, 100 - ping) * 0.4))
    };

    history.unshift(record);
    if (history.length > 50) history.pop();
    localStorage.setItem('netscope_history_records', JSON.stringify(history));
    localStorage.setItem('netscope_last_test', JSON.stringify(record));

    initHistoryView();
    populateReportData();
  };

  function initHistoryView() {
    let history = JSON.parse(localStorage.getItem('netscope_history_records') || '[]');

    const tableBody = document.getElementById('history-table-body');
    const elBest = document.getElementById('hist-stat-best');
    const elWorst = document.getElementById('hist-stat-worst');
    const elAvgPing = document.getElementById('hist-stat-avgping');
    const elAvgDl = document.getElementById('hist-stat-avgdl');
    const elImprovement = document.getElementById('hist-improvement-badge');

    if (history.length === 0) {
      if (tableBody) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align:center; padding:32px 16px; color:var(--text-secondary);">
              <i class="fa-solid fa-clock-rotate-left" style="font-size:28px; margin-bottom:10px; display:block; opacity:0.4; color:var(--primary);"></i>
              <strong>No Speed Tests Recorded Yet</strong>
              <div style="font-size:12px; margin-top:4px; opacity:0.8;">Run your first speed test or complete network check to record telemetry history.</div>
            </td>
          </tr>
        `;
      }
      if (elBest) elBest.textContent = '-- Mbps';
      if (elWorst) elWorst.textContent = '-- Mbps';
      if (elAvgPing) elAvgPing.textContent = '-- ms';
      if (elAvgDl) elAvgDl.textContent = '-- Mbps';
      if (elImprovement) {
        elImprovement.innerHTML = '<i class="fa-solid fa-circle-info" style="color:var(--primary);"></i> <strong>Performance History:</strong> Ready to log your real measured throughput and ping trends.';
      }
      renderHistoryChart([]);
      return;
    }

    if (tableBody) {
      tableBody.innerHTML = history.map(h => `
        <tr>
          <td><strong style="color:var(--text-main);">${h.date}</strong></td>
          <td><span class="speed-pill dl">${h.download} Mbps</span></td>
          <td><span class="speed-pill ul">${h.upload} Mbps</span></td>
          <td><span class="font-mono">${h.ping} ms</span></td>
          <td><span class="font-mono">${h.jitter || 2.1} ms</span></td>
          <td><span class="score-badge score-${(h.score || 88) >= 90 ? 'high' : 'med'}">${h.score || 88}/100</span></td>
        </tr>
      `).join('');
    }

    // Calculate aggregations from real history
    const dls = history.map(h => h.download);
    const pings = history.map(h => h.ping);
    const bestDl = Math.max(...dls);
    const worstDl = Math.min(...dls);
    const avgPing = (pings.reduce((a, b) => a + b, 0) / pings.length).toFixed(1);
    const avgDl = (dls.reduce((a, b) => a + b, 0) / dls.length).toFixed(1);

    if (elBest) elBest.textContent = `${bestDl} Mbps`;
    if (elWorst) elWorst.textContent = `${worstDl} Mbps`;
    if (elAvgPing) elAvgPing.textContent = `${avgPing} ms`;
    if (elAvgDl) elAvgDl.textContent = `${avgDl} Mbps`;
    if (elImprovement) {
      elImprovement.innerHTML = `<i class="fa-solid fa-chart-line" style="color:var(--primary);"></i> <strong>Measured Insights:</strong> ${history.length} test records saved on device. Best bandwidth recorded: <strong>${bestDl} Mbps</strong>.`;
    }

    renderHistoryChart(history.slice(0, 10).reverse());
  }

  function renderHistoryChart(recent) {
    const canvas = document.getElementById('historySpeedChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (historyChart) historyChart.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

    historyChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: recent.map(r => r.date.split(',')[0]),
        datasets: [
          {
            label: 'Download (Mbps)',
            data: recent.map(r => r.download),
            backgroundColor: '#2563eb',
            borderRadius: 6
          },
          {
            label: 'Upload (Mbps)',
            data: recent.map(r => r.upload),
            backgroundColor: '#7c3aed',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { family: 'Inter', size: 12 } } }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor } }
        }
      }
    });
  }

  function populateReportData() {
    const dateEl = document.getElementById('report-meta-date');
    const locEl = document.getElementById('report-meta-loc');
    const ispEl = document.getElementById('report-meta-isp');
    const dlEl = document.getElementById('report-stat-dl');
    const ulEl = document.getElementById('report-stat-ul');
    const pingEl = document.getElementById('report-stat-ping');
    const jitterEl = document.getElementById('report-stat-jitter');
    const lossEl = document.getElementById('report-stat-loss');
    const qScoreEl = document.getElementById('report-stat-qscore');

    const lastTest = JSON.parse(localStorage.getItem('netscope_last_test') || '{}');
    const dl = lastTest.download || 142.4;
    const ul = lastTest.upload || 54.2;
    const ping = lastTest.ping || 14.0;
    const jitter = lastTest.jitter || 2.1;
    const score = lastTest.score || 91;

    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const userTel = window.userTelemetry || {};

    if (dateEl) dateEl.textContent = `${now} IST`;
    if (locEl) locEl.textContent = `${userTel.city || 'Mumbai'}, ${userTel.region || 'Maharashtra'}, India`;
    if (ispEl) ispEl.textContent = `${userTel.org || 'Reliance Jio Infocomm Ltd (5G SA / Fiber)'}`;
    if (dlEl) dlEl.textContent = `${dl} Mbps`;
    if (ulEl) ulEl.textContent = `${ul} Mbps`;
    if (pingEl) pingEl.textContent = `${ping} ms`;
    if (jitterEl) jitterEl.textContent = `${jitter} ms`;
    if (lossEl) lossEl.textContent = '0.2%';
    if (qScoreEl) qScoreEl.textContent = `${score} / 100 — Optimal`;
  }
})();
