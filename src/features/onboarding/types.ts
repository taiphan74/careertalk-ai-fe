/**
 * Cấu trúc nội dung tin nhắn song ngữ từ AI.
 * Tiếng Anh là nội dung chính, tiếng Việt là phụ đề hỗ trợ.
 */
export interface BilingualContent {
  en: string; // Nội dung tiếng Anh (chính)
  vi: string; // Nội dung tiếng Việt (phụ, hiển thị mờ bên dưới)
}

/**
 * Kiểu dữ liệu hồ sơ người dùng sau khi hoàn thành onboarding.
 * Được lưu vào localStorage để duy trì trạng thái giữa các phiên.
 */
export interface UserProfile {
  name: string;        // Tên người dùng
  occupation: string;  // Nghề nghiệp hoặc ngành học
  goal: string;        // Mục tiêu học tiếng Anh
  level: string;       // Trình độ hiện tại
  completedAt?: string; // Thời gian hoàn thành onboarding (ISO string)
}

/**
 * Kiểu tin nhắn nội bộ dùng trong state của useOnboardingFlow.
 * - User message: content luôn là string (text thuần).
 * - Assistant message: content là BilingualContent (AI trả JSON {en, vi}).
 * Được convert sang format assistant-ui qua useOnboardingRuntime.
 */
export interface ChatMessage {
  id: string;              // ID duy nhất của tin nhắn
  role: "user" | "assistant"; // Vai trò: người dùng hoặc bot
  content: string | BilingualContent; // String cho user, BilingualContent cho assistant
}
