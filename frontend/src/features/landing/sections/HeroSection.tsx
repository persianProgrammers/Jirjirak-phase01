import { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ArchitecturalClouds } from '../components/ArchitecturalClouds';
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from 'react-zoom-pan-pinch';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  ChevronDown,
  MousePointer,
} from 'lucide-react';

// Zoom Controls Bar for the Interactive Building Canvas
function ZoomControlPanel({ isNight, isFa }: { isNight: boolean; isFa: boolean }) {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div
      className={`flex items-center gap-1.5 p-1.5 rounded-full backdrop-blur-xl border shadow-xl transition-all ${
        isNight
          ? 'bg-[#1c1c1c]/85 border-white/15 text-white shadow-black/60'
          : 'bg-white/90 border-slate-200 text-slate-800 shadow-slate-900/10'
      }`}
    >
      <button
        onClick={() => zoomIn()}
        title={isFa ? 'بزرگ‌نمایی' : 'Zoom In'}
        className="p-2 rounded-full hover:bg-brand-yellow hover:text-brand-dark transition-all cursor-pointer"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      <button
        onClick={() => zoomOut()}
        title={isFa ? 'کوچک‌نمایی' : 'Zoom Out'}
        className="p-2 rounded-full hover:bg-brand-yellow hover:text-brand-dark transition-all cursor-pointer"
      >
        <ZoomOut className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-white/20 mx-0.5" />

      <button
        onClick={() => resetTransform()}
        title={isFa ? 'تنظیم مجدد' : 'Reset View'}
        className="p-2 rounded-full hover:bg-brand-yellow hover:text-brand-dark transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
}

