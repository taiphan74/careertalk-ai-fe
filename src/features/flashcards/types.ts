/**
 * Kiểu dữ liệu cho một thẻ flashcard đơn lẻ.
 * Hỗ trợ song ngữ: mặt trước (EN) + mặt sau (VI + ví dụ).
 */
export interface Flashcard {
  id: string;                    // UUID duy nhất
  front: string;                 // Từ/cụm từ tiếng Anh
  back: string;                  // Nghĩa tiếng Việt
  example?: string;              // Câu ví dụ (optional)
  pronunciation?: string;        // IPA hoặc phonetic (optional)
  tags: string[];                // VD: ["IT", "interview", "basic"]
  createdAt: string;             // ISO timestamp
  lastReviewedAt?: string;       // ISO timestamp
  reviewCount: number;           // Số lần đã ôn
  status: "new" | "learning" | "mastered";
}

/**
 * Kiểu dữ liệu cho một bộ thẻ flashcard.
 * Có thể là AI-generated hoặc user-created.
 */
export interface FlashcardDeck {
  id: string;                    // UUID duy nhất
  name: string;                  // VD: "English for IT - Basics"
  description?: string;          // Mô tả ngắn
  cards: Flashcard[];            // Danh sách thẻ
  source: "ai-generated" | "user-created";
  profileContext?: {             // Nếu AI-generated, lưu context đã dùng
    occupation?: string;
    goal?: string;
    level?: string;
  };
  createdAt: string;             // ISO timestamp
  lastStudiedAt?: string;        // ISO timestamp
}

