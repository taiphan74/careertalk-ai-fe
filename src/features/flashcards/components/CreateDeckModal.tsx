/**
 * @file CreateDeckModal.tsx
 * @description Modal tạo deck mới thủ công.
 * Cho phép thêm cards ngay trong modal trước khi save.
 */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useFlashcards } from "../hooks/useFlashcards";
import type { Flashcard } from "../types";
import { CreateCardForm } from "./CreateCardForm";

/** Input từ CreateCardForm — bỏ id/timestamps/reviewCount/status */
type CardFormInput = Pick<Flashcard, "front" | "back" | "example" | "pronunciation" | "tags">;

interface CreateDeckModalProps {
  onClose: () => void;
}

export function CreateDeckModal({ onClose }: CreateDeckModalProps) {
  const { addDeck } = useFlashcards();
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);

  /** Xử lý tạo deck — validate + gọi addDeck */
  const handleSubmit = () => {
    if (!deckName.trim()) {
      toast.error("Vui lòng nhập tên bộ thẻ");
      return;
    }
    addDeck({
      id: crypto.randomUUID(),
      name: deckName.trim(),
      description: description.trim() || undefined,
      cards,
      source: "user-created",
      createdAt: new Date().toISOString(),
    });
    toast.success(`Đã tạo bộ thẻ "${deckName.trim()}" với ${cards.length} thẻ!`);
    onClose();
  };

  /** Thêm card mới vào danh sách tạm */
  const handleAddCard = (input: CardFormInput) => {
    const card: Flashcard = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      reviewCount: 0,
      status: "new",
    };
    setCards((prev) => [...prev, card]);
    setShowAddCard(false);
    toast.success("Đã thêm thẻ!");
  };

  /** Xóa card khỏi danh sách tạm theo index */
  const handleRemoveCard = (index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  /** Đóng khi click backdrop */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Tạo bộ thẻ mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Deck info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên bộ thẻ *</label>
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="VD: English for IT - Basics"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Bộ thẻ này dùng để..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Cards list */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Thẻ ({cards.length})</label>
              <button
                onClick={() => setShowAddCard(true)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
              >
                + Thêm thẻ
              </button>
            </div>
            {cards.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                Chưa có thẻ nào. Click "Thêm thẻ" để bắt đầu.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {cards.map((card, index) => (
                  <div key={card.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{card.front}</div>
                      <div className="text-sm text-gray-600 truncate">{card.back}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveCard(index)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showAddCard && (
            <CreateCardForm onAdd={handleAddCard} onCancel={() => setShowAddCard(false)} />
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition"
            >
              Tạo bộ thẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
