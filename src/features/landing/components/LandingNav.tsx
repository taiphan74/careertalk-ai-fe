"use client";
import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { StrivoLogo } from "./StrivoLogo";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(16px)" : "none",
        backgroundColor: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(37,99,235,0.12)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/landing" className="no-underline">
          <StrivoLogo size={28} showWordmark showTagline={false} />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a href="#features" className="hover:text-[var(--primary)] transition-colors no-underline">Tính năng</a>
          <a href="#how-it-works" className="hover:text-[var(--primary)] transition-colors no-underline">Cách hoạt động</a>
          <a href="#demo" className="hover:text-[var(--primary)] transition-colors no-underline">Demo</a>
        </div>

        <Link
          href="/landing#demo"
          className="no-underline hidden md:block px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
        >
          Dùng thử miễn phí
        </Link>

        <Link
          href="/landing#demo"
          className="no-underline md:hidden px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-medium"
        >
          Thử ngay
        </Link>
      </div>
    </motion.nav>
  );
}
