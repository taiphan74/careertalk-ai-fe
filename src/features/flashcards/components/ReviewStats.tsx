/**
 * @file ReviewStats.tsx
 * @description Hiển thị trạng thái phân phối thẻ học trong bộ deck — Sử dụng màu ngữ nghĩa chuẩn.
 */
"use client";

import type { FlashcardDeck } from "../types";

interface ReviewStatsProps {
  deck: FlashcardDeck;
}

export function ReviewStats({ deck }: ReviewStatsProps) {
  const stats = deck.cards.reduce(
    (acc, card) => {
      acc[card.status] = (acc[card.status] || 0) + 1;
      return acc;
    },
    { new: 0, learning: 0, review: 0 } as Record<string, number>
  );

  return (
    <div className="flex gap-2 text-xs font-medium w-full">
      <div className="flex-1 text-center py-1.5 px-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
        <div>Mới</div>
        <div className="text-sm font-bold mt-0.5">{stats.new}</div>
      </div>
      <div className="flex-1 text-center py-1.5 px-2 bg-accent/10 text-accent rounded-lg border border-accent/20">
        <div>Đang học</div>
        <div className="text-sm font-bold mt-0.5">{stats.learning}</div>
      </div>
      <div className="flex-1 text-center py-1.5 px-2 bg-success/10 text-success rounded-lg border border-success/20">
        <div>Thuộc</div>
        <div className="text-sm font-bold mt-0.5">{stats.review}</div>
      </div>
    </div>
  );
}
