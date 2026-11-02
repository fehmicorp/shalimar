import { create } from "zustand";

interface HeroState {
  isDismissed: boolean;
  canScroll: boolean;
  headerVisible: boolean;
  setIsDismissed: (value: boolean) => void;
  setCanScroll: (value: boolean) => void;
  setHeaderVisible: (value: boolean) => void;
  dismissHero: () => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  isDismissed: false,
  canScroll: false,
  headerVisible: false,
  setIsDismissed: (value) => set({ isDismissed: value }),
  setCanScroll: (value) => set({ canScroll: value }),
  setHeaderVisible: (value) => set({ headerVisible: value }),
  dismissHero: () => {
    sessionStorage.setItem("hero_hidden", "true");
    set({ isDismissed: true, headerVisible: true });
  },
}));