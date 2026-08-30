import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { VideoHero } from "@/components/VideoHero";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  const t = getMessages(locale);

  const features = [
    {
      title: t.home.trust1Title,
      body: t.home.trust1Body,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      gradient: "from-amber-50 to-orange-50",
      iconBg: "bg-amber-100 text-amber-700",
    },
    {
      title: t.home.trust2Title,
      body: t.home.trust2Body,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      gradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100 text-green-700",
    },
    {
      title: t.home.trust3Title,
      body: t.home.trust3Body,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M12 22V12"/>
          <path d="M12 12C12 12 8 9 8 5a4 4 0 0 1 8 0c0 4-4 7-4 7z"/>
          <path d="M12 12C12 12 16 9 16 5"/>
          <path d="M5 22h14"/>
        </svg>
      ),
      gradient: "from-stone-50 to-slate-50",
      iconBg: "bg-stone-100 text-stone-700",
    },
  ];

  const galleryPhotos = [
    "/1000017924.jpg",
    "/1000017925.jpg",
    "/1000017927.jpg",
    "/1000017936.jpg",
    "/1000018008.jpg",
    "/grass.jpg",
  ];

  const clients = [
    { name: "Nissan Center", image: "/images/clients/nissan.png", alt: "Nissan Center - озеленяване и поддръжка в София" },
    { name: "Renault Center", image: "/images/clients/renault.png", alt: "Renault Center - поддръжка на зелени площи в София" },
    { name: "Dacia Center", image: "/images/clients/dacia.png", alt: "Dacia Center - озеленяване и поддръжка в София" },
    { name: "AURA 1 Residence", image: "/images/clients/aura-1.jpg", alt: "AURA 1 Residence - озеленяване и поддръжка на зелени площи в София" },
    { name: "PRIMA Residence", image: "/images/clients/prima.jpg", alt: "PRIMA Residence - озеленяване и поддръжка в София" },
    { name: "Synergy Tower", image: "/images/clients/synergy-tower.jpg", alt: "Synergy Tower - озеленяване и поддръжка на зелени площи в София" },
  ];

  const reviews = locale === "en" ? [
    { name: "Maria Petrova", text: "Excellent work by the BG Green Yard team. My garden is clean, beautiful, and professionally maintained.", rating: 5, initials: "MP", role: "Verified client", gradient: "from-green-50 to-emerald-50", iconColor: "bg-brand" },
    { name: "Ivan Slavov", text: "Excellent service. The irrigation system works perfectly and without any issues.", rating: 5, initials: "IS", role: "Verified client", gradient: "from-amber-50 to-orange-50", iconColor: "bg-brand" },
    { name: "Deyan Kostadinov", text: "Professionalism comes first. The team arrived on time, did the work well, and left the area clean.", rating: 5, initials: "DK", role: "Verified client", gradient: "from-stone-50 to-slate-50", iconColor: "bg-brand" },
    { name: "Alexandra Georgieva", text: "I recommend BG Green Yard. My garden looks like it came from a magazine.", rating: 5, initials: "AG", role: "Verified client", gradient: "from-green-50 to-emerald-50", iconColor: "bg-brand" },
    { name: "Georgi Vasilev", text: "The staff are polite, attentive, and respectful of your time. I will hire them again.", rating: 5, initials: "GV", role: "Verified client", gradient: "from-amber-50 to-orange-50", iconColor: "bg-brand" },
    { name: "Nina Dimitrova", text: "A great choice. The landscaping matches my wishes perfectly. Thank you for the attention to detail.", rating: 5, initials: "ND", role: "Verified client", gradient: "from-stone-50 to-slate-50", iconColor: "bg-brand" },
  ] : [
    {
      name: "Мария Петрова",
      text: "Много добре! Екипът на BG Green Yard направи чудесна работа с градината ми. Всичко е чисто, красиво и профе.",
      rating: 5,
      initials: "МП",
      role: "Проверен клиент",
      gradient: "from-green-50 to-emerald-50",
      iconColor: "bg-brand",
    },
    {
      name: "Иван Славов",
      text: "Отличен сервис! Препоръчвам на всички приятели. Поливната система работи перфектно, никакви пробле.",
      rating: 5,
      initials: "ИС",
      role: "Проверен клиент",
      gradient: "from-amber-50 to-orange-50",
      iconColor: "bg-brand",
    },
    {
      name: "Деян Костадинов",
      text: "Професионализъм на първо място! Екипът дойде навреме, свърши работата добре и остави площта чиста.",
      rating: 5,
      initials: "ДК",
      role: "Проверен клиент",
      gradient: "from-stone-50 to-slate-50",
      iconColor: "bg-brand",
    },
    {
      name: "Александра Георгиева",
      text: "Препоръчвам BG Green Yard! Градината ми изглежда като от списание. Цена-качество е топ!",
      rating: 5,
      initials: "АГ",
      role: "Проверен клиент",
      gradient: "from-green-50 to-emerald-50",
      iconColor: "bg-brand",
    },
    {
      name: "Георги Василев",
      text: "Много добре направихте! Персоналът е учтив, внимателен и уважава времето ти. Ще ви наемам пак.",
      rating: 5,
      initials: "ГВ",
      role: "Проверен клиент",
      gradient: "from-amber-50 to-orange-50",
      iconColor: "bg-brand",
    },
    {
      name: "Нина Димитрова",
      text: "Отличен избор! Озеленяването е според моите желания. Благодаря на BG Green Yard за вниманието!",
      rating: 5,
      initials: "НД",
      role: "Проверен клиент",
      gradient: "from-stone-50 to-slate-50",
      iconColor: "bg-brand",
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <VideoHero
        locale={locale}
        eyebrow={t.home.heroEyebrow}
        title={t.home.heroTitle}
        lead={t.home.heroLead}
        ctaPrimary={t.home.ctaPrimary}
        ctaSecondary={t.home.ctaSecondary}
        stats={[
          { value: "15 000+", label: locale === "en" ? "m² of maintained areas" : "м² поддържани площи" },
          { value: "120+", label: locale === "en" ? "satisfied clients" : "доволни клиенти" },
        ]}
      />

      {locale === "bg" && (
        <section className="bg-white py-7">
          <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
            <Link href="/bg/ozelenyavane-sofia" className="text-sm font-semibold text-brand underline-offset-4 transition hover:text-brand-dark hover:underline">
              Озеленяване в София — изграждане и поддръжка на градини
            </Link>
          </div>
        </section>
      )}

      {/* ── Features / Why Us ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {t.home.trustTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
                {t.home.brandsLead}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delayMs={i * 80}>
                <article
                  className={`group h-full rounded-[40px] bg-gradient-to-br ${f.gradient} p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-black/5`}
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-[24px] ${f.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    {f.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  {locale === "en" ? "Our projects" : "Нашите проекти"}
                </h2>
                <p className="mt-3 max-w-xl text-lg text-muted">
                  {locale === "en" ? "Real projects and the atmosphere we create" : "Реални обекти и атмосферата, която създаваме"}
                </p>
              </div>
              <Link
                href={`/${locale}/gallery`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark underline-offset-4 transition hover:underline md:mt-0"
              >
                {locale === "en" ? "View all" : "Виж всички"}
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galleryPhotos.map((src, i) => (
              <Reveal key={src} delayMs={(i % 3) * 60}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Clients and Projects ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {locale === "en" ? "Our clients and projects" : "Нашите клиенти и обекти в София"}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg text-muted font-semibold">
                {locale === "en" ? "Trust built with real results." : "Доверие, изградено с реални резултати."}
              </p>
            </div>
          </Reveal>

          <div className="overflow-x-auto pb-2">
            <div className="mx-auto flex min-w-max justify-center gap-3 sm:gap-4">
              {clients.map((client, i) => (
                <Reveal key={client.name} delayMs={i * 50}>
                  <div className="w-32 text-center sm:w-36">
                    <div className="group relative h-24 overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-28">
                      <Image
                        src={client.image}
                        alt={client.alt}
                        fill
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 640px) 144px, 128px"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{client.name}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {locale === "bg" && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Райони, които обслужваме
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  Предлагаме озеленяване и професионална поддръжка на градини и зелени площи в София и околните райони. Работим както с частни имоти, така и с жилищни комплекси, бизнес сгради и търговски обекти.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Бистрица", "Симеоново", "Драгалевци", "Бояна", "Панчарево", "Лозен", "Малинова долина", "Студентски град"].map((area, index) => (
                <Reveal key={area} delayMs={index * 45}>
                  <span className="inline-flex rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
                    {area}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {locale === "en" ? "Client reviews" : "Отзиви на клиентите"}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
                {locale === "en" ? "Satisfied clients in Sofia" : "Доволни клиенти в София"}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal key={review.name} delayMs={i * 55}>
                <article className={`flex h-full flex-col rounded-[32px] bg-gradient-to-br ${review.gradient} p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-black/5`}>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <svg key={j} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-yellow-400">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 flex-grow text-sm leading-relaxed text-foreground/80">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${review.iconColor} text-sm font-semibold text-white`}>
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted">{review.role}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand py-20 md:py-28">
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <Reveal>
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t.home.brandsTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              {locale === "en" ? "Contact us for a free consultation about your project." : "Свържете се с нас и получете безплатна консултация за вашия проект."}
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-13 items-center justify-center rounded-full bg-white px-9 text-base font-semibold text-brand shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.home.ctaSecondary}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex h-13 items-center justify-center rounded-full border-2 border-white/40 px-9 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white"
              >
                {t.home.ctaPrimary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
