import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES } from '../assets/images';
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
  Building2,
  Users,
  ShieldCheck,
  ChevronRight,
  Layers,
  Sparkles
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
      icon: Truck,
      badgeColor: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'sales',
      path: '/services/sales',
      title: t.servicesOverview.sales.title,
      desc: t.servicesOverview.sales.desc,
      points: t.servicesOverview.sales.points,
      image: IMAGES.salesService,
      icon: Tag,
      badgeColor: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'parts',
      path: '/services/parts',
      title: t.servicesOverview.parts.title,
      desc: t.servicesOverview.parts.desc,
      points: t.servicesOverview.parts.points,
      image: IMAGES.partsService,
      icon: Cog,
      badgeColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'maintenance',
      path: '/services/maintenance',
      title: t.servicesOverview.maintenance.title,
      desc: t.servicesOverview.maintenance.desc,
      points: t.servicesOverview.maintenance.points,
      image: IMAGES.maintenanceService,
      icon: Wrench,
      badgeColor: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <img
            src={IMAGES.hero}
            alt="Heavy Construction Equipment"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Start Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold font-mono tracking-wide">
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] font-heading text-balance">
                {t.hero.headline}{' '}
                <span className="text-amber-500 underline decoration-amber-500/40 decoration-4 underline-offset-8">
                  {t.hero.headlineAccent}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {t.hero.subheadline}
              </p>

              {/* CTAs & Transparent Availability States */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/services/rental')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/download')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>{t.hero.secondaryCta}</span>
                </button>
              </div>

              {/* Verified Status Badges (No fake downloads) */}
              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700/60">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>{t.hero.androidStatus}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700/60">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>{t.hero.iosStatus}</span>
                </div>
              </div>
            </div>

            {/* Right/End Column: Hero Industrial Photography Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-800">
                <img
                  src={IMAGES.hero}
                  alt="Industrial Machinery Fleet"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                    HEAVY DUTY PLATFORM
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {t.hero.ecosystemKicker}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM INTRODUCTION & ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
            {t.intro.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {t.intro.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.intro.description}
          </p>
        </div>

        {/* 6 Stakeholder Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(t.intro.audiences).map(([key, item]) => (
            <div
              key={key}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400/60 transition-all shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUR MAIN SERVICES CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
              {t.servicesOverview.tag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              {t.servicesOverview.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            {t.servicesOverview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 start-4">
                      <div className="p-2.5 rounded-xl bg-white/95 backdrop-blur-xs text-slate-900 shadow-sm">
                        <Icon className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {srv.desc}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-slate-100">
                      {srv.points.map((pt, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                  <button
                    onClick={() => navigate(srv.path)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-bold transition-all cursor-pointer group"
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

      {/* 4. WHY HEAVY DUTY? */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest">
              {t.whyHeavyDuty.tag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-balance">
              {t.whyHeavyDuty.title}
            </h2>
            <p className="text-sm text-slate-300">
              {t.whyHeavyDuty.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whyHeavyDuty.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-amber-400">
                  0{idx + 1}.
                </div>
                <h3 className="text-base font-bold text-white font-heading">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NATIONWIDE IRAQI COVERAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-amber-500/10 border border-amber-500/20 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-amber-700 uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.iraqCoverage.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {t.iraqCoverage.title}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {t.iraqCoverage.subtitle}
            </p>
          </div>

          {/* 18 Iraqi Governorates Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {t.iraqCoverage.governorates.map((gov) => (
              <div
                key={gov}
                className="px-3 py-2 rounded-lg bg-white border border-amber-200/60 text-xs font-semibold text-slate-800 text-center shadow-2xs"
              >
                {gov}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 italic">
            {t.iraqCoverage.note}
          </p>
        </div>
      </section>

      {/* 6. HOW IT WORKS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
            {t.howItWorksPreview.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t.howItWorksPreview.title}
          </h2>
          <p className="text-sm text-slate-600">
            {t.howItWorksPreview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.howItWorksPreview.steps.map((st) => (
            <div
              key={st.number}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4"
            >
              <span className="text-3xl font-black font-mono text-amber-500 block">
                {st.number}
              </span>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigate('/how-it-works')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer"
          >
            {t.howItWorksPreview.fullGuideCta}
          </button>
        </div>
      </section>

      {/* 7. BUSINESS PARTNERSHIP CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl z-10">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              {t.businessCta.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {t.businessCta.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.businessCta.desc}
            </p>
          </div>

          <button
            onClick={() => navigate('/for-businesses')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer z-10 whitespace-nowrap"
          >
            {t.businessCta.cta}
          </button>
        </div>
      </section>

      {/* 8. FINAL APP DOWNLOAD PRE-LAUNCH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-6 max-w-3xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
            <Smartphone className="w-6 h-6 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
              {t.appDownloadSection.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {t.appDownloadSection.title}
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
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
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.appDownloadSection.notifyBtn}
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              {t.appDownloadSection.androidBadge}
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              {t.appDownloadSection.iosBadge}
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            {t.appDownloadSection.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
};
