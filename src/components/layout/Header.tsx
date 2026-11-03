import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { Globe, Menu, X, ChevronDown, Smartphone } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, locale, toggleLocale } = useLanguage();
  const { currentPath, navigate } = useRouter();
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div
            onClick={() => handleNavClick('/')}
            className="cursor-pointer shrink-0 transition-opacity hover:opacity-90"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('/')}
          >
            <Logo variant="full" size="md" showTagline={true} />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
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
                          ? 'text-amber-600 font-bold'
                          : 'text-slate-700 hover:text-amber-600'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full start-0 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.children?.map((sub) => (
                          <button
                            key={sub.path}
                            onClick={() => handleNavClick(sub.path)}
                            className={`w-full text-start px-4 py-2.5 text-xs font-semibold transition-colors block cursor-pointer ${
                              currentPath === sub.path
                                ? 'bg-amber-50 text-amber-700 font-bold'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-amber-600'
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
                      ? 'text-amber-600 font-bold border-b-2 border-amber-500'
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Language Switcher */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-all cursor-pointer shadow-2xs"
              title="تبديل اللغة / Switch Language"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-mono">{t.nav.langSwitch}</span>
            </button>

            {/* Primary Action: Download App CTA */}
            <button
              onClick={() => handleNavClick('/download')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.nav.downloadApp}</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
              aria-label="Switch Language"
            >
              <Globe className="w-3 h-3 text-amber-600" />
              <span className="font-mono text-[11px]">{t.nav.langSwitch}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((item) => {
              if (item.hasChildren) {
                return (
                  <div key={item.path} className="py-2 border-b border-slate-100">
                    <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {item.label}
                    </span>
                    <div className="mt-1 space-y-1 ps-3">
                      {item.children?.map((sub) => (
                        <button
                          key={sub.path}
                          onClick={() => handleNavClick(sub.path)}
                          className={`w-full text-start px-3 py-2 rounded-lg text-xs font-semibold block ${
                            currentPath === sub.path
                              ? 'bg-amber-50 text-amber-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
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
                  className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors block ${
                    isCurrentActive(item.path)
                      ? 'bg-amber-50 text-amber-700 font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('/download')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm"
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
