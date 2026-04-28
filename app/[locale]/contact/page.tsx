import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PlantDecoration } from "@/components/PlantDecoration";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { getMessages, isLocale } from "@/lib/i18n";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11733.123!2d23.3219!3d42.6977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf2e60!2z0KHQvtGE0YLRgywg0JHQu9C10LbQsNC90LjQuSDQsNC80LXQvdC40YbQsNGC0LXQuw!5e0!3m2!1sbg!2sbg!4v1700000000000!5m2!1sbg!2sbg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  const locale = isLocale(loc) ? loc : "bg";
  const t = getMessages(locale);
  return {
    title: t.contact.title,
    description: t.contact.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  const t = getMessages(locale);

  return (
    <div className="relative">
      <PlantDecoration corner="bl" kind="avif" className="opacity-35" size={190} />
      <PlantDecoration corner="tr" kind="png" className="opacity-30" size={138} />
      <PlantDecoration corner="tl" kind="png" className="opacity-27" size={128} />

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {t.contact.title}
                </h1>
                <p className="mt-3 max-w-xl text-lg text-muted">
                  {t.contact.subtitle}
                </p>
                <dl className="mt-8 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">
                      {t.contact.addressLabel}
                    </dt>
                  </div>
                  <div>
                    <dt className="text-muted">{t.contact.hoursLabel}</dt>
                    <dd className="font-medium text-foreground">
                      {t.contact.hoursValue}
                    </dd>
                  </div>
                </dl>
              </div>
              <Image
                src="/logo-removebg-preview.png"
                alt="BG Green Yard"
                width={100}
                height={100}
                className="justify-self-start md:justify-self-end"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <Reveal>
            <ContactForm contact={t.contact} serviceOptions={t.serviceOptions} />
          </Reveal>
          <Reveal delayMs={80}>
            <div className="flex h-full flex-col gap-4">
              <h2 className="text-lg font-semibold text-foreground">
                {t.contact.mapTitle}
              </h2>
              <div className="min-h-[280px] flex-1 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <iframe
                  title="Sofia map"
                  src={MAP_EMBED}
                  className="h-full min-h-[280px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
