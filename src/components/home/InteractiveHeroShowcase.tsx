import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../../assets/images';
import { IndustrialImage } from '../common/IndustrialImage';
import { ArrowRight, ArrowLeft, Smartphone, CheckCircle2 } from 'lucide-react';

interface EquipmentCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  headlineAr: string;
  headlineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  specsAr: { label: string; value: string }[];
  specsEn: { label: string; value: string }[];
  image: string;
  fallbackImage: string;
  serviceRoute: string;
  primaryCtaAr: string;
  primaryCtaEn: string;
}

export const InteractiveHeroShowcase: React.FC = () => {
  const { t, locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const isAr = locale === 'ar';
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // 8 distinct, verified equipment categories with unique visual photography
  const categories: EquipmentCategory[] = [
    {
      id: 'excavators',
      nameAr: 'حفارات هيدروليكية',
      nameEn: 'Hydraulic Excavators',
      badgeAr: 'معدات الحفر والأساسات',
      badgeEn: 'Excavation & Foundations',
      headlineAr: 'حفارات مجنزرة ثقيلة للمشاريع الكبرى',
      headlineEn: 'Heavy Crawler Excavators for Major Infrastructure',
      descriptionAr:
        'أسطول متكامل من الحفارات الهيدروليكية من 20 إلى 90 طناً، مجهزة للمقالع، حفر الأساسات العميقة، ومد خطوط الأنابيب مع خيارات إيجار مرنة.',
      descriptionEn:
        'Comprehensive 20 to 90-ton hydraulic crawler excavator fleet, engineered for quarry extraction, deep foundations, and pipeline trenching.',
      specsAr: [
        { label: 'الوزن التشغيلي', value: '22 - 85 طن' },
        { label: 'سعة الدلو', value: '1.2 - 5.5 م³' },
        { label: 'أقصى عمق حفر', value: '7.8 متر' },
      ],
      specsEn: [
        { label: 'Operating Weight', value: '22 - 85 Tons' },
        { label: 'Bucket Capacity', value: '1.2 - 5.5 m³' },
        { label: 'Max Digging Depth', value: '7.8 Meters' },
      ],
      image: IMAGES.excavator,
      fallbackImage: FALLBACK_IMAGES.excavator,
      serviceRoute: '/services/rental',
      primaryCtaAr: 'استكشف أسطول الحفارات',
      primaryCtaEn: 'Explore Excavator Fleet',
    },
    {
      id: 'bulldozers',
      nameAr: 'بلدوزرات تسوية وتعدين',
      nameEn: 'Mining Bulldozers',
      badgeAr: 'التسوية وشق الطرق',
      badgeEn: 'Earthmoving & Grading',
      headlineAr: 'بلدوزرات مجنزرة للتسوية وحفر المناجم',
      headlineEn: 'Heavy Bulldozers for Earthmoving & Mining',
      descriptionAr:
        'بلدوزرات كاتربيلر وكوماتسو عالية القدرة مجهزة بشفرات هيدروليكية وشوك تفتيح صخور للمشاريع الإنشائية الكبرى والمقالع في العراق.',
      descriptionEn:
        'Heavy-duty Caterpillar and Komatsu bulldozers equipped with semi-U blades and multi-shank rippers for civil infrastructure across Iraq.',
      specsAr: [
        { label: 'قدرة المحرك', value: '310 - 850 حصان' },
        { label: 'سعة الشفرة', value: '8.6 - 19.5 م³' },
        { label: 'الوزن الإجمالي', value: '38 - 104 طن' },
      ],
      specsEn: [
        { label: 'Flywheel Power', value: '310 - 850 HP' },
        { label: 'Blade Capacity', value: '8.6 - 19.5 m³' },
        { label: 'Operating Weight', value: '38 - 104 Tons' },
      ],
      image: IMAGES.bulldozer,
      fallbackImage: FALLBACK_IMAGES.bulldozer,
      serviceRoute: '/services/rental',
      primaryCtaAr: 'طلب عروض البلدوزرات',
      primaryCtaEn: 'Request Dozer Quotes',
    },
    {
      id: 'wheel_loaders',
      nameAr: 'شيافل ولوادر إنشائية',
      nameEn: 'Wheel Loaders',
      badgeAr: 'التحميل ومناولة المواد',
      badgeEn: 'Material Handling & Loading',
      headlineAr: 'لوادر سريعة لتحميل وتوزيع المواد الإنشائية',
      headlineEn: 'High-Cycle Wheel Loaders for Bulk Earthwork',
      descriptionAr:
        'كفاءة دورة تحميل فائقة مع دلاء سريعة التفريغ لنقل الأتربة، الركام، والخرسانة في مواقع البناء ومحطات الكسارات وموانئ الشحن.',
      descriptionEn:
        'High breakout force and fast cycle times for bulk material handling, aggregate quarries, concrete batching plants, and cargo terminals.',
      specsAr: [
        { label: 'سعة الدلو', value: '3.0 - 7.5 م³' },
        { label: 'حمولة الرفع', value: '7,000 - 18,000 كغم' },
        { label: 'قوة المحرك', value: '230 - 550 حصان' },
      ],
      specsEn: [
        { label: 'Bucket Capacity', value: '3.0 - 7.5 m³' },
        { label: 'Payload Capacity', value: '7,000 - 18,000 kg' },
        { label: 'Engine Output', value: '230 - 550 HP' },
      ],
      image: IMAGES.wheelLoader,
      fallbackImage: FALLBACK_IMAGES.wheelLoader,
      serviceRoute: '/services/rental',
      primaryCtaAr: 'عرض شيافل معتمدة',
      primaryCtaEn: 'View Verified Loaders',
    },
    {
      id: 'cranes',
      nameAr: 'رافعات كرين متحركة',
      nameEn: 'Mobile & All-Terrain Cranes',
      badgeAr: 'الرفع الثقيل والتجميع',
      badgeEn: 'Heavy Lifting & Rigging',
      headlineAr: 'رافعات تلسكوبية وبرجية للمنشآت العملاقة',
      headlineEn: 'Telescopic & All-Terrain Heavy Mobile Cranes',
      descriptionAr:
        'حلول رفع متطورة بقدرات تصل إلى 500 طن، معتمدة بالكامل بشهادات فحص دولية ومشغلين مرخصين لمشاريع النفط والغاز والجسور.',
      descriptionEn:
        'Engineered lifting solutions up to 500 tons, third-party certified with licensed riggers for refinery construction and bridge placement.',
      specsAr: [
        { label: 'قدرة الرفع', value: '50 - 500 طن' },
        { label: 'طول البوم', value: '40 - 85 متر' },
        { label: 'فحص السلامة', value: 'معتمد 100%' },
      ],
      specsEn: [
        { label: 'Lifting Capacity', value: '50 - 500 Tons' },
        { label: 'Main Boom Length', value: '40 - 85 Meters' },
        { label: 'Inspection Level', value: '100% Certified' },
      ],
      image: IMAGES.crane,
      fallbackImage: FALLBACK_IMAGES.crane,
      serviceRoute: '/services/rental',
      primaryCtaAr: 'جدولة رافعات كرين',
      primaryCtaEn: 'Schedule Mobile Cranes',
    },
    {
      id: 'dump_trucks',
      nameAr: 'شاحنات تفريغ وقلابات مقالع',
      nameEn: 'Rigid Haul & Dump Trucks',
      badgeAr: 'التعدين والنقل الضخم',
      badgeEn: 'Quarry & Heavy Haulage',
      headlineAr: 'شاحنات تفريغ ضخمة لمقالع الصخور ومواقع التعدين',
      headlineEn: 'Heavy Mining Dump Trucks for Extreme Quarry Work',
      descriptionAr:
        'قلابات صلبة مخصصة للمقالع والردميات الثقيلة بحمولات تصل إلى 100 طن، مجهزة بأنظمة فرامل هيدروليكية متقدمة وهياكل مقاومة للصدمات.',
      descriptionEn:
        'Rigid frame off-highway dump trucks engineered for severe quarry extraction, heavy earth excavation, and mining with payloads up to 100 tons.',
      specsAr: [
        { label: 'حمولة الصندوق', value: '45 - 100 طن' },
        { label: 'سعة الهيكل', value: '32 - 60 م³' },
        { label: 'محرك الديزل', value: '550 - 1025 حصان' },
      ],
      specsEn: [
        { label: 'Payload Rating', value: '45 - 100 Tons' },
        { label: 'Body Capacity', value: '32 - 60 m³' },
        { label: 'Diesel Engine', value: '550 - 1025 HP' },
      ],
      image: IMAGES.dumpTruck,
      fallbackImage: FALLBACK_IMAGES.dumpTruck,
      serviceRoute: '/services/rental',
      primaryCtaAr: 'عروض قلابات التعدين',
      primaryCtaEn: 'Explore Dump Trucks',
    },
    {
      id: 'transport',
      nameAr: 'شاحنات نقل ثقيل ولوابد',
      nameEn: 'Heavy Transportation & Lowbeds',
      badgeAr: 'اللوجستيات والشحن الميداني',
      badgeEn: 'Heavy Logistics & Transport',
      headlineAr: 'قاطرات نقل ثقيل وتريلات لوابد للمعدات',
      headlineEn: 'Lowbed Trailers & Heavy Equipment Haulage',
      descriptionAr:
        'خدمات شحن الآليات الثقيلة عبر كافة المحافظات العراقية بواسطة قاطرات حديثة ولوابد متعددة المحاور لنقل المعدات بأمان وسرعة إلى موقع العمل.',
      descriptionEn:
        'Nationwide heavy equipment transit utilizing multi-axle lowbeds and prime movers for safe and rapid mobilization of machinery.',
      specsAr: [
        { label: 'حمولة اللوابد', value: '40 - 120 طن' },
        { label: 'تغطية النقل', value: 'كافة المحافظات' },
        { label: 'تأمين الحمولة', value: 'شامل وموثق' },
      ],
      specsEn: [
        { label: 'Lowbed Capacity', value: '40 - 120 Tons' },
        { label: 'Route Coverage', value: 'All 19 Governorates' },
        { label: 'Cargo Insurance', value: 'Comprehensive' },
      ],
      image: IMAGES.truck,
      fallbackImage: FALLBACK_IMAGES.truck,
      serviceRoute: '/services/rental',
      primaryCtaAr: 'خدمات النقل اللوجستي',
      primaryCtaEn: 'Heavy Logistics Services',
    },
    {
      id: 'agriculture',
      nameAr: 'جرارات وحاصدات زراعية',
      nameEn: 'Agricultural Tractors & Machinery',
      badgeAr: 'الاستصلاح والزراعة الكبرى',
      badgeEn: 'Land Reclamation & Farming',
      headlineAr: 'حاصدات وجرارات عملاقة لاستصلاح الأراضي الزراعية',
      headlineEn: 'High-Horsepower Harvesters & Farming Fleets',
      descriptionAr:
        'أحدث الآليات الزراعية لاستصلاح الأراضي الشاسعة وحصاد المحاصيل في سهول دجلة والفرات مع دعم صيانة متواصل وتوفير قطع غيار أصلية.',
      descriptionEn:
        'Modern combine harvesters and high-drawbar tractors engineered for large-scale agricultural projects and fertile plain reclamation across Iraq.',
      specsAr: [
        { label: 'عرض الحصاد', value: '7.5 - 12.5 متر' },
        { label: 'قدرة المحرك', value: '380 - 650 حصان' },
        { label: 'توجيه الحقل', value: 'دقة عالية GPS' },
      ],
      specsEn: [
        { label: 'Header Width', value: '7.5 - 12.5 Meters' },
        { label: 'Engine Output', value: '380 - 650 HP' },
        { label: 'Guidance Tech', value: 'Precision GPS' },
      ],
      image: IMAGES.agriculture,
      fallbackImage: FALLBACK_IMAGES.agriculture,
      serviceRoute: '/services/sales',
      primaryCtaAr: 'استعراض الآليات الزراعية',
      primaryCtaEn: 'View Agricultural Fleet',
    },
    {
      id: 'generators',
      nameAr: 'مولدات ومحطات طاقة صناعية',
      nameEn: 'Industrial Generators & Power',
      badgeAr: 'الطاقة المستمرة بالموقع',
      badgeEn: 'Continuous On-Site Power',
      headlineAr: 'محطات توليد ديزل صناعية للمواقع الإنشائية والمعزولة',
      headlineEn: 'Prime Industrial Diesel Generators for Job Sites',
      descriptionAr:
        'مولدات ديزل صناعية فائقة التحمل من 100 إلى 2500 كيلو فولت أمبير، مع صيانة دورية فورية وتزويد وقود لضمان استمرارية التشغيل.',
      descriptionEn:
        'Heavy-duty prime diesel generators from 100 to 2500 kVA, backed by synchronized power management and rapid field technician support.',
      specsAr: [
        { label: 'القدرة الكهربائية', value: '100 - 2500 kVA' },
        { label: 'المحركات', value: 'Perkins / Cummins' },
        { label: 'صندوق كاتم', value: 'عازل للصوت 68dB' },
      ],
      specsEn: [
        { label: 'Power Output', value: '100 - 2500 kVA' },
        { label: 'Engine Prime', value: 'Perkins / Cummins' },
        { label: 'Sound Canopy', value: 'Super Silent 68dB' },
      ],
      image: IMAGES.generator,
      fallbackImage: FALLBACK_IMAGES.generator,
      serviceRoute: '/services/rental',
      primaryCtaAr: 'طلب مولدات صناعية',
      primaryCtaEn: 'Request Power Units',
    },
  ];

  // Core synchronized state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [isInteracting, setIsInteracting] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [progress, setProgress] = useState(0);

  const imageStageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isHorizontalGesture = useRef<boolean | null>(null);

  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleResumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6500; // Calm 6.5s per slide
  const TICK_INTERVAL = 50;

  const activeCategory = categories[currentIndex];

  // Preload all 8 high-resolution equipment images to guarantee 0 blank frames during transitions
  useEffect(() => {
    categories.forEach((cat) => {
      const img = new Image();
      img.src = cat.image;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setSlideDirection('forward');
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setProgress(0);
  }, [categories.length]);

  const prevSlide = useCallback(() => {
    setSlideDirection('backward');
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setProgress(0);
  }, [categories.length]);

  // Pause autoplay immediately on user interaction and schedule resume after 4.5s idle
  const pauseAndScheduleResume = useCallback(() => {
    setIsInteracting(true);
    setHasInteracted(true);
    if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
    idleResumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      setProgress(0);
    }, 4500);
  }, []);

  // Autoplay ticker when not interacting and reduced motion is false
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isInteracting) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, TICK_INTERVAL);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isInteracting, nextSlide]);

  // Gesture handling: strictly scoped to the equipment image showcase viewport
  // The surrounding page, text column, and grid remain completely stationary
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    isHorizontalGesture.current = null;
    pauseAndScheduleResume();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (touchStartX.current === 0) return;
    const deltaX = e.clientX - touchStartX.current;
    const deltaY = e.clientY - touchStartY.current;

    // Detect if horizontal intent vs normal vertical page scroll
    if (isHorizontalGesture.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalGesture.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontalGesture.current) {
      // Natural horizontal drag displacement strictly on the active image
      setDragOffset(deltaX);
    }
  };

  const handlePointerEnd = (e: React.PointerEvent) => {
    if (touchStartX.current === 0) return;
    const deltaX = e.clientX - touchStartX.current;
    const DRAG_THRESHOLD = 45;

    if (isHorizontalGesture.current) {
      // In RTL: dragging left (negative deltaX) moves to next, dragging right (positive) moves to previous
      // In LTR: dragging left (negative deltaX) moves to next, dragging right moves to previous
      const forwardCondition = isRtl ? deltaX > DRAG_THRESHOLD : deltaX < -DRAG_THRESHOLD;
      const backwardCondition = isRtl ? deltaX < -DRAG_THRESHOLD : deltaX > DRAG_THRESHOLD;

      if (forwardCondition) {
        nextSlide();
      } else if (backwardCondition) {
        prevSlide();
      }
    }

    setDragOffset(0);
    touchStartX.current = 0;
    touchStartY.current = 0;
    isHorizontalGesture.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section
      aria-label="Interactive Equipment Showcase"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F5F6F7] to-[#FFFFFF] dark:from-[#20252B] dark:via-[#1A1F26] dark:to-[#20252B] border-b border-[#E2E5E8] dark:border-[#303943] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Subtle Non-Button Status Indicator Bar */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#E2E5E8] dark:border-[#303943]/60">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D69A25] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-[#303943] dark:text-[#CBD5E1]">
              {isAr ? 'كتالوج الآليات التفاعلي' : 'INTERACTIVE EQUIPMENT SHOWCASE'}
            </span>
          </div>

          {/* Minimal 8-segment progress line */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {categories.map((cat, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={cat.id}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-[#E2E5E8] dark:bg-[#3E4956]"
                  style={{ width: isActive ? '36px' : '16px' }}
                >
                  {isActive && (
                    <div
                      className="absolute inset-y-0 start-0 bg-[#D69A25] rounded-full transition-all duration-75"
                      style={{
                        width: isInteracting ? '100%' : `${progress}%`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stationary Stage Grid: Surrounding page and grid never shift */}
        <div className="pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Synchronized Specs & Content - Animates smoothly per activeCategory */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              {/* Category Badge & Headline */}
              <div
                key={`headline-${activeCategory.id}`}
                className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D69A25] uppercase tracking-wider">
                  <span>{isAr ? activeCategory.badgeAr : activeCategory.badgeEn}</span>
                  <span className="text-[#64748B] dark:text-[#94A3B8]">/</span>
                  <span className="text-[#303943] dark:text-[#CBD5E1]">
                    {isAr ? activeCategory.nameAr : activeCategory.nameEn}
                  </span>
                </div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#20252B] dark:text-[#F5F6F7] tracking-tight leading-[1.2] font-heading">
                  {isAr ? activeCategory.headlineAr : activeCategory.headlineEn}
                </h1>
              </div>

              {/* Description */}
              <div
                key={`desc-${activeCategory.id}`}
                className="animate-in fade-in duration-300"
              >
                <p className="text-xs sm:text-base text-[#303943] dark:text-[#CBD5E1] leading-relaxed max-w-xl">
                  {isAr ? activeCategory.descriptionAr : activeCategory.descriptionEn}
                </p>
              </div>

              {/* Technical Specifications Matrix (Independent Staggered Reveal) */}
              <div
                key={`specs-${activeCategory.id}`}
                className="grid grid-cols-3 gap-2 sm:gap-3 py-3 border-y border-[#E2E5E8] dark:border-[#3E4956]"
              >
                {(isAr ? activeCategory.specsAr : activeCategory.specsEn).map((sp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs animate-in fade-in slide-in-from-bottom-1 duration-200"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <span className="block text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] font-medium truncate">
                      {sp.label}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold font-mono text-[#20252B] dark:text-[#F5F6F7] mt-0.5 tabular-nums">
                      {sp.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
                <button
                  onClick={() => navigate(activeCategory.serviceRoute)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] active:bg-[#B37B17] text-[#20252B] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <span>{isAr ? activeCategory.primaryCtaAr : activeCategory.primaryCtaEn}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/download')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#2B333D] hover:bg-[#F5F6F7] dark:hover:bg-[#303943] text-[#20252B] dark:text-[#F5F6F7] font-semibold text-xs sm:text-sm border border-[#E2E5E8] dark:border-[#3E4956] transition-all cursor-pointer whitespace-nowrap"
                >
                  <Smartphone className="w-4 h-4 text-[#D69A25]" />
                  <span>{t.hero.secondaryCta}</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="flex items-center gap-4 text-xs text-[#64748B] dark:text-[#94A3B8] pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D69A25]" />
                  <span>{isAr ? 'فحص دوري معتمد' : 'Certified Inspection'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D69A25]" />
                  <span>{isAr ? 'شحن فوري للموقع' : 'Direct Site Dispatch'}</span>
                </span>
              </div>
            </div>

            {/* Right: Dedicated Presentation Viewport - Captures gestures strictly here */}
            <div className="lg:col-span-6 w-full">
              <div
                ref={imageStageRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                style={{ touchAction: 'pan-y' }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E5E8] dark:border-[#3E4956] shadow-md bg-[#20252B] select-none cursor-grab active:cursor-grabbing group"
              >
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[440px] w-full overflow-hidden">
                  {/* Presentation-Style Animated Image Container with Horizontal Slide & Crossfade */}
                  <div
                    key={activeCategory.id}
                    className={`w-full h-full transition-transform duration-300 ease-out animate-in fade-in duration-400 ${
                      slideDirection === 'forward'
                        ? isRtl
                          ? 'slide-in-from-left-6'
                          : 'slide-in-from-right-6'
                        : isRtl
                        ? 'slide-in-from-right-6'
                        : 'slide-in-from-left-6'
                    }`}
                    style={{
                      transform: dragOffset !== 0 ? `translateX(${dragOffset}px)` : 'translateX(0px)',
                    }}
                  >
                    <IndustrialImage
                      src={activeCategory.image}
                      fallbackSrc={activeCategory.fallbackImage}
                      alt={isAr ? activeCategory.headlineAr : activeCategory.headlineEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 pointer-events-none"
                    />
                  </div>

                  {/* Gradient shadow for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20252B]/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Category Identification Pill */}
                  <div className="absolute top-4 start-4 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-lg bg-[#20252B]/90 text-[#F5F6F7] text-xs font-mono font-bold backdrop-blur-md border border-white/20 shadow-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D69A25]" />
                      <span>{isAr ? activeCategory.nameAr : activeCategory.nameEn}</span>
                      <span className="text-white/60 text-[10px]">
                        ({currentIndex + 1}/8)
                      </span>
                    </div>
                  </div>

                  {/* Subtle Swipe Gesture Guide (Fades out after user first interacts) */}
                  <div
                    className={`absolute bottom-4 inset-x-4 flex justify-between items-center pointer-events-none transition-opacity duration-700 ${
                      hasInteracted ? 'opacity-0' : 'opacity-80'
                    }`}
                  >
                    <span className="px-3 py-1 rounded-md bg-[#20252B]/75 text-[11px] text-white/90 backdrop-blur-xs font-mono border border-white/10">
                      {isAr ? '← اسحب الآلية للتنقل →' : '← Swipe equipment to navigate →'}
                    </span>
                    <span className="text-[10px] text-white/60 font-mono hidden sm:inline-block">
                      {isAr ? 'سحب باللمس أو الماوس' : 'Touch or Drag'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
