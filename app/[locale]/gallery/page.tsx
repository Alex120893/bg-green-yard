import Image from "next/image";
import type { Metadata } from "next";
import { GalleryVideo } from "@/components/GalleryVideo";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { getMessages, isLocale } from "@/lib/i18n";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";

const tiktokVideoIds = [
  "7706936989500591382",
  "7701465985991068950",
  "7700277913119116566",
  "7699887975638928642",
  "7699579585599524118",
] as const;

const photos = [
  { src: "/images/gallery/ozelenyavane-gradina-sofia-01.jpg", alt: "Озеленена градина в София", width: 960, height: 1280 },
  { src: "/images/gallery/ozelenyavane-gradina-sofia-02.jpg", alt: "Зелена площ към градина в София", width: 960, height: 1280 },
  { src: "/images/gallery/ozelenyavane-gradina-sofia-03.jpg", alt: "Озеленяване на външно пространство в София", width: 960, height: 1280 },
  { src: "/images/gallery/ozelenyavane-gradina-sofia-04.jpg", alt: "Поддържана градина в София", width: 960, height: 1280 },
  { src: "/images/gallery/ozelenyavane-gradina-sofia-05.jpg", alt: "Озеленен двор в София", width: 1319, height: 1979 },
  { src: "/images/gallery/trevna-plosht-sofia.jpg", alt: "Поддържана тревна площ в София", width: 1140, height: 500 },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  const locale = isLocale(loc) ? loc : "bg";
  const t = getMessages(locale);
  return {
    alternates: { canonical: `${PRODUCTION_SITE_ORIGIN}/${locale}/gallery` },
    title: t.gallery.title,
    description: t.gallery.subtitle,
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const t = getMessages(loc as Locale);

  return (
    <>
      {/* ── Hero ── */}
      <section className="garden-block garden-block-cream relative overflow-hidden bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand/5 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t.gallery.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {t.gallery.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TikTok Videos ── */}
      <section id="tiktok" aria-labelledby="tiktok-heading" className="garden-block garden-block-sage bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 id="tiktok-heading" className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {loc === "en" ? "Our TikTok videos" : "Нашите видеа в TikTok"}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            {loc === "en" ? "More moments from our work at BG Green Yard." : "Още моменти от работата на BG Green Yard."}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiktokVideoIds.map((id, index) => (
              <div key={id} className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
                <iframe
                  src={`https://www.tiktok.com/player/v1/${id}?autoplay=0`}
                  title={`BG Green Yard — TikTok ${index + 1}`}
                  loading="lazy"
                  allow="fullscreen; picture-in-picture"
                  allowFullScreen
                  className="aspect-[9/16] w-full border-0 bg-black"
                />
                <a
                  href={`https://www.tiktok.com/@bg.green_yard/video/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                  aria-label={`${loc === "en" ? "Watch on TikTok" : "Гледай в TikTok"} — ${index + 1}`}
                >
                  {loc === "en" ? "Watch on TikTok" : "Гледай в TikTok"}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            {loc === "en" ? "If a video does not load, use its link to watch it on TikTok." : "Ако някое видео не се зарежда, отворете го чрез връзката към TikTok."}
          </p>
        </div>
      </section>

      {/* ── Videos ── */}
      <section className="garden-block garden-block-sage bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              {t.gallery.videoNote}
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/1000011543.mp4" />
              </div>
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/main.mp4" />
              </div>
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/video_2026-08-30_16-37-08.mp4" />
              </div>
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/video_2026-08-30_16-38-53.mp4" />
              </div>
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/video_2026-08-30_16-39-03.mp4" />
              </div>
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/video_2026-08-30_16-39-15.mp4" />
              </div>
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/video_2026-08-30_16-39-18.mp4" />
              </div>
              <div className="overflow-hidden rounded-2xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <GalleryVideo src="/video_2026-08-30_16-39-22.mp4" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="garden-block garden-block-cream bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {photos.map((photo, i) => (
              <Reveal key={photo.src} delayMs={(i % 3) * 55}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-400 group-hover:bg-black/25" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
