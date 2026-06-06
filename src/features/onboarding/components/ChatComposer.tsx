"use client";

import { ComposerPrimitive } from "@assistant-ui/react";

/**
 * Thanh nhập liệu — Creative style: border dày, radius playful, font rõ.
 * Màu giữ nguyên Ocean Focus palette.
 */
export function ChatComposer() {
  return (
    <div
      className="flex-none px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        borderTop: "2px solid rgba(147,197,253,0.6)",
        boxShadow: "0 -4px 20px rgba(96,165,250,0.08)",
      }}
    >
      <ComposerPrimitive.Root className="flex gap-2 items-center">
        {/* Input */}
        <ComposerPrimitive.Input
          placeholder="Nhập câu trả lời..."
          className="flex-1 text-sm font-medium"
          style={{
            borderRadius: "20px",
            border: "2px solid var(--border)",
            background: "var(--background)",
            padding: "10px 18px",
            outline: "none",
            color: "var(--foreground)",
            transition: "border-color 0.2s, box-shadow 0.2s",
            fontFamily: "var(--font-geist-sans)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#93C5FD";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(147,197,253,0.25)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />

        {/* Send button */}
        <ComposerPrimitive.Send
          className="flex-none flex items-center justify-center w-11 h-11 rounded-2xl text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          style={{
            background: "linear-gradient(135deg, #60A5FA 0%, #38BDF8 100%)",
            boxShadow: "0 3px 12px rgba(96,165,250,0.40)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
    </div>
  );
}
