import { create } from "zustand";

interface CounterState {
    isHovered: boolean;
    currentIndex: number;
    setIsHovered: (value: boolean) => void;
    setCurrentIndex: (value: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
    isHovered: false,
    currentIndex: 0,
    setIsHovered: (value) => set({ isHovered: value }),
    setCurrentIndex: (value) => set({ currentIndex: value }),
}));