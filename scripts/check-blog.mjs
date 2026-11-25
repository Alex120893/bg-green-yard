// Run against a local production server: node scripts/check-blog.mjs [base URL]
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const base = process.argv[2] ?? 'http://127.0.0.1:3100';
const origin = 'https://bg-greenyard.com';
const slug = 'profesionalno-snegopochistvane-na-zhilishtni-kompleksi-sofia';
const title = 'Професионално снегопочистване на жилищни комплекси в София';
const get = async (path) => {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  return response.text();
};
const headingCount = (html) => (html.match(/<h1(?:\s|>)/g) ?? []).length;
const home = await get('/bg');
assert.equal(headingCount(home), 1);
assert.ok(home.includes('Зимна поддръжка и снегопочистване'));
assert.ok(home.indexOf('winter-maintenance-title') > home.indexOf('<h1'));
assert.ok(home.indexOf('winter-maintenance-title') < home.indexOf('Защо BG Green Yard'));
assert.ok(home.includes('Заявете оферта'));
assert.ok((await get('/en')).includes('Winter maintenance and snow removal'));

const redirect = await fetch(`${base}/blog`, { redirect: 'manual' });
assert.equal(redirect.status, 307);
assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/bg/blog');
const blog = await get('/bg/blog');
assert.equal(headingCount(blog), 1);
const links = [...new Set([...blog.matchAll(/href="(\/bg\/blog\/[^"#?]+)"/g)].map((match) => match[1]))];
assert.equal(links.length, 7, 'All six old articles and the winter article remain linked');
assert.equal(links[0], `/bg/blog/${slug}`, 'Winter article comes first');
assert.equal((blog.match(/<article(?:\s|>)/g) ?? []).length, 7);

for (const path of links) {
  const html = await get(path);
  assert.equal(headingCount(html), 1);
  assert.ok(html.includes('<h2'));
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`));
  assert.ok(html.includes('property="og:type" content="article"'));
  const json = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1])).find((data) => data['@type'] === 'BlogPosting');
  assert.ok(json, `BlogPosting exists for ${path}`);
  assert.equal(json.url, `${origin}${path}`);
  assert.equal(json.inLanguage, 'bg');
  assert.equal(json.author.name, 'BG GREEN YARD');
  assert.ok(html.includes(json.headline));
  assert.ok(json.articleBody.length > 100);
  const imagePath = new URL(json.image[0]).pathname;
  assert.ok(existsSync(`public${imagePath}`));
  assert.ok(html.includes(`property="og:image" content="${origin}${imagePath}"`));
  if (path.endsWith(slug)) {
    assert.equal(json.headline, title);
    for (const keyword of ['снегопочистване София', 'почистване на сняг', 'зимна поддръжка на комплекси', 'почистване на паркинги от сняг', 'обработка против заледяване']) {
      assert.ok(json.keywords.includes(keyword));
    }
    assert.ok(html.includes('Заявете оферта'));
  }
}
const sitemap = await get('/sitemap.xml');
assert.ok(sitemap.includes(`${origin}/bg/blog/${slug}`));
assert.equal((await fetch(`${base}/bg/blog/not-a-real-post`)).status, 404);
assert.equal((await fetch(`${base}/en/blog`)).status, 404);
console.log('Blog: seasonal placement, /blog redirect, seven illustrated posts, H1/H2, canonical, article metadata, JSON-LD, sitemap and 404 checks passed.');
