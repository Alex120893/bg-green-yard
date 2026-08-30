import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { getMessages, isLocale } from "@/lib/i18n";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  const locale = isLocale(loc) ? loc : "bg";
  const t = getMessages(locale);
  return {
    alternates: { canonical: `${PRODUCTION_SITE_ORIGIN}/${locale}/services` },
    title: t.services.title,
    description: t.services.subtitle,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  const t = getMessages(locale);

  const services = [
    {
      ...t.services.green,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M12 22V12"/>
          <path d="M12 12C12 12 8 9 8 5a4 4 0 0 1 8 0c0 4-4 7-4 7z"/>
          <path d="M12 12C12 12 16 9 16 5"/>
          <path d="M5 22h14"/>
        </svg>
      ),
      gradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-100 text-emerald-700",
      accentColor: "bg-emerald-500",
      features: locale === "bg"
        ? ["Проектиране и изпълнение", "Поддръжка на тревни площи", "Косене и аерация", "Торене и сезонна грижа"]
        : ["Design & planting", "Lawn maintenance", "Mowing & aeration", "Fertilization & seasonal care"],
    },
    {
      ...t.services.irrigation,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M12 2v6"/>
          <path d="m4.93 10.93 1.41 1.41"/>
          <path d="M2 18h2"/>
          <path d="M20 18h2"/>
          <path d="m19.07 10.93-1.41 1.41"/>
          <path d="M22 22H2"/>
          <path d="m8 22 4-4 4 4"/>
          <path d="M16 12a4 4 0 0 0-8 0"/>
        </svg>
      ),
      gradient: "from-sky-50 to-blue-50",
      iconBg: "bg-sky-100 text-sky-700",
      accentColor: "bg-sky-500",
      features: locale === "bg"
        ? ["Капково и разпръскващо поливане", "Автоматика и зониране", "Монтаж и поддръжка", "Икономия на вода"]
        : ["Drip & spray irrigation", "Automation & zoning", "Installation & maintenance", "Water conservation"],
    },
    {
      ...t.services.snow,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="12" y1="2" x2="12" y2="22"/>
          <path d="m20 16-4-4 4-4"/>
          <path d="m4 8 4 4-4 4"/>
          <path d="m16 4-4 4-4-4"/>
          <path d="m8 20 4-4 4 4"/>
        </svg>
      ),
      gradient: "from-slate-50 to-blue-50",
      iconBg: "bg-slate-100 text-slate-600",
      accentColor: "bg-slate-500",
      features: locale === "bg"
        ? ["Механизирано почистване", "Ръчно почистване", "Жилищни и бизнес обекти", "Денонощна готовност"]
        : ["Mechanized clearing", "Manual clearing", "Residential & commercial", "24/7 availability"],
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand/5 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              {locale === "bg" ? "София" : "Sofia"}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t.services.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{t.services.subtitle}</p>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted">
              {t.services.intro}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 border border-amber-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span className="font-medium">{t.services.sofiaNote}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delayMs={i * 80}>
                <article className={`group flex h-full flex-col rounded-3xl bg-gradient-to-br ${s.gradient} p-8 shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]`}>
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    {s.icon}
                  </div>
                  <h2 className="mt-6 text-xl font-bold text-foreground">
                    {s.title}
                  </h2>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.accentColor}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={80}>
            <div className="mt-16 flex justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-13 items-center justify-center rounded-full bg-brand px-9 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {locale === "bg" ? "Запитване за услуга" : "Request a quote"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
