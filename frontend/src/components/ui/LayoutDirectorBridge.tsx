import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore, type LandingLayoutMode } from '../../stores/globalStore';

export function LayoutDirectorBridge() {
  const location = useLocation();
  const { currentLang, isNight, landingLayoutMode, setLandingLayoutMode } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // Only display on the home landing page
  if (location.pathname !== '/') {
    return null;
  }

  const modes: {
    id: LandingLayoutMode;
    titleEn: string;
    titleFa: string;
    taglineEn: string;
    taglineFa: string;
    badgeEn: string;
    badgeFa: string;
    descEn: string;
    descFa: string;
    diagram: 'classic' | 'zigzag' | 'editorial';
  }[] = [
    {
      id: 'classic',
      titleEn: 'Classic Linear',
      titleFa: 'کلاسیک یکنواخت',
      taglineEn: 'Uniform Left-to-Right',
      taglineFa: 'متن چپ، رسانه راست در تمام بخش‌ها',
      badgeEn: 'ORIGINAL',
      badgeFa: 'پیش‌فرض قبلی',
      descEn: 'The traditional layout where every section places the heading & copy on the left and visual components on the right.',
      descFa: 'چیدمان سنتی و یکنواخت که در آن متن در تمام سکشن‌ها در ستون چپ و المان بصری در ستون راست قرار دارد.',
      diagram: 'classic',
    },
    {
      id: 'zigzag',
      titleEn: 'Rhythmic Z-Pattern',
      titleFa: 'الگوی زیک‌زاک ریتمیک (Z-Pattern)',
      taglineEn: 'Alternating Visual Flow',
      taglineFa: 'تناوب چپ و راست و شکستن خستگی چشم',
      badgeEn: 'RECOMMENDED',
      badgeFa: 'پیشنهاد طراح',
      descEn: 'Alternates columns across consecutive sections (Left-Right, then Right-Left). Guides scanning naturally and breaks scroll fatigue.',
      descFa: 'ستون‌ها در هر بخش به تناوب چپ و راست می‌شوند. این کار چشم کاربر را هدایت کرده و یکنواختی اسکرول را کاملاً از بین می‌برد.',
      diagram: 'zigzag',
    },
    {
      id: 'editorial',
      titleEn: 'Studio Editorial & Cinema',
      titleFa: 'مدرن تحریریه‌ای (Editorial Bento)',
      taglineEn: 'Cinematic Center Breaks',
      taglineFa: 'بخش خدمات سنتر و تمام‌عرض با قاب‌های نامتقارن',
      badgeEn: 'AWWWARDS STYLE',
      badgeFa: 'سبک استودیو پیشرو',
      descEn: 'Breaks the 2-column rule entirely for key moments: Services becomes a wide centered diorama gallery, followed by asymmetric storytelling.',
      descFa: 'شکستن کامل ساختار دو ستونی در بخش‌های کلیدی؛ دپارتمان‌ها به صورت سنتر و عریض در مرکز صحنه قرار می‌گیرند.',
      diagram: 'editorial',
    },
  ];

  const handleSelectMode = (mode: LandingLayoutMode) => {
    setLandingLayoutMode(mode);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2400);
  };

  const activeModeObj = modes.find((m) => m.id === landingLayoutMode) || modes[1];

  return (
    <aside 
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto"
      aria-label={isFa ? 'پل مقایسه و انتخاب چیدمان لندینگ' : 'Landing Layout Director Bridge'}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // ================= MINIMIZED FLOATING BADGE =================
          <motion.button
            key="minimized-pill"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsExpanded(true)}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 ${
              isNight
                ? 'bg-[#151619]/90 border-white/15 text-white hover:border-[#fff083]/70 hover:shadow-[0_0_20px_rgba(255,240,131,0.25)]'
                : 'bg-white/95 border-neutral-300 text-neutral-900 hover:border-[#b3a85c] hover:shadow-lg'
            }`}
          >
            {/* Compass / Layout Icon */}
            <span className="w-5 h-5 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow text-xs font-bold">
              📐
            </span>
            <div className="flex flex-col text-start">
              <span className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider">
                {isFa ? 'چیدمان فعال' : 'Active Layout'}
              </span>
              <span className="text-xs font-bold leading-none">
                {isFa ? activeModeObj.titleFa.split(' ')[0] : activeModeObj.titleEn.split(' ')[0]}
              </span>
            </div>
            {/* Expand Arrow */}
            <svg 
              className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        ) : (
          // ================= EXPANDED COMPARISON BRIDGE =================
          <motion.div
            key="expanded-bridge"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className={`w-[92vw] max-w-[440px] sm:max-w-[480px] p-4 sm:p-5 rounded-3xl border shadow-2xl backdrop-blur-xl relative overflow-hidden ${
              isNight
                ? 'bg-[#121316]/95 border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-2xl'
            }`}
          >
            {/* Header with Title and Close Button */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-brand-yellow/15 flex items-center justify-center text-brand-yellow text-sm">
                  📐
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight">
                    {isFa ? 'پل مقایسه و انتخاب چیدمان صفحه' : 'Landing Layout Director'}
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-medium">
                    {isFa ? 'بین چیدمان‌ها جابجا شوید و بهترین ترکیب را انتخاب کنید' : 'Live preview & switch between rhythm layouts'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Layout Options List */}
            <div className="flex flex-col gap-2.5 my-3.5">
              {modes.map((mode) => {
                const isActive = landingLayoutMode === mode.id;

                return (
                  <button
                    key={mode.id}
                    onClick={() => handleSelectMode(mode.id)}
                    className={`w-full text-start p-3 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                      isActive
                        ? isNight
                          ? 'bg-[#1c1d24] border-[#fff083] shadow-[0_0_15px_rgba(255,240,131,0.15)] ring-1 ring-[#fff083]'
                          : 'bg-amber-50/70 border-[#b3a85c] shadow-md ring-1 ring-[#b3a85c]'
                        : isNight
                          ? 'bg-[#16171b]/60 border-white/5 hover:border-white/20 hover:bg-[#1a1b20]'
                          : 'bg-neutral-50/80 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    {/* Top Row: Title, Badge, and Radio */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isActive
                              ? 'border-brand-yellow bg-brand-yellow'
                              : 'border-neutral-500'
                          }`}
                        >
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-bold">
                          {isFa ? mode.titleFa : mode.titleEn}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isActive
                            ? 'bg-brand-yellow text-brand-dark font-extrabold'
                            : 'bg-white/10 text-neutral-400'
                        }`}
                      >
                        {isFa ? mode.badgeFa : mode.badgeEn}
                      </span>
                    </div>

                    {/* Miniature Wireframe Diagram showing the layout rhythm! */}
                    <div className="w-full flex items-center justify-between gap-1.5 py-1.5 px-2 rounded-lg bg-black/25 my-1.5">
                      {mode.diagram === 'classic' && (
                        <div className="w-full flex items-center justify-around gap-1 text-[9px] font-mono opacity-80">
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Txt | Img</span>
                          <span>→</span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Txt | Img</span>
                          <span>→</span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Txt | Img</span>
                        </div>
                      )}
                      {mode.diagram === 'zigzag' && (
                        <div className="w-full flex items-center justify-around gap-1 text-[9px] font-mono text-brand-yellow">
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-brand-yellow border border-yellow-500/40">Txt | Img</span>
                          <span>⤹</span>
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/30 text-white font-bold border border-yellow-500/60">Img | Txt</span>
                          <span>⤸</span>
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-brand-yellow border border-yellow-500/40">Txt | Img</span>
                        </div>
                      )}
                      {mode.diagram === 'editorial' && (
                        <div className="w-full flex items-center justify-around gap-1 text-[9px] font-mono text-emerald-400">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Txt | Img</span>
                          <span>→</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-white font-bold border border-emerald-500/60">★ Wide Center ★</span>
                          <span>→</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Img | Txt</span>
                        </div>
                      )}
                    </div>

                    {/* Brief description */}
                    <p className="text-[11px] leading-relaxed text-neutral-400">
                      {isFa ? mode.descFa : mode.descEn}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Footer with Instant Live Preview indicator & Collapse button */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {hasSaved 
                  ? (isFa ? 'چیدمان اعمال شد ✓' : 'Layout Applied ✓') 
                  : (isFa ? 'پیش‌نمایش زنده در صفحه فعال است' : 'Live preview active on scroll')}
              </span>

              <button
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-brand-yellow hover:bg-yellow-300 text-brand-dark transition-all duration-200 cursor-pointer shadow-sm"
              >
                {isFa ? 'بستن پنل و مشاهده صفحه' : 'Browse Page'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

export default LayoutDirectorBridge;
