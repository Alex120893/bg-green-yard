import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const dir=mkdtempSync(join(tmpdir(),'garden-calc-'));
try {
 execFileSync(process.execPath,['node_modules/typescript/bin/tsc','lib/gardenInquiry.ts','--outDir',dir,'--module','commonjs','--target','ES2022','--lib','ES2022,DOM','--esModuleInterop','--skipLibCheck'],{stdio:'inherit'});
 const load=async name=>(await import(pathToFileURL(join(dir,name+'.js')).href)).default;
 const {estimateGarden:calc,estimateText,serviceTariffText}=await load('gardenEstimate');
 const {changeGardenService:change,validateGardenInput:validate,services,frequencyOptions}=await load('gardenFields');
 const {handleGardenInquiry:handle}=await load('gardenInquiry');
 const base={service:'subscription',variant:'subscription',yardArea:'200',areaUnknown:false,quantity:'',volume:'unknown',gardenType:'lawn',condition:'standard',frequency:'weekly',promo:false};
 let checks=0;
 const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
 const test=(service,patch,expected,max)=>{
  const i={...change(base,service),...patch}; if(service==='subscription'){i.gardenType=patch.gardenType??'lawn';i.condition=patch.condition??'standard';i.yardArea=patch.yardArea??'200';}
  const r=calc(i);eq(r.kind,'price');eq(r.total,expected);if(max!==undefined)eq(r.maxTotal,max);assert.ok(r.total>0&&r.maxTotal>=r.total);checks++;return r;
 };
 test('subscription',{},140);test('subscription',{gardenType:'dense'},161);test('subscription',{frequency:'monthly'},77);
 test('mowing',{yardArea:'200',variant:'mowingStandard'},74);
 test('mowing',{yardArea:'200',variant:'mowingHigh'},130);
 for(const [variant,amount] of [['hedgeLow',26],['hedgeMedium',37],['hedgeHigh',56]]) test('hedge',{variant,volume:'exact',quantity:'10'},amount);
 test('hedge',{variant:'hedgeLow',volume:'small'},13,39);
 test('shrubs',{volume:'exact',quantity:'1'},50);test('shrubs',{volume:'exact',quantity:'8'},80);
 test('shrubs',{volume:'small'},50,50);test('shrubs',{volume:'medium'},60,150);
 test('shrubs',{volume:'exact',quantity:'1',frequency:'monthly'},10);
 const cleaning=test('cleaning',{yardArea:'500',condition:'overgrown'},610);eq(cleaning.period,'изпълнение');
 test('cleaning',{yardArea:'10'},50);test('cleaning',{yardArea:'500',promo:true},610);
 test('weeding',{yardArea:'100'},185);
 eq(calc({...change(base,'lawn'),yardArea:'100'}).kind,'invalid');
 test('planting',{variant:'plantingFlowers',volume:'small'},14.8,37);
 test('planting',{variant:'plantingFlowers',volume:'medium'},44.4,111);
 test('planting',{variant:'plantingHedge',volume:'medium'},44.8,98);
 test('planting',{variant:'plantingShrubs',volume:'large'},45.1,88);
 test('planting',{variant:'plantingTrees',treeSize:'standard',volume:'medium'},4.4,8.8);
 for(const volume of ['small','medium','large','unknown']) {
  const big=calc({...change(base,'planting'),variant:'plantingTrees',treeSize:'large',volume});
  eq(big.kind,'quote');eq(big.total,null);eq(big.maxTotal,undefined);eq(big.quoteMessage,'Цената се определя след оглед');
  assert.ok(!estimateText(big).includes('50,00'));checks++;
 }
 const combined=test('planting',{variant:'plantingPlants',volume:'medium'},69.2,149);
 const supplies=test('planting',{variant:'plantingPlants',volume:'medium',supplies:true},69.2,149);
 eq(combined.total,supplies.total);assert.ok(estimateText(supplies).includes('Поискана отделно'));checks++;
 eq(calc({...change(base,'planting'),volume:'exact',quantity:'100'}).kind,'invalid');
 eq(calc({...change(base,'planting'),variant:'plantingTrees',treeSize:'invalid',volume:'medium'}).kind,'invalid');
 for(const variant of ['plantingFlowers','plantingShrubs','plantingHedge','plantingTrees','plantingPlants']) {
  for(const volume of ['small','medium','large']) {
   const r=calc({...change(base,'planting'),variant,volume,treeSize:'standard'});eq(r.kind,'price');assert.ok(r.total>0&&r.maxTotal>=r.total);checks++;
  }
  eq(calc({...change(base,'planting'),variant,volume:'unknown',treeSize:'standard'}).total,null);
 }
 for(const [variant,total] of [['irrigationDrip',560],['irrigationAuto',840],['irrigationSprinklers',1070]])test('irrigation',{variant,yardArea:'100'},total);
 for(const service of services){assert.ok(serviceTariffText(service.id).includes('€/'));checks++;}
 for(const raw of ['', 'NaN','Infinity','0','-1','1e2','0x10','1000001'])eq(calc({...base,yardArea:raw}).kind,'invalid');
 eq(calc({...base,yardArea:'12,5'}).total,8.75);
 for(const service of ['subscription','mowing','cleaning','weeding','irrigation']){
  const r=calc({...change(base,service),gardenType:'lawn',condition:'standard',areaUnknown:true});eq(r.kind,'quote');eq(r.total,null);
 }
 for(const service of ['hedge','shrubs','planting']){const i=change(base,service);if(service==='planting')i.variant='plantingPlants';eq(calc(i).kind,'quote');}
 eq(calc({...change(base,'shrubs'),volume:'exact',quantity:'1.5'}).kind,'invalid');
 eq(calc({...base,variant:'irrigationDrip'}).kind,'invalid');
 eq(calc({...base,gardenType:'toString'}).kind,'invalid');
 eq(calc({...base,frequency:'once'}).kind,'invalid');
 const shifted=change({...base,quantity:'55',volume:'exact',variant:'hedgeHigh'},'irrigation');eq(shifted.quantity,'');eq(shifted.frequency,'');eq(shifted.volume,'unknown');
 for(const service of ['planting','irrigation','cleaning']){
  eq(frequencyOptions(service),[]);
  const i={...change(base,service),yardArea:'500',frequency:'weekly',gardenType:'dense',condition:'overgrown'};
  eq(validate(i).input.frequency,'');eq(validate(i).input.gardenType,'');
  assert.ok(!estimateText(calc(i)).includes('Честота:'));checks++;
 }
 const promo=calc({...base,promo:true});eq(promo.total,140);eq(promo.firstOrderTotal,98);
 const minimumPromo=calc({...change(base,'cleaning'),yardArea:'10',promo:true});eq(minimumPromo.firstOrderTotal,50);
 const request=data=>new Request('http://localhost/api/garden-inquiry',{method:'POST',body:JSON.stringify(data)});
 const submission={name:'Test',email:'test@example.com',phone:'+359880000000',location:'София',message:'Тест',garden:{...change(base,'cleaning'),yardArea:'500'},total:14,recipient:'attacker@example.com'};
 let sent;
 const response=await handle(request(submission),async p=>{sent=p;});eq(response.status,200);eq(await response.json(),{ok:true});
 for(const text of ['610,00','500 м²','1,22','Почистване на запустял терен']){assert.ok(sent.message.includes(text));checks++;}
 assert.ok(!('recipient' in sent));checks++;
 const plantingRequest={...submission,garden:{...change(base,'planting'),variant:'plantingPlants',volume:'medium',supplies:true}};
 const plantingResponse=await handle(request(plantingRequest),async p=>{sent=p;});eq(plantingResponse.status,200);
 for(const text of ['69,20','149,00','Поискана отделно','почвени материали','Комбинирано засаждане']){assert.ok(sent.message.includes(text));checks++;}
 const largeTreeRequest={...submission,garden:{...change(base,'planting'),variant:'plantingTrees',treeSize:'large',volume:'large'}};
 eq((await handle(request(largeTreeRequest),async p=>{sent=p;})).status,200);
 assert.ok(sent.message.includes('Цената се определя след оглед'));checks++;
 assert.ok(!sent.message.includes('50,00')&&!sent.message.includes('100,80')&&!sent.message.includes('168,00'));checks++;
 const failure=await handle(request(submission),async()=>{throw new Error('failed');});eq(failure.status,500);
 for(const data of [null,[],{...submission,email:'bad'},{...submission,garden:{...base,yardArea:'NaN'}}])eq((await handle(request(data),async()=>{})).status,400);
 console.log(`Service-specific calculator: ${checks} assertions passed. 500 м² запустял терен = 610 €; 200 м² абонамент = 140 €/месец.`);
} finally {rmSync(dir,{recursive:true,force:true});}
