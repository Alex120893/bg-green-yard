import type { Metadata } from "next";
import { InquiriesList } from "@/components/InquiriesList";
import { getChatInquiries } from "@/lib/chatInquiries";
import { searchPlantDatabase } from "@/lib/plantDatabase";
import { isLocale } from "@/lib/i18n";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBulgarian = !isLocale(locale) || locale === "bg";

  return {
    title: isBulgarian
      ? "Въпроси за градини и растения | BG Green Yard"
      : "Garden and plant questions | BG Green Yard",
    description: isBulgarian
      ? "Практични въпроси и отговори за градини, растения, тревни площи и поливни системи от BG Green Yard."
      : "Practical questions and answers about gardens, plants, lawns, and irrigation systems from BG Green Yard.",
    alternates: { canonical: `${PRODUCTION_SITE_ORIGIN}/${locale}/inquiries` },
  };
}

export default async function InquiriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const savedInquiries = await getChatInquiries();
  const inquiries = savedInquiries.map((inquiry) => ({
    ...inquiry,
    answer: searchPlantDatabase(inquiry.question).response,
  }));
  const isBulgarian = locale !== "en";

  const copy = isBulgarian
    ? {
        eyebrow: "Съвети от BG Green Yard",
        title: "Въпроси за градини и растения",
        subtitle: "Практични въпроси и отговори за растения, тревни площи и поливни системи.",
        question: "Въпрос",
        answer: "Отговор",
        empty: "Все още няма публикувани запитвания.",
        searchLabel: "Търсене в запитванията",
        searchPlaceholder: "Търсете по въпрос или отговор...",
        noResults: "Няма намерени запитвания.",
      }
    : {
        eyebrow: "BG Green Yard assistant",
        title: "Chat inquiries",
        subtitle: "Browse visitor questions and answers from our assistant.",
        question: "Question",
        answer: "Answer",
        empty: "There are no published inquiries yet.",
        searchLabel: "Search inquiries",
        searchPlaceholder: "Search questions or answers...",
        noResults: "No inquiries found.",
      };

  return (
    <main>
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{copy.subtitle}</p>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          {inquiries.length ? (
            <InquiriesList inquiries={inquiries} copy={copy} />
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center text-muted shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              {copy.empty}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
