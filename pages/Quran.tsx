import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Book, Headphones, Mic, Search, Play, Pause, X, ArrowRight, ArrowLeft, Loader2, Bookmark, BookOpen, ChevronRight, ChevronLeft, Trash2, Volume2, List, Menu, CheckCircle, FileText, LayoutDashboard, PlayCircle, StopCircle, User, Settings2 } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const VERSES_PER_PAGE = 10; // عدد الآيات في الصفحة الواحدة

// تعريف واجهة بيانات القارئ
interface Reciter {
  id: string;
  nameAr: string;
  nameEn: string;
  serverFull: string; // رابط السيرفر للسور الكاملة (MP3Quran)
  serverVerse: string; // معرف القارئ في EveryAyah للتلاوة آية بآية
}

// قائمة القراء المعتمدين (تضم قراء السودان)
const RECITERS: Reciter[] = [
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
  },
  {
    id: 'sudais',
    nameAr: 'الشيخ عبد الرحمن السديس',
    nameEn: 'Sheikh Abdul Rahman Al-Sudais',
    serverFull: 'https://server11.mp3quran.net/sds/',
    serverVerse: 'Abdurrahmaan_As-Sudais_192kbps'
  }
];

const Quran: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'mushaf' | 'audio' | 'mutoon' | 'khalwa'>('mushaf');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reciter State
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]); // Default to Noreen
  const [isReciterMenuOpen, setIsReciterMenuOpen] = useState(false);

  // Audio State
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  // Reading & Playback State
  const [readingSurah, setReadingSurah] = useState<any | null>(null);
  const [surahVerses, setSurahVerses] = useState<any[]>([]);
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  
  // Follow-along State
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null); // Index in surahVerses array
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Bookmark State
  const [savedBookmark, setSavedBookmark] = useState<{surah: number, ayah: number, page: number} | null>(null);

  // Tafsir State
  const [selectedAyahForTafsir, setSelectedAyahForTafsir] = useState<any | null>(null);
  const [tafsirData, setTafsirData] = useState<string>('');
  const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);

  // Load bookmark on mount
  useEffect(() => {
    const saved = localStorage.getItem('quran_bookmark');
    if (saved) {
        setSavedBookmark(JSON.parse(saved));
    }
  }, []);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.src = "";
      }
    };
  }, []);

  // Helper to pad numbers for URLs (e.g., 1 -> "001")
  const padNum = (num: number) => num.toString().padStart(3, '0');

  // Sync Logic: Watch for activeVerseIndex changes to play audio and handle pagination
  useEffect(() => {
    if (activeVerseIndex === null || !readingSurah || surahVerses.length === 0) return;

    // 1. Ensure we are on the correct page
    const targetPage = Math.ceil((activeVerseIndex + 1) / VERSES_PER_PAGE);
    if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
    }

    // 2. Play Audio
    if (audioRef) audioRef.pause();
    
    const ayah = surahVerses[activeVerseIndex];
    
    // Construct Verse URL using EveryAyah format: identifier/SurahAyah.mp3 (e.g., 001001.mp3)
    const surahStr = padNum(readingSurah.number);
    const ayahStr = padNum(ayah.numberInSurah);
    const url = `https://everyayah.com/data/${selectedReciter.serverVerse}/${surahStr}${ayahStr}.mp3`;
    
    const audio = new Audio(url);
    setAudioRef(audio);
    
    audio.play().catch(e => {
        console.error("Audio playback failed", e);
        setIsPlaying(false);
        setActiveVerseIndex(null);
        showToast(language === 'ar' ? 'خطأ في تحميل التلاوة' : 'Error loading audio', 'error');
    });

    setIsPlaying(true);

    // 3. Setup Next Verse Trigger
    audio.onended = () => {
        if (activeVerseIndex < surahVerses.length - 1) {
            setActiveVerseIndex(prev => prev! + 1);
        } else {
            // End of Surah
            setActiveVerseIndex(null);
            setIsPlaying(false);
            showToast(language === 'ar' ? 'تمت السورة' : 'Surah Completed', 'success');
        }
    };

  }, [activeVerseIndex, selectedReciter]); // Added selectedReciter dependency

  const tabs = [
    { id: 'mushaf', label: language === 'ar' ? 'المصحف التفاعلي' : 'Interactive Mushaf', icon: Book },
    { id: 'audio', label: language === 'ar' ? 'التلاوات' : 'Recitations', icon: Headphones },
    { id: 'mutoon', label: language === 'ar' ? 'مكتبة المتون' : 'Mutoon Library', icon: FileText },
    { id: 'khalwa', label: language === 'ar' ? 'إدارة الخلاوي' : 'Khalwa Mgmt', icon: LayoutDashboard },
  ];

  const surahs = Array.from({ length: 114 }, (_, i) => {
      const namesAr = ['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس', 'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر', 'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه', 'الأنبياء', 'الحج', 'المؤمنون', 'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم'];
      const namesEn = ['Al-Fatiha', 'Al-Baqarah', 'Ali Imran', 'An-Nisa', 'Al-Ma\'idah', 'Al-An\'am', 'Al-A\'raf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya', 'Al-Hajj', 'Al-Mu\'minun', 'An-Nur', 'Al-Furqan', 'Ash-Shu\'ara', 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum'];
      return {
        number: i + 1,
        nameAr: namesAr[i] || `سورة ${i + 1}`,
        nameEn: namesEn[i] || `Surah ${i + 1}`,
        verses: Math.floor(Math.random() * 200) + 7, 
      };
  });

  const filteredSurahs = useMemo(() => {
    return surahs.filter(s => 
      s.nameAr.includes(searchQuery) || 
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString().includes(searchQuery)
    );
  }, [searchQuery, surahs]);

  const toggleFullSurahPlay = (surah: typeof surahs[0]) => {
    // Construct Full Surah URL
    const surahStr = padNum(surah.number);
    const fullAudioUrl = `${selectedReciter.serverFull}${surahStr}.mp3`;

    if (currentSurah === surah.number) {
      if (isPlaying) {
        audioRef?.pause();
        setIsPlaying(false);
      } else {
        audioRef?.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef) {
        audioRef.pause();
      }
      const newAudio = new Audio(fullAudioUrl);
      newAudio.play().catch(e => {
          showToast(language === 'ar' ? 'لا يمكن تشغيل الصوت حالياً' : 'Cannot play audio right now', 'error');
          console.error(e);
      });
      newAudio.onended = () => setIsPlaying(false);
      setAudioRef(newAudio);
      setCurrentSurah(surah.number);
      setIsPlaying(true);
      showToast(language === 'ar' ? `جاري تشغيل: ${surah.nameAr} - ${selectedReciter.nameAr}` : `Playing: ${surah.nameEn} - ${selectedReciter.nameEn}`, 'success');
    }
  };

  const handleOpenSurah = async (surah: typeof surahs[0]) => {
    setReadingSurah(surah);
    setIsLoadingText(true);
    setSurahVerses([]);
    setIsSideMenuOpen(false);
    setActiveVerseIndex(null);
    
    // Check if we have a bookmark for this surah to open appropriate page
    if (savedBookmark && savedBookmark.surah === surah.number) {
        setCurrentPage(savedBookmark.page);
    } else {
        setCurrentPage(1);
    }

    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
        const data = await response.json();
        if (data.code === 200) {
            setSurahVerses(data.data.ayahs);
        } else {
            showToast(language === 'ar' ? 'حدث خطأ في جلب الآيات' : 'Error fetching verses', 'error');
        }
    } catch (error) {
        console.error("Failed to fetch surah", error);
        showToast(language === 'ar' ? 'تأكد من اتصال الإنترنت' : 'Check internet connection', 'error');
    } finally {
        setIsLoadingText(false);
    }
  };

  const closeReader = () => {
      setReadingSurah(null);
      setSurahVerses([]);
      setActiveVerseIndex(null);
      window.scrollTo(0, 0);
      if (audioRef) {
        audioRef.pause();
        setIsPlaying(false);
      }
  };

  // Pagination Logic
  const totalPages = Math.ceil(surahVerses.length / VERSES_PER_PAGE);
  const currentVerses = useMemo(() => {
      const start = (currentPage - 1) * VERSES_PER_PAGE;
      return surahVerses.slice(start, start + VERSES_PER_PAGE);
  }, [surahVerses, currentPage]);

  const handlePageChange = (direction: 'next' | 'prev') => {
      if (direction === 'next' && currentPage < totalPages) {
          setCurrentPage(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (direction === 'prev' && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  // Follow-along Player Control
  const toggleFollowAlong = () => {
      if (activeVerseIndex !== null && isPlaying) {
          // Stop
          if (audioRef) audioRef.pause();
          setIsPlaying(false);
          setActiveVerseIndex(null);
      } else {
          // Start from first verse on current page
          const start = (currentPage - 1) * VERSES_PER_PAGE;
          setActiveVerseIndex(start);
      }
  };

  // Bookmark Logic
  const handleBookmark = (ayahNumber: number) => {
      if (!readingSurah) return;
      const bookmarkData = { surah: readingSurah.number, ayah: ayahNumber, page: currentPage };
      setSavedBookmark(bookmarkData);
      localStorage.setItem('quran_bookmark', JSON.stringify(bookmarkData));
      showToast(language === 'ar' ? 'تم حفظ موضع القراءة' : 'Bookmark saved', 'success');
  };

  const handleRemoveBookmark = () => {
    setSavedBookmark(null);
    localStorage.removeItem('quran_bookmark');
    showToast(language === 'ar' ? 'تم حذف العلامة' : 'Bookmark removed', 'info');
  };

  // Only plays single ayah without auto-continue (for manual interaction)
  const handlePlaySingleAyah = (ayah: any) => {
    if (audioRef) {
        audioRef.pause();
        setIsPlaying(false);
        setActiveVerseIndex(null); // Stop auto follow-along
    }
    
    // Construct Verse URL
    const surahStr = padNum(readingSurah.number);
    const ayahStr = padNum(ayah.numberInSurah);
    const url = `https://everyayah.com/data/${selectedReciter.serverVerse}/${surahStr}${ayahStr}.mp3`;
    
    const audio = new Audio(url);
    audio.play();
  };

  // Tafsir Logic
  const handleOpenTafsir = async (ayah: any) => {
      setSelectedAyahForTafsir(ayah);
      setIsLoadingTafsir(true);
      setTafsirData('');
      
      try {
          const response = await fetch(`https://api.alquran.cloud/v1/ayah/${readingSurah.number}:${ayah.numberInSurah}/ar.muyassar`);
          const data = await response.json();
          if (data.code === 200) {
              setTafsirData(data.data.text);
          } else {
              setTafsirData(language === 'ar' ? 'نعتذر، التفسير غير متوفر حالياً.' : 'Tafsir unavailable.');
          }
      } catch (error) {
          setTafsirData(language === 'ar' ? 'حدث خطأ في جلب التفسير.' : 'Error loading Tafsir.');
      } finally {
          setIsLoadingTafsir(false);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Hide when reading) */}
        {!readingSurah && (
            <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-islamic-dark dark:text-islamic-gold mb-4 font-serif">{t('quran')}</h1>
            
            {savedBookmark && (
                 <button 
                    onClick={() => {
                        const surah = surahs.find(s => s.number === savedBookmark.surah);
                        if (surah) handleOpenSurah(surah);
                    }}
                    className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-islamic-light dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold rounded-full text-sm font-medium hover:bg-islamic-primary hover:text-white transition shadow-sm border border-islamic-primary/20 dark:border-gray-600"
                 >
                    <Bookmark className="w-4 h-4 fill-current" />
                    {language === 'ar' 
                        ? `أكمل القراءة من: ${surahs[savedBookmark.surah-1]?.nameAr || ''} - آية ${savedBookmark.ayah}` 
                        : `Continue Reading: Surah ${savedBookmark.surah} - Ayah ${savedBookmark.ayah}`}
                 </button>
            )}

            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {language === 'ar' 
                ? 'المنصة الشاملة للحفظة: مصحف تفاعلي، مكتبة متون، وإدارة الخلاوي.' 
                : 'Comprehensive platform for Huffaz: Interactive Mushaf, Mutoon Library, and Khalwa Management.'}
            </p>
            </header>
        )}

        {/* Tabs (Hide when reading) */}
        {!readingSurah && (
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm inline-flex whitespace-nowrap">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                        ? 'bg-islamic-primary text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                </button>
                ))}
            </div>
            </div>
        )}

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 min-h-[500px] relative transition-colors duration-300">
          
          {/* Main Views */}
          {!readingSurah ? (
              <>
                {(activeTab === 'mushaf' || activeTab === 'audio') && (
                    <div className="relative max-w-md mx-auto mb-8">
                        <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={language === 'ar' ? 'ابحث عن سورة (بالاسم أو الرقم)...' : 'Search for a Surah (Name or No)...'}
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none text-start transition-all"
                        />
                        <Search className="absolute start-3 top-3.5 text-gray-400 w-5 h-5" />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute end-3 top-3.5 text-gray-400 hover:text-red-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}

                {activeTab === 'mushaf' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSurahs.map((surah) => (
                        <div 
                            key={surah.number} 
                            onClick={() => handleOpenSurah(surah)}
                            className="border border-gray-100 dark:border-gray-700 p-4 rounded-lg hover:border-islamic-gold hover:shadow-md transition cursor-pointer flex items-center justify-between group animate-in fade-in duration-300"
                        >
                            <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-islamic-light dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-islamic-primary group-hover:text-white transition">
                                {surah.number}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white font-serif text-lg">{surah.nameAr}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{surah.nameEn}</p>
                            </div>
                            </div>
                            <div className="flex items-center text-islamic-primary dark:text-islamic-gold opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold">{language === 'ar' ? 'اقرأ' : 'Read'}</span>
                                {language === 'ar' ? <ArrowLeft className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
                            </div>
                        </div>
                        ))}
                        {filteredSurahs.length === 0 && (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'audio' && (
                    <div>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">{language === 'ar' ? 'المكتبة الصوتية' : 'Audio Library'}</h3>
                            
                            {/* Reciter Selector */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsReciterMenuOpen(!isReciterMenuOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                >
                                    <User className="w-4 h-4" />
                                    <span>{language === 'ar' ? selectedReciter.nameAr : selectedReciter.nameEn}</span>
                                    <Settings2 className="w-4 h-4 text-gray-400" />
                                </button>
                                
                                {isReciterMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsReciterMenuOpen(false)}></div>
                                        <div className="absolute top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                            <div className="p-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 px-2">{language === 'ar' ? 'اختر القارئ' : 'Select Reciter'}</span>
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {RECITERS.map(reciter => (
                                                    <button
                                                        key={reciter.id}
                                                        onClick={() => {
                                                            setSelectedReciter(reciter);
                                                            setIsReciterMenuOpen(false);
                                                            // Stop current playback if reciter changes
                                                            if (isPlaying) {
                                                                audioRef?.pause();
                                                                setIsPlaying(false);
                                                            }
                                                        }}
                                                        className={`w-full text-start px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                                            selectedReciter.id === reciter.id 
                                                            ? 'bg-islamic-light dark:bg-gray-700/50 text-islamic-primary dark:text-islamic-gold font-bold' 
                                                            : 'text-gray-700 dark:text-gray-200'
                                                        }`}
                                                    >
                                                        <span>{language === 'ar' ? reciter.nameAr : reciter.nameEn}</span>
                                                        {selectedReciter.id === reciter.id && <CheckCircle className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {isPlaying && (
                            <div className="mb-4 bg-islamic-primary text-white p-3 rounded-lg flex items-center justify-between animate-in fade-in">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-full animate-pulse">
                                        <Headphones className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-xs opacity-80 block">{language === 'ar' ? 'جاري الاستماع للقارئ' : 'Listening to'}</span>
                                        <span className="font-bold text-sm">{language === 'ar' ? selectedReciter.nameAr : selectedReciter.nameEn}</span>
                                    </div>
                                </div>
                                <button onClick={() => { audioRef?.pause(); setIsPlaying(false); }} className="hover:bg-white/20 p-1 rounded-full">
                                    <StopCircle className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSurahs.map((surah) => (
                                <div 
                                    key={surah.number} 
                                    className={`border p-4 rounded-lg transition flex items-center justify-between group ${
                                        currentSurah === surah.number ? 'border-islamic-primary bg-islamic-light dark:bg-gray-700' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => toggleFullSurahPlay(surah)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                                                currentSurah === surah.number && isPlaying 
                                                    ? 'bg-islamic-primary text-white' 
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-islamic-gold group-hover:text-white'
                                            }`}
                                        >
                                            {currentSurah === surah.number && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ms-0.5" />}
                                        </button>
                                        <div>
                                            <h3 className={`font-bold font-serif text-lg ${currentSurah === surah.number ? 'text-islamic-primary dark:text-islamic-gold' : 'text-gray-900 dark:text-white'}`}>{surah.nameAr}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{surah.nameEn}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mutoon Library Section */}
                {activeTab === 'mutoon' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl text-center">
                            <BookOpen className="w-12 h-12 text-islamic-gold mx-auto mb-3" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{language === 'ar' ? 'مكتبة المتون العلمية' : 'Scientific Mutoon Library'}</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                                {language === 'ar' 
                                ? 'متون التجويد والقراءات (كالشاطبية، الجزرية) بصيغة رقمية قابلة للبحث والتحميل.' 
                                : 'Tajweed and Qira\'at texts (like Shatibiyyah, Jazariyyah) in searchable digital format.'}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-xl hover:shadow-lg transition cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-serif font-bold text-lg">
                                            {i}
                                        </div>
                                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400">{language === 'ar' ? 'تجويد' : 'Tajweed'}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{language === 'ar' ? 'متن الجزرية' : 'Matn Al-Jazariyyah'}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{language === 'ar' ? 'الإمام ابن الجزري' : 'Imam Ibn Al-Jazari'}</p>
                                    <button className="w-full py-2 border border-islamic-primary dark:border-islamic-gold text-islamic-primary dark:text-islamic-gold rounded-lg text-sm font-bold hover:bg-islamic-primary hover:text-white transition">
                                        {language === 'ar' ? 'تصفح المتن' : 'Read Matn'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Khalwa Management Section */}
                {activeTab === 'khalwa' && (
                    <div className="space-y-6 animate-in fade-in">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl">
                                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{language === 'ar' ? 'إدارة شؤون الخلوة' : 'Khalwa Affairs Mgmt'}</h2>
                                 <p className="text-gray-600 dark:text-gray-300 mb-6">
                                     {language === 'ar' 
                                     ? 'نظام متكامل لإدارة الطلاب، الموارد المالية، ومتابعة الحفظ والتسميع.' 
                                     : 'Integrated system for managing students, financial resources, and tracking memorization.'}
                                 </p>
                                 <button className="bg-islamic-primary text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-islamic-dark transition">
                                     {language === 'ar' ? 'دخول نظام الإدارة' : 'Access System'}
                                 </button>
                             </div>
                             
                             <div className="space-y-4">
                                 <h3 className="font-bold text-gray-900 dark:text-white">{language === 'ar' ? 'منهجيات الحفظ والمراجعة' : 'Memorization Methodologies'}</h3>
                                 {[1, 2, 3].map(i => (
                                     <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                         <PlayCircle className="w-8 h-8 text-gray-400" />
                                         <div>
                                             <h4 className="font-bold text-sm text-gray-900 dark:text-white">{language === 'ar' ? 'طريقة الحصون الخمسة' : 'The Five Fortresses Method'}</h4>
                                             <p className="text-xs text-gray-500 dark:text-gray-400">Video • 20 min</p>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>
                )}
              </>
          ) : (
              /* Reader View */
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20">
                  {/* Sticky Top Bar */}
                  <div className="flex justify-between items-center mb-6 border-b dark:border-gray-700 pb-4 sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-10 pt-2 shadow-sm px-4 -mx-6">
                      <div className="flex items-center gap-2">
                        <button 
                            onClick={closeReader}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-islamic-primary dark:hover:text-islamic-gold transition font-medium"
                        >
                            {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsSideMenuOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-islamic-light dark:hover:bg-gray-600 hover:text-islamic-primary transition"
                        >
                            <List className="w-4 h-4" />
                            <span className="text-sm font-bold">{language === 'ar' ? 'الفهرس' : 'Index'}</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                            {/* Reciter Selector in Reader Mode */}
                            <div className="relative hidden md:block">
                                <button 
                                    onClick={() => setIsReciterMenuOpen(!isReciterMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                >
                                    <User className="w-3 h-3" />
                                    <span className="max-w-[100px] truncate">{language === 'ar' ? selectedReciter.nameAr : selectedReciter.nameEn}</span>
                                    <ChevronRight className="w-3 h-3 rotate-90" />
                                </button>
                                
                                {isReciterMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsReciterMenuOpen(false)}></div>
                                        <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                            <div className="max-h-56 overflow-y-auto">
                                                {RECITERS.map(reciter => (
                                                    <button
                                                        key={reciter.id}
                                                        onClick={() => {
                                                            setSelectedReciter(reciter);
                                                            setIsReciterMenuOpen(false);
                                                            // Stop current playback to avoid mismatch
                                                            if (activeVerseIndex !== null && isPlaying) {
                                                                if (audioRef) audioRef.pause();
                                                                setIsPlaying(false);
                                                                setActiveVerseIndex(null);
                                                            }
                                                        }}
                                                        className={`w-full text-start px-4 py-2 text-xs flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                                            selectedReciter.id === reciter.id 
                                                            ? 'bg-islamic-light dark:bg-gray-700/50 text-islamic-primary dark:text-islamic-gold font-bold' 
                                                            : 'text-gray-700 dark:text-gray-200'
                                                        }`}
                                                    >
                                                        <span>{language === 'ar' ? reciter.nameAr : reciter.nameEn}</span>
                                                        {selectedReciter.id === reciter.id && <CheckCircle className="w-3 h-3" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                          <button
                            onClick={toggleFollowAlong}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition shadow-sm ${
                                activeVerseIndex !== null && isPlaying
                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                                : 'bg-islamic-primary text-white hover:bg-islamic-dark'
                            }`}
                          >
                             {activeVerseIndex !== null && isPlaying ? <StopCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                             {activeVerseIndex !== null && isPlaying 
                                ? (language === 'ar' ? 'إيقاف' : 'Stop')
                                : (language === 'ar' ? 'استماع' : 'Listen')
                             }
                          </button>
                      </div>

                      <div className="hidden md:block w-8"></div>
                  </div>

                  {/* Loading State */}
                  {isLoadingText ? (
                      <div className="flex flex-col items-center justify-center py-20">
                          <Loader2 className="w-10 h-10 text-islamic-primary animate-spin mb-4" />
                          <p className="text-gray-500">{language === 'ar' ? 'جاري تحميل الآيات...' : 'Loading Verses...'}</p>
                      </div>
                  ) : (
                      /* Quran Text Area */
                      <div className="max-w-3xl mx-auto text-center px-2" dir="rtl">
                          
                          <div className="mb-4 text-center">
                              <h2 className="text-2xl font-bold font-serif text-islamic-dark dark:text-islamic-gold inline-block border-b-2 border-islamic-gold/30 pb-1 px-4">{readingSurah.nameAr}</h2>
                              <p className="text-xs text-gray-400 mt-1 md:hidden">
                                {language === 'ar' ? `القارئ: ${selectedReciter.nameAr}` : `Reciter: ${selectedReciter.nameEn}`}
                              </p>
                          </div>

                          {/* Basmalah (Only if not Surah 1 and not Surah 9, and only on Page 1) */}
                          {currentPage === 1 && readingSurah.number !== 1 && readingSurah.number !== 9 && (
                              <div className="mb-8 mt-2 font-serif text-2xl text-islamic-dark dark:text-gray-300 opacity-90">
                                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                              </div>
                          )}

                          <div className="font-serif text-3xl md:text-4xl leading-[2.5] md:leading-[2.5] text-gray-800 dark:text-gray-200 text-justify" style={{ textAlignLast: 'center' }}>
                                {currentVerses.map((ayah, index) => {
                                    // Clean Basmalah if it exists in text
                                    let text = ayah.text;
                                    if (readingSurah.number !== 1 && currentPage === 1 && index === 0 && text.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
                                        text = text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
                                    }

                                    const isBookmarked = savedBookmark?.surah === readingSurah.number && savedBookmark?.ayah === ayah.numberInSurah;
                                    
                                    // Calculate global index in the full Surah array for sync logic
                                    const globalIndex = ((currentPage - 1) * VERSES_PER_PAGE) + index;
                                    const isActive = activeVerseIndex === globalIndex;

                                    return (
                                        <span key={ayah.number} className="inline group relative transition-colors duration-500">
                                            <span 
                                                className={`cursor-pointer rounded px-1 transition duration-300 
                                                    ${isActive 
                                                        ? 'bg-islamic-gold/20 text-islamic-primary dark:text-islamic-gold shadow-sm ring-2 ring-islamic-gold/30' 
                                                        : 'hover:bg-islamic-light/30 dark:hover:bg-gray-700/50 hover:text-islamic-dark dark:hover:text-white'}
                                                    ${isBookmarked ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                                                `}
                                                onClick={() => setSelectedAyahForTafsir(null)} 
                                            >
                                                {text}
                                            </span>
                                            
                                            {/* Ayah End Symbol with Interactive Menu Trigger */}
                                            <span className="inline-flex items-center justify-center w-10 h-10 mx-1 align-middle relative group-hover:scale-110 transition-transform cursor-pointer" 
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                  }}>
                                                <span className={`w-8 h-8 border border-islamic-gold rounded-full flex items-center justify-center text-sm text-islamic-gold number-symbol ${isBookmarked ? 'bg-islamic-gold text-white' : ''} ${isActive ? 'bg-islamic-primary text-white border-islamic-primary animate-pulse' : ''}`}>
                                                   {ayah.numberInSurah}
                                                </span>
                                                
                                                {/* Hover Menu for Ayah Actions */}
                                                <div className="absolute bottom-full mb-2 hidden group-hover:flex bg-white dark:bg-gray-700 shadow-xl rounded-lg overflow-hidden border border-gray-100 dark:border-gray-600 z-20 text-xs w-max flex-col sm:flex-row">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handlePlaySingleAyah(ayah); }}
                                                        className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-700 dark:text-gray-200 border-b sm:border-b-0 sm:border-l border-gray-100 dark:border-gray-600"
                                                        title={language === 'ar' ? 'استماع للآية فقط' : 'Play Verse Only'}
                                                    >
                                                        <Volume2 className="w-4 h-4 text-islamic-primary dark:text-islamic-gold" />
                                                        {language === 'ar' ? 'استماع' : 'Play'}
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleOpenTafsir(ayah); }}
                                                        className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-700 dark:text-gray-200 border-b sm:border-b-0 sm:border-l border-gray-100 dark:border-gray-600"
                                                        title={language === 'ar' ? 'تفسير الآية' : 'Tafsir'}
                                                    >
                                                        <BookOpen className="w-4 h-4" />
                                                        {language === 'ar' ? 'تفسير' : 'Tafsir'}
                                                    </button>
                                                    {isBookmarked ? (
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); handleRemoveBookmark(); }}
                                                            className="px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600"
                                                            title={language === 'ar' ? 'حذف الوقف' : 'Remove Bookmark'}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            {language === 'ar' ? 'حذف' : 'Remove'}
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); handleBookmark(ayah.numberInSurah); }}
                                                            className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                                                            title={language === 'ar' ? 'حفظ علامة وقف' : 'Bookmark'}
                                                        >
                                                            <Bookmark className="w-4 h-4" />
                                                            {language === 'ar' ? 'وقف' : 'Bookmark'}
                                                        </button>
                                                    )}
                                                </div>
                                            </span>
                                        </span>
                                    );
                                })}
                          </div>

                          {/* Pagination Controls */}
                          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                                <button 
                                    onClick={() => handlePageChange('prev')}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition ${
                                        currentPage === 1 
                                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                                        : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-islamic-primary hover:text-islamic-primary shadow-sm'
                                    }`}
                                >
                                    {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                                    {language === 'ar' ? 'الصفحة السابقة' : 'Previous'}
                                </button>

                                <span className="text-gray-400 font-serif">
                                    {currentPage} / {totalPages}
                                </span>

                                <button 
                                    onClick={() => handlePageChange('next')}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition ${
                                        currentPage === totalPages
                                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                                        : 'bg-islamic-primary text-white hover:bg-islamic-dark shadow-md'
                                    }`}
                                >
                                    {language === 'ar' ? 'الصفحة التالية' : 'Next'}
                                    {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </button>
                          </div>
                          
                          {currentPage === totalPages && (
                             <div className="mt-8 text-xl font-serif text-gray-500">
                                - صدق الله العظيم -
                             </div>
                          )}
                      </div>
                  )}

                  {/* Sidebar Index Menu */}
                  {isSideMenuOpen && (
                      <div className="fixed inset-0 z-50 flex">
                          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSideMenuOpen(false)}></div>
                          <div className={`relative w-72 bg-white dark:bg-gray-800 h-full shadow-2xl flex flex-col animate-in ${language === 'ar' ? 'slide-in-from-right' : 'slide-in-from-left'} duration-300`}>
                              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between bg-islamic-light/50 dark:bg-gray-700/50">
                                  <h3 className="font-bold text-lg text-islamic-dark dark:text-white">{language === 'ar' ? 'فهرس السور' : 'Surah Index'}</h3>
                                  <button onClick={() => setIsSideMenuOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full dark:text-gray-300">
                                      <X className="w-5 h-5" />
                                  </button>
                              </div>
                              <div className="overflow-y-auto flex-1 p-2 space-y-1">
                                  {surahs.map((surah) => (
                                      <button
                                          key={surah.number}
                                          onClick={() => handleOpenSurah(surah)}
                                          className={`w-full text-start px-4 py-3 rounded-lg flex items-center justify-between transition ${
                                              readingSurah.number === surah.number 
                                              ? 'bg-islamic-primary text-white font-bold' 
                                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                          }`}
                                      >
                                          <div className="flex items-center gap-3">
                                              <span className={`text-xs w-6 h-6 rounded-full border flex items-center justify-center ${
                                                  readingSurah.number === surah.number ? 'border-white/50' : 'border-gray-300 dark:border-gray-600'
                                              }`}>
                                                  {surah.number}
                                              </span>
                                              <span className="font-serif text-lg">{surah.nameAr}</span>
                                          </div>
                                          {readingSurah.number === surah.number && <CheckCircle className="w-4 h-4" />}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          )}

          {/* Tafsir Modal */}
          {selectedAyahForTafsir && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh] transition-colors">
                      <div className="bg-islamic-primary p-4 flex justify-between items-center text-white">
                          <h3 className="font-bold font-serif text-lg">
                              {language === 'ar' 
                               ? `تفسير الآية ${selectedAyahForTafsir.numberInSurah} من ${readingSurah.nameAr}` 
                               : `Tafsir Ayah ${selectedAyahForTafsir.numberInSurah} of ${readingSurah.nameEn}`}
                          </h3>
                          <button onClick={() => setSelectedAyahForTafsir(null)} className="hover:bg-white/20 p-1 rounded-full transition">
                              <X className="w-5 h-5" />
                          </button>
                      </div>
                      
                      <div className="p-6 overflow-y-auto" dir="rtl">
                          <div className="mb-6 p-4 bg-islamic-light/30 dark:bg-gray-700/50 rounded-lg border border-islamic-primary/10 dark:border-gray-600">
                              <p className="font-serif text-2xl text-center leading-loose text-gray-800 dark:text-gray-200">
                                  {selectedAyahForTafsir.text}
                              </p>
                          </div>
                          
                          <div className="prose max-w-none">
                             <h4 className="font-bold text-islamic-primary dark:text-islamic-gold mb-2 text-lg">{language === 'ar' ? 'التفسير الميسر:' : 'Interpretation:'}</h4>
                             {isLoadingTafsir ? (
                                 <div className="flex justify-center py-8">
                                     <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                                 </div>
                             ) : (
                                 <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify">
                                     {tafsirData}
                                 </p>
                             )}
                          </div>
                      </div>
                      
                      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                          <button 
                            onClick={() => setSelectedAyahForTafsir(null)}
                            className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold"
                          >
                              {language === 'ar' ? 'إغلاق' : 'Close'}
                          </button>
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