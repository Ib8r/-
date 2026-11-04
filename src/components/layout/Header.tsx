import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { Globe, Menu, X, ChevronDown, Smartphone, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, toggleLocale } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    {
      path: '/services',
      label: t.nav.services,
      hasChildren: true,
      children: [
        { path: '/services/rental', label: t.nav.rental },
        { path: '/services/sales', label: t.nav.sales },
        { path: '/services/parts', label: t.nav.parts },
        { path: '/services/maintenance', label: t.nav.maintenance },
      ],
    },
    { path: '/how-it-works', label: t.nav.howItWorks },
    { path: '/for-businesses', label: t.nav.forBusinesses },
    { path: '/contact', label: t.nav.contact },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const isCurrentActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

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

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((item) => {
              if (item.hasChildren) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('/services/rental')}
                      className={`inline-flex items-center gap-1.5 py-2 text-sm font-semibold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
                        isCurrentActive('/services')
                          ? 'text-[#D69A25] font-bold'
                          : 'text-[#303943] dark:text-[#CBD5E1] hover:text-[#D69A25]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-[#D69A25]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full start-0 w-64 bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.children?.map((sub) => (
                          <button
                            key={sub.path}
                            onClick={() => handleNavClick(sub.path)}
                            className={`w-full text-start px-4 py-2.5 text-xs font-semibold transition-colors block cursor-pointer ${
                              currentPath === sub.path
                                ? 'bg-[#D69A25]/10 text-[#D69A25] font-bold'
                                : 'text-[#303943] dark:text-[#CBD5E1] hover:bg-[#F5F6F7] dark:hover:bg-[#303943] hover:text-[#D69A25]'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`py-2 text-sm font-semibold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
                    isCurrentActive(item.path)
                      ? 'text-[#D69A25] font-bold border-b-2 border-[#D69A25]'
                      : 'text-[#303943] dark:text-[#CBD5E1] hover:text-[#D69A25]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Desktop Only - lg screens) */}
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

            {/* Language Toggle Button */}
            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E5E8] dark:border-[#3E4956] hover:border-[#303943]/30 bg-[#F5F6F7] dark:bg-[#2B333D] hover:bg-[#EAECEE] dark:hover:bg-[#303943] text-xs font-semibold text-[#303943] dark:text-[#CBD5E1] transition-all cursor-pointer"
              title="تبديل اللغة / Switch Language"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#D69A25]" />
              <span className="font-mono">{t.nav.langSwitch}</span>
            </button>

            {/* Primary Action: Download App CTA */}
            <button
              onClick={() => handleNavClick('/download')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D69A25] hover:bg-[#C2891E] active:bg-[#B37B17] text-[#20252B] text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.nav.downloadApp}</span>
            </button>
          </div>

          {/* Mobile Right Bar: Theme + Language Switcher + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md border border-[#E2E5E8] dark:border-[#3E4956] bg-[#F5F6F7] dark:bg-[#2B333D] text-[#303943] dark:text-[#CBD5E1]"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-[#D69A25]" /> : <Moon className="w-3.5 h-3.5 text-[#303943]" />}
            </button>

            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-[#E2E5E8] dark:border-[#3E4956] bg-[#F5F6F7] dark:bg-[#2B333D] text-[11px] font-semibold text-[#303943] dark:text-[#CBD5E1]"
              aria-label="Switch Language"
            >
              <Globe className="w-3 h-3 text-[#D69A25]" />
              <span className="font-mono">{t.nav.langSwitch}</span>
            </button>

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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] shadow-md px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((item) => {
              if (item.hasChildren) {
                return (
                  <div key={item.path} className="py-2 border-b border-[#F5F6F7] dark:border-[#3E4956]/50">
                    <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {item.label}
                    </span>
                    <div className="mt-1 space-y-1 ps-3">
                      {item.children?.map((sub) => (
                        <button
                          key={sub.path}
                          onClick={() => handleNavClick(sub.path)}
                          className={`w-full text-start px-3 py-2.5 rounded-lg text-xs font-semibold block min-h-[44px] flex items-center ${
                            currentPath === sub.path
                              ? 'bg-[#D69A25]/10 text-[#D69A25] font-bold'
                              : 'text-[#303943] dark:text-[#CBD5E1] hover:bg-[#F5F6F7] dark:hover:bg-[#2B333D]'
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors block min-h-[44px] flex items-center ${
                    isCurrentActive(item.path)
                      ? 'bg-[#D69A25]/10 text-[#D69A25] font-bold'
                      : 'text-[#303943] dark:text-[#CBD5E1] hover:bg-[#F5F6F7] dark:hover:bg-[#2B333D]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#E2E5E8] dark:border-[#3E4956] flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('/download')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] text-[#20252B] font-bold text-sm shadow-xs min-h-[44px]"
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.nav.downloadApp}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
