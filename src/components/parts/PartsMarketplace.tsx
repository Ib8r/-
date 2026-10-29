import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Wrench,
  Package,
  MapPin,
  Check,
  Phone,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { PartCategory, IraqiGovernorate, SparePartItem } from '../../types';
import { formatIqd } from '../../utils/formatters';
import { CreateSparePartModal } from './CreateSparePartModal';

export const PartsMarketplace: React.FC = () => {
  const {
    filteredSpareParts,
    partFilterOptions,
    setPartFilterOptions,
    resetPartFilters,
    openPartDetails,
    openInquiryModal
  } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categoriesList: { id: PartCategory | 'all'; labelAr: string }[] = [
    { id: 'all', labelAr: 'كافة قطع الغيار' },
    { id: 'hydraulic_pumps', labelAr: 'مضخات وبساتن هيدروليكية' },
    { id: 'engine_filters', labelAr: 'فلاتر ومحركات ديزل' },
    { id: 'undercarriage_tracks', labelAr: 'سلاسل وجنازير وبكرات' },
    { id: 'bucket_teeth', labelAr: 'أسنان باكت وشفرات صلبة' },
    { id: 'electrical_sensors', labelAr: 'حساسات وبخاخات كهربائية' },
    { id: 'transmission_gears', labelAr: 'مسننات وكلتشات جيربوكس' }
  ];

  const activeCount = [
    partFilterOptions.category !== 'all',
    partFilterOptions.governorate !== 'all',
    partFilterOptions.brand.trim() !== '',
    partFilterOptions.searchQuery.trim() !== '',
    partFilterOptions.inStockOnly,
    partFilterOptions.maxPrice < 20000000
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
              <span>سوق قطع غيار المعدات الثقيلة في العراق</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">قطع أصلية وتجارية موثقة برقم القطعة</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              سوق قطع الغيار والمكونات الهندسية
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              ابحث عن طرمبات الهيدروليك، الفلاتر، سلاسل الجنازير، وأسنان الباكت في أسواق بغداد وأربيل والبصرة
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>+</span>
              <span>إدراج قطعة غيار</span>
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:border-amber-500 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>فلاتر القطع</span>
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
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
                  <Filter className="w-4 h-4 text-amber-500" />
                  <span>تصفية قطع الغيار</span>
                </div>
                {activeCount > 0 && (
                  <button
                    onClick={resetPartFilters}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>إعادة ضبط</span>
                  </button>
                )}
              </div>

              <PartFilterControls
                partFilterOptions={partFilterOptions}
                setPartFilterOptions={setPartFilterOptions}
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
                  placeholder="ابحث باسم القطعة، رقم Part Number، الموديل..."
                  value={partFilterOptions.searchQuery}
                  onChange={e => setPartFilterOptions(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pr-9 pl-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                {partFilterOptions.searchQuery && (
                  <button
                    onClick={() => setPartFilterOptions(prev => ({ ...prev, searchQuery: '' }))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
                <span>ترتيب حسب:</span>
                <select
                  value={partFilterOptions.sortBy}
                  onChange={e =>
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setPartFilterOptions(prev => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="bg-slate-950 border border-slate-700 rounded py-1 px-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="popular">الأكثر طلباً</option>
                  <option value="price_asc">السعر: من الأقل للأعلى</option>
                  <option value="price_desc">السعر: من الأعلى للأقل</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredSpareParts.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <Package className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  لا توجد قطع غيار مطابقة للبحث
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
                  تأكد من كتابة رقم القطعة بشكل صحيح أو جرب البحث باسم المعدة المتوافقة.
                </p>
                <button
                  onClick={resetPartFilters}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                >
                  إعادة ضبط فلاتر قطع الغيار
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSpareParts.map(part => (
                  <PartCard
                    key={part.id}
                    part={part}
                    onDetails={() => openPartDetails(part.id)}
                    onInquiry={() =>
                      openInquiryModal({
                        targetType: 'spare_part',
                        targetId: part.id,
                        targetTitle: part.titleAr,
                        targetPriceIqd: part.priceIqd,
                        targetProviderName: part.storeName,
                        targetProviderPhone: part.storePhone
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
                  <span>فلاتر قطع الغيار</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                  aria-label="إغلاق الفلاتر"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <PartFilterControls
                partFilterOptions={partFilterOptions}
                setPartFilterOptions={setPartFilterOptions}
                categoriesList={categoriesList}
              />
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
              <button
                onClick={resetPartFilters}
                className="w-1/3 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
              >
                تطبيق الفلاتر ({filteredSpareParts.length} قطعة)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Spare Part Modal */}
      <CreateSparePartModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

const PartFilterControls: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  partFilterOptions: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPartFilterOptions: any;
  categoriesList: { id: PartCategory | 'all'; labelAr: string }[];
}> = ({ partFilterOptions, setPartFilterOptions, categoriesList }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Category */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">قسم القطعة:</label>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setPartFilterOptions((prev: any) => ({ ...prev, category: cat.id }))}
              className={`w-full text-right px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                partFilterOptions.category === cat.id
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{cat.labelAr}</span>
              {partFilterOptions.category === cat.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Governorate */}
      <div>
        <label htmlFor="parts-gov-filter" className="block text-slate-300 font-semibold mb-2">محافظة المتجر والمخزن:</label>
        <select
          id="parts-gov-filter"
          value={partFilterOptions.governorate}
          onChange={e => setPartFilterOptions((prev: any) => ({ ...prev, governorate: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">كافة المحافظات</option>
          {IRAQI_GOVERNORATES.map(gov => (
            <option key={gov.id} value={gov.nameAr}>{gov.nameAr}</option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label htmlFor="parts-brand-input" className="block text-slate-300 font-semibold mb-1">الماركة أو الشركة المصنعة:</label>
        <input
          id="parts-brand-input"
          type="text"
          placeholder="مثال: Caterpillar, Donaldson, Bosch, ITR..."
          value={partFilterOptions.brand}
          onChange={e => setPartFilterOptions((prev: any) => ({ ...prev, brand: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Condition Filter */}
      <div>
        <label htmlFor="parts-condition-filter" className="block text-slate-300 font-semibold mb-1">حالة القطعة:</label>
        <select
          id="parts-condition-filter"
          value={partFilterOptions.condition || 'all'}
          onChange={e => setPartFilterOptions((prev: any) => ({ ...prev, condition: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">كافة الحالات</option>
          <option value="new">جديد أصلي / تجاري</option>
          <option value="used">مستعمل مفحوص</option>
          <option value="refurbished">مجدد مع ضمان</option>
        </select>
      </div>

      {/* Availability Filter */}
      <div>
        <label htmlFor="parts-avail-filter" className="block text-slate-300 font-semibold mb-1">حالة التوفر بالمستودع:</label>
        <select
          id="parts-avail-filter"
          value={partFilterOptions.availability || 'all'}
          onChange={e => setPartFilterOptions((prev: any) => ({ ...prev, availability: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">كافة حالات التوفر</option>
          <option value="in_stock">متوفر في المتجر</option>
          <option value="limited_stock">كمية محدودة</option>
          <option value="out_of_stock">غير متوفر (طلب مسبق)</option>
        </select>
      </div>

      {/* In Stock Only */}
      <div className="pt-2 border-t border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={partFilterOptions.inStockOnly}
            onChange={e => setPartFilterOptions((prev: any) => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
          />
          <span>المتوفر بالمخزن حالياً فقط (جاهز للتسليم)</span>
        </label>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-slate-300 font-semibold">الحد الأقصى للسعر:</span>
          <span className="text-amber-400 font-mono font-bold tabular-nums">
            {formatIqd(partFilterOptions.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="100000"
          max="20000000"
          step="500000"
          value={partFilterOptions.maxPrice}
          onChange={e => setPartFilterOptions((prev: any) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
          <span>100 ألف د.ع</span>
          <span>20 مليون د.ع</span>
        </div>
      </div>
    </div>
  );
};

const PartCard: React.FC<{
  part: SparePartItem;
  onDetails: () => void;
  onInquiry: () => void;
}> = ({ part, onDetails, onInquiry }) => {
  const conditionLabel =
    part.condition === 'new'
      ? 'جديد'
      : part.condition === 'refurbished'
      ? 'مجدد مع ضمان'
      : 'مستعمل';

  const availabilityLabel =
    part.availability === 'in_stock'
      ? `متوفر (${part.quantityAvailable ?? part.stockQuantity ?? 1} قطع)`
      : part.availability === 'limited_stock'
      ? `كمية محدودة (${part.quantityAvailable ?? part.stockQuantity ?? 1})`
      : 'نفد من المخزون';

  const availabilityColor =
    part.availability === 'in_stock'
      ? 'bg-emerald-500/90 text-white'
      : part.availability === 'limited_stock'
      ? 'bg-amber-500/90 text-slate-950'
      : 'bg-rose-500/90 text-white';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group">
      <div>
        <div className="relative h-40 bg-slate-800 overflow-hidden cursor-pointer" onClick={onDetails}>
          <img
            src={part.imageUrl || part.images?.[0]}
            alt={part.titleAr || part.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded backdrop-blur-md text-[10px] font-bold border border-slate-700 shadow-sm">
            <span className={`px-1.5 py-0.5 rounded ${availabilityColor}`}>
              {availabilityLabel}
            </span>
            <span className="bg-slate-950/80 text-amber-300 px-1.5 py-0.5 rounded">
              {conditionLabel}
            </span>
          </div>

          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] text-slate-200 drop-shadow">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{part.governorate} — {part.city}</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-amber-400">{part.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-300">P/N: {part.partNumber || part.oemPartNumber}</span>
          </div>

          <h3
            onClick={onDetails}
            className="font-bold text-sm text-white hover:text-amber-400 cursor-pointer transition-colors line-clamp-2 leading-snug mb-2 font-heading"
          >
            {part.titleAr || part.title}
          </h3>

          <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 mb-2 text-[11px] text-slate-300">
            <span className="text-slate-500 block text-[10px]">الآليات المتوافقة:</span>
            <span className="font-medium text-white line-clamp-1">
              {part.compatibleMachinesAr || part.compatibleMachinery?.join(', ')}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>المتجر: <strong className="text-slate-200">{part.storeName}</strong></span>
            <div className="flex items-center gap-1">
              {part.lastUpdated && (
                <span className="text-[10px] text-slate-500 font-mono">
                  تحديث: {part.lastUpdated}
                </span>
              )}
              {part.storeVerified && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 block">السعر النقدي:</span>
            <div className="text-sm sm:text-base font-bold text-white font-mono tabular-nums leading-tight">
              {formatIqd(part.priceIqd)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onDetails}
              className="px-2.5 py-1.5 rounded text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
            >
              التفاصيل
            </button>
            <button
              onClick={onInquiry}
              className="px-3 py-1.5 rounded text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400"
            >
              طلب شراء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
