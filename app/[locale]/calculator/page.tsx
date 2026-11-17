import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GardenCalculator } from "@/components/GardenCalculator";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";
export const metadata: Metadata = {
  title: "Калкулатор за ориентировъчна цена — BG GREEN YARD",
  description: "Заявете индивидуална оферта за поддръжка на целия двор, косене, растения и поливни системи в София.",
  alternates: { canonical: `${PRODUCTION_SITE_ORIGIN}/bg/calculator` },
};
export default async function CalculatorPage({ params, searchParams }: { params: Promise<{locale: string}>; searchParams: Promise<{promo?: string}> }) {
  if ((await params).locale !== "bg") redirect("/bg/calculator");
  const promo = (await searchParams).promo === "first-garden";
  return <section className="garden-block garden-block-cream px-4 py-10 md:px-6 md:py-16"><div className="mx-auto max-w-6xl">
    <p className="garden-eyebrow">BG GREEN YARD · София</p>
    <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">Калкулатор за ориентировъчна цена</h1>
    <span className="copper-rule" aria-hidden />
    <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">Изчислете ориентировъчна цена за грижата за Вашия двор и заявете оглед — без сложни измервания.</p>
    <GardenCalculator key={promo ? "promo" : "standard"} promo={promo} />
  </div></section>;
}
