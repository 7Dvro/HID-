import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { BookOpen, Clock, Users, CheckCircle, Filter, PlayCircle, Lock, ChevronDown, ChevronUp, ArrowRight, ArrowLeft, Star, Share2, Award, FileText, Layout, Video } from 'lucide-react';

// --- Types ---
interface Lesson {
  id: string;
  titleAr: string;
  titleEn: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  isFree?: boolean;
}

interface Module {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  titleAr: string;
  titleEn: string;
  instructorAr: string;
  instructorEn: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Fiqh' | 'Quran' | 'Hadith' | 'Skills';
  duration: string;
  students: number;
  rating: number;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  modules: Module[];
}

// --- Mock Data ---
const COURSES_DATA: Course[] = [
  {
    id: 1,
    titleAr: 'فقه العبادات الميسر',
    titleEn: 'Simplified Fiqh of Worship',
    instructorAr: 'د. سعد الحميد',
    instructorEn: 'Dr. Saad Al-Humaid',
    level: 'Beginner',
    category: 'Fiqh',
    duration: '4h 30m',
    students: 1540,
    rating: 4.8,
    image: 'https://picsum.photos/seed/fiqh/800/400',
    descriptionAr: 'دورة شاملة تشرح أحكام الطهارة والصلاة والزكاة والصيام بأسلوب ميسر للمبتدئين وفق المذاهب المعتمدة.',
    descriptionEn: 'A comprehensive course explaining the rules of Purification, Prayer, Zakat, and Fasting in a simplified manner.',
    modules: [
      {
        id: 'm1',
        titleAr: 'مقدمة في الفقه',
        titleEn: 'Introduction to Fiqh',
        lessons: [
          { id: 'l1', titleAr: 'تعريف الفقه وأهميته', titleEn: 'Definition of Fiqh', duration: '10:00', type: 'video', isFree: true },
          { id: 'l2', titleAr: 'أقسام الأحكام التكليفية', titleEn: 'Types of Rulings', duration: '15:00', type: 'video' }
        ]
      },
      {
        id: 'm2',
        titleAr: 'كتاب الطهارة',
        titleEn: 'Book of Purification',
        lessons: [
          { id: 'l3', titleAr: 'أحكام المياه', titleEn: 'Rules of Water', duration: '12:00', type: 'video' },
          { id: 'l4', titleAr: 'صفة الوضوء', titleEn: 'How to perform Wudu', duration: '20:00', type: 'video' },
          { id: 'l5', titleAr: 'اختبار الطهارة', titleEn: 'Purification Quiz', duration: '5:00', type: 'quiz' }
        ]
      }
    ]
  },
  {
    id: 2,
    titleAr: 'علوم القرآن والتدبر',
    titleEn: 'Quran Sciences & Reflection',
    instructorAr: 'الشيخ أحمد علي',
    instructorEn: 'Sheikh Ahmed Ali',
    level: 'Intermediate',
    category: 'Quran',
    duration: '6h 15m',
    students: 2100,
    rating: 4.9,
    image: 'https://picsum.photos/seed/quran/800/400',
    descriptionAr: 'رحلة في عمق كتاب الله، نتعلم فيها أسباب النزول، المكي والمدني، وقواعد التدبر الأمثل للآيات.',
    descriptionEn: 'A journey into the depth of the Quran, learning reasons of revelation, Makki & Madani, and reflection rules.',
    modules: [
      {
        id: 'm1',
        titleAr: 'المدخل لعلوم القرآن',
        titleEn: 'Intro to Quran Sciences',
        lessons: [
          { id: 'l1', titleAr: 'الوحي ونزول القرآن', titleEn: 'Revelation', duration: '18:00', type: 'video', isFree: true },
          { id: 'l2', titleAr: 'جمع القرآن وتدوينه', titleEn: 'Compilation of Quran', duration: '22:00', type: 'video' }
        ]
      }
    ]
  },
  {
    id: 3,
    titleAr: 'مهارات الإلقاء والخطابة',
    titleEn: 'Public Speaking Skills',
    instructorAr: 'أ. محمد صالح',
    instructorEn: 'Mr. Mohammed Saleh',
    level: 'Advanced',
    category: 'Skills',
    duration: '3h 45m',
    students: 850,
    rating: 4.7,
    image: 'https://picsum.photos/seed/speech/800/400',
    descriptionAr: 'دورة عملية للدعاة والأئمة لتطوير مهارات التواصل، لغة الجسد، وبناء الخطبة المؤثرة.',
    descriptionEn: 'Practical course for Imams to improve communication skills, body language, and structuring impactful speeches.',
    modules: []
  }
];

