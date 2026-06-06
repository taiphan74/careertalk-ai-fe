"use client";

import { MessagePrimitive, useMessage } from "@assistant-ui/react";
import type { BilingualContent } from "../types";

/**
 * CSS animation keyframes cho bubble fade-in + slide-up.
 * Inject 1 lần duy nhất vào DOM (component mount đầu tiên).
 */
const BUBBLE_STYLES = `
  @keyframes bubbleIn {
    from { opacity: 0; transform: translateY(10px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes typingBounce {
    0%, 80%, 100% { transform: translateY(0); }
    40%           { transform: translateY(-6px); }
  }
  .bubble-anim {
    animation: bubbleIn 0.28s cubic-bezier(0.34, 1.2, 0.64, 1) both;
  }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = BUBBLE_STYLES;
  document.head.appendChild(el);
  stylesInjected = true;
}

/**
 * Bong bóng tin nhắn người dùng.
 * Căn phải, gradient ocean blue, shadow tinh tế, animation slide-in.
 */
export function UserMessageBubble() {
  injectStyles();
  return (
    <div className="flex justify-end bubble-anim" style={{ animationDelay: "0.04s" }}>
      <div
        className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] text-white text-sm leading-relaxed"
        style={{
          background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
          boxShadow: "0 2px 12px rgba(96,165,250,0.28), 0 1px 3px rgba(59,130,246,0.15)",
        }}
      >
        <MessagePrimitive.Content />
      </div>
    </div>
  );
}

/**
 * Parse JSON string → BilingualContent.
 * Trả null nếu không đúng format {en, vi}.
 */
function parseBilingualContent(text: string): BilingualContent | null {
  try {
    const parsed = JSON.parse(text);
    if (parsed?.en && parsed?.vi) return parsed as BilingualContent;
    return null;
  } catch {
    return null;
  }
}

/**
 * Render nội dung song ngữ EN (chính) + VI (phụ, mờ hơn).
 * Fallback sang plain text nếu không parse được JSON.
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
 * Avatar SVG cho AI — icon sóng ocean.
 */
function AIAvatar() {
  return (
    <div
      className="flex-none w-8 h-8 rounded-full flex items-center justify-center self-end mb-1"
      style={{
        background: "linear-gradient(135deg, #60A5FA 0%, #38BDF8 100%)",
        boxShadow: "0 2px 8px rgba(96,165,250,0.30)",
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 11 C5.5 8, 8.5 8, 11 11 C13.5 14, 16.5 14, 19 11"
          stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        />
        <path
          d="M3 16 C5.5 13, 8.5 13, 11 16 C13.5 19, 16.5 19, 19 16"
          stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Bong bóng tin nhắn AI/bot.
 * Căn trái, có avatar, glassmorphism nhẹ, animation slide-in từ trái.
 * Render song ngữ: EN primary + VI muted bên dưới có separator.
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

/**
 * Bubble hiển thị khi AI đang xử lý response.
 * Cùng layout với AssistantMessageBubble: avatar trái + glassmorphism bubble.
 * Animation: 3 dot wave bounce với Ocean Blue gradient glow.
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
