/**
 * @file CardViewer.tsx
 * @description Trình điều hướng ôn tập thẻ flashcards — Sử dụng tham số đồng bộ chính xác với Zustand Store.
 */
"use client";

import { useEffect } from "react";
import { FlashcardCard } from "./FlashcardCard";
import { Button } from "@/components/ui/button";
import { useFlashcards } from "../hooks/useFlashcards";

interface CardViewerProps {
  /** Hàm callback kích hoạt khi người dùng chọn thoát học */
  onBack: () => void;
}

export function CardViewer({ onBack }: CardViewerProps) {
  const { 
    currentDeck, 
    currentCard, 
    currentCardIndex, 
    isFlipped, 
    isCompleted,
    toggleFlip, 
    resetFlip, 
    nextCard, 
    markCardAsReviewed 
  } = useFlashcards();

  // Tự động reset trạng thái lật khi chuyển sang thẻ mới
  useEffect(() => {
    resetFlip();
  }, [currentCardIndex, resetFlip]);

  // Nếu đã hoàn thành tất cả các thẻ trong bộ deck
  useEffect(() => {
    if (isCompleted) {
      onBack();
    }
  }, [isCompleted, onBack]);

  if (!currentDeck || !currentCard) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 bg-surface border border-border rounded-2xl p-6">
        <p className="text-text-secondary mb-4 font-medium">Bộ thẻ này hiện không có dữ liệu học hoặc đã hoàn thành.</p>
        <Button onClick={onBack}>Quay lại danh sách</Button>
      </div>
    );
  }

  const handleAction = (remembered: boolean) => {
    // Truyền chính xác 3 tham số theo đặc tả của Zustand store
    markCardAsReviewed(currentDeck.id, currentCard.id, remembered);
    nextCard();
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      {/* Header điều khiển */}
      <div className="flex justify-between items-center border-b border-border pb-3">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          size="sm" 
          className="font-medium text-text-secondary hover:text-foreground"
        >
          ← Thoát học
        </Button>
        <div className="text-sm font-semibold text-text-tertiary bg-surface px-3 py-1 rounded-full border border-border/40">
          Tiến độ: <span className="text-foreground">{currentCardIndex + 1}</span>/{currentDeck.cards.length}
        </div>
      </div>

      {/* Thẻ 3D hiển thị */}
      <FlashcardCard 
        card={currentCard} 
        isFlipped={isFlipped} 
        onFlip={toggleFlip} 
      />

      {/* Nút bấm hành động */}
      <div className="flex gap-4 justify-center pt-2">
        <Button
          variant="outline"
          className="flex-1 py-6 font-semibold border-accent/30 text-accent hover:bg-accent-light"
          onClick={(e) => {
            e.stopPropagation(); // Tránh kích hoạt sự kiện lật thẻ của cha
            handleAction(false); // Chưa thuộc -> remembered = false
          }}
        >
          ❌ Chưa thuộc (Học lại)
        </Button>
        <Button
          className="flex-1 py-6 font-semibold bg-gradient-to-r from-success to-emerald-500 text-white shadow-md hover:shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleAction(true); // Đã thuộc -> remembered = true
          }}
        >
          ✅ Đã thuộc làu
        </Button>
      </div>
    </div>
  );
}
