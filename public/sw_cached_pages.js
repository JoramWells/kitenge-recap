const cacheName = 'v2'
const cacheList = [
    'index.html'
]


//Call Install Event
self.addEventListener('install',(e)=>{
    console.log('Service worker installed')

    e.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log('Service Worker: Caching Files')
            cache.addAll(cacheList)
        })
        .then(()=>self.skipWaiting())
    )
})

//Call Activate Event
self.addEventListener('activate',e=>{
    console.log('Service Worker Activated')
    e.waitUntil(
        caches.keys().then(cacheList=>{
            return Promise.all(
                cacheList.map(cache=>{
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing Old Cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//Call fetch event
self.addEventListener('fetch', e=>{
    console.log('Service Worker: Fetching')
    e.respondWith(caches.match (e.request).then((response)=>{
        return response || fetch(e.request)
    }
    ))
})


self.addEventListener('push', e=>{
console.log('service worker loaded..')

    const data = e.data.json()
    console.log('push received...')
    self.registration.showNotification(data.title,{
        body:'Notified by Jay',
        icon:'icon'
    })
})