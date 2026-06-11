"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useErrorTrackingStore } from "../store/useErrorTrackingStore";
import { useFlashcardStore } from "../../flashcards/store/useFlashcardStore";
import { toast } from "sonner";
import type { Flashcard, FlashcardDeck } from "../../flashcards/types";

/**
 * Chat bubble hiện tổng hợp lỗi ngữ pháp khi onboarding hoàn thành.
 * Hiển thị như 1 tin nhắn assistant đặc biệt trong luồng chat.
 * User có thể lưu từng lỗi hoặc lưu tất cả vào Flashcard.
 */
export function ErrorSummaryBubble() {
  const errors = useErrorTrackingStore((s) => s.errors);
  const clearErrors = useErrorTrackingStore((s) => s.clearErrors);
  const addDeck = useFlashcardStore((s) => s.addDeck);
  const router = useRouter();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [allSaved, setAllSaved] = useState(false);

  if (errors.length === 0) return null;

  const DECK_NAME = "Lỗi ngữ pháp - Onboarding";

  const makeCard = (e: typeof errors[0], i: number): Flashcard => ({
    id: `err-${Date.now()}-${i}`,
    front: e.correct,
    back: e.reason,
    example: e.context,
    tags: ["grammar", "onboarding"],
    createdAt: new Date().toISOString(),
    reviewCount: 0,
    status: "new",
  });

  const handleSaveOne = (idx: number) => {
    const card = makeCard(errors[idx], idx);
    const existingDeck = useFlashcardStore.getState().decks.find(
      (d) => d.name === DECK_NAME
    );
    if (existingDeck) {
      const updatedCards = [...existingDeck.cards, card];
      useFlashcardStore.setState((s) => ({
        decks: s.decks.map((d) =>
          d.id === existingDeck.id ? { ...d, cards: updatedCards } : d
        ),
      }));
    } else {
      const deck: FlashcardDeck = {
        id: `deck-onboarding-${Date.now()}`,
        name: DECK_NAME,
        description: `${errors.length} lỗi ngữ pháp từ phiên onboarding`,
        cards: [card],
        source: "ai-generated",
        createdAt: new Date().toISOString(),
      };
      addDeck(deck);
    }
    setSavedIds((prev) => new Set([...prev, `${idx}`]));
    toast.success(`Đã lưu "${errors[idx].correct}" vào Flashcard!`);
  };

  const handleSaveAll = () => {
    const cards = errors.map((e, i) => makeCard(e, i));
    const deck: FlashcardDeck = {
      id: `deck-onboarding-${Date.now()}`,
      name: DECK_NAME,
      description: `${cards.length} lỗi ngữ pháp từ phiên onboarding`,
      cards,
      source: "ai-generated",
      createdAt: new Date().toISOString(),
    };
    addDeck(deck);
    clearErrors();
    setAllSaved(true);
    toast.success(`Đã lưu ${cards.length} thẻ vào Flashcard!`);
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="max-w-[85%] mx-auto my-3"
    >
      <div className="rounded-2xl p-4 space-y-3 bg-glass-bubble border border-border shadow-md">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-border/60">
          <span className="text-base">🔍</span>
          <span className="text-sm font-bold text-foreground">
            {errors.length} lỗi ngữ pháp phát hiện
          </span>
        </div>

        {/* Error list */}
        {!allSaved ? (
          <div className="space-y-2">
            {errors.map((err, i) => {
              const isSaved = savedIds.has(`${i}`);
              return (
                <div
                  key={`${err.wrong}-${err.correct}`}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-surface/50 border border-border/40"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-medium text-danger line-through">
                        {err.wrong}
                      </span>
                      <span className="text-xs text-text-tertiary">→</span>
                      <span className="text-sm font-bold text-success">
                        {err.correct}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                      {err.reason}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSaveOne(i)}
                    disabled={isSaved}
                    className={`shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                      isSaved
                        ? "bg-success/10 text-success cursor-default"
                        : "bg-primary/10 text-primary hover:bg-primary/20 active:scale-[0.96]"
                    }`}
                  >
                    {isSaved ? "✓" : "Lưu"}
                  </button>
                </div>
              );
            })}

            {/* Save all CTA */}
            <button
              onClick={handleSaveAll}
              className="w-full py-2.5 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Lưu tất cả vào Flashcard
            </button>
          </div>
        ) : (
          /* All saved state */
          <div className="text-center py-2 space-y-2">
            <p className="text-sm text-success font-medium">
              Đã lưu vào Flashcard!
            </p>
            <Link
              href="/flashcards"
              className="inline-block px-4 py-2 text-sm font-semibold rounded-xl bg-accent/10 text-accent hover:bg-accent/20 active:scale-[0.98] transition-all"
            >
              Xem thẻ
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
