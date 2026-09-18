import { create } from 'zustand';

interface GlobalState {
  isWorldLoaded: boolean;
  setWorldLoaded: (loaded: boolean) => void;
  isNight: boolean;
  setIsNight: (night: boolean) => void;
  toggleNight: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isWorldLoaded: false,
  setWorldLoaded: (loaded) => set({ isWorldLoaded: loaded }),
  isNight: true,
  setIsNight: (night) => set({ isNight: night }),
  toggleNight: () => set((state) => ({ isNight: !state.isNight })),
}));
