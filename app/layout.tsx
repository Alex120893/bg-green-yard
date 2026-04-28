import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});
//ааа
const socialImage = "/logo-removebg-preview.png";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
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
        url: socialImage,
        width: 512,
        height: 512,
        alt: "BG Green Yard",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BG Green Yard",
    description:
      "Озеленяване, поддръжка на градини и поливни системи в София.",
    images: [socialImage],
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
