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
 *
 * Visual tokens: import từ ../../lib/styles (GLASS.assistantBubble, SHADOWS.*, GRADIENTS.avatarOcean).
 */

import { AIAvatar } from "./AIAvatar";
import { injectStyles } from "./bubble-styles";
import { GRADIENTS, GLASS, SHADOWS } from "../../lib/styles";

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
          ...GLASS.assistantBubble,
          boxShadow: SHADOWS.glassBubble,
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
                background: GRADIENTS.avatarOcean,
                boxShadow: SHADOWS.typingDot,
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
