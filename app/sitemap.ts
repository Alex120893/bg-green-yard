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
    "/bg/poddruzhka-na-gradini-sofia",
    "/bg/polivni-sistemi-sofia",
    "/bg/ozelenyavane-na-dvorove-sofia",
    "/bg/trevni-ploshti-sofia",
    "/bg/izgrazhdane-na-gradini-sofia",
    "/bg/snegopochistvane-sofia",
    "/bg/proekti",
    "/bg/proekti/aura-1",
    "/bg/proekti/prima",
    "/bg/proekti/synergy-tower",
    "/bg/blog",
    "/bg/blog/grizha-za-trevata-prez-lyatoto",
    "/bg/blog/kolko-chesto-da-kosim-trevata",
    "/bg/blog/podgotovka-na-gradina-za-zimata",
    "/bg/blog/koga-da-zasazhdame-tui",
    "/bg/blog/kak-raboti-avtomatichna-polivna-sistema",
    "/bg/blog/treven-chim-ili-zasyavane",
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
