import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import WorldPlaceholder from '../../../world/World';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function WorldSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="world" ref={containerRef} className="relative py-32 px-8 lg:px-12 xl:px-16 bg-brand-light text-brand-dark overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content (Left Side) */}
        <div ref={textRef} className="flex flex-col items-start lg:pr-12 rtl:lg:pr-0 rtl:lg:pl-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">{t.world.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.world.badge}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {t.world.titleLine1}<br />
            {t.world.titleLine2}
          </h2>
          
          <p className="text-brand-gray text-lg mb-10 max-w-md leading-relaxed">
            {t.world.description}
          </p>
          
          <button className="px-6 py-3 bg-brand-yellow text-brand-dark rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-dark hover:text-brand-yellow transition-colors flex items-center gap-2">
            {t.world.enterWorld}
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* World Interactive Area (Right Side) */}
        <div className="relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl">
           <WorldPlaceholder />
        </div>

      </div>
    </section>
  );
}
