# Package Marketplace Mobile Application into Standalone Export Directory

A non-destructive architectural blueprint for packaging the complete original heavy equipment marketplace application into a dedicated, self-contained directory (`/packages/marketplace-mobile`) for future independent export to native Android (and subsequent iOS), while keeping the **HEAVY DUTY Corporate Website** completely untouched and 100% ready for Vercel deployment.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Zero Interference with Corporate Website**: The HEAVY DUTY corporate promotional website (`/src/App.tsx`, `/src/views/*`, `/src/components/layout/Header.tsx`, `/src/components/layout/Footer.tsx`, etc.) will remain completely unaffected. No marketplace routes or dependencies will be injected into the website.
> - **Self-Contained Mobile Directory**: All original marketplace source files (all 6 role dashboards, rental catalog, machinery sales, spare parts OEM inventory, workshop publishing studio, 4 subscription tiers, centralized pricing engine, and wallet) will be organized into `/packages/marketplace-mobile/`.
> - **Complete Original Marketplace Orchestrator**: An independent `App.tsx` entry point will be placed inside `/packages/marketplace-mobile/src/App.tsx` restoring the original multi-role tab navigation, role switcher, and interactive modals.
> - **Standalone Manifest & Android Export Blueprint**: A dedicated `package.json` and a comprehensive `README.md` will accompany the standalone package, detailing the architecture, state machines, and export roadmap for native Android development.
> - **Non-Destructive Guarantee**: No files in the website will be overwritten or broken. The root `npm run build` will continue to compile cleanly for Vercel.

---

## 1. Overview & Separation Strategy

```
Repository Root
│
├── vercel.json                 <-- Corporate Website Vercel Deployment Config
├── index.html                  <-- Website Entry Point
├── package.json                <-- Clean Website Build Dependencies
├── src/                        <-- HEAVY DUTY Corporate Promotional Website
│   ├── App.tsx                 <-- Website Route Orchestrator
│   ├── views/                  <-- 12 Corporate Views (Home, 4 Services, About, etc.)
│   ├── components/layout/      <-- Corporate Header & Footer
│   ├── context/                <-- LanguageContext (AR/EN) & RouterContext
│   └── i18n/                   <-- Bilingual Translations
│
└── packages/
    └── marketplace-mobile/     <-- STANDALONE MOBILE APP EXPORT PACKAGE
        ├── package.json        <-- Mobile Marketplace Dependencies Manifest
        ├── README.md           <-- Architecture, State Models & Android Export Guide
        └── src/
            ├── App.tsx         <-- Original Complete Marketplace Application Entry Point
            ├── context/
            │   └── AppContext.tsx (1,259-line State Machine & Pricing Engine)
            ├── components/
            │   ├── dashboards/ (Admin, Company, Customer, Owner, Shop, Workshop)
            │   ├── catalog/    (EquipmentCatalog)
            │   ├── sales/      (SalesMarketplace, AddSale, SaleDetail, UpgradeModal)
            │   ├── parts/      (PartsMarketplace, CreateSparePart, PartDetail)
            │   ├── maintenance/(Directory, PostsFeed, DetailModal, CreatePost)
            │   ├── equipment/  (AddListing, DetailModal, RentalRequestModal)
            │   ├── subscriptions/ (SubscriptionPlans - 10k, 20k, 35k, 50k IQD)
            │   ├── wallet/     (DemoWallet)
            │   ├── auth/       (AuthModal)
            │   ├── common/     (RoleSwitcherBar, DemoBanner, ServiceInquiryModal)
            │   └── layout/     (Navbar, MobileBottomNav)
            ├── data/           (All 9 sample datasets & pricingConfig.ts)
            ├── types/          (Comprehensive TypeScript interfaces)
            └── utils/          (formatters.ts)
```

---

## 2. Inventory of Files to Package into Standalone Mobile Directory

All marketplace source code will be copied into `/packages/marketplace-mobile/` so it is isolated and ready for export:

### A. Core State & Data Models
- `src/context/AppContext.tsx` $\rightarrow$ `/packages/marketplace-mobile/src/context/AppContext.tsx`
- `src/types/index.ts` $\rightarrow$ `/packages/marketplace-mobile/src/types/index.ts`
- `src/utils/formatters.ts` $\rightarrow$ `/packages/marketplace-mobile/src/utils/formatters.ts`
- `src/data/governorates.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/governorates.ts`
- `src/data/pricingConfig.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/pricingConfig.ts`
- `src/data/sampleListings.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/sampleListings.ts`
- `src/data/sampleMaintenance.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/sampleMaintenance.ts`
- `src/data/sampleMaintenancePosts.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/sampleMaintenancePosts.ts`
- `src/data/sampleParts.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/sampleParts.ts`
- `src/data/sampleSales.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/sampleSales.ts`
- `src/data/sampleSubscriptions.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/sampleSubscriptions.ts`
- `src/data/sampleUsers.ts` $\rightarrow$ `/packages/marketplace-mobile/src/data/sampleUsers.ts`

