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
        <div
          className="pointer-events-none absolute inset-0 z-[1] md:hidden"
          aria-hidden
        >
          <Image
            src="/plant.png"
            alt=""
            width={80}
            height={80}
            className="absolute left-[-6%] top-[6%] h-auto w-10 rotate-[-16deg] opacity-45"
          />
          <Image
            src="/plant.png"
            alt=""
            width={72}
            height={72}
            className="absolute right-[-4%] top-[14%] h-auto w-9 rotate-[14deg] opacity-40"
          />
          <Image
            src="/plant.png"
            alt=""
            width={64}
            height={64}
            className="absolute left-[3%] top-[38%] h-auto w-8 -scale-x-100 rotate-[10deg] opacity-35"
          />
          <Image
            src="/plant.png"
            alt=""
            width={72}
            height={72}
            className="absolute right-[-2%] top-[52%] h-auto w-9 -rotate-[12deg] opacity-40"
          />
          <Image
            src="/plant.png"
            alt=""
            width={64}
            height={64}
            className="absolute left-[-4%] bottom-[28%] h-auto w-8 rotate-[18deg] opacity-38"
          />
          <Image
            src="/plant.png"
            alt=""
            width={64}
            height={64}
            className="absolute right-[2%] bottom-[18%] h-auto w-8 rotate-[-8deg] opacity-42"
          />
        </div>

        <div className="relative z-[2]">
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:gap-16 md:px-6 md:py-20">
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface shadow-sm">
                <Image
                  src="/1000017936.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>
              <div
                className="pointer-events-none absolute -bottom-2 -left-2 z-10 w-[min(36%,8rem)] -rotate-[8deg] drop-shadow-md sm:-bottom-3 sm:-left-3 sm:w-[min(34%,9rem)]"
                aria-hidden
              >
                <Image
                  src="/plant.png"
                  alt=""
                  width={220}
                  height={220}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
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
              <div className="grid gap-4 rounded-2xl border border-border bg-white p-8 shadow-sm">
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

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
              {t.about.whyTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delayMs={i * 60}>
                <article className="rounded-2xl border border-border bg-surface/80 p-8">
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
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-white transition hover:bg-brand-dark"
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
