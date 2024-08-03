var staticCacheName = "00";
var filesToCache = [
    "/build",
    "/storage/icons/icon.png",
    "/storage/icons/icon-144x144.png",
    "/storage/icons/icon-192x192.png",
    "/storage/icons/icon-230.png",
    "/storage/icons/icon-512x512.png",
    "/storage/login.png",
    "/storage/24-hours.gif",
    "/storage/404.gif",
    "/storage/article.gif",
    "/storage/articles_list.gif",
    "/storage/atmo.gif",
    "/storage/bill.gif",
    "/storage/capital.gif",
    "/storage/cart.gif",
    "/storage/charge_brotherhood.gif",
    "/storage/charge_yourself.gif",
    "/storage/dashboard.gif",
    "/storage/error-404.png",
    "/storage/invoice.gif",
    "/storage/loading.gif",
    "/storage/login.png",
    "/storage/receipt.gif",
    "/storage/shield.gif",
    "/storage/trash.gif",
    "/storage/watch.gif",
    "/storage/wind.gif",
    "/storage/users/alien_1.gif",
    "/storage/users/alien_1.png",
    "/storage/users/alien_2.gif",
    "/storage/users/alien_2.png",
    "/storage/users/alien_3.png",
    "/storage/users/alien_4.png",
    "/storage/users/alien_5.png",
    "/storage/users/alien_6.png",
    "/storage/users/alien_7.png",
    "/storage/users/alien_8.png",
    "/storage/users/alien_9.png",
    "/storage/users/alien_10.png"
];

// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('offline');
            })
    )
});