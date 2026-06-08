/**
 * @file ChatComposer.tsx
 * @description Thanh nhập liệu — Premium glassmorphism style, đã được tối ưu hóa loại bỏ inline styles sang Tailwind Utility Classes.
 */
"use client";

import { ComposerPrimitive } from "@assistant-ui/react";
import { TranslationHint } from "./TranslationHint";

export function ChatComposer() {
  return (
    <div className="flex-none px-4 py-4 relative bg-background/70 backdrop-blur-2xl border-t border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      


      <div className="flex flex-col w-full gap-2.5">
        <ComposerPrimitive.Root className="flex gap-3 items-center">

          {/* Input — frosted inset glass */}
          <div className="flex-1 relative rounded-[20px] bg-glass-input shadow-input-normal transition-all duration-200 focus-within:shadow-input-focus">
            <ComposerPrimitive.Input
              data-composer-input
              placeholder="Nhập câu trả lời..."
              className="w-full text-sm font-medium bg-transparent px-[18px] py-[11px] outline-none border-none rounded-[20px] text-foreground font-sans caret-primary"
            />
          </div>

          {/* Send button */}
          <ComposerPrimitive.Send
            className="flex-none flex items-center justify-center w-11 h-11 rounded-2xl text-primary-foreground bg-primary shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ComposerPrimitive.Send>
        </ComposerPrimitive.Root>

        {/* Translation + grammar hint */}
        <TranslationHint />
      </div>
    </div>
  );
}
