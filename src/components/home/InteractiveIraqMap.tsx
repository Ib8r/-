import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import {
  IRAQ_GOVERNORATES,
  LOGISTICS_CORRIDORS,
  IRAQ_ACCURATE_DOTS,
  IraqiGovernorate,
} from '../../data/iraqGeoData';
import {
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  Truck,
  Wrench,
  Cog,
  ArrowRight,
  ArrowLeft,
  Navigation,
  Globe2
} from 'lucide-react';

export const InteractiveIraqMap: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const { isDark } = useTheme();
  const isAr = locale === 'ar';
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Baghdad selected by default as the national capital
  const [selectedGov, setSelectedGov] = useState<IraqiGovernorate>(
    IRAQ_GOVERNORATES.find((g) => g.id === 'baghdad') || IRAQ_GOVERNORATES[0]
  );
  const [hoveredGov, setHoveredGov] = useState<IraqiGovernorate | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  const mapSvgRef = useRef<SVGSVGElement>(null);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.0));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.85));
  const handleResetZoom = () => setZoom(1);

  const handleGovSelect = (gov: IraqiGovernorate) => {
    setSelectedGov(gov);
  };

  return (
    <section
      aria-label="Nationwide Iraq Equipment Network"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      <div className="rounded-3xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] p-5 sm:p-8 lg:p-10 shadow-xs space-y-8 transition-colors duration-300">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E5E8] dark:border-[#303943]/60 pb-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>{isAr ? 'خارطة التغطية الجغرافية' : 'NATIONWIDE GEOGRAPHIC NETWORK'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? 'شبكة الآليات والخدمات عبر كافة محافظات العراق' : 'Comprehensive Machinery Coverage Across Iraq'}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] max-w-2xl leading-relaxed">
              {isAr
                ? 'استكشف انتشار أساطيل الآليات الثقيلة، مسارات النقل اللوجستي، ومراكز الصيانة المعتمدة عبر المحافظات العراقية الـ 19 مع بنية تحتية رقمية متطورة.'
                : 'Explore heavy equipment distribution, logistics transit corridors, and certified maintenance hubs across all 19 Iraqi governorates.'}
            </p>
          </div>

          {/* Official Professional Ambition Statement (Strictly Iraq with Global Ambition - Zero Foreign Flags) */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#D69A25]/40 text-[#20252B] dark:text-[#F5F6F7] text-xs font-medium shadow-2xs">
              <Globe2 className="w-4 h-4 text-[#D69A25] shrink-0" />
              <span>
                {isAr
                  ? 'تغطية شاملة لجميع أنحاء العراق — والتوسع العالمي قريباً.'
                  : 'Comprehensive coverage across Iraq — Global expansion coming soon.'}
              </span>
            </div>
          </div>
        </div>

        {/* Map & Detail Stage Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Map Visualization Area */}
          <div className="lg:col-span-7 xl:col-span-8 relative rounded-2xl bg-gradient-to-b from-[#F5F6F7]/80 to-[#FFFFFF] dark:from-[#1A1F26] dark:to-[#20252B] border border-[#E2E5E8] dark:border-[#303943] p-3 sm:p-6 overflow-hidden min-h-[480px] sm:min-h-[600px] flex items-center justify-center">
            {/* Subtle Zoom & Reset Controls */}
            <div className="absolute top-4 end-4 z-10 flex flex-col gap-1.5 p-1 rounded-xl bg-[#FFFFFF]/90 dark:bg-[#2B333D]/90 backdrop-blur-md border border-[#E2E5E8] dark:border-[#303943] shadow-xs">
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg text-[#303943] dark:text-[#CBD5E1] hover:text-[#D69A25] hover:bg-[#F5F6F7] dark:hover:bg-[#20252B] transition-colors cursor-pointer"
                title={isAr ? 'تكبير' : 'Zoom In'}
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg text-[#303943] dark:text-[#CBD5E1] hover:text-[#D69A25] hover:bg-[#F5F6F7] dark:hover:bg-[#20252B] transition-colors cursor-pointer"
                title={isAr ? 'تصغير' : 'Zoom Out'}
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 rounded-lg text-[#303943] dark:text-[#CBD5E1] hover:text-[#D69A25] hover:bg-[#F5F6F7] dark:hover:bg-[#20252B] transition-colors cursor-pointer"
                title={isAr ? 'إعادة ضبط' : 'Reset View'}
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Status Legend */}
            <div className="absolute bottom-4 start-4 z-10 hidden sm:flex items-center gap-4 px-3 py-2 rounded-xl bg-[#FFFFFF]/90 dark:bg-[#20252B]/90 backdrop-blur-md border border-[#E2E5E8] dark:border-[#303943] text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D69A25]" />
                <span>{isAr ? 'محافظات العراق الـ 19' : '19 Governorates'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#D69A25] border-t border-dashed border-[#D69A25]" />
                <span>{isAr ? 'مسارات النقل اللوجستي' : 'Logistics Corridors'}</span>
              </div>
            </div>

            {/* The Accurate SVG Map */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <svg
                ref={mapSvgRef}
                viewBox="0 0 680 780"
                preserveAspectRatio="xMidYMid meet"
                className="w-full max-h-[640px] transition-transform duration-300 ease-out select-none"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center center',
                }}
              >
                <defs>
                  {/* Subtle neon glow for selected boundary */}
                  <filter id="gold-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Soft background glow */}
                  <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Fine Dotted Texture inside Iraq Silhouette (IQ Machinery Reference Style) */}
                <g className="dots-layer pointer-events-none">
                  {IRAQ_ACCURATE_DOTS.map(([dx, dy], i) => (
                    <circle
                      key={i}
                      cx={dx}
                      cy={dy}
                      r="1.4"
                      className="fill-[#303943]/20 dark:fill-[#94A3B8]/25"
                    />
                  ))}
                </g>

                {/* 2. Inter-Governorate Logistics Transport Corridors */}
                <g className="corridors-layer pointer-events-none opacity-60">
                  {LOGISTICS_CORRIDORS.map((c, idx) => (
                    <line
                      key={idx}
                      x1={c.x1}
                      y1={c.y1}
                      x2={c.x2}
                      y2={c.y2}
                      stroke="#D69A25"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                      className="animate-[flow-line_30s_linear_infinite]"
                      opacity={
                        selectedGov.id === c.from || selectedGov.id === c.to ? 0.95 : 0.25
                      }
                    />
                  ))}
                </g>

                {/* 3. Verified Administrative Governorate Polygons with Theme-Aware High-Contrast Styling */}
                <g className="boundaries-layer">
                  {IRAQ_GOVERNORATES.map((gov) => {
                    const isSelected = selectedGov.id === gov.id;
                    const isHovered = hoveredGov?.id === gov.id;

                    // Light mode: clear dark Deep Slate Gray #303943 (not white or washed out!)
                    // Dark mode: refined illuminated boundary stroke #475569 / #64748B
                    const strokeColor = isSelected
                      ? '#D69A25'
                      : isHovered
                      ? '#D69A25'
                      : isDark
                      ? '#64748B'
                      : '#303943';

                    const strokeOpacity = isSelected
                      ? 1
                      : isHovered
                      ? 0.9
                      : isDark
                      ? 0.45
                      : 0.55;

                    const strokeWidth = isSelected ? 2.8 : isHovered ? 2.0 : 1.2;

                    const fillColor = isSelected
                      ? isDark
                        ? 'rgba(214, 154, 37, 0.22)'
                        : 'rgba(214, 154, 37, 0.16)'
                      : isHovered
                      ? 'rgba(214, 154, 37, 0.08)'
                      : 'transparent';

                    return (
                      <path
                        key={gov.id}
                        d={gov.path}
                        onClick={() => handleGovSelect(gov)}
                        onMouseEnter={() => setHoveredGov(gov)}
                        onMouseLeave={() => setHoveredGov(null)}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeOpacity={strokeOpacity}
                        strokeWidth={strokeWidth}
                        filter={isSelected ? 'url(#gold-neon-glow)' : undefined}
                        className="transition-all duration-300 cursor-pointer"
                      />
                    );
                  })}
                </g>

                {/* 4. Governorate Centroid Markers */}
                <g className="markers-layer">
                  {IRAQ_GOVERNORATES.map((gov) => {
                    const isSelected = selectedGov.id === gov.id;

                    return (
                      <g
                        key={`marker-${gov.id}`}
                        onClick={() => handleGovSelect(gov)}
                        className="cursor-pointer group"
                      >
                        {/* Outer Pulse Ring for Selected Marker */}
                        {isSelected && (
                          <circle
                            cx={gov.cx}
                            cy={gov.cy}
                            r="12"
                            fill="none"
                            stroke="#D69A25"
                            strokeWidth="1.8"
                            className="animate-ping opacity-75"
                          />
                        )}

                        {/* Outer Ring */}
                        <circle
                          cx={gov.cx}
                          cy={gov.cy}
                          r={isSelected ? 6 : 4.5}
                          fill={isSelected ? '#D69A25' : isDark ? '#20252B' : '#FFFFFF'}
                          stroke={isSelected ? (isDark ? '#F5F6F7' : '#20252B') : '#D69A25'}
                          strokeWidth={isSelected ? 2 : 1.5}
                          className="transition-all duration-200"
                        />

                        {/* Core Amber Dot */}
                        <circle
                          cx={gov.cx}
                          cy={gov.cy}
                          r={isSelected ? 2.5 : 2}
                          fill={isSelected ? (isDark ? '#20252B' : '#F5F6F7') : '#D69A25'}
                        />
                      </g>
                    );
                  })}
                </g>

                {/* 5. Clear Direct Governorate Labels with High Contrast */}
                <g className="labels-layer pointer-events-none">
                  {IRAQ_GOVERNORATES.map((gov) => {
                    const isSelected = selectedGov.id === gov.id;
                    const lx = gov.cx + (gov.labelOffsetX || 0);
                    const ly = gov.cy + (gov.labelOffsetY || 0);

                    return (
                      <text
                        key={`label-${gov.id}`}
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={`text-[9px] sm:text-[10px] font-sans font-bold transition-all duration-200 select-none ${
                          isSelected
                            ? 'fill-[#D69A25] font-extrabold text-[11px] sm:text-[12px]'
                            : isDark
                            ? 'fill-[#F5F6F7] opacity-90'
                            : 'fill-[#20252B] opacity-95'
                        }`}
                        style={{
                          textShadow: isDark
                            ? '0 1px 4px rgba(0,0,0,0.8)'
                            : '0 1px 3px rgba(255,255,255,0.9)',
                        }}
                      >
                        {isAr ? gov.nameAr : gov.nameEn}
                      </text>
                    );
                  })}
                </g>

                {/* 6. Selected Governorate Callout Pill with Perfect Flexbox Centering (Resolves Screenshot Alignment Issue) */}
                {selectedGov && (
                  <g className="callout-layer pointer-events-none animate-in fade-in duration-300">
                    {/* Leader Line from Centroid to Callout Pill Bottom Edge */}
                    <line
                      x1={selectedGov.cx}
                      y1={selectedGov.cy}
                      x2={selectedGov.cx}
                      y2={selectedGov.cy - 24}
                      stroke="#D69A25"
                      strokeWidth="1.8"
                      strokeDasharray="2 2"
                    />

                    {/* Small anchor dot at line attachment */}
                    <circle
                      cx={selectedGov.cx}
                      cy={selectedGov.cy - 24}
                      r="2"
                      fill="#D69A25"
                    />

                    {/* Clean Centered Callout Pill via foreignObject (Guarantees Perfect Horizontal & Vertical Text Centering) */}
                    <foreignObject
                      x={selectedGov.cx - 110}
                      y={selectedGov.cy - 56}
                      width="220"
                      height="36"
                      className="overflow-visible"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20252B] border-2 border-[#D69A25] shadow-[0_2px_12px_rgba(214,154,37,0.45)] text-[#F5F6F7] text-xs font-bold font-heading whitespace-nowrap">
                          <span className="w-2 h-2 rounded-full bg-[#D69A25] shrink-0 animate-pulse" />
                          <span>{isAr ? selectedGov.nameAr : selectedGov.nameEn}</span>
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Interactive Information Panel for Selected Governorate */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F5F6F7] to-[#FFFFFF] dark:from-[#2B333D] dark:to-[#20252B] border border-[#E2E5E8] dark:border-[#303943] shadow-xs space-y-6">
              {/* Header Badge & Title */}
              <div className="space-y-1.5 pb-4 border-b border-[#E2E5E8] dark:border-[#303943]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#D69A25]/15 text-[#D69A25] border border-[#D69A25]/30">
                    {isAr ? selectedGov.regionAr : selectedGov.regionEn}
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                    {isAr ? 'داخل العراق · 19 محافظة' : 'Iraq · 19 Governorates'}
                  </span>
                </div>

                <div className="pt-2">
                  <h3 className="text-2xl font-black text-[#20252B] dark:text-[#F5F6F7] font-heading flex items-center gap-2">
                    <span>{isAr ? selectedGov.nameAr : selectedGov.nameEn}</span>
                    <span className="w-2 h-2 rounded-full bg-[#D69A25]" />
                  </h3>
                  <p className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] uppercase">
                    {isAr ? selectedGov.nameEn : selectedGov.nameAr}
                  </p>
                </div>

                <p className="text-xs text-[#303943] dark:text-[#CBD5E1] pt-1 leading-relaxed">
                  {isAr ? selectedGov.hubTypeAr : selectedGov.hubTypeEn}
                </p>
              </div>

              {/* Verified Platform Service Capabilities in this Governorate */}
              <div className="space-y-3">
                <span className="block text-xs font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
                  {isAr ? 'الخدمات المتاحة عبر المنصة' : 'Verified Available Services'}
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#D69A25] shrink-0" />
                    <span className="text-xs font-medium text-[#20252B] dark:text-[#F5F6F7]">
                      {isAr ? 'تأجير الآليات' : 'Equipment Rental'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#D69A25] shrink-0" />
                    <span className="text-xs font-medium text-[#20252B] dark:text-[#F5F6F7]">
                      {isAr ? 'بيع وشراء المعدات' : 'Machinery Sales'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] flex items-center gap-2">
                    <Cog className="w-4 h-4 text-[#D69A25] shrink-0" />
                    <span className="text-xs font-medium text-[#20252B] dark:text-[#F5F6F7]">
                      {isAr ? 'قطع الغيار الأصلية' : 'Spare Parts Supply'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#D69A25] shrink-0" />
                    <span className="text-xs font-medium text-[#20252B] dark:text-[#F5F6F7]">
                      {isAr ? 'ورش وصيانة ميدانية' : 'Field Workshops'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Connecting Logistics Corridors */}
              <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] space-y-1.5">
                <span className="block text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                  {isAr ? 'شريان النقل اللوجستي الميداني' : 'Key Connecting Corridors'}
                </span>
                <p className="text-xs font-semibold text-[#20252B] dark:text-[#F5F6F7]">
                  {isAr
                    ? `ربط شحن مباشر مع بغداد، الموانئ، ومراكز المحافظات المجاورة`
                    : `Direct logistics transit with Baghdad, maritime ports, and neighboring hubs`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => navigate('/services/rental')}
                  className="w-full py-3 px-4 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] active:bg-[#B37B17] text-[#20252B] font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {isAr
                      ? `استعراض أسطول الآليات في ${selectedGov.nameAr}`
                      : `View Fleet in ${selectedGov.nameEn}`}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFFFFF] dark:bg-[#20252B] hover:bg-[#F5F6F7] dark:hover:bg-[#2B333D] text-[#303943] dark:text-[#CBD5E1] font-semibold text-xs border border-[#E2E5E8] dark:border-[#303943] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? 'التواصل مع المنسق الميداني للمحافظة' : 'Contact Regional Hub'}</span>
                </button>
              </div>

              {/* Verified Coverage Guarantee */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#94A3B8] border-t border-[#E2E5E8] dark:border-[#303943] pt-3">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D69A25]" />
                  <span>{isAr ? 'تغطية 19 محافظة' : 'All 19 Governorates'}</span>
                </span>
                <span className="font-mono">HEAVY DUTY IRAQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
