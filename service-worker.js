importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: "/nav.html", revision: '1' },
  { url: "/index.html", revision: '1' },
  { url: "/service-worker.js", revision: '1' },
  { url: "/push.js", revision: '1' },
  { url: "/css/materialize.min.css", revision: '1' },
  { url: "/js/materialize.min.js", revision: '1' },
  { url: "/js/api.js", revision: '1' },
  { url: "/js/nav.js", revision: '1' },
  { url: "/js/idb.js", revision: '1' },
  { url: "/js/db.js", revision: '1' },
  { url: "/js/register.js", revision: '1' },
  { url: "/icon-192.png", revision: '1' },
  { url: "/icon-512.png", revision: '1' },
  { url: "/manifest.json", revision: '1' },
  { url:"https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js", revision: '1' },
  { url:"https://fonts.googleapis.com/icon?family=Material+Icons", revision: '1' },
  { url:"https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: '1' },
  { url:"https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js", revision: '1'},
  { url:"https://api.football-data.org/v2/competitions/2021/standings", revision: '1'}
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'dataReq'
  })
);

workbox.routing.registerRoute(
  new RegExp('/informasi'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'informasi'
  })
);

workbox.routing.registerRoute(
  new RegExp('/jadwal'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'jadwal'
  })
);

self.addEventListener('push', event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});