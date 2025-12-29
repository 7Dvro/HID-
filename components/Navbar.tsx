
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Globe, User as UserIcon, LogOut, Settings, Moon, Sun, Heart, LayoutDashboard, Briefcase } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, language, toggleLanguage, pageVisibility } = useLanguage();
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
    { key: 'jobs', path: '/jobs', icon: Briefcase },
  ].filter(link => pageVisibility[link.key] !== false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-card rounded-full px-6 py-2 shadow-2xl transition-all duration-500 flex justify-between items-center ${scrolled ? 'mx-0' : 'mx-2 lg:mx-8'}`}>
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/assets/logo.png" 
                alt="HID Authority Logo" 
                className="w-14 h-14 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 drop-shadow-md" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=H&background=006B3F&color=fff";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-islamic-primary dark:text-islamic-gold leading-none font-serif">
                {t('heroTitle').split(' ')[0]} {t('heroTitle').split(' ')[1]}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
                {language === 'ar' ? 'للحفظة والأئمة والدعاة' : 'Imams & Callers'}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  location.pathname === link.path
                    ? 'bg-islamic-primary text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold hover:bg-islamic-primary/5'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {t(link.key)}
              </Link>
            ))}
          </div>

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
              <div className="relative group py-2">
                <button className="flex items-center gap-2 focus:outline-none">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-islamic-primary/30 p-0.5 group-hover:border-islamic-gold transition shadow-sm">
                    <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="User" className="w-full h-full object-cover rounded-full" />
                  </div>
                </button>
                <div className="absolute end-0 top-full w-60 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-5xl py-3 border border-gray-100 dark:border-gray-700 ring-1 ring-black/5 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    {user.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-3 px-5 py-3 text-sm text-islamic-primary dark:text-islamic-gold font-bold hover:bg-islamic-primary/5 transition-colors border-b border-gray-50 dark:border-gray-700">
                        <LayoutDashboard className="w-4 h-4" /> {t('dashboard')}
                      </Link>
                    )}

                    <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-islamic-primary/5 transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" /> {t('settings')}
                    </Link>
                    
                    <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" /> {t('logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-2.5 rounded-full text-sm font-bold hover:shadow-xl transition-all">
                {t('login')}
              </Link>
            )}
          </div>

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

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsOpen(false)}></div>
          <div className={`fixed top-0 bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-80 bg-white dark:bg-gray-800 shadow-5xl z-50 p-6 flex flex-col animate-in ${language === 'ar' ? 'slide-in-from-right' : 'slide-in-from-left'} duration-300`}>
             <div className="flex justify-between items-center mb-10">
                <img src="/assets/logo.png" alt="HID Logo" className="h-14 w-auto object-contain" />
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
             </div>

             <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                {user && (
                   <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                         <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-full border border-islamic-gold/30" alt="" />
                         <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                         {user.role === 'admin' && (
                            <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 p-2.5 rounded-xl bg-islamic-primary/10 text-islamic-primary dark:text-islamic-gold text-xs font-bold">
                               <LayoutDashboard className="w-4 h-4" /> {t('dashboard')}
                            </Link>
                         )}
                         <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">
                            <Settings className="w-4 h-4" /> {t('settings')}
                         </Link>
                      </div>
                   </div>
                )}

                {navLinks.map((link) => (
                  <Link key={link.key} to={link.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-5 py-4 rounded-3xl font-bold transition-all ${location.pathname === link.path ? 'bg-islamic-primary text-white shadow-md shadow-islamic-primary/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    {link.icon && <link.icon className="w-5 h-5" />}
                    {t(link.key)}
                  </Link>
                ))}
             </div>

             <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <Link to="/support" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-3 py-4 bg-islamic-gold text-white rounded-3xl font-bold mb-4 shadow-lg shadow-islamic-gold/20">
                   <Heart className="w-5 h-5 fill-current" /> {t('support')}
                </Link>
                {!user ? (
                   <Link to="/login" onClick={() => setIsOpen(false)} className="w-full block text-center py-4 bg-gray-900 text-white rounded-3xl font-bold">
                      {t('login')}
                   </Link>
                ) : (
                  <button onClick={() => { logout(); setIsOpen(false); navigate('/'); }} className="w-full flex items-center justify-center gap-3 py-4 text-red-600 bg-red-50 dark:bg-red-950/20 rounded-3xl font-bold">
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
