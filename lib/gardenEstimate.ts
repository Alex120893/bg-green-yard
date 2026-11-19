import { pricing, type RateKey } from "./gardenPricing";
import { validateGardenInput, numberValue, services, selectedRate, quantityKind, conditionLabels, frequencyLabels, frequencyOptions, gardenLabels, variantLabels, irrigationWorkLabels } from "./gardenFields";
export type Estimate = {kind:"invalid";errors:string[]} | {
  kind: "price" | "quote"; lines: string[]; breakdown: string[]; total: number | null; maxTotal?: number;
  quoteMessage?: string; firstOrderTotal?: number; firstOrderMax?: number; period: string; notes: string[];
};
export const formatEuro = (n:number) => new Intl.NumberFormat("bg-BG",{style:"currency",currency:"EUR",maximumFractionDigits:2}).format(n);
const round = (n:number) => Math.round((n+Number.EPSILON)*100)/100;
export function tariffText(key: RateKey) { const r=pricing.rates[key]; return `${r.amount.toLocaleString("bg-BG")} ${r.unit}`; }
export function serviceTariffText(id:string) {
  if (["irrigation", "planting"].includes(id)) return "Цената се определя след оглед";
  const s=services.find(s=>s.id===id);
  return s?.rates.map(key=>`${variantLabels[key] ? variantLabels[key]+": " : ""}${tariffText(key)}`).join("; ") ?? "";
}
export function vatLabel(status:string=pricing.vat.status) {
  return status === "included" ? "ДДС е включен." : status === "excluded" ? "Цената е без ДДС. Данъкът се уточнява в офертата." : status === "not-applicable" ? "ДДС не се начислява." : "ДДС: включването му не е потвърдено. Данъчното третиране се уточнява в окончателната оферта.";
}
function plantingEstimate(i: import("./gardenFields").EstimateInput): Exclude<Estimate,{kind:"invalid"}> {
  const large = i.variant === "plantingTrees" && i.treeSize === "large";
  const lines = ["Услуга: Засаждане", `Вид: ${variantLabels[i.variant as RateKey]}`, ...(i.variant === "plantingTrees" ? [`Размер: ${large ? "Едроразмерни дървета" : "Стандартни декоративни дървета"}`] : []), `Обем: ${{small:"Малък",medium:"Среден",large:"Голям",unknown:"Не съм сигурен/на — уточнете с мен"}[i.volume]}`, `Оферта за растения, почвени материали и доставка: ${i.supplies ? "Поискана отделно — НЕ са включени в тази сума" : "Не е поискана — НЕ се добавят"}`];
  const notes = ["Цената е само за труд. Растенията, почвените материали и доставката НЕ са включени и се оферират отделно само при Ваше желание.", "Окончателната оферта се потвърждава след оглед на място.", vatLabel()];
  return {kind:"quote",lines,breakdown:[],total:null,period:"заявка",quoteMessage:"Цената се определя след оглед",notes};
}
export function estimateGarden(value:unknown):Estimate {
  const parsed=validateGardenInput(value);
  if(!parsed.input) return {kind:"invalid",errors:parsed.errors};
  const i=parsed.input, key=selectedRate(i)!, r=pricing.rates[key], kind=quantityKind(i);
  if(i.service === "planting") return plantingEstimate(i);
  if(i.service === "irrigation") return {
    kind:"quote", total:null, period:"заявка", quoteMessage:"Цената се определя след оглед",
    lines:["Услуга: Поливна система", `Дейност: ${irrigationWorkLabels[i.irrigationWork as keyof typeof irrigationWorkLabels]}`],
    breakdown:[], notes:["За избраната дейност е необходим оглед и уточняване на обекта. След това ще получите индивидуална оферта.", "Окончателната оферта се потвърждава след оглед на място."],
  };
  const service=services.find(s=>s.id===i.service)!;
  const period=i.service==="subscription" ? "месец" : "изпълнение";
  const lines=[`Услуга: ${service.label}`, ...(variantLabels[key] ? [`Вид: ${variantLabels[key]}`] : []), `Тарифа: ${tariffText(key)}`];
  if(frequencyOptions(i.service).length) lines.push(`Честота: ${frequencyLabels[i.frequency as keyof typeof frequencyLabels]}`);
  else lines.push("Обхват: еднократна работа / проект, без график на посещения");
  const breakdown:string[]=[], notes=["Окончателната оферта се потвърждава след оглед на място.",vatLabel()];
  if(i.service==="subscription") lines.push(`Тип градина: ${gardenLabels[i.gardenType as keyof typeof gardenLabels]}`,`Състояние: ${conditionLabels[i.condition as keyof typeof conditionLabels]}`,`Включено: ${pricing.subscription.included}`);
  if(i.service==="cleaning") notes.push("Тарифата е за силно обрасъл терен. Извозване и извънредни дейности се уточняват отделно; не е обикновено косене.");
  if(i.service==="lawn") notes.push("Комплексна сезонна обработка. Семена, тор и други материали се остойностяват отделно и НЕ са включени в сумата за обработка.");
  let low:number, high:number;
  if(kind==="area") {
    if(i.areaUnknown) { lines.push("Площ: Не съм сигурен/на — уточнете с мен"); return {kind:"quote",lines,breakdown,total:null,period,notes}; }
    low=high=numberValue(i.yardArea);
    lines.push(`${i.service==="subscription" ? "Обща площ на целия двор" : "Приблизителна площ за избраната услуга"}: ${low} м²`);
  } else {
    const unit=kind==="meters" ? "пог. м" : "бр.";
    if(i.volume==="unknown") { lines.push("Обем: Не съм сигурен/на — уточнете с мен"); return {kind:"quote",lines,breakdown,total:null,period,notes}; }
    if(i.volume==="exact") low=high=numberValue(i.quantity);
    else { const range=pricing.volumeRanges[kind][i.volume as "small"|"medium"|"large"]; low=range[0]; high=range[1]; }
    lines.push(`Обем: ${low===high ? low : `${low}–${high}`} ${unit}${i.volume!=="exact" ? " (приблизителен диапазон)" : " (приблизително)"}`);
    if(i.volume!=="exact") notes.push("Малък/среден/голям са условни диапазони за обем, не измерен брой или дължина. По-голям обект се уточнява индивидуално.");
  }
  let factor=1;
  if(i.service==="subscription") {
    const s=pricing.subscription;
    factor=s.frequency[i.frequency as keyof typeof s.frequency]*s.garden[i.gardenType as keyof typeof s.garden]*s.condition[i.condition as keyof typeof s.condition];
    breakdown.push(`База: целият двор × ${r.amount} €/м²/месец. Коефициент за избраните тип, състояние и честота: ×${factor}.`);
  } else if(frequencyOptions(i.service).length) notes.push("Сумата е за едно изпълнение, не за целия месец. Желаната честота е включена в заявката.");
  // The supplied cleaning and high-grass rates already describe difficulty. No common multiplier.
  const minimum=i.service==="shrubs" && i.frequency!=="once" ? 0 : r.minimum;
  const total=round(Math.max(minimum,low*r.amount*factor)), maxTotal=round(Math.max(minimum,high*r.amount*factor));
  breakdown.push(`${low===high ? low : `${low}–${high}`} × ${tariffText(key)}${factor!==1 ? ` × ${factor}` : ""} = ${formatEuro(total)}${maxTotal!==total ? ` – ${formatEuro(maxTotal)}` : ""}`);
  if(minimum) breakdown.push(`Минимална стойност за тази заявка: ${formatEuro(minimum)}.`);
  if(!Number.isFinite(total)||!Number.isFinite(maxTotal)||total<=0||maxTotal<total) return {kind:"invalid",errors:["Проверете количествата — цената трябва да е положителна."]};
  const eligible=i.promo&&pricing.discount.appliesTo.includes(i.service);
  const discounted=(n:number)=>round(Math.max(minimum,n*(1-pricing.discount.percent/100)));
  if(i.promo) {lines.push(`Промоция: ${pricing.discount.code} — заявена`);notes.push(pricing.discount.note, "Минималната стойност на заявката се запазва и при промоция.");}
  return {kind:"price",lines,breakdown,total,maxTotal,period,notes,...(eligible?{firstOrderTotal:discounted(total),firstOrderMax:discounted(maxTotal)}:{})};
}
export function estimateText(r:Exclude<Estimate,{kind:"invalid"}>) {
  return [`ОЦЕНКА BG GREEN YARD — ${pricing.version}`,...r.lines,"--- Разчет ---",...r.breakdown,
    r.total===null ? (r.quoteMessage ?? "Ориентировъчна сума: след уточнение на обема / площта.") : `Ориентировъчна цена: ${formatEuro(r.total)}${r.maxTotal!==undefined&&r.maxTotal!==r.total?` – ${formatEuro(r.maxTotal)}`:""} / ${r.period}`,
    ...(r.firstOrderTotal!==undefined?[`Промоционална първа заявка/месец: ${formatEuro(r.firstOrderTotal)}${r.firstOrderMax!==r.firstOrderTotal?` – ${formatEuro(r.firstOrderMax!)}`:""}`]:[]),...r.notes].join("\n");
}
