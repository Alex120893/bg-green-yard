import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = mkdtempSync(join(tmpdir(), 'sitemap-'));
try {
  execFileSync(process.execPath, [
    'node_modules/typescript/bin/tsc', 'app/sitemap.ts',
    '--outDir', dir, '--module', 'commonjs', '--target', 'ES2022',
    '--lib', 'ES2022,DOM', '--esModuleInterop', '--skipLibCheck',
  ], { stdio: 'inherit' });
  const load = async (path) => (await import(pathToFileURL(join(dir, path)).href)).default;
  const { default: sitemap } = await load('app/sitemap.js');
  const { posts, projects } = await load('lib/seo-pages.js');
  const { PRODUCTION_SITE_ORIGIN: origin } = await load('lib/site.js');
  const entries = sitemap();
  const urls = new Set(entries.map(({ url }) => url));
  assert.equal(entries.length, 26 + projects.length + posts.length);
  assert.equal(urls.size, entries.length, 'No duplicate canonical URLs');
  assert.deepEqual(sitemap(), entries, 'Repeated generation must not change dates');

  const translated = ['', '/about', '/services', '/gallery', '/contact', '/plant-care', '/inquiries'];
  for (const suffix of translated) {
    const languages = { bg: `${origin}/bg${suffix}`, en: `${origin}/en${suffix}` };
    for (const url of Object.values(languages)) {
      assert.deepEqual(entries.find((entry) => entry.url === url)?.alternates?.languages, languages);
    }
  }

  for (const entry of entries) {
    const url = new URL(entry.url);
    assert.equal(url.origin, origin);
    assert.equal(url.search, '');
    assert.equal(url.hash, '');
    assert.ok(!url.pathname.endsWith('/'), 'No trailing-slash duplicates');
    assert.equal(entry.lastModified, undefined, 'No fabricated modification dates');
    const path = url.pathname.replace(/^\/(bg|en)(?=\/|$)/, '/[locale]');
    const candidates = [
      `app${url.pathname}/page.tsx`,
      `app${path}/page.tsx`,
      `app${path.replace(/\/(blog|proekti)\/[^/]+$/, '/$1/[slug]')}/page.tsx`,
    ];
    assert.ok(candidates.some(existsSync), `A page route must exist for ${entry.url}`);
    if (entry.alternates) {
      for (const alternate of Object.values(entry.alternates.languages)) {
        assert.ok(urls.has(alternate), 'Every alternate must also be in the sitemap');
      }
    } else {
      assert.ok(url.pathname.startsWith('/bg/'), 'Bulgarian-only pages must not claim translations');
    }
  }

  for (const { slug } of posts) assert.ok(urls.has(`${origin}/bg/blog/${slug}`));
  for (const { slug } of projects) assert.ok(urls.has(`${origin}/bg/proekti/${slug}`));
  for (const path of ['/en/calculator', '/en/blog', '/en/proekti', '/en/lawn-care', '/']) {
    assert.ok(!urls.has(`${origin}${path}`), 'No redirect, missing translation, or root duplicate');
  }

  // Content additions should be reflected without editing the sitemap's URL list.
  posts.push({ ...posts[0], slug: 'sitemap-regression-post' });
  projects.push({ ...projects[0], slug: 'sitemap-regression-project' });
  const expanded = new Set(sitemap().map(({ url }) => url));
  assert.ok(expanded.has(`${origin}/bg/blog/sitemap-regression-post`));
  assert.ok(expanded.has(`${origin}/bg/proekti/sitemap-regression-project`));
  posts.pop();
  projects.pop();

  const robots = readFileSync('public/robots.txt', 'utf8');
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  console.log(`Sitemap: ${entries.length} unique canonical URLs, 7 reciprocal language pairs, content generation and robots discovery passed.`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
