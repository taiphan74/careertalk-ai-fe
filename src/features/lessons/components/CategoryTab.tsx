'use client';

import { useMemo } from 'react';
import { FilterChips } from './FilterChips';
import { LessonCard } from './LessonCard';
import { useLessonsStore } from '../store/useLessonsStore';
import type { Lesson, FilterOption, LessonCategory } from '../types';

interface CategoryTabProps {
  category: LessonCategory;
  lessons: Lesson[];
  filters: FilterOption[];
  filterKey: string;
}

export function CategoryTab({ category, lessons, filters, filterKey }: CategoryTabProps) {
  const { filters: activeFilters, setFilter } = useLessonsStore();
  const activeValue = activeFilters[filterKey] || 'all';

  const filtered = useMemo(() => {
    if (activeValue === 'all') return lessons;
    return lessons.filter((l) => {
      const val = l.level || l.domain || l.skill || l.topic;
      return val === activeValue;
    });
  }, [lessons, activeValue]);

  return (
    <div className="space-y-6">
      <FilterChips
        options={filters}
        activeValue={activeValue}
        onSelect={(v) => setFilter(filterKey, v)}
      />

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-[var(--text-secondary)]">
          Không có bài học nào phù hợp với bộ lọc này.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
