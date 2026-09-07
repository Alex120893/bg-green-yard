"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const confetti = [
  ["left-[8%] top-[18%] bg-rose-500", "-35deg"], ["left-[20%] top-[8%] bg-amber-300", "20deg"],
  ["left-[34%] top-[26%] bg-sky-400", "-15deg"], ["left-[48%] top-[5%] bg-violet-500", "40deg"],
  ["right-[30%] top-[20%] bg-emerald-400", "-30deg"], ["right-[17%] top-[7%] bg-rose-400", "25deg"],
  ["right-[7%] top-[31%] bg-amber-400", "-20deg"], ["left-[12%] bottom-[16%] bg-sky-300", "35deg"],
  ["right-[11%] bottom-[13%] bg-violet-400", "-40deg"], ["left-[39%] bottom-[9%] bg-rose-500", "15deg"],
] as const;

export function DiscountGiftPopup() {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const celebrationTimer = window.setTimeout(() => setCelebrate(true), 900);
    const offerTimer = window.setTimeout(() => {
      setCelebrate(false);
      setVisible(true);
      setOpened(true);
    }, 1900);
    return () => {
      window.clearTimeout(celebrationTimer);
      window.clearTimeout(offerTimer);
    };
  }, []);

  if (!visible && !celebrate) return null;

  return (
    <>
      {celebrate && (
        <div className="pointer-events-none fixed inset-0 z-[99] overflow-hidden" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-amber-300/80 animate-[ping_850ms_ease-out_1_both]" />
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/50 animate-[ping_650ms_ease-out_180ms_1_both]" />
          {confetti.map(([position, rotation], index) => (
            <span key={position} className={`absolute h-3 w-2 rounded-sm ${position} animate-[ping_900ms_ease-out_${index * 70}ms_1_both]`} style={{ transform: `rotate(${rotation})` }} />
          ))}
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-[90] sm:bottom-6 sm:right-6">
        <div className="animate-[bounce_2.4s_ease-in-out_infinite]">
          <button type="button" onClick={() => setOpened(true)} className="flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 px-4 py-3 text-amber-950 shadow-[0_14px_36px_rgba(146,64,14,.38)] ring-2 ring-white/90 transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-amber-300/70" aria-label="Отвори подарък с отстъпка">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rose-600 shadow-md"><span className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-amber-300" /><span className="absolute -top-2 left-1 h-4 w-4 rounded-tl-full border-4 border-amber-300" /><span className="absolute -top-2 right-1 h-4 w-4 rounded-tr-full border-4 border-amber-300" /></span>
            <span className="text-left text-sm font-extrabold leading-tight">Подарък за вас<br /><span className="font-bold text-rose-800">30% отстъпка</span></span>
          </button>
          <button type="button" onClick={() => setVisible(false)} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-100" aria-label="Затвори подаръка">×</button>
        </div>
      </div>

      {opened && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="discount-gift-title">
          <div className="relative w-full max-w-sm animate-[bounce_700ms_ease-out_1] overflow-hidden rounded-[28px] bg-white text-center shadow-2xl ring-4 ring-amber-300">
            <button type="button" onClick={() => { setOpened(false); setCelebrate(false); }} className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-slate-700 shadow hover:bg-white" aria-label="Затвори предложението">×</button>
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 px-7 pb-9 pt-10 text-amber-950"><span className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/20" /><span className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-rose-500/20" /><div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-rose-600 text-3xl font-extrabold text-white shadow-xl ring-4 ring-amber-200">30%</div><p className="relative mt-5 text-sm font-bold uppercase tracking-[.16em] text-rose-800">Подарък за поддръжка</p><h2 id="discount-gift-title" className="relative mt-2 text-3xl font-extrabold">Вашата отстъпка е готова</h2></div>
            <div className="p-7"><p className="text-base leading-relaxed text-muted">Получете 30% отстъпка за първата заявка за поддръжка на градина или зелени площи в София.</p><Link href="/bg/contact" onClick={() => { setOpened(false); setCelebrate(false); }} className="mt-6 inline-flex rounded-full bg-rose-600 px-7 py-3 font-bold text-white shadow-md transition hover:bg-rose-700">Използвай отстъпката</Link><button type="button" onClick={() => { setOpened(false); setCelebrate(false); }} className="mt-4 block w-full text-sm font-medium text-muted hover:text-foreground">Затвори</button></div>
          </div>
        </div>
      )}
    </>
  );
}
