import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const StatisticsBrandBar: React.FC = () => {
  const { locale } = useLanguage();

  const metrics = [
    {
      value: '8',
      labelAr: 'فئات آليات رئيسية',
      labelEn: 'Core Equipment Categories',
      labelKu: 'جۆری سەرەکی ئامێرەکان',
      subAr: 'حفارات، بلدوزرات، لوادر، رافعات وأخرى',
      subEn: 'Excavators, dozers, loaders, cranes & more',
      subKu: 'حەفارە، بوڵدۆزەر، شۆفڵ، کرێن و هی تر',
    },
    {
      value: '19',
      labelAr: 'محافظة عراقية مغطاة',
      labelEn: 'Iraqi Governorates Covered',
      labelKu: 'پارێزگای عێراق لەژێر داپۆشیندا',
      subAr: 'تغطية شاملة من الشمال إلى الجنوب',
      subEn: 'Comprehensive North to South transit network',
      subKu: 'داپۆشینی گشتگیر لە باکوورەوە تا باشوور',
    },
    {
      value: '4',
      labelAr: 'خدمات صناعية متكاملة',
      labelEn: 'Integrated Core Services',
      labelKu: 'خزمەتگوزاری پیشەسازی یەکگرتوو',
      subAr: 'تأجير، بيع وشراء، قطع غيار، وصيانة',
      subEn: 'Rental, sales, OEM parts & field repair',
      subKu: 'کرێ، کڕین و فرۆشتن، پارچەی یەدەگ و چاککردنەوە',
    },
    {
      value: '24/7',
      labelAr: 'جاهزية دعم لوجستي',
      labelEn: 'Logistics & Field Support',
      labelKu: 'ئامادەیی لۆجستی مەیدانی',
      subAr: 'ربط مباشر بالمشاريع ومواقع العمل',
      subEn: 'Direct jobsite coordination & technical support',
      subKu: 'پەیوەندی ڕاستەوخۆ بە شوێنی پڕۆژە و کارەکان',
    },
  ];

  // Industry Brands referenced as supported equipment compatibility
  const brands = [
    'Caterpillar',
    'Komatsu',
    'Volvo',
    'Hyundai',
    'New Holland',
    'JCB',
    'Hitachi',
    'Liebherr',
  ];

  return (
    <section
      aria-label="HEAVY DUTY Industry Metrics & Ecosystem"
      className="w-full bg-[#20252B] text-[#F5F6F7] border-y border-[#303943] py-12 sm:py-16 my-8"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Metric Grid (Inspired by IQ Machinery Statistics Layout) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="space-y-2 border-s-2 border-[#D69A25]/40 ps-4 sm:ps-6 transition-all hover:border-[#D69A25]"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D69A25] font-mono tracking-tight">
                {m.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#F5F6F7] font-heading">
                {locale === 'ku' ? m.labelKu : locale === 'en' ? m.labelEn : m.labelAr}
              </div>
              <div className="text-[11px] sm:text-xs text-[#CBD5E1] leading-relaxed">
                {locale === 'ku' ? m.subKu : locale === 'en' ? m.subEn : m.subAr}
              </div>
            </div>
          ))}
        </div>

        {/* Supported Heavy Equipment Brands Strip */}
        <div className="pt-8 border-t border-[#303943]/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#94A3B8]">
            <span className="font-mono text-[#D69A25] uppercase tracking-wider font-semibold">
              {locale === 'ku'
                ? 'گونجاو لەگەڵ مارکە جیهانییەکان'
                : locale === 'en'
                ? 'INDUSTRY EQUIPMENT ECOSYSTEM'
                : 'منظومة الآليات المتوافقة'}
            </span>
            <span className="text-[11px]">
              {locale === 'ku'
                ? 'پشتیوانی کەتەلۆگ بۆ گەورەترین دروستکەرانی ئامێری قورس لە جیهاندا'
                : locale === 'en'
                ? 'Catalog compatibility with leading heavy equipment manufacturers'
                : 'توافق كامل للكتالوج وفهارس قطع الغيار مع كبرى الشركات المصنعة عالمياً'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1">
            {brands.map((brand) => (
              <span
                key={brand}
                className="font-mono text-xs sm:text-sm font-bold text-[#CBD5E1] bg-[#1A1F26] px-3.5 py-1.5 rounded-lg border border-[#303943] hover:text-[#D69A25] hover:border-[#D69A25]/50 transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
