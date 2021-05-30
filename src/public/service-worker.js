const VERSION = "v1";

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                "/",
                "/akashi.ttf",
                "/ubuntu-regular.ttf",
                "/manifest.json",
            ]);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(fetch(event.request).then(response => {
        const responseClone = response.clone();
        caches.open(VERSION).then(function(cache) {
            cache.put(event.request, responseClone);
        });
        return response;
    }).catch(error => {
        return caches.match(event.request).then(response => {
            if (response !== undefined) {
                return response;
            }
            throw error;
        });
    }));
});