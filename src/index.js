import 'regenerator-runtime'

// materialize dependency
import 'materialize-css/dist/js/materialize.js'

import './style/index.css'

import { urlBase64ToUint8Array } from './helper'
// init application
import AppController from './controllers/AppCtrl'

window.addEventListener('DOMContentLoaded', () => {
  new AppController
})

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("Pendaftaran service worker berhasil")
      })
      .catch(error => console.log("Pendaftaran service worker gagal"))
  })
} else {
  console.log('ServiceWorker tidak didukung browser ini')
}

if ('Notification' in window) {
  Notification.requestPermission()
    .then(result => {
      switch (result) {
        case 'denied':
          console.log('Fitur Notifikasi tidak diijinkan')
          break
        case 'default':
          console.log('User menutup jendela dialog ijin notifikasi')
          break
        default:
          console.log('Fitur notifikasi diijinkan')

          if (result === 'granted') {
            navigator.serviceWorker.ready.then(() => {
              if ('PushManager' in window) {
                navigator.serviceWorker.getRegistration()
                  .then(registration => {
                    registration.pushManager.subscribe({
                      userVisibleOnly: true,
                      applicationServerKey: urlBase64ToUint8Array('BBd6_FIOPrvsexEwe7awCPiv_N9hQgi2kqW7PGmIH7pj6SpL-RllLpnff2Y4sY1NhX_rMaGRB0tMd9OcAuAHkB4')
                    })
                      .then(subscribe => {
                        console.log(`Berhasil melakukan subscribe dengan endpoint: ${subscribe.endpoint}`)
                        console.log(`Berhasil melakukan subscribe dengan p256dh: ${btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))))}`)
                        console.log(`Berhasil melakukan subscribe dengan auth key: ${btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))}`)
                      })
                      .catch(error => console.log(`Tidak dapat melakukan subscribe ${error.message}`))
                  })
              }
            })
          } else {
            console.log('Fitur Notifikasi tidak diijinkan')
          }

      }
    })
}