/**
 * Component hiển thị thống kê ôn tập cho một deck.
 * 
 * Shows:
 * - Tổng số thẻ
 * - Số thẻ mastered / learning / new
 * - Progress bar
 * - Completion rate
 */
import type { FlashcardDeck } from "../types";

interface ReviewStatsProps {
  deck: FlashcardDeck;
}

export function ReviewStats({ deck }: ReviewStatsProps) {
  const total = deck.cards.length;
  const mastered = deck.cards.filter((c) => c.status === "mastered").length;
  const learning = deck.cards.filter((c) => c.status === "learning").length;
  const newCards = deck.cards.filter((c) => c.status === "new").length;

  const completionRate = total > 0 ? Math.round((mastered / total) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Tiến độ</span>
          <span>{completionRate}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-700">{mastered}</div>
          <div className="text-xs text-green-600">Đã thuộc</div>
        </div>
        
        <div className="p-2 bg-yellow-50 rounded-lg">
          <div className="text-lg font-bold text-yellow-700">{learning}</div>
          <div className="text-xs text-yellow-600">Đang học</div>
        </div>
        
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-700">{newCards}</div>
          <div className="text-xs text-gray-600">Mới</div>
        </div>
      </div>
    </div>
  );
}
