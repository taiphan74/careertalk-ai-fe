/**
 * Writing Practice dynamic page - load bài học theo lessonId
 * Route: /writing/[id]
 */

'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWritingStore } from '@/features/writing/store/useWritingStore';
import { getWritingLesson } from '@/features/writing/mocks/mock-writing-lessons';
import { PromptCard } from '@/features/writing/components/PromptCard';
import { WritingEditor } from '@/features/writing/components/WritingEditor';
import { WritingHistoryList } from '@/features/writing/components/WritingHistoryList';
import { ArrowLeft } from 'lucide-react';

export default function WritingPracticePage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const { startOrResumeEssay, essays, activeEssayId } = useWritingStore();

  const writingLesson = getWritingLesson(lessonId);

  // Start/resume essay chỉ 1 lần khi mount
  useEffect(() => {
    if (writingLesson) {
      startOrResumeEssay(lessonId, writingLesson.prompt, writingLesson.sampleDraft);
    }
  }, [lessonId, writingLesson, startOrResumeEssay]);

  const activeEssay = essays.find((e) => e.id === activeEssayId);

  // Không phải bài writing → redirect về lessons
  if (!writingLesson) {
    return (
      <div className="min-h-[100dvh] bg-background p-4 md:p-8 max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Bài học này không phải bài viết</p>
        <button
          onClick={() => router.push('/lessons')}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
        >
          Quay lại Bài học
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background p-4 md:p-8 max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header với nút quay lại */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/lessons')}
          className="p-2 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-foreground">Writing Practice</h1>
      </div>

      {/* Prompt + Instructions */}
      {activeEssay && (
        <PromptCard
          prompt={writingLesson.prompt}
          instructions={writingLesson.instructions}
          wordLimit={writingLesson.wordLimit}
          onNewPrompt={() => {}}
        />
      )}

      <WritingEditor />

      <WritingHistoryList lessonId={lessonId} />
    </div>
  );
}
