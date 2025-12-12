import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, BookOpen, Home, Mic2, ArrowRight, CheckCircle, Copy, Building } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Support: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const portfolios = [
    {
      id: 'khalwa',
      title: language === 'ar' ? 'تنمية مشاريع الخلاوي والتحفيظ' : 'Khalwas & Memorization Development',
      description: language === 'ar' 
        ? 'دعم مالي مباشر للرواتب والأغذية، توفير مواد تعليمية، وتدريب المعلمين.' 
        : 'Direct financial support for salaries and food, providing educational materials, and teacher training.',
      icon: BookOpen,
      color: 'bg-green-50 text-green-600',
      account: '1234-5678-9012-001',
      bank: language === 'ar' ? 'بنك الخرطوم' : 'Bank of Khartoum'
    },
    {
      id: 'housing',
      title: language === 'ar' ? 'برنامج "سكن كريم"' : '"Decent Housing" Program',
      description: language === 'ar' 
        ? 'توفير مساكن مناسبة للأئمة والمؤذنين، وتحسين البيئة المعيشية للعاملين في المساجد.' 
        : 'Providing suitable housing for Imams and Muezzins, and improving living environment.',
      icon: Home,
      color: 'bg-blue-50 text-blue-600',
      account: '1234-5678-9012-002',
      bank: language === 'ar' ? 'بنك أمدرمان الوطني' : 'Omdurman National Bank'
    },
    {
      id: 'care',
      title: language === 'ar' ? 'صندوق رعاية الأئمة والحفظة' : 'Imams & Huffaz Care Fund',
      description: language === 'ar' 
        ? 'الرعاية الصحية الشاملة، التأمين الاجتماعي، وبرامج الدعم المالي للمشاريع الصغيرة.' 
        : 'Comprehensive healthcare, social insurance, and financial support for small projects.',
      icon: Heart,
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
             ? 'مساهمتك تدعم الاستقرار المعيشي والاجتماعي لحماة المنابر وحفظة كتاب الله في السودان، وتمكنهم من أداء رسالتهم السامية.'
             : 'Your contribution supports the living and social stability of pulpits guardians and Quran memorizers in Sudan.'}
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
                 <h3 className="text-2xl font-bold mb-4 font-serif">{language === 'ar' ? 'رعاية مراكز النساء' : 'Women\'s Centers Care'}</h3>
                 <p className="max-w-2xl mx-auto text-gray-300 mb-8">
                    {language === 'ar' 
                     ? 'مشروع خاص لدعم دور تحفيظ القرآن الكريم للنساء، وتوفير المستلزمات وبرامج التدريب الخاصة بهن.'
                     : 'A special project to support Quran memorization centers for women, providing supplies and training programs.'}
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-islamic-gold text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg">
                        {language === 'ar' ? 'دعم مراكز النساء' : 'Support Women Centers'}
                    </button>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default Support;