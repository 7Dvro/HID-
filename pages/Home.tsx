import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, BookOpen, UserCheck, ArrowRight, ArrowLeft, Heart, Mic2, FileText, Calendar, CheckCircle, MapPin, Star, GraduationCap, ChevronRight, PlayCircle, MessageCircle, HelpCircle, Sparkles, Quote, Video, PenTool, ShieldAlert, Laptop, Search, Coins, Clock, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: t('statsUsers'), value: '15,000+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: t('statsImams'), value: '2,500+', icon: MapPin, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: t('statsCourses'), value: '850+', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: t('fatwaAnswered'), value: '12,400+', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  const featuredImams = [
      { name: language === 'ar' ? 'الشيخ محمد إبراهيم' : 'Sheikh Mohammed Ibrahim', role: language === 'ar' ? 'إمام وخطيب' : 'Imam & Khatib', image: 'https://images.unsplash.com/photo-1590076215667-25cb4840eb19?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', location: language === 'ar' ? 'الخرطوم' : 'Khartoum' },
      { name: language === 'ar' ? 'د. عثمان الخميس' : 'Dr. Othman Al-Khamis', role: language === 'ar' ? 'أستاذ العقيدة' : 'Aqeedah Professor', image: 'https://images.unsplash.com/photo-1594382029377-b9c92cc2ce6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', location: language === 'ar' ? 'أم درمان' : 'Omdurman' },
      { name: language === 'ar' ? 'الشيخ عبدالله صالح' : 'Sheikh Abdullah Saleh', role: language === 'ar' ? 'مقرئ' : 'Reciter', image: 'https://images.unsplash.com/photo-1534579222473-b3c76b97b0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', location: language === 'ar' ? 'بحري' : 'Bahri' },
      { name: language === 'ar' ? 'الشيخ عمر أحمد' : 'Sheikh Omar Ahmed', role: language === 'ar' ? 'داعية' : 'Da\'i', image: 'https://images.unsplash.com/photo-1614742790937-2938a9d68bd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', location: language === 'ar' ? 'بورتسودان' : 'Port Sudan' },
  ];

  const featuredCourses = [
      { title: language === 'ar' ? 'فقه العبادات الميسر' : 'Simplified Fiqh', students: 1540, rating: 4.8, image: 'https://images.unsplash.com/photo-1591216109968-3e504ba415f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Fiqh' },
      { title: language === 'ar' ? 'علوم القرآن والتدبر' : 'Quran Sciences', students: 2100, rating: 4.9, image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Quran' },
      { title: language === 'ar' ? 'مهارات الإلقاء' : 'Public Speaking', students: 850, rating: 4.7, image: 'https://images.unsplash.com/photo-1576670158466-9a29e1208940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Skills' },
  ];

  const latestNews = [
    {
      id: 1,
      title: language === 'ar' ? 'انطلاق مسابقة الخرطوم للقرآن الكريم' : 'Khartoum Quran Competition Launch',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'أعلنت الهيئة العامة عن بدء التسجيل في الدورة العاشرة من المسابقة...' : 'The General Authority announced the start of registration for the 10th edition...'
    },
    {
      id: 2,
      title: language === 'ar' ? 'تدشين تطبيق "منبري" للأئمة' : 'Launch of "Minbari" App for Imams',
      date: '2024-03-10',
      image: 'https://images.unsplash.com/photo-1616593437252-0630a5ecb504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'تطبيق ذكي يساعد الأئمة في إعداد الخطب والتواصل مع المصلين...' : 'A smart app helping Imams prepare Khutbahs and connect with worshipers...'
    },
    {
      id: 3,
      title: language === 'ar' ? 'تخريج دفعة جديدة من الدعاة' : 'Graduation of New Batch of Callers',
      date: '2024-03-05',
      image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'احتفلت الهيئة بتخريج 500 داعية وداعية بعد إتمام البرنامج التأهيلي...' : 'The Authority celebrated the graduation of 500 Da\'is after completing the program...'
    }
  ];

  const fatwaSamples = [
      { q: language === 'ar' ? 'حكم الصلاة في الطائرة جالساً؟' : 'Ruling on praying sitting in a plane?', a: language === 'ar' ? 'إذا لم تستطع القيام فصل جالساً...' : 'If you cannot stand, pray sitting...' },
      { q: language === 'ar' ? 'زكاة الفطر نقداً؟' : 'Zakat al-Fitr in cash?', a: language === 'ar' ? 'يجوز عند الحاجة ومصلحة الفقير...' : 'Permissible if it serves the poor\'s interest...' },
      { q: language === 'ar' ? 'الجمع بين الصلاتين للمطر؟' : 'Combining prayers for rain?', a: language === 'ar' ? 'يجوز إذا كان المطر يبل الثياب...' : 'Permissible if rain soaks clothes...' },
  ];

  // Static prayer times for Khartoum (approximate)
  const prayers = [
    { name: 'fajr', time: '04:45 AM', icon: Moon, hour: 4, minute: 45 },
    { name: 'sunrise', time: '06:05 AM', icon: Sun, hour: 6, minute: 5 },
    { name: 'dhuhr', time: '12:15 PM', icon: Sun, hour: 12, minute: 15 },
    { name: 'asr', time: '03:45 PM', icon: Sun, hour: 15, minute: 45 },
    { name: 'maghrib', time: '06:25 PM', icon: Moon, hour: 18, minute: 25 },
    { name: 'isha', time: '07:55 PM', icon: Moon, hour: 19, minute: 55 },
  ];

  // Logic to find next prayer
  const getNextPrayer = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    // Filter out Sunrise as it's not a prayer for "Next Prayer" usually, but kept in list for display
    const prayerTimes = prayers.filter(p => p.name !== 'sunrise');
    
    for (let p of prayerTimes) {
      const prayerTotalMinutes = p.hour * 60 + p.minute;
      if (prayerTotalMinutes > currentTotalMinutes) {
        return p;
      }
    }
    // If no prayer left today, return Fajr (index 0)
    return prayers[0];
  };

  const nextPrayer = getNextPrayer();

  // Dynamic Hijri Date
  const hijriDate = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(currentTime);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-islamic-primary h-[700px] flex items-center overflow-hidden">
        {/* Background Pattern & Overlay */}
        <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Background" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-r from-islamic-dark via-islamic-primary/90 to-islamic-dark/80"></div>
           {/* Abstract Geometric Shapes */}
           <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-20 left-20 w-96 h-96 bg-islamic-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Text Content */}
            <div className="text-center md:text-start max-w-2xl animate-on-scroll">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-islamic-gold text-sm font-bold mb-6 border border-white/10 shadow-lg">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                   {language === 'ar' ? 'المنصة الرسمية - جمهورية السودان' : 'Official Platform - Republic of Sudan'}
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-serif drop-shadow-xl">
                    {t('heroTitle')}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed font-light opacity-90 max-w-lg mx-auto md:mx-0">
                    {t('heroSubtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link 
                        to="/education" 
                        className="bg-islamic-gold text-white hover:bg-yellow-600 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 group"
                    >
                        {t('exploreCourses')}
                        {language === 'ar' ? <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />}
                    </Link>
                    <Link 
                        to="/about" 
                        className="bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2"
                    >
                        {language === 'ar' ? 'تعرف علينا' : 'Know More'}
                    </Link>
                </div>
            </div>

            {/* Hero Graphic / 3D Element */}
            <div className="hidden md:block w-full max-w-lg relative animate-on-scroll delay-200">
                <div className="relative z-10 transform hover:scale-105 transition duration-700">
                    <img src="https://images.unsplash.com/photo-1596627006670-449e7fa69963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Islamic Art" className="rounded-2xl shadow-2xl border-4 border-white/10 rotate-3" />
                </div>
                {/* Decorative Elements around image */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-islamic-gold rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-islamic-primary rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP (Overlapping Hero) */}
      <div className="relative z-20 -mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 animate-on-scroll delay-300">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-200 dark:divide-gray-700">
                  {stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-5 p-2 group hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl transition cursor-default">
                          <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition duration-300 shadow-sm`}>
                              <stat.icon className="w-8 h-8" />
                          </div>
                          <div>
                              <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">{stat.value}</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 3. PRAYER TIMES WIDGET */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-on-scroll">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-islamic-primary/5 dark:bg-islamic-primary/10 p-4 border-b border-islamic-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-islamic-primary text-white rounded-lg">
                          <Clock className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">{t('prayerTimes')}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 font-mono">
                              <MapPin className="w-3 h-3" /> {t('khartoumTime')} ({currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})
                          </p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="text-center md:text-start">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">{t('hijriDate')}</p>
                          <p className="text-sm font-bold text-islamic-primary dark:text-islamic-gold font-serif">
                              {hijriDate}
                          </p>
                      </div>
                      <div className="text-center md:text-start border-s border-gray-300 dark:border-gray-600 ps-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">{t('nextPrayer')}</p>
                          <p className="text-sm font-bold text-islamic-primary dark:text-islamic-gold font-serif">
                              {t(nextPrayer.name)} - {nextPrayer.time}
                          </p>
                      </div>
                  </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700 rtl:divide-x-reverse">
                  {prayers.map((prayer, idx) => (
                      <div key={idx} className={`p-4 text-center group transition hover:bg-gray-50 dark:hover:bg-gray-700/50 ${prayer.name === nextPrayer.name ? 'bg-islamic-primary/10 dark:bg-islamic-primary/20 ring-inset ring-2 ring-islamic-primary/20' : ''}`}>
                          <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${prayer.name === nextPrayer.name ? 'text-islamic-primary dark:text-islamic-gold animate-pulse' : 'text-gray-400'}`}>
                              <prayer.icon className="w-5 h-5" />
                          </div>
                          <p className={`text-sm font-bold font-serif mb-1 ${prayer.name === nextPrayer.name ? 'text-islamic-primary dark:text-islamic-gold' : 'text-gray-700 dark:text-gray-300'}`}>
                              {t(prayer.name)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono" dir="ltr">
                              {prayer.time}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. E-SERVICES SECTION */}
      <section className="py-16 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 animate-on-scroll">
                  <div>
                      <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                          <Laptop className="w-4 h-4" />
                          {t('eServices')}
                      </span>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 font-serif">{t('eServicesSubtitle')}</h2>
                  </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                      { icon: HelpCircle, title: 'serviceFatwaReq', link: '/fatwa', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                      { icon: GraduationCap, title: 'serviceCourseReg', link: '/education', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                      { icon: Search, title: 'serviceImamFind', link: '/imams', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                      { icon: Coins, title: 'serviceSupport', link: '/support', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
                      { icon: BookOpen, title: 'serviceMushaf', link: '/quran', color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
                      { icon: Mic2, title: 'serviceKhutbah', link: '/imams', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
                  ].map((service, idx) => (
                      <Link key={idx} to={service.link} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-600 group text-center h-full animate-on-scroll" style={{ animationDelay: `${idx * 100}ms` }}>
                          <div className={`w-14 h-14 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                              <service.icon className="w-7 h-7" />
                          </div>
                          <span className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-islamic-primary dark:group-hover:text-islamic-gold transition-colors">
                              {t(service.title)}
                          </span>
                      </Link>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2 relative animate-on-scroll">
                      <div className="absolute -top-10 -left-10 w-40 h-40 bg-islamic-light dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-islamic-gold/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                      
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                          <img src="https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="About HID" className="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="font-serif text-2xl mb-1">{language === 'ar' ? 'رؤية طموحة' : 'Ambitious Vision'}</p>
                                    <p className="text-sm opacity-80">{language === 'ar' ? 'نحو مجتمع قرآني متميز' : 'Towards a distinguished Quranic society'}</p>
                                </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="lg:w-1/2 animate-on-scroll delay-100">
                      <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                          <span className="w-10 h-0.5 bg-islamic-primary dark:bg-islamic-gold"></span>
                          {t('about')}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 font-serif leading-tight">
                          {t('heroTitle')}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-loose mb-8 text-justify">
                          {t('aboutText')}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
                          {[
                              language === 'ar' ? 'هوية إسلامية أصيلة' : 'Authentic Islamic Identity',
                              language === 'ar' ? 'تطوير مستمر' : 'Continuous Development',
                              language === 'ar' ? 'تقنية حديثة' : 'Modern Technology',
                              language === 'ar' ? 'مرجعية موثوقة' : 'Trusted Reference'
                          ].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium">
                                  <CheckCircle className="w-5 h-5 text-islamic-gold flex-shrink-0" />
                                  <span>{item}</span>
                              </div>
                          ))}
                      </div>

                      <Link to="/about" className="inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-lg">
                          {t('readMore')}
                          {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                      </Link>
                  </div>
              </div>
          </div>
      </section>

      {/* 6. QURAN SPOTLIGHT */}
      <section className="relative py-24 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1597956966604-802c290352bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-on-scroll">
              <span className="inline-block py-1 px-4 border border-islamic-gold text-islamic-gold rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-black/30">
                  {t('verseOfTheDay')}
              </span>
              
              <div className="mb-10">
                  <Quote className="w-8 h-8 text-islamic-gold mx-auto mb-6 opacity-50" />
                  <h3 className="text-3xl md:text-5xl font-serif text-white leading-relaxed md:leading-loose">
                      لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ ٱللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُوا۟ ٱللَّهَ وَٱلْيَوْمَ ٱلْأَخِرَ وَذَكَرَ ٱللَّهَ كَثِيرًا
                  </h3>
                  <p className="text-gray-400 mt-6 font-serif text-lg">{language === 'ar' ? 'سورة الأحزاب - الآية 21' : 'Surah Al-Ahzab - Ayah 21'}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/quran" className="flex items-center justify-center gap-3 bg-islamic-gold text-white px-8 py-3.5 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg group">
                      <PlayCircle className="w-5 h-5" />
                      {t('listenVerse')}
                  </Link>
                  <Link to="/quran" className="flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition backdrop-blur-md">
                      <BookOpen className="w-5 h-5" />
                      {t('readTafsir')}
                  </Link>
              </div>
          </div>
      </section>

      {/* 7. MAIN SECTORS (SERVICES) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
               <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-wider text-sm">{language === 'ar' ? 'خدماتنا' : 'Our Services'}</span>
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 font-serif">{language === 'ar' ? 'قطاعات الهيئة الرئيسية' : 'Main Authority Sectors'}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { link: '/quran', icon: BookOpen, title: 'quran', descAr: 'المصحف التفاعلي، مكتبة المتون، إدارة الخلاوي.', descEn: 'Interactive Mushaf, Mutoon, Khalwa Mgmt.', img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    { link: '/imams', icon: UserCheck, title: 'imams', descAr: 'تطبيق منبري، مكتبة الخطب، وتطوير المهارات.', descEn: 'Minbari App, Khutbah Library, Skills Dev.', img: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    { link: '/callers', icon: Mic2, title: 'callers', descAr: 'صناعة المحتوى، مواجهة الشبهات، والتدريب.', descEn: 'Content Creation, Addressing Doubts, Training.', img: 'https://images.unsplash.com/photo-1544427920-29e812502c64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                ].map((item, idx) => (
                    <Link key={idx} to={item.link} className="group relative rounded-3xl overflow-hidden h-96 shadow-lg animate-on-scroll" style={{ animationDelay: `${idx * 150}ms` }}>
                        <div className="absolute inset-0">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-islamic-dark via-islamic-dark/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                        </div>
                        
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-islamic-gold group-hover:border-islamic-gold transition duration-300">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3 font-serif translate-y-2 group-hover:translate-y-0 transition duration-300">{t(item.title)}</h3>
                            <p className="text-gray-200 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100 leading-relaxed">
                                {language === 'ar' ? item.descAr : item.descEn}
                            </p>
                            <span className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs group-hover:gap-4 transition-all">
                                {t('viewDetails')} {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
         </div>
      </section>

      {/* 8. FEATURED IMAMS */}
      <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12 animate-on-scroll">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-serif">{t('featuredScholars')}</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">{language === 'ar' ? 'تعرف على نخبة من العلماء والدعاة المتميزين' : 'Meet elite scholars and distinguished callers'}</p>
                  </div>
                  <Link to="/imams" className="hidden md:flex items-center gap-2 text-islamic-primary dark:text-islamic-gold font-bold hover:gap-3 transition">
                      {t('viewAll')} {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredImams.map((imam, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:bg-white dark:hover:bg-gray-700 transition duration-300 group animate-on-scroll" style={{ animationDelay: `${idx * 100}ms` }}>
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full p-1 border-2 border-dashed border-islamic-gold group-hover:border-solid transition-all relative">
                              <img src={imam.image} alt={imam.name} className="w-full h-full rounded-full object-cover" />
                              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 font-serif">{imam.name}</h3>
                          <p className="text-islamic-primary dark:text-islamic-gold text-xs font-bold uppercase tracking-wide mb-3">{imam.role}</p>
                          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                              <MapPin className="w-3 h-3" /> {imam.location}
                          </div>
                          <Link to="/imams" className="w-full block py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-islamic-primary hover:text-white hover:border-islamic-primary transition">
                              {t('viewDetails')}
                          </Link>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 9. CALLERS TOOLKIT (From Callers Page) */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate-on-scroll">
                  <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-wider text-sm">{t('callers')}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 font-serif">{t('callersToolkit')}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t('callersSubtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Link to="/callers" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500 group animate-on-scroll">
                      <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Video className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">{t('contentGuide')}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                          {language === 'ar' ? 'دليلك الشامل لإنتاج المحتوى الدعوي المرئي والمسموع بأعلى جودة.' : 'Comprehensive guide for producing high-quality audio-visual Da\'wah content.'}
                      </p>
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                          {t('viewDetails')} {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </span>
                  </Link>

                  <Link to="/callers" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-red-500 group animate-on-scroll" style={{ animationDelay: '100ms' }}>
                      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <ShieldAlert className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">{t('shubuhatGuide')}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                          {language === 'ar' ? 'مكتبة متخصصة للرد على الشبهات الفكرية والعقدية المعاصرة.' : 'Specialized library for addressing contemporary intellectual and doctrinal doubts.'}
                      </p>
                      <span className="text-red-600 dark:text-red-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                          {t('viewDetails')} {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </span>
                  </Link>

                  <Link to="/callers" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500 group animate-on-scroll" style={{ animationDelay: '200ms' }}>
                      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Mic2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">{t('skillsGuide')}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                          {language === 'ar' ? 'دورات في فن الإلقاء، الحوار، ولغة الجسد للتأثير في الجمهور.' : 'Courses in public speaking, dialogue, and body language to influence the audience.'}
                      </p>
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                          {t('viewDetails')} {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </span>
                  </Link>
              </div>
          </div>
      </section>

      {/* 10. MOSQUES/KHALWAS BANNER */}
      <section className="relative py-28 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-islamic-dark/80"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-on-scroll">
              <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6">{t('discoverCenters')}</h2>
              <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                  {language === 'ar' 
                   ? 'اكتشف آلاف المساجد والخلاوي القرآنية في جميع أنحاء السودان، وتعرف على برامجها وأنشطتها.' 
                   : 'Discover thousands of Mosques and Quranic Khalwas across Sudan, and learn about their programs and activities.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/quran" className="bg-white text-islamic-primary px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {language === 'ar' ? 'البحث في الخريطة' : 'Search Map'}
                  </Link>
                  <Link to="/support" className="bg-islamic-gold text-white px-8 py-3.5 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      {language === 'ar' ? 'ساهم في البناء' : 'Support Building'}
                  </Link>
              </div>
          </div>
      </section>

      {/* 11. FEATURED COURSES (From Education Page) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12 animate-on-scroll">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-serif">{t('latestCourses')}</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">{language === 'ar' ? 'طور معارفك الشرعية ومهاراتك الدعوية' : 'Develop your Islamic knowledge and skills'}</p>
                  </div>
                  <Link to="/education" className="hidden md:flex items-center gap-2 text-islamic-primary dark:text-islamic-gold font-bold hover:gap-3 transition">
                      {t('viewAll')} {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredCourses.map((course, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 animate-on-scroll" style={{ animationDelay: `${idx * 150}ms` }}>
                          <div className="h-48 relative overflow-hidden">
                              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm text-islamic-dark">
                                  {course.category}
                              </div>
                          </div>
                          <div className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                      <Star className="w-3 h-3 fill-current" /> {course.rating}
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                                      <Users className="w-3 h-3" /> {course.students}
                                  </div>
                              </div>
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-islamic-primary dark:group-hover:text-islamic-gold transition-colors">
                                  {course.title}
                              </h3>
                              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                                      <GraduationCap className="w-4 h-4" />
                                      {language === 'ar' ? 'شهادة معتمدة' : 'Certified'}
                                  </div>
                                  <Link to="/education" className="text-islamic-primary font-bold text-sm hover:underline">
                                      {language === 'ar' ? 'سجل الآن' : 'Enroll Now'}
                                  </Link>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 12. FATWA CORNER */}
      <section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="animate-on-scroll">
                      <div className="inline-block p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-2xl mb-6">
                          <MessageCircle className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-serif mb-4">{t('fatwaCorner')}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                          {t('fatwaSubtitle')}
                      </p>
                      
                      <div className="space-y-4 mb-8">
                          {fatwaSamples.map((item, idx) => (
                              <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600 flex gap-4 transition hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <div className="mt-1 min-w-[24px]">
                                      <HelpCircle className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.q}</h4>
                                      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-1">{item.a}</p>
                                  </div>
                              </div>
                          ))}
                      </div>

                      <div className="flex gap-4">
                          <Link to="/fatwa" className="flex-1 bg-islamic-dark text-white px-6 py-3.5 rounded-xl font-bold text-center hover:bg-opacity-90 transition shadow-md flex items-center justify-center gap-2">
                              <Sparkles className="w-5 h-5" />
                              {t('askAi')}
                          </Link>
                          <Link to="/fatwa" className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3.5 rounded-xl font-bold text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                              {t('browseFatwas')}
                          </Link>
                      </div>
                  </div>
                  
                  <div className="relative animate-on-scroll delay-100">
                      <div className="absolute -inset-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl transform rotate-2"></div>
                      <img src="https://images.unsplash.com/photo-1596464528464-9be972eb049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Fatwa" className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover" />
                      <div className="absolute bottom-8 left-8 right-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 rounded-xl shadow-lg">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-islamic-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                                  H
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">{t('heroTitle')}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'لجنة الفتوى والإرشاد' : 'Fatwa & Guidance Committee'}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 13. LATEST NEWS */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 animate-on-scroll">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-serif">{t('latestNews')}</h2>
                  <div className="w-24 h-1.5 bg-islamic-gold mx-auto rounded-full mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {latestNews.map((news, idx) => (
                      <div key={news.id} className="group cursor-pointer animate-on-scroll" style={{ animationDelay: `${idx * 150}ms` }}>
                          <div className="rounded-2xl overflow-hidden mb-5 relative h-64 shadow-lg">
                              <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                              <div className="absolute top-4 start-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                                  <Calendar className="w-3 h-3 text-islamic-gold" /> {news.date}
                              </div>
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-islamic-primary transition">
                              {news.title}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                              {news.excerpt}
                          </p>
                          <Link to="/news" className="text-islamic-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                              {t('readMore')} {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                          </Link>
                      </div>
                  ))}
              </div>
              
              <div className="mt-10 text-center">
                   <Link to="/news" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-islamic-primary font-bold transition border-2 border-gray-200 dark:border-gray-700 hover:border-islamic-primary px-8 py-3 rounded-full">
                      {t('viewAllNews')}
                  </Link>
              </div>
          </div>
      </section>

      {/* 14. SUPPORT CTA */}
      <section className="py-24 bg-islamic-light dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-islamic-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-islamic-gold/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-on-scroll">
           <div className="inline-flex p-5 bg-white dark:bg-gray-800 rounded-full shadow-xl mb-8 text-red-500 animate-bounce">
                <Heart className="w-10 h-10 fill-current" />
           </div>
           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">{t('supportProjects')}</h2>
           <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
             {language === 'ar' 
               ? 'كن شريكاً في الخير.. ساهم في دعم مشاريع التحفيظ، بناء المساجد، وتأهيل الدعاة.' 
               : 'Be a partner in good.. Contribute to Quran memorization projects, building Mosques, and qualifying Callers.'}
           </p>
           <Link to="/support" className="inline-block bg-islamic-primary text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-islamic-dark shadow-2xl hover:shadow-islamic-primary/50 transition transform hover:-translate-y-1">
             {language === 'ar' ? 'تبرع الآن' : 'Donate Now'}
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;