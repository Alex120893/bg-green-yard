"use client";

import { useState } from "react";
import type { Messages } from "@/lib/i18n";

const serviceValues = ["snow", "green", "irrigation", "other"] as const;

export function ContactForm({
  contact,
  serviceOptions,
}: {
  contact: Messages["contact"];
  serviceOptions: Messages["serviceOptions"];
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
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
      className="grid gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8"
      noValidate
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {contact.formName} *
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2"
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
            autoComplete="email"
            className="rounded-xl border border-border px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2"
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
            autoComplete="tel"
            className="rounded-xl border border-border px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2"
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
          className="rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2"
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
          className="resize-y rounded-xl border border-border px-4 py-3 text-sm outline-none ring-brand/30 transition focus:ring-2"
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        {contact.formSubmit}
      </button>
    </form>
  );
}
