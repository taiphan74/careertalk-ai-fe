/**
 * Mock writing lesson data - map lessonId to prompt + instructions + sample draft
 * Mỗi bài học Viết trong Lessons Hub sẽ có entry tại đây
 */

export interface WritingLessonData {
  lessonId: string;
  prompt: string;
  instructions: string;
  wordLimit: { min: number; max: number };
  /** Bài viết mẫu chứa lỗi để test - pre-fill vào textarea */
  sampleDraft: string;
}

export const MOCK_WRITING_LESSONS: Record<string, WritingLessonData> = {
  s3: {
    lessonId: 's3',
    prompt: 'You received an email from your manager asking for a project update, but your email response has several grammar and tone errors. Write a corrected professional reply.',
    instructions: 'Viết một email phản hồi chuyên nghiệp. Chú ý ngữ pháp, văn phong và mức độ lịch sự.',
    wordLimit: { min: 80, max: 200 },
    sampleDraft: `Hi manager, I am agree with your email about the project. We have became very busy this month. The team have finished the API but we needs more time for testing. Many informations still missing from the client. I advices we wait until next week. Sorry for the delay but teh team is working rất hard trên this project. Chúng tôi will deliver soon.`,
  },
  s5: {
    lessonId: 's5',
    prompt: "Some people believe that technology has made our lives more complicated. To what extent do you agree or disagree?",
    instructions: 'Viết bài luận IELTS-style. Cần có introduction, body paragraphs và conclusion. Đưa ra lập luận rõ ràng với ví dụ.',
    wordLimit: { min: 150, max: 300 },
    sampleDraft: `Technology has made our lives more complicated. I am agree with this statement because tecnology brings nhiều problems for people.

In the past, life was more simple. People didn't have became so dependent on devices. Nowadays days, everyone uses smartphones và they goes everywhere with them. This make people less connected với each other. The goverment should advices people to limit their use of technology.

Furthermore, enviroment issues have became worse because of technology. Many informations shows that pollution increases. Some people thinks that technology will save us, nhưng I disagree. We have created more problems than we have solved.

In conclusion, I believe technology has made our lives more complicated rather than more easier. We should be more careful about how we use it.`,
  },
  s6: {
    lessonId: 's6',
    prompt: 'Write a cover letter for a frontend developer position at a tech startup. Highlight your React and TypeScript experience.',
    instructions: 'Viết thư xin việc ngắn gọn, chuyên nghiệp. Nhấn mạnh kinh nghiệm kỹ thuật phù hợp với vị trí.',
    wordLimit: { min: 100, max: 250 },
    sampleDraft: `Dear Hiring Manager, I am writing to apply for the frontend developer position. I have became a React developer for 3 years và I has experience with TypeScript. In my current job, I works on a large dashboard application. We uses Next.js và I am responsible for the UI components. Many informations about our product can be found on our website. I think I am more better fit cho this position because I knows React very well. The tecnology stack you use is similar với mine. I look forward to hear from you soon.`,
  },
};

/**
 * Lấy writing lesson data theo id, trả undefined nếu không phải bài writing
 */
export function getWritingLesson(lessonId: string): WritingLessonData | undefined {
  return MOCK_WRITING_LESSONS[lessonId];
}
