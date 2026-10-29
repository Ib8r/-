import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, MapPin, HardHat, Truck, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';
import { IraqiGovernorate } from '../../types';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';

export const RentalRequestModal: React.FC = () => {
  const {
    isBookingModalOpen,
    equipmentToBook,
    closeBookingModal,
    createRentalRequest,
    currentUser,
    openAuthModal,
    setActiveTab
  } = useApp();

  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [durationDays, setDurationDays] = useState<number>(3);
  const [needsOperator, setNeedsOperator] = useState<boolean>(true);
  const [needsTransport, setNeedsTransport] = useState<boolean>(true);
  const [projectGov, setProjectGov] = useState<IraqiGovernorate>(equipmentToBook?.governorate || 'بغداد');
  const [projectCity, setProjectCity] = useState<string>('');
  const [addressDetails, setAddressDetails] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isBookingModalOpen || !equipmentToBook) return null;

  // Real-time calculation
  const baseRentalIqd = equipmentToBook.priceDailyIqd * durationDays;
  const operatorFeeIqd = needsOperator && equipmentToBook.withOperator
    ? (equipmentToBook.operatorDailyFeeIqd || 40000) * durationDays
    : 0;
  const totalIqd = baseRentalIqd + operatorFeeIqd;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      openAuthModal('signin');
      return;
    }

    createRentalRequest({
      equipmentId: equipmentToBook.id,
      startDate,
      durationDays,
      needsOperator,
      needsTransport,
      projectGovernorate: projectGov,
      projectCity: projectCity || equipmentToBook.city,
      projectAddressDetails: addressDetails || 'الموقع الإنشائي الميداني',
      notes
    });

    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    closeBookingModal();
    setActiveTab('customer_dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              طلب استئجار آلية هندسية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {equipmentToBook.titleAr} ({equipmentToBook.manufacturer})
            </p>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              تم إرسال طلب الاستئجار بنجاح!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              تم إشعار مالك المعدة ({equipmentToBook.providerName}) بتفاصيل مدة العمل وموقع المشروع. تم تسجيل طلبك ويمكنك متابعة حالته في لوحة تحكم المقاول.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto space-y-1.5 text-right font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">المدة:</span>
                <span className="text-white">{durationDays} أيام</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">الموقع:</span>
                <span className="text-white">{projectGov} — {projectCity || equipmentToBook.city}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 font-bold">
                <span className="text-amber-400">إجمالي التعاقد التقديري:</span>
                <span className="text-white">{formatIqd(totalIqd)}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                الانتقال لمتابعة الطلب في لوحتي
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 text-xs">
            {/* Notice */}
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-3 rounded-lg flex items-start gap-2 text-[11px]">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>محاكاة تعاقد آمنة:</strong> لا يتم خصم مبالغ مالية حقيقية. يتم حجز رصيد تجريبي في محفظة الضمان لإشعار المالك بجديّة الطلب وتأكيد موعد العمل.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>تاريخ بدء العمل في الموقع:</span>
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Duration Days */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  مدة الإيجار بالأيام ({durationDays} يوم):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={durationDays}
                    onChange={e => setDurationDays(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <span className="w-12 text-center font-mono font-bold text-white bg-slate-950 py-1.5 rounded border border-slate-700">
                    {durationDays} د
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>محافظة المشروع الإنشائي:</span>
                </label>
                <select
                  value={projectGov}
                  onChange={e => setProjectGov(e.target.value as IraqiGovernorate)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {IRAQI_GOVERNORATES.map(g => (
                    <option key={g.id} value={g.nameAr}>{g.nameAr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  المدينة أو القضاء أو اسم الموقع:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مشروع مجمع الكرخ، طريق الفلوجة..."
                  value={projectCity}
                  onChange={e => setProjectCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Address Details */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                تفاصيل موقع الإنزال والوصول:
              </label>
              <input
                type="text"
                placeholder="أقرب نقطة دالة، طبيعة الأرضية لوصول السطحة، رقم المهندس الميداني..."
                value={addressDetails}
                onChange={e => setAddressDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <label className="flex items-center gap-2.5 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsOperator}
                  onChange={e => setNeedsOperator(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500"
                />
                <div>
                  <span className="font-semibold text-white block">طلب مشغل / سائق معتمد</span>
                  <span className="text-[10px] text-slate-400">
                    +{formatIqd(equipmentToBook.operatorDailyFeeIqd || 40000)} / يومياً
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsTransport}
                  onChange={e => setNeedsTransport(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500"
                />
                <div>
                  <span className="font-semibold text-white block">طلب سطحة نقل للموقع</span>
                  <span className="text-[10px] text-slate-400">تنسيق النقل بالتكلفة المعتمدة محلياً</span>
                </div>
              </label>
            </div>

            {/* Project Notes */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ملاحظات حول طبيعة العمل (اختياري):
              </label>
              <textarea
                rows={2}
                placeholder="نوع التربة، ساعات العمل اليومية المتوقعة، شروط السلامة..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>إيجار الآلية الأساسي ({durationDays} يوم × {formatIqd(equipmentToBook.priceDailyIqd)}):</span>
                <span className="text-white">{formatIqd(baseRentalIqd)}</span>
              </div>
              {needsOperator && (
                <div className="flex justify-between text-slate-400">
                  <span>أجور المشغل الفني ({durationDays} يوم):</span>
                  <span className="text-white">{formatIqd(operatorFeeIqd)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold">
                <span className="text-amber-400">المجموع الكلي التقديري:</span>
                <div className="text-left">
                  <span className="text-white block">{formatIqd(totalIqd)}</span>
                  <span className="text-[10px] font-normal text-slate-400 block font-sans">
                    {formatUsdEquivalent(totalIqd)} تقريباً
                  </span>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={closeBookingModal}
                className="px-4 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
              >
                تأكيد وإرسال طلب الاستئجار للمالك
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
