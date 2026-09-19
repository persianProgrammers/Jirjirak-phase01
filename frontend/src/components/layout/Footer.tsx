import { Link } from 'react-router-dom';
import { useGlobalStore } from '../../stores/globalStore';
import { useTranslation } from '../../i18n/translations';

export function Footer() {
  const { currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  return (
    <footer className="bg-brand-light text-brand-dark px-8 lg:px-12 xl:px-16 py-12 border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium uppercase tracking-wider gap-6 md:gap-4">
        <Link to="/" className="flex items-center">
          <img src="/assets/logos/logo-footer.svg" alt="Jirjirak Studio" className="h-8 md:h-10 w-auto" />
        </Link>
        
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="#world" className="hover:text-brand-gray transition-colors">{t.nav.world}</a>
          <a href="#work" className="hover:text-brand-gray transition-colors">{t.nav.work}</a>
          <a href="#services" className="hover:text-brand-gray transition-colors">{t.nav.services}</a>
          <Link to="/about" className="hover:text-brand-gray transition-colors">{t.nav.about}</Link>
          <Link to="/journal" className="hover:text-brand-gray transition-colors">{t.nav.journal}</Link>
          <Link to="/contact" className="hover:text-brand-gray transition-colors">{t.nav.contact}</Link>
        </nav>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="hover:text-brand-gray transition-colors">TW</a>
          <a href="#" className="hover:text-brand-gray transition-colors">IN</a>
          <a href="#" className="hover:text-brand-gray transition-colors">BE</a>
          <span className="text-brand-gray mx-2">{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
