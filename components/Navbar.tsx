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
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/72 shadow-[0_10px_28px_rgb(15_23_42_/0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 md:gap-5 md:px-6 md:py-5">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-removebg-preview.png"
            alt="BG Green Yard"
            width={200}
            height={200}
            className="h-[4.5rem] w-auto sm:h-24 md:h-28 lg:h-32"
            priority
            sizes="(max-width: 768px) 180px, 220px"
          />
          <span className="sr-only">BG Green Yard</span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex" aria-label="Main">
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
                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
                  active
                    ? "border-brand/25 bg-brand-soft text-brand-dark"
                    : "border-transparent text-muted hover:border-border hover:bg-white/90 hover:text-foreground"
                }`}
              >
                {nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="relative flex h-10 w-[6.75rem] shrink-0 items-stretch rounded-full border border-white/70 bg-white/80 p-1 shadow-[inset_0_1px_2px_rgb(15_23_42_/0.05),0_8px_16px_rgb(15_23_42_/0.04)]"
            role="group"
            aria-label="BG / EN"
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-emerald-50 to-cyan-50 shadow-sm ring-1 ring-black/[0.05] transition-transform duration-300 ease-out will-change-transform ${
                locale === "en" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"
              }`}
            />
            <Link
              href={bgHref}
              hrefLang="bg"
              className={`relative z-10 flex flex-1 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                locale === "bg"
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              BG
            </Link>
            <Link
              href={enHref}
              hrefLang="en"
              className={`relative z-10 flex flex-1 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                locale === "en"
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              EN
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/85 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">
              {open ? nav.closeMenu : nav.openMenu}
            </span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span
                className={`block h-0.5 w-5 origin-center bg-foreground transition-all duration-300 ease-out motion-reduce:transition-none ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block h-0.5 w-5 origin-center bg-foreground transition-all duration-300 ease-out motion-reduce:transition-none ${open ? "-translate-y-2 -rotate-45" : ""}`}
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
            className={`border-t border-white/70 bg-gradient-to-b from-white/90 to-slate-50/90 px-4 pb-4 pt-2 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {navKeys.map(({ href, key }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-white"
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
//bbb