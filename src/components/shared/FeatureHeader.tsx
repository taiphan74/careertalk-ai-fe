import React from "react";
import Link from "next/link";
import { StrivoLogo } from "@/features/landing/components/StrivoLogo";

/**
 * @interface FeatureHeaderProps
 */
interface FeatureHeaderProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
  backLabel?: string;
  rightElement?: React.ReactNode;
}

/**
 * Shared Header — style đồng bộ với LandingNav (glassmorphism, StrivoLogo).
 */
export function FeatureHeader({
  title,
  subtitle,
  backUrl,
  backLabel = "Quay lại",
  rightElement,
}: FeatureHeaderProps) {
  return (
    <header
      className="flex-none px-5 h-16 flex items-center gap-3 sticky top-0 z-10 w-full border-b"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: "rgba(255,255,255,0.88)",
        borderColor: "rgba(37,99,235,0.12)",
      }}
    >
      {/* Logo — clickable nếu có backUrl, otherwise link về / */}
      <Link href={backUrl ?? "/"} className="no-underline flex-none" title={backLabel}>
        <StrivoLogo size={28} showWordmark showTagline={false} animate={false} />
      </Link>

      {/* Divider dọc */}
      <div className="w-px h-5 bg-border flex-none" />

      {/* Title + subtitle */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold tracking-tight text-foreground leading-none truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5 text-muted-foreground truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right slot */}
      {rightElement && (
        <div className="flex-none">
          {rightElement}
        </div>
      )}
    </header>
  );
}
