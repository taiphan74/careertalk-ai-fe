'use client';

/**
 * @fileoverview Thẻ hiển thị streak (số ngày học liên tiếp) trên dashboard.
 * Warm accent tint background, flame icon với pulse animation nhẹ.
 * Compact layout phù hợp bento grid cell đơn.
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  /** Số ngày streak liên tiếp */
  days: number;
}

/**
 * Thẻ streak với icon lửa và số ngày nổi bật.
 * Pulse animation trên icon để thu hút sự chú ý.
 */
export function StreakCard({ days }: StreakCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="rounded-2xl p-5 flex flex-col gap-2 h-full border-border/40 bg-orange-50 dark:bg-orange-950/20">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-orange-500 w-8 h-8"
        >
          <Flame size={28} fill="currentColor" />
        </motion.div>
        <span
          className="text-3xl md:text-4xl text-foreground leading-none"
          style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.04em' }}
        >
          {days}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          ngày liên tiếp
        </span>
      </Card>
    </motion.div>
  );
}
