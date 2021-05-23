/// <reference lib="WebWorker" />

export type { };
declare const self: ServiceWorkerGlobalScope;

const VERSION = "v1";

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                "/index.js", // vtodo
            ]);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            console.log("Not undefined");
            return response;
        } else {
            console.log("else");
            return fetch(event.request).then(function(response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                const responseClone = response.clone();

                caches.open(VERSION).then(function(cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }
    }));
});