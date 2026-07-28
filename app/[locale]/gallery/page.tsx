import Image from "next/image";
import type { Metadata } from "next";
import { GalleryVideo } from "@/components/GalleryVideo";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { getMessages, isLocale } from "@/lib/i18n";

const photos = [
  "/1000017924.jpg",
  "/1000017925.jpg",
  "/1000017927.jpg",
  "/1000017936.jpg",
  "/1000018008.jpg",
  "/grass.jpg",
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
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
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

      {/* ── Videos ── */}
      <section className="bg-surface py-16 md:py-20">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {photos.map((src, i) => (
              <Reveal key={src} delayMs={(i % 3) * 55}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
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
