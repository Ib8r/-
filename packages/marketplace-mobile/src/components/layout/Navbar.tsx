import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tractor,
  Heart,
  PlusCircle,
  Menu,
  X,
  Wallet,
  LayoutDashboard,
  ShieldAlert,
  LogIn,
  Tag,
  Wrench,
  Package,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    currentUser,
    favorites,
    openAuthModal,
    openAddListingModal,
    openAddSaleListingModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardTabForRole = () => {
    switch (currentRole) {
      case 'customer':
        return 'customer_dashboard';
      case 'owner':
        return 'owner_dashboard';
      case 'company':
        return 'company_dashboard';
      case 'workshop':
        return 'workshop_dashboard';
      case 'shop':
        return 'shop_dashboard';
      case 'admin':
        return 'admin_dashboard';
      default:
        return 'home';
    }
  };

  const dashboardLabel = () => {
    switch (currentRole) {
      case 'customer':
        return 'طلباتي واستفساراتي';
      case 'owner':
        return 'لوحة المالك';
      case 'company':
        return 'إدارة الأسطول';
      case 'workshop':
        return 'لوحة ورشة الصيانة';
      case 'shop':
        return 'إدارة متجر القطع';
      case 'admin':
        return 'لوحة الإدارة';
      default:
        return 'لوحة التحكم';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Top 4-Service Navigation Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 hidden sm:block text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[11px] font-semibold text-slate-400 ml-2">الخدمات الأساسية:</span>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap font-medium flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Tractor className="w-3.5 h-3.5" />
              <span>تأجير الآليات</span>
            </button>

            <button
              onClick={() => setActiveTab('sales')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap font-medium flex items-center gap-1.5 ${
                activeTab === 'sales'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>بيع وشراء الآليات</span>
            </button>

            <button
              onClick={() => setActiveTab('parts')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap font-medium flex items-center gap-1.5 ${
                activeTab === 'parts'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>سوق قطع الغيار</span>
            </button>

            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap font-medium flex items-center gap-1.5 ${
                activeTab === 'maintenance'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>مراكز الصيانة</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <button onClick={() => setActiveTab('plans')} className="hover:text-amber-400 transition-colors">
              باقات الاشتراك
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => setActiveTab('wallet')} className="hover:text-amber-400 transition-colors">
              المحفظة التجريبية
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-right group focus:outline-none"
          >
            <div className="w-9 h-9 rounded bg-amber-500 flex items-center justify-center text-slate-950 shadow-md group-hover:bg-amber-400 transition-colors">
              <Tractor className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-lg font-black tracking-tight text-white font-heading leading-tight flex items-center gap-1.5">
                ماشينكس
                <span className="text-amber-400 text-xs font-mono font-normal">Machinix</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">سوق الآليات والمعدات في العراق</span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'home' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'catalog' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            تأجير الآليات
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'sales' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            بيع وشراء الآليات
          </button>
          <button
            onClick={() => setActiveTab('parts')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'parts' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            قطع الغيار
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'maintenance' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            مراكز الصيانة
          </button>

          {currentRole !== 'guest' && (
            <button
              onClick={() => setActiveTab(getDashboardTabForRole())}
              className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
                activeTab.includes('dashboard') ? 'text-amber-400 font-semibold' : 'hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-500" />
              <span>{dashboardLabel()}</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Favorites */}
          <button
            onClick={() => {
              if (currentRole === 'customer') {
                setActiveTab('customer_dashboard');
              } else {
                setActiveTab('catalog');
              }
            }}
            className="relative p-2 text-slate-300 hover:text-amber-400 transition-colors rounded-lg hover:bg-slate-900"
            title="المفضلة"
            aria-label="المفضلة"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1 left-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center tabular-nums">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Quick Listing Action for Sellers */}
          {(currentRole === 'owner' || currentRole === 'company') ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={openAddSaleListingModal}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-slate-900 border border-slate-700 hover:border-amber-500 rounded transition-colors whitespace-nowrap"
              >
                <Tag className="w-3.5 h-3.5 text-amber-500" />
                <span>بيع آلية</span>
              </button>
              <button
                onClick={openAddListingModal}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded transition-colors whitespace-nowrap shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>تأجير آلية</span>
              </button>
            </div>
          ) : currentRole === 'admin' ? (
            <button
              onClick={() => setActiveTab('admin_dashboard')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-400 border border-amber-500/40 hover:bg-amber-500/10 rounded transition-colors whitespace-nowrap"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>مركز الرقابة</span>
            </button>
          ) : currentRole === 'guest' ? (
            <button
              onClick={() => openAuthModal('signin')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded transition-colors whitespace-nowrap shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('catalog')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded transition-colors whitespace-nowrap shadow-sm"
            >
              <span>سوق الآليات</span>
            </button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`text-right py-2 px-3 rounded ${
                activeTab === 'home' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                setActiveTab('catalog');
                setMobileMenuOpen(false);
              }}
              className={`text-right py-2 px-3 rounded flex items-center justify-between ${
                activeTab === 'catalog' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>تأجير الآليات الثقيلة</span>
              <Tractor className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveTab('sales');
                setMobileMenuOpen(false);
              }}
              className={`text-right py-2 px-3 rounded flex items-center justify-between ${
                activeTab === 'sales' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>بيع وشراء الآليات</span>
              <Tag className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveTab('parts');
                setMobileMenuOpen(false);
              }}
              className={`text-right py-2 px-3 rounded flex items-center justify-between ${
                activeTab === 'parts' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>سوق قطع الغيار</span>
              <Package className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveTab('maintenance');
                setMobileMenuOpen(false);
              }}
              className={`text-right py-2 px-3 rounded flex items-center justify-between ${
                activeTab === 'maintenance' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>مراكز الصيانة والورش</span>
              <Wrench className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveTab('plans');
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 px-3 rounded text-slate-300 hover:bg-slate-800"
            >
              باقات الاشتراك
            </button>
            <button
              onClick={() => {
                setActiveTab('wallet');
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 px-3 rounded text-slate-300 hover:bg-slate-800"
            >
              المحفظة التجريبية
            </button>

            {currentRole !== 'guest' ? (
              <button
                onClick={() => {
                  setActiveTab(getDashboardTabForRole());
                  setMobileMenuOpen(false);
                }}
                className={`text-right py-2 px-3 rounded flex items-center justify-between ${
                  activeTab.includes('dashboard')
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-amber-400 hover:bg-slate-800'
                }`}
              >
                <span>{dashboardLabel()}</span>
                <LayoutDashboard className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  openAuthModal('signin');
                  setMobileMenuOpen(false);
                }}
                className="text-right py-2 px-3 rounded text-amber-400 hover:bg-slate-800 flex items-center justify-between"
              >
                <span>تسجيل الدخول / إنشاء حساب</span>
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
