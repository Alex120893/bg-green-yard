import Link from "next/link";
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
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/main.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/40" />

      <div className="relative mx-auto flex min-h-[min(100svh,900px)] max-w-7xl flex-col justify-center px-4 py-24 md:px-8 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-300">
            {eyebrow}
          </span>

          {/* Main Title */}
          <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Lead Text */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            {lead}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex h-14 items-center justify-center rounded-full bg-brand px-10 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white bg-transparent px-10 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="mt-24 flex flex-wrap gap-6 md:mt-32">
          {[
            { value: "15 000+", label: "м² поддържани площи" },
            { value: "120+", label: "доволни клиенти" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4"
            >
              <span className="text-2xl font-bold text-emerald-300">
                {stat.value}
              </span>
              <span className="text-sm text-white/80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
