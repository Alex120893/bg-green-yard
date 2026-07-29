import { searchPlantDatabase } from "@/lib/plantDatabase";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "Невалидно съобщение" }, { status: 400 });
    }

    return Response.json({
      response: searchPlantDatabase(message),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Възникна грешка при обработката на въпроса." },
      { status: 500 }
    );
  }
}
