export type LessonLevel = 'A2' | 'B1' | 'B2';
export type LessonCategory = 'grammar' | 'vocabulary' | 'skills';

export interface Lesson {
  id: string;
  title: string;
  category: LessonCategory;
  level?: LessonLevel;
  topic?: string;
  domain?: string;
  type?: string;
  skill?: string;
  duration: string;
  progress: number; // 0-100
}

export interface ContinueLearningData {
  lessonId: string;
  title: string;
  category: LessonCategory;
  progress: number;
  lastStudied: string;
}

export type TabKey = 'for-you' | 'grammar' | 'vocabulary' | 'skills';

export interface FilterOption {
  label: string;
  value: string;
}
