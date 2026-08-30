import type { Metadata } from "next";
import { PRODUCTION_SITE_ORIGIN, ogImageAbsoluteUrl } from "@/lib/site";

const title = "Грижа за растения и тревна площ | BG Green Yard";
const description = "Практични насоки за грижа за растения, градина и тревна площ.";
const url = `${PRODUCTION_SITE_ORIGIN}/bg/plant-care`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title, description, images: [ogImageAbsoluteUrl] },
};

export default function PlantCareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
