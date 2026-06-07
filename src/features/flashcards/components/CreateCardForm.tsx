/**
 * @file CreateCardForm.tsx
 * @description Form tạo flashcard mới — dùng trong CreateDeckModal.
 *
 * Fields: front (required), back (required), pronunciation, example, tags.
 */
"use client";

import { useState } from "react";
import type { Flashcard } from "../types";

/** Input từ form — bỏ id/timestamps/reviewCount/status */
type CardFormInput = Pick<Flashcard, "front" | "back" | "example" | "pronunciation" | "tags">;

interface CreateCardFormProps {
  onAdd: (card: CardFormInput) => void;
  onCancel: () => void;
}

export function CreateCardForm({ onAdd, onCancel }: CreateCardFormProps) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  /** Xử lý submit — validate + gọi onAdd */
  const handleSubmit = () => {
    if (!front.trim() || !back.trim()) {
      alert("Vui lòng nhập cả mặt trước và mặt sau");
      return;
    }
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    onAdd({
      front: front.trim(),
      back: back.trim(),
      example: example.trim() || undefined,
      pronunciation: pronunciation.trim() || undefined,
      tags,
    });
    setFront(""); setBack(""); setExample(""); setPronunciation(""); setTagsInput("");
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mặt trước (English) *
          </label>
          <input
            type="text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="VD: algorithm"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mặt sau (Tiếng Việt) *
          </label>
          <input
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="VD: thuật toán"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phát âm (IPA - optional)
        </label>
        <input
          type="text"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          placeholder="VD: /ˈælɡəˌrɪðəm/"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Câu ví dụ (optional)
        </label>
        <textarea
          value={example}
          onChange={(e) => setExample(e.target.value)}
          placeholder="VD: The algorithm sorts the array in O(n log n) time."
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (phân cách bằng dấu phẩy - optional)
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="VD: IT, programming, basics"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Thêm thẻ
        </button>
      </div>
    </div>
  );
}
