import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { isLocale, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { PRODUCTION_SITE_ORIGIN, ogImageAbsoluteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  const locale = isLocale(loc) ? loc : "bg";
  const t = getMessages(locale);
  const pageUrl = `${PRODUCTION_SITE_ORIGIN}/${locale}`;

  return {
    title: t.meta.defaultTitle,
    description: t.meta.defaultDesc,
    alternates: { canonical: pageUrl },
    openGraph: {
      url: pageUrl,
      title: t.meta.defaultTitle,
      description: t.meta.defaultDesc,
      locale: locale === "bg" ? "bg_BG" : "en_US",
      siteName: t.meta.siteName,
      type: "website",
      images: [
        {
          url: ogImageAbsoluteUrl,
          width: 1024,
          height: 686,
          alt: t.meta.siteName,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.defaultTitle,
      description: t.meta.defaultDesc,
      images: [ogImageAbsoluteUrl],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  if (!isLocale(loc)) notFound();

  return <SiteShell locale={loc as Locale}>{children}</SiteShell>;
}
