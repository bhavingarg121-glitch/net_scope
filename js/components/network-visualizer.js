// NetScope Interactive Network Topology Visualizer & Traceroute Engine
document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('topologyCanvas');
  const btnTraceRoute = document.getElementById('btn-trace-route');
  const btnResetNodes = document.getElementById('btn-reset-nodes');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let animId = null;

  let nodes = [];
  let links = [];
  let packets = [];

  function initGraphData() {
    const cx = width / 2;
    const cy = height / 2;

    nodes = [
      { id: 'client', label: 'Client Gateway', sub: '192.168.1.1', x: cx - 280, y: cy, color: '#2563eb', type: 'host', latency: 1 },
      { id: 'isp', label: 'ISP Border Router', sub: '10.24.0.1 (BGP)', x: cx - 140, y: cy - 90, color: '#0284c7', type: 'router', latency: 8 },
      { id: 'dns', label: 'Cloudflare DNS', sub: '1.1.1.1 (DoH)', x: cx - 140, y: cy + 100, color: '#10b981', type: 'server', latency: 12 },
      { id: 'backbone1', label: 'Tier-1 Backbone Hop', sub: '172.16.100.4', x: cx + 20, y: cy - 110, color: '#4f46e5', type: 'router', latency: 24 },
      { id: 'backbone2', label: 'Global IXP Exchange', sub: '198.32.176.1', x: cx + 40, y: cy + 90, color: '#7c3aed', type: 'router', latency: 32 },
      { id: 'edge', label: 'CDN Edge Node', sub: '104.21.54.192', x: cx + 200, y: cy - 40, color: '#f59e0b', type: 'edge', latency: 38 },
      { id: 'server', label: 'Target Web Server', sub: '203.0.113.88 (HTTP/3)', x: cx + 320, y: cy + 40, color: '#2563eb', type: 'destination', latency: 42 }
    ];

    links = [
      { from: 'client', to: 'isp', label: 'Ethernet 1Gbps', latency: '2ms' },
      { from: 'client', to: 'dns', label: 'UDP 53 / DoH', latency: '4ms' },
      { from: 'isp', to: 'backbone1', label: 'Fiber Optical (100G)', latency: '16ms' },
      { from: 'dns', to: 'backbone2', label: 'Anycast Route', latency: '20ms' },
      { from: 'backbone1', to: 'edge', label: 'BGP Route v4', latency: '14ms' },
      { from: 'backbone2', to: 'edge', label: 'Backbone Link', latency: '10ms' },
      { from: 'edge', to: 'server', label: 'Reverse Proxy', latency: '4ms' }
    ];

    packets = [];
  }

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    width = canvas.width;
    height = canvas.height;
    if (nodes.length === 0) initGraphData();
  }

  window.initNetworkVisualizer = function() {
    resizeCanvas();
    if (!animId) loop();
  };

  let draggedNode = null;
  let hoverNode = null;

  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    nodes.forEach(n => {
      const dx = n.x - mx;
      const dy = n.y - my;
      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        draggedNode = n;
      }
    });
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (draggedNode) {
      draggedNode.x = mx;
      draggedNode.y = my;
    }

    hoverNode = null;
    nodes.forEach(n => {
      const dx = n.x - mx;
      const dy = n.y - my;
      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        hoverNode = n;
      }
    });
    canvas.style.cursor = hoverNode ? 'pointer' : (draggedNode ? 'grabbing' : 'default');
  });

  window.addEventListener('mouseup', () => {
    draggedNode = null;
  });

  function triggerTraceroute() {
    packets = [];
    const route = ['client', 'isp', 'backbone1', 'edge', 'server'];

    route.forEach((nodeId, idx) => {
      if (idx < route.length - 1) {
        const fromNode = nodes.find(n => n.id === nodeId);
        const toNode = nodes.find(n => n.id === route[idx + 1]);

        setTimeout(() => {
          packets.push({
            from: fromNode,
            to: toNode,
            progress: 0,
            speed: 0.025,
            color: '#2563eb'
          });
        }, idx * 400);
      }
    });

    if (window.showToast) window.showToast('Visual Traceroute dispatched! Tracing 5 hops...', 'info');
  }

  if (btnTraceRoute) btnTraceRoute.addEventListener('click', triggerTraceroute);
  if (btnResetNodes) btnResetNodes.addEventListener('click', () => { initGraphData(); });

  function loop() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const linkColor = isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1';
    const labelColor = isDark ? '#94a3b8' : '#64748b';
    const titleColor = isDark ? '#f9fafb' : '#0f172a';
    const nodeBg = isDark ? '#1f2937' : '#ffffff';

    // 1. Draw Links
    links.forEach(link => {
      const n1 = nodes.find(n => n.id === link.from);
      const n2 = nodes.find(n => n.id === link.to);
      if (!n1 || !n2) return;

      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.strokeStyle = linkColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      const mx = (n1.x + n2.x) / 2;
      const my = (n1.y + n2.y) / 2;
      ctx.fillStyle = labelColor;
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(link.latency, mx, my - 6);
    });

    // 2. Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;

      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;

      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (p.progress >= 1) {
        packets.splice(i, 1);
      }
    }

    // 3. Nodes
    nodes.forEach(n => {
      const isHover = hoverNode === n;

      ctx.beginPath();
      ctx.arc(n.x, n.y, isHover ? 24 : 18, 0, Math.PI * 2);
      ctx.fillStyle = nodeBg;
      ctx.strokeStyle = n.color;
      ctx.lineWidth = isHover ? 3 : 2;
      ctx.shadowColor = n.color;
      ctx.shadowBlur = isHover ? 12 : 4;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      ctx.fillStyle = titleColor;
      ctx.font = '600 12px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + 34);

      ctx.fillStyle = labelColor;
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(n.sub, n.x, n.y + 46);
    });

    animId = requestAnimationFrame(loop);
  }

  setTimeout(() => {
    window.initNetworkVisualizer();
  }, 200);

});
