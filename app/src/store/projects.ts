import { create } from "zustand";

interface ProjectsState {
    isHovered: boolean;
    currentIndex: number;
    setIsHovered: (value: boolean) => void;
    setCurrentIndex: (value: number) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
    isHovered: false,
    currentIndex: 0,
    setIsHovered: (value) => set({ isHovered: value }),
    setCurrentIndex: (value) => set({ currentIndex: value }),
}));