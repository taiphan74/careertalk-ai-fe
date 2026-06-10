'use client';

import { Play } from 'lucide-react';
import type { ContinueLearningData } from '../types';

interface ContinueLearningCardProps {
  data: ContinueLearningData;
}

export function ContinueLearningCard({ data }: ContinueLearningCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] p-6 backdrop-blur-sm">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
        Tiếp tục học
      </p>
      <h2 className="mb-1 text-xl font-bold text-[var(--foreground)]">{data.title}</h2>
      <p className="mb-4 text-sm text-[var(--text-secondary)]">
        {data.category.charAt(0).toUpperCase() + data.category.slice(1)} · Học lần cuối {data.lastStudied}
      </p>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-white/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
          style={{ width: `${data.progress}%` }}
        />
      </div>

      <button className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)]">
        <Play size={16} fill="currentColor" />
        Tiếp tục ({data.progress}%)
      </button>
    </div>
  );
}
