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
 * Custom HD industrial monogram with precision chamfers and industrial corporate typography.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';

  // Sizing definitions
  const symbolSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const taglineSizeClasses = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  // SVG Geometric HD Emblem
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
        fill={isDark ? '#F59E0B' : '#0F172A'}
        stroke={isDark ? '#D97706' : '#1E293B'}
        strokeWidth="1.5"
      />
      {/* High-Tensile Inner Accent Stripe */}
      <polygon
        points="34,6 42,6 42,14"
        fill={isDark ? '#0F172A' : '#F59E0B'}
      />
      {/* Precision Geometric 'H' Left Stem */}
      <rect
        x="12"
        y="12"
        width="6"
        height="24"
        fill={isDark ? '#0F172A' : '#F59E0B'}
      />
      {/* Interlocking 'H' Crossbar */}
      <rect
        x="18"
        y="21"
        width="6"
        height="6"
        fill={isDark ? '#0F172A' : '#F59E0B'}
      />
      {/* Geometric 'D' Stem & Loop */}
      <path
        d="M24 12H30C34.4183 12 37 14.5 37 19V29C37 33.5 34.4183 36 30 36H24V12ZM30 18H28V30H30C31.8 30 32.5 28.5 32.5 26V22C32.5 19.5 31.8 18 30 18Z"
        fill={isDark ? '#0F172A' : '#FFFFFF'}
      />
    </svg>
  );

  if (variant === 'symbol' || variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {Emblem}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight uppercase select-none font-heading ${textSizeClasses} ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          HEAVY <span className="text-amber-500">DUTY</span>
        </span>
        {showTagline && (
          <span
            className={`font-mono uppercase font-bold tracking-widest mt-1 select-none ${taglineSizeClasses} ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Heavy Equipment Marketplace
          </span>
        )}
      </div>
    </div>
  );
};
