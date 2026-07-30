"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale, Messages } from "@/lib/i18n";

const navKeys = [
  { href: "", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/inquiries", key: "inquiries" as const },
  { href: "/contact", key: "contact" as const },
];

const mobileNavKeys = [
  { href: "", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/contact", key: "contact" as const },
];

export function Navbar({ locale, nav }: { locale: Locale; nav: Messages["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
  const pathSuffix = rest === "/" ? "" : rest;
  const bgHref = `/bg${pathSuffix}`;
  const enHref = `/en${pathSuffix}`;

  return (
    <header className="sticky top-0 z-50 border-b border-brand/20 bg-brand/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-3 hover:opacity-90 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        >
          {/* White circle with logo */}
          <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-white shadow-md">
            <Image
              src="/logo-removebg-preview.png"
              alt="BG Green Yard"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
          </div>
          
          <span className="hidden sm:block text-base font-bold tracking-tight text-white whitespace-nowrap">
            BG Green Yard
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navKeys.map(({ href, key }) => {
            const path = `/${locale}${href}`;
            const active =
              href === ""
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname === path || pathname.startsWith(`${path}/`);
            return (
              <Link
                key={key}
                href={path}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="relative flex h-10 w-[6.75rem] shrink-0 items-stretch rounded-full border border-white/20 bg-white/10 p-1 shadow-[inset_0_1px_2px_rgb(0_0_0_/0.04)]"
            role="group"
            aria-label="BG / EN"
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white/20 shadow-sm ring-1 ring-white/20 transition-transform duration-300 ease-out ${
                locale === "en" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"
              }`}
            />
            <Link
              href={bgHref}
              hrefLang="bg"
              className={`relative z-10 flex flex-1 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                locale === "bg"
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              BG
            </Link>
            <Link
              href={enHref}
              hrefLang="en"
              className={`relative z-10 flex flex-1 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                locale === "en"
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">
              {open ? nav.closeMenu : nav.openMenu}
            </span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span
                className={`block h-0.5 w-5 origin-center bg-white transition-all duration-300 ease-out motion-reduce:transition-none ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block h-0.5 w-5 origin-center bg-white transition-all duration-300 ease-out motion-reduce:transition-none ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`grid md:hidden motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } transition-[grid-template-rows] duration-300 ease-out`}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            id="mobile-nav"
            inert={!open ? true : undefined}
            className={`border-t border-brand/20 bg-brand px-4 pb-4 pt-2 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {mobileNavKeys.map(({ href, key }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {nav[key]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
