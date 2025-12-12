import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Search, ArrowLeft, ArrowRight, Filter } from 'lucide-react';

const News: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('All');

  const newsData = [
    {
      id: 1,
      category: 'Events',
      title: language === 'ar' ? 'انطلاق مسابقة الخرطوم للقرآن الكريم' : 'Khartoum Quran Competition Launch',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'أعلنت الهيئة العامة عن بدء التسجيل في الدورة العاشرة من المسابقة الكبرى لحفظ القرآن الكريم وتلاوته وتفسيره.' : 'The General Authority announced the start of registration for the 10th edition of the Grand Quran Competition.',
    },
    {
      id: 2,
      category: 'Technology',
      title: language === 'ar' ? 'تدشين تطبيق "منبري" للأئمة' : 'Launch of "Minbari" App for Imams',
      date: '2024-03-10',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'تطبيق ذكي يساعد الأئمة في إعداد الخطب والتواصل مع المصلين، يحتوي على مكتبة خطب ضخمة وأدوات بحث متقدمة.' : 'A smart app helping Imams prepare Khutbahs and connect with worshipers, featuring a huge library and advanced search tools.',
    },
    {
      id: 3,
      category: 'Training',
      title: language === 'ar' ? 'تخريج دفعة جديدة من الدعاة' : 'Graduation of New Batch of Callers',
      date: '2024-03-05',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'احتفلت الهيئة بتخريج 500 داعية وداعية بعد إتمام البرنامج التأهيلي المكثف الذي استمر لمدة ستة أشهر.' : 'The Authority celebrated the graduation of 500 Da\'is after completing the intensive 6-month qualifying program.',
    },
    {
      id: 4,
      category: 'Projects',
      title: language === 'ar' ? 'افتتاح مجمع النور القرآني' : 'Opening of Al-Noor Quranic Complex',
      date: '2024-02-28',
      image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'تم بحمد الله افتتاح مجمع النور الذي يضم مسجداً وخلوة ومدرسة قرآنية ومسكناً للطلاب في ولاية الجزيرة.' : 'Al-Noor Complex was opened, comprising a mosque, khalwa, Quranic school, and student housing in Gezira State.',
    },
    {
      id: 5,
      category: 'Events',
      title: language === 'ar' ? 'المؤتمر السنوي للأئمة والدعاة' : 'Annual Conference for Imams',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'تحت شعار "نحو خطاب دعوي مؤثر"، انطلقت فعاليات المؤتمر السنوي بمشاركة واسعة من العلماء والمفكرين.' : 'Under the theme "Towards Impactful Da\'wah Discourse", the annual conference kicked off with wide participation.',
    }
  ];

  const categories = ['All', 'Events', 'Technology', 'Training', 'Projects'];

  const filteredNews = filter === 'All' ? newsData : newsData.filter(n => n.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-20">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm py-12 mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{t('news')}</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    {language === 'ar' ? 'تابع أحدث أخبار الهيئة ومناشطها وفعالياتها في كافة ولايات السودان.' : 'Follow the latest Authority news, activities, and events across all Sudan states.'}
                </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${
                                filter === cat 
                                ? 'bg-islamic-primary text-white shadow-md' 
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            {language === 'ar' && cat === 'All' ? 'الكل' :
                             language === 'ar' && cat === 'Events' ? 'فعاليات' :
                             language === 'ar' && cat === 'Technology' ? 'تقنية' :
                             language === 'ar' && cat === 'Training' ? 'تدريب' :
                             language === 'ar' && cat === 'Projects' ? 'مشاريع' : cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <input 
                        type="text" 
                        placeholder={language === 'ar' ? 'بحث في الأخبار...' : 'Search news...'}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-1 focus:ring-islamic-primary outline-none"
                    />
                    <Search className="absolute start-3 top-2.5 text-gray-400 w-4 h-4" />
                </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((news, idx) => (
                    <div key={news.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col group animate-on-scroll" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="h-56 relative overflow-hidden">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute top-4 start-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                                <Calendar className="w-3 h-3 text-islamic-gold" /> {news.date}
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-2">
                                <span className="text-xs font-bold text-islamic-primary uppercase tracking-wider bg-islamic-light dark:bg-gray-700 px-2 py-1 rounded">
                                    {news.category}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-islamic-primary transition">
                                {news.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                                {news.excerpt}
                            </p>
                            <button className="text-islamic-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto self-start">
                                {t('readMore')} {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredNews.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p>{language === 'ar' ? 'لا توجد أخبار في هذا القسم' : 'No news in this category'}</p>
                </div>
            )}

        </div>
    </div>
  );
};

export default News;