import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Search, ArrowLeft, ArrowRight, X, Share2, Copy, CheckCircle, Clock, Tag } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
}

const News: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const [filter, setFilter] = useState('All');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const newsData: NewsItem[] = [
    {
      id: 1,
      category: 'Strategic',
      title: language === 'ar' ? 'إطلاق حملة "سوداننا.. تسامح وسلام"' : 'Launch of "Our Sudan.. Tolerance & Peace" Campaign',
      date: '2025-01-15',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'حملة وطنية كبرى لتعزيز قيم التعايش السلمي ونبذ خطاب الكراهية في جميع ولايات السودان.' : 'A major national campaign to promote values of peaceful coexistence and reject hate speech across all Sudan states.',
      content: language === 'ar' 
        ? 'أعلنت الهيئة العامة للحفظة والأئمة والدعاة عن الانطلاقة الكبرى لحملة "سوداننا.. تسامح وسلام" والتي تهدف إلى تعزيز النسيج الاجتماعي وتوحيد الصف الوطني عبر منابر المساجد والمراكز الدعوية في كافة ولايات السودان. تتضمن الحملة سلسلة من الخطب الموحدة، وورش العمل التدريبية للأئمة حول فن الحوار، ومسابقات مجتمعية تشجع على قيم التعايش السلمي. كما تشارك في الحملة نخبة من كبار العلماء والدعاة لتقديم خطاب ديني وسط مستنير يواجه دعوات الفرقة والكراهية.'
        : 'The General Authority for Huffaz, Imams, and Da\'is announced the grand launch of the "Our Sudan.. Tolerance & Peace" campaign. This initiative aims to strengthen the social fabric and unite the national front through mosque pulpits and Da\'wah centers across all Sudanese states. The campaign includes a series of unified sermons, training workshops for imams on the art of dialogue, and community competitions encouraging peaceful coexistence values. A selection of elite scholars and preachers are participating to deliver an enlightened moderate religious discourse that confronts calls for division and hatred.'
    },
    {
      id: 2,
      category: 'Education',
      title: language === 'ar' ? 'تدشين "منصة السودان الإلكترونية للتعليم الدعوي"' : 'Launch of "Sudan E-Platform for Da\'wah Education"',
      date: '2025-01-10',
      image: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'منصة رقمية متكاملة لتقديم البرامج التأهيلية والدورات العلمية للأئمة والدعاة عن بعد.' : 'An integrated digital platform providing remote qualification programs and scientific courses for Imams and Callers.',
      content: language === 'ar'
        ? 'في خطوة نحو التحول الرقمي الشامل، دشنت الهيئة "منصة السودان الإلكترونية للتعليم الدعوي". تهدف هذه المنصة إلى توفير وصول سهل وميسر للحقائب التدريبية والدورات العلمية المتخصصة للأئمة والدعاة في المناطق البعيدة. تشمل المنصة دورات في علوم القرآن، الفقه المعاصر، مهارات الاتصال، والإعلام الرقمي. سيتمكن المنتسبون من متابعة محاضراتهم، أداء الاختبارات، والحصول على شهادات معتمدة إلكترونياً، مما يسهم في رفع الكفاءة العلمية والمهنية للحقل الدعوي في السودان.'
        : 'In a step towards comprehensive digital transformation, the Authority launched the "Sudan E-Platform for Da\'wah Education." This platform aims to provide easy access to training packages and specialized scientific courses for Imams and preachers in remote areas. The platform includes courses in Quranic sciences, contemporary Fiqh, communication skills, and digital media. Members will be able to follow their lectures, take exams, and obtain certified certificates electronically, contributing to raising the scientific and professional efficiency of the Da\'wah field in Sudan.'
    },
    {
      id: 3,
      category: 'Social',
      title: language === 'ar' ? 'بدء برنامج "سكن كريم" للأئمة والمؤذنين' : 'Start of "Decent Housing" Program for Imams',
      date: '2025-01-05',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: language === 'ar' ? 'مشروع استراتيجي لتوفير سكن مناسب وتحسين الظروف المعيشية للعاملين في المساجد.' : 'A strategic project to provide suitable housing and improve living conditions for Mosque workers.',
      content: language === 'ar'
        ? 'تأكيداً على دورها في رعاية حماة العقيدة، أطلقت الهيئة برنامج "سكن كريم" الذي يستهدف تحسين بيئة السكن للأئمة والمؤذنين الملحقين بالمساجد الكبرى والأحياء السكنية. يتضمن البرنامج صيانة وترميم الوحدات السكنية القائمة، وإنشاء مجمعات سكنية حديثة تتوفر فيها كافة سبل الراحة. يأتي هذا المشروع ضمن المحور الرابع للخطة الاستراتيجية للهيئة (2026-2030) والخاص بالرعاية الاجتماعية والاقتصادية، لضمان استقرار الإمام وتفرغه لرسالته السامية في إرادة المجتمع.'
        : 'Confirming its role in caring for the guardians of the faith, the Authority launched the "Decent Housing" program. It targets improving the living environment for Imams and Muezzins attached to major mosques and residential neighborhoods. The program includes the maintenance and restoration of existing residential units and the construction of modern housing complexes with all amenities. This project comes within the fourth axis of the Authority\'s Strategic Plan (2026-2030) regarding social and economic care, to ensure the Imam\'s stability and dedication to his noble mission in society.'
    },
    {
        id: 4,
        category: 'Official',
        title: language === 'ar' ? 'اجتماع المكتب التنفيذي لمناقشة ميزانية 2026' : 'Executive Office Meeting for 2026 Budget',
        date: '2024-12-28',
        image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: language === 'ar' ? 'عقد المكتب التنفيذي اجتماعه الدوري في بورتسودان لمراجعة خطط التمويل والمبادرات الرأسمالية.' : 'The executive office held its regular meeting in Port Sudan to review funding plans.',
        content: language === 'ar'
          ? 'ترأس السيد الأمين العام للهيئة الاجتماع الدوري للمكتب التنفيذي بمقر الأمانة في مدينة بورتسودان. ناقش الاجتماع المسودة الأولية لميزانية العام 2026، مع التركيز على تمويل المشاريع الاستراتيجية الكبرى. استعرض أعضاء المكتب تقارير الأداء للعام المنصرم، وبحثوا سبل تفعيل الشراكات مع المنظمات الإقليمية والدولية لدعم برامج التأهيل العلمي. وشدد الاجتماع على ضرورة الالتزام بمعايير الشفافية والحوكمة في كافة المعاملات المالية والإدارية للهيئة.'
          : 'The Secretary-General of the Authority chaired the regular meeting of the Executive Office at the Secretariat headquarters in Port Sudan. The meeting discussed the initial draft of the 2026 budget, with a focus on funding major strategic projects. Office members reviewed performance reports for the past year and discussed ways to activate partnerships with regional and international organizations to support scientific qualification programs. The meeting stressed the need to adhere to transparency and governance standards in all financial and administrative transactions.'
    }
  ];

  const categories = ['All', 'Strategic', 'Education', 'Social', 'Official'];
  const filteredNews = filter === 'All' ? newsData : newsData.filter(n => n.category === filter);

  const copyLink = (id: number) => {
    const url = `${window.location.origin}${window.location.pathname}#/news?id=${id}`;
    navigator.clipboard.writeText(url);
    showToast(language === 'ar' ? 'تم نسخ الرابط بنجاح' : 'Link copied successfully', 'success');
  };

  const handleShare = (item: NewsItem) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/news?id=${item.id}`;
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.excerpt,
        url: shareUrl,
      }).catch((err) => {
        if (err.name !== 'AbortError') {
           copyLink(item.id);
        }
      });
    } else {
      copyLink(item.id);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollOffset(scrollContainerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (!selectedNews) {
      setScrollOffset(0);
    }
  }, [selectedNews]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-20">
        <div className="bg-islamic-primary text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-dark to-transparent opacity-60"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-on-scroll">
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">{t('news')}</h1>
                <p className="text-xl text-islamic-light max-w-2xl mx-auto font-light opacity-90">
                    {language === 'ar' ? 'تابع أحدث أخبار الهيئة ومبادرات الخطة الاستراتيجية 2026-2030' : 'Follow the latest news and initiatives of the 2026-2030 Strategic Plan'}
                </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                                filter === cat 
                                ? 'bg-islamic-primary text-white shadow-lg' 
                                : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-80">
                    <input 
                        type="text" 
                        placeholder={language === 'ar' ? 'بحث في المبادرات...' : 'Search initiatives...'}
                        className="w-full pl-12 pr-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-islamic-primary/20 outline-none transition"
                    />
                    <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400 w-5 h-5`} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredNews.map((news, idx) => (
                    <div key={news.id} onClick={() => setSelectedNews(news)} className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group animate-on-scroll cursor-pointer" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="h-64 relative overflow-hidden">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000" />
                            <div className="absolute top-5 start-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-islamic-primary flex items-center gap-2 shadow-xl">
                                <Calendar className="w-4 h-4 text-islamic-gold" /> {news.date}
                            </div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="mb-4">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-islamic-gold px-3 py-1 rounded-full shadow-sm">
                                    {news.category}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-islamic-primary transition-colors font-serif">
                                {news.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-md line-clamp-3 leading-loose mb-8 flex-1 font-light">
                                {news.excerpt}
                            </p>
                            <button className="text-islamic-primary dark:text-islamic-gold font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all mt-auto self-start">
                                {t('readMore')} 
                                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Details Modal - Refined for Elite Experience */}
        {selectedNews && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
                <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-5xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] transition-all relative border border-white/20 dark:border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
                    
                    {/* Visual Pillar (Image Side) */}
                    <div className="relative w-full md:w-[45%] h-64 md:h-auto overflow-hidden flex-shrink-0 group/img">
                        <img 
                            src={selectedNews.image} 
                            alt={selectedNews.title} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                            style={{ 
                                transform: `scale(${1 + scrollOffset / 1000}) translateY(${scrollOffset * 0.1}px)` 
                            }} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        
                        <div className="absolute bottom-8 start-8 end-8 text-white z-20">
                             <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-islamic-gold/90 backdrop-blur-md px-4 py-2 rounded-full mb-4 shadow-xl">
                                <Tag className="w-3 h-3" /> {selectedNews.category}
                             </span>
                             <div className="flex items-center gap-4 text-sm text-gray-200 font-medium">
                                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                                    <Calendar className="w-4 h-4 text-islamic-gold" />
                                    <span>{selectedNews.date}</span>
                                 </div>
                                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                                    <Clock className="w-4 h-4 text-islamic-gold" />
                                    <span>5 min read</span>
                                 </div>
                             </div>
                        </div>

                        <button 
                            onClick={() => setSelectedNews(null)}
                            className="absolute top-6 start-6 w-12 h-12 bg-white/10 backdrop-blur-xl hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all shadow-2xl border border-white/20 z-50 group md:hidden"
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>

                    {/* Content Pillar */}
                    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 relative">
                        {/* Desktop Close */}
                        <button 
                            onClick={() => setSelectedNews(null)}
                            className="absolute top-8 end-8 w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-islamic-primary hover:text-white text-gray-500 rounded-full hidden md:flex items-center justify-center transition-all shadow-sm z-50 group border border-gray-200 dark:border-gray-700"
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                        </button>

                        <div 
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="flex-1 overflow-y-auto px-8 md:px-14 pb-12 pt-16 md:pt-24 custom-scrollbar scroll-smooth"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif leading-[1.2] mb-10 tracking-tight">
                                {selectedNews.title}
                            </h2>

                            <div className="prose prose-xl dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 text-xl leading-[2.1] text-justify font-light whitespace-pre-line border-s-4 border-islamic-gold/30 ps-8 italic mb-12">
                                    {selectedNews.excerpt}
                                </p>
                                <p className="text-gray-800 dark:text-gray-200 text-lg leading-[2.3] text-justify font-normal whitespace-pre-line">
                                    {selectedNews.content || selectedNews.excerpt}
                                </p>
                            </div>

                            {/* Additional Interactive Section in content */}
                            <div className="mt-16 p-8 bg-islamic-primary/5 dark:bg-islamic-primary/10 rounded-[2rem] border border-islamic-primary/10 flex items-center justify-between gap-6">
                                <div>
                                    <h4 className="font-bold text-islamic-primary dark:text-islamic-gold mb-1">{language === 'ar' ? 'هل تود معرفة المزيد؟' : 'Want to know more?'}</h4>
                                    <p className="text-sm text-gray-500">{language === 'ar' ? 'تواصل مع المكتب الإعلامي للهيئة.' : 'Contact our media office.'}</p>
                                </div>
                                <button className="px-6 py-2.5 bg-islamic-primary text-white rounded-xl text-sm font-bold shadow-gold hover:scale-105 transition-transform">
                                    {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                                </button>
                            </div>
                        </div>

                        {/* Sticky Footer Actions */}
                        <div className="px-8 md:px-14 py-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-6 items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">{language === 'ar' ? 'مشاركة عبر:' : 'Share via:'}</span>
                                <button 
                                    onClick={() => handleShare(selectedNews)}
                                    className="px-8 py-3.5 bg-islamic-primary text-white rounded-2xl font-bold hover:bg-islamic-dark transition-all shadow-[0_15px_30px_rgba(0,107,63,0.3)] flex items-center gap-3 text-sm active:scale-95"
                                >
                                    <Share2 className="w-4 h-4" />
                                    {language === 'ar' ? 'مشاركة المبادرة' : 'Share Initiative'}
                                </button>
                                <button 
                                    onClick={() => copyLink(selectedNews.id)}
                                    className="w-12 h-12 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-2xl flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition shadow-sm group active:scale-95"
                                    title={language === 'ar' ? 'نسخ الرابط' : 'Copy Link'}
                                >
                                    <Copy className="w-5 h-5 group-hover:text-islamic-gold transition-colors" />
                                </button>
                            </div>
                            
                            <div className="hidden lg:flex items-center gap-3 text-gray-400 text-xs">
                                <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> {language === 'ar' ? 'مبادر معتمدة' : 'Verified Initiative'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default News;