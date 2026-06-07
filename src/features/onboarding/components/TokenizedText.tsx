'use client';

/**
 * @file TokenizedText.tsx
 * @description Split chuỗi tiếng Anh thành các token (từ + dấu câu).
 * Từ có trong mock dictionary → wrap WordTooltip (underline dashed).
 * Từ không có entry hoặc dấu câu → render plain <span>.
 * Bảo toàn khoảng trắng và dấu câu gốc.
 */

import { useMemo } from 'react';
import { lookupWord } from '../lib/word-dictionary';
import { WordTooltip } from './WordTooltip';

/** Props cho TokenizedText */
interface TokenizedTextProps {
  /** Chuỗi tiếng Anh cần tokenize (thường là translationEn) */
  text: string;
}

/** Regex tách từ và dấu câu, giữ nguyên khoảng trắng */
const TOKEN_REGEX = /(\b[a-zA-Z]+\b|[^a-zA-Z]+)/g;

/**
 * Render chuỗi tiếng Anh với các từ có thể tra cứu được highlight.
 * Từ có mock dict entry → underline dashed + tooltip khi hover/tap.
 * Từ không có entry → hiển thị bình thường.
 *
 * @param text - Chuỗi tiếng Anh cần tokenize
 */
export function TokenizedText({ text }: TokenizedTextProps) {
  const tokens = useMemo(() => {
    const matches = text.match(TOKEN_REGEX);
    if (!matches) return [];

    return matches.map((token, index) => {
      const entry = lookupWord(token);
      return { token, entry, key: index };
    });
  }, [text]);

  return (
    <span className="inline">
      {tokens.map(({ token, entry, key }) => {
        if (entry) {
          return (
            <WordTooltip key={key} entry={entry}>
              {token}
            </WordTooltip>
          );
        }
        return <span key={key}>{token}</span>;
      })}
    </span>
  );
}
