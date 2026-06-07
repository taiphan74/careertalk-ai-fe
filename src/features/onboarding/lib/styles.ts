/**
 * Design tokens tập trung cho Onboarding feature.
 *
 * Thay thế hardcoded colors/gradients/shadows rải rác trong components.
 * Mọi visual constant phải được định nghĩa ở đây để:
 * - Dễ dàng thay đổi theme/color palette
 * - Tránh inconsistency (cùng 1 màu viết nhiều cách khác nhau)
 * - Single source of truth cho visual design
 *
 * Tất cả tokens dùng inline style objects (React style prop compatible).
 * CSS variables (var(--primary), var(--accent)) giữ nguyên khi có thể.
 */

// === GRADIENTS ===
export const GRADIENTS = {
  /** User message bubble: #60A5FA → #3B82F6 */
  userBubble: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",

  /** AI avatar + typing dots: #60A5FA → #38BDF8 */
  avatarOcean: "linear-gradient(135deg, #60A5FA 0%, #38BDF8 100%)",

  /** Send button + header icons + loading spinner: #3B82F6 → #06B6D4 */
  ocean: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",

  /** TranslationHint accent bar trên đầu card: #3B82F6 → #06B6D4 → #14B8A6 */
  accentBar: "linear-gradient(90deg, #3B82F6 0%, #06B6D4 50%, #14B8A6 100%)",

  /** Composer top glow bar: transparent → blue → cyan → blue → transparent */
  glowBar:
    "linear-gradient(90deg, transparent, rgba(96,165,250,0.7) 30%, rgba(56,189,248,0.8) 50%, rgba(96,165,250,0.7) 70%, transparent)",

  /** Loading shimmer bar cho TranslationHint khi đang chờ API */
  shimmer: "linear-gradient(90deg, var(--border) 0%, var(--border-strong) 50%, var(--border) 100%)",

  /** Chat container mesh gradient: subtle radial gradients trên nền var(--background) */
  meshChat: `radial-gradient(ellipse 80% 60% at 20% 0%, rgba(37,99,235,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(6,182,212,0.06) 0%, transparent 60%),
    var(--background)`,
} as const;

// === GLASS SURFACES (background + backdropFilter + border) ===
export const GLASS = {
  /** Assistant bubble + typing indicator: frosted light blue */
  assistantBubble: {
    background: "rgba(240,249,255,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(191,219,254,0.6)",
  },

  /** TranslationHint floating card: premium frosted glass */
  translationCard: {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(147,197,253,0.55)",
  },

  /** Composer bar: deep frosted vertical gradient */
  composer: {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(240,249,255,0.88) 100%)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
  },

  /** User message translation pill: light frosted blue */
  translationPill: {
    background: "rgba(239,246,255,0.90)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(147,197,253,0.50)",
  },

  /** Composer input: inset frosted */
  input: {
    background: "rgba(255,255,255,0.70)",
    backdropFilter: "blur(8px)",
  },
} as const;

// === SHADOWS ===
export const SHADOWS = {
  /** User bubble: blue glow */
  userBubble:
    "0 2px 12px rgba(96,165,250,0.28), 0 1px 3px rgba(59,130,246,0.15)",

  /** Assistant/typing bubbles: subtle blue + neutral */
  glassBubble:
    "0 2px 12px rgba(37,99,235,0.08), 0 1px 3px rgba(0,0,0,0.05)",

  /** Translation card: elevated with inset highlight */
  translationCard:
    "0 8px 32px rgba(37,99,235,0.12), 0 2px 8px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",

  /** Composer: top glow line + blue ambient */
  composer:
    "0 -1px 0 0 rgba(147,197,253,0.55), 0 -8px 32px rgba(96,165,250,0.10), 0 -2px 8px rgba(37,99,235,0.06)",

  /** Send button: blue glow normal */
  sendButton:
    "0 4px 14px rgba(59,130,246,0.45), 0 1px 4px rgba(6,182,212,0.20), inset 0 1px 0 rgba(255,255,255,0.25)",

  /** Send button: blue glow hover (mạnh hơn normal) */
  sendButtonHover:
    "0 6px 20px rgba(59,130,246,0.55), 0 2px 8px rgba(6,182,212,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",

  /** Avatar: blue glow */
  avatar: "0 2px 8px rgba(96,165,250,0.30)",

  /** Typing dot: glow pulse */
  typingDot: "0 0 6px rgba(96,165,250,0.5)",

  /** Primary icon (spark, header): blue glow nhỏ */
  iconPrimary: "0 2px 6px rgba(59,130,246,0.35)",

  /** Translation pill: subtle */
  translationPill: "0 1px 4px rgba(37,99,235,0.08)",

  /** Error chip: red subtle */
  errorChip: "0 1px 4px rgba(239,68,68,0.10)",

  /** Tooltip: dark elevated */
  tooltip: "0 4px 16px rgba(0,0,0,0.25)",

  /** Input normal: inset shadow + border glow */
  inputNormal:
    "inset 0 1px 3px rgba(37,99,235,0.08), inset 0 0 0 1.5px rgba(191,219,254,0.7), 0 1px 4px rgba(255,255,255,0.9)",

  /** Input focus: inset + ring + border glow */
  inputFocus:
    "inset 0 1px 3px rgba(37,99,235,0.06), inset 0 0 0 1.5px rgba(96,165,250,0.55), 0 0 0 3.5px rgba(147,197,253,0.22), 0 1px 4px rgba(255,255,255,0.9)",
} as const;

// === COLORS (non-variable, specific to feature) ===
export const COLORS = {
  /** Error chip background */
  errorChipBg: "rgba(254,242,242,0.9)",
  /** Error chip border */
  errorChipBorder: "rgba(239,68,68,0.25)",
  /** Error text (line-through) — red đậm */
  errorText: "#DC2626",
  /** Error text decoration — red mờ */
  errorTextDecor: "rgba(220,38,38,0.5)",
  /** Correct text — xanh lá đậm */
  correctText: "#059669",
  /** Arrow icon green */
  arrowGreen: "#10B981",
  /** Tooltip background — dark slate */
  tooltipBg: "#0F172A",
  /** Tooltip text — light gray */
  tooltipText: "#F1F5F9",
  /** Error icon stroke */
  errorIcon: "#EF4444",
} as const;

// === SEPARATORS ===
export const SEPARATORS = {
  /** Glass separator line: fade in/out */
  glass: "linear-gradient(90deg, transparent, rgba(191,219,254,0.8), transparent)",
} as const;
