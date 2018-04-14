'use strict';

const staticCacheName = 'V1';
const  cacheFiles = [
    '/',
    'index.html',
    'restaurant.html',
    './js/indexController.js',
    './js/main.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './data/restaurants.json',
    './img/'
  ];

/**
 * Install & Initiate Service Worker by adding cache
 * 
 * @param {Object} event
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    )
});

/**
 * Activates Service Worker & Deletes old cache if there is a newer version
 * 
 * @param {Object} event
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(cacheName => {
                if (cacheName != staticCacheName) {
                    return caches.delete(cacheName);
                }
            }))
        })
    )
});

/**
 * If cache isn't matched clone the new response and return it
 * 
 * @param {Object} event
 */
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== location.origin || requestUrl.pathname.indexOf('sw.js') !== -1) {
        return;
    }
    event.respondWith(
        caches.open(staticCacheName).then(function(response) {
            return response || fetch(event.request).then(function(response) {
                cache.put(event.request, response.clone());
                return response;
            })
        })
    )
})

