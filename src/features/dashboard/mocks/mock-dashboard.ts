/**
 * @fileoverview Dữ liệu giả lập cho Dashboard.
 * Sử dụng trong demo phase khi backend chưa sẵn sàng.
 * Stats thật được tính từ Zustand stores qua useDashboardData hook.
 */

import type { AIRecommendation, ActivityItem } from '../types';

/** Số ngày streak giả lập */
export const MOCK_STREAK_DAYS = 12;

/** Tổng thời gian học giả lập (giờ) */
export const MOCK_TIME_SPENT_HOURS = 4.2;

/** Gợi ý học tập từ AI (mock) */
export const MOCK_AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-001',
    title: 'Luyện tập salary negotiation',
    description: 'Bạn chưa thực hành chủ đề đàm phán lương. Hãy thử role-play với AI coach.',
    ctaLabel: 'Bắt đầu ngay',
    ctaHref: '/chat?scenario=salary-negotiation',
  },
  {
    id: 'rec-002',
    title: 'Ôn lại tech interview vocab',
    description: '5 từ vựng chuyên ngành bạn hay nhầm lẫn tuần này cần được củng cố.',
    ctaLabel: 'Xem flashcards',
    ctaHref: '/flashcards?filter=needs-review',
  },
  {
    id: 'rec-003',
    title: 'Hoàn thành grammar quiz',
    description: 'Bài kiểm tra ngữ pháp cơ bản còn dang dở. Chỉ mất 5 phút.',
    ctaLabel: 'Tiếp tục',
    ctaHref: '/lessons/grammar-basics-quiz',
  },
];

/** Activity feed giả lập */
export const MOCK_ACTIVITY_FEED: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'lesson_completed',
    title: 'Hoàn thành "Tech Interview Basics"',
    timestamp: '2 giờ trước',
  },
  {
    id: 'act-002',
    type: 'deck_created',
    title: 'Tạo bộ flashcard "Business Email"',
    timestamp: '5 giờ trước',
  },
  {
    id: 'act-003',
    type: 'streak_milestone',
    title: 'Đạt mốc 10 ngày liên tiếp!',
    timestamp: '2 ngày trước',
  },
  {
    id: 'act-004',
    type: 'lesson_completed',
    title: 'Hoàn thành "Daily Standup Practice"',
    timestamp: '3 ngày trước',
  },
  {
    id: 'act-005',
    type: 'deck_created',
    title: 'AI tạo bộ flashcard từ cuộc hội thoại',
    timestamp: '4 ngày trước',
  },
];
