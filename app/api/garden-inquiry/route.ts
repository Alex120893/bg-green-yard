import { handleGardenInquiry } from "@/lib/gardenInquiry";
import { sendContactEmail } from "@/lib/email";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleGardenInquiry(request, sendContactEmail);
}
