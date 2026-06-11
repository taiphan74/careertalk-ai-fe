"use client";

/**
 * ScrollSection — wrapper full-viewport cho mỗi section landing page.
 * Tự động thêm min-h-screen + whileInView animation khi section vào viewport.
 * Hỗ trợ 4 direction: up (default), down, left, right.
 */

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollSectionProps {
  children: ReactNode;
  /** Hướng slide vào — default "up" */
  direction?: Direction;
  /** Delay animation — default 0 */
  delay?: number;
  /** Class bổ sung cho wrapper */
  className?: string;
  id?: string;
}

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 40  },
  down:  { x: 0,   y: -40 },
  left:  { x: -48, y: 0   },
  right: { x: 48,  y: 0   },
};

/**
 * Bọc mỗi section landing để có full-viewport height + scroll-triggered animation.
 *
 * @param direction - Hướng slide vào viewport
 * @param delay     - Delay trước khi animation bắt đầu (giây)
 * @param className - Class Tailwind bổ sung
 */
export function ScrollSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
  id,
}: ScrollSectionProps) {
  const { x, y } = OFFSET[direction];

  return (
    <motion.section
      id={id}
      className={`min-h-screen flex flex-col justify-center snap-section ${className}`}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