### B. Dashboards & Business Workflows
- `src/components/dashboards/AdminDashboard.tsx`
- `src/components/dashboards/CompanyDashboard.tsx`
- `src/components/dashboards/CustomerDashboard.tsx`
- `src/components/dashboards/OwnerDashboard.tsx`
- `src/components/dashboards/ShopDashboard.tsx`
- `src/components/dashboards/WorkshopDashboard.tsx`

### C. Marketplace Features & Modals
- `src/components/catalog/EquipmentCatalog.tsx`
- `src/components/equipment/AddListingModal.tsx`
- `src/components/equipment/EquipmentDetailModal.tsx`
- `src/components/equipment/RentalRequestModal.tsx`
- `src/components/sales/AddSaleListingModal.tsx`
- `src/components/sales/SaleDetailModal.tsx`
- `src/components/sales/SalesMarketplace.tsx`
- `src/components/sales/SubscriptionUpgradeModal.tsx`
- `src/components/parts/CreateSparePartModal.tsx`
- `src/components/parts/PartDetailModal.tsx`
- `src/components/parts/PartsMarketplace.tsx`
- `src/components/maintenance/CreateMaintenancePostModal.tsx`
- `src/components/maintenance/MaintenanceDetailModal.tsx`
- `src/components/maintenance/MaintenanceDirectory.tsx`
- `src/components/maintenance/MaintenancePostsFeed.tsx`
- `src/components/provider/ProviderProfileModal.tsx`
- `src/components/subscriptions/SubscriptionPlans.tsx`
- `src/components/wallet/DemoWallet.tsx`
- `src/components/auth/AuthModal.tsx`
- `src/components/common/DemoBanner.tsx`
- `src/components/common/RoleSwitcherBar.tsx`
- `src/components/common/ServiceInquiryModal.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/MobileBottomNav.tsx`

### D. Standalone App Orchestrator (`/packages/marketplace-mobile/src/App.tsx`)
Reconstructs the original marketplace application orchestrator mounting:
- `<AppProvider>`
- `<RoleSwitcherBar>` & `<DemoBanner>`
- Active tab router switching between:
  - `home` (`HeroSection`, `CategoryShortcuts`, `FeaturedListings`, `HowItWorks`)
  - `catalog` (`EquipmentCatalog`)
  - `sales` (`SalesMarketplace`)
  - `parts` (`PartsMarketplace`)
  - `maintenance` (`MaintenanceDirectory`, `MaintenancePostsFeed`)
  - `plans` (`SubscriptionPlans`)
  - `wallet` (`DemoWallet`)
  - `customer_dashboard` (`CustomerDashboard`)
  - `owner_dashboard` (`OwnerDashboard`)
  - `company_dashboard` (`CompanyDashboard`)
  - `workshop_dashboard` (`WorkshopDashboard`)
  - `shop_dashboard` (`ShopDashboard`)
  - `admin_dashboard` (`AdminDashboard`)
- All interactive modals mounted at root level.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| **Separation Architecture** | Subdirectory packaging (`/packages/marketplace-mobile`) | Completely decouples the mobile marketplace app from the website while keeping all files safe in the repository | Mixing routes inside the corporate website (rejected per prompt) |
| **Website Independence** | Website relies strictly on `/src/views` and `/src/components/layout` | Guarantees zero regression on Vercel deployment and maximum load performance | Importing marketplace components into website pages |
| **Android Export Readiness** | Standalone package structure with manifest and README guide | Enables the Android mobile development team to copy or extract the directory as a separate project with no missing dependencies | Leaving code dispersed across the website source tree |

---

## 4. Verification Plan

1. **Packaging Verification**:
   - Verify all marketplace source files, types, and sample data are accurately placed in `/packages/marketplace-mobile/`.
   - Verify `/packages/marketplace-mobile/package.json` and `README.md` are present.
2. **Website Build Verification**:
   - Run `lint_applet` (`tsc --noEmit`) to confirm zero type errors.
   - Run `compile_applet` (`npm run build`) to confirm the website bundle compiles cleanly to `dist/` without any errors.
3. **Operational Independence**:
   - Confirm dev server runs the corporate website without errors.
