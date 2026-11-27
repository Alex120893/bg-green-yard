import { WinterVideo } from "./WinterVideo";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { winterPost } from "@/lib/seo-pages";
import styles from "./WinterMaintenance.module.css";

function Snowflake({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 5v54M8.6 18.5l46.8 27M8.6 45.5l46.8-27M24 10l8 8 8-8M24 54l8-8 8 8M9 28l11-3-3-11M47 50l-3-11 11-3M9 36l11 3-3 11M47 14l-3 11 11 3" />
    </svg>
  );
}

export function WinterMaintenance({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  const services = bg
    ? ["Почистване на сняг с професионална техника", "Обработка против заледяване", "Почистване на тротоари и пешеходни алеи", "Обслужване на комплекси и паркинги"]
    : ["Snow clearance with professional machinery", "De-icing treatments", "Clearance of pavements and pedestrian paths", "Care for residential complexes and car parks"];

  return (
    <section aria-labelledby="winter-maintenance-title" className={styles.section}>
      <div className={styles.card}>
        <div className={styles.photo}>
          <WinterVideo locale={locale} poster={winterPost.image} />
        </div>
        <div className={styles.panel}>
          <Snowflake className={styles.decorationOne} />
          <Snowflake className={styles.decorationTwo} />
          <div className={styles.badge}><Snowflake /></div>
          <div className={styles.copy}>
            <h2 id="winter-maintenance-title" className={styles.title}>
              {bg ? <>Зимна поддръжка<br />и снегопочистване</> : <>Winter maintenance<br />and snow removal</>}
            </h2>
            <p className={styles.description}>
              {bg
                ? "BG GREEN YARD предлага професионално снегопочистване и зимна поддръжка на жилищни комплекси, паркинги, алеи и бизнес обекти в София."
                : "BG GREEN YARD provides professional snow removal and winter maintenance for residential complexes, car parks, paths and business properties in Sofia."}
            </p>
            <ul className={styles.services}>
              {services.map((item) => <li key={item}><svg aria-hidden="true" viewBox="0 0 20 20" className={styles.check}><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="m5.5 10 3 3 6-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span>{item}</span></li>)}
            </ul>
            <div className={styles.actions}><Link href={`/${locale}/contact`} className={styles.cta}>{bg ? "Заявете оферта" : "Request a quote"}</Link><Link href="/bg/snegopochistvane-sofia" className={styles.more}>{bg ? "Повече за услугата" : "Explore the service (BG)"}</Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
