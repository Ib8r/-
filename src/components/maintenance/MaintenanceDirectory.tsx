import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Wrench,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  Truck,
  Star,
  Users,
  Check
} from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { MaintenanceSpecialty, IraqiGovernorate, MaintenanceCenter } from '../../types';
import { MaintenancePostsFeed } from './MaintenancePostsFeed';
import { CreateMaintenancePostModal } from './CreateMaintenancePostModal';

export const MaintenanceDirectory: React.FC = () => {
  const {
    filteredMaintenanceCenters,
    maintenanceFilterOptions,
    setMaintenanceFilterOptions,
    resetMaintenanceFilters,
    openWorkshopDetails,
    openInquiryModal,
    currentUser,
    currentRole
  } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'directory' | 'posts_feed'>('directory');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const specialtiesList: { id: MaintenanceSpecialty | 'all'; labelAr: string }[] = [
    { id: 'all', labelAr: 'كافة التخصصات الهندسية' },
    { id: 'hydraulics', labelAr: 'هيدروليك وبساتن وضغوط' },
    { id: 'diesel_engines', labelAr: 'محركات ديزل وبخاخات' },
    { id: 'electrical', labelAr: 'كهرباء وضفائر وسلف' },
    { id: 'transmission', labelAr: 'جيرات ونواقل حركة ZF' },
    { id: 'diagnostics', labelAr: 'فحص كمبيوتر وبرمجة' },
    { id: 'mobile_field', labelAr: 'ورش طوارئ متنقلة للمواقع' },
    { id: 'mechanical', labelAr: 'ميكانيك عام وتجميع' }
  ];

  const activeCount = [
    maintenanceFilterOptions.specialty !== 'all',
    maintenanceFilterOptions.governorate !== 'all',
    maintenanceFilterOptions.searchQuery.trim() !== '',
    maintenanceFilterOptions.hasMobileWorkshopOnly
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
              <span>دليل ورش ومراكز صيانة المعدات الثقيلة في العراق</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">خدمات ميدانية وورش مركزية متخصصة</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              مراكز الصيانة والورش الهندسية
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              تواصل مباشرة مع مهندسي الهيدروليك، ميكانيك الديزل، وفِرق الصيانة الميدانية المتنقلة 24/7
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>+</span>
              <span>نشر عرض ورشة</span>
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:border-amber-500 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>فلاتر الصيانة</span>
              {activeCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 mb-6 p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-md">
          <button
            onClick={() => setViewMode('directory')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center ${
              viewMode === 'directory'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            دليل الورش والمراكز ({filteredMaintenanceCenters.length})
          </button>
          <button
            onClick={() => setViewMode('posts_feed')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              viewMode === 'posts_feed'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>منشورات وعروض الورش</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </div>

        {viewMode === 'posts_feed' ? (
          <MaintenancePostsFeed onOpenCreateModal={() => setIsCreateModalOpen(true)} />
        ) : (
          /* Layout */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
                  <Filter className="w-4 h-4 text-amber-500" />
                  <span>تصفية الورش والمراكز</span>
                </div>
                {activeCount > 0 && (
                  <button
                    onClick={resetMaintenanceFilters}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>إعادة ضبط</span>
                  </button>
                )}
              </div>

              <MaintenanceFilterControls
                maintenanceFilterOptions={maintenanceFilterOptions}
                setMaintenanceFilterOptions={setMaintenanceFilterOptions}
                specialtiesList={specialtiesList}
              />
            </div>
          </aside>

          {/* Main List */}
          <main className="lg:col-span-3">
            {/* Search Header */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث باسم المركز، التخصص، أو ماركة المعدة..."
                  value={maintenanceFilterOptions.searchQuery}
                  onChange={e => setMaintenanceFilterOptions(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pr-9 pl-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                {maintenanceFilterOptions.searchQuery && (
                  <button
                    onClick={() => setMaintenanceFilterOptions(prev => ({ ...prev, searchQuery: '' }))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
                <span>ترتيب حسب:</span>
                <select
                  value={maintenanceFilterOptions.sortBy}
                  onChange={e =>
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setMaintenanceFilterOptions(prev => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="bg-slate-950 border border-slate-700 rounded py-1 px-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="rating_desc">الأعلى تقييماً</option>
                  <option value="name_asc">الاسم (أبجدياً)</option>
                </select>
              </div>
            </div>

            {/* Centers List */}
            {filteredMaintenanceCenters.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <Wrench className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  لا توجد مراكز صيانة مطابقة للبحث
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
                  جرب اختيار محافظة مجاورة أو اختيار كافة التخصصات الهندسية.
                </p>
                <button
                  onClick={resetMaintenanceFilters}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                >
                  إعادة ضبط فلاتر الصيانة
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMaintenanceCenters.map(center => (
                  <MaintenanceCard
                    key={center.id}
                    center={center}
                    onDetails={() => openWorkshopDetails(center.id)}
                    onInquiry={() =>
                      openInquiryModal({
                        targetType: 'maintenance',
                        targetId: center.id,
                        targetTitle: center.centerNameAr,
                        targetProviderName: center.centerNameAr,
                        targetProviderPhone: center.phone
                      })
                    }
                  />
                ))}
              </div>
            )}
          </main>
        </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 h-full overflow-y-auto p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-base font-bold text-white font-heading">
                  <SlidersHorizontal className="w-5 h-5 text-amber-500" />
                  <span>فلاتر مراكز الصيانة</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                  aria-label="إغلاق الفلاتر"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <MaintenanceFilterControls
                maintenanceFilterOptions={maintenanceFilterOptions}
                setMaintenanceFilterOptions={setMaintenanceFilterOptions}
                specialtiesList={specialtiesList}
              />
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
              <button
                onClick={resetMaintenanceFilters}
                className="w-1/3 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
              >
                تطبيق الفلاتر ({filteredMaintenanceCenters.length} ورشة)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <CreateMaintenancePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

const MaintenanceFilterControls: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maintenanceFilterOptions: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMaintenanceFilterOptions: any;
  specialtiesList: { id: MaintenanceSpecialty | 'all'; labelAr: string }[];
}> = ({ maintenanceFilterOptions, setMaintenanceFilterOptions, specialtiesList }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Specialty */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">التخصص الفني:</label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {specialtiesList.map(spec => (
            <button
              key={spec.id}
              onClick={() => setMaintenanceFilterOptions((prev: any) => ({ ...prev, specialty: spec.id }))}
              className={`w-full text-right px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                maintenanceFilterOptions.specialty === spec.id
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{spec.labelAr}</span>
              {maintenanceFilterOptions.specialty === spec.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Governorate */}
      <div>
        <label htmlFor="maint-gov-filter" className="block text-slate-300 font-semibold mb-2">محافظة الورشة:</label>
        <select
          id="maint-gov-filter"
          value={maintenanceFilterOptions.governorate}
          onChange={e => setMaintenanceFilterOptions((prev: any) => ({ ...prev, governorate: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">كافة المحافظات العراقية</option>
          {IRAQI_GOVERNORATES.map(gov => (
            <option key={gov.id} value={gov.nameAr}>{gov.nameAr}</option>
          ))}
        </select>
      </div>

      {/* Mobile workshop only */}
      <div className="pt-2 border-t border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={maintenanceFilterOptions.hasMobileWorkshopOnly}
            onChange={e => setMaintenanceFilterOptions((prev: any) => ({ ...prev, hasMobileWorkshopOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
          />
          <span>توفر ورش متنقلة تصل للموقع الميداني (24/7)</span>
        </label>
      </div>
    </div>
  );
};

const MaintenanceCard: React.FC<{
  center: MaintenanceCenter;
  onDetails: () => void;
  onInquiry: () => void;
}> = ({ center, onDetails, onInquiry }) => {
  const cleanPhone = center.phone.replace(/\s+/g, '');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{center.rating}</span>
            <span className="text-slate-500 font-normal">({center.reviewsCount} تقييم)</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{center.governorate} — {center.city}</span>
          </span>
          {center.hasMobileWorkshop && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
              <Truck className="w-3 h-3" />
              <span>ورشة طوارئ متنقلة للمواقع</span>
            </span>
          )}
        </div>

        <h3
          onClick={onDetails}
          className="text-base sm:text-lg font-bold text-white hover:text-amber-400 cursor-pointer transition-colors font-heading"
        >
          {center.centerNameAr}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {center.descriptionAr}
        </p>

        {/* Services Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {center.servicesOfferedAr.slice(0, 3).map((srv, idx) => (
            <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
              {srv}
            </span>
          ))}
          {center.servicesOfferedAr.length > 3 && (
            <span className="text-[11px] text-amber-400 self-center">
              +{center.servicesOfferedAr.length - 3} خدمات إضافية
            </span>
          )}
        </div>
      </div>

      {/* Action / Contact Block */}
      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800 gap-3 shrink-0">
        <div className="text-right">
          <span className="text-[10px] text-slate-500 block">ساعات العمل:</span>
          <span className="text-xs text-slate-300 font-medium">{center.workingHoursAr.split('(')[0]}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${cleanPhone}`}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
            title={`اتصال: ${cleanPhone}`}
            aria-label="اتصال بالورشة"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={onDetails}
            className="px-3 py-1.5 rounded text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
          >
            الملف والخدمات
          </button>
          <button
            onClick={onInquiry}
            className="px-3.5 py-1.5 rounded text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400"
          >
            طلب كشف صيانة
          </button>
        </div>
      </div>
    </div>
  );
};
