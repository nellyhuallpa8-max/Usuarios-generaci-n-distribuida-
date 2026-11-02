import React from 'react';

interface EndeLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EndeLogo: React.FC<EndeLogoProps> = ({
  className = '',
  variant = 'color',
  showSubtitle = true,
  size = 'md',
}) => {
  const sizeMap = {
    sm: { imgH: 'h-8 sm:h-9', subSize: 'text-[9px] tracking-[0.22em]' },
    md: { imgH: 'h-10 sm:h-12', subSize: 'text-[11px] tracking-[0.25em]' },
    lg: { imgH: 'h-14 sm:h-16', subSize: 'text-[12px] tracking-[0.28em]' },
    xl: { imgH: 'h-18 sm:h-20', subSize: 'text-[14px] tracking-[0.3em]' },
  };

  const currentSize = sizeMap[size];
  const isDarkBg = variant === 'light'; // Logo rendered on dark header/hero

  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      {/* Official PNG Logo as provided in attachment */}
      <div
        className={`flex items-center transition-transform duration-300 ${
          isDarkBg
            ? 'bg-white/95 px-3 py-1.5 rounded-2xl shadow-md backdrop-blur-sm border border-white/20 hover:bg-white'
            : ''
        }`}
      >
        <img
          src="/assets/aistudio/logo-ende_eb7f8b44.png"
          alt="ENDE DEL BENI"
          className={`${currentSize.imgH} w-auto object-contain drop-shadow-sm`}
          loading="eager"
        />
      </div>

      {/* Subtitle: ENDE DELBENI SAM LA ENERGIA DEL BENI */}
      {showSubtitle && (
        <div
          className={`font-black uppercase mt-1 pl-1 flex items-center gap-1.5 ${currentSize.subSize} ${
            isDarkBg ? 'text-amber-300 drop-shadow-sm' : 'text-[#003B71]'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span>ENDE DELBENI SAM · LA ENERGÍA DEL BENI</span>
        </div>
      )}
    </div>
  );
};
