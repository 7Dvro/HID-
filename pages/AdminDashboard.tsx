import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, Activity, BookOpen, MessageSquare, LayoutDashboard, Settings, LogOut, Search, Trash2, Edit, Plus, CheckCircle, XCircle, MoreVertical, Shield } from 'lucide-react';

// --- Mock Data ---
const INITIAL_USERS = [
  { id: 1, name: 'Ahmed Mohamed', email: 'ahmed@hid.sa', role: 'admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Sheikh Ibrahim', email: 'ibrahim@mosque.com', role: 'imam', status: 'active', joinDate: '2023-03-10' },
  { id: 3, name: 'Sarah Ali', email: 'sarah@gmail.com', role: 'user', status: 'active', joinDate: '2023-05-22' },
  { id: 4, name: 'User 4', email: 'user4@test.com', role: 'user', status: 'banned', joinDate: '2023-06-01' },
  { id: 5, name: 'Dr. Saad', email: 'saad@edu.sa', role: 'imam', status: 'active', joinDate: '2023-02-18' },
];

const INITIAL_COURSES = [
  { id: 1, title: 'Fiqh of Worship', instructor: 'Dr. Saad', students: 1540, status: 'published' },
  { id: 2, title: 'Quran Sciences', instructor: 'Sheikh Ahmed', students: 2100, status: 'published' },
  { id: 3, title: 'Public Speaking', instructor: 'Mr. Mohammed', students: 850, status: 'draft' },
];

const INITIAL_POSTS = [
  { id: 1, author: 'Sheikh Ibrahim', content: 'Discussion about the importance of Fajr prayer...', date: '2h ago', reports: 0 },
  { id: 2, author: 'User 4', content: 'Inappropriate content spam...', date: '5h ago', reports: 5 },
  { id: 3, author: 'Dr. Saad', content: 'Join us for the lecture tonight.', date: '1d ago', reports: 0 },
];

const INITIAL_FATWAS = [
  { id: 1, question: 'Ruling on crypto?', category: 'Transactions', status: 'approved' },
  { id: 2, question: 'Prayer on plane?', category: 'Worship', status: 'approved' },
  { id: 3, question: 'Inheritance issue...', category: 'Family', status: 'pending' },
];

const CHART_DATA = [
  { name: 'Jan', users: 400, content: 240 },
  { name: 'Feb', users: 300, content: 139 },
  { name: 'Mar', users: 200, content: 980 },
  { name: 'Apr', users: 278, content: 390 },
  { name: 'May', users: 189, content: 480 },
  { name: 'Jun', users: 239, content: 380 },
];

