# HEAVY DUTY — Official Corporate & App Promotional Website

Comprehensive architectural blueprint for transforming the platform into the official corporate and app promotional website for **HEAVY DUTY** (*Tagline: HEAVY EQUIPMENT MARKETPLACE*), introducing the forthcoming mobile application, articulating its 4 core industrial services, offering B2B partner engagement, bilingual Arabic (RTL) & English (LTR) localization, and fixing the Vercel dependency resolution.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following fundamental architectural, brand, and UX decisions have been aligned with the requirements and confirmed preferences:
>
> - **Brand Palette**: **Industrial Amber Gold (`#F59E0B` / `#D97706`) and Deep Slate Gray (`#0F172A` / `#1E293B`)** paired with neutral light canvas (`#F8FAFC` / `#FFFFFF`), crisp dark typographic hierarchy (`#0F172A`), and subtle industrial steel accents. Avoids dark-only aesthetics while retaining heavy machinery gravitas.
> - **Default Localization**: **Arabic (RTL)** as the primary default upon initial load with an instant one-click toggle to **English (LTR)**, complete with proper font pairings (`IBM Plex Sans Arabic` + `Cairo` for Arabic; `Plus Jakarta Sans` for English).
> - **Navigation & Routing**: **Client-side path routing with direct shareable URLs** (`/`, `/about`, `/services/rental`, `/services/sales`, `/services/parts`, `/services/maintenance`, `/how-it-works`, `/for-businesses`, `/download`, `/contact`, `/faq`, `/privacy`, `/terms`) integrated with browser History API (`pushState`) and fallback handling.
> - **Strict Role & Boundary**: The website is strictly a **corporate and promotional platform**, NOT a marketplace transaction app, shopping cart, or operational user dashboard. It directs users to the forthcoming official mobile app ("Android App Coming Soon" / "iOS App Coming Soon") without fake links or mock transaction gateways.
> - **Vercel Build Fix**: Update explicit `esbuild` dependency in `package.json` to `^0.28.2` (matching Vite `^8.3.0` requirement) to eliminate the `ERESOLVE` npm install conflict on Vercel.

---

## 1. Overview & Core Concept

**HEAVY DUTY** is an international-grade industrial technology brand connecting equipment owners, contractors, dealerships, spare parts shops, and maintenance workshops across Iraq's 18 governorates and the broader Arab region.

The website serves four key pillars:
1. **Brand Authority & Legitimacy**: Establishes HEAVY DUTY as the digital infrastructure for heavy machinery through clean industrial aesthetics inspired by global leaders (CAT, Komatsu) without imitation.
2. **Four Core Services Presentation**: In-depth dedicated explanatory pages for **Equipment Rental**, **Buy & Sell Equipment**, **Spare Parts Marketplace**, and **Maintenance Services**.
3. **B2B Ecosystem Engagement**: A dedicated `/for-businesses` portal welcoming rental companies, equipment showrooms, parts suppliers, and certified repair workshops to join the network.
4. **App Promotion & Pre-Launch Conversion**: Mobile app showcases, verified feature walkthroughs, notification registration for app availability, and transparent "Coming Soon" readiness states.

---

## 2. User Experience & Visual Design

### A. Information Architecture & Navigation

The header adheres to the strict 3-zone contract:
- **Zone 1 (Brand Wordmark & Custom Monogram)**: Original geometric **HD** emblem + **HEAVY DUTY** corporate typography and subtle subtitle kicker in hero.
- **Zone 2 (Navigation Links)**:
  - `الرئيسية` / `Home`
  - `من نحن` / `About Us`
  - `خدماتنا` / `Our Services` (with submenu / direct links to Rental, Sales, Spare Parts, Maintenance)
  - `كيف يعمل` / `How It Works`
  - `للشركات والوكالات` / `For Businesses`
  - `اتصل بنا` / `Contact Us`
- **Zone 3 (Actions & Language Switcher)**:
  - Language toggle pill (`العربية` / `English`)
  - Primary CTA button: `تحميل التطبيق` / `Download App` (directs to `/download`)
  - Mobile hamburger overlay drawer with complete navigation hierarchy.

### B. Page Directory & Content Flow

