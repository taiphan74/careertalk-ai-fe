'use client';

/**
 * @fileoverview Grid layout chính của Dashboard.
 * Tổng hợp tất cả cards thành asymmetric bento grid.
 * Mobile: single column. Desktop: 3 cols với hero span 2.
 * Entry animation stagger 0.06s giữa các children.
 */

import { BookOpen, Layers, Clock } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
import { ContinueLearningCard } from './ContinueLearningCard';
import { StatCard } from './StatCard';
import { StreakCard } from './StreakCard';
import { AIRecommendationCard } from './AIRecommendationCard';
import { ActivityFeed } from './ActivityFeed';

/**
 * Bento grid wrapper cho toàn bộ dashboard content.
 * Gọi useDashboardData để lấy aggregated data và render 6 card types.
 */
export function DashboardBentoGrid() {
  const { stats, continueLearning, aiRecommendations, activityFeed } = useDashboardData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Hero: Continue Learning (span 2 cols desktop) */}
      <ContinueLearningCard lesson={continueLearning} />

      {/* Streak Card */}
      <StreakCard days={stats.streakDays} />

      {/* Lessons Progress Stat */}
      <StatCard
        title="Bài học hoàn thành"
        value={`${stats.lessonsCompleted}/${stats.totalLessons}`}
        icon={<BookOpen size={28} />}
        href="/lessons"
      />

      {/* Flashcards Mastered Stat */}
      <StatCard
        title="Flashcard thuộc lòng"
        value={stats.flashcardsMastered}
        icon={<Layers size={28} />}
        href="/flashcards"
      />

      {/* Time Spent Stat */}
      <StatCard
        title="Thời gian học"
        value={`${stats.timeSpentHours}h`}
        icon={<Clock size={28} />}
      />

      {/* AI Recommendation */}
      <AIRecommendationCard recommendation={aiRecommendations[0]} />

      {/* Activity Feed (full width) */}
      <ActivityFeed items={activityFeed} />
    </div>
  );
}
