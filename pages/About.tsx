import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Target, Eye, Award, Users, Book, CheckCircle, Scale, Sun, Globe, UserCircle, Briefcase, MapPin, ShieldCheck, PieChart, Newspaper, GraduationCap, Users2, Landmark, X, Info, Shield, Layers, Quote } from 'lucide-react';

interface SecretariatDetails {
  id: string;
  roleAr: string;
  roleEn: string;
  icon: any;
  secretaryAr: string;
  secretaryEn: string;
  members: number;
  purposeAr: string;
  purposeEn: string;
  infoAr: string;
  infoEn: string;
}

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedSecretariat, setSelectedSecretariat] = useState<SecretariatDetails | null>(null);

  const values = [
    { icon: Scale, titleAr: 'الوسطية والاعتدال', titleEn: 'Moderation & Balance', descAr: 'نبذ التطرف والغلو بكافة أشكالهما.', descEn: 'Rejecting extremism and excess in all forms.' },
    { icon: Sun, titleAr: 'الاستنارة', titleEn: 'Enlightenment', descAr: 'مواكبة العصر وفهم مستجداته.', descEn: 'Keeping up with the times and understanding developments.' },
    { icon: Award, titleAr: 'الاحترافية', titleEn: 'Professionalism', descAr: 'العمل بمعايير الجودة والكفاءة.', descEn: 'Working with quality and efficiency standards.' },
    { icon: ShieldCheck, titleAr: 'العدالة والشفافية', titleEn: 'Justice & Transparency', descAr: 'المساواة وعدم المحاباة في جميع المعاملات.', descEn: 'Equality and impartiality in all dealings.' },
    { icon: Globe, titleAr: 'الوحدة الوطنية', titleEn: 'National Unity', descAr: 'تعزيز أواصر الأخوة والتعايش.', descEn: 'Strengthening bonds of brotherhood and coexistence.' },
    { icon: CheckCircle, titleAr: 'الإيجابية والتأثير', titleEn: 'Positivity & Impact', descAr: 'المساهمة الفاعلة في حل مشكلات المجتمع.', descEn: 'Active contribution to solving societal problems.' },
  ];

  const executiveOffice: SecretariatDetails[] = [
    { 
      id: 'pres', roleAr: 'الرئيس', roleEn: 'President', icon: UserCircle, 
      secretaryAr: 'د. عبدالله محمد عثمان', secretaryEn: 'Dr. Abdullah Mohammed', members: 1, 
      purposeAr: 'القيادة العليا للهيئة وتحديد التوجهات الاستراتيجية العامة.', 
      purposeEn: 'Supreme leadership of the authority and defining general strategic directions.',
      infoAr: 'يشرف الرئيس على كافة أعمال الهيئة ويمثلها في المحافل الدولية والرسمية.',
      infoEn: 'The President oversees all authority work and represents it in international and official forums.'
    },
    { 
      id: 'gs', roleAr: 'الأمين العام', roleEn: 'General Secretary', icon: ShieldCheck,
      secretaryAr: 'أ. عمر إبراهيم علي', secretaryEn: 'Mr. Omar Ibrahim', members: 5,
      purposeAr: 'إدارة العمل التنفيذي اليومي والتنسيق بين الأمانات المختلفة.',
      purposeEn: 'Managing daily executive work and coordinating between different secretariats.',
      infoAr: 'يتولى الأمين العام متابعة تنفيذ قرارات المكتب التنفيذي والخطط التشغيلية.',
      infoEn: 'The General Secretary follows up on the implementation of Executive Office decisions and operational plans.'
    },
    { 
      id: 'ed', roleAr: 'المدير التنفيذي', roleEn: 'Executive Director', icon: Briefcase,
      secretaryAr: 'المهندس أحمد صالح', secretaryEn: 'Eng. Ahmed Saleh', members: 8,
      purposeAr: 'الإشراف الفني والتقني على المشاريع وضمان كفاءة الأداء المؤسسي.',
      purposeEn: 'Technical and professional supervision of projects and ensuring institutional performance efficiency.',
      infoAr: 'يعمل المدير التنفيذي على تطوير الأنظمة الإدارية والتقنية للهيئة.',
      infoEn: 'The Executive Director works on developing the administrative and technical systems of the authority.'
    },
    { 
      id: 'kh', roleAr: 'أمين أمانة الخلاوي', roleEn: 'Khalwas Secretary', icon: Book,
      secretaryAr: 'الشيخ محمد الرفاعي', secretaryEn: 'Sheikh Mohammed Al-Rifai', members: 12,
      purposeAr: 'تنظيم شؤون الخلاوي، تطوير المناهج القرآنية، ودعم طلاب التحفيظ.',
      purposeEn: 'Organizing Khalwa affairs, developing Quranic curricula, and supporting memorization students.',
      infoAr: 'تعتبر هذه الأمانة هي القلب النابض للهيئة، حيث تشرف على آلاف الخلاوي في السودان.',
      infoEn: 'This secretariat is the heart of the authority, supervising thousands of Khalwas across Sudan.'
    },
    { 
      id: 'fa', roleAr: 'الأمين المالي والإداري', roleEn: 'Financial Secretary', icon: Landmark,
      secretaryAr: 'أ. سامي عبدالرحيم', secretaryEn: 'Mr. Sami Abdelrahim', members: 6,
      purposeAr: 'تحقيق الاستدامة المالية للهيئة وإدارة الموارد البشرية واللوجستية.',
      purposeEn: 'Achieving financial sustainability for the authority and managing human and logistical resources.',
      infoAr: 'مسؤولة عن ميزانية الهيئة والتدقيق المالي وإدارة الأصول.',
      infoEn: 'Responsible for the authority budget, financial auditing, and asset management.'
    },
    { 
      id: 'pl', roleAr: 'أمين التخطيط والمتابعة', roleEn: 'Planning Secretary', icon: PieChart,
      secretaryAr: 'د. نادية حسن', secretaryEn: 'Dr. Nadia Hassan', members: 4,
      purposeAr: 'رسم السياسات المستقبلية ومتابعة مؤشرات الأداء للخطة الاستراتيجية.',
      purposeEn: 'Drawing future policies and following up on performance indicators for the strategic plan.',
      infoAr: 'تتولى إعداد التقارير الدورية حول مدى التقدم في تحقيق أهداف الهيئة.',
      infoEn: 'Handles periodic reports on the progress towards achieving the authority goals.'
    },
    { 
      id: 'pr', roleAr: 'أمين المشروعات والبرامج', roleEn: 'Projects Secretary', icon: Target,
      secretaryAr: 'أ. ياسر حمد', secretaryEn: 'Mr. Yasser Hamad', members: 10,
      purposeAr: 'تصميم وتنفيذ المبادرات الميدانية والمشاريع الإنشائية والتنموية.',
      purposeEn: 'Designing and implementing field initiatives, construction, and development projects.',
      infoAr: 'تشرف على تنفيذ برنامج سكن كريم ومراكز التميز الدعوي.',
      infoEn: 'Supervises the implementation of the Decent Housing program and Da\'wah excellence centers.'
    },
    { 
      id: 'md', roleAr: 'أمين الإعلام والعلاقات', roleEn: 'Media Secretary', icon: Newspaper,
      secretaryAr: 'أ. خالد يوسف', secretaryEn: 'Mr. Khalid Yousif', members: 7,
      purposeAr: 'بناء الصورة الذهنية للهيئة وتعزيز الشراكات المحلية والدولية.',
      purposeEn: 'Building the authority\'s brand image and enhancing local and international partnerships.',
      infoAr: 'تدير المنصات الرقمية للهيئة وتتواصل مع وسائل الإعلام والجهات المانحة.',
      infoEn: 'Manages the authority digital platforms and communicates with media and donors.'
    },
    { 
      id: 'tr', roleAr: 'أمين التدريب والتأهيل', roleEn: 'Training Secretary', icon: GraduationCap,
      secretaryAr: 'د. إبراهيم محمود', secretaryEn: 'Dr. Ibrahim Mahmoud', members: 9,
      purposeAr: 'رفع الكفاءة العلمية والمهنية للأئمة والدعاة من خلال الدورات التخصصية.',
      purposeEn: 'Raising the scientific and professional efficiency of Imams and Callers through specialized courses.',
      infoAr: 'تشرف على أكاديمية الهيئة ومنصة التعليم الإلكتروني وبرنامج الترخيص المهني.',
      infoEn: 'Supervises the HID Academy, e-learning platform, and the professional licensing program.'
    },
    { 
      id: 'st', roleAr: 'أمين شؤون الولايات', roleEn: 'States Affairs Secretary', icon: MapPin,
      secretaryAr: 'الشيخ عوض الله جادين', secretaryEn: 'Sheikh Awadallah Gadin', members: 18,
      purposeAr: 'ربط الأمانة العامة بكافة مكاتب الهيئة في ولايات السودان المختلفة.',
      purposeEn: 'Linking the General Secretariat with all authority offices in different Sudanese states.',
      infoAr: 'تعمل كحلقة وصل لضمان وصول الخدمات والبرامج لكل قرية ومدينة في السودان.',
      infoEn: 'Acts as a link to ensure services and programs reach every village and city in Sudan.'
    },
    { 
      id: 'wm', roleAr: 'أمين شؤون المرأة', roleEn: 'Women Affairs Secretary', icon: Users2,
      secretaryAr: 'أ. فاطمة أحمد', secretaryEn: 'Ms. Fatima Ahmed', members: 11,
      purposeAr: 'تمكين المرأة في المجال الدعوي ورعاية مراكز تحفيظ النساء.',
      purposeEn: 'Empowering women in the Da\'wah field and caring for women\'s memorization centers.',
      infoAr: 'تهتم بتأهيل الداعيات ومعلمات القرآن وتطوير مهاراتهن القيادية.',
      infoEn: 'Focuses on qualifying female callers and Quran teachers and developing their leadership skills.'
    },
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
      {/* Premium Hero Section */}
      <div className="bg-islamic-primary text-white py-32 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 scale-150 animate-float pointer-events-none">
             <svg width="100%" height="100%">
                 <pattern id="pattern-hex-about" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                     <path d="M60 0 L 120 30 L 120 90 L 60 120 L 0 90 L 0 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                 </pattern>
                 <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex-about)" />
             </svg>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-islamic-gold font-bold text-xs uppercase tracking-[0.4em] mb-8 border border-white/20 shadow-2xl animate-fade-in">
                HID AUTHORITY • SUDAN
            </span>
            <h1 className="text-5xl md:text-8xl font-bold font-serif mb-8 drop-shadow-2xl animate-fade-up">{t('about')}</h1>
            <p className="text-2xl text-islamic-light max-w-3xl mx-auto font-light leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
                {t('heroSubtitle')}
            </p>
         </div>
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
         {/* Identity Section */}
         <div className="glass-card rounded-[4rem] shadow-islamic p-10 md:p-20 mb-24 animate-fade-up border border-white/30 dark:border-white/5 transition-all hover:shadow-2xl">
             <div className="flex flex-col lg:flex-row gap-20 items-center">
                 <div className="lg:w-1/2">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-1 bg-islamic-gold rounded-full"></div>
                        <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-widest text-sm">{language === 'ar' ? 'الهوية والرسالة' : 'Identity & Mission'}</span>
                     </div>
                     <h2 className="text-4xl md:text-5xl font-bold text-islamic-dark dark:text-white mb-10 font-serif leading-tight">
                        {language === 'ar' ? 'العمود الفقري للعمل الدعوي الرسمي' : 'The Backbone of Official Da\'wah'}
                     </h2>
                     <p className="text-gray-600 dark:text-gray-300 text-xl leading-[2.2] text-justify font-light opacity-90">
                         {t('aboutText')}
                     </p>
                     <div className="grid grid-cols-2 gap-8 mt-12">
                        <div className="p-6 bg-islamic-primary/5 rounded-3xl border border-islamic-primary/10">
                            <h4 className="font-bold text-islamic-primary text-3xl mb-2 font-serif">2025</h4>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{language === 'ar' ? 'عام التأسيس الرقمي' : 'Digital Foundation Year'}</p>
                        </div>
                        <div className="p-6 bg-islamic-gold/5 rounded-3xl border border-islamic-gold/10">
                            <h4 className="font-bold text-islamic-gold text-3xl mb-2 font-serif">18+</h4>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{language === 'ar' ? 'ولاية نخدمها' : 'States We Serve'}</p>
                        </div>
                     </div>
                 </div>
                 <div className="lg:w-1/2 relative group">
                     <div className="absolute inset-0 bg-islamic-primary/20 rounded-[3rem] transform -rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                     <div className="absolute inset-0 bg-islamic-gold/20 rounded-[3rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                     <img src="https://images.unsplash.com/photo-1596464528464-9be972eb049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Islamic Heritage" className="relative rounded-[3rem] shadow-2xl w-full object-cover border-8 border-white dark:border-gray-800 h-[600px] grayscale-[0.2] hover:grayscale-0 transition duration-1000" />
                     <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 animate-float max-w-[200px]">
                        <Quote className="w-8 h-8 text-islamic-gold mb-2 opacity-50" />
                        <p className="text-xs font-bold text-islamic-dark italic">{language === 'ar' ? 'نحو مجتمع سوداني متسامح ومستنير' : 'Towards a tolerant and enlightened Sudanese society'}</p>
                     </div>
                 </div>
             </div>
         </div>

         {/* Vision & Mission Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
             <div className="bg-white dark:bg-gray-800 rounded-[3.5rem] shadow-xl p-12 border-b-[12px] border-islamic-primary hover:-translate-y-2 transition-all duration-500 group">
                 <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-8 text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                     <Eye className="w-10 h-10" />
                 </div>
                 <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif">{t('vision')}</h3>
                 <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed font-light">
                     {language === 'ar' 
                      ? 'هيئة رائدة تمكن الأئمة والحفظة والدعاة لبناء مجتمع سوداني متسامح، مستنير، ومتمسك بقيمه الدينية الأصيلة.'
                      : 'A pioneering authority empowering Imams, Huffaz, and Da\'is to build a tolerant, enlightened Sudanese society.'}
                 </p>
             </div>
             <div className="bg-white dark:bg-gray-800 rounded-[3.5rem] shadow-xl p-12 border-b-[12px] border-islamic-gold hover:-translate-y-2 transition-all duration-500 group">
                 <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-8 text-orange-600 shadow-inner group-hover:scale-110 transition-transform">
                     <Target className="w-10 h-10" />
                 </div>
                 <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif">{t('mission')}</h3>
                 <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed font-light">
                     {language === 'ar'
                      ? 'الإشراف على تأهيل وتطوير وتنظيم شؤون الأئمة والحفظة والدعاة في السودان، ونشر الفهم الوسطي المستنير للإسلام.'
                      : 'Supervising the qualification, development, and organization of affairs for Imams, Huffaz, and Da\'is.'}
                 </p>
             </div>
         </div>

         {/* Values - High Impact Layout */}
         <div className="mb-32">
             <div className="text-center mb-20">
                <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-[0.4em] text-xs mb-4 block">{language === 'ar' ? 'مبادئنا الثابتة' : 'Our Principles'}</span>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white font-serif">{t('values')}</h2>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                 {values.map((val, idx) => (
                     <div key={idx} className="group bg-white dark:bg-gray-800 p-12 rounded-[3rem] shadow-lg hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-primary/5 rounded-bl-[100%] transition-all group-hover:w-40 group-hover:h-40"></div>
                         <div className="w-20 h-20 mx-auto bg-gray-50 dark:bg-gray-700 rounded-3xl flex items-center justify-center mb-8 text-islamic-primary dark:text-islamic-gold group-hover:rotate-12 transition-transform shadow-sm relative z-10">
                             <val.icon className="w-10 h-10" />
                         </div>
                         <h4 className="font-bold text-2xl mb-6 text-gray-900 dark:text-white font-serif relative z-10">{language === 'ar' ? val.titleAr : val.titleEn}</h4>
                         <p className="text-md text-gray-500 dark:text-gray-400 leading-loose font-light relative z-10">{language === 'ar' ? val.descAr : val.descEn}</p>
                     </div>
                 ))}
             </div>
         </div>

         {/* Executive Office - Interactive Section */}
         <div className="bg-islamic-dark rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden mb-32 shadow-5xl">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 scale-150"></div>
             <div className="relative z-10 text-center mb-20">
                <span className="text-islamic-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{language === 'ar' ? 'القيادة الإدارية' : 'Administrative Leadership'}</span>
                <h2 className="text-4xl md:text-6xl font-bold font-serif mb-4">{language === 'ar' ? 'المكتب التنفيذي' : 'Executive Office'}</h2>
                <p className="text-islamic-light/60 max-w-xl mx-auto text-sm">{language === 'ar' ? 'انقر على أي أمانة لاستكشاف مهامها وأعضائها' : 'Click on any secretariat to explore its tasks and members'}</p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
                 {executiveOffice.map((member) => (
                     <button 
                        key={member.id} 
                        onClick={() => setSelectedSecretariat(member)}
                        className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 text-center hover:bg-white/20 transition-all group active:scale-95 shadow-xl flex flex-col items-center justify-center min-h-[220px]"
                    >
                         <div className="w-16 h-16 bg-islamic-gold/20 rounded-2xl flex items-center justify-center mb-6 text-islamic-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-islamic-gold/30">
                             <member.icon className="w-8 h-8" />
                         </div>
                         <p className="text-lg font-bold tracking-tight mb-2 leading-tight">{language === 'ar' ? member.roleAr : member.roleEn}</p>
                         <div className="text-[10px] text-islamic-gold font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                         </div>
                     </button>
                 ))}
             </div>
         </div>

         {/* Strategic Axes - Refined List */}
         <div className="bg-white dark:bg-gray-800 rounded-[4rem] p-12 md:p-24 shadow-islamic border border-gray-100 dark:border-gray-700 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Layers className="w-64 h-64 text-islamic-primary" /></div>
             <div className="text-center mb-20 relative z-10">
                <span className="text-islamic-primary dark:text-islamic-gold font-bold uppercase tracking-[0.4em] text-xs mb-4 block">{language === 'ar' ? 'خارطة الطريق' : 'Roadmap'}</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">{language === 'ar' ? 'المحاور الاستراتيجية (2026-2030)' : 'Strategic Axes (2026-2030)'}</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-10">
                 {axes.map((axis, idx) => (
                     <div key={idx} className="flex items-start gap-8 bg-gray-50 dark:bg-gray-900/40 p-12 rounded-[3.5rem] border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group">
                         <div className="mt-1 min-w-[48px] h-12 w-12 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-green-500 shadow-sm group-hover:bg-islamic-primary group-hover:text-white transition-all">
                             <CheckCircle className="w-6 h-6" />
                         </div>
                         <div>
                             <h4 className="font-bold text-2xl text-gray-900 dark:text-white mb-4 font-serif leading-tight">{language === 'ar' ? axis.titleAr : axis.titleEn}</h4>
                             <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-light">{language === 'ar' ? axis.descAr : axis.descEn}</p>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>

      {/* Secretariat Modal - Professional Overlay - Fixed Responsiveness */}
      {selectedSecretariat && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-islamic-dark/80 backdrop-blur-xl animate-in fade-in duration-300">
              {/* Modal Container */}
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] md:rounded-[4rem] shadow-5xl w-full max-w-4xl overflow-hidden flex flex-col relative border border-white/20 dark:border-gray-800 h-full max-h-[90vh] sm:h-auto">
                  
                  {/* Close Button - More accessible and visible */}
                  <button 
                    onClick={() => setSelectedSecretariat(null)} 
                    className="absolute top-4 end-4 sm:top-8 sm:end-8 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-400 rounded-full flex items-center justify-center transition-all z-50 shadow-lg border border-gray-200 dark:border-gray-700"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Modal Header */}
                  <div className="bg-islamic-primary p-8 sm:p-12 md:p-16 text-white relative flex-shrink-0">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none"></div>
                      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20 shadow-2xl">
                             <selectedSecretariat.icon className="w-10 h-10 sm:w-12 sm:h-12 text-islamic-gold" />
                          </div>
                          <div className="text-center sm:text-start">
                             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-2">{language === 'ar' ? selectedSecretariat.roleAr : selectedSecretariat.roleEn}</h2>
                             <div className="flex items-center justify-center sm:justify-start gap-2 text-islamic-gold font-bold text-xs sm:text-sm uppercase tracking-widest">
                                <UserCircle className="w-4 h-4" />
                                {language === 'ar' ? selectedSecretariat.secretaryAr : selectedSecretariat.secretaryEn}
                             </div>
                          </div>
                      </div>
                  </div>

                  {/* Modal Content - Scrollable area */}
                  <div className="p-6 sm:p-10 md:p-16 flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-900">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-10 md:mb-12">
                          <div className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center items-center sm:items-start">
                             <div className="flex items-center gap-3 text-islamic-primary mb-3">
                                <Users className="w-5 h-5 text-islamic-gold" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{language === 'ar' ? 'عدد الأعضاء' : 'Members'}</span>
                             </div>
                             <span className="text-3xl font-bold text-gray-900 dark:text-white font-serif">{selectedSecretariat.members}</span>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 sm:col-span-2 shadow-sm flex flex-col justify-center items-center sm:items-start">
                             <div className="flex items-center gap-3 text-islamic-primary mb-3">
                                <Shield className="w-5 h-5 text-islamic-gold" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{language === 'ar' ? 'الحالة الإدارية' : 'Status'}</span>
                             </div>
                             <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-serif">{language === 'ar' ? 'أمانة تنفيذية معتمدة' : 'Verified Executive Secretariat'}</span>
                          </div>
                      </div>

                      {/* Detailed Purpose & Info */}
                      <div className="space-y-8 md:space-y-12">
                          <section>
                              <h4 className="flex items-center gap-3 font-bold text-islamic-dark dark:text-islamic-gold text-base sm:text-lg mb-4 border-b dark:border-gray-800 pb-2">
                                <Target className="w-5 h-5" />
                                {language === 'ar' ? 'الغرض من الأمانة' : 'Purpose of Secretariat'}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-light text-justify">
                                 {language === 'ar' ? selectedSecretariat.purposeAr : selectedSecretariat.purposeEn}
                              </p>
                          </section>

                          <section>
                              <h4 className="flex items-center gap-3 font-bold text-islamic-dark dark:text-islamic-gold text-base sm:text-lg mb-4 border-b dark:border-gray-800 pb-2">
                                <Info className="w-5 h-5" />
                                {language === 'ar' ? 'معلومات إضافية' : 'General Information'}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-light text-justify">
                                 {language === 'ar' ? selectedSecretariat.infoAr : selectedSecretariat.infoEn}
                              </p>
                          </section>
                      </div>

                      {/* Footer CTA */}
                      <div className="mt-12 md:mt-16 flex justify-center pb-4 sm:pb-0">
                         <button 
                            onClick={() => setSelectedSecretariat(null)} 
                            className="bg-islamic-primary text-white w-full sm:w-auto px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs shadow-xl shadow-islamic-primary/20 hover:bg-islamic-dark transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            {language === 'ar' ? 'إغلاق النافذة' : 'Close Details'}
                         </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default About;