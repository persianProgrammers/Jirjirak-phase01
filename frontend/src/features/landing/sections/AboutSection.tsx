import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
      );
      
      gsap.fromTo(
        cardsRef.current!.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3, scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 px-8 lg:px-12 xl:px-16 bg-brand-light text-brand-dark overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column (Text) */}
        <div ref={textRef} className="lg:col-span-4 flex flex-col items-start justify-center">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">{t.about.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.about.badge}</span>
          </div>
          
          <h2 className="text-5xl font-bold leading-tight mb-8">
            {t.about.titleLine1}<br />{t.about.titleLine2}
          </h2>
          
          <p className="text-brand-gray text-sm leading-relaxed mb-12">
            {t.about.description}
          </p>
          
          <a href="#about" className="text-xs font-bold uppercase tracking-widest text-brand-dark border-b-2 border-brand-dark pb-1 hover:text-brand-gray hover:border-brand-gray transition-colors flex items-center gap-2 mb-16">
            {t.about.meetTeam}
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          
          <p className="text-[10px] text-brand-gray uppercase tracking-widest font-semibold mt-auto">{t.about.tagline}</p>
        </div>

        {/* Right Column (Image + Cards) */}
        <div className="lg:col-span-8 relative min-h-[600px] rounded-xl overflow-hidden shadow-2xl bg-brand-dark">
          {/* Background Image Placeholder (Environment) */}
          <div className="absolute inset-0 bg-brand-surface-light opacity-50 flex items-center justify-center">
            <span className="text-brand-light/70 text-xs tracking-widest uppercase">{t.about.environmentShot}</span>
          </div>
          
          {/* Team Cards Container */}
          <div ref={cardsRef} className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-4 z-10">
            {t.about.teamMembers.map((member, i) => (
              <div 
                key={i} 
                className={`flex-1 min-w-[200px] p-6 rounded-lg border cursor-pointer transition-transform duration-300 hover:-translate-y-2 flex flex-col justify-between h-[200px] ${
                  member.highlight 
                    ? 'bg-brand-yellow text-brand-dark border-brand-yellow' 
                    : 'bg-brand-dark/95 text-brand-light border-brand-surface-light hover:border-brand-gray'
                }`}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className={`text-[10px] uppercase font-bold tracking-widest ${member.highlight ? 'text-brand-dark/70' : 'text-brand-gray'}`}>{member.role}</p>
                  <p className={`text-xs mt-1 ${member.highlight ? 'text-brand-dark/90' : 'text-brand-gray'}`}>{member.type}</p>
                </div>
                
                <div className={`self-end ${member.highlight ? 'text-brand-dark' : 'text-brand-gray'}`}>
                  <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
