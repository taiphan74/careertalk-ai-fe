"use client";

import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";

export function DashboardGreeting() {
  const { stats } = useDashboardData();

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Chào buổi sáng"
      : hour < 18
        ? "Chào buổi chiều"
        : "Chào buổi tối";

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
        {greeting}
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mt-1">
        {stats.streakDays} ngày học liên tục
      </p>
    </div>
  );
}
