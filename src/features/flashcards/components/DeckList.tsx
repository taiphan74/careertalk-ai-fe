/**
 * @file DeckList.tsx
 * @description Component hiển thị danh sách tất cả các bộ thẻ (decks) — áp dụng hệ thống Primitives dùng chung.
 */
"use client";

import { useFlashcards } from "../hooks/useFlashcards";
import { ReviewStats } from "./ReviewStats";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import type { FlashcardDeck } from "../types";

interface DeckListProps {
  /** Hàm kích hoạt AI tự động tạo bộ thẻ mới */
  onGenerateDeck: () => void;
  /** Hàm mở Modal tạo bộ thẻ thủ công */
  onCreateDeck: () => void;
  /** Trạng thái AI đang xử lý sinh dữ liệu */
  isGenerating: boolean;
}

export function DeckList({ onGenerateDeck, onCreateDeck, isGenerating }: DeckListProps) {
  const { decks, setCurrentDeck, deleteDeck, seedMockDecks } = useFlashcards();

  const handleStudy = (deck: FlashcardDeck) => {
    setCurrentDeck(deck);
  };

  const handleDelete = (deckId: string, deckName: string) => {
    if (confirm(`Xóa bộ thẻ "${deckName}"? Hành động này không thể hoàn tác.`)) {
      deleteDeck(deckId);
    }
  };

  // Trạng thái trống (Empty State)
  if (decks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="text-center py-16 bg-surface/30 border-2 border-dashed border-border rounded-2xl p-8">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Chưa có bộ thẻ nào</h2>
          <p className="text-text-secondary mb-8 max-w-sm mx-auto">
            Bắt đầu nâng cao trình độ tiếng Anh chuyên ngành bằng cách tạo bộ thẻ đầu tiên của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onGenerateDeck}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-5 bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              {isGenerating ? "Đang tạo..." : "🤖 AI tạo bộ thẻ cho tôi"}
            </Button>
            <Button
              variant="outline"
              onClick={onCreateDeck}
              className="w-full sm:w-auto px-6 py-5 font-semibold"
            >
              ✏️ Tạo thủ công
            </Button>
            <Button
              variant="ghost"
              onClick={seedMockDecks}
              className="w-full sm:w-auto px-6 py-5 text-primary hover:bg-primary-light font-semibold"
            >
              🎲 Load Demo Data
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
      
      {/* Header danh sách */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-border pb-5">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bộ thẻ của tôi</h2>
          <p className="text-sm text-text-secondary mt-1">Quản lý và ôn luyện kiến thức tích lũy ({decks.length} bộ)</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            onClick={onGenerateDeck}
            disabled={isGenerating}
            className="flex-1 sm:flex-initial bg-gradient-to-r from-primary to-accent text-white"
          >
            {isGenerating ? "Đang tạo..." : "🤖 AI tạo mới"}
          </Button>
          <Button variant="outline" onClick={onCreateDeck} className="flex-1 sm:flex-initial">
            ✏️ Tạo thủ công
          </Button>
        </div>
      </div>

      {/* Grid danh sách bộ thẻ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <Card 
            key={deck.id} 
            className="flex flex-col justify-between bg-card border border-border hover:border-border-strong hover:shadow-md transition duration-200 overflow-hidden"
          >
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                {deck.name}
              </CardTitle>
              {deck.description && (
                <CardDescription className="text-sm text-text-secondary line-clamp-2 min-h-[40px]">
                  {deck.description}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-4 py-2">
              <ReviewStats deck={deck} />
              
              <div className="text-xs text-text-tertiary space-y-1 bg-surface p-3 rounded-xl border border-border/50">
                <div className="flex justify-between">
                  <span>Dung lượng:</span>
                  <span className="font-medium text-text-secondary">📦 {deck.cards.length} thẻ</span>
                </div>
                <div className="flex justify-between">
                  <span>Nguồn khởi tạo:</span>
                  <span className="font-medium text-text-secondary">
                    {deck.source === "ai-generated" ? "🤖 AI tự động" : "✏️ Thủ công"}
                  </span>
                </div>
                {deck.lastStudiedAt && (
                  <div className="flex justify-between pt-1 border-t border-border/40 mt-1">
                    <span>Học lần cuối:</span>
                    <span className="font-medium text-text-secondary">
                      📅 {new Date(deck.lastStudiedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-4 bg-surface/20 border-t border-border/30">
              <Button
                onClick={() => handleStudy(deck)}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-medium shadow-sm hover:shadow-md"
              >
                Học ngay
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(deck.id, deck.name)}
                className="text-danger border-border hover:bg-danger-light hover:text-danger-hover hover:border-danger/30"
              >
                Xóa
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
