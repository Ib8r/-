import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tractor, ShieldCheck, MapPin } from 'lucide-react';
import { IRAQI_GOVERNORATES } from '../../data/governorates';

export const Footer: React.FC = () => {
  const { setActiveTab, setFilterOptions } = useApp();

  const handleGovClick = (govName: string) => {
    setFilterOptions(prev => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      governorate: govName as any
    }));
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Tractor className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-heading">
                ماشينكس <span className="text-amber-500 font-mono text-xs">Machinix</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              السوق الأول المتخصص في تأجير الآليات والمعدات الثقيلة في جمهورية العراق. حلقة وصل مباشرة وآمنة بين المقاولين، أصحاب الآليات، وشركات التأجير المعتمدة.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>جاهز للتوسع المستقبلي نحو أسواق الخليج والشرق الأوسط</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 font-heading">أقسام الآليات الإنشائية</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setActiveTab('catalog'); }} className="hover:text-amber-400 transition-colors">حفارات مجنزرة وهيدروليكية</button></li>
              <li><button onClick={() => { setActiveTab('catalog'); }} className="hover:text-amber-400 transition-colors">شيافل ولوادر تحميل صخري</button></li>
              <li><button onClick={() => { setActiveTab('catalog'); }} className="hover:text-amber-400 transition-colors">رافعات كرين وبرجية للأحمال الثقيلة</button></li>
              <li><button onClick={() => { setActiveTab('catalog'); }} className="hover:text-amber-400 transition-colors">مولدات كهرباء ديزل صناعية</button></li>
              <li><button onClick={() => { setActiveTab('catalog'); }} className="hover:text-amber-400 transition-colors">بلدوزرات وشاحنات قلاب</button></li>
            </ul>
          </div>

          {/* Governorates Coverage */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 font-heading flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>تغطية محافظات العراق (18 محافظة)</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {IRAQI_GOVERNORATES.slice(0, 10).map(gov => (
                <button
                  key={gov.id}
                  onClick={() => handleGovClick(gov.nameAr)}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] hover:border-amber-500/60 hover:text-amber-400 transition-colors"
                >
                  {gov.nameAr}
                </button>
              ))}
              <button
                onClick={() => { setActiveTab('catalog'); }}
                className="px-2 py-0.5 rounded bg-slate-900/60 text-[11px] text-amber-400 hover:underline"
              >
                + باقي المحافظات
              </button>
            </div>
          </div>

          {/* Compliance & Disclaimers */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-semibold text-white mb-3 font-heading">إشعار التشغيل التجريبي</h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              جميع عروض التأجير، السير الذاتية لمزودي الخدمة، والحركات المالية الظاهرة هي بيانات افتراضية مجهزة للعرض الهندسي والبرمجي.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div>العملة المعتمدة: الدينار العراقي (IQD)</div>
              <div>سعر الصرف التقديري: 1,310 د.ع / 1 دولار أمريكي</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة ماشينكس العراق (Machinix Iraq).
          </div>
          <div className="flex items-center gap-3">
            <span>بغداد · أربيل · البصرة</span>
            <span aria-hidden="true">·</span>
            <span>هندسة معمارية سحابية قابلة للتوسع</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
