/**
 * @file AssistantMessageBubble.tsx
 * @description Bong bóng tin nhắn AI/bot — sử dụng Tailwind Utility Classes thay thế inline styles.
 */
"use client";

import { MessagePrimitive, useMessage } from "@assistant-ui/react";
import { AIAvatar } from "./AIAvatar";
import { injectStyles, parseBilingualContent } from "./bubble-styles";

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
                <p className="text-sm leading-relaxed font-medium text-foreground">
                  {bilingual.en}
                </p>
                <p className="text-xs mt-1.5 leading-relaxed text-muted-foreground border-t border-border pt-1.5">
                  {bilingual.vi}
                </p>
              </div>
            );
          }
          return <p className="text-sm leading-relaxed text-foreground">{text}</p>;
        },
      }}
    />
  );
}

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
      <div className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] bg-glass-bubble shadow-md">
        <BilingualAssistantContent />
      </div>
    </div>
  );
}
