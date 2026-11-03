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
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
            {t.faqPage.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {t.faqPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {t.faqPage.subtitle}
          </p>
        </div>
      </section>

      {/* Accordion Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {t.faqPage.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/20 space-y-4 shadow-2xs">
          <HelpCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            {isAr ? 'هل لديك استفسار آخر لم تجد إجابته هنا؟' : 'Have a question not listed here?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            {isAr
              ? 'فريق العمل مستعد دائماً لتقديم التوضيحات الفنية والإدارية اللازمة لشركائنا والمقاولين.'
              : 'Our corporate team is prepared to provide comprehensive engineering and partnership guidance.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {isAr ? 'تواصل مع فريق الدعم' : 'Contact Support Team'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
