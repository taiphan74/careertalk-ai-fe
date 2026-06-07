/**
 * @file CreateDeckModal.tsx
 * @description Modal tạo deck mới thủ công, áp dụng hệ thống Primitives chuẩn (Dialog, Card, Button, Input, Label).
 * Cho phép thêm cards ngay trong modal trước khi lưu.
 */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useFlashcards } from "../hooks/useFlashcards";
import type { Flashcard } from "../types";
import { CreateCardForm } from "./CreateCardForm";

/** Input từ CreateCardForm — bỏ id/timestamps/reviewCount/status */
type CardFormInput = Pick<Flashcard, "front" | "back" | "example" | "pronunciation" | "tags">;

interface CreateDeckModalProps {
  /** Hàm đóng modal khi hoàn thành hoặc hủy bỏ */
  onClose: () => void;
}

export function CreateDeckModal({ onClose }: CreateDeckModalProps) {
  const { addDeck } = useFlashcards();
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);

  /** Xử lý tạo deck — validate + gọi addDeck */
  const handleSubmit = () => {
    if (!deckName.trim()) {
      toast.error("Vui lòng nhập tên bộ thẻ");
      return;
    }
    addDeck({
      id: crypto.randomUUID(),
      name: deckName.trim(),
      description: description.trim() || undefined,
      cards,
      source: "user-created",
      createdAt: new Date().toISOString(),
    });
    toast.success(`Đã tạo bộ thẻ "${deckName.trim()}" với ${cards.length} thẻ!`);
    onClose();
  };

  /** Thêm card mới vào danh sách tạm */
  const handleAddCard = (input: CardFormInput) => {
    const card: Flashcard = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      reviewCount: 0,
      status: "new",
    };
    setCards((prev) => [...prev, card]);
    setShowAddCard(false);
    toast.success("Đã thêm thẻ!");
  };

  /** Xóa card khỏi danh sách tạm theo index */
  const handleRemoveCard = (index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden bg-background border border-border rounded-2xl shadow-2xl">
        
        {/* Header Modal */}
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Tạo bộ thẻ mới
          </DialogTitle>
        </DialogHeader>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto scrollbar">
          
          {/* Deck Metadata Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deck-name">Tên bộ thẻ *</Label>
              <Input
                id="deck-name"
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="VD: English for IT - Basics"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deck-desc">Mô tả (optional)</Label>
              <textarea
                id="deck-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Bộ thẻ này dùng để..."
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
          </div>

          {/* Flashcards List Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Thẻ ({cards.length})</Label>
              <Button 
                size="sm" 
                variant="default"
                onClick={() => setShowAddCard(true)}
              >
                + Thêm thẻ
              </Button>
            </div>

            {cards.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-xl bg-surface/50">
                Chưa có thẻ nào. Click "Thêm thẻ" để bắt đầu.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {cards.map((card, index) => (
                  <div 
                    key={card.id} 
                    className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{card.front}</div>
                      <div className="text-sm text-text-secondary truncate">{card.back}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveCard(index)}
                      className="text-danger hover:text-danger-hover hover:bg-danger-light"
                    >
                      Xóa
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form thêm thẻ con động lồng bên trong */}
          {showAddCard && (
            <CreateCardForm onAdd={handleAddCard} onCancel={() => setShowAddCard(false)} />
          )}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-6 border-t border-border flex gap-3 justify-end bg-surface/30">
          <Button variant="outline" onClick={onClose} className="px-6">
            Hủy
          </Button>
          <Button 
            variant="default"
            onClick={handleSubmit} 
            className="px-6 bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            Tạo bộ thẻ
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
