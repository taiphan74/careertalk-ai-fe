/**
 * Editor viết bài với logic kiểm tra AI on-demand
 * Quản lý trạng thái writing/checking/reviewing
 */

'use client';

import { useState } from 'react';
import { useWritingStore } from '../store/useWritingStore';
import { InlineHighlight } from './InlineHighlight';
import { FeedbackDrawer } from './FeedbackDrawer';

export function WritingEditor() {
  const { essays, activeEssayId, updateEssayText, saveFeedback } = useWritingStore();
  const activeEssay = essays.find((e) => e.id === activeEssayId);
  const [isChecking, setIsChecking] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!activeEssay) return null;

  const isReviewing = activeEssay.status === 'checked' && activeEssay.corrections.length > 0;

  const handleCheck = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/writing-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: activeEssay.text }),
      });
      const data = await res.json();
      saveFeedback(activeEssay.id, data.corrections, data.scores);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  /** Quay lại chế độ chỉnh sửa (xóa feedback tạm thời) */
  const handleContinueEditing = () => {
    saveFeedback(activeEssay.id, [], []);
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex-1 relative">
        {isReviewing ? (
          <InlineHighlight text={activeEssay.text} corrections={activeEssay.corrections} />
        ) : (
          <textarea
            className="w-full h-full min-h-[300px] p-4 rounded-2xl bg-surface border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            placeholder="Bắt đầu viết bài luận của bạn tại đây..."
            value={activeEssay.text}
            onChange={(e) => updateEssayText(activeEssay.id, e.target.value)}
            disabled={isChecking}
          />
        )}
      </div>

      <div className="flex gap-2">
        {isReviewing ? (
          <button
            onClick={handleContinueEditing}
            className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-surface"
          >
            Tiếp tục chỉnh sửa
          </button>
        ) : (
          <button
            onClick={handleCheck}
            disabled={isChecking || activeEssay.text.trim().length < 10}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isChecking ? 'Đang kiểm tra...' : 'Kiểm tra bài viết'}
          </button>
        )}
      </div>

      <FeedbackDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        scores={activeEssay.scores}
        corrections={activeEssay.corrections}
      />
    </div>
  );
}
