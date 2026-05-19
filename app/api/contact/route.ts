import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const serviceValues = ["snow", "green", "irrigation", "other"] as const;

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  serviceLabel?: string;
  message?: string;
  locale?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const service = body.service?.trim() ?? "";
  const serviceLabel = body.serviceLabel?.trim() ?? "";
  const locale = body.locale?.trim() ?? "";

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (
    service &&
    !serviceValues.includes(service as (typeof serviceValues)[number])
  ) {
    return NextResponse.json({ error: "Invalid service." }, { status: 400 });
  }

  try {
    await sendContactEmail({
      name,
      email,
      phone,
      service: service || undefined,
      serviceLabel: serviceLabel || undefined,
      message: message || undefined,
      locale: locale || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
