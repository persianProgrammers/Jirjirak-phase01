import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';

export function PhilosophySection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
      );
      
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 60%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-8 lg:px-12 xl:px-16 bg-brand-dark text-brand-light overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row gap-16 items-center">
        
        {/* Text */}
        <div ref={textRef} className="md:w-1/2 flex flex-col items-start z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">06 / 08</span>
            <span className="text-xs font-semibold tracking-widest uppercase">The Philosophy</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
            Build small.<br />
            Think long.<br />
            Make it move.
          </h2>
          
          <p className="text-brand-gray text-base leading-relaxed mb-12 max-w-sm">
            We believe in the power of small teams, focused ideas, and consistent effort. It's not just about what we build, but how we build it.
          </p>
          
          <a href="#philosophy" className="text-xs font-bold uppercase tracking-widest text-brand-yellow hover:text-brand-light transition-colors flex items-center gap-2">
            Learn More
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Mascot Image Placeholder */}
        <div className="md:w-1/2 relative h-[500px] w-full flex items-center justify-center">
          <div ref={imageRef} className="absolute inset-0">
            {/* Abstract representation of the Jirjirak firefly */}
            <div className="w-full h-full bg-brand-surface rounded-2xl border border-brand-surface-light flex items-center justify-center relative overflow-hidden shadow-2xl">
               {/* Glow */}
               <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-brand-yellow rounded-full mix-blend-screen filter blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
               {/* Body */}
               <div className="relative z-10 w-24 h-24 bg-brand-yellow rounded-full shadow-[0_0_50px_rgba(255,240,131,0.5)]"></div>
               {/* Wings */}
               <div className="absolute z-0 w-32 h-12 border border-brand-yellow/30 rounded-full right-1/3 top-1/2 -translate-y-1/2 translate-x-4 -rotate-12 backdrop-blur-sm bg-brand-light/5"></div>
               <div className="absolute z-0 w-32 h-12 border border-brand-yellow/30 rounded-full right-1/3 top-1/2 -translate-y-1/2 translate-x-4 rotate-12 backdrop-blur-sm bg-brand-light/5"></div>
               
               <span className="absolute bottom-6 right-6 text-[10px] text-brand-gray uppercase tracking-widest">Jirjirak Mascot</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
