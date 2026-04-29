import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PRODUCTION_SITE_ORIGIN, ogImageAbsoluteUrl } from "@/lib/site";
import "./globals.css";

const sans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});
export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_SITE_ORIGIN),
  title: {
    default: "BG Green Yard",
    template: "%s | BG Green Yard",
  },
  description:
    "Озеленяване, поддръжка на градини и поливни системи в София.",
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
  return (
    <html
      lang="bg"
      suppressHydrationWarning
      className="h-full"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${sans.variable} min-h-full bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
