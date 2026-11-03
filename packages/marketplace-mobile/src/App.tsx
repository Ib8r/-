/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HEAVY DUTY - Heavy Equipment Marketplace Application
 * Standalone Mobile Application Orchestrator
 * 
 * Preserves the complete original heavy equipment marketplace:
 * - 6 User Roles: Customer, Equipment Owner, Fleet Company, Workshop, Spare Parts Shop, Admin
 * - 4 Core Services: Rental Catalog, Equipment Sales, Spare Parts OEM, Maintenance Workshops
 * - 4 Subscription Tiers: Basic (10,000 IQD), Pro Owner (20,000 IQD), Business (35,000 IQD), Enterprise (50,000 IQD)
 * - Complete In-App Demo Wallet, Inquiry System, and Interactive Modals
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

// Home & Catalog Views
import { HeroSection } from './components/home/HeroSection';
import { CategoryShortcuts } from './components/home/CategoryShortcuts';
import { FeaturedListings } from './components/home/FeaturedListings';
import { HowItWorks } from './components/home/HowItWorks';
import { EquipmentCatalog } from './components/catalog/EquipmentCatalog';
import { SalesMarketplace } from './components/sales/SalesMarketplace';
import { PartsMarketplace } from './components/parts/PartsMarketplace';
import { MaintenanceDirectory } from './components/maintenance/MaintenanceDirectory';
import { MaintenancePostsFeed } from './components/maintenance/MaintenancePostsFeed';
import { SubscriptionPlans } from './components/subscriptions/SubscriptionPlans';
import { DemoWallet } from './components/wallet/DemoWallet';

// Dashboards
import { CustomerDashboard } from './components/dashboards/CustomerDashboard';
import { OwnerDashboard } from './components/dashboards/OwnerDashboard';
import { CompanyDashboard } from './components/dashboards/CompanyDashboard';
import { WorkshopDashboard } from './components/dashboards/WorkshopDashboard';
import { ShopDashboard } from './components/dashboards/ShopDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';

// Modals
import { AddListingModal } from './components/equipment/AddListingModal';
import { EquipmentDetailModal } from './components/equipment/EquipmentDetailModal';
import { RentalRequestModal } from './components/equipment/RentalRequestModal';
import { AddSaleListingModal } from './components/sales/AddSaleListingModal';
import { SaleDetailModal } from './components/sales/SaleDetailModal';
import { SubscriptionUpgradeModal } from './components/sales/SubscriptionUpgradeModal';
import { CreateSparePartModal } from './components/parts/CreateSparePartModal';
import { PartDetailModal } from './components/parts/PartDetailModal';
import { CreateMaintenancePostModal } from './components/maintenance/CreateMaintenancePostModal';
import { MaintenanceDetailModal } from './components/maintenance/MaintenanceDetailModal';
import { ProviderProfileModal } from './components/provider/ProviderProfileModal';
import { ServiceInquiryModal } from './components/common/ServiceInquiryModal';
import { AuthModal } from './components/auth/AuthModal';

const MarketplaceMain: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <HeroSection />
            <CategoryShortcuts />
            <FeaturedListings />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">أحدث منشورات مراكز الصيانة والورش</h3>
                <p className="text-sm text-slate-400">تابع عروض وخدمات وتحديثات مراكز الصيانة المعتمدة في العراق</p>
              </div>
              <MaintenancePostsFeed />
            </div>
            <HowItWorks />
          </>
        );
      case 'catalog':
        return <EquipmentCatalog />;
      case 'sales':
        return <SalesMarketplace />;
      case 'parts':
        return <PartsMarketplace />;
      case 'maintenance':
        return (
          <div className="space-y-10 py-6">
            <MaintenanceDirectory />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-6 border-t border-slate-800 pt-8">
                <h3 className="text-xl font-bold text-white mb-2">منشورات وعروض الورش المعتمدة</h3>
                <p className="text-sm text-slate-400">استعرض أحدث العروض والخدمات المنشورة من قبل مراكز الصيانة</p>
              </div>
              <MaintenancePostsFeed />
            </div>
          </div>
        );
      case 'plans':
        return <SubscriptionPlans />;
      case 'wallet':
        return <DemoWallet />;
      case 'customer_dashboard':
        return <CustomerDashboard />;
      case 'owner_dashboard':
        return <OwnerDashboard />;
      case 'company_dashboard':
        return <CompanyDashboard />;
      case 'workshop_dashboard':
        return <WorkshopDashboard />;
      case 'shop_dashboard':
        return <ShopDashboard />;
      case 'admin_dashboard':
        return <AdminDashboard />;
      default:
        return <EquipmentCatalog />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950" dir="rtl">
      {/* Simulation Tools */}
      <DemoBanner />
      <RoleSwitcherBar />

      {/* Main Navigation */}
      <Navbar />

      {/* Dynamic Content */}
      <main className="flex-1 pb-20 lg:pb-10">
        {renderActiveTab()}
      </main>

      {/* Mobile Navigation */}
      <MobileBottomNav />

      {/* Root Interactive Modals */}
      <AddListingModal />
      <EquipmentDetailModal />
      <RentalRequestModal />
      <AddSaleListingModal />
      <SaleDetailModal />
      <SubscriptionUpgradeModal />
      <CreateSparePartModal />
      <PartDetailModal />
      <CreateMaintenancePostModal />
      <MaintenanceDetailModal />
      <ProviderProfileModal />
      <ServiceInquiryModal />
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MarketplaceMain />
    </AppProvider>
  );
};

export default App;
