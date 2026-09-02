'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle, ArrowRight, RefreshCw, AlertCircle, Sparkles, Check, X, User } from 'lucide-react';
import { useFitPrint } from '@/lib/context';
import { allBrands, ClothingCategory, categoryLabels, categoryEmojis, brandById } from '@/lib/brandSizeCharts';
import { recommendSize, buildFeedbackRecord, FitResult } from '@/lib/fitEngine';
import TiltCard from '@/components/TiltCard';

type DemoStep = 1 | 2;

export default function DemoPage() {
  const { addFeedback, feedbackHistory, addRecommendation } = useFitPrint();

  const [step, setStep] = useState<DemoStep>(1);
  const [category, setCategory] = useState<ClothingCategory>('tshirt');
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>(['hm', 'zara', 'nike', 'levis', 'roadster']);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Pre-created Demo Profile as requested
  const demoProfile = {
    name: 'Vansh (Demo User)',
    height: 178,
    weight: 74,
    chest: 98,
    waist: 82,
    shoulders: 46,
    fitPreference: 'regular' as const,
    fitprintId: 'FP-8294',
  };

  function toggleBrand(id: string) {
    if (selectedBrandIds.includes(id)) {
      if (selectedBrandIds.length <= 1) return;
      setSelectedBrandIds(prev => prev.filter(b => b !== id));
    } else {
      if (selectedBrandIds.length >= 6) return;
      setSelectedBrandIds(prev => [...prev, id]);
    }
  }

  function handleStartDemo() {
    setStep(2);
  }

  function handleAnalyzeDemo() {
    setAnalyzing(true);
    setAnalysisProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setAnalyzing(false);
        }, 300);
      }
    }, 180);
  }

  const selectedBrands = selectedBrandIds.map(id => brandById[id]).filter(Boolean);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto">

        {/* Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono font-bold uppercase mb-4">
            <AlertCircle className="w-3.5 h-3.5" /> Fully Interactive Product Demo
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
            Experience FitPrint <span className="gradient-text">in Action</span>
          </h1>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Test the live recommendation engine using a pre-created demo FitPrint profile across multiple brands.
          </p>
        </motion.div>

        {/* STEP 1: WELCOME SCREEN */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto text-center">
            <TiltCard strength={10}>
              <div className="glass-card rounded-3xl p-10 border-[#0047FF]/30 bg-gradient-to-b from-[#0047FF]/15 via-black to-purple-950/20 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-[#0047FF]/20 border border-[#0047FF]/40 flex items-center justify-center mx-auto shadow-glow">
                  <Zap className="w-8 h-8 text-[#0047FF]" />
                </div>

                <div>
                  <h3 className="font-display font-black text-3xl text-white mb-2">Experience FitPrint in Action.</h3>
                  <p className="text-white/50 text-xs leading-relaxed max-w-md mx-auto">
                    No sign-up or manual measurements needed. Explore how one personal FitPrint profile translates into different sizes across H&M, Zara, Nike, Levi's, and Roadster.
                  </p>
                </div>

                {/* Pre-created Profile Card */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-left font-mono text-xs space-y-2">
                  <div className="text-white/40 text-[10px] uppercase tracking-wider mb-2">PRE-CREATED DEMO PROFILE</div>
                  <div className="flex justify-between"><span className="text-white/40">Holder:</span><span className="text-white font-bold">{demoProfile.name}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Height:</span><span className="text-white">{demoProfile.height} cm</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Chest:</span><span className="text-white">{demoProfile.chest} cm</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Waist:</span><span className="text-white">{demoProfile.waist} cm</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Shoulders:</span><span className="text-white">{demoProfile.shoulders} cm</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Fit Style:</span><span className="text-blue-400 font-bold capitalize">{demoProfile.fitPreference}</span></div>
                </div>

                <button
                  onClick={handleStartDemo}
                  className="btn-primary w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #0047FF 0%, #6C63FF 100%)' }}
                >
                  START DEMO <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* STEP 2: INTERACTIVE DEMO FLOW */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Demo Controls Card */}
            <div className="glass-card rounded-3xl p-8 border-white/10 bg-black/80 space-y-6">
              {/* Category Selector */}
              <div>
                <span className="text-white/40 text-xs font-mono uppercase tracking-wider block mb-3">
                  Step 1: Select Garment Category
                </span>
                <div className="flex gap-2 flex-wrap">
                  {(['tshirt', 'shirt', 'hoodie', 'jeans'] as ClothingCategory[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                        category === cat
                          ? 'bg-[#0047FF] text-white border border-[#0047FF] shadow-glow'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{categoryEmojis[cat]}</span>
                      <span>{categoryLabels[cat]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Multi-Selector */}
              <div>
                <span className="text-white/40 text-xs font-mono uppercase tracking-wider block mb-3">
                  Step 2: Select Multiple Brands ({selectedBrandIds.length} selected)
                </span>
                <div className="flex flex-wrap gap-2">
                  {allBrands.slice(0, 10).map(b => {
                    const isSel = selectedBrandIds.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        onClick={() => toggleBrand(b.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                          isSel
                            ? 'bg-blue-500/20 text-white border border-blue-500/50 font-bold'
                            : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                        }`}
                      >
                        {isSel ? '✓ ' : '+ '}{b.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAnalyzeDemo}
                  className="btn-primary w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #0047FF 0%, #6C63FF 100%)' }}
                >
                  <Zap className="w-4 h-4" /> ANALYZE DEMO FIT
                </button>
              </div>
            </div>

            {/* ANALYZING STATE OR RESULTS */}
            {analyzing ? (
              <div className="glass-card rounded-3xl p-12 text-center border-blue-500/40 bg-black max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin mx-auto mb-2" />
                <h3 className="font-display font-bold text-xl text-white font-mono">Running FitPrint Recommendation Engine...</h3>
                <p className="text-white/40 text-xs font-mono">{analysisProgress}% Complete</p>
              </div>
            ) : (
              /* RESULTS GRID */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedBrands.map(b => {
                  const rec = recommendSize(
                    { chest: demoProfile.chest, waist: demoProfile.waist, hips: 100, shoulders: demoProfile.shoulders, height: demoProfile.height, weight: demoProfile.weight },
                    b, category, demoProfile.fitPreference, feedbackHistory
                  );
                  if (!rec) return null;

                  return (
                    <TiltCard key={b.id} strength={6}>
                      <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between border-white/10 bg-black/60">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-xs" style={{ background: b.color, color: '#FFF' }}>
                                {b.logo}
                              </div>
                              <h4 className="font-bold text-white text-base">{b.name}</h4>
                            </div>
                            <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                              {rec.sizeTendency}
                            </span>
                          </div>

                          <div className="rounded-2xl p-5 mb-4 text-center bg-white/5 border border-white/10">
                            <div className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-1">RECOMMENDED SIZE</div>
                            <div className="font-display font-black text-5xl text-white mb-2">{rec.size}</div>
                            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30">
                              <Check className="w-3.5 h-3.5" /> {rec.confidence}% MATCH
                            </div>
                          </div>

                          <p className="text-xs text-white/50 bg-white/5 p-3 rounded-xl border border-white/10 leading-relaxed font-mono">
                            "{rec.reason}"
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
