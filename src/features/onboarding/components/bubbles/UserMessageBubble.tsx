"use client";

/**
 * Bong bóng tin nhắn người dùng.
 *
 * Layout: căn phải, gradient ocean blue, shadow tinh tế.
 * Animation: slide-in từ dưới lên (bubbleIn keyframe).
 * Translation pill: hiển thị bản dịch EN (từ Ollama) bên dưới nếu có.
 *
 * Data flow:
 * - Đọc translationEn từ Zustand store (translationMap[messageId])
 * - translationEn được set bởi useOnboardingFlow.handleSend TRƯỚC khi message render
 *
 * Visual tokens: import từ ../../lib/styles (GRADIENTS.userBubble, SHADOWS.*, GLASS.*).
 */

import { MessagePrimitive, useMessage } from "@assistant-ui/react";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { injectStyles } from "./bubble-styles";
import { GRADIENTS, GLASS, SHADOWS } from "../../lib/styles";

/**
 * User message bubble component.
 * Render nội dung người dùng + optional translation pill bên dưới.
 *
 * @returns JSX element — user bubble với translation pill (nếu có)
 */
export function UserMessageBubble() {
  injectStyles();
  const message = useMessage();
  // Đọc translationEn từ store map theo messageId
  const translationEn = useOnboardingStore((s) => s.translationMap[message.id]);

  return (
    <div className="flex flex-col items-end gap-1 bubble-anim" style={{ animationDelay: "0.04s" }}>
      {/* Bubble chính */}
      <div
        className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] text-white text-sm leading-relaxed"
        style={{
          background: GRADIENTS.userBubble,
          boxShadow: SHADOWS.userBubble,
        }}
      >
        <MessagePrimitive.Content />
      </div>

      {/* Translation pill — hiển thị nếu có bản dịch */}
      {translationEn && (
        <div
          className="max-w-[80%] px-3 py-1.5 text-xs"
          style={{
            ...GLASS.translationPill,
            borderRadius: "10px",
            color: "var(--primary-text)",
            fontStyle: "italic",
            lineHeight: 1.5,
            boxShadow: SHADOWS.translationPill,
          }}
        >
          <span style={{ opacity: 0.6, fontSize: "10px", fontStyle: "normal", fontWeight: 600, marginRight: "4px" }}>EN</span>
          {translationEn}
        </div>
      )}
    </div>
  );
}
