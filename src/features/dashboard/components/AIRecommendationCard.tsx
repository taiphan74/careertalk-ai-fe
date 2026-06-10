'use client';

/**
 * @fileoverview Thẻ hiển thị gợi ý học tập từ AI trên dashboard.
 * Accent border trái, italic description, CTA button nhỏ.
 * Dữ liệu mock trong demo phase.
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { AIRecommendation } from '../types';

interface AIRecommendationCardProps {
  /** Dữ liệu gợi ý từ AI */
  recommendation: AIRecommendation;
}

/**
 * Thẻ AI recommendation với accent border trái và CTA.
 * Icon sparkles để phân biệt với các card stats thông thường.
 */
export function AIRecommendationCard({ recommendation }: AIRecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="rounded-2xl p-5 h-full border-border/40 bg-surface border-l-4 border-l-accent flex flex-col gap-3">
        <div className="flex items-center gap-2 text-accent">
          <Sparkles size={18} />
          <span className="text-xs font-medium uppercase tracking-widest">
            AI gợi ý
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground leading-snug">
          {recommendation.title}
        </h3>

        <p className="text-sm text-muted-foreground italic leading-relaxed flex-1">
          {recommendation.description}
        </p>

        <Link
          href={recommendation.ctaHref}
          className="no-underline self-start inline-flex items-center justify-center rounded-xl border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
        >
          {recommendation.ctaLabel}
        </Link>
      </Card>
    </motion.div>
  );
}
