import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * ArchitecturalClouds Component (Contour / Isoline Topographic Clouds)
 * Desktop Large Screen Display:
 * - Fixed 4 architectural clouds positioned across the sky zone
 * - Contour lines with topographic isolines and elevation tag
 * - Smooth drift animation across desktop viewport
 */
export const ArchitecturalClouds: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cloudCount = 4;
  const cloudsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let isVisible = true;
    const activeTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      // Clean positioning and well-spaced initial coordinates for desktop
      cloudsRef.current.forEach((cloud, i) => {
        if (!cloud) return;

        // Controlled subtle scale variation
        const scale = 0.9 + (i % 3) * 0.12;
        const baseOpacity = 0.55 + (i % 2) * 0.15;

        // Well-spaced layout across screen width & top sky section:
        const screenW = window.innerWidth || 1600;
        const segmentW = screenW / cloudCount;

        const initialX = (i * segmentW) - 60 + (i % 2 === 1 ? 40 : -20);
        // Kept exclusively in upper 35% of hero screen (the sky zone above the building)
        const initialY = 22 + (i * 28) + (i % 2 === 1 ? 15 : 0);

        gsap.set(cloud, {
          x: initialX,
          y: initialY,
          scale,
          opacity: baseOpacity,
        });

        // Disciplined and balanced speed
        const minDuration = 36;
        const maxDuration = 54;

        const drift = () => {
          if (!isVisible) return;
          const deltaX = gsap.utils.random(260, 420);
          const deltaY = gsap.utils.random(-8, 10);
          const duration = gsap.utils.random(minDuration, maxDuration);

          const tw = gsap.to(cloud, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            duration,
            ease: 'sine.inOut',
            onComplete: () => {
              const curX = gsap.getProperty(cloud, 'x') as number;
              // Reset with ample distance when passing screen right edge
              if (curX > (window.innerWidth || 1600) + 120) {
                const newY = gsap.utils.random(20, Math.min((window.innerHeight || 900) * 0.35, 130));
                
                // Spawn behind the left edge with spacing
                gsap.set(cloud, {
                  x: -300 - (i * 80),
                  y: newY,
                });
              }
              drift();
            },
          });
          activeTweens.push(tw);
        };

        drift();
      });
    }, containerRef);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          activeTweens.forEach((t) => t.pause());
        } else {
          activeTweens.forEach((t) => t.resume());
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      activeTweens.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {Array.from({ length: cloudCount }).map((_, i) => (
        <div
          key={`cloud-${i}`}
          ref={(el) => { cloudsRef.current[i] = el; }}
          className="absolute top-0 left-0 will-change-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Architectural Topographic Contour Cloud SVG */}
          <svg
            width="260"
            height="110"
            viewBox="0 0 260 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Outer Level Line (Base Envelope) */}
            <path
              d="M30 75C20 75 10 67 10 55C10 42 22 34 35 34C38 20 52 10 70 10C88 10 102 20 106 32C114 26 128 26 138 32C146 22 162 16 178 16C200 16 218 30 222 48C236 48 248 58 248 70C248 82 236 92 220 92L40 92C34 92 30 87 30 75Z"
              fill="rgba(255, 255, 255, 0.45)"
              stroke="rgba(0, 0, 0, 0.28)"
              strokeWidth="1.5"
              strokeDasharray="5 3"
            />

            {/* Middle Isoline Contour Level (Level +10m) */}
            <path
              d="M45 74C38 74 32 68 32 60C32 50 40 44 50 44C54 34 66 26 80 26C94 26 104 32 108 40C116 36 126 36 134 40C140 32 152 28 166 28C182 28 196 38 198 52C210 52 218 60 218 68C218 76 210 82 198 82L52 82C48 82 45 79 45 74Z"
              fill="rgba(255, 255, 255, 0.35)"
              stroke="rgba(0, 0, 0, 0.22)"
              strokeWidth="1.2"
            />

            {/* Inner Core Crest Contour Level (Peak +20m) */}
            <path
              d="M65 70C60 70 56 65 56 58C56 50 64 46 72 46C76 38 86 34 96 34C106 34 114 38 118 44C124 42 132 42 138 45C144 38 154 36 164 36C174 36 184 42 186 52C194 52 200 58 200 64C200 70 194 74 186 74L70 74C67 74 65 72 65 70Z"
              fill="rgba(255, 255, 255, 0.25)"
              stroke="rgba(0, 0, 0, 0.18)"
              strokeWidth="1"
            />

            {/* Architectural Grid Intersect Cross Marks */}
            <g stroke="rgba(0,0,0,0.3)" strokeWidth="0.8">
              <line x1="88" y1="28" x2="88" y2="36" />
              <line x1="84" y1="32" x2="92" y2="32" />

              <line x1="162" y1="32" x2="162" y2="40" />
              <line x1="158" y1="36" x2="166" y2="36" />
            </g>

            {/* Technical Altimetry Tag Box */}
            <g transform="translate(196, 20)">
              <rect
                x="0"
                y="0"
                width="42"
                height="15"
                rx="3"
                fill="rgba(0,0,0,0.65)"
              />
              <text
                x="21"
                y="10.5"
                fill="#FEEF83"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                +{(i + 1) * 12}M
              </text>
            </g>

            {/* Subtle Gradient Definition for Light Shading */}
            <defs>
              <linearGradient id={`cloudGrad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f3f3f3" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};
