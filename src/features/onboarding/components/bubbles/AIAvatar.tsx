/**
 * Avatar SVG cho AI — icon sóng ocean với gradient.
 *
 * Dùng trong AssistantMessageBubble và TypingIndicatorBubble.
 * Style: gradient ocean blue, shadow glow tinh tế.
 * Hai lớp sóng SVG: sóng chính (đậm) + sóng phụ (mờ 60%).
 *
 * Visual tokens: import từ ../lib/styles (GRADIENTS.avatarOcean, SHADOWS.avatar).
 */

import { GRADIENTS, SHADOWS } from "../../lib/styles";

/**
 * SVG avatar component cho AI assistant.
 * Render icon sóng ocean trong hình tròn gradient.
 *
 * @returns JSX element — div chứa SVG avatar
 */
export function AIAvatar() {
  return (
    <div
      className="flex-none w-8 h-8 rounded-full flex items-center justify-center self-end mb-1"
      style={{
        background: GRADIENTS.avatarOcean,
        boxShadow: SHADOWS.avatar,
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 11 C5.5 8, 8.5 8, 11 11 C13.5 14, 16.5 14, 19 11"
          stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        />
        <path
          d="M3 16 C5.5 13, 8.5 13, 11 16 C13.5 19, 16.5 19, 19 16"
          stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      </svg>
    </div>
  );
}
