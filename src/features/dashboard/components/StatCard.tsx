'use client';

/**
 * @fileoverview Thẻ hiển thị một chỉ số thống kê đơn lẻ trên dashboard.
 * Dùng cho lessons completed, flashcards mastered, thời gian học, v.v.
 * Style: glassmorphism + Bangers font cho số liệu + hover scale nhẹ.
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  /** Tiêu đề mô tả chỉ số */
  title: string;
  /** Giá trị hiển thị (số hoặc chuỗi format sẵn) */
  value: string | number;
  /** Icon minh họa (Lucide hoặc tương tự) */
  icon: React.ReactNode;
  /** Đường dẫn điều hướng khi click card (optional) */
  href?: string;
}

/**
 * Thẻ stat compact với icon, giá trị lớn và tiêu đề nhỏ.
 * Hỗ trợ entry animation fade-up và hover scale.
 */
export function StatCard({ title, value, icon, href }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`bg-glass-composer rounded-2xl p-5 flex flex-col gap-2 h-full border-border/40 ${href ? 'cursor-pointer hover:border-primary/30 transition-colors' : ''}`}>
        {href ? (
          <Link href={href} className="no-underline flex flex-col gap-2">
            <div className="text-primary/70 w-8 h-8">{icon}</div>
            <span
              className="text-3xl md:text-4xl text-foreground leading-none"
              style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.04em' }}
            >
              {value}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              {title}
            </span>
          </Link>
        ) : (
          <>
            <div className="text-primary/70 w-8 h-8">{icon}</div>
            <span
              className="text-3xl md:text-4xl text-foreground leading-none"
              style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.04em' }}
            >
              {value}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              {title}
            </span>
          </>
        )}
      </Card>
    </motion.div>
  );
}
