import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';
import { DEPARTMENT_ANIMATED_ICONS, DepartmentPolygonalFrame } from './DepartmentAnimatedIcons';

export interface DepartmentItem {
  id: string;
  number: string;
  titleEn: string;
  titleFa: string;
  sloganEn: string;
  sloganFa: string;
  subtitleEn: string;
  subtitleFa: string;
  tagsEn: string[];
  tagsFa: string[];
}

const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'web-dev',
    number: '01',
    titleEn: 'WEB & DEVELOPMENT',
    titleFa: 'وب و توسعه',
    sloganEn: 'WHERE IDEAS TURN TO CODE',
    sloganFa: 'جایی که ایده‌ها به کد تبدیل می‌شوند',
    subtitleEn: 'Architecture, clean coding, high performance & modern user experience.',
    subtitleFa: 'ساختار، کدنویسی اصولی، عملکرد بالا و تجربه کاربری روان و سریع',
    tagsEn: ['Architecture', 'Clean Code', 'Performance', 'UI / UX Systems'],
    tagsFa: ['معماری نرم‌افزار', 'کدنویسی تمیز', 'عملکرد بالا', 'طراحی رابط و تجربه کاربری'],
  },
  {
    id: 'seo-analytics',
    number: '02',
    titleEn: 'SEO & ANALYTICS',
    titleFa: 'سئو و تحلیل داده',
    sloganEn: 'DATA DRIVES GROWTH',
    sloganFa: 'داده‌ها پیشران رشد ارگانیک',
    subtitleEn: 'Data analytics, search engine optimization, strategy & organic impact.',
    subtitleFa: 'داده، تحلیل عمیق، استراتژی سئو، بهینه‌سازی و رشد هدفمند پایدار',
    tagsEn: ['Data Analytics', 'Technical SEO', 'Growth Strategy', 'Conversion Rate'],
    tagsFa: ['تحلیل داده', 'سئو تکنیکال', 'استراتژی رشد', 'بهینه‌سازی نرخ تبدیل'],
  },
  {
    id: 'branding-identity',
    number: '03',
    titleEn: 'BRANDING & IDENTITY',
    titleFa: 'برندینگ و هویت',
    sloganEn: 'BRAND STORY',
    sloganFa: 'داستان متمایز و ماندگار برند',
    subtitleEn: 'Brand strategy, naming, visual identity systems & bespoke storytelling.',
    subtitleFa: 'استراتژی برند، نام‌گذاری، زبان طراحی بصری و روایت‌گری منحصر‌به‌فرد',
    tagsEn: ['Brand Strategy', 'Naming', 'Visual Identity', 'Brand Guidelines'],
    tagsFa: ['استراتژی برند', 'نام‌گذاری', 'هویت بصری', 'کتابچه هویت برند'],
  },
  {
    id: 'creative-studio',
    number: '04',
    titleEn: 'CREATIVE STUDIO',
    titleFa: 'گرافیک و انیمیشن',
    sloganEn: 'GRAPHIC & ANIMATION',
    sloganFa: 'خلق دنیاهای بصری پویا و جذاب',
    subtitleEn: 'Creative ideation, motion graphics, 2D/3D illustration & visual art.',
    subtitleFa: 'ایده‌پردازی، طراحی گرافیک، موشن‌گرافیک و تصویرسازی دیجیتال اختصاصی',
    tagsEn: ['Motion Design', 'Visual Art', 'Illustration', 'Creative Direction'],
    tagsFa: ['موشن‌دیزاین', 'تصویرسازی اختصاصی', 'طراحی گرافیک', 'ایده‌پردازی خلاق'],
  },
  {
    id: 'digital-marketing',
    number: '05',
    titleEn: 'DIGITAL MARKETING & GROWTH',
    titleFa: 'دیجیتال مارکتینگ و رشد',
    sloganEn: 'THINK • CREATE • SHARE • GROW',
    sloganFa: 'تفکر • خلق • اشتراک • رشد',
    subtitleEn: 'Performance campaigns, social networks, content strategy & scaled funnels.',
    subtitleFa: 'طراحی کمپین‌های عملکردمحور، تبلیغات هدفمند، شبکه‌های اجتماعی و جذب مخاطب',
    tagsEn: ['Paid Campaigns', 'Social Media', 'Content Strategy', 'Growth Funnel'],
    tagsFa: ['کمپین‌های تبلیغاتی', 'شبکه‌های اجتماعی', 'استراتژی محتوا', 'قیف رشد و لید'],
  },
  {
    id: 'game-interactive',
    number: '06',
    titleEn: 'GAME STUDIO & INTERACTIVE',
    titleFa: 'بازی‌سازی و تجارب تعاملی',
    sloganEn: 'PLAY • CREATE • INSPIRE',
    sloganFa: 'بازی • آفرینش • الهام‌بخشی',
    subtitleEn: 'Game mechanics design, interactive 3D spaces, programming & playful fun.',
    subtitleFa: 'طراحی گیم‌پلی، دنیاهای سه‌بعدی وب، برنامه‌نویسی خلاق و سرگرمی تعاملی',
    tagsEn: ['Interactive 3D', 'Game Mechanics', 'Creative Coding', 'Character Art'],
    tagsFa: ['بازی‌سازی سه‌بعدی', 'تجارب تعاملی وب', 'برنامه‌نویسی خلاق', 'طراحی مکانیک بازی'],
  },
  {
    id: 'academy-hub',
    number: '07',
    titleEn: 'ACADEMY & LEARNING HUB',
    titleFa: 'آموزش و توسعه مهارت',
    sloganEn: 'LEARN • APPLY • GROW',
    sloganFa: 'یادگیری • به‌کارگیری • رشد مستمر',
    subtitleEn: 'Online education, practical workshops, courses & lifelong creative community.',
    subtitleFa: 'آموزش آنلاین، کارگاه‌های عملی، دوره‌های تخصصی و جامعه یادگیری پویا',
    tagsEn: ['Specialized Courses', 'Live Workshops', 'Mentorship', 'Creative Hub'],
    tagsFa: ['دوره‌های تخصصی', 'کارگاه‌های عملی', 'جامعه متخصصان', 'منتورشیپ خلاق'],
  },
];

