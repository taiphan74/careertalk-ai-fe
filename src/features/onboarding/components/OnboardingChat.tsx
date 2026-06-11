"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
} from "@assistant-ui/react";
import { useOnboardingFlow } from "../hooks/useOnboardingFlow";
import { useOnboardingRuntime } from "../hooks/useOnboardingRuntime";
import { UserMessageBubble, AssistantMessageBubble, TypingIndicatorBubble } from "./bubbles";
import { ChatComposer } from "./ChatComposer";
import { EmptyState } from "./EmptyState";
import { ErrorSummaryBubble } from "./ErrorSummaryBubble";

/**
 * Component chính của feature onboarding.
 * Kết hợp tất cả hooks và sub-components thành chat UI hoàn chỉnh.
 *
 * Background: mesh gradient ocean tinh tế, không át nội dung chat.
 * Provider chain:
 * 1. AssistantRuntimeProvider: broadcast runtime qua React Context
 * 2. ThreadPrimitive.Root: thread scope cho primitives con
 *
 * Visual tokens: GRADIENTS.meshChat (radial gradient trên var(--background)).
 */
export function OnboardingChat() {
  const { messages, isRunning, isCompleted, handleSend } = useOnboardingFlow();

  const runtime = useOnboardingRuntime({
    messages,
    isRunning,
    onSend: handleSend,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-col h-full relative bg-white">
        <ThreadPrimitive.Root className="flex flex-col h-full">
          {/* Vùng scroll chứa danh sách tin nhắn */}
          <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
            {/* Empty state — hiển thị khi chưa có tin nhắn nào */}
            <ThreadPrimitive.If empty>
              <EmptyState onQuickPrompt={handleSend} />
            </ThreadPrimitive.If>

            <ThreadPrimitive.Messages
              components={{
                UserMessage: UserMessageBubble,
                AssistantMessage: AssistantMessageBubble,
              }}
            />
            {/* Hiển thị typing indicator khi AI đang xử lý */}
            <ThreadPrimitive.If running>
              <TypingIndicatorBubble />
            </ThreadPrimitive.If>

            {/* Tổng hợp lỗi ngữ pháp khi onboarding hoàn thành */}
            {isCompleted && <ErrorSummaryBubble />}
          </ThreadPrimitive.Viewport>

          {/* Input cố định ở đáy */}
          <ChatComposer />
        </ThreadPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}
