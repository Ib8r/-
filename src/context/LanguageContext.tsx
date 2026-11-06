import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Translations, translations } from '../i18n/translations';

export interface LanguageOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  dir: 'rtl' | 'ltr';
}

export const AVAILABLE_LOCALES: LanguageOption[] = [
  { code: 'ar', label: 'العربية', nativeLabel: 'العربية (عراق)', dir: 'rtl' },
  { code: 'en', label: 'English', nativeLabel: 'English (US)', dir: 'ltr' },
  { code: 'ku', label: 'کوردی', nativeLabel: 'کوردی (سۆرانی)', dir: 'rtl' },
];

interface LanguageContextType {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  locales: LanguageOption[];
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('heavy_duty_locale') as Locale | null;
      if (saved === 'ar' || saved === 'en' || saved === 'ku') return saved;
    } catch {
      // Fallback
    }
    return 'ar'; // Default confirmed as Arabic RTL
  });

  const dir: 'rtl' | 'ltr' = locale === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    try {
      localStorage.setItem('heavy_duty_locale', locale);
    } catch {
      // Ignore local storage error
    }
  }, [locale, dir]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => {
      if (prev === 'ar') return 'en';
      if (prev === 'en') return 'ku';
      return 'ar';
    });
  };

  const t = translations[locale] || translations.ar;

  return (
    <LanguageContext.Provider value={{ locale, dir, setLocale, toggleLocale, locales: AVAILABLE_LOCALES, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
