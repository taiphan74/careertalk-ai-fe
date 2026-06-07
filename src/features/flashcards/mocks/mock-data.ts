/**
 * @file mock-data.ts
 * @description Dữ liệu mẫu cho flashcard demo.
 * 2 deck IT: English for Developers + Tech Interview Prep.
 * Dùng bởi seedMockDecks() trong store.
 */
import type { FlashcardDeck } from "../types";

const NOW = new Date().toISOString();

/** Bộ thẻ từ vựng tiếng Anh chuyên ngành cho lập trình viên */
export const MOCK_DECK_DEVELOPERS: FlashcardDeck = {
  id: crypto.randomUUID(),
  name: "English for Developers",
  description: "Từ vựng tiếng Anh chuyên ngành cho lập trình viên: API, debugging, code review.",
  source: "user-created",
  createdAt: NOW,
  cards: [
    { id: crypto.randomUUID(), front: "endpoint", back: "điểm cuối (của API)", example: "The /users endpoint returns a list of all users.", pronunciation: "/ˈend.pɔɪnt/", tags: ["IT", "API"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "to debug", back: "gỡ lỗi, tìm và sửa lỗi", example: "I spent two hours debugging this issue.", pronunciation: "/diːˈbʌɡ/", tags: ["IT", "debugging"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "pull request", back: "yêu cầu gộp mã nguồn", example: "Please review my pull request before merging.", pronunciation: "/pʊl rɪˈkwest/", tags: ["IT", "code review"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "deprecated", back: "không còn được khuyến nghị sử dụng", example: "This method is deprecated and will be removed in v3.", pronunciation: "/ˈdep.rə.keɪ.tɪd/", tags: ["IT", "API"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "to refactor", back: "tái cấu trúc mã nguồn", example: "We need to refactor this module for better maintainability.", pronunciation: "/riːˈfæk.tər/", tags: ["IT", "code review"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "payload", back: "dữ liệu được gửi trong request/response", example: "The request payload must be valid JSON.", pronunciation: "/ˈpeɪ.ləʊd/", tags: ["IT", "API"], createdAt: NOW, reviewCount: 0, status: "new" },
  ],
};

/** Bộ thẻ từ vựng và mẫu câu cho phỏng vấn kỹ thuật */
export const MOCK_DECK_INTERVIEW: FlashcardDeck = {
  id: crypto.randomUUID(),
  name: "Tech Interview Prep",
  description: "Từ vựng và mẫu câu cho phỏng vấn kỹ thuật: system design, behavioral questions.",
  source: "user-created",
  createdAt: NOW,
  cards: [
    { id: crypto.randomUUID(), front: "scalability", back: "khả năng mở rộng hệ thống", example: "How would you improve the scalability of this architecture?", pronunciation: "/skeɪ.ləˈbɪl.ə.ti/", tags: ["IT", "interview", "system design"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "trade-off", back: "sự đánh đổi (giữa các giải pháp)", example: "Every architectural decision involves trade-offs.", pronunciation: "/ˈtreɪd.ɒf/", tags: ["IT", "interview", "system design"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "bottleneck", back: "điểm nghẽn hiệu năng", example: "The database query is the main bottleneck here.", pronunciation: "/ˈbɒt.l.nek/", tags: ["IT", "interview", "system design"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "to elaborate", back: "giải thích chi tiết hơn", example: "Could you elaborate on your approach to caching?", pronunciation: "/ɪˈlæb.ər.eɪt/", tags: ["IT", "interview", "behavioral"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "edge case", back: "trường hợp biên, ngoại lệ", example: "What happens if the input is an empty array? That's an edge case.", pronunciation: "/edʒ keɪs/", tags: ["IT", "interview"], createdAt: NOW, reviewCount: 0, status: "new" },
    { id: crypto.randomUUID(), front: "throughput", back: "lượng xử lý trên đơn vị thời gian", example: "We need to measure the throughput under peak load.", pronunciation: "/ˈθruː.pʊt/", tags: ["IT", "interview", "system design"], createdAt: NOW, reviewCount: 0, status: "new" },
  ],
};

/** Tất cả mock decks để seed một lần */
export const MOCK_DECKS: FlashcardDeck[] = [
  MOCK_DECK_DEVELOPERS,
  MOCK_DECK_INTERVIEW,
];
