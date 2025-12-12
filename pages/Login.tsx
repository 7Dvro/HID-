import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const { login, register, loginWithGoogle } = useAuth();
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(name, email, password);
      }

      if (success) {
        showToast(isLogin ? (language === 'ar' ? 'تم تسجيل الدخول' : 'Logged in successfully') : (language === 'ar' ? 'تم إنشاء الحساب' : 'Account created'), 'success');
        navigate('/');
      }
    } catch (error) {
      showToast(language === 'ar' ? 'حدث خطأ' : 'An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
    showToast(language === 'ar' ? 'تم تسجيل الدخول عبر Google' : 'Logged in with Google', 'success');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-islamic-primary p-8 text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
               <svg width="100%" height="100%">
                <pattern id="pattern-hex" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M10 0 L 20 5 L 20 15 L 10 20 L 0 15 L 0 5 Z" fill="none" stroke="currentColor"/>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)" />
               </svg>
           </div>
           <div className="relative z-10">
               <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-islamic-gold font-bold text-3xl mx-auto mb-4 border-2 border-islamic-gold/50 shadow-inner">
                 H
               </div>
               <h2 className="text-2xl font-bold font-serif">{t('heroTitle')}</h2>
               <p className="text-islamic-light text-sm mt-2 opacity-90">
                 {isLogin 
                    ? (language === 'ar' ? 'أهلاً بك في بوابتك للمعرفة الإسلامية' : 'Welcome to your gateway for Islamic knowledge')
                    : (language === 'ar' ? 'انضم إلى مجتمعنا المتنامي' : 'Join our growing community')
                 }
               </p>
           </div>
        </div>

        {/* Body */}
        <div className="p-8">
            <div className="flex gap-4 mb-8 p-1 bg-gray-100 rounded-lg">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${isLogin ? 'bg-white text-islamic-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    {t('login')}
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isLogin ? 'bg-white text-islamic-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    {t('register')}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div className="relative group">
                        <User className="absolute top-3 start-3 text-gray-400 w-5 h-5 group-focus-within:text-islamic-primary transition" />
                        <input 
                            type="text" 
                            required={!isLogin}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full ps-10 pe-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none transition"
                            placeholder={t('fullName')}
                        />
                    </div>
                )}

                <div className="relative group">
                    <Mail className="absolute top-3 start-3 text-gray-400 w-5 h-5 group-focus-within:text-islamic-primary transition" />
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full ps-10 pe-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none transition"
                        placeholder={t('email')}
                    />
                </div>

                <div className="relative group">
                    <Lock className="absolute top-3 start-3 text-gray-400 w-5 h-5 group-focus-within:text-islamic-primary transition" />
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full ps-10 pe-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none transition"
                        placeholder={t('password')}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-islamic-primary text-white py-3 rounded-lg font-bold hover:bg-islamic-dark transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isLogin ? t('login') : t('register')}
                    {!loading && (language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />)}
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white text-gray-400">{t('or')}</span></div>
            </div>

            <button 
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
                className="w-full bg-white text-gray-700 border border-gray-200 py-3 rounded-lg font-bold hover:bg-gray-50 transition flex items-center justify-center gap-3"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {t('continueWithGoogle')}
            </button>
            
            <p className="mt-6 text-center text-xs text-gray-500">
                {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-islamic-primary font-bold hover:underline"
                >
                    {isLogin ? t('register') : t('login')}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;