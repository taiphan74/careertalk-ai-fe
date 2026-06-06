import { OnboardingChat } from "@/features/onboarding/components/OnboardingChat";

/**
 * Trang onboarding — Creative style: Bangers heading, playful layout.
 * Giữ nguyên màu Ocean Focus.
 */
export default function OnboardingPage() {
  return (
    <main className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <header
        className="flex-none px-5 py-4 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #60A5FA 0%, #93C5FD 50%, #67E8F9 100%)",
          boxShadow: "0 2px 16px 0 rgb(96 165 250 / 0.25)",
        }}
      >
        {/* Logo */}
        <div
          className="flex-none w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
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

        {/* Title — Bangers font */}
        <div className="flex-1 min-w-0">
          <h1
            className="text-white leading-none tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-bangers)",
              fontSize: "clamp(1.4rem, 5vw, 2rem)",
              textShadow: "0 2px 8px rgba(0,0,0,0.12)",
              letterSpacing: "0.08em",
            }}
          >
            CareerTalk AI Coach
          </h1>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.82)" }}>
            Học tiếng Anh theo cách của bạn
          </p>
        </div>

        {/* Badge online */}
        <div
          className="flex-none flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
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
      </header>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div className="flex-1 min-h-0">
        <OnboardingChat />
      </div>
    </main>
  );
}
