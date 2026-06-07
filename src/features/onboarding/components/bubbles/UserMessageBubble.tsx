"use client";

/**
 * Bong bóng tin nhắn người dùng.
 *
 * Layout: căn phải, gradient ocean blue (#60A5FA → #3B82F6), shadow tinh tế.
 * Animation: slide-in từ dưới lên (bubbleIn keyframe).
 * Translation pill: hiển thị bản dịch EN (từ Ollama) bên dưới nếu có.
 *
 * Data flow:
 * - Đọc translationEn từ Zustand store (translationMap[messageId])
 * - translationEn được set bởi useOnboardingFlow.handleSend TRƯỚC khi message render
 *
 * GOTCHA: guard tránh render pill khi translation rỗng.
 */

import { MessagePrimitive, useMessage } from "@assistant-ui/react";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { injectStyles } from "./bubble-styles";

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
          background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
          boxShadow: "0 2px 12px rgba(96,165,250,0.28), 0 1px 3px rgba(59,130,246,0.15)",
        }}
      >
        <MessagePrimitive.Content />
      </div>

      {/* Translation pill — hiển thị nếu có bản dịch */}
      {translationEn && (
        <div
          className="max-w-[80%] px-3 py-1.5 text-xs"
          style={{
            background: "rgba(239,246,255,0.90)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(147,197,253,0.50)",
            borderRadius: "10px",
            color: "var(--primary-text)",
            fontStyle: "italic",
            lineHeight: 1.5,
            boxShadow: "0 1px 4px rgba(37,99,235,0.08)",
          }}
        >
          <span style={{ opacity: 0.6, fontSize: "10px", fontStyle: "normal", fontWeight: 600, marginRight: "4px" }}>EN</span>
          {translationEn}
        </div>
      )}
    </div>
  );
}
