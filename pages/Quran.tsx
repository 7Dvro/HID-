
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Book, Headphones, Search, Play, Pause, X, ArrowRight, ArrowLeft, Loader2, Bookmark, BookOpen, ChevronRight, Volume2, List, CheckCircle, FileText, LayoutDashboard, PlayCircle, User, Settings2, Download, Info, ScrollText, GraduationCap, MapPin, Users, School, Star, TrendingUp, PenTool as Pen, ShieldCheck, Lock, LogIn, UserPlus, Activity, BookmarkCheck } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';

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
    nameEn: 'Sheikh Noreen Muhammad Siddiq',
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
  }
];

interface Reciter {
  id: string;
  nameAr: string;
  nameEn: string;
  serverFull: string;
  serverVerse: string;
}

const Quran: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'mushaf' | 'audio' | 'mutoon' | 'khalwa'>('mushaf');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[1]); 
  const [isReciterMenuOpen, setIsReciterMenuOpen] = useState(false);
  
  const [readingSurah, setReadingSurah] = useState<any | null>(null);
  const [surahVerses, setSurahVerses] = useState<any[]>([]);
  const [isLoadingText, setIsLoadingText] = useState(false);
  
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null);
  const audioInstance = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Record<number, number>>({});
  
  const [selectedAyahForTafsir, setSelectedAyahForTafsir] = useState<any | null>(null);
  const [tafsirData, setTafsirData] = useState<string>('');
  const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hid_quran_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    return () => {
      if (audioInstance.current) {
        audioInstance.current.pause();
      }
    };
  }, []);

  const padNum = (num: number) => num.toString().padStart(3, '0');

  const handlePlayAyah = (index: number) => {
    if (audioInstance.current) {
      audioInstance.current.pause();
      audioInstance.current = null;
    }
    
    if (index >= surahVerses.length) {
      setIsPlaying(false);
      setActiveVerseIndex(null);
      return;
    }

    setActiveVerseIndex(index);
    const ayah = surahVerses[index];
    const surahStr = padNum(readingSurah.number);
    const ayahStr = padNum(ayah.numberInSurah);
    const url = `https://everyayah.com/data/${selectedReciter.serverVerse}/${surahStr}${ayahStr}.mp3`;
    
    const audio = new Audio(url);
    audioInstance.current = audio;
    setIsPlaying(true);
    
    audio.play().catch((err) => {
        console.error("Audio Play Error:", err);
        setIsPlaying(false);
        showToast(language === 'ar' ? 'خطأ في تشغيل التلاوة' : 'Error playing recitation', 'error');
    });

    audio.onended = () => {
        handlePlayAyah(index + 1);
    };

    // Scroll to active verse
    const el = document.getElementById(`ayah-${ayah.numberInSurah}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const stopAudio = () => {
    if (audioInstance.current) {
      audioInstance.current.pause();
      audioInstance.current = null;
    }
    setIsPlaying(false);
    setActiveVerseIndex(null);
  };

  const toggleBookmark = (surahNum: number, ayahNum: number) => {
    const newBookmarks = { ...bookmarks };
    if (bookmarks[surahNum] === ayahNum) {
        delete newBookmarks[surahNum];
        showToast(language === 'ar' ? 'تم حذف العلامة' : 'Bookmark removed', 'info');
    } else {
        newBookmarks[surahNum] = ayahNum;
        showToast(language === 'ar' ? 'تم حفظ العلامة بنجاح' : 'Bookmark saved', 'success');
    }
    setBookmarks(newBookmarks);
    localStorage.setItem('hid_quran_bookmarks', JSON.stringify(newBookmarks));
  };

  const fetchTafsir = async (ayah: any) => {
    setSelectedAyahForTafsir(ayah);
    setIsLoadingTafsir(true);
    setTafsirData('');
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayah.number}/ar.jalalayn`);
        const data = await response.json();
        if (data.code === 200) {
            setTafsirData(data.data.text);
        }
    } catch (e) {
        showToast(language === 'ar' ? 'خطأ في جلب التفسير' : 'Error fetching Tafsir', 'error');
    } finally {
        setIsLoadingTafsir(false);
    }
  };

  const surahs = useMemo(() => Array.from({ length: 114 }, (_, i) => {
      const namesAr = ['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس', 'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر', 'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه', 'الأنبياء', 'الحج', 'المؤمنون', 'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم', 'لقمان', 'السجدة', 'الأحزاب', 'سبأ', 'فاطر', 'يس', 'الصافات', 'ص', 'الزمر', 'غافر', 'فصلت', 'الشورى', 'الزخرف', 'الدخان', 'الجاثية', 'الأحقاف', 'محمد', 'الفتح', 'الحجرات', 'ق', 'الذاريات', 'الطور', 'النجم', 'القمر', 'الرحمن', 'الواقعة', 'الحديد', 'المجادلة', 'الحشر', 'الممتحنة', 'الصف', 'الجمعة', 'المنافقون', 'التغابن', 'الطلاق', 'التحريم', 'الملك', 'القلم', 'الحاقة', 'المعارج', 'نوح', 'الجن', 'المزمل', 'المدثر', 'القيامة', 'الإنسان', 'المرسلات', 'النبأ', 'النازعات', 'عبس', 'التكوير', 'الانفطار', 'المطففين', 'الانشقاق', 'البروج', 'الطارق', 'الأعلى', 'الغاشية', 'الفجر', 'البلد', 'الشمس', 'الليل', 'الضحى', 'الشرح', 'التين', 'العلق', 'القدر', 'البينة', 'الزلزلة', 'العاديات', 'القارعة', 'التكاثر', 'العصر', 'الهمزة', 'الفيل', 'قريش', 'الماعون', 'الكوثر', 'الكافرون', 'النصر', 'المسد', 'الإخلاص', 'الفلق', 'الناس'];
      const namesEn = ['Al-Fatiha', 'Al-Baqarah', 'Ali Imran', 'An-Nisa', 'Al-Ma\'idah', 'Al-An\'am', 'Al-A\'raf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya', 'Al-Hajj', 'Al-Mu\'minun', 'An-Nur', 'Al-Furqan', 'Ash-Shu\'ara', 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajda', 'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar', 'Ghafir', 'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiya', 'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Adh-Dhariyat', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqi\'a', 'Al-Hadid', 'Al-Mujadila', 'Al-Hashr', 'Al-Mumtahina', 'As-Saff', 'Al-Jumu\'a', 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqa', 'Al-Ma\'arij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddathir', 'Al-Qiyama', 'Al-Insan', 'Al-Mursalat', 'An-Naba', 'An-Nazi\'at', 'Abasa', 'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-A\'la', 'Al-Ghashiya', 'Al-Fajr', 'Al-Balad', 'Ash-Shams', 'Al-Layl', 'Ad-Duha', 'Ash-Sharh', 'At-Tin', 'Al-Alaq', 'Al-Qadr', 'Al-Bayyina', 'Az-Zalzala', 'Al-Adiyat', 'Al-Qari\'a', 'At-Takathur', 'Al-Asr', 'Al-Humaza', 'Al-Fil', 'Quraysh', 'Al-Ma\'un', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'];
      return { number: i + 1, nameAr: namesAr[i], nameEn: namesEn[i] };
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
    stopAudio();
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
    stopAudio();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!readingSurah && (
            <header className="mb-10 text-center animate-fade-up">
                <h1 className="text-3xl sm:text-5xl font-bold text-islamic-dark dark:text-islamic-gold mb-4 font-serif">{t('quran')}</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base">
                    {language === 'ar' ? 'بوابة علوم القرآن الرقمية: مصحف تفاعلي، مكتبة صوتية، وإدارة شاملة لشؤون الخلاوي.' : 'Digital Quranic Sciences Portal: Interactive Mushaf, Audio Library, and Khalwa Management.'}
                </p>
            </header>
        )}

        {!readingSurah && (
            <div className="flex justify-center mb-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-full p-1.5 shadow-sm grid grid-cols-2 sm:flex gap-1 w-full max-w-2xl border border-gray-100 dark:border-gray-700">
                    {[
                        { id: 'mushaf', label: language === 'ar' ? 'المصحف التفاعلي' : 'Interactive Mushaf', icon: Book },
                        { id: 'audio', label: language === 'ar' ? 'المكتبة الصوتية' : 'Audio Library', icon: Headphones },
                        { id: 'mutoon', label: language === 'ar' ? 'متون التجويد' : 'Tajweed Texts', icon: FileText },
                        { id: 'khalwa', label: language === 'ar' ? 'بوابة الخلاوي' : 'Khalwas Portal', icon: LayoutDashboard },
                    ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-full text-sm font-bold transition-all ${
                        activeTab === tab.id
                            ? 'bg-islamic-primary text-white shadow-islamic'
                            : 'text-gray-500 dark:text-gray-400 hover:text-islamic-primary hover:bg-islamic-primary/5'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                    ))}
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-islamic p-4 sm:p-10 min-h-[600px] relative transition-all border border-gray-100 dark:border-gray-700">
          
          {!readingSurah ? (
              <>
                {(activeTab === 'mushaf' || activeTab === 'audio') && (
                    <div className="relative max-w-xl mx-auto mb-12 px-4">
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={language === 'ar' ? 'بحث عن سورة أو رقم...' : 'Search for Surah or Number...'} className="w-full px-12 py-4 rounded-2xl border-2 border-gray-50 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-islamic-primary focus:bg-white dark:focus:bg-gray-700 outline-none transition-all shadow-sm" />
                        <Search className={`absolute ${language === 'ar' ? 'right-8' : 'left-8'} top-4.5 text-gray-400 w-5 h-5`} />
                    </div>
                )}

                {activeTab === 'mushaf' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in">
                        {filteredSurahs.map((surah) => (
                            <div key={surah.number} onClick={() => handleOpenSurah(surah)} className="p-6 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-islamic-gold hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center gap-4 group bg-gray-50/30 dark:bg-gray-700/20 active:scale-95 relative overflow-hidden">
                                {bookmarks[surah.number] && <div className="absolute top-0 end-0 p-2 bg-islamic-gold text-white rounded-bl-xl shadow-lg"><BookmarkCheck className="w-4 h-4" /></div>}
                                <div className="w-14 h-14 bg-white dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold rounded-2xl flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-islamic-primary group-hover:text-white transition-all">{surah.number}</div>
                                <div className="text-center">
                                    <h3 className="font-bold text-gray-900 dark:text-white font-serif text-2xl mb-1">{language === 'ar' ? 'سورة ' : 'Surah '}{surah.nameAr}</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">{surah.nameEn}</p>
                                </div>
                                <div className="mt-2 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-islamic-gold w-0 group-hover:w-full transition-all duration-700"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'audio' && (
                    <div className="animate-in fade-in">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6 border-b dark:border-gray-700 pb-8">
                            <h3 className="text-2xl font-bold text-islamic-dark dark:text-white font-serif">{language === 'ar' ? 'المكتبة الصوتية الشاملة' : 'Full Audio Library'}</h3>
                            <button onClick={() => setIsReciterMenuOpen(!isReciterMenuOpen)} className="flex items-center gap-3 px-6 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-sm font-bold border border-gray-100 dark:border-gray-600 hover:border-islamic-gold transition-all relative">
                                <User className="w-5 h-5 text-islamic-primary" />
                                <span>{language === 'ar' ? selectedReciter.nameAr : selectedReciter.nameEn}</span>
                                <Settings2 className="w-4 h-4 text-gray-400" />
                                {isReciterMenuOpen && (
                                  <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-5xl rounded-2xl p-2 z-50 border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95">
                                    {RECITERS.map(r => (
                                      <button key={r.id} onClick={(e) => { e.stopPropagation(); setSelectedReciter(r); setIsReciterMenuOpen(false); }} className={`w-full text-start px-4 py-3 rounded-xl text-xs font-bold transition ${selectedReciter.id === r.id ? 'bg-islamic-primary text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                        {language === 'ar' ? r.nameAr : r.nameEn}
                                      </button>
                                    ))}
                                  </div>
                                )}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSurahs.map((surah) => (
                                <div key={surah.number} onClick={() => handleOpenSurah(surah)} className="p-6 rounded-3xl border border-gray-100 dark:border-gray-700 hover:bg-islamic-primary/5 hover:border-islamic-primary transition-all flex items-center gap-5 group cursor-pointer shadow-sm">
                                    <button className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-700 text-islamic-primary group-hover:bg-islamic-primary group-hover:text-white transition-all shadow-sm"><Play className="w-6 h-6 ms-1" /></button>
                                    <div className="flex-1">
                                        <h3 className="font-bold font-serif text-xl text-gray-800 dark:text-white">{language === 'ar' ? 'سورة ' : 'Surah '}{surah.nameAr}</h3>
                                        <p className="text-[10px] text-gray-400 font-black uppercase">{surah.nameEn}</p>
                                    </div>
                                    <Volume2 className="w-4 h-4 text-gray-200 group-hover:text-islamic-gold" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {activeTab === 'khalwa' && <div className="text-center py-20 text-gray-400 font-serif text-2xl">{language === 'ar' ? 'بوابة إدارة الخلاوي قيد الصيانة' : 'Khalwas Portal under maintenance'}</div>}
                {activeTab === 'mutoon' && <div className="text-center py-20 text-gray-400 font-serif text-2xl">{language === 'ar' ? 'مكتبة المتون قيد التحديث' : 'Mutoon library being updated'}</div>}
              </>
          ) : (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 max-w-5xl mx-auto">
                  {/* Surah Header - Mushaf Style */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b dark:border-gray-700 pb-8 sticky top-[-2.5rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl z-50 pt-4 px-2">
                      <div className="flex items-center gap-4">
                          <button onClick={closeReader} className="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-600 dark:text-gray-300 hover:text-red-500 rounded-2xl transition-all shadow-sm"><X className="w-6 h-6" /></button>
                          <button onClick={() => setIsSideMenuOpen(true)} className="flex items-center gap-3 px-6 py-3 bg-islamic-primary text-white rounded-2xl hover:bg-islamic-dark transition-all font-bold text-sm shadow-xl shadow-islamic-primary/20"><List className="w-5 h-5" /> {language === 'ar' ? 'الفهرس' : 'Index'}</button>
                      </div>
                      
                      <div className="text-center mt-4 sm:mt-0 relative px-12">
                          {/* Traditional Ornament Background */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-10 scale-150 pointer-events-none">
                             <div className="w-48 h-12 border-2 border-islamic-gold rounded-full rotate-3"></div>
                          </div>
                          <h2 className="text-4xl sm:text-6xl font-serif text-islamic-dark dark:text-islamic-gold font-black drop-shadow-sm tracking-tight">
                            {language === 'ar' ? 'سورة ' : 'Surah '}{readingSurah.nameAr}
                          </h2>
                          <div className="flex items-center justify-center gap-4 mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                             <span>Surah {readingSurah.number}</span>
                             <div className="w-1.5 h-1.5 bg-islamic-gold rounded-full"></div>
                             <span>{surahVerses.length} Ayahs</span>
                          </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4 sm:mt-0">
                          {isPlaying ? (
                              <button onClick={stopAudio} className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20"><Pause className="w-5 h-5" /> {language === 'ar' ? 'إيقاف' : 'Stop'}</button>
                          ) : (
                              <button onClick={() => handlePlayAyah(0)} className="flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white rounded-2xl font-bold shadow-lg shadow-islamic-gold/20"><Play className="w-5 h-5" /> {language === 'ar' ? 'تلاوة' : 'Listen'}</button>
                          )}
                      </div>
                  </div>

                  {isLoadingText ? (
                      <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                          <Loader2 className="w-16 h-16 text-islamic-primary animate-spin mb-6" />
                          <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs">{language === 'ar' ? 'جاري تحميل كلام الله...' : 'Fetching Holy Verses...'}</p>
                      </div>
                  ) : (
                      <div className="relative bg-[#fffdf5] dark:bg-gray-900 rounded-[3rem] p-10 sm:p-20 shadow-2xl border-4 border-[#e9e4d1] dark:border-gray-800 transition-all duration-500 Mushaf-Container overflow-hidden">
                          {/* Visual Background Pattern */}
                          <div className="absolute inset-0 arabesque-pattern opacity-[0.03] pointer-events-none"></div>
                          
                          {/* Bismillah Header */}
                          {readingSurah.number !== 1 && readingSurah.number !== 9 && (
                              <div className="text-center mb-20 relative">
                                  <div className="inline-block p-10 relative">
                                     <div className="absolute inset-0 border-[3px] border-double border-islamic-gold/30 rounded-[3rem]"></div>
                                     <h3 className="text-5xl font-serif text-gray-800 dark:text-gray-200">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h3>
                                  </div>
                              </div>
                          )}

                          {/* Continuous Ayah Display */}
                          <div className="text-center space-y-12 leading-[3] font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 dark:text-gray-100" dir="rtl">
                                {surahVerses.map((ayah, index) => (
                                    <span 
                                      key={ayah.number} 
                                      id={`ayah-${ayah.numberInSurah}`}
                                      className={`inline-block relative px-2 transition-all duration-1000 rounded-3xl group cursor-pointer ${activeVerseIndex === index ? 'bg-islamic-gold/10 scale-105 shadow-xl ring-2 ring-islamic-gold/50' : 'hover:bg-islamic-primary/5'}`}
                                      onClick={() => handlePlayAyah(index)}
                                    >
                                        <span className="relative z-10">{ayah.text}</span>
                                        
                                        {/* Ayah End Ornament */}
                                        <span className="inline-flex items-center justify-center relative mx-4 -top-1">
                                           <span className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Ayah_Sign.png')] bg-contain bg-no-repeat bg-center opacity-40 dark:invert"></span>
                                           <span className="relative z-10 text-xs sm:text-sm font-bold text-islamic-gold w-10 h-10 flex items-center justify-center font-sans tracking-tight">
                                              {ayah.numberInSurah}
                                           </span>
                                        </span>

                                        {/* Hover Interaction Menu */}
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all z-20 flex gap-1 bg-white dark:bg-gray-800 p-1 rounded-full shadow-2xl border dark:border-gray-700">
                                            <button onClick={(e) => { e.stopPropagation(); fetchTafsir(ayah); }} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full text-islamic-primary" title={t('readTafsir')}><BookOpen className="w-4 h-4" /></button>
                                            <button onClick={(e) => { e.stopPropagation(); toggleBookmark(readingSurah.number, ayah.numberInSurah); }} className={`p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full ${bookmarks[readingSurah.number] === ayah.numberInSurah ? 'text-red-500' : 'text-gray-400'}`}><Bookmark className="w-4 h-4" /></button>
                                        </div>
                                    </span>
                                ))}
                          </div>
                      </div>
                  )}
              </div>
          )}

          {/* Side Index Menu */}
          {isSideMenuOpen && (
              <div className="fixed inset-0 z-[100] flex">
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsSideMenuOpen(false)}></div>
                  <div className={`relative w-96 max-w-[85%] bg-white dark:bg-gray-800 h-full shadow-5xl flex flex-col animate-in ${language === 'ar' ? 'slide-in-from-right' : 'slide-in-from-left'} duration-500`}>
                      <div className="p-8 border-b dark:border-gray-700 flex items-center justify-between bg-islamic-primary text-white">
                          <div>
                              <h3 className="font-bold text-2xl font-serif">{language === 'ar' ? 'فهرس السور الكريمة' : 'Holy Surah Index'}</h3>
                              <p className="text-xs text-islamic-light opacity-60 font-black uppercase mt-1 tracking-widest">Quran Directory</p>
                          </div>
                          <button onClick={() => setIsSideMenuOpen(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors"><X className="w-6 h-6" /></button>
                      </div>
                      <div className="overflow-y-auto flex-1 p-6 space-y-3 custom-scrollbar">
                          {surahs.map((surah) => (
                              <button key={surah.number} onClick={() => handleOpenSurah(surah)} className={`w-full text-start p-5 rounded-2xl flex items-center justify-between transition-all group ${readingSurah?.number === surah.number ? 'bg-islamic-primary text-white shadow-xl shadow-islamic-primary/20 scale-[1.02]' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'}`}>
                                  <div className="flex items-center gap-5">
                                      <span className={`text-xs font-black w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${readingSurah?.number === surah.number ? 'border-white/30 bg-white/10' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>{surah.number}</span>
                                      <div>
                                          <span className="font-serif text-xl block">{language === 'ar' ? 'سورة ' : 'Surah '}{surah.nameAr}</span>
                                          <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{surah.nameEn}</span>
                                      </div>
                                  </div>
                                  {bookmarks[surah.number] && <BookmarkCheck className={`w-5 h-5 ${readingSurah?.number === surah.number ? 'text-islamic-gold' : 'text-gray-300'}`} />}
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {/* Tafsir Modal */}
          {selectedAyahForTafsir && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-islamic-dark/70 backdrop-blur-xl animate-in fade-in duration-300">
                  <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-5xl w-full max-w-2xl overflow-hidden flex flex-col relative border border-white/10">
                      <button onClick={() => setSelectedAyahForTafsir(null)} className="absolute top-8 end-8 p-3 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all z-20"><X className="w-6 h-6" /></button>
                      
                      <div className="bg-islamic-primary p-12 text-center text-white relative">
                          <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
                          <div className="relative z-10">
                              <h2 className="text-3xl font-bold font-serif mb-2">{language === 'ar' ? 'تفسير الجلالين' : 'Tafsir Al-Jalalayn'}</h2>
                              <p className="text-islamic-light/60 text-sm font-black uppercase tracking-widest">{readingSurah?.nameAr} • {language === 'ar' ? 'آية' : 'Ayah'} {selectedAyahForTafsir.numberInSurah}</p>
                          </div>
                      </div>

                      <div className="p-12">
                          <div className="mb-10 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-700">
                              <p className="font-serif text-3xl leading-relaxed text-gray-800 dark:text-gray-100 text-center" dir="rtl">{selectedAyahForTafsir.text}</p>
                          </div>
                          
                          {isLoadingTafsir ? (
                              <div className="flex flex-col items-center py-10">
                                  <Loader2 className="w-10 h-10 text-islamic-primary animate-spin mb-4" />
                                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{language === 'ar' ? 'جاري تحميل التفسير...' : 'Loading Interpretation...'}</p>
                              </div>
                          ) : (
                              <div className="space-y-6 animate-in fade-in">
                                  <div className="flex items-center gap-3 text-islamic-gold">
                                      <Info className="w-6 h-6" />
                                      <span className="font-bold text-lg">{language === 'ar' ? 'المعنى والبيان:' : 'Explanation:'}</span>
                                  </div>
                                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-[2.2] font-light text-justify px-2" dir="rtl">
                                      {tafsirData}
                                  </p>
                              </div>
                          )}

                          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                              <button onClick={() => setSelectedAyahForTafsir(null)} className="w-full bg-islamic-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-islamic-primary/20 hover:bg-islamic-dark transition-all">
                                  {language === 'ar' ? 'إغلاق التفسير' : 'Close Tafsir'}
                              </button>
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
