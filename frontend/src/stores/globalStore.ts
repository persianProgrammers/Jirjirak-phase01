import { create } from 'zustand';
import { ambientAudio } from '../services/ambientAudio';

interface GlobalState {
  isWorldLoaded: boolean;
  setWorldLoaded: (loaded: boolean) => void;
  isNight: boolean;
  setIsNight: (night: boolean) => void;
  toggleNight: () => void;
  
  // Language State
  currentLang: 'EN' | 'FA';
  setLang: (lang: 'EN' | 'FA') => void;
  toggleLang: () => void;

  // Audio State (Original Gramophone)
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;

  // Screen Transition State
  transitionPhase: 'idle' | 'covering' | 'paused' | 'uncovering';
  triggerTransition: (action: () => void) => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  isWorldLoaded: false,
  setWorldLoaded: (loaded) => set({ isWorldLoaded: loaded }),
  isNight: true,
  setIsNight: (night) => {
    set({ isNight: night });
    ambientAudio.setNightMode(night);
  },
  toggleNight: () => {
    const { triggerTransition, isNight } = get();
    triggerTransition(() => {
      const nextNight = !isNight;
      set({ isNight: nextNight });
      ambientAudio.setNightMode(nextNight);
    });
  },

  // Language
  currentLang: 'FA',
  setLang: (lang) => set({ currentLang: lang }),
  toggleLang: () => {
    const { triggerTransition, currentLang } = get();
    const nextLang = currentLang === 'FA' ? 'EN' : 'FA';
    triggerTransition(() => {
      set({ currentLang: nextLang });
    });
  },

  // Audio Playback
  isPlaying: false,
  setIsPlaying: (playing: boolean) => {
    if (playing) {
      ambientAudio.play(get().isNight);
    } else {
      ambientAudio.stop();
    }
    set({ isPlaying: playing });
  },
  togglePlay: () => {
    const nextPlaying = !get().isPlaying;
    if (nextPlaying) {
      ambientAudio.play(get().isNight);
    } else {
      ambientAudio.stop();
    }
    set({ isPlaying: nextPlaying });
  },

  // Transition State: 
  // 1. Initial covering: 800ms
  // 2. Exact 4-SECOND PAUSE/HOLD: 4000ms
  // 3. Uncovering: 800ms
  transitionPhase: 'idle',
  triggerTransition: (action: () => void) => {
    if (get().transitionPhase !== 'idle') return;

    // 1. Start Covering
    set({ transitionPhase: 'covering' });

    // 2. Screen is completely covered (at 800ms). Execute state changes silently behind the curtain!
    setTimeout(() => {
      action();
      set({ transitionPhase: 'paused' });
    }, 800);

    // 3. Exactly after 4 FULL SECONDS of coverage (800ms + 4000ms = 4800ms), begin Uncovering!
    setTimeout(() => {
      set({ transitionPhase: 'uncovering' });
    }, 4800);

    // 4. Return to idle after uncovering finishes (4800ms + 800ms = 5600ms)
    setTimeout(() => {
      set({ transitionPhase: 'idle' });
    }, 5600);
  },
}));
