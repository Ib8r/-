import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { ChevronDown, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { t, locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const isAr = locale === 'ar';
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Bright Header Banner */}
      <section className="bg-[#FFFFFF] border-b border-[#E2E5E8] py-12 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest block">
            {t.faqPage.tag}
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black font-heading text-[#20252B] text-balance">
            {t.faqPage.title}
          </h1>
          <p className="text-xs sm:text-base text-[#303943] max-w-2xl leading-relaxed">
            {t.faqPage.subtitle}
          </p>
        </div>
      </section>

      {/* Accordion Container */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2.5 sm:space-y-3">
          {t.faqPage.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FFFFFF] border border-[#E2E5E8] overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F6F7] transition-colors"
                >
                  <span className="text-xs sm:text-base font-bold text-[#20252B] font-heading">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#D69A25] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#303943] leading-relaxed border-t border-[#F5F6F7] pt-3 sm:pt-4 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E2E5E8] space-y-3 sm:space-y-4 shadow-2xs">
          <HelpCircle className="w-8 h-8 text-[#D69A25] mx-auto" />
          <h3 className="text-base sm:text-lg font-bold text-[#20252B] font-heading">
            {isAr ? 'هل لديك استفسار آخر لم تجد إجابته هنا؟' : 'Have a question not listed here?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#303943] max-w-md mx-auto">
            {isAr
              ? 'فريق العمل مستعد دائماً لتقديم التوضيحات الفنية والإدارية اللازمة لشركائنا والمقاولين.'
              : 'Our corporate team is prepared to provide comprehensive engineering and partnership guidance.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2.5 rounded-xl bg-[#303943] hover:bg-[#20252B] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {isAr ? 'تواصل مع فريق الدعم' : 'Contact Support Team'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
