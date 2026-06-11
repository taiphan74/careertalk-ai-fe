"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PaperPlaneTilt, Sparkle } from "@phosphor-icons/react";
import Link from "next/link";

const DEMO_SCRIPT = [
  { role: "assistant", text: "Chào! Hãy thử nói về công việc của bạn bằng tiếng Anh nhé." },
  { role: "user", text: "I work as a software engineer in a startup." },
  {
    role: "assistant",
    text: "Great! Small correction: \"I work AT a startup\" sounds more natural. Your grammar is solid. Want to practice an interview scenario?",
    hint: { wrong: "in a startup", correct: "at a startup", reason: "Dùng 'at' với tổ chức/công ty" },
  },
  { role: "user", text: "Yes, let's do a mock interview!" },
  { role: "assistant", text: "Perfect! Imagine I'm the hiring manager. Tell me about yourself in 60 seconds. Ready? Go! 🎯" },
];

function GrammarHint({ hint }: { hint: { wrong: string; correct: string; reason: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Sparkle size={11} weight="fill" className="text-amber-500" />
        <span className="font-semibold text-amber-700">Gợi ý ngữ pháp</span>
      </div>
      <div className="flex items-center gap-1.5 text-amber-800">
        <span className="line-through text-red-400">{hint.wrong}</span>
        <ArrowRight size={10} />
        <span className="font-medium text-emerald-600">{hint.correct}</span>
      </div>
      <p className="text-amber-700 mt-0.5 text-[10px]">{hint.reason}</p>
    </motion.div>
  );
}

function MiniChatDemo() {
  const [messages, setMessages] = useState([DEMO_SCRIPT[0]]);
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (step >= DEMO_SCRIPT.length) return;
    const userMsg = DEMO_SCRIPT[step];
    if (userMsg.role !== "user") return;
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg = DEMO_SCRIPT[step + 1];
      if (aiMsg) { setMessages((prev) => [...prev, aiMsg]); setStep(step + 2); }
    }, 1200);
  };

  const handleAuto = () => {
    if (step < DEMO_SCRIPT.length && DEMO_SCRIPT[step].role === "user") {
      setInputVal(DEMO_SCRIPT[step].text);
    }
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkle size={14} weight="fill" className="text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-none">AI English Coach</p>
            <p className="text-white/70 text-[10px] mt-0.5">Đang hoạt động</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70 text-[10px]">Live</span>
          </div>
        </div>

        <div className="h-[260px] overflow-y-auto p-3 space-y-2 bg-slate-50/50">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%]">
                  <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--primary)] text-white rounded-br-sm"
                      : "bg-white border border-[var(--border)] text-slate-700 rounded-bl-sm shadow-sm"
                  }`}>{msg.text}</div>
                  {msg.hint && <GrammarHint hint={msg.hint} />}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex justify-start">
                <div className="bg-white border border-[var(--border)] rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <div className="px-3 py-2.5 border-t border-[var(--border)] bg-white">
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-[var(--border)] text-xs text-slate-500 cursor-pointer select-none"
              onClick={handleAuto}>
              {inputVal || (step < DEMO_SCRIPT.length ? "Nhấn để nhập câu tiếp theo..." : "Demo kết thúc")}
            </div>
            <button onClick={handleSend} disabled={!inputVal || isTyping}
              className="w-7 h-7 rounded-xl bg-[var(--primary)] flex items-center justify-center disabled:opacity-40 transition-opacity active:scale-95">
              <PaperPlaneTilt size={13} weight="fill" className="text-white" />
            </button>
          </div>
          <p className="text-[9px] text-slate-400 text-center mt-1.5">Nhấn vào ô nhập để xem demo tương tác</p>
        </div>
      </div>

      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg border border-[var(--border)] px-2.5 py-1.5 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-semibold text-slate-700">AI đang phân tích</span>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-white to-[var(--accent-light)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary)]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary-light)] border border-[var(--primary)]/20 w-fit">
            <Sparkle size={13} weight="fill" className="text-[var(--primary)]" />
            <span className="text-xs font-semibold text-[var(--primary-text)]">AI English Coach cho người Việt</span>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.08] tracking-tight text-[var(--foreground)]">
              Luyện tiếng Anh{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--primary)]">thực chiến</span>
                <motion.span className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }} />
              </span>
              <br />cùng AI coach
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-[480px]">
              AI phân tích lỗi ngữ pháp, gợi ý từ vựng theo ngữ cảnh, tạo flashcard tự động từ chính lỗi của bạn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--primary-hover)] transition-all active:scale-[0.98] shadow-lg shadow-[var(--primary)]/25">
              Bắt đầu miễn phí <ArrowRight size={15} weight="bold" />
            </Link>
            <a href="#features" className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-slate-700 font-medium text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
              Xem tính năng
            </a>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {[12, 34, 56, 78].map((seed) => (
                <img key={seed} src={`https://picsum.photos/seed/user${seed}/32/32`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="user" />
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">1,200+ học viên</p>
              <p className="text-[11px] text-slate-500">đang luyện tập hôm nay</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end">
          <MiniChatDemo />
        </motion.div>
      </div>
    </section>
  );
}
