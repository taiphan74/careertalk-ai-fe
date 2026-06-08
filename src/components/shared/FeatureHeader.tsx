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
        className="flex-none px-5 py-4 flex items-center gap-3 sticky top-0 z-10 w-full bg-background/80 backdrop-blur-xl border-b border-border"
      >
        {/* Logo hỗ trợ Clickable điều hướng nếu có backUrl */}
        {backUrl ? (
          <Link
            href={backUrl}
            className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center hover:bg-accent active:scale-95 transition-all text-foreground"
            title={backLabel}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12 C5 9, 8 9, 10 12 C12 15, 15 15, 17 12 C19 9, 22 9, 24 12"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"
              />
              <path
                d="M3 17 C5 14, 8 14, 10 17 C12 20, 15 20, 17 17 C19 14, 22 14, 24 17"
                stroke="currentColor" opacity="0.5" strokeWidth="1.8" strokeLinecap="round" fill="none"
              />
              <circle cx="12" cy="7" r="2.5" fill="currentColor" opacity="0.9"/>
            </svg>
          </Link>
        ) : (
          <div
            className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center"
            className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center hover:bg-accent active:scale-95 transition-all text-foreground"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12 C5 9, 8 9, 10 12 C12 15, 15 15, 17 12 C19 9, 22 9, 24 12"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"
              />
              <path
                d="M3 17 C5 14, 8 14, 10 17 C12 20, 15 20, 17 17 C19 14, 22 14, 24 17"
                stroke="currentColor" opacity="0.5" strokeWidth="1.8" strokeLinecap="round" fill="none"
              />
              <circle cx="12" cy="7" r="2.5" fill="currentColor" opacity="0.9"/>
            </svg>
          </div>
        )}

        {/* Khối văn bản tiêu đề */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold tracking-tight text-foreground leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs mt-1 text-muted-foreground">
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
