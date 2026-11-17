"use client";
import { useRef, useState } from "react";
import { pricing } from "@/lib/gardenPricing";
import { conditionLabels, frequencyLabels, frequencyOptions, changeGardenService, gardenLabels, initialGardenInput, services, selectedRate, quantityKind, variantLabels, type EstimateInput } from "@/lib/gardenFields";
import { estimateGarden, formatEuro, serviceTariffText, tariffText, type Estimate } from "@/lib/gardenEstimate";

const fieldClass = "mt-2 block w-full min-w-0 rounded-xl border border-brand/25 bg-white px-3 py-3 text-base text-foreground";
export function GardenCalculator({ promo = false }: { promo?: boolean }) {
  const [input, setInput] = useState<EstimateInput>({ ...initialGardenInput, promo });
  const [result, setResult] = useState<Estimate | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", location: "", message: "" });
  const feedback = useRef<HTMLDivElement>(null);
  const inquiry = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  const selected = services.find(s => s.id === input.service)!;
  const kind = quantityKind(input);
  const rateKey = selectedRate(input);
  const minimum = rateKey ? pricing.rates[rateKey].minimum : 0;
  function update<K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) {
    setInput(prev => key === "service" ? changeGardenService(prev, value as string) : key === "variant" ? { ...prev, variant: value as string, yardArea: "", areaUnknown: false, quantity: "", volume: "unknown" } : { ...prev, [key]: value });
    setResult(null); setShowContact(false); setError("");
  }
  function focus(ref: React.RefObject<HTMLDivElement | null>) {
    requestAnimationFrame(() => { ref.current?.focus({ preventScroll: true }); ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }); });
  }
  function calculate(e: React.FormEvent) {
    e.preventDefault(); setResult(estimateGarden(input)); setShowContact(false); setError(""); focus(feedback);
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const current = estimateGarden(input);
    if (current.kind === "invalid") { setResult(current); focus(feedback); return; }
    if (!contact.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()) || !/^[+\d\s().-]{6,30}$/.test(contact.phone.trim()) || !contact.location.trim()) { setError("Попълнете име, валиден имейл, телефон и местоположение на обекта."); focus(inquiry); return; }
    sending.current = true; setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/garden-inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...contact, garden: input }) });
      const body = await response.json();
      if (!response.ok || body.ok !== true) throw new Error(typeof body.error === "string" ? body.error : "Изпращането не успя. Опитайте отново.");
      setStatus("sent");
    } catch { setError("Заявката не е изпратена. Опитайте отново или се свържете с нас по телефона."); setStatus("idle"); }
    finally { sending.current = false; focus(inquiry); }
  }
  return <div id="calculator-form" className="grid scroll-mt-40 items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
    <form onSubmit={calculate} noValidate className="min-w-0 rounded-3xl border border-brand/15 bg-white/80 p-5 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold">Разкажете ни за градината</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Изберете услуга и подходящ обем. За дължина и брой можете да изберете малък, среден или голям обем — без точни измервания.</p>
      <fieldset disabled={status !== "idle"} className="mt-6 min-w-0 space-y-5 disabled:opacity-60">
        <legend className="sr-only">Данни за ориентировъчната оценка</legend>
        <label className="block text-sm font-semibold" htmlFor="calc-service">Вид услуга<select id="calc-service" className={fieldClass} value={input.service} onChange={e => update("service", e.target.value)}>{services.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></label>
        <p className="rounded-xl border border-brand/15 bg-brand-soft p-3 text-sm leading-relaxed"><strong>Тарифа:</strong> {serviceTariffText(input.service)}{minimum > 0 ? `; минимум ${formatEuro(minimum)}${input.service === "shrubs" ? " при еднократна заявка" : " на заявка"}` : ""}</p>
        {selected.rates.length > 1 && <label className="block text-sm font-semibold" htmlFor="calc-variant">{input.service === "hedge" ? "Височина на живия плет" : input.service === "mowing" ? "Състояние на тревата" : "Вид услуга"}<select id="calc-variant" className={fieldClass} value={input.variant} onChange={e => update("variant", e.target.value)}>{selected.rates.map(key => <option key={key} value={key}>{variantLabels[key]} — {tariffText(key)}</option>)}</select></label>}
        {kind === "area" ? <>
          <label className="flex items-start gap-3 text-sm"><input id="calc-areaUnknown" type="checkbox" className="h-5 w-5 shrink-0 accent-brand" checked={input.areaUnknown} onChange={e => update("areaUnknown", e.target.checked)} /><span>Не съм сигурен/на — уточнете с мен</span></label>
          {!input.areaUnknown && <label className="block min-w-0 text-sm font-semibold" htmlFor="calc-yardArea">{input.service === "subscription" ? "Приблизителна обща площ на целия двор (м²)" : "Приблизителна площ за избраната услуга (м²)"}<input id="calc-yardArea" className={fieldClass} type="text" inputMode="decimal" value={input.yardArea} placeholder="Например 200" onChange={e => update("yardArea", e.target.value)} required /><span className="mt-2 block text-xs font-normal leading-relaxed text-muted">{input.service === "subscription" ? "Целият двор, не само тревата. Обичайната грижа за храсти, плет и лехи е включена." : "Само площта за тази работа — не приемаме целия двор за тревна площ. Достатъчна е приблизителна стойност."}</span></label>}
        </> : <>
          <label className="block text-sm font-semibold" htmlFor="calc-volume">Приблизителен обем<select id="calc-volume" className={fieldClass} value={input.volume} onChange={e => update("volume", e.target.value)}><option value="unknown">Не съм сигурен/на — уточнете с мен</option>{(["small", "medium", "large"] as const).map(size => {const range=pricing.volumeRanges[kind][size];return <option key={size} value={size}>{{small:"Малък",medium:"Среден",large:"Голям"}[size]} — {range[0]}–{range[1]} {kind === "meters" ? "пог. м" : "бр."}</option>;})}<option value="exact">Мога да посоча приблизително количество</option></select></label>
          {input.volume === "exact" && <label className="block text-sm font-semibold" htmlFor="calc-quantity">{kind === "meters" ? "Приблизителна дължина (пог. м)" : "Приблизителен брой растения"}<input id="calc-quantity" className={fieldClass} type="text" inputMode={kind === "plants" ? "numeric" : "decimal"} value={input.quantity} onChange={e => update("quantity", e.target.value)} required /></label>}
        </>}
        {input.service === "subscription" && <>
          <label className="block text-sm font-semibold" htmlFor="calc-gardenType">Тип градина<select id="calc-gardenType" className={fieldClass} value={input.gardenType} onChange={e => update("gardenType", e.target.value)} required><option value="">Изберете тип градина</option>{Object.entries(gardenLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
          <label className="block text-sm font-semibold" htmlFor="calc-condition">Състояние на градината<select id="calc-condition" className={fieldClass} value={input.condition} onChange={e => update("condition", e.target.value)} required><option value="">Изберете състояние</option>{Object.entries(conditionLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
        </>}
        {input.service === "cleaning" && <p className="text-sm text-muted">Силно обрасъл / запустял терен. Изчисляваме реалната посочена площ по отделния тариф за разчистване, не по косене.</p>}
        {input.service === "lawn" && <p className="text-sm text-muted">Комплексна сезонна обработка. Семена, тор и други материали се остойностяват отделно и не са включени.</p>}
        {input.service === "planting" && <p className="text-sm text-muted">Само труд. Растенията и доставката не са включени. За стандартни растения тарифата е „от“.</p>}
        {input.service === "irrigation" && <p className="text-sm text-muted">Ориентир за избрания тип система. Точна цена след оглед и уточняване на системата.</p>}
        {frequencyOptions(input.service).length > 0 && <label className="block text-sm font-semibold" htmlFor="calc-frequency">Честота на посещенията<select id="calc-frequency" className={fieldClass} value={input.frequency} onChange={e => update("frequency", e.target.value)}>{frequencyOptions(input.service).map(id => <option key={id} value={id}>{frequencyLabels[id]}</option>)}</select></label>}
        <button className="garden-button w-full !text-base" type="submit">Изчислете цена</button>
      </fieldset>
    </form>
    <div ref={feedback} tabIndex={-1} className="min-w-0 scroll-mt-40 rounded-3xl border border-brand/20 bg-surface p-5 [overflow-wrap:anywhere] sm:p-8" aria-live="polite">
      <p className="garden-eyebrow">BG GREEN YARD</p><h2 className="mt-3 text-2xl font-bold">Вашата ориентировъчна цена</h2>
      {!result && <><p className="mt-4 leading-relaxed text-muted">Изберете услуга и опишете градината. Тук ще видите ориентировъчна цена и за какво е изчислена.</p><p className="mt-4 text-sm leading-relaxed text-muted">Абонаментът обхваща целия двор: косене, обкантване, текущо плевене и обичайна грижа за наличните храсти, жив плет и цветни лехи.</p></>}
      {result?.kind === "invalid" && <div role="alert" className="mt-4 rounded-xl border border-amber-700/30 bg-amber-50 p-4 text-sm text-amber-950"><p className="font-bold">Моля, попълнете:</p><ul className="mt-2 list-disc space-y-2 pl-5">{result.errors.map(text => <li key={text}>{text}</li>)}</ul></div>}
      {result && result.kind !== "invalid" && <>
        <p className="mt-5 text-xl font-bold text-brand-dark">{result.total !== null ? `Ориентировъчна цена: ${formatEuro(result.total)}${result.maxTotal !== undefined && result.maxTotal !== result.total ? ` – ${formatEuro(result.maxTotal)}` : ""} / ${result.period}` : "Ориентировъчна цена: след уточняване на обекта"}</p>
        {result.firstOrderTotal !== undefined && <p className="mt-3 text-sm font-semibold">Със заявената отстъпка за първа заявка / първи месец: {formatEuro(result.firstOrderTotal)}{result.firstOrderMax !== undefined && result.firstOrderMax !== result.firstOrderTotal ? ` – ${formatEuro(result.firstOrderMax)}` : ""}. Приложимостта се потвърждава от BG GREEN YARD.</p>}
        <ul className="mt-5 space-y-2 text-sm leading-relaxed">{result.lines.map(line => <li className="border-b border-brand/10 pb-2" key={line}>{line}</li>)}</ul>
        <details className="mt-4 text-sm leading-relaxed"><summary className="cursor-pointer font-bold">За какво е изчислена цената?</summary><ul className="mt-3 space-y-3">{result.breakdown.map((text, index) => <li key={index}>{text}</li>)}</ul></details>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">{result.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
        {!showContact && <button type="button" className="garden-button mt-6 w-full !text-base" onClick={() => { setShowContact(true); focus(inquiry); }}>Заявете оглед</button>}
      </>}
      {showContact && <div ref={inquiry} tabIndex={-1} className="mt-6 scroll-mt-40 border-t border-brand/20 pt-5">
        {status === "sent" ? <div role="status"><h3 className="text-xl font-bold">Заявката Ви е получена!</h3><p className="mt-3">BG GREEN YARD ще се свърже с Вас за уточняване на обекта и оглед.</p></div> : <form onSubmit={submit} noValidate className="space-y-4">
          <h3 className="text-xl font-bold">Заявете оглед</h3>
          {error && <p role="alert" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-950">{error}</p>}
          <fieldset disabled={status === "sending"} className="min-w-0 space-y-4 disabled:opacity-60"><legend className="sr-only">Данни за контакт</legend>
            {([["name", "Име и фамилия", "text", "name"], ["email", "Имейл", "email", "email"], ["phone", "Телефон", "tel", "tel"], ["location", "Местоположение / квартал", "text", "street-address"]] as const).map(([key, label, type, autoComplete]) => <label className="block text-sm font-semibold" key={key} htmlFor={`calc-${key}`}>{label}<input id={`calc-${key}`} type={type} autoComplete={autoComplete} className={fieldClass} value={contact[key]} maxLength={key === "name" ? 120 : key === "phone" ? 30 : key === "location" ? 300 : 254} onChange={e => setContact(prev => ({ ...prev, [key]: e.target.value }))} required /></label>)}
            <label className="block text-sm font-semibold" htmlFor="calc-message">Бележки (незадължително)<textarea id="calc-message" className={fieldClass} rows={3} maxLength={3000} value={contact.message} onChange={e => setContact(prev => ({ ...prev, message: e.target.value }))} /></label>
            <p className="text-xs leading-relaxed text-muted">Изпращаме избраните услуга, вид, приблизителен обем/площ, приложимите параметри и ориентировъчна сума заедно с данните Ви за контакт само за обработка на тази заявка.</p>
            <button className="garden-button w-full !text-base" type="submit">{status === "sending" ? "Изпращане…" : "Изпратете заявка за оглед"}</button>
          </fieldset>
        </form>}
      </div>}
    </div>
  </div>;
}
