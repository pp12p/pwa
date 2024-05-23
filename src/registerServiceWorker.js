/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}


// // 在service-worker.js中
// self.addEventListener('install', event => {
//   // 当service worker安装后，通过事件捕获推迟的添加到主屏幕操作
//   event.waitUntil(self.skipWaiting());
// });
 


// self.addEventListener('activate', event => {
//   // 当service worker激活后，通过事件捕获推迟的添加到主屏幕操作
//   event.waitUntil(self.clients.matchAll().then(clients => {
//     clients.forEach(client => {
//       if (client.url && client.url === window.location.href && window.deferredInstallPrompt) {
//         window.deferredInstallPrompt.prompt();
//         window.deferredInstallPrompt.userChoice.then(choiceResult => {
//           if (choiceResult.outcome === 'accepted') {
//             console.log('User accepted the A2HS prompt');
//           }else{
//             console.log('User dismissed the A2HS prompt');
//           }
//         })
//       }
//     })
//   }))
// })