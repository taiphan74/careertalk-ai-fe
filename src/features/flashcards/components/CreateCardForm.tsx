/**
 * @file CreateCardForm.tsx
 * @description Form tạo flashcard mới — dùng trong CreateDeckModal, tái sử dụng hệ thống Primitives chuẩn.
 *
 * Fields: front (required), back (required), pronunciation, example, tags.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Flashcard } from "../types";

/** Input từ form — bỏ id/timestamps/reviewCount/status */
type CardFormInput = Pick<Flashcard, "front" | "back" | "example" | "pronunciation" | "tags">;

interface CreateCardFormProps {
  /** Hàm xử lý khi thêm thẻ thành công */
  onAdd: (card: CardFormInput) => void;
  /** Hàm xử lý khi bấm hủy thao tác */
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
    setFront(""); 
    setBack(""); 
    setExample(""); 
    setPronunciation(""); 
    setTagsInput("");
  };

  return (
    <div className="p-5 bg-surface border border-border rounded-xl space-y-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="card-front">Mặt trước (English) *</Label>
          <Input
            id="card-front"
            type="text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="VD: algorithm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card-back">Mặt sau (Tiếng Việt) *</Label>
          <Input
            id="card-back"
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="VD: thuật toán"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card-pron">Phát âm (IPA - optional)</Label>
        <Input
          id="card-pron"
          type="text"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          placeholder="VD: /ˈælɡəˌrɪðəm/"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card-example">Câu ví dụ (optional)</Label>
        {/* Dùng chung style Input đồng bộ, kế thừa padding và viền */}
        <textarea
          id="card-example"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          placeholder="VD: The algorithm sorts the array in O(n log n) time."
          rows={2}
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card-tags">Tags (phân cách bằng dấu phẩy - optional)</Label>
        <Input
          id="card-tags"
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="VD: IT, programming, basics"
        />
      </div>
      
      <div className="flex gap-3 justify-end pt-2">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button variant="default" onClick={handleSubmit}>
          Thêm thẻ
        </Button>
      </div>
    </div>
  );
}
