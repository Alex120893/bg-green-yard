import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LightingIcon } from "@/components/GardenLighting";
import { lightingFeatures, lightingImage, lightingPath, lightingSections } from "@/lib/lighting";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

const url = `${PRODUCTION_SITE_ORIGIN}/bg${lightingPath}`;
const title = "Градинско осветление София | Осветление на дворове и алеи";
const description = "Декоративно и функционално LED осветление за градини, дворове, алеи и тераси в София. Планиране и монтаж с индивидуална оферта след оглед от BG GREEN YARD.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { type: "website", locale: "bg_BG", url, title, description, images: [{ url: lightingImage, alt: "Осветена градинска алея вечер" }] },
  twitter: { card: "summary_large_image", title, description, images: [lightingImage] },
};

export default async function LightingPage({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "bg") notFound();
  const schema = { "@context": "https://schema.org", "@type": "Service", name: "Градинско осветление в София", description, url, image: `${PRODUCTION_SITE_ORIGIN}${lightingImage}`, areaServed: { "@type": "City", name: "София" }, provider: { "@type": "Organization", name: "BG GREEN YARD", url: PRODUCTION_SITE_ORIGIN, telephone: CONTACT.phoneTel } };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="garden-block garden-block-cream py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div><LightingIcon className="h-16 w-12 text-brand" /><p className="mt-5 text-xs font-bold uppercase tracking-widest text-brand">BG GREEN YARD · София</p><h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">Осветление в градината и двора</h1><p className="mt-5 text-lg leading-relaxed text-muted">Светлина, която подчертава красотата на градината и Ви помага да използвате двора с повече удобство вечер. Планираме декоративно и функционално осветление според Вашето пространство.</p><Link href="/bg/contact?service=lighting" className="garden-button mt-7">Заявете оферта </Link></div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl"><Image src={lightingImage} alt="Вечерно осветление на алея, растения и тераса" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
        </div>
      </section>
      <section className="garden-block garden-block-cream py-12 md:py-16" aria-labelledby="lighting-examples">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 id="lighting-examples" className="text-3xl font-bold">Идеи за осветяване на външни пространства</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { id: "39465540", alt: "Декоративно осветена градинска пътека през нощта" },
              { id: "34469281", alt: "Вечерна алея сред зеленина с градинско осветление" },
            ].map((photo) => <div key={photo.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <Image src={`https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=1200`} alt={photo.alt} fill unoptimized className="object-cover" />
            </div>)}
          </div>
        </div>
      </section>
      <section className="garden-block garden-block-sage py-12 md:py-16"><div className="mx-auto max-w-6xl px-4 md:px-6"><h2 className="text-3xl font-bold">Красота и функционалност след залез</h2><ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{lightingFeatures.map((item) => <li key={item} className="rounded-2xl border border-brand/15 bg-white/80 p-5 font-semibold text-brand-dark">{item}</li>)}</ul><div className="mt-10 grid gap-6 md:grid-cols-2">{lightingSections.map((section) => <article key={section.title} className="rounded-3xl p-7"><h3 className="text-xl font-bold">{section.title}</h3><p className="mt-4 leading-relaxed text-muted">{section.body}</p></article>)}</div></div></section>
      <section className="garden-block garden-block-cream py-12 md:py-16"><div className="mx-auto max-w-6xl px-4 md:px-6"><h2 className="text-3xl font-bold">От идеята до вечерната атмосфера</h2><ol className="mt-8 grid gap-5 md:grid-cols-3">{[
        ["Оглед на двора", "Уточняваме зоните, настилките, растенията, наличното захранване и желания ефект."],
        ["Предложение и оферта", "Обсъждаме типове тела, разположение, управление, необходимите работи и бюджет след оглед."],
        ["Монтаж и настройка", "Организираме договорените дейности и проверяваме насочването и работата на осветлението."],
      ].map(([heading, text], i) => <li key={heading} className="rounded-2xl border border-brand/15 bg-white/70 p-6"><span className="font-bold text-brand">0{i + 1}</span><h3 className="mt-3 text-xl font-bold">{heading}</h3><p className="mt-3 leading-relaxed text-muted">{text}</p></li>)}</ol><div className="mt-12"><h2 className="text-3xl font-bold">Въпроси за градинското осветление</h2><div className="mt-6 space-y-3">{[
        ["Колко струва осветлението на двора?", "Цената се определя след оглед според броя и вида на телата, трасетата, състоянието на захранването и начина на управление. Не изчисляваме универсална цена само по квадратура."],
        ["Може ли да се добави към готова градина?", "Възможностите се оценяват на място. Стремим се трасетата и монтажът да се съобразят с растенията, поливането и съществуващите настилки."],
        ["Каква информация да изпратя?", "Изпратете адрес в София, снимки на двора, зоните за осветяване и какъв ефект желаете. Уточнете дали има налично външно захранване."],
      ].map(([q, a]) => <details key={q} className="rounded-xl border border-brand/15 bg-white/70 p-5"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-3 leading-relaxed text-muted">{a}</p></details>)}</div></div></div></section>
      <section className="garden-block garden-block-forest py-12 text-white md:py-16"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-bold">Нека градината Ви оживее и вечер</h2><p className="mt-4 leading-relaxed text-white/85">Свържете се с BG GREEN YARD за оглед и индивидуално предложение за градинско осветление в София.</p><Link href="/bg/contact?service=lighting" className="garden-button mt-6">Заявете оглед и оферта </Link></div></section>
    </div>
  );
}
