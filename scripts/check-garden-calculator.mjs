// Focused reproduction; uses the project's TypeScript compiler, no new test dependency.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const dir = mkdtempSync(join(tmpdir(), 'garden-calc-'));
try {
  execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', 'lib/gardenEstimate.ts', 'lib/gardenPricing.ts', '--outDir', dir, '--module', 'commonjs', '--target', 'ES2020', '--skipLibCheck'], { stdio: 'inherit' });
  const { default: { estimateGarden: calc, vatLabel, estimateText } } = await import(pathToFileURL(join(dir, 'gardenEstimate.js')).href);
  const base = { service: 'mowing', quantity: '200', condition: 'standard', access: 'easy', waste: 'no', frequency: '', lawn: [] };
  let checks = 0;
  const expect = (input, kind, amount) => {
    const r = calc({ ...base, ...input });
    assert.equal(r.kind, kind); checks++;
    if (amount !== undefined) { assert.equal(r.min, amount); checks++; }
    if (r.kind === 'price') { assert.ok(Number.isFinite(r.min) && r.min > 0 && r.max >= r.min); checks++; }
    return r;
  };
  expect({}, 'price', 44);
  expect({ quantity: '1000' }, 'price', 220);
  expect({ quantity: '1001' }, 'price', 170.17);
  expect({ quantity: '12,5' }, 'price', 2.75);
  for (const quantity of ['', ' ', 'NaN', 'Infinity', '-20', '0', '1e999', 'abc', '1.2.3', '0x10', '1e2']) expect({ quantity }, 'invalid');
  expect({ quantity: '0.000001' }, 'quote'); // no zero-price after rounding
  expect({ quantity: '9'.repeat(308), service: 'weeding' }, 'quote'); // overflow
  for (const service of ['', 'unknown']) expect({ service }, 'invalid');
  expect({ access: '' }, 'invalid');
  expect({ condition: '' }, 'invalid');
  expect({ waste: '' }, 'invalid');
  expect({ condition: 'high' }, 'price', 70);
  expect({ condition: 'overgrown' }, 'quote');
  expect({ access: 'difficult' }, 'quote');
  expect({ waste: 'yes' }, 'quote');
  expect({ service: 'weeding' }, 'price', 200);
  expect({ service: 'hedge' }, 'quote');
  expect({ service: 'shrubs' }, 'quote');
  expect({ service: 'cleaning' }, 'quote');
  expect({ service: 'planting', quantity: '1.5', waste: '' }, 'invalid');
  expect({ service: 'planting', quantity: '10', waste: '' }, 'quote');
  expect({ service: 'irrigation', waste: '' }, 'quote');
  expect({ service: 'subscription' }, 'invalid');
  expect({ service: 'subscription', frequency: 'weekly' }, 'quote');
  expect({ service: 'lawn' }, 'invalid');
  expect({ service: 'lawn', lawn: ['unexpected'] }, 'invalid');
  expect({ service: 'lawn', lawn: ['aeration'] }, 'price', 40);
  expect({ service: 'lawn', lawn: ['aeration', 'fertilizing'] }, 'price', 130);
  expect({ service: 'lawn', lawn: ['fertilizing'], quantity: '1001' }, 'price', 400.4);
  expect({ service: 'lawn', lawn: ['aeration', 'aeration'] }, 'price', 40);
  expect({ service: 'lawn', lawn: ['aeration', 'overseeding'] }, 'quote');
  assert.match(vatLabel(), /не е потвърден/); checks++;
  assert.match(vatLabel('included'), /включен/); checks++;
  assert.match(vatLabel('excluded'), /без ДДС/); checks++;
  assert.match(vatLabel('not-applicable'), /не се начислява/); checks++;
  assert.match(estimateText(calc(base)), /44,00/); checks++;
  assert.match(estimateText(calc({ ...base, waste: 'yes' })), /индивидуална оферта/); checks++;
  assert.ok(!('min' in calc({ ...base, waste: 'yes' }))); checks++;
  console.log(`Calculator: ${checks} assertions passed.`);
} finally { rmSync(dir, { recursive: true, force: true }); }
