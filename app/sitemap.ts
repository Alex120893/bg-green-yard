import type { MetadataRoute } from "next";
import { locales } from "../lib/i18n";
import { posts, projects } from "../lib/seo-pages";
import { PRODUCTION_SITE_ORIGIN } from "../lib/site";

// Only pair pages that actually exist in both languages. The calculator and
// Bulgarian SEO content do not have English equivalents.
const translatedPaths = [
  "",
  "/about",
  "/services",
  "/gallery",
  "/contact",
  "/plant-care",
  "/inquiries",
];

const bulgarianPaths = [
  "/calculator",
  "/ozelenyavane-sofia",
  "/lawn-care",
  "/poddruzhka-na-gradini-sofia",
  "/polivni-sistemi-sofia",
  "/ozelenyavane-na-dvorove-sofia",
  "/trevni-ploshti-sofia",
  "/izgrazhdane-na-gradini-sofia",
  "/snegopochistvane-sofia",
  "/gradinsko-osvetlenie-sofia",
  "/proekti",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const translatedPages = translatedPaths.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [
        locale,
        `${PRODUCTION_SITE_ORIGIN}/${locale}${path}`,
      ]),
    );

    return locales.map((locale) => ({
      url: languages[locale],
      alternates: { languages },
    }));
  });

  const bulgarianPages = [
    ...bulgarianPaths,
    ...projects.map(({ slug }) => `/proekti/${slug}`),
    ...posts.map(({ slug }) => `/blog/${slug}`),
  ].map((path) => ({ url: `${PRODUCTION_SITE_ORIGIN}/bg${path}` }));

  // There is no reliable per-page modification date in the content model.
  // Omit lastModified rather than claim that every build changes every page.
  return [...translatedPages, ...bulgarianPages];
}
