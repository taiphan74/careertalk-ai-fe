/**
 * @file page.tsx
 * @description Thin route wrapper cho /flashcards sử dụng Shared FeatureHeader.
 */
"use client";

import { useState } from "react";
import { useFlashcards } from "@/features/flashcards/hooks/useFlashcards";
import { useGenerateFlashcards } from "@/features/flashcards/hooks/useGenerateFlashcards";
import { DeckList } from "@/features/flashcards/components/DeckList";
import { CardViewer } from "@/features/flashcards/components/CardViewer";
import { CreateDeckModal } from "@/features/flashcards/components/CreateDeckModal";
import { FeatureHeader } from "@/components/shared/FeatureHeader";

export default function FlashcardsPage() {
  const { currentDeck, setCurrentDeck } = useFlashcards();
  const { generateDeck, isGenerating } = useGenerateFlashcards();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FeatureHeader
        title="Flashcards"
        subtitle="Hệ thống thẻ từ vựng thông minh hỗ trợ phỏng vấn"
        backUrl="/"
        backLabel="Về trang chủ"
      />

      <main className="py-8 flex-1 container max-w-6xl mx-auto px-4">
        {currentDeck ? (
          <CardViewer onBack={() => setCurrentDeck(null)} />
        ) : (
          <DeckList
            onGenerateDeck={generateDeck}
            onCreateDeck={() => setShowCreateModal(true)}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {showCreateModal && (
        <CreateDeckModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
