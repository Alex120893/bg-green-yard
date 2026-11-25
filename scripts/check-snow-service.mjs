// Run after npm run build and npm start.
import assert from 'node:assert/strict';

const base = process.argv[2] ?? 'http://127.0.0.1:3100';
const path = '/bg/snegopochistvane-sofia';
const canonical = `https://bg-greenyard.com${path}`;
const response = await fetch(`${base}${path}`);
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
assert.ok(html.includes('Снегопочистване София'));
for (const title of ['Зимна поддръжка за целия обект', 'Как организираме работата', 'Често задавани въпроси', 'Подгответе обекта преди снега']) {
  assert.ok(html.includes(title));
}
assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
assert.ok(html.includes('property="og:image" content="https://bg-greenyard.com/snow.jpg"'));
assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
assert.equal((html.match(/<video(?:\s|>)/g) ?? []).length, 1);
assert.ok(html.includes('src="/video_2026-11-14_17-19-55.mp4"'));
assert.ok(!html.includes('aria-controls="winter-maintenance-video"'));
assert.ok(html.includes('href="/bg/contact"'));
assert.ok(html.includes('href="tel:+359884988894"'));
assert.ok(!html.includes('noindex'));
const service = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1])).find((data) => data['@type'] === 'Service');
assert.ok(service);
assert.equal(service.url, canonical);
assert.equal(service.areaServed.name, 'София');
assert.equal(service.hasOfferCatalog.itemListElement.length, 4);
for (const offer of service.hasOfferCatalog.itemListElement) {
  assert.ok(html.includes(offer.name));
  assert.ok(html.includes(offer.description));
}
const faqs = [...html.matchAll(/<details[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>[\s\S]*?<\/details>/g)];
assert.equal(faqs.length, 6);
for (const asset of ['/snow.jpg', '/snowremove.jpg', '/video_2026-11-14_17-19-55.mp4']) {
  const assetResponse = await fetch(`${base}${asset}`, { method: 'HEAD' });
  assert.equal(assetResponse.status, 200);
}
assert.equal((await fetch(`${base}/en/snegopochistvane-sofia`)).status, 404);
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert.ok(sitemap.includes(canonical));
const otherService = await (await fetch(`${base}/bg/polivni-sistemi-sofia`)).text();
assert.ok(otherService.includes('Поливни системи София'));
assert.ok(!otherService.includes('snow-title'));
console.log('Snow service: route, headings, video/photos, quote/phone links, six FAQs, SEO, Service JSON-LD, sitemap and unrelated-service isolation passed.');
