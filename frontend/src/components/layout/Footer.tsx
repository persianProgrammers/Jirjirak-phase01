import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-brand-light text-brand-dark px-8 lg:px-12 xl:px-16 py-12 border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium uppercase tracking-wider">
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <img src="/assets/logos/logo-footer.svg" alt="Jirjirak Studio" className="h-8 md:h-10 w-auto" />
        </Link>
        
        <nav className="flex gap-6 mb-4 md:mb-0">
          <a href="#world" className="hover:text-brand-gray transition-colors">World</a>
          <a href="#work" className="hover:text-brand-gray transition-colors">Work</a>
          <a href="#services" className="hover:text-brand-gray transition-colors">What We Do</a>
          <Link to="/about" className="hover:text-brand-gray transition-colors">About</Link>
          <Link to="/journal" className="hover:text-brand-gray transition-colors">Journal</Link>
          <Link to="/contact" className="hover:text-brand-gray transition-colors">Contact</Link>
        </nav>
        
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand-gray transition-colors">TW</a>
          <a href="#" className="hover:text-brand-gray transition-colors">IN</a>
          <a href="#" className="hover:text-brand-gray transition-colors">BE</a>
          <span className="text-brand-gray ml-4">&copy; {new Date().getFullYear()} Jirjirak Studio</span>
        </div>
      </div>
    </footer>
  );
}
