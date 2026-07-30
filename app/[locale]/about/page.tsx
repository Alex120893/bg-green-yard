import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { getMessages, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  const locale = isLocale(loc) ? loc : "bg";
  const t = getMessages(locale);
  return {
    title: t.about.title,
    description: t.about.subtitle,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  const t = getMessages(locale);

  const stats = [
    { value: "15 000+", label: t.about.statsSqm },
    { value: "120+", label: t.about.statsClients },
    { value: "20+", label: t.about.statsWorkHoursLine },
  ];

  const why = [
    {
      title: t.about.why1Title,
      body: t.about.why1Body,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      gradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
    {
      title: t.about.why2Title,
      body: t.about.why2Body,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
      ),
      gradient: "from-sky-50 to-blue-50",
      iconBg: "bg-sky-100 text-sky-700",
    },
    {
      title: t.about.why3Title,
      body: t.about.why3Body,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <path d="m9 11 3 3L22 4"/>
        </svg>
      ),
      gradient: "from-violet-50 to-purple-50",
      iconBg: "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand/5 blur-3xl" aria-hidden />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center md:gap-16 md:px-6">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                BG Green Yard
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {t.about.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t.about.subtitle}</p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <Image
                src="/1000017936.jpg"
                alt="BG Green Yard"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats + Mission ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {t.about.missionTitle}
                </h2>
                <p className="mt-5 leading-relaxed text-muted">
                  {t.about.missionBody}
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  {t.about.visionBody}
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col justify-center rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-center"
                  >
                    <p className="text-3xl md:text-4xl font-bold text-brand">{s.value}</p>
                    <p className="mt-2 text-xs md:text-sm leading-snug text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t.about.whyTitle}
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delayMs={i * 70}>
                <article className={`group h-full rounded-2xl bg-gradient-to-br ${w.gradient} p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]`}>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${w.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    {w.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {w.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand py-20 md:py-24">
        <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-white md:text-4xl">{t.about.ctaTitle}</h2>
            <div className="mt-8">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-13 items-center justify-center rounded-full bg-white px-9 text-base font-semibold text-brand shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t.about.ctaButton}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
