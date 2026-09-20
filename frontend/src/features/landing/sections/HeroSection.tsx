import { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ArchitecturalClouds } from '../components/ArchitecturalClouds';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isMapLocked, setIsMapLocked] = useState(true);
  const { isNight, currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  // Night Mode: Fireflies (Optimized count for 120fps smooth scrolling)
  const firefliesCount = 18;
  const fireflies = useMemo(() => Array.from({ length: firefliesCount }), []);
  const firefliesRef = useRef<(HTMLDivElement | null)[]>([]);

  /* =========================================================================
     [RESERVED FOR FUTURE SEASONAL FEATURE]
     برگ‌های پاییزی، افرا و جینکو برای ویژگی تم فصول در آینده ذخیره شده‌اند:
     
     const leavesCount = 15;
     const leaves = useMemo(() => Array.from({ length: leavesCount }), []);
     const leavesRef = useRef<(HTMLDivElement | null)[]>([]);
     
     // Leaf variants:
     // - Ginkgo Biloba (url(#ginkgoGrad))
     // - Autumn Maple (url(#mapleGrad))
     // - Golden Elm (url(#birchGrad))
     ========================================================================= */

  const [isDayImageLoaded, setIsDayImageLoaded] = useState(false);
  const [isNightImageLoaded, setIsNightImageLoaded] = useState(false);

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

  // Initial text entrance
  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Mode-dependent ambient particle animation (paused when offscreen to save 100% GPU/CPU during scroll)
  useEffect(() => {
    let isVisible = true;
    const activeTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      if (isNight) {
        // Night: Fireflies wandering in the darkness
        firefliesRef.current.forEach((fly) => {
          if (!fly) return;
          gsap.set(fly, {
            x: () => gsap.utils.random(0, window.innerWidth),
            y: () => gsap.utils.random(0, window.innerHeight),
            scale: () => gsap.utils.random(0.3, 1.2),
            opacity: () => gsap.utils.random(0.15, 0.6)
          });

          const animateFly = () => {
            if (!isVisible) return;
            const tw = gsap.to(fly, {
              x: `+=${gsap.utils.random(-100, 100)}`,
              y: `+=${gsap.utils.random(-100, 100)}`,
              opacity: () => gsap.utils.random(0.15, 0.85),
              duration: () => gsap.utils.random(6, 12),
              ease: "sine.inOut",
              onComplete: animateFly
            });
            activeTweens.push(tw);
          };
          animateFly();
        });
      }
    }, containerRef);

    // Observer: Pause when hero is out of view (e.g. user scrolled down)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          activeTweens.forEach((t) => t.pause());
        } else {
          activeTweens.forEach((t) => t.resume());
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      activeTweens.forEach((t) => t.kill());
      ctx.revert();
    };
  }, [isNight]);

  return (
    <section 
      ref={containerRef} 
      className={`relative px-8 lg:px-12 xl:px-16 overflow-hidden lg:h-screen lg:pt-24 lg:pb-12 transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* Abstract Background Ambient Glow (Night Mode Only - 0ms blur raster cost) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        isNight ? 'opacity-15' : 'opacity-0'
      }`}>
        <div 
          className="absolute top-1/4 -right-1/4 w-[650px] h-[650px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,240,131,0.22) 0%, rgba(255,240,131,0.04) 45%, transparent 70%)'
          }}
        />
      </div>

      {/* Fireflies Background (Night Mode ONLY - completely unmounted in Day) */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {fireflies.map((_, i) => (
            <div
              key={`firefly-${i}`}
              ref={(el) => { firefliesRef.current[i] = el; }}
              className="absolute top-0 left-0 w-1.5 h-1.5 bg-brand-yellow rounded-full shadow-[0_0_8px_rgba(255,240,131,0.7)] will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            ></div>
          ))}
        </div>
      )}

      {/* Day Mode: Architectural Contour Clouds (کانتور معمارانه بهینه برای موبایل و دسکتاپ) */}
      {!isNight && <ArchitecturalClouds />}

      {/* =========================================================================
         [RESERVED FOR FUTURE SEASONAL FEATURE - LEAF SVGs]
         برگ‌های پاییزی جینکو، افرا و نارون برای سیستم فصول استودیو در اینجا کامنت شده‌اند:
         
         {leaves.map((_, i) => {
           const variant = i % 3;
           return (
             <div key={`leaf-${i}`} ref={(el) => { leavesRef.current[i] = el; }} className="absolute ...">
               // Variant 0: Fan-shaped Ginkgo Biloba Leaf (برگ بادبزنی جینکو طلایی)
               // Variant 1: Autumn Lobed Maple Leaf (برگ پاییزی افرا کهربایی-نارنجی)
               // Variant 2: Golden Elm Leaf (برگ دندانه‌دار نارون طلایی عسلی)
             </div>
           );
         })}
         ========================================================================= */}

      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-12 gap-0 items-center relative z-10 lg:h-full">
        {/* Text Section (Row 1 on Mobile, Col 1 on Desktop) */}
        <div ref={textRef} className="relative lg:col-span-5 flex flex-col items-start max-w-xl justify-center w-full min-h-[100dvh] lg:min-h-0 lg:h-full pt-20 pb-16 lg:pt-0 lg:pb-0">
          <p className={`text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3 lg:mb-2 transition-colors duration-700 ${
            isNight ? 'text-brand-gray' : 'text-brand-dark/60'
          }`}>
            {t.hero.badge}
          </p>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-8 lg:mb-8 transition-colors duration-700 ${
            isNight ? 'text-brand-light' : 'text-brand-dark'
          }`}>
            {t.hero.titleLine1}<br />
            {t.hero.titleLine2}<br />
            <span className={`transition-colors duration-700 ${
              isNight ? 'text-brand-yellow' : 'text-[#a38600]'
            }`}>
              {t.hero.titleLine3}
            </span>
          </h1>

          <p className={`text-sm sm:text-base lg:text-lg mb-12 lg:mb-12 max-w-md leading-relaxed transition-colors duration-700 ${
            isNight ? 'text-brand-gray' : 'text-brand-dark/75'
          }`}>
            {t.hero.subtitle}
          </p>
          
          <button onClick={() => navigate('/world')} className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark relative shadow-md">
              <span className="absolute inset-0 rounded-full border border-brand-yellow scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></span>
              <svg className="w-6 h-6 lg:w-7 lg:h-7 ml-1 lg:ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-700 ${
              isNight ? 'text-brand-light' : 'text-brand-dark'
            }`}>
              {t.hero.enterWorld}
            </span>
          </button>

          {/* Scroll Down Indicator (Jirjirak Theme) */}
          <button 
            onClick={() => {
              document.getElementById('mobile-map-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer lg:hidden group"
            aria-label={t.hero.hopDown}
          >
            {/* Minimalist cricket/bug antennae icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-colors duration-700 ${
              isNight ? 'text-brand-yellow' : 'text-brand-dark'
            }`}>
              <path d="M12 21V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 11C12 11 8 6 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-[antennal_2s_ease-in-out_infinite] origin-bottom"/>
              <path d="M12 11C12 11 16 6 18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-[antennae_2s_ease-in-out_infinite] origin-bottom"/>
              <circle cx="12" cy="11" r="2" fill="currentColor"/>
            </svg>
            <span className={`text-[8px] font-bold tracking-[0.2em] uppercase transition-colors duration-700 mt-1 ${
              isNight ? 'text-brand-gray group-hover:text-brand-yellow' : 'text-brand-dark/60 group-hover:text-brand-dark'
            }`}>
              {t.hero.hopDown}
            </span>
          </button>
          
          <style>{`
            @keyframes dandelionSway {
              0% { transform: rotate(-8deg) translateY(0px); }
              50% { transform: rotate(7deg) translateY(-4px); }
              100% { transform: rotate(-8deg) translateY(0px); }
            }
            .dandelion-sway {
              animation: dandelionSway 4.5s ease-in-out infinite;
            }
          `}</style>
        </div>

        {/* Image Section (Row 2 on Mobile, Col 2 on Desktop) */}
        <div id="mobile-map-section" className="lg:col-span-7 relative w-full flex flex-col items-center justify-center lg:justify-end lg:h-full lg:pb-0 h-[100dvh] lg:h-auto pb-8">
          
          {/* Desktop Image with Seamless Architectural Daylight / Night Blend */}
          <div className="hidden lg:flex relative w-full items-center justify-end h-full">
            <div className="relative w-auto h-auto lg:max-h-[85vh] lg:w-[105%] lg:max-w-none xl:w-[110%] flex items-center justify-end lg:-translate-y-4 xl:-translate-y-8">
              
              {/* Subtle Architectural Backlight Bloom (Night Mode Only) */}
              <div className={`absolute -inset-16 pointer-events-none rounded-full blur-[110px] transition-all duration-1000 ${
                isNight ? 'bg-indigo-950/20 opacity-100' : 'opacity-0'
              }`} />

              {/* Day Building Image Layer */}
              <img 
                src="/assets/images/ui/hero-building-day.png" 
                alt="Jirjirak Isometric Studio (Day)" 
                className={`w-auto h-auto lg:max-h-[85vh] object-contain origin-center relative z-10 select-none transition-all duration-700 ease-in-out ${
                  !isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${
                  isDayImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                }`} 
              />

              {/* Night Building Image Layer (Mathematically aligned) */}
              <img 
                src="/assets/images/ui/hero-building-night.png" 
                alt="Jirjirak Isometric Studio (Night)" 
                className={`w-auto h-auto lg:max-h-[85vh] object-contain origin-center absolute inset-0 m-auto right-0 z-10 select-none transition-all duration-700 ease-in-out ${
                  isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${
                  isNightImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                }`} 
              />
            </div>
          </div>

          {/* Mobile Image (Interactive Zoom/Pan Edge-to-Edge) */}
          <div className="lg:hidden relative w-[calc(100%+4rem)] -mx-8 sm:w-[calc(100%+6rem)] sm:-mx-12 flex flex-col items-center justify-center flex-1 h-full">
            
            {/* Animated Section Divider */}
            <div className="w-full relative py-6 flex items-center justify-center shrink-0">
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent"></div>
              <div className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-yellow/60 to-transparent animate-pulse blur-[1px]"></div>
              <div className="w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_15px_4px_rgba(255,240,131,0.6)] animate-ping"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            </div>

            {/* Edge-to-edge map container with Gamer HUD Frame */}
            <div className="w-full flex-1 min-h-[50vh] relative group overflow-hidden">
              
              {/* Sci-Fi HUD Borders & Decorations (Pointer-events-none) */}
              <div className="absolute inset-x-4 inset-y-4 sm:inset-x-8 sm:inset-y-6 z-20 pointer-events-none">
                {/* Dynamic Corner Brackets */}
                <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:-translate-x-1 group-hover:-translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:-translate-x-1 group-hover:translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:translate-x-1 group-hover:translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                
                {/* HUD Data Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-0.5 opacity-80">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm backdrop-blur-md border ${
                    isNight ? 'bg-brand-dark/60 border-brand-yellow/20' : 'bg-brand-light/75 border-brand-dark/15'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${
                      isNight ? 'text-brand-yellow' : 'text-brand-dark'
                    }`}>
                      {t.hero.mapFeed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sci-Fi Screen Effects Overlay (Subtle Depth & Dynamics) */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <style>{`
                  @keyframes slowRadarPulse {
                    0% { box-shadow: inset 0 0 40px rgba(0,0,0,0.8), inset 0 0 0px rgba(255, 240, 131, 0); }
                    50% { box-shadow: inset 0 0 60px rgba(0,0,0,0.9), inset 0 0 15px rgba(255, 240, 131, 0.05); }
                    100% { box-shadow: inset 0 0 40px rgba(0,0,0,0.8), inset 0 0 0px rgba(255, 240, 131, 0); }
                  }
                  @keyframes subtleDrift {
                    0% { transform: translateY(-5%) scale(1.05); opacity: 0.1; }
                    50% { transform: translateY(5%) scale(1); opacity: 0.2; }
                    100% { transform: translateY(-5%) scale(1.05); opacity: 0.1; }
                  }
                `}</style>
                
                {/* Dynamic Vignette (Active only at night to keep daylight clean) */}
                {isNight && (
                  <div className="absolute inset-0 z-10 pointer-events-none" style={{ animation: 'slowRadarPulse 8s ease-in-out infinite' }}></div>
                )}
                
                {/* Subtle ambient dust floating over the map */}
                <div className={`absolute inset-0 z-10 mix-blend-screen transition-opacity duration-700 ${
                  isNight ? 'bg-[radial-gradient(ellipse_at_center,rgba(255,240,131,0.15)_0%,transparent_70%)]' : 'bg-[radial-gradient(ellipse_at_center,rgba(254,240,138,0.1)_0%,transparent_70%)]'
                }`} style={{ animation: 'subtleDrift 15s ease-in-out infinite' }}></div>
              </div>

              {/* Interactive Map Area */}
              <div className="w-full h-full bg-transparent relative">
                <TransformWrapper 
                  initialScale={1} 
                  minScale={1} 
                  maxScale={4} 
                  centerOnInit={true}
                  wheel={{ disabled: true }}
                  doubleClick={{ disabled: false }}
                  panning={{ disabled: isMapLocked }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <div className={`w-full h-full transition-all duration-300 ${isMapLocked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}>
                        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                          <div className="relative w-[90%] sm:w-[85%] mx-auto h-full flex items-center justify-center">
                            {/* Day Building Image Layer */}
                            <img 
                              src="/assets/images/ui/hero-building-day.png" 
                              alt="Jirjirak Isometric Studio (Day)" 
                              className={`w-full h-full object-contain pointer-events-none select-none transition-all duration-700 ease-in-out ${
                                isMapLocked ? 'brightness-90' : 'brightness-100'
                              } ${
                                !isNight ? 'relative z-10 opacity-100' : 'opacity-0 absolute inset-0'
                              } ${
                                isDayImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                              }`} 
                            />

                            {/* Night Building Image Layer */}
                            <img 
                              src="/assets/images/ui/hero-building-night.png" 
                              alt="Jirjirak Isometric Studio (Night)" 
                              className={`w-full h-full object-contain pointer-events-none select-none transition-all duration-700 ease-in-out ${
                                isMapLocked ? 'brightness-75' : 'brightness-100'
                              } ${
                                isNight ? 'relative z-10 opacity-100' : 'opacity-0 absolute inset-0'
                              } ${
                                isNightImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                              }`} 
                            />
                          </div>
                        </TransformComponent>
                      </div>

                      {/* Locked State Overlay */}
                      {isMapLocked && (
                        <div 
                           className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer"
                          onClick={() => setIsMapLocked(false)}
                        >
                          <div className={`border px-6 py-3 rounded-full flex items-center gap-3 animate-pulse shadow-lg ${
                            isNight ? 'bg-brand-dark/85 border-brand-yellow/30 text-white' : 'bg-brand-light/90 border-brand-dark/20 text-brand-dark'
                          }`}>
                            <svg className={`w-5 h-5 ${isNight ? 'text-brand-yellow' : 'text-brand-dark'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                            <span className="font-bold text-sm tracking-widest uppercase">{t.hero.tapToExplore}</span>
                          </div>
                        </div>
                      )}

                      {/* Sci-Fi Floating Map Controls */}
                      <div className={`absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 flex flex-col gap-3 z-30 pointer-events-auto transition-opacity duration-300 ${isMapLocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <button 
                          onClick={() => zoomIn()} 
                          className={`group relative w-10 h-10 backdrop-blur-md border flex items-center justify-center rounded-[4px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${
                            isNight 
                              ? 'bg-brand-dark/90 border-brand-yellow/30 text-white hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-dark' 
                              : 'bg-brand-light/90 border-brand-dark/25 text-brand-dark hover:bg-brand-dark hover:text-brand-light hover:border-brand-dark'
                          }`} 
                          aria-label={t.hero.zoomIn}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => zoomOut()} 
                          className={`group relative w-10 h-10 backdrop-blur-md border flex items-center justify-center rounded-[4px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${
                            isNight 
                              ? 'bg-brand-dark/90 border-brand-yellow/30 text-white hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-dark' 
                              : 'bg-brand-light/90 border-brand-dark/25 text-brand-dark hover:bg-brand-dark hover:text-brand-light hover:border-brand-dark'
                          }`} 
                          aria-label={t.hero.zoomOut}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <div className={`w-6 h-[1px] mx-auto my-1 ${isNight ? 'bg-brand-yellow/20' : 'bg-brand-dark/20'}`}></div>
                        
                        <button 
                          onClick={() => { resetTransform(); setIsMapLocked(true); }} 
                          className={`group relative w-10 h-10 backdrop-blur-md border flex items-center justify-center rounded-[4px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${
                            isNight 
                              ? 'bg-brand-dark/90 border-brand-yellow/30 text-brand-yellow hover:bg-red-500 hover:border-red-500 hover:text-white' 
                              : 'bg-brand-light/90 border-brand-dark/25 text-brand-dark hover:bg-red-500 hover:border-red-500 hover:text-white'
                          }`} 
                          aria-label={t.hero.lockMap}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </TransformWrapper>
              </div>
            </div>
            
            {/* Mobile Context Info (Moved below map, non-overlapping) */}
            <div className="w-full px-8 sm:px-12 mt-4 flex justify-center shrink-0">
              <div className={`border rounded-2xl p-4 w-full flex flex-col items-center text-center gap-1.5 transition-colors duration-700 ${
                isNight ? 'bg-brand-dark/60 border-white/5' : 'bg-brand-light/90 border-brand-dark/10 shadow-sm'
              }`}>
                <div className={`flex items-center justify-center gap-2 mb-0.5 transition-colors duration-700 ${
                  isNight ? 'text-brand-yellow' : 'text-brand-dark font-bold'
                }`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span className="font-bold text-[10px] tracking-wider uppercase">{t.hero.interactiveMap}</span>
                </div>
                <p className={`text-[10px] leading-relaxed transition-colors duration-700 ${
                  isNight ? 'text-brand-gray' : 'text-brand-dark/70'
                }`}>
                  {t.hero.mapTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
