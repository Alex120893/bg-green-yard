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

  const reviews = [
    {
      name: "Мария Петрова",
      text: "Много добре! Екипът на BG Green Yard направи чудесна работа с градината ми. Всичко е чисто, красиво и професионално.",
      rating: 5,
      initials: "МП",
      color: "bg-blue-500",
    },
    {
      name: "Иван Славов",
      text: "Отличен сервис! Препоръчвам на всички приятели. Поливната система работи перфектно, никакви проблеми.",
      rating: 5,
      initials: "ИС",
      color: "bg-green-500",
    },
    {
      name: "Деян Костадинов",
      text: "Професионализъм на първо място! Екипът дойде на време, свърши работата добре и чистата площ след себе си.",
      rating: 5,
      initials: "ДК",
      color: "bg-purple-500",
    },
    {
      name: "Александра Георгиева",
      text: "Препоръчвам BG Green Yard! Градината ми изглежда като от списание. Цена-качество е топ!",
      rating: 5,
      initials: "АГ",
      color: "bg-pink-500",
    },
    {
      name: "Георги Василев",
      text: "Много добре направихте! Персоналът е учтив, внимателен и уважава времето ти. Ще ви наемам пак.",
      rating: 5,
      initials: "ГВ",
      color: "bg-orange-500",
    },
    {
      name: "Нина Димитрова",
      text: "Отличен избор! Озеленяването е според моите желания. Благодаря на BG Green Yard за вниманието!",
      rating: 5,
      initials: "НД",
      color: "bg-red-500",
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
        <PlantDecoration
          corner="tl"
          kind="avif"
          flipTilt
          className="opacity-40"
          size={200}
        />
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

      {/* Reviews Section */}
      <section className="relative bg-white">
        <PlantDecoration corner="tl" kind="png" className="opacity-25" size={160} />
        <PlantDecoration corner="br" kind="avif" className="opacity-30" size={200} />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Отзиви на клиентите
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal key={review.name} delayMs={i * 60}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-gradient-to-br from-white to-surface p-6 shadow-sm transition hover:shadow-md">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-lg text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="mt-4 flex-grow text-sm leading-relaxed text-muted">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${review.color} text-white font-semibold text-sm`}>
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted">Проверен клиент</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
