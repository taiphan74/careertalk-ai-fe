/**
 * Component hiển thị một flashcard với animations.
 * Tap để lật thẻ, swipe trái/phải để đánh giá.
 */
"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Flashcard } from "../types";

interface FlashcardCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  onSwipe: (direction: "left" | "right") => void;
}

export function FlashcardCard({ card, isFlipped, onFlip, onSwipe }: FlashcardCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.3, 1, 1, 1, 0.3]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const swipeThreshold = 100;
    const velocityThreshold = 500;
    
    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > velocityThreshold) {
      const direction = offset > 0 ? "right" : "left";
      onSwipe(direction);
    } else if (Math.abs(offset) < 5) {
      onFlip();
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-md aspect-[3/4] cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
    >
      {/* Front face */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center">
          {card.pronunciation && (
            <div className="text-sm text-gray-500 mb-4 font-mono">{card.pronunciation}</div>
          )}
          <div className="text-3xl font-bold text-center text-gray-900 mb-6">{card.front}</div>
          {card.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-auto">
              {card.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-700 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="absolute bottom-4 text-xs text-gray-400">Tap để lật • Vuốt để đánh giá</div>
        </div>
      </motion.div>

      {/* Back face */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col">
          <div className="text-2xl font-bold text-center text-gray-900 mb-6">{card.back}</div>
          {card.example && (
            <div className="mt-auto p-4 bg-white/30 rounded-lg">
              <div className="text-xs text-gray-500 mb-2">Ví dụ:</div>
              <div className="text-sm text-gray-700 italic">"{card.example}"</div>
            </div>
          )}
          <div className="absolute bottom-4 text-xs text-gray-400 text-center w-full">
            Tap để lật lại • Vuốt để đánh giá
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
