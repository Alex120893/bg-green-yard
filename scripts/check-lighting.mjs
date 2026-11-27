import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://127.0.0.1:3100';
const path = '/bg/gradinsko-osvetlenie-sofia';
const get = async (path) => { const r = await fetch(base + path); assert.equal(r.status, 200, path); return r.text(); };
const home = await get('/bg');
assert.ok(home.includes('garden-lighting-title'));
assert.ok(home.includes('src="/video_2026-11-27_19-04-02.mp4"'));
const video = await fetch(base + '/video_2026-11-27_19-04-02.mp4', { headers: { Range: 'bytes=0-1023' } });
assert.equal(video.status, 206);
assert.equal((await video.arrayBuffer()).byteLength, 1024);
assert.ok(home.indexOf('garden-lighting-title') > home.indexOf('winter-maintenance-title'));
assert.ok(home.includes(`href="${path}"`));
assert.ok(home.includes('Осветление'));
const winterBlock = home.match(/<section[^>]*aria-labelledby="winter-maintenance-title"[\s\S]*?<\/section>/)?.[0];
assert.ok(winterBlock?.includes('href="/bg/snegopochistvane-sofia"'));
assert.ok(winterBlock?.includes('Повече за услугата'));
assert.ok(!winterBlock?.includes('aria-hidden="true">→</span>'));
const en = await get('/en');
assert.ok(en.includes('Lighting'));
const services = await get('/bg/services');
assert.ok(services.includes('Градинско осветление'));
assert.ok(services.includes(`href="${path}"`));
const html = await get(path);
assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
assert.ok(html.includes('Осветление в градината и двора'));
assert.ok(html.includes(`rel="canonical" href="https://bg-greenyard.com${path}"`));
assert.ok(html.includes('href="/bg/contact?service=lighting"'));
assert.ok(!html.includes('aria-hidden="true">→</span>'));
assert.ok(html.includes('lighting-examples'));
assert.equal((html.match(/<li[^>]*data-lighting-step/g) ?? []).length, 3);
const steps = html.match(/<ol[^>]*>[\s\S]*?<\/ol>/)?.[0];
assert.equal((steps?.match(/<svg/g) ?? []).length, 3, 'Each work step has a bulb icon');
for (const file of ['photo_2026-11-27_19-10-38.jpg', 'photo_2026-11-27_19-10-42.jpg']) {
  assert.ok(html.includes(file));
  assert.equal((await fetch(base + '/' + file, { method: 'HEAD' })).status, 200);
}
assert.ok(!html.includes('images.pexels.com'));
for (const locale of ['bg', 'en']) {
  const form = await get(`/${locale}/contact?service=lighting`);
  assert.ok(/<option[^>]*(?:value="lighting"[^>]*selected|selected[^>]*value="lighting")/.test(form), 'Lighting is preselected');
}
assert.ok(html.includes('property="og:image" content="https://bg-greenyard.com/images/garden-lighting.webp"'));
assert.equal((html.match(/<details/g) ?? []).length, 3);
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
assert.ok(schemas.some(s => s['@type'] === 'Service' && s.url.endsWith(path)));
assert.ok((await get('/sitemap.xml')).includes(`https://bg-greenyard.com${path}`));
assert.equal((await fetch(base + '/en/gradinsko-osvetlenie-sofia')).status, 404);
assert.equal((await fetch(base + '/images/garden-lighting.webp')).status, 200);
console.log('Lighting: homepage, BG/EN service discovery, page, canonical, image, JSON-LD, FAQ, sitemap and locale exclusions passed.');
