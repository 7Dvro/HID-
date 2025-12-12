import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, FileText, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const data = [
    { name: 'Jan', users: 400, content: 240 },
    { name: 'Feb', users: 300, content: 139 },
    { name: 'Mar', users: 200, content: 980 },
    { name: 'Apr', users: 278, content: 390 },
    { name: 'May', users: 189, content: 480 },
    { name: 'Jun', users: 239, content: 380 },
  ];

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
       <div>
         <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
         <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
       </div>
       <div className={`p-3 rounded-full ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
         <Icon className={`w-6 h-6 text-${color.replace('bg-', '').replace('text-', '')}`} />
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">{t('adminWelcome')}</h1>
             <p className="text-gray-500 text-sm mt-1">{language === 'ar' ? 'نظرة عامة على أداء المنصة' : 'Platform performance overview'}</p>
          </div>
          <div className="text-sm bg-white px-4 py-2 rounded-lg shadow-sm">
             Date: {new Date().toLocaleDateString()}
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <StatCard title={t('users')} value="15,420" icon={Users} color="bg-blue-500" />
           <StatCard title={t('content')} value="1,240" icon={FileText} color="bg-islamic-primary" />
           <StatCard title={t('reports')} value="12" icon={Activity} color="bg-red-500" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-6">{language === 'ar' ? 'نمو المستخدمين' : 'User Growth'}</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Line type="monotone" dataKey="users" stroke="#006B3F" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-6">{language === 'ar' ? 'نشاط المحتوى' : 'Content Activity'}</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Bar dataKey="content" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Recent Activity Table Mockup */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="px-6 py-4 border-b border-gray-100">
             <h3 className="font-bold text-gray-800">{language === 'ar' ? 'أحدث المعاملات' : 'Recent Transactions'}</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-start">
               <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-medium">
                 <tr>
                   <th className="px-6 py-3 text-start">User</th>
                   <th className="px-6 py-3 text-start">Action</th>
                   <th className="px-6 py-3 text-start">Status</th>
                   <th className="px-6 py-3 text-start">Date</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 text-sm">
                 {[1, 2, 3, 4].map((i) => (
                   <tr key={i} className="hover:bg-gray-50">
                     <td className="px-6 py-4 font-medium text-gray-900">User #{100+i}</td>
                     <td className="px-6 py-4 text-gray-500">Submitted Fatwa Request</td>
                     <td className="px-6 py-4">
                       <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">Pending</span>
                     </td>
                     <td className="px-6 py-4 text-gray-400">2024-05-2{i}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;