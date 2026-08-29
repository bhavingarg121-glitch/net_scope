// NetScope India - First Launch Onboarding Experience
(function() {
  'use strict';

  window.openOnboardingModal = function() {
    const modal = document.getElementById('onboarding-modal');
    if (modal) modal.classList.add('active');
  };

  window.closeOnboardingModal = function() {
    const modal = document.getElementById('onboarding-modal');
    if (modal) modal.classList.remove('active');
    localStorage.setItem('netscope_onboarding_completed', 'true');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('onboarding-modal');
    const btnGetStarted = document.getElementById('btn-onboard-get-started');
    const btnClose = document.getElementById('btn-close-onboarding');
    const btnReopen = document.getElementById('btn-reopen-onboarding');

    // Onboarding Action Cards
    const cardSpeed = document.getElementById('onboard-action-speed');
    const cardWifi = document.getElementById('onboard-action-wifi');
    const cardSec = document.getElementById('onboard-action-sec');
    const cardSlow = document.getElementById('onboard-action-slow');
    const cardAudit = document.getElementById('onboard-action-audit');

    if (btnGetStarted) {
      btnGetStarted.addEventListener('click', () => {
        const step1 = document.getElementById('onboard-step-1');
        const step2 = document.getElementById('onboard-step-2');
        if (step1 && step2) {
          step1.style.display = 'none';
          step2.style.display = 'block';
        }
      });
    }

    if (cardSpeed) {
      cardSpeed.addEventListener('click', () => {
        window.closeOnboardingModal();
        window.switchTab('tab-speed');
      });
    }

    if (cardWifi) {
      cardWifi.addEventListener('click', () => {
        window.closeOnboardingModal();
        window.switchTab('tab-wifi');
      });
    }

    if (cardSec) {
      cardSec.addEventListener('click', () => {
        window.closeOnboardingModal();
        window.switchTab('tab-security');
      });
    }

    if (cardSlow) {
      cardSlow.addEventListener('click', () => {
        window.closeOnboardingModal();
        if (window.runWhySlowDiagnostic) window.runWhySlowDiagnostic();
      });
    }

    if (cardAudit) {
      cardAudit.addEventListener('click', () => {
        window.closeOnboardingModal();
        if (window.runQuickAudit) window.runQuickAudit();
      });
    }

    if (btnClose) btnClose.addEventListener('click', () => window.closeOnboardingModal());
    if (btnReopen) btnReopen.addEventListener('click', () => {
      const step1 = document.getElementById('onboard-step-1');
      const step2 = document.getElementById('onboard-step-2');
      if (step1 && step2) {
        step1.style.display = 'block';
        step2.style.display = 'none';
      }
      window.openOnboardingModal();
    });

    // Check if first launch
    const completed = localStorage.getItem('netscope_onboarding_completed');
    if (!completed) {
      setTimeout(() => {
        window.openOnboardingModal();
      }, 1600);
    }
  });
})();
