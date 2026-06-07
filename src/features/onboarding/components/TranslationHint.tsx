"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { translateCheck } from "../lib/translate-check";
import { useOnboardingStore } from "../store/useOnboardingStore";
import { GRADIENTS, GLASS, SHADOWS, COLORS, SEPARATORS } from "../lib/styles";

/**
 * Floating card hiển thị bản dịch EN + highlight lỗi ngữ pháp.
 * Vị trí: float phía TRÊN composer input, slide-up từ dưới lên.
 * Animation: framer-motion spring — xuất hiện/biến mất mượt.
 * Không phụ thuộc internal API @assistant-ui/react.
 *
 * Visual tokens: import từ ../lib/styles (GLASS.translationCard, GRADIENTS.accentBar, COLORS.*, SHADOWS.*).
 */
export function TranslationHint() {
  const [text, setText] = useState("");
  const [hoveredError, setHoveredError] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { translationResult: result, setTranslationResult } = useOnboardingStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lắng nghe input qua data-composer-input attribute
  useEffect(() => {
    const findInput = (): HTMLInputElement | HTMLTextAreaElement | null =>
      document.querySelector("[data-composer-input]") as HTMLInputElement | HTMLTextAreaElement | null;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      setText(target.value ?? "");
    };

    let inputEl = findInput();
    if (inputEl) {
      inputEl.addEventListener("input", handleInput);
      setText(inputEl.value ?? "");
    }

    const observer = new MutationObserver(() => {
      if (!inputEl) {
        inputEl = findInput();
        if (inputEl) {
          inputEl.addEventListener("input", handleInput);
          setText(inputEl.value ?? "");
          observer.disconnect();
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (inputEl) inputEl.removeEventListener("input", handleInput);
    };
  }, []);

  // Debounce gọi API
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!text || text.trim().length < 3) {
      setTranslationResult(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    timerRef.current = setTimeout(async () => {
      const res = await translateCheck(text);
      setTranslationResult(res);
      console.log("[DEBUG] TranslationHint → store:", res);
      setIsLoading(false);
    }, 700);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text]);

  const hasContent = result?.translation || isLoading;

  return (
    <AnimatePresence>
      {hasContent && (
        <motion.div
          key="translation-hint"
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "16px",
            right: "16px",
            zIndex: 50,
            ...GLASS.translationCard,
            borderRadius: "16px",
            boxShadow: SHADOWS.translationCard,
            overflow: "hidden",
          }}
        >
          {/* Accent bar trên đầu card */}
          <div
            style={{
              height: "3px",
              background: GRADIENTS.accentBar,
              borderRadius: "16px 16px 0 0",
            }}
          />

          <div style={{ padding: "12px 14px" }}>
            {/* Loading shimmer */}
            {isLoading && !result && (
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: GRADIENTS.ocean,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      height: "10px",
                      borderRadius: "6px",
                      background: GRADIENTS.shimmer,
                      width: "65%",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Translation */}
            {result?.translation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header row */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "6px",
                      background: GRADIENTS.ocean,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: SHADOWS.iconPrimary,
                    }}
                  >
                    {/* Spark icon */}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L9 9H2L7.5 14L5.5 21L12 17L18.5 21L16.5 14L22 9H15L12 2Z"
                        fill="white" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--primary)",
                    }}
                  >
                    AI Translation
                  </span>
                </div>

                {/* Translation text */}
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    lineHeight: 1.55,
                    color: "var(--foreground)",
                    fontStyle: "italic",
                    paddingLeft: "4px",
                    borderLeft: "2.5px solid var(--accent)",
                    marginBottom: result.errors.length > 0 ? "10px" : "0",
                  }}
                >
                  {result.translation}
                </p>

                {/* Error chips */}
                {result.errors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    {/* Separator */}
                    <div
                      style={{
                        height: "1px",
                        background: SEPARATORS.glass,
                        marginBottom: "8px",
                      }}
                    />

                    <div className="flex items-center gap-1.5 mb-1.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke={COLORS.errorIcon} strokeWidth="2"/>
                        <path d="M12 7v5M12 16h.01" stroke={COLORS.errorIcon} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          color: "var(--danger)",
                        }}
                      >
                        Gợi ý sửa
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {result.errors.map((err, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.12 + idx * 0.06, type: "spring", stiffness: 500, damping: 28 }}
                          style={{ position: "relative" }}
                          onMouseEnter={() => setHoveredError(idx)}
                          onMouseLeave={() => setHoveredError(null)}
                        >
                          {/* Error chip */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              padding: "4px 9px",
                              borderRadius: "9999px",
                              background: COLORS.errorChipBg,
                              border: `1px solid ${COLORS.errorChipBorder}`,
                              cursor: "help",
                              boxShadow: SHADOWS.errorChip,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: COLORS.errorText,
                                textDecoration: "line-through",
                                textDecorationColor: COLORS.errorTextDecor,
                              }}
                            >
                              {err.wrong}
                            </span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12H19M13 6l6 6-6 6" stroke={COLORS.arrowGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: COLORS.correctText,
                              }}
                            >
                              {err.correct}
                            </span>
                          </div>

                          {/* Tooltip reason */}
                          <AnimatePresence>
                            {hoveredError === idx && (
                              <motion.div
                                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                style={{
                                  position: "absolute",
                                  bottom: "calc(100% + 6px)",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  padding: "6px 10px",
                                  borderRadius: "8px",
                                  background: COLORS.tooltipBg,
                                  color: COLORS.tooltipText,
                                  fontSize: "11px",
                                  lineHeight: 1.4,
                                  zIndex: 60,
                                  boxShadow: SHADOWS.tooltip,
                                  maxWidth: "200px",
                                  whiteSpace: "normal",
                                  textAlign: "center",
                                }}
                              >
                                {err.reason}
                                {/* Arrow */}
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: 0,
                                    height: 0,
                                    borderLeft: "5px solid transparent",
                                    borderRight: "5px solid transparent",
                                    borderTop: `5px solid ${COLORS.tooltipBg}`,
                                  }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
