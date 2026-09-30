import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { ALL_PROJECTS } from '../data/projectsData';

export default function Work() {
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const departments = [
    { id: 'all', labelEn: 'All Departments', labelFa: 'تمامی دپارتمان‌ها' },
    { id: 'web-dev', labelEn: 'Web & Development', labelFa: 'وب و نرم‌افزار' },
    { id: 'branding-identity', labelEn: 'Branding & Identity', labelFa: 'برندینگ و هویت' },
    { id: 'game-studio', labelEn: 'Game Studio', labelFa: 'بازی‌سازی و تعاملی' },
    { id: 'creative-studio', labelEn: 'Creative Studio', labelFa: 'استودیو خلاقیت' },
    { id: 'digital-marketing', labelEn: 'Digital Marketing', labelFa: 'مارکتینگ و رشد' },
    { id: 'seo-analytics', labelEn: 'SEO & Analytics', labelFa: 'سئو و داده' },
    { id: 'academy-learning', labelEn: 'Academy', labelFa: 'آکادمی دانای جیرجیرک' },
  ];

  const filteredProjects = selectedDept === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.departmentId === selectedDept);

  return (
    <div className={`w-full min-h-screen pt-32 pb-24 px-16 transition-colors duration-700 ${
      isNight ? 'bg-[#101114] text-white' : 'bg-[#f7f6f0] text-neutral-900'
    }`}>
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-md bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30">
              08 ARCHIVES
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              {isFa ? 'آرشیو آثار و پروژه‌های استودیو' : 'Studio Master Works'}
            </span>
          </div>

          <h1 className="text-6xl font-bold tracking-tight mb-4 text-brand-yellow">
            {isFa ? 'پرونده‌های تخصصی استودیو' : 'Studio Project Archive'}
          </h1>
          <p className={`text-lg leading-relaxed ${
            isNight ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            {isFa 
              ? 'مجموعه‌ای از نوآوری‌ها، ساختارهای مهندسی و تجارب تعاملی که در دپارتمان‌های مختلف استودیو جیرجیرک خلق شده‌اند. هر پرونده روایتی از حل مسئله و خلق ارزش پایدار است.'
              : 'A curated showcase of engineering architecture, sensory visual identities, and interactive worlds engineered across Jirjirak Studio departments.'}
          </p>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 pr-2 rtl:pr-0 rtl:pl-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>{isFa ? 'فیلتر دپارتمان:' : 'Filter:'}</span>
          </div>
          {departments.map((dept) => {
            const isActive = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-md font-bold'
                    : isNight
                      ? 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/25 hover:bg-white/10'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                {isFa ? dept.labelFa : dept.labelEn}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={`group rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-500 relative ${
                isNight
                  ? 'bg-[#18191e]/90 border-white/10 hover:border-brand-yellow/50 hover:shadow-2xl'
                  : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-xl'
              }`}
            >
              {/* Top Accent Strip */}
              <div 
                className="h-1.5 w-full opacity-80"
                style={{ backgroundColor: project.accentColor || '#fff083' }}
              />

              {/* Media Preview */}
              <div className="relative w-full h-[230px] overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={isFa ? project.titleFa : project.titleEn}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('public/')) {
                      target.src = `/public${project.image.startsWith('/') ? '' : '/'}${project.image}`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

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

                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md border border-white/15 text-brand-yellow">
                    {project.step}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                    <span>{isFa ? project.categoryFa : project.categoryEn}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-brand-yellow transition-colors">
                    {isFa ? project.titleFa : project.titleEn}
                  </h3>

                  <p className={`text-[13px] leading-relaxed line-clamp-2 mb-4 ${
                    isNight ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {isFa ? project.descFa : project.descEn}
                  </p>

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

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-400">
                    {project.client}
                  </span>

                  <Link
                    to={`/work/${project.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-yellow text-brand-dark hover:bg-yellow-300 transition-all duration-200 shadow-md group-hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{isFa ? 'مشاهده پرونده' : 'Inspect Case'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
