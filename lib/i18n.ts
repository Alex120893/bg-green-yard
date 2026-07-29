export const locales = ["bg", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";

export function isLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}

export type Messages = typeof dictionaryBg;

const dictionaryBg = {
  meta: {
    siteName: "BG Green Yard",
    defaultTitle: "BG Green Yard — озеленяване и поддръжка на градини в София",
    defaultDesc:
      "Професионално озеленяване, поливни системи и снегопочистване за София и регион.",
  },
  nav: {
    home: "Начало",
    about: "За нас",
    services: "Услуги",
    plantCare: "Грижа за растенията",
    lawnCare: "Грижа за тревата",
    gallery: "Галерия",
    contact: "Контакти",
    openMenu: "Отвори менюто",
    closeMenu: "Затвори менюто",
    langShort: "EN",
    langLong: "English",
  },
  home: {
    heroEyebrow: "Озеленяване и поддръжка",
    heroTitle: "Подреден двор. Спокойствие. Трайни решения.",
    heroLead:
      "Професионално озеленяване, абонаментна поддръжка на градини и поливни системи — с фокус върху качество, доверие и дългосрочни партньорства.",
    ctaPrimary: "Разгледай услугите",
    ctaSecondary: "Свържете се с нас",
    trustTitle: "Защо BG Green Yard",
    trust1Title: "Фокус върху София",
    trust1Body:
      "Познаваме градската среда, климатичните особености и нуждите на частни и бизнес имоти в столицата.",
    trust2Title: "Спокойствие за клиента",
    trust2Body:
      "Ясна комуникация, предвидими процеси и внимание към детайла — от огледа до финалния резултат.",
    trust3Title: "Природа и ред",
    trust3Body:
      "Баланс между естетика, функционалност и устойчива поддръжка на зелени площи.",
    brandsTitle: "Вашият партньор за зелени пространства",
    brandsLead:
      "Комбинираме модерни технологии и траен опит, за да поддържаме градини и тревни площи представителни през всички сезони.",
  },
  about: {
    title: "За компанията",
    subtitle: "Мисия, подход и хората зад BG Green Yard",
    missionTitle: "Мисия и цел",
    missionBody:
      "Мисията ни е да създаваме подредени, здрави и красиви зелени пространства за живот и работа в София и околог. Съобщения дългосрочни партньорства, основани на надеждност и висока изпълнителска култура.",
    visionBody:
      "Вярваме, че всеки добре поддържан двор носи повече спокойствие и стойност на имота. Подхождаме индивидуално на всеки проект, проследявайки качеството по всяко време на годината.",
    statsSqm: "поддържани зелени площи (ориентир)",
    statsClients: "доволни клиенти и обекти",
    statsWorkHoursLine: "Почиваме само в неделя",
    whyTitle: "Защо да ни изберете",
    why1Title: "Локален фокус — София",
    why1Body:
      "Работим в столицата и региона — бърза реакция, познаване на терена и сезонните нужди на градини и общи зони.",
    why2Title: "Цялостни решения",
    why2Body:
      "От озеленяване и тревни площи до автоматизирани поливни системи и зимно поддържане на достъпност.",
    why3Title: "Качество и контрол",
    why3Body:
      "Проследим процес, ясни ангажименти и последователна поддръжка, за да запазите резултата във времето.",
    ctaTitle: "Готови за следващата стъпка?",
    ctaButton: "Запитване",
  },
  services: {
    title: "Услуги",
    subtitle:
      "Структурирани решения за частни дворове, жилищни комплекси и бизнес обекти в София.",
    intro:
      "Комбинираме услугите според обекта — от еднократни проекти до абонаментна грижа. Всички дейности са ориентирани към трайност, безопасност и удобство.",
    sofiaNote: "Работим предимно в София и близките квартали; за по-големи договори — уточнение на зона на изпълнение.",
    snow: {
      title: "Снегопочистване",
      body: "Механизирано и ръчно почистване на алеи, паркоместа и достъпи при зимни условия. Поддържаме сигурност и проходимост на жилищни и бизнес обекти.",
    },
    green: {
      title: "Професионално озеленяване и поддръжка",
      body: "Проектиране и изпълнение на озеленяване, поддръжка на градини, нивелиране и поддръжка на тревни площи — кошене, аерация, торене и сезонни работи.",
    },
    irrigation: {
      title: "Поливни системи",
      body: "Проектиране, монтаж и поддръжка на капково и разпръскващо подземно/надземно поливане, автоматика и зониране, за спестяване на вода и равномерен растеж.",
    },
  },
  gallery: {
    title: "Галерия",
    subtitle: "Реални обекти и атмосферата, която създаваме",
    videoNote: "Кадри от наша практика",
  },
  contact: {
    title: "Контакти",
    subtitle: "Направете първата стъпка — отговаряме възможно най-скоро",
    formName: "Име и фамилия",
    formEmail: "Имейл",
    formPhone: "Телефон",
    formService: "Услуга",
    formServicePlaceholder: "Изберете",
    formMessage: "Съобщение",
    formSubmit: "Изпрати запитване",
    formSuccess: "Благодарим! Скоро ще се свържем с вас.",
    formError: "Изпращането не успя. Опитайте отново или се обадете директно.",
    formSending: "Изпращане…",
    formRequired: "Полето е задължително",
    addressLabel: "София, България",
    hoursLabel: "Работно време",
    hoursDayColumn: "Ден",
    hoursTimeColumn: "Часове",
    hoursClosed: "Затворено",
    hoursSchedule: [
      { day: "понеделник", hours: "8:00ч.–17:00ч." },
      { day: "вторник", hours: "8:00ч.–17:00ч." },
      { day: "сряда", hours: "8:00ч.–17:00ч." },
      { day: "четвъртък", hours: "8:00ч.–17:00ч." },
      { day: "петък", hours: "8:00ч.–17:00ч." },
      { day: "събота", hours: "8:00ч.–15:00ч." },
      { day: "неделя", hours: "Затворено" },
    ],
    mapTitle: "Карта",
    emailLabel: "Имейл",
    phoneLabel: "Телефон",
    instagramLabel: "Instagram — BG Green Yard",
    facebookLabel: "Facebook — BG Green Yard",
    reachLabel: "Връзка с нас",
  },
  footer: {
    rights: "Всички права запазени",
    tagline: "Озеленяване и грижа за Вашия двор",
    menuHeading: "Меню",
    brandHeading: "Бранд",
    contactHeading: "Контакти",
    locationLine: "София · България",
    emailLabel: "Имейл",
    phoneLabel: "Телефон",
    instagramLabel: "Instagram — BG Green Yard",
    facebookLabel: "Facebook — BG Green Yard",
  },
  serviceOptions: {
    snow: "Снегопочистване",
    green: "Озеленяване и поддръжка",
    irrigation: "Поливни системи",
    other: "Друго / комбинирано",
  },
};

