/**
 * Bottom drawer hiển thị kết quả chấm điểm AI
 * Bao gồm score bars và danh sách lỗi phát hiện
 */

'use client';

import { WritingScore, WritingCorrection } from '../types';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface FeedbackDrawerProps {
  open: boolean;
  onClose: () => void;
  scores: WritingScore[];
  corrections: WritingCorrection[];
}

export function FeedbackDrawer({ open, onClose, scores, corrections }: FeedbackDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-2xl p-6 z-50 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-lg font-bold text-foreground">
              Kết quả chấm điểm
            </Dialog.Title>
            <Dialog.Close className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </Dialog.Close>
          </div>

          {/* Score Bars */}
          <div className="space-y-4 mb-6">
            {scores.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="font-medium text-foreground">{Math.round(s.score)}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Corrections List */}
          {corrections.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">
                Lỗi phát hiện ({corrections.length})
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {corrections.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-surface">
                    <span className="text-red-500 font-medium">{c.message}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-green-600 font-medium">{c.suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {corrections.length === 0 && (
            <p className="text-sm text-muted-foreground">Không phát hiện lỗi. Bài viết rất tốt!</p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
