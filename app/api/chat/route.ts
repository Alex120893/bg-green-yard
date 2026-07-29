import { saveChatInquiry } from "@/lib/chatInquiries";
import { searchPlantCatalog } from "@/lib/plantCatalog";
import { searchPlantDatabase } from "@/lib/plantDatabase";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const question = typeof message === "string" ? message.trim() : "";

    if (!question || question.length > 1000) {
      return Response.json({ error: "Невалидно съобщение" }, { status: 400 });
    }

    const localResult = searchPlantDatabase(question);
    const result = !localResult.needsContact
      ? { ...localResult, showServicePrompt: true }
      : { ...(await searchPlantCatalog(question) ?? localResult), showServicePrompt: false };

    await saveChatInquiry({
      question,
      answer: result.response,
      createdAt: new Date().toISOString(),
    });

    return Response.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Възникна грешка при обработката на въпроса." },
      { status: 500 }
    );
  }
}
