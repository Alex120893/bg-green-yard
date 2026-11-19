import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const dir=mkdtempSync(join(tmpdir(),'published-inquiry-'));
try {
 execFileSync(process.execPath,['node_modules/typescript/bin/tsc','lib/publishedInquiry.ts','--outDir',dir,'--module','commonjs','--target','ES2022','--lib','ES2022,DOM','--skipLibCheck'],{stdio:'inherit'});
 const {default:{publishedInquiry:publish}}=await import(pathToFileURL(join(dir,'publishedInquiry.js')).href);
 const {default:{priceQuestionResponse:price}}=await import(pathToFileURL(join(dir,'chatPricing.js')).href);
 let checks=0;
 for(const question of ['Колко струва косене?','колко струва поддръжка на градина','Цена на поливна система?','Сколько стоит посадка?','How much is mowing?']) {
  const original={question,answer:'Стар несвързан отговор за косене и сезонна грижа',createdAt:'2026-11-19T17:00:00Z'};
  const result=publish(original);
  assert.equal(result.answer,price(question).response); checks++;
  assert.equal(result.showCalculator,true); checks++;
  assert.equal(result.createdAt,original.createdAt); checks++;
  assert.equal(original.answer,'Стар несвързан отговор за косене и сезонна грижа'); checks++;
 }
 for(const question of ['Как да поливам драцена?','Колко често да кося?','Необичаен въпрос с отговор от AI']) {
  const answer='Действителният съхранен отговор от чата — не ново търсене в база.';
  const result=publish({question,answer,createdAt:'2026-11-19T17:00:00Z'});
  assert.equal(result.answer,answer);checks++;
  assert.equal(result.showCalculator,false);checks++;
 }
 const current=price('Колко струва косене?').response;
 assert.equal(publish({question:'Колко струва косене?',answer:current,createdAt:'now'}).answer,current);checks++;
 console.log(`Published inquiries: ${checks} assertions passed.`);
} finally {rmSync(dir,{recursive:true,force:true});}
