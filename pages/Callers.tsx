import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mic2, Video, PenTool, ShieldAlert, Users, PlayCircle, FileText, Download } from 'lucide-react';

const Callers: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-islamic-dark dark:text-islamic-gold font-serif mb-4">{t('callers')}</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'ar' 
             ? 'تمكين الدعاة من مخاطبة هموم المجتمع، نشر الوسطية، ومحاربة التطرف عبر أدوات عصرية وبرامج تأهيلية.'
             : 'Empowering Da\'is to address societal concerns, spread moderation, and fight extremism through modern tools.'}
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-16">
            
            {/* Societal Impact & Dialogue */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <Users className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">{language === 'ar' ? 'التأثير المجتمعي والحوار' : 'Societal Impact & Dialogue'}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: language === 'ar' ? 'المركز السوداني للحوار' : 'Sudanese Dialogue Center', color: 'bg-blue-500' },
                        { title: language === 'ar' ? 'تعزيز السلم الاجتماعي' : 'Promoting Social Peace', color: 'bg-green-500' },
                        { title: language === 'ar' ? 'الإرشاد الأسري' : 'Family Counseling', color: 'bg-orange-500' },
                        { title: language === 'ar' ? 'مساجد صديقة للأسرة' : 'Family-Friendly Mosques', color: 'bg-indigo-500' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1 transition-transform">
                            <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg`}>
                                {idx + 1}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <button className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                                {language === 'ar' ? 'عرض البرنامج' : 'View Program'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Confronting Extremism (Shubuhat) */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">{language === 'ar' ? 'مواجهة التطرف والغلو' : 'Confronting Extremism'}</h2>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100 dark:divide-gray-700">
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{language === 'ar' ? 'حملات التوعية الفكرية' : 'Intellectual Awareness Campaigns'}</h3>
                            <ul className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 block">
                                                {language === 'ar' ? 'وثيقة نبذ خطاب الكراهية' : 'Rejection of Hate Speech Doc'}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">PDF • 2.0 MB</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{language === 'ar' ? 'الرد على الشبهات المعاصرة' : 'Responding to Modern Doubts'}</h3>
                            <ul className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <PlayCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 block">
                                                {language === 'ar' ? 'مفهوم الجهاد وضوابطه الشرعية' : 'Concept of Jihad'}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Video • 25 min</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Creation & Tech */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                        <PenTool className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">{language === 'ar' ? 'التأهيل الرقمي وصناعة المحتوى' : 'Digital Qualification'}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                                <Video className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                {language === 'ar' ? 'دورة الإعلام الرقمي للدعاة' : 'Digital Media Course'}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                {language === 'ar' ? 'كيف توظف المنصات الإلكترونية لنشر الخطاب الوسطي المستنير.' : 'How to use platforms to spread moderate discourse.'}
                            </p>
                            <button className="text-islamic-primary dark:text-islamic-gold text-sm font-bold flex items-center gap-2 hover:underline">
                                {language === 'ar' ? 'سجل الآن' : 'Enroll Now'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Callers;