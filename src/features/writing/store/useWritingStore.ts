/**
 * Zustand store cho Writing Practice
 * Quản lý danh sách bài viết gắn với lessonId, persistence vào localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WritingEssay, WritingCorrection, WritingScore } from '../types';

interface WritingState {
  essays: WritingEssay[];
  activeEssayId: string | null;

  setActiveEssay: (id: string | null) => void;
  /** Tạo hoặc lấy bài viết hiện có cho lessonId, sampleDraft dùng pre-fill */
  startOrResumeEssay: (lessonId: string, prompt: string, sampleDraft?: string) => string;
  updateEssayText: (id: string, text: string) => void;
  saveFeedback: (id: string, corrections: WritingCorrection[], scores: WritingScore[]) => void;
  deleteEssay: (id: string) => void;
  /** Lấy essay theo lessonId */
  getEssayByLessonId: (lessonId: string) => WritingEssay | undefined;
}

export const useWritingStore = create<WritingState>()(
  persist(
    (set, get) => ({
      essays: [],
      activeEssayId: null,

      setActiveEssay: (id) => set({ activeEssayId: id }),

      /** Tạo bài mới cho lesson (pre-fill sampleDraft), hoặc resume nếu đã có */
      startOrResumeEssay: (lessonId, prompt, sampleDraft) => {
        const existing = get().essays.find((e) => e.lessonId === lessonId);
        if (existing) {
          // Nếu essay cũ trống nhưng có sampleDraft → điền sẵn
          if (!existing.text && sampleDraft) {
            set((state) => ({
              essays: state.essays.map((e) =>
                e.id === existing.id ? { ...e, text: sampleDraft, updatedAt: Date.now() } : e
              ),
              activeEssayId: existing.id,
            }));
          } else {
            set({ activeEssayId: existing.id });
          }
          return existing.id;
        }

        const id = `essay_\${Date.now()}`;
        const now = Date.now();
        const newEssay: WritingEssay = {
          id,
          lessonId,
          prompt,
          text: sampleDraft || '',
          status: 'draft',
          corrections: [],
          scores: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          essays: [newEssay, ...state.essays],
          activeEssayId: id,
        }));
        return id;
      },

      updateEssayText: (id, text) =>
        set((state) => ({
          essays: state.essays.map((e) =>
            e.id === id ? { ...e, text, updatedAt: Date.now() } : e
          ),
        })),

      saveFeedback: (id, corrections, scores) =>
        set((state) => ({
          essays: state.essays.map((e) =>
            e.id === id
              ? { ...e, corrections, scores, status: 'checked' as const, updatedAt: Date.now() }
              : e
          ),
        })),

      deleteEssay: (id) =>
        set((state) => ({
          essays: state.essays.filter((e) => e.id !== id),
          activeEssayId: state.activeEssayId === id ? null : state.activeEssayId,
        })),

      getEssayByLessonId: (lessonId) =>
        get().essays.find((e) => e.lessonId === lessonId),
    }),
    { name: 'careertalk_writing' }
  )
);
