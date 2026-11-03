/**
 * Machinix Centralized Subscription Pricing Configuration
 * All subscription tier pricing, feature limits, and annual discount calculations
 * are maintained here in Iraqi Dinars (IQD) so administrators can adjust them dynamically.
 */

import { PlatformPricingSettings, SubscriptionPlan } from '../types';

export const INITIAL_PLATFORM_PRICING: PlatformPricingSettings = {
  annualDiscountMonthsFree: 2, // شهران مجاناً عند الدفع السنوي (توفير ~17%)
  currency: 'IQD',
  currencySymbolAr: 'د.ع',
  saleListingRequiredTier: 'pro_owner',
  plans: {
    basic: {
      id: 'basic',
      nameAr: 'الأساسية',
      nameEn: 'Basic Owner',
      targetAudienceAr: 'ملاك الآليات الفرديون (تأجير فقط)',
      targetRole: 'owner',
      priceMonthlyIqd: 10000,
      priceAnnualIqd: 100000, // 10,000 * 10 (2 months free)
      canPublishSaleListings: false,
      canPublishMaintenancePosts: false,
      canManagePartsInventory: false,
      maxListings: 3,
      featuresAr: [
        'إدراج حتى 3 آليات في سوق التأجير',
        'استقبال طلبات الاستئجار المباشرة',
        'ملف تعريف المالك في المحافظة',
        'لوحة تحكم وتتبع حالة المعدات',
        'دعم فني عبر الواتساب'
      ]
    },
    pro_owner: {
      id: 'pro_owner',
      nameAr: 'المالك المحترف',
      nameEn: 'Pro Owner',
      targetAudienceAr: 'الملاك الفرديون الراغبون في بيع وتأجير الآليات الثقيلة',
      targetRole: 'owner',
      priceMonthlyIqd: 20000,
      priceAnnualIqd: 200000, // 20,000 * 10 (2 months free)
      isPopular: true,
      badgeAr: 'الأكثر طلباً',
      canPublishSaleListings: true, // صلاحية بيع الآليات
      canPublishMaintenancePosts: false,
      canManagePartsInventory: false,
      maxListings: 10,
      featuresAr: [
        'كل مزايا الباقة الأساسية',
        'صلاحية نشر آليات في سوق البيع والشراء',
        'إدراج حتى 10 آليات مع تقرير الفحص',
        'أولوية الظهور في نتائج البحث بالمحافظة',
        'إمكانية إرفاق شهادات الفحص والتخليص الجمركي',
        'شارة مالك معتمد وموثق'
      ]
    },
    business: {
      id: 'business',
      nameAr: 'الأعمال والمتاجر',
      nameEn: 'Business',
      targetAudienceAr: 'محلات قطع الغيار ومراكز الصيانة والورش',
      targetRole: 'shop',
      priceMonthlyIqd: 35000,
      priceAnnualIqd: 350000, // 35,000 * 10 (2 months free)
      badgeAr: 'للمتاجر والورش',
      canPublishSaleListings: true,
      canPublishMaintenancePosts: true, // صلاحية منشورات الورش
      canManagePartsInventory: true,   // إدارة مخزون قطع الغيار
      maxListings: 50,
      featuresAr: [
        'استوديو نشر المنشورات الترويجية والعروض للورش',
        'إدارة ونشر مخزون قطع الغيار بأرقام OEM',
        'تحديث حالات التوفر والكميات المباشرة',
        'تحديد نطاق تغطية وحدات الطوارئ الميدانية 24/7',
        'صفحة متجر ومركز صيانة معتمد ورسمي',
        'إحصائيات المشاهدات وطلبات الاستفسار'
      ]
    },
    enterprise: {
      id: 'enterprise',
      nameAr: 'الشركات والوكالات',
      nameEn: 'Enterprise Fleet',
      targetAudienceAr: 'شركات تأجير الأساطيل، وكالات المعدات، والشركات الكبرى',
      targetRole: 'company',
      priceMonthlyIqd: 50000,
      priceAnnualIqd: 500000, // 50,000 * 10 (2 months free)
      badgeAr: 'للشركات والأسطول',
      canPublishSaleListings: true,
      canPublishMaintenancePosts: true,
      canManagePartsInventory: true,
      maxListings: 'unlimited',
      featuresAr: [
        'إدراج غير محدود لآليات التأجير والبيع',
        'إدارة فروع وساحات العمل في عموم المحافظات',
        'نظام إدارة طاقم السائقين والمشغلين المعتمدين',
        'سجل تجاري موثق وعقود رقمية موحدة',
        'ربط مستودعات قطع الغيار التابعة للأسطول',
        'مدير حساب مخصص وتقارير مالية تفصيلية'
      ]
    }
  }
};

