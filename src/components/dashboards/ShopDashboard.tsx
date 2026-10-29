import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SparePartItem } from '../../types';
import { CreateSparePartModal } from '../parts/CreateSparePartModal';

export const ShopDashboard: React.FC = () => {
  const {
    currentUser,
    spareParts,
    deleteSparePart,
    updateSparePartStock,
    toggleSparePartStatus,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<SparePartItem | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCondition, setFilterCondition] = useState<string>('all');
  const [filterAvailability, setFilterAvailability] = useState<string>('all');

  // Filter parts owned by this shop (or demo fallback)
  const myParts = spareParts.filter(
    (p) => p.shopId === currentUser.id || p.shopId === 'shop-01'
  );

  const filteredParts = myParts.filter((part) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = part.title.toLowerCase().includes(q);
      const matchOem = part.oemPartNumber?.toLowerCase().includes(q);
      const matchBrand = part.brand?.toLowerCase().includes(q);
      if (!matchTitle && !matchOem && !matchBrand) return false;
    }
    if (filterCondition !== 'all' && part.condition !== filterCondition) return false;
    if (filterAvailability !== 'all' && part.availability !== filterAvailability) return false;
    return true;
  });

  const handleEdit = (part: SparePartItem) => {
    setEditingPart(part);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPart(undefined);
    setIsModalOpen(true);
  };

  const inStockCount = myParts.filter((p) => p.availability === 'in_stock').length;
  const outOfStockCount = myParts.filter((p) => p.availability === 'out_of_stock').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-sky-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-3xl font-black text-cyan-300">
              ⚙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">
                  {currentUser.companyName || currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  متجر قطع غيار معتمد
                </span>
              </div>
              <p className="text-cyan-100 text-sm mt-1">
                {currentUser.governorate} · لوحة إدارة المخزون والمبيعات المباشرة
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>+</span>
              <span>إدراج قطعة غيار جديدة</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-cyan-700/40 text-center">
          <div className="bg-black/25 rounded-xl p-3">
            <div className="text-2xl font-black text-white">{myParts.length}</div>
            <div className="text-xs text-cyan-200 mt-0.5">إجمالي المعروضات</div>
          </div>
          <div className="bg-black/25 rounded-xl p-3">
            <div className="text-2xl font-black text-emerald-400">{inStockCount}</div>
            <div className="text-xs text-cyan-200 mt-0.5">متوفر في المستودع</div>
          </div>
          <div className="bg-black/25 rounded-xl p-3">
            <div className="text-2xl font-black text-rose-400">{outOfStockCount}</div>
            <div className="text-xs text-cyan-200 mt-0.5">نفد من المخزون</div>
          </div>
          <div className="bg-black/25 rounded-xl p-3">
            <div className="text-2xl font-black text-white">
              {currentUser.governorate}
            </div>
            <div className="text-xs text-cyan-200 mt-0.5">نطاق التوريد الرئيسي</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث باسم القطعة، رقم OEM، أو الماركة..."
            className="w-full pr-10 pl-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="all">كافة الحالات</option>
            <option value="new">جديد أصلي / تجاري</option>
            <option value="used">مستعمل مفحوص</option>
            <option value="refurbished">مجدد مع ضمان</option>
          </select>

          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="all">كافة حالات التوفر</option>
            <option value="in_stock">متوفر في المتجر</option>
            <option value="limited_stock">كمية محدودة</option>
            <option value="out_of_stock">نفد المخزون</option>
          </select>
        </div>
      </div>

      {/* Inventory Table / Cards */}
      {filteredParts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center text-3xl">
            📦
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            لا توجد قطع غيار مطابقة
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
            أضف قطع الغيار المتوفرة لديك مع رقم القطعة والسعر بالدينار لتظهر للمشترين في المحافظات العراقية.
          </p>
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-bold shadow-sm cursor-pointer"
          >
            إضافة أول قطعة غيار
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredParts.map((part) => {
            const conditionLabel =
              part.condition === 'new'
                ? 'جديد'
                : part.condition === 'refurbished'
                ? 'مجدد مع ضمان'
                : 'مستعمل';

            const availabilityLabel =
              part.availability === 'in_stock'
                ? 'متوفر'
                : part.availability === 'limited_stock'
                ? 'كمية محدودة'
                : 'نفد';

            const availabilityColor =
              part.availability === 'in_stock'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                : part.availability === 'limited_stock'
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-800';

            return (
              <div
                key={part.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={part.images[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'}
                    alt={part.title}
                    className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-100 dark:border-slate-800"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        {part.title}
                      </h3>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${availabilityColor}`}>
                        {availabilityLabel} ({part.quantityAvailable ?? 1} قطعة)
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {conditionLabel}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3">
                      {part.oemPartNumber && (
                        <span>
                          رقم القطعة: <strong className="font-mono text-slate-700 dark:text-slate-300">{part.oemPartNumber}</strong>
                        </span>
                      )}
                      {part.brand && <span>الماركة: {part.brand}</span>}
                      {part.compatibleMachinery && part.compatibleMachinery.length > 0 && (
                        <span>متوافق مع: {part.compatibleMachinery.join(', ')}</span>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-3 pt-1">
                      <span>آخر تحديث: {part.lastUpdated || 'اليوم'}</span>
                      <span>·</span>
                      <span>الحالة: {part.status === 'active' ? 'نشط في السوق' : 'موقوف مؤقتاً'}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Action Controls */}
                <div className="flex flex-col md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-lg font-black text-cyan-600 dark:text-cyan-400">
                    {part.priceIqd.toLocaleString('ar-IQ')}{' '}
                    <span className="text-xs font-normal text-slate-500">د.ع</span>
                  </div>

                  {/* Stock quick-toggle buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() =>
                        updateSparePartStock(
                          part.id,
                          part.availability === 'in_stock' ? 'out_of_stock' : 'in_stock',
                          part.availability === 'in_stock' ? 0 : 5
                        )
                      }
                      className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      {part.availability === 'in_stock' ? 'تحديد كنفد' : 'تحديد كمتوفر'}
                    </button>

                    <button
                      onClick={() => toggleSparePartStatus(part.id)}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      {part.status === 'active' ? 'إيقاف مؤقت' : 'تفعيل'}
                    </button>

                    <button
                      onClick={() => handleEdit(part)}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-900/60 hover:bg-cyan-100 cursor-pointer"
                    >
                      تعديل
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذه القطعة؟')) {
                          deleteSparePart(part.id);
                        }
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      <CreateSparePartModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPart(undefined);
        }}
        initialData={editingPart}
      />
    </div>
  );
};
