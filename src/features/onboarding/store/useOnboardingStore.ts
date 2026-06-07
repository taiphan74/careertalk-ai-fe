/**
 * Zustand store cho Onboarding feature.
 * Quản lý state dùng chung giữa các component trong feature.
 *
 * Hiện tại:
 * - translationResult: kết quả dịch + grammar check (TranslationHint → ChatComposer)
 * - _pendingTranslation: bridge tạm khi user send (SendButton → useOnboardingRuntime)
 *
 * Future-ready slots (khai báo sẵn):
 * - currentStep, userProfile, sessionId
 */
import { create } from "zustand";
import type { TranslateCheckResult } from "../lib/translate-check";

interface OnboardingStore {
  /** Kết quả dịch + lỗi grammar đang hiển thị trong TranslationHint. */
  translationResult: TranslateCheckResult | null;
  setTranslationResult: (result: TranslateCheckResult | null) => void;
  clearTranslationResult: () => void;

  /**
   * Bridge tạm: SendButton lưu translation vào đây trước khi gửi,
   * useOnboardingRuntime đọc + clear ngay sau đó.
   */
  _pendingTranslation: string | null;

  /**
   * Map messageId → bản dịch EN.
   * UserMessageBubble đọc từ đây để hiển thị translation pill.
   */
  translationMap: Record<string, string>;
  setTranslation: (messageId: string, translation: string) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  translationResult: null,
  _pendingTranslation: null,
  translationMap: {},

  setTranslationResult: (result) => set({ translationResult: result }),
  clearTranslationResult: () => set({ translationResult: null }),
  setTranslation: (messageId, translation) =>
    set((state) => ({
      translationMap: { ...state.translationMap, [messageId]: translation },
    })),
}));
