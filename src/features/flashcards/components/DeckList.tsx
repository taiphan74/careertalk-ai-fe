/**
 * Component hiển thị danh sách tất cả decks.
 */
"use client";

import { useFlashcards } from "../hooks/useFlashcards";
import { ReviewStats } from "./ReviewStats";
import type { FlashcardDeck } from "../types";

interface DeckListProps {
  onGenerateDeck: () => void;
  onCreateDeck: () => void;
  isGenerating: boolean;
}

export function DeckList({ onGenerateDeck, onCreateDeck, isGenerating }: DeckListProps) {
  const { decks, setCurrentDeck, deleteDeck } = useFlashcards();

  const handleStudy = (deck: FlashcardDeck) => {
    setCurrentDeck(deck);
  };

  const handleDelete = (deckId: string, deckName: string) => {
    if (confirm(`Xóa bộ thẻ "${deckName}"? Hành động này không thể hoàn tác.`)) {
      deleteDeck(deckId);
    }
  };

  if (decks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chưa có bộ thẻ nào</h2>
          <p className="text-gray-600 mb-8">Bắt đầu học bằng cách tạo bộ thẻ đầu tiên của bạn</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGenerateDeck}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Đang tạo..." : "🤖 AI tạo bộ thẻ cho tôi"}
            </button>
            <button
              onClick={onCreateDeck}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition"
            >
              ✏️ Tạo thủ công
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bộ thẻ của tôi ({decks.length})</h2>
        <div className="flex gap-3">
          <button
            onClick={onGenerateDeck}
            disabled={isGenerating}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
          >
            {isGenerating ? "Đang tạo..." : "🤖 AI tạo mới"}
          </button>
          <button
            onClick={onCreateDeck}
            className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition"
          >
            ✏️ Tạo thủ công
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <div key={deck.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{deck.name}</h3>
              {deck.description && <p className="text-sm text-gray-600 line-clamp-2">{deck.description}</p>}
            </div>
            <div className="mb-4"><ReviewStats deck={deck} /></div>
            <div className="text-xs text-gray-500 mb-4 space-y-1">
              <div>📦 {deck.cards.length} thẻ • {deck.source === "ai-generated" ? "🤖 AI tạo" : "✏️ Thủ công"}</div>
              {deck.lastStudiedAt && (
                <div>📅 Học lần cuối: {new Date(deck.lastStudiedAt).toLocaleDateString("vi-VN")}</div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleStudy(deck)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-md transition"
              >
                Học ngay
              </button>
              <button
                onClick={() => handleDelete(deck.id, deck.name)}
                className="px-4 py-2 bg-white border-2 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
