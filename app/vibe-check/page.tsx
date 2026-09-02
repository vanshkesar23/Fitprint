'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Camera, Upload, Flame, Smile, Gem, Activity,
  Lock, RefreshCw, Share2, Check, ArrowRight, ShieldCheck, Award, User
} from 'lucide-react';

const MALE_VIBES = [
  {
    tagline: 'CONFIDENT • CLEAN • BOLD',
    category: '💎 HIGH STREET LUXURY',
    confidence: 96,
    presence: 98,
    energy: 94,
    potential: 99,
    description: 'Crisp shoulders with strong torso presence. Tailored cuts and sharp lines bring out maximum fashion aura.',
  },
  {
    tagline: 'EFFORTLESS • MINIMAL • REFINED',
    category: '✨ QUIET LUXURY MENSWEAR',
    confidence: 94,
    presence: 96,
    energy: 91,
    potential: 98,
    description: 'Subtle elegance with balanced monochrome tone. Understated luxury that speaks volumes without trying too hard.',
  },
  {
    tagline: 'ELECTRIC • STREETWEAR • DYNAMIC',
    category: '🔥 URBAN TECH MENSWEAR',
    confidence: 98,
    presence: 95,
    energy: 99,
    potential: 97,
    description: 'Bold oversized silhouette with sharp modern techwear accents. Radiates high energy and unmatched street potential.',
  },
];

const FEMALE_VIBES = [
  {
    tagline: 'ELEGANT • TAILORED • STRIKING',
    category: '💎 HIGH FASHION COUTURE',
    confidence: 97,
    presence: 99,
    energy: 95,
    potential: 99,
    description: 'Flawless proportion flow with commanding posture presence. Structured lines create an unforgettable silhouette aura.',
  },
  {
    tagline: 'CHIC • CHOPPED • MINIMALIST',
    category: '✨ QUIET LUXURY WOMENSWEAR',
    confidence: 95,
    presence: 97,
    energy: 93,
    potential: 98,
    description: 'Harmonious monochrome layering with timeless grace. Radiates sophisticated confidence and effortless style.',
  },
  {
    tagline: 'AVANT-GARDE • HIGH-STREET • BOLD',
    category: '🔥 MODERN FASHION TECH',
    confidence: 99,
    presence: 96,
    energy: 98,
    potential: 99,
    description: 'Dynamic contemporary silhouette with sharp sculptural cuts. Unmatched fashion potential and electric presence.',
  },
];

