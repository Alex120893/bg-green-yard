import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PlantFrame } from "@/components/PlantDecoration";
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
    { full: t.about.statsWorkHoursLine },
  ] as const;

  const why = [
    { title: t.about.why1Title, body: t.about.why1Body },
    { title: t.about.why2Title, body: t.about.why2Body },
    { title: t.about.why3Title, body: t.about.why3Body },
  ];

  return (
    <PlantFrame clipDecorations={false}>
      <div className="relative">
        <div className="relative z-[2]">
      <section className="border-b border-border bg-gradient-to-b from-white to-slate-50/75">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-6 md:py-24">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                BG Green Yard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t.about.title}
              </h1>
              <p className="mt-4 text-lg text-muted">{t.about.subtitle}</p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="relative">
              <div className="lovable-card relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/1000017936.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-50/80 via-white to-slate-50/75">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="text-xl font-semibold text-foreground md:text-2xl">
                  {t.about.missionTitle}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {t.about.missionBody}
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  {t.about.visionBody}
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="lovable-card grid gap-4 p-8">
                {stats.map((s) => (
                  <div
                    key={"full" in s ? s.full : s.label}
                    className="border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    {"full" in s ? (
                      <p className="text-lg font-semibold leading-snug text-brand-dark sm:text-xl">
                        {s.full}
                      </p>
                    ) : (
                      <>
                        <p className="text-3xl font-semibold text-brand-dark">
                          {s.value}
                        </p>
                        <p className="mt-1 text-sm text-muted">{s.label}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={40}>
            <div
              className="mt-12 flex flex-nowrap items-end justify-center gap-2 px-1 md:mt-14 md:flex-wrap md:gap-14 md:px-2"
              aria-hidden
            >
              <Image
                src="/plant.png"
                alt=""
                width={180}
                height={180}
                className="h-auto w-11 max-w-[28%] shrink-0 object-contain opacity-90 drop-shadow-md -rotate-[10deg] min-[480px]:w-14 md:max-w-none md:w-40"
              />
              <Image
                src="/plant.png"
                alt=""
                width={200}
                height={200}
                className="h-auto w-12 max-w-[30%] shrink-0 object-contain opacity-95 drop-shadow-md -scale-x-100 rotate-[8deg] min-[480px]:w-16 md:max-w-none md:w-44"
              />
              <Image
                src="/plant.png"
                alt=""
                width={180}
                height={180}
                className="h-auto w-11 max-w-[28%] shrink-0 object-contain opacity-90 drop-shadow-md rotate-[12deg] min-[480px]:w-14 md:max-w-none md:w-40"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-b from-white to-slate-50/70">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
              {t.about.whyTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delayMs={i * 60}>
                <article className="lovable-card p-8">
                  <h3 className="text-lg font-semibold text-foreground">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {w.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-12">
            <Image
              src="/logo-removebg-preview.png"
              alt="BG Green Yard"
              width={72}
              height={72}
            />
            <p className="text-center text-lg font-medium text-foreground">
              {t.about.ctaTitle}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="lovable-button-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold"
            >
              {t.about.ctaButton}
            </Link>
          </div>
        </div>
      </section>
        </div>
      </div>
    </PlantFrame>
  );
}
