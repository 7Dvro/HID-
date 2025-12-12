import React, { useState } from 'react';
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
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'quran', path: '/quran' },
    { key: 'imams', path: '/imams' },
    { key: 'education', path: '/education' },
    { key: 'news', path: '/news' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-islamic-primary rounded-full flex items-center justify-center text-islamic-gold font-bold border-2 border-islamic-gold shadow-lg">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-islamic-primary dark:text-islamic-gold leading-none">
                  {language === 'ar' ? 'الهيئة العامة' : 'HID Authority'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'للحفظة والأئمة والدعاة - السودان' : 'For Imams & Callers - Sudan'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-islamic-primary bg-islamic-light dark:bg-gray-700 dark:text-islamic-gold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            
            <Link
                to="/support"
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 ${
                  location.pathname === '/support'
                    ? 'bg-islamic-gold text-white'
                    : 'text-islamic-gold border border-islamic-gold hover:bg-islamic-gold hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4" />
                {t('support')}
              </Link>

            {user && user.role === 'admin' && (
               <Link
               to="/admin"
               className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                 location.pathname === '/admin'
                   ? 'text-islamic-gold bg-islamic-primary'
                   : 'text-islamic-primary dark:text-islamic-gold border border-islamic-primary dark:border-islamic-gold hover:bg-islamic-primary hover:text-white'
               }`}
             >
               {t('dashboard')}
             </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold transition-colors flex items-center gap-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-bold">{language === 'ar' ? 'En' : 'عربي'}</span>
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold focus:outline-none">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 border-2 border-transparent hover:border-islamic-gold transition">
                    {user.avatar ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" /> : <UserIcon className="p-1" />}
                  </div>
                </button>
                <div className="absolute end-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 hidden group-hover:block ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 border border-gray-100 dark:border-gray-700">
                   <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                   </div>
                  <Link
                    to="/profile"
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    {t('settings')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-start px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-islamic-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-islamic-dark transition-all shadow-md transform hover:scale-105"
              >
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-3">
             <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 p-2"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
             <button
              onClick={toggleLanguage}
              className="text-gray-600 dark:text-gray-300 font-bold"
            >
              {language === 'ar' ? 'En' : 'عربي'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-islamic-primary focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                   location.pathname === link.path
                    ? 'text-islamic-primary bg-islamic-light dark:bg-gray-700 dark:text-islamic-gold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-islamic-primary hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
             
             <Link
                to="/support"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-islamic-gold border border-islamic-gold mt-2"
              >
                {t('support')}
              </Link>

             {user && user.role === 'admin' && (
               <Link
               to="/admin"
               onClick={() => setIsOpen(false)}
               className="block px-3 py-2 rounded-md text-base font-medium text-islamic-gold bg-islamic-primary"
             >
               {t('dashboard')}
             </Link>
            )}
            {!user ? (
               <Link
               to="/login"
               onClick={() => setIsOpen(false)}
               className="block w-full text-center mt-4 bg-islamic-primary text-white px-4 py-2 rounded-md"
             >
               {t('login')}
             </Link>
            ) : (
              <>
                <div className="border-t border-gray-100 dark:border-gray-700 my-2 pt-2">
                    <div className="px-3 flex items-center gap-3 mb-3">
                         <img src={user.avatar || "https://picsum.photos/200"} className="w-10 h-10 rounded-full" alt="" />
                         <div>
                             <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                         </div>
                    </div>
                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        {t('settings')}
                    </Link>
                    <button
                        onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                        }}
                        className="block w-full text-start px-3 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        {t('logout')}
                    </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;