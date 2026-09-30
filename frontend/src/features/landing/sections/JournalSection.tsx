import { useRef, useEffect, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function JournalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current!.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="journal" 
      ref={containerRef} 
      className={`py-32 px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-row gap-16">
        
        {/* Header (Col 1: 1/3) */}
        <div className="w-1/3 flex flex-col items-start self-stretch">
          {/* Pre-title / Step Badge */}
          <div className="flex items-center gap-4 mb-8">
            <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}>{t.journal.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.journal.badge}</span>
          </div>
          
          {/* Centered Content */}
          <div className="my-auto flex flex-col items-start py-6 w-full">
            <h2 className="text-5xl font-bold leading-tight mb-6">
              {t.journal.title}
            </h2>
            
            <p className={`text-base leading-relaxed mb-10 ${
              isNight ? 'text-brand-gray' : 'text-neutral-400'
            }`}>
              {t.journal.description}
            </p>

            <a 
              href="/journal" 
              className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                isNight 
                  ? 'text-[#b3a85c] hover:text-brand-dark' 
                  : 'text-brand-yellow hover:text-brand-light'
              }`}
            >
              {t.journal.viewAll}
              <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div className="h-8 w-full" aria-hidden="true" />
        </div>

        {/* Content List (Col 2: 2/3) */}
        <div className="w-2/3 flex flex-col">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {t.journal.categories.map((cat) => (
              <button 
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors border cursor-pointer ${
                  activeCategory === cat.key 
                    ? (isNight ? 'bg-[#b3a85c] text-brand-dark border-[#b3a85c]' : 'bg-brand-yellow text-brand-dark border-brand-yellow') 
                    : isNight 
                      ? 'bg-transparent text-brand-gray border-gray-300 hover:border-[#b3a85c] hover:text-[#b3a85c]'
                      : 'bg-transparent text-brand-gray border-brand-surface-light hover:border-brand-yellow hover:text-brand-yellow'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div ref={listRef} className="flex flex-col gap-10">
            {t.journal.articles.map((article, i) => (
              <a 
                key={i} 
                href="#" 
                className={`group flex flex-row items-center gap-8 p-6 -mx-6 rounded-xl transition-colors cursor-pointer border ${
                  isNight 
                    ? 'border-transparent hover:border-black/5 hover:bg-black/5' 
                    : 'border-transparent hover:border-white/5 hover:bg-white/5'
                }`}
              >
                {/* Date / Metadata */}
                <div className="w-32 shrink-0 flex flex-col">
                  <span className={`text-[10px] font-mono tracking-widest uppercase mb-1 font-bold ${
                    isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
                  }`}>{article.category}</span>
                  <span className={`text-xs ${
                    isNight ? 'text-brand-gray' : 'text-neutral-400'
                  }`}>{article.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold leading-snug mb-2 transition-colors ${
                    isNight ? 'group-hover:text-[#b3a85c]' : 'group-hover:text-brand-yellow'
                  }`}>
                    {article.title}
                  </h3>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${
                    isNight ? 'text-brand-gray' : 'text-neutral-400'
                  }`}>
                    {article.desc}
                  </p>
                </div>

                {/* Action Arrow */}
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                  isNight 
                    ? 'border-black/10 group-hover:bg-[#b3a85c] group-hover:border-[#b3a85c] group-hover:text-brand-dark' 
                    : 'border-white/10 group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-brand-dark'
                }`}>
                  <svg className="w-3.5 h-3.5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default JournalSection;
