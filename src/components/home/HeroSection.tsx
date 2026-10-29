import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Tractor,
  Tag,
  Package,
  Wrench
} from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { MachineryCategory, IraqiGovernorate, MainServiceType } from '../../types';

export const HeroSection: React.FC = () => {
  const {
    setActiveTab,
    setFilterOptions,
    setSaleFilterOptions,
    setPartFilterOptions,
    setMaintenanceFilterOptions
  } = useApp();

  const [activeServiceTab, setActiveServiceTab] = useState<MainServiceType>('rental');
  const [tempCategory, setTempCategory] = useState<MachineryCategory | 'all'>('all');
  const [tempGov, setTempGov] = useState<IraqiGovernorate | 'all'>('all');
  const [tempSearchText, setTempSearchText] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeServiceTab === 'rental') {
      setFilterOptions(prev => ({
        ...prev,
        category: tempCategory,
        governorate: tempGov,
        searchQuery: tempSearchText
      }));
      setActiveTab('catalog');
    } else if (activeServiceTab === 'sales') {
      setSaleFilterOptions(prev => ({
        ...prev,
        category: tempCategory,
        governorate: tempGov,
        searchQuery: tempSearchText
      }));
      setActiveTab('sales');
    } else if (activeServiceTab === 'parts') {
      setPartFilterOptions(prev => ({
        ...prev,
        governorate: tempGov,
        searchQuery: tempSearchText
      }));
      setActiveTab('parts');
    } else if (activeServiceTab === 'maintenance') {
      setMaintenanceFilterOptions(prev => ({
        ...prev,
        governorate: tempGov,
        searchQuery: tempSearchText
      }));
      setActiveTab('maintenance');
    }
  };

  const handleQuickGov = (gov: IraqiGovernorate) => {
    if (activeServiceTab === 'rental') {
      setFilterOptions(prev => ({ ...prev, governorate: gov }));
      setActiveTab('catalog');
    } else if (activeServiceTab === 'sales') {
      setSaleFilterOptions(prev => ({ ...prev, governorate: gov }));
      setActiveTab('sales');
    } else if (activeServiceTab === 'parts') {
      setPartFilterOptions(prev => ({ ...prev, governorate: gov }));
      setActiveTab('parts');
    } else {
      setMaintenanceFilterOptions(prev => ({ ...prev, governorate: gov }));
      setActiveTab('maintenance');
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background with dark industrial gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/machinix_hero_excavator_1793210155649.jpg"
          alt="معدة حفارة ثقيلة في موقع إنشائي عراقي"
          className="w-full h-full object-cover object-center opacity-30 brightness-75 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 lg:pt-16 lg:pb-22">
        {/* Top Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>منظومة الآليات والمعدات الهندسية الشاملة في العراق</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">تأجير · بيع وشراء · قطع غيار · صيانة</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-[1.15] max-w-3xl mb-4">
          كل ما تحتاجه الآليات الثقيلة لمشروعك{' '}
          <span className="text-amber-500">في منصة واحدة</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed mb-6">
          استأجر واشترِ الحفارات والكرينات والشيافل، احصل على قطع الغيار الأصلية الموثقة برقم القطعة، وتواصل مع ورش الصيانة المتنقلة 24/7 في كافة محافظات العراق.
        </p>

        {/* Service Switcher Tabs directly on Search Container */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar mb-2">
            <button
              onClick={() => setActiveServiceTab('rental')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
                activeServiceTab === 'rental'
                  ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-500 shadow-sm'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white'
              }`}
            >
              <Tractor className="w-4 h-4" />
              <span>تأجير الآليات</span>
            </button>

            <button
              onClick={() => setActiveServiceTab('sales')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
                activeServiceTab === 'sales'
                  ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-500 shadow-sm'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>شراء وبيع الآليات</span>
            </button>

            <button
              onClick={() => setActiveServiceTab('parts')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
                activeServiceTab === 'parts'
                  ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-500 shadow-sm'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>قطع الغيار</span>
            </button>

            <button
              onClick={() => setActiveServiceTab('maintenance')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
                activeServiceTab === 'maintenance'
                  ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-500 shadow-sm'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>مراكز الصيانة</span>
            </button>
          </div>

          {/* Dynamic Search Box */}
          <div className="bg-slate-900/95 backdrop-blur-md p-3 sm:p-4 rounded-xl rounded-tr-none border border-slate-800 shadow-2xl mb-6">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Keyword */}
              <div className="sm:col-span-5 relative">
                <label htmlFor="dynamic-search-hero" className="block text-[11px] font-medium text-slate-400 mb-1">
                  {activeServiceTab === 'rental'
                    ? 'نوع الآلية أو الموديل المطلوب تأجيره'
                    : activeServiceTab === 'sales'
                    ? 'الآلية المعروضة للبيع (CAT, Komatsu...)'
                    : activeServiceTab === 'parts'
                    ? 'اسم القطعة أو رقم Part Number'
                    : 'اسم الورشة أو التخصص المطلوب'}
                </label>
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-500 absolute right-3 pointer-events-none" />
                  <input
                    id="dynamic-search-hero"
                    type="text"
                    placeholder={
                      activeServiceTab === 'rental'
                        ? 'مثال: حفارة كوماتسو، كرين 70 طن...'
                        : activeServiceTab === 'sales'
                        ? 'مثال: شفل 988K، بلدوزر D8R...'
                        : activeServiceTab === 'parts'
                        ? 'مثال: طرمبة هيدروليك، فلاتر CAT...'
                        : 'مثال: هيدروليك البياع، ورشة ديزل...'
                    }
                    value={tempSearchText}
                    onChange={e => setTempSearchText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pr-9 pl-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Category / Specialty */}
              <div className="sm:col-span-3">
                <label htmlFor="dynamic-category-hero" className="block text-[11px] font-medium text-slate-400 mb-1">
                  {activeServiceTab === 'maintenance' ? 'التخصص الهندسي' : 'القسم أو الفئة'}
                </label>
                <div className="relative flex items-center">
                  <Layers className="w-4 h-4 text-slate-500 absolute right-3 pointer-events-none" />
                  <select
                    id="dynamic-category-hero"
                    aria-label="القسم أو الفئة"
                    value={tempCategory}
                    onChange={e => setTempCategory(e.target.value as MachineryCategory | 'all')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pr-9 pl-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 appearance-none"
                  >
                    <option value="all">كافة الأقسام</option>
                    <option value="excavator">حفارات هيدروليكية</option>
                    <option value="bulldozer">بلدوزرات تسوية</option>
                    <option value="wheel_loader">شيافل ولوادر</option>
                    <option value="crane">رافعات كرين وبرجية</option>
                    <option value="dump_truck">شاحنات قلاب</option>
                    <option value="forklift">رافعات شوكية</option>
                    <option value="generator">مولدات ديزل صناعية</option>
                    <option value="other">معدات ثقيلة أخرى</option>
                  </select>
                </div>
              </div>

              {/* Governorate */}
              <div className="sm:col-span-2">
                <label htmlFor="dynamic-gov-hero" className="block text-[11px] font-medium text-slate-400 mb-1">محافظة العمل</label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-slate-500 absolute right-3 pointer-events-none" />
                  <select
                    id="dynamic-gov-hero"
                    aria-label="محافظة العمل"
                    value={tempGov}
                    onChange={e => setTempGov(e.target.value as IraqiGovernorate | 'all')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pr-8 pl-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 appearance-none"
                  >
                    <option value="all">عموم العراق (18)</option>
                    {IRAQI_GOVERNORATES.map(g => (
                      <option key={g.id} value={g.nameAr}>
                        {g.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="sm:col-span-2 pt-5 sm:pt-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث فوري</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Quick Iraqi Hubs Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">أبرز المحاور الصناعية:</span>
          {(['بغداد', 'البصرة', 'أربيل', 'نينوى', 'النجف', 'كربلاء', 'الأنبار', 'السليمانية'] as IraqiGovernorate[]).map(gov => (
            <button
              key={gov}
              onClick={() => handleQuickGov(gov)}
              className="px-2.5 py-1 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
            >
              {gov}
            </button>
          ))}
        </div>

        {/* 4 Pillars Trust Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Tractor className="w-4 h-4 text-amber-500 shrink-0" />
            <span>تأجير معتمد بضمان مالي بالدينار العراقي</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-500 shrink-0" />
            <span>معارض بيع آليات مجمركة ومفحوصة</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-500 shrink-0" />
            <span>قطع غيار أصلية برقم القطعة والمنشأ</span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-500 shrink-0" />
            <span>ورش مركزية وفرق صيانة طوارئ ميدانية</span>
          </div>
        </div>
      </div>
    </div>
  );
};
