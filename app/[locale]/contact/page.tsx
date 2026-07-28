import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { OpeningHoursTable } from "@/components/OpeningHoursTable";
import { SocialContactLinks } from "@/components/SocialContactLinks";
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
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand/5 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t.contact.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {t.contact.subtitle}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Address */}
              <div className="flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                    {locale === "bg" ? "Адрес" : "Address"}
                  </p>
                  <p className="mt-1 font-medium text-foreground">
                    {t.contact.addressLabel}
                  </p>
                </div>
              </div>

              {/* Social / contact links */}
              <div className="flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:col-span-2 lg:col-span-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                    {t.contact.reachLabel}
                  </p>
                  <SocialContactLinks
                    className="mt-2"
                    labels={{
                      email: t.contact.emailLabel,
                      phone: t.contact.phoneLabel,
                      instagram: t.contact.instagramLabel,
                      facebook: t.contact.facebookLabel,
                    }}
                  />
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                    {t.contact.hoursLabel}
                  </p>
                  <div className="mt-2">
                    <OpeningHoursTable
                      schedule={t.contact.hoursSchedule}
                      closedLabel={t.contact.hoursClosed}
                      dayColumn={t.contact.hoursDayColumn}
                      timeColumn={t.contact.hoursTimeColumn}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              {t.contact.formSubmit}
            </h2>
            <ContactForm
              locale={locale}
              contact={t.contact}
              serviceOptions={t.serviceOptions}
            />
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              {t.contact.mapTitle}
            </h2>
            <div className="h-full min-h-[360px] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
              <iframe
                title="Sofia map"
                src={MAP_EMBED}
                className="h-full min-h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

