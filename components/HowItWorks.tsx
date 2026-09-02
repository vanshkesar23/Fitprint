'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Brain, Star } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: User,
    title: 'Create Your Fit Identity',
    description: 'Choose your method: enter body measurements manually, or upload a photo for AI-assisted body proportion analysis.',
    details: ['Smart Fit Profile', 'AI Body Analysis', 'Height & Measurements', 'Fit Preference'],
    color: '#6C63FF',
    glow: 'rgba(108,99,255,0.3)',
  },
  {
    number: '02',
    icon: Brain,
    title: 'FitPrint AI Analyzes',
    description: 'Our intelligence engine cross-references your body profile against brand-specific garment size data — not generic charts.',
    details: ['Brand Size Mapping', 'Garment Analysis', 'Fit Pattern Scoring', 'Profile Generation'],
    color: '#00D4FF',
    glow: 'rgba(0,212,255,0.3)',
  },
  {
    number: '03',
    icon: Star,
    title: 'Get Your Perfect Size',
    description: 'Receive brand-specific size recommendations with fit confidence scores and detailed analysis — for any brand.',
    details: ['Nova Studio → M', 'Zenith → L', 'Axiom Wear → L', 'Solace → XL'],
    color: '#FF2D78',
    glow: 'rgba(255,45,120,0.3)',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      {/* Step card */}
      <div
        className="glass-card rounded-2xl p-8 hover-lift relative overflow-hidden group"
        style={{
          background: `linear-gradient(135deg, ${step.color}08 0%, transparent 100%)`,
        }}
      >
        {/* Number watermark */}
        <div
          className="absolute top-4 right-4 font-display font-black text-[80px] leading-none opacity-[0.04] select-none"
          style={{ color: step.color }}
        >
          {step.number}
        </div>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
          style={{
            background: `linear-gradient(135deg, ${step.color}25 0%, ${step.color}10 100%)`,
            border: `1px solid ${step.color}40`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: step.color }} />
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${step.color}20 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="mb-1 flex items-center gap-2">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: step.color }}
          >
            Step {step.number}
          </span>
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-3">{step.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">{step.description}</p>

        {/* Detail pills */}
        <div className="flex flex-wrap gap-2">
          {step.details.map((detail) => (
            <span
              key={detail}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: `${step.color}15`,
                border: `1px solid ${step.color}30`,
                color: step.color,
              }}
            >
              {detail}
            </span>
          ))}
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
            boxShadow: `0 0 10px ${step.color}`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            How It Works
          </div>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Three Steps to{' '}
            <span className="gradient-text">Perfect Fit</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            FitPrint analyzes your unique body measurements and cross-references them
            against brand-specific sizing data to give you the right size — every time.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-[84px] left-1/3 right-1/3 h-[1px] pointer-events-none z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-full h-full origin-left step-line"
            />
          </div>

          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="/create"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold"
          >
            Create My FitPrint — Free
            <span className="text-white/70">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
