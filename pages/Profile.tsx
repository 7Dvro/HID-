import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Shield, Bell, Camera, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { t, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  
  // General Form Data
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Password Form Data
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, bio, location, phone });
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password change logic
    if (newPass === confirmPass && newPass.length > 5) {
        updateProfile({}); // Just trigger toast
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
    }
  };

  const tabs = [
    { id: 'general', label: t('generalInfo'), icon: User },
    { id: 'security', label: t('security'), icon: Shield },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-islamic-dark font-serif">{t('settings')}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
           {/* Sidebar / Tabs */}
           <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 text-center border-b border-gray-50">
                      <div className="relative inline-block">
                         <img src={user.avatar || "https://picsum.photos/200"} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mb-3" />
                         <button className="absolute bottom-3 end-0 bg-islamic-primary text-white p-1.5 rounded-full hover:bg-islamic-dark transition border-2 border-white shadow-sm">
                             <Camera className="w-4 h-4" />
                         </button>
                      </div>
                      <h3 className="font-bold text-gray-900">{user.name}</h3>
                      <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <nav className="p-2">
                     {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                activeTab === tab.id 
                                ? 'bg-islamic-light text-islamic-primary' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                     ))}
                  </nav>
              </div>
           </div>

           {/* Content Area */}
           <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                 
                 {activeTab === 'general' && (
                     <form onSubmit={handleGeneralSubmit} className="space-y-6 animate-in fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
                                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('location')}</label>
                                <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('bio')}</label>
                                <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none"></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-50">
                            <button type="submit" className="bg-islamic-primary text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-islamic-dark transition flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                {t('saveChanges')}
                            </button>
                        </div>
                     </form>
                 )}

                 {activeTab === 'security' && (
                     <form onSubmit={handleSecuritySubmit} className="space-y-6 animate-in fade-in max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('currentPassword')}</label>
                            <input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('newPassword')}</label>
                            <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('confirmPassword')}</label>
                            <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-islamic-primary outline-none" />
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-50">
                            <button type="submit" className="bg-islamic-primary text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-islamic-dark transition flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                {t('saveChanges')}
                            </button>
                        </div>
                     </form>
                 )}

              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;