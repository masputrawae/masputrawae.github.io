importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js");


const CACHE_VERSION = 'v{{ now.Format "0601021504" }}';
const CACHE_NAME = `${CACHE_VERSION}-site`;

if (workbox) {
  workbox.core.clientsClaim();
  self.skipWaiting();

  // Caching file statis (CSS dan JS)
  workbox.routing.registerRoute(
    ({ request }) =>
      (request.destination === "style" || request.destination === "script") &&
      (request.url.includes('{{ "css/" | relURL }}') ||
        request.url.includes('{{ "js/" | relURL }}')),
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_NAME}-static`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 86400,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /https:\/\/cdn.jsdelivr.net\/npm\/mathjax@3\/es5\/tex-chtml.js/,
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_NAME}-static`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 86400, // 30 hari
        }),
      ],
    })
  );

  // Hanya menangani asset
  workbox.routing.registerRoute(
    new RegExp(
      "https://res\\.cloudinary\\.com/.*\\.(jpg|jpeg|png|webp|gif|svg|mp4|mp3|woff2|ttf)(\\?.*)?$"
    ),
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_NAME}-image-assets`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 86400, // 60 hari
        }),
      ],
    })
  );

  self.addEventListener("install", (event) => {
    event.waitUntil(
      (async () => {
        const JSON_INDEX_URL = `{{ "news.json" | relURL }}?v=${CACHE_VERSION}`;
        const htmlCache = await caches.open(`${CACHE_NAME}-html`);

        try {
          const response = await fetch(JSON_INDEX_URL);
          if (!response.ok) throw new Error("Failed to fetch news.json");

          const allUrls = await response.json();
          const urls = allUrls.slice(0, 2000);
          await Promise.allSettled(
            urls.map(async (rawUrl) => {
              try {
                const url = new URL(rawUrl, self.location.origin).toString();
                const fetchResponse = await fetch(url);
                if (!fetchResponse.ok) {
                  return;
                }
                await htmlCache.put(url, fetchResponse.clone());
              } catch (err) {
              }
            })
          );
        } catch (err) {
        }
      })()
    );
  });
  self.addEventListener("activate", (event) => {
    const keep = [
      `${CACHE_NAME}-html`,
      `${CACHE_NAME}-static`,
    ];

    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (!keep.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
    );
  });
} else {
  console.warn("[SW] Workbox gagal dimuat.");
}
