// var cacheRollName = 'roll_v2';
// var filesToCache = [
//     '/',
//     '/index.html'
// ];

// /* Start the service worker and cache all of the app's content */
// self.addEventListener('install', e => {
//     e.waitUntil(
//         caches.open(cacheRollName).then(cache => {
//             return cache.addAll(filesToCache);
//         }).then(() => {
//             return self.skipWaiting();
//         })
//     );
// });

// self.addEventListener('activate', function (event) {

//     self.clients.matchAll({
//         includeUncontrolled: true
//     }).then(function (clientList) {
//         var urls = clientList.map(function (client) {
//             return client.url;
//         });
//         console.log('[ServiceWorker] Matching clients:', urls.join(', '));
//     });

//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName !== cacheRollName) {
//                         console.log('[ServiceWorker] Deleting old cache:', cacheName);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         }).then(function () {
//             console.log('[ServiceWorker] Claiming clients for version', cacheRollName);
//             return self.clients.claim();
//         })
//     );
// });

// /* Serve cached content when offline */
// self.addEventListener('fetch', e => {
//     console.log('REQUEST DETECTED:', e.request);
//     e.respondWith(
//         caches.open(cacheRollName).then(cache => {
//             console.log('CACHE DETECTED:', cache);
//             cache.match(e.request).then(response => {
//                 console.log('CACHE RESPONSE:', response);
//                 return response || fetch(e.request).then(res => {
//                     console.log('FETCH RESPONSE:', res);
//                     cache.put(e.request, res.clone());
//                     return res;
//                 });
//             }).catch(() => {
//                 console.log('OFFLINE');
//                 return cache.match('/index.html');
//             });
//         })
//     );
// });

const cacheName = 'cache-v1';
const precacheResources = [
    '/',
    'index.html',
    'offline/',
    'not-found/',
    'assets/images/roll-1.jpg',
    'assets/images/roll-2.jpg',
    'assets/images/roll-3.jpg'
];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request).then(response => {
                    if (response.status === 404) {
                        return caches.match('not-found/');
                    }

                    return caches.open(cacheName).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });

            }).catch(error => {
                console.log('Error, ', error);
                return caches.match('pages/offline.html');
            })
    );
});