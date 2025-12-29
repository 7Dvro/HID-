
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Direction } from '../types';
import { translations as defaultTranslations } from '../translations';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
  updateTranslation: (key: string, ar: string, en: string) => void;
  pageVisibility: Record<string, boolean>;
  togglePageVisibility: (pageKey: string) => void;
  getAllTranslations: () => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [direction, setDirection] = useState<Direction>('rtl');
  const [overrides, setOverrides] = useState<any>(() => {
    const saved = localStorage.getItem('hid_translations_overrides');
    return saved ? JSON.parse(saved) : {};
  });
  const [pageVisibility, setPageVisibility] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('hid_page_visibility');
    return saved ? JSON.parse(saved) : {
      home: true,
      about: true,
      news: true,
      quran: true,
      imams: true,
      education: true,
      jobs: false // Hidden by default
    };
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    if (language === 'ar') {
      document.body.classList.add('font-sans');
    } else {
      document.body.classList.remove('font-sans');
    }
  }, [language, direction]);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key: string) => {
    if (overrides[key] && overrides[key][language]) {
      return overrides[key][language];
    }
    return defaultTranslations[key]?.[language] || key;
  };

  const updateTranslation = (key: string, ar: string, en: string) => {
    const newOverrides = {
      ...overrides,
      [key]: { ar, en }
    };
    setOverrides(newOverrides);
    localStorage.setItem('hid_translations_overrides', JSON.stringify(newOverrides));
  };

  const togglePageVisibility = (pageKey: string) => {
    const newVisibility = {
      ...pageVisibility,
      [pageKey]: !pageVisibility[pageKey]
    };
    setPageVisibility(newVisibility);
    localStorage.setItem('hid_page_visibility', JSON.stringify(newVisibility));
  };

  const getAllTranslations = () => {
    const combined = { ...defaultTranslations };
    Object.keys(overrides).forEach(key => {
      combined[key] = overrides[key];
    });
    return combined;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, direction, toggleLanguage, t, 
      updateTranslation, pageVisibility, togglePageVisibility,
      getAllTranslations
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
