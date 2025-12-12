import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateIslamicGuidance } from '../services/geminiService';
import { Send, Sparkles, MessageCircle, AlertTriangle, Mic, Trash2, Volume2, StopCircle, User, Bot, Search, BookOpen, ChevronRight, X, Calendar, Share2, Filter, Tag } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface Message {
  id: number;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Mock Database for Official Fatwas
const FATWA_CATEGORIES = [
  { id: 'all', labelAr: 'الكل', labelEn: 'All' },
  { id: 'worship', labelAr: 'العبادات', labelEn: 'Worship' },
  { id: 'transactions', labelAr: 'المعاملات المالية', labelEn: 'Transactions' },
  { id: 'family', labelAr: 'الأسرة والمجتمع', labelEn: 'Family' },
  { id: 'etiquette', labelAr: 'الآداب والأخلاق', labelEn: 'Etiquette' },
];

const FATWA_LIBRARY = [
  {
    id: 1,
    category: 'worship',
    questionAr: 'ما حكم الصلاة في الطائرة إذا لم أتمكن من القيام؟',
    questionEn: 'What is the ruling on praying in an airplane if I cannot stand?',
    answerAr: 'إذا حان وقت الصلاة وخشي المسلم خروج الوقت قبل هبوط الطائرة، وجب عليه أن يصلي على حاله، فإن استطاع القيام صلى قائماً وركع وسجد، وإن لم يستطع صلى جالسًا وأومأ بالركوع والسجود، ويجعل سجوده أخفض من ركوعه.',
    answerEn: 'If the prayer time comes and the Muslim fears the time will pass before landing, they must pray as they are. If able to stand, they pray standing. If not, they pray sitting and gesture for bowing and prostration.',
    sourceAr: 'اللجنة الدائمة للبحوث العلمية والإفتاء',
    sourceEn: 'Permanent Committee for Scholarly Research',
    date: '2023-11-15'
  },
  {
    id: 2,
    category: 'transactions',
    questionAr: 'حكم التعامل بالعملات الرقمية المشفرة؟',
    questionEn: 'Ruling on dealing with cryptocurrency?',
    answerAr: 'التعامل بالعملات الرقمية التي لا تخضع لرقابة الجهات المالية الرسمية وتكثر فيها الجهالة والغرر والمخاطرة العالية لا يجوز شرعاً، حماية للمال من الضياع.',
    answerEn: 'Dealing in cryptocurrencies that are not subject to official financial regulation and involve high ambiguity, uncertainty, and risk is not permissible in Islam to protect wealth.',
    sourceAr: 'مجمع الفقه الإسلامي',
    sourceEn: 'Islamic Fiqh Academy',
    date: '2024-01-20'
  },
  {
    id: 3,
    category: 'family',
    questionAr: 'هل يجوز للأب أن يميز أحد أبنائه في الهبة؟',
    questionEn: 'Can a father favor one of his children in gifting?',
    answerAr: 'لا يجوز للأب أن يخص بعض أولاده بهبة دون الآخرين إلا لمسوغ شرعي كمرض أو حاجة ماسة، لقول النبي ﷺ: "اتقوا الله واعدلوا بين أولادكم".',
    answerEn: 'It is not permissible for a father to single out some children for gifts over others unless there is a legitimate reason like illness or need, based on the Prophet\'s saying: "Fear Allah and be just between your children."',
    sourceAr: 'دار الإفتاء',
    sourceEn: 'House of Fatwa',
    date: '2023-08-10'
  },
  {
    id: 4,
    category: 'worship',
    questionAr: 'حكم مس المصحف بغير وضوء؟',
    questionEn: 'Ruling on touching the Quran without Wudu?',
    answerAr: 'جمهور العلماء على أنه لا يجوز مس المصحف للمحدث حدثاً أصغر أو أكبر، لقوله تعالى: "لا يمسه إلا المطهرون"، ولقول النبي ﷺ: "لا يمس القرآن إلا طاهر".',
    answerEn: 'The majority of scholars hold that it is not permissible to touch the Quran without Wudu, based on the verse "None touch it except the purified" and the Hadith "No one touches the Quran except the pure."',
    sourceAr: 'هيئة كبار العلماء',
    sourceEn: 'Council of Senior Scholars',
    date: '2023-05-05'
  },
  {
    id: 5,
    category: 'etiquette',
    questionAr: 'حكم الغيبة والنميمة في مجالس العمل؟',
    questionEn: 'Ruling on backbiting and gossip in the workplace?',
    answerAr: 'الغيبة والنميمة من كبائر الذنوب محرمة في كل مكان، وفي العمل أشد لأنها تسبب الشحناء وتفسد بيئة العمل وتضيع الأمانة.',
    answerEn: 'Backbiting and gossip are major sins prohibited everywhere, and worse at work as they cause animosity, spoil the environment, and breach trust.',
    sourceAr: 'الشبكة الإسلامية',
    sourceEn: 'Islam Web',
    date: '2024-02-14'
  },
  {
    id: 6,
    category: 'transactions',
    questionAr: 'ما حكم بيع التقسيط بسعر أعلى من الكاش؟',
    questionEn: 'Ruling on selling by installments at a higher price than cash?',
    answerAr: 'يجوز بيع التقسيط بسعر أعلى من سعر النقد إذا تم الاتفاق على السعر والمدة بوضوح عند العقد، ولم يكن فيه ربا تأخير.',
    answerEn: 'It is permissible to sell by installments at a higher price than cash if the price and duration are clearly agreed upon at the time of the contract, and there is no usury for delay.',
    sourceAr: 'اللجنة الدائمة',
    sourceEn: 'Permanent Committee',
    date: '2023-12-01'
  }
];

const Fatwa: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'official' | 'ai'>('official'); // Default to official
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Library State
  const [librarySearch, setLibrarySearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFatwa, setSelectedFatwa] = useState<any | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Speech Recognition Setup
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(language === 'ar' ? 'متصفحك لا يدعم خاصية التعرف على الصوت' : 'Your browser does not support speech recognition');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      inputRef.current?.focus();
    };

    recognition.start();
  };

  // Text to Speech
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleAskAi = async (e: React.FormEvent | null, overrideQuestion?: string) => {
    if (e) e.preventDefault();
    const query = overrideQuestion || question;
    if (!query.trim()) return;

    // Add User Message
    const userMsg: Message = { id: Date.now(), role: 'user', text: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await generateIslamicGuidance(query, language);
      const aiMsg: Message = { id: Date.now() + 1, role: 'model', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Filter Fatwas
  const filteredFatwas = useMemo(() => {
    return FATWA_LIBRARY.filter(fatwa => {
      const matchesSearch = 
        (language === 'ar' ? fatwa.questionAr : fatwa.questionEn).toLowerCase().includes(librarySearch.toLowerCase()) ||
        (language === 'ar' ? fatwa.answerAr : fatwa.answerEn).toLowerCase().includes(librarySearch.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || fatwa.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [librarySearch, activeCategory, language]);

  // Handle Archive Click
  const handleArchiveClick = () => {
    setMode('official');
    setActiveCategory('all');
    setLibrarySearch('');
    showToast(language === 'ar' ? 'تم تحديث الأرشيف وعرض الكل' : 'Archive refreshed and viewing all', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-islamic-dark dark:text-islamic-gold mb-4 font-serif">{t('fatwa')}</h1>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setMode('official')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${
                mode === 'official' 
                  ? 'bg-islamic-dark text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-islamic-dark hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {language === 'ar' ? 'المكتبة والفتاوى' : 'Fatwa Library'}
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${
                mode === 'ai' 
                  ? 'bg-gradient-to-r from-islamic-gold to-yellow-500 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-gray-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {language === 'ar' ? 'دليل الموقع الذكي' : 'Website Guide'}
            </button>
          </div>
        </header>

        {mode === 'ai' ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-yellow-100 dark:border-gray-700 overflow-hidden flex flex-col h-[600px] max-w-4xl mx-auto transition-colors duration-300">
             {/* Chat Interface */}
             <div className="bg-yellow-50/50 dark:bg-yellow-900/10 border-b border-yellow-100 dark:border-gray-700 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                   <span className="text-xs text-yellow-800 dark:text-yellow-400 font-medium">
                     {language === 'ar' 
                      ? 'تنبيه: هذا المساعد مخصص لشرح استخدام الموقع فقط ولا يصدر فتاوى.'
                      : 'Notice: This assistant is only for website navigation and does NOT provide Fatwas.'}
                   </span>
                </div>
                {messages.length > 0 && (
                  <button 
                    onClick={clearChat}
                    className="text-gray-400 hover:text-red-500 transition p-1"
                    title={language === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-gray-900/50 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center animate-in fade-in">
                    <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <Sparkles className="w-8 h-8 text-islamic-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">{language === 'ar' ? 'المساعد التقني' : 'Technical Guide'}</h3>
                    <p className="max-w-xs text-sm">
                        {language === 'ar' 
                         ? 'اسألني عن كيفية استخدام المكتبة، البحث عن الفتاوى، أو التواصل مع العلماء.' 
                         : 'Ask me how to use the library, search for fatwas, or contact scholars.'}
                    </p>
                    <button 
                       onClick={() => handleAskAi(null, language === 'ar' ? 'كيف أبحث في مكتبة الفتاوى؟' : 'How do I search the Fatwa library?')}
                       className="mt-6 text-xs bg-white dark:bg-gray-700 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 hover:border-islamic-gold dark:hover:border-islamic-gold dark:text-gray-200 transition"
                    >
                       {language === 'ar' ? 'مثال: كيف أبحث في المكتبة؟' : 'Ex: How to search?'}
                    </button>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-islamic-light text-islamic-primary' : 'bg-islamic-gold text-white'}`}>
                          {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                       </div>
                       
                       <div className={`group relative max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                         msg.role === 'user' 
                           ? 'bg-white dark:bg-gray-700 dark:text-gray-100 text-gray-800 rounded-tr-none border border-gray-100 dark:border-gray-600' 
                           : 'bg-white dark:bg-gray-700 dark:text-gray-100 text-gray-800 rounded-tl-none border border-yellow-100 dark:border-yellow-900/30'
                       }`}>
                          <div className="whitespace-pre-wrap">{msg.text}</div>
                          {msg.role === 'model' && (
                            <button 
                                onClick={() => handleSpeak(msg.text)}
                                className={`absolute -bottom-6 ${language === 'ar' ? 'left-0' : 'right-0'} p-1 text-gray-400 hover:text-islamic-primary transition opacity-0 group-hover:opacity-100`}
                            >
                                {isSpeaking ? <StopCircle className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                          )}
                       </div>
                    </div>
                  ))
                )}
                
                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-islamic-gold flex items-center justify-center text-white flex-shrink-0 mt-1">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-5 py-3 border border-yellow-100 dark:border-gray-600 shadow-sm">
                            <div className="flex space-x-1 space-x-reverse">
                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
             </div>

             <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                 <form onSubmit={handleAskAi} className="relative flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      className={`p-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                          isRecording 
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-600 ring-2 ring-red-100 dark:ring-red-900 animate-pulse' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      title={language === 'ar' ? 'تحدث الآن' : 'Speak now'}
                    >
                      {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    
                    <input
                      ref={inputRef}
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder={isRecording ? (language === 'ar' ? 'جاري الاستماع...' : 'Listening...') : (language === 'ar' ? 'كيف أستخدم الموقع؟...' : 'How do I use the site?...')}
                      className="flex-1 py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white rounded-full focus:bg-white dark:focus:bg-gray-600 focus:border-islamic-gold focus:ring-1 focus:ring-islamic-gold outline-none transition"
                      disabled={loading}
                    />
                    
                    <button
                      type="submit"
                      disabled={loading || !question.trim()}
                      className={`p-3 bg-islamic-primary text-white rounded-full hover:bg-islamic-dark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex-shrink-0`}
                    >
                      <Send className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </button>
                 </form>
             </div>
          </div>
        ) : (
          <div className="space-y-6">
             {/* Official Library Search & Filters */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                 <div className="relative mb-6">
                    <input 
                        type="text"
                        value={librarySearch}
                        onChange={(e) => setLibrarySearch(e.target.value)}
                        placeholder={language === 'ar' ? 'ابحث عن حكم، فتوى، أو موضوع...' : 'Search for a ruling, fatwa, or topic...'}
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none transition"
                    />
                    <Search className={`absolute top-3.5 text-gray-400 w-5 h-5 ${language === 'ar' ? 'left-4' : 'right-4'}`} />
                    {librarySearch && (
                        <button 
                            onClick={() => setLibrarySearch('')}
                            className={`absolute top-3.5 text-gray-400 hover:text-red-500 transition ${language === 'ar' ? 'left-12' : 'right-12'}`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                 </div>

                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {FATWA_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                activeCategory === cat.id
                                ? 'bg-islamic-primary text-white shadow-md'
                                : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`}
                        >
                            {language === 'ar' ? cat.labelAr : cat.labelEn}
                        </button>
                    ))}
                 </div>
             </div>

             {/* Results Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {filteredFatwas.length > 0 ? (
                    filteredFatwas.map((fatwa) => (
                        <div 
                            key={fatwa.id} 
                            onClick={() => setSelectedFatwa(fatwa)}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-islamic-light transition cursor-pointer group flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                                    fatwa.category === 'worship' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' :
                                    fatwa.category === 'transactions' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300' :
                                    fatwa.category === 'family' ? 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300' :
                                    'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
                                }`}>
                                    {FATWA_CATEGORIES.find(c => c.id === fatwa.category)?.[language === 'ar' ? 'labelAr' : 'labelEn']}
                                </span>
                                <MessageCircle className="w-4 h-4 text-gray-300 group-hover:text-islamic-primary transition" />
                            </div>
                            
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg leading-snug">
                                {language === 'ar' ? fatwa.questionAr : fatwa.questionEn}
                            </h3>
                            
                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed flex-1">
                                {language === 'ar' ? fatwa.answerAr : fatwa.answerEn}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700 mt-auto">
                                <span className="text-xs text-gray-400 font-medium truncate max-w-[70%]">
                                    {language === 'ar' ? fatwa.sourceAr : fatwa.sourceEn}
                                </span>
                                <span className="text-islamic-primary dark:text-islamic-gold text-sm font-bold flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform rtl:group-hover:translate-x-[4px]">
                                    {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                                    {language === 'ar' ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
                                </span>
                            </div>
                        </div>
                    ))
                 ) : (
                    <div className="col-span-full py-20 text-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>{language === 'ar' ? 'لم يتم العثور على فتاوى مطابقة لبحثك' : 'No fatwas found matching your search'}</p>
                    </div>
                 )}
             </div>

             <div className="text-center mt-8">
               <button 
                onClick={handleArchiveClick}
                className="text-islamic-primary dark:text-islamic-gold font-bold hover:underline"
               >
                 {language === 'ar' ? 'تصفح الأرشيف الكامل' : 'Browse Full Archive'}
               </button>
             </div>
          </div>
        )}
      </div>

      {/* Fatwa Detail Modal */}
      {selectedFatwa && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] transition-colors">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start">
                      <div>
                          <span className={`text-xs px-2.5 py-1 rounded-md font-bold inline-block mb-2 ${
                                selectedFatwa.category === 'worship' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                                selectedFatwa.category === 'transactions' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                                selectedFatwa.category === 'family' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200' :
                                'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                            }`}>
                                {FATWA_CATEGORIES.find(c => c.id === selectedFatwa.category)?.[language === 'ar' ? 'labelAr' : 'labelEn']}
                           </span>
                           <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-snug">
                               {language === 'ar' ? selectedFatwa.questionAr : selectedFatwa.questionEn}
                           </h3>
                      </div>
                      <button onClick={() => setSelectedFatwa(null)} className="hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-full transition">
                          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                  </div>
                  
                  <div className="p-8 overflow-y-auto">
                      <div className="mb-6">
                           <h4 className="font-bold text-islamic-primary dark:text-islamic-gold text-lg mb-3 flex items-center gap-2">
                               <BookOpen className="w-5 h-5" />
                               {language === 'ar' ? 'نص الفتوى' : 'Answer'}
                           </h4>
                           <p className="text-gray-800 dark:text-gray-200 text-lg leading-loose text-justify">
                               {language === 'ar' ? selectedFatwa.answerAr : selectedFatwa.answerEn}
                           </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                           <div className="flex items-center gap-2">
                               <MessageCircle className="w-4 h-4 text-islamic-gold" />
                               <span className="font-medium text-gray-900 dark:text-white">{language === 'ar' ? 'المصدر:' : 'Source:'}</span>
                               <span>{language === 'ar' ? selectedFatwa.sourceAr : selectedFatwa.sourceEn}</span>
                           </div>
                           <div className="flex items-center gap-2">
                               <Calendar className="w-4 h-4 text-islamic-gold" />
                               <span className="font-medium text-gray-900 dark:text-white">{language === 'ar' ? 'التاريخ:' : 'Date:'}</span>
                               <span>{selectedFatwa.date}</span>
                           </div>
                      </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <button className="text-gray-500 dark:text-gray-400 hover:text-islamic-primary dark:hover:text-islamic-gold flex items-center gap-2 text-sm font-medium transition">
                          <Share2 className="w-4 h-4" />
                          {language === 'ar' ? 'مشاركة الفتوى' : 'Share Fatwa'}
                      </button>
                      <button 
                        onClick={() => setSelectedFatwa(null)}
                        className="px-6 py-2 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition font-bold shadow-md"
                      >
                          {language === 'ar' ? 'إغلاق' : 'Close'}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Fatwa;