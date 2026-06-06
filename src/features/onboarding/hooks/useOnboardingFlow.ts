"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import type { ChatMessage, UserProfile } from "../types";
import { getStepPrompt, ONBOARDING_STEPS } from "../lib/onboarding-steps";
import { getProfile, saveProfile } from "../lib/profile-storage";

/**
 * Hook quản lý toàn bộ logic nghiệp vụ onboarding (state machine).
 * KHÔNG phụ thuộc vào bất kỳ thư viện UI nào (@assistant-ui/react).
 *
 * Trách nhiệm:
 * - Quản lý danh sách tin nhắn và trạng thái đang xử lý
 * - Theo dõi bước onboarding hiện tại và thông tin user đã thu thập
 * - Xử lý tin nhắn user gửi: lưu profile → tính bước tiếp → tạo response
 * - Hiển thị toast khi hoàn thành onboarding
 *
 * @returns messages - Danh sách tin nhắn hiện tại
 * @returns isRunning - Bot đang "nghĩ" hay không (dùng để disable input)
 * @returns handleSend - Hàm xử lý khi user gửi tin nhắn
 */
export function useOnboardingFlow() {
  // Khởi tạo với greeting message từ bước 0
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "init-greeting", role: "assistant", content: getStepPrompt(0, {}) },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  // Dùng ref thay vì state vì các giá trị này không trigger re-render
  // và chỉ cần đọc trong callback handleSend
  const profileRef = useRef<Partial<UserProfile>>({});
  const stepRef = useRef(0);
  const completedRef = useRef(false);

  // Kiểm tra xem user đã hoàn thành onboarding chưa (từ localStorage)
  useEffect(() => {
    const existing = getProfile();
    if (existing?.completedAt) {
      completedRef.current = true;
    }
  }, []);

  /**
   * Xử lý khi user gửi tin nhắn.
   * Flow: thêm tin user → lưu field tương ứng bước hiện tại
   *       → nếu đủ bước thì hoàn thành, ngược lại tạo câu hỏi tiếp theo
   */
  const handleSend = useCallback(async (content: string) => {
    if (completedRef.current) return;

    // Thêm tin nhắn người dùng vào danh sách
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Lưu giá trị user trả lời vào profile theo key của bước hiện tại
    const step = stepRef.current;
    const stepKey = ONBOARDING_STEPS[step]?.key;

    if (stepKey) {
      profileRef.current = { ...profileRef.current, [stepKey]: content };
    }

    // Chuyển sang bước tiếp theo
    const nextStep = step + 1;
    stepRef.current = nextStep;

    // Nếu đã qua hết các bước → hoàn thành onboarding
    if (nextStep >= ONBOARDING_STEPS.length) {
      const finalProfile: UserProfile = {
        ...(profileRef.current as UserProfile),
        completedAt: new Date().toISOString(),
      };
      saveProfile(finalProfile);
      completedRef.current = true;
      toast.success("🎉 Thu thập thông tin thành công! Chào mừng bạn đến với CareerTalk AI.");

      // Thêm tin nhắn chào mừng sau khi hoàn thành
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: `Cảm ơn ${finalProfile.name}! Mình đã ghi nhận thông tin. Bắt đầu hành trình học tiếng Anh thôi! 🌊`,
        },
      ]);
      return;
    }

    // Chưa hoàn thành → tạo câu hỏi cho bước tiếp theo
    setIsRunning(true);
    const nextPrompt = getStepPrompt(nextStep, profileRef.current);

    // TODO: Thay bằng streaming call thật tới Ollama API
    await new Promise((r) => setTimeout(r, 600));

    setMessages((prev) => [
      ...prev,
      { id: `assistant-${Date.now()}`, role: "assistant", content: nextPrompt },
    ]);
    setIsRunning(false);
  }, []);

  return { messages, isRunning, handleSend };
}
