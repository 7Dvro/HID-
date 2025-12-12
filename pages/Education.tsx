import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Clock, Users } from 'lucide-react';

const Education: React.FC = () => {
  const { t, language } = useLanguage();

  const courses = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    title: language === 'ar' ? 'فقه العبادات الميسر' : 'Simplified Fiqh of Worship',
    instructor: language === 'ar' ? 'د. سعد الحميد' : 'Dr. Saad Al-Humaid',
    level: language === 'ar' ? 'مبتدئ' : 'Beginner',
    duration: '4h 30m',
    students: 1250,
    image: `https://picsum.photos/seed/edu${i}/600/400`
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-islamic-dark mb-8 font-serif">{t('education')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
               <div className="h-48 relative overflow-hidden">
                 <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 start-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-islamic-primary">
                    {course.level}
                 </div>
               </div>
               <div className="p-6">
                 <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                 <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>
                 
                 <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-4">
                    <div className="flex items-center gap-1">
                       <Clock className="w-3 h-3" />
                       {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                       <Users className="w-3 h-3" />
                       {course.students}
                    </div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;