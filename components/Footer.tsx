
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-islamic-dark text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 arabesque-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl p-2 border border-white/20">
                  <img src="/assets/logo.png" alt="HID Authority Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                   <h2 className="text-2xl font-bold font-serif leading-none">{t('heroTitle')}</h2>
                   <p className="text-[10px] text-islamic-gold font-bold uppercase tracking-widest mt-1">وزارة الشئون الدينية والأوقاف</p>
                </div>
             </div>
             <p className="text-gray-300 text-lg leading-relaxed font-light opacity-80 mb-8">
               {t('heroSubtitle')}
             </p>
             <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/5 hover:bg-islamic-gold hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/10 group">
                    <Icon className="w-5 h-5 group-hover:scale-110" />
                  </a>
                ))}
             </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="text-white font-bold mb-8 text-xl font-serif flex items-center gap-3">
               <span className="w-8 h-1 bg-islamic-gold rounded-full"></span>
               {t('home')}
            </h3>
            <ul className="space-y-4">
              {['about', 'news', 'quran', 'imams'].map(key => (
                 <li key={key}>
                    <a href={`#/${key}`} className="text-gray-400 hover:text-islamic-gold transition-colors flex items-center gap-2 group">
                       {language === 'ar' ? <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
                       {t(key)}
                    </a>
                 </li>
              ))}
            </ul>
          </div>

          {/* Strategic Services */}
          <div>
            <h3 className="text-white font-bold mb-8 text-xl font-serif flex items-center gap-3">
               <span className="w-8 h-1 bg-islamic-gold rounded-full"></span>
               {t('education')}
            </h3>
            <ul className="space-y-4">
              {['education', 'fatwa', 'support', 'contact'].map(key => (
                 <li key={key}>
                    <a href={`#/${key}`} className="text-gray-400 hover:text-islamic-gold transition-colors flex items-center gap-2 group">
                       {language === 'ar' ? <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
                       {t(key)}
                    </a>
                 </li>
              ))}
            </ul>
          </div>

          {/* Authority Contact */}
          <div>
            <h3 className="text-white font-bold mb-8 text-xl font-serif flex items-center gap-3">
               <span className="w-8 h-1 bg-islamic-gold rounded-full"></span>
               {t('contact')}
            </h3>
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-islamic-gold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed pt-1">
                     {language === 'ar' ? 'السودان، بورتسودان - مقر الأمانة العامة للهيئة' : 'Sudan, Port Sudan - General Secretariat HQ'}
                  </p>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-islamic-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <a href="tel:+249128233909" className="text-gray-400 hover:text-white transition block font-mono" dir="ltr">+249 12 823 3909</a>
                    <a href="https://wa.me/249128233909" target="_blank" className="text-emerald-500 text-xs flex items-center gap-1 mt-1 hover:underline">
                      <MessageCircle className="w-3 h-3" /> {language === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Chat'}
                    </a>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-islamic-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href="mailto:info@hid-authority.sd" className="text-gray-400 hover:text-white transition pt-1 text-sm">info@hid-authority.sd</a>
               </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-sm font-medium tracking-wide">
             {t('copyright')}
          </div>
          <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10 group hover:bg-white/10 transition-all">
             <span className="text-gray-500 text-xs font-bold uppercase">{language === 'ar' ? 'بإشراف تقني من' : 'Technical Supervision'}</span>
             <a href="http://www.7dvro.com" target="_blank" rel="noreferrer" className="text-islamic-gold hover:text-white transition-all font-black tracking-widest group-hover:scale-105">
                7DVRO SOLUTIONS
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
