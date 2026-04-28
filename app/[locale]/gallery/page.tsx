import Image from "next/image";
import type { Metadata } from "next";
import { GalleryVideo } from "@/components/GalleryVideo";
import { PlantFrame } from "@/components/PlantDecoration";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { getMessages, isLocale } from "@/lib/i18n";

const photos = [
  "/1000017924.jpg",
  "/1000017925.jpg",
  "/1000017927.jpg",
  "/1000017936.jpg",
  "/1000018008.jpg",
  "/garden.jpg",
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
    <PlantFrame>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
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

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <Reveal>
            <div>
              <p className="mb-4 text-sm font-medium text-muted">
                {t.gallery.videoNote}
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
                <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-sm">
                  <GalleryVideo src="/1000011543.mp4" />
                </div>
                <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-sm">
                  <GalleryVideo src="/main.mp4" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={50}>
            <div
              className="mt-10 flex flex-wrap items-end justify-center gap-6 px-2 sm:gap-10 md:mt-12 md:gap-14"
              aria-hidden
            >
              <Image
                src="/plant.png"
                alt=""
                width={180}
                height={180}
                className="h-auto w-[min(30vw,9.5rem)] -rotate-[10deg] object-contain opacity-90 drop-shadow-md sm:w-40"
              />
              <Image
                src="/plant.png"
                alt=""
                width={200}
                height={200}
                className="h-auto w-[min(34vw,11rem)] -scale-x-100 rotate-[8deg] object-contain opacity-95 drop-shadow-md sm:w-44"
              />
              <Image
                src="/plant.png"
                alt=""
                width={180}
                height={180}
                className="h-auto w-[min(30vw,9.5rem)] rotate-[12deg] object-contain opacity-90 drop-shadow-md sm:w-40"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((src, i) => (
              <Reveal key={src} delayMs={(i % 3) * 50}>
                <figure className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
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
    </PlantFrame>
  );
}
