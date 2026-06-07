"use client";

import { ComposerPrimitive } from "@assistant-ui/react";
import { TranslationHint } from "./TranslationHint";
import { GRADIENTS, GLASS, SHADOWS } from "../lib/styles";

/**
 * Thanh nhập liệu — Premium glassmorphism style.
 * Container: deep frosted glass, border gradient, top glow layered.
 * Input: inset glass với focus ring glow ocean blue.
 * Send: gradient nổi bật, hover glow pulse, scale animation.
 * Giữ nguyên Ocean Focus palette từ globals.css.
 *
 * Visual tokens: import từ ../lib/styles (GRADIENTS.*, GLASS.*, SHADOWS.*).
 */
export function ChatComposer() {
  return (
    <div
      className="flex-none px-4 py-4 relative"
      style={{
        ...GLASS.composer,
        borderTop: "1px solid transparent",
        backgroundClip: "padding-box",
        boxShadow: SHADOWS.composer,
      }}
    >
      {/* Decorative top glow bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: GRADIENTS.glowBar,
          borderRadius: "9999px",
        }}
      />

      <div className="flex flex-col w-full gap-2.5">
        <ComposerPrimitive.Root className="flex gap-3 items-center">

          {/* Input — frosted inset glass */}
          <div
            className="flex-1 relative"
            style={{
              borderRadius: "20px",
              ...GLASS.input,
              boxShadow: SHADOWS.inputNormal,
              transition: "box-shadow 0.2s ease",
            }}
            onFocusCapture={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = SHADOWS.inputFocus;
            }}
            onBlurCapture={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = SHADOWS.inputNormal;
            }}
          >
            <ComposerPrimitive.Input
              data-composer-input
              placeholder="Nhập câu trả lời..."
              className="w-full text-sm font-medium bg-transparent"
              style={{
                padding: "11px 18px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
                color: "var(--foreground)",
                fontFamily: "var(--font-geist-sans)",
                caretColor: "var(--primary)",
              }}
            />
          </div>

          {/* Send button */}
          <ComposerPrimitive.Send
            className="flex-none flex items-center justify-center w-11 h-11 rounded-2xl text-white disabled:opacity-35 disabled:cursor-not-allowed"
            style={{
              background: GRADIENTS.ocean,
              boxShadow: SHADOWS.sendButton,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "scale(1.07)";
              el.style.boxShadow = SHADOWS.sendButtonHover;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "scale(1)";
              el.style.boxShadow = SHADOWS.sendButton;
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.94)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"; }}
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
