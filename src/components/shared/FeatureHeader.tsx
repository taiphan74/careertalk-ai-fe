import React from "react";
import Link from "next/link";

/**
 * @interface FeatureHeaderProps
 * @description Thuộc tính cấu hình cho Header dùng chung của hệ thống.
 */
interface FeatureHeaderProps {
  /** Tiêu đề chính của tính năng */
  title: string;
  /** Phụ đề ngắn mô tả tính năng */
  subtitle?: string;
  /** Đường dẫn quay lại nếu cần nút điều hướng (ví dụ: "/") */
  backUrl?: string;
  /** Nhãn hiển thị cho nút quay lại */
  backLabel?: string;
  /** Slot để chèn nội dung tùy biến bên phải (Badge, button...) */
  rightElement?: React.ReactNode;
}

/**
 * Shared Header Component — Đồng bộ style Ocean Focus Gradient toàn hệ thống.
 * Hỗ trợ Responsive Mobile-First và Custom Context.
 */
export function FeatureHeader({
  title,
  subtitle,
  backUrl,
  backLabel = "Quay lại",
  rightElement,
}: FeatureHeaderProps) {
  return (
    <>
      <header
        className="flex-none px-5 py-4 flex items-center gap-3 sticky top-0 z-10 w-full"
        style={{
          background: "linear-gradient(135deg, #60A5FA 0%, #93C5FD 50%, #67E8F9 100%)",
          boxShadow: "0 2px 16px 0 rgb(96 165 250 / 0.25)",
        }}
      >
        {/* Logo hỗ trợ Clickable điều hướng nếu có backUrl */}
        {backUrl ? (
          <Link
            href={backUrl}
            className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
            title={backLabel}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12 C5 9, 8 9, 10 12 C12 15, 15 15, 17 12 C19 9, 22 9, 24 12"
                stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"
              />
              <path
                d="M3 17 C5 14, 8 14, 10 17 C12 20, 15 20, 17 17 C19 14, 22 14, 24 17"
                stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" fill="none"
              />
              <circle cx="12" cy="7" r="2.5" fill="white" opacity="0.9"/>
            </svg>
          </Link>
        ) : (
          <div
            className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12 C5 9, 8 9, 10 12 C12 15, 15 15, 17 12 C19 9, 22 9, 24 12"
                stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"
              />
              <path
                d="M3 17 C5 14, 8 14, 10 17 C12 20, 15 20, 17 17 C19 14, 22 14, 24 17"
                stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" fill="none"
              />
              <circle cx="12" cy="7" r="2.5" fill="white" opacity="0.9"/>
            </svg>
          </div>
        )}

        {/* Khối văn bản tiêu đề */}
        <div className="flex-1 min-w-0">
          <h1
            className="text-white leading-none tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-bangers)",
              fontSize: "clamp(1.2rem, 4.5vw, 1.8rem)",
              textShadow: "0 2px 8px rgba(0,0,0,0.12)",
              letterSpacing: "0.08em",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.82)" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Khối tùy biến bên phải */}
        {rightElement && (
          <div className="flex-none">
            {rightElement}
          </div>
        )}
      </header>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
