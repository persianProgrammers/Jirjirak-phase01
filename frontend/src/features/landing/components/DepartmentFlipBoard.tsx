import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const titleText = isFa ? currentDept.titleFa : currentDept.titleEn;
  const titleWords = titleText.split(' ');

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

      {/* Delicate Vertical Navigation Dots on the Vertical Edge */}
      <div 
        className="absolute right-3.5 sm:right-5 rtl:right-auto rtl:left-3.5 sm:rtl:left-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 py-2 px-1 rounded-full transition-all"
        role="tablist"
        aria-label="Department Navigation"
      >
        {DEPARTMENTS.map((dept, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={dept.id}
              onClick={() => goToIndex(idx)}
              className="group relative flex items-center justify-center p-0.5 cursor-pointer focus:outline-none"
              role="tab"
              aria-selected={isActive}
              aria-label={`Slide ${dept.number}: ${isFa ? dept.titleFa : dept.titleEn}`}
            >
              {/* Dynamic Slim Pill Dot */}
              <motion.div
                layout
                animate={{
                  height: isActive ? 22 : 6,
                  backgroundColor: isActive 
                    ? '#fff083' 
                    : isNight 
                      ? 'rgba(255, 255, 255, 0.22)' 
                      : 'rgba(0, 0, 0, 0.22)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`w-1.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'shadow-[0_0_8px_rgba(255,240,131,0.5)]' 
                    : 'group-hover:bg-brand-yellow/60'
                }`}
              />

              {/* Tooltip on Hover */}
              <span className={`absolute ${
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
      <div className="w-full flex items-center justify-center px-4 sm:px-8 lg:px-10 py-7 relative z-10">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
          className="w-full max-w-xl flex flex-col items-center justify-center text-center"
        >
          {/* 1. Handcrafted Animated Icon within Stationary Polygonal Frame */}
          <div className="relative mb-6 sm:mb-7 flex items-center justify-center">
            <DepartmentPolygonalFrame departmentIndex={currentIndex} isNight={isNight}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDept.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: direction > 0 ? -15 : 15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    transition: { type: 'spring', stiffness: 320, damping: 24 }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    rotate: direction > 0 ? 15 : -15,
                    transition: { duration: 0.15 } 
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <IconComponent isNight={isNight} className="w-full h-full" />
                </motion.div>
              </AnimatePresence>
            </DepartmentPolygonalFrame>
          </div>

          {/* 2. In-Place 3D Drum / Slot Machine Rolling Title */}
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
                    className={`text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-center leading-snug ${
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
            <div className={`h-[1px] w-64 sm:w-80 md:w-96 max-w-md rounded-full ${
              isNight 
                ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-neutral-300 to-transparent'
            }`} />
          </div>

          {/* 4. Elegant, Legible Description (In-Place Smooth Transition) */}
          <div className="w-full min-h-[48px] sm:min-h-[44px] flex items-center justify-center mb-5 sm:mb-6 overflow-hidden">
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
                className={`text-sm sm:text-[15px] leading-relaxed max-w-lg mx-auto text-center font-normal transition-colors duration-300 ${
                  isNight ? 'text-brand-gray/90' : 'text-neutral-600'
                }`}
              >
                {isFa ? currentDept.subtitleFa : currentDept.subtitleEn}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 5. Delicate Activity Tags (In-Place Smooth Transition) */}
          <div className="w-full min-h-[42px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentDept.id}-${currentLang}`}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
                exit={{ opacity: 0, y: direction > 0 ? 8 : -8, transition: { duration: 0.14, ease: 'easeIn' } }}
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
