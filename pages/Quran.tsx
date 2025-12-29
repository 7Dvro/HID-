
import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Book, Headphones, Mic, Search, Play, Pause, X, ArrowRight, ArrowLeft, Loader2, Bookmark, BookOpen, ChevronRight, ChevronLeft, Trash2, Volume2, List, Menu, CheckCircle, FileText, LayoutDashboard, PlayCircle, StopCircle, User, Settings2, Download, Info, ScrollText, GraduationCap, MapPin, Users, School, Star, TrendingUp, Filter, ExternalLink, PenTool as Pen, ShieldCheck, Lock, LogIn, UserPlus, Activity } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';

const VERSES_PER_PAGE = 10;

interface Reciter {
  id: string;
  nameAr: string;
  nameEn: string;
  serverFull: string;
  serverVerse: string;
}

interface MatnChapter {
  titleAr: string;
  titleEn: string;
  verses: string[];
}

interface Matn {
  id: string;
  titleAr: string;
  titleEn: string;
  authorAr: string;
  authorEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  chapters: MatnChapter[];
  color: string;
}

interface Khalwa {
  id: number;
  nameAr: string;
  nameEn: string;
  sheikhAr: string;
  sheikhEn: string;
  stateAr: string;
  stateEn: string;
  students: number;
  rating: number;
  image: string;
}

const RECITERS: Reciter[] = [
  {
    id: 'sudais',
    nameAr: 'الشيخ عبد الرحمن السديس',
    nameEn: 'Sheikh Abdul Rahman Al-Sudais',
    serverFull: 'https://server11.mp3quran.net/sds/',
    serverVerse: 'Abdurrahmaan_As-Sudais_192kbps'
  },
  {
    id: 'noreen',
    nameAr: 'الشيخ نورين محمد صديق (رحمه الله)',
    nameEn: 'Sheikh نورين Muhammad Siddiq',
    serverFull: 'https://server9.mp3quran.net/nourain/',
    serverVerse: 'Noreen_Muhammad_Siddiq_128kbps'
  },
  {
    id: 'alzain',
    nameAr: 'الشيخ الزين محمد أحمد',
    nameEn: 'Sheikh Al-Zain Muhammad Ahmad',
    serverFull: 'https://server9.mp3quran.net/zain/',
    serverVerse: 'Alzain_Mohammad_Ahmad_128kbps'
  },
  {
    id: 'alafasy',
    nameAr: 'الشيخ مشاري العفاسي',
    nameEn: 'Sheikh Mishary Al-Afasy',
    serverFull: 'https://server8.mp3quran.net/afs/',
    serverVerse: 'Alafasy_128kbps'
  },
  {
    id: 'abdulbasit',
    nameAr: 'الشيخ عبد الباسط عبد الصمد (مرتل)',
    nameEn: 'Sheikh Abdul Basit Abdul Samad',
    serverFull: 'https://server7.mp3quran.net/basit/',
    serverVerse: 'Abdul_Basit_Murattal_192kbps'
  },
  {
    id: 'maher',
    nameAr: 'الشيخ ماهر المعيقلي',
    nameEn: 'Sheikh Maher Al-Muaiqly',
    serverFull: 'https://server12.mp3quran.net/maher/',
    serverVerse: 'MaherAlMuaiqly128kbps'
  }
];

const MUTOON_DATA: Matn[] = [
  {
    id: 'tuhfa',
    titleAr: 'تحفة الأطفال والغلمان',
    titleEn: 'Tuhfat Al-Atfal',
    authorAr: 'الشيخ سليمان الجمزوري',
    authorEn: 'Sheikh Sulayman Al-Jamzuri',
    categoryAr: 'تجويد',
    categoryEn: 'Tajweed',
    color: 'from-emerald-500 to-teal-700',
    descriptionAr: 'منظومة شعرية في علم التجويد، للمبتدئين، تتناول أحكام النون الساكنة والميم والمدود.',
    descriptionEn: 'A poetic system in the science of Tajweed for beginners, covering the rulings of Noon Sakina, Meem, and Madd.',
    chapters: [
      {
        titleAr: 'المقدمة',
        titleEn: 'Introduction',
        verses: [
          'يَقُولُ رَاجِي رَحْمَةِ الْغَفُورِ ... دَوْمًا سُلَيْمَانُ هُوَ الْجَمْزُورِي',
          'الْحَمْدُ لِلَّهِ مُصَلِّيًا عَلَى ... مُحَمَّدٍ وَآلِهِ وَمَنْ تَلَا',
          'وَبَعْدُ: هَذَا النُّونُ لِلْمُرِيدِ ... فِي النُّونِ وَالتَّنْوِينِ وَالْمُدُودِ',
          'سَمَّيْتُهُ بِتُحْفَةِ الْأَطْفَالِ ... عَنْ شَيْخِنَا الْمِيهِيِّ ذِي الْكَمَالِ',
          'أَرْجُو بِهِ أَنْ يَنْفَعَ الطُّلَّابَا ... وَالْأَجْرَ وَالْقَبُولَ وَالثَّوَابَا'
        ]
      }
    ]
  },
  {
    id: 'jazari',
    titleAr: 'المقدمة الجزرية',
    titleEn: 'Al-Muqaddimah Al-Jazariyyah',
    authorAr: 'الإمام ابن الجزري',
    authorEn: 'Imam Ibn Al-Jazari',
    categoryAr: 'تجويد وقراءات',
    categoryEn: 'Tajweed & Qira\'at',
    color: 'from-blue-600 to-indigo-800',
    descriptionAr: 'العمدة في علم التجويد، شرح فيها مخارج الحروف وصفاتها وأحكام التلاوة بدقة وعمق.',
    descriptionEn: 'The definitive text in Tajweed, detailing letter articulations, attributes, and recitation rules.',
    chapters: []
  }
];

