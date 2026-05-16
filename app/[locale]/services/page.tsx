import Image from "next/image";
import type { Metadata } from "next";
import { PlantDecoration } from "@/components/PlantDecoration";
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

  const blocks = [
    {
      ...t.services.green,
      image: "/1000017925.jpg",
    },
    {
      ...t.services.irrigation,
      image: "/grass.jpg",
    },
    {
      ...t.services.snow,
      image: "/snow.jpg",
    },
  ];

  return (
    <div className="relative">
      <PlantDecoration corner="tr" kind="avif" className="opacity-30" size={200} />
      <PlantDecoration corner="tl" kind="png" className="opacity-28" size={135} />
      <PlantDecoration corner="bl" kind="png" className="opacity-26" size={125} />

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                  Sofia
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {t.services.title}
                </h1>
                <p className="mt-4 text-lg text-muted">{t.services.subtitle}</p>
              </div>
              <Image
                src="/logo-removebg-preview.png"
                alt=""
                width={80}
                height={80}
                className="hidden opacity-90 md:block"
              />
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <p className="mt-10 max-w-3xl leading-relaxed text-muted">
              {t.services.intro}
            </p>
            <p className="mt-4 rounded-xl border border-brand-soft bg-brand-soft/50 px-4 py-3 text-sm text-foreground">
              {t.services.sofiaNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6 md:py-20">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delayMs={i * 70}>
              <article className="grid gap-8 overflow-hidden rounded-2xl border border-border bg-white shadow-sm md:grid-cols-2 md:gap-0">
                <div
                  className={`relative aspect-[16/10] md:aspect-auto md:min-h-[280px] ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Image
                    src={b.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-8 md:px-12 md:py-12">
                  <h2 className="text-xl font-semibold text-foreground md:text-2xl">
                    {b.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">{b.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
