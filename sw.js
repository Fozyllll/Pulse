// PULSE — Service Worker v2
// Cache strategy: Cache First pour les assets, Network First pour Supabase

const CACHE_NAME = 'pulse-v27';
const ASSETS = [
  '/Pulse/',
  '/Pulse/index.html',
  '/Pulse/manifest.json',
  '/Pulse/icon-192.png',
  '/Pulse/icon-512.png',
];

// Install — pre-cache les fichiers du jeu
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(() => {
        // Si un asset échoue, on continue quand même
        console.log('[SW] Certains assets non cachés');
      });
    })
  );
  self.skipWaiting();
});

// Activate — supprimer les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — stratégie hybride
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Supabase + CDN = toujours réseau (pas de cache)
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('jsdelivr.net') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Fichiers du jeu = Cache First (marche hors-ligne)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Mettre en cache les nouvelles réponses valides
        if (response && response.status === 200 && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback offline — renvoyer l'index.html pour la navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/Pulse/index.html');
        }
      });
    })
  );
});
