import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { UserCheck, ShieldCheck, HardHat, Building, Users, Wrench, Package } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentRole, switchRole, currentUser } = useApp();

  const roles: { id: UserRole; titleAr: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'customer',
      titleAr: 'زبون / مقاول',
      icon: <HardHat className="w-3.5 h-3.5" />,
      desc: 'طلب استئجار، مفضلة، متابعة العقود'
    },
    {
      id: 'owner',
      titleAr: 'مالك معدات فردي',
      icon: <Users className="w-3.5 h-3.5" />,
      desc: 'إدارة 1-3 آليات، استقبال الطلبات، المحفظة'
    },
    {
      id: 'company',
      titleAr: 'شركة تأجير أساطيل',
      icon: <Building className="w-3.5 h-3.5" />,
      desc: 'إدارة أسطول كامل، فروع المحافظات، اشتراك الشركات'
    },
    {
      id: 'workshop',
      titleAr: 'مركز صيانة وورشة',
      icon: <Wrench className="w-3.5 h-3.5" />,
      desc: 'نشر عروض الصيانة وفيديوهات الورشة، استفسارات الصيانة'
    },
    {
      id: 'shop',
      titleAr: 'محل قطع غيار',
      icon: <Package className="w-3.5 h-3.5" />,
      desc: 'إدارة مخزون قطع الغيار، أرقام OEM، تحديث الأسعار والتوفر'
    },
    {
      id: 'admin',
      titleAr: 'مدير المنصة',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      desc: 'تدقيق التراخيص، اعتماد المعدات، الرقابة'
    },
    {
      id: 'guest',
      titleAr: 'زائر عام',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      desc: 'تصفح السوق والبحث بدون تسجيل'
    }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <span className="font-semibold text-amber-400">تبديل الدور للاختبار:</span>
          {currentUser && (
            <span className="hidden sm:inline text-slate-300">
              الحساب الحالي: <strong className="text-white font-medium">{currentUser.fullName || currentUser.companyName || currentUser.name}</strong> ({currentUser.governorate})
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {roles.map(r => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={r.desc}
              >
                {r.icon}
                <span>{r.titleAr}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
