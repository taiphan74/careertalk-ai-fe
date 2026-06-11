import Link from "next/link";
import { StrivoLogo } from "./StrivoLogo";

export function LandingFooter() {
  return (
    <footer className="py-10 px-6 border-t border-[var(--border)] bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <StrivoLogo size={24} showWordmark showTagline={false} />
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <Link href="/" className="no-underline hover:text-[var(--primary)] transition-colors">Ứng dụng</Link>
          <Link href="/#features" className="no-underline hover:text-[var(--primary)] transition-colors">Tính năng</Link>
          <Link href="/#how-it-works" className="no-underline hover:text-[var(--primary)] transition-colors">Cách dùng</Link>
        </div>
        <p className="text-xs text-slate-400">2025 STRIVO. Được xây dựng cho người Việt.</p>
      </div>
    </footer>
  );
}
