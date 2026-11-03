import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (value) => set({ isCollapsed: value }),
}));