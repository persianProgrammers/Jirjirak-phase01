import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current!.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="py-32 px-8 lg:px-12 xl:px-16 bg-brand-light text-brand-dark overflow-hidden border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-16">
        
        {/* Left Column (Header) */}
        <div className="lg:w-1/3 flex flex-col items-start">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">08 / 08</span>
            <span className="text-xs font-semibold tracking-widest uppercase">Contact</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Got something<br />to build?
          </h2>
          
          <p className="text-brand-gray text-base leading-relaxed mb-12 max-w-sm">
            Tell us about your idea, project or just say hi. We'd love to hear from you.
          </p>

          <button className="px-6 py-3 bg-brand-yellow text-brand-dark rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-dark hover:text-brand-yellow transition-colors flex items-center gap-2">
            Start a conversation
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Right Column (Form) */}
        <div ref={formRef} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
             <h3 className="text-xs font-bold uppercase tracking-widest mb-2">What are we building?</h3>
             
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-dark flex items-center justify-center">
                 {/* Active state would have an inner dot */}
               </div>
               <span className="text-sm font-medium">A brand</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-dark flex items-center justify-center"></div>
               <span className="text-sm font-medium">A website</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-dark flex items-center justify-center"></div>
               <span className="text-sm font-medium">A digital product</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-dark flex items-center justify-center"></div>
               <span className="text-sm font-medium">A campaign</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-dark flex items-center justify-center"></div>
               <span className="text-sm font-medium">Something weird</span>
             </label>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
             <div className="flex flex-col gap-4">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Tell us about it</h3>
               <textarea 
                 placeholder="Write a short message..." 
                 className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-brand-dark transition-colors"
               ></textarea>
             </div>

             <div className="flex flex-col gap-4">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2">How big is the idea?</h3>
               <div className="relative pt-2 pb-6">
                 {/* Custom Slider Track */}
                 <div className="w-full h-1 bg-gray-200 rounded-full relative">
                   {/* Active Track */}
                   <div className="absolute left-0 top-0 h-full bg-brand-yellow w-1/3 rounded-full"></div>
                   {/* Thumb */}
                   <div className="absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-brand-dark rounded-full border-2 border-brand-yellow shadow cursor-pointer"></div>
                 </div>
                 <div className="flex justify-between mt-3 text-[10px] font-bold text-brand-gray uppercase tracking-widest">
                   <span>Small</span>
                   <span>Huge</span>
                 </div>
               </div>
             </div>

             <button className="px-8 lg:px-12 xl:px-16 py-4 bg-brand-yellow text-brand-dark rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-dark hover:text-brand-yellow transition-colors flex items-center justify-center gap-2 self-start w-full md:w-auto">
               Send it to Jirjirak
               <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M5 12h14M12 5l7 7-7 7"/>
               </svg>
             </button>
          </div>

        </div>

      </div>
    </section>
  );
}
