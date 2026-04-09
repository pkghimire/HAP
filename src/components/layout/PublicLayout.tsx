import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'np' : 'en');
  };

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('services'), path: '/services' },
    { name: t('blog'), path: '/blog' },
    { name: t('calendar'), path: '/calendar' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-orange-50/30 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-orange-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-700 tracking-tight">
              Himavat Arsa Prjna
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                  location.pathname === link.path ? 'text-orange-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="ghost" size="icon" onClick={toggleLanguage} title="Toggle Language">
              <Globe className="h-5 w-5 text-orange-700" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <Button asChild>
              <Link to="/contact">{t('book_anusthan')}</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Globe className="h-5 w-5 text-orange-700" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-orange-100 bg-white px-4 py-4 space-y-4 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium ${
                  location.pathname === link.path ? 'text-orange-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="w-full">
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                {t('book_anusthan')}
              </Link>
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-orange-900 text-orange-100 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Himavat Arsa Prjna</h3>
            <p className="text-orange-200/80 max-w-xs">
              {t('hero_subtitle')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <p className="text-orange-200/80 mb-2">Kathmandu, Nepal</p>
            <p className="text-orange-200/80 mb-2">info@himavatarsaprjna.org</p>
            <p className="text-orange-200/80">+977 1-2345678</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-orange-800 text-center text-orange-300/60">
          <p>{t('footer_text')}</p>
        </div>
      </footer>
    </div>
  );
}
