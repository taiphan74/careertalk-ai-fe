"use client";

import { useEffect, useState, useRef } from "react";
import { translateCheck, type TranslateCheckResult } from "../lib/translate-check";

/**
 * Hiển thị bản dịch tiếng Anh và highlight lỗi ngữ pháp bên dưới composer input.
 * Dùng DOM event listener trên element có data-composer-input attribute.
 * KHÔNG phụ thuộc internal API của @assistant-ui/react → an toàn qua mọi version.
 */
export function TranslationHint() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<TranslateCheckResult | null>(null);
  const [hoveredError, setHoveredError] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lắng nghe sự kiện input trên composer element trong DOM
  useEffect(() => {
    // Tìm input element qua data attribute (ổn định hơn placeholder text)
    const findComposerInput = (): HTMLInputElement | HTMLTextAreaElement | null => {
      return document.querySelector(
        "[data-composer-input]"
      ) as HTMLInputElement | HTMLTextAreaElement | null;
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      setText(target.value ?? "");
    };

    // Thử tìm ngay, nếu chưa mount thì đợi MutationObserver
    let inputEl = findComposerInput();

    if (inputEl) {
      inputEl.addEventListener("input", handleInput);
      setText(inputEl.value ?? "");
    }

    // Observer cho trường hợp component render sau hint
    const observer = new MutationObserver(() => {
      if (!inputEl) {
        inputEl = findComposerInput();
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
      if (inputEl) {
        inputEl.removeEventListener("input", handleInput);
      }
    };
  }, []);

  // Debounce gọi API khi text thay đổi
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!text || text.trim().length < 3) {
      setResult(null);
      return;
    }

    timerRef.current = setTimeout(async () => {
      const res = await translateCheck(text);
      setResult(res);
    }, 700);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text]);

  if (!result || !result.translation) return null;

  return (
    <div className="px-4 pb-2 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
      {/* Bản dịch tiếng Anh */}
      <p className="text-slate-600 mb-1">
        💡 <span className="italic">{result.translation}</span>
      </p>

      {/* Danh sách lỗi (nếu có) */}
      {result.errors.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {result.errors.map((err, idx) => (
            <span
              key={idx}
              className="relative inline-block cursor-help border-b-2 border-red-400 text-red-600 hover:bg-red-50 rounded px-0.5 transition-colors"
              onMouseEnter={() => setHoveredError(idx)}
              onMouseLeave={() => setHoveredError(null)}
            >
              {err.wrong}
              {hoveredError === idx && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap z-50 shadow-lg">
                  → {err.correct}: {err.reason}
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
