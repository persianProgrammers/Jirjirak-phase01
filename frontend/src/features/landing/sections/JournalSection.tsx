import { useRef, useEffect, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function JournalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { currentLang } = useGlobalStore();
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
    <section id="journal" ref={containerRef} className="py-32 px-8 lg:px-12 xl:px-16 bg-brand-dark text-brand-light overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row gap-16">
        
        {/* Header */}
        <div className="md:w-1/3 flex flex-col items-start">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">{t.journal.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.journal.badge}</span>
          </div>
          
          <h2 className="text-5xl font-bold leading-tight mb-6">
            {t.journal.title}
          </h2>
          
          <p className="text-brand-gray text-sm leading-relaxed mb-12">
            {t.journal.description}
          </p>

          <a href="/journal" className="text-xs font-bold uppercase tracking-widest text-brand-yellow hover:text-brand-light transition-colors flex items-center gap-2 mt-auto">
            {t.journal.viewAll}
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Content List */}
        <div className="md:w-2/3 flex flex-col">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {t.journal.categories.map((cat) => (
              <button 
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors border ${
                  activeCategory === cat.key 
                    ? 'bg-brand-yellow text-brand-dark border-brand-yellow' 
                    : 'bg-transparent text-brand-gray border-brand-surface-light hover:border-brand-gray'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div ref={listRef} className="flex flex-col gap-8 md:gap-10">
            {t.journal.articles.map((article, i) => (
              <a key={i} href="#" className="group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 p-4 md:p-6 -mx-4 md:-mx-6 rounded-xl hover:bg-brand-surface transition-colors cursor-pointer border border-transparent hover:border-brand-surface-light">
                {/* Thumbnail */}
                <div className={`w-full md:w-48 h-48 md:h-32 rounded-xl bg-brand-surface-light shrink-0 border border-brand-surface-light overflow-hidden flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                   <div className="w-8 h-8 border border-brand-gray/30 rounded rotate-12"></div>
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-brand-yellow transition-colors">{article.title}</h3>
                  <div className="flex items-center gap-3 text-sm font-medium text-brand-gray tracking-wide">
                    <span>{article.category}</span>
                    <span className="w-1 h-1 bg-brand-surface-light rounded-full"></span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
