"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import Link from "next/link";

export function DemoCTA() {
  return (
    <section id="demo" className="py-20 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary)] via-[#1D4ED8] to-[var(--accent)] p-10 md:p-14 text-center">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
              <Sparkle size={13} weight="fill" className="text-white" />
              <span className="text-xs font-semibold text-white">Miễn phí, không cần tài khoản</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl">
              Bắt đầu luyện tiếng Anh ngay hôm nay
            </h2>
            <p className="text-base text-white/75 max-w-md leading-relaxed">
              Thử ngay demo, không cần đăng ký. Cảm nhận sự khác biệt khi có AI coach bên cạnh.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <Link href="/" className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[var(--primary)] font-bold text-sm hover:bg-white/90 transition-all active:scale-[0.98] shadow-lg">
                Thử demo ngay <ArrowRight size={15} weight="bold" />
              </Link>
              <Link href="/" className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 border border-white/25 text-white font-medium text-sm hover:bg-white/20 transition-all">
                Xem tính năng đầy đủ
              </Link>
            </div>
            <p className="text-[11px] text-white/50 mt-1">Powered by AI - Không quảng cáo - Dữ liệu bảo mật</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
