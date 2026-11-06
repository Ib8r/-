import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../../assets/images';
import { IndustrialImage } from '../common/IndustrialImage';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface EquipmentSlide {
  id: string;
  categoryAr: string;
  categoryEn: string;
  categoryKu: string;
  headlineAr: string;
  headlineEn: string;
  headlineKu: string;
  ctaAr: string;
  ctaEn: string;
  ctaKu: string;
  route: string;
  image: string;
  fallbackImage: string;
}

export const InteractiveHeroShowcase: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // 8 distinct equipment categories with short powerful headlines (Section 4.2)
  const slides: EquipmentSlide[] = [
    {
      id: 'excavators',
      categoryAr: 'حفارات هيدروليكية',
      categoryEn: 'Hydraulic Excavators',
      categoryKu: 'حەفارەی هایدرۆلیکی',
      headlineAr: 'احفر بقوة',
      headlineEn: 'Dig with Power',
      headlineKu: 'بە هێزەوە هەڵکەنە',
      ctaAr: 'استكشف الحفارات',
      ctaEn: 'Explore Excavators',
      ctaKu: 'پشکنینی حەفارەکان',
      route: '/services/rental',
      image: IMAGES.excavator,
      fallbackImage: FALLBACK_IMAGES.excavator,
    },
    {
      id: 'bulldozers',
      categoryAr: 'بلدوزرات تسوية',
      categoryEn: 'Mining Bulldozers',
      categoryKu: 'بوڵدۆزەری تەسکین',
      headlineAr: 'قوة تحرّك الأرض',
      headlineEn: 'Power that Moves the Earth',
      headlineKu: 'هێزێک زەوی دەجووڵێنێت',
      ctaAr: 'استكشف البلدوزرات',
      ctaEn: 'Explore Bulldozers',
      ctaKu: 'پشکنینی بوڵدۆزەرەکان',
      route: '/services/rental',
      image: IMAGES.bulldozer,
      fallbackImage: FALLBACK_IMAGES.bulldozer,
    },
    {
      id: 'wheel_loaders',
      categoryAr: 'شيافل ولوادر',
      categoryEn: 'Wheel Loaders',
      categoryKu: 'شۆفڵ و لۆدەر',
      headlineAr: 'أداء في كل حمولة',
      headlineEn: 'Performance in Every Load',
      headlineKu: 'کارایی لە هەموو بارێکدا',
      ctaAr: 'استكشف اللوادر',
      ctaEn: 'Explore Wheel Loaders',
      ctaKu: 'پشکنینی شۆفڵەکان',
      route: '/services/rental',
      image: IMAGES.wheelLoader,
      fallbackImage: FALLBACK_IMAGES.wheelLoader,
    },
    {
      id: 'cranes',
      categoryAr: 'رافعات كرين',
      categoryEn: 'Mobile Cranes',
      categoryKu: 'کرێن و بەرزکەرەوە',
      headlineAr: 'ارفع إلى آفاق أبعد',
      headlineEn: 'Lift to New Heights',
      headlineKu: 'بگە بە بەرزایی نوێ',
      ctaAr: 'استكشف الرافعات',
      ctaEn: 'Explore Mobile Cranes',
      ctaKu: 'پشکنینی کرێنەکان',
      route: '/services/rental',
      image: IMAGES.crane,
      fallbackImage: FALLBACK_IMAGES.crane,
    },
    {
      id: 'dump_trucks',
      categoryAr: 'شاحنات تفريغ',
      categoryEn: 'Dump & Haul Trucks',
      categoryKu: 'بارهەڵگری قەڵاب',
      headlineAr: 'انقل الأحمال بثقة',
      headlineEn: 'Haul Heavy with Confidence',
      headlineKu: 'بارە قورسەکان بە متمانەوە بگوازەرەوە',
      ctaAr: 'استكشف شاحنات التفريغ',
      ctaEn: 'Explore Dump Trucks',
      ctaKu: 'پشکنینی قەڵابەکان',
      route: '/services/rental',
      image: IMAGES.dumpTruck,
      fallbackImage: FALLBACK_IMAGES.dumpTruck,
    },
    {
      id: 'transport',
      categoryAr: 'شاحنات نقل ثقيل',
      categoryEn: 'Heavy Transportation Trucks',
      categoryKu: 'بارهەڵگری گواستنەوەی قورس',
      headlineAr: 'قوة النقل لمسافات طويلة',
      headlineEn: 'Heavy Haulage Across Any Distance',
      headlineKu: 'هێزی گواستنەوەی دوورودرێژ',
      ctaAr: 'خدمات النقل اللوجستي',
      ctaEn: 'Explore Logistics Fleets',
      ctaKu: 'خزمەتگوزاری گواستنەوە',
      route: '/services/rental',
      image: IMAGES.truck,
      fallbackImage: FALLBACK_IMAGES.truck,
    },
    {
      id: 'agriculture',
      categoryAr: 'آليات زراعية',
      categoryEn: 'Agricultural Tractors & Machinery',
      categoryKu: 'ئامێری کشتوکاڵی و تراکتۆر',
      headlineAr: 'ازرع المستقبل',
      headlineEn: 'Cultivate the Future',
      headlineKu: 'داهاتووی کشتوکاڵ بڕوێنە',
      ctaAr: 'استكشف الآليات الزراعية',
      ctaEn: 'Explore Agricultural Fleets',
      ctaKu: 'پشکنینی ئامێرە کشتوکاڵییەکان',
      route: '/services/sales',
      image: IMAGES.agriculture,
      fallbackImage: FALLBACK_IMAGES.agriculture,
    },
    {
      id: 'generators',
      categoryAr: 'مولدات ومحطات طاقة',
      categoryEn: 'Generators & Prime Power',
      categoryKu: 'مۆلیدە و وێستگەی وزە',
      headlineAr: 'طاقة للعمل بلا توقف',
      headlineEn: 'Unstoppable Prime Power',
      headlineKu: 'وزەی بێ پچڕان بۆ کارکردن',
      ctaAr: 'استكشف وحدات الطاقة',
      ctaEn: 'Explore Power Generators',
      ctaKu: 'پشکنینی مۆلیدەکان',
      route: '/services/rental',
      image: IMAGES.generator,
      fallbackImage: FALLBACK_IMAGES.generator,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [isInteracting, setIsInteracting] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isHorizontalGesture = useRef<boolean | null>(null);

  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleResumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 5500;
  const currentSlide = slides[currentIndex];

  // Preload all 8 high-resolution images on mount
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setSlideDirection('forward');
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setSlideDirection('backward');
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Pause autoplay immediately on user interaction and schedule resume after 4.5s idle
  const pauseAndScheduleResume = useCallback(() => {
    setIsInteracting(true);
    if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
    idleResumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 4500);
  }, []);

  // Autoplay ticker
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isInteracting) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    progressTimerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isInteracting, nextSlide]);

  // Unified touch/pointer gesture engine on the slider stage
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

    if (isHorizontalGesture.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalGesture.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontalGesture.current) {
      setDragOffset(deltaX);
    }
  };

  const handlePointerEnd = (e: React.PointerEvent) => {
    if (touchStartX.current === 0) return;
    const deltaX = e.clientX - touchStartX.current;
    const DRAG_THRESHOLD = 45;

    if (isHorizontalGesture.current) {
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
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      style={{ touchAction: 'pan-y' }}
      aria-label="HEAVY DUTY Equipment Showcase"
      className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[86vh] min-h-[480px] max-h-[900px] overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#20252B]"
    >
      {/* 1. Large Immersive Equipment Photography Layer */}
      <div
        key={currentSlide.id}
        className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-out animate-in fade-in duration-500 ${
          slideDirection === 'forward'
            ? isRtl
              ? 'slide-in-from-left-8'
              : 'slide-in-from-right-8'
            : isRtl
            ? 'slide-in-from-right-8'
            : 'slide-in-from-left-8'
        }`}
        style={{
          transform: dragOffset !== 0 ? `translateX(${dragOffset * 0.9}px)` : 'translateX(0px)',
        }}
      >
        <IndustrialImage
          src={currentSlide.image}
          fallbackSrc={currentSlide.fallbackImage}
          alt={locale === 'ku' ? currentSlide.headlineKu : locale === 'en' ? currentSlide.headlineEn : currentSlide.headlineAr}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      {/* 2. Restrained Localized Contrast Gradients (Preserves Equipment Visibility) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#20252B]/90 via-[#20252B]/20 to-black/30 pointer-events-none" />
      <div className="absolute inset-y-0 start-0 w-full max-w-2xl bg-gradient-to-r from-[#20252B]/85 via-[#20252B]/40 to-transparent pointer-events-none rtl:bg-gradient-to-l" />

      {/* 3. Streamlined Slide Content (Small Label + Short Headline + 1 Clear CTA) */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
        <div
          key={`content-${currentSlide.id}`}
          className="max-w-xl space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-400"
        >
          {/* Small Category Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#20252B]/80 backdrop-blur-md border border-[#D69A25]/40 text-[#D69A25] text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D69A25] animate-pulse" />
            <span>
              {locale === 'ku'
                ? currentSlide.categoryKu
                : locale === 'en'
                ? currentSlide.categoryEn
                : currentSlide.categoryAr}
            </span>
          </div>

          {/* Short Powerful Headline (Section 4.2) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F6F7] tracking-tight leading-[1.1] font-heading drop-shadow-md">
            {locale === 'ku'
              ? currentSlide.headlineKu
              : locale === 'en'
              ? currentSlide.headlineEn
              : currentSlide.headlineAr}
          </h1>

          {/* One Clear Primary CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate(currentSlide.route)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] active:bg-[#B37B17] text-[#20252B] font-bold text-sm sm:text-base transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <span>
                {locale === 'ku'
                  ? currentSlide.ctaKu
                  : locale === 'en'
                  ? currentSlide.ctaEn
                  : currentSlide.ctaAr}
              </span>
              <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 4. Subtle Slide Position Indicator (Non-Button Bar) */}
        <div className="pt-8 sm:pt-10 flex items-center justify-between border-t border-white/15 max-w-xl">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {slides.map((s, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-8 sm:w-10 bg-[#D69A25]'
                      : 'w-2 bg-white/30'
                  }`}
                />
              );
            })}
          </div>

          <div className="text-xs font-mono text-white/70 font-semibold tracking-wider">
            0{currentIndex + 1} / 0{slides.length}
          </div>
        </div>
      </div>
    </section>
  );
};
