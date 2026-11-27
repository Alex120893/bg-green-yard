import { IrrigationIcon } from "./IrrigationIcon";
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
          <IrrigationIcon className={styles.icon} />
          <div>
            <h2 id="garden-irrigation-title">{bg ? "Поливни системи" : "Irrigation systems"}</h2>
            <p className="!mt-3 !text-lg font-semibold !text-brand-dark">{bg ? "Ефективно поливане за по-зелена градина" : "Efficient watering for a greener garden"}</p>
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
