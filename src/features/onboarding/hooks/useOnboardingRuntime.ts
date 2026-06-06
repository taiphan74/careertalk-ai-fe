"use client";

import {
  useExternalStoreRuntime,
  type ExternalStoreMessageConverter,
} from "@assistant-ui/react";
import type { ChatMessage } from "../types";

/**
 * Tham số đầu vào cho hook adapter runtime.
 * Tách riêng để interface rõ ràng, dễ đọc.
 */
interface UseOnboardingRuntimeParams {
  messages: ChatMessage[];     // Tin nhắn từ useOnboardingFlow
  isRunning: boolean;          // Trạng thái bot đang xử lý
  onSend: (content: string) => Promise<void>; // Hàm xử lý gửi tin từ flow hook
}

/**
 * Hook adapter kết nối useOnboardingFlow với @assistant-ui/react.
 *
 * Trách nhiệm DUY NHẤT: chuyển đổi dữ liệu giữa 2 phía.
 * - Convert ChatMessage (format nội bộ) → format assistant-ui yêu cầu
 * - Extract text từ assistant-ui message → gọi onSend của flow hook
 *
 * Nếu đổi thư viện UI (bỏ assistant-ui) → chỉ cần viết lại hook này,
 * useOnboardingFlow giữ nguyên 100%.
 *
 * @param params - Messages, isRunning, onSend từ useOnboardingFlow
 * @returns Runtime object để truyền vào AssistantRuntimeProvider
 */
export function useOnboardingRuntime({
  messages,
  isRunning,
  onSend,
}: UseOnboardingRuntimeParams) {
  return useExternalStoreRuntime({
    messages,
    isRunning,
    // Chuyển đổi ChatMessage nội bộ → format assistant-ui hiểu được
    convertMessage: ((msg: ChatMessage) => ({
      id: msg.id,
      role: msg.role,
      content: [{ type: "text" as const, text: msg.content }],
    })) as ExternalStoreMessageConverter<ChatMessage>,
    // Khi user gửi tin qua UI assistant-ui → extract text → delegate cho flow hook
    onNewMessage: async (msg) => {
      const text =
        typeof msg.content === "string"
          ? msg.content
          : msg.content
              .filter((c): c is { type: "text"; text: string } => c.type === "text")
              .map((c) => c.text)
              .join("");
      await onSend(text);
    },
  });
}
