import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { StudioTeamAtelier } from '../components/team-models/StudioTeamAtelier';

interface AboutSectionProps {
  variant?: 'landing' | 'full';
}

export function AboutSection({ variant = 'landing' }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  const accentTextClass = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const isLanding = variant === 'landing';

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className={`py-32 px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Main Grid: Left Column Text & Right Column Team Model */}
        <div className="grid grid-cols-12 gap-14 items-center">
          
          {/* Mission & Studio Ethos Text Column (Col 1: 4 spans) */}
          <div className="col-span-4 flex flex-col items-start sticky top-28 transition-all duration-500">
            {/* Step Badge */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-xs font-semibold tracking-widest ${accentTextClass}`}>
                {t.about.step}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase">
                {t.about.badge}
              </span>
            </div>
            
            {/* Content: Title & Description */}
            <div ref={textRef} className="flex flex-col items-start py-2 w-full">
              <h2 className="text-5xl font-bold leading-tight mb-6">
                {t.about.titleLine1}<br />{t.about.titleLine2}
              </h2>
              
              <p className={`text-base leading-relaxed mb-8 ${
                isNight ? 'text-brand-gray' : 'text-neutral-400'
              }`}>
                {t.about.description}
              </p>
              
              {isLanding ? (
                <Link 
                  to="/about" 
                  className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 ${
                    isNight 
                      ? 'text-[#b3a85c] border-[#b3a85c] hover:text-brand-dark hover:border-brand-dark' 
                      : 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
                  }`}
                >
                  {t.about.meetTeam}
                  <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ) : (
                <Link 
                  to="/contact" 
                  className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 ${
                    isNight 
                      ? 'text-[#b3a85c] border-[#b3a85c] hover:text-brand-dark hover:border-brand-dark' 
                      : 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
                  }`}
                >
                  {isFa ? 'شروع همکاری با تیم' : 'Collaborate With Us'}
                  <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Media Column (Col 2: 8 spans) */}
          <div className="col-span-8 w-full transition-all duration-500">
            {isLanding ? (
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group transition-all duration-700 bg-neutral-900 aspect-[16/10]">
                {/* Crisp Founders Photograph */}
                <img
                  src="/assets/images/team/founders.png"
                  alt="Jirjirak Studio Founders"
                  loading="eager"
                  decoding="async"
                  onLoad={() => setIsPhotoLoaded(true)}
                  className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                    isPhotoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Subtle Ambient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10 text-white">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-brand-yellow block mb-0.5">
                      {isFa ? 'هم‌بنیان‌گذاران استودیو' : 'Co-Founders & Atelier Directors'}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">
                      {isFa ? 'عبدالله، روح‌الله و سینا' : 'Abdollah, Rouhollah & Sina'}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-mono border border-white/20 bg-black/60 backdrop-blur-md">
                    2026
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <StudioTeamAtelier isNight={isNight} isFa={isFa} />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
