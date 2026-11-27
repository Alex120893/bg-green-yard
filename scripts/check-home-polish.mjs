import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://127.0.0.1:3100';
const response = await fetch(base + '/bg');
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
assert.ok(html.includes('rel="canonical" href="https://bg-greenyard.com/bg"'));
assert.ok(!html.includes('noindex'));
const block = html.match(/<section[^>]*aria-labelledby="home-blog-title"[\s\S]*?<\/section>/)?.[0];
assert.ok(block);
assert.equal((block.match(/<article/g) ?? []).length, 3);
assert.equal((block.match(/<time /g) ?? []).length, 3);
assert.ok(block.includes('Полезно за вашата градина'));
assert.ok(block.includes('Всички статии'));
for (const slug of ['snegopochistvane-i-zimna-poddruzhka-sofia', 'gradinsko-osvetlenie-idei-za-dvora', 'polivni-sistemi-planirane-na-gradinata']) {
  assert.ok(block.includes(`/bg/blog/${slug}`));
  const page = await fetch(`${base}/bg/blog/${slug}`);
  assert.equal(page.status, 200);
  const content = await page.text();
  assert.ok(content.includes('2026-11-27'));
  assert.ok(content.includes('Повече за услугата'));
  assert.ok(content.includes('BlogPosting'));
}
assert.ok(!html.includes('профе.'));
assert.ok(!html.includes('пробле.'));
assert.ok(html.includes('Препоръчвам на всички приятели.'));
assert.ok(html.includes('направи чудесна работа с градината ми.'));
assert.ok(html.indexOf('home-blog-title') > html.indexOf('Отзиви на клиентите'));
assert.ok(html.indexOf('home-blog-title') < html.lastIndexOf('Вашият партньор за зелени пространства'));
assert.equal((html.match(/href="\/bg\/calculator#calculator-form"/g) ?? []).length, 1);
assert.ok((html.match(/<video[^>]*preload="none"/g) ?? []).length >= 3);
console.log('Home polish: real three dated articles, routes, service links, retained review sentences, block order, calculator CTAs, canonical, H1 and deferred videos passed.');

assert.ok(!html.includes('home-services-title'));
assert.ok(!html.includes('За услуги с индивидуална оферта цената се определя след оглед.'));
assert.ok(!html.includes('Колко би струвала поддръжката на Вашата градина?'));
assert.ok(html.includes('Изчислете цената'));
assert.ok(html.includes('Изберете желаните услуги и получете бърза ориентировъчна оценка на цената.'));

assert.ok(!html.includes('За индивидуални проекти изготвяме персонална оферта след оглед.'));
