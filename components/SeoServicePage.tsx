import Link from "next/link";
import type { SeoPage } from "@/lib/seo-pages";

export function SeoServicePage({ page }: { page: SeoPage }) {
  return <main>
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-4xl px-4 md:px-6"><p className="text-sm font-semibold uppercase tracking-[.16em] text-brand">BG.GREEN_YARD · София</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{page.h1}</h1><p className="mt-5 text-lg leading-relaxed text-muted">{page.intro}</p><Link href="/bg/contact" className="mt-8 inline-flex rounded-full bg-brand px-7 py-3 font-semibold text-white">Получи оферта</Link></div></section>
    <section className="bg-surface py-16"><div className="mx-auto grid max-w-4xl gap-10 px-4 md:grid-cols-2 md:px-6"><div><h2 className="text-2xl font-bold text-foreground">Какво предлагаме</h2><ul className="mt-5 space-y-3 text-muted">{page.bullets.map((item) => <li key={item} className="rounded-xl bg-white px-4 py-3 shadow-sm">{item}</li>)}</ul></div><div className="space-y-8">{page.sections.map((section) => <article key={section.title}><h2 className="text-2xl font-bold text-foreground">{section.title}</h2><p className="mt-3 leading-relaxed text-muted">{section.body}</p></article>)}</div></div></section>
    <section className="bg-brand py-16 text-center text-white"><div className="mx-auto max-w-3xl px-4"><h2 className="text-3xl font-bold">Търсите {page.h1.toLocaleLowerCase("bg-BG")}?</h2><p className="mt-3 text-white/85">Свържете се с нас за оглед и индивидуална оферта.</p><Link href="/bg/contact" className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-brand-dark">Свържете се с нас</Link></div></section>
  </main>;
}