const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { showToast } = useToast();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'posts' | 'content'>('overview');
  
  // Data State (Simulating DB)
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [coursesList, setCoursesList] = useState(INITIAL_COURSES);
  const [postsList, setPostsList] = useState(INITIAL_POSTS);
  const [fatwasList, setFatwasList] = useState(INITIAL_FATWAS);
  
  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'course' | 'user' | null>(null);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // --- Handlers ---

  const handleDeleteUser = (id: number) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Are you sure you want to delete this user?')) {
      setUsersList(prev => prev.filter(u => u.id !== id));
      showToast(language === 'ar' ? 'تم حذف المستخدم' : 'User deleted', 'success');
    }
  };

  const handleToggleUserStatus = (id: number) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u));
    showToast(language === 'ar' ? 'تم تحديث حالة المستخدم' : 'User status updated', 'info');
  };

  const handleDeletePost = (id: number) => {
    setPostsList(prev => prev.filter(p => p.id !== id));
    showToast(language === 'ar' ? 'تم حذف المنشور' : 'Post deleted', 'success');
  };

  const handleDeleteCourse = (id: number) => {
     setCoursesList(prev => prev.filter(c => c.id !== id));
     showToast(language === 'ar' ? 'تم حذف الدورة' : 'Course deleted', 'success');
  };

  const handleApproveFatwa = (id: number) => {
      setFatwasList(prev => prev.map(f => f.id === id ? { ...f, status: 'approved' } : f));
      showToast(language === 'ar' ? 'تم اعتماد الفتوى' : 'Fatwa approved', 'success');
  };

  // --- Render Components ---

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
       <div>
         <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
         <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
         {change && <span className="text-xs text-green-500 flex items-center mt-1"><Activity className="w-3 h-3 mr-1" /> {change}</span>}
       </div>
       <div className={`p-3 rounded-full ${color} bg-opacity-10 text-white`}>
         <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
       </div>
    </div>
  );

  const renderOverview = () => (
      <div className="space-y-6 animate-in fade-in">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <StatCard title={t('users')} value={usersList.length} icon={Users} color="bg-blue-600" change="+12% this month" />
             <StatCard title={language === 'ar' ? 'الدورات' : 'Courses'} value={coursesList.length} icon={BookOpen} color="bg-islamic-primary" change="+3 new" />
             <StatCard title={language === 'ar' ? 'المنشورات' : 'Posts'} value={postsList.length} icon={MessageSquare} color="bg-purple-600" />
             <StatCard title={language === 'ar' ? 'الفتاوى' : 'Fatwas'} value={fatwasList.length} icon={FileText} color="bg-orange-600" change="5 pending" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white mb-6">{language === 'ar' ? 'نمو المنصة' : 'Platform Growth'}</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={CHART_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                      <Line type="monotone" dataKey="users" stroke="#006B3F" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      <Line type="monotone" dataKey="content" stroke="#D4AF37" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white mb-6">{language === 'ar' ? 'توزيع المستخدمين' : 'User Distribution'}</h3>
                <div className="h-72 w-full flex justify-center">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Users', value: usersList.filter(u => u.role === 'user').length },
                            { name: 'Imams', value: usersList.filter(u => u.role === 'imam').length },
                            { name: 'Admins', value: usersList.filter(u => u.role === 'admin').length },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#0088FE" />
                          <Cell fill="#00C49F" />
                          <Cell fill="#FFBB28" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
      </div>
  );

  const renderUsersTable = () => (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in">
           <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <input 
                        type="text" 
                        placeholder={language === 'ar' ? 'بحث عن مستخدم...' : 'Search users...'}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-1 focus:ring-islamic-primary outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute start-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <button className="bg-islamic-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-islamic-dark transition">
                    <Plus className="w-4 h-4" />
                    {language === 'ar' ? 'إضافة مستخدم' : 'Add User'}
                </button>
           </div>
           
           <div className="overflow-x-auto">
               <table className="w-full text-start">
                   <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase">
                       <tr>
                           <th className="px-6 py-3 text-start">ID</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الاسم' : 'Name'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الدور' : 'Role'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                       {usersList.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
                           <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                               <td className="px-6 py-4 text-sm text-gray-500">#{u.id}</td>
                               <td className="px-6 py-4">
                                   <div className="flex flex-col">
                                       <span className="font-bold text-gray-900 dark:text-white">{u.name}</span>
                                       <span className="text-xs text-gray-500 dark:text-gray-400">{u.email}</span>
                                   </div>
                               </td>
                               <td className="px-6 py-4">
                                   <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                       u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                                       u.role === 'imam' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                   }`}>
                                       {u.role.toUpperCase()}
                                   </span>
                               </td>
                               <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1 text-xs font-bold ${u.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                        {u.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                        {u.status}
                                    </span>
                               </td>
                               <td className="px-6 py-4">
                                   <div className="flex items-center gap-3">
                                       <button onClick={() => handleToggleUserStatus(u.id)} className="text-gray-400 hover:text-orange-500 transition">
                                           <Shield className="w-4 h-4" />
                                       </button>
                                       <button className="text-gray-400 hover:text-blue-500 transition">
                                           <Edit className="w-4 h-4" />
                                       </button>
                                       <button onClick={() => handleDeleteUser(u.id)} className="text-gray-400 hover:text-red-500 transition">
                                           <Trash2 className="w-4 h-4" />
                                       </button>
                                   </div>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
      </div>
  );

  const renderCoursesTable = () => (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in">
           <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 dark:text-white">{language === 'ar' ? 'إدارة الدورات' : 'Manage Courses'}</h3>
                <button 
                  onClick={() => { setModalType('course'); setIsModalOpen(true); }}
                  className="bg-islamic-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-islamic-dark transition"
                >
                    <Plus className="w-4 h-4" />
                    {language === 'ar' ? 'دورة جديدة' : 'New Course'}
                </button>
           </div>
           <div className="overflow-x-auto">
               <table className="w-full text-start">
                   <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase">
                       <tr>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'عنوان الدورة' : 'Title'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'المحاضر' : 'Instructor'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الطلاب' : 'Students'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                       {coursesList.map((c) => (
                           <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                               <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{c.title}</td>
                               <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.instructor}</td>
                               <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.students}</td>
                               <td className="px-6 py-4">
                                   <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                       c.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                   }`}>
                                       {c.status}
                                   </span>
                               </td>
                               <td className="px-6 py-4">
                                   <div className="flex items-center gap-3">
                                       <button className="text-gray-400 hover:text-blue-500 transition"><Edit className="w-4 h-4" /></button>
                                       <button onClick={() => handleDeleteCourse(c.id)} className="text-gray-400 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                                   </div>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
      </div>
  );

  const renderPosts = () => (
      <div className="grid grid-cols-1 gap-4 animate-in fade-in">
           {postsList.map(post => (
               <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-start">
                   <div>
                       <div className="flex items-center gap-2 mb-2">
                           <span className="font-bold text-gray-900 dark:text-white">{post.author}</span>
                           <span className="text-xs text-gray-400">{post.date}</span>
                           {post.reports > 0 && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">{post.reports} Reports</span>}
                       </div>
                       <p className="text-gray-600 dark:text-gray-300">{post.content}</p>
                   </div>
                   <div className="flex gap-2">
                       <button className="p-2 text-gray-400 hover:text-blue-500 transition bg-gray-50 dark:bg-gray-700 rounded-lg">
                           <Shield className="w-4 h-4" />
                       </button>
                       <button onClick={() => handleDeletePost(post.id)} className="p-2 text-gray-400 hover:text-red-500 transition bg-gray-50 dark:bg-gray-700 rounded-lg">
                           <Trash2 className="w-4 h-4" />
                       </button>
                   </div>
               </div>
           ))}
           {postsList.length === 0 && <p className="text-center text-gray-400">No posts found.</p>}
      </div>
  );

  const renderContent = () => (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
               <h3 className="font-bold text-gray-800 dark:text-white">{language === 'ar' ? 'مراجعة الفتاوى' : 'Fatwa Review'}</h3>
          </div>
          <div className="overflow-x-auto">
               <table className="w-full text-start">
                   <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase">
                       <tr>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'السؤال' : 'Question'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'التصنيف' : 'Category'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                           <th className="px-6 py-3 text-start">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                       {fatwasList.map((f) => (
                           <tr key={f.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                               <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{f.question}</td>
                               <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{f.category}</td>
                               <td className="px-6 py-4">
                                   <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                       f.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                   }`}>
                                       {f.status}
                                   </span>
                               </td>
                               <td className="px-6 py-4">
                                   <div className="flex items-center gap-2">
                                       {f.status !== 'approved' && (
                                           <button onClick={() => handleApproveFatwa(f.id)} className="text-green-600 hover:text-green-700 transition font-bold text-xs border border-green-200 bg-green-50 px-2 py-1 rounded">
                                               {language === 'ar' ? 'اعتماد' : 'Approve'}
                                           </button>
                                       )}
                                       <button className="text-gray-400 hover:text-blue-500 transition"><Edit className="w-4 h-4" /></button>
                                   </div>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex">
      
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col sticky top-0 h-screen transition-all">
          <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 bg-islamic-primary rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                 A
              </div>
              <span className="font-bold text-xl text-gray-800 dark:text-white hidden md:block">Admin</span>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
              {[
                  { id: 'overview', icon: LayoutDashboard, label: language === 'ar' ? 'نظرة عامة' : 'Overview' },
                  { id: 'users', icon: Users, label: language === 'ar' ? 'المستخدمين' : 'Users' },
                  { id: 'courses', icon: BookOpen, label: language === 'ar' ? 'الدورات' : 'Courses' },
                  { id: 'posts', icon: MessageSquare, label: language === 'ar' ? 'المنشورات' : 'Posts' },
                  { id: 'content', icon: FileText, label: language === 'ar' ? 'المحتوى' : 'Content' },
              ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activeTab === item.id 
                        ? 'bg-islamic-primary text-white shadow-md' 
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                      <item.icon className="w-5 h-5" />
                      <span className="hidden md:block font-medium">{item.label}</span>
                  </button>
              ))}
          </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
          <header className="mb-8 flex justify-between items-center">
             <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {activeTab === 'overview' ? t('adminWelcome') : 
                     activeTab === 'users' ? (language === 'ar' ? 'إدارة المستخدمين' : 'User Management') :
                     activeTab === 'courses' ? (language === 'ar' ? 'إدارة الدورات' : 'Course Management') :
                     activeTab === 'posts' ? (language === 'ar' ? 'إدارة المنشورات' : 'Post Moderation') :
                     (language === 'ar' ? 'إدارة المحتوى' : 'Content Management')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {language === 'ar' ? 'لوحة التحكم الكاملة' : 'Full Control Dashboard'}
                </p>
             </div>
             <div className="flex items-center gap-3">
                 <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm">
                     {new Date().toLocaleDateString()}
                 </div>
             </div>
          </header>

          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsersTable()}
          {activeTab === 'courses' && renderCoursesTable()}
          {activeTab === 'posts' && renderPosts()}
          {activeTab === 'content' && renderContent()}

      </main>

      {/* Simple Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">
                      {modalType === 'course' ? (language === 'ar' ? 'إضافة دورة جديدة' : 'Add New Course') : ''}
                      {modalType === 'user' ? (language === 'ar' ? 'إضافة مستخدم' : 'Add User') : ''}
                  </h3>
                  <div className="space-y-4">
                      <input type="text" placeholder="Title / Name" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      <input type="text" placeholder="Description / Email" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div className="flex gap-3 mt-6">
                      <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded-lg dark:text-gray-300 dark:border-gray-600">Cancel</button>
                      <button onClick={() => { setIsModalOpen(false); showToast('Saved successfully', 'success'); }} className="flex-1 py-2 bg-islamic-primary text-white rounded-lg">Save</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;