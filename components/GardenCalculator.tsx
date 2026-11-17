"use client";
import { useRef, useState } from "react";
import { areaServices, conditionLabels, frequencyLabels, initialGardenInput, services, validateGardenInput, type EstimateInput } from "@/lib/gardenFields";

const fieldClass = "mt-2 block w-full min-w-0 rounded-xl border border-brand/25 bg-white px-3 py-3 text-base text-foreground";
export function GardenCalculator({ promo = false }: { promo?: boolean }) {
  const [input, setInput] = useState<EstimateInput>({ ...initialGardenInput, promo });
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", location: "", message: "" });
  const feedback = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  const subscription = input.service === "subscription";
  function update<K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) {
    setInput(prev => key === "service" ? { ...initialGardenInput, promo: prev.promo, service: value as string, yardArea: prev.yardArea } : { ...prev, [key]: value });
    setErrors([]);
  }
  function focusFeedback() {
    requestAnimationFrame(() => { feedback.current?.focus({ preventScroll: true }); feedback.current?.scrollIntoView({ behavior: "smooth", block: "start" }); });
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const issues = validateGardenInput(input).errors;
    if (!contact.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()) || !/^[+\d\s().-]{6,30}$/.test(contact.phone.trim()) || !contact.location.trim()) issues.push("Попълнете име, валиден имейл, телефон и местоположение на обекта.");
    setErrors(issues);
    if (issues.length) { focusFeedback(); return; }
    sending.current = true; setStatus("sending");
    try {
      const response = await fetch("/api/garden-inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...contact, garden: input }) });
      const body = await response.json();
      if (!response.ok || body.ok !== true) throw new Error(typeof body.error === "string" ? body.error : "Изпращането не успя. Опитайте отново.");
      setStatus("sent");
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "Изпращането не успя. Опитайте отново."]); setStatus("idle");
    } finally { sending.current = false; focusFeedback(); }
  }
  const quantityField = (key: "yardArea" | "workArea" | "hedgeLength" | "plantCount" | "bedArea" | "wasteVolume", label: string, hint?: string) => <label className="block min-w-0 text-sm font-semibold" htmlFor={`calc-${key}`}>{label}
    <input id={`calc-${key}`} className={fieldClass} type="text" inputMode={key === "plantCount" ? "numeric" : "decimal"} value={input[key]} onChange={e => update(key, e.target.value)} required aria-describedby={hint ? `help-${key}` : undefined} />
    {hint && <span id={`help-${key}`} className="mt-2 block text-xs font-normal leading-relaxed text-muted">{hint}</span>}
  </label>;
  return <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
    <form onSubmit={submit} noValidate className="min-w-0 rounded-3xl border border-brand/15 bg-white/80 p-5 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold">Разкажете ни за Вашия двор</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Ще подготвим индивидуално предложение. Калкулацията се прави вътрешно и не показва сума на тази страница.</p>
      <div ref={feedback} tabIndex={-1} className="scroll-mt-40" aria-live="polite">
        {status === "sent" && <div role="status" className="mt-5 rounded-xl border border-brand/20 bg-brand-soft p-5"><h3 className="text-xl font-bold">Заявката Ви е получена!</h3><p className="mt-3">BG GREEN YARD ще се свърже с Вас за уточняване на обекта и персонална оферта.</p></div>}
        {errors.length > 0 && <div role="alert" className="mt-5 rounded-xl border border-amber-700/30 bg-amber-50 p-4 text-sm text-amber-950"><p className="font-bold">Моля, проверете данните:</p><ul className="mt-2 list-disc space-y-2 pl-5">{errors.map(error => <li key={error}>{error}</li>)}</ul></div>}
      </div>
      {status !== "sent" && <fieldset disabled={status === "sending"} className="mt-6 min-w-0 space-y-5 disabled:opacity-60">
        <legend className="sr-only">Данни за обекта и контакти</legend>
        <label className="block text-sm font-semibold" htmlFor="calc-service">Вид услуга
          <select id="calc-service" className={fieldClass} value={input.service} onChange={e => update("service", e.target.value)}>{services.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
        </label>
        {quantityField("yardArea", "Обща площ на двора (м²)", "Целият двор, включително растения, лехи и алеи — не само газонът.")}
        {areaServices.includes(input.service) && quantityField("workArea", input.service === "mowing" || input.service === "lawn" ? "Площ на тревата за избраната работа (м²)" : "Площ само за избраната работа (м²)", "Посочете отделно реалната площ за услугата. Не приемаме целия двор за газон.")}
        {(subscription || input.service === "hedge") && quantityField("hedgeLength", "Дължина на живия плет (л.м)", subscription ? "Въведете 0, ако няма. За необичайна височина/ширина добавете бележка." : "Включва подрязване и окопаване. Посочете височина/ширина в бележката.")}
        {(subscription || input.service === "planting") && quantityField("plantCount", subscription ? "Брой налични растения и храсти" : "Брой растения за засаждане", subscription ? "Без растенията в живия плет и цветните лехи, за да няма двойно броене. 0, ако няма." : "Цял брой; растенията и доставката се уточняват отделно.")}
        {subscription && quantityField("bedArea", "Обща площ на цветните лехи (м²)", "Въведете 0, ако няма.")}
        {input.service === "planting" && <label className="block text-sm font-semibold" htmlFor="calc-plantingType">Вид растения<select id="calc-plantingType" className={fieldClass} value={input.plantingType} onChange={e => update("plantingType", e.target.value)}><option value="shrubs">Единични храсти</option><option value="smallTrees">Дребноразмерни дървета</option></select></label>}
        <div className="grid min-w-0 gap-5 sm:grid-cols-2">
          <label className="min-w-0 text-sm font-semibold" htmlFor="calc-condition">Състояние<select id="calc-condition" className={fieldClass} value={input.condition} onChange={e => update("condition", e.target.value)} required><option value="">Изберете</option>{Object.entries(conditionLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
          <label className="min-w-0 text-sm font-semibold" htmlFor="calc-access">Достъп<select id="calc-access" className={fieldClass} value={input.access} onChange={e => update("access", e.target.value)} required><option value="">Изберете</option><option value="easy">Лесен / равен терен</option><option value="difficult">Наклон / стъпала / тесен вход</option></select></label>
        </div>
        {subscription && <label className="block text-sm font-semibold" htmlFor="calc-frequency">Честота на посещенията<select id="calc-frequency" className={fieldClass} value={input.frequency} onChange={e => update("frequency", e.target.value)}>{Object.entries(frequencyLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>}
        {input.service === "lawn" && <fieldset className="min-w-0 rounded-xl border border-brand/20 p-4"><legend className="px-1 text-sm font-semibold">Грижи — изберете поне една</legend>{[["aeration", "Аериране"], ["overseeding", "Подсяване с подготовка, почва и торене"], ["fertilizing", "Пролетно торене"]].map(([id, label]) => <label className="flex items-center gap-3 py-2 text-sm" key={id}><input type="checkbox" className="h-5 w-5 shrink-0 accent-brand" checked={input.lawn.includes(id)} onChange={e => update("lawn", e.target.checked ? [...input.lawn, id] : input.lawn.filter(k => k !== id))} />{label}</label>)}</fieldset>}
        <label className="block text-sm font-semibold" htmlFor="calc-waste">Да се включи ли извозване?<select id="calc-waste" className={fieldClass} value={input.waste} onChange={e => update("waste", e.target.value)} required><option value="">Изберете</option><option value="no">Не</option><option value="yes">Да</option></select></label>
        {input.waste === "yes" && quantityField("wasteVolume", subscription ? "Общ обем за извозване на месец (м³)" : "Обем за извозване (м³)", "Приблизителен обем на растителните отпадъци; уточняваме го преди офертата.")}
        <h3 className="border-t border-brand/15 pt-5 text-lg font-bold">Как да се свържем с Вас?</h3>
        {([["name", "Име и фамилия", "text", "name"], ["email", "Имейл", "email", "email"], ["phone", "Телефон", "tel", "tel"], ["location", "Местоположение / квартал на обекта", "text", "street-address"]] as const).map(([key, label, type, autoComplete]) => <label className="block text-sm font-semibold" key={key} htmlFor={`calc-${key}`}>{label}<input id={`calc-${key}`} type={type} autoComplete={autoComplete} className={fieldClass} value={contact[key]} maxLength={key === "name" ? 120 : key === "phone" ? 30 : key === "location" ? 300 : 254} onChange={e => setContact(prev => ({ ...prev, [key]: e.target.value }))} required /></label>)}
        <label className="block text-sm font-semibold" htmlFor="calc-message">Допълнителни бележки (незадължително)<textarea id="calc-message" className={fieldClass} rows={4} maxLength={3000} value={contact.message} onChange={e => setContact(prev => ({ ...prev, message: e.target.value }))} placeholder="Вид и размер на растенията, височина на плета, особености на терена…" /></label>
        <label className="flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-brand" checked={input.promo} onChange={e => update("promo", e.target.checked)} /><span>Желая отстъпката за първа заявка за поддръжка. Приложимостта се потвърждава от BG GREEN YARD; за абонамент се отнася само за първия месец, без извозване и материали.</span></label>
        <p className="text-xs leading-relaxed text-muted">С изпращането предоставяте данните си за контакт, за да обработим тази заявка. Точните дейности, цена и приложим ДДС се уточняват в индивидуалната оферта след оглед или разговор.</p>
        <button className="garden-button w-full !text-base" type="submit" disabled={status === "sending"}>{status === "sending" ? "Изпращане…" : "Поискайте оферта"}</button>
      </fieldset>}
    </form>
    <aside className="min-w-0 rounded-3xl border border-brand/20 bg-surface p-5 sm:p-8">
      <p className="garden-eyebrow">Цялостна грижа</p><h2 className="mt-3 text-2xl font-bold">Дворът е повече от тревна площ</h2>
      <p className="mt-4 leading-relaxed text-muted">Абонаментната поддръжка обхваща целия двор: редовно косене, обкантване, текущо плевене и обичайна поддръжка на наличните растения, храсти и жив плет.</p>
      <p className="mt-4 leading-relaxed text-muted">Голям брой растения, дълъг жив плет, обширни цветни лехи, честотата и достъпът до терена участват в индивидуалната оценка.</p>
      <h3 className="mt-6 font-bold">Какво следва?</h3><ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed"><li>Попълвате данните за двора и желаните услуги.</li><li>Изпращате заявката директно до BG GREEN YARD.</li><li>Свързваме се с Вас за уточнение и персонална оферта.</li></ol>
      <p className="mt-6 border-t border-brand/15 pt-4 text-sm text-muted">На тази страница не се показва автоматична цена. За озеленяване, поливни системи и сложни работи точната оферта се изготвя след оглед.</p>
    </aside>
  </div>;
}
