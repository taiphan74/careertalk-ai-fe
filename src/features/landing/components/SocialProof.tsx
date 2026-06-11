"use client";
import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";

const TESTIMONIALS = [
  {
    name: "Nguyễn Minh Khoa",
    role: "Software Engineer tại FPT Software",
    avatar: "https://picsum.photos/seed/user-khoa/48/48",
    quote: "Trước mình toàn lo ngại khi họp với khách hàng nước ngoài. Sau 3 tuần dùng STRIVO, mình tự tin hơn hẳn. AI chỉ ra đúng những lỗi mình hay mắc.",
    stars: 5,
  },
  {
    name: "Trần Thị Lan Anh",
    role: "Marketing Manager, startup EdTech",
    avatar: "https://picsum.photos/seed/user-lan/48/48",
    quote: "Tính năng flashcard tự động là thứ mình cần nhất. Không phải tự chép từ mới, AI tạo hết từ những lỗi của mình. Học đúng chỗ yếu, tiến bộ nhanh hơn nhiều.",
    stars: 5,
  },
  {
    name: "Phạm Đức Anh",
    role: "Sinh viên năm 4, ĐH Bách Khoa HCM",
    avatar: "https://picsum.photos/seed/user-duc/48/48",
    quote: "Mình đang chuẩn bị cho vòng phỏng vấn tiếng Anh. Mock interview với AI rất thực tế, phản hồi chi tiết hơn bất kỳ app học tiếng Anh nào mình từng dùng.",
    stars: 5,
  },
];

export function SocialProof() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] tracking-tight leading-tight">
            Học viên nói gì về <span className="text-[var(--primary)]">STRIVO</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/30 hover:shadow-md transition-all">
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={13} weight="fill" className="text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[var(--border)]" />
                <div>
                  <p className="text-xs font-bold text-[var(--foreground)]">{t.name}</p>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
