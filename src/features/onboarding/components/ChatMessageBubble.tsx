"use client";

import { MessagePrimitive } from "@assistant-ui/react";
import type { BilingualContent } from "../types";

/**
 * Bong bóng tin nhắn người dùng.
 * Căn phải, nền primary color, bo góc trái dưới để phân biệt với bot.
 * Content luôn là string thuần (không song ngữ).
 */
export function UserMessageBubble() {
  return (
    <div className="flex justify-end">
      <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
        <MessagePrimitive.Content />
      </div>
    </div>
  );
}

/**
 * Parse JSON string từ assistant-ui content part sang BilingualContent.
 * Trả về null nếu parse thất bại hoặc không đúng format.
 */
function parseBilingualContent(text: string): BilingualContent | null {
  try {
    const parsed = JSON.parse(text);
    if (parsed?.en && parsed?.vi) {
      return parsed as BilingualContent;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Component render nội dung song ngữ cho assistant message.
 * Tiếng Anh hiển thị chính (đậm, rõ), tiếng Việt phụ bên dưới (mờ, nhỏ hơn).
 * Nếu content không phải JSON hợp lệ → fallback render text thuần.
 */
function BilingualAssistantContent() {
  // Lấy raw text từ MessagePrimitive context
  // assistant-ui truyền content parts qua context, ta cần đọc từ parent
  // Cách tiếp cận: dùng render prop pattern của MessagePrimitive.Content
  return (
    <MessagePrimitive.Content
      components={{
        Text: ({ text }) => {
          const bilingual = parseBilingualContent(text);
          if (bilingual) {
            return (
              <div>
                <p className="font-medium">{bilingual.en}</p>
                <p className="text-xs opacity-60 mt-1">{bilingual.vi}</p>
              </div>
            );
          }
          // Fallback: render text thuần nếu không parse được JSON
          return <p>{text}</p>;
        },
      }}
    />
  );
}

/**
 * Bong bóng tin nhắn AI/bot.
 * Căn trái, nền muted color, bo góc phải dưới để phân biệt với user.
 * Render song ngữ: EN chính + VI phụ mờ bên dưới.
 */
export function AssistantMessageBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
        <BilingualAssistantContent />
      </div>
    </div>
  );
}
