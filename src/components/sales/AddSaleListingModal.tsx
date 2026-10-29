import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Tag, PlusCircle, Tractor, DollarSign, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { MachineryCategory, IraqiGovernorate, SaleCondition } from '../../types';

export const AddSaleListingModal: React.FC = () => {
  const {
    isAddSaleListingModalOpen,
    closeAddSaleListingModal,
    addNewSaleListing,
    currentUser,
    setActiveTab
  } = useApp();

  const [titleAr, setTitleAr] = useState('');
  const [category, setCategory] = useState<MachineryCategory>('excavator');
  const [manufacturer, setManufacturer] = useState('Caterpillar');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState(2021);
  const [condition, setCondition] = useState<SaleCondition>('used');
  const [operatingHours, setOperatingHours] = useState<number>(3200);
  const [askingPriceIqd, setAskingPriceIqd] = useState<number>(185000000); // 185M IQD
  const [isNegotiable, setIsNegotiable] = useState<boolean>(true);
  const [governorate, setGovernorate] = useState<IraqiGovernorate>(currentUser?.governorate || 'بغداد');
  const [city, setCity] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [customsCleared, setCustomsCleared] = useState<boolean>(true);
  const [inspectionReportAvailable, setInspectionReportAvailable] = useState<boolean>(true);
  const [warrantyMonths, setWarrantyMonths] = useState<number>(6);
  const [powerHp, setPowerHp] = useState<number>(280);
  const [weightTons, setWeightTons] = useState<number>(28);
  const [descriptionAr, setDescriptionAr] = useState('');
  const [selectedImage, setSelectedImage] = useState('/src/assets/images/machinix_hero_excavator_1793210155649.jpg');

  if (!isAddSaleListingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addNewSaleListing({
      titleAr: titleAr || `آلية ${manufacturer} ${modelName} للبيع`,
      titleEn: `${manufacturer} ${modelName} For Sale`,
      category,
      manufacturer,
      modelName: modelName || 'موديل حديث',
      year,
      condition,
      operatingHours: condition === 'new' ? 0 : operatingHours,
      askingPriceIqd,
      isNegotiable,
      governorate,
      city: city || 'المنطقة الصناعية',
      locationAddress: locationAddress || 'معرض الآليات',
      sellerType: currentUser?.role === 'company' ? 'dealership' : 'individual',
      sellerId: currentUser?.id || 'seller-custom',
      sellerName: currentUser?.companyName || currentUser?.fullName || 'مالك معتمد',
      sellerPhone: currentUser?.phone || '0770 123 4567',
      sellerVerified: true,
      specs: {
        operatingWeightTons: weightTons,
        powerHorsepower: powerHp,
        fuelType: 'diesel',
        year
      },
      warrantyMonths: condition === 'new' ? Math.max(12, warrantyMonths) : warrantyMonths,
      customsCleared,
      inspectionReportAvailable,
      imageUrl: selectedImage,
      descriptionAr: descriptionAr || 'معدة هندسية نظيفة جداً وخالية من أي حوادث، فحص كامل للمحرك والهيدروليك وجاهزة للمعاينة الميدانية.',
      status: 'active'
    });

    closeAddSaleListingModal();
    setActiveTab('sales');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              عرض آلية ومعدة ثقيلة للبيع في العراق
            </h2>
          </div>
          <button
            onClick={closeAddSaleListingModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          {/* Main info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">عنوان الإعلان للبيع باللغة العربية:</label>
              <input
                type="text"
                required
                placeholder="مثال: حفارة كوماتسو PC300-8 مستعملة بحالة الوكالة فحص كامل"
                value={titleAr}
                onChange={e => setTitleAr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">تصنيف الآلية:</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as MachineryCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="excavator">حفارات هيدروليكية</option>
                <option value="wheel_loader">شيافل ولوادر</option>
                <option value="crane">رافعات كرين وبرجية</option>
                <option value="generator">مولدات كهرباء ديزل</option>
                <option value="bulldozer">بلدوزرات تسوية</option>
                <option value="dump_truck">شاحنات قلاب / لوريات</option>
                <option value="forklift">رافعات شوكية</option>
                <option value="other">معدات ثقيلة أخرى</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">الشركة المصنعة (الماركة):</label>
              <input
                type="text"
                required
                placeholder="Caterpillar, Komatsu, Volvo, Liebherr..."
                value={manufacturer}
                onChange={e => setManufacturer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">اسم الموديل / الطراز:</label>
              <input
                type="text"
                required
                placeholder="مثال: PC300-8, 988K, D8R..."
                value={modelName}
                onChange={e => setModelName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">سنة الصنع:</label>
              <input
                type="number"
                min="1995"
                max="2026"
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Condition & Operating Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">حالة الآلية:</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value as SaleCondition)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="used">مستعمل مجرب</option>
                <option value="new">جديد وكالة (صفر ساعة)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">ساعات التشغيل (Meter Hours):</label>
              <input
                type="number"
                disabled={condition === 'new'}
                value={condition === 'new' ? 0 : operatingHours}
                onChange={e => setOperatingHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">الضمان (أشهر):</label>
              <input
                type="number"
                min="0"
                max="36"
                value={warrantyMonths}
                onChange={e => setWarrantyMonths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Asking Price in IQD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">السعر المطلوب للبيع بالدينار العراقي (IQD):</label>
              <input
                type="number"
                step="1000000"
                required
                value={askingPriceIqd}
                onChange={e => setAskingPriceIqd(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                {askingPriceIqd.toLocaleString()} دينار عراقي
              </span>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={isNegotiable}
                  onChange={e => setIsNegotiable(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700"
                />
                <span>السعر قابل للتفاوض البسيط بعد المعاينة</span>
              </label>
            </div>
          </div>

          {/* Location in Iraq */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">محافظة تواجد الآلية للمعاينة:</label>
              <select
                value={governorate}
                onChange={e => setGovernorate(e.target.value as IraqiGovernorate)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {IRAQI_GOVERNORATES.map(g => (
                  <option key={g.id} value={g.nameAr}>{g.nameAr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">المدينة أو الحي الصناعي / المعرض:</label>
              <input
                type="text"
                required
                placeholder="مثال: معارض أربيل، التاجي، ساحة الخور..."
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Legal / Technical checks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
            <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={customsCleared}
                onChange={e => setCustomsCleared(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-semibold text-white block">مجمركة وخاضعة للرسوم الرسمية</span>
                <span className="text-[10px] text-slate-400">تحمل أوراق جمركية نافذة في العراق</span>
              </div>
            </label>

            <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inspectionReportAvailable}
                onChange={e => setInspectionReportAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-semibold text-white block">يتوفر تقرير فحص هندسي حديث</span>
                <span className="text-[10px] text-slate-400">فحص ضغط الهيدروليك والمحرك والشاصي</span>
              </div>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">وصف الآلية وحالتها الفنية:</label>
            <textarea
              rows={2}
              placeholder="تاريخ الاستيراد، تفاصيل الصيانة، سبب البيع، إمكانية المعاينة..."
              value={descriptionAr}
              onChange={e => setDescriptionAr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={closeAddSaleListingModal}
              className="px-4 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
            >
              نشر إعلان البيع في السوق
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
