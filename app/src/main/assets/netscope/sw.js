// NetScope India Service Worker - Offline Cache & Fast PWA Boot
const CACHE_NAME = 'netscope-v3.0';
const ASSETS_TO_CACHE = [
  './index.html',
  './index.css',
  './js/app.js',
  './js/modules/dashboard.js',
  './js/modules/service-status.js',
  './js/modules/slow-diagnostics.js',
  './js/modules/onboarding.js',
  './js/modules/share-card.js',
  './js/modules/telecom-intel.js',
  './js/modules/cell-map.js',
  './js/modules/live-locator.js',
  './js/modules/quick-audit.js',
  './js/modules/history.js',
  './js/modules/wifi-analyzer.js',
  './js/modules/system-debugger.js',
  './js/modules/ai-assistant.js',
  './js/components/speed-test.js',
  './js/components/api-tester.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Let network requests flow with cache fallback
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
