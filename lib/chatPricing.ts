/** Deterministic price routing before plant DB, catalog or AI: no guessed prices. */
export function isPriceQuestion(question: string): boolean {
  const q = question.normalize("NFKC").toLowerCase();
  const priceWords = /(?:^|[^\p{L}])(?:цен[а-я]*|стойност[а-я]*|стоимост[а-я]*|тариф[а-я]*|оферт[а-я]*|бюджет[а-я]*|отстъпк[а-я]*|скъп[а-я]*|евтин[а-я]*|безплат[а-я]*|платен[а-я]*|заплащ[а-я]*|плащан[а-я]*|струва[а-я]*|сколько|поч[её]м|стоит|расцен[а-я]*|прайс[а-я]*|бесплат[а-я]*|скидк[а-я]*|денег|евро|лева|лв|price|prices|pricing|cost|costs|quote|quotation|rate|rates|budget|discount)(?=$|[^\p{L}])/iu;
  const amountQuestion = /(?:колко\s+(?:ще\s+)?(?:излезе|излиза|излизат|вз[еи]м|пари)|колко\s+(?:е\s+)?за|how\s+much)/iu;
  return priceWords.test(q) || amountQuestion.test(q) || q.includes("€");
}
export function priceQuestionResponse(question: string) {
  return isPriceQuestion(question) ? {
    response: "За ориентировъчна цена използвайте нашия ценови калкулатор: https://bg-greenyard.com/bg/calculator . За засаждане и поливни системи цената се определя след оглед — можете да го заявите оттам.",
    needsContact: false, showServicePrompt: false, showCalculator: true,
  } : null;
}
