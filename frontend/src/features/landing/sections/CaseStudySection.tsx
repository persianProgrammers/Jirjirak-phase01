import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2, Lightbulb, Compass, Award } from 'lucide-react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ProjectItem, ALL_PROJECTS } from '../../../data/projectsData';

interface CaseStudySectionProps {
  project?: ProjectItem;
  showBackLink?: boolean;
}

export function CaseStudySection({ project: propProject, showBackLink = false }: CaseStudySectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  // Fallback to Toyooran (04 / 08) if none passed
  const project: ProjectItem = propProject || ALL_PROJECTS[0];
  const cs = project.caseStudy;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (elementsRef.current) {
        gsap.fromTo(
          elementsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [project.id]);

  const stepsList = [
    {
      icon: Compass,
      title: isFa ? cs.challenge.titleFa : cs.challenge.titleEn,
      desc: isFa ? cs.challenge.descFa : cs.challenge.descEn,
      badge: isFa ? 'گام ۱' : 'Step 1',
    },
    {
      icon: Lightbulb,
      title: isFa ? cs.idea.titleFa : cs.idea.titleEn,
      desc: isFa ? cs.idea.descFa : cs.idea.descEn,
      badge: isFa ? 'گام ۲' : 'Step 2',
    },
    {
      icon: CheckCircle2,
      title: isFa ? cs.result.titleFa : cs.result.titleEn,
      desc: isFa ? cs.result.descFa : cs.result.descEn,
      badge: isFa ? 'گام ۳' : 'Step 3',
    },
    {
      icon: Award,
      title: isFa ? cs.learning.titleFa : cs.learning.titleEn,
      desc: isFa ? cs.learning.descFa : cs.learning.descEn,
      badge: isFa ? 'گام ۴' : 'Step 4',
    },
  ];

  return (
    <section 
      id="case-study" 
      ref={containerRef} 
      data-cursor="project" 
      className={`py-28 px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Optional Back to Portfolio Link */}
        {showBackLink && (
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/#work"
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                isNight
                  ? 'border-white/10 bg-white/5 text-neutral-300 hover:text-brand-yellow hover:border-brand-yellow/40 hover:bg-white/10'
                  : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:text-brand-dark hover:border-brand-dark/40 hover:bg-neutral-200'
              }`}
            >
              <span className="rtl:rotate-180">←</span>
              <span>{isFa ? 'بازگشت به پروژه‌های استودیو' : 'Back to Studio Projects'}</span>
            </Link>

            <span className="text-xs font-mono text-neutral-400 font-semibold">
              {project.step}
            </span>
          </div>
        )}

        <div className="w-full flex flex-row gap-14 relative">
          
          {/* ================= LEFT COLUMN: Case Study Timeline & Milestones ================= */}
          <div className="w-[32%] flex flex-col relative z-10 self-stretch">
            {/* Step & Department Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span 
                className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-md border"
                style={{ 
                  color: project.accentColor || '#fff083',
                  borderColor: `${project.accentColor || '#fff083'}40`,
                  backgroundColor: `${project.accentColor || '#fff083'}15`
                }}
              >
                {project.step}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase opacity-70">
                {isFa ? cs.badgeFa : cs.badgeEn}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
              <span className="text-xs font-medium text-neutral-400">
                {isFa ? project.departmentNameFa : project.departmentNameEn}
              </span>
            </div>
            
            {/* Title & Subtitle */}
            <div className="flex flex-col items-start mb-8">
              <h2 className="text-[42px] font-bold leading-tight mb-2 tracking-tight">
                {isFa ? project.titleFa : project.titleEn}
              </h2>
              <p className="text-sm font-mono text-neutral-400">
                {isFa ? project.categoryFa : project.categoryEn}
              </p>
            </div>
            
            {/* 4 Milestones Journey */}
            <div ref={elementsRef} className="space-y-6 relative w-full my-auto py-2">
              {/* Vertical Connecting Line */}
              <div 
                className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 bottom-3 w-[1px] -z-10"
                style={{
                  background: isNight 
                    ? 'linear-gradient(to bottom, rgba(255,240,131,0.4), rgba(255,255,255,0.05))' 
                    : 'linear-gradient(to bottom, rgba(179,168,92,0.4), rgba(0,0,0,0.05))'
                }}
              />
              
              {stepsList.map((step, i) => {
                const IconComponent = step.icon;
                return (
                  <div key={i} className="flex gap-5 relative group">
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 border shadow-sm transition-all duration-300 ${
                        isNight 
                          ? 'bg-[#18191c] border-white/15 text-brand-yellow group-hover:border-brand-yellow' 
                          : 'bg-white border-neutral-300 text-[#b3a85c] group-hover:border-[#b3a85c]'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 
                          className="text-xs font-bold tracking-wider uppercase"
                          style={{ color: isNight ? (project.accentColor || '#fff083') : '#8c8035' }}
                        >
                          {step.title}
                        </h4>
                      </div>
                      <p className={`text-[13px] leading-relaxed pr-2 rtl:pr-0 rtl:pl-2 ${
                        isNight ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Metrics Bar at bottom of column */}
            <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-3 gap-2">
              {project.metrics?.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span 
                    className="text-lg font-bold font-mono"
                    style={{ color: project.accentColor || '#fff083' }}
                  >
                    {m.value}
                  </span>
                  <span className="text-[10px] text-neutral-400 leading-tight">
                    {isFa ? m.labelFa : m.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= CENTER COLUMN: Main Spatial Mockup ================= */}
          <div className="w-[44%] flex items-center justify-center relative">
            <div className="w-full h-[640px] rounded-3xl border shadow-2xl relative overflow-hidden group transition-all duration-500 flex flex-col bg-[#141518] border-white/10">
              
              {/* Background Project Visual with zoom on hover */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={isFa ? project.titleFa : project.titleEn}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('public/')) {
                      target.src = `/public${project.image.startsWith('/') ? '' : '/'}${project.image}`;
                    }
                  }}
                />
                
                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
              </div>

              {/* Ambient Accent Glow Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
                style={{ backgroundColor: project.accentColor || '#fff083' }}
              />

              {/* Top Bar of the Mockup */}
              <div className="relative z-10 p-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: project.accentColor || '#fff083' }} />
                  <span className="text-[11px] font-mono tracking-wider font-semibold">
                    {cs.mockupBrand}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/10 backdrop-blur-md border border-white/15 text-neutral-300">
                    {project.year}
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-colors"
                      title="Open Project"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Center Typography Quote */}
              <div className="relative z-10 my-auto p-8 text-center text-white">
                <p className="text-sm font-mono tracking-widest uppercase text-neutral-300 mb-3 opacity-80">
                  {cs.mockupBrand}
                </p>
                <h3 className="text-4xl font-bold tracking-tight leading-snug drop-shadow-lg">
                  {isFa ? cs.mockupQuote.line1Fa : cs.mockupQuote.line1En}
                  <br />
                  {isFa ? cs.mockupQuote.line2Fa : cs.mockupQuote.line2En}
                  <br />
                  <span 
                    className="font-extrabold underline decoration-2 underline-offset-8"
                    style={{ color: project.accentColor || '#fff083' }}
                  >
                    {isFa ? cs.mockupQuote.highlightFa : cs.mockupQuote.highlightEn}
                  </span>
                </h3>
              </div>

              {/* Bottom Client details pill */}
              <div className="relative z-10 p-6 flex items-center justify-between text-white/90">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    {isFa ? 'کارفرما' : 'Client'}
                  </span>
                  <span className="text-xs font-bold">
                    {project.client}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                  {project.techStack?.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Supporting Artifacts & Design Specs ================= */}
          <div className="w-[24%] flex flex-col gap-4 justify-between">
            {/* Artifact 1: Environment & Spatial Shot */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[180px] relative overflow-hidden group ${
              isNight ? 'bg-[#18191c] border-white/10 hover:border-white/20' : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider uppercase opacity-60">
                  {isFa ? 'تصویر محیطی' : 'Environment Shot'}
                </span>
                <span className="text-[10px] font-bold text-neutral-400">01</span>
              </div>
              <div className="relative flex-1 rounded-xl overflow-hidden border border-white/5">
                <img 
                  src={project.image} 
                  alt={isFa ? cs.environmentShotFa : cs.environmentShotEn}
                  className="w-full h-full object-cover filter brightness-75 group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2 right-2 text-[10px] font-medium text-white drop-shadow">
                  {isFa ? cs.environmentShotFa : cs.environmentShotEn}
                </span>
              </div>
            </div>

            {/* Artifact 2: Figure 02 / Structural Monolith Diagram */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[180px] relative overflow-hidden group ${
              isNight 
                ? 'bg-[#18191c] border-white/10 hover:border-brand-yellow/40' 
                : 'bg-white border-neutral-200 hover:border-[#b3a85c]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span 
                  className="text-[10px] font-mono tracking-wider uppercase font-bold"
                  style={{ color: project.accentColor || '#fff083' }}
                >
                  {isFa ? 'طرح هندسی' : 'Geometric Blueprint'}
                </span>
                <span className="text-[10px] font-bold opacity-60">02</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-2 rounded-xl bg-black/20 border border-white/5">
                <span 
                  className="text-sm font-bold tracking-tight mb-1"
                  style={{ color: isNight ? (project.accentColor || '#fff083') : '#8c8035' }}
                >
                  {isFa ? project.titleFa : project.titleEn}
                </span>
                <p className="text-[10px] text-neutral-400 leading-snug">
                  {isFa ? cs.figureCaptionFa : cs.figureCaptionEn}
                </p>
              </div>
            </div>

            {/* Artifact 3: Wireframe Sketch & Shaders */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[180px] relative overflow-hidden group ${
              isNight ? 'bg-[#18191c] border-white/10 hover:border-white/20' : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider uppercase opacity-60">
                  {isFa ? 'وایرفریم و کد' : 'Wireframe & Code'}
                </span>
                <span className="text-[10px] font-bold text-neutral-400">03</span>
              </div>
              <div className="flex-1 flex flex-col justify-between p-3 rounded-xl bg-black/30 font-mono text-[10px] text-neutral-400 border border-white/5">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                </div>
                <div className="text-[10px] leading-relaxed truncate opacity-80" dir="ltr">
                  <code>{`<Shader node="spatial.glsl" />`}</code>
                  <br />
                  <code>{`matrix: 4x4, render: 60fps`}</code>
                </div>
                <p className="text-[10px] font-sans text-neutral-300 font-medium">
                  {isFa ? cs.wireframeFa : cs.wireframeEn}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CaseStudySection;
