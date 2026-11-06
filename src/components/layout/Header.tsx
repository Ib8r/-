import React, { useState, useRef, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { Globe, Menu, X, ChevronDown, Smartphone, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, setLocale, locales } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  // Close language dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopLangRef.current && !desktopLangRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(event.target as Node)) {
        setMobileLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Strict 5-Item Main Navigation (Section 8)
  // 1. Home ("الرئيسية")
  // 2. Categories ("الفئات") -> /services/rental
  // 3. Features ("المزايا") -> /how-it-works
  // 4. About Us ("معلومات عنا") -> /about
  // 5. Contact Us ("اتصل بنا") -> /contact
  const navLinks = [
    {
      path: '/',
      labelAr: 'الرئيسية',
      labelEn: 'Home',
      labelKu: 'سەرەکی',
    },
    {
      path: '/services/rental',
      labelAr: 'الفئات',
      labelEn: 'Categories',
      labelKu: 'فئات',
    },
    {
      path: '/how-it-works',
      labelAr: 'المزايا',
      labelEn: 'Features',
      labelKu: 'تایبەتمەندییەکان',
    },
    {
      path: '/about',
      labelAr: 'معلومات عنا',
      labelEn: 'About Us',
      labelKu: 'دەربارەمان',
    },
    {
      path: '/contact',
      labelAr: 'اتصل بنا',
      labelEn: 'Contact Us',
      labelKu: 'پەیوەندی',
    },
  ];

  const getNavLabel = (item: typeof navLinks[0]) => {
    if (locale === 'ku') return item.labelKu;
    if (locale === 'en') return item.labelEn;
    return item.labelAr;
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isCurrentActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(path);
  };

  const currentLangLabel = locales.find((l) => l.code === locale)?.label || 'العربية';

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs transition-colors duration-250">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <div
            onClick={() => handleNavClick('/')}
            className="cursor-pointer shrink-0 transition-opacity hover:opacity-90 flex items-center"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('/')}
          >
            <Logo variant="full" size="md" showTagline={true} />
          </div>

          {/* Zone 2: Navigation Links (Desktop - Strictly 5 Items) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`py-2 text-sm font-semibold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrentActive(item.path)
                    ? 'text-[#D69A25] font-bold border-b-2 border-[#D69A25]'
                    : 'text-[#303943] dark:text-[#CBD5E1] hover:text-[#D69A25]'
                }`}
              >
                {getNavLabel(item)}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#E2E5E8] dark:border-[#3E4956] bg-[#F5F6F7] dark:bg-[#2B333D] hover:bg-[#EAECEE] dark:hover:bg-[#303943] text-[#303943] dark:text-[#CBD5E1] transition-all cursor-pointer"
              title={isDark ? 'الوضع النهاري / Light Mode' : 'الوضع الليلي / Dark Mode'}
              aria-label="Toggle Light/Dark Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#D69A25]" />
              ) : (
                <Moon className="w-4 h-4 text-[#303943]" />
              )}
            </button>

            {/* Language Selector Proper Dropdown (Desktop) */}
            <div className="relative" ref={desktopLangRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E5E8] dark:border-[#3E4956] hover:border-[#D69A25]/50 bg-[#F5F6F7] dark:bg-[#2B333D] hover:bg-[#EAECEE] dark:hover:bg-[#303943] text-xs font-semibold text-[#303943] dark:text-[#CBD5E1] transition-all cursor-pointer"
                title="اختر اللغة / Select Language"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#D69A25]" />
                <span className="font-semibold">{currentLangLabel}</span>
                <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute top-full end-0 mt-1 w-36 bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      role="option"
                      aria-selected={locale === l.code}
                      onClick={() => {
                        setLocale(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3.5 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        locale === l.code
                          ? 'bg-[#D69A25]/15 text-[#D69A25] font-bold'
                          : 'text-[#303943] dark:text-[#CBD5E1] hover:bg-[#F5F6F7] dark:hover:bg-[#303943]'
                      }`}
                    >
                      <span>{l.label}</span>
                      {locale === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#D69A25]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action: Download App CTA */}
            <button
              onClick={() => handleNavClick('/download')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D69A25] hover:bg-[#C2891E] active:bg-[#B37B17] text-[#20252B] text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4" />
              <span>{locale === 'ku' ? 'داگرتنی ئەپ' : locale === 'en' ? 'Download App' : 'تحميل التطبيق'}</span>
            </button>
          </div>

          {/* Mobile Right Bar: Theme + Language Dropdown Trigger + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md border border-[#E2E5E8] dark:border-[#3E4956] bg-[#F5F6F7] dark:bg-[#2B333D] text-[#303943] dark:text-[#CBD5E1]"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-[#D69A25]" /> : <Moon className="w-3.5 h-3.5 text-[#303943]" />}
            </button>

            {/* Mobile Language Selector Dropdown (Does not cycle on click; opens menu) */}
            <div className="relative" ref={mobileLangRef}>
              <button
                type="button"
                onClick={() => setMobileLangDropdownOpen(!mobileLangDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={mobileLangDropdownOpen}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-[#E2E5E8] dark:border-[#3E4956] bg-[#F5F6F7] dark:bg-[#2B333D] text-[11px] font-semibold text-[#303943] dark:text-[#CBD5E1] cursor-pointer"
                aria-label="Select Language"
                title="اختر اللغة"
              >
                <Globe className="w-3 h-3 text-[#D69A25]" />
                <span className="font-bold">{currentLangLabel}</span>
                <ChevronDown className={`w-2.5 h-2.5 opacity-60 transition-transform ${mobileLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileLangDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute top-full end-0 mt-1 w-32 bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      role="option"
                      aria-selected={locale === l.code}
                      onClick={() => {
                        setLocale(l.code);
                        setMobileLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        locale === l.code
                          ? 'bg-[#D69A25]/15 text-[#D69A25] font-bold'
                          : 'text-[#303943] dark:text-[#CBD5E1] hover:bg-[#F5F6F7] dark:hover:bg-[#303943]'
                      }`}
                    >
                      <span>{l.label}</span>
                      {locale === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#D69A25]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-[#303943] dark:text-[#CBD5E1] hover:text-[#20252B] dark:hover:text-white hover:bg-[#F5F6F7] dark:hover:bg-[#2B333D] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Strictly Same 5 Items) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] shadow-md px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors block min-h-[44px] flex items-center ${
                  isCurrentActive(item.path)
                    ? 'bg-[#D69A25]/10 text-[#D69A25] font-bold'
                    : 'text-[#303943] dark:text-[#CBD5E1] hover:bg-[#F5F6F7] dark:hover:bg-[#2B333D]'
                }`}
              >
                {getNavLabel(item)}
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-[#E2E5E8] dark:border-[#3E4956] flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('/download')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] text-[#20252B] font-bold text-sm shadow-xs min-h-[44px]"
            >
              <Smartphone className="w-4 h-4" />
              <span>{locale === 'ku' ? 'داگرتنی ئەپ' : locale === 'en' ? 'Download App' : 'تحميل التطبيق'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
