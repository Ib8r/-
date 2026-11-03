# HEAVY DUTY — Heavy Equipment Marketplace Mobile Application
> **Standalone Mobile Application Package (Target: Android First, iOS Later)**

---

## 1. Overview & Separation Notice

This package (`/packages/marketplace-mobile`) contains the complete, self-contained application source code for the **HEAVY DUTY Mobile Marketplace**.

- **Separation Status**: This package is 100% independent from the HEAVY DUTY corporate promotional website.
- **Website Isolation**: The website running at the repository root contains zero dependencies or imports from this directory.
- **Android Target**: This package contains the mobile-first React/TypeScript application core, business logic, multi-role state machine, and UI components. It is structured to be exported directly as an independent mobile project or wrapped using Capacitor / React Native / Jetpack Compose for native Android compilation.
- *Notice*: This package represents the extracted application core and state layer. Native Android Gradle build configurations (`build.gradle.kts`, `AndroidManifest.xml`, Kotlin activities) should be initialized in the dedicated mobile repository upon Android export.

---

## 2. Architecture & Directory Structure

```
packages/marketplace-mobile/
├── package.json               # Independent dependency manifest
├── README.md                  # Comprehensive architectural guide (this document)
└── src/
    ├── App.tsx                # Standalone Application Orchestrator & View Switcher
    ├── context/
    │   └── AppContext.tsx     # Central State Machine (1,259 lines, multi-role & pricing engine)
    ├── types/
    │   └── index.ts           # Complete TypeScript domain contracts
    ├── utils/
    │   └── formatters.ts      # Currency (IQD/USD), date, and badge formatting utilities
    ├── data/
    │   ├── governorates.ts    # 18 Iraqi Governorates with coordinates & districts
    │   ├── pricingConfig.ts   # Centralized Subscription Pricing (10k, 20k, 35k, 50k IQD)
    │   ├── sampleListings.ts  # Verified heavy equipment rental listings
    │   ├── sampleSales.ts     # Heavy equipment for-sale listings (Pro Owner+ tier restricted)
    │   ├── sampleParts.ts     # Spare parts OEM catalog & shop inventory
    │   ├── sampleMaintenance.ts # Certified maintenance workshop directory
    │   ├── sampleMaintenancePosts.ts # Maintenance center promotional & service posts
    │   ├── sampleSubscriptions.ts # Plan features, quotas, and limits
    │   └── sampleUsers.ts     # Multi-role test accounts and simulated wallets
    └── components/
        ├── layout/            # MobileBottomNav.tsx, Navbar.tsx
        ├── home/              # HeroSection, CategoryShortcuts, FeaturedListings, HowItWorks
        ├── catalog/           # EquipmentCatalog with faceted filters & search
        ├── sales/             # SalesMarketplace, AddSaleListingModal, SaleDetailModal, SubscriptionUpgradeModal
        ├── parts/             # PartsMarketplace, CreateSparePartModal, PartDetailModal
        ├── maintenance/       # MaintenanceDirectory, MaintenancePostsFeed, CreatePostModal, DetailModal
        ├── dashboards/        # 6 Dedicated Role Dashboards:
        │   ├── CustomerDashboard.tsx
        │   ├── OwnerDashboard.tsx
        │   ├── CompanyDashboard.tsx
        │   ├── WorkshopDashboard.tsx
        │   ├── ShopDashboard.tsx
        │   └── AdminDashboard.tsx
        ├── equipment/         # AddListingModal, EquipmentDetailModal, RentalRequestModal
        ├── subscriptions/     # SubscriptionPlans (Bilingual, monthly & 17% annual discount)
        ├── wallet/            # DemoWallet (Simulated ZainCash, AsiaCell, SuperCard transactions)
        ├── auth/              # AuthModal (Role-based sign in / sign up)
        ├── provider/          # ProviderProfileModal
        └── common/            # RoleSwitcherBar, DemoBanner, ServiceInquiryModal
```

---

## 3. Preserved Business Features & State Logic

### A. Multi-Role Operating Model
The state engine in `src/context/AppContext.tsx` supports 6 distinct roles accessible via the simulated `RoleSwitcherBar`:
1. **Customer / Contractor (`customer`)**: Browse rentals, sales, parts, and workshops; submit rental requests and service inquiries; manage personal bookings and favorites.
2. **Individual Equipment Owner (`owner`)**: Manage personal equipment listings; track rental inquiries; upgrade plan to Pro Owner to list equipment for sale.
3. **Fleet Rental Company (`company`)**: Manage large-scale machinery fleets, multi-unit availability, operator assignments, and company analytics.
4. **Maintenance Workshop (`workshop`)**: Manage maintenance center profile; publish and unpublish promotional service posts (hydraulics, diesel engines, electrical systems, emergency road service); receive direct WhatsApp and in-app inquiries.
5. **Spare Parts Shop (`shop`)**: Publish and manage OEM and aftermarket parts catalog; track inventory conditions (new, used, refurbished); toggle availability (in stock, limited, out of stock); receive orders.
6. **Platform Administrator (`admin`)**: Supervise listings, approve verified badges, inspect transactions, monitor revenue, and adjust central subscription pricing.

### B. Updated Subscription Tiers (Iraqi Dinars - IQD)
Subscription plans are defined centrally in `src/data/pricingConfig.ts` and loaded dynamically into all components:
- **Basic (10,000 IQD/mo)**: Target: Individual equipment owners. Up to 3 active rental listings, basic visibility, customer support.
- **Pro Owner (20,000 IQD/mo)**: Target: Serious owners & operators. Up to 10 active rental listings, **unlocks equipment-for-sale listings**, priority placement, verified badge.
- **Business (35,000 IQD/mo)**: Target: Spare parts shops & maintenance centers. Unlimited parts/maintenance posts, workshop publishing studio, verified shop badge, direct customer inquiry channel.
- **Enterprise (50,000 IQD/mo)**: Target: Large rental companies and heavy machinery dealerships. Unlimited fleet listings, multi-branch support, dedicated account manager, API integration.
- **Annual Discount**: 2 months free (~17% discount) when billed annually.

---

## 4. Mobile Export Roadmap (Android & iOS)

### Option 1: Standalone React Web/PWA App
Run this package as an independent React application:
```bash
cd packages/marketplace-mobile
npm install
npm run dev
```

### Option 2: Capacitor Native Android Export (Recommended Fast Path)
To export this package into a full native Android Studio project:
```bash
cd packages/marketplace-mobile
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "HEAVY DUTY" "com.heavyduty.marketplace" --web-dir dist
npm run build
npx cap add android
npx cap open android
```
This generates the complete native Android project in `android/` with Gradle, Kotlin, and APK/AAB build targets.

### Option 3: Clean Jetpack Compose Rewrite
If building from scratch in pure Kotlin / Jetpack Compose:
1. Map `src/types/index.ts` to Kotlin data classes (`EquipmentListing.kt`, `SparePart.kt`, `MaintenanceCenter.kt`, etc.).
2. Map `src/context/AppContext.tsx` state methods to Android `ViewModel` and Kotlin Coroutines/Flows.
3. Map component layouts to Compose Composables using Material 3 and Arabic RTL layout directions.

---

## 5. Non-Destructive Integrity Statement
- **Root Website**: The HEAVY DUTY Corporate Website at the repository root remains completely intact and unaffected.
- **Preservation**: All original data files, UI components, modals, and business workflows have been retained without loss.
