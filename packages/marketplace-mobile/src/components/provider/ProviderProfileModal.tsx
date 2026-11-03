import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, MapPin, Phone, Star, Tractor, Calendar, Award } from 'lucide-react';
import { MachineryCard } from '../home/FeaturedListings';

export const ProviderProfileModal: React.FC = () => {
  const {
    selectedProviderId,
    closeProviderProfile,
    listings,
    openEquipmentDetails,
    openBookingModal,
    toggleFavorite,
    isFavorite
  } = useApp();

  if (!selectedProviderId) return null;

  const providerListings = listings.filter(l => l.providerId === selectedProviderId);
  const sampleProvider = providerListings[0];

  if (!sampleProvider) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-500">ملف مزود الخدمة المعتمد</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">سوق الآليات في العراق</span>
          </div>
          <button
            onClick={closeProviderProfile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Provider Card */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-2xl font-heading">
                {sampleProvider.providerName.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
                    {sampleProvider.providerName}
                  </h2>
                  {sampleProvider.providerVerified && (
                    <span title="مزود معتمد وموثق تجارياً">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>المقر: {sampleProvider.governorate}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{sampleProvider.providerRating}</span>
                    <span className="text-slate-500">(تقييم معتمد)</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{sampleProvider.providerType === 'company' ? 'شركة مسجلة ذات أسطول' : 'مالك معدات فردي'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <a
                href={`tel:${sampleProvider.providerPhone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                <span>الاتصال المباشر: {sampleProvider.providerPhone}</span>
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
              <span className="text-slate-500 block text-[11px]">الآليات المعروضة:</span>
              <span className="text-base font-bold text-white font-mono tabular-nums">{providerListings.length} معدة</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
              <span className="text-slate-500 block text-[11px]">نسبة الالتزام بالمواعيد:</span>
              <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">98%</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
              <span className="text-slate-500 block text-[11px]">المحافظات المخدومة:</span>
              <span className="text-base font-bold text-white">الوسط والجنوب</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
              <span className="text-slate-500 block text-[11px]">عضوية ماشينكس:</span>
              <span className="text-base font-bold text-amber-400">موثق نشط</span>
            </div>
          </div>

          {/* Listings from this provider */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 font-heading flex items-center gap-2">
              <Tractor className="w-4 h-4 text-amber-500" />
              <span>الآليات المتاحة للتأجير لدى هذا المزود ({providerListings.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providerListings.map(item => (
                <MachineryCard
                  key={item.id}
                  item={item}
                  onDetails={() => {
                    closeProviderProfile();
                    openEquipmentDetails(item.id);
                  }}
                  onBook={() => {
                    closeProviderProfile();
                    openBookingModal(item);
                  }}
                  onToggleFav={() => toggleFavorite(item.id)}
                  isFav={isFavorite(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
