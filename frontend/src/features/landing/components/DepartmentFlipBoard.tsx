import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';

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

/**
 * Highly responsive, 60fps+ fluid organic "Soul / Life" Droplet (Version 1).
 * Uses hardware-accelerated SVG cubic-spline geometry for buttery-smooth morphing.
 *
 * Life Injection:
 * When becoming active, it takes an extended, graceful 1.25s to blossom,
 * swelling smoothly from a quiet 6px resting dot into a rich 16.5px living liquid droplet,
 * allowing the user to clearly appreciate the organic birth and color awakening.
 *
 * Life Departure:
 * When moving on, it exhales gently over 1.15s, smoothly shrinking and fading to quiet gray.
 */
function OrganicFlatDropletDot({
  isActive,
  isNight,
}: {
  isActive: boolean;
  isNight: boolean;
}) {
  const activeFill = isNight ? '#fff083' : '#e5c928';
  const inactiveFill = isNight ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.22)';

  // Morphing SVG paths with pronounced, visible organic bulging in various directions
  const morphPaths = [
    // 0: Centered soft fluid drop
    'M12,3.5 C16.6,3.5 20.5,7.4 20.5,12 C20.5,16.6 16.6,20.5 12,20.5 C7.4,20.5 3.5,16.6 3.5,12 C3.5,7.4 7.4,3.5 12,3.5 Z',
    // 1: Bulging diagonally to top-right and bottom-left (fluid swell)
    'M13,2.2 C19.5,3.2 22.5,9.5 21.2,14.8 C19.8,20.2 14.5,21.8 9.5,20.8 C4.5,19.8 2.0,14.5 3.2,9.2 C4.5,4.0 7.5,1.5 13,2.2 Z',
    // 2: Squashing flat and bulging horizontally (wide fluid ripple)
    'M12,4.8 C18.8,4.5 22.2,8.2 22.2,12 C22.2,15.8 18.8,19.5 12,19.2 C5.2,19.5 1.8,15.8 1.8,12 C1.8,8.2 5.2,4.5 12,4.8 Z',
    // 3: Stretching tall and bulging to top-left (fluid teardrop morph)
    'M10.8,2.0 C16.5,1.8 20.8,6.8 20.2,12.5 C19.5,18.5 15.5,22.2 11.2,21.8 C6.0,21.4 3.0,17.2 3.5,11.2 C4.0,5.5 6.2,2.2 10.8,2.0 Z',
    // 4: Return seamlessly to 0
    'M12,3.5 C16.6,3.5 20.5,7.4 20.5,12 C20.5,16.6 16.6,20.5 12,20.5 C7.4,20.5 3.5,16.6 3.5,12 C3.5,7.4 7.4,3.5 12,3.5 Z',
  ];

  return (
    <div className="relative w-6 h-6 flex items-center justify-center pointer-events-none select-none">
      {/* 1. Subtle, Soft Firefly Halo (بسیار ملایم و نرم بدون پوشاندن لبه‌های قطره) */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0.12, 0.32, 0.16, 0.38, 0.12],
              scale: [0.85, 1.18, 0.9, 1.22, 0.85],
            }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 1.1 } }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-2 rounded-full blur-[6px] pointer-events-none z-0"
            style={{
              background: isNight
                ? 'radial-gradient(circle, rgba(255,240,131,0.45) 0%, rgba(255,240,131,0.12) 55%, transparent 75%)'
                : 'radial-gradient(circle, rgba(204,180,35,0.38) 0%, rgba(204,180,35,0.08) 55%, transparent 75%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. SVG Canvas with Crisp 2D Silhouette & Pronounced Multi-Directional Wobble */}
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full overflow-visible will-change-transform z-10"
      >
        <motion.g
          animate={
            isActive
              ? {
                  scale: 1,
                  scaleX: [1, 1.14, 0.88, 1.12, 1],
                  scaleY: [1, 0.88, 1.16, 0.90, 1],
                  rotate: [0, -9, 11, -7, 0],
                }
              : {
                  scale: 0.36, // Scaled down to calm 6px resting dot
                  scaleX: 1,
                  scaleY: 1,
                  rotate: 0,
                }
          }
          transition={
            isActive
              ? {
                  // Extended awakening curve (1.25s)
                  scale: {
                    duration: 1.25,
                    ease: [0.22, 1.2, 0.36, 1],
                  },
                  // Pronounced organic breathing wobble in directions
                  scaleX: {
                    duration: 3.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  scaleY: {
                    duration: 3.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  rotate: {
                    duration: 4.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
              : {
                  // Graceful, calm exhalation and deflation (1.15s)
                  scale: {
                    duration: 1.15,
                    ease: [0.25, 1, 0.5, 1],
                  },
                  scaleX: { duration: 0.8, ease: 'easeInOut' },
                  scaleY: { duration: 0.8, ease: 'easeInOut' },
                  rotate: {
                    duration: 0.9,
                    ease: 'easeOut',
                  },
                }
          }
          style={{ transformOrigin: '12px 12px' }}
        >
          <motion.path
            d={morphPaths[0]}
            animate={
              isActive
                ? {
                    d: morphPaths,
                    fill: activeFill,
                  }
                : {
                    d: morphPaths[0],
                    fill: inactiveFill,
                  }
            }
            transition={
              isActive
                ? {
                    // Pronounced fluid morphing between bulging states
                    d: {
                      duration: 3.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    // Warm golden color awakening over 1.05s
                    fill: {
                      duration: 1.05,
                      ease: [0.25, 1, 0.5, 1],
                    },
                  }
                : {
                    d: {
                      duration: 1.0,
                      ease: 'easeInOut',
                    },
                    // Gentle color drain over 1.2s
                    fill: {
                      duration: 1.2,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }
            }
          />
        </motion.g>
      </svg>

      {/* 3. Subtle Firefly Life Pulse Ripple */}
      {isActive && (
        <motion.span
          initial={{ scale: 0.4, opacity: 0.4 }}
          animate={{
            scale: [0.55, 1.55, 0.55],
            opacity: [0.25, 0, 0.25],
          }}
          transition={{
            duration: 3.0,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute inset-0 m-auto w-4 h-4 rounded-full border border-brand-yellow/35 pointer-events-none z-0"
        />
      )}
    </div>
  );
}

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

  const currentDept = DEPARTMENTS[currentIndex];
  const titleText = isFa ? currentDept.titleFa : currentDept.titleEn;
  const titleWords = titleText.split(' ');

  return (
    <div 
      ref={boardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full rounded-none sm:rounded-2xl transition-colors duration-500 relative overflow-hidden flex items-center justify-center select-none border-y sm:border shadow-md min-h-[300px] sm:min-h-[340px] lg:min-h-[400px] xl:min-h-[440px] ${
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

      {/* Delicate Vertical Navigation Dots on the Side Edge */}
      <div 
        className="absolute right-2 sm:right-4 rtl:right-auto rtl:left-2 sm:rtl:left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1 sm:gap-1.5 py-2 px-0.5 rounded-full transition-all"
        role="tablist"
        aria-label="Department Navigation"
      >
        {DEPARTMENTS.map((dept, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={dept.id}
              onClick={() => goToIndex(idx)}
              className="group relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 cursor-pointer focus:outline-none"
              role="tab"
              aria-selected={isActive}
              aria-label={`Slide ${dept.number}: ${isFa ? dept.titleFa : dept.titleEn}`}
            >
              {/* 2D Flat Organic Droplet Dot with Graceful Life Injection & Drain Transition */}
              <OrganicFlatDropletDot isActive={isActive} isNight={isNight} />

              {/* Tooltip on Hover (Desktop only to prevent mobile overflow) */}
              <span className={`hidden sm:block absolute ${
                isFa 
                  ? 'left-full ml-2.5' 
                  : 'right-full mr-2.5'
              } px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 border shadow-md ${
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

      {/* Main Single Container Stage (Stationary frame, in-place rotating content) */}
      <div className="w-full flex items-center justify-center px-7 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 relative z-10">
        <div
          className="w-full max-w-xl flex flex-col items-center justify-center text-center"
        >
          {/* In-Place 3D Drum / Slot Machine Rolling Title */}
          <div 
            style={{ perspective: '900px' }} 
            className="w-full min-h-[38px] sm:min-h-[44px] flex items-center justify-center overflow-hidden py-1"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentDept.id}-${currentLang}`}
                custom={direction}
                className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 gap-y-1"
              >
                {titleWords.map((word, i) => (
                  <motion.span
                    key={`${currentDept.id}-w-${i}`}
                    custom={direction}
                    initial={{
                      y: direction > 0 ? -36 : 36,
                      rotateX: direction > 0 ? 85 : -85,
                      opacity: 0,
                      filter: 'blur(3px)',
                    }}
                    animate={{
                      y: 0,
                      rotateX: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                      transition: {
                        type: 'spring',
                        stiffness: 290,
                        damping: 22,
                        mass: 0.65,
                        delay: i * 0.045, // Cascading mechanical slot reels
                      },
                    }}
                    exit={{
                      y: direction > 0 ? 36 : -36,
                      rotateX: direction > 0 ? -85 : 85,
                      opacity: 0,
                      filter: 'blur(3px)',
                      transition: {
                        duration: 0.16,
                        ease: 'easeIn',
                        delay: i * 0.02,
                      },
                    }}
                    style={{
                      display: 'inline-block',
                      transformOrigin: '50% 50%',
                      backfaceVisibility: 'hidden',
                    }}
                    className={`text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] font-bold tracking-tight text-center leading-snug ${
                      isNight ? 'text-white' : 'text-brand-dark'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Thin, Delicate Divider Line below Title (Stationary) */}
          <div className="flex items-center justify-center my-4 sm:my-5 w-full">
            <div className={`h-[1px] w-56 sm:w-72 md:w-80 max-w-xs sm:max-w-md rounded-full ${
              isNight 
                ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-neutral-300 to-transparent'
            }`} />
          </div>

          {/* 4. Elegant, Legible Description (In-Place Smooth Transition) */}
          <div className="w-full min-h-[46px] sm:min-h-[44px] flex items-center justify-center mb-5 sm:mb-6 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={`${currentDept.id}-${currentLang}`}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  y: direction > 0 ? -12 : 12,
                  filter: 'blur(2px)'
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  filter: 'blur(0px)',
                  transition: { duration: 0.28, ease: 'easeOut' } 
                }}
                exit={{ 
                  opacity: 0, 
                  y: direction > 0 ? 12 : -12, 
                  filter: 'blur(2px)',
                  transition: { duration: 0.14, ease: 'easeIn' } 
                }}
                className={`text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-lg mx-auto text-center font-normal transition-colors duration-300 ${
                  isNight ? 'text-brand-gray/90' : 'text-neutral-600'
                }`}
              >
                {isFa ? currentDept.subtitleFa : currentDept.subtitleEn}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 5. Delicate Activity Tags (In-Place Smooth Transition) */}
          <div className="w-full min-h-[36px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentDept.id}-${currentLang}`}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
                exit={{ opacity: 0, y: direction > 0 ? 8 : -8, transition: { duration: 0.14, ease: 'easeIn' } }}
                className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-lg mx-auto"
              >
                {(isFa ? currentDept.tagsFa : currentDept.tagsEn).map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-normal tracking-normal border transition-all duration-200 text-center ${
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

        </div>
      </div>
    </div>
  );
}
export default DepartmentFlipBoard;
