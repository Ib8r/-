import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShoppingBag,
  Tag,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle2,
  Package,
  Layers,
  Wrench
} from 'lucide-react';
import { IraqiGovernorate, PartCategory, PartCondition, PartAvailability } from '../../types';

const PART_CATEGORIES: { id: PartCategory; label: string }[] = [
  { id: 'hydraulic_pumps', label: 'مضخات وبساتن هيدروليكية' },
  { id: 'engine_filters', label: 'فلاتر ومكونات محركات ديزل' },
  { id: 'undercarriage_tracks', label: 'جنازير وسلاسل وبكرات سحب' },
  { id: 'bucket_teeth', label: 'أسنان باكت وشفرات حفر صخري' },
  { id: 'electrical_sensors', label: 'حساسات ولوحات كمبيوتر' },
  { id: 'transmission_gears', label: 'مسننات وجيربوكس وكلتشات' }
];

const IRAQI_GOVERNORATES: IraqiGovernorate[] = [
  'بغداد', 'البصرة', 'أربيل', 'نينوى', 'السليمانية', 'دهوك',
  'كركوك', 'الأنبار', 'النجف', 'كربلاء', 'بابل', 'ديالى',
  'واسط', 'ميسان', 'ذي قار', 'المثنى', 'القادسية', 'صلاح الدين'
];

