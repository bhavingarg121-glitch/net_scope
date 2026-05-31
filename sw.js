const CACHE_NAME = "netscope-cache-v1";

const urlsToCache = [
  "/"
  "/index.html",
  "/manifest.json",
  "/Icon.png"
];

self.addEventListener("install", event => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