const DEPARTMENT_ICONS = DEPARTMENT_ANIMATED_ICONS;

export function DepartmentFlipBoard() {
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const lastWheelTime = useRef<number>(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % DEPARTMENTS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + DEPARTMENTS.length) % DEPARTMENTS.length);
  }, []);

  const goToIndex = useCallback((targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
  }, [currentIndex]);

  // Smooth Auto-cycle every 4.8 seconds (paused on user hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      goToNext();
    }, 4800);
    return () => clearInterval(timer);
  }, [isHovered, goToNext]);

  // Native non-passive wheel listener on boardRef
  // When cursor is over carousel, ONLY carousel changes slides and page DOES NOT scroll.
  // When cursor is outside carousel, carousel is untouched and page scrolls normally.
  useEffect(() => {
    const element = boardRef.current;
    if (!element) return;

    const handleWheelNative = (e: WheelEvent) => {
      // Prevent browser / window page scroll while wheeling over carousel
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTime.current < 380) return;
      
      if (Math.abs(e.deltaY) > 15) {
        lastWheelTime.current = now;
        if (e.deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    element.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      element.removeEventListener('wheel', handleWheelNative);
    };
  }, [goToNext, goToPrev]);

  // Drag handler for smooth vertical swipe
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number }; velocity: { y: number } }
  ) => {
    const threshold = 35;
    const velocityThreshold = 150;

    if (info.offset.y > threshold || info.velocity.y > velocityThreshold) {
      goToNext();
    } else if (info.offset.y < -threshold || info.velocity.y < -velocityThreshold) {
      goToPrev();
    }
  };

  const currentDept = DEPARTMENTS[currentIndex];
  const IconComponent = DEPARTMENT_ICONS[currentIndex];

  // Natural directional mapping:
  // When advancing to next slide (idx increases, dots move top-to-bottom),
  // new content should arrive from top (y: -28) and exit towards bottom (y: 28),
  // perfectly echoing the downward travel of the active dot!
  const titleContainerVariants: Variants = {
    enter: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
    center: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.04,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const wordVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -24 : 24, // Matches the dot navigation direction!
      opacity: 0,
      scale: 0.92,
      filter: 'blur(4px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 22,
        mass: 0.7,
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 24 : -24,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(3px)',
      transition: {
        duration: 0.18,
        ease: 'easeIn' as const,
      },
    }),
  };

  const descContainerVariants: Variants = {
    enter: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.08,
      },
    },
    center: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.015,
        staggerDirection: -1,
      },
    },
  };

  const descWordVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -16 : 16,
      opacity: 0,
      filter: 'blur(3px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 20,
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 16 : -16,
      opacity: 0,
      filter: 'blur(3px)',
      transition: {
        duration: 0.16,
        ease: 'easeIn' as const,
      },
    }),
  };

  const iconVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -28 : 28,
      opacity: 0,
      scale: 0.86,
      rotate: dir > 0 ? -10 : 10,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        y: { type: 'spring', stiffness: 260, damping: 22 },
        scale: { type: 'spring', stiffness: 280, damping: 20 },
        opacity: { duration: 0.32 },
        rotate: { type: 'spring', stiffness: 220, damping: 20 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 28 : -28,
      opacity: 0,
      scale: 0.88,
      rotate: dir > 0 ? 10 : -10,
      transition: {
        duration: 0.22,
        ease: 'easeInOut' as const,
      },
    }),
  };

  const tagsVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -16 : 16,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.12,
        y: { type: 'spring', stiffness: 220, damping: 24 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 16 : -16,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.18, ease: 'easeIn' as const },
    }),
  };

  return (
    <div 
      ref={boardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full h-full min-h-[480px] lg:min-h-[520px] self-stretch rounded-2xl transition-colors duration-500 relative overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing border shadow-md ${
        isNight 
          ? 'bg-brand-surface border-brand-surface-light text-brand-light shadow-[0_16px_40px_rgba(0,0,0,0.4)]' 
          : 'bg-white border-gray-200 text-brand-dark shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
      }`}
      aria-label="Department Showcase Board"
    >
      {/* Delicate Ambient Radial Glow */}
      <div 
        className="absolute w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: isNight
            ? 'radial-gradient(circle, rgba(255,240,131,0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(204,192,105,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Living Amoeba Cell Navigation Dots on the Vertical Edge */}
      <div 
        className="absolute right-3.5 sm:right-5 rtl:right-auto rtl:left-3.5 sm:rtl:left-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 py-3 px-1.5 rounded-full transition-all"
        role="tablist"
        aria-label="Department Navigation"
      >
        {DEPARTMENTS.map((dept, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={dept.id}
              onClick={() => goToIndex(idx)}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
              role="tab"
              aria-selected={isActive}
              aria-label={`Slide ${dept.number}: ${isFa ? dept.titleFa : dept.titleEn}`}
            >
              {/* 2D Living Cell Dot / Amoeba Organic Morphing State */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Active Living Amoeba Cell (Translucent membrane, continuous organic deformation, no inner solid block) */}
                <motion.div
                  initial={false}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.25, 0.95, 1.18, 1],
                          borderRadius: [
                            '50% 50% 50% 50%',
                            '62% 38% 68% 32% / 44% 65% 35% 56%',
                            '41% 59% 33% 67% / 60% 38% 62% 40%',
                            '58% 42% 64% 36% / 37% 58% 42% 63%',
                            '50% 50% 50% 50%',
                          ],
                          rotate: [0, 45, 180, 290, 360],
                          borderColor: '#fff083',
                          backgroundColor: isNight 
                            ? 'rgba(255, 240, 131, 0.18)' 
                            : 'rgba(204, 192, 105, 0.22)',
                          boxShadow: isNight
                            ? [
                                '0 0 8px rgba(255,240,131,0.5), inset 0 0 6px rgba(255,240,131,0.3)',
                                '0 0 16px rgba(255,240,131,0.85), inset 0 0 9px rgba(255,240,131,0.45)',
                                '0 0 10px rgba(255,240,131,0.55), inset 0 0 6px rgba(255,240,131,0.3)',
                                '0 0 18px rgba(255,240,131,0.9), inset 0 0 10px rgba(255,240,131,0.5)',
                                '0 0 8px rgba(255,240,131,0.5), inset 0 0 6px rgba(255,240,131,0.3)',
                              ]
                            : [
                                '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                                '0 0 14px rgba(204,192,105,0.8), inset 0 0 8px rgba(204,192,105,0.45)',
                                '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                                '0 0 15px rgba(204,192,105,0.85), inset 0 0 9px rgba(204,192,105,0.48)',
                                '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                              ],
                        }
                      : {
                          scale: 1,
                          borderRadius: '50%',
                          rotate: 0,
                          borderColor: isNight 
                            ? 'rgba(255, 255, 255, 0.22)' 
                            : 'rgba(0, 0, 0, 0.22)',
                          backgroundColor: isNight 
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : 'rgba(0, 0, 0, 0.08)',
                          boxShadow: '0 0 0px rgba(0,0,0,0)',
                        }
                  }
                  transition={
                    isActive
                      ? {
                          duration: 3.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                      : {
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1], // Fluid deflating release from living back to dormant dot
                        }
                  }
                  className={`w-3.5 h-3.5 border transition-colors ${
                    !isActive ? 'group-hover:border-brand-yellow/80 group-hover:scale-110' : ''
                  }`}
                />
              </div>

              {/* Tooltip on Hover */}
              <span className={`absolute ${
                isFa 
                  ? 'left-full ml-2.5' 
                  : 'right-full mr-2.5'
              } px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 border shadow-md z-40 ${
                isNight 
                  ? 'bg-brand-dark text-brand-yellow border-brand-surface-light' 
                  : 'bg-white text-brand-dark border-gray-200'
              }`}>
                {dept.number} • {isFa ? dept.titleFa : dept.titleEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Single Container Stage (Static Anchor Layout with Separator Firmly Anchored) */}
      <div className="w-full flex items-center justify-center px-4 sm:px-8 lg:px-10 py-7 relative z-10">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="w-full max-w-xl flex flex-col items-center justify-center text-center"
        >
          {/* 1. Animated Bespoke Polygonal Frame & Handcrafted Icon */}
          <div className="relative mb-5 sm:mb-6 flex items-center justify-center min-h-[96px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`icon-${currentDept.id}`}
                custom={direction}
                variants={iconVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <DepartmentPolygonalFrame departmentIndex={currentIndex} isNight={isNight}>
                  <IconComponent isNight={isNight} className="w-full h-full" />
                </DepartmentPolygonalFrame>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. Distinctly Animated Title Header with Word-by-Word Kinetic Animation */}
          <div className="min-h-[42px] sm:min-h-[48px] flex items-center justify-center w-full overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.h3
                key={`title-${currentDept.id}`}
                custom={direction}
                variants={titleContainerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-center leading-snug flex flex-wrap items-center justify-center gap-x-2 transition-colors duration-300 ${
                  isNight ? 'text-white' : 'text-brand-dark'
                }`}
              >
                {(isFa ? currentDept.titleFa : currentDept.titleEn).split(' ').map((word, wordIdx) => (
                  <motion.span
                    key={`w-${wordIdx}`}
                    custom={direction}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* 3. STATIC / PERMANENT DIVIDER LINE (Remains completely still and rock-solid during transitions) */}
          <div className="flex items-center justify-center my-4 sm:my-5 w-full pointer-events-none">
            <div className={`h-[1px] w-64 sm:w-80 md:w-96 max-w-md rounded-full transition-colors duration-500 ${
              isNight 
                ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-neutral-300 to-transparent'
            }`} />
          </div>

          {/* 4. Distinctly Animated Description Paragraph with Word-by-Word Staggered Kinetic Timing */}
          <div className="min-h-[56px] sm:min-h-[64px] flex items-center justify-center w-full overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.p
                key={`desc-${currentDept.id}`}
                custom={direction}
                variants={descContainerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`text-sm sm:text-[15px] leading-relaxed max-w-lg mx-auto text-center font-normal flex flex-wrap items-center justify-center gap-x-1.5 transition-colors duration-300 ${
                  isNight ? 'text-brand-gray/90' : 'text-neutral-600'
                }`}
              >
                {(isFa ? currentDept.subtitleFa : currentDept.subtitleEn).split(' ').map((word, wordIdx) => (
                  <motion.span
                    key={`dw-${wordIdx}`}
                    custom={direction}
                    variants={descWordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 5. Distinctly Animated Activity Tags (Clean, Minimal Pill Badges) */}
          <div className="min-h-[46px] flex items-center justify-center w-full mt-4 sm:mt-5 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`tags-${currentDept.id}`}
                custom={direction}
                variants={tagsVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-lg mx-auto"
              >
                {(isFa ? currentDept.tagsFa : currentDept.tagsEn).map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-normal tracking-normal border transition-all duration-200 text-center ${
                      isNight 
                        ? 'bg-brand-surface-light/40 border-white/[0.08] text-brand-light/90 hover:border-brand-yellow/40 hover:text-brand-yellow' 
                        : 'bg-neutral-50 border-gray-200 text-neutral-700 hover:border-brand-yellow-dark hover:text-brand-dark'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default DepartmentFlipBoard;
