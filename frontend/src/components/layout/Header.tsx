import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Creative animation variants
  const menuVariants = {
    closed: { 
      clipPath: "circle(0% at 100% 0%)",
      transition: { type: "spring", bounce: 0, duration: 0.8 }
    },
    open: { 
      clipPath: "circle(150% at 100% 0%)",
      transition: { type: "spring", bounce: 0, duration: 0.8 }
    }
  };

  const navItemVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i: number) => ({
      y: 0, 
      opacity: 1,
      transition: { delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[60] px-8 lg:px-12 xl:px-16 py-6 pointer-events-none mix-blend-difference text-white">
        <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between pointer-events-auto">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img src="/assets/logos/logo-header.svg" alt="Jirjirak Studio" className="h-10 md:h-12 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide uppercase">
            <a href="#world" className="hover:text-brand-yellow transition-colors">World</a>
            <a href="#work" className="hover:text-brand-yellow transition-colors">Work</a>
            <a href="#services" className="hover:text-brand-yellow transition-colors">What We Do</a>
            <Link to="/about" className="hover:text-brand-yellow transition-colors">About</Link>
            <Link to="/journal" className="hover:text-brand-yellow transition-colors">Journal</Link>
            <Link to="/contact" className="hover:text-brand-yellow transition-colors">Contact</Link>
          </nav>
          
          <div className="hidden md:block">
            <a href="#world" className="px-5 py-2 border border-brand-yellow text-brand-yellow rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-yellow hover:text-brand-dark transition-colors">
              Enter World
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[70] relative"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-8 h-0.5 bg-brand-yellow block transition-colors" 
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
              className="w-8 h-0.5 bg-white block transition-colors" 
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-8 h-0.5 bg-brand-yellow block transition-colors" 
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col justify-center px-8 sm:px-12"
          >
            {/* Decorative Fireflies Background for Mobile Menu */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-center">
              <div className="w-[300px] h-[300px] bg-brand-yellow rounded-full filter blur-[100px]"></div>
            </div>

            <nav className="flex flex-col gap-6 text-3xl font-bold tracking-tight uppercase relative z-10">
              {['world', 'work', 'services'].map((item, i) => (
                <motion.div custom={i} variants={navItemVariants} initial="closed" animate="open" exit="closed" key={item}>
                  <a 
                    href={`#${item}`} 
                    onClick={closeMenu}
                    className="hover:text-brand-yellow transition-colors inline-block"
                  >
                    {item === 'services' ? 'What We Do' : item}
                  </a>
                </motion.div>
              ))}
              {['about', 'journal', 'contact'].map((item, i) => (
                <motion.div custom={i + 3} variants={navItemVariants} initial="closed" animate="open" exit="closed" key={item}>
                  <Link 
                    to={`/${item}`} 
                    onClick={closeMenu}
                    className="hover:text-brand-yellow transition-colors inline-block"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              custom={6} variants={navItemVariants} initial="closed" animate="open" exit="closed"
              className="mt-12 relative z-10"
            >
              <a href="#world" onClick={closeMenu} className="inline-block px-6 py-3 border border-brand-yellow text-brand-yellow rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-brand-yellow hover:text-brand-dark transition-colors">
                Enter World
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
