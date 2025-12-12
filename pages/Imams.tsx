import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Star } from 'lucide-react';

const Imams: React.FC = () => {
  const { t, language } = useLanguage();

  const imams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    name: language === 'ar' ? 'الشيخ محمد إبراهيم' : 'Sheikh Mohammed Ibrahim',
    role: language === 'ar' ? 'إمام وخطيب' : 'Imam & Khatib',
    location: language === 'ar' ? 'الرياض، حي الملقا' : 'Riyadh, Al-Malqa',
    rating: 4.8,
    image: `https://picsum.photos/seed/imamlist${i}/300/300`
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-islamic-dark mb-8 font-serif">{t('featuredImams')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {imams.map((imam) => (
            <div key={imam.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden bg-gray-200">
                <img src={imam.image} alt={imam.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{imam.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-50 px-2 py-1 rounded">
                     <Star className="w-3 h-3 fill-current" />
                     {imam.rating}
                  </div>
                </div>
                <p className="text-islamic-primary text-sm font-medium mb-3">{imam.role}</p>
                <div className="mt-auto flex items-center gap-2 text-xs text-gray-500">
                   <MapPin className="w-3 h-3" />
                   {imam.location}
                </div>
                <button className="mt-4 w-full py-2 border border-islamic-primary text-islamic-primary rounded-lg text-sm font-bold hover:bg-islamic-primary hover:text-white transition">
                  {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Imams;