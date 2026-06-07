"use client";

/**
 * Bubble hiển thị khi AI đang xử lý response.
 *
 * Layout: giống AssistantMessageBubble (avatar trái + glassmorphism).
 * Animation: 3 dot wave bounce với Ocean Blue gradient glow.
 * - Mỗi dot delay 0.18s (stagger) tạo hiệu ứng sóng
 * - Keyframe typingBounce từ bubble-styles.ts
 *
 * Data flow:
 * - Render trong ThreadPrimitive.If running (chỉ khi isRunning=true)
 * - Vị trí: sau Messages trong Viewport
 *
 * NO framer-motion — pure CSS keyframe đủ mượt.
 */

import { AIAvatar } from "./AIAvatar";
import { injectStyles } from "./bubble-styles";

/**
 * Typing indicator bubble component.
 * Hiển thị 3 dot bouncing khi AI đang generate response.
 *
 * @returns JSX element — bubble với 3 animated dots
 */
export function TypingIndicatorBubble() {
  injectStyles();
  return (
    <div className="flex items-end gap-2 bubble-anim">
      <AIAvatar />
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3"
        style={{
          background: "rgba(240,249,255,0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(191,219,254,0.6)",
          boxShadow: "0 2px 12px rgba(37,99,235,0.08), 0 1px 3px rgba(0,0,0,0.05)",
          minWidth: "64px",
        }}
      >
        <div className="flex items-center gap-1.5 py-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, #60A5FA 0%, #38BDF8 100%)`,
                boxShadow: "0 0 6px rgba(96,165,250,0.5)",
                animation: `typingBounce 1.1s ease-in-out infinite`,
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
