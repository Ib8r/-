import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export type AppRoute =
  | '/'
  | '/about'
  | '/services'
  | '/services/rental'
  | '/services/sales'
  | '/services/parts'
  | '/services/maintenance'
  | '/how-it-works'
  | '/for-businesses'
  | '/download'
  | '/contact'
  | '/faq'
  | '/privacy'
  | '/terms';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase() || '/';
      return path === '' ? '/' : path;
    }
    return '/';
  });

  const { locale } = useLanguage();

  const navigate = (path: string) => {
    const normalized = path.toLowerCase();
    setCurrentPath(normalized);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname.toLowerCase() || '/';
        setCurrentPath(path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync page title with current route and language
  useEffect(() => {
    const titlesAr: Record<string, string> = {
      '/': 'HEAVY DUTY — منصة المعدات الثقيلة المتكاملة',
      '/about': 'من نحن | HEAVY DUTY — الرؤية والرسالة الصناعية',
      '/services': 'خدماتنا | HEAVY DUTY — المنظومة المتكاملة للمعدات',
      '/services/rental': 'تأجير المعدات الثقيلة | HEAVY DUTY',
      '/services/sales': 'بيع وشراء المعدات الثقيلة | HEAVY DUTY',
      '/services/parts': 'قطع الغيار الأصلية OEM | HEAVY DUTY',
      '/services/maintenance': 'مراكز والورش الصيانة | HEAVY DUTY',
      '/how-it-works': 'كيف يعمل | HEAVY DUTY — دليل الاستخدام',
      '/for-businesses': 'للشركات والوكالات | HEAVY DUTY — بوابة الأعمال',
      '/download': 'تحميل التطبيق | HEAVY DUTY — أندرويد و iOS',
      '/contact': 'اتصل بنا | HEAVY DUTY — خدمة العملاء والشركاء',
      '/faq': 'الأسئلة الشائعة | HEAVY DUTY',
      '/privacy': 'سياسة الخصوصية | HEAVY DUTY',
      '/terms': 'الشروط والأحكام | HEAVY DUTY',
    };

    const titlesEn: Record<string, string> = {
      '/': 'HEAVY DUTY — Heavy Equipment Marketplace',
      '/about': 'About Us | HEAVY DUTY — Corporate Vision & Mission',
      '/services': 'Our Services | HEAVY DUTY — Industrial Platform',
      '/services/rental': 'Equipment Rental | HEAVY DUTY',
      '/services/sales': 'Buy & Sell Equipment | HEAVY DUTY',
      '/services/parts': 'Spare Parts Marketplace | HEAVY DUTY',
      '/services/maintenance': 'Maintenance Centers | HEAVY DUTY',
      '/how-it-works': 'How It Works | HEAVY DUTY — User Guide',
      '/for-businesses': 'For Businesses | HEAVY DUTY — B2B Partner Portal',
      '/download': 'Download App | HEAVY DUTY — Android & iOS',
      '/contact': 'Contact Us | HEAVY DUTY — Corporate Inquiries',
      '/faq': 'FAQ | HEAVY DUTY — Frequently Asked Questions',
      '/privacy': 'Privacy Policy | HEAVY DUTY',
      '/terms': 'Terms & Conditions | HEAVY DUTY',
    };

    const activeMap = locale === 'ar' ? titlesAr : titlesEn;
    const baseTitle = activeMap[currentPath] || 'HEAVY DUTY — Heavy Equipment Marketplace';
    document.title = baseTitle;
  }, [currentPath, locale]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
