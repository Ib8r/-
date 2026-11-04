import React from 'react';

interface LogoProps {
  variant?: 'full' | 'symbol' | 'icon';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

/**
 * HEAVY DUTY - Official Geometric Logo System
 * Colors strictly calibrated to:
 * - Industrial Amber Gold: #D69A25
 * - Deep Slate Gray: #303943
 * - Graphite: #20252B
 * - Industrial White: #F5F6F7
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';

  const symbolSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
    xl: 'w-14 h-14 sm:w-16 sm:h-16',
  }[size];

  const textSizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  }[size];

  const taglineSizeClasses = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-[10px] sm:text-xs',
    xl: 'text-xs sm:text-sm',
  }[size];

  // SVG Geometric HD Industrial Monogram
  const Emblem = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${symbolSizeClasses} shrink-0`}
      aria-label="HEAVY DUTY Symbol"
    >
      {/* Heavy Industrial Chamfered Shield Background */}
      <polygon
        points="6,6 42,6 42,32 30,44 6,44"
        className="fill-[#20252B] dark:fill-[#D69A25] stroke-[#303943] dark:stroke-[#D69A25]"
        strokeWidth="1.5"
      />
      {/* High-Tensile Inner Corner Accent */}
      <polygon
        points="34,6 42,6 42,14"
        className="fill-[#D69A25] dark:fill-[#20252B]"
      />
      {/* Precision Geometric 'H' Left Stem */}
      <rect
        x="12"
        y="12"
        width="6"
        height="24"
        className="fill-[#D69A25] dark:fill-[#20252B]"
      />
      {/* Interlocking 'H' Crossbar */}
      <rect
        x="18"
        y="21"
        width="6"
        height="6"
        className="fill-[#D69A25] dark:fill-[#20252B]"
      />
      {/* Geometric 'D' Stem & Loop */}
      <path
        d="M24 12H30C34.4183 12 37 14.5 37 19V29C37 33.5 34.4183 36 30 36H24V12ZM30 18H28V30H30C31.8 30 32.5 28.5 32.5 26V22C32.5 19.5 31.8 18 30 18Z"
        className="fill-[#F5F6F7] dark:fill-[#20252B]"
      />
    </svg>
  );

  if (variant === 'symbol' || variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      {Emblem}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight uppercase select-none ${textSizeClasses} text-[#20252B] dark:text-[#F5F6F7]`}
        >
          HEAVY <span className="text-[#D69A25]">DUTY</span>
        </span>
        {showTagline && (
          <span
            className={`font-mono uppercase font-bold tracking-wider mt-0.5 select-none hidden xs:inline-block ${taglineSizeClasses} text-[#303943] dark:text-[#CBD5E1]`}
          >
            Heavy Equipment Marketplace
          </span>
        )}
      </div>
    </div>
  );
};
