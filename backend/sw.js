// Service Worker - Offline Status Page Handler
// This service worker caches only the status page to display when server is unavailable

const CACHE_NAME = 'status-page-v1';
const OFFLINE_URL = '/offline.html';

// Install event - cache the offline page
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching offline page');
                return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve offline page when network fails
self.addEventListener('fetch', (event) => {
    // Only handle navigation requests (HTML pages)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    console.log('[SW] Network failed, serving offline page');
                    return caches.match(OFFLINE_URL);
                })
        );
    }
});
