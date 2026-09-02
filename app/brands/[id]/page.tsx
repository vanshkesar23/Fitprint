'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ArrowRight, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import Link from 'next/link';
import { brandById, ClothingCategory, categoryLabels, categoryEmojis, SizeKey } from '@/lib/brandSizeCharts';
import { recommendSize, UserMeasurements } from '@/lib/fitEngine';
import { useFitPrint } from '@/lib/context';
import TiltCard from '@/components/TiltCard';

const SIZE_ORDER: SizeKey[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const categoryLabelsUI: Record<string, string> = {
  'fast-fashion': 'Fast Fashion',
  'premium': 'Premium',
  'sports': 'Sports',
  'formal': 'Formal',
  'ethnic': 'Ethnic',
  'denim': 'Denim',
  'streetwear': 'Streetwear',
};

function SizingChip({ tendency }: { tendency: 'small' | 'true' | 'large' }) {
  const map = {
    small: { label: 'Runs Small — Size Up', color: '#FF2D78', Icon: TrendingDown },
    true: { label: 'True to Size', color: '#00D4FF', Icon: Minus },
    large: { label: 'Runs Large — Size Down', color: '#FFD700', Icon: TrendingUp },
  };
  const { label, color, Icon } = map[tendency];
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
      style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </span>
  );
}

