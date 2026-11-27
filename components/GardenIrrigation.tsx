import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { IrrigationVideo } from "./IrrigationVideo";
import styles from "./GardenLighting.module.css";

export function GardenIrrigation({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  const features = bg
    ? ["Автоматични поливни системи", "Подземен монтаж", "Икономично използване на водата", "Професионална поддръжка"]
    : ["Automatic irrigation systems", "Underground installation", "Efficient water use", "Professional maintenance"];

  return (
    <section className={styles.section} aria-labelledby="garden-irrigation-title">
      <div className={styles.card}>
        <div className={styles.photo}><IrrigationVideo locale={locale} /></div>
        <div className={styles.panel}>
          <svg className={styles.icon} viewBox="0 0 64 76" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-irrigation-icon="sprinkler">
            <path d="M27 49h10v18H27zM22 45h20v5H22zM20 68h24M32 44v-7" />
            <path d="M27 35C22 24 15 20 6 20M37 35c5-11 12-15 21-15M29 29C25 15 17 10 8 8M35 29C39 15 47 10 56 8M32 25V6" strokeDasharray="3 5" />
            <path d="M6 34c7-1 12 2 16 6M58 34c-7-1-12 2-16 6" strokeDasharray="3 5" />
          </svg>
          <div>
            <p className="!mt-0 !text-xs font-bold uppercase tracking-widest !text-brand">{bg ? "Поливни системи" : "Irrigation systems"}</p>
            <h2 id="garden-irrigation-title" className="mt-2">{bg ? <>Ефективно поливане<br />за по-зелена градина</> : <>Efficient watering<br />for a greener garden</>}</h2>
            <p>{bg ? "Проектиране, монтаж и поддръжка на поливни системи — автоматични и подземни, за здрави растения и красива градина през цялата година." : "Design, installation and maintenance of automatic and underground irrigation systems for healthy plants and a beautiful garden throughout the year."}</p>
            <ul>{features.map((feature) => <li key={feature}><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="m5 10 3 3 7-7" fill="none" stroke="white" strokeWidth="2" /></svg>{feature}</li>)}</ul>
            <div className={styles.actions}>
              <Link href={`/${locale}/contact?service=irrigation`} className="garden-button">{bg ? "Заявете оферта" : "Request a quote"}</Link>
              <Link href="/bg/polivni-sistemi-sofia" className={styles.more}>{bg ? "Повече за услугата" : "Explore the service (BG)"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
