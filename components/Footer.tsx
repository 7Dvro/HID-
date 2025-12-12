import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

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
              <li><a href="#/about" className="hover:text-white transition">{t('about')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('contact')}</a></li>
              <li><a href="#/news" className="hover:text-white transition">{t('latestNews')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-islamic-gold font-bold mb-4 text-lg">{t('education')}</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#/quran" className="hover:text-white transition">{t('quran')}</a></li>
              <li><a href="#/imams" className="hover:text-white transition">{t('imams')}</a></li>
              <li><a href="#/fatwa" className="hover:text-white transition">{t('fatwa')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-islamic-gold font-bold mb-4 text-lg">{t('contact')}</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Khartoum,Sudan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <MapPin className="w-4 h-4 text-islamic-gold" />
                  <span>{language === 'ar' ? 'السودان، الخرطوم' : 'Sudan, Khartoum'}</span>
                </a>
              </li>
              <li>
                <div className="flex flex-col gap-1">
                    <a href="tel:+249128233909" className="flex items-center gap-2 hover:text-white transition" title={language === 'ar' ? 'اتصال' : 'Call'}>
                        <Phone className="w-4 h-4 text-islamic-gold" />
                        <span dir="ltr" className="font-mono">+249 12 823 3909</span>
                    </a>
                    <a 
                        href="https://wa.me/249128233909" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition text-xs text-gray-400 mt-1"
                        title="WhatsApp"
                    >
                        <MessageCircle className="w-3 h-3 text-green-500" />
                        <span>{language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
                    </a>
                </div>
              </li>
              <li>
                <a href="mailto:info@7dvro.com" className="flex items-center gap-2 hover:text-white transition">
                  <Mail className="w-4 h-4 text-islamic-gold" />
                  <span>info@7dvro.com</span>
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition"><Twitter className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition"><Instagram className="w-5 h-5"/></a>
            </div>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
          <div>{t('copyright')}</div>
          <div className="flex items-center gap-1 bg-white/5 px-4 py-2 rounded-full border border-white/10">
             <span>{language === 'ar' ? 'تم التطوير بواسطة' : 'Developed by'}</span>
             <a href="http://www.7dvro.com" target="_blank" rel="noreferrer" className="text-islamic-gold hover:text-white transition font-bold">
                7Dvro for IT Solutions
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;