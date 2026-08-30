import type { Metadata } from "next";
import { PRODUCTION_SITE_ORIGIN, ogImageAbsoluteUrl } from "@/lib/site";

const title = "Грижа за тревната площ | BG Green Yard";
const description = "Практични насоки за грижа, косене, поливане и подхранване на тревни площи.";
const url = `${PRODUCTION_SITE_ORIGIN}/bg/lawn-care`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title, description, images: [ogImageAbsoluteUrl] },
};

export default function LawnCareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
