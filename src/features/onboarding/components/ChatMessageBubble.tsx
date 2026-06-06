"use client";

import { MessagePrimitive } from "@assistant-ui/react";

/**
 * Bong bóng tin nhắn người dùng.
 * Căn phải, nền primary color, bo góc trái dưới để phân biệt với bot.
 * MessagePrimitive.Content tự động render text từ runtime context.
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
 * Bong bóng tin nhắn AI/bot.
 * Căn trái, nền muted color, bo góc phải dưới để phân biệt với user.
 * MessagePrimitive.Content tự động render text từ runtime context.
 */
export function AssistantMessageBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
        <MessagePrimitive.Content />
      </div>
    </div>
  );
}
