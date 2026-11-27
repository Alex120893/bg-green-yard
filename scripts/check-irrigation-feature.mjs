import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://127.0.0.1:3100';
for (const locale of ['bg', 'en']) {
  const response = await fetch(`${base}/${locale}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/<section[^>]*aria-labelledby="garden-irrigation-title"/g) ?? []).length, 1);
  const block = html.match(/<section[^>]*aria-labelledby="garden-irrigation-title"[\s\S]*?<\/section>/)?.[0];
  assert.ok(block);
  assert.ok(block.includes('data-irrigation-icon="sprinkler"'));
  assert.ok(!block.includes("19-25-55.mp4"));
  assert.ok(block.includes('/video_2026-11-27_19-38-23.mp4'));
  assert.ok(block.includes('muted=""') && block.includes('loop=""') && block.includes('playsInline=""'));
  assert.ok(!block.includes('<button'));
  assert.ok(block.includes(`href="/${locale}/contact?service=irrigation"`));
  assert.ok(block.includes('href="/bg/polivni-sistemi-sofia"'));
  const contact = await (await fetch(`${base}/${locale}/contact?service=irrigation`)).text();
  assert.ok(/<option[^>]*(?:value="irrigation"[^>]*selected|selected[^>]*value="irrigation")/.test(contact));
}
const video = await fetch(`${base}/video_2026-11-27_19-38-23.mp4`, { headers: { Range: 'bytes=0-1023' } });
assert.equal(video.status, 206);
assert.ok(video.headers.get('content-type').includes('video/mp4'));
assert.equal((await video.arrayBuffer()).byteLength, 1024);
assert.equal((await fetch(`${base}/bg/polivni-sistemi-sofia`)).status, 200);
console.log('Irrigation feature: BG/EN block, muted inline looping video, no controls, service/quote links, contact preselection and byte-range delivery passed.');
