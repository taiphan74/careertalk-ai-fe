'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, ChevronRight } from 'lucide-react';
import type { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

export function LessonCard({ lesson, index }: LessonCardProps) {
  const router = useRouter();
  const isComplete = lesson.progress === 100;
  const isInProgress = lesson.progress > 0 && lesson.progress < 100;

  /** Navigate đến trang bài học theo loại skill */
  const handleClick = () => {
    if (lesson.category === 'skills' && lesson.skill === 'Viết') {
      router.push(`/writing/${lesson.id}`);
    }
    // TODO: các skill khác sẽ thêm sau
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(37, 99, 235, 0.08)' }}
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-shadow"
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="rounded-full bg-[var(--primary-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--primary-text)]">
          {lesson.level || lesson.skill || lesson.domain || lesson.topic}
        </span>
        {isComplete && (
          <span className="rounded-full bg-[var(--success-light)] px-2 py-0.5 text-xs font-medium text-[var(--success-text)]">
            Hoàn thành
          </span>
        )}
      </div>

      <h3 className="mb-2 text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
        {lesson.title}
      </h3>

      <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {lesson.duration}
        </span>
      </div>

      {isInProgress && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
            style={{ width: `${lesson.progress}%` }}
          />
        </div>
      )}

      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100">
        Bắt đầu học <ChevronRight size={12} />
      </div>
    </motion.div>
  );
}
