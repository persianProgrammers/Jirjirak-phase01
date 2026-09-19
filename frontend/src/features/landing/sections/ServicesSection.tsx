import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

const serviceIcons = [
  (
    <div className="w-8 h-8 rounded-full border border-brand-yellow flex items-center justify-center text-brand-yellow">
      <div className="w-3 h-3 bg-brand-yellow rounded-[2px] transform rotate-45"></div>
    </div>
  ),
  (
    <div className="w-8 h-8 rounded-full border border-brand-yellow flex items-center justify-center text-brand-yellow">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    </div>
  ),
  (
    <div className="w-8 h-8 rounded-full border border-brand-yellow flex items-center justify-center text-brand-yellow">
      <div className="w-3 h-3 border-2 border-brand-yellow rounded-full"></div>
    </div>
  ),
  (
    <div className="w-8 h-8 rounded-full border border-brand-yellow flex items-center justify-center text-brand-yellow">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </div>
  )
];

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current!.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
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
    <section id="services" ref={containerRef} className="py-32 px-8 lg:px-12 xl:px-16 bg-brand-dark text-brand-light relative">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-16">
        
        {/* Left Column */}
        <div className="lg:w-1/3 flex flex-col items-start">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-brand-yellow text-xs font-semibold tracking-widest">{t.services.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-gray">{t.services.badge}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {t.services.titleLine1}<br />{t.services.titleLine2}
          </h2>
          
          <p className="text-brand-gray text-base leading-relaxed mb-12">
            {t.services.description}
          </p>
          
          <a href="#services" className="text-xs font-bold uppercase tracking-widest text-brand-yellow hover:text-brand-light transition-colors flex items-center gap-2">
            {t.services.exploreAll}
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Right Column / Cards */}
        <div ref={cardsRef} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.items.map((service, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-brand-surface border border-brand-surface-light hover:border-brand-yellow/50 transition-colors relative overflow-hidden flex flex-col justify-between min-h-[280px]">
              
              {/* Top Row: Icon + Illustration Placeholder */}
              <div className="flex justify-between items-start mb-12">
                {serviceIcons[index % serviceIcons.length]}
                <div className="w-24 h-24 bg-brand-surface-light rounded-lg border border-brand-gray/20 opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-500 flex items-center justify-center">
                  <span className="text-[10px] text-brand-gray uppercase">{service.title}</span>
                </div>
              </div>
              
              {/* Bottom Row */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-sm text-brand-gray">{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Arrow */}
              <div className="absolute bottom-8 right-8 rtl:right-auto rtl:left-8 text-brand-yellow opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <svg className="w-5 h-5 -rotate-45 rtl:rotate-[135deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
