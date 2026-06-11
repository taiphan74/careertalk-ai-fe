/**
 * Danh sách lịch sử bài viết đã lưu cho lesson hiện tại
 */

'use client';

import { useWritingStore } from '../store/useWritingStore';

interface WritingHistoryListProps {
  lessonId: string;
}

export function WritingHistoryList({ lessonId }: WritingHistoryListProps) {
  const { essays, activeEssayId, setActiveEssay, deleteEssay } = useWritingStore();

  // Chỉ hiện bài viết thuộc lesson này
  const lessonEssays = essays.filter((e) => e.lessonId === lessonId);

  if (lessonEssays.length === 0) return null;

  return (
    <div className="mt-8 border-t border-border pt-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Lịch sử bài viết</h2>
      <div className="space-y-2">
        {lessonEssays.map((essay) => (
          <div
            key={essay.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              essay.id === activeEssayId
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-surface'
            }`}
            onClick={() => setActiveEssay(essay.id)}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm text-foreground line-clamp-1 flex-1 mr-2">
                {essay.text.slice(0, 60) || '(Chưa viết)'}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEssay(essay.id);
                }}
                className="text-xs text-muted-foreground hover:text-red-500"
              >
                Xóa
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  essay.status === 'checked'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}
              >
                {essay.status === 'checked' ? 'Đã chấm' : 'Nháp'}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(essay.updatedAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
