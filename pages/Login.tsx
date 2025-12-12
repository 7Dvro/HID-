import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = (role: 'user' | 'admin') => {
    login(role);
    navigate(role === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-islamic-primary rounded-full flex items-center justify-center text-islamic-gold font-bold text-2xl mx-auto mb-4">
             H
           </div>
           <h2 className="text-2xl font-bold text-gray-900">{t('login')}</h2>
           <p className="text-gray-500 text-sm mt-2">
             {language === 'ar' ? 'مرحباً بك مجدداً في الهيئة' : 'Welcome back to HID Authority'}
           </p>
        </div>

        <div className="space-y-4">
           {/* Mock Inputs */}
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
             </label>
             <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-islamic-primary outline-none" placeholder="user@example.com" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               {language === 'ar' ? 'كلمة المرور' : 'Password'}
             </label>
             <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-islamic-primary outline-none" placeholder="••••••••" />
           </div>

           <button 
             onClick={() => handleLogin('user')}
             className="w-full bg-islamic-primary text-white py-3 rounded-lg font-bold hover:bg-islamic-dark transition mt-4"
           >
             {t('login')}
           </button>
           
           <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Demo Access</span></div>
           </div>

           <button 
             onClick={() => handleLogin('admin')}
             className="w-full bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition text-sm"
           >
             {language === 'ar' ? 'دخول كمسؤول (تجريبي)' : 'Login as Admin (Demo)'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default Login;