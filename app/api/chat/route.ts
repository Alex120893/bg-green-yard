import { searchPlantDatabase } from "@/lib/plantDatabase";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Невалидно съобщение" },
        { status: 400 }
      );
    }

    // Търси в базата данни
    const databaseInfo = searchPlantDatabase(message);

    // Генерира отговор базиран на информацията
    const response = generateResponse(message, databaseInfo);

    return Response.json({ response });
  } catch (error) {
    console.error("Грешка в API:", error);
    return Response.json(
      { error: "Възникна грешка при обработката на вашия вопрос" },
      { status: 500 }
    );
  }
}

function generateResponse(userMessage: string, databaseInfo: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Приветствие
  if (
    lowerMessage.includes("привет") ||
    lowerMessage.includes("здравей") ||
    lowerMessage.includes("добър")
  ) {
    return "👋 Добър ден! Аз съм вашият помощник за грижа на растенията и тревата. Как мога да ви помогна днес?";
  }

  // Благодарност
  if (
    lowerMessage.includes("благодаря") ||
    lowerMessage.includes("спасибо") ||
    lowerMessage.includes("merci")
  ) {
    return "😊 С удоволствие! Ако имате още вопроси, свободно питайте.";
  }

  // Вопрос за помощ
  if (
    lowerMessage.includes("помощ") ||
    lowerMessage.includes("как") ||
    lowerMessage.includes("кога")
  ) {
    if (databaseInfo.includes("Не намерих информация")) {
      return (
        "Съжалявам, но нямам конкретна информация за това. " +
        "Мога да ви помогна с въпроси за:\n" +
        "• Грижа на различни растения (дърветата, цветята, кустарници)\n" +
        "• Поливане, торене и подхранване\n" +
        "• Косене и ухаживане на газон\n" +
        "• Борба със сорняци и болести\n\n" +
        "Попробуйте да попитате за конкретно растение или проблем!"
      );
    }
    return (
      "Ето информацията, която намерих:\n\n" + databaseInfo + "\n\n" +
      "Имате ли още вопроси?"
    );
  }

  // Ако има информация в базата
  if (!databaseInfo.includes("Не намерих информация")) {
    return (
      "Ево какво знам за вашия вопрос:\n\n" + databaseInfo + "\n\n" +
      "Надявам се, че това помогна! Питайте ако имате още въпроси."
    );
  }

  // Общ отговор с предложение за помощ
  if (lowerMessage.includes("растение")) {
    return (
      "🌿 Вижте, че интересува растенията! " +
      "Можете ли да ми дадете повече детайли - име на растение, " +
      "какъв проблем имате или какъв съвет търсите?"
    );
  }

  if (lowerMessage.includes("трева") || lowerMessage.includes("газон")) {
    return (
      "🌾 Говорите за грижа на газон! " +
      "Мога да ви помогна с:\n" +
      "• Поливане\n" +
      "• Косене\n" +
      "• Торене\n" +
      "• Борба със сорняци\n" +
      "• Аерация и дренаж\n\n" +
      "Какво точно ви интересува?"
    );
  }

  // Отговор по подразбиране
  return (
    "Интересен вопрос! 🤔 " +
    "За да ми помогнете да дам по-точен отговор, " +
    "можете ли да бъдете по-конкретни? " +
    "Какъв растение или проблем имате предвид?"
  );
}
