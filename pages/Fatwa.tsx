import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateIslamicGuidance } from '../services/geminiService';
import { Send, Sparkles, MessageCircle, AlertTriangle } from 'lucide-react';

const Fatwa: React.FC = () => {
  const { t, language } = useLanguage();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'official' | 'ai'>('ai'); // Default to AI for demo

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    try {
      const response = await generateIslamicGuidance(question, language);
      setAnswer(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-islamic-dark mb-4 font-serif">{t('fatwa')}</h1>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setMode('official')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                mode === 'official' 
                  ? 'bg-islamic-dark text-white' 
                  : 'bg-white text-gray-600 border hover:border-islamic-dark'
              }`}
            >
              {language === 'ar' ? 'الفتاوى الرسمية' : 'Official Fatwa'}
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${
                mode === 'ai' 
                  ? 'bg-gradient-to-r from-islamic-gold to-yellow-500 text-white' 
                  : 'bg-white text-gray-600 border hover:border-yellow-500'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t('askAi')}
            </button>
          </div>
        </header>

        {mode === 'ai' ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-100">
             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                   <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                   <p className="text-sm text-yellow-800 leading-relaxed">
                     {t('fatwaDisclaimer')}
                   </p>
                </div>
             </div>

             <div className="min-h-[300px] mb-6 flex flex-col gap-4">
                {/* Chat Display */}
                {answer ? (
                   <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-islamic-gold flex items-center justify-center text-white flex-shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="bg-gray-50 rounded-2xl rounded-ts-none p-6 text-gray-800 leading-relaxed shadow-sm w-full border border-gray-100">
                         <h3 className="font-bold text-islamic-primary mb-2 text-sm">{t('askAi')}</h3>
                         <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                           {answer}
                         </div>
                      </div>
                   </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center">
                    <Sparkles className="w-12 h-12 mb-4 text-gray-200" />
                    <p>{language === 'ar' ? 'اسأل عن موضوعات عامة، تاريخ إسلامي، أو توجيهات أخلاقية' : 'Ask about general topics, Islamic history, or ethical guidance'}</p>
                  </div>
                )}
             </div>

             <form onSubmit={handleAskAi} className="relative">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold outline-none transition shadow-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className={`absolute ${language === 'ar' ? 'left-2' : 'right-2'} top-2 bottom-2 bg-islamic-primary text-white w-12 rounded-lg flex items-center justify-center hover:bg-islamic-dark transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  )}
                </button>
             </form>
          </div>
        ) : (
          <div className="space-y-4">
             {/* Mock Official Fatwa List */}
             {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
                   <h3 className="font-bold text-gray-900 mb-2">{language === 'ar' ? 'حكم الصلاة في الطائرة؟' : 'Ruling on praying in an airplane?'}</h3>
                   <p className="text-gray-500 text-sm line-clamp-2">
                     {language === 'ar' 
                      ? 'الصلاة في الطائرة واجبة إذا حان الوقت ولا يمكن تأخيرها إلى ما بعد الوصول. ويصلي القائم قائماً فإن عجز فقاعداً...' 
                      : 'Prayer in the airplane is obligatory if the time comes and cannot be delayed until arrival. One should pray standing, if unable then sitting...'}
                   </p>
                   <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                      <MessageCircle className="w-3 h-3" />
                      <span>{language === 'ar' ? 'اللجنة الدائمة' : 'Permanent Committee'}</span>
                   </div>
                </div>
             ))}
             <div className="text-center mt-8">
               <button className="text-islamic-primary font-bold hover:underline">
                 {language === 'ar' ? 'تصفح الأرشيف الكامل' : 'Browse Full Archive'}
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fatwa;