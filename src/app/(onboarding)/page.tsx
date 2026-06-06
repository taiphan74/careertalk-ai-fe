import { OnboardingChat } from "@/features/onboarding/components/OnboardingChat";

/**
 * Trang onboarding - thin wrapper, chỉ render feature component.
 * Không chứa bất kỳ logic nào, tuân thủ nguyên tắc "page files thin".
 *
 * Layout: header cố định ở trên + chat UI chiếm toàn bộ phần còn lại.
 * Header dùng CSS variables từ Ocean Focus theme (--primary, --muted-foreground).
 */
export default function OnboardingPage() {
  return (
    <main className="h-screen w-full flex flex-col">
      <header className="flex-none px-4 py-3 border-b border-border bg-background">
        <h1 className="text-lg font-semibold text-primary">🌊 CareerTalk AI Coach</h1>
        <p className="text-xs text-muted-foreground">Học tiếng Anh theo cách của bạn</p>
      </header>
      <div className="flex-1 min-h-0">
        <OnboardingChat />
      </div>
    </main>
  );
}
