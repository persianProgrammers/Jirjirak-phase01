import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';
import {
  ALL_TEAM_MEMBERS,
  MemberData,
} from '../components/team-models/teamData';
import {
  DEPARTMENT_GROUPS,
} from '../components/team-models/DepartmentFilterLab';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

export function VisionaryTeamShowcase() {
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const dossierCardRef = useRef<HTMLDivElement>(null);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  // Department cluster filter
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const filteredMembers = useMemo(() => {
    if (selectedGroup === 'all') return ALL_TEAM_MEMBERS;
    const group = DEPARTMENT_GROUPS.find((g) => g.id === selectedGroup);
    if (!group) return ALL_TEAM_MEMBERS;
    return ALL_TEAM_MEMBERS.filter((m) => group.deptKeys.includes(m.department));
  }, [selectedGroup]);

  // Selected active member
  const [selectedMemberId, setSelectedMemberId] = useState<string>(ALL_TEAM_MEMBERS[0].id);

  // Sync if member filtered out
  useEffect(() => {
    if (!filteredMembers.some((m) => m.id === selectedMemberId)) {
      if (filteredMembers.length > 0) {
        setSelectedMemberId(filteredMembers[0].id);
      }
    }
  }, [filteredMembers, selectedMemberId]);

  const activeMember =
    filteredMembers.find((m) => m.id === selectedMemberId) || filteredMembers[0] || ALL_TEAM_MEMBERS[0];

  const currentIdx = filteredMembers.findIndex((m) => m.id === activeMember.id);

  // Correct direction arrows:
  // In RTL (Persian): Next (بعدی) moves forward to the LEFT (ChevronLeft), Prev (قبلی) moves back to the RIGHT (ChevronRight)
  // In LTR (English): Next moves forward to the RIGHT (ChevronRight), Prev moves back to the LEFT (ChevronLeft)
  const handlePrev = () => {
    const prev = (currentIdx - 1 + filteredMembers.length) % filteredMembers.length;
    setSelectedMemberId(filteredMembers[prev].id);
  };

  const handleNext = () => {
    const next = (currentIdx + 1) % filteredMembers.length;
    setSelectedMemberId(filteredMembers[next].id);
  };

  const handleMobileSelect = (id: string) => {
    setSelectedMemberId(id);
    if (dossierCardRef.current) {
      dossierCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Brand Color Tokens:
  // In About Section, when isNight is true: background is light (#e9e9e9), text is dark (#222222), accent is olive (#b3a85c).
  // When isNight is false: background is dark (#222222), text is light (#e9e9e9), accent is yellow (#fff083).
  const sectionBgClass = isNight
    ? 'bg-brand-light text-brand-dark'
    : 'bg-brand-dark text-brand-light';
  const cardBgClass = isNight
    ? 'bg-white border-neutral-300 text-brand-dark shadow-sm'
    : 'bg-brand-surface border-brand-surface-light text-brand-light shadow-xl';
  const accentText = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const accentBg = isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark';
  const accentBorder = isNight ? 'border-[#b3a85c]' : 'border-brand-yellow';

  return (
    <section
      id="visionary-team"
      className={`w-full py-20 px-4 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 ease-in-out border-t ${
        isNight ? 'border-neutral-300' : 'border-white/10'
      } ${sectionBgClass}`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-8">

        {/* 1. SECTION HEADER: Title & Clean Cluster Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10 dark:border-white/10 border-neutral-300">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-mono font-bold tracking-widest uppercase ${accentText}`}>
                {isFa ? 'استودیو جیرجیرک' : 'JIRJIRAK STUDIO'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
              <span className="text-xs font-mono opacity-60">
                {isFa ? `${filteredMembers.length} متخصص` : `${filteredMembers.length} Specialists`}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {isFa ? 'اعضا و متخصصین استودیو' : 'Studio Atelier & Team'}
            </h2>
          </div>

          {/* Quick Cluster Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                selectedGroup === 'all'
                  ? `${accentBg} ${accentBorder} font-bold shadow-sm`
                  : isNight
                  ? 'bg-neutral-200/70 text-neutral-800 border-neutral-300 hover:border-black'
                  : 'bg-white/5 text-brand-light/75 border-white/10 hover:border-white/30'
              }`}
            >
              {isFa ? 'همه اعضا' : 'All Team'}
            </button>
            {DEPARTMENT_GROUPS.map((g) => {
              const isSel = selectedGroup === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroup(g.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isSel
                      ? `${accentBg} ${accentBorder} font-bold shadow-sm`
                      : isNight
                      ? 'bg-neutral-200/70 text-neutral-800 border-neutral-300 hover:border-black'
                      : 'bg-white/5 text-brand-light/75 border-white/10 hover:border-white/30'
                  }`}
                >
                  {isFa ? g.nameFa : g.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. THE SPOTLIGHT DOSSIER CANVAS */}
        <div className="w-full flex flex-col gap-4">

          {/* 📱 MOBILE ONLY (< lg): Top Horizontal Quick-Avatar Selector Track */}
          <div
            className={`lg:hidden w-full rounded-2xl p-3 border transition-colors duration-500 flex flex-col gap-2.5 ${cardBgClass}`}
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-bold opacity-75">{isFa ? 'انتخاب عضو:' : 'Member:'}</span>
                <span className={`font-bold ${accentText}`}>0{currentIdx + 1} / 0{filteredMembers.length}</span>
              </div>

              {/* Navigation Arrows with Correct RTL/LTR Orientation */}
              <div className="flex items-center gap-1">
                {/* Previous (قبلی) */}
                <button
                  onClick={handlePrev}
                  title={isFa ? 'قبلی' : 'Previous'}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isNight
                      ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                      : 'border-white/15 hover:bg-white/10 text-brand-light'
                  }`}
                >
                  {isFa ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                </button>

                {/* Next (بعدی) */}
                <button
                  onClick={handleNext}
                  title={isFa ? 'بعدی' : 'Next'}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isNight
                      ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                      : 'border-white/15 hover:bg-white/10 text-brand-light'
                  }`}
                >
                  {isFa ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Horizontal Avatar Pill Track */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar snap-x">
              {filteredMembers.map((m, idx) => {
                const isSel = m.id === activeMember.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleMobileSelect(m.id)}
                    className={`snap-start shrink-0 flex items-center gap-2 p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isSel
                        ? isNight
                          ? 'bg-neutral-100 border-[#b3a85c] shadow-sm scale-105 font-bold'
                          : 'bg-white/15 border-brand-yellow shadow-md scale-105 font-bold'
                        : isNight
                        ? 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        : 'bg-black/30 border-white/5 text-brand-light/70'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 transition-colors ${
                        isSel ? (isNight ? 'border-[#b3a85c]' : 'border-brand-yellow') : 'border-transparent'
                      }`}
                    >
                      <img src={m.image} alt={m.nameEn} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col text-left rtl:text-right pr-1">
                      <span className="text-xs font-bold whitespace-nowrap">
                        {isFa ? m.nameFa.split(' ')[0] : m.nameEn.split(' ')[0]}
                      </span>
                      <span className="text-[9px] font-mono opacity-60">0{idx + 1}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Toggle button to open/close full editorial list on mobile */}
            <button
              onClick={() => setIsMobileListOpen(!isMobileListOpen)}
              className={`py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                isNight
                  ? 'bg-neutral-50 hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-brand-light'
              }`}
            >
              <span>
                {isMobileListOpen
                  ? isFa
                    ? 'بستن فهرست ▲'
                    : 'Close List ▲'
                  : isFa
                  ? 'مشاهده فهرست کامل اعضا ▼'
                  : 'View Full List ▼'}
              </span>
            </button>
          </div>

          {/* 📱 MOBILE EXPANDABLE FULL ROSTER LIST */}
          {isMobileListOpen && (
            <div className={`lg:hidden rounded-2xl p-4 border transition-all ${cardBgClass}`}>
              <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
                {filteredMembers.map((m, i) => {
                  const isSel = m.id === activeMember.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        handleMobileSelect(m.id);
                        setIsMobileListOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-left rtl:text-right border ${
                        isSel
                          ? isNight
                            ? 'bg-neutral-100 border-[#b3a85c] shadow-sm font-bold'
                            : 'bg-white/10 border-brand-yellow/60 shadow-md font-bold'
                          : isNight
                          ? 'border-transparent hover:bg-neutral-50 text-neutral-700'
                          : 'border-transparent hover:bg-white/5 text-brand-light/75'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`text-xs font-mono font-bold w-5 ${isSel ? accentText : 'opacity-40'}`}>
                          0{i + 1}
                        </span>
                        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-current opacity-80">
                          <img src={m.image} alt={m.nameEn} className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">{isFa ? m.nameFa : m.nameEn}</span>
                          <span className={`text-[10px] block truncate ${isNight ? 'text-neutral-500' : 'text-brand-gray'}`}>
                            {isFa ? m.roleFa : m.roleEn}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono ${isSel ? accentText : 'opacity-40'}`}>
                        {isSel ? (isFa ? 'فعال ✓' : 'Active ✓') : (isFa ? 'انتخاب' : 'Select')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MAIN CONTAINER: Desktop 2-Cols Grid, Mobile Single Column with In-View Dossier Card */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* DESKTOP ONLY: Left 5-Column Editorial Roster List */}
            <div
              className={`hidden lg:flex lg:col-span-5 rounded-3xl p-5 border flex-col justify-between gap-4 transition-colors duration-500 ${cardBgClass}`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 dark:border-white/10 border-neutral-200">
                  <span className="text-xs font-mono font-bold uppercase opacity-60">
                    {isFa ? 'فهرست متخصصین استودیو' : 'ATELIER ROSTER'} ({filteredMembers.length})
                  </span>
                  <span className="text-xs font-mono opacity-50">
                    0{currentIdx + 1} / 0{filteredMembers.length}
                  </span>
                </div>

                {/* Scrollable list */}
                <div className="flex flex-col gap-1.5 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                  {filteredMembers.map((m, i) => {
                    const isSel = m.id === activeMember.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMemberId(m.id)}
                        className={`group w-full p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-left rtl:text-right border ${
                          isSel
                            ? isNight
                              ? 'bg-neutral-100 border-[#b3a85c] shadow-sm font-bold'
                              : 'bg-white/10 border-brand-yellow/60 shadow-md font-bold'
                            : isNight
                            ? 'border-transparent hover:bg-neutral-50 text-neutral-700 hover:text-black'
                            : 'border-transparent hover:bg-white/5 text-brand-light/75 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <span
                            className={`text-xs font-mono font-bold w-6 text-center ${
                              isSel ? accentText : 'opacity-40'
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-current opacity-80">
                            <img
                              src={m.image}
                              alt={m.nameEn}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-bold">
                                {isFa ? m.nameFa : m.nameEn}
                              </span>
                              {m.isFounder && (
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                                    isNight ? 'bg-[#b3a85c]/20 text-[#b3a85c]' : 'bg-brand-yellow/20 text-brand-yellow'
                                  }`}
                                >
                                  LEAD
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-[11px] block truncate ${
                                isNight ? 'text-neutral-500' : 'text-brand-gray'
                              }`}
                            >
                              {isFa ? m.roleFa : m.roleEn}
                            </span>
                          </div>
                        </div>

                        <ArrowUpRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSel ? 'rotate-45 opacity-100 ' + accentText : 'opacity-30 group-hover:opacity-75'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation with Correct RTL/LTR Arrow Orientation */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 dark:border-white/10 border-neutral-200">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className={accentText}>0{currentIdx + 1}</span>
                  <span className="opacity-40">/</span>
                  <span className="opacity-60">0{filteredMembers.length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Previous (قبلی) */}
                  <button
                    onClick={handlePrev}
                    title={isFa ? 'قبلی' : 'Previous'}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isNight
                        ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                        : 'border-white/15 hover:bg-white/10 text-brand-light'
                    }`}
                  >
                    {isFa ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>

                  {/* Next (بعدی) */}
                  <button
                    onClick={handleNext}
                    title={isFa ? 'بعدی' : 'Next'}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isNight
                        ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                        : 'border-white/15 hover:bg-white/10 text-brand-light'
                    }`}
                  >
                    {isFa ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Spotlight Dossier Card (Desktop: 7 Cols, Mobile: 100% In-View) */}
            <div
              ref={dossierCardRef}
              className={`col-span-1 lg:col-span-7 rounded-3xl p-5 sm:p-8 border flex flex-col justify-between relative overflow-hidden transition-colors duration-500 ${cardBgClass}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex flex-col gap-6"
                >
                  {/* Top Bar with Code & Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${accentBorder} ${accentText}`}>
                      {activeMember.code}
                    </span>
                    <span className={`text-xs font-mono font-bold ${accentText}`}>
                      {isFa ? activeMember.badgeFa : activeMember.badgeEn}
                    </span>
                  </div>

                  {/* Main Profile & Photo */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    {/* Photo Box */}
                    <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 border-neutral-300 bg-neutral-900 group shadow-lg">
                      <img
                        src={activeMember.image}
                        alt={activeMember.nameEn}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-sm font-bold block">
                          {isFa ? activeMember.nameFa : activeMember.nameEn}
                        </span>
                        <span className="text-xs opacity-75 block truncate">
                          {isFa ? activeMember.roleFa : activeMember.roleEn}
                        </span>
                      </div>
                    </div>

                    {/* Bio & Details */}
                    <div className="sm:col-span-7 flex flex-col gap-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                          {isFa ? activeMember.nameFa : activeMember.nameEn}
                        </h3>
                        <p className={`text-sm font-semibold ${accentText}`}>
                          {isFa ? activeMember.roleFa : activeMember.roleEn}
                        </p>
                      </div>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isNight ? 'text-neutral-700' : 'text-brand-gray'
                        }`}
                      >
                        {isFa ? activeMember.bioFa : activeMember.bioEn}
                      </p>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(isFa ? activeMember.skillsFa : activeMember.skillsEn).map((sk) => (
                          <span
                            key={sk}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                              isNight
                                ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                                : 'bg-white/5 border-white/10 text-brand-light/90'
                            }`}
                          >
                            #{sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom 3-Stat Meters */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 dark:border-white/10 border-neutral-200">
                    {activeMember.stats.map((st, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-center ${
                          isNight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/20 border-white/5'
                        }`}
                      >
                        <span className="text-[10px] font-mono opacity-60 block truncate mb-0.5">
                          {isFa ? st.labelFa : st.labelEn}
                        </span>
                        <span className={`text-xs sm:text-sm font-bold block truncate ${accentText}`}>
                          {st.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
