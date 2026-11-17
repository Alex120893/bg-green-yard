// No added dependencies: exercise real estimator and HTTP handler with an injected mail transport.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const dir = mkdtempSync(join(tmpdir(), 'garden-calc-'));
try {
  execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', 'lib/gardenInquiry.ts', '--outDir', dir, '--module', 'commonjs', '--target', 'ES2022', '--lib', 'ES2022,DOM', '--esModuleInterop', '--skipLibCheck'], { stdio: 'inherit' });
  const { default: { estimateGarden: calc, estimateText, marketRate } } = await import(pathToFileURL(join(dir, 'gardenEstimate.js')).href);
  const { default: { handleGardenInquiry: handle } } = await import(pathToFileURL(join(dir, 'gardenInquiry.js')).href);
  const { default: { pricing } } = await import(pathToFileURL(join(dir, 'gardenPricing.js')).href);
  const base = { service: 'subscription', yardArea: '200', workArea: '', hedgeLength: '20', plantCount: '20', bedArea: '20', plantingType: 'shrubs', condition: 'standard', access: 'easy', waste: 'no', wasteVolume: '', frequency: 'weekly', lawn: [], promo: false };
  let checks = 0;
  const expect = (input, kind, total) => {
    const r = calc({ ...base, ...input });
    assert.equal(r.kind, kind); checks++;
    if (total !== undefined) { assert.equal(r.total, total); checks++; }
    if (r.kind === 'price') { assert.ok(Number.isFinite(r.total) && r.total > 0); checks++; }
    return r;
  };
  expect({}, 'price', 140);
  expect({ plantCount: '0', hedgeLength: '0', bedArea: '0' }, 'price', 140);
  assert.ok(expect({plantCount:'40'}, 'price').total > 140); checks++;
  assert.ok(expect({hedgeLength:'40'}, 'price').total > 140); checks++;
  assert.ok(expect({bedArea:'40'}, 'price').total > 140); checks++;
  expect({frequency:'fortnightly'}, 'price', 109.20);
  expect({frequency:'monthly'}, 'price', 77);
  expect({condition:'high'}, 'price', 168);
  expect({condition:'overgrown'}, 'price', 210);
  expect({access:'difficult'}, 'price', 161);
  const promo = expect({promo:true}, 'price', 140); assert.equal(promo.firstOrderTotal, 98); checks++;
  const waste = expect({promo:true, waste:'yes', wasteVolume:'5'}, 'price');
  assert.equal(waste.waste, Math.round(2 * marketRate('waste') * 100) / 100); checks++;
  assert.equal(waste.firstOrderTotal, Math.round((98 + waste.waste) * 100) / 100); checks++;
  for (const yardArea of ['', ' ', 'NaN', 'Infinity', '-20', '0', '1e2', '0x10', '1000001', '0.00001']) expect({yardArea}, 'invalid');
  expect({bedArea:'201'}, 'invalid'); expect({plantCount:'1.2'}, 'invalid'); expect({plantCount:''}, 'invalid');
  expect({hedgeLength:'-1'}, 'invalid'); expect({waste:'yes',wasteVolume:''}, 'invalid');
  for (const key of ['condition','frequency','access','service']) for (const value of ['', 'toString', '__proto__', 'unknown']) expect({[key]:value}, 'invalid');
  for (const service of ['mowing','shrubs','cleaning','weeding','irrigation']) {
    expect({service,workArea:'100'}, 'price'); expect({service,workArea:'201'}, 'invalid'); expect({service,workArea:''}, 'invalid');
  }
  expect({service:'hedge'}, 'price'); expect({service:'hedge',hedgeLength:'0'}, 'invalid');
  expect({service:'planting',plantingType:'shrubs'}, 'price'); expect({service:'planting',plantingType:'smallTrees'}, 'price');
  expect({service:'planting',plantCount:'1.5'}, 'invalid');
  expect({service:'lawn',workArea:'100'}, 'invalid');
  const overseed = expect({service:'lawn',workArea:'100',lawn:['overseeding']}, 'price');
  const combined = expect({service:'lawn',workArea:'100',lawn:['overseeding','fertilizing']}, 'price');
  assert.equal(overseed.total, combined.total); checks++;
  expect({service:'lawn',workArea:'100',lawn:['aeration','fertilizing']}, 'price', 88.35);
  const mowing = expect({service:'mowing',workArea:'100'}, 'price', 20.46);
  expect({service:'mowing',workArea:'100',condition:'high'}, 'price', 32.55);
  expect({service:'mowing',yardArea:'2000',workArea:'1001'}, 'price', 158.26);
  assert.match(estimateText(promo), /140,00/); checks++;
  assert.match(estimateText(promo), /98,00/); checks++;
  assert.match(estimateText(mowing), /НЕ площ на газона/); checks++;
  for (const rate of Object.values(pricing.rates)) {
    assert.ok(rate.market[0] > 0 && rate.market[1] >= rate.market[0]); checks++;
    for (const source of rate.sources) { assert.ok(pricing.sources[source].url); checks++; }
  }
  for (const input of [null, [], 0, 'bad', {service: []}]) { assert.equal(calc(input).kind, 'invalid'); checks++; }
  const request = data => new Request('http://localhost/api/garden-inquiry', {method:'POST', body:JSON.stringify(data)});
  const submission = {name:'Calculator test',email:'test@example.com',phone:'+359880000000',location:'София',message:'Бележка',garden:base,total:0,recipient:'attacker@example.com'};
  let sent;
  const ok = await handle(request(submission), async payload => { sent = payload; });
  assert.equal(ok.status,200); checks++;
  assert.deepEqual(await ok.json(), {ok:true}); checks++;
  assert.match(sent.message,/140,00/); checks++;
  for (const text of ['200 м²','20 бр.','20 л.м','20 м²','Всяка седмица','Бележка','София','ДДС','ВЪТРЕШНА']) { assert.ok(sent.message.includes(text)); checks++; }
  assert.ok(!('recipient' in sent)); checks++;
  for (const data of [null, [], { ...submission, name:[] }, { ...submission, email:'bad' }, { ...submission, garden:{...base,workArea:'NaN',yardArea:'NaN'} }]) {
    const res = await handle(request(data), async () => { throw new Error('Must not send invalid data'); }); assert.equal(res.status,400); checks++;
  }
  const failed = await handle(request(submission), async () => {throw new Error('provider failed');});
  assert.equal(failed.status,500); checks++;
  assert.ok(!JSON.stringify(await failed.json()).includes('140')); checks++;
  const oversized = await handle(new Request('http://localhost/api/garden-inquiry',{method:'POST',body:'x'.repeat(17000)}), async()=>{});
  assert.equal(oversized.status,413); checks++;
  console.log(`Calculator + inquiry: ${checks} assertions passed.`);
} finally { rmSync(dir, { recursive: true, force: true }); }
