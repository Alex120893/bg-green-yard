import { estimateGarden, estimateText } from "./gardenEstimate";
import type { ContactEmailPayload } from "./email";

export async function handleGardenInquiry(request: Request, sendEmail: (payload: ContactEmailPayload) => Promise<unknown>): Promise<Response> {
  try {
    const raw = await request.text();
    if (raw.length > 16000) return Response.json({ error: "Заявката е твърде голяма." }, { status: 413 });
    let data: Record<string, unknown>;
    try { data = JSON.parse(raw); } catch { return Response.json({ error: "Невалидна заявка." }, { status: 400 }); }
    if (!data || typeof data !== "object" || Array.isArray(data)) return Response.json({ error: "Невалидна заявка." }, { status: 400 });
    const string = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
    const name = string("name"), email = string("email"), phone = string("phone"), location = string("location"), message = string("message");
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !/^[+\d\s().-]{6,30}$/.test(phone) || !location || location.length > 300 || message.length > 3000) {
      return Response.json({ error: "Попълнете име, валиден имейл, телефон и местоположение на обекта." }, { status: 400 });
    }
    // Never trust client-supplied sums, tariff names, or notification recipients.
    const estimate = estimateGarden(data.garden);
    if (estimate.kind === "invalid") return Response.json({ error: estimate.errors.join(" ") }, { status: 400 });
    await sendEmail({ name, email, phone, service: "green", serviceLabel: "Заявка от калкулатора", locale: "bg",
      message: [`Обект: ${location}`, `Бележка на клиента: ${message || "Няма"}`, "", estimateText(estimate)].join("\n") });
    // NO internal prices or parameters in response, URL, or confirmation.
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Заявката не е изпратена. Опитайте отново или се свържете с нас по телефона." }, { status: 500 });
  }
}
