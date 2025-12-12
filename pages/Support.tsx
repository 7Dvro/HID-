import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, BookOpen, Home, Mic2, ArrowRight, CheckCircle, Copy } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Support: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const portfolios = [
    {
      id: 'quran',
      title: language === 'ar' ? 'محفظة دعم مشاريع التحفيظ' : 'Quran Projects Portfolio',
      description: language === 'ar' 
        ? 'دعم حلقات التحفيظ، كفالة الحفظة، وطباعة ونشر المصحف الشريف.' 
        : 'Supporting memorization circles, sponsoring Huffaz, and printing the Holy Quran.',
      icon: BookOpen,
      color: 'bg-green-50 text-green-600',
      account: '1234-5678-9012-001',
      bank: language === 'ar' ? 'بنك الخرطوم' : 'Bank of Khartoum'
    },
    {
      id: 'construction',
      title: language === 'ar' ? 'محفظة إنشاء الخلاوي والمساجد' : 'Mosques & Khalwas Construction',
      description: language === 'ar' 
        ? 'المساهمة في بناء وترميم بيوت الله ومجمعات الخلاوي القرآنية في السودان.' 
        : 'Contribute to building and renovating Mosques and Quranic Khalwas complexes in Sudan.',
      icon: Home,
      color: 'bg-blue-50 text-blue-600',
      account: '1234-5678-9012-002',
      bank: language === 'ar' ? 'بنك أمدرمان الوطني' : 'Omdurman National Bank'
    },
    {
      id: 'dawah',
      title: language === 'ar' ? 'محفظة الدعوة وتأهيل الأئمة' : 'Da\'wah & Imams Training',
      description: language === 'ar' 
        ? 'دعم برامج تأهيل الأئمة والدعاة، والقوافل الدعوية للمناطق النائية.' 
        : 'Supporting training programs for Imams and Da\'is, and Da\'wah caravans to remote areas.',
      icon: Mic2,
      color: 'bg-purple-50 text-purple-600',
      account: '1234-5678-9012-003',
      bank: language === 'ar' ? 'بنك فيصل الإسلامي' : 'Faisal Islamic Bank'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(language === 'ar' ? 'تم نسخ رقم الحساب' : 'Account number copied', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-4">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">{t('supportProjects')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {language === 'ar' 
             ? 'منصة تفاعلية للمساهمة العينية والمادية لدعم مشاريع الهيئة في خدمة كتاب الله والمساجد والدعوة في السودان.'
             : 'Interactive platform for in-kind and financial contributions to support Authority projects serving the Book of Allah, Mosques, and Da\'wah in Sudan.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="p-8 flex-1">
                <div className={`w-14 h-14 rounded-2xl ${portfolio.color} dark:bg-opacity-10 flex items-center justify-center mb-6`}>
                  <portfolio.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">{portfolio.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  {portfolio.description}
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-dashed border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{language === 'ar' ? 'رقم الحساب البنكي' : 'Bank Account Number'}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-800 dark:text-white text-lg tracking-wider">{portfolio.account}</span>
                    <button onClick={() => copyToClipboard(portfolio.account)} className="text-islamic-primary dark:text-islamic-gold hover:bg-gray-100 dark:hover:bg-gray-600 p-1.5 rounded-md transition">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-islamic-primary dark:text-islamic-gold font-bold mt-2">{portfolio.bank}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                 <button className="w-full py-3 bg-islamic-primary text-white rounded-xl font-bold hover:bg-islamic-dark transition shadow flex items-center justify-center gap-2">
                    {language === 'ar' ? 'أبلغ عن تحويل' : 'Report Transfer'}
                    {language === 'ar' ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-islamic-dark rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                     <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                 </svg>
             </div>
             <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4 font-serif">{language === 'ar' ? 'ساهم عينياً' : 'Contribute In-Kind'}</h3>
                 <p className="max-w-2xl mx-auto text-gray-300 mb-8">
                    {language === 'ar' 
                     ? 'نستقبل المساهمات العينية (مواد بناء، مصاحف، أجهزة صوتية، فرش مساجد). تواصل معنا لتنسيق الاستلام.'
                     : 'We accept in-kind contributions (building materials, Qurans, sound systems, carpets). Contact us to coordinate pickup.'}
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-islamic-gold text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg">
                        {language === 'ar' ? 'تواصل للتبرع العيني' : 'Contact for In-Kind'}
                    </button>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default Support;