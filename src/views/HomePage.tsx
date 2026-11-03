import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../assets/images';
import { IndustrialImage } from '../components/common/IndustrialImage';
import {
  Truck,
  Tag,
  Wrench,
  Cog,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  MapPin,
  ChevronRight,
  Layers,
  Sparkles,
  ShieldCheck
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
      badgeColor: 'text-[#303943] bg-[#303943]/10',
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
      badgeColor: 'text-[#303943] bg-[#303943]/10',
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
    <div className="space-y-16 sm:space-y-24 pb-16 w-full max-w-full overflow-x-hidden">
      {/* 1. BRIGHT CORPORATE HERO SECTION */}
      <section className="relative bg-[#FFFFFF] border-b border-[#E2E5E8] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left/Start Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#D69A25]/10 border border-[#D69A25]/30 text-[#D69A25] text-xs font-semibold font-mono tracking-wide">
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] text-[#20252B] font-heading text-balance">
                {t.hero.headline}{' '}
                <span className="text-[#D69A25]">
                  {t.hero.headlineAccent}
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#303943] leading-relaxed max-w-2xl font-normal">
                {t.hero.subheadline}
              </p>

              {/* CTAs & Transparent Availability States */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => navigate('/services/rental')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] active:bg-[#B37B17] text-[#20252B] font-bold text-sm transition-all shadow-xs active:scale-98 cursor-pointer"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/download')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F5F6F7] hover:bg-[#EAECEE] text-[#20252B] font-semibold text-sm border border-[#E2E5E8] transition-all cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-[#D69A25]" />
                  <span>{t.hero.secondaryCta}</span>
                </button>
              </div>

              {/* Verified Status Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#303943] font-mono">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F5F6F7] border border-[#E2E5E8]">
                  <span className="w-2 h-2 rounded-full bg-[#D69A25]" />
                  <span>{t.hero.androidStatus}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F5F6F7] border border-[#E2E5E8]">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>{t.hero.iosStatus}</span>
                </div>
              </div>
            </div>

            {/* Right/End Column: Industrial Hero Photography Card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E5E8] shadow-sm bg-[#F5F6F7]">
                <div className="h-64 sm:h-80 lg:h-96 w-full">
                  <IndustrialImage
                    src={IMAGES.hero}
                    fallbackSrc={FALLBACK_IMAGES.hero}
                    alt="Heavy Equipment Fleet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 bg-[#FFFFFF] border-t border-[#E2E5E8] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D69A25] uppercase tracking-wider">
                    <span>HEAVY DUTY PLATFORM</span>
                  </div>
                  <span className="text-[11px] text-[#303943] font-medium hidden sm:inline-block">
                    {t.hero.ecosystemKicker}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM INTRODUCTION & ECOSYSTEM */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {t.intro.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20252B] font-heading">
            {t.intro.title}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#303943] leading-relaxed">
            {t.intro.description}
          </p>
        </div>

        {/* 6 Stakeholder Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.entries(t.intro.audiences).map(([key, item]) => (
            <div
              key={key}
              className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E5E8] hover:border-[#D69A25]/60 transition-all shadow-2xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D69A25]/10 text-[#D69A25] flex items-center justify-center font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 text-[#D69A25]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#20252B] font-heading">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20252B] font-heading">
              {t.servicesOverview.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#303943] max-w-md">
            {t.servicesOverview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group rounded-2xl bg-[#FFFFFF] border border-[#E2E5E8] overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-[#F5F6F7]">
                    <IndustrialImage
                      src={srv.image}
                      fallbackSrc={srv.fallbackImage}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 start-3.5">
                      <div className="p-2.5 rounded-xl bg-[#FFFFFF]/95 backdrop-blur-xs text-[#20252B] shadow-2xs border border-[#E2E5E8]">
                        <Icon className="w-5 h-5 text-[#D69A25]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#20252B] font-heading">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
                      {srv.desc}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-[#F5F6F7]">
                      {srv.points.map((pt, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#303943]">
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
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F5F6F7] hover:bg-[#D69A25] hover:text-[#20252B] text-[#20252B] text-xs font-bold transition-all cursor-pointer group"
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

      {/* 4. WHY HEAVY DUTY? (Bright Industrial Styling) */}
      <section className="bg-[#FFFFFF] border-y border-[#E2E5E8] py-14 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {t.whyHeavyDuty.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#20252B]">
              {t.whyHeavyDuty.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943]">
              {t.whyHeavyDuty.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.whyHeavyDuty.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#F5F6F7] border border-[#E2E5E8] space-y-2.5"
              >
                <div className="text-xs font-mono font-bold text-[#D69A25]">
                  0{idx + 1}.
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#20252B] font-heading">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NATIONWIDE IRAQI COVERAGE (Full 18 Governorates) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E2E5E8] shadow-2xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.iraqCoverage.tag}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#20252B] font-heading">
              {t.iraqCoverage.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
              {t.iraqCoverage.subtitle}
            </p>
          </div>

          {/* 18 Iraqi Governorates Grid (Responsive 2-col on small mobile, 3-col tablet, 6-col desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
            {t.iraqCoverage.governorates.map((gov) => (
              <div
                key={gov}
                className="px-2.5 py-2 rounded-lg bg-[#F5F6F7] border border-[#E2E5E8] text-xs font-semibold text-[#20252B] text-center"
              >
                {gov}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#303943] italic">
            {t.iraqCoverage.note}
          </p>
        </div>
      </section>

      {/* 6. HOW IT WORKS PREVIEW */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8 sm:mb-12">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {t.howItWorksPreview.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#20252B] font-heading">
            {t.howItWorksPreview.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#303943]">
            {t.howItWorksPreview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.howItWorksPreview.steps.map((st) => (
            <div
              key={st.number}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E5E8] shadow-2xs space-y-3"
            >
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#D69A25] block">
                {st.number}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#20252B] font-heading">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
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
        <div className="rounded-3xl bg-[#303943] text-[#F5F6F7] p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
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
        <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E2E5E8] text-center space-y-5 max-w-3xl mx-auto shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#D69A25]/10 text-[#D69A25] flex items-center justify-center mx-auto">
            <Smartphone className="w-6 h-6 text-[#D69A25]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-wider">
              {t.appDownloadSection.tag}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#20252B] font-heading">
              {t.appDownloadSection.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] max-w-xl mx-auto">
              {t.appDownloadSection.desc}
            </p>
          </div>

          {/* Email Notification Form */}
          {notified ? (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              {t.appDownloadSection.notifySuccess}
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder={t.appDownloadSection.notifyPlaceholder}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2E5E8] text-xs text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#D69A25] bg-[#F5F6F7]"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#303943] hover:bg-[#20252B] text-white font-bold text-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.appDownloadSection.notifyBtn}
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#F5F6F7] text-[#303943] border border-[#E2E5E8]">
              {t.appDownloadSection.androidBadge}
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#F5F6F7] text-[#303943] border border-[#E2E5E8]">
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
