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
    <section className="relative overflow-hidden bg-white">
      {/* Subtle gradient blobs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-brand/6 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand/6 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(100svh,840px)] max-w-6xl flex-col justify-center px-4 py-24 md:px-6 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            {eyebrow}
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {lead}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-8 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand-dark hover:shadow-sm"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Floating stat badges */}
        <div className="mt-16 flex flex-wrap gap-4 md:mt-20">
          {[
            { value: "15 000+", label: "м² поддържани площи" },
            { value: "120+", label: "доволни клиенти" },
            { value: "3", label: "вида услуги" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <span className="text-xl font-bold text-brand">{stat.value}</span>
              <span className="text-sm text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
