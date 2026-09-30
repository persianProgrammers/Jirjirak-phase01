import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../../stores/globalStore';
import { useTranslation } from '../../i18n/translations';
import { AnimatedJirjirakLogo } from '../ui/AnimatedJirjirakLogo';

const LANDING_SECTIONS = [
  { id: 'hero' },
  { id: 'world' },
  { id: 'services' },
  { id: 'work' },
  { id: 'about' },
  { id: 'journal' },
  { id: 'contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const isHomePage = location.pathname === '/';

  // Smooth Section Jump with Lenis Integration
  const handleNavClick = (e: React.MouseEvent, href: string, to: string) => {
    if (href.startsWith('#') && isHomePage) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, { offset: -30, duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('#')) {
      e.preventDefault();
      navigate(to);
    }
  };

  // Direction-Aware Smart Conceal & Active Section Detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY.current;

          setIsScrolled(currentScrollY > 45);

          if (currentScrollY <= 45) {
            setIsVisible(true);
          } else if (diff > 6 && currentScrollY > 120) {
            setIsVisible(false);
          } else if (diff < -6) {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;

          if (isHomePage) {
            const probeY = 140;
            for (const section of LANDING_SECTIONS) {
              const el = document.getElementById(section.id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= probeY && rect.bottom > probeY) {
                  setActiveSectionId(section.id);
                  break;
                }
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 35) {
        setIsVisible(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navLinks = [
    { href: '#world', to: '/#world', label: t.nav.world, id: 'world' },
    { href: '#services', to: '/#services', label: t.nav.services, id: 'services' },
    { href: '#work', to: '/#work', label: t.nav.work, id: 'work' },
    { href: '/about', to: '/about', label: t.nav.about, id: 'about' },
    { href: '/journal', to: '/journal', label: t.nav.journal, id: 'journal' },
    { href: '/contact', to: '/contact', label: t.nav.contact, id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isScrolled 
          ? 'pt-4 px-6' 
          : 'pt-6 px-16'
      }`}
    >
      <div 
        className={`mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-4xl rounded-full px-7 py-2.5 backdrop-blur-2xl shadow-xl border'
            : 'max-w-[1600px] w-full py-1 bg-transparent border-transparent'
        } ${
          isNight
            ? (isScrolled 
                ? 'bg-brand-dark/95 border-white/10 text-brand-light shadow-[0_12px_40px_rgba(0,0,0,0.5)]' 
                : 'text-brand-light')
            : (isScrolled 
                ? 'bg-brand-light/95 border-brand-dark/15 text-brand-dark shadow-[0_12px_40px_rgba(0,0,0,0.08)]' 
                : 'text-brand-dark')
        }`}
      >
        <div className="flex items-center justify-between w-full relative z-10">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center group focus:outline-none" 
            aria-label="Jirjirak Studio"
          >
            <AnimatedJirjirakLogo 
              variant={isNight ? 'header' : 'footer'}
              className={`transition-all duration-300 ${
                isScrolled ? 'h-9 w-auto' : 'h-11 w-auto'
              }`} 
            />
          </Link>

          {/* Desktop Navigation Links with Magnetic Floating Pill */}
          <nav 
            className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase relative"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((item) => {
              const isActive = isHomePage && activeSectionId === item.id;

              return (
                <div key={item.id} className="relative">
                  {hoveredNav === item.id && (
                    <motion.div
                      layoutId="headerHoverPill"
                      className={`absolute inset-0 rounded-full pointer-events-none -z-10 ${
                        isNight ? 'bg-white/12' : 'bg-black/8'
                      }`}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  {item.href.startsWith('#') && isHomePage ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.to)}
                      onMouseEnter={() => setHoveredNav(item.id)}
                      className={`px-3.5 py-1.5 rounded-full transition-colors duration-200 block select-none ${
                        isActive
                          ? (isNight ? 'text-brand-yellow font-bold' : 'text-[#b3a85c] font-bold')
                          : (isNight ? 'text-white/85 hover:text-brand-yellow' : 'text-brand-dark/85 hover:text-[#b3a85c]')
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={(e) => handleNavClick(e, item.href, item.to)}
                      onMouseEnter={() => setHoveredNav(item.id)}
                      className={`px-3.5 py-1.5 rounded-full transition-colors duration-200 block select-none ${
                        location.pathname === item.to
                          ? (isNight ? 'text-brand-yellow font-bold' : 'text-[#b3a85c] font-bold')
                          : (isNight ? 'text-white/85 hover:text-brand-yellow' : 'text-brand-dark/85 hover:text-[#b3a85c]')
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="flex items-center gap-3">
            <a 
              href="#world" 
              onClick={(e) => handleNavClick(e, '#world', '/#world')}
              className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 select-none shadow-sm ${
                isNight
                  ? 'border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark hover:shadow-[0_0_15px_rgba(255,240,131,0.4)]'
                  : 'border border-[#b3a85c] text-[#b3a85c] hover:bg-[#b3a85c] hover:text-brand-dark hover:shadow-[0_0_15px_rgba(179,168,92,0.3)]'
              }`}
            >
              {t.nav.enterWorld}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
