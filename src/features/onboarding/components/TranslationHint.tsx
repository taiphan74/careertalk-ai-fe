/**
 * @file TranslationHint.tsx
 * @description Floating card hiển thị bản dịch EN + highlight lỗi ngữ pháp chuẩn hóa sang màu ngữ nghĩa.
 * Vị trí: float phía TRÊN composer input, slide-up từ dưới lên.
 */
"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { translateCheck } from "../lib/translate-check";
import { useOnboardingStore } from "../store/useOnboardingStore";

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

  // Debounce gọi API phân tích dịch thuật
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
  }, [text, setTranslationResult]);

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
          className="absolute bottom-[calc(100%+8px)] left-4 right-4 z-40 p-4 rounded-xl bg-glass-bubble shadow-xl border border-border bg-clip-padding flex flex-col gap-2.5 max-h-56 overflow-y-auto"
        >
          {/* Decorative accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-xl bg-gradient-to-r from-primary to-accent" />

          {/* Trạng thái Loading khi AI đang phân tích dữ liệu */}
          {isLoading && (
            <div className="flex items-center gap-2 py-1 text-xs font-semibold text-text-tertiary">
              <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span>AI đang phân tích ngữ pháp...</span>
            </div>
          )}

          {/* Hiển thị kết quả khi đã có dữ liệu dịch thuật */}
          {!isLoading && result && (
            <div className="space-y-2.5 animate-fadeIn">
              {/* Dòng chữ Tiếng Anh đã dịch */}
              <div className="text-sm font-medium leading-relaxed text-foreground">
                <span className="text-[11px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary mr-1.5 align-middle">
                  EN
                </span>
                <span className="align-middle">{result.translation}</span>
              </div>

              {/* Phân tích lỗi ngữ pháp Grammars */}
              {result.errors && result.errors.length > 0 && (
                <div className="border-t border-border/60 pt-2 flex flex-col gap-1.5">
                  <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                    Gợi ý sửa lỗi ngữ pháp ({result.errors.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.errors.map((err, i) => (
                      <span
                        key={i}
                        onMouseEnter={() => setHoveredError(i)}
                        onMouseLeave={() => setHoveredError(null)}
                        className="text-xs px-2.5 py-1 rounded-md font-medium border transition cursor-help bg-danger-light text-danger border-danger/20 hover:bg-danger/15"
                      >
                        {err.wrong} → <span className="font-bold text-success">{err.correct}</span>
                      </span>
                    ))}
                  </div>
                  
                  {/* Giải thích chi tiết lỗi khi di chuột hover */}
                  <AnimatePresence>
                    {hoveredError !== null && result.errors[hoveredError] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[11px] leading-relaxed text-text-secondary bg-surface p-2 rounded-lg border border-border"
                      >
                        <span className="font-bold text-danger">Lý do:</span> {result.errors[hoveredError].reason}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
