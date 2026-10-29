import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  ShieldCheck,
  Heart,
  Calendar,
  Truck,
  Fuel,
  User,
  Wrench,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { formatIqd, formatUsdEquivalent, getCategoryNameAr } from '../../utils/formatters';

export const EquipmentDetailModal: React.FC = () => {
  const {
    selectedEquipment,
    closeEquipmentDetails,
    openBookingModal,
    openProviderProfile,
    toggleFavorite,
    isFavorite
  } = useApp();

  if (!selectedEquipment) return null;

  const isFav = isFavorite(selectedEquipment.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-500 font-mono">
              {getCategoryNameAr(selectedEquipment.category)}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">
              {selectedEquipment.manufacturer} — {selectedEquipment.modelName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(selectedEquipment.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFav
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-slate-950' : ''}`} />
            </button>
            <button
              onClick={closeEquipmentDetails}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Visual & Title */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image Container */}
            <div className="md:col-span-7 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[16/10] relative">
              <img
                src={selectedEquipment.imageUrl}
                alt={selectedEquipment.titleAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-white">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{selectedEquipment.governorate} — {selectedEquipment.city}</span>
              </div>
            </div>

            {/* Quick Price Card */}
            <div className="md:col-span-5 bg-slate-950 border border-slate-800/90 rounded-xl p-5 space-y-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">تسعير الإيجار القياسي في العراق:</span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums leading-tight">
                  {formatIqd(selectedEquipment.priceDailyIqd)}
                  <span className="text-xs font-normal text-slate-400 mr-1">/ يوم</span>
                </div>
                <div className="text-xs text-amber-400 font-mono mt-0.5">
                  {formatUsdEquivalent(selectedEquipment.priceDailyIqd)} تقريباً
                </div>
              </div>

              {/* Weekly & Monthly rates */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800">
                <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">الإيجار الأسبوعي:</span>
                  <span className="font-bold text-white font-mono tabular-nums">
                    {formatIqd(selectedEquipment.priceWeeklyIqd)}
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">الإيجار الشهري (خصم خاص):</span>
                  <span className="font-bold text-white font-mono tabular-nums">
                    {formatIqd(selectedEquipment.priceMonthlyIqd)}
                  </span>
                </div>
              </div>

              {/* Provider preview badge */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">مالك المعدة / المزود:</span>
                  <div className="font-bold text-xs text-white flex items-center gap-1.5">
                    <span>{selectedEquipment.providerName}</span>
                    {selectedEquipment.providerVerified && (
                      <span title="مزود معتمد وموثق">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => openProviderProfile(selectedEquipment.providerId)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <span>الملف</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Primary Booking Trigger */}
              <button
                onClick={() => {
                  closeEquipmentDetails();
                  openBookingModal(selectedEquipment);
                }}
                className="w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99]"
              >
                <Calendar className="w-4 h-4" />
                <span>طلب استئجار الآلية الآن</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-white mb-2 font-heading">وصف الآلية والغرض الإنشائي</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {selectedEquipment.descriptionAr}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 font-heading flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>المواصفات الفنية والميكانيكية للآلية</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">الوزن التشغيلي:</span>
                <span className="font-bold text-white font-mono text-sm">
                  {selectedEquipment.specs.operatingWeightTons > 0 ? `${selectedEquipment.specs.operatingWeightTons} طن` : '-'}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">القدرة الحصانية:</span>
                <span className="font-bold text-white font-mono text-sm">{selectedEquipment.specs.powerHorsepower} HP</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">سنة الصنع:</span>
                <span className="font-bold text-white font-mono text-sm">{selectedEquipment.specs.year}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">نوع الوقود:</span>
                <span className="font-bold text-white text-sm">ديزل صناعي</span>
              </div>
              {selectedEquipment.specs.capacity && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 col-span-2">
                  <span className="text-slate-500 block text-[11px]">سعة الباكت / الحمولة:</span>
                  <span className="font-bold text-white text-sm">{selectedEquipment.specs.capacity}</span>
                </div>
              )}
              {selectedEquipment.specs.maxReachMeters && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 col-span-2">
                  <span className="text-slate-500 block text-[11px]">أقصى مدى وصول (بوم):</span>
                  <span className="font-bold text-white text-sm">{selectedEquipment.specs.maxReachMeters} متراً</span>
                </div>
              )}
            </div>
          </div>

          {/* Rental Conditions & Guidelines */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 font-heading flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>شروط ومحددات التشغيل في الموقع</span>
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>المشغل والسائق:</strong> {selectedEquipment.withOperator ? 'يتوفر مشغل فني معتمد (أجور المشغل الإضافية اليومية: ' + formatIqd(selectedEquipment.operatorDailyFeeIqd) + ')' : 'المعدة تُسلّم بدون سائق، ويلزم توفير مشغل مرخص.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Fuel className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>سياسة الوقود:</strong> {selectedEquipment.fuelPolicy === 'renter' ? 'توفير الديزل والزيوت اليومية على عاتق الشركة المستأجرة.' : 'الوقود والتشغيل مشمول بالسعر اليومي.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>النقل والسطحة:</strong> {selectedEquipment.transportProvided ? selectedEquipment.transportFeeNote || 'تتوفر ناقلة سحب هيدروليكية حسب المسافة' : 'نقل وسحب المعدة إلى الموقع مسؤولية المستأجر.'}
                </span>
              </div>

              {selectedEquipment.rentalConditionsAr.map((cond, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-400 pt-1">
                  <span className="text-amber-500">•</span>
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
