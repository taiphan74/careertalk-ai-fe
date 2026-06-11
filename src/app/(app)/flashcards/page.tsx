"use client";

import { useState } from "react";
import { useFlashcards } from "@/features/flashcards/hooks/useFlashcards";
import { useGenerateFlashcards } from "@/features/flashcards/hooks/useGenerateFlashcards";
import { DeckList } from "@/features/flashcards/components/DeckList";
import { CardViewer } from "@/features/flashcards/components/CardViewer";
import { CreateDeckModal } from "@/features/flashcards/components/CreateDeckModal";
import { Plus } from "@phosphor-icons/react";

export default function FlashcardsPage() {
  const { currentDeck, setCurrentDeck } = useFlashcards();
  const { generateDeck, isGenerating } = useGenerateFlashcards();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">
              Flashcards
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              Hệ thống thẻ từ vựng thông minh hỗ trợ phỏng vấn
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
          >
            <Plus size={16} weight="bold" />
            Tạo bộ thẻ
          </button>
        </div>

        {currentDeck ? (
          <CardViewer onBack={() => setCurrentDeck(null)} />
        ) : (
          <DeckList
            onGenerateDeck={generateDeck}
            onCreateDeck={() => setShowCreateModal(true)}
            isGenerating={isGenerating}
          />
        )}
      </div>

      {showCreateModal && (
        <CreateDeckModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}
