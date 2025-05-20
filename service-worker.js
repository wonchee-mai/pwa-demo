self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('static-cache-v1').then(cache => {
            const prefix = "/pwa-demo"
            return cache.addAll([
                prefix,
                `${prefix}/index.html`,
                `${prefix}/manifest.json`,
                `${prefix}/assets/logo.png`
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

