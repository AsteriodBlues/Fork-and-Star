import { create } from "zustand";

type CursorState = {
  hovered: boolean;
  setHovered: (hovered: boolean) => void;
};

export const useCursorStore = create<CursorState>((set) => ({
  hovered: false,
  setHovered: (hovered) => set({ hovered }),
}));