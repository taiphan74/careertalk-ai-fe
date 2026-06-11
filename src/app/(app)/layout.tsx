import { AppHeader } from "@/components/shared/AppHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-[var(--background)] flex flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
