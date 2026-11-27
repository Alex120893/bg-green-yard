"use client";

import Link from "next/link";
import styles from "./DiscountGiftPopup.module.css";
import { pricing } from "@/lib/gardenPricing";
import { useEffect, useState } from "react";

const SEEN_KEY = "bg-green-yard:discount-gift-seen";
let shownThisSession = false;

function hasSeenOffer() {
  if (shownThisSession) return true;
  try {
    return window.localStorage.getItem(SEEN_KEY) === "true";
  } catch {
    // Storage can be unavailable when browser privacy settings block it.
    return false;
  }
}

export function DiscountGiftPopup() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (hasSeenOffer()) return;

    const timer = window.setTimeout(() => {
      // Another tab may have shown the offer during the delay.
      if (hasSeenOffer()) return;
      shownThisSession = true;
      try {
        window.localStorage.setItem(SEEN_KEY, "true");
      } catch {
        // Still avoid repeat displays during client-side navigation.
      }
      setOpened(true);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!opened) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="discount-gift-title" aria-describedby="discount-gift-description">
      <div className={styles.dialog}>
        <button type="button" onClick={() => setOpened(false)} className={styles.close} aria-label="Затвори предложението">×</button>
        <div className={styles.header}>
          <div className={styles.badge}>−{pricing.discount.percent}%</div>
          <p className={styles.eyebrow}>Подарък за Вашата градина</p>
          <h2 id="discount-gift-title" className={styles.title}>Вземете<br />отстъпката!</h2>
        </div>
        <div className={styles.body}>
          <p id="discount-gift-description" className={styles.copy}>Получете {pricing.discount.percent}% отстъпка за първата заявка за поддръжка на градина или зелени площи</p>
          <Link href="/bg/calculator?promo=first-garden#calculator-form" onClick={() => setOpened(false)} className={styles.cta}>Вземете своята отстъпка</Link>
          <button type="button" onClick={() => setOpened(false)} className={styles.decline}>Не, благодаря</button>
        </div>
      </div>
    </div>
  );
}
