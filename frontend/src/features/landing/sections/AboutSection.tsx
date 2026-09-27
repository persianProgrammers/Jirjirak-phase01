import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

interface MemberData {
  id: string;
  nameEn: string;
  nameFa: string;
  roleEn: string;
  roleFa: string;
  typeEn: string;
  typeFa: string;
  highlight: boolean;
  image: string;
  bioEn: string;
  bioFa: string;
  socials: { label: string; url: string }[];
}

const TEAM_MEMBERS: MemberData[] = [
  {
    id: 'abdollah',
    nameEn: 'Abdollah',
    nameFa: 'عبدالله',
    roleEn: 'Architect & Founder',
    roleFa: 'معمار و بنیان‌گذار',
    typeEn: 'Creative Direction & System Design',
    typeFa: 'هدایت خلاق و تفکر ساختاری',
    highlight: true,
    image: '/assets/images/team/abdollah.jpg',
    bioEn: 'Shaping spaces, systems, and multidisciplinary creative experiences with structural clarity.',
    bioFa: 'طراحی فضاها، سیستم‌های پیچیده و هدایت کلی تجارب چندرشته‌ای استودیو.',
    socials: [
      { label: 'LN', url: '#' },
      { label: 'TW', url: '#' },
    ],
  },
  {
    id: 'rouhollah',
    nameEn: 'Rouhollah',
    nameFa: 'روح‌الله',
    roleEn: 'Lead Tech & Architecture',
    roleFa: 'توسعه‌دهنده ارشد و تکنولوژی',
    typeEn: 'Engineering, Systems & 3D Web',
    typeFa: 'معماری فنی و مهندسی سیستم',
    highlight: false,
    image: '/assets/images/team/rouhollah.jpg',
    bioEn: 'Pioneering cutting-edge digital craftsmanship, robust software architecture, and real-time systems.',
    bioFa: 'توسعه زیرساخت‌های مهندسی، برنامه‌نویسی خلاق، وب سه‌بعدی و معماری نرم‌افزار.',
    socials: [
      { label: 'GH', url: '#' },
      { label: 'LN', url: '#' },
    ],
  },
  {
    id: 'sina',
    nameEn: 'Sina',
    nameFa: 'سینا',
    roleEn: 'Brand & Visual Designer',
    roleFa: 'طراح برند و هویت بصری',
    typeEn: 'Visual Identity & Creative Art',
    typeFa: 'دیزاین تعاملی و فضاسازی',
    highlight: false,
    image: '/assets/images/team/sina.jpg',
    bioEn: 'Crafting memorable brand identities, expressive illustrations, and refined visual aesthetics.',
    bioFa: 'خلق هویت‌های بصری ماندگار، تایپوگرافی مفهومی و آرت‌دایرکشن هنری پروژه‌ها.',
    socials: [
      { label: 'DR', url: '#' },
      { label: 'IG', url: '#' },
    ],
  },
];

