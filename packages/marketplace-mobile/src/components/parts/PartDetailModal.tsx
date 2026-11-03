import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  ShieldCheck,
  Package,
  Wrench,
  CheckCircle2,
  Phone,
  MessageSquare,
  Building,
  Tag
} from 'lucide-react';
import { formatIqd } from '../../utils/formatters';

export const PartDetailModal: React.FC = () => {
  const {
    selectedPart,
    closePartDetails,
    openInquiryModal
  } = useApp();

  if (!selectedPart) return null;

  const item = selectedPart;
  const cleanPhone = item.storePhone.replace(/\s+/g, '');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-500 font-mono">
              سوق قطع الغيار · {item.brand}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">
              P/N: {item.partNumber}
            </span>
          </div>
          <button
            onClick={closePartDetails}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[85vh]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Visual */}
            <div className="md:col-span-6 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square relative">
              <img
                src={item.imageUrl}
                alt={item.titleAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-white border border-slate-700">
                <span className={`w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span>{item.inStock ? `متوفر بالمخزن (${item.stockQuantity} قطعة)` : 'طلب مسبق'}</span>
              </div>
            </div>

            {/* Price & Store Card */}
            <div className="md:col-span-6 bg-slate-950 border border-slate-800/90 rounded-xl p-5 space-y-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">السعر النقدي للقطعة:</span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums leading-tight">
                  {formatIqd(item.priceIqd)}
                </div>
                <div className="text-xs text-amber-400 font-mono mt-0.5">
                  شامل الفحص وشهادة المنشأ
                </div>
              </div>

              {/* Store info */}
              <div className="pt-3 border-t border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] text-slate-500 block">المتجر والموقع الميداني:</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-500" />
                  <span>{item.storeName}</span>
                  {item.storeVerified && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{item.governorate} — {item.city} ({item.storeLocation})</span>
                </div>
              </div>

              {/* Contact and buy */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    closePartDetails();
                    openInquiryModal({
                      targetType: 'spare_part',
                      targetId: item.id,
                      targetTitle: item.titleAr,
                      targetPriceIqd: item.priceIqd,
                      targetProviderName: item.storeName,
                      targetProviderPhone: item.storePhone
                    });
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>طلب شراء / استفسار فني</span>
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

          {/* Description & Compatibility */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-heading mb-2">
              {item.titleAr}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 mb-4">
              {item.descriptionAr}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">الآليات المتوافقة بدقة:</span>
                <span className="font-bold text-white text-sm">{item.compatibleMachinesAr}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">الضمان وسياسة الاستبدال:</span>
                <span className="font-bold text-emerald-400 text-sm">{item.warrantyPeriodAr || 'فحص قبل الاستلام'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
