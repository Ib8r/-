import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../assets/images';
import { IndustrialImage } from '../components/common/IndustrialImage';
import { InteractiveHeroShowcase } from '../components/home/InteractiveHeroShowcase';
import { InteractiveIraqMap } from '../components/home/InteractiveIraqMap';
import {
  Truck,
  Tag,
  Wrench,
  Cog,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ChevronRight,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  Activity
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const { navigate } = useRouter();
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes('@')) return;
    setNotified(true);
  };

  const services = [
    {
      id: 'rental',
      path: '/services/rental',
      title: t.servicesOverview.rental.title,
      desc: t.servicesOverview.rental.desc,
      points: t.servicesOverview.rental.points,
      image: IMAGES.rentalService,
      fallbackImage: FALLBACK_IMAGES.rentalService,
      icon: Truck,
      badgeColor: 'text-[#D69A25] bg-[#D69A25]/10',
    },
    {
      id: 'sales',
      path: '/services/sales',
      title: t.servicesOverview.sales.title,
      desc: t.servicesOverview.sales.desc,
      points: t.servicesOverview.sales.points,
      image: IMAGES.salesService,
      fallbackImage: FALLBACK_IMAGES.salesService,
      icon: Tag,
      badgeColor: 'text-[#303943] bg-[#303943]/10 dark:text-[#CBD5E1] dark:bg-[#CBD5E1]/10',
    },
    {
      id: 'parts',
      path: '/services/parts',
      title: t.servicesOverview.parts.title,
      desc: t.servicesOverview.parts.desc,
      points: t.servicesOverview.parts.points,
      image: IMAGES.partsService,
      fallbackImage: FALLBACK_IMAGES.partsService,
      icon: Cog,
      badgeColor: 'text-[#303943] bg-[#303943]/10 dark:text-[#CBD5E1] dark:bg-[#CBD5E1]/10',
    },
    {
      id: 'maintenance',
      path: '/services/maintenance',
      title: t.servicesOverview.maintenance.title,
      desc: t.servicesOverview.maintenance.desc,
      points: t.servicesOverview.maintenance.points,
      image: IMAGES.maintenanceService,
      fallbackImage: FALLBACK_IMAGES.maintenanceService,
      icon: Wrench,
      badgeColor: 'text-[#D69A25] bg-[#D69A25]/10',
    },
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* 1. INTERACTIVE HERO EXPERIENCE (Gesture-Driven Equipment Showcase) */}
      <InteractiveHeroShowcase />

      {/* 2. PLATFORM INTRODUCTION & ECOSYSTEM */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {t.intro.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {t.intro.title}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
            {t.intro.description}
          </p>
        </div>

        {/* 6 Stakeholder Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.entries(t.intro.audiences).map(([key, item]) => (
            <div
              key={key}
              className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] hover:border-[#D69A25]/60 transition-all shadow-2xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D69A25]/10 dark:bg-[#D69A25]/20 text-[#D69A25] flex items-center justify-center font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 text-[#D69A25]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUR MAIN SERVICES CARDS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {t.servicesOverview.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {t.servicesOverview.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] max-w-md">
            {t.servicesOverview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-[#F5F6F7] dark:bg-[#20252B]">
                    <IndustrialImage
                      src={srv.image}
                      fallbackSrc={srv.fallbackImage}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 start-3.5">
                      <div className="p-2.5 rounded-xl bg-[#FFFFFF]/95 dark:bg-[#2B333D]/95 backdrop-blur-xs text-[#20252B] dark:text-[#F5F6F7] shadow-2xs border border-[#E2E5E8] dark:border-[#3E4956]">
                        <Icon className="w-5 h-5 text-[#D69A25]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
                      {srv.desc}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-[#F5F6F7] dark:border-[#3E4956]/50">
                      {srv.points.map((pt, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#303943] dark:text-[#CBD5E1]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D69A25] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-7 sm:pb-7 pt-0">
                  <button
                    onClick={() => navigate(srv.path)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F5F6F7] dark:bg-[#20252B] hover:bg-[#D69A25] hover:text-[#20252B] text-[#20252B] dark:text-[#F5F6F7] text-xs font-bold transition-all cursor-pointer group"
                  >
                    <span>{t.servicesOverview.learnMore}</span>
                    <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHY HEAVY DUTY? (Engineering Standards) */}
      <section className="bg-[#FFFFFF] dark:bg-[#20252B] border-y border-[#E2E5E8] dark:border-[#3E4956] py-14 sm:py-20 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {t.whyHeavyDuty.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#20252B] dark:text-[#F5F6F7]">
              {t.whyHeavyDuty.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1]">
              {t.whyHeavyDuty.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.whyHeavyDuty.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] space-y-2.5"
              >
                <div className="text-xs font-mono font-bold text-[#D69A25]">
                  0{idx + 1}.
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE IRAQ GEOGRAPHIC MAP & EXPANSION NETWORK */}
      <InteractiveIraqMap />

      {/* 6. HOW IT WORKS PREVIEW */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8 sm:mb-12">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {t.howItWorksPreview.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {t.howItWorksPreview.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1]">
            {t.howItWorksPreview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.howItWorksPreview.steps.map((st) => (
            <div
              key={st.number}
              className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs space-y-3"
            >
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#D69A25] block">
                {st.number}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => navigate('/how-it-works')}
            className="text-xs font-bold text-[#D69A25] hover:text-[#C2891E] hover:underline cursor-pointer"
          >
            {t.howItWorksPreview.fullGuideCta}
          </button>
        </div>
      </section>

      {/* 7. BUSINESS PARTNERSHIP CALLOUT */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#303943] dark:bg-[#2B333D] text-[#F5F6F7] p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border border-[#E2E5E8]/20 dark:border-[#3E4956]">
          <div className="space-y-2.5 max-w-xl">
            <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-wider">
              {t.businessCta.tag}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white">
              {t.businessCta.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              {t.businessCta.desc}
            </p>
          </div>

          <button
            onClick={() => navigate('/for-businesses')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] text-[#20252B] font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer text-center whitespace-nowrap"
          >
            {t.businessCta.cta}
          </button>
        </div>
      </section>

      {/* 8. FINAL APP DOWNLOAD PRE-LAUNCH SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] text-center space-y-5 max-w-3xl mx-auto shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#D69A25]/10 dark:bg-[#D69A25]/20 text-[#D69A25] flex items-center justify-center mx-auto">
            <Smartphone className="w-6 h-6 text-[#D69A25]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-wider">
              {t.appDownloadSection.tag}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {t.appDownloadSection.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] max-w-xl mx-auto">
              {t.appDownloadSection.desc}
            </p>
          </div>

          {/* Email Notification Form */}
          {notified ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              {t.appDownloadSection.notifySuccess}
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder={t.appDownloadSection.notifyPlaceholder}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2E5E8] dark:border-[#3E4956] text-xs text-[#20252B] dark:text-[#F5F6F7] focus:outline-none focus:ring-2 focus:ring-[#D69A25] bg-[#F5F6F7] dark:bg-[#20252B]"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#303943] dark:bg-[#D69A25] hover:bg-[#20252B] dark:hover:bg-[#C2891E] text-white dark:text-[#20252B] font-bold text-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.appDownloadSection.notifyBtn}
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#F5F6F7] dark:bg-[#20252B] text-[#303943] dark:text-[#CBD5E1] border border-[#E2E5E8] dark:border-[#3E4956]">
              {t.appDownloadSection.androidBadge}
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#F5F6F7] dark:bg-[#20252B] text-[#303943] dark:text-[#CBD5E1] border border-[#E2E5E8] dark:border-[#3E4956]">
              {t.appDownloadSection.iosBadge}
            </span>
          </div>

          <p className="text-[11px] text-[#94A3B8]">
            {t.appDownloadSection.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
};
