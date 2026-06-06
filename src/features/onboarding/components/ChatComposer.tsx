"use client";

import { ComposerPrimitive } from "@assistant-ui/react";

/**
 * Thanh nhập liệu và nút gửi tin nhắn.
 * Nằm ngoài ThreadPrimitive.Viewport để cố định ở đáy màn hình.
 *
 * Design: glassmorphism panel, input glow on focus, send button gradient ocean.
 * ComposerPrimitive.Send tự disable khi isRunning=true hoặc input rỗng.
 */
export function ChatComposer() {
  return (
    <div
      className="flex-none px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.80)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(191,219,254,0.5)",
        boxShadow: "0 -4px 20px rgba(37,99,235,0.06)",
      }}
    >
      <ComposerPrimitive.Root className="flex gap-2 items-center">
        {/* Input */}
        <ComposerPrimitive.Input
          placeholder="Nhập câu trả lời..."
          className="flex-1 text-sm"
          style={{
            borderRadius: "14px",
            border: "1.5px solid var(--border)",
            background: "var(--background)",
            padding: "10px 16px",
            outline: "none",
            color: "var(--foreground)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#2563EB";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />

        {/* Send button */}
        <ComposerPrimitive.Send
          className="flex-none flex items-center justify-center w-10 h-10 rounded-2xl text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #0891B2 100%)",
            boxShadow: "0 2px 10px rgba(37,99,235,0.35)",
          }}
        >
          {/* Send icon SVG */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 2L11 13"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
    </div>
  );
}
