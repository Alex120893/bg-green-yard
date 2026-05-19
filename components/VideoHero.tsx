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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setReady(true);
    v.addEventListener("canplay", onReady);
    v.play().catch(() => {});
    return () => v.removeEventListener("canplay", onReady);
  }, []);

  return (
    <section className="relative isolate min-h-[min(100svh,920px)] overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
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
        className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white md:from-white/30 md:via-white/20 md:to-white/45"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
        <div className="md:rounded-3xl md:bg-white/75 md:p-8 md:shadow-sm md:backdrop-blur-sm lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {lead}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-8 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-dark"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
