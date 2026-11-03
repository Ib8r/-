import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  Tractor,
  MapPin,
  ShieldCheck,
  PlusCircle,
  Truck,
  Users,
  BarChart3,
  CheckCircle2,
  Calendar,
  Layers,
  ShoppingBag,
  Wrench,
  Tag,
  ArrowUpRight
} from 'lucide-react';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';

export const CompanyDashboard: React.FC = () => {
  const {
    currentUser,
    listings,
    openAddListingModal,
    openEquipmentDetails,
    saleListings,
    openSaleDetails,
    openAddSaleListingModal,
    spareParts,
    openPartDetails,
    userWallet,
    setActiveTab
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'fleet' | 'branches' | 'sales_inventory'>('fleet');

  const companyListings = listings.filter(
    l => l.providerType === 'company'
  );

  const companySales = saleListings.filter(
    s => s.sellerType === 'company' || s.sellerType === 'dealership'
  );

  const branches = [
    { name: 'الساحة المركزية - بغداد (التاجي)', count: 12, manager: 'م. عمر التكريتي', phone: '0770 123 4567' },
    { name: 'فرع البصرة اللوجستي - حقول الزبير', count: 8, manager: 'سعد الأسدي', phone: '0780 987 6543' },
    { name: 'مستودع أربيل الشمالي - بحركة', count: 6, manager: 'سركوت خضر', phone: '0750 345 6789' }
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Enterprise Fleet Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xl">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  إدارة أسطول شركة التأجير
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>باقة الشركات (Fleet Enterprise)</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {currentUser?.companyName || 'شركة دجلة والفرات للآليات الإنشائية'} · سجل تجاري: {currentUser?.commercialRegistrationNumber || 'IQ-BGD-2021-99432'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setActiveTab('wallet')}
              className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-right hover:border-amber-500/40 transition-colors"
            >
              <span className="text-[10px] text-slate-500 block">رصيد الشركة التقديري:</span>
              <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                {formatIqd(userWallet.balanceIqd)}
              </div>
            </button>
            <button
              onClick={openAddListingModal}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إدراج آلية تأجير</span>
            </button>
            <button
              onClick={openAddSaleListingModal}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 font-bold text-xs hover:bg-slate-700 transition-colors shadow-sm"
            >
              <Tag className="w-4 h-4" />
              <span>عرض آلية للبيع</span>
            </button>
          </div>
        </div>

        {/* Enterprise KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>إجمالي الآليات بالأسطول:</span>
              <Tractor className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">26 آلية</div>
            <span className="text-[10px] text-emerald-400">18 آلية نشطة في عقود عمل</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>فروع المحافظات:</span>
              <MapPin className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">3 ساحات</div>
            <span className="text-[10px] text-slate-400">بغداد · البصرة · أربيل</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>طاقم السائقين والمشغلين:</span>
              <Users className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">34 مشغلاً</div>
            <span className="text-[10px] text-emerald-400">مرخصين بشهادات فحص دولية</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>معدل التشغيل الشهري:</span>
              <BarChart3 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">84%</div>
            <span className="text-[10px] text-slate-400">مقارنة بـ 72% الشهر الماضي</span>
          </div>
        </div>

        {/* Tab switcher for Fleet Management */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTabSub('fleet')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTabSub === 'fleet' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            سجل آليات الأسطول ({companyListings.length})
          </button>
          <button
            onClick={() => setActiveTabSub('branches')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTabSub === 'branches' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ساحات العمل وفروع المحافظات (3)
          </button>
          <button
            onClick={() => setActiveTabSub('sales_inventory')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTabSub === 'sales_inventory' ? 'border-amber-500 text-amber-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            معرض البيع وقطع الغيار ({companySales.length})
          </button>
        </div>

        {/* Fleet Listings Table */}
        {activeTabSub === 'fleet' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">الآلية والشركة المصنعة</th>
                    <th className="py-3 px-4">الموقع والفرع</th>
                    <th className="py-3 px-4">المواصفات</th>
                    <th className="py-3 px-4">السعر اليومي (د.ع)</th>
                    <th className="py-3 px-4">حالة التشغيل</th>
                    <th className="py-3 px-4">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {companyListings.map(item => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded bg-slate-800 overflow-hidden shrink-0">
                            <img src={item.imageUrl} alt={item.titleAr} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">{item.titleAr}</span>
                            <span className="text-[10px] text-amber-400">{item.manufacturer} — {item.modelName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span>{item.governorate}</span>
                        <span className="block text-[10px] text-slate-500">{item.city}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span>{item.specs.powerHorsepower} HP</span>
                        <span className="block text-[10px] text-slate-400">
                          {item.specs.operatingWeightTons > 0 ? `${item.specs.operatingWeightTons} طن` : item.specs.capacity}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                        {formatIqd(item.priceDailyIqd)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                          جاهز للعمل
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => openEquipmentDetails(item.id)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                        >
                          معاينة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Branches list */}
        {activeTabSub === 'branches' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {branches.map((b, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white font-heading">{b.name}</h3>
                  <span className="text-xs font-mono text-amber-400 font-bold">{b.count} آلية</span>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>مسؤول الساحة: <strong className="text-slate-200">{b.manager}</strong></div>
                  <div>هاتف التنسيق: <span className="font-mono">{b.phone}</span></div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>جاهزية صيانة 24/7</span>
                  </span>
                  <button className="text-amber-400 hover:underline">إدارة الساحة</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sales Showroom & Spare Parts Section */}
        {activeTabSub === 'sales_inventory' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    آليات البيع المسجلة تحت اسم الشركة والوكالة
                  </h3>
                  <p className="text-xs text-slate-400">
                    بصفتك شركة تأجير مرخصة، يحق لك إدراج آليات للبيع المباشر والتقسيط مع أرقام اللوحات والتخليص الجمركي
                  </p>
                </div>
                <button
                  onClick={openAddSaleListingModal}
                  className="px-3.5 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إدراج آلية جديدة للبيع</span>
                </button>
              </div>

              {companySales.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  لا توجد آليات بيع معروضة حالياً. اضغط على زر إدراج آلية للبيع لعرض معدات جديدة.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companySales.map(sale => (
                    <div
                      key={sale.id}
                      onClick={() => openSaleDetails(sale.id)}
                      className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/40 transition-colors cursor-pointer group flex flex-col"
                    >
                      <div className="relative h-44 bg-slate-900">
                        <img
                          src={sale.imageUrl}
                          alt={sale.titleAr}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[11px] text-amber-400 font-mono font-bold">
                          {sale.year} · {sale.operatingHours ? `${sale.operatingHours.toLocaleString()} س/ع` : 'جديد'}
                        </div>
                        <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur px-2 py-0.5 rounded text-[10px] text-slate-300">
                          {sale.inspectionReportAvailable ? 'فحص فني معتمد' : 'معاينة موقعية'}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="text-[11px] text-slate-400 mb-0.5 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            <span>{sale.governorate} — {sale.city}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                            {sale.titleAr}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {sale.descriptionAr}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 block">سعر البيع المطلوب:</span>
                            <span className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                              {formatIqd(sale.askingPriceIqd)}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-amber-400">
                            <span>تفاصيل</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Link to Parts & Maintenance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>سوق قطع الغيار الأصلية</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    تصفح آلاف القطع المعتمدة مع محلات السنك والشيخ عمر وأربيل
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('parts')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors shrink-0"
                >
                  فتح السوق
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                    <Wrench className="w-4 h-4 text-amber-400" />
                    <span>دليل مراكز الصيانة والورش</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    ورش الهيدروليك وتوضيب المحركات والوحدات الميدانية المتنقلة
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('maintenance')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors shrink-0"
                >
                  فتح الدليل
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
