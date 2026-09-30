import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VintageJazzCapsule } from '../components/ui/VintageJazzCapsule';
import { StudioToolboxDock } from '../components/ui/StudioToolboxDock';
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
    <div className="min-h-screen flex flex-col relative bg-brand-dark text-brand-light overflow-x-hidden w-full min-w-[1280px]">
      {/* 🎭 Vintage Screen Transition Curtain */}
      <ScreenTransitionCurtain />

      {/* 🎷 Vintage Jazz Capsule Scroll Progress */}
      <VintageJazzCapsule />

      {/* 🧰 Steampunk Vintage Toolbox Dock */}
      <StudioToolboxDock />

      <Header />
      <main className="flex-grow w-full relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
