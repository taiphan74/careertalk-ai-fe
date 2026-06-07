/**
 * @file FlashcardCard.tsx
 * @description Component flashcard dạng lật 3D cao cấp, thích ứng màu nền trọn vẹn.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Flashcard } from "../types";

interface FlashcardCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashcardCard({ card, isFlipped, onFlip }: FlashcardCardProps) {
  return (
    <div 
      className="w-full h-80 min-h-[320px] cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Mặt trước */}
        <div className="absolute inset-0 backface-hidden flex flex-col justify-between p-8 bg-card border-2 border-border rounded-2xl shadow-xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">Mặt trước (English)</div>
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2">
            <h3 className="text-3xl font-bold text-foreground font-sans tracking-tight">{card.front}</h3>
            {card.pronunciation && (
              <p className="text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">{card.pronunciation}</p>
            )}
          </div>
          <div className="text-center text-xs text-text-tertiary font-medium animate-pulse">Click vào thẻ để lật xem nghĩa</div>
        </div>

        {/* Mặt sau */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between p-8 bg-surface border-2 border-primary/20 rounded-2xl shadow-xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Mặt sau (Tiếng Việt)</div>
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
            <h4 className="text-2xl font-bold text-foreground">{card.back}</h4>
            {card.example && (
              <div className="max-w-md bg-background/60 p-3 rounded-xl border border-border/60 text-left">
                <span className="text-xs font-bold text-text-tertiary block mb-1">Ví dụ:</span>
                <p className="text-sm italic text-text-secondary leading-relaxed font-medium">{card.example}</p>
              </div>
            )}
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {card.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-border/40 text-text-secondary rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-center text-xs text-text-tertiary font-medium">Click để lật lại</div>
        </div>
      </div>
    </div>
  );
}
