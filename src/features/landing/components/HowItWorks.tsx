"use client";
import { motion } from "framer-motion";
import { ChatCircle, Sparkle, TrendUp } from "@phosphor-icons/react";

const STEPS = [
  {
    icon: ChatCircle,
    color: "var(--primary)",
    bgColor: "var(--primary-light)",
    step: "01",
    title: "Luyện tập với AI",
    desc: "Chọn kịch bản phù hợp mục tiêu: phỏng vấn, họp quốc tế, hay giao tiếp hàng ngày. AI đóng vai người đối diện, phản hồi tự nhiên như người bản ngữ.",
  },
  {
    icon: Sparkle,
    color: "var(--accent)",
    bgColor: "var(--accent-light)",
    step: "02",
    title: "AI phân tích lỗi",
    desc: "Ngay sau khi bạn nhập, AI phát hiện lỗi ngữ pháp, gợi ý từ tự nhiên hơn và giải thích lý do bằng tiếng Việt. Không phán xét, chỉ hỗ trợ.",
  },
  {
    icon: TrendUp,
    color: "#14B8A6",
    bgColor: "var(--success-light)",
    step: "03",
    title: "Tiến bộ thực sự",
    desc: "Lỗi bạn hay mắc tự động thành flashcard. Lộ trình học cá nhân hóa theo từng buổi. Bạn thấy rõ mình đang tiến bộ ở đâu.",
  },
];

const VISUALS = [
  (
    <div className="bg-white rounded-xl border border-[var(--border)] p-3 shadow-sm space-y-2">
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] shrink-0" />
        <div className="bg-slate-100 rounded-xl rounded-tl-sm px-3 py-2 text-[11px] text-slate-700 max-w-[200px]">
          Tell me about your biggest achievement at work.
        </div>
      </div>
      <div className="flex items-start gap-2 justify-end">
        <div className="bg-[#2563EB] rounded-xl rounded-tr-sm px-3 py-2 text-[11px] text-white max-w-[200px]">
          I lead a team to delivered a new feature on time.
        </div>
        <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
      </div>
    </div>
  ),
  (
    <div className="bg-white rounded-xl border border-[var(--border)] p-3 shadow-sm space-y-2">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5">
        <p className="text-[10px] font-semibold text-amber-700 mb-1.5">2 gợi ý tìm thấy</p>
        <div className="space-y-1.5">
          {[["lead","led"],["delivered","to deliver"]].map(([w,c]) => (
            <div key={w} className="flex items-center gap-1.5">
              <span className="text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded line-through">{w}</span>
              <span className="text-[10px] text-slate-400">-&gt;</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded font-medium">{c}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-slate-500 px-1">Thì quá khứ + động từ nguyên mẫu sau "help/lead"</p>
    </div>
  ),
  (
    <div className="bg-white rounded-xl border border-[var(--border)] p-3 shadow-sm">
      <p className="text-[10px] font-semibold text-slate-600 mb-2">Tiến độ tuần này</p>
      <div className="space-y-2">
        {[["Ngữ pháp",78,"#2563EB"],["Từ vựng",62,"#06B6D4"],["Phát âm",45,"#14B8A6"]].map(([label,pct,color]) => (
          <div key={label as string}>
            <div className="flex justify-between mb-0.5">
              <span className="text-[10px] text-slate-500">{label}</span>
              <span className="text-[10px] font-semibold" style={{ color: color as string }}>{pct}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: color as string }}
                initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
];

export function HowItWorks() {
  return (
    <div className="py-20 px-6 bg-[var(--surface)] w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] tracking-tight leading-tight">
            Từ hội thoại đến <span className="text-[var(--primary)]">thành thạo</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Vòng lặp học tập được thiết kế để bạn tiến bộ sau mỗi buổi luyện tập.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.step} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4">
                <div className="rounded-2xl border border-[var(--border)] bg-slate-50/80 p-4 shadow-sm">
                  {VISUALS[i]}
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: step.bgColor }}>
                    <Icon size={18} weight="fill" style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{step.step}</span>
                      <h3 className="text-sm font-bold text-[var(--foreground)]">{step.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
