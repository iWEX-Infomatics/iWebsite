// Service Worker for iWEX Website PWA

const CACHE_NAME = 'iwex-website-v1';
const RUNTIME_CACHE = 'iwex-runtime-v1';

// Assets to cache on install
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/assets/iwex_website/css/styles.css',
    '/assets/iwex_website/js/main.js',
    '/assets/iwex_website/manifest.json',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://unpkg.com/lucide@latest',
    'https://unpkg.com/vue@3/dist/vue.global.prod.js'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                    })
                    .map(cacheName => {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        // For CDN resources, use cache first, then network
        if (request.url.includes('cdn.') || request.url.includes('unpkg.com')) {
            event.respondWith(
                caches.match(request).then(response => {
                    return response || fetch(request).then(fetchResponse => {
                        return caches.open(RUNTIME_CACHE).then(cache => {
                            cache.put(request, fetchResponse.clone());
                            return fetchResponse;
                        });
                    });
                }).catch(() => {
                    // Return offline page or placeholder
                    return new Response('Offline', { status: 503 });
                })
            );
        }
        return;
    }
    
    // Handle API requests - network first, cache fallback
    if (request.url.includes('/api/method/')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Clone the response
                    const responseClone = response.clone();
                    
                    // Cache successful GET requests
                    if (request.method === 'GET' && response.status === 200) {
                        caches.open(RUNTIME_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    
                    return response;
                })
                .catch(() => {
                    // If network fails, try cache
                    return caches.match(request).then(response => {
                        if (response) {
                            return response;
                        }
                        // Return offline response
                        return new Response(
                            JSON.stringify({
                                success: false,
                                message: 'You are offline. Please check your connection.'
                            }),
                            {
                                headers: { 'Content-Type': 'application/json' }
                            }
                        );
                    });
                })
        );
        return;
    }
    
    // Handle page requests - cache first, then network
    if (request.mode === 'navigate') {
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request).then(fetchResponse => {
                    return caches.open(RUNTIME_CACHE).then(cache => {
                        cache.put(request, fetchResponse.clone());
                        return fetchResponse;
                    });
                }).catch(() => {
                    // Return offline page
                    return caches.match('/').then(response => {
                        return response || new Response(
                            '<h1>Offline</h1><p>You are currently offline. Please check your connection.</p>',
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    });
                });
            })
        );
        return;
    }
    
    // Handle static assets - cache first, then network
    event.respondWith(
        caches.match(request).then(response => {
            if (response) {
                return response;
            }
            
            return fetch(request).then(fetchResponse => {
                // Don't cache non-successful responses
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type === 'error') {
                    return fetchResponse;
                }
                
                // Clone the response
                const responseToCache = fetchResponse.clone();
                
                caches.open(RUNTIME_CACHE).then(cache => {
                    cache.put(request, responseToCache);
                });
                
                return fetchResponse;
            });
        })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-contact-forms') {
        event.waitUntil(syncContactForms());
    }
});

async function syncContactForms() {
    // Get pending form submissions from IndexedDB
    // This would require implementing IndexedDB storage for offline form submissions
    console.log('Syncing contact forms...');
}

// Push notification support
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from iWEX',
        icon: '/assets/iwex_website/images/icon-192x192.png',
        badge: '/assets/iwex_website/images/icon-96x96.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/assets/iwex_website/images/icon-96x96.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/iwex_website/images/icon-96x96.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('iWEX Infomatics', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(RUNTIME_CACHE).then(cache => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-content') {
        event.waitUntil(updateContent());
    }
});

async function updateContent() {
    // Fetch latest content from API and update cache
    console.log('Updating content in background...');
    
    try {
        const response = await fetch('/api/method/iwex_website.api.website.get_website_settings');
        if (response.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            await cache.put('/api/method/iwex_website.api.website.get_website_settings', response);
        }
    } catch (error) {
        console.error('Error updating content:', error);
    }
}

