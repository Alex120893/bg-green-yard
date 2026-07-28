import { Resend } from "resend";

export type ContactEmailPayload = {
  name: string;
  email: string;
  phone: string;
  service?: string;
  serviceLabel?: string;
  message?: string;
  locale?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "BG Green Yard <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error(
      "Email is not configured (RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_EMAIL).",
    );
  }

  const resend = new Resend(apiKey);

  const { name, email, phone, service, serviceLabel, message, locale } = payload;
  const subject = `Ново запитване от ${name} — BG Green Yard`;

  const rows = [
    ["Име", name],
    ["Имейл", email],
    ["Телефон", phone],
    ...(serviceLabel || service ? [["Услуга", serviceLabel ?? service ?? "—"]] : []),
    ...(message?.trim() ? [["Съобщение", message.trim()]] : []),
    ...(locale ? [["Език", locale]] : []),
  ] as const;

  const html = `
    <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px; color: #4a7c23;">Ново запитване от сайта</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 520px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; font-weight: 600; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</td>
            <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #666;">Отговорете директно на ${escapeHtml(email)}</p>
    </div>
  `;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
