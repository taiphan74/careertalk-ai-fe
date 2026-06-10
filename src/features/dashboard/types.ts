/**
 * @fileoverview Định nghĩa kiểu dữ liệu cho Dashboard feature.
 * Bao gồm stats tổng quan, AI recommendations và activity feed.
 */

/** Thống kê tổng quan hiển thị trên dashboard */
export interface DashboardStats {
  /** Số bài học đã hoàn thành */
  lessonsCompleted: number;
  /** Tổng số bài học khả dụng */
  totalLessons: number;
  /** Số flashcard đã mastered */
  flashcardsMastered: number;
  /** Tổng số flashcard */
  totalFlashcards: number;
  /** Số ngày streak liên tiếp */
  streakDays: number;
  /** Tổng thời gian học (giờ) */
  timeSpentHours: number;
}

/** Gợi ý học tập từ AI */
export interface AIRecommendation {
  /** ID duy nhất của recommendation */
  id: string;
  /** Tiêu đề gợi ý */
  title: string;
  /** Mô tả ngắn gọn */
  description: string;
  /** Nhãn nút CTA */
  ctaLabel: string;
  /** Đường dẫn điều hướng khi click CTA */
  ctaHref: string;
}

/** Loại hoạt động trong feed */
export type ActivityType = 'lesson_completed' | 'deck_created' | 'streak_milestone';

/** Một mục trong activity feed */
export interface ActivityItem {
  /** ID duy nhất */
  id: string;
  /** Loại hoạt động */
  type: ActivityType;
  /** Tiêu đề mô tả hoạt động */
  title: string;
  /** Thời gian xảy ra (ISO string hoặc relative) */
  timestamp: string;
}
