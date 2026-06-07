/**
 * @file useFlashcardStore.ts
 * @description Zustand store quản lý state cho Flashcard feature.
 * Dùng persist middleware để tự động sync với localStorage.
 * Key: 'careertalk_flashcards'
 *
 * State:
 * - decks: danh sách tất cả decks (persisted)
 * - currentDeck: deck đang study (session only)
 * - currentCardIndex: index của card hiện tại (session only)
 * - isFlipped: trạng thái lật thẻ (session only)
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FlashcardDeck } from "../types";

interface FlashcardStore {
  decks: FlashcardDeck[];
  currentDeck: FlashcardDeck | null;
  currentCardIndex: number;
  isFlipped: boolean;

  addDeck: (deck: FlashcardDeck) => void;
  deleteDeck: (deckId: string) => void;
  setCurrentDeck: (deck: FlashcardDeck | null) => void;
  nextCard: () => void;
  previousCard: () => void;
  toggleFlip: () => void;
  resetFlip: () => void;
  markCardAsReviewed: (deckId: string, cardId: string, remembered: boolean) => void;
}

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      decks: [],
      currentDeck: null,
      currentCardIndex: 0,
      isFlipped: false,

      addDeck: (deck) =>
        set((state) => ({ decks: [...state.decks, deck] })),

      deleteDeck: (deckId) =>
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== deckId),
          currentDeck: state.currentDeck?.id === deckId ? null : state.currentDeck,
          currentCardIndex: 0,
        })),

      setCurrentDeck: (deck) =>
        set({ currentDeck: deck, currentCardIndex: 0, isFlipped: false }),

      nextCard: () => {
        const { currentDeck, currentCardIndex } = get();
        if (!currentDeck) return;
        // Increment past last card để trigger completion screen
        set({ currentCardIndex: currentCardIndex + 1, isFlipped: false });
      },

      previousCard: () => {
        const { currentCardIndex } = get();
        if (currentCardIndex > 0) {
          set({ currentCardIndex: currentCardIndex - 1, isFlipped: false });
        }
      },

      toggleFlip: () =>
        set((state) => ({ isFlipped: !state.isFlipped })),

      resetFlip: () =>
        set({ isFlipped: false }),

      markCardAsReviewed: (deckId, cardId, remembered) => {
        set((state) => {
          const newDecks = state.decks.map((deck) => {
            if (deck.id !== deckId) return deck;
            const newCards = deck.cards.map((card) => {
              if (card.id !== cardId) return card;
              const newReviewCount = card.reviewCount + 1;
              let newStatus = card.status;
              if (remembered) {
                newStatus = newReviewCount >= 3 ? "mastered" : "learning";
              } else {
                if (card.status === "mastered") newStatus = "learning";
              }
              return {
                ...card,
                reviewCount: newReviewCount,
                status: newStatus,
                lastReviewedAt: new Date().toISOString(),
              };
            });
            return { ...deck, cards: newCards, lastStudiedAt: new Date().toISOString() };
          });
          const newCurrentDeck =
            state.currentDeck?.id === deckId
              ? newDecks.find((d) => d.id === deckId) ?? null
              : state.currentDeck;
          return { decks: newDecks, currentDeck: newCurrentDeck };
        });
      },
    }),
    {
      name: "careertalk_flashcards",
      // Chỉ persist decks — UI state reset mỗi session
      partialize: (state) => ({ decks: state.decks }),
    },
  ),
);
