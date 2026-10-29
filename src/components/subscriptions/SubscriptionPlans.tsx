import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, AlertCircle, Sparkles } from 'lucide-react';
import { getSubscriptionPlansList } from '../../data/pricingConfig';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';

export const SubscriptionPlans: React.FC = () => {
  const { currentRole, switchRole, pricingSettings } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const plans = getSubscriptionPlansList(pricingSettings);

  const handleSelectPlan = (planId: string, roleTarget: any) => {
    setFeedbackMsg(`تم تفعيل خطة الاشتراك التجريبية بنجاح.`);
    if (currentRole !== roleTarget && currentRole !== 'admin') {
      switchRole(roleTarget);
    }
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>باقات اشتراك محلية ميسرة للمحافظات العراقية</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
            باقات اشتراك ماشينكس للمعدات والورش والمتاجر
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            أسعار اشتراك مدروسة ورمزية بالدينار العراقي لدعم قطاع المقاولات والإنشاءات والورش الصناعية ومحلات قطع الغيار في عموم العراق.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              دفع شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>دفع سنوي</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
                شهران مجاناً (-17%)
              </span>
            </button>
          </div>
        </div>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div className="max-w-md mx-auto mb-8 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs p-3 rounded-xl text-center animate-in fade-in">
            {feedbackMsg}
          </div>
        )}

        {/* Separation of Subscriptions vs Wallets Notice */}
        <div className="max-w-3xl mx-auto mb-10 bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white block mb-0.5">فصل نظام الاشتراكات عن رصيد المحفظة:</strong>
            تحدد خطة الاشتراك صلاحيات الحساب (مثل نشر بيع الآليات للمالك المحترف، أو نشر عروض الورش ومخزون قطع الغيار لباقة الأعمال). تُحفظ مدفوعات التأجير والمبيعات في محفظة رصيد منفصلة. جميع الأسعار تجريبية بالدينار العراقي (IQD).
          </div>
        </div>

        {/* Plans Grid (4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isPopular = plan.tier === 'pro_owner';
            const price = billingCycle === 'monthly' ? plan.priceMonthlyIqd : plan.priceYearlyIqd;
            const cycleText = billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً';

            let audienceTitle = 'الملاك الفرديون';
            let badgeText = '';
            if (plan.tier === 'basic') {
              audienceTitle = 'ملاك الآليات (تأجير فقط)';
            } else if (plan.tier === 'pro_owner') {
              audienceTitle = 'الملاك المحترفون (تأجير + بيع)';
              badgeText = 'الأكثر طلباً للملاك';
            } else if (plan.tier === 'business') {
              audienceTitle = 'محلات القطع ومراكز الصيانة';
              badgeText = 'للمتاجر والورش';
            } else if (plan.tier === 'enterprise') {
              audienceTitle = 'شركات الأساطيل والوكالات';
              badgeText = 'للشركات والوكلاء';
            }

            return (
              <div
                key={plan.id}
                className={`bg-slate-900 rounded-2xl p-5 border flex flex-col justify-between relative transition-all ${
                  isPopular
                    ? 'border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {badgeText && (
                  <div
                    className={`absolute -top-3 right-4 font-bold text-[10px] px-3 py-1 rounded-full shadow-sm ${
                      isPopular
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-cyan-600 text-white'
                    }`}
                  >
                    {badgeText}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white font-heading">{plan.nameAr}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{audienceTitle}</p>
                  </div>

                  <div className="mb-5 pb-4 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                        {formatIqd(price)}
                      </span>
                      <span className="text-xs text-slate-400 font-sans">/ {cycleText}</span>
                    </div>
                    <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
                      {formatUsdEquivalent(price)}
                    </div>
                  </div>

                  {/* Feature Limits summary */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 mb-5 text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">سعة الإدراج:</span>
                      <span className="text-white font-bold">
                        {plan.maxActiveListings === 'unlimited' ? 'غير محدود' : `${plan.maxActiveListings} عنصر`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">سوق البيع والشراء:</span>
                      <span className={plan.canPublishSaleListings ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {plan.canPublishSaleListings ? 'متاح ومفعل' : 'غير مشمول'}
                      </span>
                    </div>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    {plan.featuresListAr.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id, plan.targetRole)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    isPopular
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>ترقية الحساب الآن (محاكاة)</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
