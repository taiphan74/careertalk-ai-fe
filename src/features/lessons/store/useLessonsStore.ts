import { create } from 'zustand';
import type { TabKey } from '../types';

interface LessonsState {
  activeTab: TabKey;
  filters: Record<string, string>;
  setActiveTab: (tab: TabKey) => void;
  setFilter: (category: string, value: string) => void;
}

export const useLessonsStore = create<LessonsState>((set) => ({
  activeTab: 'for-you',
  filters: {},
  setActiveTab: (tab) => set({ activeTab: tab }),
  setFilter: (category, value) =>
    set((state) => ({
      filters: { ...state.filters, [category]: value },
    })),
}));
