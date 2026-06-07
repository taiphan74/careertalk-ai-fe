/**
 * @file UserMessageBubble.tsx
 * @description Bong bóng tin nhắn từ phía Người dùng — Primary gradient + Translation Pill bên dưới.
 * Data flow: đọc translationEn từ useOnboardingStore.translationMap[messageId].
 */
"use client";

import { MessagePrimitive, useMessage } from "@assistant-ui/react";
import { useOnboardingStore } from "../../store/useOnboardingStore";

export function UserMessageBubble() {
  const message = useMessage();
  const translationEn = useOnboardingStore((s) => s.translationMap[message.id]);

  return (
    <div className="flex flex-col items-end gap-1 w-full bubble-anim">
      {/* Bubble chính */}
      <div className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] bg-gradient-to-r from-primary to-accent text-white shadow-sm font-sans text-sm font-medium leading-relaxed">
        <MessagePrimitive.Content />
      </div>

      {/* Translation Pill — hiển thị bản dịch EN nếu có */}
      {translationEn && (
        <div className="max-w-[80%] px-3 py-1.5 rounded-[10px] bg-glass-bubble text-xs italic leading-relaxed text-foreground shadow-sm">
          <span className="opacity-60 text-[10px] not-italic font-semibold mr-1">EN</span>
          {translationEn}
        </div>
      )}
    </div>
  );
}
