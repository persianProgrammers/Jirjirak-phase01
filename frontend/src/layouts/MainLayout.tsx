import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VintageJazzCapsule } from '../components/ui/VintageJazzCapsule';
import { AudioToggle } from '../components/ui/AudioToggle';
import { LanguageToggle } from '../components/ui/LanguageToggle';
import { DayNightToggle } from '../components/ui/DayNightToggle';
import { ScreenTransitionCurtain } from '../components/ui/ScreenTransitionCurtain';
import { useGlobalStore } from '../stores/globalStore';

export default function MainLayout() {
  const { isNight, currentLang } = useGlobalStore();

  // Instant real-time theme synchronization across the entire document without page refresh
  useEffect(() => {
    const root = document.documentElement;
    if (isNight) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'night');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'day');
    }
  }, [isNight]);

  // Instant real-time language & direction synchronization
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', currentLang === 'FA' ? 'fa' : 'en');
    root.setAttribute('dir', currentLang === 'FA' ? 'rtl' : 'ltr');
  }, [currentLang]);

  return (
    <div className="min-h-screen flex flex-col relative bg-brand-dark text-brand-light overflow-x-hidden w-full max-w-full">
      {/* 🎭 Vintage Screen Transition Curtain (Full-Screen Overlay with exact Hamburger spring & official logo) */}
      <ScreenTransitionCurtain />

      {/* 🎷 Vintage Jazz Capsule Scroll Progress (Independent Bottom-Left Dock, vanishes when scrolling stops) */}
      <VintageJazzCapsule />

      {/* Floating Controls Container (Bottom Right - 3 Stable Core Buttons) */}
      <div className="fixed bottom-4 right-2 sm:bottom-6 sm:right-4 lg:bottom-10 lg:right-8 rtl:right-auto rtl:left-2 rtl:sm:left-4 rtl:lg:left-8 z-[60] flex flex-col gap-3 pointer-events-none items-end rtl:items-start">
        {/* 🌙☀️ Day / Night Astrolabe Celestial Toggle */}
        <DayNightToggle />

        {/* 🌐 Vintage Typewriter Language Switcher */}
        <LanguageToggle />

        {/* 🎺 Steampunk Animated Gramophone Audio Player */}
        <AudioToggle />
      </div>

      <Header />
      <main className="flex-grow w-full relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
