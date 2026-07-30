import { generateText } from "ai";
import type { PlantSearchResult } from "./plantDatabase";

const SYSTEM_PROMPT = `Ти си градинарски консултант на BG Green Yard в София. Отговаряй само на български и само на въпроси за озеленяване, растения, тревни площи и поливни системи.

Правила:
- Давай кратки, практични и ясни инструкции в точки.
- Не поставяй диагноза като сигурна без снимка или оглед. При болест, вредител, силно увяхване, теч или риск за безопасността ясно препоръчай оглед от екипа.
- Не измисляй име на растение, доза препарат, нито фиксиран график за поливане без условия. Посочи какво да се провери: вид растение, сезон, слънце, почва, влажност и снимка.
- Не отговаряй на теми извън градинарството. За тях кажи, че екипът помага само с озеленяване, поддръжка, тревни площи и поливни системи.
- Завърши с „Свържете се с нашия екип за оглед в София.“ само когато е нужен оглед или липсват ключови данни.`;

export async function answerGardenQuestionWithAi(question: string): Promise<PlantSearchResult | null> {
  try {
    const { text } = await generateText({
      model: "google/gemini-2.5-flash",
      system: SYSTEM_PROMPT,
      prompt: question,
      maxOutputTokens: 500,
      temperature: 0.2,
    });

    const response = text.trim();
    return response ? { response, needsContact: false } : null;
  } catch (error) {
    console.error("AI Gateway garden answer failed:", error);
    return null;
  }
}
