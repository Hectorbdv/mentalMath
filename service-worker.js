const CACHE_NAME = "daily-math-v3";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./icon.png",
  "./favicon.ico",
  "./favicon-16.png",
  "./favicon-32.png",
  "./apple-touch-icon.png",
  "./fonts/ibm-plex-sans-v23-latin-300.woff2",
  "./fonts/ibm-plex-sans-v23-latin-regular.woff2",
  "./fonts/ibm-plex-sans-v23-latin-500.woff2",
  "./fonts/inter-v20-latin-300.woff2",
  "./fonts/inter-v20-latin-regular.woff2",
  "./fonts/inter-v20-latin-500.woff2",
  "./fonts/libre-franklin-v20-latin-300.woff2",
  "./fonts/libre-franklin-v20-latin-regular.woff2",
  "./fonts/libre-franklin-v20-latin-500.woff2",
  "./fonts/roboto-v51-latin-300.woff2",
  "./fonts/roboto-v51-latin-regular.woff2",
  "./fonts/roboto-v51-latin-500.woff2",
  "./fonts/source-sans-3-v19-latin-300.woff2",
  "./fonts/source-sans-3-v19-latin-regular.woff2",
  "./fonts/source-sans-3-v19-latin-500.woff2"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
