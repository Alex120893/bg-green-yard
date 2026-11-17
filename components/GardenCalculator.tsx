"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { pricing, services } from "@/lib/gardenPricing";
import { estimateGarden, estimateText, formatEuro, vatLabel, type EstimateInput, type Estimate } from "@/lib/gardenEstimate";

const initial: EstimateInput = { service: "", quantity: "", condition: "", access: "", frequency: "", waste: "", lawn: [] };
const fieldClass = "mt-2 w-full min-w-0 rounded-xl border border-brand/25 bg-white px-3 py-3 text-base text-foreground";
export function GardenCalculator() {
  const [input, setInput] = useState(initial);
  const [result, setResult] = useState<Estimate | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const selected = services.find(s => s.id === input.service);
  const hasWaste = selected && !["irrigation", "planting"].includes(selected.id);
  function update<K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) {
    setInput(prev => key === "service" ? { ...initial, service: value as string } : { ...prev, [key]: value });
    setResult(null);
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult(estimateGarden(input));
    requestAnimationFrame(() => { resultRef.current?.focus({ preventScroll: true }); resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
  }
  const summary = result && result.kind !== "invalid" ? estimateText(result) : "";
  return <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
    <form onSubmit={submit} noValidate className="min-w-0 rounded-3xl border border-brand/15 bg-white/80 p-5 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold">1. Разкажете ни за градината</h2>
      <p className="mt-2 text-sm text-muted">Попълнете приложимите полета. Всички показани полета са задължителни.</p>
      <label className="mt-6 block text-sm font-semibold" htmlFor="calc-service">Вид услуга
        <select id="calc-service" className={fieldClass} value={input.service} onChange={e => update("service", e.target.value)} required>
          <option value="">Изберете услуга</option>{services.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </label>
      {selected && <div className="mt-5 grid min-w-0 gap-5 sm:grid-cols-2">
        <label className="min-w-0 text-sm font-semibold" htmlFor="calc-quantity">{selected.id === "planting" ? "Брой растения" : selected.unit === "л.м" ? "Дължина на живия плет (л.м)" : "Площ (м²)"}
          <input id="calc-quantity" type="text" inputMode={selected.id === "planting" ? "numeric" : "decimal"} className={fieldClass} value={input.quantity} placeholder={selected.id === "planting" ? "Напр. 12" : "Напр. 200"} onChange={e => update("quantity", e.target.value)} required aria-describedby="quantity-help" />
          <span id="quantity-help" className="mt-1 block text-xs font-normal text-muted">{selected.id === "planting" ? "Видът и размерът се уточняват с офертата." : "Само площта или дължината за избраната работа."}</span>
        </label>
        <label className="min-w-0 text-sm font-semibold" htmlFor="calc-condition">Състояние на терена
          <select id="calc-condition" className={fieldClass} value={input.condition} onChange={e => update("condition", e.target.value)} required>
            <option value="">Изберете състояние</option><option value="standard">Поддържан</option><option value="high">{selected.id === "mowing" ? "Висока трева — първо косене" : "Нужда от интензивна грижа"}</option><option value="overgrown">Запустял / силно обрасъл</option>
          </select>
        </label>
        <label className="min-w-0 text-sm font-semibold sm:col-span-2" htmlFor="calc-access">Достъп до терена
          <select id="calc-access" className={fieldClass} value={input.access} onChange={e => update("access", e.target.value)} required>
            <option value="">Изберете достъп</option><option value="easy">Лесен достъп за техника, равен терен</option><option value="difficult">Тесен вход, стъпала, наклон или пренасяне</option>
          </select>
        </label>
        {selected.id === "lawn" && <fieldset className="rounded-xl border border-brand/20 p-4 sm:col-span-2"><legend className="px-1 text-sm font-semibold">Грижа за тревен килим — поне една дейност</legend>
          {([["aeration", "Аериране"], ["overseeding", "Подсяване"], ["fertilizing", "Пролетно торене (с тор)"]] as const).map(([key, label]) => <label className="flex items-center gap-3 py-2 text-sm" key={key}><input type="checkbox" className="h-5 w-5 accent-brand" checked={input.lawn.includes(key)} onChange={e => update("lawn", e.target.checked ? [...input.lawn, key] : input.lawn.filter(k => k !== key))} />{label}</label>)}
        </fieldset>}
        {selected.id === "subscription" && <label className="text-sm font-semibold sm:col-span-2" htmlFor="calc-frequency">Честота на посещенията
          <select id="calc-frequency" className={fieldClass} value={input.frequency} onChange={e => update("frequency", e.target.value)} required><option value="">Изберете честота</option><option value="weekly">Всяка седмица</option><option value="fortnightly">На две седмици</option><option value="monthly">Веднъж месечно</option></select>
        </label>}
        {hasWaste && <label className="text-sm font-semibold sm:col-span-2" htmlFor="calc-waste">Да се включи ли извозване?
          <select id="calc-waste" className={fieldClass} value={input.waste} onChange={e => update("waste", e.target.value)} required><option value="">Изберете</option><option value="no">Не — без транспорт на отпадъци до депо</option><option value="yes">Да — индивидуална оферта според обема</option></select>
        </label>}
        <p className="text-sm text-muted sm:col-span-2">{selected.id === "subscription" ? "Месечен пакет след оглед; честотата не е автоматичен множител." : ["planting", "irrigation"].includes(selected.id) ? "Обхватът, материалите и срокът се уточняват с индивидуална оферта." : "Оценката е за едно посещение. За регулярна грижа изберете абонаментна поддръжка."}</p>
      </div>}
      <button className="garden-button mt-6 w-full !text-base" type="submit">Изчислете ориентир <span aria-hidden>→</span></button>
    </form>
    <div ref={resultRef} tabIndex={-1} className="min-w-0 scroll-mt-40 [overflow-wrap:anywhere] rounded-3xl border border-brand/20 bg-surface p-5 sm:p-8" aria-live="polite" aria-atomic="true">
      <p className="garden-eyebrow">Вашата градина · Вашият план</p>
      <h2 className="mt-3 text-2xl font-bold">2. Ориентировъчна оценка</h2>
      {!result && <p className="mt-5 leading-relaxed text-muted">Изберете услуга и попълнете данните. Тук ще видите състава на работата и ориентир в евро или насока за индивидуална оферта.</p>}
      {result?.kind === "invalid" && <div role="alert" className="mt-5 rounded-xl border border-amber-700/30 bg-amber-50 p-4 text-sm text-amber-950"><p className="font-bold">Моля, попълнете нужните данни:</p><ul className="mt-2 list-disc space-y-2 pl-5">{result.errors.map(error => <li key={error}>{error}</li>)}</ul></div>}
      {result && result.kind !== "invalid" && <>
        <p className="mt-5 text-sm font-medium text-muted">{result.kind === "price" ? "Пазарен ориентир за едно посещение" : "Обща цена"}</p>
        <p className="mt-2 break-words text-3xl font-bold tracking-tight text-brand-dark">{result.kind === "price" ? `${formatEuro(result.min!)}${result.max !== result.min ? ` – ${formatEuro(result.max!)}` : ""}` : "След оглед / уточнение"}</p>
        <p className="mt-3 rounded-xl border border-brand/15 bg-white/60 p-3 text-sm leading-relaxed">{vatLabel()}</p>
        <h3 className="mt-6 font-bold">Състав на работата</h3><ul className="mt-3 space-y-2 text-sm leading-relaxed">{result.lines.map((line, i) => <li className="border-b border-brand/10 pb-2" key={i}>{line}</li>)}</ul>
        <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-muted">{result.notes.map((note, i) => <li key={i}>{note}</li>)}</ul>
        <Link className="garden-button mt-6 w-full !text-base" href={`/bg/contact?estimate=${encodeURIComponent(summary)}`}>Поискайте оферта <span aria-hidden>→</span></Link>
        <p className="mt-2 text-xs text-muted">Параметрите ще се добавят към съобщението Ви. Нищо не се изпраща автоматично.</p>
      </>}
      <p className="mt-6 border-t border-brand/15 pt-4 text-sm leading-relaxed text-muted">Сумата е предварителна и може да се промени след оглед на място. За сложни работи, озеленяване, поливни системи и абонаментна поддръжка точната цена се определя след оглед или уточнение на обекта.</p>
      <p className="mt-3 text-xs leading-relaxed text-muted">Това са публични пазарни ориентири, не утвърден ценоразпис на BG GREEN YARD. Тарифите и ДДС очакват потвърждение от собственика. Проверка: {pricing.checkedAt}.</p>
    </div>
  </div>;
}
