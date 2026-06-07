"use client";

/**
 * Bong bóng tin nhắn AI/bot.
 *
 * Layout: căn trái, có avatar (AIAvatar), glassmorphism nhẹ (frosted glass).
 * Animation: slide-in từ trái (bubbleIn keyframe).
 * Render song ngữ: EN primary (đậm) + VI muted (nhạt hơn, có separator).
 *
 * Data flow:
 * - AI trả JSON {en, vi} → runtime serialize thành string
 * - BilingualAssistantContent parse JSON → render 2 dòng
 * - Fallback sang plain text nếu không parse được JSON
 *
 * GOTCHA (assistant-ui v0.14):
 * - Guard useMessage() — nếu content rỗng (AI đang chạy) → return null
 * - assistant-ui tự inject AssistantMessage rỗng khi isRunning=true
 * - Nếu không guard → render ô trắng trước khi có TypingIndicatorBubble
 */

import { MessagePrimitive, useMessage } from "@assistant-ui/react";
import { AIAvatar } from "./AIAvatar";
import { injectStyles, parseBilingualContent } from "./bubble-styles";

/**
 * Render nội dung song ngữ EN (chính) + VI (phụ, mờ hơn).
 * Fallback sang plain text nếu không parse được JSON.
 *
 * @returns JSX element — MessagePrimitive.Content với Text render prop
 */
function BilingualAssistantContent() {
  return (
    <MessagePrimitive.Content
      components={{
        Text: ({ text }) => {
          const bilingual = parseBilingualContent(text);
          if (bilingual) {
            return (
              <div>
                <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--foreground)" }}>
                  {bilingual.en}
                </p>
                <p
                  className="text-xs mt-1.5 leading-relaxed"
                  style={{
                    color: "var(--muted-foreground)",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "6px",
                  }}
                >
                  {bilingual.vi}
                </p>
              </div>
            );
          }
          return <p className="text-sm leading-relaxed">{text}</p>;
        },
      }}
    />
  );
}

/**
 * Assistant message bubble component.
 * Render AI response với avatar + glassmorphism + bilingual content.
 *
 * @returns JSX element hoặc null nếu content rỗng
 */
export function AssistantMessageBubble() {
  injectStyles();
  const message = useMessage();
  // Guard: nếu content rỗng (assistant-ui placeholder khi isRunning) → không render
  const text = message.content
    .filter((c): c is { type: "text"; text: string } => c.type === "text")
    .map((c) => c.text)
    .join("")
    .trim();
  if (!text) return null;
  return (
    <div className="flex items-end gap-2 bubble-anim">
      <AIAvatar />
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]"
        style={{
          background: "rgba(240,249,255,0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(191,219,254,0.6)",
          boxShadow: "0 2px 12px rgba(37,99,235,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <BilingualAssistantContent />
      </div>
    </div>
  );
}
