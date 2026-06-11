"use client";

import { create } from "zustand";

/**
 * Lỗi ngữ pháp tracked trong phiên onboarding.
 * Session-only — không persist, reset khi đóng tab.
 */
export interface TrackedError {
  wrong: string;
  correct: string;
  reason: string;
  context?: string;
  timestamp: string;
}

interface ErrorTrackingStore {
  errors: TrackedError[];
  addError: (error: TrackedError) => void;
  addErrors: (errors: { wrong: string; correct: string; reason: string }[], context?: string) => void;
  clearErrors: () => void;
}

const dedupeKey = (e: { wrong: string; correct: string }) => `${e.wrong}::${e.correct}`;

export const useErrorTrackingStore = create<ErrorTrackingStore>()((set) => ({
  errors: [],

  addError: (error) =>
    set((state) => {
      const key = dedupeKey(error);
      if (state.errors.some((e) => dedupeKey(e) === key)) return state;
      return { errors: [...state.errors, error] };
    }),

  addErrors: (errors, context) =>
    set((state) => {
      const newErrors = errors
        .filter((e) => !state.errors.some((se) => dedupeKey(se) === dedupeKey(e)))
        .map((e) => ({
          ...e,
          context: context,
          timestamp: new Date().toISOString(),
        }));
      if (newErrors.length === 0) return state;
      return { errors: [...state.errors, ...newErrors] };
    }),

  clearErrors: () => set({ errors: [] }),
}));
