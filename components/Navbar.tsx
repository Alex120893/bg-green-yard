"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RadioEnergyPlayer } from "@/components/RadioEnergyPlayer";
import { DiscountGiftPopup } from "@/components/DiscountGiftPopup";
import type { Locale, Messages } from "@/lib/i18n";

const landscapingLinks = [
  ["/ozelenyavane-sofia", "Озеленяване"],
  ["/poddruzhka-na-gradini-sofia", "Поддръжка на градини"],
  ["/trevni-ploshti-sofia", "Тревни площи"],
  ["/polivni-sistemi-sofia", "Поливни системи"],
  ["/ozelenyavane-na-dvorove-sofia", "Озеленяване на дворове"],
  ["/izgrazhdane-na-gradini-sofia", "Изграждане на градини"],
  ["/snegopochistvane-sofia", "Снегопочистване"],
  ["/proekti", "Проекти"],
] as const;

const bgPrimaryLinks = [["", "Начало"], ["/about", "За нас"], ["/blog", "Блог"], ["/inquiries", "Въпроси"], ["/contact", "Контакти"]] as const;
const navKeys = [{ href: "", key: "home" as const }, { href: "/about", key: "about" as const }, { href: "/services", key: "services" as const }, { href: "/gallery", key: "gallery" as const }, { href: "/contact", key: "contact" as const }];

export function Navbar({ locale, nav }: { locale: Locale; nav: Messages["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!servicesMenuRef.current?.contains(event.target as Node)) setServicesOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
  const pathSuffix = rest === "/" ? "" : rest;
  const bgHref = `/bg${pathSuffix}`;
  const enHref = `/en${pathSuffix}`;
  const servicesActive = landscapingLinks.some(([href]) => pathname === `/bg${href}` || pathname.startsWith(`/bg${href}/`));

  return <>
  {locale === "bg" && <DiscountGiftPopup />}
  <header className="sticky top-0 z-50 border-b border-brand/20 bg-brand/95 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
      <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90" onClick={() => setOpen(false)}>
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md"><Image src="/logo-removebg-preview.png" alt="BG Green Yard" width={40} height={40} className="h-10 w-10 object-contain" priority /></div>
        <span className="hidden whitespace-nowrap text-base font-bold tracking-tight text-white sm:block">BG Green Yard</span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
        {locale === "bg" ? <>
          {bgPrimaryLinks.slice(0, 1).map(([href, label]) => <DesktopLink key={href} href={`/bg${href}`} label={label} active={pathname === "/bg"} />)}
          <div ref={servicesMenuRef} className="relative">
            <button type="button" aria-expanded={servicesOpen} aria-haspopup="menu" onClick={() => setServicesOpen((value) => !value)} className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-all ${servicesActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
              Озеленяване <Chevron open={servicesOpen} />
            </button>
            {servicesOpen && <div role="menu" className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-brand/10 bg-white p-2 shadow-xl">
              {landscapingLinks.map(([href, label]) => <Link role="menuitem" key={href} href={`/bg${href}`} onClick={() => setServicesOpen(false)} className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${pathname === `/bg${href}` ? "bg-brand-soft text-brand-dark" : "text-foreground hover:bg-surface"}`}>{label}</Link>)}
            </div>}
          </div>
          {bgPrimaryLinks.slice(1).map(([href, label]) => <DesktopLink key={href} href={`/bg${href}`} label={label} active={pathname === `/bg${href}` || pathname.startsWith(`/bg${href}/`)} />)}
        </> : navKeys.map(({ href, key }) => <DesktopLink key={key} href={`/${locale}${href}`} label={nav[key]} active={href === "" ? pathname === `/${locale}` : pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`)} />)}
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <div className="relative flex h-10 w-[6.75rem] shrink-0 items-stretch rounded-full border border-white/20 bg-white/10 p-1" role="group" aria-label="BG / EN">
          <span aria-hidden className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white/20 transition-transform ${locale === "en" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"}`} />
          <Link href={bgHref} hrefLang="bg" className={`relative z-10 flex flex-1 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wide ${locale === "bg" ? "text-white" : "text-white/60 hover:text-white"}`}>BG</Link>
          <Link href={enHref} hrefLang="en" className={`relative z-10 flex flex-1 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wide ${locale === "en" ? "text-white" : "text-white/60 hover:text-white"}`}>EN</Link>
        </div>
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}><span className="sr-only">{open ? nav.closeMenu : nav.openMenu}</span><span className="flex flex-col gap-1.5" aria-hidden><span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} /><span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} /><span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} /></span></button>
      </div>
    </div>
    <div className="border-t border-white/10 bg-brand-dark/20 px-4 py-1.5"><div className="mx-auto flex max-w-6xl justify-center md:justify-end"><RadioEnergyPlayer /></div></div>
    <div className={`grid md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid-template-rows] duration-300`} aria-hidden={!open}><div className="min-h-0 overflow-hidden"><nav id="mobile-nav" inert={!open ? true : undefined} className="border-t border-brand/20 bg-brand px-4 pb-4 pt-2"><div className="mx-auto flex max-w-6xl flex-col gap-1">
      {locale === "bg" ? <><MobileLink href="/bg" label="Начало" close={() => setOpen(false)} /><p className="px-3 pb-1 pt-3 text-xs font-bold uppercase tracking-widest text-white/60">Озеленяване</p>{landscapingLinks.map(([href, label]) => <MobileLink key={href} href={`/bg${href}`} label={label} close={() => setOpen(false)} />)}{bgPrimaryLinks.slice(1).map(([href, label]) => <MobileLink key={href} href={`/bg${href}`} label={label} close={() => setOpen(false)} />)}</> : navKeys.map(({ href, key }) => <MobileLink key={key} href={`/${locale}${href}`} label={nav[key]} close={() => setOpen(false)} />)}
    </div></nav></div></div>
  </header>
  </>;
}

function DesktopLink({ href, label, active }: { href: string; label: string; active: boolean }) { return <Link href={href} className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${active ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>{label}</Link>; }
function MobileLink({ href, label, close }: { href: string; label: string; close: () => void }) { return <Link href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10" onClick={close}>{label}</Link>; }
function Chevron({ open }: { open: boolean }) { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden><path d="m5 7.5 5 5 5-5" /></svg>; }
