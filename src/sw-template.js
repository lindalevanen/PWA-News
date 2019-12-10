importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/* global workbox */
if (workbox) {
  console.log("Workbox is loaded");

  addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      skipWaiting();
    }
  });

  /* injection point for manifest files.  */
  workbox.precaching.precacheAndRoute([]);

  /* custom cache rules*/
  workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL("/index.html"),
    {
      blacklist: [/^\/_/, /\/[^\/?]+\.[^\/]+$/]
    }
  );

  workbox.routing.registerRoute(
    "https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/articles/?api_key=ac0502dc50b611ff44da3ee2590724945af3e305&format=json&sort=publish_date:desc&limit=10",
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );
} else {
  console.log("Workbox could not be loaded. No Offline support");
}
