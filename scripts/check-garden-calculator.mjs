import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const dir = mkdtempSync(join(tmpdir(), 'garden-calc-'));
try {
  execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', 'lib/gardenInquiry.ts', '--outDir', dir, '--module', 'commonjs', '--target', 'ES2022', '--lib', 'ES2022,DOM', '--esModuleInterop', '--skipLibCheck'], { stdio: 'inherit' });
  const { default: { estimateGarden: calc, estimateText, vatLabel } } = await import(pathToFileURL(join(dir, 'gardenEstimate.js')).href);
  const { default: { handleGardenInquiry: handle } } = await import(pathToFileURL(join(dir, 'gardenInquiry.js')).href);
  const { default: { pricing } } = await import(pathToFileURL(join(dir, 'gardenPricing.js')).href);
  const base = {service:'subscription',yardArea:'200',areaUnknown:false,gardenType:'lawn',condition:'standard',frequency:'weekly',lawn:[],promo:false};
  let checks = 0;
  const expect = (patch, kind, total) => {
    const result = calc({...base,...patch}); assert.equal(result.kind,kind); checks++;
    if (total !== undefined) {assert.equal(result.total,total); checks++;}
    if (result.kind === 'price') { assert.ok(Number.isFinite(result.total) && result.total > 0); checks++; }
    return result;
  };
  expect({},'price',140);
  expect({gardenType:'light'},'price',140);
  expect({gardenType:'mixed'},'price',147);
  expect({gardenType:'dense'},'price',161);
  expect({frequency:'fortnightly'},'price',109.2);
  expect({frequency:'monthly'},'price',77);
  expect({condition:'high'},'price',168);
  expect({condition:'overgrown'},'price',210);
  expect({yardArea:'12,5'},'price',8.75);
  const promo = expect({promo:true},'price',140); assert.equal(promo.firstOrderTotal,98); checks++;
  for (const yardArea of ['', ' ', 'NaN','Infinity','0','-1','0.000001','1e2','0x10','1000001','9'.repeat(308)]) expect({yardArea},'invalid');
  expect({areaUnknown:true,yardArea:''},'quote',null);
  const unknown = expect({areaUnknown:true,yardArea:'999'},'quote',null);
  assert.ok(!estimateText(unknown).includes('999')); checks++;
  assert.match(estimateText(unknown),/Не съм сигурен/); checks++;
  for (const key of ['gardenType','condition','service','frequency']) for (const value of ['','unknown','__proto__','toString']) expect({[key]:value},'invalid');
  expect({frequency:'once'},'invalid');
  for (const service of ['mowing','hedge','shrubs','cleaning','weeding','irrigation']) expect({service,frequency:'once'},'price');
  expect({service:'planting',frequency:'once'},'quote',null);
  expect({service:'mowing',frequency:'once'},'price',56.1); // 200×0.85 lawn share×0.33
  expect({service:'mowing',frequency:'monthly'},'price',56.1); // per visit, never auto monthly
  expect({service:'weeding',frequency:'once'},'price',37.2); // 200×0.1×1.86
  expect({service:'hedge',frequency:'once'},'price',11.16); // modelled 6m, NOT 200m
  const hedge = expect({service:'hedge'},'price'); assert.match(estimateText(hedge),/не измерване/); checks++;
  expect({service:'lawn'},'invalid');
  expect({service:'lawn',lawn:['unknown']},'invalid');
  expect({service:'lawn',lawn:['aeration']},'price',79.9);
  const over = expect({service:'lawn',lawn:['overseeding']},'price');
  const combo = expect({service:'lawn',lawn:['overseeding','fertilizing']},'price');
  assert.equal(over.total,combo.total); checks++;
  assert.equal(expect({service:'lawn',lawn:['aeration','aeration']},'price').total,79.9); checks++;
  for (const value of [null, [], 0, 'bad', {service:[]}]) {assert.equal(calc(value).kind,'invalid'); checks++;}
  for (const rate of Object.values(pricing.rates)) {assert.ok(rate.amount>0 && rate.market[0]>0 && rate.market[1]>=rate.market[0]); checks++; assert.ok(pricing.sources[rate.source].url); checks++;}
  assert.match(vatLabel(),/не е потвърдено/); checks++;
  assert.match(vatLabel('included'),/включен/); checks++;
  assert.match(vatLabel('excluded'),/без ДДС/); checks++;
  const request = data => new Request('http://localhost/api/garden-inquiry',{method:'POST',body:JSON.stringify(data)});
  const submission={name:'Calculator test',email:'test@example.com',phone:'+359880000000',location:'София',message:'Тест',garden:base,total:1,recipient:'attacker@example.com'};
  let sent;
  const ok=await handle(request(submission),async payload=>{sent=payload;});
  assert.equal(ok.status,200);checks++;assert.deepEqual(await ok.json(),{ok:true});checks++;
  for (const text of ['200 м²','Предимно тревна площ','Поддържана градина','Всяка седмица','140,00','София','Тест']) {assert.ok(sent.message.includes(text)); checks++;}
  assert.ok(!('recipient' in sent));checks++;
  const noArea = await handle(request({...submission,garden:{...base,areaUnknown:true,yardArea:''}}),async payload=>{sent=payload;});
  assert.equal(noArea.status,200);checks++;assert.match(sent.message,/не може да се определи/);checks++;
  for (const data of [null, [], {...submission,name:[]}, {...submission,email:'bad'}, {...submission,garden:{...base,gardenType:'toString'}}]) {const r=await handle(request(data),async()=>{throw new Error('must not send');});assert.equal(r.status,400);checks++;}
  const fail=await handle(request(submission),async()=>{throw new Error('provider failed');}); assert.equal(fail.status,500);checks++;
  console.log(`Garden calculator + inquiry: ${checks} assertions passed.`);
} finally { rmSync(dir,{recursive:true,force:true}); }
