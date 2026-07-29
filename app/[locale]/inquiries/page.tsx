import type { Metadata } from "next";
import { getChatInquiries } from "@/lib/chatInquiries";
import { isLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBulgarian = !isLocale(locale) || locale === "bg";

  return {
    title: isBulgarian ? "Запитвания от чата" : "Chat inquiries",
    description: isBulgarian
      ? "Въпроси и отговори от помощника на BG Green Yard."
      : "Questions and answers from the BG Green Yard assistant.",
  };
}

export default async function InquiriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const inquiries = await getChatInquiries();
  const isBulgarian = locale !== "en";

  const copy = isBulgarian
    ? {
        eyebrow: "Помощник на BG Green Yard",
        title: "Запитвания от чата",
        subtitle: "Вижте въпросите на посетителите и отговорите на нашия помощник.",
        question: "Въпрос",
        answer: "Отговор",
        empty: "Все още няма публикувани запитвания.",
      }
    : {
        eyebrow: "BG Green Yard assistant",
        title: "Chat inquiries",
        subtitle: "Browse visitor questions and answers from our assistant.",
        question: "Question",
        answer: "Answer",
        empty: "There are no published inquiries yet.",
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
            <div className="space-y-4">
              {inquiries.map((inquiry, index) => (
                <article key={`${inquiry.createdAt}-${index}`} className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{copy.question}</p>
                  <p className="mt-2 whitespace-pre-wrap text-base font-semibold text-foreground">{inquiry.question}</p>
                  <p className="mt-5 border-t border-black/5 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{copy.answer}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted">{inquiry.answer}</p>
                </article>
              ))}
            </div>
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
