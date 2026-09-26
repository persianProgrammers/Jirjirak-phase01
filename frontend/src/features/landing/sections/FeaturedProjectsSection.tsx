import { useState, useRef, useEffect, useCallback } from 'react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { SpatialWallSlab, type ProjectItem, type SlabSlot } from '../components/SpatialWallSlab';

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'toyooran',
    titleEn: 'TOYOORAN',
    titleFa: 'طیوران',
    categoryEn: 'Web / Brand / Experience',
    categoryFa: 'وب‌سایت / هویت برند / تجربه کاربری',
    descEn: 'Architectural, immersive digital flagship capturing sensory depth and physical space.',
    descFa: 'طراحی پیشرو و معماری دیجیتال برای تجربه‌ای فراتر از یک وب‌سایت متعارف.',
    image: '/assets/images/projects/project_toyooran.png',
    accentColor: '#fff083',
    link: '#project',
  },
  {
    id: 'kafi',
    titleEn: 'KAFI',
    titleFa: 'کافی',
    categoryEn: 'Brand Experience',
    categoryFa: 'طراحی هویت و تجربه فضایی',
    descEn: 'Sensory boutique coffee atelier with warm ambient amber lighting and dark walnut textures.',
    descFa: 'آتلیه تخصصی قهوه با فضاسازی گرم، نورپردازی کهربایی و بافت‌های مینیمال چوب.',
    image: '/assets/images/projects/project_kafi_1790411104227.jpg',
    accentColor: '#e5a952',
    link: '#project',
  },
  {
    id: 'jirjirak-world',
    titleEn: 'JIRJIRAK WORLD',
    titleFa: 'جهان جیرجیرک',
    categoryEn: 'Gaming',
    categoryFa: 'بازی‌سازی و شبیه‌سازی سه‌بعدی',
    descEn: 'Real-time interactive virtual playground powered by WebGL and procedural kinetics.',
    descFa: 'محیط تعاملی سه‌بعدی و فضاسازی بلادرنگ با موتورهای پیشرفته وب.',
    image: '/assets/images/projects/project_gaming_1790411118596.jpg',
    accentColor: '#5ce1e6',
    link: '#project',
  },
  {
    id: 'noura',
    titleEn: 'NOURA OS',
    titleFa: 'سامانه نورا',
    categoryEn: 'Fintech Platform',
    categoryFa: 'پلتفرم مالی هوشمند',
    descEn: 'Next-generation liquidity console with volumetric data spatialization.',
    descFa: 'سامانه یکپارچه مدیریت مالی و تجسم فضایی داده‌های پیچیده کسب‌وکار.',
    image: '/assets/images/projects/project_fintech_1790411153505.jpg',
    accentColor: '#b3a85c',
    link: '#project',
  },
];

