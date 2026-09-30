import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, Calendar, Building, Sparkles } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { getProjectById, ALL_PROJECTS } from '../data/projectsData';
import { CaseStudySection } from '../features/landing/sections/CaseStudySection';
import { RelatedProjectsSection } from '../features/landing/sections/RelatedProjectsSection';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';

  // Find project by id or fallback to Toyooran (04 / 08)
  const project = (id ? getProjectById(id) : undefined) || ALL_PROJECTS[0];

  // Scroll to top upon loading a project
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <div className="w-full min-h-screen">
      {/* ================= PROJECT HEADER & CINEMATIC BREADCRUMB ================= */}
      <section 
        className={`pt-32 pb-14 px-16 border-b transition-colors duration-700 relative overflow-hidden ${
          isNight 
            ? 'bg-[#101114] border-white/10 text-white' 
            : 'bg-[#f7f6f0] border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-20 pointer-events-none blur-[100px] rounded-full"
          style={{ backgroundColor: project.accentColor || '#fff083' }}
        />

        <div className="max-w-[1600px] mx-auto w-full relative z-10">
          
          {/* Breadcrumbs & Navigation Bar */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 text-sm font-mono text-neutral-400">
              <Link 
                to="/" 
                className="hover:text-brand-yellow transition-colors font-sans"
              >
                {isFa ? 'استودیو جیرجیرک' : 'Jirjirak Studio'}
              </Link>
              <span>/</span>
              <Link 
                to="/#work" 
                className="hover:text-brand-yellow transition-colors font-sans"
              >
                {isFa ? 'پروژه‌ها' : 'Work Archive'}
              </Link>
              <span>/</span>
              <span 
                className="font-bold font-mono"
                style={{ color: project.accentColor || '#fff083' }}
              >
                {project.step}
              </span>
            </div>

            {/* Back Button */}
            <Link
              to="/#work"
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                isNight
                  ? 'border-white/10 bg-white/5 text-neutral-300 hover:text-brand-yellow hover:border-brand-yellow/40'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:text-brand-dark hover:border-brand-dark/40 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{isFa ? 'بازگشت به لندینگ' : 'Back to Home'}</span>
            </Link>
          </div>

          {/* Main Project Hero Header */}
          <div className="flex flex-row items-end justify-between gap-8">
            <div className="max-w-3xl">
              {/* Category & Department Chips */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider border uppercase"
                  style={{
                    backgroundColor: `${project.accentColor || '#fff083'}20`,
                    borderColor: `${project.accentColor || '#fff083'}50`,
                    color: isNight ? (project.accentColor || '#fff083') : '#8c8035',
                  }}
                >
                  {isFa ? project.departmentNameFa : project.departmentNameEn}
                </span>

                <span className="text-xs font-mono text-neutral-400">
                  {isFa ? project.categoryFa : project.categoryEn}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-7xl font-bold tracking-tight mb-4">
                {isFa ? project.titleFa : project.titleEn}
              </h1>

              {/* Tagline / Description */}
              <p className={`text-xl leading-relaxed max-w-2xl ${
                isNight ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {isFa ? project.descFa : project.descEn}
              </p>
            </div>

            {/* Quick Metadata Box */}
            <div className={`p-6 rounded-3xl border flex flex-col gap-4 min-w-[320px] ${
              isNight ? 'bg-[#18191d]/80 border-white/10' : 'bg-white border-neutral-200 shadow-md'
            }`}>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  {isFa ? 'کارفرما' : 'Client'}
                </span>
                <span className="font-bold">{project.client}</span>
              </div>

              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {isFa ? 'سال انتشار' : 'Year'}
                </span>
                <span className="font-mono font-bold">{project.year}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isFa ? 'دپارتمان تخصصی' : 'Department'}
                </span>
                <span className="font-semibold text-brand-yellow truncate max-w-[150px]">
                  {isFa ? project.departmentNameFa : project.departmentNameEn}
                </span>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark hover:bg-yellow-300 transition-colors shadow-md"
                >
                  <span>{isFa ? 'مشاهده وب‌سایت زنده پروژه' : 'Launch Live Project'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 04 / 08 CASE STUDY SECTION ================= */}
      <CaseStudySection project={project} showBackLink={false} />

      {/* ================= RELATED PROJECTS SECTION (DEPARTMENT HARMONY) ================= */}
      <RelatedProjectsSection currentProject={project} />
    </div>
  );
}
