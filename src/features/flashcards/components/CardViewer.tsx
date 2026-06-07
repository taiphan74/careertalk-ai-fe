/**
 * Component hiển thị card viewer để study một deck.
 */
"use client";

import { useFlashcards } from "../hooks/useFlashcards";
import { FlashcardCard } from "./FlashcardCard";

export function CardViewer() {
  const {
    currentDeck,
    currentCard,
    currentCardIndex,
    isFlipped,
    isCompleted,
    nextCard,
    previousCard,
    toggleFlip,
    markCardAsReviewed,
    setCurrentDeck,
  } = useFlashcards();

  if (!currentDeck) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-gray-600">Không có bộ thẻ nào được chọn.</p>
        <button
          onClick={() => setCurrentDeck(null)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const isFirstCard = currentCardIndex === 0;

  // Completion screen
  if (isCompleted || !currentCard) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center py-16">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hoàn thành bộ thẻ!</h2>
        <p className="text-gray-600 mb-8">
          Bạn đã ôn tập xong {currentDeck.cards.length} thẻ trong bộ "{currentDeck.name}"
        </p>
        <button
          onClick={() => setCurrentDeck(null)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const handleSwipe = (direction: "left" | "right") => {
    const remembered = direction === "right";
    markCardAsReviewed(currentDeck.id, currentCard.id, remembered);
    setTimeout(() => {
      nextCard();
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setCurrentDeck(null)}
          className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition"
        >
          ← Thoát
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{currentDeck.name}</h2>
          <div className="text-sm text-gray-600">Thẻ {currentCardIndex + 1} / {currentDeck.cards.length}</div>
        </div>
        <div className="w-24" />
      </div>

      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / currentDeck.cards.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <FlashcardCard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={toggleFlip}
          onSwipe={handleSwipe}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={previousCard}
          disabled={isFirstCard}
          className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Trước
        </button>
        <button
          onClick={nextCard}
          disabled={isCompleted}
          className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau →
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-8">
          <div>← Vuốt trái: Cần ôn</div>
          <div>Swipe phải: Đã nhớ →</div>
        </div>
      </div>
    </div>
  );
}
