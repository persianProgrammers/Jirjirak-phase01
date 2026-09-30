import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ProjectItem } from './types';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface KineticBladesModelProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
  isNight: boolean;
  isFa: boolean;
}

export function KineticBladesModel({
  projects,
  currentIndex,
  onSelect,
  isNight,
  isFa,
}: KineticBladesModelProps) {
  const handlePrev = () => {
    onSelect((currentIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    onSelect((currentIndex + 1) % projects.length);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Kinetic Blades Stage (Large Desktop Linear Blades) */}
      <div 
        style={{ transform: 'translateZ(0)' }}
        className="relative w-full h-[530px] rounded-3xl overflow-hidden border border-white/10 p-3 bg-[#111215]/95 shadow-2xl flex flex-row gap-3"
      >
        {projects.map((project, idx) => {
          const isActive = idx === currentIndex;

          return (
            <motion.div
              key={project.id}
              onClick={() => onSelect(idx)}
              layout
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 24,
                mass: 0.8,
              }}
              style={{ transform: 'translateZ(0)', willChange: 'flex-grow' }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer select-none border transition-all duration-300 ${
                isActive
                  ? 'flex-[5] border-brand-yellow/80 shadow-2xl shadow-brand-yellow/10'
                  : 'flex-[1.2] border-white/10 hover:border-white/40'
              } ${isNight ? 'bg-white' : 'bg-brand-surface'}`}
            >
              {/* Project Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                <img
                  src={project.image}
                  alt={project.titleEn}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    isActive ? 'scale-105' : 'scale-115'
                  }`}
                  loading="eager"
                  decoding="async"
                  style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('public/')) {
                      target.src = `/public${project.image.startsWith('/') ? '' : '/'}${project.image}`;
                    }
                  }}
                />

                {/* Subtle Cinematic Shading */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    isActive 
                      ? 'bg-gradient-to-t from-black/85 via-black/20 to-black/10' 
                      : 'bg-black/55 hover:bg-black/35'
                  }`} 
                />

                {/* Ambient Colored Backlight on active edge */}
                {isActive && (
                  <div 
                    className="absolute top-0 bottom-0 left-0 w-1.5 opacity-90 shadow-[0_0_16px_#fff083]"
                    style={{ backgroundColor: project.accentColor || '#fff083', transform: 'translateZ(0)' }}
                  />
                )}
              </div>

              {/* ================= IF ACTIVE: EXPANDED FULL VIEW ================= */}
              {isActive ? (
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between text-white">
                  {/* Top Bar inside active blade */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-black/80 border border-white/20 text-brand-yellow font-bold uppercase">
                      {isFa ? project.categoryFa : project.categoryEn}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/20 border border-white/20 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bottom Information */}
                  <div className="flex flex-row items-end justify-between gap-4">
                    <div className="max-w-md">
                      <h3 className="text-4xl font-bold tracking-tight mb-1 text-white drop-shadow-md">
                        {isFa ? project.titleFa : project.titleEn}
                      </h3>
                      <p className="text-sm text-neutral-200 line-clamp-2 drop-shadow">
                        {isFa ? project.descFa : project.descEn}
                      </p>
                    </div>

                    <Link
                      to={`/work/${project.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-5 py-3 rounded-2xl bg-brand-yellow text-brand-dark font-bold text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-xl shrink-0 cursor-pointer"
                    >
                      <span>{isFa ? 'مشاهده پرونده' : 'Inspect Case'}</span>
                      <ArrowUpRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              ) : (
                /* ================= IF COLLAPSED: VERTICAL PILLAR ================= */
                <div className="relative z-10 w-full h-full p-3 flex flex-col items-center justify-between text-white">
                  {/* Project Number */}
                  <span className="w-6 h-6 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono font-bold flex items-center justify-center text-brand-yellow">
                    0{idx + 1}
                  </span>

                  {/* Vertical Label on Desktop */}
                  <div className="flex items-center justify-center my-auto">
                    <span 
                      className="font-bold text-xs tracking-wider uppercase text-neutral-200 whitespace-nowrap opacity-80"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {isFa ? project.titleFa : project.titleEn}
                    </span>
                  </div>

                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Floating Modern Kinetic Pagination Strip */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onSelect(idx)}
              className="group py-2 px-1 focus:outline-none cursor-pointer"
              aria-label={`Select Project ${idx + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-10 bg-brand-yellow shadow-[0_0_10px_#fff083]'
                    : isNight
                      ? 'w-2.5 bg-white/20 hover:bg-white/40'
                      : 'w-2.5 bg-black/20 hover:bg-black/40'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={isFa ? handleNext : handlePrev}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isNight
                ? 'border-white/15 bg-white/5 hover:border-brand-yellow hover:text-brand-yellow text-white'
                : 'border-black/15 bg-black/5 hover:border-[#b3a85c] hover:text-[#b3a85c] text-brand-dark'
            }`}
            aria-label="Previous Project"
          >
            {isFa ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={isFa ? handlePrev : handleNext}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isNight
                ? 'border-white/15 bg-white/5 hover:border-brand-yellow hover:text-brand-yellow text-white'
                : 'border-black/15 bg-black/5 hover:border-[#b3a85c] hover:text-[#b3a85c] text-brand-dark'
            }`}
            aria-label="Next Project"
          >
            {isFa ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