const Education: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  
  // Navigation State
  const [viewMode, setViewMode] = useState<'browse' | 'details' | 'classroom'>('browse');
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  
  // Classroom State
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Filter State
  const [filterLevel, setFilterLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [filterCategory, setFilterCategory] = useState<'All' | 'Fiqh' | 'Quran' | 'Hadith' | 'Skills'>('All');

  // Derived Data
  const activeCourse = useMemo(() => COURSES_DATA.find(c => c.id === activeCourseId), [activeCourseId]);
  
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      const levelMatch = filterLevel === 'All' || course.level === filterLevel;
      const catMatch = filterCategory === 'All' || course.category === filterCategory;
      return levelMatch && catMatch;
    });
  }, [filterLevel, filterCategory]);

  // --- Handlers ---

  const handleOpenCourse = (id: number) => {
    setActiveCourseId(id);
    setViewMode('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnroll = () => {
    if (!activeCourse) return;
    showToast(language === 'ar' ? 'تم التسجيل في الدورة' : 'Enrolled Successfully', 'success');
    // Set first lesson as active
    if (activeCourse.modules.length > 0 && activeCourse.modules[0].lessons.length > 0) {
        setActiveLessonId(activeCourse.modules[0].lessons[0].id);
        // Expand first module
        setExpandedModules([activeCourse.modules[0].id]);
    }
    setViewMode('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => 
        prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  const handleLessonSelect = (lessonId: string) => {
      setActiveLessonId(lessonId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markLessonComplete = (lessonId: string) => {
      if (!completedLessons.includes(lessonId)) {
          setCompletedLessons([...completedLessons, lessonId]);
          showToast(language === 'ar' ? 'تم إكمال الدرس' : 'Lesson Completed', 'success');
      }
  };

  // --- Components ---

  // 1. Browse View
  const BrowseView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-islamic-primary to-islamic-dark rounded-2xl p-8 mb-10 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <BookOpen className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-2xl">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block backdrop-blur-sm">
                    {language === 'ar' ? 'أكاديمية الهيئة' : 'HID Academy'}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                    {language === 'ar' ? 'طور معارفك الشرعية ومهاراتك الدعوية' : 'Develop your Islamic knowledge and Da\'wah skills'}
                </h1>
                <p className="text-islamic-light text-lg mb-6 leading-relaxed">
                    {language === 'ar' 
                        ? 'منصة تعليمية متكاملة تقدم دورات منهجية للحفظة والأئمة والدعاة، بشهادات معتمدة ومحتوى عالي الجودة.' 
                        : 'Integrated educational platform offering systematic courses for Huffaz, Imams, and Callers with certified certificates.'}
                </p>
                <div className="flex gap-4">
                    <button className="bg-islamic-gold text-white px-6 py-2.5 rounded-lg font-bold hover:bg-yellow-600 transition shadow-md">
                        {language === 'ar' ? 'تصفح المسارات' : 'Browse Paths'}
                    </button>
                </div>
            </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() => setFilterLevel(lvl)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                            filterLevel === lvl 
                            ? 'bg-islamic-primary text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                    >
                        {lvl === 'All' ? (language === 'ar' ? 'الكل' : 'All') :
                         lvl === 'Beginner' ? (language === 'ar' ? 'مبتدئ' : 'Beginner') :
                         lvl === 'Intermediate' ? (language === 'ar' ? 'متوسط' : 'Intermediate') :
                         (language === 'ar' ? 'متقدم' : 'Advanced')}
                    </button>
                ))}
             </div>
             
             <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                {(['All', 'Fiqh', 'Quran', 'Skills'] as const).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all whitespace-nowrap ${
                            filterCategory === cat
                            ? 'border-islamic-gold text-islamic-gold bg-islamic-gold/10'
                            : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        {cat === 'All' ? (language === 'ar' ? 'جميع الأقسام' : 'All Cats') :
                         cat === 'Fiqh' ? (language === 'ar' ? 'فقه' : 'Fiqh') :
                         cat === 'Quran' ? (language === 'ar' ? 'قرآن' : 'Quran') :
                         (language === 'ar' ? 'مهارات' : 'Skills')}
                    </button>
                ))}
             </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
                <div key={course.id} onClick={() => handleOpenCourse(course.id)} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 cursor-pointer flex flex-col h-full">
                    <div className="h-48 relative overflow-hidden">
                        <img src={course.image} alt={course.titleEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-white font-bold text-sm flex items-center gap-1">
                                {language === 'ar' ? 'عرض التفاصيل' : 'View Details'} <ArrowLeft className={`w-4 h-4 ${language === 'en' ? 'rotate-180' : ''}`} />
                            </span>
                        </div>
                        <div className="absolute top-3 start-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm text-islamic-dark dark:text-islamic-gold">
                            {course.category}
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                                course.level === 'Beginner' ? 'bg-green-100 text-green-700' : 
                                course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                                {course.level}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                <Star className="w-3 h-3 fill-current" /> {course.rating}
                            </div>
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-islamic-primary dark:group-hover:text-islamic-gold transition-colors">
                            {language === 'ar' ? course.titleAr : course.titleEn}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {language === 'ar' ? course.instructorAr : course.instructorEn}
                        </p>
                        
                        <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                                <Video className="w-3 h-3" /> {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} {language === 'ar' ? 'درس' : 'Lessons'}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  // 2. Course Details View
  const CourseDetailsView = () => {
      if (!activeCourse) return null;
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Breadcrumb */}
            <button onClick={() => setViewMode('browse')} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-islamic-primary mb-6 transition text-sm font-bold">
                {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {language === 'ar' ? 'العودة للدورات' : 'Back to Courses'}
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mb-4">
                            {language === 'ar' ? activeCourse.titleAr : activeCourse.titleEn}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            {language === 'ar' ? activeCourse.descriptionAr : activeCourse.descriptionEn}
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap gap-4 md:gap-8 border-y border-gray-200 dark:border-gray-700 py-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400"><Users className="w-5 h-5" /></div>
                            <div>
                                <span className="block font-bold text-gray-900 dark:text-white">{activeCourse.students}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'طالب مسجل' : 'Students'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-full text-orange-600 dark:text-orange-400"><Clock className="w-5 h-5" /></div>
                            <div>
                                <span className="block font-bold text-gray-900 dark:text-white">{activeCourse.duration}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'المدة الإجمالية' : 'Duration'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400"><FileText className="w-5 h-5" /></div>
                            <div>
                                <span className="block font-bold text-gray-900 dark:text-white">{activeCourse.modules.length}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'وحدات دراسية' : 'Modules'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400"><Award className="w-5 h-5" /></div>
                            <div>
                                <span className="block font-bold text-gray-900 dark:text-white">{language === 'ar' ? 'شهادة إتمام' : 'Certificate'}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'معتمدة' : 'Certified'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Curriculum Preview */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{language === 'ar' ? 'المنهج الدراسي' : 'Curriculum'}</h3>
                        </div>
                        <div>
                            {activeCourse.modules.map((module) => (
                                <div key={module.id} className="border-b border-gray-50 dark:border-gray-700 last:border-0">
                                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 flex justify-between items-center">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                                            {language === 'ar' ? module.titleAr : module.titleEn}
                                        </h4>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{module.lessons.length} {language === 'ar' ? 'دروس' : 'Lessons'}</span>
                                    </div>
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {module.lessons.map(lesson => (
                                            <div key={lesson.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                                <div className="flex items-center gap-3">
                                                    {lesson.type === 'video' ? <PlayCircle className="w-4 h-4 text-gray-400" /> : <FileText className="w-4 h-4 text-gray-400" />}
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">{language === 'ar' ? lesson.titleAr : lesson.titleEn}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {lesson.isFree && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{language === 'ar' ? 'مجاني' : 'Free'}</span>}
                                                    <span className="text-xs text-gray-400">{lesson.duration}</span>
                                                    {!lesson.isFree && <Lock className="w-3 h-3 text-gray-300" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
                        <div className="aspect-video rounded-xl overflow-hidden mb-6 relative group cursor-pointer">
                            <img src={activeCourse.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                    <PlayCircle className="w-6 h-6 text-islamic-primary" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-islamic-primary dark:text-islamic-gold">{language === 'ar' ? 'مجاناً' : 'Free'}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through ms-2">$49.99</span>
                        </div>

                        <button 
                            onClick={handleEnroll}
                            className="w-full bg-islamic-primary text-white py-3 rounded-xl font-bold hover:bg-islamic-dark transition shadow-lg mb-4 flex items-center justify-center gap-2"
                        >
                            {language === 'ar' ? 'ابدأ التعلم الآن' : 'Start Learning Now'}
                            {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                        </button>

                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{language === 'ar' ? 'وصول كامل مدى الحياة' : 'Full lifetime access'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{language === 'ar' ? 'متوفر على الهاتف والتلفاز' : 'Access on mobile and TV'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{language === 'ar' ? 'شهادة إتمام عند الانتهاء' : 'Certificate of completion'}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between items-center">
                            <button className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-sm font-medium flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> {language === 'ar' ? 'مشاركة' : 'Share'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  };

  // 3. Classroom (LMS) View
  const ClassroomView = () => {
      if (!activeCourse) return null;
      
      // Calculate progress
      const totalLessons = activeCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      const progress = Math.round((completedLessons.length / totalLessons) * 100);

      // Find active lesson object
      let currentLesson: Lesson | undefined;
      activeCourse.modules.forEach(m => {
          const l = m.lessons.find(l => l.id === activeLessonId);
          if (l) currentLesson = l;
      });

      return (
          <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 -m-8"> {/* Negative margin to break container padding if needed, but here we just use full space */}
              
              {/* Sidebar (Curriculum) */}
              <div className="lg:w-96 bg-white dark:bg-gray-800 border-l dark:border-gray-700 overflow-y-auto h-screen sticky top-0 z-20 flex flex-col">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <button onClick={() => setViewMode('browse')} className="text-xs font-bold text-gray-500 hover:text-islamic-primary mb-2 flex items-center gap-1">
                          {language === 'ar' ? <ArrowRight className="w-3 h-3" /> : <ArrowLeft className="w-3 h-3" />}
                          {language === 'ar' ? 'العودة' : 'Back'}
                      </button>
                      <h2 className="font-bold text-gray-900 dark:text-white line-clamp-1">{language === 'ar' ? activeCourse.titleAr : activeCourse.titleEn}</h2>
                      
                      {/* Progress Bar */}
                      <div className="mt-4">
                          <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
                              <span>{progress}% {language === 'ar' ? 'مكتمل' : 'Completed'}</span>
                              <span>{completedLessons.length}/{totalLessons}</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-islamic-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
                          </div>
                      </div>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                      {activeCourse.modules.map(module => (
                          <div key={module.id} className="border-b border-gray-50 dark:border-gray-700">
                              <button 
                                onClick={() => toggleModule(module.id)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              >
                                  <span className="font-bold text-xs text-gray-700 dark:text-gray-300">{language === 'ar' ? module.titleAr : module.titleEn}</span>
                                  {expandedModules.includes(module.id) ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                              </button>
                              
                              {expandedModules.includes(module.id) && (
                                  <div>
                                      {module.lessons.map(lesson => {
                                          const isActive = lesson.id === activeLessonId;
                                          const isCompleted = completedLessons.includes(lesson.id);
                                          return (
                                              <button 
                                                key={lesson.id} 
                                                onClick={() => handleLessonSelect(lesson.id)}
                                                className={`w-full px-4 py-3 flex gap-3 text-start transition border-l-4 ${
                                                    isActive 
                                                    ? 'bg-islamic-light/50 dark:bg-gray-700/80 border-islamic-primary' 
                                                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/30'
                                                }`}
                                              >
                                                  <div className="mt-0.5">
                                                      {isCompleted 
                                                        ? <CheckCircle className="w-4 h-4 text-green-500 fill-current" /> 
                                                        : (lesson.type === 'video' ? <PlayCircle className={`w-4 h-4 ${isActive ? 'text-islamic-primary' : 'text-gray-400'}`} /> : <FileText className={`w-4 h-4 ${isActive ? 'text-islamic-primary' : 'text-gray-400'}`} />)
                                                      }
                                                  </div>
                                                  <div className="flex-1">
                                                      <span className={`block text-sm ${isActive ? 'font-bold text-islamic-primary dark:text-islamic-gold' : 'text-gray-600 dark:text-gray-300'}`}>
                                                          {language === 'ar' ? lesson.titleAr : lesson.titleEn}
                                                      </span>
                                                      <span className="text-[10px] text-gray-400">{lesson.duration}</span>
                                                  </div>
                                              </button>
                                          );
                                      })}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto h-screen p-4 md:p-8">
                  {currentLesson ? (
                      <div className="max-w-4xl mx-auto">
                          {/* Video Player Placeholder */}
                          <div className="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video mb-6 relative group">
                              <div className="absolute inset-0 flex items-center justify-center">
                                  <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-islamic-primary hover:scale-110 transition duration-300 text-white">
                                      <PlayCircle className="w-10 h-10 fill-current" />
                                  </button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition">
                                  <h3 className="font-bold">{language === 'ar' ? currentLesson.titleAr : currentLesson.titleEn}</h3>
                              </div>
                          </div>

                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                              <div>
                                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                      {language === 'ar' ? currentLesson.titleAr : currentLesson.titleEn}
                                  </h1>
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                                      {language === 'ar' ? `الدرس ${completedLessons.length + 1} من ${totalLessons}` : `Lesson ${completedLessons.length + 1} of ${totalLessons}`}
                                  </p>
                              </div>
                              <button 
                                onClick={() => markLessonComplete(currentLesson!.id)}
                                disabled={completedLessons.includes(currentLesson.id)}
                                className={`px-6 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${
                                    completedLessons.includes(currentLesson.id)
                                    ? 'bg-green-100 text-green-700 cursor-default'
                                    : 'bg-islamic-primary text-white hover:bg-islamic-dark shadow-md'
                                }`}
                              >
                                  {completedLessons.includes(currentLesson.id) ? (
                                      <>{language === 'ar' ? 'تم الإكمال' : 'Completed'} <CheckCircle className="w-4 h-4" /></>
                                  ) : (
                                      <>{language === 'ar' ? 'إكمال الدرس' : 'Mark Complete'} <ArrowLeft className={`w-4 h-4 ${language === 'en' ? 'rotate-180' : ''}`} /></>
                                  )}
                              </button>
                          </div>

                          {/* Lesson Content / Notes */}
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                                  {language === 'ar' ? 'ملخص الدرس' : 'Lesson Summary'}
                              </h3>
                              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                                  <p>{language === 'ar' 
                                    ? 'في هذا الدرس، سنتناول المحاور الأساسية للموضوع، مع التركيز على التطبيقات العملية والأمثلة الواقعية. يرجى تدوين الملاحظات ومراجعة المواد المرفقة.' 
                                    : 'In this lesson, we will cover the core concepts, focusing on practical applications and real-world examples. Please take notes and review the attached materials.'}
                                  </p>
                                  <ul className="list-disc ps-5 mt-4 space-y-2">
                                      <li>{language === 'ar' ? 'المحور الأول: المفهوم والتعريف' : 'Point 1: Concept & Definition'}</li>
                                      <li>{language === 'ar' ? 'المحور الثاني: الأدلة الشرعية' : 'Point 2: Legal Evidence'}</li>
                                      <li>{language === 'ar' ? 'المحور الثالث: التطبيق العملي' : 'Point 3: Practical Application'}</li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                          <p>{language === 'ar' ? 'اختر درساً للبدء' : 'Select a lesson to start'}</p>
                      </div>
                  )}
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      {viewMode === 'classroom' ? (
          <ClassroomView />
      ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {viewMode === 'browse' && <BrowseView />}
              {viewMode === 'details' && <CourseDetailsView />}
          </div>
      )}
    </div>
  );
};

export default Education;