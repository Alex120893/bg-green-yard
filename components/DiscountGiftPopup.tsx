"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function DiscountGiftPopup() {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="fixed left-1/2 top-24 z-[90] -translate-x-1/2 animate-[bounce_700ms_ease-out_1] sm:top-28">
        <div className="animate-[bounce_2.8s_ease-in-out_infinite]">
          <button type="button" onClick={() => setOpened(true)} className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 px-3 py-2.5 text-amber-950 shadow-[0_12px_28px_rgba(146,64,14,.35)] ring-2 ring-white/90 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300/70" aria-label="Отвори подарък с отстъпка">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-600 shadow-sm"><span className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-amber-300" /><span className="absolute -top-1.5 left-1 h-3 w-3 rounded-tl-full border-2 border-amber-300" /><span className="absolute -top-1.5 right-1 h-3 w-3 rounded-tr-full border-2 border-amber-300" /></span>
            <span className="text-left text-xs font-extrabold leading-tight">Подарък<br /><span className="text-rose-800">-30%</span></span>
          </button>
          <button type="button" onClick={() => setVisible(false)} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-100" aria-label="Затвори подаръка">×</button>
        </div>
      </div>

      {opened && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="discount-gift-title">
          <div className="relative w-full max-w-sm animate-[bounce_500ms_ease-out_1] overflow-hidden rounded-[28px] bg-white text-center shadow-2xl ring-4 ring-amber-300">
            <button type="button" onClick={() => setOpened(false)} className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-slate-700 shadow hover:bg-white" aria-label="Затвори предложението">×</button>
            <div className="bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 px-7 pb-9 pt-10 text-amber-950"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-rose-600 text-3xl font-extrabold text-white shadow-xl ring-4 ring-amber-200">30%</div><p className="mt-5 text-sm font-bold uppercase tracking-[.16em] text-rose-800">Подарък за поддръжка</p><h2 id="discount-gift-title" className="mt-2 text-3xl font-extrabold">Вашата отстъпка е готова</h2></div>
            <div className="p-7"><p className="text-base leading-relaxed text-muted">Получете 30% отстъпка за първата заявка за поддръжка на градина или зелени площи в София.</p><Link href="/bg/contact" onClick={() => setOpened(false)} className="mt-6 inline-flex rounded-full bg-rose-600 px-7 py-3 font-bold text-white shadow-md transition hover:bg-rose-700">Използвай отстъпката</Link><button type="button" onClick={() => setOpened(false)} className="mt-4 block w-full text-sm font-medium text-muted hover:text-foreground">Затвори</button></div>
          </div>
        </div>
      )}
    </>
  );
}
