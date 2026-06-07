/**
 * @file useFlashcards.ts
 * @description Thin hook wrapper expose state + actions từ useFlashcardStore.
 * Component không import store trực tiếp — chỉ dùng hook này.
 *
 * @pattern Consistent với useOnboardingStore → useFlashcards pattern
 */
"use client";

import { useFlashcardStore } from "../store/useFlashcardStore";

export function useFlashcards() {
  const decks = useFlashcardStore((s) => s.decks);
  const currentDeck = useFlashcardStore((s) => s.currentDeck);
  const currentCardIndex = useFlashcardStore((s) => s.currentCardIndex);
  const isFlipped = useFlashcardStore((s) => s.isFlipped);
  const addDeck = useFlashcardStore((s) => s.addDeck);
  const deleteDeck = useFlashcardStore((s) => s.deleteDeck);
  const setCurrentDeck = useFlashcardStore((s) => s.setCurrentDeck);
  const nextCard = useFlashcardStore((s) => s.nextCard);
  const previousCard = useFlashcardStore((s) => s.previousCard);
  const toggleFlip = useFlashcardStore((s) => s.toggleFlip);
  const resetFlip = useFlashcardStore((s) => s.resetFlip);
  const markCardAsReviewed = useFlashcardStore((s) => s.markCardAsReviewed);
  const seedMockDecks = useFlashcardStore((s) => s.seedMockDecks);

  /** Card hiện tại đang study (null nếu không có deck hoặc hết bài) */
  const currentCard = currentDeck?.cards[currentCardIndex] ?? null;

  /** Đã qua hết cards của deck chưa */
  const isCompleted =
    currentDeck !== null && currentCardIndex >= currentDeck.cards.length;

  return {
    decks,
    currentDeck,
    currentCard,
    currentCardIndex,
    isFlipped,
    isCompleted,
    addDeck,
    deleteDeck,
    setCurrentDeck,
    nextCard,
    previousCard,
    toggleFlip,
    resetFlip,
    markCardAsReviewed,
    seedMockDecks,
  };
}
