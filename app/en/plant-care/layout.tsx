import type { Metadata } from "next";
import { PRODUCTION_SITE_ORIGIN, ogImageAbsoluteUrl } from "@/lib/site";

const title = "Garden and Lawn Care | BG Green Yard";
const description = "Practical guidance for plant, garden, and lawn care.";
const url = `${PRODUCTION_SITE_ORIGIN}/en/plant-care`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title, description, images: [ogImageAbsoluteUrl] },
};

export default function PlantCareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
