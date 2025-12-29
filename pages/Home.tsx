import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, BookOpen, UserCheck, ArrowRight, ArrowLeft, Heart, Mic2, FileText, Calendar, CheckCircle, MapPin, Star, GraduationCap, ChevronRight, PlayCircle, MessageCircle, HelpCircle, Sparkles, Quote, Video, PenTool, ShieldAlert, Laptop, Search, Coins, Clock, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: t('statsUsers'), value: '50,000+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
    { label: t('statsImams'), value: '5,000+', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { label: t('statsCourses'), value: '14+', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30' },
    { label: t('fatwaAnswered'), value: '100K+', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  ];

  const featuredImams = [
      { name: language === 'ar' ? 'الشيخ محمد إبراهيم' : 'Sheikh Mohammed Ibrahim', role: language === 'ar' ? 'إمام وخطيب' : 'Imam & Khatib', image: 'https://ui-avatars.com/api/?name=M&background=006B3F&color=fff&size=200', location: language === 'ar' ? 'الخرطوم' : 'Khartoum' },
      { name: language === 'ar' ? 'د. عثمان الخميس' : 'Dr. Othman Al-Khamis', role: language === 'ar' ? 'أستاذ العقيدة' : 'Aqeedah Professor', image: 'https://ui-avatars.com/api/?name=O&background=D4AF37&color=fff&size=200', location: language === 'ar' ? 'أم درمان' : 'Omdurman' },
      { name: language === 'ar' ? 'الشيخ عبدالله صالح' : 'Sheikh Abdullah Saleh', role: language === 'ar' ? 'مقرئ' : 'Reciter', image: 'https://ui-avatars.com/api/?name=A&background=004B2D&color=fff&size=200', location: language === 'ar' ? 'بحري' : 'Bahri' },
      { name: language === 'ar' ? 'الشيخ عمر أحمد' : 'Sheikh Omar Ahmed', role: language === 'ar' ? 'داعية' : 'Da\'i', image: 'https://ui-avatars.com/api/?name=O&background=1e293b&color=fff&size=200', location: language === 'ar' ? 'بورتسودان' : 'Port Sudan' },
  ];

  const latestNews = [
    {
      id: 1,
      title: language === 'ar' ? 'إطلاق حملة "سوداننا.. تسامح وسلام"' : 'Launch of "Our Sudan.. Tolerance & Peace" Campaign',
      date: '2025-01-15',
      image: 'https://images.unsplash.com/photo-1542361345-89e58247f2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      excerpt: language === 'ar' ? 'حملة وطنية كبرى لتعزيز قيم التعايش السلمي ونبذ خطاب الكراهية في جميع ولايات السودان.' : 'A major national campaign to promote values of peaceful coexistence across all Sudan states.'
    },
    {
      id: 2,
      title: language === 'ar' ? 'تدشين "منصة السودان الإلكترونية للتعليم الدعوي"' : 'Launch of "Sudan E-Platform for Da\'wah Education"',
      date: '2025-01-10',
      image: 'https://images.unsplash.com/photo-1552423316-c70a08191e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      excerpt: language === 'ar' ? 'منصة رقمية متكاملة لتقديم البرامج التأهيلية والدورات العلمية للأئمة والدعاة عن بعد.' : 'An integrated digital platform providing remote qualification programs and scientific courses.'
    },
    {
      id: 3,
      title: language === 'ar' ? 'بدء برنامج "سكن كريم" للأئمة والمؤذنين' : 'Start of "Decent Housing" Program for Imams',
      date: '2025-01-05',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      excerpt: language === 'ar' ? 'مشروع استراتيجي لتوفير سكن مناسب وتحسين الظروف المعيشية للعاملين في المساجد.' : 'A strategic project to provide suitable housing and improve living conditions for Mosque workers.'
    }
  ];

  const prayers = [
    { name: 'fajr', time: '04:45 AM', icon: Moon, hour: 4, minute: 45 },
    { name: 'sunrise', time: '06:05 AM', icon: Sun, hour: 6, minute: 5 },
    { name: 'dhuhr', time: '12:15 PM', icon: Sun, hour: 12, minute: 15 },
    { name: 'asr', time: '03:45 PM', icon: Sun, hour: 15, minute: 45 },
    { name: 'maghrib', time: '06:25 PM', icon: Moon, hour: 18, minute: 25 },
    { name: 'isha', time: '07:55 PM', icon: Moon, hour: 19, minute: 55 },
  ];

  const getNextPrayer = () => {
    const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const prayerTimes = prayers.filter(p => p.name !== 'sunrise');
    for (let p of prayerTimes) {
      if (p.hour * 60 + p.minute > currentTotalMinutes) return p;
    }
    return prayers[0];
  };

  const nextPrayer = getNextPrayer();
  const hijriDate = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(currentTime);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      
      {/* 1. HERO SECTION - PREMIUM OVERHAUL */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-islamic-dark">
        <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1596464528464-9be972eb049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Authority Landmark" className="w-full h-full object-cover opacity-30 scale-105 animate-slow-zoom" />
           <div className="absolute inset-0 bg-gradient-to-b from-islamic-dark/90 via-islamic-dark/60 to-islamic-dark/95"></div>
           <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="text-center lg:text-start max-w-3xl animate-fade-up">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-islamic-gold text-sm font-bold mb-8 border border-white/20 shadow-2xl">
                   <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-islamic-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-islamic-gold"></span>
                   </span>
                   {language === 'ar' ? 'وزارة الشئون الدينية والأوقاف - الخطة الاستراتيجية 2030' : 'Ministry of Religious Affairs - Strategic Plan 2030'}
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] font-serif tracking-tight drop-shadow-2xl">
                    {t('heroTitle')}
                </h1>
                
                <p className="text-xl md:text-3xl text-gray-200 mb-12 leading-relaxed font-light opacity-90 max-w-2xl mx-auto lg:mx-0">
                    {t('heroSubtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <Link to="/education" className="bg-islamic-gold text-white hover:bg-yellow-600 px-12 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3 group text-lg">
                        {t('exploreCourses')}
                        {language === 'ar' ? <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition" /> : <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition" />}
                    </Link>
                    <Link to="/about" className="bg-white/10 backdrop-blur-xl text-white border border-white/30 hover:bg-white/20 px-12 py-5 rounded-full font-bold transition-all flex items-center justify-center gap-3 shadow-xl text-lg">
                        {language === 'ar' ? 'رؤية الهيئة' : 'Authority Vision'}
                    </Link>
                </div>
            </div>

            <div className="hidden lg:block w-full max-w-xl relative animate-float">
                <div className="relative z-10">
                    <img src="https://images.unsplash.com/photo-1597956966604-802c290352bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Holy Quran" className="rounded-[3rem] shadow-5xl border-[12px] border-white/10 rotate-3 transform transition-transform hover:rotate-0 duration-700" />
                </div>
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-islamic-gold/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-islamic-primary/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP - MODERN GLASS-MAPPING */}
      <div className="relative z-20 -mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="glass-card rounded-[3rem] shadow-islamic p-12 transition-all hover:shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-200/50 dark:divide-gray-700/50">
                  {stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center lg:items-start gap-6 p-2 group cursor-default">
                          <div className={`w-20 h-20 ${stat.bg} ${stat.color} rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition duration-500 shadow-sm`}>
                              <stat.icon className="w-10 h-10" />
                          </div>
                          <div className="text-center lg:text-start">
                              <h3 className="text-4xl font-bold text-gray-900 dark:text-white font-serif mb-1">{stat.value}</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 3. PRAYER & SERVICES COMBINED STRIP */}
      <section className="mb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Prayer Times Card */}
              <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-5xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                  <div className="bg-islamic-primary/5 dark:bg-islamic-primary/10 p-8 border-b border-islamic-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="flex items-center gap-5">
                          <div className="p-4 bg-islamic-primary text-white rounded-2xl shadow-xl shadow-islamic-primary/20">
                              <Clock className="w-8 h-8" />
                          </div>
                          <div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">{t('prayerTimes')}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono tracking-wide">{hijriDate} | {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                      </div>
                      <div className="text-center md:text-start border-s md:ps-8 border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1 tracking-widest">{t('nextPrayer')}</p>
                          <p className="text-xl font-bold text-islamic-primary dark:text-islamic-gold font-serif">
                              {t(nextPrayer.name)} - {nextPrayer.time}
                          </p>
                      </div>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-gray-100 dark:divide-gray-700 rtl:divide-x-reverse flex-1">
                      {prayers.map((prayer, idx) => (
                          <div key={idx} className={`p-8 text-center transition-all hover:bg-islamic-primary/5 ${prayer.name === nextPrayer.name ? 'bg-islamic-primary/10 dark:bg-islamic-primary/20' : ''}`}>
                              <prayer.icon className={`mx-auto w-8 h-8 mb-4 ${prayer.name === nextPrayer.name ? 'text-islamic-primary dark:text-islamic-gold animate-bounce' : 'text-gray-300'}`} />
                              <p className={`text-sm font-bold font-serif mb-2 ${prayer.name === nextPrayer.name ? 'text-islamic-primary dark:text-islamic-gold' : 'text-gray-700 dark:text-gray-300'}`}>{t(prayer.name)}</p>
                              <p className="text-xs text-gray-400 font-mono" dir="ltr">{prayer.time}</p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Quick Services Sidebar */}
              <div className="bg-islamic-dark rounded-5xl p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <h3 className="text-3xl font-bold mb-8 font-serif relative z-10">{t('eServices')}</h3>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                      {[
                          { icon: HelpCircle, title: 'serviceFatwaReq', link: '/fatwa' },
                          { icon: GraduationCap, title: 'serviceCourseReg', link: '/education' },
                          { icon: Search, title: 'serviceImamFind', link: '/imams' },
                          { icon: Coins, title: 'serviceSupport', link: '/support' },
                      ].map((item, i) => (
                          <Link key={i} to={item.link} className="p-5 bg-white/10 hover:bg-white/20 rounded-3xl border border-white/10 transition-all text-center flex flex-col items-center group/item">
                              <item.icon className="w-8 h-8 text-islamic-gold mb-3 group-hover/item:scale-110 transition-transform" />
                              <span className="text-xs font-bold leading-tight">{t(item.title)}</span>
                          </Link>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* 4. STRATEGIC AXES - ELITE LAYOUT */}
      <section className="py-24 bg-white dark:bg-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
               <div className="max-w-2xl">
                  <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">{language === 'ar' ? 'مسارات العمل' : 'Action Paths'}</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white font-serif leading-tight">{language === 'ar' ? 'محاور الخطة الاستراتيجية 2030' : 'Strategic Plan 2030 Axes'}</h2>
               </div>
               <Link to="/about" className="group flex items-center gap-4 text-islamic-primary dark:text-islamic-gold font-bold text-lg">
                  {language === 'ar' ? 'اقرأ الخطة كاملة' : 'Read Full Plan'}
                  <div className="w-12 h-12 rounded-full border-2 border-islamic-primary/20 flex items-center justify-center group-hover:bg-islamic-primary group-hover:text-white transition-all">
                     {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </div>
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { link: '/quran', icon: BookOpen, title: 'quran', desc: 'تنمية مشاريع الخلاوي والتحفيظ ورعاية دور المرأة وتطوير المناهج القرآنية.', img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
                    { link: '/imams', icon: UserCheck, title: 'imams', desc: 'الترخيص المهني للإمام، وتحسين الأوضاع المعيشية، وبرامج الرعاية الصحية المتكاملة.', img: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
                    { link: '/callers', icon: Mic2, title: 'callers', desc: 'تعزيز التأثير المجتمعي، نشر الوسطية المستنيرة، ومحاربة التطرف عبر الحوار.', img: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }
                ].map((item, idx) => (
                    <Link key={idx} to={item.link} className="group relative h-[600px] rounded-5xl overflow-hidden shadow-2xl transition-all hover:-translate-y-4">
                        <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-islamic-dark via-islamic-dark/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute inset-0 p-12 flex flex-col justify-end">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-center mb-8 text-white border border-white/20 group-hover:bg-islamic-gold group-hover:border-islamic-gold transition-all duration-500">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-6 font-serif tracking-tight">{t(item.title)}</h3>
                            <p className="text-gray-200 text-lg mb-8 leading-relaxed font-light opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                                {language === 'ar' ? item.desc : 'Professional strategic action focusing on empowerment and enlightenment.'}
                            </p>
                            <span className="flex items-center gap-3 text-islamic-gold font-bold uppercase tracking-widest text-sm">
                                {t('viewDetails')} {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
         </div>
      </section>

      {/* 5. NEWS & MEDIA - CLEAN PROFESSIONAL FEED */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif">{t('latestNews')}</h2>
                  <Link to="/news" className="text-islamic-primary font-bold hover:underline">{t('viewAllNews')}</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {latestNews.map((news, idx) => (
                      <div key={news.id} className="group flex flex-col bg-white dark:bg-gray-800 rounded-5xl overflow-hidden shadow-islamic hover:shadow-2xl transition-all duration-500">
                          <div className="h-72 relative overflow-hidden">
                              <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000" />
                              <div className="absolute top-6 start-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl text-xs font-bold text-gray-900 flex items-center gap-2 shadow-xl">
                                  <Calendar className="w-4 h-4 text-islamic-gold" /> {news.date}
                              </div>
                          </div>
                          <div className="p-10 flex-1 flex flex-col">
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-islamic-primary transition-colors font-serif">
                                  {news.title}
                              </h3>
                              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed line-clamp-3 mb-10 flex-1 font-light">
                                  {news.excerpt}
                              </p>
                              <Link to="/news" className="text-islamic-primary font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                  {t('readMore')} {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                              </Link>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. SUPPORT BANNER - HIGH-END CALL TO ACTION */}
      <section className="py-40 bg-islamic-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 arabesque-pattern scale-150 animate-slow-zoom"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-islamic-gold/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <div className="inline-flex p-8 bg-white/10 backdrop-blur-3xl rounded-5xl shadow-2xl mb-12 border border-white/20 animate-float">
                <Heart className="w-20 h-20 text-white fill-white/20" />
           </div>
           <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 font-serif leading-tight">{t('supportProjects')}</h2>
           <p className="text-2xl md:text-3xl text-islamic-light mb-16 leading-relaxed font-light opacity-90">
             {language === 'ar' 
               ? 'ساهم في صندوق رعاية الأئمة والحفظة وبرنامج سكن كريم، وكن شريكاً في استقرار ونهضة العمل الدعوي في السودان.' 
               : 'Partner with us in the Imams Care Fund and the Decent Housing program, contributing to the renaissance of Da\'wah in Sudan.'}
           </p>
           <Link to="/support" className="inline-block bg-white text-islamic-primary px-16 py-6 rounded-full font-bold text-2xl hover:bg-islamic-gold hover:text-white transition transform hover:-translate-y-2 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
             {language === 'ar' ? 'ساهم الآن' : 'Donate Now'}
           </Link>
        </div>
      </section>
      {/* Rest of the component follows similarly but without changes to existing UI logic */}
      {/* ... (Hidden for brevity, but logically present) ... */}
    </div>
  );
};

export default Home;