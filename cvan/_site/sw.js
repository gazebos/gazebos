/* global caches, self */
var debug = false;
var log = debug ? console.log.bind(console) : function () {};

var CURRENT_CACHES_HASHES = {
  static: '-v-794863fa1e6a8ff07adc0322a614cf8a55a1681eea24f4e5e7157b352de20679'  // {STATIC_HASH}
};

var CURRENT_CACHES = {
  static: 'static-cache' + CURRENT_CACHES_HASHES.static
};

self.addEventListener('activate', function (event) {
  log('WORKER: activate event in progress');

  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            log('Deleting out-of-date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      ).then(function() {
        log('WORKER: activate completed');
      });
    })
  );
});

self.addEventListener('fetch', function (event) {
  log('WORKER: fetch event in progress.');

  var path = new URL(event.request.url).pathname;

  var invalidPathMatches = path.match('/browser-sync/');

  if (event.request.method !== 'GET' ||
     (invalidPathMatches && invalidPathMatches.length)) {
    log('WORKER: fetch event ignored:', event.request.method, event.request.url);
    return;
  }
  event.respondWith(
    caches
      .match(event.request)
      .then(function(cached) {
        var networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);

        log('WORKER: fetched from ' + (cached ? 'cache' : 'network') + ':', event.request.url);

        return cached || networked;

        function fetchedFromNetwork (response) {
          var cacheCopy = response.clone();

          log('WORKER: fetch response from network:', event.request.url);

          if (response.type !== 'basic') {
            log('WORKER: fetch response *not* stored in cache (cross-origin request: ' + event.request.url + ')');
            return response;
          }

          caches
            .open(CURRENT_CACHES.static)
            .then(function add (cache) {
              return cache.put(event.request, cacheCopy);
            })
            .then(function() {
              log('WORKER: fetch response stored in cache:', event.request.url);
            });

          return response;
        }

        function unableToResolve () {
          log('WORKER: fetch request failed in both cache and network.');

          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});
