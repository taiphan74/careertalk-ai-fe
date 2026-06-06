"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
} from "@assistant-ui/react";
import { useOnboardingFlow } from "../hooks/useOnboardingFlow";
import { useOnboardingRuntime } from "../hooks/useOnboardingRuntime";
import { UserMessageBubble, AssistantMessageBubble } from "./ChatMessageBubble";
import { ChatComposer } from "./ChatComposer";

/**
 * Component chính của feature onboarding.
 * Kết hợp tất cả hooks và sub-components thành chat UI hoàn chỉnh.
 *
 * Cấu trúc provider:
 * 1. AssistantRuntimeProvider: broadcast runtime qua React Context
 *    → hooks như useThread(), useComposer() đọc từ đây
 * 2. ThreadPrimitive.Root: thiết lập thread scope cho primitives con
 *
 * Note: AuiProvider bị loại bỏ vì v0.14.x yêu cầu AssistantClient instance
 * mà ta không có trong context standalone này. Theme sẽ fallback default.
 */
export function OnboardingChat() {
  // Lấy business logic từ flow hook (framework-agnostic)
  const { messages, isRunning, handleSend } = useOnboardingFlow();

  // Adapter: chuyển đổi flow data → assistant-ui runtime format
  const runtime = useOnboardingRuntime({
    messages,
    isRunning,
    onSend: handleSend,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ThreadPrimitive.Root className="flex flex-col h-full">
        {/* Vùng scroll chứa danh sách tin nhắn */}
        <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto p-4 space-y-4">
          <ThreadPrimitive.Messages
            components={{
              UserMessage: UserMessageBubble,
              AssistantMessage: AssistantMessageBubble,
            }}
          />
        </ThreadPrimitive.Viewport>
        {/* Input cố định ở đáy, không cuộn theo messages */}
        <ChatComposer />
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  );
}
