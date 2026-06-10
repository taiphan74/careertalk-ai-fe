'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, MessageSquare, BrainCircuit, Sparkles } from 'lucide-react';
import { useLessonsStore } from '../store/useLessonsStore';
import { ForYouTab } from './ForYouTab';
import { CategoryTab } from './CategoryTab';
import { MOCK_LESSONS, GRAMMAR_FILTERS, VOCAB_FILTERS, SKILLS_FILTERS } from '../mocks/mock-lessons';
import type { TabKey } from '../types';

const TABS: { key: TabKey; label: string; icon: typeof BookOpen }[] = [
  { key: 'for-you', label: 'Dành Cho Bạn', icon: Sparkles },
  { key: 'grammar', label: 'Ngữ Pháp', icon: BookOpen },
  { key: 'vocabulary', label: 'Từ Vựng', icon: MessageSquare },
  { key: 'skills', label: 'Kỹ Năng', icon: BrainCircuit },
];

export function LessonsTabs() {
  const { activeTab, setActiveTab } = useLessonsStore();

  return (
    <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
      <Tabs.List className="sticky top-0 z-10 mb-6 flex gap-1 overflow-x-auto border-b border-[var(--border)] bg-[var(--background)]/80 px-1 py-2 backdrop-blur-sm scrollbar-hide">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <Tabs.Trigger
              key={tab.key}
              value={tab.key}
              className={`relative shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon size={16} />
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="lessons-tab-indicator"
                  className="absolute inset-0 -z-10 rounded-lg bg-[var(--primary-light)]"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'for-you' && <ForYouTab />}
          {activeTab === 'grammar' && (
            <CategoryTab category="grammar" lessons={MOCK_LESSONS.grammar} filters={GRAMMAR_FILTERS} filterKey="grammar" />
          )}
          {activeTab === 'vocabulary' && (
            <CategoryTab category="vocabulary" lessons={MOCK_LESSONS.vocabulary} filters={VOCAB_FILTERS} filterKey="vocabulary" />
          )}
          {activeTab === 'skills' && (
            <CategoryTab category="skills" lessons={MOCK_LESSONS.skills} filters={SKILLS_FILTERS} filterKey="skills" />
          )}
        </motion.div>
      </AnimatePresence>
    </Tabs.Root>
  );
}
