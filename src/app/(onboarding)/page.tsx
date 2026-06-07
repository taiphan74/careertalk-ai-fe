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
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(255,255,255,0.22)", color: "white", backdropFilter: "blur(8px)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "#34D399",
                boxShadow: "0 0 6px #34D399",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
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
