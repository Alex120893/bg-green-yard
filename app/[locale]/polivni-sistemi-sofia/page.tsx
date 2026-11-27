import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IrrigationIcon } from "@/components/IrrigationIcon";
import { IrrigationVideo } from "@/components/IrrigationVideo";
import { irrigationImage, irrigationFeatures, irrigationSections, irrigationSteps, irrigationFaqs } from "@/lib/irrigation";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

const url = `${PRODUCTION_SITE_ORIGIN}/bg/polivni-sistemi-sofia`;
const title = "Поливни системи София | Проектиране, монтаж и поддръжка";
const description = "Автоматични поливни системи за градини и тревни площи в София. Капково напояване, разпръсквачи, настройка и ремонт. Индивидуална оферта след оглед.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { type: "website", locale: "bg_BG", url, title, description, images: [{ url: irrigationImage, alt: "Разпръсквач полива тревна площ" }] },
  twitter: { card: "summary_large_image", title, description, images: [irrigationImage] },
};

export default async function IrrigationPage({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "bg") notFound();
  const schema = { "@context": "https://schema.org", "@type": "Service", name: "Поливни системи в София", description, url, image: `${PRODUCTION_SITE_ORIGIN}${irrigationImage}`, areaServed: { "@type": "City", name: "София" }, provider: { "@type": "Organization", name: "BG GREEN YARD", url: PRODUCTION_SITE_ORIGIN, telephone: CONTACT.phoneTel } };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="garden-block garden-block-cream py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <IrrigationIcon className="h-16 w-12 text-brand" />
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-brand">BG GREEN YARD · София</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">Поливни системи София</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">Ефективно поливане за по-зелена градина. Проектираме, изграждаме и поддържаме автоматични системи според терена, растенията и водоизточника — за по-удобна ежедневна грижа.</p>
            <Link href="/bg/contact?service=irrigation" className="garden-button mt-7">Заявете оферта</Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface shadow-xl"><IrrigationVideo locale="bg" /></div>
        </div>
      </section>
      <section className="garden-block garden-block-sage py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-3xl font-bold">Решение за всяка зона на градината</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{irrigationFeatures.map((item) => <li key={item} className="rounded-2xl border border-brand/15 bg-white/80 p-5 font-semibold text-brand-dark">{item}</li>)}</ul>
          <div className="mt-10 grid gap-6 md:grid-cols-2">{irrigationSections.map((section) => <article key={section.title} className="rounded-3xl p-7"><div className="flex items-start justify-between gap-4"><h3 className="text-xl font-bold">{section.title}</h3><IrrigationIcon className="h-9 w-7 shrink-0 text-brand/60" /></div><p className="mt-4 leading-relaxed text-muted">{section.body}</p></article>)}</div>
        </div>
      </section>
      <section className="garden-block garden-block-cream py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface"><Image src={irrigationImage} alt="Автоматичен разпръсквач напоява зелена тревна площ" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
          <div><p className="text-xs font-bold uppercase tracking-widest text-brand">Вода там, където е нужна</p><h2 className="mt-3 text-3xl font-bold">Равномерно поливане, съобразено с растенията</h2><p className="mt-5 leading-relaxed text-muted">Правилното разположение и настройка помагат да ограничим ненужното поливане на пътеки и настилки. Проверяваме покритието на зоните и обсъждаме подходящия режим според почвата и сезона.</p><p className="mt-4 leading-relaxed text-muted">Ефективността зависи от оборудването, състоянието на инсталацията и управлението. Не обещаваме еднаква икономия на вода за всеки обект.</p></div>
        </div>
      </section>
      <section className="garden-block garden-block-sage py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-3xl font-bold">От огледа до първото поливане</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">{irrigationSteps.map((step, i) => <li key={step.title} data-irrigation-step className="rounded-[20px] border border-brand/15 bg-gradient-to-br from-white to-brand-soft/30 p-6 shadow-[0_5px_18px_#193d2008]"><div className="flex items-center justify-between"><span className="text-sm font-bold text-brand">0{i + 1}</span><IrrigationIcon className="h-9 w-7 text-brand/60" /></div><h3 className="mt-5 text-xl font-bold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p></li>)}</ol>
          <div className="mt-12"><h2 className="text-3xl font-bold">Въпроси за поливните системи</h2><div className="mt-6 space-y-3">{irrigationFaqs.map((faq) => <details key={faq.question} className="rounded-xl border border-brand/15 bg-white/70 p-5"><summary className="cursor-pointer font-bold">{faq.question}</summary><p className="mt-3 leading-relaxed text-muted">{faq.answer}</p></details>)}</div></div>
        </div>
      </section>
      <section className="garden-block garden-block-forest py-12 text-white md:py-16"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-bold">Нека градината получава правилната грижа</h2><p className="mt-4 leading-relaxed text-white/85">Изпратете адрес в София, ориентировъчна площ и снимки. Ще уточним оглед и индивидуално предложение за Вашата поливна система.</p><Link href="/bg/contact?service=irrigation" className="garden-button mt-6">Заявете оглед и оферта</Link></div></section>
    </div>
  );
}
