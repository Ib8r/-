# Machinix: Revised Subscription Pricing, Maintenance Publishing & Spare Parts Listings

A refined architectural blueprint updating the Machinix subscription structure with the calibrated Iraqi pricing tiers (Basic 10,000 IQD, Pro Owner 20,000 IQD, Business 35,000 IQD, and Enterprise 50,000 IQD) stored in a single centralized configuration, alongside maintenance center post publishing and spare-parts shop listings.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The subscription pricing has been updated to the following calibrated Iraqi market rates:
>
> - **Basic Plan (الباقة الأساسية)**: **10,000 د.ع / شهرياً** (سنوي: 100,000 د.ع — شهران مجاناً). Target: Individual equipment owners (ملاك الآليات الفرديون).
> - **Pro Owner Plan (المالك المحترف)**: **20,000 د.ع / شهرياً** (سنوي: 200,000 د.ع — شهران مجاناً). Target: Individual owners needing advanced listing tools and **equipment-for-sale publishing**.
> - **Business Plan (باقة الأعمال والمتاجر)**: **35,000 د.ع / شهرياً** (سنوي: 350,000 د.ع — شهران مجاناً). Target: Spare-parts shops and maintenance centers (محلات قطع الغيار ومراكز الصيانة والورش).
> - **Enterprise Plan (باقة الشركات والوكالات)**: **50,000 د.ع / شهرياً** (سنوي: 500,000 د.ع — شهران مجاناً). Target: Equipment rental companies, official dealerships, and fleet operators (شركات التأجير الكبرى، وكالات الآليات، وإدارة الأساطيل).
>
> **Confirmed Core Rule**: Individual equipment-for-sale listings remain strictly restricted to **Pro Owner (20,000 IQD/mo)** or higher eligible tiers. Ineligible users receive an immediate, friendly upgrade modal referencing this exact active rate.

---

## 1. Overview & Core Concept

Machinix consolidates all subscription rates into a single centralized configuration engine (`src/data/pricingConfig.ts` & `AppContext`). Any update to a tier price, feature limit, or discount dynamically propagates across all subscription cards, upgrade modals, role dashboards, and admin editors without hardcoded string mismatches.

### Scope of Changes:
1. **Centralized Pricing Engine**: Single source of truth defining the 4 plans, monthly and annual prices in IQD, target audiences, feature flags, and sale-publishing eligibility.
2. **Synchronized UI Elements**:
   - `SubscriptionPlans.tsx`: Displays Basic (10k), Pro Owner (20k), Business (35k), Enterprise (50k) with monthly/annual toggle (2 months free discount).
   - `SubscriptionUpgradeModal.tsx`: Explicitly shows the 20,000 IQD/month rate for unlocking equipment-for-sale listings.
   - `OwnerDashboard.tsx`, `CompanyDashboard.tsx`, and `AdminDashboard.tsx`: Reflect active subscription tiers, pricing badges, and simulated renewal terms.
   - `AdminDashboard.tsx`: Includes a dynamic settings pane to review and modify plan pricing on the fly.
3. **Maintenance Center Post Publishing**: Promotional posts feed and studio with edit, delete, publish, and unpublish controls.
4. **Spare Parts Shop Listings**: Inventory management with conditions (new, used, refurbished), stock status (in stock, limited, out of stock), and quantity tracking.
5. **Role Switcher Personas**: Adds `workshop` (ورشة الرافدين) and `shop` (العراق الجديد) to test all flows directly.

---

## 2. User Experience & Visual Design

