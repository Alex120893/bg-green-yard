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
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-3"
              aria-label="BG Green Yard — home"
            >
              <Image
                src="/logo-removebg-preview.png"
                alt=""
                width={52}
                height={52}
                className="h-12 w-auto transition-opacity group-hover:opacity-80"
              />
              <div>
                <p className="text-lg font-bold tracking-tight text-foreground">
                  BG Green Yard
                </p>
                <p className="text-xs text-muted">{footer.tagline}</p>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {footer.locationLine}
            </p>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3" aria-label={footer.menuHeading}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {footer.menuHeading}
            </p>
            <ul className="mt-4 space-y-3">
              {links.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-sm font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-brand-dark hover:underline"
                  >
                    {nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {footer.contactHeading}
            </p>
            <SocialContactLinks
              className="mt-4"
              labels={{
                email: footer.emailLabel,
                phone: footer.phoneLabel,
                instagram: footer.instagramLabel,
                facebook: footer.facebookLabel,
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year}{" "}
            <span className="font-medium text-foreground">BG Green Yard</span>.{" "}
            {footer.rights}.
          </p>
          <p>{footer.locationLine}</p>
        </div>
      </div>
    </footer>
  );
}
