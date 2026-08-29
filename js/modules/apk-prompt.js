// NetScope India - Post-Test Android APK Download Manager
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('apk-download-modal');
  const btnClose = document.getElementById('btn-close-apk-modal');
  const btnContinueWeb = document.getElementById('btn-modal-continue-web');
  const btnDownloadApk = document.getElementById('btn-modal-download-apk');

  // Check if currently running inside native Android WebView container
  function isNativeAndroidApp() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroidWV = /NetScopeAndroid|wv/.test(ua) && /Android/i.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    return isAndroidWV || isStandalone || window.isNativeApp === true;
  }

  // Open the APK Download Prompt Modal
  window.openApkDownloadModal = function() {
    if (isNativeAndroidApp()) {
      // User is already inside the Android APK app!
      return;
    }
    if (modal) {
      modal.classList.add('active');
    }
  };

  // Close the APK Download Prompt Modal
  window.closeApkDownloadModal = function() {
    if (modal) {
      modal.classList.remove('active');
    }
  };

  // Global trigger called whenever any test (Speed Test, Quick Audit, Ping, Wi-Fi) completes
  window.notifyTestCompleted = function(testType = 'Speed Test') {
    if (isNativeAndroidApp()) return;

    try {
      let count = parseInt(localStorage.getItem('netscope_test_count') || '0', 10);
      count += 1;
      localStorage.setItem('netscope_test_count', count.toString());

      const promptDismissedSession = sessionStorage.getItem('netscope_apk_prompt_dismissed');
      const alreadyDownloaded = localStorage.getItem('netscope_apk_downloaded');

      // Prompt on the 1st test completion, or if never dismissed in this session
      if (!promptDismissedSession && !alreadyDownloaded) {
        setTimeout(() => {
          window.openApkDownloadModal();
          sessionStorage.setItem('netscope_apk_prompt_dismissed', 'true');
        }, 1200); // 1.2s delay so user sees their test result first
      }
    } catch (e) {
      console.warn('Telemetry storage check error:', e);
    }
  };

  // Bind close buttons
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      window.closeApkDownloadModal();
      sessionStorage.setItem('netscope_apk_prompt_dismissed', 'true');
    });
  }

  if (btnContinueWeb) {
    btnContinueWeb.addEventListener('click', () => {
      window.closeApkDownloadModal();
      sessionStorage.setItem('netscope_apk_prompt_dismissed', 'true');
      if (window.showToast) {
        window.showToast('Continuing on NetScope Web. Tap "Android APK" in the top bar anytime to install!', 'info');
      }
    });
  }

  if (btnDownloadApk) {
    btnDownloadApk.addEventListener('click', () => {
      localStorage.setItem('netscope_apk_downloaded', 'true');
      if (window.showToast) {
        window.showToast('Starting NetScope Android APK Download (v1.0.0)...', 'success');
      }
      setTimeout(() => {
        window.closeApkDownloadModal();
      }, 800);
    });
  }

  // Close when clicking modal backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeApkDownloadModal();
        sessionStorage.setItem('netscope_apk_prompt_dismissed', 'true');
      }
    });
  }
});