### A. Subscription Plans Presentation (`/plans`)
- **Billing Switcher**: Segmented toggle between `شهري (Monthly)` and `سنوي — وفر شهرين مجاناً (Annual - 2 Months Free)`.
- **Four Distinct Tier Cards**:
  1. **الأساسية (Basic)**: 10,000 د.ع/شهر · للملاك الأفراد مع إدارة آليات التأجير والطلبات.
  2. **المالك المحترف (Pro Owner - مميزة)**: 20,000 د.ع/شهر · بطاقة مميزة باللون الكهرماني، تتضمن نشر آليات البيع والشراء، أولوية في نتائج البحث، ومتابعة الاستفسارات.
  3. **الأعمال (Business)**: 35,000 د.ع/شهر · مخصصة لمتاجر قطع الغيار ومراكز الصيانة والورش، تشمل نشر المنشورات الترويجية وإدارة المخزون.
  4. **الشركات (Enterprise)**: 50,000 د.ع/شهر · مخصصة للوكالات وشركات الأسطول مع إدارة الساحات اللوجستية وعقود المشاريع الكبرى.
- **Consistent Unboxed Metadata**: No pill badge clutter; clean typographic hierarchy (`Cairo` headings, `IBM Plex Sans Arabic` body, `JetBrains Mono` tabular prices).

### B. Equipment Sale Publishing Restriction
- When an individual owner attempts to list machinery for sale:
  - If on `Basic` (10,000 IQD): Displays `SubscriptionUpgradeModal` explaining that selling machinery requires **باقة المالك المحترف (20,000 د.ع / شهرياً)** with a one-click simulated upgrade CTA.
  - If on `Pro Owner` (20,000 IQD), `Business`, or `Enterprise`: Form opens immediately.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale | Alternatives Rejected |
| :--- | :--- | :--- | :--- |
| **Centralization Strategy** | Single `PLATFORM_PRICING` module exported to context & components | Prevents inconsistent price discrepancies across the app; allows admin adjustments in demo | Dispersed price literals across separate files |
| **Annual Billing Ratio** | Monthly × 10 (2 months free / ~16.7% discount) | Clear, transparent arithmetic in IQD (100k, 200k, 350k, 500k) | Unrounded percentage discounts resulting in awkward dinar figures |
| **Business vs Enterprise Split** | Business (35k) for workshops/shops; Enterprise (50k) for fleet dealerships | Matches the user's exact specification and provides targeted tools for each business type | Merging all businesses into a single flat tier |
| **Payment Integrity** | Explicit simulated transaction / prototype disclosure | No unapproved payment gateways or mock credit card collections; maintains platform trust | Mock checkout forms pretending to process real bank cards |

---

## 4. Technical Architecture & Data Strategy

### A. Central Pricing Configuration Schema (`src/data/pricingConfig.ts`)

