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
 * Được convert sang format assistant-ui qua useOnboardingRuntime.
 */
export interface ChatMessage {
  id: string;              // ID duy nhất của tin nhắn
  role: "user" | "assistant"; // Vai trò: người dùng hoặc bot
  content: string;         // Nội dung văn bản thuần
}
