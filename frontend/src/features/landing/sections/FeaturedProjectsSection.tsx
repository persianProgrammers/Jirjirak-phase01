import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function FeaturedProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="work" 
      ref={containerRef} 
      data-cursor="project" 
      className={`py-32 px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col xl:flex-row gap-16 items-center">
        
        {/* Text Content */}
        <div className="xl:w-1/3 flex flex-col items-start z-10 relative">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">{t.featuredProjects.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.featuredProjects.badge}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {t.featuredProjects.titleLine1}<br />{t.featuredProjects.titleLine2}
          </h2>
          
          <p className={`text-base leading-relaxed mb-12 max-w-sm ${
            isNight ? 'text-brand-gray' : 'text-neutral-400'
          }`}>
            {t.featuredProjects.description}
          </p>
          
          <a 
            href="#work" 
            className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 ${
              isNight 
                ? 'text-brand-dark border-brand-dark hover:text-brand-gray hover:border-brand-gray' 
                : 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
            }`}
          >
            {t.featuredProjects.viewAll}
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Spatial Carousel Placeholder */}
        <div ref={carouselRef} className="xl:w-2/3 relative w-full h-[500px] flex items-center justify-center perspective-[1200px]">
          
          {/* Left Geometric Yellow Frame */}
          <div className="hidden md:block absolute left-4 lg:left-0 top-1/2 -translate-y-1/2 w-4 h-[400px] bg-brand-yellow transform rotate-y-[-45deg] translate-z-[-100px] shadow-2xl z-0"></div>

          {/* Left Project (Architectural Angle) */}
          <div className="absolute left-0 md:left-4 w-[160px] md:w-[260px] h-[350px] md:h-[480px] bg-brand-dark rounded-l-xl border border-r-0 border-gray-800 transform rotate-y-[-45deg] -translate-x-4 translate-z-[-300px] opacity-40 shadow-2xl overflow-hidden flex items-end p-6 z-0">
            <div className="text-brand-light transform rotate-y-[45deg] origin-left">
              <h3 className="font-bold text-xs opacity-50">{t.featuredProjects.prev}</h3>
              <p className="text-[10px] text-brand-gray truncate w-24 md:w-32">{t.featuredProjects.prevProject}</p>
            </div>
          </div>
          
          {/* Center Project (Active) */}
          <div className="absolute z-20 w-[280px] md:w-[480px] h-[480px] md:h-[600px] bg-brand-dark rounded-xl shadow-2xl overflow-hidden flex flex-col group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
            <div className="flex-1 bg-brand-surface relative overflow-hidden">
               {/* Image Placeholder */}
               <div className="absolute inset-0 bg-brand-surface-light flex items-center justify-center">
                 <div className="w-32 h-32 border border-brand-gray/30 rounded-lg rotate-12 bg-brand-dark opacity-50"></div>
                 <span className="absolute text-[10px] text-brand-gray uppercase tracking-widest">{t.featuredProjects.projectVisual}</span>
               </div>
            </div>
            {/* Center Project Footer */}
            <div className="h-28 md:h-32 bg-brand-dark p-6 md:p-8 flex flex-col justify-end text-brand-light relative">
              {/* Yellow Accent Corner */}
              <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-10 h-10">
                  <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-full h-full bg-brand-yellow rounded-bl-xl rtl:rounded-bl-none rtl:rounded-br-xl"></div>
              </div>
              <h3 className="font-bold text-xl md:text-2xl">{t.featuredProjects.activeTitle}</h3>
              <p className="text-xs md:text-sm text-brand-gray mb-2">{t.featuredProjects.activeTags}</p>
              <div className="flex items-center gap-2 text-brand-yellow text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                <span>{t.featuredProjects.viewProject}</span>
                <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right Project (Architectural Angle) */}
          <div className="absolute right-0 md:right-4 w-[160px] md:w-[260px] h-[350px] md:h-[480px] bg-brand-dark rounded-r-xl border border-l-0 border-gray-800 transform rotate-y-[45deg] translate-x-4 translate-z-[-300px] opacity-40 shadow-2xl overflow-hidden flex items-end p-6 text-right rtl:text-left justify-end rtl:justify-start z-0">
             <div className="text-brand-light transform rotate-y-[-45deg] origin-right flex flex-col items-end rtl:items-start">
              <h3 className="font-bold text-xs opacity-50">{t.featuredProjects.next}</h3>
              <p className="text-[10px] text-brand-gray truncate w-24 md:w-32">{t.featuredProjects.nextProject}</p>
            </div>
          </div>

          {/* Right Geometric Yellow Frame */}
          <div className="hidden md:block absolute right-4 lg:right-0 top-1/2 -translate-y-1/2 w-4 h-[400px] bg-brand-yellow transform rotate-y-[45deg] translate-z-[-100px] shadow-2xl z-0"></div>

          {/* Navigation Arrows (Positioned outside the central composition) */}
          <div className="absolute -bottom-6 w-full flex justify-center gap-4 z-30">
            <button aria-label={t.featuredProjects.prev} className="w-12 h-12 rounded-full border border-gray-200 bg-white/95 shadow-sm flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
              <svg className="w-5 h-5 text-brand-dark rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button aria-label={t.featuredProjects.next} className="w-12 h-12 rounded-full border border-gray-200 bg-white/95 shadow-sm flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
              <svg className="w-5 h-5 text-brand-dark rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