const dictionaryEn: Messages = {
  meta: {
    siteName: "BG Green Yard",
    defaultTitle: "BG Green Yard — landscaping & garden care in Sofia",
    defaultDesc:
      "Professional landscaping, irrigation systems, and snow removal for Sofia and the region.",
  },
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    plantCare: "Plant Care",
    lawnCare: "Lawn Care",
    gallery: "Gallery",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langShort: "BG",
    langLong: "Български",
  },
  home: {
    heroEyebrow: "Landscaping & maintenance",
    heroTitle: "A calm, well-kept outdoor space that lasts.",
    heroLead:
      "Professional landscaping, garden maintenance, and irrigation — with a focus on quality, trust, and long-term partnerships.",
    ctaPrimary: "Explore services",
    ctaSecondary: "Get in touch",
    trustTitle: "Why BG Green Yard",
    trust1Title: "Sofia-first",
    trust1Body:
      "We understand urban conditions, local climate, and the needs of residential and commercial properties in the capital.",
    trust2Title: "Peace of mind",
    trust2Body:
      "Clear communication, predictable processes, and attention to detail — from the first site visit to the final result.",
    trust3Title: "Nature and order",
    trust3Body:
      "Balance between aesthetics, function, and sustainable care for green areas.",
    brandsTitle: "Your partner for green spaces",
    brandsLead:
      "We combine modern tools and experience to keep gardens and lawns looking their best all year round.",
  },
  about: {
    title: "About us",
    subtitle: "Mission, approach, and the people behind BG Green Yard",
    missionTitle: "Mission & goals",
    missionBody:
      "Our mission is to create tidy, healthy outdoor environments for living and working in Sofia and nearby areas. We build long-term partnerships grounded in reliability and high execution standards.",
    visionBody:
      "We believe a well-maintained yard adds calm and value to every property. Each project is approached individually, with quality monitored across every season.",
    statsSqm: "maintained green areas (indicative)",
    statsClients: "clients & sites served",
    statsWorkHoursLine: "Closed on Sundays only",
    whyTitle: "Why choose us",
    why1Title: "Local focus — Sofia",
    why1Body:
      "We operate in the capital and surroundings — fast response, terrain knowledge, and seasonal needs for gardens and common areas.",
    why2Title: "End-to-end solutions",
    why2Body:
      "From landscaping and lawns to automated irrigation and winter accessibility.",
    why3Title: "Quality & oversight",
    why3Body:
      "Transparent workflow, clear commitments, and consistent upkeep so results hold over time.",
    ctaTitle: "Ready for the next step?",
    ctaButton: "Send an inquiry",
  },
  services: {
    title: "Services",
    subtitle:
      "Structured solutions for private gardens, residential complexes, and commercial sites in Sofia.",
    intro:
      "We tailor combinations of services to each property — from one-off projects to subscription care. Everything is oriented toward durability, safety, and convenience.",
    sofiaNote:
      "We mainly serve Sofia and nearby districts; for larger contracts, the service area is agreed individually.",
    snow: {
      title: "Snow removal",
      body: "Mechanized and manual clearing of paths, parking, and access routes in winter — keeping residential and business sites safe and passable.",
    },
    green: {
      title: "Landscaping & maintenance",
      body: "Design and delivery of planting, garden care, lawn installation and upkeep — mowing, aeration, fertilization, and seasonal work.",
    },
    irrigation: {
      title: "Irrigation systems",
      body: "Design, installation, and maintenance of drip and spray systems, automation and zoning to save water and support even growth.",
    },
  },
  gallery: {
    title: "Gallery",
    subtitle: "Real projects and the atmosphere we build",
    videoNote: "Footage from our work",
  },
  contact: {
    title: "Contact",
    subtitle: "Take the first step — we respond as soon as we can",
    formName: "Full name",
    formEmail: "Email",
    formPhone: "Phone",
    formService: "Service",
    formServicePlaceholder: "Select",
    formMessage: "Message",
    formSubmit: "Send inquiry",
    formSuccess: "Thank you! We will get back to you shortly.",
    formError: "Could not send your message. Please try again or call us directly.",
    formSending: "Sending…",
    formRequired: "This field is required",
    addressLabel: "Sofia, Bulgaria",
    hoursLabel: "Opening hours",
    hoursDayColumn: "Day",
    hoursTimeColumn: "Hours",
    hoursClosed: "Closed",
    hoursSchedule: [
      { day: "Monday", hours: "8:00–17:00" },
      { day: "Tuesday", hours: "8:00–17:00" },
      { day: "Wednesday", hours: "8:00–17:00" },
      { day: "Thursday", hours: "8:00–17:00" },
      { day: "Friday", hours: "8:00–17:00" },
      { day: "Saturday", hours: "8:00–15:00" },
      { day: "Sunday", hours: "Closed" },
    ],
    mapTitle: "Map",
    emailLabel: "Email",
    phoneLabel: "Phone",
    instagramLabel: "Instagram — BG Green Yard",
    facebookLabel: "Facebook — BG Green Yard",
    reachLabel: "Get in touch",
  },
  footer: {
    rights: "All rights reserved",
    tagline: "Landscaping and care for your outdoor space",
    menuHeading: "Menu",
    brandHeading: "Brand",
    contactHeading: "Contact",
    locationLine: "Sofia · Bulgaria",
    emailLabel: "Email",
    phoneLabel: "Phone",
    instagramLabel: "Instagram — BG Green Yard",
    facebookLabel: "Facebook — BG Green Yard",
  },
  serviceOptions: {
    snow: "Snow removal",
    green: "Landscaping & maintenance",
    irrigation: "Irrigation systems",
    other: "Other / combined",
  },
};

export const dictionaries: Record<Locale, Messages> = {
  bg: dictionaryBg,
  en: dictionaryEn,
};

export function getMessages(locale: string): Messages {
  return isLocale(locale) ? dictionaries[locale] : dictionaries.bg;
}
