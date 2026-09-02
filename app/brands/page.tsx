'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Globe, ArrowRight, TrendingDown, TrendingUp, Minus, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { allBrands, BrandProfile, ClothingCategory, categoryLabels, categoryEmojis, FilterGroupKey, brandsByCategoryGroup } from '@/lib/brandSizeCharts';
import TiltCard from '@/components/TiltCard';

const filterCategories: { id: FilterGroupKey; label: string }[] = [
  { id: 'all', label: 'All Brands (50)' },
  { id: 'popular', label: 'Popular' },
  { id: 'fashion', label: 'Global Fashion' },
  { id: 'indian-fashion', label: 'Indian Online Fashion' },
  { id: 'sports', label: 'Sports & Activewear' },
  { id: 'denim', label: 'Denim' },
  { id: 'luxury', label: 'Luxury / Premium' },
  { id: 'ethnic', label: 'Ethnic Wear' },
  { id: 'affordable', label: 'Affordable' },
];

import BrandAvatar from '@/components/BrandAvatar';

function SizingBadge({ tendency }: { tendency: 'small' | 'true' | 'large' }) {
  const map = {
    small: { label: 'Runs Small', color: '#FF2D78', icon: TrendingDown },
    true:  { label: 'True to Size', color: '#00D4FF', icon: Minus },
    large: { label: 'Runs Large', color: '#FFD700', icon: TrendingUp },
  };
  const { label, color, icon: Icon } = map[tendency];
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold"
      style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
      <Icon className="w-3 h-3" /> {label}
    </div>
  );
}

function BrandCard({ brand, index }: { brand: BrandProfile; index: number }) {
  const supportedCategories = Object.keys(brand.categories) as ClothingCategory[];
  const tendency = supportedCategories.length > 0
    ? brand.categories[supportedCategories[0]]!.runsSizing
    : 'true';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
    >
      <TiltCard strength={8} className="h-full">
        <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between cursor-default border-white/10 hover:border-[#0047FF]/50 bg-black/60 transition-all group">

          {/* Top Brand Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              {/* Premium Brand Avatar PFP */}
              <BrandAvatar brand={brand} size="md" />

              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                brand.origin === 'indian'
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                  : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
              }`}>
                {brand.origin === 'indian' ? '🇮🇳 Indian' : `🌍 ${brand.country}`}
              </span>
            </div>

            <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">{brand.name}</h3>
            <p className="text-white/40 text-xs mb-3 font-mono capitalize">{brand.category}</p>

            <div className="mb-4">
              <SizingBadge tendency={tendency} />
            </div>

            <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4">
              {brand.generalNote}
            </p>

            {/* Supported Apparel Types */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {supportedCategories.map(cat => (
                <span key={cat} className="text-[10px] px-2 py-0.5 rounded-md font-mono text-white/60 bg-white/5 border border-white/10">
                  {categoryEmojis[cat]} {categoryLabels[cat]}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Link */}
          <Link
            href={`/brands/${brand.id}`}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 bg-[#0047FF]/15 hover:bg-[#0047FF] border border-[#0047FF]/30 text-white group"
          >
            <span>View Size Chart & Fit</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function BrandsPage() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState<FilterGroupKey>('all');

  const filteredBrands = useMemo(() => {
    const groupList = brandsByCategoryGroup[activeGroup] || allBrands;
    return groupList.filter(brand => {
      const q = search.toLowerCase().trim();
      if (!q) return true;
      return (
        brand.name.toLowerCase().includes(q) ||
        brand.country.toLowerCase().includes(q) ||
        brand.category.toLowerCase().includes(q)
      );
    });
  }, [search, activeGroup]);

  return (
    <div className="min-h-screen pt-24 pb-20 relative bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0047FF]/40 bg-[#0047FF]/10 text-[#0047FF] text-xs font-mono font-bold tracking-widest uppercase mb-5">
            <Globe className="w-3.5 h-3.5" /> FIT INTELLIGENCE DATABASE
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mb-4 tracking-tight">
            Your Fit. <span className="gradient-text">Across Every Brand.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            One FitPrint profile. Personalized recommendations across 50 popular brands you wear.
          </p>
        </motion.div>

        {/* ── SEARCH & CATEGORY FILTERS ────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }} className="mb-10 space-y-6">

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search your favourite brand (Nike, H&M, Roadster, Zara, Manyavar...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-glass w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm bg-black/60 border-white/10 focus:border-[#0047FF]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white">
                Clear
              </button>
            )}
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveGroup(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeGroup === cat.id
                    ? 'bg-[#0047FF] text-white shadow-glow border border-[#0047FF]'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── RESULTS COUNT ───────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
          <p className="text-white/40 text-xs font-mono">
            SHOWING <span className="text-white font-bold">{filteredBrands.length}</span> BRANDS IN DATABASE
          </p>
          {search && (
            <p className="text-white/40 text-xs">Search query: "<span className="text-white">{search}</span>"</p>
          )}
        </div>

        {/* ── BRAND GRID ─────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          {filteredBrands.length > 0 ? (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBrands.map((brand, i) => (
                <BrandCard key={brand.id} brand={brand} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">No brand matches found</h3>
              <p className="text-white/40 text-sm mb-4">Try searching another brand name or clear search filters</p>
              <button onClick={() => { setSearch(''); setActiveGroup('all'); }} className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold" style={{ background: '#0047FF' }}>
                Reset Brand Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM SCALE SECTION ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <TiltCard strength={5} className="inline-block w-full max-w-3xl">
            <div className="glass-card rounded-3xl p-10 border-[#0047FF]/30 bg-gradient-to-r from-[#0047FF]/10 via-black to-purple-900/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0047FF]/20 text-[#0047FF] text-xs font-mono font-bold uppercase mb-4 border border-[#0047FF]/40">
                <Sparkles className="w-3.5 h-3.5" /> Brand Scaling Architecture
              </div>
              <h3 className="font-display font-black text-3xl md:text-4xl text-white mb-3">
                Today, 50 Brands. Tomorrow, Every Wardrobe.
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                FitPrint is built on a scalable fit intelligence engine. New brands integrate through structured size data and future API partnerships without changing a user's FitPrint.
              </p>

              {/* Animated scaling diagram */}
              <div className="flex items-center justify-center gap-3 sm:gap-6 font-mono text-xs font-bold text-white/80 flex-wrap">
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">USER</span>
                <span className="text-white/20">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40">ONE FITPRINT</span>
                <span className="text-white/20">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">ENGINE</span>
                <span className="text-white/20">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">50+ BRANDS</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </div>
  );
}
