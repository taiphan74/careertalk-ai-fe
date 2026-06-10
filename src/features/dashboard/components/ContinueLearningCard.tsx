'use client';

/**
 * @fileoverview Hero card hiển thị bài học đang dang dở trên dashboard.
 * Glassmorphism gradient primary→accent, Bangers heading, progress bar.
 * Spans full width mobile, 2 cols desktop trong bento grid.
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { ContinueLearningData } from '@/features/lessons/types';

interface ContinueLearningCardProps {
  /** Dữ liệu bài học đang học dở */
  lesson: ContinueLearningData;
}

/** Category label mapping sang tiếng Việt */
const CATEGORY_LABELS: Record<string, string> = {
  grammar: 'Ngữ pháp',
  vocabulary: 'Từ vựng',
  skills: 'Kỹ năng',
};

/**
 * Hero card cho continue learning section.
 * Hiển thị tiêu đề, category badge, progress bar và CTA button.
 * Max 4 text elements: category label, headline, progress text, CTA.
 */
export function ContinueLearningCard({ lesson }: ContinueLearningCardProps) {
  const categoryLabel = CATEGORY_LABELS[lesson.category] ?? lesson.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-2"
    >
      <Card className="bg-glass-bubble rounded-2xl p-6 md:p-8 border-border/40 h-full flex flex-col justify-between gap-4 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-primary/80">
            {categoryLabel}
          </span>
          <h2
            className="text-2xl md:text-3xl text-foreground leading-tight"
            style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.04em' }}
          >
            {lesson.title}
          </h2>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full bg-border/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${lesson.progress}%`,
                  background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                }}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground tabular-nums">
              {lesson.progress}%
            </span>
          </div>

          <Link
            href="/lessons"
            className="no-underline self-start inline-flex items-center justify-center rounded-xl px-6 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            }}
          >
            Tiếp tục học
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
