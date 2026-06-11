import type { Lesson, ContinueLearningData, FilterOption } from '../types';

export const MOCK_CONTINUE: ContinueLearningData = {
  lessonId: 'g2',
  title: 'Quá Khứ Hoàn Thành Trong Ngữ Cảnh',
  category: 'grammar',
  progress: 60,
  lastStudied: '2 hours ago',
};

export const MOCK_LESSONS: Record<string, Lesson[]> = {
  grammar: [
    { id: 'g1', title: 'Hiện Tại Đơn vs Tiếp Diễn', category: 'grammar', level: 'A2', topic: 'Tenses', duration: '15 min', progress: 0 },
    { id: 'g2', title: 'Quá Khứ Hoàn Thành Trong Ngữ Cảnh', category: 'grammar', level: 'B1', topic: 'Tenses', duration: '20 min', progress: 60 },
    { id: 'g3', title: 'Động Từ Khiếm Khuyết Lịch Sự', category: 'grammar', level: 'B1', topic: 'Modals', duration: '18 min', progress: 0 },
    { id: 'g4', title: 'Câu Bị Động Trong Báo Cáo', category: 'grammar', level: 'B2', topic: 'Passive', duration: '22 min', progress: 100 },
    { id: 'g5', title: 'Câu Điều Kiện Loại 2 & 3', category: 'grammar', level: 'B2', topic: 'Conditionals', duration: '25 min', progress: 30 },
    { id: 'g6', title: 'Mạo Từ: A, An, The', category: 'grammar', level: 'A2', topic: 'Articles', duration: '12 min', progress: 0 },
  ],
  vocabulary: [
    { id: 'v1', title: 'Cụm Từ Code Review', category: 'vocabulary', domain: 'IT', type: 'Collocations', duration: '10 min', progress: 100 },
    { id: 'v2', title: 'Từ Vựng Họp Standup', category: 'vocabulary', domain: 'IT', type: 'Phrasal Verbs', duration: '12 min', progress: 45 },
    { id: 'v3', title: 'Mẫu Email Công Việc', category: 'vocabulary', domain: 'Business', type: 'Collocations', duration: '15 min', progress: 0 },
    { id: 'v4', title: 'Từ Khóa Phỏng Vấn Xin Việc', category: 'vocabulary', domain: 'Career', type: 'Idioms', duration: '18 min', progress: 0 },
    { id: 'v5', title: 'Giao Tiếp Xã Giao Cơ Bản', category: 'vocabulary', domain: 'Daily', type: 'Phrases', duration: '10 min', progress: 80 },
  ],
  skills: [
    { id: 's1', title: 'Role-play Họp Standup', category: 'skills', skill: 'Nói', duration: '25 min', progress: 30 },
    { id: 's2', title: 'Nghe Chép Podcast Công Nghệ', category: 'skills', skill: 'Nghe', duration: '20 min', progress: 0 },
    { id: 's3', title: 'Sửa Lỗi Email Tiếng Anh', category: 'skills', skill: 'Viết', duration: '15 min', progress: 100 },
    { id: 's4', title: 'Đọc Tài Liệu API', category: 'skills', skill: 'Đọc', duration: '18 min', progress: 50 },
    { id: 's5', title: 'Luận IELTS: Công Nghệ', category: 'skills', skill: 'Viết', duration: '30 min', progress: 0 },
    { id: 's6', title: 'Thư Xin Việc Dev', category: 'skills', skill: 'Viết', duration: '20 min', progress: 0 },
  ],
};

export const GRAMMAR_FILTERS: FilterOption[] = [
  { label: 'Tất Cả Trình Độ', value: 'all' },
  { label: 'A2', value: 'A2' },
  { label: 'B1', value: 'B1' },
  { label: 'B2', value: 'B2' },
];

export const VOCAB_FILTERS: FilterOption[] = [
  { label: 'Tất Cả Lĩnh Vực', value: 'all' },
  { label: 'IT', value: 'IT' },
  { label: 'Business', value: 'Business' },
  { label: 'Career', value: 'Career' },
  { label: 'Daily', value: 'Daily' },
];

export const SKILLS_FILTERS: FilterOption[] = [
  { label: 'Tất Cả Kỹ Năng', value: 'all' },
  { label: 'Nói', value: 'Nói' },
  { label: 'Nghe', value: 'Nghe' },
  { label: 'Đọc', value: 'Đọc' },
  { label: 'Viết', value: 'Viết' },
];
