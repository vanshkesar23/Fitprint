'use client';

import { useFitPrint } from '@/lib/context';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Ruler, RefreshCw, CheckCircle, ArrowRight, Shield, Activity, Star, Layers, Sparkles } from 'lucide-react';
import { categoryLabels, categoryEmojis } from '@/lib/brandSizeCharts';
import TiltCard from '@/components/TiltCard';

export default function DashboardPage() {
  const { user, profile, feedbackHistory, recommendationHistory, fitAccuracy } = useFitPrint();

  const userName = user?.name || 'Vansh (Demo Profile)';
  const fitprintId = user?.fitprintId || 'FP-8294';

  const m = profile?.measurements || {
    chest: 98,
    waist: 82,
    hips: 100,
    shoulders: 46,
    height: 178,
    weight: 74,
  };

  const fitPref = profile?.fitPreference || 'regular';
  const bodyProf = profile?.bodyProfile || 'Balanced Athletic';

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">Fit Identity Dashboard</div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white">
              HELLO, <span className="gradient-text uppercase">{userName}</span>
            </h1>
          </div>
          <Link href="/create" className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5" style={{ background: '#0047FF' }}>
            Update Profile <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Identity Card Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 mb-8 relative overflow-hidden glass-card border-[#0047FF]/40 bg-gradient-to-r from-[#0047FF]/20 via-black to-[#6C63FF]/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0047FF] to-[#6C63FF] flex items-center justify-center font-bold text-white text-xl shadow-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">
                  Universal Fit Identity
                </div>
                <div className="font-display font-black text-4xl text-white tracking-wider gradient-text">
                  {fitprintId}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                  <span className="capitalize font-semibold text-cyan-400">{bodyProf}</span>
                  <span>·</span>
                  <span className="capitalize">{fitPref} Fit Preference</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/compare" className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5" style={{ background: '#0047FF' }}>
                Compare 50+ Brands <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <TiltCard strength={6}>
            <div className="glass-card rounded-2xl p-5 border-white/10">
              <span className="text-white/40 text-xs block mb-1 font-mono">FIT ACCURACY</span>
              <div className="font-display font-black text-4xl text-cyan-400">{fitAccuracy}%</div>
              <span className="text-white/30 text-[10px] mt-1 block">Verified post-purchase</span>
            </div>
          </TiltCard>

          <TiltCard strength={6}>
            <div className="glass-card rounded-2xl p-5 border-white/10">
              <span className="text-white/40 text-xs block mb-1 font-mono">BRANDS ANALYZED</span>
              <div className="font-display font-black text-4xl text-blue-400">
                {new Set(recommendationHistory.map(r => r.brandId)).size || 12}
              </div>
              <span className="text-white/30 text-[10px] mt-1 block">H&M, Zara, Nike, etc.</span>
            </div>
          </TiltCard>

          <TiltCard strength={6}>
            <div className="glass-card rounded-2xl p-5 border-white/10">
              <span className="text-white/40 text-xs block mb-1 font-mono">RECOMMENDATIONS</span>
              <div className="font-display font-black text-4xl text-purple-400">
                {recommendationHistory.length || 8}
              </div>
              <span className="text-white/30 text-[10px] mt-1 block">Calculated sizing runs</span>
            </div>
          </TiltCard>

          <TiltCard strength={6}>
            <div className="glass-card rounded-2xl p-5 border-white/10">
              <span className="text-white/40 text-xs block mb-1 font-mono">FEEDBACK QUALITY</span>
              <div className="font-display font-black text-xl text-emerald-400 mt-2">
                HIGH ({feedbackHistory.length} items)
              </div>
              <span className="text-white/30 text-[10px] mt-1 block">Adaptive learning weight</span>
            </div>
          </TiltCard>
        </div>

        {/* Measurements & Recommendation History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Saved Measurements */}
          <div className="lg:col-span-5">
            <TiltCard strength={5}>
              <div className="glass-card rounded-3xl p-7 border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-blue-400" /> Saved Body Dimensions
                  </h3>
                  <Link href="/profile" className="text-xs text-blue-400 hover:underline">Edit</Link>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/40 block text-[10px]">CHEST</span>
                    <strong className="text-white text-base font-display">{m.chest} cm</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/40 block text-[10px]">SHOULDERS</span>
                    <strong className="text-white text-base font-display">{m.shoulders} cm</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/40 block text-[10px]">WAIST</span>
                    <strong className="text-white text-base font-display">{m.waist} cm</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/40 block text-[10px]">HIPS</span>
                    <strong className="text-white text-base font-display">{m.hips} cm</strong>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-white/40 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Created via {profile?.createdVia === 'ai-analysis' ? 'AI Body Analysis Photo' : 'Smart Fit Profile'}</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Recent Recommendations Timeline */}
          <div className="lg:col-span-7">
            <TiltCard strength={5}>
              <div className="glass-card rounded-3xl p-7 border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" /> Recommendation Timeline
                  </h3>
                  <Link href="/compare" className="text-xs text-cyan-400 hover:underline">New Compare</Link>
                </div>

                {recommendationHistory.length > 0 ? (
                  <div className="space-y-2.5">
                    {recommendationHistory.slice(0, 5).map((rec, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                        <div>
                          <strong className="text-white block font-semibold">{rec.brandName}</strong>
                          <span className="text-white/40">{categoryEmojis[rec.category]} {categoryLabels[rec.category]}</span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="font-display font-black text-base text-blue-400">Size {rec.recommendedSize}</span>
                          <span className="text-white/30 block text-[10px]">{rec.confidence}% match</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {[
                      { brandName: 'H&M', category: 'tshirt' as const, recommendedSize: 'M', confidence: 94 },
                      { brandName: 'Zara', category: 'tshirt' as const, recommendedSize: 'L', confidence: 89 },
                      { brandName: "Levi's", category: 'jeans' as const, recommendedSize: '32/32', confidence: 96 },
                    ].map((rec, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                        <div>
                          <strong className="text-white block font-semibold">{rec.brandName}</strong>
                          <span className="text-white/40">{categoryEmojis[rec.category]} {categoryLabels[rec.category]}</span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="font-display font-black text-base text-blue-400">Size {rec.recommendedSize}</span>
                          <span className="text-white/30 block text-[10px]">{rec.confidence}% match</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TiltCard>
          </div>
        </div>

      </div>
    </div>
  );
}
