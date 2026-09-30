import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import WorldPlaceholder from '../../../world/World';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function WorldSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
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
    <section 
      id="world" 
      ref={containerRef} 
      className={`relative py-32 px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Content (Col 1: 5 spans) */}
        <div className="col-span-5 flex flex-col items-start max-w-xl w-full pr-8 rtl:pr-0 rtl:pl-8 self-stretch">
          {/* Pre-title / Step Badge */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}>
              {t.world.step}
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase">
              {t.world.badge}
            </span>
          </div>
          
          {/* Content: Title, Description & Button */}
          <div ref={textRef} className="my-auto flex flex-col items-start w-full py-4">
            <h2 className="text-6xl font-bold leading-tight mb-6">
              {t.world.titleLine1}<br />
              {t.world.titleLine2}
            </h2>
            
            <p className={`text-lg mb-10 max-w-md leading-relaxed ${isNight ? 'text-brand-gray' : 'text-neutral-400'}`}>
              {t.world.description}
            </p>
            
            <button className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
              isNight 
                ? 'bg-[#b3a85c] text-brand-dark hover:bg-brand-dark hover:text-white' 
                : 'bg-brand-yellow text-brand-dark hover:bg-white hover:text-brand-dark'
            }`}>
              {t.world.enterWorld}
              <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* World Interactive Area (Col 2: 7 spans) */}
        <div className="col-span-7 relative w-full flex items-center justify-end">
           <WorldPlaceholder />
        </div>

      </div>
    </section>
  );
}

export default WorldSection;
