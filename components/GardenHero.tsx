import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

function ServiceIcon({ type }: { type: "leaves" | "shears" | "sprinkler" }) {
  return (
    <svg viewBox="0 0 90 72" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === "leaves" ? <>
        <path d="M44 65V36M44 53C19 53 11 36 10 15c24 1 35 14 34 38ZM45 47C43 22 59 9 80 6c-2 25-14 39-35 41Z" />
        <path d="M22 27 44 53M45 47 67 19M44 65c0-6-3-12-7-16" />
      </> : type === "shears" ? <>
        <path d="m39 39 27-31-15 36M42 41 25 25 55 8 44 35M37 43 18 64c-5 5-12-2-8-7l21-24M46 43 39 65c-2 6-10 3-8-3l7-21" />
        <circle cx="40" cy="39" r="4" />
        <path d="M60 65c0-13 7-24 18-30M64 52c-1-12 5-17 13-18-1 9-5 15-13 18ZM66 56c10 1 16-2 19-10-9-1-15 2-19 10ZM58 62c-6-3-9-7-8-13 7 1 10 6 8 13Z" />
      </> : <>
        <path d="M13 65h65M38 65V42h13v23M34 42h21v-6H34ZM44 47v18M19 64l-2-6M25 64l1-8M67 64l3-8M60 64v-7" />
        <path d="M44 30C43 17 33 6 24 8M36 31C27 20 15 19 7 24M53 31c8-11 20-12 29-7M48 28C51 15 60 8 70 11M44 14V4" strokeDasharray="1.5 6" />
        <path d="m14 37-5 2M75 37l6 3M35 11l-3-4M58 10l3-5" />
      </>}
    </svg>
  );
}

export function GardenHero({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const services = [
    { title: en ? "Landscaping" : "Озеленяване", href: en ? "/en/services" : "/bg/ozelenyavane-sofia", icon: "leaves" as const },
    { title: en ? "Maintenance" : "Поддръжка", href: en ? "/en/services" : "/bg/poddruzhka-na-gradini-sofia", icon: "shears" as const },
    { title: en ? "Irrigation systems" : "Поливни системи", href: en ? "/en/services" : "/bg/polivni-sistemi-sofia", icon: "sprinkler" as const },
  ];
  return (
    <div className="garden-intro">
      <section className="garden-hero" aria-labelledby="garden-title">
        <div className="garden-hero-copy">
          <h1 id="garden-title">{en ? "Creating gardens you love to live in" : "Създаваме градини, в които ви се живее"}</h1>
          <span className="copper-rule" aria-hidden="true" />
          <p>{en ? "Design, landscaping and care for green spaces in Sofia" : "Проектиране, изграждане и поддръжка на зелени пространства в София"}</p>
          <Link className="garden-button" href={`/${locale}/contact`}>
            {en ? "Request a quote" : "Поискай оферта"}<span aria-hidden="true">⟶</span>
          </Link>
        </div>
        <div className="garden-hero-image">
          <Image src="/images/design/garden-reference.webp" alt={en ? "Lush garden with flowers, a lawn and irrigation beside a modern home" : "Зелена градина с цветя, тревна площ и поливна система до съвременна къща"} fill priority sizes="(min-width: 768px) 62vw, 100vw" />
        </div>
      </section>
      <nav className="garden-services" aria-label={en ? "Garden services" : "Услуги за вашата градина"}>
        {services.map(service => <Link key={service.icon} className="garden-service" href={service.href}>
          <ServiceIcon type={service.icon} /><span>{service.title}</span><span className="service-arrow" aria-hidden="true">›</span>
        </Link>)}
      </nav>
      <section className="garden-season">
        <h2>{en ? "Care for your garden through every season" : "Грижа за вашата градина през всеки сезон"}</h2>
        <span className="copper-rule" aria-hidden="true" />
      </section>
    </div>
  );
}
