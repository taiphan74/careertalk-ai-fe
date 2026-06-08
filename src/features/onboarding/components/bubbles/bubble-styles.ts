/**
 * CSS keyframes + shared helpers cho tất cả chat bubble components.
 *
 * Chứa:
 * - BUBBLE_STYLES: CSS animation keyframes (bubbleIn, typingBounce)
 * - injectStyles(): Inject CSS 1 lần duy nhất vào DOM (singleton pattern)
 * - parseBilingualContent(): Parse JSON string → BilingualContent
 *
 * Singleton pattern: dùng module-level flag `stylesInjected` để tránh
 * inject trùng lặp khi nhiều component mount cùng lúc.
 */

import type { BilingualContent } from "../../types";

/**
 * CSS keyframes cho bubble fade-in + slide-up animation.
 * Inject 1 lần duy nhất vào DOM (component mount đầu tiên).
 */
export const BUBBLE_STYLES = `
  @keyframes bubbleIn {
    from { opacity: 0; transform: translateY(16px) scale(0.96); }
    60%  { opacity: 1; transform: translateY(-2px) scale(1.01); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes typingBounce {
    0%, 80%, 100% { transform: translateY(0); }
    40%           { transform: translateY(-5px); }
  }
  .bubble-anim {
    animation: bubbleIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .bubble-anim {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;

let stylesInjected = false;

/**
 * Inject CSS styles vào document head.
 * Dùng singleton pattern để tránh inject trùng lặp.
 * Safe cho SSR: check `typeof document !== "undefined"`.
 */
export function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = BUBBLE_STYLES;
  document.head.appendChild(el);
  stylesInjected = true;
}

/**
 * Parse JSON string → BilingualContent.
 * Trả null nếu không đúng format {en, vi} hoặc parse error.
 *
 * @param text - JSON string từ AI response
 * @returns BilingualContent object hoặc null
 */
export function parseBilingualContent(text: string): BilingualContent | null {
  try {
    const parsed = JSON.parse(text);
    if (parsed?.en && parsed?.vi) return parsed as BilingualContent;
    return null;
  } catch {
    return null;
  }
}