/**
 * Converts dynamic platform pricing into legacy SubscriptionPlan array
 * for seamless backward compatibility with existing views.
 */
export function getSubscriptionPlansList(pricing: PlatformPricingSettings): SubscriptionPlan[] {
  return [
    {
      id: 'plan_basic',
      tier: 'basic',
      nameAr: pricing.plans.basic.nameAr,
      nameEn: pricing.plans.basic.nameEn,
      targetRole: 'owner',
      priceMonthlyIqd: pricing.plans.basic.priceMonthlyIqd,
      priceYearlyIqd: pricing.plans.basic.priceAnnualIqd,
      maxActiveListings: 3,
      featuredListingsCount: 0,
      commissionDiscountPercent: 0,
      hasVerifiedBadge: false,
      hasAnalytics: false,
      hasDedicatedSupport: false,
      canPublishSaleListings: false,
      featuresListAr: pricing.plans.basic.featuresAr
    },
    {
      id: 'plan_pro_owner',
      tier: 'pro_owner',
      nameAr: pricing.plans.pro_owner.nameAr,
      nameEn: pricing.plans.pro_owner.nameEn,
      targetRole: 'owner',
      priceMonthlyIqd: pricing.plans.pro_owner.priceMonthlyIqd,
      priceYearlyIqd: pricing.plans.pro_owner.priceAnnualIqd,
      maxActiveListings: 10,
      featuredListingsCount: 2,
      commissionDiscountPercent: 20,
      hasVerifiedBadge: true,
      hasAnalytics: true,
      hasDedicatedSupport: true,
      canPublishSaleListings: true,
      featuresListAr: pricing.plans.pro_owner.featuresAr
    },
    {
      id: 'plan_business',
      tier: 'business',
      nameAr: pricing.plans.business.nameAr,
      nameEn: pricing.plans.business.nameEn,
      targetRole: 'shop',
      priceMonthlyIqd: pricing.plans.business.priceMonthlyIqd,
      priceYearlyIqd: pricing.plans.business.priceAnnualIqd,
      maxActiveListings: 50,
      featuredListingsCount: 5,
      commissionDiscountPercent: 30,
      hasVerifiedBadge: true,
      hasAnalytics: true,
      hasDedicatedSupport: true,
      canPublishSaleListings: true,
      featuresListAr: pricing.plans.business.featuresAr
    },
    {
      id: 'plan_enterprise',
      tier: 'enterprise',
      nameAr: pricing.plans.enterprise.nameAr,
      nameEn: pricing.plans.enterprise.nameEn,
      targetRole: 'company',
      priceMonthlyIqd: pricing.plans.enterprise.priceMonthlyIqd,
      priceYearlyIqd: pricing.plans.enterprise.priceAnnualIqd,
      maxActiveListings: 'unlimited',
      featuredListingsCount: 15,
      commissionDiscountPercent: 50,
      hasVerifiedBadge: true,
      hasAnalytics: true,
      hasDedicatedSupport: true,
      canPublishSaleListings: true,
      featuresListAr: pricing.plans.enterprise.featuresAr
    }
  ];
}
