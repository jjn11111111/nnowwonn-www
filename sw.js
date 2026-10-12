/** EnterFace offline shell · static same-origin only · no thread upload */
const CACHE = 'enterface-shell-v4';
const CORE = [
  '/open.html',
  '/workbench.html',
  '/unpack.html',
  '/cookioe.html',
  '/shall-not.html',
  '/enter.html',
  '/styles.css',
  '/manifest.webmanifest',
  '/js/nw-canonical-host.mjs',
  '/js/nw-opening.mjs',
  '/js/nw-workbench.mjs',
  '/js/nw-composer-thread.mjs',
  '/js/nw-family-systems.mjs',
  '/js/nw-i18n.mjs',
  '/js/nw-onboard-progress.mjs',
  '/js/nw-enterface-shell.mjs',
  '/js/nw-lane-handoff.mjs',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE).catch(() => undefined)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok && url.pathname.match(/\.(css|js|html|webmanifest)$/)) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match('/open.html')))
  );
});
