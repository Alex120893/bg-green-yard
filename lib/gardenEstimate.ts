import { pricing, services, type RateKey } from "./gardenPricing";

export type EstimateInput = {
  service: string; quantity: string; condition: string; access: string;
  frequency: string; waste: string; lawn: string[];
};
export type Estimate = { kind: "invalid"; errors: string[] } | {
  kind: "price" | "quote"; lines: string[]; notes: string[]; min?: number; max?: number;
};
export function vatLabel(status: string = pricing.vat.status) {
  return ({ included: "ДДС е включен в сумата.", excluded: "Сумата е без ДДС. Крайната сума с приложимия ДДС се потвърждава в офертата.", "not-applicable": "ДДС не се начислява.", unconfirmed: "ДДС: статусът не е потвърден от BG GREEN YARD. Не приемайте сумата за крайна цена с ДДС; данъчното третиране ще бъде уточнено в офертата." } as Record<string, string>)[status] ?? "ДДС се уточнява в офертата.";
}
export function estimateGarden(input: EstimateInput): Estimate {
  const service = services.find(s => s.id === input.service);
  const errors: string[] = [];
  const q = Number(input.quantity.trim().replace(",", "."));
  if (!service) errors.push("Изберете услуга.");
  if (!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(input.quantity.trim()) || !Number.isFinite(q) || q <= 0 || (service?.id === "planting" && !Number.isInteger(q))) errors.push(service?.id === "planting" ? "Въведете положителен цял брой растения." : "Въведете положителна площ или дължина.");
  if (!["standard", "high", "overgrown"].includes(input.condition)) errors.push("Изберете състояние на терена.");
  if (!["easy", "difficult"].includes(input.access)) errors.push("Изберете достъп до терена.");
  const hasWaste = !["irrigation", "planting"].includes(input.service);
  if (hasWaste && !["yes", "no"].includes(input.waste)) errors.push("Уточнете дали желаете извозване.");
  if (input.service === "subscription" && !["weekly", "fortnightly", "monthly"].includes(input.frequency)) errors.push("Изберете честота на посещенията.");
  if (input.service === "lawn" && (!input.lawn.length || input.lawn.some(k => !["aeration", "overseeding", "fertilizing"].includes(k)))) errors.push("Изберете поне една грижа за тревния килим.");
  if (errors.length || !service) return { kind: "invalid", errors };
  const lines = [`${service.label} — ${q.toLocaleString("bg-BG")} ${service.unit}`, `Състояние: ${{standard:"Поддържан",high:"Висока трева / нужда от грижа",overgrown:"Запустял"}[input.condition]}`, `Достъп: ${input.access === "easy" ? "Лесен, равен терен" : "Затруднен / наклон / стъпала"}`];
  if (hasWaste) lines.push(`Извозване: ${input.waste === "yes" ? "Желано, цена след уточняване на обема" : "Не е включено"}`);
  if (input.service === "subscription") lines.push(`Честота: ${{weekly:"Всяка седмица",fortnightly:"На две седмици",monthly:"Веднъж месечно"}[input.frequency]}`);
  else if (["planting", "irrigation"].includes(input.service)) lines.push("Срокът и обхватът на проекта се уточняват с офертата.");
  else lines.push("Обхват: едно посещение, не месечен абонамент");
  const notes: string[] = [];
  if (input.access === "difficult") notes.push("Затруднен достъп: точната цена се определя след оглед, без автоматична надбавка.");
  if (input.condition === "overgrown" || (input.condition === "high" && input.service !== "mowing")) notes.push("Състоянието изисква оценка на място, без произволен коефициент.");
  if (hasWaste && input.waste === "yes") notes.push("Извозването се оферира според обема, товаренето и транспорта, а не според площта.");
  const rateKeys: RateKey[] = [];
  if (input.service === "mowing") rateKeys.push(input.condition === "high" ? "highMowing" : "mowing");
  else if (input.service === "weeding") rateKeys.push("weeding");
  else if (input.service === "lawn") {
    for (const key of [...new Set(input.lawn)]) {
      if (key === "overseeding") { lines.push("Подсяване с тревна смеска"); notes.push(pricing.quoteOnly.overseeding); }
      else rateKeys.push(key as RateKey);
    }
  } else notes.push(pricing.quoteOnly[input.service as keyof typeof pricing.quoteOnly]);
  for (const key of rateKeys) lines.push(pricing.rates[key].label);
  // Не показваме непълна междинна сума като обща цена при работа по оферта.
  if (notes.length) return { kind: "quote", lines, notes };
  let min = 0, max = 0;
  for (const key of rateKeys) {
    const rate = pricing.rates[key];
    const large = "aboveArea" in rate && q > rate.aboveArea;
    min += q * (large && "largeMin" in rate ? rate.largeMin : rate.min);
    max += q * (large && "largeMax" in rate ? rate.largeMax : rate.max);
    notes.push(rate.note);
  }
  const factor = pricing.coefficients.standardAccess * pricing.coefficients.standardCondition;
  min = Math.round(min * factor * 100) / 100; max = Math.round(max * factor * 100) / 100;
  if (!Number.isFinite(min) || !Number.isFinite(max) || min <= 0 || max < min) return { kind: "quote", lines, notes: ["Нужна е индивидуална оферта за този размер или настройка на тарифите."] };
  return { kind: "price", lines, notes, min, max };
}
export function formatEuro(value: number) { return new Intl.NumberFormat("bg-BG", { style: "currency", currency: "EUR" }).format(value); }
export function estimateText(result: Exclude<Estimate, {kind: "invalid"}>) {
  return ["Запитване от калкулатора BG GREEN YARD", ...result.lines,
    result.kind === "price" ? `Ориентир: ${formatEuro(result.min!)}${result.max !== result.min ? ` – ${formatEuro(result.max!)}` : ""}` : "Цена: индивидуална оферта след оглед",
    vatLabel(), ...result.notes, "Сумата е предварителна и може да се промени след оглед на място."].join("\n");
}
