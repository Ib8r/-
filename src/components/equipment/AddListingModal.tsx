import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, PlusCircle, Tractor, MapPin, DollarSign, Wrench, FileText, CheckCircle2 } from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { MachineryCategory, IraqiGovernorate, EquipmentListing } from '../../types';

export const AddListingModal: React.FC = () => {
  const {
    isAddListingModalOpen,
    closeAddListingModal,
    addNewListing,
    currentUser,
    setActiveTab
  } = useApp();

  const [titleAr, setTitleAr] = useState('');
  const [category, setCategory] = useState<MachineryCategory>('excavator');
  const [manufacturer, setManufacturer] = useState('Caterpillar');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState(2022);
  const [powerHp, setPowerHp] = useState(300);
  const [weightTons, setWeightTons] = useState(24);
  const [capacity, setCapacity] = useState('1.5 م³ باكت حفر');
  const [governorate, setGovernorate] = useState<IraqiGovernorate>(currentUser?.governorate || 'بغداد');
  const [city, setCity] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [priceDailyIqd, setPriceDailyIqd] = useState(500000);
  const [priceWeeklyIqd, setPriceWeeklyIqd] = useState(3000000);
  const [priceMonthlyIqd, setPriceMonthlyIqd] = useState(11000000);
  const [withOperator, setWithOperator] = useState(true);
  const [operatorDailyFeeIqd, setOperatorDailyFeeIqd] = useState(40000);
  const [transportProvided, setTransportProvided] = useState(true);
  const [descriptionAr, setDescriptionAr] = useState('');
  const [selectedImage, setSelectedImage] = useState('/src/assets/images/machinix_hero_excavator_1793210155649.jpg');

  if (!isAddListingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addNewListing({
      providerId: currentUser?.id || 'prov-custom',
      providerName: currentUser?.companyName || currentUser?.fullName || 'مالك معدة مسجل',
      providerType: currentUser?.role === 'company' ? 'company' : 'individual',
      providerVerified: true,
      providerPhone: currentUser?.phone || '0770 123 4567',
      providerRating: 4.9,
      titleAr: titleAr || `معدة ${manufacturer} ${modelName} للإيجار`,
      titleEn: `${manufacturer} ${modelName} Heavy Machinery`,
      category,
      manufacturer,
      modelName: modelName || 'موديل حديث',
      specs: {
        operatingWeightTons: weightTons,
        powerHorsepower: powerHp,
        capacity,
        fuelType: 'diesel',
        year
      },
      priceDailyIqd,
      priceWeeklyIqd: priceWeeklyIqd || priceDailyIqd * 6,
      priceMonthlyIqd: priceMonthlyIqd || priceDailyIqd * 22,
      governorate,
      city: city || 'المنطقة الصناعية',
      locationAddress: locationAddress || 'ساحة وقوف الآليات',
      withOperator,
      operatorDailyFeeIqd: withOperator ? operatorDailyFeeIqd : 0,
      fuelPolicy: 'renter',
      minRentalDays: 2,
      transportProvided,
      transportFeeNote: transportProvided ? 'تتوفر ناقلة سحب متخصصة' : 'النقل على المستأجر',
      availabilityStatus: 'available',
      imageUrl: selectedImage,
      featured: false,
      descriptionAr: descriptionAr || 'معدة هندسية بحالة ممتازة جاهزة للعمل الفوري في كافة المشاريع الإنشائية.',
      rentalConditionsAr: [
        withOperator ? 'يشمل سائق فني مرخص وخبير.' : 'بدون سائق، فحص الزيوت يومياً إلزامي.',
        'الوقود والديزل على عاتق المستأجر في الموقع.'
      ]
    });

    closeAddListingModal();
    setActiveTab('catalog');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative my-auto">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              إضافة معدة أو آلية ثقيلة جديدة للإيجار
            </h2>
          </div>
          <button
            onClick={closeAddListingModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">عنوان الإعلان باللغة العربية:</label>
              <input
                type="text"
                required
                placeholder="مثال: حفارة كوماتسو PC220 هيدروليكية مع باكت صخري"
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
                <option value="other">مداحل ومضخات وكريدرات</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">الشركة المصنعة (الماركة):</label>
              <input
                type="text"
                required
                placeholder="مثال: Caterpillar, Komatsu, Volvo, Liebherr..."
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
                placeholder="مثال: 336D2, PC220-8, LTM 1070..."
                value={modelName}
                onChange={e => setModelName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">سنة الصنع (الموديل):</label>
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

          {/* Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">القدرة الحصانية (HP):</label>
              <input
                type="number"
                value={powerHp}
                onChange={e => setPowerHp(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">الوزن التشغيلي (طن):</label>
              <input
                type="number"
                value={weightTons}
                onChange={e => setWeightTons(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">سعة الدلو / الحمولة:</label>
              <input
                type="text"
                placeholder="مثال: 1.8 م³ باكت أو 500kVA"
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Location in Iraq */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">محافظة التواجد الحالية:</label>
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
              <label className="block text-slate-300 font-semibold mb-1">المدينة أو الحي الصناعي:</label>
              <input
                type="text"
                required
                placeholder="مثال: التاجي، خور الزبير، عين كاوة..."
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Pricing in IQD */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">السعر اليومي (د.ع):</label>
              <input
                type="number"
                step="25000"
                required
                value={priceDailyIqd}
                onChange={e => setPriceDailyIqd(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">السعر الأسبوعي (د.ع):</label>
              <input
                type="number"
                step="50000"
                value={priceWeeklyIqd}
                onChange={e => setPriceWeeklyIqd(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">السعر الشهري (د.ع):</label>
              <input
                type="number"
                step="100000"
                value={priceMonthlyIqd}
                onChange={e => setPriceMonthlyIqd(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Conditions & Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
            <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={withOperator}
                onChange={e => setWithOperator(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-semibold text-white block">إمكانية توفير سائق فني معتمد</span>
                <span className="text-[10px] text-slate-400">أجور السائق اليومية: 40,000 د.ع</span>
              </div>
            </label>

            <label className="flex items-center gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={transportProvided}
                onChange={e => setTransportProvided(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-semibold text-white block">توفر سطحة / ناقلة سحب للموقع</span>
                <span className="text-[10px] text-slate-400">تنسيق النقل الميداني للموقع</span>
              </div>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">وصف تفصيلي للآلية وحالتها:</label>
            <textarea
              rows={2}
              placeholder="ساعات العمل الحالية، جاهزية الهيدروليك والمحرك، شروط الموقع..."
              value={descriptionAr}
              onChange={e => setDescriptionAr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={closeAddListingModal}
              className="px-4 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
            >
              نشر الآلية في السوق العراقي
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
