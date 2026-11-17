export const services = [
  { id: "subscription", label: "Абонаментна поддръжка на двор и градина" },
  { id: "mowing", label: "Косене на трева" },
  { id: "hedge", label: "Оформяне на жив плет" },
  { id: "shrubs", label: "Оформяне на храсти" },
  { id: "cleaning", label: "Почистване на запустял терен" },
  { id: "weeding", label: "Плевене" },
  { id: "lawn", label: "Грижа за тревен килим" },
  { id: "planting", label: "Засаждане" },
  { id: "irrigation", label: "Изграждане на поливна система" },
] as const;
export const gardenLabels = {
  lawn: "Предимно тревна площ",
  light: "Трева с няколко лехи и храсти",
  mixed: "Смесена градина с жив плет, храсти и цветя",
  dense: "Градина с много насаждения",
};
export const conditionLabels = { standard: "Поддържана градина", high: "Нужда от повече грижи", overgrown: "Запустяла / силно обрасла градина" };
export const frequencyLabels = { once: "Еднократно посещение", weekly: "Всяка седмица", fortnightly: "На две седмици", monthly: "Веднъж месечно" };
export const initialGardenInput = { service: "subscription", yardArea: "", areaUnknown: false, gardenType: "", condition: "", frequency: "weekly", lawn: [] as string[], promo: false };
export type EstimateInput = typeof initialGardenInput;
export function numberValue(value: string) { return Number(value.trim().replace(",", ".")); }
export function validateGardenInput(value: unknown): { input?: EstimateInput; errors: string[] } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { errors: ["Невалидни данни за градината."] };
  const v = value as Record<string, unknown>;
  const input = { ...initialGardenInput };
  for (const key of ["service", "yardArea", "gardenType", "condition", "frequency"] as const) input[key] = typeof v[key] === "string" ? v[key].trim() : "";
  input.areaUnknown = v.areaUnknown === true;
  input.promo = v.promo === true;
  input.lawn = Array.isArray(v.lawn) && v.lawn.every(k => typeof k === "string") ? [...new Set(v.lawn)] : [];
  const errors: string[] = [];
  if (!services.some(s => s.id === input.service)) errors.push("Изберете услуга.");
  if (!input.areaUnknown && (!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(input.yardArea) || !Number.isFinite(numberValue(input.yardArea)) || numberValue(input.yardArea) < 1 || numberValue(input.yardArea) > 1000000)) errors.push("Посочете приблизителна обща площ от 1 до 1 000 000 м² или изберете „Не съм сигурен/на за площта“.");
  if (input.areaUnknown) input.yardArea = ""; // ignore stale or forged area when unknown
  if (!Object.hasOwn(gardenLabels, input.gardenType)) errors.push("Изберете тип градина.");
  if (!Object.hasOwn(conditionLabels, input.condition)) errors.push("Изберете състояние на градината.");
  if (!Object.hasOwn(frequencyLabels, input.frequency) || (input.service === "subscription" && input.frequency === "once")) errors.push("Изберете честота на посещенията.");
  if (input.service === "lawn" && (!input.lawn.length || input.lawn.some(k => !["aeration", "overseeding", "fertilizing"].includes(k)))) errors.push("Изберете поне една грижа за тревата.");
  return { input: errors.length ? undefined : input, errors };
}
