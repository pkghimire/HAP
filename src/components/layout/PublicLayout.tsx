import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Menu, X, Globe, Phone, Mail, Facebook, Twitter, Instagram, Youtube, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

export default function PublicLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logoUrl } = useSettings();

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
    <div className="min-h-screen flex flex-col bg-primary-50/30 font-sans">
      {/* Top Contact Bar */}
      <div className="bg-primary-900 text-primary-50 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+97712345678" className="flex items-center gap-2 hover:text-primary-200 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+977 1-2345678</span>
            </a>
            <a href="mailto:info@himavatarsaprjna.org" className="flex items-center gap-2 hover:text-primary-200 transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@himavatarsaprjna.org</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-200 transition-colors" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary-200 transition-colors" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary-200 transition-colors" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary-200 transition-colors" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Himavat Arsa Prajna" className="h-[120px] object-contain" />
            ) : (
              <span className="text-2xl font-bold text-primary-700 tracking-tight">
                Himavat Arsa Prajna
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="ghost" size="icon" onClick={toggleLanguage} title="Toggle Language">
              <Globe className="h-5 w-5 text-primary-700" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <Button asChild>
              <Link to="/contact">{t('book_anusthan')}</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Globe className="h-5 w-5 text-primary-700" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary-100 bg-white px-4 py-4 space-y-4 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium ${
                  location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
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
      <footer className="bg-secondary-900 text-secondary-100 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {logoUrl ? (
              <img src={logoUrl} alt="Himavat Arsa Prajna" className="h-[60px] object-contain mb-4" />
            ) : (
              <h3 className="text-xl font-bold text-white mb-4">Himavat Arsa Prajna</h3>
            )}
            <p className="text-secondary-200/80 max-w-xs">
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
            <p className="text-secondary-200/80 mb-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Kathmandu, Nepal</p>
            <p className="text-secondary-200/80 mb-2 flex items-center gap-2"><Mail className="h-4 w-4" /> info@himavatarsaprjna.org</p>
            <p className="text-secondary-200/80 mb-4 flex items-center gap-2"><Phone className="h-4 w-4" /> +977 1-2345678</p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="bg-secondary-800 p-2 rounded-full hover:bg-secondary-700 transition-colors text-white" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="bg-secondary-800 p-2 rounded-full hover:bg-secondary-700 transition-colors text-white" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="bg-secondary-800 p-2 rounded-full hover:bg-secondary-700 transition-colors text-white" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="bg-secondary-800 p-2 rounded-full hover:bg-secondary-700 transition-colors text-white" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-secondary-800 text-center text-secondary-300/60">
          <p>{t('footer_text')}</p>
        </div>
      </footer>
    </div>
  );
}
