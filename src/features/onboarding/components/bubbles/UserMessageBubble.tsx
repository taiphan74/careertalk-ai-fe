/**
 * @file UserMessageBubble.tsx
 * @description Bong bóng tin nhắn từ phía Người dùng — Sử dụng hệ màu primary gradient đồng bộ.
 */
"use client";

import { MessagePrimitive } from "@assistant-ui/react";

export function UserMessageBubble() {
  return (
    <div className="flex justify-end w-full bubble-anim">
      <div className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[75%] bg-gradient-to-r from-primary to-accent text-white shadow-sm font-sans text-sm font-medium leading-relaxed">
        <MessagePrimitive.Content />
      </div>
    </div>
  );
}
