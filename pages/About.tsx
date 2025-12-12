import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Target, Eye, Heart, Award, Users, Book, Building, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const values = [
    { icon: Heart, titleAr: 'الإخلاص', titleEn: 'Sincerity', descAr: 'ابتغاء وجه الله في كل عمل.', descEn: 'Seeking Allah\'s pleasure in every action.' },
    { icon: Award, titleAr: 'الإتقان', titleEn: 'Excellence', descAr: 'الجودة العالية في الأداء والمخرجات.', descEn: 'High quality in performance and outputs.' },
    { icon: Users, titleAr: 'التعاون', titleEn: 'Cooperation', descAr: 'العمل بروح الفريق الواحد.', descEn: 'Working as one team.' },
    { icon: Book, titleAr: 'الوسطية', titleEn: 'Moderation', descAr: 'التمسك بالمنهج الوسطي المعتدل.', descEn: 'Adhering to the moderate approach.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-20">
      
      {/* Header */}
      <div className="bg-islamic-primary text-white py-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
             <svg width="100%" height="100%">
                 <pattern id="pattern-hex" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M20 0 L 40 10 L 40 30 L 20 40 L 0 30 L 0 10 Z" fill="none" stroke="currentColor" />
                 </pattern>
                 <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)" />
             </svg>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{t('about')}</h1>
            <p className="text-xl text-islamic-light max-w-2xl mx-auto">
                {t('heroSubtitle')}
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
         
         {/* Introduction */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-16 animate-on-scroll">
             <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="md:w-1/2">
                     <h2 className="text-3xl font-bold text-islamic-dark dark:text-white mb-6 font-serif border-b-4 border-islamic-gold inline-block pb-2">
                        {language === 'ar' ? 'من نحن؟' : 'Who We Are?'}
                     </h2>
                     <p className="text-gray-600 dark:text-gray-300 text-lg leading-loose text-justify">
                         {t('aboutText')} 
                         {language === 'ar' 
                          ? ' تأسست الهيئة استجابة للحاجة الماسة لتنظيم وتطوير العمل الدعوي والقرآني في السودان، وتعمل تحت إشراف نخبة من كبار العلماء والمشايخ. نؤمن بأن بناء الإنسان يبدأ من القيم، وأن القرآن الكريم هو المنبع الصافي لهذه القيم.'
                          : ' Founded in response to the urgent need to organize and develop Da\'wah and Quranic work in Sudan, working under the supervision of elite scholars. We believe human development starts with values sourced from the Quran.'}
                     </p>
                 </div>
                 <div className="md:w-1/2">
                     <img src="https://picsum.photos/seed/aboutmain/800/600" alt="Meeting" className="rounded-xl shadow-lg w-full" />
                 </div>
             </div>
         </div>

         {/* Vision & Mission */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-t-4 border-islamic-primary animate-on-scroll delay-100">
                 <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                     <Eye className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{t('vision')}</h3>
                 <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                     {language === 'ar' 
                      ? 'الريادة والتميز في خدمة كتاب الله تعالى ورعاية أهله، وبناء مجتمع قرآني متمسك بقيمه وهويته.'
                      : 'Leadership and excellence in serving the Book of Allah and caring for its people, building a Quranic society adhering to its values.'}
                 </p>
             </div>
             
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-t-4 border-islamic-gold animate-on-scroll delay-200">
                 <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                     <Target className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{t('mission')}</h3>
                 <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                     {language === 'ar'
                      ? 'تمكين الحفظة والأئمة والدعاة علمياً ومهارياً واجتماعياً، وتوفير بيئة محفزة للإبداع في خدمة الدعوة والمجتمع.'
                      : 'Empowering Huffaz, Imams, and Callers scientifically, skillfully, and socially, providing a stimulating environment for creativity in serving Da\'wah.'}
                 </p>
             </div>
         </div>

         {/* Values */}
         <div className="mb-16 animate-on-scroll">
             <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 font-serif">{t('values')}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {values.map((val, idx) => (
                     <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition text-center border border-gray-100 dark:border-gray-700">
                         <div className="w-14 h-14 mx-auto bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-islamic-primary dark:text-islamic-gold">
                             <val.icon className="w-7 h-7" />
                         </div>
                         <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{language === 'ar' ? val.titleAr : val.titleEn}</h4>
                         <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? val.descAr : val.descEn}</p>
                     </div>
                 ))}
             </div>
         </div>

         {/* Strategic Goals */}
         <div className="bg-islamic-light dark:bg-gray-800 rounded-3xl p-8 md:p-16 animate-on-scroll">
             <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10 font-serif">{language === 'ar' ? 'أهدافنا الاستراتيجية' : 'Strategic Goals'}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                 {[
                     language === 'ar' ? 'العناية بالقرآن الكريم تعليماً وحفظاً وتدبراً.' : 'Caring for Quran education, memorization, and reflection.',
                     language === 'ar' ? 'تأهيل الكوادر الدعوية تأهيلاً شرعياً وعصرياً.' : 'Qualifying Da\'wah cadres with Sharia and modern skills.',
                     language === 'ar' ? 'رعاية شؤون المساجد والخلاوي وتطوير بيئتها.' : 'Caring for Mosques and Khalwas affairs and developing their environment.',
                     language === 'ar' ? 'تعزيز الوسطية والاعتدال في المجتمع.' : 'Promoting moderation in society.',
                     language === 'ar' ? 'استخدام التقنية الحديثة في خدمة الدعوة.' : 'Using modern technology in serving Da\'wah.',
                     language === 'ar' ? 'تحقيق الاستدامة المالية لمشاريع الهيئة.' : 'Achieving financial sustainability for Authority projects.'
                 ].map((goal, idx) => (
                     <div key={idx} className="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                         <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                         <span className="text-gray-700 dark:text-gray-200 font-medium">{goal}</span>
                     </div>
                 ))}
             </div>
         </div>

      </div>
    </div>
  );
};

export default About;