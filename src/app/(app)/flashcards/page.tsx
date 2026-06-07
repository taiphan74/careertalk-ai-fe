/**
 * @file page.tsx
 * @description Thin route wrapper cho /flashcards.
 * Business logic trong useGenerateFlashcards hook.
 * UI state (showCreateModal) giữ ở đây vì chỉ dùng trong page này.
 */
"use client";

import { useState } from "react";
import { useFlashcards } from "@/features/flashcards/hooks/useFlashcards";
import { useGenerateFlashcards } from "@/features/flashcards/hooks/useGenerateFlashcards";
import { DeckList } from "@/features/flashcards/components/DeckList";
import { CardViewer } from "@/features/flashcards/components/CardViewer";
import { CreateDeckModal } from "@/features/flashcards/components/CreateDeckModal";

export default function FlashcardsPage() {
  const { currentDeck } = useFlashcards();
  const { generateDeck, isGenerating } = useGenerateFlashcards();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-gray-600 hover:text-gray-900 transition">← Về trang chủ</a>
          <h1 className="text-xl font-bold text-gray-900">📚 Flashcards</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="py-8">
        {currentDeck ? (
          <CardViewer />
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
