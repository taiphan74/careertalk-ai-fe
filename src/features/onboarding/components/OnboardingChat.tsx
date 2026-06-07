"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
} from "@assistant-ui/react";
import { useOnboardingFlow } from "../hooks/useOnboardingFlow";
import { useOnboardingRuntime } from "../hooks/useOnboardingRuntime";
import { UserMessageBubble, AssistantMessageBubble, TypingIndicatorBubble } from "./bubbles";
import { ChatComposer } from "./ChatComposer";

/**
 * Component chính của feature onboarding.
 * Kết hợp tất cả hooks và sub-components thành chat UI hoàn chỉnh.
 *
 * Background: mesh gradient ocean tinh tế, không át nội dung chat.
 * Provider chain:
 * 1. AssistantRuntimeProvider: broadcast runtime qua React Context
 * 2. ThreadPrimitive.Root: thread scope cho primitives con
 */
export function OnboardingChat() {
  const { messages, isRunning, handleSend } = useOnboardingFlow();

  const runtime = useOnboardingRuntime({
    messages,
    isRunning,
    onSend: handleSend,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div
        className="flex flex-col h-full relative"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 0%, rgba(37,99,235,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 100%, rgba(6,182,212,0.06) 0%, transparent 60%),
            var(--background)
          `,
        }}
      >
        <ThreadPrimitive.Root className="flex flex-col h-full">
          {/* Vùng scroll chứa danh sách tin nhắn */}
          <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
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
          </ThreadPrimitive.Viewport>

          {/* Input cố định ở đáy */}
          <ChatComposer />
        </ThreadPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}
