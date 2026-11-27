import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { lightingFeatures, lightingImage, lightingPath } from "@/lib/lighting";
import styles from "./GardenLighting.module.css";

export function LightingIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 44c0-8-11-11-11-24a20 20 0 0 1 40 0c0 13-11 16-11 24M15 46h18M16 52h16M20 58h8M24 43V28M24 34c-10-2-12-9-11-17 9 1 15 7 11 17Zm0-3c8-1 12-7 11-14-7 1-11 6-11 14Z" /></svg>;
}

export function GardenLighting({ locale }: { locale: Locale }) {
  const bg = locale === "bg";
  const features = bg ? lightingFeatures : ["Energy-efficient LED lighting", "Decorative and functional lighting", "Paths, terraces and garden spaces", "Installation planned after a site visit"];
  return (
    <section className={styles.section} aria-labelledby="garden-lighting-title">
      <div className={styles.card}>
        <div className={styles.photo}><Image src={lightingImage} alt={bg ? "Градинска алея с декоративно вечерно осветление" : "Garden path with decorative evening lighting"} fill sizes="(min-width: 768px) 50vw, 100vw" className={styles.image} /></div>
        <div className={styles.panel}>
          <LightingIcon className={styles.icon} />
          <div>
            <h2 id="garden-lighting-title">{bg ? <>Осветление<br />в градината и двора</> : <>Lighting<br />for your garden and yard</>}</h2>
            <p>{bg ? "Създайте уют и сигурност с професионално градинско осветление. Красивата светлина подчертава дизайна, осигурява видимост и удължава времето, в което можете да се наслаждавате на двора си." : "Bring warmth and visibility to your outdoor space. Thoughtfully placed lighting highlights the garden and makes evenings outdoors more enjoyable."}</p>
            <ul>{features.map((feature) => <li key={feature}><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="m5 10 3 3 7-7" fill="none" stroke="white" strokeWidth="2" /></svg>{feature}</li>)}</ul>
            <div className={styles.actions}><Link href={`/${locale}/contact`} className="garden-button">{bg ? "Заявете оферта" : "Request a quote"}<span aria-hidden="true">→</span></Link><Link href={`/bg${lightingPath}`} className={styles.more}>{bg ? "Повече за услугата" : "Explore the service (BG)"}</Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
