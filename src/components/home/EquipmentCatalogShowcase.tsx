import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import {
  Shovel,
  Compass,
  Layers,
  Building,
  Truck,
  Container,
  Tractor,
  Zap,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface EquipmentCategoryItem {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  nameKu: string;
  descAr: string;
  descEn: string;
  descKu: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const EquipmentCatalogShowcase: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [showAll, setShowAll] = useState<boolean>(false);

  // The 8 verified categories with clean industrial icons and concise 1-sentence descriptions (Section 5)
  const categories: EquipmentCategoryItem[] = [
    {
      id: 'excavators',
      code: 'HD / 01',
      nameAr: 'حفارات هيدروليكية',
      nameEn: 'Hydraulic Excavators',
      nameKu: 'حەفارەی هایدرۆلیکی',
      descAr: 'معدات حفر قوية ومتقدمة لمختلف مشاريع الأساسات والتربة.',
      descEn: 'Powerful excavation equipment for infrastructure and foundation tasks.',
      descKu: 'ئامێری هەڵکۆڵینی بەهێز و پێشکەوتوو بۆ پڕۆژەکانی ژێرخان.',
      route: '/services/rental',
      icon: Shovel,
    },
    {
      id: 'bulldozers',
      code: 'HD / 02',
      nameAr: 'بلدوزرات تسوية',
      nameEn: 'Bulldozers',
      nameKu: 'بوڵدۆزەری تەسکین',
      descAr: 'آليات تجريف وتسوية عالية العزم لمواقع التعدين وشق الطرق.',
      descEn: 'Heavy-duty earthmoving machines for grading and quarry operations.',
      descKu: 'ئامێری بەهێزی ڕێکخستنی زەوی بۆ پڕۆژەی ڕێگاباندان و کانزاکان.',
      route: '/services/rental',
      icon: Compass,
    },
    {
      id: 'wheel_loaders',
      code: 'HD / 03',
      nameAr: 'شيافل ولوادر',
      nameEn: 'Wheel Loaders',
      nameKu: 'شۆفڵ و لۆدەر',
      descAr: 'تحميل ومناولة فعالة للمواد والركام في ساحات العمل والمقالع.',
      descEn: 'Efficient material handling for high-volume aggregate transfer.',
      descKu: 'بارکردن و گواستنەوەی خێرای کەرەستە و بەرد لە شوێنی کاردا.',
      route: '/services/rental',
      icon: Layers,
    },
    {
      id: 'cranes',
      code: 'HD / 04',
      nameAr: 'رافعات كرين',
      nameEn: 'Cranes',
      nameKu: 'کرێن و بەرزکەرەوە',
      descAr: 'حلول رفع ثقيلة للمشاريع الهندسية والمنشآت المرتفعة والجسور.',
      descEn: 'Heavy lifting solutions for civil engineering and structural lifts.',
      descKu: 'چارەسەری بەرزکردنەوەی قورس بۆ پڕۆژە ئەندازیارییەکان و پردەکان.',
      route: '/services/rental',
      icon: Building,
    },
    {
      id: 'dump_trucks',
      code: 'HD / 05',
      nameAr: 'شاحنات تفريغ',
      nameEn: 'Dump Trucks',
      nameKu: 'بارهەڵگری قەڵاب',
      descAr: 'نقل موثوق للردميات والمواد الخام بحمولات ميدانية صلبة.',
      descEn: 'Reliable material transportation for quarry and earthworks.',
      descKu: 'گواستنەوەی باوەڕپێکراوی خۆڵ و کەرەستە بە بارستایی گەورە.',
      route: '/services/rental',
      icon: Truck,
    },
    {
      id: 'transport',
      code: 'HD / 06',
      nameAr: 'شاحنات نقل ثقيل',
      nameEn: 'Heavy Transportation Trucks',
      nameKu: 'بارهەڵگری گواستنەوەی قورس',
      descAr: 'شاحنات ولوبدات متخصصة لنقل المعدات الثقيلة بين المحافظات.',
      descEn: 'Heavy-load transportation for inter-governorate fleet transit.',
      descKu: 'بارهەڵگر و تڕێلەی لۆبەد بۆ گواستنەوەی ئامێری قورس لە نێوان پارێزگاکان.',
      route: '/services/rental',
      icon: Container,
    },
    {
      id: 'agriculture',
      code: 'HD / 07',
      nameAr: 'آليات وتراكتورات زراعية',
      nameEn: 'Agricultural Tractors & Machinery',
      nameKu: 'ئامێری کشتوکاڵی و تراکتۆر',
      descAr: 'آليات ومعدات زراعية حديثة لرفع إنتاجية المشاريع الزراعية.',
      descEn: 'Modern agricultural equipment powering efficient agribusiness.',
      descKu: 'ئامێر و تراکتۆری کشتوکاڵی مۆدێرن بۆ بەرزکردنەوەی بەرهەمهێنان.',
      route: '/services/sales',
      icon: Tractor,
    },
    {
      id: 'generators',
      code: 'HD / 08',
      nameAr: 'مولدات ومحطات طاقة',
      nameEn: 'Generators & Power Equipment',
      nameKu: 'مۆلیدە و وێستگەی وزە',
      descAr: 'حلول طاقة ديزل موثوقة لضمان استمرارية العمل في المواقع.',
      descEn: 'Reliable prime power solutions ensuring continuous jobsite operation.',
      descKu: 'چارەسەری وزەی دیزڵی باوەڕپێکراو بۆ بەردەوامی کار لە شوێنی پڕۆژەدا.',
      route: '/services/rental',
      icon: Zap,
    },
  ];

  const getTitle = (item: EquipmentCategoryItem) => {
    if (locale === 'ku') return item.nameKu;
    if (locale === 'en') return item.nameEn;
    return item.nameAr;
  };

  const getDesc = (item: EquipmentCategoryItem) => {
    if (locale === 'ku') return item.descKu;
    if (locale === 'en') return item.descEn;
    return item.descAr;
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <section
      aria-label="HEAVY DUTY Compact Equipment Catalog"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D69A25]" />
            <span>
              {locale === 'ku'
                ? 'کەتەلۆگی ئامێرەکان'
                : locale === 'en'
                ? 'EQUIPMENT CATALOG'
                : 'كتالوج الآليات المعتمد'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {locale === 'ku'
              ? 'پۆلێنکردنی ئامێرە قورسەکان بەپێی تایبەتمەندی'
              : locale === 'en'
              ? 'Heavy Equipment Categories & Classes'
              : 'فئات وتصنيفات المعدات والآليات الثقيلة'}
          </h2>

          <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
            {locale === 'ku'
              ? 'هەشت جۆری سەرەکی ئامێرەکان بە شێوازێکی ڕێکخراو کە یارمەتی دەستنیشانکردنی پێداویستی پڕۆژە دەدات.'
              : locale === 'en'
              ? 'Eight core machinery classes organized for immediate discovery and transparent fleet sourcing.'
              : 'ثماني فئات أساسية مفهرسة لتسهيل استكشاف الآلية المناسبة لمتطلبات مشروعك بدقة وسرعة.'}
          </p>
        </div>
      </div>

      {/* Equipment Category Cards (Initially 4, Expandable to 8 with Clean Industrial Icons) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 transition-all duration-300">
        {displayedCategories.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              className="group relative p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] hover:border-[#D69A25]/60 hover:shadow-sm transition-all duration-250 flex flex-col justify-between cursor-pointer space-y-3"
            >
              <div className="space-y-3">
                {/* Top Row: Icon + Subtle Category Code Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F5F6F7] dark:bg-[#2B333D] group-hover:bg-[#D69A25]/15 text-[#303943] dark:text-[#CBD5E1] group-hover:text-[#D69A25] flex items-center justify-center transition-colors shadow-2xs">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#64748B] dark:text-[#94A3B8]">
                    {item.code}
                  </span>
                </div>

                {/* Name & Short Description */}
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading group-hover:text-[#D69A25] transition-colors leading-snug">
                    {getTitle(item)}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed line-clamp-2">
                    {getDesc(item)}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-[#F5F6F7] dark:border-[#303943]/60 flex items-center justify-between text-xs font-semibold text-[#D69A25]">
                <span>
                  {locale === 'ku' ? 'استكشف' : locale === 'en' ? 'Explore' : 'استكشف'}
                </span>
                <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expand / Collapse Bottom Center Toggle Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#F5F6F7] dark:bg-[#20252B] hover:bg-[#D69A25] hover:text-[#20252B] text-xs sm:text-sm font-bold text-[#20252B] dark:text-[#F5F6F7] border border-[#E2E5E8] dark:border-[#303943] hover:border-[#D69A25] transition-all shadow-2xs cursor-pointer group"
        >
          <span>
            {showAll
              ? locale === 'ku'
                ? 'پیشاندانی کەمتری فئات'
                : locale === 'en'
                ? 'Show Fewer Categories'
                : 'عرض فئات أقل'
              : locale === 'ku'
              ? 'استعراض كامل الكتالوج (٨ فئات)'
              : locale === 'en'
              ? 'Explore Full Catalog (8 Categories)'
              : 'استعراض كامل الكتالوج'}
          </span>
          {showAll ? (
            <ChevronUp className="w-4 h-4 text-[#D69A25] group-hover:text-[#20252B] transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#D69A25] group-hover:text-[#20252B] transition-transform" />
          )}
        </button>
      </div>
    </section>
  );
};
