/** Public form schema only. Never import internal pricing in a client component. */
export const services = [
  { id: "subscription", label: "Абонаментна поддръжка на двор и градина" },
  { id: "mowing", label: "Косене на трева със събиране" },
  { id: "hedge", label: "Подрязване и окопаване на жив плет" },
  { id: "shrubs", label: "Подрязване и окопаване на храстови групи" },
  { id: "cleaning", label: "Почистване на запустял терен" },
  { id: "weeding", label: "Плевене" },
  { id: "lawn", label: "Грижа за тревен килим" },
  { id: "planting", label: "Засаждане" },
  { id: "irrigation", label: "Изграждане на поливна система" },
] as const;
export type ServiceKey = typeof services[number]["id"];
export const areaServices = ["mowing", "shrubs", "cleaning", "weeding", "lawn", "irrigation"];
export const initialGardenInput = {
  service: "subscription", yardArea: "", workArea: "", hedgeLength: "", plantCount: "", bedArea: "",
  plantingType: "shrubs", condition: "", access: "", frequency: "weekly", waste: "", wasteVolume: "", lawn: [] as string[], promo: false,
};
export type EstimateInput = typeof initialGardenInput;
export const conditionLabels: Record<string, string> = { standard: "Поддържан", high: "Нужда от интензивна грижа / висока трева", overgrown: "Запустял / силно обрасъл" };
export const frequencyLabels: Record<string, string> = { weekly: "Всяка седмица", fortnightly: "На две седмици", monthly: "Веднъж месечно" };
export function numberValue(value: string) { return Number(value.trim().replace(",", ".")); }
export function validateGardenInput(value: unknown): { input?: EstimateInput; errors: string[] } {
  const errors: string[] = [];
  if (!value || typeof value !== "object" || Array.isArray(value)) return { errors: ["Невалидни данни за градината."] };
  const v = value as Record<string, unknown>;
  const input = { ...initialGardenInput };
  for (const key of Object.keys(initialGardenInput) as (keyof EstimateInput)[]) {
    if (key === "lawn") { input.lawn = Array.isArray(v.lawn) && v.lawn.every(k => typeof k === "string") ? v.lawn : []; }
    else if (key === "promo") input.promo = v.promo === true;
    else input[key] = typeof v[key] === "string" ? v[key].trim() : "";
  }
  function numeric(key: keyof EstimateInput, label: string, allowZero = false, integer = false) {
    const raw = input[key]; const n = typeof raw === "string" ? numberValue(raw) : NaN;
    if (typeof raw !== "string" || !/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw) || !Number.isFinite(n) || n > 1000000 || (allowZero ? n < 0 : n < 0.01) || (integer && !Number.isInteger(n))) errors.push(`Въведете валидна стойност: ${label}${allowZero ? " (0, ако няма)" : " (над 0)"}.`);
    return n;
  }
  if (!services.some(s => s.id === input.service)) errors.push("Изберете услуга.");
  const yard = numeric("yardArea", "обща площ на двора в м²");
  if (areaServices.includes(input.service)) {
    if (numeric("workArea", "площ за избраната работа в м²") > yard) errors.push("Площта за работа не може да надвишава общата площ на двора.");
  }
  if (input.service === "subscription") {
    numeric("plantCount", "брой налични растения/храсти", true, true);
    numeric("hedgeLength", "дължина на живия плет в л.м", true);
    if (numeric("bedArea", "цветни лехи в м²", true) > yard) errors.push("Цветните лехи не може да надвишават площта на двора.");
    if (!Object.hasOwn(frequencyLabels, input.frequency)) errors.push("Изберете честота на посещенията.");
  }
  if (input.service === "hedge") numeric("hedgeLength", "дължина на живия плет в л.м");
  if (input.service === "planting") {
    numeric("plantCount", "брой растения", false, true);
    if (!["shrubs", "smallTrees"].includes(input.plantingType)) errors.push("Изберете вид растения.");
  }
  if (!Object.hasOwn(conditionLabels, input.condition)) errors.push("Изберете състояние на терена.");
  if (!["easy", "difficult"].includes(input.access)) errors.push("Изберете достъп до терена.");
  if (!["yes", "no"].includes(input.waste)) errors.push("Уточнете дали желаете извозване.");
  if (input.waste === "yes") numeric("wasteVolume", "обем за извозване в м³");
  if (input.service === "lawn" && (!input.lawn.length || input.lawn.some(k => !["aeration", "overseeding", "fertilizing"].includes(k)))) errors.push("Изберете поне една грижа за тревата.");
  return { input: errors.length ? undefined : input, errors };
}
