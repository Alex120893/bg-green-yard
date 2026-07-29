"use client";

import { useMemo, useState } from "react";
import type { ChatInquiry } from "@/lib/chatInquiries";

type Copy = {
  question: string;
  answer: string;
  searchLabel: string;
  searchPlaceholder: string;
  noResults: string;
};

export function InquiriesList({ inquiries, copy }: { inquiries: ChatInquiry[]; copy: Copy }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return inquiries;

    return inquiries.filter(({ question, answer }) => `${question} ${answer}`.toLocaleLowerCase().includes(term));
  }, [inquiries, query]);

  return (
    <>
      <label className="mb-6 block">
        <span className="sr-only">{copy.searchLabel}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-foreground shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>

      {filtered.length ? (
        <div className="space-y-4">
          {filtered.map((inquiry, index) => (
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
          {copy.noResults}
        </div>
      )}
    </>
  );
}
