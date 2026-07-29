import { searchPlantCatalog } from "@/lib/plantCatalog";
import { searchPlantDatabase } from "@/lib/plantDatabase";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "Невалидно съобщение" }, { status: 400 });
    }

    const localResult = searchPlantDatabase(message);
    if (!localResult.needsContact) return Response.json(localResult);

    const catalogResult = await searchPlantCatalog(message);
    return Response.json(catalogResult ?? localResult);
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Възникна грешка при обработката на въпроса." },
      { status: 500 }
    );
  }
}
