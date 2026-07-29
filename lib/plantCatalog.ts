import type { PlantSearchResult } from "./plantDatabase";

type GbifMatch = {
  matchType?: string;
  confidence?: number;
  scientificName?: string;
  canonicalName?: string;
  kingdom?: string;
  family?: string;
  rank?: string;
};

const CATALOG_ENDPOINT = "https://api.gbif.org/v1/species/match";

export async function searchPlantCatalog(query: string): Promise<PlantSearchResult | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2_500);

  try {
    const response = await fetch(`${CATALOG_ENDPOINT}?name=${encodeURIComponent(query.trim())}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 86_400 },
    });

    if (!response.ok) return null;

    const match = (await response.json()) as GbifMatch;
    if (match.matchType !== "EXACT" || !match.scientificName || (match.confidence ?? 0) < 90) {
      return null;
    }

    const taxonomy = [match.rank, match.family ? `семейство ${match.family}` : null]
      .filter(Boolean)
      .join(", ");

    return {
      response: `Намерих растението в ботаническия каталог: **${match.canonicalName ?? match.scientificName}** (${match.scientificName})${taxonomy ? ` — ${taxonomy}` : ""}. За конкретни насоки за грижа ни изпратете снимка или се свържете с нашия екип.`,
      needsContact: true,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
