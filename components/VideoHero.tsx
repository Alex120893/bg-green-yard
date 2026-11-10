import Link from "next/link";
import type { Locale } from "@/lib/i18n";

// Restyle the original hero without adding content or another introduction.
export function VideoHero({ locale, eyebrow, title, lead, ctaPrimary, ctaSecondary, stats }: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="garden-block garden-block-cream garden-story" aria-labelledby="home-title">
      <div className="garden-story-inner">
        <div className="garden-story-copy">
          <p className="garden-eyebrow">{eyebrow}</p>
          <h1 id="home-title">{title}</h1>
          <span className="copper-rule" aria-hidden="true" />
          <p className="garden-story-lead">{lead}</p>
          <div className="garden-story-actions">
            <Link href={`/${locale}/services`} className="garden-button">{ctaPrimary}</Link>
            <Link href={`/${locale}/contact`} className="garden-text-link">{ctaSecondary}</Link>
          </div>
          <div className="garden-stats">
            {stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
        <video autoPlay muted loop poster="/garden.jpg" playsInline className="garden-story-video" aria-label={locale === "en" ? "Our landscaping work" : "Нашата работа в градината"}>
          <source src="/main.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
