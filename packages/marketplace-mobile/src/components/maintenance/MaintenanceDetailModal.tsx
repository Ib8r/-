import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  ShieldCheck,
  Wrench,
  Clock,
  Phone,
  MessageSquare,
  Truck,
  Star,
  Users,
  CheckCircle2,
  Building
} from 'lucide-react';
import { MaintenancePostsFeed } from './MaintenancePostsFeed';

export const MaintenanceDetailModal: React.FC = () => {
  const {
    selectedWorkshop,
    closeWorkshopDetails,
    openInquiryModal
  } = useApp();

  if (!selectedWorkshop) return null;

  const item = selectedWorkshop;
  const cleanPhone = item.phone.replace(/\s+/g, '');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-500 font-mono">
              دليل الورش ومراكز الصيانة
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">
              {item.governorate} — {item.city}
            </span>
          </div>
          <button
            onClick={closeWorkshopDetails}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[85vh] text-xs">
          {/* Main Workshop Card */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                  {item.centerNameAr}
                </h2>
                {item.verifiedStatus && (
                  <span title="مركز معتمد">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-slate-500 font-normal">({item.reviewsCount} تقييم)</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  <span>طاقم من {item.techniciansCount} مهندساً وفنياً</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{item.address}</span>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="flex items-center gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <a
                href={`tel:${cleanPhone}`}
                className="py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال: {cleanPhone}</span>
              </a>
              <button
                onClick={() => {
                  closeWorkshopDetails();
                  openInquiryModal({
                    targetType: 'maintenance',
                    targetId: item.id,
                    targetTitle: item.centerNameAr,
                    targetProviderName: item.centerNameAr,
                    targetProviderPhone: item.phone
                  });
                }}
                className="py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold"
              >
                طلب كشف
              </button>
            </div>
          </div>

          {/* Mobile Van & Emergency Box */}
          {item.hasMobileWorkshop && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3 text-emerald-300">
              <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm mb-0.5">خدمة الصيانة الميدانية المتنقلة (24/7):</strong>
                <span>
                  يوفر المركز سيارات ورشة متنقلة مجهزة بمولدات وكوابس أهواز ومكائن لحام تصل لمواقع المشاريع الإنشائية في نطاق حتى {item.mobileServiceRangeKm} كم.
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-white font-heading mb-2">عن المركز والإمكانات الهندسية</h3>
            <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {item.descriptionAr}
            </p>
          </div>

          {/* Services Checklist */}
          <div>
            <h3 className="text-sm font-bold text-white font-heading mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>الخدمات الميكانيكية والهيدروليكية المقدمة</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.servicesOfferedAr.map((srv, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Working hours & Brands */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px] mb-1">أوقات وساعات العمل الرسمية:</span>
              <span className="font-bold text-white">{item.workingHoursAr}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px] mb-1">الماركات والمعدات المدعومة:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.supportedBrandsAr.map((b, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Maintenance Center's Promotional Posts & Media */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-white font-heading mb-3 flex items-center gap-2">
              <span>📢</span>
              <span>أعمال وعروض الصيانة المنشورة للمركز</span>
            </h3>
            <MaintenancePostsFeed centerId={item.id} showFilters={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
