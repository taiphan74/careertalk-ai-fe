"use client";

import { ComposerPrimitive } from "@assistant-ui/react";
import { TranslationHint } from "./TranslationHint";
import { useOnboardingStore } from "../store/useOnboardingStore";

/**
 * Thanh nhập liệu — Premium glassmorphism style.
 * Container: deep frosted glass, border gradient, top glow layered.
 * Input: inset glass với focus ring glow ocean blue.
 * Send: gradient nổi bật, hover glow pulse, scale animation.
 * Giữ nguyên Ocean Focus palette từ globals.css.
 */


export function ChatComposer() {
  return (
    <div
      className="flex-none px-4 py-4 relative"
      style={{
        /* Layered glass background */
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(240,249,255,0.88) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        /* Border gradient top */
        borderTop: "1px solid transparent",
        backgroundClip: "padding-box",
        /* Top glow line */
        boxShadow:
          "0 -1px 0 0 rgba(147,197,253,0.55), 0 -8px 32px rgba(96,165,250,0.10), 0 -2px 8px rgba(37,99,235,0.06)",
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
          background:
            "linear-gradient(90deg, transparent, rgba(96,165,250,0.7) 30%, rgba(56,189,248,0.8) 50%, rgba(96,165,250,0.7) 70%, transparent)",
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
              background: "rgba(255,255,255,0.70)",
              boxShadow:
                "inset 0 1px 3px rgba(37,99,235,0.08), inset 0 0 0 1.5px rgba(191,219,254,0.7), 0 1px 4px rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              transition: "box-shadow 0.2s ease",
            }}
            onFocusCapture={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "inset 0 1px 3px rgba(37,99,235,0.06), inset 0 0 0 1.5px rgba(96,165,250,0.55), 0 0 0 3.5px rgba(147,197,253,0.22), 0 1px 4px rgba(255,255,255,0.9)";
            }}
            onBlurCapture={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "inset 0 1px 3px rgba(37,99,235,0.08), inset 0 0 0 1.5px rgba(191,219,254,0.7), 0 1px 4px rgba(255,255,255,0.9)";
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

          {/* Send button — lưu translation vào store trước khi send */}
          <ComposerPrimitive.Send
            className="flex-none flex items-center justify-center w-11 h-11 rounded-2xl text-white disabled:opacity-35 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
              boxShadow: "0 4px 14px rgba(59,130,246,0.45), 0 1px 4px rgba(6,182,212,0.20), inset 0 1px 0 rgba(255,255,255,0.25)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "scale(1.07)";
              el.style.boxShadow = "0 6px 20px rgba(59,130,246,0.55), 0 2px 8px rgba(6,182,212,0.30), inset 0 1px 0 rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "scale(1)";
              el.style.boxShadow = "0 4px 14px rgba(59,130,246,0.45), 0 1px 4px rgba(6,182,212,0.20), inset 0 1px 0 rgba(255,255,255,0.25)";
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
