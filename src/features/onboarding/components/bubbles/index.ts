/**
 * Barrel export cho tất cả chat bubble components.
 *
 * Export:
 * - UserMessageBubble: bong bóng tin nhắn người dùng
 * - AssistantMessageBubble: bong bóng tin nhắn AI (song ngữ)
 * - TypingIndicatorBubble: 3-dot loading khi AI đang xử lý
 *
 * Không export AIAvatar, bubble-styles (internal primitives).
 */

export { UserMessageBubble } from "./UserMessageBubble";
export { AssistantMessageBubble } from "./AssistantMessageBubble";
export { TypingIndicatorBubble } from "./TypingIndicatorBubble";
