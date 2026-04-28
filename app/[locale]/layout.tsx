import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { isLocale, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  const locale = isLocale(loc) ? loc : "bg";
  const t = getMessages(locale);
  const ogImage = "/logo-removebg-preview.png";

  return {
    title: t.meta.defaultTitle,
    description: t.meta.defaultDesc,
    openGraph: {
      title: t.meta.defaultTitle,
      description: t.meta.defaultDesc,
      locale: locale === "bg" ? "bg_BG" : "en_US",
      siteName: t.meta.siteName,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: t.meta.siteName,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.defaultTitle,
      description: t.meta.defaultDesc,
      images: [ogImage],
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
