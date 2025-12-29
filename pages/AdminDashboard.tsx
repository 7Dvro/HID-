
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Navigate, Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
    Users, Activity, BookOpen, MessageSquare, LayoutDashboard, Settings, 
    LogOut, Search, CheckCircle, XCircle, ChevronRight, PenTool, Database, 
    Monitor, Home, Info, Newspaper, Book, Layers, Bell, Eye, RefreshCw, Briefcase, EyeOff
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { t, language, updateTranslation, pageVisibility, togglePageVisibility, getAllTranslations } = useLanguage();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'content' | 'members' | 'settings'>('overview');
  const [subTab, setSubTab] = useState('home');

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const CHART_DATA = [
    { name: 'Sat', users: 400, fatwas: 120 },
    { name: 'Sun', users: 600, fatwas: 150 },
    { name: 'Mon', users: 800, fatwas: 180 },
    { name: 'Tue', users: 750, fatwas: 200 },
    { name: 'Wed', users: 950, fatwas: 250 },
    { name: 'Thu', users: 1100, fatwas: 300 },
    { name: 'Fri', users: 1500, fatwas: 450 },
  ];

  const PAGE_TRANSLATION_MAP: Record<string, string[]> = {
    home: ['heroTitle', 'heroSubtitle', 'exploreCourses', 'askAi'],
    about: ['vision', 'mission', 'values', 'aboutText'],
    quran: ['khalwaManagement', 'mutoon', 'verseOfTheDay'],
    news: ['latestNews', 'viewAllNews', 'readMore'],
  };

  const handleSaveTranslation = (key: string, arValue: string, enValue: string) => {
    updateTranslation(key, arValue, enValue);
    showToast(language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Changes saved successfully', 'success');
  };

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
            activeTab === id 
            ? 'bg-islamic-primary text-white shadow-xl shadow-islamic-primary/20 scale-[1.02]' 
            : 'text-gray-400 hover:bg-islamic-primary/5 hover:text-islamic-primary dark:hover:text-islamic-gold'
        }`}
    >
        <Icon className="w-5 h-5" />
        <span className="font-bold text-sm tracking-wide">{label}</span>
    </button>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: 'إجمالي الزيارات', value: '128.5K', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'الأعضاء النشطون', value: '12,450', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                { label: 'الفتاوى المجابة', value: '8,200', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                { label: 'طلبات الانضمام', value: '45', icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">{stat.value}</h4>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Activity className="w-6 h-6 text-islamic-primary" />
                        {language === 'ar' ? 'تحليلات المنصة الأسبوعية' : 'Weekly Platform Analytics'}
                    </h3>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CHART_DATA}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#006B3F" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#006B3F" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                            <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                            <Area type="monotone" dataKey="users" stroke="#006B3F" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">{language === 'ar' ? 'المهام المعلقة' : 'Pending Tasks'}</h3>
                <div className="space-y-6">
                    {[
                        { title: 'مراجعة طلب فتوى جديد', time: 'منذ 5 دقائق', icon: MessageSquare, color: 'text-blue-500' },
                        { title: 'اعتماد 3 دورات تدريبية', time: 'منذ ساعة', icon: BookOpen, color: 'text-emerald-500' },
                        { title: 'تحديث بيانات إمام جامع', time: 'منذ ساعتين', icon: CheckCircle, color: 'text-amber-500' },
                    ].map((task, i) => (
                        <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                            <div className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${task.color}`}>
                                <task.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-islamic-primary transition-colors">{task.title}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{task.time}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );

  const renderPageManager = () => {
    const allTrans = getAllTranslations();
    const keysToEdit = PAGE_TRANSLATION_MAP[subTab] || [];

    return (
      <div className="animate-in fade-in duration-500 space-y-8">
          <div className="flex gap-4 p-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 w-max overflow-hidden">
              {[
                  { id: 'home', icon: Home, label: 'الرئيسية' },
                  { id: 'about', icon: Info, label: 'عن الهيئة' },
                  { id: 'quran', icon: Book, label: 'القرآن' },
                  { id: 'news', icon: Newspaper, label: 'الأخبار' },
              ].map(tab => (
                  <button 
                      key={tab.id}
                      onClick={() => setSubTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${subTab === tab.id ? 'bg-islamic-primary text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
                  >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                  </button>
              ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-10 pb-6 border-b dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
                      {language === 'ar' ? `تعديل محتوى صفحة ${subTab}` : `Edit content for ${subTab} page`}
                  </h3>
              </div>

              <div className="space-y-12 max-w-5xl">
                  {keysToEdit.map(key => (
                    <div key={key} className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black uppercase tracking-widest text-islamic-primary dark:text-islamic-gold">KEY: {key}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Arabic Content (AR)</label>
                                <textarea 
                                  className="w-full p-4 bg-white dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 outline-none focus:ring-2 focus:ring-islamic-primary/20 text-sm" 
                                  rows={key.toLowerCase().includes('text') || key.toLowerCase().includes('subtitle') ? 4 : 1}
                                  id={`${key}-ar`}
                                  defaultValue={allTrans[key]?.ar}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">English Content (EN)</label>
                                <textarea 
                                  className="w-full p-4 bg-white dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 outline-none focus:ring-2 focus:ring-islamic-primary/20 text-sm" 
                                  rows={key.toLowerCase().includes('text') || key.toLowerCase().includes('subtitle') ? 4 : 1}
                                  id={`${key}-en`}
                                  defaultValue={allTrans[key]?.en}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button 
                                onClick={() => {
                                    const ar = (document.getElementById(`${key}-ar`) as HTMLTextAreaElement).value;
                                    const en = (document.getElementById(`${key}-en`) as HTMLTextAreaElement).value;
                                    handleSaveTranslation(key, ar, en);
                                }}
                                className="px-6 py-2 bg-islamic-primary text-white rounded-xl text-xs font-bold shadow-lg"
                            >
                                {language === 'ar' ? 'حفظ الحقل' : 'Save Field'}
                            </button>
                        </div>
                    </div>
                  ))}

                  {keysToEdit.length === 0 && (
                      <div className="py-20 text-center text-gray-400 italic">
                          {language === 'ar' ? 'لا يوجد محتوى قابل للتعديل لهذه الصفحة حالياً' : 'No editable content found for this page'}
                      </div>
                  )}
              </div>
          </div>
      </div>
    );
  };

  const renderSettings = () => (
      <div className="animate-in fade-in duration-500 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-serif mb-8 flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-islamic-gold" />
                  {language === 'ar' ? 'إعدادات ظهور الصفحات' : 'Page Visibility Settings'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 'news', icon: Newspaper, label: 'الأخبار' },
                    { id: 'quran', icon: Book, label: 'القرآن' },
                    { id: 'imams', icon: Users, label: 'الأئمة' },
                    { id: 'education', icon: BookOpen, label: 'التعليم' },
                    { id: 'jobs', icon: Briefcase, label: 'الوظائف' },
                  ].map(page => (
                    <div key={page.id} className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-islamic-primary shadow-sm">
                                <page.icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{page.label}</span>
                        </div>
                        <button 
                            onClick={() => togglePageVisibility(page.id)}
                            className={`w-14 h-8 rounded-full p-1 transition-colors flex items-center ${pageVisibility[page.id] ? 'bg-islamic-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${pageVisibility[page.id] ? (language === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                  ))}
              </div>

              <div className="mt-12 pt-8 border-t dark:border-gray-700">
                  <h4 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">{language === 'ar' ? 'إعدادات النظام المتقدمة' : 'Advanced System Settings'}</h4>
                  <div className="flex gap-4">
                      <button className="px-8 py-3 bg-red-50 text-red-600 rounded-2xl text-xs font-bold">Clear All Cache</button>
                      <button className="px-8 py-3 bg-gray-100 text-gray-600 rounded-2xl text-xs font-bold">Restore Defaults</button>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 flex">
      
      <aside className="w-80 bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col sticky top-0 h-screen transition-all shadow-2xl z-40">
          <div className="p-8 border-b dark:border-gray-800 mb-8">
              <Link to="/" className="flex items-center gap-4 group">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-xl p-1">
                    <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-islamic-primary dark:text-islamic-gold leading-none tracking-tighter">HID ADMIN</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">CMS Control Hub</p>
                  </div>
              </Link>
          </div>
          
          <nav className="flex-1 px-4 space-y-3">
              <SidebarItem id="overview" icon={LayoutDashboard} label={language === 'ar' ? 'نظرة عامة' : 'Dashboard'} />
              <SidebarItem id="pages" icon={Layers} label={language === 'ar' ? 'إدارة محتوى الصفحات' : 'Page Editor'} />
              <SidebarItem id="settings" icon={Settings} label={language === 'ar' ? 'إعدادات الظهور' : 'Visibility Settings'} />
          </nav>

          <div className="p-8 border-t dark:border-gray-800">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-[2rem] flex items-center gap-4 mb-6">
                  <img src={user.avatar} className="w-12 h-12 rounded-xl object-cover border border-white shadow-md" alt="" />
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{user.name}</p>
                      <span className="text-[10px] text-islamic-gold font-bold uppercase tracking-widest">Administrator</span>
                  </div>
              </div>
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                  <LogOut className="w-4 h-4" />
                  Sign Out
              </button>
          </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto h-screen bg-gray-50/50 dark:bg-gray-950">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-1 bg-islamic-gold rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-islamic-primary">{activeTab}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif">
                    {activeTab === 'overview' ? 'لوحة القيادة والتحليلات' : 
                     activeTab === 'pages' ? 'مدير الصفحات الذكي' : 
                     activeTab === 'settings' ? 'إدارة ظهور الموقع' : 'الإعدادات العامة'}
                </h1>
             </div>
             
             <div className="flex items-center gap-4">
                 <button className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-islamic-primary transition-all relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                 </button>
                 <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-bold text-gray-500">LIVE SYNC ACTIVE</span>
                 </div>
             </div>
          </header>

          <div className="relative">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'pages' && renderPageManager()}
              {activeTab === 'settings' && renderSettings()}
          </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
