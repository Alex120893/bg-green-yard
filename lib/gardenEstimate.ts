// Server calculation: public components import gardenFields only.
import { pricing, type RateKey } from "./gardenPricing";
import { validateGardenInput, numberValue, services, conditionLabels, frequencyLabels, type EstimateInput } from "./gardenFields";
export type Estimate = { kind: "invalid"; errors: string[] } | {
  kind: "price"; lines: string[]; breakdown: string[]; base: number; maintenance: number;
  waste: number; total: number; firstOrderTotal?: number; period: string; notes: string[];
};
const money = (n: number) => new Intl.NumberFormat("bg-BG", { style: "currency", currency: "EUR" }).format(n);
const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
export function vatLabel(status: string = pricing.vat.status) {
  switch (status) {
    case "included": return "ДДС е включен във вътрешните ставки.";
    case "excluded": return "Вътрешните ставки са без ДДС; данъкът не е начисляван автоматично.";
    case "not-applicable": return "ДДС не се начислява.";
    default: return "ДДС: неуточнен статус; не е начисляван данък. Данъчното третиране се уточнява в окончателната оферта.";
  }
}
export function marketRate(key: RateKey, area = 0) {
  const rate = pricing.rates[key];
  const range = "largeMarket" in rate && area > rate.threshold ? rate.largeMarket : rate.market;
  return (range[0] + range[1]) / 2 * pricing.marketFactor;
}
export function estimateGarden(value: unknown): Estimate {
  const parsed = validateGardenInput(value);
  if (!parsed.input) return { kind: "invalid", errors: parsed.errors };
  const i: EstimateInput = parsed.input;
  const area = numberValue(i.yardArea), work = numberValue(i.workArea), plants = numberValue(i.plantCount), hedge = numberValue(i.hedgeLength), beds = numberValue(i.bedArea);
  const service = services.find(s => s.id === i.service)!;
  const lines = [`Услуга: ${service.label}`, `Обща площ на двора: ${area} м² (НЕ площ на газона)`, `Състояние: ${conditionLabels[i.condition]}`, `Достъп: ${i.access === "easy" ? "Лесен / равен терен" : "Затруднен / наклон / стъпала"}`, `Извозване: ${i.waste === "yes" ? `Да, ${i.wasteVolume} м³` : "Не"}`, `Промоция: ${i.promo ? pricing.discount.code + " — заявена, непотвърдено право" : "Не е заявена"}`];
  const breakdown: string[] = [];
  const notes = ["Вътрешна ориентировъчна оценка, не обвързваща оферта. Цените/обхватът се потвърждават след оглед.", vatLabel()];
  let base = 0;
  const addRate = (key: RateKey, quantity: number) => {
    const rate = marketRate(key, work);
    const sum = rate * quantity;
    base += sum;
    breakdown.push(`${pricing.rates[key].scope}: ${quantity} × ${rate.toFixed(4)} = ${money(sum)} (${pricing.rates[key].unit})`);
  };
  if (i.service === "subscription") {
    const s = pricing.subscription;
    base = area * s.basePerYardSqmMonth;
    breakdown.push(`База за целия двор: ${area} м² × ${s.basePerYardSqmMonth} €/м²/месец = ${money(base)}`);
    lines.push(`Посещения: ${frequencyLabels[i.frequency]}`, `Налични растения/храсти извън плета и цветните лехи: ${plants} бр.`, `Жив плет: ${hedge} л.м`, `Цветни лехи: ${beds} м²`, `Включено: ${s.included}`);
    const extras = [
      { label: "растения", qty: Math.max(0, plants - area / 100 * s.includedPlantsPer100Sqm), rule: s.extraPlant },
      { label: "жив плет", qty: Math.max(0, hedge - area / 100 * s.includedHedgePer100Sqm), rule: s.extraHedge },
      { label: "цветни лехи", qty: Math.max(0, beds - area * s.includedBedsShare), rule: s.extraBeds },
    ];
    for (const extra of extras) {
      const rate = (extra.rule.referenceMarket[0] + extra.rule.referenceMarket[1]) / 2 * pricing.marketFactor * extra.rule.monthlyWorkloadShare;
      const sum = extra.qty * rate; base += sum;
      breakdown.push(`Допълнителен обем — ${extra.label}: ${extra.qty.toFixed(2)} × ${rate.toFixed(4)} = ${money(sum)} / месец`);
    }
    const frequency = s.frequency[i.frequency as keyof typeof s.frequency];
    breakdown.push(`Честота: коефициент ${frequency} към месечната поддръжка (не цена на посещение)`);
    base *= frequency;
  } else {
    lines.push("Еднократно изпълнение, не месечен абонамент");
    if (["mowing", "shrubs", "cleaning", "weeding", "lawn", "irrigation"].includes(i.service)) lines.push(`Площ само за избраната работа: ${work} м²`);
    if (i.service === "mowing") addRate(i.condition === "high" ? "highMowing" : "mowing", work);
    else if (i.service === "hedge") { lines.push(`Жив плет: ${hedge} л.м`); addRate("hedge", hedge); }
    else if (i.service === "planting") { lines.push(`Засаждане: ${plants} бр. ${i.plantingType === "shrubs" ? "единични храсти" : "дребноразмерни дървета"}`); addRate(i.plantingType === "shrubs" ? "plantingShrubs" : "plantingTrees", plants); notes.push("Растенията, доставката и извънредната подготовка не са включени в трудовата оценка."); }
    else if (i.service === "lawn") {
      const keys = [...new Set(i.lawn)] as ("aeration" | "overseeding" | "fertilizing")[];
      for (const key of keys) {
        if (key === "fertilizing" && keys.includes("overseeding")) { breakdown.push("Торенето е включено в пакета за подсяване — не се начислява повторно."); continue; }
        addRate(key, work);
      }
      lines.push(`Избрани грижи: ${keys.map(k => ({aeration: "Аериране", overseeding: "Подсяване с подготовка и торене", fertilizing: "Торене"})[k]).join(", ")}`);
    } else addRate(i.service as RateKey, work);
  }
  const condition = i.service === "mowing" && i.condition === "high" ? pricing.coefficients.condition.standard : pricing.coefficients.condition[i.condition as keyof typeof pricing.coefficients.condition];
  const access = pricing.coefficients.access[i.access as keyof typeof pricing.coefficients.access];
  const maintenance = round(base * condition * access);
  breakdown.push(`Състояние ×${condition}; достъп ×${access}; работа общо ${money(maintenance)}`);
  let waste = 0;
  if (i.waste === "yes") {
    const containers = Math.ceil(numberValue(i.wasteVolume) / pricing.rates.waste.containerVolume);
    waste = round(containers * marketRate("waste"));
    breakdown.push(`Извозване: ${containers} контейнер(а) до ${pricing.rates.waste.containerVolume} м³ × ${marketRate("waste").toFixed(4)} = ${money(waste)}`);
    notes.push(i.service === "subscription" ? "Извозване: заявеният общ месечен обем, не този обем при всяко посещение. Товарене/логистика се потвърждават." : "Товарене/логистика на извозването се потвърждават след оглед.");
  }
  const total = round(maintenance + waste);
  if (!Number.isFinite(total) || total <= 0 || maintenance <= 0) return { kind: "invalid", errors: ["Проверете количествата — не може да се изчисли положителна крайна оценка."] };
  const eligible = i.promo && pricing.discount.appliesTo.includes(i.service);
  const firstOrderTotal = eligible ? round(maintenance * (1 - pricing.discount.percent / 100) + waste) : undefined;
  if (i.promo) notes.push(pricing.discount.note, eligible ? "Показана е отделна промоционална оценка; стандартната база не се променя." : "Промоцията не се прилага към избраната услуга.");
  return { kind: "price", lines, breakdown, base: round(base), maintenance, waste, total, firstOrderTotal, period: i.service === "subscription" ? "месец" : "еднократно изпълнение", notes };
}
export function estimateText(r: Exclude<Estimate, { kind: "invalid" }>) {
  return [`ВЪТРЕШНА ОЦЕНКА BG GREEN YARD — ${pricing.version}`, ...r.lines, "--- Разбивка ---", ...r.breakdown,
    `СТАНДАРТНА ВЪТРЕШНА ОЦЕНКА: ${money(r.total)} / ${r.period}`,
    ...(r.firstOrderTotal !== undefined ? [`ПЪРВА ЗАЯВКА / ПЪРВИ МЕСЕЦ С ПРОМОЦИЯ: ${money(r.firstOrderTotal)} (след проверка на правото)`] : []),
    ...r.notes].join("\n");
}
