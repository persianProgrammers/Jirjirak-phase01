import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../animations/gsap';

const caseStudySteps = [
  {
    title: 'THE PROBLEM',
    desc: 'A traditional brand needed a modern digital presence to reach a new generation.'
  },
  {
    title: 'THE IDEA',
    desc: 'A minimal, immersive web experience that reflects the brand\'s essence and values.'
  },
  {
    title: 'THE RESULT',
    desc: 'A high-performing website and stronger brand identity, leading to increased engagement and sales.'
  },
  {
    title: 'WHAT WE LEARNED',
    desc: 'Simplicity creates depth.'
  }
];

export function CaseStudySection() {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current!.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-8 lg:px-12 xl:px-16 bg-brand-dark text-brand-light overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left Column (Info & Steps) */}
        <div className="lg:w-1/4 flex flex-col relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">04 / 08</span>
            <span className="text-xs font-semibold tracking-widest uppercase">Project</span>
          </div>
          
          <h2 className="text-4xl font-bold leading-tight mb-2 tracking-tight">TOYOORAN</h2>
          <p className="text-sm text-brand-gray mb-16">Web / Brand / Experience</p>
          
          <div ref={elementsRef} className="space-y-8 relative">
             {/* Vertical Timeline Line */}
             <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-brand-surface-light -z-10"></div>
             
            {caseStudySteps.map((step, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-brand-dark border border-brand-surface-light flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gray"></div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-yellow uppercase mb-2">{step.title}</h4>
                  <p className="text-xs text-brand-gray leading-relaxed pr-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column (Main Mockup) */}
        <div className="lg:w-1/2 flex items-center justify-center relative">
          <div className="w-full h-[600px] bg-brand-surface rounded-xl border border-brand-surface-light shadow-2xl relative overflow-hidden group">
            {/* Mockup Screen Placeholder */}
            <div className="absolute inset-4 bg-brand-dark rounded shadow-inner overflow-hidden flex flex-col items-center justify-center">
               <div className="text-center">
                 <p className="text-brand-gray text-xs tracking-widest mb-4">TOYOORAN</p>
                 <h3 className="text-3xl font-bold tracking-tight text-brand-light">More<br/>than a place.<br/><span className="text-brand-yellow">A feeling.</span></h3>
               </div>
            </div>
            
            {/* Phone Mockup Overlap */}
            <div className="absolute bottom-10 right-10 w-[140px] h-[280px] bg-brand-surface-light rounded-2xl border-4 border-brand-dark shadow-2xl overflow-hidden transform rotate-12 transition-transform duration-500 group-hover:rotate-0">
               <div className="absolute top-2 w-1/2 left-1/4 h-3 bg-brand-dark rounded-b-xl z-10"></div>
               <div className="w-full h-full bg-brand-dark flex flex-col pt-8 px-4">
                  <div className="w-full h-24 bg-brand-surface rounded mb-4"></div>
                  <div className="w-full h-12 bg-brand-surface rounded"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column (Supporting Images) */}
        <div className="lg:w-1/4 flex flex-col gap-4">
          <div className="w-full h-[180px] bg-brand-surface rounded-lg border border-brand-surface-light overflow-hidden flex items-center justify-center">
            <span className="text-[10px] text-brand-gray">Environment Shot</span>
          </div>
          <div className="w-full h-[180px] bg-brand-surface rounded-lg border border-brand-yellow/30 overflow-hidden flex items-center justify-center relative">
             <div className="text-brand-yellow text-xs font-bold tracking-widest text-center">TOYOORAN<br/><span className="text-[8px] font-normal text-brand-gray">Figure 02</span></div>
          </div>
          <div className="w-full h-[180px] bg-brand-surface rounded-lg border border-brand-surface-light overflow-hidden flex items-center justify-center">
             <span className="text-[10px] text-brand-gray">Wireframe Sketch</span>
          </div>
        </div>

      </div>
    </section>
  );
}
