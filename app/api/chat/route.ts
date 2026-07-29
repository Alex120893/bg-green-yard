import { gateway, generateText, stepCountIs } from "ai";
import { searchPlantDatabase } from "@/lib/plantDatabase";

const systemPrompt = `You are the BG Green Yard assistant. Reply in Bulgarian unless the user writes in another language. Give practical, careful gardening and lawn-care advice for Sofia and Bulgaria. Use the supplied local plant database first. Search the web when the answer depends on current information, local regulations, product availability, weather, or when the local database is insufficient. Do not invent sources, diagnoses, or safety claims. Recommend a local professional for hazardous chemicals, large trees, or urgent plant disease issues.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "Невалидно съобщение" }, { status: 400 });
    }

    if (!process.env.AI_GATEWAY_API_KEY) {
      return Response.json(
        { error: "AI помощникът все още не е конфигуриран." },
        { status: 503 }
      );
    }

    const databaseInfo = searchPlantDatabase(message);
    const result = await generateText({
      model: gateway("openai/gpt-5.6-sol"),
      system: systemPrompt,
      prompt: `Question: ${message}

Local plant database context:
${databaseInfo}`,
      tools: {
        perplexity_search: gateway.tools.perplexitySearch(),
      },
      stopWhen: stepCountIs(3),
    });

    return Response.json({ response: result.text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Възникна грешка при обработката на въпроса." },
      { status: 500 }
    );
  }
}
