import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  LayoutGrid,
  List,
  MapPin,
  Check,
  ChevronDown
} from 'lucide-react';
import { MachineryCard } from '../home/FeaturedListings';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { MachineryCategory, IraqiGovernorate } from '../../types';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';

export const EquipmentCatalog: React.FC = () => {
  const {
    filteredListings,
    filterOptions,
    setFilterOptions,
    resetFilters,
    openEquipmentDetails,
    openBookingModal,
    toggleFavorite,
    isFavorite
  } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoriesList: { id: MachineryCategory | 'all'; labelAr: string }[] = [
    { id: 'all', labelAr: 'كافة التصنيفات' },
    { id: 'excavator', labelAr: 'حفارات هيدروليكية' },
    { id: 'wheel_loader', labelAr: 'شيافل ولوادر' },
    { id: 'crane', labelAr: 'رافعات كرين' },
    { id: 'generator', labelAr: 'مولدات كهرباء ديزل' },
    { id: 'bulldozer', labelAr: 'بلدوزرات تسوية' },
    { id: 'dump_truck', labelAr: 'شاحنات قلاب' },
    { id: 'forklift', labelAr: 'رافعات شوكية' },
    { id: 'other', labelAr: 'معدات ثقيلة أخرى' }
  ];

  // Active filter count calculation
  const activeFiltersCount = [
    filterOptions.category !== 'all',
    filterOptions.governorate !== 'all',
    filterOptions.city.trim() !== '',
    filterOptions.searchQuery.trim() !== '',
    filterOptions.withOperatorOnly,
    filterOptions.availabilityOnly,
    filterOptions.transportProvidedOnly,
    filterOptions.maxPriceDaily < 2500000
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              سوق تأجير الآليات والمعدات الثقيلة
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              تصفح وتفاوض على تأجير {filteredListings.length} آلية إنشائية متوفرة في العراق
            </p>
          </div>

          {/* Controls: Search input + View mode toggle + Mobile filter button */}
          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="عرض شبكي"
                aria-label="عرض شبكي"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'list' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="عرض قائمة"
                aria-label="عرض قائمة"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:border-amber-500 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>فلاتر البحث</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Machinery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
                  <Filter className="w-4 h-4 text-amber-500" />
                  <span>تصفية النتائج</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>إعادة ضبط</span>
                  </button>
                )}
              </div>

              <FilterControls
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                categoriesList={categoriesList}
              />
            </div>
          </aside>

          {/* Main Results Container */}
          <main className="lg:col-span-3">
            {/* Quick Keyword Search + Sort Header */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم، الموديل، الماركة..."
                  value={filterOptions.searchQuery}
                  onChange={e => setFilterOptions(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pr-9 pl-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                {filterOptions.searchQuery && (
                  <button
                    onClick={() => setFilterOptions(prev => ({ ...prev, searchQuery: '' }))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
                <span>ترتيب حسب:</span>
                <select
                  value={filterOptions.sortBy}
                  onChange={e =>
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setFilterOptions(prev => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="bg-slate-950 border border-slate-700 rounded py-1 px-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="featured">المعدات المميزة أولاً</option>
                  <option value="price_asc">السعر: من الأقل للأعلى</option>
                  <option value="price_desc">السعر: من الأعلى للأقل</option>
                  <option value="power_desc">القدرة الحصانية (الأعلى)</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredListings.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  لا توجد معدات مطابقة لخيارات البحث
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
                  جرب توسيع نطاق البحث الجغرافي أو تغيير تصنيف الآلية أو إلغاء شروط محددة كالسائق الإجباري.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors"
                >
                  إعادة ضبط كافة الفلاتر
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredListings.map(item => (
                  <MachineryCard
                    key={item.id}
                    item={item}
                    onDetails={() => openEquipmentDetails(item.id)}
                    onBook={() => openBookingModal(item)}
                    onToggleFav={() => toggleFavorite(item.id)}
                    isFav={isFavorite(item.id)}
                  />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredListings.map(item => (
                  <MachineryListRow
                    key={item.id}
                    item={item}
                    onDetails={() => openEquipmentDetails(item.id)}
                    onBook={() => openBookingModal(item)}
                    onToggleFav={() => toggleFavorite(item.id)}
                    isFav={isFavorite(item.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer / Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 h-full overflow-y-auto p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-base font-bold text-white font-heading">
                  <SlidersHorizontal className="w-5 h-5 text-amber-500" />
                  <span>فلاتر البحث ({activeFiltersCount})</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                  aria-label="إغلاق الفلاتر"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterControls
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                categoriesList={categoriesList}
              />
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="w-1/3 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
              >
                تطبيق الفلاتر ({filteredListings.length} آلية)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterControls: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOptions: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilterOptions: any;
  categoriesList: { id: MachineryCategory | 'all'; labelAr: string }[];
}> = ({ filterOptions, setFilterOptions, categoriesList }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Category */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">تصنيف المعدة:</label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterOptions((prev: any) => ({ ...prev, category: cat.id }))}
              className={`w-full text-right px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                filterOptions.category === cat.id
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{cat.labelAr}</span>
              {filterOptions.category === cat.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Governorate (all 18) */}
      <div>
        <label htmlFor="governorate-filter-select" className="block text-slate-300 font-semibold mb-2">محافظة العمل (18 محافظة):</label>
        <select
          id="governorate-filter-select"
          value={filterOptions.governorate}
          onChange={e => setFilterOptions((prev: any) => ({ ...prev, governorate: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">كافة المحافظات</option>
          {IRAQI_GOVERNORATES.map(gov => (
            <option key={gov.id} value={gov.nameAr}>
              {gov.nameAr} {gov.isMajorHub ? '(محور رئيسي)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* City or District */}
      <div>
        <label htmlFor="city-district-input" className="block text-slate-300 font-semibold mb-1">المدينة أو الحي الصناعي:</label>
        <input
          id="city-district-input"
          type="text"
          placeholder="مثال: التاجي، خور الزبير، عين كاوة..."
          value={filterOptions.city}
          onChange={e => setFilterOptions((prev: any) => ({ ...prev, city: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-slate-300 font-semibold">الحد الأقصى للإيجار اليومي:</span>
          <span className="text-amber-400 font-mono font-bold tabular-nums">
            {formatIqd(filterOptions.maxPriceDaily)}
          </span>
        </div>
        <input
          type="range"
          min="200000"
          max="2500000"
          step="50000"
          value={filterOptions.maxPriceDaily}
          onChange={e => setFilterOptions((prev: any) => ({ ...prev, maxPriceDaily: Number(e.target.value) }))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
          <span>200,000 د.ع</span>
          <span>2,500,000+ د.ع</span>
        </div>
      </div>

      {/* Checkbox conditions */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={filterOptions.withOperatorOnly}
            onChange={e => setFilterOptions((prev: any) => ({ ...prev, withOperatorOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
          />
          <span>توفير سائق فني معتمد فقط</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={filterOptions.availabilityOnly}
            onChange={e => setFilterOptions((prev: any) => ({ ...prev, availabilityOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
          />
          <span>الآليات المتاحة فوراً فقط</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={filterOptions.transportProvidedOnly}
            onChange={e => setFilterOptions((prev: any) => ({ ...prev, transportProvidedOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
          />
          <span>توفر ناقلة سحب للموقع (سطحة)</span>
        </label>
      </div>
    </div>
  );
};

const MachineryListRow: React.FC<{
  item: any;
  onDetails: () => void;
  onBook: () => void;
  onToggleFav: () => void;
  isFav: boolean;
}> = ({ item, onDetails, onBook, onToggleFav, isFav }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors">
      <div className="flex items-start sm:items-center gap-4 cursor-pointer" onClick={onDetails}>
        <div className="w-24 h-24 rounded-lg bg-slate-800 overflow-hidden shrink-0">
          <img src={item.imageUrl} alt={item.titleAr} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-bold text-amber-400">{item.manufacturer}</span>
            <span aria-hidden="true">·</span>
            <span>طراز {item.modelName}</span>
            <span aria-hidden="true">·</span>
            <span>{item.governorate} ({item.city})</span>
          </div>
          <h3 className="font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors font-heading mb-1.5">
            {item.titleAr}
          </h3>
          <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
            <span>قدرة: {item.specs.powerHorsepower} HP</span>
            <span aria-hidden="true">·</span>
            <span>{item.withOperator ? 'مع سائق' : 'بدون سائق'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">{item.availabilityStatus === 'available' ? 'متاح' : 'مؤجر'}</span>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800 gap-2 shrink-0">
        <div className="text-right">
          <div className="text-base font-bold text-white font-mono tabular-nums leading-tight">
            {formatIqd(item.priceDailyIqd)} / يوم
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {formatUsdEquivalent(item.priceDailyIqd)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onDetails}
            className="px-3 py-1.5 rounded text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
          >
            التفاصيل
          </button>
          <button
            onClick={onBook}
            className="px-4 py-1.5 rounded text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400"
          >
            طلب استئجار
          </button>
        </div>
      </div>
    </div>
  );
};
