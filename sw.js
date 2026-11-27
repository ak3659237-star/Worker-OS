const CACHE = "worker-os-mesh-v1";
const ASSETS = ["./", "./index.html", "./style.css", "./rail_ui.css", "./app.js", "./india_data.js", "./real_rail.js", "./voice_digital.js", "./hyper_tech.js", "./map_sos.js"];

self.addEventListener("install", e => {
 e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
 e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
