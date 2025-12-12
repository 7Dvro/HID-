import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Target, Eye, Heart, Award, Users, Book, Building, CheckCircle, Scale, Sun, Globe } from 'lucide-react';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const values = [
    { icon: Scale, titleAr: 'الوسطية والاعتدال', titleEn: 'Moderation & Balance', descAr: 'نبذ التطرف والغلو بكافة أشكالهما.', descEn: 'Rejecting extremism and excess in all forms.' },
    { icon: Sun, titleAr: 'الاستنارة', titleEn: 'Enlightenment', descAr: 'مواكبة العصر وفهم مستجداته.', descEn: 'Keeping up with the times and understanding developments.' },
    { icon: Award, titleAr: 'الاحترافية', titleEn: 'Professionalism', descAr: 'العمل بمعايير الجودة والكفاءة.', descEn: 'Working with quality and efficiency standards.' },
    { icon: Scale, titleAr: 'العدالة والشفافية', titleEn: 'Justice & Transparency', descAr: 'المساواة وعدم المحاباة في جميع المعاملات.', descEn: 'Equality and impartiality in all dealings.' },
    { icon: Globe, titleAr: 'الوحدة الوطنية', titleEn: 'National Unity', descAr: 'تعزيز أواصر الأخوة والتعايش.', descEn: 'Strengthening bonds of brotherhood and coexistence.' },
    { icon: CheckCircle, titleAr: 'الإيجابية والتأثير', titleEn: 'Positivity & Impact', descAr: 'المساهمة الفاعلة في حل مشكلات المجتمع.', descEn: 'Active contribution to solving societal problems.' },
  ];

  const axes = [
      {
          titleAr: 'التطوير المؤسسي والقيادة',
          titleEn: 'Institutional Development & Leadership',
          descAr: 'تطوير الهيكل التنظيمي، تعزيز القدرات الإدارية، تحقيق الاستدامة المالية، وبناء نظام اتصال فعال.',
          descEn: 'Developing organizational structure, enhancing administrative capabilities, financial sustainability, and effective communication.'
      },
      {
          titleAr: 'التأهيل العلمي والمهني',
          titleEn: 'Scientific & Professional Qualification',
          descAr: 'برنامج الترخيص المهني، منصة التعليم الإلكتروني، تطوير المناهج، وإنشاء أكاديمية متخصصة.',
          descEn: 'Professional licensing program, e-learning platform, curriculum development, and specialized academy.'
      },
      {
          titleAr: 'الدعوة والتأثير المجتمعي',
          titleEn: 'Da\'wah & Societal Impact',
          descAr: 'حملات التوعية (سوداننا تسامح وسلام)، تفعيل دور المساجد، تعزيز الحوار، ومحاربة التطرف.',
          descEn: 'Awareness campaigns, activating mosques role, enhancing dialogue, and fighting extremism.'
      },
      {
          titleAr: 'الرعاية الاجتماعية والاقتصادية',
          titleEn: 'Social & Economic Care',
          descAr: 'صندوق رعاية الأئمة، برنامج سكن كريم، الرعاية الصحية، وتحسين المستوى المعيشي.',
          descEn: 'Imams Care Fund, Decent Housing Program, healthcare, and improving living standards.'
      }
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
                     </p>
                 </div>
                 <div className="md:w-1/2">
                     <img src="https://images.unsplash.com/photo-1596464528464-9be972eb049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Islamic Center" className="rounded-xl shadow-lg w-full object-cover" />
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
                      ? 'هيئة رائدة تمكن الأئمة والحفظة والدعاة لبناء مجتمع سوداني متسامح، مستنير، ومتمسك بقيمه الدينية الأصيلة.'
                      : 'A pioneering authority empowering Imams, Huffaz, and Da\'is to build a tolerant, enlightened Sudanese society adhering to authentic religious values.'}
                 </p>
             </div>
             
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-t-4 border-islamic-gold animate-on-scroll delay-200">
                 <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                     <Target className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{t('mission')}</h3>
                 <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                     {language === 'ar'
                      ? 'الإشراف على تأهيل وتطوير وتنظيم شؤون الأئمة والحفظة والدعاة في السودان، وتعزيز دورهم في بناء الفرد والمجتمع، ونشر الفهم الوسطي المستنير للإسلام.'
                      : 'Supervising the qualification, development, and organization of affairs for Imams, Huffaz, and Da\'is; enhancing their role in building individuals and society; and spreading the enlightened moderate understanding of Islam.'}
                 </p>
             </div>
         </div>

         {/* Values */}
         <div className="mb-16 animate-on-scroll">
             <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 font-serif">{t('values')}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

         {/* Strategic Axes */}
         <div className="bg-islamic-light dark:bg-gray-800 rounded-3xl p-8 md:p-16 animate-on-scroll">
             <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10 font-serif">{language === 'ar' ? 'المحاور الاستراتيجية (2026-2030)' : 'Strategic Axes (2026-2030)'}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                 {axes.map((axis, idx) => (
                     <div key={idx} className="flex items-start gap-4 bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border-l-4 border-islamic-gold">
                         <div className="mt-1 min-w-[24px]">
                             <CheckCircle className="w-6 h-6 text-green-500" />
                         </div>
                         <div>
                             <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{language === 'ar' ? axis.titleAr : axis.titleEn}</h4>
                             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{language === 'ar' ? axis.descAr : axis.descEn}</p>
                         </div>
                     </div>
                 ))}
             </div>
         </div>

      </div>
    </div>
  );
};

export default About;