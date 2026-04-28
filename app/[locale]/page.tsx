import Image from "next/image";
import Link from "next/link";
import { PlantDecoration } from "@/components/PlantDecoration";
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

  const trust = [
    {
      title: t.home.trust1Title,
      body: t.home.trust1Body,
    },
    {
      title: t.home.trust2Title,
      body: t.home.trust2Body,
    },
    {
      title: t.home.trust3Title,
      body: t.home.trust3Body,
    },
  ];

  return (
    <>
      <VideoHero
        locale={locale}
        eyebrow={t.home.heroEyebrow}
        title={t.home.heroTitle}
        lead={t.home.heroLead}
        ctaPrimary={t.home.ctaPrimary}
        ctaSecondary={t.home.ctaSecondary}
      />

      <section className="relative border-b border-border bg-white">
        <PlantDecoration corner="tl" kind="avif" className="opacity-40" size={200} />
        <PlantDecoration corner="tr" kind="png" className="opacity-30" size={155} />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/logo-removebg-preview.png"
                alt="BG Green Yard"
                width={120}
                height={120}
                className="h-24 w-auto md:h-28"
              />
              <h2 className="mt-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {t.home.brandsTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-muted md:text-lg">
                {t.home.brandsLead}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-surface">
        <PlantDecoration corner="br" kind="avif" className="opacity-35" size={220} />
        <PlantDecoration corner="bl" kind="png" className="opacity-30" size={148} />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {t.home.trustTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {trust.map((item, i) => (
              <Reveal key={item.title} delayMs={i * 80}>
                <article className="h-full rounded-2xl border border-border bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              {t.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
