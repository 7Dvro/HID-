import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, BookOpen, UserCheck, ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    { label: t('statsUsers'), value: '15,000+', icon: Users },
    { label: t('statsImams'), value: '1,200+', icon: UserCheck },
    { label: t('statsCourses'), value: '350+', icon: BookOpen },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-islamic-primary overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
           <svg width="100%" height="100%">
             <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="20" cy="20" r="2" fill="#D4AF37" />
             </pattern>
             <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center md:text-start max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-serif">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/education" 
                className="bg-islamic-gold text-white hover:bg-yellow-600 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                {t('exploreCourses')}
              </Link>
              <Link 
                to="/fatwa" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-islamic-primary px-8 py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2"
              >
                {t('askFatwa')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Image/Shape */}
        <div className={`hidden md:block absolute bottom-0 ${language === 'ar' ? 'left-0' : 'right-0'} w-1/3 h-full opacity-20 bg-gradient-to-t from-black to-transparent pointer-events-none`}>
          {/* Placeholder for an Islamic Arch SVG or similar */}
          <svg viewBox="0 0 200 200" className="h-full w-full fill-current text-white">
            <path d="M100 0 C 150 50, 150 150, 100 200 C 50 150, 50 50, 100 0" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-sm relative -mt-8 mx-4 md:mx-auto md:max-w-6xl rounded-xl z-20 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-islamic-light rounded-full text-islamic-primary">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-islamic-dark mb-4">{t('education')} & {t('quran')}</h2>
              <div className="w-24 h-1 bg-islamic-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/islamic${i}/800/600`} 
                      alt="Course" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute bottom-4 start-4">
                      <span className="bg-islamic-gold text-white text-xs px-2 py-1 rounded-md font-bold uppercase">
                        {language === 'ar' ? 'مجاني' : 'Free'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'ar' ? 'تفسير جزء عم للمبتدئين' : 'Tafsir Juz Amma for Beginners'}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                       {language === 'ar' 
                        ? 'دورة شاملة تشرح معاني الآيات والسور القصيرة بأسلوب مبسط ومناسب للجميع.' 
                        : 'A comprehensive course explaining the meanings of short Surahs in a simplified manner suitable for everyone.'}
                    </p>
                    <div className="flex items-center justify-between mt-4 border-t pt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                         <PlayCircle className="w-4 h-4" />
                         <span>12 {language === 'ar' ? 'درس' : 'Lessons'}</span>
                      </div>
                      <button className="text-islamic-primary font-bold hover:text-islamic-dark flex items-center gap-1 text-sm">
                        {language === 'ar' ? 'ابدأ الآن' : 'Start Now'} 
                        {language === 'ar' ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Featured Imams */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-islamic-dark mb-2">{t('featuredImams')}</h2>
                <div className="w-16 h-1 bg-islamic-gold rounded-full"></div>
              </div>
              <Link to="/imams" className="text-islamic-primary font-bold hover:underline">
                 {language === 'ar' ? 'عرض الكل' : 'View All'}
              </Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center group">
                   <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-islamic-light mb-4 shadow-md group-hover:border-islamic-gold transition-colors">
                     <img src={`https://picsum.photos/seed/imam${i}/200/200`} alt="Imam" className="w-full h-full object-cover" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900">{language === 'ar' ? 'الشيخ عبدالله أحمد' : 'Sheikh Abdullah Ahmed'}</h3>
                   <p className="text-sm text-gray-500 mb-2">{language === 'ar' ? 'إمام المسجد الكبير' : 'Imam of Grand Mosque'}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;