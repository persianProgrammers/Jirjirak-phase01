import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, FolderGit2, Layers, Sparkles } from 'lucide-react';
import { useGlobalStore } from '../../../stores/globalStore';
import { ProjectItem, getRelatedProjects } from '../../../data/projectsData';

interface RelatedProjectsSectionProps {
  currentProject: ProjectItem;
}

export function RelatedProjectsSection({ currentProject }: RelatedProjectsSectionProps) {
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  // Retrieve projects related to the current project's department
  const relatedProjects = getRelatedProjects(currentProject.id, currentProject.departmentId, 3);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="related-projects"
      className={`py-28 px-16 border-t transition-colors duration-700 ${
        isNight 
          ? 'bg-[#151619] border-white/10 text-white' 
          : 'bg-[#f4f3ed] border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            {/* Step / Department Archive Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="text-[11px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md border"
                style={{ 
                  color: currentProject.accentColor || '#fff083',
                  borderColor: `${currentProject.accentColor || '#fff083'}40`,
                  backgroundColor: `${currentProject.accentColor || '#fff083'}15`
                }}
              >
                {isFa ? 'هم‌دپارتمان' : 'DEPARTMENT ARCHIVE'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
              <span className="text-xs font-semibold text-neutral-400">
                {isFa ? currentProject.departmentNameFa : currentProject.departmentNameEn}
              </span>
            </div>

            <h2 className="text-5xl font-bold tracking-tight mb-3">
              {isFa ? 'پروژه‌های مرتبط استودیو' : 'Related Studio Works'}
            </h2>
            <p className={`text-base leading-relaxed ${
              isNight ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              {isFa
                ? `آثاری که با زبان طراحی، رویکرد مهندسی و استانداردهای دپارتمان ${currentProject.departmentNameFa} هم‌راستا هستند.`
                : `Curated works sharing the structural language, craft, and engineering ethos of the ${currentProject.departmentNameEn} department.`}
            </p>
          </div>

          {/* View All Works in Portfolio button */}
          <Link
            to="/#work"
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-2xl border transition-all shrink-0 ${
              isNight
                ? 'border-white/15 bg-white/5 hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow text-white'
                : 'border-neutral-300 bg-white hover:bg-brand-dark hover:text-white hover:border-brand-dark text-neutral-800 shadow-sm'
            }`}
          >
            <span>{isFa ? 'مشاهده تمام پروژه‌ها' : 'Explore All Portfolio'}</span>
            <ArrowUpRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        {/* 3 Related Project Cards Grid */}
        <div className="grid grid-cols-3 gap-8">
          {relatedProjects.map((project, idx) => {
            const isSameDepartment = project.departmentId === currentProject.departmentId;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-500 relative ${
                  isNight
                    ? 'bg-[#1c1d22]/90 border-white/10 hover:border-brand-yellow/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                    : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-xl'
                }`}
              >
                {/* Accent Top Border Glow on Hover */}
                <div 
                  className="h-1.5 w-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: project.accentColor || '#fff083' }}
                />

                {/* Card Media Preview */}
                <div className="relative w-full h-[240px] overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={isFa ? project.titleFa : project.titleEn}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('public/')) {
                        target.src = `/public${project.image.startsWith('/') ? '' : '/'}${project.image}`;
                      }
                    }}
                  />
                  
                  {/* Subtle Gradient Shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badges overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span 
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider backdrop-blur-md border uppercase text-white"
                      style={{
                        backgroundColor: `${project.accentColor || '#fff083'}30`,
                        borderColor: `${project.accentColor || '#fff083'}60`,
                      }}
                    >
                      {isFa ? project.departmentNameFa : project.departmentNameEn}
                    </span>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md border border-white/15 text-brand-yellow">
                      {project.step}
                    </span>
                  </div>

                  {/* Match Indicator Pill if same department */}
                  {isSameDepartment && (
                    <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 z-10 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[10px] font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{isFa ? 'دپارتمان مشترک' : 'Same Department'}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category & Client */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                      <span>{isFa ? project.categoryFa : project.categoryEn}</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-brand-yellow transition-colors">
                      {isFa ? project.titleFa : project.titleEn}
                    </h3>

                    {/* Description */}
                    <p className={`text-[13px] leading-relaxed line-clamp-2 mb-4 ${
                      isNight ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {isFa ? project.descFa : project.descEn}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack?.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                            isNight 
                              ? 'bg-white/5 border-white/10 text-neutral-300' 
                              : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Inspect Case Action Link */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-neutral-400">
                      {project.client}
                    </span>

                    <Link
                      to={`/work/${project.id}`}
                      onClick={scrollToTop}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-yellow text-brand-dark hover:bg-yellow-300 transition-all duration-200 shadow-md group-hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>{isFa ? 'مشاهده پرونده' : 'Inspect Case'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default RelatedProjectsSection;
