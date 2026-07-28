import Image from "next/image";
import Link from "next/link";
import { SocialContactLinks } from "@/components/SocialContactLinks";
import type { Locale, Messages } from "@/lib/i18n";

const links = [
  { href: "", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/contact", key: "contact" as const },
];

export function Footer({
  locale,
  nav,
  footer,
}: {
  locale: Locale;
  nav: Messages["nav"];
  footer: Messages["footer"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gradient-to-b from-white to-slate-50/70">
      <div
        className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500"
        aria-hidden
      />

      <div className="border-b border-border bg-white/75 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-7">
          <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-6 lg:gap-8">
            {/* Brand — tight lockup */}
            <div className="md:col-span-5">
              <Link
                href={`/${locale}`}
                className="group flex items-start gap-3 sm:gap-3.5"
                aria-label="BG Green Yard — home"
              >
                <div className="relative shrink-0">
                  <span
                    className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-brand/20 to-transparent opacity-0 blur-sm transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  <Image
                    src="/logo-removebg-preview.png"
                    alt=""
                    width={64}
                    height={64}
                    className="relative h-12 w-auto sm:h-14"
                  />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    BG Green Yard
                  </p>
                  <p className="mt-1 max-w-[17rem] text-xs leading-snug text-muted sm:text-[13px] sm:leading-snug">
                    {footer.tagline}
                  </p>
                </div>
              </Link>
            </div>

            {/* Menu — compact */}
            <nav
              className="md:col-span-4"
              aria-label={footer.menuHeading}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                {footer.menuHeading}
              </p>
              <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:max-w-sm">
                {links.map(({ href, key }) => (
                  <li key={key}>
                    <Link
                      href={`/${locale}${href}`}
                      className="inline-flex text-sm font-medium text-foreground underline-offset-4 transition hover:text-brand-dark hover:underline"
                    >
                      {nav[key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                {footer.contactHeading}
              </p>
              <p className="mt-2 text-xs font-medium text-foreground/90">
                {footer.locationLine}
              </p>
              <SocialContactLinks
                className="mt-3"
                labels={{
                  email: footer.emailLabel,
                  phone: footer.phoneLabel,
                  instagram: footer.instagramLabel,
                  facebook: footer.facebookLabel,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — single compact strip */}
      <div className="bg-transparent">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-6">
          <p className="order-2 sm:order-1">
            © {year}{" "}
            <span className="font-medium text-foreground">BG Green Yard</span>
            . {footer.rights}.
          </p>
          <div className="order-1 flex items-center gap-2 sm:order-2">
            <Image
              src="/logo-removebg-preview.png"
              alt=""
              width={22}
              height={22}
              className="opacity-75"
            />
            <span className="text-muted">{footer.locationLine}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
