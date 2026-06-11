/**
 * Hiển thị bài viết với inline corrections highlight
 * Click vào lỗi hiện Popover với gợi ý sửa
 */

'use client';

import { WritingCorrection } from '../types';
import * as Popover from '@radix-ui/react-popover';

interface InlineHighlightProps {
  text: string;
  corrections: WritingCorrection[];
}

interface TextChunk {
  type: 'text' | 'correction';
  content: string;
  correction?: WritingCorrection;
}

/**
 * Chia text thành các chunk, xen kẽ text thường và correction highlight
 */
function buildChunks(text: string, corrections: WritingCorrection[]): TextChunk[] {
  const sorted = [...corrections].sort((a, b) => a.index - b.index);
  const chunks: TextChunk[] = [];
  let lastIndex = 0;

  sorted.forEach((corr) => {
    // Skip overlapping corrections
    if (corr.index < lastIndex) return;

    if (corr.index > lastIndex) {
      chunks.push({ type: 'text', content: text.slice(lastIndex, corr.index) });
    }
    chunks.push({
      type: 'correction',
      content: text.slice(corr.index, corr.index + corr.length),
      correction: corr,
    });
    lastIndex = corr.index + corr.length;
  });

  if (lastIndex < text.length) {
    chunks.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return chunks;
}

export function InlineHighlight({ text, corrections }: InlineHighlightProps) {
  const chunks = buildChunks(text, corrections);

  return (
    <div className="w-full min-h-[300px] p-4 rounded-2xl bg-surface border border-border text-foreground whitespace-pre-wrap leading-relaxed">
      {chunks.map((chunk, i) =>
        chunk.type === 'text' ? (
          <span key={i}>{chunk.content}</span>
        ) : (
          <Popover.Root key={i}>
            <Popover.Trigger asChild>
              <span className="bg-red-100 text-red-800 border-b-2 border-red-400 cursor-pointer hover:bg-red-200 transition-colors dark:bg-red-900/30 dark:text-red-300 dark:border-red-600 dark:hover:bg-red-900/50">
                {chunk.content}
              </span>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border z-50 max-w-xs"
                sideOffset={5}
              >
                <div className="text-sm font-medium mb-1">{chunk.correction!.message}</div>
                <div className="text-sm text-muted-foreground">
                  Gợi ý: <span className="text-primary font-medium">{chunk.correction!.suggestion}</span>
                </div>
                <Popover.Arrow className="fill-popover" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )
      )}
    </div>
  );
}
