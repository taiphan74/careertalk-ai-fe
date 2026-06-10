/**
 * @fileoverview Hook tổng hợp dữ liệu cho Dashboard.
 * Kết hợp stats thật từ Zustand stores (lessons, flashcards)
 * với mock data (AI recommendations, activity feed, streak).
 */

import { useMemo } from 'react';
import { useFlashcardStore } from '@/features/flashcards/store/useFlashcardStore';
import { MOCK_LESSONS, MOCK_CONTINUE } from '@/features/lessons/mocks/mock-lessons';
import type { DashboardStats, AIRecommendation, ActivityItem } from '../types';
import type { ContinueLearningData } from '@/features/lessons/types';
import {
  MOCK_STREAK_DAYS,
  MOCK_TIME_SPENT_HOURS,
  MOCK_AI_RECOMMENDATIONS,
  MOCK_ACTIVITY_FEED,
} from '../mocks/mock-dashboard';

/** Shape trả về của hook useDashboardData */
interface UseDashboardDataReturn {
  /** Thống kê tổng quan (phần real + phần mock) */
  stats: DashboardStats;
  /** Bài học đang dang dở để hiển thị hero card */
  continueLearning: ContinueLearningData;
  /** Gợi ý học tập từ AI (mock) */
  aiRecommendations: AIRecommendation[];
  /** Lịch sử hoạt động gần đây (mock) */
  activityFeed: ActivityItem[];
  /** Trạng thái loading (luôn false vì data sync) */
  isLoading: boolean;
}

/**
 * Hook tổng hợp dữ liệu dashboard từ nhiều nguồn.
 * - Stats lessons/flashcards: tính realtime từ stores và mock data
 * - Streak/time/AI/activity: mock cố định trong demo phase
 */
export function useDashboardData(): UseDashboardDataReturn {
  const decks = useFlashcardStore((state) => state.decks);

  const stats = useMemo<DashboardStats>(() => {
    // Tính lessons stats từ MOCK_LESSONS (vì lessons store chỉ có UI state)
    const allLessons = Object.values(MOCK_LESSONS).flat();
    const lessonsCompleted = allLessons.filter((l) => l.progress === 100).length;
    const totalLessons = allLessons.length;

    // Tính flashcards stats từ Zustand store (real persisted data)
    const allCards = decks.flatMap((deck) => deck.cards);
    const flashcardsMastered = allCards.filter((c) => c.status === 'mastered').length;
    const totalFlashcards = allCards.length;

    return {
      lessonsCompleted,
      totalLessons,
      flashcardsMastered,
      totalFlashcards,
      streakDays: MOCK_STREAK_DAYS,
      timeSpentHours: MOCK_TIME_SPENT_HOURS,
    };
  }, [decks]);

  return {
    stats,
    continueLearning: MOCK_CONTINUE,
    aiRecommendations: MOCK_AI_RECOMMENDATIONS,
    activityFeed: MOCK_ACTIVITY_FEED,
    isLoading: false,
  };
}
