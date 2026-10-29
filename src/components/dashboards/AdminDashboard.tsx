import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Database,
  Lock,
  Layers,
  FileCode,
  Users,
  Tractor,
  TrendingUp,
  Tag,
  ShoppingBag,
  Wrench
} from 'lucide-react';
import { formatIqd } from '../../utils/formatters';

export const AdminDashboard: React.FC = () => {
  const {
    listings,
    rentalRequests,
    approveListingByAdmin,
    deleteListing,
    openEquipmentDetails,
    saleListings,
    deleteSaleListing,
    openSaleDetails,
    spareParts,
    maintenanceCenters,
    openPartDetails,
    openWorkshopDetails,
    pricingSettings,
    updatePlanPrice
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'sales_moderation' | 'parts_maintenance' | 'pricing_engine' | 'firestore_spec' | 'security_rules'>('moderation');
  const [editingTierPrices, setEditingTierPrices] = useState<Record<string, number>>({
    basic: pricingSettings.plans.basic.priceMonthlyIqd,
    pro_owner: pricingSettings.plans.pro_owner.priceMonthlyIqd,
    business: pricingSettings.plans.business.priceMonthlyIqd,
    enterprise: pricingSettings.plans.enterprise.priceMonthlyIqd,
  });
  const [pricingSuccessMsg, setPricingSuccessMsg] = useState<string | null>(null);

  const pendingListings = listings.filter(l => l.moderationStatus === 'pending_review');

  const FIRESTORE_COLLECTIONS_SPEC = [
    { name: 'users', count: 4, desc: 'حسابات المستخدمين المستقرة، الأدوار المشفرة (role)، والتحقق من فرادة اسم المستخدم (username).' },
    { name: 'providerProfiles', count: 3, desc: 'بيانات الشركات والملاك، السجل التجاري، التقييم، وتغطية المحافظات العراقية.' },
    { name: 'equipmentListings', count: listings.length, desc: 'مواصفات آليات التأجير، القدرة الحصانية، الأسعار اليومية/الشهرية، وموقع المحافظة.' },
    { name: 'equipmentSales', count: saleListings.length, desc: 'سوق بيع وشراء الآليات الثقيلة، التخليص الجمركي، ساعات العمل، وسعر الشراء بالدينار العراقي.' },
    { name: 'spareParts', count: spareParts.length, desc: 'سوق قطع الغيار الأصلية والبديلة، أرقام OEM، وتوافق الطرازات ومتاجر السنك والشيخ عمر.' },
    { name: 'maintenanceCenters', count: maintenanceCenters.length, desc: 'دليل مراكز الصيانة والورش، التخصصات الهيدروليكية والميكانيكية، ووحدات الطوارئ الميدانية.' },
    { name: 'serviceInquiries', count: 4, desc: 'استفسارات الشراء والصيانة وقطع الغيار بين العملاء والمزودين عبر التطبيق والواتساب.' },
    { name: 'rentalRequests', count: rentalRequests.length, desc: 'سجل طلبات الاستئجار، مدة العمل، المواقع، وتغيرات الحالة التعاقدية.' },
    { name: 'subscriptionPlans', count: 3, desc: 'باقات الاشتراك الشهرية والسنوية للملاك والشركات بأسعار الدينار العراقي.' },
    { name: 'userSubscriptions', count: 2, desc: 'حالة اشتراكات الملاك وفترات الصلاحية وأهلية نشر إعلانات البيع.' },
    { name: 'wallets', count: 3, desc: 'أرصدة المحافظ التجريبية ومبالغ الضمان المحجوزة لكل مستخدم بشكل منفصل تماماً.' },
    { name: 'walletTransactions', count: 6, desc: 'سجل الحركات المالية الموثقة والمقيدة في السيرفر.' },
    { name: 'favorites', count: 2, desc: 'الآليات المحفوظة في مفضلة المستخدمين.' },
    { name: 'auditLogs', count: 12, desc: 'سجلات تدقيق العمليات الحساسة وتغيير الصلاحيات الإدارية.' }
  ];

  const SAMPLE_FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions for secure RBAC
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Users Collection: users can only edit their own profile; nobody can elevate to admin client-side
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId && request.resource.data.role != 'admin';
      allow update: if isOwner(userId) && request.resource.data.role == resource.data.role; // Prevent self-promotion
      allow delete: if isAdmin();
    }

    // Equipment Listings: public read, owners/companies can manage their own, admin can moderate
    match /equipmentListings/{listingId} {
      allow read: if true;
      allow create: if isAuthenticated() && (request.auth.token.role in ['owner', 'company'] || isAdmin());
      allow update: if isAuthenticated() && (resource.data.providerId == request.auth.uid || isAdmin());
      allow delete: if isAuthenticated() && (resource.data.providerId == request.auth.uid || isAdmin());
    }

    // Wallets: Strictly private read, modifications ONLY permitted by trusted backend / admin
    match /wallets/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isAdmin(); // Clients can NEVER write or edit wallet balances!
    }

    // Rental Requests: parties involved (customer & provider) and admins can read/update
    match /rentalRequests/{requestId} {
      allow read: if isAuthenticated() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.providerId == request.auth.uid ||
        isAdmin()
      );
      allow create: if isAuthenticated() && request.resource.data.customerId == request.auth.uid;
      allow update: if isAuthenticated() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.providerId == request.auth.uid ||
        isAdmin()
      );
    }
  }
}`;

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Admin Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xl">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  لوحة الإدارة والرقابة المركزية (Administrator)
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  صلاحيات عليا
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                تدقيق التراخيص المهنية للآليات، رقابة العقود في المحافظات، ومخطط قواعد بيانات Firestore
              </p>
            </div>
          </div>

          <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span>وضع التشغيل: </span>
            <strong className="text-amber-400">محاكاة محلية معزولة (In-Memory Prototype)</strong>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-slate-400 text-xs block mb-1">إجمالي الآليات المسجلة:</span>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">{listings.length} معدة</div>
            <span className="text-[10px] text-emerald-400">عبر 10 محافظات عراقية</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-slate-400 text-xs block mb-1">طلبات الاستئجار المسجلة:</span>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">{rentalRequests.length} طلباً</div>
            <span className="text-[10px] text-slate-400">عقود جارية ومكتملة</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-slate-400 text-xs block mb-1">حجم التعاقدات التقديري:</span>
            <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums leading-tight">
              12,550,000 د.ع
            </div>
            <span className="text-[10px] text-slate-400">~ $9,580 دولار</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-slate-400 text-xs block mb-1">حالة الأمان والصلاحيات:</span>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
              <Lock className="w-4 h-4" />
              <span>RBAC مُحكم</span>
            </div>
            <span className="text-[10px] text-slate-400">منع التصعيد العشوائي للصلاحيات</span>
          </div>
        </div>

        {/* Navigation Tabs for Admin */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`pb-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'moderation' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            آليات التأجير ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('sales_moderation')}
            className={`pb-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'sales_moderation' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            آليات البيع ({saleListings.length})
          </button>
          <button
            onClick={() => setActiveTab('parts_maintenance')}
            className={`pb-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'parts_maintenance' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            قطع الغيار والورش ({spareParts.length + maintenanceCenters.length})
          </button>
          <button
            onClick={() => setActiveTab('pricing_engine')}
            className={`pb-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'pricing_engine' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ محرك أسعار الاشتراكات (Pricing Engine)
          </button>
          <button
            onClick={() => setActiveTab('firestore_spec')}
            className={`pb-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'firestore_spec' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            مخطط مجموعات Firestore ({FIRESTORE_COLLECTIONS_SPEC.length})
          </button>
          <button
            onClick={() => setActiveTab('security_rules')}
            className={`pb-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'security_rules' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            قواعد الأمان (Rules)
          </button>
        </div>

        {/* Tab 1: Rental Moderation */}
        {activeTab === 'moderation' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-xs text-white">قائمة كافة معدات التأجير المسجلة في السوق العراقي</span>
              <span className="text-[11px] text-slate-400">إمكانية التدقيق، الحذف، ومراجعة المواصفات</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">رقم الآلية</th>
                    <th className="py-3 px-4">العنوان والتصنيف</th>
                    <th className="py-3 px-4">المزود</th>
                    <th className="py-3 px-4">المحافظة</th>
                    <th className="py-3 px-4">السعر اليومي</th>
                    <th className="py-3 px-4">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {listings.map(item => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{item.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-white block">{item.titleAr}</span>
                        <span className="text-[10px] text-amber-400">{item.manufacturer} — {item.modelName}</span>
                      </td>
                      <td className="py-3 px-4">{item.providerName}</td>
                      <td className="py-3 px-4">{item.governorate} ({item.city})</td>
                      <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                        {formatIqd(item.priceDailyIqd)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEquipmentDetails(item.id)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                          >
                            معاينة
                          </button>
                          <button
                            onClick={() => deleteListing(item.id)}
                            className="px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs border border-rose-900/60"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Sales Moderation */}
        {activeTab === 'sales_moderation' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-xs text-white">رقابة إعلانات بيع وشراء المعدات الثقيلة في العراق</span>
              <span className="text-[11px] text-slate-400">تدقيق ساعات العمل والتخليص الجمركي وفحص الأوراق الثبوتية</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">رقم الإعلان</th>
                    <th className="py-3 px-4">الآلية وسنة الصنع</th>
                    <th className="py-3 px-4">البائع والصفة</th>
                    <th className="py-3 px-4">الموقع</th>
                    <th className="py-3 px-4">سعر البيع المطلوب (د.ع)</th>
                    <th className="py-3 px-4">الفحص والجمرك</th>
                    <th className="py-3 px-4">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {saleListings.map(item => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{item.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-white block">{item.titleAr}</span>
                        <span className="text-[10px] text-amber-400 font-mono">
                          {item.year} · {item.operatingHours ? `${item.operatingHours.toLocaleString()} ساعة عمل` : 'جديد'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="block font-medium">{item.sellerName}</span>
                        <span className="text-[10px] text-slate-400">
                          {item.sellerType === 'dealership' ? 'وكالة معتمدة' : item.sellerType === 'company' ? 'شركة تأجير' : 'مالك فردي'}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.governorate} — {item.city}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                        {formatIqd(item.askingPriceIqd)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {item.customsCleared ? 'مجمرك أصولياً' : 'قيد التخليص'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openSaleDetails(item.id)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                          >
                            معاينة
                          </button>
                          <button
                            onClick={() => deleteSaleListing(item.id)}
                            className="px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs border border-rose-900/60"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Parts & Maintenance Directory Monitor */}
        {activeTab === 'parts_maintenance' && (
          <div className="space-y-6">
            {/* Spare Parts Quick View */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <span className="font-bold text-xs text-white flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>عينة قطع الغيار المسجلة بالسوق ({spareParts.length})</span>
                </span>
                <span className="text-[11px] text-slate-400">متاجر السنك والشيخ عمر وأربيل</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">رقم القطعة OEM</th>
                      <th className="py-3 px-4">اسم القطعة والمصنّع</th>
                      <th className="py-3 px-4">المتجر والمحافظة</th>
                      <th className="py-3 px-4">السعر التقديري (د.ع)</th>
                      <th className="py-3 px-4">التوافق</th>
                      <th className="py-3 px-4">معاينة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {spareParts.map(part => (
                      <tr key={part.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-[11px] text-amber-400">{part.partNumber}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-white block">{part.titleAr}</span>
                          <span className="text-[10px] text-slate-400">{part.brand} — {part.category}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span>{part.storeName}</span>
                          <span className="block text-[10px] text-slate-400">{part.governorate} ({part.city})</span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                          {formatIqd(part.priceIqd)}
                        </td>
                        <td className="py-3 px-4 text-[10px] text-slate-400 max-w-[200px] truncate">
                          {part.compatibleMachinesAr}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => openPartDetails(part.id)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                          >
                            عرض
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Maintenance Centers Quick View */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <span className="font-bold text-xs text-white flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>دليل ورش ومراكز الصيانة المعتمدة ({maintenanceCenters.length})</span>
                </span>
                <span className="text-[11px] text-slate-400">تغطية وحدات الطوارئ والمحافظات</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">اسم الورشة</th>
                      <th className="py-3 px-4">الموقع والمحافظة</th>
                      <th className="py-3 px-4">التخصصات الفنية</th>
                      <th className="py-3 px-4">خدمة طوارئ 24/7</th>
                      <th className="py-3 px-4">الهاتف</th>
                      <th className="py-3 px-4">معاينة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {maintenanceCenters.map(center => (
                      <tr key={center.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{center.centerNameAr}</td>
                        <td className="py-3 px-4">
                          <span>{center.governorate}</span>
                          <span className="block text-[10px] text-slate-400">{center.city}</span>
                        </td>
                        <td className="py-3 px-4 text-[10px] text-slate-300">
                          {center.specialties.slice(0, 2).join(' · ')}
                          {center.specialties.length > 2 && ' +المزيد'}
                        </td>
                        <td className="py-3 px-4">
                          {center.hasMobileWorkshop ? (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              متوفرة 24/7
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500">داخل الورشة فقط</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-300">{center.phone}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => openWorkshopDetails(center.id)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                          >
                            عرض
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Centralized Subscription Pricing Engine */}
        {activeTab === 'pricing_engine' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white font-heading">
                    محرك تسعير الاشتراكات المركزي (Centralized Subscription Pricing Engine)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    إدارة أسعار الباقات بالدينار العراقي (IQD). تتغير الأسعار لحظياً في بطاقات الاشتراك ونوافذ الترقية عبر التطبيق كاملاً.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                    خصم السنوي: شهران مجاناً (~17%)
                  </span>
                </div>
              </div>

              {pricingSuccessMsg && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold">
                  {pricingSuccessMsg}
                </div>
              )}

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {(['basic', 'pro_owner', 'business', 'enterprise'] as const).map((tierKey) => {
                  const plan = pricingSettings.plans[tierKey];
                  const currentPrice = editingTierPrices[tierKey] ?? plan.priceMonthlyIqd;
                  const calculatedAnnual = currentPrice * 10;

                  return (
                    <div
                      key={tierKey}
                      className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-white text-sm">{plan.nameAr}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                            {plan.nameEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">{plan.targetAudienceAr}</p>

                        {tierKey === 'pro_owner' && (
                          <div className="text-[11px] px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3 font-bold">
                            ★ الباقة المؤهلة لنشر آليات البيع
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-300 block">
                            السعر الشهري (د.ع):
                          </label>
                          <input
                            type="number"
                            step="1000"
                            min="0"
                            value={currentPrice}
                            onChange={(e) => {
                              const val = Math.max(0, parseInt(e.target.value) || 0);
                              setEditingTierPrices((prev) => ({ ...prev, [tierKey]: val }));
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />

                          <div className="text-[10px] text-slate-500 pt-1 flex justify-between font-mono">
                            <span>الاشتراك السنوي المحسوب:</span>
                            <span className="text-amber-400 font-bold">{formatIqd(calculatedAnnual)}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          updatePlanPrice(tierKey, currentPrice);
                          setPricingSuccessMsg(`تم تحديث سعر باقة ${plan.nameAr} إلى ${formatIqd(currentPrice)}/شهرياً بنجاح.`);
                          setTimeout(() => setPricingSuccessMsg(null), 3500);
                        }}
                        className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        حفظ وتطبيق السعر
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Info footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>قاعدة العمل المشروطة: نشر إعلانات البيع للأفراد مقيد بباقة المالك المحترف (20,000 د.ع) وما فوق.</span>
                <span className="text-amber-400 font-mono">العملة الأساسية: IQD</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Firestore Collections Architecture */}
        {activeTab === 'firestore_spec' && (
          <div className="space-y-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">جاهزية الترحيل السحابي (Cloud Firestore Schema Readiness):</strong>
              صُممت هياكل البيانات الحالية في طبقة Repository متوافقة بنسبة 100% مع مواصفات مجموعات Cloud Firestore المطلوبة للإنتاج، مما يسمح بتفعيل التخزين الموزع عند تفعيل الربط السحابي بدون الحاجة لإعادة كتابة منطق واجهة المستخدم.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FIRESTORE_COLLECTIONS_SPEC.map(col => (
                <div key={col.name} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-400 text-sm">{col.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {col.count} سجلات تجريبية
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {col.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Security Rules */}
        {activeTab === 'security_rules' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white font-heading">
                  قواعد أمان قاعدة البيانات المقيدة (firestore.rules)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  تمنع التعديل المباشر للأرصدة وتمنع تصعيد المستخدمين لأنفسهم إلى رتبة مدير
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                جاهزة للنشر لاحقاً
              </span>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto text-left dir-ltr max-h-96">
              <code>{SAMPLE_FIRESTORE_RULES}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