// 7 Core Services of Jirjirak Atelier for the Dynamic Rotating Text
const JIRJIRAK_SERVICES = [
  { en: 'Web & Development', fa: 'وب و توسعه نرم‌افزار' },
  { en: 'Branding & Visual Identity', fa: 'برندینگ و هویت بصری' },
  { en: 'Creative Studio & Motion', fa: 'استودیوی خلاق و موشن‌گرافیک' },
  { en: 'Game Studio & Interactive 3D', fa: 'بازی‌سازی و تجارب تعاملی سه‌بعدی' },
  { en: 'Digital Marketing & Growth', fa: 'دیجیتال مارکتینگ و رشد برند' },
  { en: 'SEO & Data Analytics', fa: 'سئو تخصصی و تحلیل داده' },
  { en: 'Academy & Learning Hub', fa: 'آکادمی و آموزش مهارت‌های نوین' },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelStageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  // Night Mode: Fireflies (Smooth ambient particle flow - PRESERVED UNCHANGED)
  const firefliesCount = 18;
  const fireflies = useMemo(() => Array.from({ length: firefliesCount }), []);
  const firefliesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isDayImageLoaded, setIsDayImageLoaded] = useState(false);
  const [isNightImageLoaded, setIsNightImageLoaded] = useState(false);

  // Dynamic Service Text Cycling Animation State
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const serviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!serviceRef.current) return;

      // 3D Kinetic Roll-Up with Optical Blur
      gsap.to(serviceRef.current, {
        y: -22,
        rotateX: 75,
        opacity: 0,
        filter: 'blur(5px)',
        duration: 0.42,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentServiceIndex((prev) => (prev + 1) % JIRJIRAK_SERVICES.length);
          gsap.fromTo(
            serviceRef.current,
            { y: 22, rotateX: -75, opacity: 0, filter: 'blur(5px)' },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.68,
              ease: 'power3.out',
            }
          );
        },
      });
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dayImg = new Image();
    dayImg.src = '/assets/images/ui/hero-building-day.png';
    if (dayImg.complete && dayImg.naturalWidth > 0) {
      setIsDayImageLoaded(true);
    } else {
      dayImg.onload = () => setIsDayImageLoaded(true);
      dayImg.onerror = () => setIsDayImageLoaded(true);
    }

    const nightImg = new Image();
    nightImg.src = '/assets/images/ui/hero-building-night.png';
    if (nightImg.complete && nightImg.naturalWidth > 0) {
      setIsNightImageLoaded(true);
    } else {
      nightImg.onload = () => setIsNightImageLoaded(true);
      nightImg.onerror = () => setIsNightImageLoaded(true);
    }
  }, []);

  // Text entrance animation
  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Mode-dependent ambient particle animation (PRESERVED UNCHANGED)
  useEffect(() => {
    let isVisible = true;
    const activeTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      if (isNight) {
        firefliesRef.current.forEach((fly) => {
          if (!fly) return;
          gsap.set(fly, {
            x: () => gsap.utils.random(0, window.innerWidth),
            y: () => gsap.utils.random(0, window.innerHeight),
            scale: () => gsap.utils.random(0.3, 1.2),
            opacity: () => gsap.utils.random(0.15, 0.6),
          });

          const animateFly = () => {
            if (!isVisible) return;
            const tw = gsap.to(fly, {
              x: `+=${gsap.utils.random(-100, 100)}`,
              y: `+=${gsap.utils.random(-100, 100)}`,
              opacity: () => gsap.utils.random(0.15, 0.85),
              duration: () => gsap.utils.random(6, 12),
              ease: 'sine.inOut',
              onComplete: animateFly,
            });
            activeTweens.push(tw);
          };
          animateFly();
        });
      }
    }, containerRef);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          activeTweens.forEach((t) => t.pause());
        } else {
          activeTweens.forEach((t) => t.resume());
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [isNight]);

  // Smooth scroll helper to reveal the building stage
  const scrollToBuilding = () => {
    if (modelStageRef.current) {
      modelStageRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('interactive-model-stage');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeService = JIRJIRAK_SERVICES[currentServiceIndex];

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`w-full relative transition-colors duration-700 ease-in-out select-none ${
        isNight ? 'bg-brand-dark' : 'bg-brand-light'
      }`}
    >
      {/* =========================================================================
          AMBIENT PARTICLES & CLOUDS (PRESERVED UNCHANGED)
          ========================================================================= */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {fireflies.map((_, i) => (
            <div
              key={`firefly-${i}`}
              ref={(el) => {
                firefliesRef.current[i] = el;
              }}
              className="absolute top-0 left-0 w-1.5 h-1.5 bg-brand-yellow rounded-full shadow-[0_0_8px_rgba(255,240,131,0.7)] will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            />
          ))}
        </div>
      )}

      {!isNight && <ArchitecturalClouds />}

      {/* =========================================================================
          100vh FIRST VIEWPORT: CENTERED JIRJIRAK STUDIO BRAND, NEW SLOGAN & DYNAMIC SERVICES
          ========================================================================= */}
      <div className="w-full relative z-10">
        <div className="min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-24 sm:pt-28 pb-12 sm:pb-16 max-w-[1280px] mx-auto text-center">
          
          {/* 🌟 1. SOPHISTICATED BRAND WORDMARK (CELESTIAL AURORA AURA - SELECTED FAVORITE) */}
          <div className="pt-2 sm:pt-4 flex items-center justify-center">
            <div className="relative inline-flex items-center justify-center select-none cursor-default py-1 group">
              {/* Pulsing celestial aura breathing gently behind crisp letters */}
              <div
                className={`absolute -inset-4 rounded-full blur-2xl pointer-events-none transition-all animate-aurora-pulse ${
                  isNight ? 'bg-brand-yellow/30' : 'bg-[#caad35]/25'
                }`}
              />
              <span
                className={`relative z-10 text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-500 ${
                  isNight ? 'text-white' : 'text-brand-dark'
                }`}
              >
                Jirjirak Studio
              </span>
            </div>
          </div>

          {/* 🚀 2. CENTER CONTENT: SLOGAN "Ideas Deserve to Be Seen" + 3D KINETIC ROTATING SERVICE TEXT */}
          <div ref={textRef} className="my-auto py-4 max-w-4xl mx-auto flex flex-col items-center">
            
            {/* The Scaled-down Hero Slogan */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.12] tracking-tight mb-5 transition-colors duration-700 ${
                isNight ? 'text-brand-light' : 'text-brand-dark'
              }`}
              style={{ textWrap: 'balance' }}
            >
              Ideas Deserve <br />
              <span className={isNight ? 'text-brand-yellow' : 'text-[#b3a85c]'}>
                to Be Seen
              </span>
            </h1>

            {/* 🔄 DYNAMIC ROTATING TEXT (3D KINETIC BARREL ROLL - NO "SPECIALIZED IN", NO BOX) */}
            <div className="h-10 flex items-center justify-center overflow-hidden [perspective:800px]">
              <div
                ref={serviceRef}
                className={`text-lg sm:text-xl lg:text-2xl font-light tracking-wide select-none transition-colors duration-500 ${
                  isNight ? 'text-brand-gray' : 'text-brand-dark/70'
                }`}
                style={{ willChange: 'transform, opacity, filter', transformOrigin: '50% 50% -12px' }}
              >
                {isFa ? activeService.fa : activeService.en}
              </div>
            </div>
          </div>

          {/* 🎯 3. ACTION BUTTONS (POSITIONED IN LOWER 100vh SECTION TO ELIMINATE AWKWARD BOTTOM GAP) */}
          <div className="pt-4 pb-2 sm:pb-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate('/world')}
              className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-brand-yellow text-brand-dark font-bold text-xs sm:text-sm tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-brand-yellow/20"
            >
              Explore Jirjirak
            </button>

            <button
              onClick={() => navigate('/contact')}
              className={`px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer ${
                isNight
                  ? 'border-white/25 text-white hover:border-brand-yellow hover:text-brand-yellow hover:bg-white/[0.05]'
                  : 'border-slate-400 text-slate-900 hover:border-brand-yellow-dark hover:bg-slate-100'
              }`}
            >
              Start a Project
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEWPORT 2: FULL-WIDTH BUILDING STAGE WITH INTERACTIVE ZOOM & NAVIGATION
            ========================================================================= */}
        <div
          id="interactive-model-stage"
          ref={modelStageRef}
          className={`min-h-[92vh] w-full py-16 px-4 sm:px-8 lg:px-14 flex flex-col justify-between relative transition-colors duration-700 ${
            isNight ? 'bg-[#151515]/90 border-t border-white/10' : 'bg-slate-50/90 border-t border-slate-200'
          }`}
        >
          {/* Interactive Stage Top Header & Control Bar */}
          <div className="w-full max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-20">
            <div>
              <span className="text-xs font-mono tracking-widest text-brand-yellow uppercase block mb-1">
                JIRJIRAK ISOMETRIC ATELIER
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-700 ${
                  isNight ? 'text-white' : 'text-slate-900'
                }`}
              >
                {isFa ? 'ساختمان و آتلیه طراحی جیرجیرک' : 'Interactive Spatial Headquarters'}
              </h2>
            </div>

            {/* Navigation Hints */}
            <div className="flex items-center gap-4 text-xs font-mono opacity-70">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{isFa ? 'درگ برای جابجایی' : 'Drag to pan'}</span>
              </span>
              <span className="hidden sm:inline-block">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MousePointer className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{isFa ? 'دابل‌کلیک یا دکمه‌ها برای زوم' : 'Double-click or buttons to zoom'}</span>
              </span>
            </div>
          </div>

          {/* Full-Width Interactive Zoom & Pan Canvas */}
          <div className="w-full max-w-[1700px] mx-auto my-6 flex-grow flex items-center justify-center relative min-h-[580px] rounded-3xl overflow-hidden">
            <TransformWrapper
              initialScale={1}
              minScale={0.8}
              maxScale={3.5}
              centerOnInit={true}
              wheel={{ disabled: true }}
              doubleClick={{ disabled: false, step: 0.5 }}
              panning={{ velocityDisabled: true }}
            >
              {/* Floating Zoom & Reset Control Bar inside Canvas */}
              <div
                className={`absolute top-6 ${
                  isFa ? 'left-6' : 'right-6'
                } z-30`}
              >
                <ZoomControlPanel isNight={isNight} isFa={isFa} />
              </div>

              <TransformComponent
                wrapperClass="w-full h-full cursor-grab active:cursor-grabbing"
                contentClass="w-full h-full flex items-center justify-center"
              >
                <div className="w-full max-w-6xl mx-auto flex items-center justify-center py-6 select-none">
                  <div className="relative w-full flex items-center justify-center max-h-[80vh]">
                    {/* Soft Ambient Depth Bloom (Night Mode) */}
                    <div
                      className={`absolute -inset-10 pointer-events-none rounded-full blur-[100px] transition-all duration-1000 ${
                        isNight ? 'bg-indigo-950/20 opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Day Building Image */}
                    <img
                      src="/assets/images/ui/hero-building-day.png"
                      alt="Jirjirak Studio Isometric Architecture (Day)"
                      className={`w-full h-full object-contain origin-center relative z-10 transition-all duration-700 ease-in-out ${
                        !isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      } ${isDayImageLoaded ? 'blur-0 scale-100' : 'blur-lg scale-[1.01]'}`}
                      draggable={false}
                    />

                    {/* Night Building Image */}
                    <img
                      src="/assets/images/ui/hero-building-night.png"
                      alt="Jirjirak Studio Isometric Architecture (Night)"
                      className={`w-full h-full object-contain origin-center absolute inset-0 m-auto z-10 transition-all duration-700 ease-in-out ${
                        isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      } ${isNightImageLoaded ? 'blur-0 scale-100' : 'blur-lg scale-[1.01]'}`}
                      draggable={false}
                    />
                  </div>
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>

          {/* Stage Bottom Footer */}
          <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono opacity-50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span>{isNight ? 'NIGHT ATMOSPHERE' : 'DAYLIGHT ATMOSPHERE'}</span>
            </div>
            <span>{isFa ? 'اسکرول به بخش جهان جیرجیرک ↓' : 'Scroll down for Jirjirak World ↓'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
