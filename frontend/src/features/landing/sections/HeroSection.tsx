import { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ArchitecturalClouds } from '../components/ArchitecturalClouds';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isNight, currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  // Night Mode: Fireflies (Smooth ambient particle flow)
  const firefliesCount = 18;
  const fireflies = useMemo(() => Array.from({ length: firefliesCount }), []);
  const firefliesRef = useRef<(HTMLDivElement | null)[]>([]);

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

  // Mode-dependent ambient particle animation
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

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className={`min-h-screen w-full relative flex items-center justify-center px-16 pt-24 pb-16 overflow-hidden transition-colors duration-700 ease-in-out select-none ${
        isNight ? 'bg-brand-dark' : 'bg-brand-light'
      }`}
    >
      {/* Fireflies Background (Night Mode) */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {fireflies.map((_, i) => (
            <div
              key={`firefly-${i}`}
              ref={(el) => { firefliesRef.current[i] = el; }}
              className="absolute top-0 left-0 w-1.5 h-1.5 bg-brand-yellow rounded-full shadow-[0_0_8px_rgba(255,240,131,0.7)] will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            />
          ))}
        </div>
      )}

      {/* Day Mode: Architectural Contour Clouds */}
      {!isNight && <ArchitecturalClouds />}

      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-8 items-center relative z-10 h-full">
        {/* Text Section (Column 1: 5 spans) */}
        <div ref={textRef} className="col-span-5 flex flex-col items-start max-w-xl justify-center w-full">
          <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 transition-colors duration-700 ${
            isNight ? 'text-brand-gray' : 'text-brand-dark/60'
          }`}>
            {t.hero.badge}
          </p>
          
          <h1 className={`text-7xl font-bold leading-[1.1] tracking-tight mb-8 transition-colors duration-700 ${
            isNight ? 'text-brand-light' : 'text-brand-dark'
          }`}>
            {t.hero.titleLine1}<br />
            {t.hero.titleLine2}<br />
            <span className={isNight ? "text-brand-yellow" : "text-[#b3a85c]"}>
              {t.hero.titleLine3}
            </span>
          </h1>

          <p className={`text-lg mb-12 max-w-md leading-relaxed transition-colors duration-700 ${
            isNight ? 'text-brand-gray' : 'text-brand-dark/75'
          }`}>
            {t.hero.subtitle}
          </p>
          
          <button 
            onClick={() => navigate('/world')} 
            className="group flex items-center gap-4 hover:opacity-85 transition-opacity cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center relative shadow-md transition-colors ${
              isNight ? 'bg-brand-yellow text-brand-dark' : 'bg-[#b3a85c] text-brand-dark'
            }`}>
              <span className={`absolute inset-0 rounded-full border scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ${
                isNight ? 'border-brand-yellow' : 'border-[#b3a85c]'
              }`} />
              <svg className="w-7 h-7 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-700 ${
              isNight ? 'text-brand-light' : 'text-brand-dark'
            }`}>
              {t.hero.enterWorld}
            </span>
          </button>
        </div>

        {/* Image Section (Column 2: 7 spans) */}
        <div className="col-span-7 relative w-full flex items-center justify-end h-full">
          <div className="relative w-full max-h-[85vh] flex items-center justify-end">
            
            {/* Subtle Architectural Backlight Bloom (Night Mode Only) */}
            <div className={`absolute -inset-16 pointer-events-none rounded-full blur-[110px] transition-all duration-1000 ${
              isNight ? 'bg-indigo-950/20 opacity-100' : 'opacity-0'
            }`} />

            {/* Day Building Image Layer */}
            <img 
              src="/assets/images/ui/hero-building-day.png" 
              alt="Jirjirak Isometric Studio (Day)" 
              className={`w-full max-h-[85vh] object-contain origin-center relative z-10 select-none transition-all duration-700 ease-in-out ${
                !isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } ${
                isDayImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
              }`} 
            />

            {/* Night Building Image Layer */}
            <img 
              src="/assets/images/ui/hero-building-night.png" 
              alt="Jirjirak Isometric Studio (Night)" 
              className={`w-full max-h-[85vh] object-contain origin-center absolute inset-0 m-auto right-0 z-10 select-none transition-all duration-700 ease-in-out ${
                isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } ${
                isNightImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
              }`} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
