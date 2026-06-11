"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { House, BookOpen, Stack, MagnifyingGlass } from "@phosphor-icons/react";
import { StrivoLogo } from "@/features/landing/components/StrivoLogo";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/lessons", label: "Bài Học", icon: BookOpen },
  { href: "/flashcards", label: "Flashcards", icon: Stack },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header
      className="flex-none sticky top-0 z-50 w-full"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: "rgba(255,255,255,0.88)",
        borderBottom: "1px solid rgba(37,99,235,0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex-none w-[140px]">
          <Link href="/" className="no-underline">
            <StrivoLogo size={28} showWordmark showTagline={false} animate={false} />
          </Link>
        </div>

        {/* Center: Segmented nav */}
        <nav className="flex items-center gap-1 rounded-full bg-[var(--surface)] p-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "relative px-3.5 md:px-5 py-2 text-sm font-medium rounded-full no-underline flex items-center gap-1.5 md:gap-2 transition-colors " +
                  (isActive ? "" : "hover:bg-white/50")
                }
                style={{
                  color: isActive
                    ? "var(--foreground)"
                    : "var(--text-secondary)",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="appheader-nav"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    style={{ zIndex: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <item.icon
                  size={16}
                  weight={isActive ? "fill" : "regular"}
                  className="relative z-10 flex-none"
                />
                <span className="relative z-10 hidden md:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex-none w-[140px] flex items-center justify-end gap-2">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors"
            title="Tìm kiếm"
          >
            <MagnifyingGlass size={18} />
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white text-xs font-semibold select-none">
            S
          </div>
        </div>
      </div>
    </header>
  );
}
