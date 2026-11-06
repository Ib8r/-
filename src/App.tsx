/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Views
import { HomePage } from './views/HomePage';
import { AboutUsPage } from './views/AboutUsPage';
import { RentalServicePage } from './views/RentalServicePage';
import { SalesServicePage } from './views/SalesServicePage';
import { PartsServicePage } from './views/PartsServicePage';
import { MaintenanceServicePage } from './views/MaintenanceServicePage';
import { HowItWorksPage } from './views/HowItWorksPage';
import { ForBusinessesPage } from './views/ForBusinessesPage';
import { DownloadAppPage } from './views/DownloadAppPage';
import { ContactUsPage } from './views/ContactUsPage';
import { FaqPage } from './views/FaqPage';
import { PrivacyPolicyPage } from './views/PrivacyPolicyPage';
import { TermsPage } from './views/TermsPage';

import { BackToHomeBar } from './components/common/BackToHomeBar';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderActiveView = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutUsPage />;
      case '/services':
      case '/services/rental':
        return <RentalServicePage />;
      case '/services/sales':
        return <SalesServicePage />;
      case '/services/parts':
        return <PartsServicePage />;
      case '/services/maintenance':
        return <MaintenanceServicePage />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/for-businesses':
        return <ForBusinessesPage />;
      case '/download':
        return <DownloadAppPage />;
      case '/contact':
        return <ContactUsPage />;
      case '/faq':
        return <FaqPage />;
      case '/privacy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7] dark:bg-[#20252B] text-[#20252B] dark:text-[#F5F6F7] flex flex-col font-sans transition-colors duration-250">
      {/* 3-Zone Corporate Header with Language Switcher, Theme Toggle and Mobile Drawer */}
      <Header />

      {/* Subtle Back to Home Breadcrumb for Internal Pages */}
      <BackToHomeBar />

      {/* Main Corporate Route View */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Corporate Industrial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
