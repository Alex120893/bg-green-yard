import type { RateKey } from "./gardenPricing";
export const services: {id: string; label: string; rates: RateKey[]}[] = [
  { id: "subscription", label: "Абонаментна поддръжка на двор и градина", rates: ["subscription"] },
  { id: "mowing", label: "Косене на трева", rates: ["mowingStandard", "mowingHigh"] },
  { id: "hedge", label: "Оформяне на жив плет", rates: ["hedgeLow", "hedgeMedium", "hedgeHigh"] },
  { id: "shrubs", label: "Оформяне на храсти", rates: ["shrubs"] },
  { id: "cleaning", label: "Почистване на запустял терен", rates: ["cleaning"] },
  { id: "weeding", label: "Плевене", rates: ["weeding"] },
  { id: "planting", label: "Засаждане", rates: ["plantingFlowers", "plantingShrubs", "plantingHedge", "plantingTrees", "plantingPlants"] },
  { id: "snow", label: "Снегопочистване", rates: [] },
  { id: "lighting", label: "Градинско осветление", rates: [] },
  { id: "irrigation", label: "Поливна система", rates: ["irrigationAuto"] },
];
export const inspectionOnlyServices = ["snow", "lighting"];
export const variantLabels: Partial<Record<RateKey, string>> = {
  mowingStandard: "Поддържана трева", mowingHigh: "Висока / силно израснала трева",
  hedgeLow: "Височина до 1 м включително", hedgeMedium: "Височина над 1 до 2 м", hedgeHigh: "Височина над 2 м",
  plantingFlowers: "Цветя и цветни лехи", plantingShrubs: "Декоративни храсти", plantingHedge: "Жив плет", plantingTrees: "Декоративни дървета", plantingPlants: "Комбинирано засаждане",
  irrigationDrip: "Капково напояване", irrigationAuto: "Автоматична поливна система", irrigationSprinklers: "Система с разпръсквачи",
};
export const irrigationWorkLabels = {
  sprinklers: "Изграждане на система с разпръсквачи — за тревни площи",
  drip: "Изграждане на капкова система — за лехи, жив плет, храсти и дървета",
  combined: "Изграждане на комбинирана система",
  repair: "Ремонт и подмяна на компоненти — дюзи, разпръсквачи, клапани, тръби и програматор",
  spring: "Пускане и настройка на системата — пролетен старт",
  winter: "Зазимяване на системата — източване и продухване",
  maintenance: "Профилактика и регулиране",
};
export const gardenLabels = { lawn: "Предимно тревна площ", light: "Трева с няколко лехи и храсти", mixed: "Смесена градина с жив плет, храсти и цветя", dense: "Градина с много насаждения" };
export const conditionLabels = { standard: "Поддържана градина", high: "Нужда от повече грижи", overgrown: "Запустяла / силно обрасла градина" };
export const frequencyLabels = { once: "Еднократно посещение", weekly: "Всяка седмица", fortnightly: "На две седмици", monthly: "Веднъж месечно" };
export type FrequencyKey = keyof typeof frequencyLabels;
export const serviceFrequency: Record<string, readonly FrequencyKey[]> = {
  subscription: ["weekly", "fortnightly", "monthly"], mowing: ["once", "weekly", "fortnightly", "monthly"],
  weeding: ["once", "fortnightly", "monthly"], hedge: ["once", "monthly"], shrubs: ["once", "monthly"],
  cleaning: [], lawn: [], planting: [], irrigation: [],
};
export function frequencyOptions(service: string): readonly FrequencyKey[] { return Object.hasOwn(serviceFrequency, service) ? serviceFrequency[service] : []; }
export const initialGardenInput = { service: "subscription", variant: "subscription", yardArea: "", areaUnknown: false, quantity: "", volume: "unknown", gardenType: "", condition: "", frequency: "weekly", irrigationWork: "sprinklers", treeSize: "standard", supplies: false, promo: false };
export type EstimateInput = typeof initialGardenInput;
export function selectedRate(i: EstimateInput): RateKey | undefined {
  const service = services.find(s => s.id === i.service);
  return service?.rates.some(key => key === i.variant) ? i.variant as RateKey : undefined;
}
export function quantityKind(i: EstimateInput): "area" | "meters" | "plants" {
  if (i.service === "planting") return "plants";
  if (i.service === "hedge" || i.variant === "plantingHedge") return "meters";
  if (i.service === "shrubs" || i.variant === "plantingPlants") return "plants";
  return "area";
}
export function changeGardenService(input: EstimateInput, service: string): EstimateInput {
  return { ...initialGardenInput, promo: input.promo, service, variant: services.find(s => s.id === service)?.rates[0] ?? "", frequency: frequencyOptions(service)[0] ?? "" };
}
export function numberValue(value: string) { return Number(value.trim().replace(",", ".")); }
export function validateGardenInput(value: unknown): { input?: EstimateInput; errors: string[] } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { errors: ["Невалидни данни за услугата."] };
  const v = value as Record<string, unknown>, input = {...initialGardenInput};
  for (const key of ["service", "variant", "yardArea", "quantity", "volume", "gardenType", "condition", "frequency", "treeSize", "irrigationWork"] as const) input[key] = typeof v[key] === "string" ? v[key].trim() : "";
  input.areaUnknown = v.areaUnknown === true; input.promo = v.promo === true; input.supplies = v.supplies === true;
  const errors: string[] = [];
  if (!services.some(s => s.id === input.service)) errors.push("Изберете услуга.");
  if (!inspectionOnlyServices.includes(input.service) && !selectedRate(input)) errors.push("Изберете подходящ вид услуга / височина.");
  const numeric = (raw: string, integer = false) => /^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw) && Number.isFinite(numberValue(raw)) && numberValue(raw) >= 1 && numberValue(raw) <= 1000000 && (!integer || Number.isInteger(numberValue(raw)));
  const kind = quantityKind(input);
  if (inspectionOnlyServices.includes(input.service)) {
    input.variant = ""; input.yardArea = ""; input.quantity = ""; input.volume = ""; input.areaUnknown = false;
  } else if (input.service === "irrigation") {
    input.yardArea = ""; input.quantity = ""; input.volume = ""; input.areaUnknown = false;
    if (!Object.hasOwn(irrigationWorkLabels, input.irrigationWork)) errors.push("Изберете дейност за поливната система.");
  } else if (input.service === "planting") {
    input.yardArea = ""; input.quantity = ""; input.areaUnknown = false;
    if (!["small", "medium", "large", "unknown"].includes(input.volume)) errors.push("Изберете приблизителен обем на засаждането.");
    if (input.variant === "plantingTrees" && !["standard", "large"].includes(input.treeSize)) errors.push("Изберете размер на декоративните дървета.");
  } else if (kind === "area") {
    if (input.areaUnknown) input.yardArea = "";
    else if (!numeric(input.yardArea)) errors.push("Посочете приблизителна площ от 1 до 1 000 000 м² или изберете „Не съм сигурен/на — уточнете с мен“.");
    input.quantity = ""; input.volume = "";
  } else {
    input.yardArea = ""; input.areaUnknown = false;
    if (!["exact", "small", "medium", "large", "unknown"].includes(input.volume)) errors.push("Изберете приблизителен обем или „Не съм сигурен/на — уточнете с мен“.");
    if (input.volume === "exact" && !numeric(input.quantity, kind === "plants")) errors.push(kind === "plants" ? "Въведете положителен цял брой растения." : "Въведете положителна приблизителна дължина.");
    if (input.volume !== "exact") input.quantity = "";
  }
  if (input.service !== "irrigation") input.irrigationWork = "";
  if (input.service !== "planting") { input.supplies = false; input.treeSize = "standard"; }
  if (input.service === "subscription") {
    if (!Object.hasOwn(gardenLabels, input.gardenType)) errors.push("Изберете тип градина.");
    if (!Object.hasOwn(conditionLabels, input.condition)) errors.push("Изберете състояние на градината.");
  } else { input.gardenType = ""; input.condition = ""; }
  const allowed = frequencyOptions(input.service);
  if (!allowed.length) input.frequency = "";
  else if (!allowed.includes(input.frequency as FrequencyKey)) errors.push("Изберете подходяща честота за услугата.");
  return { input: errors.length ? undefined : input, errors };
}
