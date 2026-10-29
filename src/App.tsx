/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBanner } from './components/common/DemoBanner';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';

// Home Views
import { HeroSection } from './components/home/HeroSection';
import { CategoryShortcuts } from './components/home/CategoryShortcuts';
import { FeaturedListings } from './components/home/FeaturedListings';
import { HowItWorks } from './components/home/HowItWorks';

// Catalog & Detail
import { EquipmentCatalog } from './components/catalog/EquipmentCatalog';
import { EquipmentDetailModal } from './components/equipment/EquipmentDetailModal';
import { RentalRequestModal } from './components/equipment/RentalRequestModal';
import { ProviderProfileModal } from './components/provider/ProviderProfileModal';
import { AddListingModal } from './components/equipment/AddListingModal';

// Dashboards
import { CustomerDashboard } from './components/dashboards/CustomerDashboard';
import { OwnerDashboard } from './components/dashboards/OwnerDashboard';
import { CompanyDashboard } from './components/dashboards/CompanyDashboard';
import { WorkshopDashboard } from './components/dashboards/WorkshopDashboard';
import { ShopDashboard } from './components/dashboards/ShopDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { MaintenancePostsFeed } from './components/maintenance/MaintenancePostsFeed';

// Subscriptions & Wallet
import { SubscriptionPlans } from './components/subscriptions/SubscriptionPlans';
import { DemoWallet } from './components/wallet/DemoWallet';

// Three Additional Marketplace Services
import { SalesMarketplace } from './components/sales/SalesMarketplace';
import { SaleDetailModal } from './components/sales/SaleDetailModal';
import { AddSaleListingModal } from './components/sales/AddSaleListingModal';
import { SubscriptionUpgradeModal } from './components/sales/SubscriptionUpgradeModal';

import { PartsMarketplace } from './components/parts/PartsMarketplace';
import { PartDetailModal } from './components/parts/PartDetailModal';

import { MaintenanceDirectory } from './components/maintenance/MaintenanceDirectory';
import { MaintenanceDetailModal } from './components/maintenance/MaintenanceDetailModal';

import { ServiceInquiryModal } from './components/common/ServiceInquiryModal';

// Auth
import { AuthModal } from './components/auth/AuthModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Simulation / Prototype Disclosure Banner */}
      <DemoBanner />

      {/* Role Switcher Toolbar for Review & Testing */}
      <RoleSwitcherBar />

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <CategoryShortcuts />
            <FeaturedListings />

            {/* Featured Maintenance Center Promotional Feed on Homepage */}
            <section className="py-12 bg-slate-900/50 border-y border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
                      <span>منشورات وعروض الورش المعتمدة</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">خدمات هيدروليك، محركات ديزل، وطوارئ متنقلة للمشاريع</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                      أحدث أعمال وعروض مراكز الصيانة
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('maintenance')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>عرض كافة منشورات الورش في العراق</span>
                    <span>←</span>
                  </button>
                </div>
                <MaintenancePostsFeed showFilters={false} limit={3} />
              </div>
            </section>

            <HowItWorks />
          </>
        )}

        {activeTab === 'catalog' && <EquipmentCatalog />}
        {activeTab === 'sales' && <SalesMarketplace />}
        {activeTab === 'parts' && <PartsMarketplace />}
        {activeTab === 'maintenance' && <MaintenanceDirectory />}
        {activeTab === 'plans' && <SubscriptionPlans />}
        {activeTab === 'wallet' && <DemoWallet />}
        {activeTab === 'customer_dashboard' && <CustomerDashboard />}
        {activeTab === 'owner_dashboard' && <OwnerDashboard />}
        {activeTab === 'company_dashboard' && <CompanyDashboard />}
        {activeTab === 'workshop_dashboard' && <WorkshopDashboard />}
        {activeTab === 'shop_dashboard' && <ShopDashboard />}
        {activeTab === 'admin_dashboard' && <AdminDashboard />}
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Interactive Floating Modals */}
      <EquipmentDetailModal />
      <RentalRequestModal />
      <ProviderProfileModal />
      <AddListingModal />

      {/* Sales Modals */}
      <SaleDetailModal />
      <AddSaleListingModal />
      <SubscriptionUpgradeModal />

      {/* Spare Parts & Maintenance Modals */}
      <PartDetailModal />
      <MaintenanceDetailModal />
      <ServiceInquiryModal />

      {/* Auth Modal */}
      <AuthModal />

      {/* Mobile Android Thumb Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
