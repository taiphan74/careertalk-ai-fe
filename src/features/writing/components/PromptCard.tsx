/**
 * Hiển thị đề bài viết với instructions và giới hạn từ
 */

'use client';

interface PromptCardProps {
  prompt: string;
  instructions?: string;
  wordLimit?: { min: number; max: number };
  onNewPrompt: () => void;
}

export function PromptCard({ prompt, instructions, wordLimit, onNewPrompt }: PromptCardProps) {
  return (
    <div className="p-4 rounded-2xl bg-surface border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary">Đề bài</span>
        {wordLimit && (
          <span className="text-xs text-muted-foreground">
            {wordLimit.min}-{wordLimit.max} từ
          </span>
        )}
      </div>
      <p className="text-foreground leading-relaxed mb-3">{prompt}</p>
      {instructions && (
        <p className="text-sm text-muted-foreground border-t border-border pt-2">
          {instructions}
        </p>
      )}
    </div>
  );
}
