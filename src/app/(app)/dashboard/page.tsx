/**
 * @fileoverview Trang Dashboard tổng quan học tập.
 * Server Component thin wrapper, render DashboardBentoGrid client component.
 * Route: /dashboard (trong route group (app))
 */

import type { Metadata } from 'next';
import { DashboardBentoGrid } from '@/features/dashboard/components/DashboardBentoGrid';

export const metadata: Metadata = {
  title: 'Dashboard - CareerTalkAI',
  description: 'Tổng quan tiến độ học tập, gợi ý AI và hoạt động gần đây',
};

/**
 * Dashboard page - thin server component wrapper.
 * Container max-w-7xl centered với padding responsive.
 */
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <DashboardBentoGrid />
    </div>
  );
}
