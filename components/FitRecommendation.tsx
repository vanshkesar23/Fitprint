'use client';

import { motion } from 'framer-motion';
import { Zap, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { FitResult } from '@/lib/fitEngine';

interface FitRecommendationProps {
  result: FitResult;
  productName: string;
  brandName: string;
}

export default function FitRecommendation({ result, productName, brandName }: FitRecommendationProps) {
  const { size, confidence, chest, waist, shoulders, reason, sizeTendency, yourUsualSize } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 relative overflow-hidden border-primary-500/30"
      style={{
        background: 'linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(0,212,255,0.06) 100%)',
      }}
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-500/20 border border-primary-500/40 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-primary-400" />
          </div>
          <span className="font-mono text-xs text-primary-300 font-bold uppercase tracking-wider">
            FitPrint Recommendation
          </span>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/60">
          {sizeTendency}
        </span>
      </div>

      {/* Main Recommendation Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-white/40 text-xs font-mono uppercase mb-1">
            Recommended Size for {brandName}
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display font-black text-6xl text-white gradient-text">
              {size}
            </span>
            {yourUsualSize !== size && (
              <span className="text-white/40 text-xs">
                (Usual: <strong className="text-white/70">{yourUsualSize}</strong>)
              </span>
            )}
          </div>
        </div>

        {/* Confidence Gauge */}
        <div className="flex flex-col items-start sm:items-end">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-bold mb-1">
            <Check className="w-3.5 h-3.5" /> {confidence}% Fit Confidence
          </div>
          <span className="text-white/30 text-[10px]">Based on brand garment metrics</span>
        </div>
      </div>

      {/* Detailed Analysis Breakdown */}
      <div className="space-y-2 mb-6">
        <div className="text-white/40 text-[11px] font-mono uppercase tracking-wider mb-2">
          Measurement Analysis
        </div>
        {[
          { label: 'Chest', fit: chest },
          { label: 'Shoulders', fit: shoulders },
          { label: 'Waist', fit: waist },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-white/60 font-medium">{item.label}</span>
            <span className="font-semibold flex items-center gap-1" style={{ color: item.fit.color }}>
              {item.fit.label} ✓
            </span>
          </div>
        ))}
      </div>

      {/* Reason Box */}
      <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.06] text-xs leading-relaxed text-white/60">
        <strong className="text-white block mb-1">Why Size {size}?</strong>
        {reason}
      </div>
    </motion.div>
  );
}
