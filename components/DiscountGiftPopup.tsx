"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function DiscountGiftPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="discount-gift-title">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-7 text-center shadow-2xl md:p-9">
        <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-surface hover:text-foreground" aria-label="Затвори предложението">×</button>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-xl font-bold text-brand" aria-hidden>30%</div>
        <p className="mt-5 text-sm font-bold uppercase tracking-[.16em] text-brand">Подарък за нови клиенти</p>
        <h2 id="discount-gift-title" className="mt-3 text-3xl font-bold tracking-tight text-foreground">30% отстъпка</h2>
        <p className="mt-3 text-base leading-relaxed text-muted">Получете 30% отстъпка за първата заявка за озеленяване или поддръжка в София.</p>
        <Link href="/bg/contact" onClick={() => setOpen(false)} className="mt-7 inline-flex rounded-full bg-brand px-7 py-3 font-bold text-white transition hover:bg-brand-dark">Използвай отстъпката</Link>
        <button type="button" onClick={() => setOpen(false)} className="mt-4 block w-full text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline">Не, благодаря</button>
      </div>
    </div>
  );
}
