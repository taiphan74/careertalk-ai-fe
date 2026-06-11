import type { Metadata } from "next";
import { DashboardBentoGrid } from "@/features/dashboard/components/DashboardBentoGrid";
import { DashboardGreeting } from "./DashboardGreeting";

export const metadata: Metadata = {
  title: "Dashboard - CareerTalkAI",
  description: "Tổng quan tiến độ học tập, gợi ý AI và hoạt động gần đây",
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
      <DashboardGreeting />
      <DashboardBentoGrid />
    </div>
  );
}
