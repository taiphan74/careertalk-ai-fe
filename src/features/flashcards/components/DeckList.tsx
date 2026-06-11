/**
 * @file DeckList.tsx
 * @description Component hiển thị danh sách tất cả các bộ thẻ (decks) — áp dụng hệ thống Primitives dùng chung.
 */
"use client";

import { motion } from "framer-motion";
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
      <div className="max-w-2xl mx-auto p-6 md:p-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">Chưa có bộ thẻ nào</h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm mb-8 leading-relaxed">
          Tạo bộ thẻ đầu tiên để bắt đầu hành trình chinh phục tiếng Anh chuyên ngành của bạn.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            onClick={onGenerateDeck}
            disabled={isGenerating}
            className="w-full sm:w-auto px-5 py-2.5 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {isGenerating ? "Đang tạo..." : "Tạo bằng AI"}
          </Button>
          <Button
            variant="outline"
            onClick={onCreateDeck}
            className="w-full sm:w-auto px-5 py-2.5 font-medium"
          >
            Tạo thủ công
          </Button>
          <Button
            variant="ghost"
            onClick={seedMockDecks}
            className="w-full sm:w-auto px-5 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            Load dữ liệu mẫu
          </Button>
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
            className="flex-1 sm:flex-initial bg-primary text-primary-foreground"
          >
            {isGenerating ? "Đang tạo..." : "Tạo bằng AI"}
          </Button>
          <Button variant="outline" onClick={onCreateDeck} className="flex-1 sm:flex-initial">
            Tạo thủ công
          </Button>
        </div>
      </div>

      {/* Grid danh sách bộ thẻ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck, index) => (
          <motion.div
            key={deck.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(37, 99, 235, 0.08)" }}
            className="group cursor-pointer rounded-2xl border border-border bg-card text-card-foreground shadow transition-shadow overflow-hidden flex flex-col justify-between"
          >
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary">
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
              
              <div className="text-xs text-muted-foreground space-y-1.5 bg-muted/30 p-3 rounded-lg border border-border/40">
                <div className="flex justify-between items-center">
                  <span>Số lượng</span>
                  <span className="font-medium text-foreground tabular-nums">{deck.cards.length} thẻ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nguồn</span>
                  <span className="font-medium text-foreground">
                    {deck.source === "ai-generated" ? "AI" : "Thủ công"}
                  </span>
                </div>
                {deck.lastStudiedAt && (
                  <div className="flex justify-between items-center pt-1.5 border-t border-border/40 mt-1.5">
                    <span>Cập nhật</span>
                    <span className="font-medium text-foreground">
                      {new Date(deck.lastStudiedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-4 bg-surface/20 border-t border-border/30">
              <Button
                onClick={() => handleStudy(deck)}
                className="flex-1 bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
