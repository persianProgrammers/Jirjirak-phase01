import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';
import { AnimatedJirjirakLogo } from './AnimatedJirjirakLogo';

/**
 * ScreenTransitionCurtain Component
 * 
 * - انیمیشن دقیق و ارگانیک منوی همبرگری (spring bounce: 0, duration: 0.8s)
 * - رنگ پس‌زمینه اصیل: bg-brand-dark (#222222)
 * - هاله زرد کرم‌شب‌تاب منو که بلافاصله از فریم اول حضور دارد
 * - جهت‌گیری رفت و برگشت متقارن به مبدأ:
 *   • انگلیسی (LTR): از بالا-راست (100% 0%) باز شده و به همان 100% 0% جمع می‌شود
 *   • فارسی (RTL): از بالا-چپ (0% 0%) باز شده و به همان 0% 0% جمع می‌شود
 * - مکث ۴ ثانیه‌ای روی صفحه
 * - بال‌های زنده و متحرک لوگوی جیرجیرک با ریتم طبیعی chirp:
 *   (جیرجیر - مکث کوتاه - جیرجیر - مکث طولانی‌تر - لوپ)
 * - سه نقطه بارگذاری:
 *   • در انگلیسی: از چپ به راست (. .. ...)
 *   • در فارسی: جهت معکوس و متناسب با نوشتار فارسی (... .. .)
 */
export function ScreenTransitionCurtain() {
  const { transitionPhase, currentLang } = useGlobalStore();

  const isVisible = transitionPhase !== 'idle';
  const isEnglish = currentLang === 'EN';

  // مبدأ شروع باز شدن و بازگشت متقارن به مبدأ اول:
  // انگلیسی: بالا-راست (100% 0%)
  // فارسی: بالا-چپ (0% 0%)
  const origin = isEnglish ? "100% 0%" : "0% 0%";

  const isCovered = transitionPhase === 'covering' || transitionPhase === 'paused';

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden">
          <motion.div
            initial={{ clipPath: `circle(0% at ${origin})` }}
            animate={{ 
              clipPath: isCovered 
                ? `circle(160% at ${origin})` 
                : `circle(0% at ${origin})` 
            }}
            transition={{ 
              type: "spring", 
              bounce: 0, 
              duration: 0.8 
            }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col justify-center items-center px-8 sm:px-12"
          >
            {/* پرتو زرد منوی اصلی که از اولین میلی‌ثانیه می‌تابد */}
            <div className="absolute inset-0 pointer-events-none opacity-25 flex justify-center items-center">
              <div className="w-[320px] h-[320px] bg-brand-yellow rounded-full filter blur-[100px]" />
            </div>

            {/* بخش مرکزی: بال‌های متحرک لوگوی جیرجیرک و متن لودینگ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: transitionPhase === 'paused' ? 1 : 0, 
                scale: transitionPhase === 'paused' ? 1 : 0.95,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center justify-center gap-7 pointer-events-none"
            >
              {/* لوگوی زنده و متحرک جیرجیرک (بال‌ها با ریتم جیرجیر تکان می‌خورند) */}
              <AnimatedJirjirakLogo className="h-16 md:h-20 lg:h-24 w-auto" />

              {/* متن لودینگ متناسب با زبان */}
              <div className="flex items-center gap-1.5 text-brand-yellow/85 font-mono text-xs md:text-sm tracking-wider select-none">
                {isEnglish ? (
                  /* در انگلیسی: جهت ظاهر شدن نقطه‌ها از چپ به راست (delay: 0, 0.2, 0.4) */
                  <div className="flex items-center">
                    <span className="font-semibold tracking-widest uppercase text-[11px] md:text-xs">
                      loading
                    </span>
                    <span className="flex ml-0.5">
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.3, 1], delay: 0 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.3, 1], delay: 0.2 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.3, 1], delay: 0.4 }}
                      >
                        .
                      </motion.span>
                    </span>
                  </div>
                ) : (
                  /* در فارسی: جهت ظاهر شدن نقطه‌ها برعکس شده (از راست‌ترین نقطه به چپ‌ترین نقطه با دیلی معکوس 0.4, 0.2, 0) */
                  <div className="flex items-center gap-1.5" dir="rtl">
                    <span className="font-medium text-xs md:text-sm font-sans tracking-normal">
                      در حال بارگذاری
                    </span>
                    <span className="flex" dir="rtl">
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.3, 1], delay: 0 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.3, 1], delay: 0.2 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.3, 1], delay: 0.4 }}
                      >
                        .
                      </motion.span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
