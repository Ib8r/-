import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Sparkles, Check } from 'lucide-react';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';

export const SubscriptionUpgradeModal: React.FC = () => {
  const {
    isSubscriptionUpgradeModalOpen,
    closeSubscriptionUpgradeModal,
    upgradeSubscriptionDemo,
    currentUser,
    switchRole,
    pricingSettings,
  } = useApp();

  if (!isSubscriptionUpgradeModalOpen) return null;

  const proPlan = pricingSettings.plans.pro_owner;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative my-auto animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              ترقية الحساب لنشر آليات البيع
            </h2>
          </div>
          <button
            onClick={closeSubscriptionUpgradeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-xs">
          {/* Explanation Box */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-slate-200 space-y-2">
            <span className="font-bold text-amber-400 block text-sm font-heading">
              شرط تأهيل البائع الفردي (Business Rule):
            </span>
            <p className="text-xs leading-relaxed text-slate-300">
              للحفاظ على موثوقية سوق المعدات ومنع الإعلانات الوهمية، يتطلب نشر الآليات المعروضة للبيع حساب مالك معدات نشط على <strong>باقة {proPlan.nameAr}</strong> ({formatIqd(proPlan.priceMonthlyIqd)} شهرياً) فما فوق.
            </p>
            <div className="pt-1 text-[11px] text-slate-400">
              حسابك الحالي: <strong className="text-white">{currentUser?.fullName || currentUser?.name}</strong> ({currentUser?.role === 'owner' ? 'باقة مجانية' : 'حساب مقاول'})
            </div>
          </div>

          {/* Pro Owner Tier Highlights */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white font-heading">{proPlan.nameAr}</h3>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-sm text-amber-400 font-mono font-bold">
                    {formatIqd(proPlan.priceMonthlyIqd)} / شهرياً
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({formatUsdEquivalent(proPlan.priceMonthlyIqd)})
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                مؤهلة لبيع وتأجير المعدات
              </span>
            </div>

            <ul className="space-y-2 text-slate-300 pt-2 border-t border-slate-800">
              {proPlan.featuresAr.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => upgradeSubscriptionDemo('pro_owner')}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>ترقية الحساب الآن إلى "{proPlan.nameAr}" مقابل {formatIqd(proPlan.priceMonthlyIqd)}/شهر والمتابعة</span>
            </button>

            <button
              onClick={() => {
                switchRole('company');
                closeSubscriptionUpgradeModal();
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] transition-colors cursor-pointer"
            >
              أنا شركة تأجير / معرض آليات مرخص (التبديل لحساب شركة)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
