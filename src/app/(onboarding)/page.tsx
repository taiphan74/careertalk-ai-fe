import { OnboardingChat } from "@/features/onboarding/components/OnboardingChat";

/**
 * Trang onboarding - thin wrapper, chỉ render feature component.
 * Header nâng cấp: gradient ocean, logo SVG sóng, progress dots.
 */
export default function OnboardingPage() {
  return (
    <main className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header gradient Ocean Focus */}
      <header
        className="flex-none px-5 py-4 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #0891B2 100%)",
          boxShadow: "0 2px 16px 0 rgb(37 99 235 / 0.25)",
        }}
      >
        {/* Logo SVG sóng biển */}
        <div
          className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12 C5 9, 8 9, 10 12 C12 15, 15 15, 17 12 C19 9, 22 9, 24 12"
              stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"
            />
            <path
              d="M3 17 C5 14, 8 14, 10 17 C12 20, 15 20, 17 17 C19 14, 22 14, 24 17"
              stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" fill="none"
            />
            <circle cx="12" cy="7" r="2.5" fill="white" opacity="0.9"/>
          </svg>
        </div>

        {/* Title + subtitle */}
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-white leading-tight tracking-tight">
            CareerTalk AI Coach
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.72)" }}>
            Học tiếng Anh theo cách của bạn
          </p>
        </div>

        {/* Badge trạng thái online */}
        <div
          className="flex-none flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: "rgba(255,255,255,0.18)", color: "white", backdropFilter: "blur(8px)" }}
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
      </header>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* Chat area */}
      <div className="flex-1 min-h-0">
        <OnboardingChat />
      </div>
    </main>
  );
}
