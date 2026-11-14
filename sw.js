const V="sg-v5",A=["./","index.html","about.html","privacy.html","terms.html","contact.html","favicon.svg","manifest.json","icon-192.png"];
const put=(r,x)=>{if(x.ok&&!x.redirected){const y=x.clone();caches.open(V).then(c=>c.put(r,y)).catch(()=>{})}return x};
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>Promise.allSettled(A.map(u=>c.add(u)))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
if(r.mode==="navigate"){e.respondWith(Promise.race([fetch(r),new Promise((_,j)=>setTimeout(j,4000))]).then(x=>put(r,x)).catch(()=>caches.match(r).then(c=>c||caches.match("index.html")).then(c=>c||new Response("You are offline.",{status:503,headers:{"Content-Type":"text/plain"}}))));return}
e.respondWith(caches.match(r).then(c=>{const n=fetch(r).then(x=>put(r,x)).catch(()=>c||new Response("",{status:504}));return c||n}))});
