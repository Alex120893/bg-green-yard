export type ChatInquiry = {
  question: string;
  answer: string;
  createdAt: string;
};

const INQUIRIES_KEY = "chat-inquiries";

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  return url && token ? { url, token } : null;
}

async function redisCommand<T>(command: string, init: RequestInit = {}): Promise<T | null> {
  const config = getRedisConfig();
  if (!config) return null;

  try {
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${config.token}`);

    const response = await fetch(`${config.url}/${command}`, {
      ...init,
      cache: "no-store",
      headers,
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as { result?: T };
    return payload.result ?? null;
  } catch {
    return null;
  }
}

export async function saveChatInquiry(inquiry: ChatInquiry) {
  const value = encodeURIComponent(JSON.stringify(inquiry));
  return redisCommand(`lpush/${INQUIRIES_KEY}/${value}`);
}

export async function getChatInquiries(): Promise<ChatInquiry[]> {
  const values = await redisCommand<string[]>(`lrange/${INQUIRIES_KEY}/0/-1`);
  if (!values) return [];

  return values.flatMap((value) => {
    try {
      const inquiry = JSON.parse(value) as ChatInquiry;
      return typeof inquiry.question === "string" && typeof inquiry.answer === "string" && typeof inquiry.createdAt === "string"
        ? [inquiry]
        : [];
    } catch {
      return [];
    }
  });
}
