import { MetadataRoute } from "next";

const siteUrl = "https://bg-greenyard.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/bg",
    "/bg/about",
    "/bg/services",
    "/bg/gallery",
    "/bg/contact",
    "/bg/ozelenyavane-sofia",
    "/bg/lawn-care",
    "/bg/plant-care",
    "/en",
    "/en/about",
    "/en/services",
    "/en/gallery",
    "/en/contact",
    "/en/plant-care",
  ];

  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/bg" || path === "/en" ? 1 : path === "/bg/ozelenyavane-sofia" ? 0.9 : 0.8,
  }));
}
