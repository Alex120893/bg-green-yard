import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { OpeningHoursTable } from "@/components/OpeningHoursTable";
import { SocialContactLinks } from "@/components/SocialContactLinks";
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
      <PlantDecoration corner="tr" kind="png" className="opacity-27" size={128} />

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <Reveal>
            <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {t.contact.title}
                </h1>
                <p className="mt-3 max-w-xl text-lg text-muted">
                  {t.contact.subtitle}
                </p>
                <div className="mt-8 space-y-6">
                  <p className="flex items-center gap-2 text-base font-semibold text-foreground">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand-dark"
                      aria-hidden
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.465-.247.846-.433 3.81-1.946 6.33-5.14 6.33-9.28 0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.14 2.52 7.334 6.33 9.28.38.186.66.337.846.433a5.74 5.74 0 00.299.148l.018.008.006.003zM10 11.25a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {t.contact.addressLabel}
                  </p>

                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                      {t.contact.reachLabel}
                    </h2>
                    <SocialContactLinks
                      className="mt-3"
                      labels={{
                        email: t.contact.emailLabel,
                        phone: t.contact.phoneLabel,
                        instagram: t.contact.instagramLabel,
                        facebook: t.contact.facebookLabel,
                      }}
                    />
                  </div>

                  <div className="mx-auto max-w-md md:max-w-lg">
                    <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-muted">
                      {t.contact.hoursLabel}
                    </h2>
                    <div className="mt-3">
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

        <div className="relative mx-auto min-h-[160px] max-w-6xl px-4 pb-12 pt-4 md:px-6 md:pb-14">
          <PlantDecoration corner="br" kind="png" className="opacity-30" size={138} />
        </div>
      </section>
    </div>
  );
}
