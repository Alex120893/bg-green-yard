import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { winterPost } from "@/lib/seo-pages";

export function WinterMaintenance({ locale }: { locale: Locale }) {
  const bg = locale === "bg";

  return (
    <section aria-labelledby="winter-maintenance-title" className="border-y border-brand/10 bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-brand/10 bg-background shadow-lg md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              {bg ? "BG GREEN YARD · Зимен сезон" : "BG GREEN YARD · Winter season"}
            </p>
            <h2 id="winter-maintenance-title" className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {bg ? "Зимна поддръжка и снегопочистване" : "Winter maintenance and snow removal"}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {bg
                ? "BG GREEN YARD предлага професионално снегопочистване и зимна поддръжка на жилищни комплекси, паркинги, алеи и бизнес обекти в София."
                : "BG GREEN YARD provides professional snow removal and winter maintenance for residential complexes, car parks, paths and business properties in Sofia."}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-foreground">
              {(bg
                ? ["Почистване на сняг от паркинги и алеи", "Грижа за входове и пешеходни зони", "Обработка против заледяване"]
                : ["Snow clearance for car parks and paths", "Care for entrances and pedestrian areas", "De-icing treatments"]
              ).map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="font-bold text-brand">✓</span>{item}</li>)}
            </ul>
            <Link href={`/${locale}/contact`} className="garden-button mt-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
              {bg ? "Заявете оферта" : "Request a quote"}<span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="relative min-h-64 md:min-h-full">
            <Image
              src={winterPost.image}
              alt={bg ? winterPost.imageAlt : "Snow-clearing machinery at work in winter"}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
