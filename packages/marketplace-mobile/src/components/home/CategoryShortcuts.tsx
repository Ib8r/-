import React from 'react';
import { useApp } from '../../context/AppContext';
import { MachineryCategory } from '../../types';
import {
  Tractor,
  Truck,
  Building2,
  Boxes,
  Warehouse,
  Zap,
  Hammer,
  Wrench,
  ArrowLeft
} from 'lucide-react';

interface CategoryItem {
  id: MachineryCategory;
  titleAr: string;
  subtitleAr: string;
  count: number;
  icon: React.ReactNode;
}

export const CategoryShortcuts: React.FC = () => {
  const { setActiveTab, setFilterOptions } = useApp();

  const categories: CategoryItem[] = [
    {
      id: 'excavator',
      titleAr: 'حفارات هيدروليكية',
      subtitleAr: 'مجنزرة وكفرات وباكت صخري',
      count: 48,
      icon: <Tractor className="w-6 h-6 text-amber-400" />
    },
    {
      id: 'wheel_loader',
      titleAr: 'شيافل ولوادر',
      subtitleAr: 'تحميل الركام ومقالع الحصى',
      count: 35,
      icon: <Truck className="w-6 h-6 text-amber-400" />
    },
    {
      id: 'crane',
      titleAr: 'رافعات كرين وبرجية',
      subtitleAr: 'رافعات تلسكوبية من 25 إلى 120 طن',
      count: 22,
      icon: <Building2 className="w-6 h-6 text-amber-400" />
    },
    {
      id: 'generator',
      titleAr: 'مولدات كهرباء ديزل',
      subtitleAr: 'قدرات من 100kVA إلى 1000kVA كاتمة',
      count: 31,
      icon: <Zap className="w-6 h-6 text-amber-400" />
    },
    {
      id: 'bulldozer',
      titleAr: 'بلدوزرات تسوية',
      subtitleAr: 'شفرات تسوية ثقيلة مع كسارة ريبر',
      count: 26,
      icon: <Hammer className="w-6 h-6 text-amber-400" />
    },
    {
      id: 'dump_truck',
      titleAr: 'شاحنات قلاب / لوريات',
      subtitleAr: 'سعات من 18م³ إلى 32 طن دبل أكسل',
      count: 40,
      icon: <Boxes className="w-6 h-6 text-amber-400" />
    },
    {
      id: 'forklift',
      titleAr: 'رافعات شوكية فوركلفت',
      subtitleAr: 'مناولة المستودعات والموانئ من 3 إلى 10 طن',
      count: 19,
      icon: <Warehouse className="w-6 h-6 text-amber-400" />
    },
    {
      id: 'other',
      titleAr: 'مداحل ومضخات وكريدرات',
      subtitleAr: 'دمك الطرق، تسوية، ومضخات صب الخرسانة',
      count: 18,
      icon: <Wrench className="w-6 h-6 text-amber-400" />
    }
  ];

  const handleCategorySelect = (catId: MachineryCategory) => {
    setFilterOptions(prev => ({
      ...prev,
      category: catId
    }));
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              أقسام وتصنيفات الآليات الهندسية
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              اختر تصنيف المعدة المطلوبة للاطلاع على الأسعار والعروض المتوفرة في مختلف المحافظات
            </p>
          </div>
          <button
            onClick={() => {
              setFilterOptions(prev => ({ ...prev, category: 'all' }));
              setActiveTab('catalog');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors shrink-0"
          >
            <span>استعراض كافة الأقسام</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="text-right p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 transition-all group flex flex-col justify-between h-36"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-slate-800/80 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-mono text-slate-500 group-hover:text-amber-400 transition-colors tabular-nums">
                  {cat.count} آلية
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors font-heading">
                  {cat.titleAr}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {cat.subtitleAr}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
