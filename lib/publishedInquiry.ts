import type { ChatInquiry } from "./chatInquiries";
import { priceQuestionResponse } from "./chatPricing";

/** Preserve the answer actually sent by chat; apply the shared current price policy to legacy records. */
export function publishedInquiry(inquiry: ChatInquiry): ChatInquiry & { showCalculator: boolean } {
  const price = priceQuestionResponse(inquiry.question);
  return { ...inquiry, answer: price?.response ?? inquiry.answer, showCalculator: price !== null };
}
