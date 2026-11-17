/** INTERNAL: imported only by server estimation, never by the public calculator. */
export const pricing = {
  version: "2026-11-17-private-v2",
  checkedAt: "2026-11-17",
  currency: "EUR",
  vat: { status: "unconfirmed" as "included" | "excluded" | "not-applicable" | "unconfirmed" },
  // 7% below the midpoint for the SAME scope/unit. Not an extra promotional discount.
  marketFactor: 0.93,
  sources: {
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
    mowing: { market: [0.22, 0.22], largeMarket: [0.17, 0.17], threshold: 1000, unit: "€/м²/посещение", sources: ["heroes"], scope: "Косене със събиране и изнасяне, без транспорт до депо" },
    highMowing: { market: [0.35, 0.35], unit: "€/м²/посещение", sources: ["heroes"], scope: "Косене на висока трева, без извозване" },
    weeding: { market: [1, 3], unit: "€/м²/посещение", sources: ["sofia"], scope: "Плевене без разчистване и извозване" },
    aeration: { market: [0.2, 0.8], unit: "€/м²/посещение", sources: ["sofia"], scope: "Аериране; методът се уточнява" },
    fertilizing: { market: [0.45, 0.45], largeMarket: [0.4, 0.4], threshold: 1000, unit: "€/м²/посещение", sources: ["heroes"], scope: "Пролетно торене с тор" },
    overseeding: { market: [6.14, 6.14], unit: "€/м²/изпълнение", sources: ["grad"], scope: "Подсяване с подготовка, почва, торене и поливане; пакетен ориентир, не само семена" },
    hedge: { market: [6, 6.14], unit: "€/л.м/изпълнение", sources: ["kanali", "grad"], scope: "Подрязване И окопаване в пакет, без транспорт до депо" },
    shrubs: { market: [4.35, 4.5], unit: "€/м²/изпълнение", sources: ["grad", "kanali"], scope: "Подрязване И окопаване на храстови групи в пакет" },
    cleaning: { market: [4, 4.09], unit: "€/м²/изпълнение", sources: ["kanali", "grad"], scope: "Разчистване на запустяла площ; извозване отделно" },
    plantingShrubs: { market: [7.67, 8], unit: "€/бр./изпълнение", sources: ["grad", "kanali"], scope: "Труд за засаждане на единични храсти; растения и доставка отделно" },
    plantingTrees: { market: [33, 33.23], unit: "€/бр./изпълнение", sources: ["kanali", "grad"], scope: "Труд за дребноразмерни дървета; растения и доставка отделно" },
    irrigation: { market: [6, 12], unit: "€/м²/проект", sources: ["aqua"], scope: "Ориентир за изграждане; материали, зони и изкопи се уточняват след оглед" },
    waste: { containerVolume: 4, market: [90, 92.03], unit: "€/контейнер до 4 м³", sources: ["kanali", "grad"], scope: "Контейнерен ориентир; товарене и условия се потвърждават" },
  },
  // Owner's explicit base: whole yard, not lawn. Not market-derived.
  subscription: {
    basePerYardSqmMonth: 0.70,
    source: "Задание на собственика от 17.11.2026: 200 м² = 140 €/месец при седмични посещения",
    included: "Редовно косене, обкантване, текущо плевене и обичайна поддръжка на налични растения, храсти и жив плет",
    // Business workload allowances, NOT measured market coefficients.
    includedPlantsPer100Sqm: 10, includedHedgePer100Sqm: 10, includedBedsShare: 0.10,
    // Monthly extra work, frequency multiplier below applies to whole maintenance subtotal.
    extraPlant: { referenceMarket: [6, 6.14], monthlyWorkloadShare: 0.4, sources: ["kanali", "grad"], unit: "€/допълнително растение/месец", note: "Референция 6–6,14 €/бр. за подрязване и окопаване; 0,4 месечен трудов дял е вътрешно правило, не пазарен коефициент" },
    extraHedge: { referenceMarket: [6, 6.14], monthlyWorkloadShare: 0.33, sources: ["kanali", "grad"], unit: "€/допълнителен л.м/месец", note: "Референция 6–6,14 €/л.м за подрязване и окопаване; 0,33 месечен трудов дял е вътрешно правило" },
    extraBeds: { referenceMarket: [7.67, 8], monthlyWorkloadShare: 0.43, sources: ["grad", "kanali"], unit: "€/допълнителен м² лехи/месец", note: "Референция за резитби, плевене, окопаване и почистване на цветни площи; 0,43 месечен дял е вътрешно правило" },
    frequency: { weekly: 1, fortnightly: 0.78, monthly: 0.55 },
  },
  // Explicit internal workload decisions, not claims about market averages.
  coefficients: { condition: { standard: 1, high: 1.20, overgrown: 1.50 }, access: { easy: 1, difficult: 1.15 } },
  discount: { percent: 30, code: "FIRST-GARDEN-30", appliesTo: ["subscription", "mowing", "hedge", "shrubs", "cleaning", "weeding", "lawn"], note: "Само първа заявка/първи месец за поддръжка; не транспорт, растения, материали или изграждане. Правото се проверява от собственика." },
};
export type RateKey = keyof typeof pricing.rates;
