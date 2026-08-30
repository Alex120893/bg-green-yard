import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PRODUCTION_SITE_ORIGIN, ogImageAbsoluteUrl } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

const phoneDisplay = "+359 884 988 894";
const phoneTel = CONTACT.phoneTel;
const pagePath = "/bg/ozelenyavane-sofia";
const pageUrl = `${PRODUCTION_SITE_ORIGIN}${pagePath}`;
const title = "Озеленяване София | Изграждане и поддръжка на градини | BG.GREEN_YARD";
const description = "Професионално озеленяване в София — изграждане и поддръжка на градини, тревни площи, декоративни растения и поливни системи. Поискайте оферта.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "bg") return {};

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      locale: "bg_BG",
      siteName: "BG Green Yard",
      images: [{
        url: ogImageAbsoluteUrl,
        width: 1024,
        height: 686,
        alt: "Озеленяване в София от BG Green Yard",
        type: "image/jpeg",
      }],
    },
  };
}

const services = [
  ["Изграждане на градини", "Планиране и изпълнение на зелени пространства според конкретния обект."],
  ["Тревни площи", "Подготовка, полагане и сезонна грижа за здрав и представителен газон."],
  ["Засаждане", "Подбор и засаждане на декоративни растения, храсти и дървета."],
  ["Поливни системи", "Проектиране, монтаж и поддръжка на капково и разпръскващо поливане."],
  ["Поддръжка", "Косене, аерация, торене и сезонни дейности за градини и общи площи."],
] as const;

const projects = [
  { name: "AURA 1 Residence", image: "/images/clients/aura-1.jpg" },
  { name: "PRIMA Residence", image: "/images/clients/prima.jpg" },
  { name: "Synergy Tower", image: "/images/clients/synergy-tower.jpg" },
  { name: "Renault Center", image: "/images/clients/renault.png" },
  { name: "Dacia Center", image: "/images/clients/dacia.png" },
  { name: "Nissan Center", image: "/images/clients/nissan.png" },
] as const;

export default async function LandscapingSofiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "bg") notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Озеленяване в София",
    description,
    url: pageUrl,
    serviceType: "Озеленяване и поддръжка на градини",
    areaServed: { "@type": "City", name: "София" },
    provider: {
      "@type": "LocalBusiness",
      name: "BG Green Yard",
      url: PRODUCTION_SITE_ORIGIN,
      telephone: phoneTel,
      areaServed: { "@type": "City", name: "София" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand/5 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              София
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Озеленяване в София</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
              BG Green Yard предлага професионално озеленяване за частни дворове, жилищни комплекси и бизнес обекти в София. Работим от първоначалната подготовка на терена до дългосрочната грижа за зелените площи.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/bg/contact" className="inline-flex h-13 items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">Поискай оферта</Link>
              <a href={`tel:${phoneTel}`} className="inline-flex h-13 items-center justify-center rounded-full border border-brand/20 bg-white px-8 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-soft">{phoneDisplay}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal><div className="max-w-2xl"><h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Услуги по озеленяване</h2><p className="mt-4 text-lg text-muted">Изпълняваме цялостни решения за създаване и поддържане на зелени площи.</p></div></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([name, body], index) => <Reveal key={name} delayMs={index * 60}><article className="h-full rounded-3xl bg-white p-7 shadow-lg"><h3 className="text-xl font-bold text-foreground">{name}</h3><p className="mt-3 leading-relaxed text-muted">{body}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal><div className="text-center"><h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Реални обекти</h2><p className="mx-auto mt-3 max-w-2xl text-lg text-muted">Част от обектите, за които полагаме грижа в София.</p></div></Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {projects.map((project, index) => <Reveal key={project.name} delayMs={index * 50}><figure className="overflow-hidden rounded-2xl bg-white shadow-md"><div className="relative aspect-[4/3]"><Image src={project.image} alt={`${project.name} — озеленяване и поддръжка в София`} fill className="object-contain p-4" sizes="(min-width: 640px) 33vw, 50vw" /></div><figcaption className="border-t border-black/5 px-4 py-3 text-center text-sm font-semibold text-foreground">{project.name}</figcaption></figure></Reveal>)}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
          <Reveal><div><h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Райони, които обслужваме</h2><p className="mt-5 leading-relaxed text-muted">Обслужваме частни, жилищни и бизнес обекти в рамките на София. За оглед и конкретна оферта се свържете с нас.</p></div></Reveal>
          <Reveal delayMs={80}><div><h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Защо да изберете нас</h2><ul className="mt-5 space-y-3 text-muted"><li>Локален фокус и работа само в София.</li><li>Комплексна грижа — от озеленяване до поливни системи и поддръжка.</li><li>Опит с жилищни комплекси и бизнес обекти.</li></ul></div></Reveal>
        </div>
      </section>

      <section className="bg-brand py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6"><Reveal><h2 className="text-3xl font-bold md:text-4xl">Нуждаете се от озеленяване в София?</h2><p className="mt-4 text-white/85">Свържете се с BG Green Yard за оглед и оферта.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/bg/contact" className="inline-flex h-13 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-soft">Поискай оферта</Link><a href={`tel:${phoneTel}`} className="inline-flex h-13 items-center justify-center rounded-full border border-white/30 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10">{phoneDisplay}</a></div></Reveal></div>
      </section>
    </>
  );
}
