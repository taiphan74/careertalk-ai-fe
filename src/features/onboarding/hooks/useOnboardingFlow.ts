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
   */
  const handleCompletion = useCallback(async () => {
    const finalProfile = { ...profileRef.current, completedAt: new Date().toISOString() };
    saveProfile(finalProfile);
    completedRef.current = true;
    toast.success("🎉 Thu thập thông tin thành công! Chào mừng bạn đến với CareerTalk AI.");

    // Gọi AI để sinh completion message
    setIsRunning(true);
    const completeContextMsg: ChatMessage = {
      id: `complete-trigger-${Date.now()}`,
      role: "user",
      content: `${buildContext(ONBOARDING_STEPS.length, finalProfile)}`,
    };

    const allMessages = [...messages, completeContextMsg];
    const result = await fetchAIResponse(allMessages);

    if (result) {
      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: "assistant", content: result.content },
      ]);
    } else {
      // Fallback hardcode completion
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
  }, [messages, buildContext, fetchAIResponse]);

  /**
   * Xử lý khi user trả lời câu hỏi ở bước hiện tại.
   */
  const handleNextStep = useCallback(async (content: string) => {
    const currentStep = ONBOARDING_STEPS[stepRef.current];
    if (!currentStep) return;

    // Lưu field tương ứng bước hiện tại
    profileRef.current[currentStep.field as keyof UserProfile] = content;

    // Tính bước tiếp theo
    const nextStep = stepRef.current + 1;
    stepRef.current = nextStep;

    // Chưa hoàn thành → gọi AI cho bước tiếp theo
    setIsRunning(true);
    const contextPrefix = buildContext(nextStep, profileRef.current);
    const contextMsg: ChatMessage = {
      id: `step-context-${Date.now()}`,
      role: "user",
      content: `${contextPrefix} ${content}`,
    };

    const allMessages = [...messages, { id: `user-${Date.now()}`, role: "user", content }, contextMsg];
    const result = await fetchAIResponse(allMessages);

    const expectedStepKey = ONBOARDING_STEPS[nextStep]?.key;

    if (result && result.currentStep === expectedStepKey) {
      // AI response đúng step → dùng
      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: "assistant", content: result.content },
      ]);
    } else {
      // Mismatch hoặc lỗi → fallback hardcode prompt
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
  }, [messages, buildContext, fetchAIResponse, createFallbackMessage]);

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

    // Gửi context step 0 với nội dung chào hỏi để AI sinh greeting
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
        // Fallback hardcode greeting
        setMessages([{ id: "init-greeting", role: "assistant", content: createFallbackMessage(0, {}) }]);
      }
      setIsRunning(false);
    });
  }, [buildContext, fetchAIResponse, createFallbackMessage]);

  /**
   * Xử lý khi user gửi tin nhắn.
   * Delegate sang handleCompletion hoặc handleNextStep tùy trạng thái.
   */
  const handleSend = useCallback(async (content: string) => {
    if (completedRef.current) return;

    // Kiểm tra xem đây có phải bước cuối cùng không
    const isLastStep = stepRef.current === ONBOARDING_STEPS.length - 1;

    if (isLastStep) {
      // Bước cuối → lưu profile và hoàn thành
      const currentStep = ONBOARDING_STEPS[stepRef.current];
      if (currentStep) {
        profileRef.current[currentStep.field as keyof UserProfile] = content;
      }
      await handleCompletion();
    } else {
      // Chưa phải bước cuối → xử lý bước tiếp theo
      await handleNextStep(content);
    }
  }, [handleCompletion, handleNextStep]);

  return { messages, isRunning, handleSend };
}
