'use client';

import { BrandProfile } from '@/lib/brandSizeCharts';

interface BrandAvatarProps {
  brand: BrandProfile;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-xs font-bold',
  lg: 'w-14 h-14 text-sm font-black',
  xl: 'w-20 h-20 text-lg font-black',
};

export default function BrandAvatar({ brand, size = 'md', className = '' }: BrandAvatarProps) {
  const sizeClasses = sizeMap[size];

  return (
    <div
      className={`rounded-2xl flex items-center justify-center font-display font-black tracking-wider uppercase flex-shrink-0 shadow-lg border border-white/20 transition-all duration-300 group-hover:scale-105 ${sizeClasses} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${brand.color} 0%, #0A0A0A 100%)`,
        color: '#FFFFFF',
        boxShadow: `0 4px 14px ${brand.color}30`,
      }}
    >
      <span>{brand.logo || brand.name.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}
