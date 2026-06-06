import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

const ollama = openai.createClient({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: ollama.chat("gemma4:e4b"),
    messages,
    system: `Bạn là CareerTalk AI Coach, trợ lý học tiếng Anh chuyên nghiệp cho người Việt.
Nhiệm vụ hiện tại: thu thập thông tin người dùng qua chat thân thiện, từng bước một.

Quy tắc:
- Nói tiếng Việt tự nhiên, ngắn gọn, thân thiện
- Mỗi lần chỉ hỏi 1 câu
- Không giải thích dài dòng
- Khi đủ thông tin, tóm tắt và cảm ơn`,
  });

  return result.toDataStreamResponse();
}
