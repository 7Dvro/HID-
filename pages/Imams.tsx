import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Star, Search, X, Mail, Phone, Calendar, GraduationCap, ArrowRight, ArrowLeft, MessageSquare, Heart, Share2, Send, MoreHorizontal, User, Smartphone, FileText, Mic2, Building } from 'lucide-react';

// Types for the enhanced features
interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
  avatar: string;
}

interface Post {
  id: number;
  content: string;
  image?: string;
  date: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}

interface DetailedImam {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: string;
  image: string;
  coverImage: string;
  bio: string;
  education: string[];
  followers: number;
  posts: Post[];
  email: string;
  phone: string;
}

const Imams: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [viewMode, setViewMode] = useState<'list' | 'profile'>('list');
  const [selectedImam, setSelectedImam] = useState<DetailedImam | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  
  // Interaction States
  const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Safe images for avatars and covers
  const avatarImages = [
      'https://images.unsplash.com/photo-1590076215667-25cb4840eb19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1594382029377-b9c92cc2ce6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1534579222473-b3c76b97b0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1614742790937-2938a9d68bd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1576670158466-9a29e1208940?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1591216109968-3e504ba415f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  ];

  const coverImages = [
      'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596464528464-9be972eb049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  // Generate Mock Data
  const imams: DetailedImam[] = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    name: language === 'ar' ? `الشيخ ${['محمد إبراهيم', 'أحمد علي', 'عبدالله صالح', 'ياسر الدوسري'][i % 4]}` : `Sheikh ${['Mohammed Ibrahim', 'Ahmed Ali', 'Abdullah Saleh', 'Yasser Al-Dosari'][i % 4]}`,
    role: language === 'ar' ? 'إمام وخطيب' : 'Imam & Khatib',
    location: language === 'ar' ? ['الخرطوم، السودان', 'أم درمان، السودان', 'بحري، السودان', 'بورتسودان'][i % 4] : ['Khartoum, Sudan', 'Omdurman, Sudan', 'Bahri, Sudan', 'Port Sudan'][i % 4],
    rating: (4 + Math.random()).toFixed(1),
    image: avatarImages[i % avatarImages.length],
    coverImage: coverImages[i % coverImages.length],
    bio: language === 'ar' 
      ? 'إمام وخطيب ذو خبرة تمتد لأكثر من 15 عاماً في الدعوة والإرشاد. متخصص في الفقه المقارن وقضايا الأسرة المعاصرة. يسعى لنشر الوسطية والاعتدال.' 
      : 'Imam and Khatib with over 15 years of experience in Da\'wah. Specialized in Comparative Fiqh and contemporary family issues. Striving to spread moderation.',
    education: language === 'ar' 
      ? ['دكتوراه في الفقه المقارن - جامعة القرآن الكريم', 'ماجستير في أصول الدين', 'إجازة في القراءات العشر'] 
      : ['PhD in Comparative Fiqh - Holy Quran University', 'Masters in Fundamentals of Religion', 'Ijaza in Ten Qira\'at'],
    followers: 1500 + (i * 230),
    email: 'contact@imam.com',
    phone: '+249 91 000 0000',
    posts: [
      {
        id: 100 + i,
        date: '2h ago',
        content: language === 'ar' 
          ? 'من أعظم نعم الله على العبد أن يوفقه لذكره وشكره. اللهم أعنا على ذكرك وشكرك وحسن عبادتك.' 
          : 'One of the greatest blessings of Allah upon a servant is to guide him to remembrance and gratitude. O Allah, help us to remember You, thank You, and worship You well.',
        likes: 45,
        comments: [
          { id: 1, user: 'Ahmed', text: language === 'ar' ? 'آمين يا رب العالمين' : 'Ameen', date: '1h ago', avatar: `https://ui-avatars.com/api/?name=Ahmed&background=006B3F&color=fff` }
        ]
      },
      {
        id: 200 + i,
        date: '1d ago',
        content: language === 'ar' 
          ? 'صور من درس الأمس في المسجد الكبير. سعدت بحضوركم ومشاركاتكم القيمة.' 
          : 'Photos from yesterday\'s lesson at the Grand Mosque. Happy with your attendance and valuable participation.',
        image: coverImages[(i + 1) % coverImages.length],
        likes: 120,
        comments: []
      }
    ]
  }));

  const filteredImams = imams.filter(imam => 
    imam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    imam.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleOpenProfile = (imam: DetailedImam) => {
    setSelectedImam(imam);
    setViewMode('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedImam(null);
  };

  const handleLike = (postId: number) => {
    if (!selectedImam) return;
    const updatedPosts = selectedImam.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    });
    setSelectedImam({ ...selectedImam, posts: updatedPosts });
  };

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    if (!user) {
        showToast(language === 'ar' ? 'يجب تسجيل الدخول للتعليق' : 'Please login to comment', 'error');
        return;
    }
    
    if (!selectedImam) return;

    const newComment: Comment = {
        id: Date.now(),
        user: user.name,
        text: text,
        date: language === 'ar' ? 'الآن' : 'Just now',
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=006B3F&color=fff`
    };

    const updatedPosts = selectedImam.posts.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                comments: [...post.comments, newComment]
            };
        }
        return post;
    });

    setSelectedImam({ ...selectedImam, posts: updatedPosts });
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    showToast(language === 'ar' ? 'تم إضافة التعليق' : 'Comment added', 'success');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(language === 'ar' ? 'تم إرسال طلب التواصل بنجاح' : 'Contact request sent successfully', 'success');
    setContactModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <>
            <div className="mb-12">
               <h1 className="text-3xl font-bold text-islamic-dark dark:text-islamic-gold font-serif mb-6 text-center">{t('imams')}</h1>
               
               {/* Resources Grid for Imams */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer">
                     <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4">
                        <Smartphone className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'ar' ? 'تطبيق منبري' : 'Minbari App'}</h3>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'أداة ذكية لإعداد الخطب من المصادر الموثوقة' : 'Smart tool for preparing Khutbahs'}</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer">
                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'ar' ? 'مكتبة الخطب' : 'Khutbah Library'}</h3>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'خطب جاهزة مصنفة ومؤرخة' : 'Categorized ready-made Khutbahs'}</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer">
                     <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-4">
                        <Mic2 className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'ar' ? 'مهارات الإلقاء' : 'Speaking Skills'}</h3>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'دورات تحسين الصوت ولغة الجسد' : 'Voice and body language training'}</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer">
                     <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center mb-4">
                        <Building className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-gray-900 dark:text-white mb-2">{language === 'ar' ? 'إدارة المسجد' : 'Mosque Mgmt'}</h3>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'فقه الإمامة وحل النزاعات' : 'Fiqh of Imamate and conflict resolution'}</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 animate-in fade-in border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">{t('featuredImams')}</h2>
                <div className="relative w-full md:w-96">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={language === 'ar' ? 'بحث بالاسم أو المنطقة...' : 'Search by name or location...'}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none"
                    />
                    <Search className="absolute start-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImams.map((imam) => (
                <div key={imam.id} onClick={() => handleOpenProfile(imam)} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col group cursor-pointer animate-in fade-in duration-300">
                <div className="h-48 overflow-hidden bg-gray-200 relative">
                    <img src={imam.image} alt={imam.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{imam.name}</h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                        <Star className="w-3 h-3 fill-current" />
                        {imam.rating}
                    </div>
                    </div>
                    <p className="text-islamic-primary dark:text-islamic-gold text-sm font-medium mb-3">{imam.role}</p>
                    <div className="mt-auto flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <MapPin className="w-3 h-3" />
                        {imam.location}
                    </div>
                    <button 
                        className="w-full py-2 border border-islamic-primary dark:border-islamic-gold text-islamic-primary dark:text-islamic-gold rounded-lg text-sm font-bold hover:bg-islamic-primary hover:text-white dark:hover:bg-islamic-gold dark:hover:text-gray-900 transition"
                    >
                        {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                    </button>
                </div>
                </div>
            ))}
            </div>
          </>
        )}

        {/* PROFILE VIEW (Code unchanged from previous iteration, just wrapped) */}
        {viewMode === 'profile' && selectedImam && (
            <div className="animate-in slide-in-from-bottom-5 duration-500">
                <button 
                    onClick={handleBackToList}
                    className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-islamic-primary dark:hover:text-islamic-gold transition font-bold"
                >
                    {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                    {language === 'ar' ? 'العودة للدليل' : 'Back to Directory'}
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="h-32 bg-gray-300 relative">
                                <img src={selectedImam.coverImage} className="w-full h-full object-cover" alt="Cover" />
                            </div>
                            <div className="px-6 pb-6 text-center relative">
                                <div className="w-24 h-24 mx-auto -mt-12 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-md bg-white">
                                    <img src={selectedImam.image} className="w-full h-full object-cover" alt={selectedImam.name} />
                                </div>
                                <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">{selectedImam.name}</h2>
                                <p className="text-islamic-primary dark:text-islamic-gold text-sm font-medium">{selectedImam.role}</p>
                                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-2">
                                    <MapPin className="w-4 h-4" />
                                    {selectedImam.location}
                                </div>

                                <div className="flex justify-center gap-6 my-6 py-4 border-y border-gray-100 dark:border-gray-700">
                                    <div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedImam.followers}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'متابع' : 'Followers'}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedImam.posts.length}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'منشور' : 'Posts'}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedImam.rating}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{language === 'ar' ? 'تقييم' : 'Rating'}</div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button 
                                        className="flex-1 py-2 bg-islamic-primary text-white rounded-lg font-bold hover:bg-islamic-dark transition shadow-md"
                                    >
                                        {language === 'ar' ? 'متابعة' : 'Follow'}
                                    </button>
                                    <button 
                                        onClick={() => setContactModalOpen(true)}
                                        className="flex-1 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                                    >
                                        {language === 'ar' ? 'تواصل' : 'Message'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* About Card for Mobile (rendered here to stack nicely) or Desktop Sidebar */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">{language === 'ar' ? 'عن الإمام' : 'About'}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                                {selectedImam.bio}
                            </p>
                            
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-islamic-gold" />
                                {language === 'ar' ? 'التعليم والمؤهلات' : 'Education'}
                            </h4>
                            <ul className="space-y-2 mb-6">
                                {selectedImam.education.map((edu, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5 flex-shrink-0"></span>
                                        {edu}
                                    </li>
                                ))}
                            </ul>

                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-islamic-gold" />
                                {language === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
                            </h4>
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {selectedImam.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {selectedImam.phone}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Feed */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-1 mb-6 inline-flex border border-gray-100 dark:border-gray-700">
                            <button 
                                onClick={() => setActiveTab('posts')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'posts' ? 'bg-islamic-light dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                            >
                                {language === 'ar' ? 'المنشورات' : 'Posts'}
                            </button>
                            <button 
                                onClick={() => setActiveTab('about')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition md:hidden ${activeTab === 'about' ? 'bg-islamic-light dark:bg-gray-700 text-islamic-primary dark:text-islamic-gold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                            >
                                {language === 'ar' ? 'المعلومات' : 'Info'}
                            </button>
                        </div>

                        {activeTab === 'posts' ? (
                            <div className="space-y-6">
                                {selectedImam.posts.map(post => (
                                    <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <img src={selectedImam.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{selectedImam.name}</h4>
                                                    <p className="text-xs text-gray-400">{post.date}</p>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap">
                                            {post.content}
                                        </p>

                                        {post.image && (
                                            <div className="mb-4 rounded-xl overflow-hidden">
                                                <img src={post.image} alt="Post" className="w-full object-cover max-h-96" />
                                            </div>
                                        )}

                                        <div className="flex items-center gap-6 py-3 border-t border-gray-100 dark:border-gray-700">
                                            <button 
                                                onClick={() => handleLike(post.id)}
                                                className={`flex items-center gap-2 text-sm font-medium transition ${post.isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500'}`}
                                            >
                                                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                                {post.likes}
                                            </button>
                                            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-islamic-primary dark:hover:text-islamic-gold transition">
                                                <MessageSquare className="w-5 h-5" />
                                                {post.comments.length}
                                            </button>
                                            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-islamic-primary dark:hover:text-islamic-gold transition">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Comments Section */}
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mt-2">
                                            {post.comments.length > 0 && (
                                                <div className="space-y-4 mb-4">
                                                    {post.comments.map(comment => (
                                                        <div key={comment.id} className="flex gap-3">
                                                            <img src={comment.avatar} className="w-8 h-8 rounded-full" alt="" />
                                                            <div className="flex-1 bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none border border-gray-100 dark:border-gray-700">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="font-bold text-xs text-gray-900 dark:text-white">{comment.user}</span>
                                                                    <span className="text-[10px] text-gray-400">{comment.date}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <div className="flex gap-2">
                                                <img src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=006B3F&color=fff"} className="w-8 h-8 rounded-full mt-1" alt="" />
                                                <div className="flex-1 relative">
                                                    <input 
                                                        type="text" 
                                                        value={commentInputs[post.id] || ''}
                                                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                        placeholder={language === 'ar' ? 'اكتب تعليقاً...' : 'Write a comment...'}
                                                        className="w-full pl-4 pr-12 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:border-islamic-primary focus:ring-1 focus:ring-islamic-primary outline-none dark:text-white"
                                                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                                    />
                                                    <button 
                                                        onClick={() => handleAddComment(post.id)}
                                                        disabled={!commentInputs[post.id]?.trim()}
                                                        className="absolute end-1 top-1 p-1.5 bg-islamic-primary text-white rounded-full disabled:opacity-50 disabled:bg-gray-300 hover:bg-islamic-dark transition"
                                                    >
                                                        <Send className={`w-3 h-3 ${language === 'ar' ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Mobile/Tablet "About" View (duplicate content from left column for responsiveness)
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:hidden">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">{language === 'ar' ? 'عن الإمام' : 'About'}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                                    {selectedImam.bio}
                                </p>
                                
                                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-islamic-gold" />
                                    {language === 'ar' ? 'التعليم والمؤهلات' : 'Education'}
                                </h4>
                                <ul className="space-y-2 mb-6">
                                    {selectedImam.education.map((edu, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5 flex-shrink-0"></span>
                                            {edu}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Contact Modal (unchanged) */}
      {contactModalOpen && selectedImam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
              <div className="bg-islamic-primary p-4 flex justify-between items-center text-white">
                 <h3 className="font-bold">{language === 'ar' ? 'طلب تواصل' : 'Contact Request'}</h3>
                 <button onClick={() => setContactModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="p-6">
                 <div className="flex items-center gap-4 mb-6">
                    <img src={selectedImam.image} alt={selectedImam.name} className="w-16 h-16 rounded-full object-cover border-2 border-islamic-gold" />
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{selectedImam.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedImam.role}</p>
                    </div>
                 </div>
                 
                 <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{language === 'ar' ? 'نوع الطلب' : 'Request Type'}</label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-islamic-primary">
                            <option>{language === 'ar' ? 'استشارة دينية' : 'Religious Consultation'}</option>
                            <option>{language === 'ar' ? 'دعوة لإلقاء خطبة' : 'Khutbah Invitation'}</option>
                            <option>{language === 'ar' ? 'أخرى' : 'Other'}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{language === 'ar' ? 'رسالتك' : 'Your Message'}</label>
                        <textarea rows={3} className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-islamic-primary" required></textarea>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setContactModalOpen(false)} className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            {language === 'ar' ? 'إلغاء' : 'Cancel'}
                        </button>
                        <button type="submit" className="flex-1 py-2 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark shadow-md">
                            {language === 'ar' ? 'إرسال' : 'Send'}
                        </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Imams;