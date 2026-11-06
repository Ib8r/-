import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BackToHomeBarProps {
  className?: string;
  currentPageTitle?: string;
}

/**
 * HEAVY DUTY - BackToHomeBar
 * Provides a clean, subtle, and accessible return to homepage link on internal pages.
 * Accurately handles RTL (Arabic/Kurdish) and LTR (English) arrow directions.
 */
export const BackToHomeBar: React.FC<BackToHomeBarProps> = ({
  className = '',
  currentPageTitle,
}) => {
  const { locale, dir } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  // Only render on internal routes (never on homepage "/")
  if (currentPath === '/') {
    return null;
  }

  const homeLabel = locale === 'ku' ? 'سەرەکی' : locale === 'en' ? 'Home' : 'الرئيسية';

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2 ${className}`}>
      <nav aria-label="Breadcrumb navigation" className="flex items-center gap-2 text-xs">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFFFFF] dark:bg-[#2B333D] hover:bg-[#D69A25] hover:text-[#20252B] text-[#303943] dark:text-[#CBD5E1] border border-[#E2E5E8] dark:border-[#3E4956] hover:border-[#D69A25] transition-all duration-200 cursor-pointer font-bold shadow-2xs group"
          title={homeLabel}
        >
          <ArrowIcon className="w-4 h-4 text-[#D69A25] group-hover:text-[#20252B] transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
          <span className="group-hover:text-[#20252B] transition-colors">{homeLabel}</span>
        </button>

        {currentPageTitle && (
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] select-none">/</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-xs sm:max-w-md">
              {currentPageTitle}
            </span>
          </div>
        )}
      </nav>
    </div>
  );
};
