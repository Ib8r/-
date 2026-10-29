import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Tractor,
  PlusCircle,
  CheckCircle,
  XCircle,
  Wallet,
  Clock,
  Tag,
  ShieldCheck,
  PauseCircle,
  PlayCircle,
  Trash2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { formatIqd, formatUsdEquivalent, getAvailabilityBadge, getRequestStatusBadge } from '../../utils/formatters';
import { AvailabilityStatus, EquipmentSaleListing } from '../../types';

export const OwnerDashboard: React.FC = () => {
  const {
    currentUser,
    listings,
    saleListings,
    rentalRequests,
    updateListingAvailability,
    updateRequestStatus,
    openAddListingModal,
    openAddSaleListingModal,
    openEquipmentDetails,
    openSaleDetails,
    updateSaleListingStatus,
    deleteSaleListing,
    userWallet,
    setActiveTab,
    openSubscriptionUpgradeModal
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'requests' | 'rental_listings' | 'sale_listings'>('requests');

  // Filter listings belonging to this owner
  const myListings = listings.filter(
    l => l.providerId === 'prov-004' || l.providerName.includes(currentUser?.fullName || 'البدري')
  );

  const mySaleListings = saleListings.filter(
    s => s.sellerId === currentUser?.id || s.sellerName.includes(currentUser?.fullName || 'البدري')
  );

  const incomingRequests = rentalRequests.filter(
    r => r.providerId === 'prov-004' || r.providerName.includes(currentUser?.fullName || 'البدري')
  );

  const isProOwner = currentUser?.subscriptionTier === 'pro_owner' || currentUser?.subscriptionTier === 'fleet_enterprise';

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Profile Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xl">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  لوحة مالك المعدات الفردي
                </h1>
                <span className={`text-[11px] px-2.5 py-0.5 rounded font-bold border ${
                  isProOwner
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {isProOwner ? 'باقة المالك المحترف (مؤهل لبيع وتأجير الآليات)' : 'باقة مجانية (تأجير فقط)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {currentUser?.fullName} · {currentUser?.governorate} ({currentUser?.city}) · {myListings.length} آليات تأجير · {mySaleListings.length} آليات معروضة للبيع
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('wallet')}
              className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-right hover:border-amber-500/50 transition-colors"
            >
              <span className="text-[10px] text-slate-500 block">رصيد المحفظة:</span>
              <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                {formatIqd(userWallet.balanceIqd)}
              </div>
            </button>
            <button
              onClick={openAddSaleListingModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>إضافة آلية للبيع</span>
            </button>
            <button
              onClick={openAddListingModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>إضافة آلية للتأجير</span>
            </button>
          </div>
        </div>

        {/* Subscription Eligibility Notice Card */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
          isProOwner
            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
            : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
        }`}>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">
                {isProOwner
                  ? 'حسابك مؤهل لنشر آليات البيع وعقود التأجير الرسمية'
                  : 'تفعيل صلاحية بيع الآليات الثقيلة'}
              </strong>
              <p className="text-slate-300 text-xs">
                {isProOwner
                  ? 'تتيح لك باقة المالك المحترف نشر حتى 6 معدات بالتزامن مع شارة التوثيق وخصم 30% على عمولة المنصة.'
                  : 'يتطلب نشر إعلانات بيع الآليات للأفراد الاشتراك في باقة المالك المحترف. يمكنك الترقية الآن للتجربة.'}
              </p>
            </div>
          </div>

          {!isProOwner && (
            <button
              onClick={openSubscriptionUpgradeModal}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold whitespace-nowrap shadow-sm shrink-0"
            >
              ترقية الحساب الآن
            </button>
          )}
        </div>

        {/* Sub-tabs */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTabSub('requests')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTabSub === 'requests' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>طلبات الاستئجار الواردة ({incomingRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTabSub('rental_listings')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTabSub === 'rental_listings' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Tractor className="w-4 h-4" />
            <span>آليات التأجير ({myListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTabSub('sale_listings')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTabSub === 'sale_listings' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>آليات البيع الخاصة بي ({mySaleListings.length})</span>
          </button>
        </div>

        {/* Tab 1: Incoming Rental Requests */}
        {activeTabSub === 'requests' && (
          <div className="space-y-4">
            {incomingRequests.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center text-xs text-slate-400">
                لا توجد طلبات استئجار واردة جديدة في الوقت الحالي.
              </div>
            ) : (
              <div className="space-y-3">
                {incomingRequests.map(req => {
                  const badge = getRequestStatusBadge(req.status);
                  return (
                    <div
                      key={req.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] px-2.5 py-0.5 rounded border font-medium ${badge.colorClass}`}>
                            {badge.labelAr}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">#{req.id}</span>
                          <span aria-hidden="true" className="text-slate-700">·</span>
                          <span className="text-xs text-slate-300 font-medium">الزبون: {req.customerName} ({req.customerPhone})</span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-white font-heading">
                          {req.equipmentTitle}
                        </h3>
                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                          <span>الموقع: {req.projectGovernorate} — {req.projectCity}</span>
                          <span aria-hidden="true">·</span>
                          <span>المدة: {req.durationDays} أيام (ابتداءً من {req.startDate})</span>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 gap-3">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">إجمالي العائد:</span>
                          <div className="text-sm sm:text-base font-bold text-white font-mono tabular-nums leading-tight">
                            {formatIqd(req.totalRentalPriceIqd)}
                          </div>
                        </div>

                        {req.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateRequestStatus(req.id, 'accepted')}
                              className="px-3.5 py-1.5 rounded text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                            >
                              الموافقة
                            </button>
                            <button
                              onClick={() => updateRequestStatus(req.id, 'rejected')}
                              className="px-3 py-1.5 rounded text-xs text-rose-400 hover:text-rose-300 border border-rose-900/60"
                            >
                              رفض
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Rental Listings */}
        {activeTabSub === 'rental_listings' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myListings.map(item => {
                const badge = getAvailabilityBadge(item.availabilityStatus);
                return (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                          <img src={item.imageUrl} alt={item.titleAr} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${badge.colorClass}`}>
                          {badge.labelAr}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white font-heading mb-1">{item.titleAr}</h3>
                      <p className="text-xs text-slate-400 mb-2">{item.governorate} — {item.city}</p>
                      <div className="text-xs text-white font-mono font-bold mb-3">
                        {formatIqd(item.priceDailyIqd)} / يوم
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <span className="text-[10px] text-slate-500 block mb-1">تغيير الحالة:</span>
                      <div className="grid grid-cols-3 gap-1 text-[11px]">
                        <button
                          onClick={() => updateListingAvailability(item.id, 'available')}
                          className={`py-1 rounded font-medium ${
                            item.availabilityStatus === 'available' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                          }`}
                        >
                          متاح
                        </button>
                        <button
                          onClick={() => updateListingAvailability(item.id, 'rented')}
                          className={`py-1 rounded font-medium ${
                            item.availabilityStatus === 'rented' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                          }`}
                        >
                          مؤجر
                        </button>
                        <button
                          onClick={() => updateListingAvailability(item.id, 'maintenance')}
                          className={`py-1 rounded font-medium ${
                            item.availabilityStatus === 'maintenance' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-950 text-slate-400'
                          }`}
                        >
                          صيانة
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: My Equipment For Sale */}
        {activeTabSub === 'sale_listings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">إدارة آليات البيع الخاصة بك، تحديث السعر، أو إيقاف الإعلان</span>
              <button
                onClick={openAddSaleListingModal}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>إضافة إعلان بيع جديد</span>
              </button>
            </div>

            {mySaleListings.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-400 space-y-3">
                <Tag className="w-8 h-8 text-slate-600 mx-auto" />
                <p>ليس لديك أي آليات معروضة للبيع حالياً.</p>
                <button
                  onClick={openAddSaleListingModal}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold"
                >
                  نشر أول آلية للبيع
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {mySaleListings.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                          <img src={item.imageUrl} alt={item.titleAr} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                          item.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : item.status === 'paused'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {item.status === 'active' ? 'نشط في السوق' : item.status === 'paused' ? 'موقوف مؤقتاً' : 'تم البيع'}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-white font-heading mb-1">{item.titleAr}</h3>
                      <p className="text-xs text-slate-400 mb-2">{item.governorate} — {item.city}</p>
                      <div className="text-base text-amber-400 font-mono font-bold mb-3 tabular-nums">
                        {formatIqd(item.askingPriceIqd)}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openSaleDetails(item.id)}
                        className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:text-white"
                      >
                        معاينة
                      </button>

                      <div className="flex items-center gap-1">
                        {item.status === 'active' ? (
                          <button
                            onClick={() => updateSaleListingStatus(item.id, 'paused')}
                            className="p-1.5 rounded text-amber-400 hover:bg-slate-800"
                            title="إيقاف مؤقت للإعلان"
                          >
                            <PauseCircle className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateSaleListingStatus(item.id, 'active')}
                            className="p-1.5 rounded text-emerald-400 hover:bg-slate-800"
                            title="إعادة التفعيل"
                          >
                            <PlayCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteSaleListing(item.id)}
                          className="p-1.5 rounded text-rose-400 hover:bg-slate-800"
                          title="حذف الإعلان"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
