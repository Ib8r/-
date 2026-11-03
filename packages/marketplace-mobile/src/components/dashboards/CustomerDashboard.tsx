import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HardHat,
  Calendar,
  Clock,
  Heart,
  FileCheck,
  CheckCircle2,
  Tractor,
  MessageSquare,
  Tag,
  Package,
  Wrench,
  DollarSign
} from 'lucide-react';
import { formatIqd, formatUsdEquivalent, getRequestStatusBadge } from '../../utils/formatters';
import { MachineryCard } from '../home/FeaturedListings';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    rentalRequests,
    updateRequestStatus,
    listings,
    favorites,
    toggleFavorite,
    isFavorite,
    openEquipmentDetails,
    openBookingModal,
    setActiveTab,
    userWallet,
    serviceInquiries
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'requests' | 'inquiries' | 'favorites'>('requests');

  const myRequests = rentalRequests.filter(
    r => r.customerId === currentUser?.id || currentUser?.role === 'customer'
  );

  const favoriteListings = listings.filter(l => favorites.includes(l.id));

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xl">
              <HardHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  لوحة تحكم المقاول / الزبون
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                  حساب معتمد
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {currentUser?.fullName} · {currentUser?.companyName || 'مجموعة المقاولات الإنشائية'} · {currentUser?.governorate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left">
              <span className="text-[10px] text-slate-500 block text-right">رصيد الضمان المحجوز:</span>
              <div className="text-sm font-bold text-amber-400 font-mono tabular-nums text-right">
                {formatIqd(userWallet.heldEscrowIqd)}
              </div>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm"
            >
              استئجار معدة
            </button>
          </div>
        </div>

        {/* Dashboard Sub-tabs */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTabSub('requests')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTabSub === 'requests' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>طلبات الاستئجار ({myRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTabSub('inquiries')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTabSub === 'inquiries' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>استفسارات الشراء والصيانة ({serviceInquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTabSub('favorites')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTabSub === 'favorites' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>المعدات المحفوظة ({favoriteListings.length})</span>
          </button>
        </div>

        {/* Tab 1: Rental Requests */}
        {activeTabSub === 'requests' && (
          <div className="space-y-4">
            {myRequests.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                <FileCheck className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-white">لا توجد طلبات استئجار سارية حالياً</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  تصفح سوق الآليات وابدأ بإرسال طلباتك لحجز الحفارات والكرينات لمشاريعك.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  تصفح سوق الآليات
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myRequests.map(req => {
                  const badge = getRequestStatusBadge(req.status);
                  return (
                    <div
                      key={req.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700/60">
                          <img src={req.equipmentImageUrl} alt={req.equipmentTitle} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] px-2.5 py-0.5 rounded border font-medium ${badge.colorClass}`}>
                              {badge.labelAr}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">رقم الطلب: #{req.id}</span>
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-white font-heading">
                            {req.equipmentTitle}
                          </h3>
                          <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 sm:gap-4">
                            <span>المزود: <strong className="text-slate-200">{req.providerName}</strong></span>
                            <span aria-hidden="true">·</span>
                            <span>الموقع: {req.projectGovernorate} ({req.projectCity})</span>
                            <span aria-hidden="true">·</span>
                            <span>المدة: {req.durationDays} أيام (ابتداءً من {req.startDate})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 gap-3">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">التكلفة التقديرية:</span>
                          <div className="text-sm sm:text-base font-bold text-white font-mono tabular-nums leading-tight">
                            {formatIqd(req.totalRentalPriceIqd)}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {formatUsdEquivalent(req.totalRentalPriceIqd)}
                          </span>
                        </div>

                        {req.status === 'pending' && (
                          <button
                            onClick={() => updateRequestStatus(req.id, 'cancelled')}
                            className="px-3 py-1.5 rounded text-xs text-rose-400 hover:text-rose-300 border border-rose-900/60 hover:bg-rose-950/40 transition-colors"
                          >
                            إلغاء الطلب
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Sales & Maintenance Inquiries */}
        {activeTabSub === 'inquiries' && (
          <div className="space-y-4">
            {serviceInquiries.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-400">
                لم تقم بإرسال أي استفسارات لبيع الآليات أو قطع الغيار أو الصيانة بعد.
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">رقم الاستفسار</th>
                        <th className="py-3 px-4">الخدمة المعنية</th>
                        <th className="py-3 px-4">العنوان والمزود</th>
                        <th className="py-3 px-4">نص الرسالة</th>
                        <th className="py-3 px-4">التاريخ</th>
                        <th className="py-3 px-4">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {serviceInquiries.map(inq => (
                        <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{inq.id}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-amber-400">
                              {inq.targetType === 'sale_equipment'
                                ? 'شراء آلية'
                                : inq.targetType === 'spare_part'
                                ? 'قطع غيار'
                                : 'كشف صيانة'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-white block">{inq.targetTitle}</span>
                            <span className="text-[10px] text-slate-400">{inq.targetProviderName} ({inq.targetProviderPhone})</span>
                          </td>
                          <td className="py-3 px-4 max-w-xs text-slate-300 truncate">{inq.message}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                            {inq.createdAt.split('T')[0]}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                              {inq.status === 'responded' ? 'تم الرد' : 'مرسل للمزود'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Favorites */}
        {activeTabSub === 'favorites' && (
          <div className="space-y-4">
            {favoriteListings.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 text-center text-xs text-slate-400">
                لم تحفظ أي معدات بعد.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteListings.map(item => (
                  <MachineryCard
                    key={item.id}
                    item={item}
                    onDetails={() => openEquipmentDetails(item.id)}
                    onBook={() => openBookingModal(item)}
                    onToggleFav={() => toggleFavorite(item.id)}
                    isFav={isFavorite(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
