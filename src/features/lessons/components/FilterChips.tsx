'use client';

import { motion } from 'framer-motion';
import type { FilterOption } from '../types';

interface FilterChipsProps {
  options: FilterOption[];
  activeValue: string;
  onSelect: (value: string) => void;
}

export function FilterChips({ options, activeValue, onSelect }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((option) => {
        const isActive = option.value === activeValue;
        return (
          <motion.button
            key={option.value}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(option.value)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--surface-2)]'
            }`}
          >
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
}