1. **Homepage (`/`)**:
   - **Hero Section**: Powerful headline (*"POWERING THE HEAVY EQUIPMENT INDUSTRY"* / *"تمكين وتطوير قطاع المعدات الثقيلة"*), supporting value proposition, high-resolution industrial photography, Primary CTA (*"Explore Our Services"*), and Secondary CTA (*"Download the App"* with "Android App Coming Soon" badge).
   - **Platform Ecosystem Map**: Visual relationship between contractors, fleet owners, equipment dealers, parts merchants, and industrial technicians across Iraq.
   - **Four Core Services Grid**: Balanced interactive cards with custom SVG monograms, photography, descriptive overviews, and dedicated page links.
   - **Why HEAVY DUTY?**: Concrete structural benefits (all-in-one industrial ecosystem, verified specifications, regional coverage across 18 Iraqi governorates, simplified workflows).
   - **How It Works 3-Step Teaser**: Discovery $\rightarrow$ Exploration $\rightarrow$ Direct Connection.
   - **B2B Callout Strip**: Direct invitation for dealerships, rental yards, and workshops to register.
   - **App Pre-Launch Showcase**: Clean Android/iOS device mockup with genuine feature highlights and release notification form.

2. **Dedicated Service Pages**:
   - **Equipment Rental (`/services/rental`)**: Explains daily/weekly/monthly rental models, machinery classifications (excavators, bulldozers, wheel loaders, cranes, dump trucks, generators), operator/transport options, and governorate filtering.
   - **Buy & Sell Equipment (`/services/sales`)**: Explains new & certified pre-owned equipment listings, dealer showrooms vs individual owner rules, operating hours, inspection documentation, and direct inquiry channels.
   - **Spare Parts Marketplace (`/services/parts`)**: Explains OEM and aftermarket part numbers, hydraulic/engine/filter/track categorization, merchant verification, and stock status tracking.
   - **Maintenance Services (`/services/maintenance`)**: Explains specialized workshops (hydraulics, diesel engines, electrical diagnostics, mobile field repair units), promotional technician posts, and booking inquiries.

3. **About Us Page (`/about`)**:
   - Founding vision, industrial mission, core engineering values, initial focus on Iraq's 18 governorates, and planned Arab regional expansion.

4. **How It Works Page (`/how-it-works`)**:
   - Segmented interactive guides for **Customers / Contractors**, **Individual Equipment Owners**, and **Registered Businesses & Dealers**.

5. **For Businesses Page (`/for-businesses`)**:
   - Value propositions for rental companies, dealers, spare-parts shops, and maintenance workshops; partner inquiry lead capture form.

6. **Download App Page (`/download`)**:
   - Showcase of the upcoming mobile application, Android and iOS pre-registration badges, configurable official store URL placeholders, and platform preview cards.

7. **Contact Us Page (`/contact`)**:
   - Validated contact form (Name, Email, Subject, Message), clear explanation of frontend integration status, verified support channels, and FAQ shortcuts.

8. **FAQ Page (`/faq`)**:
   - Structured accordion addressing the 11 key platform questions (Iraqi market scope, listing requirements, app availability, subscriptions, spare parts authenticity).

9. **Legal Pages (`/privacy` & `/terms`)**:
   - Corporate terms of service and privacy disclosures tailored to industrial equipment listings and directory services.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| **Separation of Concerns** | Corporate & promotional showcase website | User requested explicit distinction: website promotes and explains the app, while marketplace transactions live in the mobile app | Retaining interactive in-browser rental checkout or simulated user dashboards (rejected per prompt) |
