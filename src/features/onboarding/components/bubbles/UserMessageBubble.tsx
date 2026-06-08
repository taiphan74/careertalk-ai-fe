/**
 * @file UserMessageBubble.tsx
 * @description Bong bóng tin nhắn từ phía Người dùng — Primary gradient + Translation Pill bên dưới.
 * Data flow: đọc translationEn từ useOnboardingStore.translationMap[messageId].
 */
"use client";

import { MessagePrimitive, useMessage } from "@assistant-ui/react";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { TokenizedText } from "../TokenizedText";

export function UserMessageBubble() {
  const message = useMessage();
  const translationEn = useOnboardingStore((s) => s.translationMap[message.id]);

  return (
    <div className="flex flex-col items-end gap-1 w-full bubble-anim">
      {/* Bubble chính */}
      <div className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] bg-primary text-primary-foreground shadow-sm font-sans text-sm font-medium leading-relaxed">
        <MessagePrimitive.Content />
      </div>

      {/* Translation Pill — hiển thị bản dịch EN nếu có */}
      {translationEn && (
        <div className="max-w-[80%] px-3 py-1.5 rounded-[10px] bg-background/80 backdrop-blur-sm border border-border text-xs leading-relaxed text-muted-foreground shadow-sm">
          <span className="not-italic font-bold text-[10px] text-primary mr-1.5">EN</span>
          <TokenizedText text={translationEn} />
        </div>
      )}
    </div>
  );
}
