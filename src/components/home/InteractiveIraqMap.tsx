import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  IRAQ_NATIONAL_OUTLINE_PATH,
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
  Globe2
} from 'lucide-react';

/**
 * Official Map & Interaction Palette (Section 9.3 & 9.5)
 * External outline:           Champagne Gold #D6A64A (With moderate outward glow ONLY)
 * External outline highlight: Soft Champagne #F2D9A0
 * Internal boundaries (Light):Slate Gray #65717C (ABSOLUTELY NO NEON GLOW)
 * Internal boundaries (Dark): Muted light slate / subdued champagne-gray (NO NEON GLOW)
 * Hover state:                Muted Teal #69BDB5
 * Selected governorate:       Soft Aqua #A2DAD1
 * Text / Labels:              Warm Ivory #E9E5DC (Dark Mode), Slate #20252B (Light Mode)
 * Background:                 Deep Graphite #20252B
 */
export const InteractiveIraqMap: React.FC = () => {
  const { locale } = useLanguage();
  const { isDark } = useTheme();
  const isAr = locale === 'ar';

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
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14"
    >
      <div className="rounded-3xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] p-5 sm:p-8 lg:p-10 shadow-xs space-y-6 sm:space-y-8 transition-colors duration-300">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-[#E2E5E8] dark:border-[#303943]/60 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D6A64A] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#D6A64A]" />
              <span>{isAr ? 'خارطة التغطية الجغرافية' : 'NATIONWIDE GEOGRAPHIC NETWORK'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20252B] dark:text-[#E9E5DC] font-heading">
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
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#D6A64A]/40 text-[#20252B] dark:text-[#E9E5DC] text-xs font-medium shadow-2xs">
              <Globe2 className="w-4 h-4 text-[#D6A64A] shrink-0" />
              <span>
                {locale === 'ku'
                  ? 'داپۆشینی گشتگیر بۆ هەموو عێراق — فراوانبوونی جیهانی بەم زووانە.'
                  : locale === 'en'
                  ? 'Comprehensive coverage across Iraq — Global expansion coming soon.'
                  : 'تغطية شاملة لجميع أنحاء العراق — والتوسع العالمي قريباً.'}
              </span>
            </div>
          </div>
        </div>

        {/* Clean Standalone Map Presentation (Centered, 19 Governorates, No Lower Info Card) */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F5F6F7]/80 to-[#FFFFFF] dark:from-[#1A1F26] dark:to-[#20252B] border border-[#E2E5E8] dark:border-[#303943] p-3 sm:p-6 overflow-hidden min-h-[480px] sm:min-h-[640px] flex items-center justify-center">
          {/* Subtle Zoom & Reset Controls */}
          <div className="absolute top-4 end-4 z-10 flex flex-col gap-1.5 p-1 rounded-xl bg-[#FFFFFF]/90 dark:bg-[#2B333D]/90 backdrop-blur-md border border-[#E2E5E8] dark:border-[#303943] shadow-xs">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg text-[#303943] dark:text-[#CBD5E1] hover:text-[#D6A64A] hover:bg-[#F5F6F7] dark:hover:bg-[#20252B] transition-colors cursor-pointer"
              title={isAr ? 'تكبير' : 'Zoom In'}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg text-[#303943] dark:text-[#CBD5E1] hover:text-[#D6A64A] hover:bg-[#F5F6F7] dark:hover:bg-[#20252B] transition-colors cursor-pointer"
              title={isAr ? 'تصغير' : 'Zoom Out'}
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-lg text-[#303943] dark:text-[#CBD5E1] hover:text-[#D6A64A] hover:bg-[#F5F6F7] dark:hover:bg-[#20252B] transition-colors cursor-pointer"
              title={isAr ? 'إعادة ضبط' : 'Reset View'}
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Status Legend */}
          <div className="absolute bottom-4 start-4 z-10 hidden sm:flex items-center gap-4 px-3 py-2 rounded-xl bg-[#FFFFFF]/90 dark:bg-[#20252B]/90 backdrop-blur-md border border-[#E2E5E8] dark:border-[#303943] text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D6A64A]" />
              <span>{isAr ? 'محافظات العراق الـ 19' : '19 Governorates'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#D6A64A] border-t border-dashed border-[#D6A64A]" />
              <span>{isAr ? 'مسارات النقل اللوجستي' : 'Logistics Corridors'}</span>
            </div>
          </div>

          {/* The Accurate SVG Map with Distinct Layer Separation */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden max-w-4xl mx-auto">
            <svg
              ref={mapSvgRef}
              viewBox="0 0 680 780"
              preserveAspectRatio="xMidYMid meet"
              className="w-full max-h-[660px] transition-transform duration-300 ease-out select-none"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
              }}
            >
              <defs>
                {/* Moderate, Controlled Outward Glow for External Iraq Outline ONLY */}
                <filter id="national-border-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.0" result="blur" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.839  0 0 0 0 0.651  0 0 0 0 0.290  0 0 0 0.60 0"
                    result="glowColor"
                  />
                  <feMerge>
                    <feMergeNode in="glowColor" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Layer 1: Fine Subtle Dotted Texture inside Iraq Silhouette (IQ Machinery Style) */}
              <g className="dots-layer pointer-events-none">
                {IRAQ_ACCURATE_DOTS.map(([dx, dy], i) => (
                  <circle
                    key={i}
                    cx={dx}
                    cy={dy}
                    r="1.4"
                    className="fill-[#303943]/20 dark:fill-[#94A3B8]/20"
                  />
                ))}
              </g>

              {/* Layer 2: Inter-Governorate Logistics Transport Corridors */}
              <g className="corridors-layer pointer-events-none opacity-50">
                {LOGISTICS_CORRIDORS.map((c, idx) => (
                  <line
                    key={idx}
                    x1={c.x1}
                    y1={c.y1}
                    x2={c.x2}
                    y2={c.y2}
                    stroke="#D6A64A"
                    strokeWidth="1.2"
                    strokeDasharray="3 4"
                    className="animate-[flow-line_30s_linear_infinite]"
                    opacity={
                      selectedGov.id === c.from || selectedGov.id === c.to ? 0.9 : 0.2
                    }
                  />
                ))}
              </g>

              {/* Layer 3: Internal Governorate Boundaries — Clean, Thin, Non-glowing */}
              <g className="internal-boundaries-layer">
                {IRAQ_GOVERNORATES.map((gov) => {
                  const isSelected = selectedGov.id === gov.id;
                  const isHovered = hoveredGov?.id === gov.id;

                  const strokeColor = isSelected
                    ? '#A2DAD1'
                    : isHovered
                    ? '#69BDB5'
                    : isDark
                    ? 'rgba(148, 163, 184, 0.35)'
                    : '#65717C';

                  const strokeOpacity = isSelected ? 1 : isHovered ? 0.95 : isDark ? 0.7 : 0.75;
                  const strokeWidth = isSelected ? 2.5 : isHovered ? 2.0 : 1.1;

                  const fillColor = isSelected
                    ? 'rgba(162, 218, 209, 0.14)'
                    : isHovered
                    ? 'rgba(105, 189, 181, 0.08)'
                    : 'transparent';

                  return (
                    <path
                      key={`internal-${gov.id}`}
                      d={gov.path}
                      onClick={() => handleGovSelect(gov)}
                      onMouseEnter={() => setHoveredGov(gov)}
                      onMouseLeave={() => setHoveredGov(null)}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeOpacity={strokeOpacity}
                      strokeWidth={strokeWidth}
                      className="transition-colors duration-200 cursor-pointer"
                    />
                  );
                })}
              </g>

              {/* Layer 4: External National Iraq Outline — Golden Neon Halo in Dark Mode */}
              <g className="external-national-outline-layer pointer-events-none">
                {isDark ? (
                  <>
                    <path
                      d={IRAQ_NATIONAL_OUTLINE_PATH}
                      fill="none"
                      stroke="#D6A64A"
                      strokeWidth="2.8"
                      strokeOpacity="0.65"
                      filter="url(#national-border-glow)"
                    />
                    <path
                      d={IRAQ_NATIONAL_OUTLINE_PATH}
                      fill="none"
                      stroke="#D6A64A"
                      strokeWidth="1.6"
                      strokeOpacity="0.95"
                    />
                    <path
                      d={IRAQ_NATIONAL_OUTLINE_PATH}
                      fill="none"
                      stroke="#F2D9A0"
                      strokeWidth="0.5"
                      strokeOpacity="0.75"
                    />
                  </>
                ) : (
                  <path
                    d={IRAQ_NATIONAL_OUTLINE_PATH}
                    fill="none"
                    stroke="#303943"
                    strokeWidth="1.8"
                    strokeOpacity="0.95"
                  />
                )}
              </g>

              {/* Layer 5: Governorate Centroid Markers */}
              <g className="markers-layer">
                {IRAQ_GOVERNORATES.map((gov) => {
                  const isSelected = selectedGov.id === gov.id;
                  const isHovered = hoveredGov?.id === gov.id;

                  const markerColor = isSelected
                    ? '#A2DAD1'
                    : isHovered
                    ? '#69BDB5'
                    : '#D6A64A';

                  return (
                    <g
                      key={`marker-${gov.id}`}
                      onClick={() => handleGovSelect(gov)}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={gov.cx}
                        cy={gov.cy}
                        r={isSelected ? 6 : 4.5}
                        fill={isSelected ? '#A2DAD1' : isDark ? '#20252B' : '#FFFFFF'}
                        stroke={isSelected ? (isDark ? '#E9E5DC' : '#20252B') : markerColor}
                        strokeWidth={isSelected ? 2 : 1.5}
                        className="transition-all duration-200"
                      />

                      <circle
                        cx={gov.cx}
                        cy={gov.cy}
                        r={isSelected ? 2.5 : 2}
                        fill={isSelected ? (isDark ? '#20252B' : '#E9E5DC') : markerColor}
                      />

                      {gov.hasLeader && (
                        <line
                          x1={gov.cx}
                          y1={gov.cy}
                          x2={gov.labelX}
                          y2={gov.labelY + 6}
                          stroke={isDark ? '#D6A64A' : '#303943'}
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          strokeOpacity="0.7"
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Layer 6: Geographically Accurate Governorate Labels */}
              <g className="labels-layer pointer-events-none">
                {IRAQ_GOVERNORATES.map((gov) => {
                  const isSelected = selectedGov.id === gov.id;

                  const labelColor = isSelected
                    ? '#A2DAD1'
                    : isDark
                    ? '#E9E5DC'
                    : '#20252B';

                  return (
                    <text
                      key={`label-${gov.id}`}
                      x={gov.labelX}
                      y={gov.labelY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={`text-[9.5px] sm:text-[10.5px] font-sans font-bold transition-all duration-200 select-none ${
                        isSelected
                          ? 'font-extrabold text-[11px] sm:text-[12px]'
                          : 'opacity-90'
                      }`}
                      fill={labelColor}
                      style={{
                        textShadow: isDark
                          ? '0 1px 4px rgba(0,0,0,0.85)'
                          : '0 1px 3px rgba(255,255,255,0.95)',
                      }}
                    >
                      {isAr ? gov.nameAr : gov.nameEn}
                    </text>
                  );
                })}
              </g>

              {/* Layer 7: Selected Governorate Callout Pill with Perfect Centering */}
              {selectedGov && (
                <g className="callout-layer pointer-events-none animate-in fade-in duration-300">
                  <line
                    x1={selectedGov.cx}
                    y1={selectedGov.cy}
                    x2={selectedGov.cx}
                    y2={selectedGov.cy - 24}
                    stroke="#A2DAD1"
                    strokeWidth="1.8"
                    strokeDasharray="2 2"
                  />

                  <circle
                    cx={selectedGov.cx}
                    cy={selectedGov.cy - 24}
                    r="2"
                    fill="#A2DAD1"
                  />

                  <foreignObject
                    x={selectedGov.cx - 110}
                    y={selectedGov.cy - 56}
                    width="220"
                    height="36"
                    className="overflow-visible"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20252B] border-2 border-[#A2DAD1] shadow-[0_2px_14px_rgba(162,218,209,0.5)] text-[#E9E5DC] text-xs font-bold font-heading whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-[#A2DAD1] shrink-0" />
                        <span>{isAr ? selectedGov.nameAr : selectedGov.nameEn}</span>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
