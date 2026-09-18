import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

/**
 * VintageJazzCircle Component (Circular Metronome Scroll Indicator)
 * 
 * هماهنگی ۱۰۰٪ استایل با ۳ دکمه سمت راست:
 * - پس‌زمینه: bg-[#0A0A0A]/80 backdrop-blur-md
 * - بوردر در حالت عادی: border border-white/10
 * - بوردر و جلوه هاور: hover:border-brand-yellow/40 transition-all duration-500
 * - سایه: shadow-[0_4px_12px_rgba(0,0,0,0.5)]
 * - بدون هاله زرد اغراق‌آمیز؛ هماهنگ با DayNightToggle، LanguageToggle و AudioToggle
 */
export function VintageJazzCapsule() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Circular gauge circumference: 2 * PI * 20 = 125.66
  const dialRadius = 20;
  const dialCircumference = 2 * Math.PI * dialRadius;

  // DIRECT ZERO-DELAY TRANSFORMATION (Instant real-time sync with scrollYProgress on the GPU)
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [dialCircumference, 0]
  );

  // Instant calculation for the sliding bob weight on the metronome
  const bobY = useTransform(
    scrollYProgress,
    [0, 1],
    [13, 23]
  );

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const scrolledPastTop = latest > 0.012;

      if (scrolledPastTop) {
        setIsVisible(true);

        // Reset the 1-second hide timer on each scroll event
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        // Exactly 1 second (1000ms) after user stops scrolling, fade out
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      } else {
        // At the very top (header area), dismiss immediately
        setIsVisible(false);
      }
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeGold = "#FFF083";
  const warmAmber = "#FFC857";

  // Visible while scrolling OR when user hovers over it
  const shouldRender = isVisible || isHovered;

  return (
    <div className="fixed bottom-4 left-3 sm:bottom-6 sm:left-4 lg:bottom-10 lg:left-8 z-[60] pointer-events-none">
      <AnimatePresence mode="wait">
        {shouldRender && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative pointer-events-auto flex items-center justify-center origin-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={scrollToTop}
              className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-brand-yellow/40 transition-all duration-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden shrink-0 p-0"
              aria-label="Scroll back to top"
            >
              {/* Real-time Hardware-Accelerated Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 48 48">
                {/* Background Track */}
                <circle
                  cx="24"
                  cy="24"
                  r={dialRadius}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Real-time Dynamic Arc */}
                <motion.circle
                  cx="24"
                  cy="24"
                  r={dialRadius}
                  stroke={activeGold}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={dialCircumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_6px_rgba(255,240,131,0.7)]"
                />
              </svg>

              {/* =========================================================================
                 CENTER ICON: VINTAGE JAZZ METRONOME (Permanent, never replaced on hover)
                 ========================================================================= */}
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 40 40" className="w-[1.7rem] h-[1.7rem] lg:w-[2.1rem] lg:h-[2.1rem] drop-shadow-md overflow-visible">
                  {/* Wooden Body */}
                  <path
                    d="M14 32 L17 11 C17.5 9.5, 22.5 9.5, 23 11 L26 32 Z"
                    fill="#151412"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                  
                  {/* Inner Chamber */}
                  <path
                    d="M16 30 L18.5 13 L21.5 13 L24 30 Z"
                    fill="#0D0D0D"
                    stroke={warmAmber}
                    strokeWidth="0.6"
                    strokeOpacity="0.4"
                  />

                  {/* Scale Measurement Ticks */}
                  <line x1="17.5" y1="18" x2="22.5" y2="18" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  <line x1="17.2" y1="22" x2="22.8" y2="22" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  <line x1="16.8" y1="26" x2="23.2" y2="26" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />

                  {/* Continuous Uniform Pendulum Motion */}
                  <motion.g
                    animate={{
                      rotate: [-16, 16, -16],
                    }}
                    transition={{
                      duration: 1.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "20px 29px" }}
                  >
                    <line x1="20" y1="29" x2="20" y2="9" stroke={activeGold} strokeWidth="1.2" strokeLinecap="round" />
                    
                    {/* Brass bob weight travels down smoothly with page scroll */}
                    <motion.rect
                      x="18"
                      style={{ y: bobY }}
                      width="4"
                      height="3.5"
                      rx="0.75"
                      fill={warmAmber}
                      stroke="#000"
                      strokeWidth="0.5"
                      className="drop-shadow-[0_0_4px_rgba(255,240,131,0.9)]"
                    />
                    
                    <circle cx="20" cy="8.5" r="1.1" fill="#FFFFFF" />
                  </motion.g>

                  <path d="M12 33 L28 33" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
