import type { Metadata } from "next";
import { PRODUCTION_SITE_ORIGIN, ogImageAbsoluteUrl } from "@/lib/site";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_SITE_ORIGIN),
  applicationName: "BG Green Yard",
  title: {
    default: "BG Green Yard",
    template: "%s | BG Green Yard",
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  description:
    "Озеленяване, поддръжка на градини и поливни системи в София.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "BG Green Yard",
    title: "BG Green Yard",
    description:
      "Озеленяване, поддръжка на градини и поливни системи в София.",
    images: [
      {
        url: ogImageAbsoluteUrl,
        width: 1024,
        height: 686,
        alt: "BG Green Yard",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BG Green Yard",
    description:
      "Озеленяване, поддръжка на градини и поливни системи в София.",
    images: [ogImageAbsoluteUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BG Green Yard",
    alternateName: "BG Green Yard",
    url: PRODUCTION_SITE_ORIGIN,
    inLanguage: ["bg", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${PRODUCTION_SITE_ORIGIN}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="bg"
      suppressHydrationWarning
      className="h-full"
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Google Tag Manager (Head) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LQMY7RMSV1"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LQMY7RMSV1');`}
        </Script>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={PRODUCTION_SITE_ORIGIN} />
      </head>
      <body
        className="min-h-full bg-background text-foreground antialiased"
      >
        {children}
      </body>
    </html>
  );
}
