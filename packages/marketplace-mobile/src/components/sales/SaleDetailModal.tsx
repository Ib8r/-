import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  ShieldCheck,
  Calendar,
  Clock,
  Wrench,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileText,
  Building,
  Tag
} from 'lucide-react';
import { formatIqd, formatUsdEquivalent, getCategoryNameAr } from '../../utils/formatters';

export const SaleDetailModal: React.FC = () => {
  const {
    selectedSaleListing,
    closeSaleDetails,
    openInquiryModal,
    openProviderProfile
  } = useApp();

  if (!selectedSaleListing) return null;

  const item = selectedSaleListing;
  const cleanPhone = item.sellerPhone.replace(/\s+/g, '');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-500 font-mono">
              سوق بيع الآليات · {getCategoryNameAr(item.category)}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">
              طراز {item.year}
            </span>
          </div>
          <button
            onClick={closeSaleDetails}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image */}
            <div className="md:col-span-7 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[16/10] relative">
              <img
                src={item.imageUrl}
                alt={item.titleAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-white border border-slate-700">
                <span className={`w-1.5 h-1.5 rounded-full ${item.condition === 'new' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>{item.condition === 'new' ? 'جديد وكالة (صفر ساعة)' : 'مستعمل مجرب'}</span>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-white">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{item.governorate} — {item.city}</span>
              </div>
            </div>

            {/* Price & Contact Card */}
            <div className="md:col-span-5 bg-slate-950 border border-slate-800/90 rounded-xl p-5 space-y-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">السعر المطلوب للبيع النهائي:</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums leading-tight">
                  {formatIqd(item.askingPriceIqd)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {formatUsdEquivalent(item.askingPriceIqd)} تقريباً {item.isNegotiable ? '(قابل للتفاوض)' : '(سعر نهائي)'}
                </div>
              </div>

              {/* Operating Hours & Warranty */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800 font-mono">
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800/60">
                  <span className="text-slate-400 block text-[10px] font-sans">ساعات التشغيل:</span>
                  <span className="font-bold text-white text-sm">
                    {item.condition === 'new' ? '0 ساعة (جديد)' : `${(item.operatingHours || 0).toLocaleString()} ساعة`}
                  </span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800/60">
                  <span className="text-slate-400 block text-[10px] font-sans">الضمان المعتمد:</span>
                  <span className="font-bold text-white text-sm">
                    {item.warrantyMonths ? `${item.warrantyMonths} أشهر` : 'بدون ضمان وكالة'}
                  </span>
                </div>
              </div>

              {/* Seller reference */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">جهة البيع:</span>
                  <div className="font-bold text-xs text-white flex items-center gap-1.5">
                    <span>{item.sellerName}</span>
                    {item.sellerVerified && (
                      <span title="بائع موثق ومعتمد">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {item.sellerType === 'dealership' ? 'معرض / وكالة معتمدة' : item.sellerType === 'company' ? 'شركة مقاولات' : 'مالك فردي'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    closeSaleDetails();
                    openInquiryModal({
                      targetType: 'sale_equipment',
                      targetId: item.id,
                      targetTitle: item.titleAr,
                      targetPriceIqd: item.askingPriceIqd,
                      targetProviderName: item.sellerName,
                      targetProviderPhone: item.sellerPhone
                    });
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>إرسال استفسار أو طلب معاينة</span>
                </button>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>اتصال مباشر: {cleanPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-lg font-bold text-white font-heading mb-2">
              {item.titleAr}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {item.descriptionAr}
            </p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 font-heading flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>المواصفات الفنية للآلية</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">الشركة المصنعة:</span>
                <span className="font-bold text-white text-sm">{item.manufacturer}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">طراز الموديل:</span>
                <span className="font-bold text-white text-sm">{item.modelName}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">سنة الصنع:</span>
                <span className="font-bold text-white font-mono text-sm">{item.year}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">القدرة الحصانية:</span>
                <span className="font-bold text-white font-mono text-sm">{item.specs.powerHorsepower} HP</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">الوزن التشغيلي:</span>
                <span className="font-bold text-white font-mono text-sm">{item.specs.operatingWeightTons} طن</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">حالة الجمارك والتسجيل:</span>
                <span className="font-bold text-emerald-400 text-sm">{item.customsCleared ? 'مجمركة رسمياً' : 'قيد التخليص'}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 col-span-2">
                <span className="text-slate-500 block text-[11px]">تقرير الفحص الهندسي:</span>
                <span className="font-bold text-white text-sm">
                  {item.inspectionReportAvailable ? 'فحص كامل معتمد متوفر للمعاينة' : 'معاينة ميدانية شخصية'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