export function FeaturedProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevActiveIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
    setTimeout(() => setIsTransitioning(false), 450);
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevActiveIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
    setTimeout(() => setIsTransitioning(false), 450);
  }, [currentIndex, isTransitioning]);

  const handleSelect = useCallback((targetIndex: number) => {
    if (isTransitioning || targetIndex === currentIndex) return;
    setIsTransitioning(true);
    setPrevActiveIndex(currentIndex);
    setCurrentIndex(targetIndex);
    setTimeout(() => setIsTransitioning(false), 450);
  }, [currentIndex, isTransitioning]);

  // Keyboard navigation when user is on the section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (isFa) handleNext();
        else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (isFa) handlePrev();
        else handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFa]);

  return (
    <section 
      id="work" 
      ref={containerRef} 
      data-cursor="project" 
      className={`py-28 lg:py-36 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col xl:flex-row gap-12 lg:gap-16 items-center">
        
        {/* ===================== LEFT COLUMN (TEXT CONTENT) ===================== */}
        <div className="xl:w-[32%] flex flex-col items-start z-20 relative w-full">
          {/* Section Step Badge */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}>
              {t.featuredProjects.step}
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-gray">
              {t.featuredProjects.category || 'JIRJIRAK ARCHIVE'}
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.1] mb-6 tracking-tight">
            {t.featuredProjects.titleLine1}<br />
            {t.featuredProjects.titleLine2}
          </h2>
          
          {/* Description */}
          <p className={`text-base leading-relaxed mb-8 lg:mb-10 max-w-sm ${
            isNight ? 'text-brand-gray' : 'text-neutral-400'
          }`}>
            {t.featuredProjects.description}
          </p>
          
          {/* View All Projects Action */}
          <a 
            href="#work" 
            className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 ${
              isNight 
                ? 'text-[#b3a85c] border-[#b3a85c] hover:text-brand-dark hover:border-brand-dark' 
                : 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
            }`}
          >
            {t.featuredProjects.viewAll}
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* ===================== RIGHT COLUMN (3D SPATIAL SLAB CAROUSEL) ===================== */}
        <div className="xl:w-[68%] relative w-full h-[410px] sm:h-[480px] md:h-[530px] lg:h-[580px] flex items-center justify-center">
          
          {/* Navigation Arrow LEFT (Placed between left text and the left slab, as in reference) */}
          <button
            onClick={handlePrev}
            aria-label={t.featuredProjects.prev}
            className={`absolute left-0 sm:left-1 lg:-left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
              isNight 
                ? 'bg-white/95 border-gray-300 text-brand-dark hover:bg-brand-yellow hover:border-brand-yellow hover:scale-110 active:scale-95' 
                : 'bg-brand-surface/95 border-white/10 text-white hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow hover:scale-110 active:scale-95'
            }`}
          >
            <svg 
              className="w-5 h-5 rtl:rotate-180" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* 3D Perspective Stage:
              CRITICAL: We keep perspective: 1500px, but do NOT put transformStyle: preserve-3d here.
              This allows child slabs to maintain their 3D perspective projection and internal 3D thickness,
              while browser z-index strictly prevents slabs from intersecting/slicing through each other! */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{
              perspective: '1500px',
              perspectiveOrigin: '50% 30%',
            }}
          >
            {/* Ambient Ground Glow under Center Active Card */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[540px] h-[220px] sm:h-[280px] rounded-full filter blur-[90px] opacity-25 pointer-events-none transition-colors duration-700 ${
                isNight ? 'bg-[#b3a85c]' : 'bg-brand-yellow'
              }`} 
            />

            {/* Render all 4 walls with their active 3D animated slot on the cylinder ring */}
            {FEATURED_PROJECTS.map((project, index) => {
              const N = FEATURED_PROJECTS.length;
              // slotIndex represents the relative position on the 4-item ring:
              // 0: center (front)
              // 1: right (tilted right in depth)
              // 2: back (reserve in background)
              // 3: left (tilted left in depth)
              const slotIndex = (index - currentIndex + N) % N;
              let slot: SlabSlot = 'back';
              if (slotIndex === 0) slot = 'center';
              else if (slotIndex === 1) slot = 'right';
              else if (slotIndex === 3) slot = 'left';
              else slot = 'back';

              // Strict z-index ordering:
              // - Incoming active card: zIndex 40 (ALWAYS on top during transition)
              // - Outgoing active card: zIndex 25 (smoothly transitions under active)
              // - Side resting cards: zIndex 15
              // - Background reserve: zIndex 5
              let calculatedZIndex = 15;
              if (slot === 'center') {
                calculatedZIndex = 40;
              } else if (index === prevActiveIndex) {
                calculatedZIndex = 25;
              } else if (slot === 'back') {
                calculatedZIndex = 5;
              }

              return (
                <SpatialWallSlab
                  key={project.id}
                  project={project}
                  slot={slot}
                  zIndex={calculatedZIndex}
                  isNight={isNight}
                  isFa={isFa}
                  viewProjectText={t.featuredProjects.viewProject}
                  onSelect={() => {
                    if (slot === 'left') handlePrev();
                    else if (slot === 'right') handleNext();
                    else handleSelect(index);
                  }}
                />
              );
            })}
          </div>

          {/* Navigation Arrow RIGHT (Placed at the outer right edge, as in reference) */}
          <button
            onClick={handleNext}
            aria-label={t.featuredProjects.next}
            className={`absolute right-0 sm:right-1 lg:-right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
              isNight 
                ? 'bg-white/95 border-gray-300 text-brand-dark hover:bg-brand-yellow hover:border-brand-yellow hover:scale-110 active:scale-95' 
                : 'bg-brand-surface/95 border-white/10 text-white hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow hover:scale-110 active:scale-95'
            }`}
          >
            <svg 
              className="w-5 h-5 rtl:rotate-180" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Pagination Indicators for Mobile / Subtle Overview */}
          <div className="absolute -bottom-4 sm:bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            {FEATURED_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => handleSelect(idx)}
                aria-label={proj.titleEn}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx 
                    ? `w-6 h-1.5 ${isNight ? 'bg-[#b3a85c]' : 'bg-brand-yellow'}` 
                    : 'w-1.5 h-1.5 bg-gray-400/40 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
