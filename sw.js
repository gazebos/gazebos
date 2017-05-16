var CACHE = 'cache-and-update-v1';

self.addEventListener('install', evt => {
  evt.waitUntil(precache());
});

self.addEventListener('fetch', evt => {
  if (evt.request.url.indexOf('/browser-sync/') > -1 ||
      evt.request.url.indexOf('/socket.io/') > -1) {
    evt.respondWith(evt.request);
  } else {
    evt.respondWith(fromCache(evt.request));
  }
  evt.waitUntil(update(evt.request));
});

function precache () {
  return caches.open(CACHE).then(cache => {
    return cache.addAll([
      '/cvan/adobe_fort.html',
      '/cvan/cave_lights.html',
      '/cvan/concrete_sheets.html',
      '/cvan/lunar_winds.html',
      '/cvan/roaming_cubes.html',
      '/cvan/smashu_picchu.html',
      '/cvan/sunny_deck_delight.html',
      '/index.html',
      '/_assets/-13.165713_-72.545542.jpg',
      '/_assets/42.658402_11.633269.jpg',
      '/_assets/Crystal_Habit.2.z.webm',
      '/_assets/EDEN.z.webm',
      '/_assets/Roaming_Cubes_-_Processing_360_Video.z.webm',
      '/_assets/Roaming_Cubes_-_Processing_360_Video.z.webm',
      '/_assets/UnderLA.z.webm',
      '/_assets/bensound-retrosoul.z.ogg',
      '/_assets/bensound-slowmotion.z.ogg',
      '/_assets/dmswart_32620308184.png',
      '/_assets/ear_evisbeats_1.z.ogg',
      '/_assets/ear_paul_diddy_2.z.ogg',
      '/_assets/ear_robert_kroos_1.z.ogg',
      '/_assets/ear_teebs_1.z.ogg',
    ]);
  });
}

function fromCache (request) {
  return caches.open(CACHE).then(cache => {
    return cache.match(request).then(match => {
      return match || Promise.reject('no-match');
    });
  });
}

function update (request) {
  return caches.open(CACHE).then(cache => {
    return fetch(request).then(res => {
      return cache.put(request, res);
    });
  });
}
