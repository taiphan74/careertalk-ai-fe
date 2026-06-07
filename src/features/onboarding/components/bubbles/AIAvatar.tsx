/**
 * @file AIAvatar.tsx
 * @description Avatar hiển thị cho AI trợ lý với hiệu ứng viền gradient động.
 */
"use client";

export function AIAvatar() {
  return (
    <div className="flex-none w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent p-[1.5px] shadow-sm select-none">
      <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-sm">
        🤖
      </div>
    </div>
  );
}
