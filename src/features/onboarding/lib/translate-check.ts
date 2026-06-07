/**
 * Thư viện gọi API /api/translate-check để dịch và kiểm tra ngữ pháp.
 * Tách biệt logic fetch khỏi UI component để dễ test và tái sử dụng.
 */

/** Lỗi ngữ pháp/từ vựng được AI phát hiện */
export interface GrammarError {
  wrong: string;
  correct: string;
  reason: string;
}

/** Kết quả dịch + kiểm tra ngữ pháp từ AI */
export interface TranslateCheckResult {
  translation: string;
  errors: GrammarError[];
}

/**
 * Gọi API /api/translate-check để dịch và kiểm tra ngữ pháp.
 * Trả về null nếu lỗi mạng, parse thất bại, hoặc Ollama không chạy.
 * Graceful degradation: UI sẽ ẩn hint thay vì crash.
 */
export async function translateCheck(
  text: string
): Promise<TranslateCheckResult | null> {
  try {
    const res = await fetch("/api/translate-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    // Validate shape cơ bản để tránh runtime error
    if (typeof data.translation !== "string" || !Array.isArray(data.errors)) {
      return null;
    }

    return data as TranslateCheckResult;
  } catch {
    // Mạng lỗi hoặc Ollama tắt → ẩn hint, không throw
    return null;
  }
}
