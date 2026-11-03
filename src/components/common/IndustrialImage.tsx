import React, { useState } from 'react';

interface IndustrialImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const IndustrialImage: React.FC<IndustrialImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden bg-[#F5F6F7]',
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center p-6 bg-[#303943] text-white ${containerClassName}`}>
        <svg viewBox="0 0 32 32" className="w-12 h-12 mb-2" fill="none">
          <rect width="32" height="32" rx="6" fill="#20252B" />
          <path d="M8 7h5v6h6V7h5v18h-5v-7h-6v7H8V7z" fill="#D69A25" />
        </svg>
        <span className="text-xs font-bold font-mono text-[#D69A25] tracking-wider uppercase">
          HEAVY DUTY
        </span>
        <span className="text-[11px] text-slate-300 mt-1 text-center font-medium">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};
