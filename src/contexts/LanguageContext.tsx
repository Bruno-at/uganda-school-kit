import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/config';

export type Language = 'en' | 'fr' | 'es' | 'ar' | 'zh' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t: i18nT, i18n: i18nInstance } = useTranslation();

  const setLanguage = (lang: Language) => {
    i18nInstance.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    // Update document direction for RTL languages
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return i18nT(key);
  };

  useEffect(() => {
    // Set initial language direction
    const currentLang = i18nInstance.language as Language;
    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLang;
    }
  }, [i18nInstance.language]);

  return (
    <LanguageContext.Provider value={{ 
      language: i18nInstance.language as Language, 
      setLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
