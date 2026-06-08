/**
 * @file EmptyState.tsx
 * @description Màn hình chào mừng khi chưa có tin nhắn nào.
 * Thiết kế theo phong cách "Premium Calm" — typography làm chính,
 * không dùng emoji, không dùng div-based fake screenshots.
 * 
 * Cấu trúc:
 * - Heading lớn (tracking tight)
 * - Subtitle ngắn gọn (≤ 20 từ)
 * - 3 Quick Prompts (user click → auto-send)
 */
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

/**
 * Danh sách gợi ý câu hỏi ban đầu.
 * Mỗi prompt có label (hiển thị) và text (gửi đi).
 */
const QUICK_PROMPTS = [
  {
    id: "interview",
    label: "Luyện phỏng vấn kỹ thuật",
    text: "Tôi muốn luyện phỏng vấn kỹ thuật bằng tiếng Anh",
  },
  {
    id: "presentation",
    label: "Chuẩn bị thuyết trình",
    text: "Tôi cần chuẩn bị một bài thuyết trình công việc",
  },
  {
    id: "email",
    label: "Viết email chuyên nghiệp",
    text: "Tôi muốn học cách viết email chuyên nghiệp",
  },
] as const;

interface EmptyStateProps {
  /** Callback khi user click vào quick prompt */
  onQuickPrompt: (text: string) => void;
}

export function EmptyState({ onQuickPrompt }: EmptyStateProps) {
  const reduceMotion = useReducedMotion();

  // Animation variants cho stagger children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-6 max-w-md mx-auto text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Heading — Geist, tracking tight, intentional weight */}
      <motion.h1
        variants={item}
        className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]"
      >
        Bắt đầu cuộc trò chuyện
      </motion.h1>

      {/* Subtitle — muted, ≤ 20 words */}
      <motion.p
        variants={item}
        className="mt-3 text-sm text-muted-foreground max-w-[30ch] leading-relaxed"
      >
        Chọn một gợi ý bên dưới hoặc nhập câu hỏi của bạn để bắt đầu luyện tập.
      </motion.p>

      {/* Quick Prompts Grid */}
      <motion.ul
        variants={item}
        className="mt-8 w-full space-y-2.5"
      >
        {QUICK_PROMPTS.map((prompt, index) => (
          <motion.li
            key={prompt.id}
            variants={item}
          >
            <button
              type="button"
              onClick={() => onQuickPrompt(prompt.text)}
              className="group w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:bg-accent/50 hover:border-border transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Subtle number indicator */}
                <span className="flex-none w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground tabular-nums">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground truncate">
                  {prompt.label}
                </span>
              </div>
              {/* Arrow icon — rotates on hover */}
              <ArrowUpRight
                weight="bold"
                className="flex-none w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
