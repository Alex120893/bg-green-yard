/** Редактируйте тарифы и ДДС здесь. Рыночные ориентиры, НЕ утверждённый прайс BG GREEN YARD. */
export const pricing = {
  checkedAt: "2026-11-17",
  currency: "EUR",
  ownerApproval: "pending",
  // Не определяем налоговый статус фирмы. included / excluded / not-applicable / unconfirmed.
  // Статус описывает введённые ставки; автоматического начисления налога нет.
  vat: { status: "unconfirmed" as "included" | "excluded" | "not-applicable" | "unconfirmed" },
  // Нейтральное значение — не рыночная надбавка. Сложные условия требуют оглед.
  coefficients: { standardAccess: 1, standardCondition: 1 },
  sources: {
    heroes: { name: "Greenheroes", url: "https://greenheroes.bg/цени/", checkedAt: "2026-11-17", note: "Сезон 2026; евро без ДДС; София и страната. Изнасяне не означава транспорт до депо." },
    sofia: { name: "Озеленяване София", url: "https://ozeleniavanesofia.bg/kosene-na-treva/", checkedAt: "2026-11-17", note: "София и региона; ориентировъчни цени след оглед; ДДС не е уточнен." },
    grad: { name: "Градинарите", url: "https://gradinarite.com/цени-и-услуги/", checkedAt: "2026-11-17", note: "Сезон 2025/2026; еднократните ставки са само за комбиниран пакет. Не са самостоятелни услуги." },
    kanali: { name: "БГ Канали Груп", url: "https://bgkanaligroup.com/ceni-ozelenqvane/", checkedAt: "2026-11-17", note: "София и областта; обновено 08.06.2026; еднократните ставки са само за пакет." },
    parkland: { name: "Паркланд ООД", url: "https://parkland.bg/oferti/92-aerirane-na-trevni-ploshti", checkedAt: "2026-11-17", note: "София и околностите; пакет по площ в лева без ДДС, не €/м²; вертикутир, без извозване. Не участва в ставките." },
    gardens: { name: "София Гарден", url: "https://sofiagardens.com/цени-градинарски-услуги", checkedAt: "2026-11-17", note: "Изключен: таблицата е в EUR, но бележката казва лева; неясна актуалност." },
    dvorove: { name: "Dvorove.com", url: "https://dvorove.com/ceni-kosene-na-treva/", checkedAt: "2026-11-17", note: "Изключен: сайтът изрично посочва неактуални цени; само големи площи." },
  },
  rates: {
    mowing: { label: "Косене със събиране и изнасяне на остатъците", unit: "м²", min: 0.22, max: 0.22, aboveArea: 1000, largeMin: 0.17, largeMax: 0.17, sources: ["heroes"], checkedAt: "2026-11-17", note: "За едно посещение; без транспорт до депо. Над 1000 м²: 0,17 €/м²." },
    highMowing: { label: "Косене на висока трева — първо косене", unit: "м²", min: 0.35, max: 0.35, sources: ["heroes"], checkedAt: "2026-11-17", note: "Всяка площ; силно запустял терен е след оглед." },
    weeding: { label: "Плевене", unit: "м²", min: 1, max: 3, sources: ["sofia"], checkedAt: "2026-11-17", note: "Без общо разчистване, строителни отпадъци и извозване." },
    aeration: { label: "Аериране на тревни площи", unit: "м²", min: 0.2, max: 0.8, sources: ["sofia"], checkedAt: "2026-11-17", note: "Методът и дълбочината се уточняват; без подсяване и торене." },
    fertilizing: { label: "Пролетно торене с включен тор", unit: "м²", min: 0.45, max: 0.45, aboveArea: 1000, largeMin: 0.4, largeMax: 0.4, sources: ["heroes"], checkedAt: "2026-11-17", note: "Над 1000 м²: 0,40 €/м²; видът тор се уточнява." },
  },
  quoteOnly: {
    hedge: "Подрязването зависи от височината и ширината. Сравнените цени включват и окопаване в пакет, затова не ги прилагаме за самостоятелна резитба.",
    shrubs: "Нужни са вид, размер и брой/площ на храстите. Пакетните ставки не са цена за самостоятелна резитба.",
    cleaning: "Почистването зависи от вида и количеството отпадъци. Не приравняваме почистване на листа с разчистване на запустял двор.",
    overseeding: "Нужни са оценка на тревата, смеска, почва и обхват на подготовката. Няма достатъчно съпоставими данни за самостоятелно подсяване.",
    planting: "Видът, размерът, броят и доставката на растенията се уточняват след оглед. Озеленяването е по индивидуален проект.",
    irrigation: "Точна цена след оглед: водоизточник, налягане, зони, автоматика и изкопи.",
    subscription: "Месечната цена се определя след оглед и уточняване на дейностите и честотата. Не умножаваме цена на м² по брой посещения.",
  },
};

export type RateKey = keyof typeof pricing.rates;
export type ServiceKey = "mowing" | "hedge" | "shrubs" | "cleaning" | "weeding" | "lawn" | "planting" | "irrigation" | "subscription";
export const services: { id: ServiceKey; label: string; unit: string }[] = [
  { id: "mowing", label: "Косене на трева", unit: "м²" },
  { id: "hedge", label: "Подрязване на жив плет", unit: "л.м" },
  { id: "shrubs", label: "Подрязване на храсти", unit: "м²" },
  { id: "cleaning", label: "Почистване на терен", unit: "м²" },
  { id: "weeding", label: "Плевене", unit: "м²" },
  { id: "lawn", label: "Грижа за тревен килим", unit: "м²" },
  { id: "planting", label: "Засаждане / озеленяване", unit: "бр." },
  { id: "irrigation", label: "Поливни системи", unit: "м²" },
  { id: "subscription", label: "Абонаментна поддръжка на градина", unit: "м²" },
];
