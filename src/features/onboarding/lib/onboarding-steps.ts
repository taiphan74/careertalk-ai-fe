import type { UserProfile } from "../types";

/**
 * Định nghĩa các bước thu thập thông tin onboarding.
 * Mỗi bước gồm key (trùng với field trong UserProfile) và prompt (câu hỏi hiển thị).
 * Placeholder {name}, {occupation}... sẽ được thay thế bằng giá trị thực từ profile.
 */
export const ONBOARDING_STEPS = [
  { key: "name", prompt: "Chào bạn! Mình là CareerTalk AI Coach 🌊 Bạn tên gì?" },
  { key: "occupation", prompt: "Chào {name}! Bạn đang làm nghề gì hoặc học ngành gì?" },
  { key: "goal", prompt: "Mục tiêu học tiếng Anh của bạn là gì? (phỏng vấn, giao tiếp công sở, chứng chỉ IELTS/TOEIC...)" },
  { key: "level", prompt: "Trình độ tiếng Anh hiện tại của bạn? (mới bắt đầu, cơ bản, trung cấp, nâng cao)" },
] as const;

/**
 * Tạo câu hỏi cho bước onboarding dựa trên index và profile hiện tại.
 * Thay thế placeholder {key} bằng giá trị tương ứng trong profile.
 * @param stepIndex - Index bước hiện tại (0-based)
 * @param profile - Thông tin người dùng đã thu thập được
 * @returns Câu hỏi đã điền thông tin cá nhân hóa
 */
export function getStepPrompt(stepIndex: number, profile: Partial<UserProfile>): string {
  const step = ONBOARDING_STEPS[stepIndex];
  if (!step) return "";
  let prompt: string = step.prompt;
  for (const [key, value] of Object.entries(profile)) {
    prompt = prompt.replace(`{${key}}`, value);
  }
  return prompt;
}
