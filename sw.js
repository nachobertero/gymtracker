// ─── SERVICE WORKER — GYM TRACKER ───────────────
const CACHE_NAME = 'gym-tracker-v1';

// Archivos que se cachean para funcionar offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// ─── INSTALL: cachear assets estáticos ──────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting(); // Activar inmediatamente sin esperar
});

// ─── ACTIVATE: limpiar caches viejos ────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // Tomar control de todas las tabs abiertas
});

// ─── FETCH: Network first, fallback a cache ─────
// Así siempre muestra la versión más nueva cuando hay internet,
// y funciona offline usando el cache como respaldo.
self.addEventListener('fetch', event => {
  // Solo interceptar requests del mismo origen
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, actualizar el cache
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Sin internet: usar cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback final: index.html
          return caches.match('/index.html');
        });
      })
  );
});
