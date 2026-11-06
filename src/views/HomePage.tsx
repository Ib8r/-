import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../assets/images';
import { IndustrialImage } from '../components/common/IndustrialImage';
import { InteractiveHeroShowcase } from '../components/home/InteractiveHeroShowcase';
import { EquipmentCatalogShowcase } from '../components/home/EquipmentCatalogShowcase';
import { StatisticsBrandBar } from '../components/home/StatisticsBrandBar';
import { InteractiveIraqMap } from '../components/home/InteractiveIraqMap';
import { MobileAppShowcase } from '../components/home/MobileAppShowcase';
import { FaqAccordion } from '../components/home/FaqAccordion';
import { Truck, Tag, Wrench, Cog, ArrowRight, ArrowLeft } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // The Four Main Services (Concise, minimalist presentation with 1 short sentence - Section 7)
  const services = [
    {
      id: 'rental',
      path: '/services/rental',
      titleAr: 'تأجير المعدات',
      titleEn: 'Equipment Rental',
      titleKu: 'کرێکردنی ئامێرەکان',
      descAr: 'اكتشف المعدات المتاحة للإيجار لمشاريعك الإنشائية والصناعية.',
      descEn: 'Discover equipment available for rental.',
      descKu: 'ئامێرە بەردەستەکان بۆ کرێکردن بدۆزەرەوە.',
      image: IMAGES.rentalService,
      fallbackImage: FALLBACK_IMAGES.rentalService,
      icon: Truck,
    },
    {
      id: 'sales',
      path: '/services/sales',
      titleAr: 'بيع وشراء المعدات',
      titleEn: 'Buy & Sell Equipment',
      titleKu: 'کڕین و فرۆشتنی ئامێرەکان',
      descAr: 'اكتشف الآليات والمعدات الجديدة والمستعملة مع تقارير الفحص.',
      descEn: 'Explore new and used heavy machinery.',
      descKu: 'ئامێری نوێ و بەکارهاتووی قورس بدۆزەرەوە.',
      image: IMAGES.salesService,
      fallbackImage: FALLBACK_IMAGES.salesService,
      icon: Tag,
    },
    {
      id: 'parts',
      path: '/services/parts',
      titleAr: 'قطع الغيار',
      titleEn: 'Spare Parts',
      titleKu: 'پارچەی یەدەگ',
      descAr: 'اعثر على قطع غيار المعدات الأصلية من الموردين المعتمدين.',
      descEn: 'Find spare parts for heavy equipment.',
      descKu: 'پارچەی یەدەگی ئامێرە قورسەکان بدۆزەرەوە.',
      image: IMAGES.partsService,
      fallbackImage: FALLBACK_IMAGES.partsService,
      icon: Cog,
    },
    {
      id: 'maintenance',
      path: '/services/maintenance',
      titleAr: 'الصيانة',
      titleEn: 'Maintenance Services',
      titleKu: 'خزمەتگوزاری چاککردنەوە',
      descAr: 'اكتشف خدمات مراكز الصيانة المعتمدة والدعم الميداني المتنقل.',
      descEn: 'Discover professional maintenance services.',
      descKu: 'خزمەتگوزاری ناوەندە پسپۆڕەکانی چاککردنەوە بدۆزەرەوە.',
      image: IMAGES.maintenanceService,
      fallbackImage: FALLBACK_IMAGES.maintenanceService,
      icon: Wrench,
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-16 pb-14 w-full max-w-full overflow-x-hidden">
      {/* 1. HERO SLIDER — PRESERVED EXCLUSIVELY AT THE TOP */}
      <InteractiveHeroShowcase />

      {/* 2. FOUR MAIN SERVICES — IMMEDIATELY BELOW THE HERO (Concise cards, 1 short sentence, clean actions) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1.5">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {locale === 'ku'
                ? 'سیستەمی HEAVY DUTY'
                : locale === 'en'
                ? 'CORE SERVICES'
                : 'خدمات المنظومة الأساسية'}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {locale === 'ku'
                ? 'چوار خزمەتگوزاری سەرەکی لە یەک ئەپڵیکەیشندا'
                : locale === 'en'
                ? 'Four Primary Services in One Platform'
                : 'أربع خدمات رئيسية في منصة وتطبيق HEAVY DUTY'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] max-w-md leading-relaxed">
            {locale === 'ku'
              ? 'پلاتفۆرمەکە دیزاین کراوە بۆ یەکخستنی کەرتی ئامێرە قورسەکان و ئاسانکاری دەستڕاگەیشتن بە هەموو پێداویستییەکان.'
              : locale === 'en'
              ? 'Designed to unify heavy equipment workflows, connecting contractors with verified equipment, parts, and workshops.'
              : 'صممت المنصة لتوحيد خدمات قطاع الآليات والمعدات الثقيلة وتسهيل الوصول الفوري للاحتياجات الميدانية.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            const title = locale === 'ku' ? srv.titleKu : locale === 'en' ? srv.titleEn : srv.titleAr;
            const desc = locale === 'ku' ? srv.descKu : locale === 'en' ? srv.descEn : srv.descAr;

            return (
              <div
                key={srv.id}
                className="group rounded-2xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] overflow-hidden shadow-2xs hover:shadow-xs hover:border-[#D69A25]/60 transition-all duration-250 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#F5F6F7] dark:bg-[#1A1F26]">
                    <IndustrialImage
                      src={srv.image}
                      fallbackSrc={srv.fallbackImage}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 start-3">
                      <div className="p-2 rounded-xl bg-[#FFFFFF]/95 dark:bg-[#20252B]/95 backdrop-blur-xs text-[#20252B] dark:text-[#F5F6F7] shadow-xs border border-[#E2E5E8] dark:border-[#303943]">
                        <Icon className="w-4 h-4 text-[#D69A25]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                      {title}
                    </h3>
                    <p className="text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                  <button
                    onClick={() => navigate(srv.path)}
                    className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F5F6F7] dark:bg-[#2B333D] hover:bg-[#D69A25] hover:text-[#20252B] text-[#20252B] dark:text-[#F5F6F7] text-xs font-bold transition-all cursor-pointer group"
                  >
                    <span>
                      {locale === 'ku' ? 'زیاتر بزانە' : locale === 'en' ? 'Learn More' : 'تعرف على المزيد'}
                    </span>
                    <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. EQUIPMENT CATEGORIES & CATALOG — (Initially 4 cards with "Explore Full Catalog" button) */}
      <EquipmentCatalogShowcase />

      {/* 4. STATISTICS & BRAND ECOSYSTEM STRIP */}
      <StatisticsBrandBar />

      {/* 5. INTERACTIVE IRAQ MAP — STANDALONE VISUAL SECTION (19 Governorates, No Lower Info Card) */}
      <InteractiveIraqMap />

      {/* 6. HEAVY DUTY MOBILE APP SHOWCASE */}
      <MobileAppShowcase />

      {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION (Includes Operational Standards & Reliability) */}
      <FaqAccordion />
    </div>
  );
};