interface StyleOption {
  id: number;
  nameEn: string;
  nameFa: string;
  description: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  { id: 1, nameEn: '1. Architectural Gallery', nameFa: '۱. گالری معماری (تمام‌قد و مینیمال)', description: 'Full-bleed portrait photography with gradient scrim & bottom floating tags' },
  { id: 2, nameEn: '2. Bento Grid Interactive', nameFa: '۲. بنتو گرید مدرن (Bento)', description: 'Modern asymmetrical bento layout with hero lead & spotlight accents' },
  { id: 3, nameEn: '3. Polaroid Studio Cards', nameFa: '۳. کارت‌های استودیویی پولاروید', description: 'Angled tactile cards with subtle rotation, film borders and analog warmth' },
  { id: 4, nameEn: '4. Cyberpunk / Editorial Mono', nameFa: '۴. ادیتوریال مونوکروم و داک', description: 'Black & white portraits with high-contrast color wash on hover & tech tags' },
  { id: 5, nameEn: '5. Floating Hex / Geometric Badges', nameFa: '۵. چندضلعی و هندسه مینیمال', description: 'Architectural geometric frames with clean metadata cards' },
  { id: 6, nameEn: '6. Horizontal Accordion Expand', nameFa: '۶. آکاردئون افقی تعاملی (اسلایدی)', description: 'Dynamic expanding cards that expand upon hover with rich biography' },
  { id: 7, nameEn: '7. Frosted Glassmorphism 3D', nameFa: '۷. گلس‌مورفیسم شیشه‌ای و نئومورفیک', description: 'Deep frosted blur backdrop with floating portraits and glowing borders' },
  { id: 8, nameEn: '8. Swiss Modernist / Brutalist Grid', nameFa: '۸. گرید مدرنیست سوئیسی', description: 'Bold typography headers, sharp borders, and stark editorial discipline' },
  { id: 9, nameEn: '9. Spotlight Focus / Cinematic Carousel', nameFa: '۹. کانون تمرکز / اسپات‌لایت سینمایی', description: 'Active member illuminated in spotlight with instant quick-select tabs' },
  { id: 10, nameEn: '10. Interactive Hologram / Blueprint Pass', nameFa: '۱۰. پاسپورت بلوپرینت / کارت هویت', description: 'Architectural blueprint badge with ID stamp, coordinate grids & tags' },
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const displayStageRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  // 10 Layout Model Presets State
  const [activeStyle, setActiveStyle] = useState<number>(1);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [selectedAccordion, setSelectedAccordion] = useState<string>('abdollah');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className={`py-28 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Style Selector Toolbar (10 Interactive Layout Models Switcher) */}
        <div className={`mb-12 p-4 sm:p-5 rounded-2xl border transition-colors ${
          isNight 
            ? 'bg-neutral-100 border-neutral-300 shadow-sm' 
            : 'bg-brand-surface/90 border-brand-surface-light shadow-xl backdrop-blur-md'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-dashed border-neutral-300/60 dark:border-neutral-700/60">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark'
              }`}>
                {activeStyle}
              </span>
              <div>
                <h4 className="text-sm font-bold tracking-tight">
                  {isFa ? 'انتخاب از بین ۱۰ مدل طراحی مختلف بخش اعضای تیم' : 'Choose from 10 Different Team Layout Models'}
                </h4>
                <p className={`text-xs ${isNight ? 'text-neutral-500' : 'text-brand-gray'}`}>
                  {isFa 
                    ? STYLE_OPTIONS[activeStyle - 1].nameFa + ' — ' + STYLE_OPTIONS[activeStyle - 1].description
                    : STYLE_OPTIONS[activeStyle - 1].nameEn + ' — ' + STYLE_OPTIONS[activeStyle - 1].description}
                </p>
              </div>
            </div>
            <div className="text-[11px] font-mono tracking-wider text-right rtl:text-left text-neutral-400">
              MODEL {activeStyle} OF 10
            </div>
          </div>

          {/* Quick-switch buttons grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5 pt-3">
            {STYLE_OPTIONS.map((style) => {
              const isSelected = activeStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style.id)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                    isSelected
                      ? isNight 
                        ? 'bg-brand-dark text-white shadow-md scale-[1.03]' 
                        : 'bg-brand-yellow text-brand-dark shadow-md scale-[1.03]'
                      : isNight
                        ? 'bg-white hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
                        : 'bg-brand-surface-light/40 hover:bg-brand-surface-light text-neutral-300 border border-brand-surface-light'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-60">#{style.id.toString().padStart(2, '0')}</span>
                  <span className="text-[11px] truncate max-w-full">
                    {isFa ? style.nameFa.split(' ')[1] : `Model ${style.id}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Left Info & Right Visual Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Text & Mission) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-28">
            {/* Pre-title / Step Badge */}
            <div className="flex items-center gap-4 mb-8">
              <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}>{t.about.step}</span>
              <span className="text-xs font-semibold tracking-widest uppercase">{t.about.badge}</span>
            </div>
            
            {/* Content: Title, Description & Button */}
            <div ref={textRef} className="flex flex-col items-start py-2 w-full">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-8">
                {t.about.titleLine1}<br />{t.about.titleLine2}
              </h2>
              
              <p className={`text-sm leading-relaxed mb-10 ${
                isNight ? 'text-brand-gray' : 'text-neutral-400'
              }`}>
                {t.about.description}
              </p>
              
              <a 
                href="#about" 
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
              </a>
            </div>
            
            <div className="mt-8 pt-6 border-t border-neutral-300/30 dark:border-neutral-700/40 w-full flex items-center justify-between text-[11px] text-brand-gray font-mono">
              <span>{t.about.tagline}</span>
              <span>3 FOUNDING MEMBERS</span>
            </div>
          </div>

          {/* Right Column: 10 Dynamically Rendered Layout Models */}
          <div ref={displayStageRef} className="lg:col-span-8 min-h-[580px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStyle}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full"
              >
                {/* MODEL 1: ARCHITECTURAL GALLERY (Full bleed portrait cards with gradient scrim) */}
                {activeStyle === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={member.id}
                        className={`group relative h-[480px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border ${
                          isNight ? 'border-neutral-300 bg-white' : 'border-brand-surface-light bg-brand-surface'
                        }`}
                      >
                        <img
                          src={member.image}
                          alt={isFa ? member.nameFa : member.nameEn}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
                        
                        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
                          {member.highlight && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-yellow text-brand-dark uppercase tracking-wider">
                              {isFa ? 'سرپرست' : 'Lead'}
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                          <p className="text-[11px] font-mono tracking-widest text-brand-yellow uppercase mb-1">
                            {isFa ? member.roleFa : member.roleEn}
                          </p>
                          <h3 className="text-2xl font-bold tracking-tight mb-2">
                            {isFa ? member.nameFa : member.nameEn}
                          </h3>
                          <p className="text-xs text-neutral-300 leading-relaxed mb-4 line-clamp-2">
                            {isFa ? member.bioFa : member.bioEn}
                          </p>
                          <div className="flex items-center gap-2 pt-2 border-t border-white/15">
                            {member.socials.map((s, idx) => (
                              <a
                                key={idx}
                                href={s.url}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-dark transition-colors flex items-center justify-center text-[10px] font-bold"
                              >
                                {s.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODEL 2: BENTO GRID INTERACTIVE */}
                {activeStyle === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Hero Member (Abdollah - Large Card) */}
                    <div className={`md:col-span-2 relative h-[500px] rounded-3xl overflow-hidden border shadow-xl flex flex-col justify-end p-8 group ${
                      isNight ? 'border-neutral-300 bg-white' : 'border-brand-surface-light bg-brand-surface'
                    }`}>
                      <img
                        src={TEAM_MEMBERS[0].image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      <div className="relative z-10 text-white">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-yellow text-brand-dark mb-3 inline-block">
                          {isFa ? TEAM_MEMBERS[0].roleFa : TEAM_MEMBERS[0].roleEn}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-bold mb-2">
                          {isFa ? TEAM_MEMBERS[0].nameFa : TEAM_MEMBERS[0].nameEn}
                        </h3>
                        <p className="text-sm text-neutral-300 max-w-md mb-4">
                          {isFa ? TEAM_MEMBERS[0].bioFa : TEAM_MEMBERS[0].bioEn}
                        </p>
                        <span className="text-xs font-mono text-neutral-400">
                          {isFa ? TEAM_MEMBERS[0].typeFa : TEAM_MEMBERS[0].typeEn}
                        </span>
                      </div>
                    </div>

                    {/* Stacked Secondary Members (Rouhollah & Sina) */}
                    <div className="flex flex-col gap-5">
                      {TEAM_MEMBERS.slice(1).map((member) => (
                        <div
                          key={member.id}
                          className={`relative h-[240px] rounded-3xl overflow-hidden border shadow-lg p-5 flex flex-col justify-end group ${
                            isNight ? 'border-neutral-300 bg-white' : 'border-brand-surface-light bg-brand-surface'
                          }`}
                        >
                          <img
                            src={member.image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          <div className="relative z-10 text-white">
                            <span className="text-[10px] font-mono text-brand-yellow uppercase tracking-wider block mb-1">
                              {isFa ? member.roleFa : member.roleEn}
                            </span>
                            <h4 className="text-xl font-bold">
                              {isFa ? member.nameFa : member.nameEn}
                            </h4>
                            <p className="text-xs text-neutral-300 line-clamp-1 mt-1">
                              {isFa ? member.typeFa : member.typeEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MODEL 3: POLAROID STUDIO CARDS (Angled with analog warmth) */}
                {activeStyle === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                    {TEAM_MEMBERS.map((member, idx) => {
                      const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
                      return (
                        <div
                          key={member.id}
                          className={`transform ${rotations[idx]} hover:rotate-0 hover:scale-105 transition-all duration-300 bg-white p-4 pb-6 rounded-xl shadow-2xl border border-neutral-200 cursor-pointer text-brand-dark flex flex-col`}
                        >
                          <div className="w-full h-[320px] rounded-lg overflow-hidden bg-neutral-100 mb-4 shadow-inner">
                            <img
                              src={member.image}
                              alt=""
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="px-2">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-2xl font-bold font-serif">
                                {isFa ? member.nameFa : member.nameEn}
                              </h3>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                                #{idx + 1}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-[#b3a85c]">
                              {isFa ? member.roleFa : member.roleEn}
                            </p>
                            <p className="text-[11px] text-neutral-500 mt-2 line-clamp-2">
                              {isFa ? member.bioFa : member.bioEn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* MODEL 4: CYBERPUNK / EDITORIAL MONOCHROME */}
                {activeStyle === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={member.id}
                        className="group relative h-[470px] rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-2xl cursor-pointer"
                      >
                        <img
                          src={member.image}
                          alt=""
                          className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        
                        {/* Technical Crosshairs & Coordinates */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-brand-yellow/80">
                          <span>SYS // 0{member.id}</span>
                          <span>+ ACTIVE</span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                          <div className="w-8 h-[2px] bg-brand-yellow mb-3 transition-all duration-300 group-hover:w-16" />
                          <h3 className="text-2xl font-mono font-bold tracking-wider uppercase mb-1">
                            {isFa ? member.nameFa : member.nameEn}
                          </h3>
                          <p className="text-xs text-brand-yellow font-mono mb-2">
                            {isFa ? member.roleFa : member.roleEn}
                          </p>
                          <p className="text-xs text-neutral-400 font-mono line-clamp-2">
                            {isFa ? member.typeFa : member.typeEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODEL 5: GEOMETRIC ARCHITECTURAL FRAMES */}
                {activeStyle === 5 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={member.id}
                        className={`p-6 rounded-3xl border flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl ${
                          isNight 
                            ? 'bg-white border-neutral-300 text-brand-dark' 
                            : 'bg-brand-surface border-brand-surface-light text-brand-light'
                        }`}
                      >
                        <div className="relative w-44 h-44 mb-6">
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-yellow animate-spin-slow opacity-60" />
                          <div className="absolute inset-2 rounded-full overflow-hidden shadow-xl border-2 border-white/20">
                            <img
                              src={member.image}
                              alt=""
                              className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">
                          {isFa ? member.nameFa : member.nameEn}
                        </h3>
                        <span className="text-xs font-semibold text-brand-yellow mb-3 block">
                          {isFa ? member.roleFa : member.roleEn}
                        </span>
                        <p className={`text-xs leading-relaxed mb-6 ${isNight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          {isFa ? member.bioFa : member.bioEn}
                        </p>
                        <div className="mt-auto w-full pt-4 border-t border-neutral-200/20 flex justify-center gap-3">
                          {member.socials.map((s, idx) => (
                            <span key={idx} className="text-[11px] font-mono px-3 py-1 rounded-full bg-neutral-500/10 font-bold">
                              {s.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODEL 6: HORIZONTAL ACCORDION EXPAND (Hover / Click to Expand) */}
                {activeStyle === 6 && (
                  <div className="flex flex-col md:flex-row h-[500px] gap-4 w-full">
                    {TEAM_MEMBERS.map((member) => {
                      const isExpanded = selectedAccordion === member.id;
                      return (
                        <div
                          key={member.id}
                          onClick={() => setSelectedAccordion(member.id)}
                          onMouseEnter={() => setSelectedAccordion(member.id)}
                          className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out border shadow-xl flex flex-col justify-end p-6 ${
                            isExpanded ? 'md:flex-[3] flex-[3]' : 'md:flex-[1] flex-[1]'
                          } ${isNight ? 'border-neutral-300' : 'border-brand-surface-light'}`}
                        >
                          <img
                            src={member.image}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ${
                              isExpanded ? 'scale-100 filter brightness-[0.7]' : 'scale-110 filter brightness-[0.45] grayscale'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                          
                          <div className="relative z-10 text-white overflow-hidden">
                            <span className="text-[11px] font-mono text-brand-yellow uppercase tracking-widest block mb-1">
                              {isFa ? member.roleFa : member.roleEn}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold whitespace-nowrap mb-2">
                              {isFa ? member.nameFa : member.nameEn}
                            </h3>
                            
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed mb-4">
                                  {isFa ? member.bioFa : member.bioEn}
                                </p>
                                <div className="text-[11px] font-mono text-brand-yellow">
                                  {isFa ? member.typeFa : member.typeEn}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* MODEL 7: FROSTED GLASSMORPHISM 3D */}
                {activeStyle === 7 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={member.id}
                        className="relative rounded-3xl p-6 backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 flex flex-col"
                      >
                        <div className="w-full h-[280px] rounded-2xl overflow-hidden mb-5 relative shadow-lg">
                          <img
                            src={member.image}
                            alt=""
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/80 dark:bg-black/70 backdrop-blur-md">
                            {isFa ? member.roleFa : member.roleEn}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">
                          {isFa ? member.nameFa : member.nameEn}
                        </h3>
                        <p className="text-xs text-brand-yellow font-semibold mb-2">
                          {isFa ? member.typeFa : member.typeEn}
                        </p>
                        <p className="text-xs opacity-75 leading-relaxed mt-auto">
                          {isFa ? member.bioFa : member.bioEn}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODEL 8: SWISS MODERNIST / BRUTALIST GRID */}
                {activeStyle === 8 && (
                  <div className="border-2 border-neutral-400 dark:border-neutral-700 divide-y-2 md:divide-y-0 md:divide-x-2 rtl:md:divide-x-reverse divide-neutral-400 dark:divide-neutral-700 grid grid-cols-1 md:grid-cols-3 bg-neutral-50 dark:bg-black">
                    {TEAM_MEMBERS.map((member, idx) => (
                      <div key={member.id} className="p-6 flex flex-col justify-between h-[520px]">
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono font-bold border-b border-neutral-300 dark:border-neutral-800 pb-3 mb-4">
                            <span>0{idx + 1} / MEMBER</span>
                            <span>{isFa ? member.roleFa : member.roleEn}</span>
                          </div>
                          <div className="w-full h-[260px] overflow-hidden bg-neutral-200 dark:bg-neutral-900 mb-6">
                            <img
                              src={member.image}
                              alt=""
                              className="w-full h-full object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                            />
                          </div>
                          <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                            {isFa ? member.nameFa : member.nameEn}
                          </h3>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono leading-relaxed">
                          {isFa ? member.bioFa : member.bioEn}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODEL 9: SPOTLIGHT FOCUS / CINEMATIC CAROUSEL */}
                {activeStyle === 9 && (
                  <div className="relative rounded-3xl overflow-hidden border border-neutral-300 dark:border-brand-surface-light bg-black p-6 sm:p-10 text-white min-h-[500px] flex flex-col justify-between">
                    {/* Active member backdrop */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={spotlightIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={TEAM_MEMBERS[spotlightIndex].image}
                          alt=""
                          className="w-full h-full object-cover object-top filter brightness-[0.4] scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Spotlight member details */}
                    <div className="relative z-10 max-w-xl">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-yellow text-brand-dark mb-4 inline-block">
                        {isFa ? TEAM_MEMBERS[spotlightIndex].roleFa : TEAM_MEMBERS[spotlightIndex].roleEn}
                      </span>
                      <h3 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
                        {isFa ? TEAM_MEMBERS[spotlightIndex].nameFa : TEAM_MEMBERS[spotlightIndex].nameEn}
                      </h3>
                      <p className="text-base text-neutral-200 leading-relaxed mb-4">
                        {isFa ? TEAM_MEMBERS[spotlightIndex].bioFa : TEAM_MEMBERS[spotlightIndex].bioEn}
                      </p>
                      <p className="text-xs font-mono text-brand-yellow">
                        {isFa ? TEAM_MEMBERS[spotlightIndex].typeFa : TEAM_MEMBERS[spotlightIndex].typeEn}
                      </p>
                    </div>

                    {/* Member selection switcher tabs */}
                    <div className="relative z-10 flex gap-4 pt-6 border-t border-white/20">
                      {TEAM_MEMBERS.map((m, idx) => {
                        const isCurrent = idx === spotlightIndex;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setSpotlightIndex(idx)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-white text-black font-bold shadow-lg scale-105'
                                : 'bg-black/60 text-white hover:bg-black/80 border border-white/20'
                            }`}
                          >
                            <img
                              src={m.image}
                              alt=""
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <span className="text-xs">{isFa ? m.nameFa : m.nameEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* MODEL 10: INTERACTIVE BLUEPRINT PASS / ID CARD */}
                {activeStyle === 10 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TEAM_MEMBERS.map((member, idx) => (
                      <div
                        key={member.id}
                        className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-[480px] shadow-xl ${
                          isNight
                            ? 'bg-[#f4efe6] border-[#d4cbba] text-brand-dark'
                            : 'bg-[#0f172a] border-[#334155] text-slate-100 font-mono'
                        }`}
                      >
                        {/* Top ID Card Header */}
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest pb-3 border-b border-current/20 mb-4 opacity-75">
                            <span>JIRJIRAK // PASS</span>
                            <span>ID: 2026-0{idx + 1}</span>
                          </div>

                          <div className="relative w-full h-[220px] rounded-lg overflow-hidden border border-current/20 mb-4">
                            <img
                              src={member.image}
                              alt=""
                              className="w-full h-full object-cover object-top filter contrast-110"
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 text-brand-yellow text-[9px] font-mono rounded">
                              VERIFIED
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold tracking-tight mb-1">
                            {isFa ? member.nameFa : member.nameEn}
                          </h3>
                          <p className="text-xs font-semibold text-[#b3a85c] dark:text-brand-yellow mb-2">
                            {isFa ? member.roleFa : member.roleEn}
                          </p>
                        </div>

                        {/* Bottom Metadata & Barcode */}
                        <div className="pt-3 border-t border-current/20">
                          <p className="text-[11px] opacity-80 leading-relaxed mb-3">
                            {isFa ? member.bioFa : member.bioEn}
                          </p>
                          <div className="flex justify-between items-center text-[9px] font-mono opacity-60">
                            <span>AUTH: SYSTEM_CORE</span>
                            <span>STATUS: CO-FOUNDER</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
