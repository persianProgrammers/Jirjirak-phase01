import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { AudioToggle } from '../components/ui/AudioToggle';
import { LanguageToggle } from '../components/ui/LanguageToggle';
import { DayNightToggle } from '../components/ui/DayNightToggle';
import { useGlobalStore } from '../stores/globalStore';

/* 
 * 🎬 =========================================================================
 * REMINDER / یادآور برای توسعه‌دهنده و کاربر:
 * کامپوننت دکمه حالت سینما (CinemaToggle) در اینجا آرشیو و نگه‌داری شده است.
 * فایل کامل آن در مسیر `/frontend/src/components/ui/CinemaToggle.tsx` قرار دارد
 * و با حذف کامنت‌های زیر، هر زمان که کاربر درخواست کند در کسری از ثانیه فعال می‌شود:
 * =========================================================================
 */
// import { CinemaToggle } from '../components/ui/CinemaToggle';

export default function MainLayout() {
  const { isNight } = useGlobalStore();

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

  return (
    <div className="min-h-screen flex flex-col relative bg-brand-dark text-brand-light">
      <ScrollProgress />
      
      {/* Floating Controls Container (Bottom Right) */}
      <div className="fixed bottom-4 right-2 sm:bottom-6 sm:right-4 lg:bottom-10 lg:right-8 z-[60] flex flex-col gap-3 pointer-events-none items-end">
        {/* 🎬 CinemaToggle (حفظ شده به صورت کامنت برای استفاده‌های بعدی) */}
        {/* <CinemaToggle /> */}

        {/* 🌙☀️ Day / Night Astrolabe Celestial Toggle (جایگزین حالت سینما) */}
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
