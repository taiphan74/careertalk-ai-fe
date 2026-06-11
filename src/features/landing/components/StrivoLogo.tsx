"use client";

/**
 * STRIVO Logo Component
 *
 * Logo mark SVG: vòng lặp xoay vô tận tượng trưng cho học tập liên tục.
 * Gradient: cyan → blue → deep blue. Glow filter tạo hiệu ứng phát sáng.
 * Animation: strivo-spin 8s linear infinite (định nghĩa trong globals.css).
 *
 * @param size - Kích thước logo mark (px). Mặc định 28.
 * @param showWordmark - Hiển thị chữ "STRIVO" bên cạnh. Mặc định true.
 * @param showTagline - Hiển thị tagline bên dưới wordmark. Mặc định false.
 * @param animate - Bật/tắt animation xoay. Mặc định true.
 */
export function StrivoLogo({
  size = 28,
  showWordmark = true,
  showTagline = false,
  animate = true,
}: {
  size?: number;
  showWordmark?: boolean;
  showTagline?: boolean;
  animate?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Logo Mark - SVG Loop */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="STRIVO logo"
        className={animate ? "strivo-spin" : ""}
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="strivo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#36C5E0" />
            <stop offset="0.5" stopColor="#4A9EF7" />
            <stop offset="1" stopColor="#2452D6" />
          </linearGradient>
          <filter id="strivo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#36C5E0" floodOpacity="0.55" />
          </filter>
        </defs>
        <g filter="url(#strivo-glow)">
          <g fill="none" stroke="url(#strivo-grad)" strokeWidth="11.5" strokeLinecap="round">
            <path d="M 20.87 39.40 A 31 31 0 0 1 78.74 38.39" />
            <path d="M 79.13 60.60 A 31 31 0 0 1 21.26 61.61" />
          </g>
          <polygon points="83.99,51.37 67.43,34.71 84.33,27.88" fill="#2452D6" />
          <polygon points="16.01,48.63 32.57,65.29 15.67,72.12" fill="#36C5E0" />
        </g>
      </svg>

      {/* Wordmark + Tagline */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="font-bold text-[var(--foreground)] tracking-tight"
            style={{ fontFamily: "'Fredoka', sans-serif", fontSize: `${size * 0.5}px` }}
          >
            STRIVO
          </span>
          {showTagline && (
            <span
              className="text-slate-500 uppercase tracking-widest"
              style={{ fontFamily: "'Fredoka', sans-serif", fontSize: `${size * 0.25}px`, letterSpacing: "0.12em" }}
            >
              Học từ lỗi sai · AI
            </span>
          )}
        </div>
      )}
    </div>
  );
}
