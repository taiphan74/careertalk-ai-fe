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
        <div className="absolute inset-0 backface-hidden flex flex-col justify-between p-8 bg-card border border-border rounded-2xl shadow-md">
          <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">English</div>
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-3">
            <h3 className="text-3xl font-semibold text-foreground tracking-tight leading-tight">{card.front}</h3>
            {card.pronunciation && (
              <span className="text-sm font-mono text-primary bg-primary/8 px-3 py-1 rounded-md border border-primary/10">{card.pronunciation}</span>
            )}
          </div>
          <div className="text-center text-[11px] text-muted-foreground/60">Tap to flip</div>
        </div>

        {/* Mặt sau */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between p-8 bg-muted/30 border border-border rounded-2xl shadow-md">
          <div className="text-[11px] font-medium uppercase tracking-widest text-primary">Tiếng Việt</div>
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
            <h4 className="text-2xl font-semibold text-foreground leading-snug">{card.back}</h4>
            {card.example && (
              <div className="max-w-md bg-background/50 p-3 rounded-lg border border-border/50 text-left">
                <span className="text-[11px] font-medium text-muted-foreground block mb-1 uppercase tracking-wide">Ví dụ</span>
                <p className="text-sm italic text-muted-foreground leading-relaxed">{card.example}</p>
              </div>
            )}
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {card.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-border/30 text-muted-foreground rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-center text-[11px] text-muted-foreground/60">Tap to flip back</div>
        </div>
      </div>
    </div>
  );
}
