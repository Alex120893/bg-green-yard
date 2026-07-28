"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/i18n";

const serviceValues = ["snow", "green", "irrigation", "other"] as const;

export function ContactForm({
  locale,
  contact,
  serviceOptions,
}: {
  locale: Locale;
  contact: Messages["contact"];
  serviceOptions: Messages["serviceOptions"];
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const service = String(data.get("service") ?? "").trim();
    const serviceLabel =
      service && service in serviceOptions
        ? serviceOptions[service as keyof typeof serviceOptions]
        : undefined;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          service: service || undefined,
          serviceLabel,
          message: String(data.get("message") ?? "").trim() || undefined,
          locale,
        }),
      });

      if (!res.ok) {
        throw new Error("send_failed");
      }

      setSent(true);
      form.reset();
    } catch {
      setError(contact.formError);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div
        className="rounded-2xl border border-brand-soft bg-brand-soft/40 px-6 py-10 text-center"
        role="status"
      >
        <p className="text-lg font-medium text-brand-dark">{contact.formSuccess}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
    className="grid gap-5 rounded-2xl border border-border bg-gradient-to-b from-white to-slate-50/70 p-6 shadow-[0_12px_30px_rgb(15_23_42_/0.06)] md:p-8"
      noValidate
    >
      {error && (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      )}
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {contact.formName} *
        </label>
        <input
          id="name"
          name="name"
          required
          disabled={sending}
          autoComplete="name"
          className="rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2 disabled:opacity-60"
        />
      </div>
      <div className="grid gap-2 md:grid-cols-2 md:gap-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {contact.formEmail} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={sending}
            autoComplete="email"
            className="rounded-xl border border-border px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2 disabled:opacity-60"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            {contact.formPhone} *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            disabled={sending}
            autoComplete="tel"
            className="rounded-xl border border-border px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2 disabled:opacity-60"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="service" className="text-sm font-medium text-foreground">
          {contact.formService}
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          disabled={sending}
          className="rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2 disabled:opacity-60"
        >
          <option value="" disabled>
            {contact.formServicePlaceholder}
          </option>
          {serviceValues.map((v) => (
            <option key={v} value={v}>
              {serviceOptions[v]}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {contact.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          disabled={sending}
          className="resize-y rounded-xl border border-border px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2 disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="lovable-button-primary mt-2 inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? contact.formSending : contact.formSubmit}
      </button>
    </form>
  );
}
