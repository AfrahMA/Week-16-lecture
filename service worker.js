var cacheName = 'petstore-v1';
var cacheFiles=[
    'PWAfile.html',
    'subjects.js',
    'petsore.webmanifest',
    'art.jpg',
    'biology.jpg',
    'business studies.jpg',
    'chemistry.jpg',
    'english.jpg',
    'geography.jpg',
    'information technology.jpg',
    'math.jpg',
    'music.jpg',

]

self.addEventListener('install', (e) => {
    console.log('[service worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[service worker) Caching all the files');
            return cache.addAll(cacheFiles);   
        })
    );
});

//self.addEventListener('fetch', function (e)=> {
//   console.log('[Service Worker] Fetched resource '+e.request.url);
//});
//self.addEventlistener('fetch', function(e) {
//    e.respondWith(
//        caches.match(e.request).then(function (r) {
//            console.log('[Service Worker] Fetching resource: ' +e.request.url);
//            return r
//        })
//   );
//});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});