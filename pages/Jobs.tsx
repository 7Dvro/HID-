
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, MapPin, Clock, Search, Filter, ShieldCheck } from 'lucide-react';

const Jobs: React.FC = () => {
  const { t, language } = useLanguage();

  const mockJobs = [
    { id: 1, title: language === 'ar' ? 'إمام وخطيب' : 'Imam & Khatib', loc: 'بورتسودان', type: 'Full-time' },
    { id: 2, title: language === 'ar' ? 'محفظ قرآن كريم' : 'Quran Teacher', loc: 'الخرطوم', type: 'Part-time' },
    { id: 3, title: language === 'ar' ? 'باحث شرعي' : 'Islamic Researcher', loc: 'عن بعد', type: 'Contract' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center animate-fade-up">
           <div className="w-16 h-16 bg-islamic-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-islamic-primary" />
           </div>
           <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif mb-4">{language === 'ar' ? 'فرص العمل والوظائف' : 'Career Opportunities'}</h1>
           <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
             {language === 'ar' ? 'انضم إلى فريق العمل بالهيئة العامة للحفظة والأئمة والدعاة وساهم في خدمة الدعوة والمجتمع.' : 'Join the HID Authority team and contribute to the service of Da\'wah and society.'}
           </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                {mockJobs.map(job => (
                    <div key={job.id} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-islamic-primary transition-colors">{job.title}</h3>
                            <span className="px-4 py-1 bg-islamic-gold/10 text-islamic-gold rounded-full text-xs font-bold">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.loc}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {language === 'ar' ? 'منذ يومين' : '2 days ago'}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="bg-islamic-primary p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
                    <h3 className="text-xl font-bold mb-4 relative z-10">{language === 'ar' ? 'تنبيهات الوظائف' : 'Job Alerts'}</h3>
                    <p className="text-sm text-islamic-light mb-6 relative z-10">{language === 'ar' ? 'اشترك لتصلك أحدث الوظائف فور طرحها.' : 'Subscribe to receive the latest job openings.'}</p>
                    <input type="email" placeholder="Email Address" className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none mb-4" />
                    <button className="w-full py-3 bg-white text-islamic-primary rounded-xl font-bold hover:bg-islamic-gold hover:text-white transition-all">Subscribe</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
