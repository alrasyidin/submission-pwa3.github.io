importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

let assetsToCache = [
  'index.js',
  'index.html',
  'nav.html',
  'style/index.css',
  'public/loading.gif',
  'public/logo-football.png',
  'public/football-1.png',
  'public/football-2.png',
  'public/football-3.png',
  'public/favicon.ico',
  'manifest.webmanifest'
]

if (workbox) {
  workbox.precaching.precacheAndRoute([
    {url: assetsToCache[0], revision: 2},
    {url: assetsToCache[1], revision: 1},
    {url: assetsToCache[2], revision: 1},
    {url: assetsToCache[3], revision: 1},
    {url: assetsToCache[4], revision: 1},
    {url: assetsToCache[5], revision: 1},
    {url: assetsToCache[6], revision: 1},
    {url: assetsToCache[7], revision: 1},
    {url: assetsToCache[8], revision: 1},
    {url: assetsToCache[9], revision: 1},
    {url: assetsToCache[10], revision: 1}
  ])

  workbox.routing.registerRoute(
    new RegExp('pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  )
} else {
  console.log(`gagal import workbox`)
}

self.addEventListener('push', event => {
  let body = null
  if (event.data) {
    body = event.data.text()
  } else {
    body = 'Push message no payload'
  }
  let options = {
    body,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    badge: assetsToCache[6],
    icon: assetsToCache[6]
  }
  event.waitUntil(
    self.registration.showNotification('Notifikasi Football PWA', options)
  )
})