// NetScope India - Share Result Card Generator & Social Sharing Engine
(function() {
  'use strict';

  let currentCardData = null;

  window.shareResultCard = function(data = {}) {
    const modal = document.getElementById('share-card-modal');
    if (!modal) return;

    const lastTest = JSON.parse(localStorage.getItem('netscope_last_test') || '{}');
    const userTel = window.userTelemetry || {};

    currentCardData = {
      score: data.score || lastTest.score || 91,
      download: data.download || lastTest.download || 142.4,
      upload: data.upload || lastTest.upload || 54.2,
      ping: data.ping || lastTest.ping || 14,
      jitter: data.jitter || lastTest.jitter || 2.1,
      loss: data.loss || '0.2%',
      isp: data.isp || userTel.org || 'Reliance Jio 5G SA',
      city: userTel.city || 'Mumbai',
      region: userTel.region || 'India',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    renderCanvasCard(currentCardData);
    modal.classList.add('active');
  };

  function renderCanvasCard(d) {
    const canvas = document.getElementById('shareResultCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // High DPI background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#090d16');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Glowing border
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    // Top Header: Brand Logo & Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ NETSCOPE', 32, 48);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('India Telecom & QoS Intelligence', 32, 68);

    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'right';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(d.date, w - 32, 48);

    // Network Health Score Box
    ctx.fillStyle = 'rgba(37, 99, 235, 0.15)';
    ctx.beginPath();
    ctx.roundRect(32, 92, w - 64, 110, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#93c5fd';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('OVERALL NETWORK QUALITY SCORE', 52, 122);

    ctx.fillStyle = d.score >= 85 ? '#34d399' : d.score >= 70 ? '#fbbf24' : '#f87171';
    ctx.font = 'bold 44px Outfit, sans-serif';
    ctx.fillText(`${d.score}`, 52, 172);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 18px Outfit, sans-serif';
    ctx.fillText('/ 100', 115, 172);

    const ratingText = d.score >= 85 ? '✓ EXCELLENT QoS' : d.score >= 70 ? '✓ GOOD QoS' : '⚠ SUB-OPTIMAL';
    ctx.fillStyle = d.score >= 85 ? '#10b981' : d.score >= 70 ? '#f59e0b' : '#ef4444';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(ratingText, w - 52, 148);

    // 4 Metric Quadrants
    const metrics = [
      { label: 'DOWNLOAD', val: `${d.download} Mbps`, color: '#60a5fa' },
      { label: 'UPLOAD', val: `${d.upload} Mbps`, color: '#c084fc' },
      { label: 'PING LATENCY', val: `${d.ping} ms`, color: '#34d399' },
      { label: 'JITTER / LOSS', val: `${d.jitter} ms (${d.loss})`, color: '#fbbf24' }
    ];

    const boxW = (w - 64 - 16) / 2;
    const boxH = 68;

    metrics.forEach((m, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const bx = 32 + col * (boxW + 16);
      const by = 218 + row * (boxH + 12);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(m.label, bx + 14, by + 24);

      ctx.fillStyle = m.color;
      ctx.font = 'bold 18px "JetBrains Mono", monospace';
      ctx.fillText(m.val, bx + 14, by + 50);
    });

    // Footer Info Box
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Carrier: ${d.isp} • ${d.city}, ${d.region}`, 32, 385);

    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'right';
    ctx.fillText('net-scopeindia.vercel.app', w - 32, 385);
  }

  function getShareSummaryText() {
    if (!currentCardData) return 'Tested with NetScope India';
    return `⚡ NetScope India Network Report\n🏆 Score: ${currentCardData.score}/100\n⬇ Download: ${currentCardData.download} Mbps\n⬆ Upload: ${currentCardData.upload} Mbps\n⏱ Ping: ${currentCardData.ping} ms (Jitter: ${currentCardData.jitter} ms)\n📡 Carrier: ${currentCardData.isp}\n🔗 Check your speed: https://net-scopeindia.vercel.app/`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('share-card-modal');
    const btnClose = document.getElementById('btn-close-share-modal');
    const btnDownload = document.getElementById('btn-share-download-png');
    const btnCopy = document.getElementById('btn-share-copy-text');
    const btnNative = document.getElementById('btn-share-native-sheet');
    const btnWhatsApp = document.getElementById('btn-share-whatsapp');
    const btnX = document.getElementById('btn-share-twitter');
    const btnTelegram = document.getElementById('btn-share-telegram');

    if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));

    // Download PNG
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        const canvas = document.getElementById('shareResultCanvas');
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `NetScope_Report_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        if (window.showToast) window.showToast('NetScope Score Card downloaded as PNG image!', 'success');
      });
    }

    // Copy Summary Text
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        const text = getShareSummaryText();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            if (window.showToast) window.showToast('Report copied to clipboard!', 'success');
          });
        }
      });
    }

    // Native Share Sheet (Android Bridge or Web Share API)
    if (btnNative) {
      btnNative.addEventListener('click', () => {
        const text = getShareSummaryText();
        if (window.NetScopeNative && window.NetScopeNative.shareText) {
          window.NetScopeNative.shareText('NetScope Network Report', text);
        } else if (navigator.share) {
          navigator.share({
            title: 'NetScope Network Report',
            text: text,
            url: 'https://net-scopeindia.vercel.app/'
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText(text);
          if (window.showToast) window.showToast('Report copied to clipboard!', 'info');
        }
      });
    }

    // WhatsApp Direct Share
    if (btnWhatsApp) {
      btnWhatsApp.addEventListener('click', () => {
        const text = encodeURIComponent(getShareSummaryText());
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      });
    }

    // X (Twitter) Direct Share
    if (btnX) {
      btnX.addEventListener('click', () => {
        const text = encodeURIComponent(getShareSummaryText());
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      });
    }

    // Telegram Direct Share
    if (btnTelegram) {
      btnTelegram.addEventListener('click', () => {
        const text = encodeURIComponent(getShareSummaryText());
        window.open(`https://t.me/share/url?url=https://net-scopeindia.vercel.app/&text=${text}`, '_blank');
      });
    }
  });
})();
