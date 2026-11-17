import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GardenCalculator } from "@/components/GardenCalculator";
import { pricing } from "@/lib/gardenPricing";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";
export const metadata: Metadata = {
  title: "Калкулатор за градинарски услуги — BG GREEN YARD",
  description: "Ориентировъчна цена за косене, плевене и грижа за тревни площи в София. Индивидуална оферта за озеленяване, поливни системи и абонамент.",
  alternates: { canonical: `${PRODUCTION_SITE_ORIGIN}/bg/calculator` },
};
export default async function CalculatorPage({ params }: { params: Promise<{locale: string}> }) {
  if ((await params).locale !== "bg") redirect("/bg/calculator");
  return <>
    <section className="garden-block garden-block-cream px-4 py-10 md:px-6 md:py-16"><div className="mx-auto max-w-6xl">
      <p className="garden-eyebrow">BG GREEN YARD · София</p>
      <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">Планирайте грижата за Вашата градина</h1>
      <span className="copper-rule" aria-hidden />
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">Калкулатор за ориентировъчна стойност на градинарски услуги. Ясни мерни единици, реалистичен обхват и персонална оферта за специфичните нужди на Вашия двор.</p>
      <GardenCalculator />
    </div></section>
    <section className="garden-block garden-block-sage px-4 py-10 md:px-6"><div className="mx-auto max-w-6xl">
      <h2 className="text-2xl font-bold">Прозрачни ориентири, без скрити допускания</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Сравнени са публични ценоразписи на изпълнители за София и околностите на 17.11.2026 г. Цени на м², линеен метър, посещение и месечен пакет не се смесват. Не пренасяме чужд данъчен статус към BG GREEN YARD.</p>
      <details className="mt-6 rounded-2xl border border-brand/15 bg-white/60 p-5"><summary className="cursor-pointer font-semibold">Източници, ставки и ограничения</summary>
        <div className="mt-5 grid gap-4 md:grid-cols-2">{Object.entries(pricing.rates).map(([key, rate]) => <div key={key} className="min-w-0 rounded-xl border border-brand/10 p-4 text-sm"><h3 className="font-bold">{rate.label}</h3><p className="mt-2">{rate.min === rate.max ? rate.min : `${rate.min} – ${rate.max}`} €/{rate.unit} · едно посещение</p><p className="mt-2 text-muted">{rate.note}</p><p className="mt-2 text-xs">Проверено: {rate.checkedAt} · За потвърждение от BG GREEN YARD</p>{rate.sources.map(id => { const source = pricing.sources[id as keyof typeof pricing.sources]; return <a key={id} href={source.url} target="_blank" rel="noreferrer" className="mt-2 block underline">{source.name}</a>; })}</div>)}</div>
        <ul className="mt-6 space-y-4 text-sm">{Object.entries(pricing.sources).map(([id, source]) => <li key={id} className="break-words"><a href={source.url} target="_blank" rel="noreferrer" className="font-bold underline">{source.name}</a> · проверено {source.checkedAt}<p className="mt-1 text-muted">{source.note}</p></li>)}</ul>
        <p className="mt-5 text-sm text-muted">Сложен достъп, запустял терен и извозване водят до оферта, не до измислен коефициент. Подсяване, резитби, общо почистване, засаждане, полив и абонамент са след уточнение — няма достатъчно сравними самостоятелни ставки.</p>
      </details>
    </div></section>
  </>;
}
