/**
 * @file word-dictionary.ts
 * @description Mock dictionary cho word tooltip trong onboarding chat.
 * Production: thay bằng API call hoặc real dict service.
 */

/** Thông tin từ vựng hiển thị trong tooltip */
export interface WordEntry {
  /** Từ gốc (lowercase) */
  word: string;
  /** Loại từ */
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition';
  /** Định nghĩa ngắn gọn bằng tiếng Anh */
  definition: string;
  /** Câu ví dụ minh họa */
  example: string;
}

/** Badge màu theo loại từ — dùng chung cho WordTooltip */
export const POS_COLORS: Record<string, string> = {
  noun:        'bg-blue-100 text-blue-700 border border-blue-200',
  verb:        'bg-green-100 text-green-700 border border-green-200',
  adjective:   'bg-amber-100 text-amber-700 border border-amber-200',
  adverb:      'bg-purple-100 text-purple-700 border border-purple-200',
  pronoun:     'bg-pink-100 text-pink-700 border border-pink-200',
  preposition: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
};

/**
 * Mock dictionary ~20 từ phổ thông xuất hiện trong onboarding flow.
 * Key: lowercase word không chứa ký tự đặc biệt.
 */
const MOCK_DICTIONARY: Record<string, WordEntry> = {
  name: {
    word: 'name',
    partOfSpeech: 'noun',
    definition: 'A word used to identify a person or thing',
    example: 'My name is John.',
  },
  work: {
    word: 'work',
    partOfSpeech: 'verb',
    definition: 'To do a job or activity',
    example: 'I work in IT.',
  },
  learn: {
    word: 'learn',
    partOfSpeech: 'verb',
    definition: 'To gain knowledge or skill through study or experience',
    example: 'I want to learn English for my career.',
  },
  english: {
    word: 'english',
    partOfSpeech: 'noun',
    definition: 'The language spoken in England, the US, and many other countries',
    example: 'She studies English every day.',
  },
  career: {
    word: 'career',
    partOfSpeech: 'noun',
    definition: 'An occupation or profession pursued over time',
    example: 'He wants to advance his career in tech.',
  },
  goal: {
    word: 'goal',
    partOfSpeech: 'noun',
    definition: 'Something you aim to achieve',
    example: 'My goal is to speak fluently.',
  },
  level: {
    word: 'level',
    partOfSpeech: 'noun',
    definition: 'A position on a scale of amount or quality',
    example: 'What is your current English level?',
  },
  practice: {
    word: 'practice',
    partOfSpeech: 'verb',
    definition: 'To do something repeatedly to improve skill',
    example: 'I practice speaking every morning.',
  },
  speak: {
    word: 'speak',
    partOfSpeech: 'verb',
    definition: 'To say words using your voice',
    example: 'Can you speak slowly please?',
  },
  help: {
    word: 'help',
    partOfSpeech: 'verb',
    definition: 'To make it easier for someone to do something',
    example: 'This app will help you improve.',
  },
  improve: {
    word: 'improve',
    partOfSpeech: 'verb',
    definition: 'To make or become better',
    example: 'I want to improve my pronunciation.',
  },
  fluent: {
    word: 'fluent',
    partOfSpeech: 'adjective',
    definition: 'Able to speak a language easily and accurately',
    example: 'She is fluent in three languages.',
  },
  interview: {
    word: 'interview',
    partOfSpeech: 'noun',
    definition: 'A formal meeting where someone is asked questions',
    example: 'I have a job interview next week.',
  },
  professional: {
    word: 'professional',
    partOfSpeech: 'adjective',
    definition: 'Relating to a job or career that requires special training',
    example: 'I need professional English skills.',
  },
  communication: {
    word: 'communication',
    partOfSpeech: 'noun',
    definition: 'The exchange of information between people',
    example: 'Good communication is important at work.',
  },
  vocabulary: {
    word: 'vocabulary',
    partOfSpeech: 'noun',
    definition: 'The set of words known by a person',
    example: 'Reading helps expand your vocabulary.',
  },
  grammar: {
    word: 'grammar',
    partOfSpeech: 'noun',
    definition: 'The rules about how words change and combine in a language',
    example: 'Grammar can be difficult to master.',
  },
  pronunciation: {
    word: 'pronunciation',
    partOfSpeech: 'noun',
    definition: 'The way a word is spoken',
    example: 'Your pronunciation is getting better.',
  },
  confident: {
    word: 'confident',
    partOfSpeech: 'adjective',
    definition: 'Feeling sure about your own ability',
    example: 'I feel more confident speaking now.',
  },
  experience: {
    word: 'experience',
    partOfSpeech: 'noun',
    definition: 'Knowledge or skill gained through doing something',
    example: 'Work experience is valuable for interviews.',
  },
};

/**
 * Tra cứu từ vựng trong mock dictionary.
 * Chuẩn hóa input: lowercase + loại bỏ ký tự không phải chữ cái.
 *
 * @param word - Từ cần tra cứu
 * @returns WordEntry nếu tìm thấy, undefined nếu không có trong dict
 */
export function lookupWord(word: string): WordEntry {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, '');
  const found = MOCK_DICTIONARY[normalized];
  if (found) return found;

  // Fallback mặc định cho từ chưa có trong mock dict (demo phase)
  return {
    word: normalized,
    partOfSpeech: 'noun',
    definition: `(Demo) Definition for "${normalized}" — will be replaced by real dictionary API.`,
    example: `This is a demo sentence using the word "${normalized}".`,
  };
}
