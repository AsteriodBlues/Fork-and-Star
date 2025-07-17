import { create } from "zustand";

type State = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useClientLayoutStore = create<State>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}));