| **Bilingual Architecture** | First-class i18n context with full dictionary translation | Enables seamless switching between Arabic (RTL) and English (LTR) across all content, metadata, and forms | Translation via browser auto-translate or mixed bilingual text |
| **Routing Strategy** | Custom URL path router using HTML5 History API (`window.history.pushState`) | Allows shareable links (`/services/rental`, `/contact`) while remaining 100% compatible with static hosting / Vercel SPA rewrites | Hash-only routing (`#about`) which looks less professional on corporate websites |
| **Dependency Resolution** | Update `esbuild` to `^0.28.2` in `package.json` | Resolves the exact Vercel npm install ERESOLVE conflict with Vite 8.3 | Using `--force` or downgrading Vite (unstable / forbidden) |
| **Visual Identity** | Original geometric HD monogram + Amber Gold & Slate Gray | Conveys industrial reliability and heavy equipment strength without imitating CAT or Komatsu trademarks | Generic construction shovel/excavator clip art |

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HEAVY DUTY Website App                          │
│                                                                        │
│   ┌─────────────────────┐               ┌──────────────────────────┐   │
│   │ LanguageContext     │               │ RouterContext            │   │
│   │ - locale: 'ar'|'en' │               │ - currentPath: string    │   │
│   │ - dir: 'rtl'|'ltr'  │               │ - navigate(path: string) │   │
│   │ - t(key): string    │               │ - shareable URLs / SEO   │   │
│   └──────────┬──────────┘               └────────────┬─────────────┘   │
│              │                                       │                 │
│              └───────────────────┬───────────────────┘                 │
│                                  │                                     │
│                     ┌────────────▼────────────┐                        │
│                     │       Layout.tsx        │                        │
│                     │ - Header & 3-zone Nav   │                        │
│                     │ - Language Switcher     │                        │
│                     │ - Mobile Drawer         │                        │
│                     │ - Corporate Footer      │                        │
│                     └────────────┬────────────┘                        │
│                                  │                                     │
│         ┌────────────────────────┼────────────────────────┐            │
│         ▼                        ▼                        ▼            │
│   ┌───────────┐           ┌──────────────┐         ┌─────────────┐     │
│   │ HomePage  │           │ ServicePages │         │ Other Pages │     │
│   │ - Hero    │           │ - Rental     │         │ - About     │     │
│   │ - Pillars │           │ - Sales      │         │ - HowWorks  │     │
│   │ - Bento   │           │ - Parts      │         │ - Business  │     │
│   │ - IraqMap │           │ - Maint      │         │ - Download  │     │
│   │ - AppCTA  │           └──────────────┘         │ - Contact   │     │
│   └───────────┘                                    │ - FAQ/Legal │     │
│                                                    └─────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping

- **`LanguageContext.tsx`**: Holds current language state (`ar` default, `en`), manages `document.documentElement.dir` (`rtl` vs `ltr`) and `lang`, and provides a structured translation lookup dictionary covering all pages, navigation, forms, and footers.
- **`RouterContext.tsx`**: Listens to browser popstate events, manages `currentPath`, normalizes nested paths (e.g. `/services/rental`), and updates `window.history.pushState` on navigation clicks.
- **`vercel.json`**: Adds standard SPA rewrite rules (`"source": "/(.*)", "destination": "/index.html"`) to ensure refreshing nested routes on Vercel works seamlessly.
- **`SEO / Meta Manager`**: Synchronizes `<title>`, `<meta name="description">`, OpenGraph, and JSON-LD schema dynamically upon page transitions.

---

## 5. Implementation Phases & Verification Plan

### Phase 1: Dependency & Vercel Fix
- Edit `package.json` to bump `devDependencies.esbuild` to `^0.28.2`.
- Run dependency installation via `install_applet_dependencies` to generate clean lockfile and verify zero ERESOLVE errors.
- Test baseline compilation via `compile_applet`.

### Phase 2: Brand Identity, Typography & Global Styles
- Design original vector **HD** monogram logo and corporate typography component.
- Configure industrial color palette (Industrial Amber Gold, Deep Slate, Neutral Stone/Light Canvas).
- Update `index.html` title, meta tags, and fonts (`Cairo`, `IBM Plex Sans Arabic`, `Plus Jakarta Sans`).
- Update `metadata.json` with official HEAVY DUTY identity.

### Phase 3: Localization Engine & Routing Architecture
- Create `src/i18n/` with complete Arabic & English dictionary for all 12 page views.
- Implement `LanguageContext` and `RouterContext` with HTML5 History API integration.
- Create `vercel.json` with SPA rewrite configuration.

### Phase 4: Core Website Views & Components
- Implement responsive corporate `Header` (3-zone contract, language toggle, download CTA, mobile drawer).
- Implement `HomePage` with high-impact hero, 4 services showcase, Iraq 18 governorates regional reach, and app preview.
- Implement 4 dedicated service pages (`/services/rental`, `/services/sales`, `/services/parts`, `/services/maintenance`).
- Implement `/about`, `/how-it-works`, `/for-businesses`, `/download`, `/contact`, `/faq`, `/privacy`, and `/terms`.
- Implement corporate `Footer` with dynamic copyright, links, service directory, and social placeholders.

### Phase 5: Verification & Quality Assurance
- Run `lint_applet` (`tsc --noEmit`) to verify zero TypeScript errors.
- Run `compile_applet` (`npm run build`) to verify clean Vercel-ready build in `dist/`.
- Test Arabic RTL and English LTR toggles across all pages.
- Test responsive layouts on mobile, tablet, and desktop viewports.
