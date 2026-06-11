/**
 * Types cho tính năng Writing Practice
 * Quản lý trạng thái bài viết, feedback từ AI, và tiêu chí chấm điểm
 */

export type WritingStatus = 'draft' | 'checked';

/** Lỗi/cải tiến được AI phát hiện trong bài viết */
export interface WritingCorrection {
  /** Vị trí bắt đầu của lỗi trong chuỗi text */
  index: number;
  /** Độ dài của đoạn text bị lỗi */
  length: number;
  /** Mô tả lỗi (VD: "Grammar: Tense error") */
  message: string;
  /** Gợi ý sửa (VD: "have become") */
  suggestion: string;
}

/** Điểm theo tiêu chí IELTS-style */
export interface WritingScore {
  /** Tên tiêu chí (VD: "Task Response", "Coherence") */
  name: string;
  /** Điểm từ 0-100 */
  score: number;
}

/** Một bài viết thực hành */
export interface WritingEssay {
  id: string;
  lessonId: string;
  prompt: string;
  text: string;
  status: WritingStatus;
  corrections: WritingCorrection[];
  scores: WritingScore[];
  createdAt: number;
  updatedAt: number;
}
