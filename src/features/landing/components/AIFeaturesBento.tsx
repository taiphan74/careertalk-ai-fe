"use client";
import { motion } from "framer-motion";
import { Sparkle, BookOpen, Cards, ArrowRight, CheckCircle } from "@phosphor-icons/react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function GrammarTile() {
  return (
    <motion.div variants={cardVariants}
      className="rounded-2xl overflow-hidden bg-white border border-[var(--border)] shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] flex items-center justify-center">
          <Sparkle size={18} weight="fill" className="text-[var(--primary)]" />
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--foreground)]">Phân tích ngữ pháp</p>
          <p className="text-[11px] text-slate-500">Realtime khi bạn gõ</p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-3 space-y-2">
        <p className="text-[11px] text-slate-500 font-medium">Câu của bạn:</p>
        <p className="text-xs text-slate-700 leading-relaxed">
          I work <span className="bg-red-100 text-red-600 px-1 rounded line-through text-[11px]">in</span> a startup since 2022.
        </p>
        <motion.div initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-lg p-2">
          <CheckCircle size={13} weight="fill" className="text-emerald-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] font-semibold text-emerald-700">Sửa thành: "I have worked at a startup..."</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Dùng Present Perfect với "since" + "at" với tổ chức</p>
          </div>
        </motion.div>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">AI phân tích lỗi ngay khi bạn nhập, giải thích bằng tiếng Việt dễ hiểu.</p>
    </motion.div>
  );
}

function VocabTile() {
  const words = [
    { word: "Negotiate", vi: "đàm phán", level: "B2" },
    { word: "Deadline", vi: "hạn chót", level: "B1" },
    { word: "Stakeholder", vi: "bên liên quan", level: "C1" },
  ];
  return (
    <motion.div variants={cardVariants}
      className="rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-6 flex flex-col gap-4 text-white">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
          <BookOpen size={18} weight="fill" className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold">Từ điển thông minh</p>
          <p className="text-[11px] text-white/70">Hover để tra nghĩa</p>
        </div>
      </div>
      <div className="space-y-2">
        {words.map((w, i) => (
          <motion.div key={w.word} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 * i }}
            className="flex items-center justify-between bg-white/15 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">{w.word}</span>
              <ArrowRight size={10} className="text-white/60" />
              <span className="text-[11px] text-white/80">{w.vi}</span>
            </div>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">{w.level}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-[11px] text-white/70 leading-relaxed">Hover vào bất kỳ từ nào trong chat để xem nghĩa, phát âm và ví dụ ngữ cảnh.</p>
    </motion.div>
  );
}

function FlashcardTile() {
  return (
    <motion.div variants={cardVariants}
      className="rounded-2xl overflow-hidden bg-white border border-[var(--border)] shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
          <Cards size={18} weight="fill" className="text-[var(--accent)]" />
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--foreground)]">Flashcard tự động</p>
          <p className="text-[11px] text-slate-500">Từ lỗi của chính bạn</p>
        </div>
      </div>
      <div className="relative h-28" style={{ perspective: "600px" }}>
        <motion.div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 180, 180, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-light)] to-[var(--primary-light)] border border-[var(--border)]"
            style={{ backfaceVisibility: "hidden" }}>
            <p className="text-lg font-black text-[var(--primary)]">negotiate</p>
            <p className="text-[10px] text-slate-500 mt-1">Nhấn để lật</p>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-[var(--primary)]"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <p className="text-base font-bold text-white">đàm phán</p>
            <p className="text-[11px] text-white/70 mt-1 text-center px-3">"We need to negotiate the contract terms."</p>
          </div>
        </motion.div>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">AI tự tạo flashcard từ từ vựng bạn hay sai, ôn tập theo thuật toán spaced repetition.</p>
    </motion.div>
  );
}

export function AIFeaturesBento() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] tracking-tight leading-tight">
            AI làm việc cho bạn, <span className="text-[var(--primary)]">không phải ngược lại</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Ba công cụ AI hoạt động song song, biến mỗi cuộc hội thoại thành bài học cá nhân hóa.
          </p>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GrammarTile />
          <VocabTile />
          <FlashcardTile />
        </motion.div>
      </div>
    </section>
  );
}
