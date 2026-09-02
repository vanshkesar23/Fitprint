'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, HelpCircle, Code, Server, Check, Plus, X, Sparkles, SlidersHorizontal, Activity } from 'lucide-react';
import { useFitPrint } from '@/lib/context';
import { allBrands, categoryLabels, categoryEmojis, ClothingCategory, BrandProfile, brandById } from '@/lib/brandSizeCharts';
import { recommendSize, FitResult } from '@/lib/fitEngine';
import TiltCard from '@/components/TiltCard';

const MULTI_STAGES = [
  { id: 1, title: 'READING FITPRINT PROFILE', desc: 'Fetching chest, waist, shoulders & preference...' },
  { id: 2, title: 'CONNECTING BRAND DATA', desc: 'Loading size matrix for selected brands...' },
  { id: 3, title: 'ANALYZING SIZING STRUCTURES', desc: 'Comparing European & Indian cut allowances...' },
  { id: 4, title: 'CALCULATING COMPATIBILITY INDEX', desc: 'Weighted multi-point scoring in progress...' },
  { id: 5, title: 'RECOMMENDATIONS READY', desc: 'Displaying optimal size match per brand ✨' },
];

export default function ComparePage() {
  const { profile, user } = useFitPrint();
  const [category, setCategory] = useState<ClothingCategory>('tshirt');
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>(['hm', 'zara', 'roadster', 'nike']);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Fallback demo profile
  const userMeasurements = profile?.measurements || {
    chest: 98,
    waist: 82,
    hips: 100,
    shoulders: 46,
    height: 178,
    weight: 74,
  };
  const fitPreference = profile?.fitPreference || 'regular';

  function toggleBrand(id: string) {
    if (selectedBrandIds.includes(id)) {
      if (selectedBrandIds.length <= 1) return; // Keep at least one
      setSelectedBrandIds(prev => prev.filter(b => b !== id));
    } else {
      if (selectedBrandIds.length >= 6) return; // Limit to max 6
      setSelectedBrandIds(prev => [...prev, id]);
    }
  }

  function startMultiAnalysis() {
    setAnalyzing(true);
    setAnalysisStage(0);
    setAnalysisProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setAnalysisProgress(progress);
      const stageIdx = Math.min(Math.floor((progress / 100) * MULTI_STAGES.length), MULTI_STAGES.length - 1);
      setAnalysisStage(stageIdx);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setAnalyzing(false);
        }, 300);
      }
    }, 200); // 1 second total animation sequence
  }

  const selectedBrands = selectedBrandIds.map(id => brandById[id]).filter(Boolean);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative overflow-hidden bg-[#050505] text-white">
      {/* Background glow decorations */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#0047FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0047FF]/40 bg-[#0047FF]/10 text-[#0047FF] text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Zap className="w-3.5 h-3.5" /> Multi-Brand Fit Comparison Engine
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
            Multi-Brand <span className="gradient-text">Fit Comparison</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Select multiple brands and see how the <strong className="text-white">exact same body profile</strong> maps to different size recommendations.
          </p>
        </motion.div>

        {/* User Fit Identity Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-5 mb-8 flex flex-wrap items-center justify-between gap-4 border-white/10 bg-black/60"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0047FF] to-[#6C63FF] flex items-center justify-center font-mono text-white font-bold text-xs shadow-glow">
              {user?.fitprintId || 'FP-8294'}
            </div>
            <div>
              <div className="text-white text-sm font-semibold flex items-center gap-2">
                <span>{user?.name || 'Vansh (Demo Profile)'}</span>
                {!profile && <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Sample Profile</span>}
              </div>
              <div className="text-white/40 text-xs mt-0.5 flex gap-3 font-mono">
                <span>Chest: {userMeasurements.chest}cm</span>
                <span>Shoulders: {userMeasurements.shoulders}cm</span>
                <span>Waist: {userMeasurements.waist}cm</span>
                <span>Style: <strong className="capitalize text-blue-400">{fitPreference}</strong></span>
              </div>
            </div>
          </div>
          <Link href="/create" className="btn-ghost text-xs px-4 py-2 rounded-xl flex items-center gap-1">
            Update FitPrint →
          </Link>
        </motion.div>

        {/* Brand Selector Bar */}
        <div className="glass-card rounded-3xl p-6 mb-8 border-white/10 bg-black/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 text-xs font-mono uppercase tracking-wider">
              1. Select Brands to Compare ({selectedBrandIds.length}/6 selected)
            </span>
            <span className="text-white/30 text-[11px]">Click to add/remove brands</span>
          </div>

          {/* Selected Brand Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedBrands.map(b => (
              <div
                key={b.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-white bg-blue-500/20 border border-blue-500/40"
              >
                <span>{b.origin === 'indian' ? '🇮🇳' : '🌍'} {b.name}</span>
                <button onClick={() => toggleBrand(b.id)} className="hover:text-red-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Selection Dropdown / Selector List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <span className="text-white/30 text-xs font-mono flex-shrink-0 pr-2">Quick Add:</span>
            {allBrands.slice(0, 12).map(b => {
              const isSel = selectedBrandIds.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => toggleBrand(b.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex-shrink-0 ${
                    isSel
                      ? 'bg-blue-500 text-white font-bold'
                      : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                  }`}
                >
                  {isSel ? '✓ ' : '+ '}{b.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Selector & Trigger */}
        <div className="mb-10 text-center space-y-4">
          <div className="text-white/40 text-xs font-mono uppercase tracking-wider">
            2. Select Garment Category & Analyze
          </div>
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {(['tshirt', 'shirt', 'hoodie', 'jeans'] as ClothingCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                  category === cat
                    ? 'bg-[#0047FF] text-white shadow-glow border border-[#0047FF]'
                    : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                }`}
              >
                <span>{categoryEmojis[cat]}</span>
                <span>{categoryLabels[cat]}</span>
              </button>
            ))}
          </div>

          <button
            onClick={startMultiAnalysis}
            className="btn-primary px-8 py-4 rounded-2xl font-bold text-base shadow-2xl inline-flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #0047FF 0%, #6C63FF 100%)' }}
          >
            <Zap className="w-5 h-5" /> ANALYZE MY FIT ACROSS {selectedBrandIds.length} BRANDS
          </button>
        </div>

        {/* ANALYZING ANIMATION OVERLAY OR RESULTS */}
        {analyzing ? (
          <div className="glass-card rounded-3xl p-12 text-center border-blue-500/40 bg-black/90 max-w-xl mx-auto space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500" />
              <span className="font-display font-black text-xl text-blue-400 font-mono">{analysisProgress}%</span>
            </div>

            <div>
              <div className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                STAGE 0{MULTI_STAGES[analysisStage].id} / 05
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                {MULTI_STAGES[analysisStage].title}
              </h3>
              <p className="text-white/40 text-xs font-mono">{MULTI_STAGES[analysisStage].desc}</p>
            </div>
          </div>
        ) : (
          /* MULTI-BRAND RESULTS GRID */
          <div className="space-y-8">
            {/* Central FitPrint Synapse Hub */}
            <div className="glass-card rounded-3xl p-8 border-white/10 text-center relative overflow-hidden bg-gradient-to-b from-blue-900/20 to-black">
              <div className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">UNIVERSAL FITPRINT HUB</div>
              <div className="font-display font-black text-4xl text-white gradient-text mb-4">
                {user?.fitprintId || 'FP-8294'}
              </div>
              <p className="text-white/50 text-xs max-w-md mx-auto">
                Data streams calculated across {selectedBrands.length} brand sizing matrices for <strong className="text-white capitalize">{categoryLabels[category]}</strong>.
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedBrands.map(b => {
                const rec = recommendSize(userMeasurements, b, category, fitPreference);
                if (!rec) {
                  return (
                    <div key={b.id} className="glass-card rounded-3xl p-6 text-center text-white/30 text-xs">
                      {b.name} size data unavailable for {categoryLabels[category]}.
                    </div>
                  );
                }
                return (
                  <TiltCard key={b.id} strength={6}>
                    <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between border-white/10 hover:border-blue-500/40 bg-black/60 transition-all">
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-xs" style={{ background: b.color, color: '#FFF' }}>
                              {b.logo}
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-base leading-tight flex items-center gap-1.5">
                                {b.name}
                                <span className="text-[10px] text-white/40">{b.origin === 'indian' ? '🇮🇳' : '🌍'}</span>
                              </h4>
                              <span className="text-white/40 text-[10px] font-mono capitalize">{categoryLabels[category]}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                            {rec.sizeTendency}
                          </span>
                        </div>

                        {/* Recommended Size Box */}
                        <div className="rounded-2xl p-5 mb-4 text-center bg-white/5 border border-white/10">
                          <div className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-1">RECOMMENDED SIZE</div>
                          <div className="font-display font-black text-5xl text-white mb-2">{rec.size}</div>
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30">
                            <Check className="w-3.5 h-3.5" /> {rec.confidence}% Match
                          </div>
                        </div>

                        {/* Fit Compatibility Reason */}
                        <div className="text-xs text-white/50 bg-white/5 p-3.5 rounded-xl border border-white/10 leading-relaxed font-mono">
                          "{rec.reason}"
                        </div>
                      </div>

                      {/* Detail CTA */}
                      <Link href={`/brands/${b.id}`} className="mt-4 text-center text-xs font-bold text-blue-400 hover:underline block">
                        View Full Size Chart →
                      </Link>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
