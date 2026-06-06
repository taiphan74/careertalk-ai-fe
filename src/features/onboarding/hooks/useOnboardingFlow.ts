"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import type { ChatMessage, UserProfile, BilingualContent } from "../types";
import { ONBOARDING_STEPS, getStepPrompt } from "../lib/onboarding-steps";
import { getProfile, saveProfile } from "../lib/profile-storage";

/**
 * Hook quản lý luồng onboarding song ngữ (AI-driven).
 *
 * Trách nhiệm:
 * - Quản lý danh sách tin nhắn và trạng thái đang xử lý
 * - Theo dõi bước onboarding hiện tại và thông tin user đã thu thập
 * - Gọi AI API để sinh response song ngữ {en, vi}
 * - Validate AI response đúng step, fallback hardcode nếu mismatch
 * - Hiển thị toast khi hoàn thành onboarding
 *
 * @returns messages - Danh sách tin nhắn hiện tại
 * @returns isRunning - Đang chờ AI response?
 * @returns handleSend - Hàm xử lý khi user gửi tin nhắn
 */
export function useOnboardingFlow() {
  // Khởi tạo trống, greeting sẽ được fetch từ AI khi mount
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Dùng ref thay vì state vì các giá trị này không trigger re-render
  const profileRef = useRef<Partial<UserProfile>>({});
  const stepRef = useRef(0);
  const completedRef = useRef(false);
  const initializedRef = useRef(false);
  // Ref lưu messages mới nhất để tránh stale closure trong callbacks
  const messagesRef = useRef<ChatMessage[]>([]);

  // Sync messagesRef mỗi khi messages state thay đổi
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /**
   * Build context string để prepend vào user message gửi lên AI.
   * Format: [STEP: {key} | COLLECTED: {json}]
   */
  const buildContext = useCallback((stepIndex: number, profile: Partial<UserProfile>): string => {
    const stepKey = stepIndex >= ONBOARDING_STEPS.length ? "COMPLETE" : ONBOARDING_STEPS[stepIndex].key;
    const collectedStr = Object.keys(profile).length > 0 ? JSON.stringify(profile) : "{}";
    return `[STEP: ${stepKey} | COLLECTED: ${collectedStr}]`;
  }, []);

  /**
   * Tạo fallback message khi AI lỗi hoặc step mismatch.
   */
  const createFallbackMessage = useCallback((stepIndex: number, profile: Partial<UserProfile>): BilingualContent => {
    const prompt = getStepPrompt(stepIndex, profile);
    return { en: prompt, vi: prompt };
  }, []);

  /**
   * Gọi AI API và parse response JSON {en, vi, currentStep}.
   * Trả về null nếu fetch lỗi hoặc parse thất bại.
   */
  const fetchAIResponse = useCallback(async (chatMessages: ChatMessage[]): Promise<{ content: BilingualContent; currentStep: string } | null> => {
    try {
      // Chuyển ChatMessage sang format API mong đợi
      const apiMessages = chatMessages.map((msg) => ({
        role: msg.role,
        content: typeof msg.content === "string" ? msg.content : msg.content.en,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) return null;

      const text = await res.text();
      const parsed = JSON.parse(text);

      if (parsed?.en && parsed?.vi && parsed?.currentStep) {
        return {
          content: { en: parsed.en, vi: parsed.vi },
          currentStep: parsed.currentStep,
        };
      }
      return null;
    } catch {
      console.error("[useOnboardingFlow] AI fetch/parse failed");
      return null;
    }
  }, []);

  /**
   * Xử lý khi user hoàn thành onboarding.
   * Nhận snapshot messages tại thời điểm gọi để tránh stale closure.
   */
  const handleCompletion = useCallback(async (currentMessages: ChatMessage[]) => {
    const finalProfile = { ...profileRef.current, completedAt: new Date().toISOString() };
    saveProfile(finalProfile as UserProfile);
    completedRef.current = true;
    toast.success("🎉 Thu thập thông tin thành công! Chào mừng bạn đến với CareerTalk AI.");

    setIsRunning(true);
    const completeContextMsg: ChatMessage = {
      id: `complete-trigger-${Date.now()}`,
      role: "user",
      content: `${buildContext(ONBOARDING_STEPS.length, finalProfile)}`,
    };

    const allMessages = [...currentMessages, completeContextMsg];
    const result = await fetchAIResponse(allMessages);

    if (result) {
      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: "assistant", content: result.content },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: {
            en: `Thank you ${finalProfile.name}! I've recorded your information. Let's start your English learning journey! 🌊`,
            vi: `Cảm ơn ${finalProfile.name}! Mình đã ghi nhận thông tin. Bắt đầu hành trình học tiếng Anh thôi! 🌊`,
          },
        },
      ]);
    }
    setIsRunning(false);
  }, [buildContext, fetchAIResponse]);

  /**
   * Xử lý khi user trả lời câu hỏi ở bước hiện tại.
   * FIX: Thêm user message vào state TRƯỚC khi gọi AI.
   * FIX: Dùng messagesRef thay vì messages closure để tránh stale.
   */
  const handleNextStep = useCallback(async (content: string) => {
    const currentStep = ONBOARDING_STEPS[stepRef.current];
    if (!currentStep) return;

    // Lưu field tương ứng bước hiện tại
    profileRef.current[currentStep.key as keyof UserProfile] = content;

    // Tính bước tiếp theo
    const nextStep = stepRef.current + 1;
    stepRef.current = nextStep;

    // FIX: Add user message vào state ngay lập tức để UI hiển thị
    const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: "user", content };
    setMessages((prev) => [...prev, userMsg]);

    setIsRunning(true);

    // FIX: Dùng messagesRef.current (fresh) thay vì stale `messages` closure
    const contextPrefix = buildContext(nextStep, profileRef.current);
    const contextMsg: ChatMessage = {
      id: `step-context-${Date.now()}`,
      role: "user",
      content: `${contextPrefix} ${content}`,
    };

    // Build từ ref (fresh) + user msg vừa gửi + context inject
    const allMessages = [...messagesRef.current, userMsg, contextMsg];
    const result = await fetchAIResponse(allMessages);

    const expectedStepKey = ONBOARDING_STEPS[nextStep]?.key;

    if (result && result.currentStep === expectedStepKey) {
      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: "assistant", content: result.content },
      ]);
    } else {
      console.warn(`[useOnboardingFlow] Step mismatch or fetch failed. Expected: ${expectedStepKey}, Got: ${result?.currentStep ?? "null"}. Using fallback.`);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: createFallbackMessage(nextStep, profileRef.current),
        },
      ]);
    }
    setIsRunning(false);
  }, [buildContext, fetchAIResponse, createFallbackMessage]);

  /**
   * Fetch greeting từ AI khi component mount lần đầu.
   */
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const existing = getProfile();
    if (existing?.completedAt) {
      completedRef.current = true;
      return;
    }

    const contextMsg: ChatMessage = {
      id: "init-greeting-trigger",
      role: "user",
      content: `${buildContext(0, {})} Xin chào`,
    };

    setIsRunning(true);
    fetchAIResponse([contextMsg]).then((result) => {
      if (result) {
        setMessages([{ id: "init-greeting", role: "assistant", content: result.content }]);
      } else {
        setMessages([{ id: "init-greeting", role: "assistant", content: createFallbackMessage(0, {}) }]);
      }
      setIsRunning(false);
    });
  }, [buildContext, fetchAIResponse, createFallbackMessage]);

  /**
   * Xử lý khi user gửi tin nhắn.
   * FIX: Truyền messagesRef.current vào handleCompletion thay vì dùng closure.
   */
  const handleSend = useCallback(async (content: string) => {
    if (completedRef.current) return;

    const isLastStep = stepRef.current === ONBOARDING_STEPS.length - 1;

    if (isLastStep) {
      // Bước cuối → add user msg vào state, lưu profile, hoàn thành
      const currentStep = ONBOARDING_STEPS[stepRef.current];
      const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: "user", content };
      setMessages((prev) => [...prev, userMsg]);

      if (currentStep) {
        profileRef.current[currentStep.key as keyof UserProfile] = content;
      }
      // Truyền snapshot fresh thay vì dùng stale closure
      await handleCompletion([...messagesRef.current, userMsg]);
    } else {
      await handleNextStep(content);
    }
  }, [handleCompletion, handleNextStep]);

  return { messages, isRunning, handleSend };
}
