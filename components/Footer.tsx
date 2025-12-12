import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-islamic-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-islamic-primary font-bold">
                  H
                </div>
                <span className="text-xl font-bold">{t('heroTitle')}</span>
             </div>
             <p className="text-gray-300 text-sm leading-relaxed">
               {t('heroSubtitle')}
             </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-islamic-gold font-bold mb-4 text-lg">{t('home')}</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-white transition">{t('about')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('contact')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('latestNews')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-islamic-gold font-bold mb-4 text-lg">{t('education')}</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-white transition">{t('quran')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('imams')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('fatwa')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-islamic-gold font-bold mb-4 text-lg">{t('contact')}</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-islamic-gold" />
                <span>Riyadh, Saudi Arabia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-islamic-gold" />
                <span>+966 11 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-islamic-gold" />
                <span>info@hid.sa</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition"><Twitter className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition"><Instagram className="w-5 h-5"/></a>
            </div>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400 text-sm">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;