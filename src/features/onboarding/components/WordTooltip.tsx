'use client';

/**
 * @file WordTooltip.tsx
 * @description Dropdown tooltip hiển thị định nghĩa cho 1 từ tiếng Anh.
 * Trigger: hover (desktop) + tap toggle (mobile).
 * Style: light card, border rõ, dễ đọc trên mọi nền.
 */

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { WordEntry } from '../lib/word-dictionary';

interface WordTooltipProps {
  entry: WordEntry;
  children: React.ReactNode;
}

/** Badge màu nhạt dễ đọc trên nền trắng */
const POS_COLORS: Record<string, string> = {
  noun:        'bg-blue-100 text-blue-700 border border-blue-200',
  verb:        'bg-green-100 text-green-700 border border-green-200',
  adjective:   'bg-amber-100 text-amber-700 border border-amber-200',
  adverb:      'bg-purple-100 text-purple-700 border border-purple-200',
  pronoun:     'bg-pink-100 text-pink-700 border border-pink-200',
  preposition: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
};

export function WordTooltip({ entry, children }: WordTooltipProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const posColor = POS_COLORS[entry.partOfSpeech] ?? 'bg-gray-100 text-gray-600 border border-gray-200';

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className="cursor-help border-b-2 border-dashed border-primary/40 transition-colors hover:border-primary"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-64 p-4 rounded-xl border border-border bg-white shadow-lg"
      >
        {/* Word + POS badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-gray-900">{entry.word}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${posColor}`}>
            {entry.partOfSpeech}
          </span>
        </div>

        {/* Definition */}
        <p className="text-sm leading-relaxed text-gray-700 mb-2">
          {entry.definition}
        </p>

        {/* Example */}
        <p className="text-xs leading-relaxed text-gray-400 italic border-t border-gray-100 pt-2">
          &ldquo;{entry.example}&rdquo;
        </p>
      </PopoverContent>
    </Popover>
  );
}
