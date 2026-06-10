'use client';

import { ContinueLearningCard } from './ContinueLearningCard';
import { LessonCard } from './LessonCard';
import { MOCK_CONTINUE, MOCK_LESSONS } from '../mocks/mock-lessons';

export function ForYouTab() {
  // Recommended: mix of incomplete lessons from all categories
  const recommended = Object.values(MOCK_LESSONS)
    .flat()
    .filter((l) => l.progress < 100)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <ContinueLearningCard data={MOCK_CONTINUE} />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Gợi ý cho bạn</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommended.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
