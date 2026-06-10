'use client';

/**
 * @fileoverview Feed hiển thị lịch sử hoạt động học tập gần đây.
 * Vertical list với dot indicator primary color và timestamp muted.
 * Không dùng <ul> trần cho >5 items theo convention.
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BookOpen, Layers, Flame } from 'lucide-react';
import type { ActivityItem, ActivityType } from '../types';

interface ActivityFeedProps {
  /** Danh sách hoạt động gần đây */
  items: ActivityItem[];
}

/** Icon mapping theo loại hoạt động */
const ACTIVITY_ICONS: Record<ActivityType, React.ReactNode> = {
  lesson_completed: <BookOpen size={16} />,
  deck_created: <Layers size={16} />,
  streak_milestone: <Flame size={16} />,
};

/**
 * Feed hiển thị danh sách hoạt động học tập.
 * Mỗi item có icon theo type, tiêu đề và timestamp.
 * Empty state khi không có hoạt động nào.
 */
export function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <Card className="rounded-2xl p-6 border-border/40 bg-surface text-center">
        <p className="text-sm text-muted-foreground">Chưa có hoạt động nào</p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-3"
    >
      <Card className="rounded-2xl p-5 border-border/40 bg-surface flex flex-col gap-1">
        <h3
          className="text-lg text-foreground mb-3"
          style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.04em' }}
        >
          HOẠT ĐỘNG GẦN ĐÂY
        </h3>

        <div className="flex flex-col">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 py-3 ${
                index < items.length - 1 ? 'border-b border-border/30' : ''
              }`}
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {ACTIVITY_ICONS[item.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.title}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {item.timestamp}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
