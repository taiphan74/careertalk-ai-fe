/**
 * Mock AI writing check logic
 * Production: thay bằng gọi API thực tế đến LLM
 */

import { WritingCorrection, WritingScore } from '../types';

/**
 * Phân tích bài viết mock - phát hiện một số lỗi phổ biến
 * và trả điểm theo tiêu chí IELTS-style
 */
export function getMockWritingCheck(text: string): { corrections: WritingCorrection[]; scores: WritingScore[] } {
  const corrections: WritingCorrection[] = [];

  // Phát hiện lỗi grammar phổ biến
  if (text.includes('have became')) {
    const idx = text.indexOf('have became');
    corrections.push({ index: idx, length: 11, message: 'Grammar: Tense error', suggestion: 'have become' });
  }
  if (text.includes('tecnology')) {
    const idx = text.indexOf('tecnology');
    corrections.push({ index: idx, length: 9, message: 'Spelling', suggestion: 'technology' });
  }
  if (text.includes('they goes')) {
    const idx = text.indexOf('they goes');
    corrections.push({ index: idx, length: 9, message: 'Grammar: Subject-verb agreement', suggestion: 'they go' });
  }

  // Tính điểm mock dựa trên độ dài bài và số lỗi
  const baseScore = Math.min(100, 40 + text.length / 6);
  const penalty = corrections.length * 8;

  const scores: WritingScore[] = [
    { name: 'Task Response', score: Math.min(100, baseScore + 10 - penalty) },
    { name: 'Coherence', score: Math.min(100, baseScore - penalty) },
    { name: 'Lexical Resource', score: Math.min(100, baseScore + 5 - penalty / 2) },
    { name: 'Grammar', score: Math.min(100, baseScore - penalty * 1.5) },
  ].map(s => ({ ...s, score: Math.max(0, Math.round(s.score)) }));

  return { corrections, scores };
}