export const CreateSparePartModal: React.FC = () => {
  const {
    isCreatePartModalOpen,
    closeCreatePartModal,
    editingPart,
    createSparePartListing,
    updateSparePartListing,
    currentUser
  } = useApp();

  const [titleAr, setTitleAr] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [category, setCategory] = useState<PartCategory>('hydraulic_pumps');
  const [brand, setBrand] = useState('Caterpillar Genuine');
  const [condition, setCondition] = useState<PartCondition>('new');
  const [availability, setAvailability] = useState<PartAvailability>('in_stock');
  const [priceIqd, setPriceIqd] = useState(1500000);
  const [quantityAvailable, setQuantityAvailable] = useState(5);
  const [compatibleMachinesAr, setCompatibleMachinesAr] = useState('');
  const [governorate, setGovernorate] = useState<IraqiGovernorate>('بغداد');
  const [city, setCity] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [warrantyPeriodAr, setWarrantyPeriodAr] = useState('ضمان تشغيلي 6 أشهر');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingPart) {
      setTitleAr(editingPart.titleAr);
      setPartNumber(editingPart.partNumber);
      setCategory(editingPart.category);
      setBrand(editingPart.brand);
      setCondition(editingPart.condition);
      setAvailability(editingPart.availability);
      setPriceIqd(editingPart.priceIqd);
      setQuantityAvailable(editingPart.quantityAvailable);
      setCompatibleMachinesAr(editingPart.compatibleMachinesAr);
      setGovernorate(editingPart.governorate);
      setCity(editingPart.city);
      setStoreLocation(editingPart.storeLocation);
      setPhone(editingPart.storePhone);
      setImageUrl(editingPart.imageUrl);
      setDescriptionAr(editingPart.descriptionAr);
      setWarrantyPeriodAr(editingPart.warrantyPeriodAr || '');
    } else {
      setTitleAr('');
      setPartNumber('');
      setCategory('hydraulic_pumps');
      setBrand('Caterpillar Genuine');
      setCondition('new');
      setAvailability('in_stock');
      setPriceIqd(1250000);
      setQuantityAvailable(4);
      setCompatibleMachinesAr('حفارات كوماتسو PC200 إلى PC360');
      setGovernorate(currentUser?.governorate || 'بغداد');
      setCity(currentUser?.city || 'السنك - شارع الرشيد الصناعي');
      setStoreLocation('سوق قطع غيار المعدات الثقيلة، محلة السنك');
      setPhone(currentUser?.phone || '0770 333 4455');
      setImageUrl('/src/assets/images/machinix_hero_excavator_1793210155649.jpg');
      setDescriptionAr('');
      setWarrantyPeriodAr('ضمان تشغيلي 6 أشهر');
    }
    setErrors({});
  }, [editingPart, isCreatePartModalOpen, currentUser]);

  if (!isCreatePartModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!titleAr.trim() || titleAr.trim().length < 5) {
      errs.titleAr = 'يرجى إدخال اسم تفصيلي للقطعة (5 أحرف على الأقل).';
    }
    if (!partNumber.trim()) {
      errs.partNumber = 'رقم القطعة OEM مطلوب لتمكين المقاولين من المطابقة الفنية.';
    }
    if (!brand.trim()) {
      errs.brand = 'يرجى تحديد الشركة المصنعة أو العلامة التجارية.';
    }
    if (!compatibleMachinesAr.trim()) {
      errs.compatibleMachinesAr = 'يرجى كتابة طرازات الآليات المتوافقة (مثال: كوماتسو PC200).';
    }
    if (priceIqd <= 0) {
      errs.priceIqd = 'يرجى تحديد السعر بالدينار العراقي (IQD).';
    }
    if (quantityAvailable < 0) {
      errs.quantityAvailable = 'الكمية المتوفرة لا يمكن أن تكون سالبة.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const storeName = currentUser?.companyName || currentUser?.fullName || 'متجر قطع غيار معتمد';

    if (editingPart) {
      updateSparePartListing(editingPart.id, {
        titleAr: titleAr.trim(),
        partNumber: partNumber.trim(),
        category,
        brand: brand.trim(),
        condition,
        availability,
        priceIqd,
        quantityAvailable,
        compatibleMachinesAr: compatibleMachinesAr.trim(),
        governorate,
        city: city.trim(),
        storeLocation: storeLocation.trim(),
        storePhone: phone.trim(),
        imageUrl: imageUrl.trim() || '/src/assets/images/machinix_hero_excavator_1793210155649.jpg',
        descriptionAr: descriptionAr.trim() || titleAr.trim(),
        warrantyPeriodAr: warrantyPeriodAr.trim()
      });
    } else {
      createSparePartListing({
        partNumber: partNumber.trim(),
        titleAr: titleAr.trim(),
        titleEn: titleAr.trim(),
        category,
        brand: brand.trim(),
        condition,
        availability,
        priceIqd,
        quantityAvailable,
        compatibleMachinesAr: compatibleMachinesAr.trim(),
        storeId: currentUser?.id || 'shop-demo',
        storeName,
        storePhone: phone.trim(),
        storeVerified: true,
        governorate,
        city: city.trim(),
        storeLocation: storeLocation.trim(),
        imageUrl: imageUrl.trim() || '/src/assets/images/machinix_hero_excavator_1793210155649.jpg',
        descriptionAr: descriptionAr.trim() || titleAr.trim(),
        warrantyPeriodAr: warrantyPeriodAr.trim(),
        status: 'active'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-heading">
                {editingPart ? 'تعديل بيانات قطعة الغيار' : 'إدراج قطعة غيار جديدة في السوق'}
              </h2>
              <p className="text-[11px] text-slate-400">
                تسجيل القطعة برقم OEM والتوافق الهندسي لتسهيل وصول المقاولين إليها
              </p>
            </div>
          </div>
          <button
            onClick={closeCreatePartModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title & OEM Part Number */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                اسم القطعة بالعربية <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={titleAr}
                onChange={e => setTitleAr(e.target.value)}
                placeholder="مثال: مضخة هيدروليكية رئيسية كوماتسو دبل روتور"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {errors.titleAr && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.titleAr}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                رقم القطعة OEM <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={partNumber}
                onChange={e => setPartNumber(e.target.value)}
                placeholder="CAT-384-0678"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {errors.partNumber && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.partNumber}</span>
              )}
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                تصنيف القطعة
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as PartCategory)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {PART_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                المصنّع أو الماركة <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="Caterpillar Genuine, Komatsu, Donaldson, Bosch"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {errors.brand && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.brand}</span>
              )}
            </div>
          </div>

          {/* Condition & Availability Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                حالة القطعة (Condition)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'new', label: 'جديد أصلي' },
                  { id: 'used', label: 'مستعمل' },
                  { id: 'refurbished', label: 'مجدد' }
                ].map(cond => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setCondition(cond.id as PartCondition)}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-colors ${
                      condition === cond.id
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                حالة التوفر (Availability)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'in_stock', label: 'متوفر فوراً' },
                  { id: 'limited_stock', label: 'كمية محدودة' },
                  { id: 'out_of_stock', label: 'نفد المخزون' }
                ].map(avail => (
                  <button
                    key={avail.id}
                    type="button"
                    onClick={() => setAvailability(avail.id as PartAvailability)}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-colors ${
                      availability === avail.id
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {avail.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                السعر بالدينار العراقي (IQD) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                step={50000}
                value={priceIqd}
                onChange={e => setPriceIqd(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
              {errors.priceIqd && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.priceIqd}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                الكمية المتوفرة في المخزن <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min={0}
                value={quantityAvailable}
                onChange={e => {
                  const qty = Number(e.target.value);
                  setQuantityAvailable(qty);
                  if (qty === 0) setAvailability('out_of_stock');
                  else if (qty <= 2) setAvailability('limited_stock');
                  else setAvailability('in_stock');
                }}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
              {errors.quantityAvailable && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.quantityAvailable}</span>
              )}
            </div>
          </div>

          {/* Compatibility */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              الآليات والطرازات المتوافقة <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={compatibleMachinesAr}
              onChange={e => setCompatibleMachinesAr(e.target.value)}
              placeholder="مثال: حفارات كوماتسو PC200-8, PC220, وشيافل WA470"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            {errors.compatibleMachinesAr && (
              <span className="text-[11px] text-rose-400 block mt-1">{errors.compatibleMachinesAr}</span>
            )}
          </div>

          {/* Store Location & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                المحافظة
              </label>
              <select
                value={governorate}
                onChange={e => setGovernorate(e.target.value as IraqiGovernorate)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {IRAQI_GOVERNORATES.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                موقع المتجر أو المستودع
              </label>
              <input
                type="text"
                value={storeLocation}
                onChange={e => setStoreLocation(e.target.value)}
                placeholder="السنك، الشيخ عمر، أو المنطقة الحرفية بأربيل"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Description & Warranty */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              الوصف الفني وشروط الضمان
            </label>
            <textarea
              rows={3}
              value={descriptionAr}
              onChange={e => setDescriptionAr(e.target.value)}
              placeholder="تفاصيل بلد المنشأ، شهادة الجودة، معايير التحمل الحراري، والضمان..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={closeCreatePartModal}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{editingPart ? 'حفظ التعديلات' : 'إدراج القطعة في السوق'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