const KHALWA_DATA: Khalwa[] = [
  { id: 1, nameAr: 'خلوة ولاية الخرطوم النموذجية', nameEn: 'Khartoum State Model Khalwa', sheikhAr: 'الشيخ الفاتح قريب الله', sheikhEn: 'Sheikh Al-Fatih', stateAr: 'الخرطوم', stateEn: 'Khartoum', students: 850, rating: 4.9, image: 'https://images.unsplash.com/photo-1596464528464-9be972eb049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, nameAr: 'خلوة ولاية كسلا الكبرى', nameEn: 'Kassala State Grand Khalwa', sheikhAr: 'الشيخ علي بيتاي', sheikhEn: 'Sheikh Ali Betai', stateAr: 'كسلا', stateEn: 'Kassala', students: 3500, rating: 5.0, image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, nameAr: 'خلوة ولاية الجزيرة العريقة', nameEn: 'Gezira State Ancient Khalwa', sheikhAr: 'الشيخ محمد الفادني', sheikhEn: 'Sheikh Wad Al-Fadni', stateAr: 'الجزيرة', stateEn: 'Gezira', students: 1200, rating: 4.8, image: 'https://images.unsplash.com/photo-1552423316-c70a08191e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, nameAr: 'خلوة ولاية نهر النيل التاريخية', nameEn: 'River Nile State Historic Khalwa', sheikhAr: 'الشيخ حاج حمد الجعلي', sheikhEn: 'Sheikh Al-Jaali', stateAr: 'نهر النيل', stateEn: 'River Nile', students: 950, rating: 4.7, image: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const Quran: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'mushaf' | 'audio' | 'mutoon' | 'khalwa'>('mushaf');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [isReciterMenuOpen, setIsReciterMenuOpen] = useState(false);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [readingSurah, setReadingSurah] = useState<any | null>(null);
  const [surahVerses, setSurahVerses] = useState<any[]>([]);
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedBookmark, setSavedBookmark] = useState<{surah: number, ayah: number, page: number} | null>(null);
  const [selectedAyahForTafsir, setSelectedAyahForTafsir] = useState<any | null>(null);
  const [tafsirData, setTafsirData] = useState<string>('');
  const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);

  // Mutoon States
  const [selectedMatn, setSelectedMatn] = useState<Matn | null>(null);
  const [activeMatnChapter, setActiveMatnChapter] = useState<number>(0);

  // Khalwa States
  const [khalwaFilter, setKhalwaFilter] = useState('All');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalMode, setPortalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const saved = localStorage.getItem('quran_bookmark');
    if (saved) {
        setSavedBookmark(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.src = "";
      }
    };
  }, []);

  const padNum = (num: number) => num.toString().padStart(3, '0');

  useEffect(() => {
    if (activeVerseIndex === null || !readingSurah || surahVerses.length === 0) return;

    const targetPage = Math.ceil((activeVerseIndex + 1) / VERSES_PER_PAGE);
    if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
    }

    if (audioRef) audioRef.pause();
    
    const ayah = surahVerses[activeVerseIndex];
    const surahStr = padNum(readingSurah.number);
    const ayahStr = padNum(ayah.numberInSurah);
    const url = `https://everyayah.com/data/${selectedReciter.serverVerse}/${surahStr}${ayahStr}.mp3`;
    
    const audio = new Audio(url);
    setAudioRef(audio);
    
    audio.play().catch(e => {
        setIsPlaying(false);
        setActiveVerseIndex(null);
        showToast(language === 'ar' ? 'خطأ في تحميل التلاوة' : 'Error loading audio', 'error');
    });

    setIsPlaying(true);

    audio.onended = () => {
        if (activeVerseIndex < surahVerses.length - 1) {
            setActiveVerseIndex(prev => prev! + 1);
        } else {
            setActiveVerseIndex(null);
            setIsPlaying(false);
        }
    };

  }, [activeVerseIndex, selectedReciter, readingSurah, surahVerses, language, showToast, currentPage]);

  const tabs = [
    { id: 'mushaf', label: language === 'ar' ? 'المصحف' : 'Mushaf', icon: Book },
    { id: 'audio', label: language === 'ar' ? 'التلاوات' : 'Audio', icon: Headphones },
    { id: 'mutoon', label: language === 'ar' ? 'المتون' : 'Mutoon', icon: FileText },
    { id: 'khalwa', label: language === 'ar' ? 'الخلاوي' : 'Khalwa', icon: LayoutDashboard },
  ];

  const surahs = useMemo(() => Array.from({ length: 114 }, (_, i) => {
      const namesAr = ['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس', 'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر', 'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه', 'الأنبياء', 'الحج', 'المؤمنون', 'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم', 'لقمان', 'السجدة', 'الأحزاب', 'سبأ', 'فاطر', 'يس', 'الصافات', 'ص', 'الزمر', 'غافر', 'فصلت', 'الشورى', 'الزخرف', 'الدخان', 'الجاثية', 'الأحقاف', 'محمد', 'الفتح', 'الحجرات', 'ق', 'الذاريات', 'الطور', 'النجم', 'القمر', 'الرحمن', 'الواقعة', 'الحديد', 'المجادلة', 'الحشر', 'الممتحنة', 'الصف', 'الجمعة', 'المنافقون', 'التغابن', 'الطلاق', 'التحريم', 'الملك', 'القلم', 'الحاقة', 'المعارج', 'نوح', 'الجن', 'المزمل', 'المدثر', 'القيامة', 'الإنسان', 'المرسلات', 'النبأ', 'النازعات', 'عبس', 'التكوير', 'الانفطار', 'المطففين', 'الانشقاق', 'البروج', 'الطارق', 'الأعلى', 'الغاشية', 'الفجر', 'البلد', 'الشمس', 'الليل', 'الضحى', 'الشرح', 'التين', 'العلق', 'القدر', 'البينة', 'الزلزلة', 'العاديات', 'القارعة', 'التكاثر', 'العصر', 'الهمزة', 'الفيل', 'قريش', 'الماعون', 'الكوثر', 'الكافرون', 'النصر', 'المسد', 'الإخلاص', 'الفلق', 'الناس'];
      const namesEn = ['Al-Fatiha', 'Al-Baqarah', 'Ali Imran', 'An-Nisa', 'Al-Ma\'idah', 'Al-An\'am', 'Al-A\'raf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya', 'Al-Hajj', 'Al-Mu\'minun', 'An-Nur', 'Al-Furqan', 'Ash-Shu\'ara', 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajda', 'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar', 'Ghafir', 'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiya', 'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Adh-Dhariyat', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqi\'a', 'Al-Hadid', 'Al-Mujadila', 'Al-Hashr', 'Al-Mumtahina', 'As-Saff', 'Al-Jumu\'a', 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqa', 'Al-Ma\'arij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddathir', 'Al-Qiyama', 'Al-Insan', 'Al-Mursalat', 'An-Naba', 'An-Nazi\'at', 'Abasa', 'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-A\'la', 'Al-Ghashiya', 'Al-Fajr', 'Al-Balad', 'Ash-Shams', 'Al-Layl', 'Ad-Duha', 'Ash-Sharh', 'At-Tin', 'Al-Alaq', 'Al-Qadr', 'Al-Bayyina', 'Az-Zalzala', 'Al-Adiyat', 'Al-Qari\'a', 'At-Takathur', 'Al-Asr', 'Al-Humaza', 'Al-Fil', 'Quraysh', 'Al-Ma\'un', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'];
      return { number: i + 1, nameAr: namesAr[i], nameEn: namesEn[i], verses: 0 };
  }), []);

  const filteredSurahs = useMemo(() => {
    return surahs.filter(s => 
      s.nameAr.includes(searchQuery) || 
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString().includes(searchQuery)
    );
  }, [searchQuery, surahs]);

  const handleOpenSurah = async (surah: any) => {
    setReadingSurah(surah);
    setIsLoadingText(true);
    setSurahVerses([]);
    setIsSideMenuOpen(false);
    setActiveVerseIndex(null);
    setCurrentPage(savedBookmark?.surah === surah.number ? savedBookmark.page : 1);
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
        const data = await response.json();
        if (data.code === 200) setSurahVerses(data.data.ayahs);
    } catch (error) {
        showToast(language === 'ar' ? 'تأكد من اتصال الإنترنت' : 'Check internet connection', 'error');
    } finally {
        setIsLoadingText(false);
    }
  };

  const closeReader = () => {
      setReadingSurah(null);
      setSurahVerses([]);
      setActiveVerseIndex(null);
      if (audioRef) { audioRef.pause(); setIsPlaying(false); }
  };

  const handleOpenMatn = (matn: Matn) => {
      setSelectedMatn(matn);
      setActiveMatnChapter(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredKhalwas = useMemo(() => {
      return khalwaFilter === 'All' ? KHALWA_DATA : KHALWA_DATA.filter(k => k.stateEn === khalwaFilter);
  }, [khalwaFilter]);

  const handleOpenPortal = (mode: 'login' | 'register' = 'login') => {
      setPortalMode(mode);
      setIsPortalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!readingSurah && !selectedMatn && (
            <header className="mb-6 sm:mb-10 text-center animate-in fade-in">
                <h1 className="text-2xl sm:text-4xl font-bold text-islamic-dark dark:text-islamic-gold mb-3 sm:mb-4 font-serif">{t('quran')}</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
                    {language === 'ar' ? 'المنصة الشاملة لشؤون القرآن: مصحف تفاعلي، تلاوات، ومتابعة الخلاوي.' : 'The comprehensive platform for Quranic affairs: Interactive Mushaf, Recitations, and Khalwa management.'}
                </p>
            </header>
        )}

        {!readingSurah && !selectedMatn && (
            <div className="flex justify-center mb-6 sm:mb-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-full p-1.5 shadow-sm grid grid-cols-2 sm:flex gap-1 w-full max-w-lg transition-colors border border-gray-100 dark:border-gray-700">
                    {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all ${
                        activeTab === tab.id
                            ? 'bg-islamic-primary text-white shadow-lg shadow-islamic-primary/20'
                            : 'text-gray-500 dark:text-gray-400 hover:text-islamic-primary dark:hover:text-islamic-gold hover:bg-islamic-primary/5'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                    ))}
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-islamic p-4 sm:p-8 min-h-[500px] relative transition-all border border-gray-100 dark:border-gray-700">
          
          {!readingSurah && !selectedMatn ? (
              <>
                {(activeTab === 'mushaf' || activeTab === 'audio') && (
                    <div className="relative max-w-xl mx-auto mb-8 sm:mb-12">
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={language === 'ar' ? 'بحث عن سورة...' : 'Search for a Surah...'} className="w-full pl-10 pr-10 py-3 sm:py-4 rounded-2xl border-2 border-gray-50 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-islamic-primary focus:bg-white dark:focus:bg-gray-700 outline-none transition-all shadow-sm" />
                        <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-3.5 sm:top-4.5 text-gray-400 w-5 h-5`} />
                    </div>
                )}

                {activeTab === 'mushaf' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in">
                        {filteredSurahs.map((surah) => (
                            <div key={surah.number} onClick={() => handleOpenSurah(surah)} className="p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-islamic-gold hover:shadow-xl transition-all cursor-pointer flex items-center justify-between group bg-gray-50/30 dark:bg-gray-700/20 active:scale-[0.98]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold rounded-xl flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-islamic-primary group-hover:text-white transition-colors">{surah.number}</div>
                                    <h3 className="font-bold text-gray-900 dark:text-white font-serif text-lg sm:text-xl">{surah.nameAr}</h3>
                                </div>
                                <ChevronRight className="w-5 h-5 text-islamic-primary dark:text-islamic-gold opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'khalwa' && (
                    <div className="animate-in fade-in space-y-10">
                         {/* Khalwa Stats Dashboard */}
                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                             {[
                                 { icon: School, label: language === 'ar' ? 'خلوة مسجلة' : 'Reg. Khalwas', value: '450+', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                                 { icon: Users, label: language === 'ar' ? 'طالب علم' : 'Total Students', value: '12,500', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                                 { icon: User, label: language === 'ar' ? 'شيخ محفظ' : 'Active Sheikhs', value: '620', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                                 { icon: TrendingUp, label: language === 'ar' ? 'نسبة الإنجاز' : 'Completion Rate', value: '94%', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                             ].map((stat, i) => (
                                 <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm text-center group hover:shadow-md transition-all">
                                     <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                         <stat.icon className="w-6 h-6" />
                                     </div>
                                     <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h4>
                                     <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                 </div>
                             ))}
                         </div>

                         {/* Methodology & Systems */}
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                             <div className="lg:col-span-2 space-y-6">
                                 <div className="flex items-center justify-between px-2">
                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                         <MapPin className="w-5 h-5 text-islamic-gold" />
                                         {language === 'ar' ? 'دليل الخلاوي حسب الولايات' : 'Khalwas Directory'}
                                     </h3>
                                     <div className="flex gap-2">
                                         {['All', 'Khartoum', 'Kassala', 'Gezira'].map(state => (
                                             <button key={state} onClick={() => setKhalwaFilter(state)} className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${khalwaFilter === state ? 'bg-islamic-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200'}`}>
                                                 {state}
                                             </button>
                                         ))}
                                     </div>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     {filteredKhalwas.map((khalwa) => (
                                         <div key={khalwa.id} className="bg-gray-50/50 dark:bg-gray-700/30 rounded-[2.5rem] p-6 border border-gray-100 dark:border-gray-700 flex items-center gap-5 hover:bg-white dark:hover:bg-gray-700 transition-all cursor-pointer group active:scale-[0.98] shadow-sm">
                                             <div className="w-20 h-20 rounded-3xl overflow-hidden flex-shrink-0 shadow-md">
                                                 <img src={khalwa.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={khalwa.nameEn} />
                                             </div>
                                             <div className="flex-1 min-w-0">
                                                 <h4 className="font-bold text-gray-900 dark:text-white text-md truncate">{language === 'ar' ? khalwa.nameAr : khalwa.nameEn}</h4>
                                                 <p className="text-xs text-islamic-primary dark:text-islamic-gold font-bold mt-1 flex items-center gap-1">
                                                     <User className="w-3 h-3" /> {language === 'ar' ? khalwa.sheikhAr : khalwa.sheikhEn}
                                                 </p>
                                                 <div className="flex items-center justify-between mt-4">
                                                     <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                                                         <Users className="w-3 h-3" /> {khalwa.students} {language === 'ar' ? 'طالب' : 'Students'}
                                                     </span>
                                                     <div className="flex items-center gap-0.5 text-amber-400 text-[10px] font-bold">
                                                         <Star className="w-3 h-3 fill-current" /> {khalwa.rating}
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                             </div>

                             <div className="space-y-6">
                                 <h3 className="text-xl font-bold text-gray-900 dark:text-white px-2 flex items-center gap-2">
                                     <Pen className="w-5 h-5 text-islamic-gold" />
                                     {language === 'ar' ? 'أنظمة التلقين والحفظ' : 'Learning Systems'}
                                 </h3>
                                 <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden divide-y dark:divide-gray-700">
                                     {[
                                         { id: 1, title: 'طريقة اللوح التقليدية', titleEn: 'Traditional Loh Method', desc: 'نظام الكتابة على الألواح الخشبية وغسلها.', icon: ScrollText },
                                         { id: 2, title: 'نظام الحصون الخمسة', titleEn: 'Five Fortresses', desc: 'خطة مراجعة وحفظ يومية متكاملة.', icon: ShieldCheck },
                                         { id: 3, title: 'تأهيل الشيوخ والمحفظين', titleEn: 'Sheikh Qualification', desc: 'برنامج تربوي لضبط مهارات المحفظين.', icon: GraduationCap },
                                     ].map((sys) => (
                                         <div key={sys.id} onClick={() => handleOpenPortal('login')} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                             <div className="flex gap-4">
                                                 <div className="w-12 h-12 bg-islamic-primary/5 dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-islamic-primary group-hover:text-white transition-all">
                                                     <sys.icon className="w-6 h-6" />
                                                 </div>
                                                 <div>
                                                     <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{language === 'ar' ? sys.title : sys.titleEn}</h4>
                                                     <p className="text-xs text-gray-400 font-light leading-relaxed">{sys.desc}</p>
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                 </div>

                                 <button onClick={() => handleOpenPortal('login')} className="w-full bg-islamic-gold text-white p-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-islamic-gold/20 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all">
                                     <LayoutDashboard className="w-5 h-5" />
                                     {language === 'ar' ? 'دخول بوابة الإدارة' : 'Admin Portal Access'}
                                 </button>
                             </div>
                         </div>

                         {/* Resource Section */}
                         <div className="bg-islamic-dark rounded-[3rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
                             <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
                             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                 <div className="max-w-xl">
                                     <span className="text-islamic-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">{language === 'ar' ? 'المكتبة المنهجية' : 'Methodology Library'}</span>
                                     <h3 className="text-3xl font-bold font-serif mb-4">{language === 'ar' ? 'دليل مناهج الخلاوي السودانية' : 'Sudanese Khalwa Curriculum'}</h3>
                                     <p className="text-islamic-light/80 text-sm leading-relaxed mb-6">
                                         {language === 'ar' ? 'تحميل الحقيبة التدريبية الموحدة لطلاب الخلاوي والمحفظين، تشمل علوم القرآن، التجويد، والسيرة.' : 'Download the unified training package for Khalwa students and tutors, covering Quranic sciences, Tajweed, and Sira.'}
                                     </p>
                                     <div className="flex flex-wrap gap-4">
                                         <button onClick={() => handleOpenPortal('login')} className="bg-white text-islamic-dark px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-islamic-gold hover:text-white transition-all shadow-lg shadow-black/20">
                                             <Download className="w-4 h-4" /> {language === 'ar' ? 'تحميل المنهج' : 'Download PDF'}
                                         </button>
                                         <button onClick={() => handleOpenPortal('login')} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 transition-all">
                                             <PlayCircle className="w-4 h-4" /> {language === 'ar' ? 'مشاهدة الشرح' : 'Video Tutorial'}
                                         </button>
                                     </div>
                                 </div>
                                 <div className="w-full md:w-64 h-64 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center p-8">
                                     <ScrollText className="w-32 h-32 text-islamic-gold opacity-50" />
                                 </div>
                             </div>
                         </div>
                    </div>
                )}

                {activeTab === 'audio' && (
                    <div className="animate-in fade-in">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10 gap-4">
                            <h3 className="text-xl font-bold text-islamic-dark dark:text-white">{language === 'ar' ? 'المكتبة الصوتية' : 'Audio Library'}</h3>
                            <button onClick={() => setIsReciterMenuOpen(!isReciterMenuOpen)} className="w-full sm:w-auto flex items-center justify-between gap-3 px-5 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm font-bold border border-gray-100 dark:border-gray-600">
                                <User className="w-4 h-4 text-islamic-primary" />
                                <span>{language === 'ar' ? selectedReciter.nameAr : selectedReciter.nameEn}</span>
                                <Settings2 className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSurahs.map((surah) => (
                                <div key={surah.number} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all flex items-center gap-4 group">
                                    <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-gray-700 text-gray-500 group-hover:bg-islamic-gold group-hover:text-white shadow-sm transition-all"><Play className="w-5 h-5 ms-0.5" /></button>
                                    <div>
                                        <h3 className="font-bold font-serif text-lg text-gray-800 dark:text-white">{surah.nameAr}</h3>
                                        <p className="text-[10px] text-gray-400 uppercase">{surah.nameEn}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'mutoon' && (
                    <div className="space-y-10 animate-in fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {MUTOON_DATA.map((matn) => (
                                <div key={matn.id} className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row overflow-hidden group">
                                    <div className={`sm:w-1/3 bg-gradient-to-br ${matn.color} p-8 flex flex-col justify-between text-white relative`}>
                                        <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
                                        <h3 className="text-2xl font-bold font-serif relative z-10">{matn.titleAr}</h3>
                                        <p className="text-xs opacity-80 relative z-10 flex items-center gap-2"><User className="w-3 h-3" /> {language === 'ar' ? matn.authorAr : matn.authorEn}</p>
                                    </div>
                                    <div className="flex-1 p-8 flex flex-col justify-between">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">{language === 'ar' ? matn.descriptionAr : matn.descriptionEn}</p>
                                        <button onClick={() => handleOpenMatn(matn)} className="w-full py-3.5 bg-islamic-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-islamic-dark shadow-lg shadow-islamic-primary/20 flex items-center justify-center gap-2">
                                            <BookOpen className="w-4 h-4" /> {language === 'ar' ? 'قراءة المتن' : 'Open Text'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
              </>
          ) : readingSurah ? (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20 -mx-4 sm:mx-0">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 border-b dark:border-gray-700 pb-4 sticky top-[-1rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md z-40 pt-2 px-4">
                      <div className="flex items-center gap-2">
                          <button onClick={closeReader} className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 text-gray-600 dark:text-gray-300 hover:text-red-500 rounded-xl transition-all"><X className="w-5 h-5" /></button>
                          <button onClick={() => setIsSideMenuOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-islamic-primary/5 dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold rounded-xl hover:bg-islamic-primary hover:text-white transition-all font-bold text-sm shadow-sm"><List className="w-4 h-4" /> <span className="hidden xs:inline">{language === 'ar' ? 'الفهرس' : 'Index'}</span></button>
                      </div>
                      <div className="text-2xl sm:text-4xl font-serif text-islamic-dark dark:text-islamic-gold font-bold">{readingSurah.nameAr}</div>
                  </div>
                  {isLoadingText ? (
                      <div className="flex flex-col items-center justify-center py-32 animate-in fade-in">
                          <Loader2 className="w-12 h-12 text-islamic-primary animate-spin mb-4" />
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{language === 'ar' ? 'جاري تحميل كلام الله...' : 'Loading Verses...'}</p>
                      </div>
                  ) : (
                      <div className="max-w-3xl mx-auto px-2 sm:px-4" dir="rtl">
                          <div className="font-serif text-3xl sm:text-5xl leading-[2.8] sm:leading-[3] text-gray-800 dark:text-gray-200 text-center">
                                {surahVerses.map((ayah) => (
                                    <span key={ayah.number} className="inline relative">
                                        <span className="cursor-pointer rounded-2xl px-2 py-1 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all">{ayah.text}</span>
                                        <span className="inline-flex items-center justify-center w-10 h-10 mx-2 align-middle border border-islamic-gold rounded-full text-xs font-bold text-islamic-gold">{ayah.numberInSurah}</span>
                                    </span>
                                ))}
                          </div>
                      </div>
                  )}
              </div>
          ) : (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20">
                  <div className="flex flex-col lg:flex-row gap-10">
                      <aside className="lg:w-80 flex-shrink-0 space-y-6">
                         <button onClick={() => setSelectedMatn(null)} className="flex items-center gap-3 text-gray-500 hover:text-islamic-primary transition font-black uppercase tracking-widest text-[10px]"><ArrowRight className="w-4 h-4" /> {language === 'ar' ? 'العودة للمكتبة' : 'Back to Library'}</button>
                         <div className={`p-8 rounded-[2rem] bg-gradient-to-br ${selectedMatn.color} text-white shadow-xl relative overflow-hidden`}><div className="absolute inset-0 arabesque-pattern opacity-10"></div><h2 className="text-2xl font-bold font-serif mb-2 relative z-10">{selectedMatn.titleAr}</h2></div>
                         <div className="bg-gray-50 dark:bg-gray-700/30 rounded-[2rem] p-4 border border-gray-100 dark:border-gray-700">
                             <h4 className="px-4 py-2 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b dark:border-gray-600 mb-2">{language === 'ar' ? 'الفصول' : 'Chapters'}</h4>
                             {selectedMatn.chapters.length > 0 ? selectedMatn.chapters.map((chap, idx) => (
                                 <button key={idx} onClick={() => setActiveMatnChapter(idx)} className={`w-full text-start px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${activeMatnChapter === idx ? 'bg-islamic-primary text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'}`}><span>{chap.titleAr}</span>{activeMatnChapter === idx && <CheckCircle className="w-4 h-4" />}</button>
                             )) : <p className="p-4 text-xs text-gray-400 italic">{language === 'ar' ? 'المحتوى قيد التحديث...' : 'Content being updated...'}</p>}
                         </div>
                      </aside>
                      <main className="flex-1 bg-white dark:bg-gray-800 rounded-[3rem] p-8 sm:p-12 border border-gray-50 dark:border-gray-700 shadow-sm">
                          {selectedMatn.chapters[activeMatnChapter] ? (
                              <div dir="rtl">
                                  <div className="text-center mb-16"><h3 className="text-3xl sm:text-4xl font-bold font-serif text-islamic-dark dark:text-islamic-gold inline-block border-b-2 border-islamic-gold/20 pb-4">{selectedMatn.chapters[activeMatnChapter].titleAr}</h3></div>
                                  <div className="space-y-10 max-w-2xl mx-auto">
                                      {selectedMatn.chapters[activeMatnChapter].verses.map((verse, vIdx) => {
                                          const parts = verse.split('...');
                                          return (
                                              <div key={vIdx} className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-justify group">
                                                  <div className="flex-1 text-2xl sm:text-3xl font-serif text-gray-800 dark:text-gray-200 leading-loose group-hover:text-islamic-primary transition-colors">{parts[0]}</div>
                                                  <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-600 flex items-center justify-center text-xs font-bold text-gray-400 bg-gray-50 dark:bg-gray-700 shadow-inner">{vIdx + 1}</div>
                                                  <div className="flex-1 text-2xl sm:text-3xl font-serif text-gray-800 dark:text-gray-200 leading-loose text-end group-hover:text-islamic-primary transition-colors">{parts[1]}</div>
                                              </div>
                                          );
                                      })}
                                  </div>
                              </div>
                          ) : <div className="flex flex-col items-center justify-center h-full py-20 text-center"><Info className="w-16 h-16 text-gray-100 dark:text-gray-700 mb-6" /><h3 className="text-xl font-bold text-gray-300 dark:text-gray-600">{language === 'ar' ? 'المحتوى غير متوفر حالياً' : 'Content is not available yet'}</h3></div>}
                      </main>
                  </div>
              </div>
          )}

          {isSideMenuOpen && (
              <div className="fixed inset-0 z-[100] flex">
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsSideMenuOpen(false)}></div>
                  <div className={`relative w-80 max-w-[85%] bg-white dark:bg-gray-800 h-full shadow-5xl flex flex-col animate-in ${language === 'ar' ? 'slide-in-from-right' : 'slide-in-from-left'} duration-500`}>
                      <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-700/30"><h3 className="font-bold text-xl text-islamic-dark dark:text-white font-serif">{language === 'ar' ? 'فهرس السور' : 'Surah Index'}</h3><button onClick={() => setIsSideMenuOpen(false)} className="p-2.5 bg-white dark:bg-gray-600 rounded-xl shadow-sm text-gray-400 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button></div>
                      <div className="overflow-y-auto flex-1 p-4 space-y-2 custom-scrollbar">
                          {surahs.map((surah) => (
                              <button key={surah.number} onClick={() => handleOpenSurah(surah)} className={`w-full text-start px-5 py-4 rounded-2xl flex items-center justify-between transition-all group ${readingSurah?.number === surah.number ? 'bg-islamic-primary text-white shadow-lg shadow-islamic-primary/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'}`}><div className="flex items-center gap-4"><span className={`text-[10px] font-black w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${readingSurah?.number === surah.number ? 'border-white/50 bg-white/10' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>{surah.number}</span><span className="font-serif text-lg">{surah.nameAr}</span></div>{readingSurah?.number === surah.number && <div className="w-2 h-2 bg-islamic-gold rounded-full animate-pulse"></div>}</button>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {/* Khalwa Portal Modal */}
          {isPortalOpen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-islamic-dark/60 backdrop-blur-xl animate-in fade-in duration-300">
                  <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-5xl w-full max-w-lg overflow-hidden flex flex-col relative border border-white/20">
                      <button onClick={() => setIsPortalOpen(false)} className="absolute top-6 end-6 p-2 text-gray-400 hover:text-red-500 transition-colors z-20"><X className="w-6 h-6" /></button>
                      
                      <div className="bg-islamic-primary p-10 text-center text-white relative">
                          <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
                          <div className="relative z-10">
                              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
                                  <School className="w-10 h-10 text-islamic-gold" />
                              </div>
                              <h2 className="text-3xl font-bold font-serif mb-2">{language === 'ar' ? 'بوابة إدارة الخلاوي' : 'Khalwa Admin Portal'}</h2>
                              <p className="text-islamic-light/80 text-sm">{language === 'ar' ? 'النظام الإلكتروني الموحد لشؤون التحفيظ' : 'Unified E-System for Quranic Affairs'}</p>
                          </div>
                      </div>

                      <div className="p-10">
                          <div className="flex gap-4 mb-8 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700">
                              <button onClick={() => setPortalMode('login')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${portalMode === 'login' ? 'bg-white dark:bg-gray-700 text-islamic-primary shadow-sm' : 'text-gray-400'}`}>
                                  <LogIn className="w-4 h-4" />
                                  {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                              </button>
                              <button onClick={() => setPortalMode('register')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${portalMode === 'register' ? 'bg-white dark:bg-gray-700 text-islamic-primary shadow-sm' : 'text-gray-400'}`}>
                                  <UserPlus className="w-4 h-4" />
                                  {language === 'ar' ? 'تسجيل جديد' : 'Register'}
                              </button>
                          </div>

                          <form onSubmit={(e) => { e.preventDefault(); showToast(language === 'ar' ? 'البوابة قيد التحديث' : 'Portal is being updated', 'info'); setIsPortalOpen(false); }} className="space-y-5">
                              {portalMode === 'register' && (
                                  <div className="relative">
                                      <input type="text" placeholder={language === 'ar' ? 'اسم الخلوة' : 'Khalwa Name'} className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:border-islamic-gold transition text-sm dark:text-white" required />
                                  </div>
                              )}
                              <div className="relative">
                                  <input type="email" placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:border-islamic-gold transition text-sm dark:text-white" required />
                              </div>
                              <div className="relative">
                                  <input type="password" placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'} className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:border-islamic-gold transition text-sm dark:text-white" required />
                              </div>
                              
                              <button type="submit" className="w-full bg-islamic-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-islamic-primary/20 hover:bg-islamic-dark transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                                  {portalMode === 'login' ? (language === 'ar' ? 'دخول النظام' : 'Access Portal') : (language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')}
                              </button>
                          </form>

                          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 text-center">
                              <p className="text-xs text-gray-400 mb-4">{language === 'ar' ? 'دعم فني متاح 24/7 لمسؤولي الخلاوي' : '24/7 technical support for Khalwa administrators'}</p>
                              <div className="flex justify-center gap-6 text-gray-300">
                                  <Lock className="w-4 h-4" />
                                  <ShieldCheck className="w-4 h-4" />
                                  <Activity className="w-4 h-4" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quran;
