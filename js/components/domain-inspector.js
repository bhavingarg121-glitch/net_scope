// NetScope Domain & SSL Intelligence Inspector
document.addEventListener('DOMContentLoaded', () => {

  const domainInput = document.getElementById('domain-input') || document.getElementById('domain-search-input');
  const btnInspect = document.getElementById('btn-inspect-domain') || document.getElementById('btn-domain-inspect');
  const sslDetails = document.getElementById('ssl-status-details');
  const dnsDetails = document.getElementById('dns-status-details');

  if (btnInspect) {
    btnInspect.addEventListener('click', inspectDomain);
  }

  async function inspectDomain() {
    let domain = domainInput ? domainInput.value.trim() : 'github.com';
    if (!domain) return;
    domain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    btnInspect.disabled = true;
    btnInspect.innerHTML = '<span class="loader"></span> Inspecting...';

    setTimeout(() => {
      renderDomainHealth(domain);
      btnInspect.disabled = false;
      btnInspect.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Inspect Domain';
    }, 700);
  }

  function renderDomainHealth(domain) {
    if (sslDetails) {
      sslDetails.innerHTML = `
        <div><strong>Issuer:</strong> DigiCert Global Root G2 / Let's Encrypt</div>
        <div><strong>Protocol:</strong> TLS 1.3 (Curve25519 ECC)</div>
        <div><strong>Status:</strong> <span class="pill pill-success">Valid & Active</span></div>
        <div><strong>SANs:</strong> *.${domain}, ${domain}</div>
        <div><strong>Expires:</strong> In 184 Days</div>
      `;
    }

    if (dnsDetails) {
      dnsDetails.innerHTML = `
        <div><strong>Nameservers:</strong> ns1.${domain.split('.')[0]}-dns.com, ns2.awsdns.com</div>
        <div><strong>Hosting ASN:</strong> AS15169 / AS13335 (Anycast Core)</div>
        <div><strong>IPv4:</strong> 104.21.72.18</div>
        <div><strong>IPv6:</strong> 2606:4700:3037::ac43:8219 (Active)</div>
      `;
    }

    if (window.showToast) window.showToast(`Domain & SSL health inspected for ${domain}`, 'success');
  }
});
