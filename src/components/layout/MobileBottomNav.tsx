import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Tractor, Tag, Wrench, User, ShieldAlert } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentRole, openAuthModal } = useApp();

  const getDashboardTab = () => {
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

  const handleAccountClick = () => {
    if (currentRole === 'guest') {
      openAuthModal('signin');
    } else {
      setActiveTab(getDashboardTab());
    }
  };

  const isDashboardActive = activeTab.includes('dashboard');

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-1 flex items-center justify-around h-14">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-0.5 py-1 px-1.5 min-w-[50px] text-[10px] font-medium transition-colors ${
          activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>الرئيسية</span>
      </button>

      <button
        onClick={() => setActiveTab('catalog')}
        className={`flex flex-col items-center gap-0.5 py-1 px-1.5 min-w-[50px] text-[10px] font-medium transition-colors ${
          activeTab === 'catalog' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Tractor className="w-4 h-4" />
        <span>التأجير</span>
      </button>

      <button
        onClick={() => setActiveTab('sales')}
        className={`flex flex-col items-center gap-0.5 py-1 px-1.5 min-w-[50px] text-[10px] font-medium transition-colors ${
          activeTab === 'sales' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Tag className="w-4 h-4" />
        <span>شراء وبيع</span>
      </button>

      <button
        onClick={() => setActiveTab('parts')}
        className={`flex flex-col items-center gap-0.5 py-1 px-1.5 min-w-[50px] text-[10px] font-medium transition-colors ${
          activeTab === 'parts' || activeTab === 'maintenance' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Wrench className="w-4 h-4" />
        <span>قطع وصيانة</span>
      </button>

      <button
        onClick={handleAccountClick}
        className={`flex flex-col items-center gap-0.5 py-1 px-1.5 min-w-[50px] text-[10px] font-medium transition-colors ${
          isDashboardActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {currentRole === 'admin' ? (
          <ShieldAlert className="w-4 h-4 text-amber-500" />
        ) : (
          <User className="w-4 h-4" />
        )}
        <span>{currentRole === 'guest' ? 'دخول' : 'حسابي'}</span>
      </button>
    </nav>
  );
};
