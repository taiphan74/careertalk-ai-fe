import { OnboardingChat } from "@/features/onboarding/components/OnboardingChat";
import { FeatureHeader } from "@/components/shared/FeatureHeader";

/**
 * Trang onboarding — Áp dụng Shared FeatureHeader đồng bộ layout.
 */
export default function OnboardingPage() {
  return (
    <main className="h-screen w-full flex flex-col overflow-hidden">
      <FeatureHeader
        title="CareerTalk AI Coach"
        subtitle="Học tiếng Anh theo cách của bạn"
        rightElement={
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Online
          </div>
        }
      />

      <div className="flex-1 min-h-0">
        <OnboardingChat />
      </div>
    </main>
  );
}
