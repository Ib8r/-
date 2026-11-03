import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Tag,
  MapPin,
  Clock,
  PlusCircle,
  ShieldCheck,
  Check,
  Phone,
  MessageSquare
} from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { MachineryCategory, IraqiGovernorate, SaleCondition, SellerType, EquipmentSaleListing } from '../../types';
import { formatIqd, formatUsdEquivalent, getCategoryNameAr } from '../../utils/formatters';

export const SalesMarketplace: React.FC = () => {
  const {
    filteredSaleListings,
    saleFilterOptions,
    setSaleFilterOptions,
    resetSaleFilters,
    openSaleDetails,
    openInquiryModal,
    openAddSaleListingModal
  } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categoriesList: { id: MachineryCategory | 'all'; labelAr: string }[] = [
    { id: 'all', labelAr: 'كافة الآليات للبيع' },
    { id: 'excavator', labelAr: 'حفارات هيدروليكية' },
    { id: 'wheel_loader', labelAr: 'شيافل ولوادر' },
    { id: 'crane', labelAr: 'رافعات كرين' },
    { id: 'generator', labelAr: 'مولدات كهرباء ديزل' },
    { id: 'bulldozer', labelAr: 'بلدوزرات تسوية' },
    { id: 'dump_truck', labelAr: 'شاحنات قلاب' },
    { id: 'forklift', labelAr: 'رافعات شوكية' },
    { id: 'other', labelAr: 'معدات ثقيلة أخرى' }
  ];

  const activeCount = [
    saleFilterOptions.category !== 'all',
    saleFilterOptions.governorate !== 'all',
    saleFilterOptions.city.trim() !== '',
    saleFilterOptions.condition !== 'all',
    saleFilterOptions.sellerType !== 'all',
    saleFilterOptions.searchQuery.trim() !== '',
    saleFilterOptions.maxPrice < 800000000
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
              <span>سوق شراء الآليات والمعدات الهندسية</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">أسعار بيع نهائية وتفاوض مباشر</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              بيع وشراء الآليات الثقيلة في العراق
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              عروض شراء مباشرة من المعارض والوكالات المعتمدة وملاك المعدات المؤهلين
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddSaleListingModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة آلية للبيع</span>
            </button>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:border-amber-500 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>الفلاتر</span>
              {activeCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
                  <Filter className="w-4 h-4 text-amber-500" />
                  <span>تصفية عروض البيع</span>
                </div>
                {activeCount > 0 && (
                  <button
                    onClick={resetSaleFilters}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>إعادة ضبط</span>
                  </button>
                )}
              </div>

              <SaleFilterControls
                saleFilterOptions={saleFilterOptions}
                setSaleFilterOptions={setSaleFilterOptions}
                categoriesList={categoriesList}
              />
            </div>
          </aside>

          {/* Main Grid */}
          <main className="lg:col-span-3">
            {/* Search Header */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم، الموديل، الماركة..."
                  value={saleFilterOptions.searchQuery}
                  onChange={e => setSaleFilterOptions(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pr-9 pl-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                {saleFilterOptions.searchQuery && (
                  <button
                    onClick={() => setSaleFilterOptions(prev => ({ ...prev, searchQuery: '' }))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
                <span>ترتيب حسب:</span>
                <select
                  value={saleFilterOptions.sortBy}
                  onChange={e =>
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setSaleFilterOptions(prev => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="bg-slate-950 border border-slate-700 rounded py-1 px-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="featured">المميز أولاً</option>
                  <option value="price_asc">السعر: الأقل أولاً</option>
                  <option value="price_desc">السعر: الأعلى أولاً</option>
                  <option value="year_desc">سنة الصنع (الأحدث)</option>
                  <option value="hours_asc">ساعات التشغيل (الأقل)</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredSaleListings.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <Tag className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  لا توجد آليات بيع مطابقة لخيارات البحث
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
                  جرب توسيع السعر المطلوب أو اختيار محافظة أخرى أو إزالة قيود ساعات العمل.
                </p>
                <button
                  onClick={resetSaleFilters}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                >
                  إعادة ضبط فلاتر البيع
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSaleListings.map(item => (
                  <SaleCard
                    key={item.id}
                    item={item}
                    onDetails={() => openSaleDetails(item.id)}
                    onInquiry={() =>
                      openInquiryModal({
                        targetType: 'sale_equipment',
                        targetId: item.id,
                        targetTitle: item.titleAr,
                        targetPriceIqd: item.askingPriceIqd,
                        targetProviderName: item.sellerName,
                        targetProviderPhone: item.sellerPhone
                      })
                    }
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 h-full overflow-y-auto p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-base font-bold text-white font-heading">
                  <SlidersHorizontal className="w-5 h-5 text-amber-500" />
                  <span>فلاتر بيع وشراء الآليات</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                  aria-label="إغلاق الفلاتر"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <SaleFilterControls
                saleFilterOptions={saleFilterOptions}
                setSaleFilterOptions={setSaleFilterOptions}
                categoriesList={categoriesList}
              />
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
              <button
                onClick={resetSaleFilters}
                className="w-1/3 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
              >
                تطبيق الفلاتر ({filteredSaleListings.length} آلية)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SaleFilterControls: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saleFilterOptions: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSaleFilterOptions: any;
  categoriesList: { id: MachineryCategory | 'all'; labelAr: string }[];
}> = ({ saleFilterOptions, setSaleFilterOptions, categoriesList }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Category */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">تصنيف الآلية:</label>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSaleFilterOptions((prev: any) => ({ ...prev, category: cat.id }))}
              className={`w-full text-right px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                saleFilterOptions.category === cat.id
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{cat.labelAr}</span>
              {saleFilterOptions.category === cat.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Condition (New vs Used) */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">حالة الآلية المعروضة:</label>
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setSaleFilterOptions((prev: any) => ({ ...prev, condition: 'all' }))}
            className={`py-1.5 rounded text-[11px] font-medium transition-colors ${
              saleFilterOptions.condition === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSaleFilterOptions((prev: any) => ({ ...prev, condition: 'used' }))}
            className={`py-1.5 rounded text-[11px] font-medium transition-colors ${
              saleFilterOptions.condition === 'used' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            مستعمل
          </button>
          <button
            onClick={() => setSaleFilterOptions((prev: any) => ({ ...prev, condition: 'new' }))}
            className={`py-1.5 rounded text-[11px] font-medium transition-colors ${
              saleFilterOptions.condition === 'new' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            جديد
          </button>
        </div>
      </div>

      {/* Governorate */}
      <div>
        <label htmlFor="sale-gov-filter" className="block text-slate-300 font-semibold mb-2">محافظة التواجد للمعاينة:</label>
        <select
          id="sale-gov-filter"
          value={saleFilterOptions.governorate}
          onChange={e => setSaleFilterOptions((prev: any) => ({ ...prev, governorate: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">كافة المحافظات العراقية</option>
          {IRAQI_GOVERNORATES.map(gov => (
            <option key={gov.id} value={gov.nameAr}>{gov.nameAr}</option>
          ))}
        </select>
      </div>

      {/* Seller Type */}
      <div>
        <label htmlFor="seller-type-filter" className="block text-slate-300 font-semibold mb-2">نوع جهة البيع:</label>
        <select
          id="seller-type-filter"
          value={saleFilterOptions.sellerType}
          onChange={e => setSaleFilterOptions((prev: any) => ({ ...prev, sellerType: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">كافة البائعين</option>
          <option value="dealership">وكالات ومعارض معتمدة فقط</option>
          <option value="company">شركات مقاولات</option>
          <option value="individual">ملاك معدات أفراد</option>
        </select>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-slate-300 font-semibold">الحد الأقصى للسعر المطلوب:</span>
          <span className="text-amber-400 font-mono font-bold tabular-nums">
            {formatIqd(saleFilterOptions.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="50000000"
          max="800000000"
          step="25000000"
          value={saleFilterOptions.maxPrice}
          onChange={e => setSaleFilterOptions((prev: any) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
          <span>50 مليون د.ع</span>
          <span>800 مليون د.ع</span>
        </div>
      </div>
    </div>
  );
};

const SaleCard: React.FC<{
  item: EquipmentSaleListing;
  onDetails: () => void;
  onInquiry: () => void;
}> = ({ item, onDetails, onInquiry }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group">
      <div>
        <div className="relative h-48 bg-slate-800 overflow-hidden cursor-pointer" onClick={onDetails}>
          <img
            src={item.imageUrl}
            alt={item.titleAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-white border border-slate-700">
            <span className={`w-1.5 h-1.5 rounded-full ${item.condition === 'new' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>{item.condition === 'new' ? 'جديد وكالة' : 'مستعمل'}</span>
          </div>

          <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 text-xs text-slate-200 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{item.governorate} — {item.city}</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-amber-400">{item.manufacturer}</span>
            <span aria-hidden="true">·</span>
            <span>طراز {item.year}</span>
            {item.condition === 'used' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{(item.operatingHours || 0).toLocaleString()} ساعة</span>
              </>
            )}
          </div>

          <h3
            onClick={onDetails}
            className="font-bold text-sm sm:text-base text-white hover:text-amber-400 cursor-pointer transition-colors line-clamp-2 leading-snug mb-3 font-heading"
          >
            {item.titleAr}
          </h3>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-3 text-[11px] text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">جهة البيع:</span>
              <span className="font-medium text-white flex items-center gap-1">
                <span>{item.sellerName}</span>
                {item.sellerVerified && (
                  <span title="معتمد">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">الجمرك والفحص:</span>
              <span className="text-emerald-400">{item.customsCleared ? 'مجمرك رسمي ✓' : 'قيد التخليص'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 block">السعر المطلوب للبيع:</span>
            <div className="text-base sm:text-lg font-bold text-amber-400 font-mono tabular-nums leading-tight">
              {formatIqd(item.askingPriceIqd)}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {formatUsdEquivalent(item.askingPriceIqd)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onDetails}
              className="px-3 py-1.5 rounded text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
            >
              معاينة
            </button>
            <button
              onClick={onInquiry}
              className="px-3 py-1.5 rounded text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400"
            >
              استفسار
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
