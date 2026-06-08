/**
 * @file AIAvatar.tsx
 * @description Avatar hiển thị cho AI trợ lý với hiệu ứng viền gradient động.
 */
"use client";

export function AIAvatar() {
  return (
    <div className="flex-none w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent p-[1.5px] shadow-sm select-none">
      <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-primary">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"/>
        </svg>
      </div>
    </div>
  );
}
