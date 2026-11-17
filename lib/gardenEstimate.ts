import { pricing, type RateKey } from "./gardenPricing";
import { validateGardenInput, numberValue, services, conditionLabels, frequencyLabels, frequencyOptions, gardenLabels } from "./gardenFields";
export type Estimate = { kind: "invalid"; errors: string[] } | {
  kind: "price" | "quote"; lines: string[]; breakdown: string[]; total: number | null; firstOrderTotal?: number;
  period: string; notes: string[];
};
export const formatEuro = (n: number) => new Intl.NumberFormat("bg-BG", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n);
const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
export function vatLabel(status: string = pricing.vat.status) {
  switch (status) {
    case "included": return "ДДС е включен.";
    case "excluded": return "Цената е без ДДС. Приложимият данък се уточнява в окончателната оферта.";
    case "not-applicable": return "ДДС не се начислява.";
    default: return "ДДС: включването му не е потвърдено. Данъчното третиране се уточнява в окончателната оферта.";
  }
}
export function estimateGarden(value: unknown): Estimate {
  const parsed = validateGardenInput(value);
  if (!parsed.input) return { kind: "invalid", errors: parsed.errors };
  const i = parsed.input;
  const service = services.find(s => s.id === i.service)!;
  const garden = pricing.gardenTypes[i.gardenType as keyof typeof pricing.gardenTypes];
  const period = i.service === "subscription" ? "месец" : "посещение";
  const lines = [`Услуга: ${service.label}`, `Обща площ на двора: ${i.areaUnknown ? "Не съм сигурен/на за площта" : `${i.yardArea} м²`}`, `Състояние: ${conditionLabels[i.condition as keyof typeof conditionLabels]}`, `Тип градина: ${gardenLabels[i.gardenType as keyof typeof gardenLabels]}`, ...(frequencyOptions(i.service).length ? [`Честота: ${frequencyLabels[i.frequency as keyof typeof frequencyLabels]}`] : ["Обхват: еднократна работа / проект, без график на посещения"]), `Промоция: ${i.promo ? `${pricing.discount.code} — заявена` : "Не е заявена"}`];
  const breakdown: string[] = [];
  const notes = ["Окончателната оферта се потвърждава след оглед на място.", vatLabel()];
  if (i.areaUnknown || i.service === "planting") {
    notes.push(i.areaUnknown ? "Без приблизителна площ не измисляме сума. Ще уточним площта при оглед." : `За засаждане уточняваме вида, размера и броя на растенията при оглед. Работен ориентир за единичен храст: ${formatEuro(pricing.rates.planting.amount)}/бр. труд; растения и доставка отделно.`);
    return { kind: "quote", lines, breakdown, total: null, period, notes };
  }
  const area = numberValue(i.yardArea);
  let subtotal = 0;
  const add = (key: RateKey, quantity: number, basis: string) => {
    const rate = pricing.rates[key]; const sum = quantity * rate.amount; subtotal += sum;
    breakdown.push(`${rate.scope}: ${quantity.toLocaleString("bg-BG", {maximumFractionDigits: 2})} × ${rate.amount} (${rate.unit}) = ${formatEuro(sum)}. ${basis}`);
  };
  if (i.service === "subscription") {
    subtotal = area * pricing.subscription.basePerYardSqmMonth;
    breakdown.push(`База за целия двор: ${area} м² × ${pricing.subscription.basePerYardSqmMonth} €/м²/месец = ${formatEuro(subtotal)}`);
    lines.push(`Включено: ${pricing.subscription.included}`);
    const frequency = pricing.subscription.frequency[i.frequency as keyof typeof pricing.subscription.frequency];
    breakdown.push(`Тип градина ×${garden.maintenanceFactor}; честота ×${frequency}`);
    subtotal *= garden.maintenanceFactor * frequency;
  } else {
    notes.push(frequencyOptions(i.service).length ? "Сумата е за едно посещение, не месечен абонамент. Посочената честота се предава в заявката." : "Оценката е за еднократна работа / проект, без абонаментен график.");
    if (["mowing", "lawn"].includes(i.service)) {
      const quantity = area * garden.lawnShare;
      const basis = `Приблизителен модел: ${Math.round(garden.lawnShare * 100)}% от целия двор е трева; това не е измерена площ.`;
      if (i.service === "mowing") add("mowing", quantity, basis);
      else for (const key of i.lawn as ("aeration" | "overseeding" | "fertilizing")[]) {
        if (key === "fertilizing" && i.lawn.includes("overseeding")) { breakdown.push("Торенето е включено в пакета за подсяване и не се начислява повторно."); continue; }
        add(key, quantity, basis);
      }
    } else if (["hedge", "shrubs"].includes(i.service)) {
      const meters = area / 100 * (i.service === "hedge" ? garden.hedgeMetersPer100 : garden.shrubMetersPer100);
      add(i.service as "hedge" | "shrubs", meters, "Дължината е приблизителен модел по общата площ и типа градина, не измерване от клиента; уточнява се при оглед.");
    } else if (i.service === "weeding") add("weeding", area * garden.weedShare, `Модел за плевене: ${Math.round(garden.weedShare * 100)}% от двора; реалният обхват се уточнява при оглед.`);
    else if (i.service === "irrigation") { add("irrigation", area * garden.irrigationShare, "Проектен бюджет по прогнозна поливна площ; зони, материали и изкопи след оглед."); notes.push("Оценката е за проект/изграждане, не повтаряща се месечна услуга."); }
    else add("cleaning", area, "Модел за почистване на целия терен, без извозване.");
  }
  const factor = pricing.condition[i.condition as keyof typeof pricing.condition];
  const total = round(subtotal * factor);
  breakdown.push(`Състояние ×${factor}`);
  if (!Number.isFinite(total) || total <= 0) return { kind: "invalid", errors: ["Проверете приблизителната площ — оценката трябва да е положителна."] };
  const eligible = i.promo && pricing.discount.appliesTo.includes(i.service);
  const firstOrderTotal = eligible ? round(total * (1 - pricing.discount.percent / 100)) : undefined;
  if (i.promo) notes.push(pricing.discount.note, eligible ? "Промоционалната оценка е отделна от стандартната цена." : "Избраната услуга не е включена в промоцията.");
  return { kind: "price", lines, breakdown, total, firstOrderTotal, period: i.service === "irrigation" ? "проект" : frequencyOptions(i.service).length ? period : "изпълнение", notes };
}
export function estimateText(r: Exclude<Estimate, { kind: "invalid" }>) {
  return [`ОЦЕНКА BG GREEN YARD — ${pricing.version}`, ...r.lines, "--- За какво е изчислена ---", ...r.breakdown,
    r.total === null ? "Ориентировъчна сума: не може да се определи без уточнение при оглед." : `Ориентировъчна цена: ${formatEuro(r.total)} / ${r.period}`,
    ...(r.firstOrderTotal !== undefined ? [`Промоционална първа заявка/първи месец: ${formatEuro(r.firstOrderTotal)}`] : []), ...r.notes].join("\n");
}