```typescript
export interface PlanTierConfig {
  id: 'basic' | 'pro_owner' | 'business' | 'enterprise';
  nameAr: string;
  nameEn: string;
  targetAudienceAr: string;
  priceMonthlyIqd: number;
  priceAnnualIqd: number; // 10 months calculation
  badgeAr?: string;
  isPopular?: boolean;
  canPublishSaleListings: boolean;
  canPublishMaintenancePosts: boolean;
  canManagePartsInventory: boolean;
  maxListings: number | 'unlimited';
  featuresAr: string[];
}

export interface PlatformPricingSettings {
  plans: Record<string, PlanTierConfig>;
  annualDiscountMonthsFree: number;
  currency: 'IQD';
  currencySymbolAr: 'د.ع';
  saleListingRequiredTier: 'pro_owner';
}

export const INITIAL_PLATFORM_PRICING: PlatformPricingSettings = {
  annualDiscountMonthsFree: 2,
  currency: 'IQD',
  currencySymbolAr: 'د.ع',
  saleListingRequiredTier: 'pro_owner',
  plans: {
    basic: {
      id: 'basic',
      nameAr: 'الأساسية',
      nameEn: 'Basic Owner',
      targetAudienceAr: 'ملاك الآليات الفرديون',
      priceMonthlyIqd: 10_000,
      priceAnnualIqd: 100_000,
      canPublishSaleListings: false,
      canPublishMaintenancePosts: false,
      canManagePartsInventory: false,
      maxListings: 3,
      featuresAr: [
        'إدراج حتى 3 آليات في سوق التأجير',
        'استقبال طلبات الاستئجار عبر المنصة',
        'الملف الشخصي للمالك والمحافظة',
        'دعم فني عبر الواتساب'
      ]
    },
    pro_owner: {
      id: 'pro_owner',
      nameAr: 'المالك المحترف',
      nameEn: 'Pro Owner',
      targetAudienceAr: 'الملاك الفرديون الراغبون في بيع وتأجير الآليات',
      priceMonthlyIqd: 20_000,
      priceAnnualIqd: 200_000,
      isPopular: true,
      badgeAr: 'الأكثر طلباً',
      canPublishSaleListings: true,
      canPublishMaintenancePosts: false,
      canManagePartsInventory: false,
      maxListings: 10,
      featuresAr: [
        'كل مزايا الباقة الأساسية',
        'صلاحية نشر آليات في سوق البيع والشراء',
        'إدراج حتى 10 آليات مع مواصفات الفحص',
        'أولوية الظهور في نتائج البحث',
        'شارة مالك معتمد موثق'
      ]
    },
    business: {
      id: 'business',
      nameAr: 'الأعمال والمتاجر',
      nameEn: 'Business',
      targetAudienceAr: 'محلات قطع الغيار ومراكز الصيانة والورش',
      priceMonthlyIqd: 35_000,
      priceAnnualIqd: 350_000,
      canPublishSaleListings: true,
      canPublishMaintenancePosts: true,
      canManagePartsInventory: true,
      maxListings: 50,
      featuresAr: [
        'نشر وإدارة مخزون قطع الغيار بأرقام OEM',
        'استوديو نشر المنشورات الترويجية للورش',
        'تحديث حالات التوفر والأسعار المباشرة',
        'صفحة متجر وورشة رسمية معتمدة'
      ]
    },
    enterprise: {
      id: 'enterprise',
      nameAr: 'الشركات والوكالات',
      nameEn: 'Enterprise',
      targetAudienceAr: 'شركات التأجير الكبرى، وكالات الآليات، وإدارة الأساطيل',
      priceMonthlyIqd: 50_000,
      priceAnnualIqd: 500_000,
      canPublishSaleListings: true,
      canPublishMaintenancePosts: true,
      canManagePartsInventory: true,
      maxListings: 'unlimited',
      featuresAr: [
        'إدراج غير محدود لآليات التأجير والبيع',
        'إدارة ساحات العمل المتعددة عبر المحافظات',
        'لوحة تحكم الأسطول وتعيين المشغلين',
        'تصدير تقارير العقود وسجل الصيانة'
      ]
    }
  }
};
```

### B. Implementation Sequence
1. **Central Pricing Module**: Create `src/data/pricingConfig.ts` with the new schema and pricing numbers (10,000, 20,000, 35,000, 50,000 IQD).
2. **Context & Business Logic**:
   - Integrate `pricingConfig` into `AppContext.tsx`.
   - Update `checkSalePublishingEligibility()` to reference `pricingConfig.plans.pro_owner.priceMonthlyIqd`.
   - Provide an admin updater function `updatePlanPrice(planId, monthlyPrice)`.
3. **UI Updates & Consistency Audit**:
   - Replace old pricing references in `SubscriptionPlans.tsx`, `SubscriptionUpgradeModal.tsx`, `OwnerDashboard.tsx`, `CompanyDashboard.tsx`, and `AdminDashboard.tsx`.
   - Ensure all price displays use `formatIqd()`.
4. **Maintenance & Shop Features Execution**:
   - Implement `MaintenancePost` model, mock data, creation modal, and public feed.
   - Implement `SparePartItem` stock update actions and inventory controls in shop dashboard.
   - Add dedicated `workshop` and `shop` roles to `RoleSwitcherBar.tsx`.
5. **Testing & Verification**:
   - Run `lint_applet` and `compile_applet`.
   - Verify zero price discrepancies and working upgrade flow.
