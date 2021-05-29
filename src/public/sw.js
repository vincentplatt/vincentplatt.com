const VERSION = "v1";

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                "/akashi.ttf", // vtodo
            ]);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(fetch(event.request).then(res => {
        console.log("here");

        const responseClone = res.clone();

        caches.open(VERSION).then(function(cache) {
            cache.put(event.request, responseClone);
        });
        return res;
    }).catch(error => {
        console.log("error");

        return caches.match(event.request).then(response => {
            //     // caches.match() always resolves
            //     // but in case of success response will have value
            if (response !== undefined) {
                console.log("Not undefined");
                return response;
            }
            throw error;
        });
    }));
});

// caches.match(event.request).then(function(response) {
//     // caches.match() always resolves
//     // but in case of success response will have value
//     if (response !== undefined) {
//         console.log("Not undefined");
//         return response;
//     } else {
//         console.log("else");
//         return fetch(event.request).then(function(response) {
//             // response may be used only once
//             // we need to save clone to put one copy in cache
//             // and serve second one
//             const responseClone = response.clone();

//             caches.open(VERSION).then(function(cache) {
//                 cache.put(event.request, responseClone);
//             });
//             return response;
//         });
//     }