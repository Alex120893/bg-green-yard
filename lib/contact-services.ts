export const contactServiceValues = ["snow", "green", "irrigation", "lighting", "other"] as const;
export function isContactService(value: string): value is (typeof contactServiceValues)[number] {
  return contactServiceValues.some((service) => service === value);
}
