importScripts('./scramjet.all.js');

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

self.addEventListener('fetch', (event) => {
    event.respondWith(async () => {
        // This initializes the proxy logic
        await scramjet.loadConfig(); 
        
        if (scramjet.route(event)) {
            return scramjet.fetch(event);
        }
        
        // If it's not a proxy request, let the browser handle it normally
        return fetch(event.request);
    });
});
