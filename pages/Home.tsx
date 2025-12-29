
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, BookOpen, UserCheck, ArrowRight, ArrowLeft, Heart, Mic2, FileText, Calendar, CheckCircle, MapPin, Star, GraduationCap, ChevronRight, PlayCircle, MessageCircle, HelpCircle, Sparkles, Quote, Video, PenTool, ShieldAlert, Laptop, Search, Coins, Clock, Sun, Moon, ShieldCheck } from 'lucide-react';
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
      
      {/* 1. ELITE INSTITUTIONAL HERO BANNER */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-islamic-dark py-12 lg:py-0">
        {/* Cinematic Background Layering */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1596464528464-9be972eb049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
             alt="Institutional Heritage" 
             className="w-full h-full object-cover opacity-15 scale-110 blur-[2px] transform transition-transform duration-[20s] animate-pulse-slow" 
           />
           <div className="absolute inset-0 bg-gradient-to-br from-islamic-dark via-islamic-dark/95 to-[#003B22]"></div>
           <div className="absolute inset-0 arabesque-pattern opacity-[0.05]"></div>
           
           {/* Decorative Elements */}
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-islamic-primary/10 rounded-full blur-[150px] animate-pulse"></div>
           <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-islamic-gold/5 rounded-full blur-[120px]"></div>
           
           {/* Floating Background Logo Watermark */}
           <div className="absolute top-1/2 right-12 -translate-y-1/2 w-96 h-96 opacity-[0.03] pointer-events-none">
              <img src="/assets/logo.png" className="w-full h-full object-contain animate-spin-slow" alt="Emblem Watermark" />
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
            
            {/* Left Content (Text & Branding) */}
            <div className="text-center lg:text-start lg:w-[60%] animate-fade-up">
                
                {/* Institutional Badge */}
                <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl text-white border border-white/10 shadow-2xl mb-12 transform hover:scale-105 transition-all group">
                   <div className="w-12 h-12 bg-white rounded-xl p-1.5 shadow-inner">
                      <img src="/assets/logo.png" alt="HID Official Seal" className="w-full h-full object-contain" />
                   </div>
                   <div className="h-10 w-px bg-white/20"></div>
                   <div className="text-start">
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-islamic-gold leading-none mb-1">{language === 'ar' ? 'جمهورية السودان' : 'REPUBLIC OF SUDAN'}</p>
                      <p className="text-[9px] sm:text-[11px] font-bold text-gray-300 leading-none">{language === 'ar' ? 'وزارة الشئون الدينية والأوقاف' : 'Min. Religious Affairs & Endowments'}</p>
                   </div>
                </div>
                
                {/* Main Heading with Gradient Accents */}
                <div className="space-y-6">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] font-serif tracking-tighter drop-shadow-2xl">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-islamic-gold to-white mb-2 pb-1">
                          {language === 'ar' ? 'الهيئة العامة' : 'General Authority'}
                        </span>
                        <span className="block">
                          {language === 'ar' ? 'للحفظة والأئمة والدعاة' : 'Huffaz, Imams & Da\'is'}
                        </span>
                    </h1>
                    
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                        <div className="h-1 w-20 bg-islamic-gold rounded-full"></div>
                        <div className="h-1 w-4 bg-white/30 rounded-full"></div>
                        <div className="h-1 w-2 bg-white/10 rounded-full"></div>
                    </div>
                    
                    <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light opacity-95 max-w-2xl mx-auto lg:mx-0">
                        {language === 'ar' 
                          ? 'نحو منظومة دعوية رقمية رائدة تعزز قيم الوسطية وترتقي بحفظة كتاب الله وأئمة المنابر في ربوع السودان.'
                          : 'Towards a pioneering digital Da\'wah system enhancing moderation and elevating Quran memorizers across Sudan.'}
                    </p>
                </div>
                
                {/* Action Grid */}
                <div className="flex flex-col sm:flex-row gap-6 mt-16 justify-center lg:justify-start">
                    <Link to="/education" className="group relative bg-islamic-gold text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-sm transition-all transform hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(212,175,55,0.4)] flex items-center justify-center gap-4 overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        <span className="relative z-10">{t('exploreCourses')}</span>
                        {language === 'ar' ? <ArrowLeft className="relative z-10 w-6 h-6 group-hover:-translate-x-2 transition" /> : <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition" />}
                    </Link>
                    
                    <Link to="/about" className="group bg-white/5 backdrop-blur-3xl text-white border border-white/20 hover:bg-white/10 px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-2xl hover:border-islamic-gold/50">
                        <ShieldCheck className="w-5 h-5 text-islamic-gold group-hover:scale-110 transition-transform" />
                        {language === 'ar' ? 'استراتيجية 2030' : '2030 Strategy'}
                    </Link>
                </div>
            </div>

            {/* Right Side (Majestic Logo Seal) */}
            <div className="hidden lg:block lg:w-[40%] relative animate-float">
                <div className="relative group">
                    {/* Multi-layered glow effects */}
                    <div className="absolute inset-0 bg-islamic-gold/10 rounded-full blur-[100px] scale-150 group-hover:bg-islamic-gold/20 transition-all duration-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-pulse-slow"></div>
                    
                    {/* The Logo Card */}
                    <div className="relative z-10 p-16 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-[6rem] border border-white/20 shadow-5xl overflow-hidden group-hover:border-islamic-gold/40 transition-all duration-1000 group-hover:rotate-1">
                        <div className="absolute inset-0 arabesque-pattern opacity-10 pointer-events-none"></div>
                        <img 
                          src="/assets/logo.png" 
                          alt="HID Authority Seal" 
                          className="w-full h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,107,63,0.5)] transform group-hover:scale-110 transition-transform duration-1000" 
                        />
                        
                        {/* Status Strip */}
                        <div className="mt-12 flex items-center justify-center gap-3 bg-white/10 py-3 rounded-full border border-white/10 backdrop-blur-md">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Official Verified Portal</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <div className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-24">
          <div className="glass-card rounded-[3rem] sm:rounded-[4rem] shadow-islamic p-10 sm:p-14 transition-all hover:shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-14 divide-y sm:divide-y-0 lg:divide-x lg:divide-x-reverse divide-gray-200/40 dark:divide-gray-700/40">
                  {stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center lg:items-start gap-6 pt-8 sm:pt-0 group cursor-default">
                          <div className={`w-20 h-20 ${stat.bg} ${stat.color} rounded-[2rem] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition duration-500 shadow-xl shadow-black/5`}>
                              <stat.icon className="w-10 h-10" />
                          </div>
                          <div className="text-center lg:text-start">
                              <h3 className="text-4xl font-black text-gray-900 dark:text-white font-serif mb-1 leading-none tracking-tighter">{stat.value}</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 3. PRAYER & SERVICES */}
      <section className="mb-20 sm:mb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-4xl sm:rounded-5xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                  <div className="bg-islamic-primary/5 dark:bg-islamic-primary/10 p-6 sm:p-8 border-b border-islamic-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                      <div className="flex items-center gap-4 sm:gap-5">
                          <div className="p-3 sm:p-4 bg-islamic-primary text-white rounded-xl sm:rounded-2xl shadow-xl shadow-islamic-primary/20">
                              <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
                          </div>
                          <div>
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-serif leading-tight">{t('prayerTimes')}</h3>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono tracking-wide mt-1">{hijriDate} | {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                      </div>
                      <div className="text-center md:text-start border-s-0 md:border-s md:ps-8 border-gray-200 dark:border-gray-700 w-full md:w-auto">
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1 tracking-widest">{t('nextPrayer')}</p>
                          <p className="text-lg sm:text-xl font-bold text-islamic-primary dark:text-islamic-gold font-serif">
                              {t(nextPrayer.name)} - {nextPrayer.time}
                          </p>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-gray-100 dark:divide-gray-700 rtl:divide-x-reverse flex-1">
                      {prayers.map((prayer, idx) => (
                          <div key={idx} className={`p-6 sm:p-8 text-center transition-all hover:bg-islamic-primary/5 ${prayer.name === nextPrayer.name ? 'bg-islamic-primary/10 dark:bg-islamic-primary/20' : ''}`}>
                              <prayer.icon className={`mx-auto w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 ${prayer.name === nextPrayer.name ? 'text-islamic-primary dark:text-islamic-gold animate-bounce' : 'text-gray-300'}`} />
                              <p className={`text-xs sm:text-sm font-bold font-serif mb-1 sm:mb-2 ${prayer.name === nextPrayer.name ? 'text-islamic-primary dark:text-islamic-gold' : 'text-gray-700 dark:text-gray-300'}`}>{t(prayer.name)}</p>
                              <p className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-tighter" dir="ltr">{prayer.time}</p>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="bg-islamic-dark rounded-4xl sm:rounded-5xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 font-serif relative z-10">{t('eServices')}</h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
                      {[
                          { icon: HelpCircle, title: 'serviceFatwaReq', link: '/fatwa' },
                          { icon: GraduationCap, title: 'serviceCourseReg', link: '/education' },
                          { icon: Search, title: 'serviceImamFind', link: '/imams' },
                          { icon: Coins, title: 'serviceSupport', link: '/support' },
                      ].map((item, i) => (
                          <Link key={i} to={item.link} className="p-4 sm:p-5 bg-white/10 hover:bg-white/20 rounded-2xl sm:rounded-3xl border border-white/10 transition-all text-center flex flex-col items-center group/item">
                              <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-islamic-gold mb-2 sm:mb-3 group-hover/item:scale-110 transition-transform" />
                              <span className="text-[10px] sm:text-xs font-bold leading-snug">{t(item.title)}</span>
                          </Link>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* 4. STRATEGIC AXES */}
      <section className="py-20 sm:py-24 bg-white dark:bg-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-20 gap-6 sm:gap-8">
               <div className="max-w-2xl">
                  <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">{language === 'ar' ? 'مسارات العمل' : 'Action Paths'}</span>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white font-serif leading-[1.2] sm:leading-tight">{language === 'ar' ? 'محاور الخطة الاستراتيجية 2030' : 'Strategic Plan 2030 Axes'}</h2>
               </div>
               <Link to="/about" className="group flex items-center gap-3 sm:gap-4 text-islamic-primary dark:text-islamic-gold font-bold text-base sm:text-lg">
                  <span className="whitespace-nowrap">{language === 'ar' ? 'اقرأ الخطة كاملة' : 'Read Full Plan'}</span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-islamic-primary/20 flex items-center justify-center group-hover:bg-islamic-primary group-hover:text-white transition-all">
                     {language === 'ar' ? <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {[
                    { link: '/quran', icon: BookOpen, title: 'quran', desc: 'تنمية مشاريع الخلاوي والتحفيظ ورعاية دور المرأة وتطوير المناهج القرآنية.', img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
                    { link: '/imams', icon: UserCheck, title: 'imams', desc: 'الترخيص المهني للإمام، وتحسين الأوضاع المعيشية، وبرامج الرعاية الصحية المتكاملة.', img: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
                    { link: '/callers', icon: Mic2, title: 'callers', desc: 'تعزيز التأثير المجتمعي، نشر الوسطية المستنيرة، ومحاربة التطرف عبر الحوار.', img: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }
                ].map((item, idx) => (
                    <Link key={idx} to={item.link} className="group relative h-[450px] sm:h-[600px] rounded-4xl sm:rounded-5xl overflow-hidden shadow-2xl transition-all hover:-translate-y-2 sm:hover:-translate-y-4">
                        <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-islamic-dark via-islamic-dark/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 text-white border border-white/20 group-hover:bg-islamic-gold group-hover:border-islamic-gold transition-all duration-500">
                                <item.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 font-serif tracking-tight leading-tight">{t(item.title)}</h3>
                            <p className="text-gray-200 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed font-light opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-700 line-clamp-3">
                                {language === 'ar' ? item.desc : 'Professional strategic action focusing on empowerment and enlightenment.'}
                            </p>
                            <span className="flex items-center gap-2 sm:gap-3 text-islamic-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm">
                                {t('viewDetails')} {language === 'ar' ? <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
         </div>
      </section>

      {/* 5. NEWS & MEDIA */}
      <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12 sm:mb-20">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif leading-tight">{t('latestNews')}</h2>
                  <Link to="/news" className="text-islamic-primary dark:text-islamic-gold font-bold hover:underline text-sm sm:text-base">{t('viewAllNews')}</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                  {latestNews.map((news, idx) => (
                      <div key={news.id} className="group flex flex-col bg-white dark:bg-gray-800 rounded-4xl sm:rounded-5xl overflow-hidden shadow-islamic hover:shadow-2xl transition-all duration-500 border border-transparent dark:border-gray-700">
                          <div className="h-56 sm:h-72 relative overflow-hidden">
                              <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000" />
                              <div className="absolute top-4 sm:top-6 start-4 sm:start-6 bg-white/90 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold text-gray-900 flex items-center gap-2 shadow-xl">
                                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-islamic-gold" /> {news.date}
                              </div>
                          </div>
                          <div className="p-8 sm:p-10 flex-1 flex flex-col">
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-snug group-hover:text-islamic-primary transition-colors font-serif">
                                  {news.title}
                              </h3>
                              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed line-clamp-3 mb-8 sm:mb-10 flex-1 font-light">
                                  {news.excerpt}
                              </p>
                              <Link to="/news" className="text-islamic-primary dark:text-islamic-gold font-bold text-xs sm:text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                  {t('readMore')} {language === 'ar' ? <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                              </Link>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. SUPPORT BANNER */}
      <section className="py-24 sm:py-40 bg-islamic-primary relative overflow-hidden px-4">
        <div className="absolute inset-0 opacity-10 arabesque-pattern scale-150 animate-slow-zoom"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-islamic-gold/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <div className="inline-flex p-6 sm:p-8 bg-white/10 backdrop-blur-3xl rounded-4xl sm:rounded-5xl shadow-2xl mb-8 sm:mb-12 border border-white/20 animate-float">
                <Heart className="w-12 h-12 sm:w-20 sm:h-20 text-white fill-white/20" />
           </div>
           <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-8 sm:mb-10 font-serif leading-tight">{t('supportProjects')}</h2>
           <p className="text-lg sm:text-2xl md:text-3xl text-islamic-light mb-12 sm:mb-16 leading-relaxed font-light opacity-90 max-w-2xl mx-auto">
             {language === 'ar' 
               ? 'ساهم في صندوق رعاية الأئمة والحفظة وبرنامج سكن كريم، وكن شريكاً في استقرار ونهضة العمل الدعوي في السودان.' 
               : 'Partner with us in the Imams Care Fund and the Decent Housing program, contributing to the renaissance of Da\'wah in Sudan.'}
           </p>
           <Link to="/support" className="inline-block bg-white text-islamic-primary px-10 sm:px-16 py-4 sm:py-6 rounded-full font-bold text-xl sm:text-2xl hover:bg-islamic-gold hover:text-white transition transform hover:-translate-y-2 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
             {language === 'ar' ? 'ساهم الآن' : 'Donate Now'}
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
