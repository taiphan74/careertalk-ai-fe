"use client";

import {
  useExternalStoreRuntime,
  type ExternalStoreMessageConverter,
  type AppendMessage,
} from "@assistant-ui/react";
import type { ChatMessage, BilingualContent } from "../types";

/**
 * Tham số đầu vào cho hook adapter runtime.
 */
interface UseOnboardingRuntimeParams {
  messages: ChatMessage[];
  isRunning: boolean;
  onSend: (content: string) => Promise<void>;
}

/**
 * Kiểm tra content có phải BilingualContent hay không.
 */
function isBilingualContent(content: unknown): content is BilingualContent {
  return (
    typeof content === "object" &&
    content !== null &&
    "en" in content &&
    "vi" in content
  );
}

/**
 * Hook adapter kết nối useOnboardingFlow với @assistant-ui/react v0.14.x.
 *
 * - convertMessage: chuyển ChatMessage → format assistant-ui
 * - onNew: callback khi user gửi tin (v0.14.x thay thế onNewMessage)
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
    convertMessage: ((msg: ChatMessage) => {
      if (isBilingualContent(msg.content)) {
        // Assistant message: serialize BilingualContent thành JSON string
        // Bubble component sẽ parse lại để render song ngữ
        return {
          id: msg.id,
          role: msg.role,
          content: [
            { type: "text" as const, text: JSON.stringify(msg.content) },
          ],
        };
      }
      // User message: content là string thuần
      return {
        id: msg.id,
        role: msg.role,
        content: [{ type: "text" as const, text: msg.content as string }],
      };
    }) as ExternalStoreMessageConverter<ChatMessage>,
    // v0.14.x: onNew thay vì onNewMessage, nhận AppendMessage
    onNew: async (message: AppendMessage) => {
      const textParts = message.content.filter(
        (c): c is { type: "text"; text: string } => c.type === "text"
      );
      const text = textParts.map((c) => c.text).join("");
      if (text) {
        await onSend(text);
      }
    },
  });
}
