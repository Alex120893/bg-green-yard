import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WinterVideo } from "@/components/WinterVideo";
import { CONTACT } from "@/lib/contact";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";
import { snowFaqs, snowServices, snowSteps } from "@/lib/snow-service";
import { winterPost } from "@/lib/seo-pages";
import styles from "./winter.module.css";

const url = `${PRODUCTION_SITE_ORIGIN}/bg/snegopochistvane-sofia`;
const title = "Снегопочистване София | Зимна поддръжка на комплекси";
const description = "Механизирано и ръчно снегопочистване в София за комплекси, паркинги и алеи. Зимна поддръжка и обработка против заледяване. Индивидуална оферта след оглед.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "bg_BG", url, title, description, images: [{ url: "/snow.jpg", width: 1280, height: 853, alt: "Професионална техника за почистване на сняг" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/snow.jpg"] },
};

function Snowflake({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M32 5v54M8.6 18.5l46.8 27M8.6 45.5l46.8-27M24 10l8 8 8-8M24 54l8-8 8 8M9 28l11-3-3-11M47 50l-3-11 11-3M9 36l11 3-3 11M47 14l-3 11 11 3" /></svg>;
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "bg") notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Снегопочистване и зимна поддръжка в София",
    serviceType: "Механизирано и ръчно снегопочистване",
    description,
    url,
    image: [`${PRODUCTION_SITE_ORIGIN}/snow.jpg`, `${PRODUCTION_SITE_ORIGIN}/snowremove.jpg`],
    areaServed: { "@type": "City", name: "София" },
    provider: { "@type": "Organization", name: "BG GREEN YARD", url: PRODUCTION_SITE_ORIGIN, telephone: CONTACT.phoneTel },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Зимни услуги", itemListElement: snowServices.map((service) => ({ "@type": "OfferCatalog", name: service.title, description: service.text })) },
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className={styles.hero} aria-labelledby="snow-title">
        <Snowflake className={styles.heroFlake} />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>BG GREEN YARD · Зимна грижа за София</p>
            <h1 id="snow-title" className={styles.h1}>Снегопочистване София</h1>
            <p className={styles.lead}>Сигурният достъп започва с добра подготовка.</p>
            <p className={styles.intro}>Механизирано и ръчно почистване на сняг за жилищни комплекси, паркинги, алеи и бизнес обекти. Планираме зимната поддръжка според терена, настилката и нуждите на Вашия обект.</p>
            <div className={styles.actions}>
              <Link href="/bg/contact" className={styles.primary}>Заявете оглед и оферта <span aria-hidden="true">→</span></Link>
              <a href={`tel:${CONTACT.phoneTel}`} className={styles.phone}>{CONTACT.phoneDisplay}</a>
            </div>
            <ul className={styles.tags}><li>Механизирано и ръчно</li><li>Обработка против заледяване</li><li>Цена след оглед</li></ul>
          </div>
          <figure className={styles.videoCard}>
            <div className={styles.videoFrame}><WinterVideo locale="bg" poster="/snow.jpg" /></div>
            <figcaption>Зимна поддръжка · BG GREEN YARD</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="snow-services">
        <div className={styles.container}>
          <p className={styles.eyebrow}>От входа до паркинга</p>
          <h2 id="snow-services" className={styles.h2}>Зимна поддръжка за целия обект</h2>
          <p className={styles.sectionLead}>Комбинираме подходяща техника и ръчна работа, за да обхванем както големите площи, така и тесните пешеходни зони.</p>
          <div className={styles.serviceGrid}>
            {snowServices.map((service, index) => <article key={service.title} className={styles.serviceCard}><div className={styles.cardTop}><span className={styles.number}>0{index + 1}</span><Snowflake className={styles.smallFlake} /></div><h3>{service.title}</h3><p>{service.text}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ice}`} aria-labelledby="snow-photos">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Подходящият подход за всяка площ</p>
          <h2 id="snow-photos" className={styles.h2}>Техника за снега. Внимание към детайла.</h2>
          <div className={styles.gallery}>
            <figure><div className={styles.photo}><Image src="/snow.jpg" alt="Снегопочистваща техника при работа в зимни условия" fill sizes="(min-width: 768px) 50vw, 100vw" className={styles.image} /></div><figcaption><h3>Механизирано почистване</h3><p>За открити пространства и подходи с достатъчен достъп. Техниката се подбира след оценка на терена.</p></figcaption></figure>
            <figure><div className={styles.photo}><Image src="/snowremove.jpg" alt="Почистване на сняг през зимния сезон" fill sizes="(min-width: 768px) 50vw, 100vw" className={styles.image} /></div><figcaption><h3>Грижа за достъпите</h3><p>Входове, пешеходни връзки и труднодостъпни места се включват в плана според нуждите на обекта.</p></figcaption></figure>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="snow-process">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Ясен план преди първия снеговалеж</p>
          <h2 id="snow-process" className={styles.h2}>Как организираме работата</h2>
          <ol className={styles.steps}>{snowSteps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
          <aside className={styles.notice}><h3>Важно при сняг и повторно замръзване</h3><p>Времето може да се променя бързо. Обработката против заледяване не премахва напълно риска от подхлъзване. При продължаващ снеговалеж или замръзване може да са необходими повторно почистване и допълнителна обработка.</p></aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ice}`} aria-labelledby="snow-faq">
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div><p className={styles.eyebrow}>Преди да заявите услуга</p><h2 id="snow-faq" className={styles.h2}>Често задавани въпроси</h2><p className={styles.sectionLead}>Конкретният обхват и условията се уточняват след оглед — без универсални цени и обещания, които не отчитат Вашия обект.</p><Link href={`/bg/blog/${winterPost.slug}`} className={styles.articleLink}>Прочетете повече за зимната поддръжка на комплекси →</Link></div>
          <div className={styles.faqs}>{snowFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="snow-quote">
        <div className={`${styles.container} ${styles.ctaInner}`}><Snowflake className={styles.ctaFlake} /><div><p className={styles.eyebrow}>Вашият партньор и през зимата</p><h2 id="snow-quote" className={styles.h2}>Подгответе обекта преди снега</h2><p>Изпратете адрес, ориентировъчна площ и снимки. Ще обсъдим подходящата организация и ще уточним оглед за индивидуална оферта.</p><div className={styles.actions}><Link href="/bg/contact" className={styles.primary}>Заявете оферта <span aria-hidden="true">→</span></Link><a href={`tel:${CONTACT.phoneTel}`} className={styles.phone}>{CONTACT.phoneDisplay}</a></div></div></div>
      </section>
    </div>
  );
}