export default function FitVibeCheckPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mandatory Profile System State (Step 1)
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [vibeResult, setVibeResult] = useState<typeof MALE_VIBES[0] | null>(null);
  const [copied, setCopied] = useState(false);

  // Handle File Upload
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!gender) return;
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      runVibeScan();
    }
  }

  // Handle Preset Sample Selection
  function handleSelectSample(index: number) {
    if (!gender) return;
    setPreviewImage('/hero_mannequin.jpg');
    runVibeScan(index);
  }

  // Run AI Vibe Scan Sequence
  function runVibeScan(sampleIdx?: number) {
    if (!gender) return;
    setIsScanning(true);
    setVibeResult(null);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);

    setTimeout(() => {
      setIsScanning(false);
      const vibesList = gender === 'female' ? FEMALE_VIBES : MALE_VIBES;
      const selected = typeof sampleIdx === 'number'
        ? vibesList[sampleIdx]
        : vibesList[Math.floor(Math.random() * vibesList.length)];
      setVibeResult(selected);
    }, 2100);
  }

  function handleShare() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 relative overflow-hidden bg-[#120E0C] text-[#F5EFE8]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#C49A6C]/6 blur-[180px] pointer-events-none" />

      {/* ── AI VIBE SCANNING OVERLAY ────────────────────────────────────────── */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#120E0C]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#C49A6C]/30 animate-ping" />
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#C49A6C] to-[#9C735D] flex items-center justify-center shadow-[0_0_40px_rgba(196,154,108,0.4)]">
                <Sparkles className="w-10 h-10 text-[#120E0C] animate-pulse" />
              </div>
            </div>

            <motion.div
              key={scanStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 max-w-md"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E1714] border border-[#C49A6C]/40 text-[#C49A6C] text-xs font-mono font-bold uppercase">
                <Activity className="w-3.5 h-3.5 animate-spin" /> FITPRINT STYLE MATRIX
              </div>

              <h2 className="font-display font-black text-2xl md:text-3xl text-[#F5EFE8] uppercase">
                {scanStep === 1 && 'Scanning style silhouette...'}
                {scanStep === 2 && 'Analyzing posture, fashion energy & aura...'}
                {scanStep === 3 && 'Calculating Signature Style & Presence Index...'}
              </h2>

              <p className="text-xs font-mono text-[#B9A99D] uppercase tracking-widest">
                "Fashion is architecture: It is a matter of proportions."
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A6C]/40 bg-[#1E1714] text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
            STYLE & PRESENCE EVALUATION
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl text-[#F5EFE8] mb-3 tracking-tight uppercase">
            FIT VIBE <span className="gradient-text">CHECK</span>
          </h1>

          <p className="text-[#B9A99D] text-base max-w-xl mx-auto leading-relaxed">
            Evaluate your signature style energy, posture aura, and fashion presence.
          </p>
        </motion.div>

        {/* ── STEP 1: MANDATORY PROFILE SYSTEM SELECTION ─────────────────── */}
        {!vibeResult && (
          <div className="glass-card rounded-3xl p-8 bg-[#2A201C] border border-[#C49A6C]/40 shadow-2xl mb-8 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="block text-xs font-mono font-bold text-[#C49A6C] uppercase tracking-wider">
                STEP 1 — SELECT PROFILE <span className="text-red-400">* REQUIRED</span>
              </label>
              {gender && (
                <span className="text-xs font-mono font-bold text-[#66B8C9] uppercase">
                  ✓ PROFILE SELECTED: {gender.toUpperCase()}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* MALE OPTION */}
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`p-5 rounded-2xl border text-center font-display font-black text-lg uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-3 ${
                  gender === 'male'
                    ? 'bg-[#C49A6C] text-[#120E0C] border-[#C49A6C] shadow-lg scale-[1.01]'
                    : 'bg-[#1E1714] text-[#F5EFE8] border-[rgba(196,154,108,0.25)] hover:border-[#C49A6C]'
                }`}
              >
                <User className="w-5 h-5" /> ♂ MALE (MENSWEAR SYSTEM)
              </button>

              {/* FEMALE OPTION */}
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`p-5 rounded-2xl border text-center font-display font-black text-lg uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-3 ${
                  gender === 'female'
                    ? 'bg-[#C49A6C] text-[#120E0C] border-[#C49A6C] shadow-lg scale-[1.01]'
                    : 'bg-[#1E1714] text-[#F5EFE8] border-[rgba(196,154,108,0.25)] hover:border-[#C49A6C]'
                }`}
              >
                <User className="w-5 h-5" /> ♀ FEMALE (WOMENSWEAR SYSTEM)
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: UPLOAD / CAMERA SCAN CARD ─────────────────────────── */}
        {!vibeResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card rounded-3xl p-8 md:p-12 bg-[#2A201C] border shadow-2xl text-center space-y-8 transition-opacity ${
              gender ? 'opacity-100 border-[#C49A6C]/40' : 'opacity-50 border-[rgba(196,154,108,0.2)] pointer-events-none'
            }`}
          >
            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={!gender}
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Dropzone Container */}
            <div
              onClick={() => gender && fileInputRef.current?.click()}
              className="p-10 rounded-3xl border-2 border-dashed border-[#C49A6C]/40 hover:border-[#C49A6C] bg-[#1E1714]/80 transition-all cursor-pointer group flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#C49A6C]/20 border border-[#C49A6C] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7 text-[#C49A6C]" />
              </div>

              <div>
                <div className="font-display font-black text-xl text-[#F5EFE8] uppercase mb-1">
                  UPLOAD OUTFIT / STYLE PHOTO
                </div>
                <p className="text-xs text-[#B9A99D]">
                  {gender ? 'Click to choose a photo or drop image here' : 'Please select Step 1 Profile above first'}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120E0C] border border-[#C49A6C]/30 text-[10px] font-mono text-[#C49A6C] uppercase">
                <Lock className="w-3 h-3" /> 100% PRIVATE • CLIENT-SIDE EVALUATION
              </div>
            </div>

            {/* Quick Preset Testing */}
            <div className="pt-4 space-y-3">
              <span className="text-xs font-mono text-[#B9A99D] uppercase block">
                OR EVALUATE WITH A SAMPLE {gender ? gender.toUpperCase() : ''} LOOK:
              </span>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  disabled={!gender}
                  onClick={() => handleSelectSample(0)}
                  className="px-4 py-2.5 rounded-xl bg-[#1E1714] border border-[rgba(196,154,108,0.25)] text-xs font-mono font-bold text-[#F5EFE8] hover:border-[#C49A6C] hover:bg-[#2A201C] transition-all cursor-pointer flex items-center gap-2"
                >
                  💎 Try Luxury Tailored Look
                </button>

                <button
                  type="button"
                  disabled={!gender}
                  onClick={() => handleSelectSample(1)}
                  className="px-4 py-2.5 rounded-xl bg-[#1E1714] border border-[rgba(196,154,108,0.25)] text-xs font-mono font-bold text-[#F5EFE8] hover:border-[#C49A6C] hover:bg-[#2A201C] transition-all cursor-pointer flex items-center gap-2"
                >
                  ✨ Try Minimal Refined Look
                </button>

                <button
                  type="button"
                  disabled={!gender}
                  onClick={() => handleSelectSample(2)}
                  className="px-4 py-2.5 rounded-xl bg-[#1E1714] border border-[rgba(196,154,108,0.25)] text-xs font-mono font-bold text-[#F5EFE8] hover:border-[#C49A6C] hover:bg-[#2A201C] transition-all cursor-pointer flex items-center gap-2"
                >
                  🔥 Try Modern Techwear Look
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STYLE & PRESENCE RESULT DISPLAY ───────────────────────────── */}
        {vibeResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 md:p-12 bg-[#2A201C] border border-[#C49A6C] shadow-[0_0_50px_rgba(196,154,108,0.25)] space-y-8 relative overflow-hidden"
          >
            {/* Glowing Accent Ring Visual */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#C49A6C]/10 blur-3xl pointer-events-none" />

            <div className="text-center space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1E1714] border border-[#C49A6C]/40 text-[#C49A6C] text-xs font-mono font-bold uppercase">
                <Gem className="w-3.5 h-3.5" /> {vibeResult.category}
              </span>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5EFE8] uppercase tracking-tight">
                {vibeResult.tagline}
              </h2>

              <p className="text-xs sm:text-sm text-[#B9A99D] max-w-lg mx-auto leading-relaxed">
                "{vibeResult.description}"
              </p>
            </div>

            {/* 4 Style Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {[
                { label: '✨ Style Confidence', score: vibeResult.confidence, desc: 'High Aura' },
                { label: '🔥 Presence Score', score: vibeResult.presence, desc: 'Strong Impact' },
                { label: '😎 Fashion Energy', score: vibeResult.energy, desc: 'Electric Vibe' },
                { label: '🕺 Outfit Potential', score: vibeResult.potential, desc: 'Infinite Potential' },
              ].map(m => (
                <div key={m.label} className="p-5 rounded-2xl bg-[#1E1714] border border-[rgba(196,154,108,0.25)] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[#F5EFE8]">{m.label}</span>
                    <span className="text-[#C49A6C]">{m.score}%</span>
                  </div>

                  <div className="h-2 w-full bg-[#120E0C] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.score}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#C49A6C] to-[#9C735D] rounded-full"
                    />
                  </div>

                  <div className="text-[10px] font-mono text-[#B9A99D] uppercase text-right">
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Signature Playful Quote */}
            <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#C49A6C]/40 text-center space-y-2 relative z-10">
              <Sparkles className="w-5 h-5 text-[#C49A6C] mx-auto" />
              <p className="font-display font-bold text-lg md:text-xl text-[#F5EFE8] uppercase">
                "Your FitPrint isn't just about finding your size. It's about owning your style."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
              <button
                type="button"
                onClick={() => setVibeResult(null)}
                className="px-6 py-4 rounded-xl border border-[rgba(196,154,108,0.3)] text-xs font-bold uppercase tracking-wider text-[#B9A99D] hover:text-[#F5EFE8] cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Evaluate Another Look
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-6 py-4 rounded-xl bg-[#1E1714] border border-[#C49A6C]/50 text-xs font-bold uppercase tracking-wider text-[#C49A6C] hover:bg-[#2A201C] cursor-pointer flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-[#C49A6C]" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Result Copied!' : 'Share Style Vibe'}
              </button>

              <Link
                href="/create"
                className="btn-primary px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl cursor-pointer flex items-center gap-2"
              >
                CREATE FITPRINT PROFILE →
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
