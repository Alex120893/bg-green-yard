"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function DiscountGiftPopup() {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpened(true)}
        className="fixed right-4 top-24 z-[90] flex h-auto min-h-16 w-auto max-w-[calc(100vw-2rem)] gap-3 px-4 py-3 sm:right-6 sm:top-28 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_12px_32px_rgba(15,70,39,.35)] transition hover:-translate-y-1 hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand/30"
        aria-label="Отвори подарък с отстъпка"
      >
        <span className="relative block h-9 w-10 shrink-0 rounded-md bg-white/95 shadow-sm">
          <span className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-brand" />
          <span className="absolute -top-2 left-1 h-3 w-4 rounded-tl-full border-4 border-brand bg-white/95" />
          <span className="absolute -top-2 right-1 h-3 w-4 rounded-tr-full border-4 border-brand bg-white/95" />
        </span>
        <span className="text-left text-sm font-extrabold leading-tight">30% отстъпка<br /><span className="font-medium text-white/80">за поддръжка</span></span>
      </button>

      {opened && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4" role="dialog" aria-modal="true" aria-labelledby="discount-gift-title">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white text-center shadow-2xl">
            <div className="bg-brand px-7 pb-8 pt-10 text-white">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-3xl font-extrabold ring-1 ring-white/30">30%</div>
              <p className="mt-5 text-sm font-bold uppercase tracking-[.16em] text-white/75">Подарък за поддръжка</p>
              <h2 id="discount-gift-title" className="mt-2 text-3xl font-bold">30% отстъпка за поддръжка</h2>
            </div>
            <div className="p-7">
              <p className="text-base leading-relaxed text-muted">Получете 30% отстъпка за първата заявка за поддръжка на градина или зелени площи в София.</p>
              <Link href="/bg/contact" onClick={() => setOpened(false)} className="mt-6 inline-flex rounded-full bg-brand px-7 py-3 font-bold text-white transition hover:bg-brand-dark">Използвай отстъпката</Link>
              <button type="button" onClick={() => setOpened(false)} className="mt-4 block w-full text-sm font-medium text-muted hover:text-foreground">Затвори</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
