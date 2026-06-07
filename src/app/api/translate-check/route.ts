import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export const maxDuration = 30;

const ollama = createOpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
});

/**
 * System prompt cho grammar checker song ngữ.
 * Trả về JSON thuần, KHÔNG markdown, KHÔNG giải thích thừa.
 */
const SYSTEM_PROMPT = `Bạn là grammar checker cho người học tiếng Anh Việt Nam.
Input có thể là tiếng Việt, tiếng Anh, hoặc mixed.

Trả về JSON thuần (KHÔNG markdown, KHÔNG giải thích):
{
  "translation": "<full EN sentence>",
  "errors": [
    { "wrong": "<từ/cụm sai>", "correct": "<sửa>", "reason": "<lý do ngắn>" }
  ]
}

Nếu không có lỗi: errors = []
Nếu input quá ngắn (< 3 chars) hoặc vô nghĩa: trả về {"translation": "", "errors": []}`;

/**
 * API proxy gọi Ollama gemma4:e4b để dịch + kiểm tra ngữ pháp.
 * Graceful fallback: trả về rỗng thay vì throw khi AI lỗi.
 */
export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 3) {
      return Response.json({ translation: "", errors: [] });
    }

    const result = await generateText({
      model: ollama.chat("gemma4:e4b"),
      messages: [{ role: "user", content: text }],
      system: SYSTEM_PROMPT,
    });

    // Strip markdown fence nếu AI lỡ wrap ```json ... ```
    const cleaned = result.text.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return Response.json(parsed);
  } catch (error) {
    console.error("[translate-check] Error:", error);
    // Ẩn hint thay vì crash UI
    return Response.json({ translation: "", errors: [] });
  }
}
