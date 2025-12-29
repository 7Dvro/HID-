import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Globe, User as UserIcon, LogOut, Settings, Moon, Sun, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'quran', path: '/quran' },
    { key: 'imams', path: '/imams' },
    { key: 'education', path: '/education' },
    { key: 'news', path: '/news' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-card rounded-full px-6 py-2 shadow-2xl transition-all duration-500 flex justify-between items-center ${scrolled ? 'mx-0' : 'mx-2 lg:mx-8'}`}>
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-islamic-primary rounded-full flex items-center justify-center text-islamic-gold font-bold border-2 border-islamic-gold/30 shadow-islamic group-hover:scale-110 transition-transform">
              <span className="text-xl">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-islamic-primary dark:text-islamic-gold leading-none font-serif">
                {language === 'ar' ? 'الهيئة العامة' : 'HID Authority'}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
                {language === 'ar' ? 'للحفظة والأئمة والدعاة' : 'Imams & Callers'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-islamic-primary text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold hover:bg-islamic-primary/5'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
             <Link
                to="/support"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-islamic-gold text-white shadow-gold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Heart className="w-4 h-4 fill-current" />
                {t('support')}
              </Link>

            <div className="flex items-center gap-2 border-x border-gray-200 dark:border-gray-700 px-4">
              <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-islamic-primary transition-colors">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button onClick={toggleLanguage} className="p-2 text-gray-500 hover:text-islamic-primary font-bold text-sm flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
            </div>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 focus:outline-none">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-islamic-primary/30 p-0.5 group-hover:border-islamic-gold transition">
                    <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="User" className="w-full h-full object-cover rounded-full" />
                  </div>
                </button>
                <div className="absolute end-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-3xl shadow-5xl py-3 hidden group-hover:block ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                   <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                   </div>
                  <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-islamic-primary/5">
                    <Settings className="w-4 h-4 text-gray-400" /> {t('settings')}
                  </Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-2.5 rounded-full text-sm font-bold hover:shadow-xl transition-all">
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="lg:hidden flex items-center gap-1">
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-islamic-primary transition-colors" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={toggleLanguage} className="p-2 text-gray-500 hover:text-islamic-primary font-bold text-xs flex items-center gap-1" aria-label="Toggle Language">
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 dark:text-gray-300 ms-1" aria-label="Toggle Menu">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className={`fixed top-0 bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-80 bg-white dark:bg-gray-800 shadow-5xl z-50 p-6 flex flex-col animate-in slide-in-from-right duration-300`}>
             <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-xl font-serif text-islamic-primary">{t('heroTitle')}</span>
                <button onClick={() => setIsOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
             </div>
             <div className="space-y-2 flex-1">
                {navLinks.map((link) => (
                  <Link key={link.key} to={link.path} onClick={() => setIsOpen(false)} className={`block px-5 py-4 rounded-3xl font-bold transition-all ${location.pathname === link.path ? 'bg-islamic-primary text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t(link.key)}
                  </Link>
                ))}
             </div>
             <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <Link to="/support" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-3 py-4 bg-islamic-gold text-white rounded-3xl font-bold mb-4">
                   <Heart className="w-5 h-5 fill-current" /> {t('support')}
                </Link>
                {!user ? (
                   <Link to="/login" onClick={() => setIsOpen(false)} className="w-full block text-center py-4 bg-gray-900 text-white rounded-3xl font-bold">
                      {t('login')}
                   </Link>
                ) : (
                  <button onClick={() => { logout(); setIsOpen(false); navigate('/'); }} className="w-full flex items-center justify-center gap-3 py-4 text-red-600 bg-red-50 rounded-3xl font-bold">
                    <LogOut className="w-5 h-5" /> {t('logout')}
                  </button>
                )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;