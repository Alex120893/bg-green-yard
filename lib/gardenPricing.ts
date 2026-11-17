/** Единна редакторска конфигурация: EUR, източници, бизнес допускания и промоция. */
export const pricing = {
  version: "2026-11-17-simple-v3",
  checkedAt: "2026-11-17",
  currency: "EUR",
  vat: { status: "unconfirmed" as "included" | "excluded" | "not-applicable" | "unconfirmed" },
  marketFactor: 0.93,
  sources: {
    sofiaYard: { name: "Озеленяване София — двор", url: "https://ozeleniavanesofia.bg/ozelenyavane-na-dvor/", checkedAt: "2026-11-17", note: "Публикувани диапазони и примерни месечни бюджети; ДДС и точните включвания не са уточнени. Не приравняваме метър към м²." },
    aqua: { name: "Aqua World Bulgaria", url: "https://aqua-worldbg.com/tseni/", checkedAt: "2026-11-17", note: "София; поливни системи 6–12 €/м²; ДДС/точни включвания не са уточнени." },
    heroes: { name: "Greenheroes", url: "https://greenheroes.bg/цени/", checkedAt: "2026-11-17", note: "Сезон 2026; евро без ДДС; София и страната. Изнасяне не означава транспорт до депо." },
    sofia: { name: "Озеленяване София", url: "https://ozeleniavanesofia.bg/kosene-na-treva/", checkedAt: "2026-11-17", note: "София и региона; ориентировъчни цени след оглед; ДДС не е уточнен." },
    grad: { name: "Градинарите", url: "https://gradinarite.com/цени-и-услуги/", checkedAt: "2026-11-17", note: "Сезон 2025/2026; еднократните ставки са само за комбиниран пакет. Не са самостоятелни услуги." },
    kanali: { name: "БГ Канали Груп", url: "https://bgkanaligroup.com/ceni-ozelenqvane/", checkedAt: "2026-11-17", note: "София и областта; обновено 08.06.2026; еднократните ставки са само за пакет." },
    parkland: { name: "Паркланд ООД", url: "https://parkland.bg/oferti/92-aerirane-na-trevni-ploshti", checkedAt: "2026-11-17", note: "София и околностите; пакет по площ в лева без ДДС, не €/м²; вертикутир, без извозване. Не участва в ставките." },
    gardens: { name: "София Гарден", url: "https://sofiagardens.com/цени-градинарски-услуги", checkedAt: "2026-11-17", note: "Изключен: таблицата е в EUR, но бележката казва лева; неясна актуалност." },
    dvorove: { name: "Dvorove.com", url: "https://dvorove.com/ceni-kosene-na-treva/", checkedAt: "2026-11-17", note: "Изключен: сайтът изрично посочва неактуални цени; само големи площи." },
  },
  rates: {
    mowing: { amount: 0.33, market: [0.20, 0.50], unit: "€/м²/посещение", source: "sofiaYard", scope: "Косене на трева" },
    weeding: { amount: 1.86, market: [1, 3], unit: "€/м²/посещение", source: "sofiaYard", scope: "Плевене" },
    hedge: { amount: 1.86, market: [1, 3], unit: "€/м/посещение", source: "sofiaYard", scope: "Оформяне на жив плет" },
    shrubs: { amount: 1.86, market: [1, 3], unit: "€/м/посещение", source: "sofiaYard", scope: "Оформяне на храсти" },
    aeration: { amount: 0.47, market: [0.20, 0.80], unit: "€/м²/посещение", source: "sofiaYard", scope: "Аериране" },
    // Настроени по задание; не добавяме нови услуги в менюто само защото имат ставка.
    fruitTrees: { amount: 5.12, market: [3, 8], unit: "€/бр./посещение", source: "sofiaYard", scope: "Подрязване на плодни дървета" },
    protection: { amount: 0.28, market: [0.1, 0.5], unit: "€/м²/посещение", source: "sofiaYard", scope: "Растителна защита" },
    fertilizing: { amount: 0.42, market: [0.45, 0.45], unit: "€/м²/посещение", source: "heroes", scope: "Пролетно торене с тор" },
    overseeding: { amount: 5.71, market: [6.14, 6.14], unit: "€/м²/изпълнение", source: "grad", scope: "Подсяване с подготовка, почва, торене и поливане" },
    cleaning: { amount: 3.76, market: [4, 4.09], unit: "€/м²/изпълнение", source: "kanali", scope: "Почистване на запустял терен, без извозване" },
    planting: { amount: 7.29, market: [7.67, 8], unit: "€/бр./изпълнение", source: "grad", scope: "Труд за засаждане на единичен храст; вид/брой след оглед" },
    irrigation: { amount: 8.37, market: [6, 12], unit: "€/м²/проект", source: "aqua", scope: "Проектен ориентир за поливна система; материали/изкопи след оглед" },
  },
  subscription: {
    basePerYardSqmMonth: 0.70,
    unit: "€/м²/месец",
    included: "Редовно косене, обкантване, текущо плевене и обичайна поддръжка на наличните храсти, жив плет и цветни лехи в целия двор",
    source: "Задание на собственика; 200 м² × 0,70 = 140 €/месец при седмични посещения",
    comparison: "Озеленяване София: около 300 м², 150–300 €/месец. Среда 225; ×0,93 = 209,25; /300 = 0,6975 ≈ 0,70. Честотата и обхватът на чуждия пакет не са изцяло уточнени — приблизителна, не гарантирана съпоставимост.",
    frequency: { weekly: 1, fortnightly: 0.78, monthly: 0.55 },
  },
  // Вътрешни приблизителни модели, НЕ измерени площи/дължини или пазарни норми.
  gardenTypes: {
    lawn: { maintenanceFactor: 1, lawnShare: 0.85, weedShare: 0.10, hedgeMetersPer100: 3, shrubMetersPer100: 3, irrigationShare: 0.90 },
    light: { maintenanceFactor: 1, lawnShare: 0.65, weedShare: 0.15, hedgeMetersPer100: 5, shrubMetersPer100: 8, irrigationShare: 0.90 },
    mixed: { maintenanceFactor: 1.05, lawnShare: 0.45, weedShare: 0.25, hedgeMetersPer100: 12, shrubMetersPer100: 12, irrigationShare: 0.90 },
    dense: { maintenanceFactor: 1.15, lawnShare: 0.25, weedShare: 0.40, hedgeMetersPer100: 18, shrubMetersPer100: 20, irrigationShare: 0.90 },
  },
  condition: { standard: 1, high: 1.20, overgrown: 1.50 },
  discount: { percent: 30, code: "FIRST-GARDEN-30", appliesTo: ["subscription", "mowing", "hedge", "shrubs", "cleaning", "weeding", "lawn"], note: "Само първата заявка за поддръжка / първия месец, без материали и извозване. Правото се потвърждава от BG GREEN YARD." },
};
export type RateKey = keyof typeof pricing.rates;
