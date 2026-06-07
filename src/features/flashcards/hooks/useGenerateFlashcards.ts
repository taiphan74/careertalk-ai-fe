/**
 * @file useGenerateFlashcards.ts
 * @description Hook xử lý AI deck generation từ profile người dùng.
 * Gọi /api/generate-flashcards → parse response → addDeck vào store.
 *
 * Tách khỏi page để page giữ thin wrapper.
 * Profile đọc từ localStorage key careertalk_profile.
 */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { UserProfile } from "@/features/onboarding/types";
import type { Flashcard, FlashcardDeck } from "../types";
import { useFlashcardStore } from "../store/useFlashcardStore";

const PROFILE_KEY = "careertalk_profile";

/** Shape của một card trả về từ /api/generate-flashcards */
interface GeneratedCard {
  front: string;
  back: string;
  example?: string;
  pronunciation?: string;
  tags?: string[];
}

export function useGenerateFlashcards() {
  const addDeck = useFlashcardStore((s) => s.addDeck);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDeck = async () => {
    try {
      setIsGenerating(true);

      const profileRaw = localStorage.getItem(PROFILE_KEY);
      if (!profileRaw) {
        toast.error("Vui lòng hoàn thành onboarding trước khi tạo bộ thẻ AI");
        return;
      }

      const profile: UserProfile = JSON.parse(profileRaw);

      const response = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occupation: profile.occupation,
          goal: profile.goal,
          level: profile.level,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();

      const cards: Flashcard[] = (data.cards as GeneratedCard[]).map((card) => ({
        id: crypto.randomUUID(),
        front: card.front,
        back: card.back,
        example: card.example,
        pronunciation: card.pronunciation,
        tags: card.tags ?? [],
        createdAt: new Date().toISOString(),
        reviewCount: 0,
        status: "new" as const,
      }));

      const newDeck: FlashcardDeck = {
        id: crypto.randomUUID(),
        name: data.deckName,
        description: data.description,
        cards,
        source: "ai-generated",
        profileContext: {
          occupation: profile.occupation,
          goal: profile.goal,
          level: profile.level,
        },
        createdAt: new Date().toISOString(),
      };

      addDeck(newDeck);
      toast.success(`Đã tạo bộ thẻ "${newDeck.name}" với ${cards.length} thẻ!`);
    } catch (error) {
      console.error("Failed to generate deck:", error);
      toast.error("Không thể tạo bộ thẻ. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateDeck, isGenerating };
}