export default function BrandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { profile, feedbackHistory } = useFitPrint();
  const brandId = params?.id as string;
  const brand = brandById[brandId];

  const supportedCats = brand ? (Object.keys(brand.categories) as ClothingCategory[]) : [];
  const [activeCategory, setActiveCategory] = useState<ClothingCategory>(supportedCats[0] || 'tshirt');

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Brand not found</h2>
          <p className="text-white/40 mb-6">This brand doesn't exist in our database.</p>
          <Link href="/brands" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  const categoryData = brand.categories[activeCategory];
  const hasProfile = !!(profile?.measurements?.chest);
  const userMeasurements: UserMeasurements | null = profile?.measurements || null;

  const fitResult = hasProfile && userMeasurements && categoryData
    ? recommendSize(userMeasurements, brand, activeCategory, profile?.fitPreference || 'regular', feedbackHistory || [])
    : null;

  const fitStatusColor: Record<string, string> = {
    perfect: '#00D4FF',
    'slightly-relaxed': '#6C63FF',
    'slightly-tight': '#FFD700',
    tight: '#FF2D78',
    loose: '#FF2D78',
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── BACK ──────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/brands" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to All Brands
          </Link>
        </motion.div>

        {/* ── BRAND HEADER ──────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo block */}
            <TiltCard strength={10}>
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
                style={{ background: `${brand.color}18`, border: `2px solid ${brand.color}40`, color: brand.color, boxShadow: `0 0 30px ${brand.color}20` }}>
                {brand.logo}
              </div>
            </TiltCard>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display font-black text-4xl text-white">{brand.name}</h1>
                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide ${
                  brand.origin === 'indian'
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/25'
                    : 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                }`}>
                  {brand.origin === 'indian' ? '🇮🇳 Made in India' : `🌍 ${brand.country}`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <SizingChip tendency={categoryData?.runsSizing || 'true'} />
                <span className="text-white/30 text-xs px-2 py-1 rounded-lg border border-white/10">
                  {supportedCats.length} categor{supportedCats.length === 1 ? 'y' : 'ies'} available
                </span>
              </div>

              <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{brand.generalNote}</p>
            </div>

            {/* Quick fit result badge */}
            {fitResult && (
              <TiltCard strength={8}>
                <div className="glass-card rounded-2xl p-5 text-center min-w-[140px]"
                  style={{ borderColor: `${brand.color}30`, boxShadow: `0 0 30px ${brand.color}15` }}>
                  <div className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">Your Size</div>
                  <div className="font-display font-black text-5xl mb-1" style={{ color: brand.color }}>
                    {fitResult.size}
                  </div>
                  <div className="text-white/40 text-xs">{fitResult.confidence}% confidence</div>
                </div>
              </TiltCard>
            )}
          </div>
        </motion.div>

        {/* ── CATEGORY TABS ─────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }} className="flex gap-3 mb-8 flex-wrap">
          {supportedCats.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat ? 'tab-active text-white' : 'glass-card text-white/50 hover:text-white/70'
              }`}>
              {categoryEmojis[cat]} {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── SIZE CHART TABLE ──────────────────────────────────────── */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <TiltCard strength={4}>
              <div className="glass-card rounded-2xl overflow-hidden"
                style={{ borderColor: `${brand.color}20` }}>
                {/* Table header */}
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">
                      {categoryEmojis[activeCategory]} {categoryLabels[activeCategory]} Size Chart
                    </h2>
                    {categoryData && (
                      <p className="text-white/35 text-xs mt-0.5">{categoryData.fitNotes}</p>
                    )}
                  </div>
                  {categoryData && <SizingChip tendency={categoryData.runsSizing} />}
                </div>

                {/* Table */}
                {categoryData ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="text-left px-6 py-3 text-white/30 font-mono text-xs uppercase tracking-wider">Size</th>
                          {categoryData.sizes.M?.chest && <th className="px-4 py-3 text-white/30 font-mono text-xs uppercase tracking-wider">Chest (cm)</th>}
                          {categoryData.sizes.M?.waist && <th className="px-4 py-3 text-white/30 font-mono text-xs uppercase tracking-wider">Waist (cm)</th>}
                          {categoryData.sizes.M?.hips && <th className="px-4 py-3 text-white/30 font-mono text-xs uppercase tracking-wider">Hips (cm)</th>}
                          {categoryData.sizes.M?.shoulders && <th className="px-4 py-3 text-white/30 font-mono text-xs uppercase tracking-wider">Shoulders (cm)</th>}
                          {categoryData.sizes.M?.inseam && <th className="px-4 py-3 text-white/30 font-mono text-xs uppercase tracking-wider">Inseam (cm)</th>}
                          {fitResult && <th className="px-4 py-3 text-white/30 font-mono text-xs uppercase tracking-wider">Your Fit</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_ORDER.filter(s => categoryData.sizes[s]).map((sizeKey, i) => {
                          const g = categoryData.sizes[sizeKey]!;
                          const isRecommended = fitResult?.size === sizeKey;
                          return (
                            <motion.tr key={sizeKey}
                              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className={`border-b border-white/[0.04] transition-colors ${isRecommended ? 'bg-gradient-to-r from-primary-500/10 to-transparent' : 'hover:bg-white/[0.02]'}`}>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className={`font-display font-black text-lg ${isRecommended ? 'text-white' : 'text-white/60'}`}>
                                    {sizeKey}
                                  </span>
                                  {isRecommended && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                      style={{ background: `${brand.color}20`, color: brand.color, border: `1px solid ${brand.color}40` }}>
                                      <CheckCircle className="w-2.5 h-2.5" /> YOUR SIZE
                                    </span>
                                  )}
                                </div>
                              </td>
                              {g.chest && <td className="px-4 py-4 text-center text-white/55 text-xs font-mono">{g.chest[0]}–{g.chest[1]}</td>}
                              {g.waist && <td className="px-4 py-4 text-center text-white/55 text-xs font-mono">{g.waist[0]}–{g.waist[1]}</td>}
                              {g.hips && <td className="px-4 py-4 text-center text-white/55 text-xs font-mono">{g.hips[0]}–{g.hips[1]}</td>}
                              {g.shoulders && <td className="px-4 py-4 text-center text-white/55 text-xs font-mono">{g.shoulders[0]}–{g.shoulders[1]}</td>}
                              {g.inseam && <td className="px-4 py-4 text-center text-white/55 text-xs font-mono">{g.inseam[0]}–{g.inseam[1]}</td>}
                              {fitResult && (
                                <td className="px-4 py-4 text-center">
                                  {isRecommended && (
                                    <span className="text-xs font-bold" style={{ color: brand.color }}>✓ Best Fit</span>
                                  )}
                                </td>
                              )}
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-white/30">
                    No size chart available for this category.
                  </div>
                )}
              </div>
            </TiltCard>
          </motion.div>

          {/* ── RIGHT PANEL ───────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }} className="space-y-5">

            {/* Personalised recommendation */}
            {fitResult ? (
              <TiltCard strength={8}>
                <div className="glass-card rounded-2xl p-6"
                  style={{ borderColor: `${brand.color}30`, background: `linear-gradient(145deg, ${brand.color}10, transparent)` }}>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Your FitPrint Recommendation</div>

                  <div className="flex items-baseline gap-3 mb-4">
                    <div className="font-display font-black text-6xl" style={{ color: brand.color }}>{fitResult.size}</div>
                    <div>
                      <div className="text-white/70 text-sm font-semibold">{fitResult.confidence}% match</div>
                      <div className="text-white/35 text-xs">for {brand.name}</div>
                    </div>
                  </div>

                  {/* Confidence bar */}
                  <div className="h-1.5 rounded-full bg-white/[0.06] mb-4 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${fitResult.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full progress-bar" />
                  </div>

                  {/* Measurement breakdown */}
                  <div className="space-y-2 mb-4">
                    {[
                      { label: 'Chest', data: fitResult.chest },
                      { label: 'Shoulders', data: fitResult.shoulders },
                      { label: 'Waist', data: fitResult.waist },
                    ].map(({ label, data }) => (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <span className="text-white/40">{label}</span>
                        <span className="font-semibold" style={{ color: fitStatusColor[data.status] || '#00D4FF' }}>
                          {data.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-white/40 text-xs leading-relaxed border-t border-white/[0.06] pt-4">
                    {fitResult.reason}
                  </p>
                </div>
              </TiltCard>
            ) : (
              <TiltCard strength={8}>
                <div className="glass-card rounded-2xl p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">👤</div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">No Profile Yet</h3>
                    <p className="text-white/40 text-sm mb-5">
                      Create your FitPrint profile to get a personalised size recommendation for {brand.name}.
                    </p>
                    <Link href="/create" className="btn-primary w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold">
                      Create My FitPrint <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            )}

            {/* Brand info card */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Brand Info</div>
              {[
                { label: 'Country', value: brand.country, icon: '🌍' },
                { label: 'Type', value: categoryLabelsUI[brand.category] || brand.category, icon: '🏷️' },
                { label: 'Origin', value: brand.origin === 'indian' ? 'Indian Brand 🇮🇳' : 'International', icon: '📍' },
                { label: 'Sizing', value: categoryData?.runsSizing === 'small' ? 'Runs Small' : categoryData?.runsSizing === 'large' ? 'Runs Large' : 'True to Size', icon: '📐' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                  <span className="text-white/35">{row.icon} {row.label}</span>
                  <span className="text-white/70 font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Compare link */}
            <Link href="/compare" className="btn-ghost flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold w-full">
              Compare Brands <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
