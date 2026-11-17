/** Работни тарифи BG GREEN YARD по задание на собственика, 17.11.2026.
 * Ставките вече включват желаното позициониране; НЕ умножаваме повторно по 0,93.
 * Не представяме всяка стойност като независимо проверена пазарна средна.
 */
export const pricing = {
  version: "2026-11-17-service-rates-v4",
  checkedAt: "2026-11-17",
  currency: "EUR",
  source: "Задание на собственика от 17.11.2026; готови ориентировъчни ставки, без повторно намаление с 7%",
  reference: "https://ozeleniavanesofia.bg/ozelenyavane-na-dvor/",
  vat: { status: "unconfirmed" as "included" | "excluded" | "not-applicable" | "unconfirmed" },
  rates: {
    subscription: { amount: 0.70, unit: "€/м²/месец", minimum: 0 },
    mowingStandard: { amount: 0.37, unit: "€/м²", minimum: 0 },
    mowingHigh: { amount: 0.65, unit: "€/м²", minimum: 0 },
    hedgeLow: { amount: 2.60, unit: "€/пог. м", minimum: 0 },
    hedgeMedium: { amount: 3.70, unit: "€/пог. м", minimum: 0 },
    hedgeHigh: { amount: 5.60, unit: "€/пог. м", minimum: 0 },
    shrubs: { amount: 10, unit: "€/бр.", minimum: 50 },
    cleaning: { amount: 1.22, unit: "€/м²", minimum: 50 },
    weeding: { amount: 1.85, unit: "€/м²", minimum: 0 },
    lawn: { amount: 3.70, unit: "€/м²", minimum: 0 },
    plantingFlowers: { amount: 7.40, unit: "€/м² труд", minimum: 0 },
    plantingHedge: { amount: 2.80, unit: "€/пог. м труд", minimum: 0 },
    plantingPlants: { amount: 1.10, unit: "€/бр. труд, от", minimum: 0 },
    irrigationDrip: { amount: 5.60, unit: "€/м²", minimum: 0 },
    irrigationAuto: { amount: 8.40, unit: "€/м²", minimum: 0 },
    irrigationSprinklers: { amount: 10.70, unit: "€/м²", minimum: 0 },
  },
  // Диапазони за приблизителен ОБЕМ, не измервания и не пазарни норми.
  volumeRanges: {
    meters: { small: [5, 15], medium: [15, 40], large: [40, 80] },
    plants: { small: [1, 5], medium: [6, 15], large: [16, 30] },
  },
  subscription: {
    included: "Поддръжка на целия двор: косене, обкантване, текущо плевене и обичайна грижа за тревата, храстите, живия плет и цветните лехи",
    frequency: { weekly: 1, fortnightly: 0.78, monthly: 0.55 },
    garden: { lawn: 1, light: 1, mixed: 1.05, dense: 1.15 },
    condition: { standard: 1, high: 1.20, overgrown: 1.50 },
  },
  discount: { percent: 30, code: "FIRST-GARDEN-30", appliesTo: ["subscription", "mowing", "hedge", "shrubs", "cleaning", "weeding", "lawn"], note: "Само първа поддръжка / първи месец; не материали или извозване. Правото се потвърждава от BG GREEN YARD." },
};
export type RateKey = keyof typeof pricing.rates;
