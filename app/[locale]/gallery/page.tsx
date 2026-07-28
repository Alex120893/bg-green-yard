import Image from "next/image";
import type { Metadata } from "next";
import { GalleryVideo } from "@/components/GalleryVideo";
import { PlantDecoration } from "@/components/PlantDecoration";
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
    <div className="relative isolate">
      <PlantDecoration corner="tl" kind="png" size={135} opacity={0.38} />
      <PlantDecoration corner="tr" kind="avif" size={185} opacity={0.48} />
      <PlantDecoration corner="bl" kind="avif" size={150} opacity={0.42} />
      <PlantDecoration corner="br" kind="png" size={150} opacity={0.36} />
      <div className="relative z-10">
        <section className="border-b border-border bg-gradient-to-b from-white to-slate-50/75">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <Reveal>
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {t.gallery.title}
                  </h1>
                  <p className="mt-3 max-w-xl text-lg text-muted">
                    {t.gallery.subtitle}
                  </p>
                </div>
                <Image
                  src="/logo-removebg-preview.png"
                  alt="BG Green Yard"
                  width={88}
                  height={88}
                  className="opacity-95"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-50/85 via-white to-slate-50/75">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <Reveal>
              <div>
                <p className="mb-4 text-sm font-medium text-muted">
                  {t.gallery.videoNote}
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
                  <div className="lovable-card overflow-hidden bg-black">
                    <GalleryVideo src="/1000011543.mp4" />
                  </div>
                  <div className="lovable-card overflow-hidden bg-black">
                    <GalleryVideo src="/main.mp4" />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((src, i) => (
                <Reveal key={src} delayMs={(i % 3) * 50}>
                  <figure className="lovable-card group overflow-hidden bg-white">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
