import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Book, Headphones, Mic, Search } from 'lucide-react';

const Quran: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'mushaf' | 'audio' | 'memorization'>('mushaf');

  const tabs = [
    { id: 'mushaf', label: language === 'ar' ? 'المصحف الشريف' : 'Mushaf', icon: Book },
    { id: 'audio', label: language === 'ar' ? 'التلاوات' : 'Recitations', icon: Headphones },
    { id: 'memorization', label: language === 'ar' ? 'التحفيظ' : 'Memorization', icon: Mic },
  ];

  const surahs = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    nameAr: ['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس'][i],
    nameEn: ['Al-Fatiha', 'Al-Baqarah', 'Ali Imran', 'An-Nisa', 'Al-Ma\'idah', 'Al-An\'am', 'Al-A\'raf', 'Al-Anfal', 'At-Tawbah', 'Yunus'][i],
    verses: [7, 286, 200, 176, 120, 165, 206, 75, 129, 109][i]
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-islamic-dark mb-4 font-serif">{t('quran')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تصفح القرآن الكريم، استمع إلى التلاوات، وراجع حفظك بسهولة.' 
              : 'Browse the Holy Quran, listen to recitations, and review your memorization easily.'}
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-islamic-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-islamic-primary'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <input 
              type="text" 
              placeholder={language === 'ar' ? 'ابحث عن سورة...' : 'Search for a Surah...'}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none text-start"
            />
            <Search className="absolute start-3 top-3.5 text-gray-400 w-5 h-5" />
          </div>

          {activeTab === 'mushaf' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {surahs.map((surah) => (
                  <div key={surah.number} className="border border-gray-100 p-4 rounded-lg hover:border-islamic-gold hover:shadow-md transition cursor-pointer flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-islamic-light text-islamic-primary rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-islamic-primary group-hover:text-white transition">
                        {surah.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 font-serif text-lg">{surah.nameAr}</h3>
                        <p className="text-xs text-gray-500">{surah.nameEn}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-400">
                      {surah.verses} {language === 'ar' ? 'آية' : 'Verses'}
                    </div>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'audio' && (
            <div className="text-center py-12">
               <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                 <Headphones className="w-12 h-12 text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-gray-700 mb-2">{language === 'ar' ? 'مكتبة التلاوات' : 'Audio Library'}</h3>
               <p className="text-gray-500">{language === 'ar' ? 'اختر قارئاً للاستماع' : 'Choose a reciter to listen'}</p>
               {/* Mock Reciters List could go here */}
            </div>
          )}

          {activeTab === 'memorization' && (
            <div className="text-center py-12">
               <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                 <Mic className="w-12 h-12 text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-gray-700 mb-2">{language === 'ar' ? 'المساعد في الحفظ' : 'Memorization Assistant'}</h3>
               <p className="text-gray-500">{language === 'ar' ? 'أداة تكرار الآيات واختبار الحفظ (قريباً)' : 'Verse repetition and testing tool (Coming Soon)'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quran;