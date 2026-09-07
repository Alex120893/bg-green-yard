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
      <div className="fixed right-4 top-24 z-[90] animate-[bounce_2.4s_ease-in-out_infinite] sm:right-6 sm:top-28">
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 px-4 py-3 text-amber-950 shadow-[0_14px_36px_rgba(146,64,14,.38)] ring-2 ring-white/90 transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-amber-300/70"
          aria-label="Отвори подарък с отстъпка"
        >
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rose-600 shadow-md">
          <span className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-amber-300" />
          <span className="absolute -top-2 left-1 h-4 w-4 rounded-tl-full border-4 border-amber-300" />
          <span className="absolute -top-2 right-1 h-4 w-4 rounded-tr-full border-4 border-amber-300" />
        </span>
        <span className="text-left text-sm font-extrabold leading-tight">Подарък за вас<br /><span className="font-bold text-rose-800">30% отстъпка</span></span>
        </button>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-100"
          aria-label="Затвори подаръка"
        >
          ×
        </button>
      </div>

      {opened && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="discount-gift-title">
          <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] bg-white text-center shadow-2xl ring-4 ring-amber-300">
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 px-7 pb-9 pt-10 text-amber-950">
              <span className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/20" aria-hidden />
              <span className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-rose-500/20" aria-hidden />
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-rose-600 text-3xl font-extrabold text-white shadow-xl ring-4 ring-amber-200">30%</div>
              <p className="relative mt-5 text-sm font-bold uppercase tracking-[.16em] text-rose-800">Подарък за поддръжка</p>
              <h2 id="discount-gift-title" className="relative mt-2 text-3xl font-extrabold">Вашата отстъпка е готова</h2>
            </div>
            <div className="p-7">
              <p className="text-base leading-relaxed text-muted">Получете 30% отстъпка за първата заявка за поддръжка на градина или зелени площи в София.</p>
              <Link href="/bg/contact" onClick={() => setOpened(false)} className="mt-6 inline-flex rounded-full bg-rose-600 px-7 py-3 font-bold text-white shadow-md transition hover:bg-rose-700">Използвай отстъпката</Link>
              <button type="button" onClick={() => setOpened(false)} className="mt-4 block w-full text-sm font-medium text-muted hover:text-foreground">Затвори</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
