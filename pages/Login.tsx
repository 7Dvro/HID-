
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const { login, register, loginWithGoogle } = useAuth();
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
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
        showToast(isLogin ? (language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully') : (language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created'), 'success');
        navigate('/');
      }
    } catch (error) {
      showToast(language === 'ar' ? 'خطأ في المصادقة' : 'Authentication error', 'error');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-20 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full arabesque-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-islamic-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-islamic-gold/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-900 rounded-[3rem] shadow-5xl overflow-hidden relative z-10 border border-gray-100 dark:border-gray-800 transition-all duration-500">
        
        {/* Left Side: Brand Visual with Logo */}
        <div className="hidden lg:flex flex-col justify-center p-16 bg-islamic-primary text-white relative">
            <div className="absolute inset-0 arabesque-pattern opacity-10"></div>
            <div className="relative z-10">
                <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mb-10 border border-white/20 shadow-2xl animate-float p-3">
                    <img src="https://i.ibb.co/v6yT0D8/hid-logo.png" alt="HID Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-5xl font-bold font-serif mb-6 leading-tight">
                    {language === 'ar' ? 'بوابة منسوبي الهيئة' : 'Authority Members Portal'}
                </h2>
                <p className="text-xl text-islamic-light font-light leading-relaxed mb-12 opacity-80">
                    {language === 'ar' 
                      ? 'انضم إلى المنظومة الرقمية الموحدة للأئمة والدعاة في السودان، واستمتع بالخدمات الإلكترونية المتكاملة.'
                      : 'Join the unified digital system for Imams and Callers in Sudan, and enjoy integrated e-services.'}
                </p>
                <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-xl bg-islamic-gold flex items-center justify-center text-white"><Sparkles className="w-5 h-5" /></div>
                        <span className="font-bold text-sm">{language === 'ar' ? 'دخول آمن ومشفر للبيانات' : 'Secure and Encrypted Access'}</span>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-12 left-16 right-16 pt-12 border-t border-white/10 text-xs text-white/40 tracking-widest font-black uppercase">
                HID AUTHORITY • EST. 2025
            </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="p-8 sm:p-16 flex flex-col justify-center">
            <div className="mb-10 text-center lg:text-start">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mb-2">
                    {isLogin ? (language === 'ar' ? 'مرحباً بك مجدداً' : 'Welcome Back') : (language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    {isLogin 
                      ? (language === 'ar' ? 'الرجاء إدخال بياناتك للدخول إلى النظام' : 'Please enter your details to access the system')
                      : (language === 'ar' ? 'ابدأ رحلتك معنا اليوم في خدمة الدعوة' : 'Start your journey with us today in Da\'wah service')}
                </p>
            </div>

            <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${isLogin ? 'bg-white dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold shadow-lg' : 'text-gray-400'}`}
                >
                    {t('login')}
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${!isLogin ? 'bg-white dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold shadow-lg' : 'text-gray-400'}`}
                >
                    {t('register')}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2">{t('fullName')}</label>
                        <div className="relative group">
                            <User className="absolute top-4 start-4 text-gray-400 group-focus-within:text-islamic-primary transition w-5 h-5" />
                            <input 
                                type="text" 
                                required={!isLogin}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full ps-12 pe-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none transition"
                                placeholder="e.g. Ahmad Omar"
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2">{t('email')}</label>
                    <div className="relative group">
                        <Mail className="absolute top-4 start-4 text-gray-400 group-focus-within:text-islamic-primary transition w-5 h-5" />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full ps-12 pe-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none transition"
                            placeholder="mail@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between items-center px-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{t('password')}</label>
                        {isLogin && <button type="button" className="text-[10px] text-islamic-primary font-bold hover:underline">{language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}</button>}
                    </div>
                    <div className="relative group">
                        <Lock className="absolute top-4 start-4 text-gray-400 group-focus-within:text-islamic-primary transition w-5 h-5" />
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full ps-12 pe-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-islamic-primary text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-islamic-primary/20 hover:bg-islamic-dark transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? t('login') : t('register'))}
                    {!loading && (language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />)}
                </button>
            </form>

            <div className="relative my-10">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black"><span className="px-4 bg-white dark:bg-gray-900 text-gray-400">{t('or')}</span></div>
            </div>

            <button 
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
                className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-3 shadow-sm"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/0/google.svg" className="w-5 h-5" alt="Google" />
                <span className="text-sm">{t('continueWithGoogle')}</span>
            </button>
            
            <p className="mt-10 text-center text-xs text-gray-400 font-bold">
                {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-islamic-primary dark:text-islamic-gold hover:underline ms-1"
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
