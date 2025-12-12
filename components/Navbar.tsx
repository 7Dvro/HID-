import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, Globe, User as UserIcon, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'quran', path: '/quran' },
    { key: 'imams', path: '/imams' },
    { key: 'education', path: '/education' },
    { key: 'fatwa', path: '/fatwa' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-islamic-primary rounded-full flex items-center justify-center text-islamic-gold font-bold border-2 border-islamic-gold">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-islamic-primary leading-none">
                  {language === 'ar' ? 'الهيئة العامة' : 'HID Authority'}
                </span>
                <span className="text-xs text-gray-500">
                  {language === 'ar' ? 'للحفظة والأئمة والدعاة' : 'For Imams & Callers'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-islamic-primary bg-islamic-light'
                    : 'text-gray-700 hover:text-islamic-primary hover:bg-gray-50'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}

            {user && user.role === 'admin' && (
               <Link
               to="/admin"
               className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                 location.pathname === '/admin'
                   ? 'text-islamic-gold bg-islamic-primary'
                   : 'text-islamic-primary border border-islamic-primary hover:bg-islamic-primary hover:text-white'
               }`}
             >
               {t('dashboard')}
             </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-islamic-primary transition-colors flex items-center gap-1"
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-bold">{language === 'ar' ? 'En' : 'عربي'}</span>
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-islamic-primary">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    {user.avatar ? <img src={user.avatar} alt="User" /> : <UserIcon className="p-1" />}
                  </div>
                </button>
                <div className="absolute end-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-islamic-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-islamic-dark transition-colors shadow-sm"
              >
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
             <button
              onClick={toggleLanguage}
              className="text-gray-600 font-bold"
            >
              {language === 'ar' ? 'En' : 'عربي'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-islamic-primary focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                   location.pathname === link.path
                    ? 'text-islamic-primary bg-islamic-light'
                    : 'text-gray-700 hover:text-islamic-primary hover:bg-gray-50'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
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
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-start px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 mt-2"
              >
                {t('logout')}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;