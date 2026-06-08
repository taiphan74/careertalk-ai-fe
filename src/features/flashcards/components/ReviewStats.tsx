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
    <div className="flex gap-1.5 text-xs font-medium w-full">
      <div className="flex-1 text-center py-1.5 px-2 bg-primary/5 text-primary rounded-md border border-primary/10">
        <div className="opacity-70">Mới</div>
        <div className="text-sm font-semibold mt-0.5 tabular-nums">{stats.new}</div>
      </div>
      <div className="flex-1 text-center py-1.5 px-2 bg-accent/5 text-accent rounded-md border border-accent/10">
        <div className="opacity-70">Học</div>
        <div className="text-sm font-semibold mt-0.5 tabular-nums">{stats.learning}</div>
      </div>
      <div className="flex-1 text-center py-1.5 px-2 bg-success/5 text-success rounded-md border border-success/10">
        <div className="opacity-70">Thuộc</div>
        <div className="text-sm font-semibold mt-0.5 tabular-nums">{stats.review}</div>
      </div>
    </div>
  );
}
