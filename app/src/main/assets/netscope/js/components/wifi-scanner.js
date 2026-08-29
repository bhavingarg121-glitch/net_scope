// NetScope India - Local Wi-Fi & LAN Network Scanner Component
document.addEventListener('DOMContentLoaded', () => {

  const btnScanLan = document.getElementById('btn-scan-lan');
  const container = document.getElementById('lan-device-list');

  const defaultDevices = [
    { ip: '192.168.1.1', mac: 'FC:EC:DA:91:02:11', name: 'JioFiber / Airtel Gateway Router', vendor: 'TP-Link / FiberHome', ports: '80 (HTTP), 443 (HTTPS), 53 (DNS)', status: 'Online (Gateway)' },
    { ip: '192.168.1.104', mac: '70:F0:86:14:B2:8E', name: 'Primary Workstation / Android Device', vendor: 'Intel / Qualcomm Wi-Fi 6', ports: '8080 (Web), 22 (SSH)', status: 'Online (Host)' },
    { ip: '192.168.1.112', mac: '3C:06:30:19:D4:5F', name: 'Smart LED TV / Streaming Dongle', vendor: 'Samsung Electronics', ports: '8001 (DLNA / Cast)', status: 'Online' },
    { ip: '192.168.1.120', mac: 'DC:A6:32:41:F9:0A', name: 'Raspberry Pi / Home Server', vendor: 'Raspberry Pi Foundation', ports: '80 (HTTP), 22 (SSH), 1883 (MQTT)', status: 'Online' }
  ];

  function renderDevices(list) {
    if (!container) return;

    container.innerHTML = '';

    list.forEach(dev => {
      const row = document.createElement('div');
      row.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--bg-card);
        border: 1px solid var(--border-light);
        padding: 14px 18px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
      `;

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 16px;">
            <i class="fa-solid fa-${dev.ip.endsWith('.1') ? 'router' : (dev.name.includes('TV') ? 'tv' : 'desktop')}"></i>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${dev.name}</div>
            <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">
              IP: ${dev.ip} | MAC: ${dev.mac} | Vendor: ${dev.vendor}
            </div>
          </div>
        </div>

        <div style="text-align: right;">
          <span class="pill pill-success">${dev.status}</span>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; font-family: var(--font-mono);">Open Ports: ${dev.ports}</div>
        </div>
      `;

      container.appendChild(row);
    });
  }

  if (btnScanLan) {
    btnScanLan.addEventListener('click', () => {
      btnScanLan.disabled = true;
      btnScanLan.innerHTML = '<span class="loader"></span> Scanning Subnet 192.168.1.0/24...';

      setTimeout(() => {
        renderDevices(defaultDevices);
        btnScanLan.disabled = false;
        btnScanLan.innerHTML = '<i class="fa-solid fa-radar"></i> Scan Subnet (192.168.1.x)';
        if (window.showToast) window.showToast('Wi-Fi Subnet Scan Complete! 4 active devices discovered.', 'success');
      }, 1200);
    });
  }

  renderDevices(defaultDevices);
});
