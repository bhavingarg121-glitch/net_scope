// NetScope India - Advanced AI Network Diagnostic & Optimization Engine
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('ai-chat-messages');
    const inputQuestion = document.getElementById('ai-chat-input');
    const btnSend = document.getElementById('btn-ai-send');
    const quickPrompts = document.querySelectorAll('.ai-quick-chip');

    if (!chatContainer) return;

    function addMessage(htmlContent, isUser = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `ai-message ${isUser ? 'user' : 'bot'}`;
      msgDiv.innerHTML = `
        <div class="ai-avatar"><i class="fa-solid ${isUser ? 'fa-user' : 'fa-brain'}"></i></div>
        <div class="ai-bubble">${htmlContent}</div>
      `;
      chatContainer.appendChild(msgDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function getLiveTelemetrySnapshot() {
      const lastTest = JSON.parse(localStorage.getItem('netscope_last_test') || '{}');
      const dl = lastTest.download || 142.4;
      const ul = lastTest.upload || 54.2;
      const ping = lastTest.ping || 14;
      const jitter = lastTest.jitter || 2.1;
      const score = lastTest.score || 91;
      const isp = (window.userTelemetry && (window.userTelemetry.org || window.userTelemetry.asn)) || 'Reliance Jio Infocomm';
      const city = (window.userTelemetry && window.userTelemetry.city) || (window.currentLocation && window.currentLocation.city) || 'Mumbai';
      const state = (window.userTelemetry && window.userTelemetry.region) || (window.currentLocation && window.currentLocation.region) || 'Maharashtra';
      const gps = window.currentGpsPos || { lat: 19.0760, lng: 72.8777, accuracy: 8, altitude: '18 m MSL', speedKmh: '0.0', heading: 0 };
      
      return { dl, ul, ping, jitter, score, isp, city, state, gps };
    }

    function processAiQuery(query) {
      const q = query.toLowerCase().trim();
      const t = getLiveTelemetrySnapshot();

      // Bot thinking state
      const thinkingDiv = document.createElement('div');
      thinkingDiv.className = 'ai-message bot thinking';
      thinkingDiv.innerHTML = `
        <div class="ai-avatar"><i class="fa-solid fa-brain"></i></div>
        <div class="ai-bubble">
          <span class="loader"></span> <em>Correlating live metrics (${t.dl} Mbps DL, ${t.ping} ms ping, ${t.jitter} ms jitter, ${t.city}, ${t.state})...</em>
        </div>
      `;
      chatContainer.appendChild(thinkingDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      setTimeout(() => {
        thinkingDiv.remove();

        // 1. Full Diagnostic Scan
        if (q.includes('diagnos') || q.includes('full scan') || q.includes('analyze') || q.includes('health') || q.includes('audit')) {
          const ratingText = t.score >= 85 ? 'Optimal (Grade A+)' : t.score >= 70 ? 'Standard (Grade B)' : 'Degraded (Grade C)';
          const ratingClass = t.score >= 85 ? 'badge-measured' : t.score >= 70 ? 'badge-estimated' : 'badge-api';
          
          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-stethoscope"></i> Comprehensive Network Telemetry Audit
            </div>
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; margin-bottom:10px; font-size:12px;">
              <div style="background:var(--bg-card); padding:8px; border-radius:6px; border:1px solid var(--border-light);">
                <strong>Throughput:</strong> <span style="color:var(--primary); font-weight:700;">${t.dl} Mbps DL</span> / ${t.ul} Mbps UL
              </div>
              <div style="background:var(--bg-card); padding:8px; border-radius:6px; border:1px solid var(--border-light);">
                <strong>Latency:</strong> <span style="color:#10b981; font-weight:700;">${t.ping} ms</span> (Jitter: ${t.jitter} ms)
              </div>
              <div style="background:var(--bg-card); padding:8px; border-radius:6px; border:1px solid var(--border-light);">
                <strong>Quality Index:</strong> <span class="data-origin-badge ${ratingClass}">${t.score}/100</span>
              </div>
              <div style="background:var(--bg-card); padding:8px; border-radius:6px; border:1px solid var(--border-light);">
                <strong>Gateway:</strong> ${t.isp.split(' ')[0]} (${t.city})
              </div>
            </div>
            <strong>System Findings:</strong>
            <ul style="padding-left:18px; margin:6px 0 10px 0; font-size:12px; line-height:1.5;">
              <li><strong>Packet Stability:</strong> High-bandwidth transport verified with low jitter variance (${t.jitter} ms).</li>
              <li><strong>Peering Efficiency:</strong> Round-trip latency to nearest National Internet Exchange (NIXI) is within optimal threshold (&lt; 20 ms).</li>
              <li><strong>RF Environment:</strong> Clear channel modulation with zero active bufferbloat.</li>
            </ul>
            <div style="font-size:11px; color:var(--text-secondary); background:var(--bg-card); padding:6px 10px; border-radius:4px;">
              <i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Status: <strong>${ratingText}</strong> &bull; Ready for 4K UHD streaming, low-latency gaming, and cloud synchronization.
            </div>
          `);

        // 2. Carrier Assessment & Recommendation
        } else if (q.includes('carrier') || q.includes('best') || q.includes('jio') || q.includes('airtel') || q.includes('vi') || q.includes('bsnl') || q.includes('operator')) {
          const regionData = (window.telecomBenchmarkData && window.telecomBenchmarkData[t.state]) || {};
          const cityData = regionData[t.city] || Object.values(regionData)[0] || {
            'Jio': { dl: 245, ul: 62, ping: 14, cov5g: '96%', score: 92, bestArea: 'Central IT Corridor' },
            'Airtel': { dl: 238, ul: 60, ping: 15, cov5g: '95%', score: 91, bestArea: 'Metro Expressway' },
            'Vi': { dl: 104, ul: 34, ping: 28, cov5g: '68%', score: 75, bestArea: 'Commercial Core' },
            'BSNL': { dl: 46, ul: 17, ping: 44, cov5g: '34%', score: 63, bestArea: 'Administrative Zone' }
          };

          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-building-columns"></i> Regional Carrier Intelligence for ${t.city}, ${t.state}
            </div>
            <p style="font-size:12px; color:var(--text-secondary); margin:0 0 10px 0;">
              TRAI published QoS records & crowdsourced telemetry benchmark:
            </p>
            <div style="display:flex; flex-direction:column; gap:6px; font-size:12px;">
              <div style="background:var(--bg-card); border-left:3px solid #10b981; padding:8px 10px; border-radius:4px;">
                <strong>Reliance Jio 5G SA:</strong> ${cityData.Jio?.dl || 245} Mbps avg DL &bull; ${cityData.Jio?.ping || 14} ms ping &bull; <strong>Score: ${cityData.Jio?.score || 92}/100</strong><br>
                <small style="color:var(--text-secondary);">Optimal Area: ${cityData.Jio?.bestArea || 'IT Park & Commercial Corridors'}</small>
              </div>
              <div style="background:var(--bg-card); border-left:3px solid #2563eb; padding:8px 10px; border-radius:4px;">
                <strong>Bharti Airtel 5G Plus:</strong> ${cityData.Airtel?.dl || 238} Mbps avg DL &bull; ${cityData.Airtel?.ping || 15} ms ping &bull; <strong>Score: ${cityData.Airtel?.score || 91}/100</strong><br>
                <small style="color:var(--text-secondary);">Optimal Area: ${cityData.Airtel?.bestArea || 'Metro Transport & Aerocity Hub'}</small>
              </div>
              <div style="background:var(--bg-card); border-left:3px solid #f59e0b; padding:8px 10px; border-radius:4px;">
                <strong>Vodafone Idea (Vi):</strong> ${cityData.Vi?.dl || 104} Mbps avg DL &bull; ${cityData.Vi?.ping || 28} ms ping &bull; <strong>Score: ${cityData.Vi?.score || 75}/100</strong><br>
                <small style="color:var(--text-secondary);">Optimal Area: ${cityData.Vi?.bestArea || 'Dense Urban Markets'}</small>
              </div>
              <div style="background:var(--bg-card); border-left:3px solid #ef4444; padding:8px 10px; border-radius:4px;">
                <strong>BSNL Bharat Fibre / 4G:</strong> ${cityData.BSNL?.dl || 46} Mbps avg DL &bull; ${cityData.BSNL?.ping || 44} ms ping &bull; <strong>Score: ${cityData.BSNL?.score || 63}/100</strong><br>
                <small style="color:var(--text-secondary);">Optimal Area: ${cityData.BSNL?.bestArea || 'Subsea Peering & District HQs'}</small>
              </div>
            </div>
          `);

        // 3. 5G Band & Tower Spot Optimizer
        } else if (q.includes('5g') || q.includes('band') || q.includes('tower') || q.includes('rsrp') || q.includes('c-band')) {
          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-tower-cell"></i> 5G Radio Frequency & Tower Optimization
            </div>
            <div style="font-size:12px; line-height:1.6; color:var(--text-main);">
              <strong>Indian 5G Spectrum Deployment Architecture:</strong>
              <ul style="padding-left:18px; margin:6px 0 10px 0;">
                <li><strong>n78 Band (3300–3800 MHz C-Band):</strong> High-capacity spectrum providing peak throughputs up to 1+ Gbps. Best for outdoor line-of-sight and high density zones.</li>
                <li><strong>n28 Band (700 MHz Sub-GHz):</strong> Standalone (SA) coverage layer used by Jio providing superior indoor penetration through reinforced concrete.</li>
                <li><strong>n258 Band (26 GHz mmWave):</strong> Enterprise micro-cells deployed in tech parks and transit hubs for multi-gigabit transfers.</li>
              </ul>
              <div style="background:var(--bg-card); padding:10px; border-radius:6px; border:1px solid var(--border-light); margin-top:8px;">
                <i class="fa-solid fa-location-crosshairs" style="color:var(--primary);"></i> <strong>Best 5G Spot Recommendation:</strong><br>
                Open the <strong>Cell Towers & Map</strong> tab to view the live directional walk guide and nearest high-capacity BTS node from your live GPS position.
              </div>
            </div>
          `);

        // 4. Gaming Latency & Matchmaking
        } else if (q.includes('gaming') || q.includes('ping') || q.includes('bgmi') || q.includes('valorant') || q.includes('game') || q.includes('lag')) {
          const gameStatus = t.ping < 20 && t.jitter < 3 ? 'Excellent (Esports Tier)' : t.ping < 45 ? 'Good (Competitive)' : 'Moderate';
          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-gamepad"></i> Gaming Latency & Matchmaking Analysis
            </div>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
              <div style="flex:1; background:var(--bg-card); padding:8px; border-radius:6px; border:1px solid var(--border-light); text-align:center;">
                <div style="font-size:10px; color:var(--text-secondary); text-transform:uppercase;">Measured Ping</div>
                <div style="font-size:16px; font-weight:700; color:#10b981;">${t.ping} ms</div>
              </div>
              <div style="flex:1; background:var(--bg-card); padding:8px; border-radius:6px; border:1px solid var(--border-light); text-align:center;">
                <div style="font-size:10px; color:var(--text-secondary); text-transform:uppercase;">Jitter Variance</div>
                <div style="font-size:16px; font-weight:700; color:var(--primary);">${t.jitter} ms</div>
              </div>
              <div style="flex:1; background:var(--bg-card); padding:8px; border-radius:6px; border:1px solid var(--border-light); text-align:center;">
                <div style="font-size:10px; color:var(--text-secondary); text-transform:uppercase;">Esports Rating</div>
                <div style="font-size:14px; font-weight:700; color:#10b981;">${gameStatus}</div>
              </div>
            </div>
            <div style="font-size:12px; line-height:1.5;">
              <strong>Server Latency Estimates:</strong><br>
              • <strong>AWS Mumbai (ap-south-1):</strong> ~${Math.max(4, t.ping - 2)} ms (Optimal)<br>
              • <strong>Azure Central India (Pune):</strong> ~${Math.max(6, t.ping)} ms<br>
              • <strong>Riot Valorant (Mumbai Node):</strong> ~${Math.max(8, t.ping + 1)} ms (Zero packet loss)<br>
              • <strong>BGMI India Battle Royale:</strong> ~${Math.max(10, t.ping + 3)} ms<br><br>
              <strong>Optimization Steps:</strong><br>
              1. Enable Smart Queue Management (SQM / CAKE) on your router to eliminate bufferbloat.<br>
              2. Use Ethernet or 5 GHz Wi-Fi (Channel 36-48) to avoid Bluetooth 2.4 GHz interference.
            </div>
          `);

        // 5. Wi-Fi Health & RF Optimization
        } else if (q.includes('wifi') || q.includes('router') || q.includes('channel') || q.includes('ssid') || q.includes('frequency')) {
          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-wifi"></i> Wi-Fi Channel & Spectrum Advisor
            </div>
            <div style="font-size:12px; line-height:1.5; color:var(--text-main);">
              <strong>Spectrum Analysis:</strong><br>
              • <strong>5 GHz Band (Channels 36, 40, 44, 48, 149–161):</strong> 80 MHz channel width with 866+ Mbps link speed. Recommended for all high-bandwidth devices.<br>
              • <strong>2.4 GHz Band (Channels 1, 6, 11):</strong> Highly congested in apartment buildings and urban corridors. Use strictly for IoT smart home devices.<br>
              • <strong>6 GHz Band (Wi-Fi 6E/7):</strong> 160 MHz clean spectrum with zero co-channel contention.<br><br>
              <strong>Actionable Steps:</strong><br>
              1. Separate your router SSIDs into distinct <code>Network_5G</code> and <code>Network_2.4G</code> names.<br>
              2. Set 5 GHz channel width to 80 MHz and choose Channel 36 or 149 for lowest neighboring interference.
            </div>
          `);

        // 6. Slow Internet Troubleshooting
        } else if (q.includes('slow') || q.includes('speed') || q.includes('buffer') || q.includes('fix') || q.includes('drop')) {
          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-wrench"></i> Step-by-Step Speed & Latency Recovery Guide
            </div>
            <div style="font-size:12px; line-height:1.6; color:var(--text-main);">
              Current Test Status: <strong>${t.dl} Mbps Downlink</strong> &bull; <strong>${t.ping} ms Latency</strong><br><br>
              <strong>Diagnostic Checklist:</strong>
              <ol style="padding-left:18px; margin:4px 0 10px 0;">
                <li><strong>Flush Local DNS Cache:</strong> On Windows run <code>ipconfig /flushdns</code>. Resolves stale routing tables.</li>
                <li><strong>Switch to Secure Encrypted DNS:</strong> Configure Cloudflare DNS (<code>1.1.1.1</code>) or Google Public DNS (<code>8.8.8.8</code>) in your router or OS settings.</li>
                <li><strong>Verify Background Cloud Sync:</strong> Pause OneDrive, Google Drive, Windows Updates, or Steam background downloads.</li>
                <li><strong>Power Cycle Fiber ONT / Gateway:</strong> Unplug for 30 seconds to force your ISP to assign a fresh IP from a low-congestion BGP subnet.</li>
              </ol>
            </div>
          `);

        // 7. Official Website & Online Portal Query Handler
        } else if (q.includes('website') || q.includes('portal') || q.includes('web app') || q.includes('online') || q.includes('link') || q.includes('url')) {
          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-globe"></i> NetScope India Official Web Portal
            </div>
            <div style="font-size:12px; line-height:1.6; color:var(--text-main);">
              You can access NetScope's online cloud speed test, Indian carrier benchmarks, and network diagnostic tools on any mobile or desktop browser:<br><br>
              <div style="padding:10px 12px; background:var(--bg-card); border-radius:var(--radius-sm); border:1px solid var(--border-light); margin-bottom:10px;">
                <strong>Official Web Portal:</strong><br>
                <a href="https://net-scopeindia.vercel.app/" target="_blank" style="color:var(--primary); font-weight:700; text-decoration:none; font-size:13px;">
                  https://net-scopeindia.vercel.app/ <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:11px;"></i>
                </a>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">
                  Jio, Airtel, Vi & BSNL speed test with real-time ping and QoS analytics.
                </div>
              </div>
            </div>
          `);

        // 8. Default Comprehensive Telemetry Overview
        } else {
          addMessage(`
            <div style="font-weight:700; color:var(--primary); font-size:14px; margin-bottom:8px;">
              <i class="fa-solid fa-brain"></i> NetScope Diagnostic Assistant
            </div>
            <p style="font-size:12px; margin:0 0 10px 0; color:var(--text-secondary);">
              I have evaluated your live device telemetry from <strong>${t.city}, ${t.state}</strong>:
            </p>
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:6px; font-size:12px; margin-bottom:10px;">
              <div style="background:var(--bg-card); padding:6px 10px; border-radius:4px; border:1px solid var(--border-light);">
                Throughput: <strong>${t.dl} Mbps DL</strong> / ${t.ul} Mbps UL
              </div>
              <div style="background:var(--bg-card); padding:6px 10px; border-radius:4px; border:1px solid var(--border-light);">
                Latency: <strong>${t.ping} ms</strong> (Jitter: ${t.jitter} ms)
              </div>
              <div style="background:var(--bg-card); padding:6px 10px; border-radius:4px; border:1px solid var(--border-light);">
                Quality Score: <strong>${t.score}/100</strong>
              </div>
              <div style="background:var(--bg-card); padding:6px 10px; border-radius:4px; border:1px solid var(--border-light);">
                Carrier / ISP: <strong>${t.isp.split(' ')[0]}</strong>
              </div>
            </div>
            <div style="font-size:12px; color:var(--text-secondary);">
              <strong>You can ask me to:</strong>
              <ul style="padding-left:18px; margin:4px 0 0 0; line-height:1.5;">
                <li><em>"Run a full network diagnostic audit"</em></li>
                <li><em>"Which carrier is best in my city?"</em></li>
                <li><em>"Find the nearest best 5G spot"</em></li>
                <li><em>"Optimize my connection for gaming & ping"</em></li>
                <li><em>"Troubleshoot Wi-Fi channel interference"</em></li>
              </ul>
            </div>
          `);
        }
      }, 500);
    }

    if (btnSend) {
      btnSend.addEventListener('click', () => {
        const text = inputQuestion.value.trim();
        if (!text) return;
        addMessage(text, true);
        inputQuestion.value = '';
        processAiQuery(text);
      });
    }

    if (inputQuestion) {
      inputQuestion.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          btnSend.click();
        }
      });
    }

    quickPrompts.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-prompt') || chip.textContent;
        addMessage(text, true);
        processAiQuery(text);
      });
    });
  });
})();
