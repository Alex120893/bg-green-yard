import Link from "next/link";
import styles from "./HomeCalculatorCta.module.css";

export function HomeCalculatorCta() {
  return (
    <section className={styles.section} aria-label="Калкулатор за Вашата градина">
      <div className={styles.inner}>
        <Link href="/bg/calculator#calculator-form" className={styles.button}>
          <svg className={styles.calculator} viewBox="0 0 40 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="2" width="34" height="48" rx="4" /><path d="M10 9h20v10H10zM10 26h3v3h-3zM19 26h3v3h-3zM28 26h3v3h-3zM10 35h3v3h-3zM19 35h3v3h-3zM28 35h3v10h-3zM10 43h3v2h-3zM19 43h3v2h-3z" /></svg>
          <span>Изчислете цената<br />за Вашата <strong>градина</strong></span>
          <svg className={styles.chevron} viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 6 14 14L6 34" /></svg>
        </Link>
        <div className={styles.note}>
          <span className={styles.info} aria-hidden="true">i</span>
          <div><p className={styles.lead}>Изчислете ориентировъчната стойност на избраните услуги за Вашата градина.</p></div>
        </div>
      </div>
    </section>
  );
}
