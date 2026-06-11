import { Search } from "lucide-react";
import { LessonsTabs } from "@/features/lessons/components/LessonsTabs";

export default function LessonsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">
          Bài Học
        </h2>
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
          <input
            type="text"
            placeholder="Tìm kiếm bài học..."
            className="h-9 w-64 rounded-full border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--ring)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
          />
        </div>
      </div>

      <LessonsTabs />
    </div>
  );
}
