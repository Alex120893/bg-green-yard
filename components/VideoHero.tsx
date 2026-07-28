"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

export function VideoHero({
  locale,
  eyebrow,
  title,
  lead,
  ctaPrimary,
  ctaSecondary,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setReady(true);
    v.addEventListener("canplay", onReady);
    v.play().catch(() => {});
    return () => v.removeEventListener("canplay", onReady);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate min-h-[min(100svh,920px)] overflow-hidden bg-gradient-to-b from-white to-slate-100">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full scale-[1.04] object-cover transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0) scale(1.04)` }}
        autoPlay
        muted
        loop
        playsInline
        poster="/grass.jpg"
        aria-hidden
      >
        <source src="/main.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/76 to-white md:from-white/30 md:via-white/15 md:to-white/45"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_16%,rgb(192_132_252_/0.26),transparent_35%),radial-gradient(circle_at_18%_84%,rgb(56_189_248_/0.24),transparent_34%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
        <div className="md:rounded-3xl md:border md:border-white/65 md:bg-white/74 md:p-8 md:shadow-[0_16px_40px_rgb(15_23_42_/0.1)] md:backdrop-blur-md lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-[4rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {lead}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/services`}
              className="lovable-button-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="lovable-button-secondary inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
