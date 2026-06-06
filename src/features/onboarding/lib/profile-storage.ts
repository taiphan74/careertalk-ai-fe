import type { UserProfile } from "../types";

// Key lưu trữ hồ sơ người dùng trong localStorage
const STORAGE_KEY = "careertalk_profile";

/**
 * Đọc hồ sơ người dùng từ localStorage.
 * Trả về null nếu chưa có dữ liệu hoặc parse lỗi.
 * An toàn khi gọi ở server-side (SSR) nhờ check typeof window.
 */
export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Lưu hồ sơ người dùng vào localStorage.
 * Ghi đè dữ liệu cũ nếu đã tồn tại.
 */
export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/**
 * Xóa hồ sơ người dùng khỏi localStorage.
 * Dùng khi cần reset onboarding flow (ví dụ: nút "Bắt đầu lại").
 */
export function clearProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}
