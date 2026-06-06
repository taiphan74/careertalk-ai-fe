"use client";

import { ComposerPrimitive } from "@assistant-ui/react";

/**
 * Thanh nhập liệu và nút gửi tin nhắn.
 * Nằm ngoài ThreadPrimitive.Viewport để cố định ở đáy màn hình,
 * không cuộn theo danh sách tin nhắn.
 *
 * ComposerPrimitive.Input: ô nhập text, tự động focus khi mở trang
 * ComposerPrimitive.Send: nút gửi, tự động disable khi isRunning=true hoặc input rỗng
 */
export function ChatComposer() {
  return (
    <div className="flex-none p-4 border-t border-border">
      <ComposerPrimitive.Root className="flex gap-2">
        <ComposerPrimitive.Input
          placeholder="Nhập câu trả lời..."
          className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <ComposerPrimitive.Send className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          Gửi
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
    </div>
  );
}
