'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, Ruler, Heart, CheckCircle, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { useFitPrint } from '@/lib/context';
import { FitPreference, UserMeasurements } from '@/lib/fitEngine';
import TiltCard from '@/components/TiltCard';

type FormStep = 1 | 2 | 3 | 4;

const fitPreferences: { id: FitPreference; label: string; desc: string; emoji: string }[] = [
  { id: 'slim', label: 'Slim Fit', desc: 'Close to body, tailored silhouette', emoji: '🔷' },
  { id: 'regular', label: 'Regular Fit', desc: 'Classic comfortable cut', emoji: '🟦' },
  { id: 'relaxed', label: 'Relaxed Fit', desc: 'Slightly loose, easy feel', emoji: '🟪' },
  { id: 'oversized', label: 'Oversized', desc: 'Intentionally large streetwear look', emoji: '⬛' },
];

const bodyParts: { id: keyof UserMeasurements; label: string; hint: string; positionY: string }[] = [
  { id: 'shoulders', label: 'Shoulders', hint: 'Across top, shoulder tip to shoulder tip (cm)', positionY: 'top-[22%]' },
  { id: 'chest', label: 'Chest', hint: 'Fullest part of chest (cm)', positionY: 'top-[36%]' },
  { id: 'waist', label: 'Waist', hint: 'Narrowest part of torso (cm)', positionY: 'top-[54%]' },
  { id: 'hips', label: 'Hips', hint: 'Fullest part of hips (cm)', positionY: 'top-[70%]' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, loginAsGuest, saveProfile } = useFitPrint();

  const [step, setStep] = useState<FormStep>(1);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Analyzing measurements...');
  const [activePart, setActivePart] = useState<keyof UserMeasurements>('chest');

  // Form State with sensible defaults for fast demo
  const [name, setName] = useState(user?.name || '');
  const [height, setHeight] = useState('178');
  const [weight, setWeight] = useState('74');
  const [chest, setChest] = useState('98');
  const [waist, setWaist] = useState('82');
  const [hips, setHips] = useState('100');
  const [shoulders, setShoulders] = useState('46');
  const [fitPreference, setFitPreference] = useState<FitPreference>('regular');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateStep1() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2() {
    const errs: Record<string, string> = {};
    const c = parseFloat(chest);
    const w = parseFloat(waist);
    const h = parseFloat(hips);
    const s = parseFloat(shoulders);

    if (isNaN(c) || c < 60 || c > 180) errs.chest = 'Enter chest between 60–180 cm';
    if (isNaN(w) || w < 50 || w > 180) errs.waist = 'Enter waist between 50–180 cm';
    if (isNaN(h) || h < 60 || h > 180) errs.hips = 'Enter hips between 60–180 cm';
    if (isNaN(s) || s < 30 || s > 80) errs.shoulders = 'Enter shoulders between 30–80 cm';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleGenerate() {
    if (!validateStep2()) {
      setStep(2);
      return;
    }

    setLoading(true);
    let progress = 0;
    const messages = [
      'Initializing body matrix...',
      'Mapping chest & shoulder proportions...',
      'Cross-referencing 50+ brand size charts...',
      'Synthesizing fit compatibility index...',
      'Generating universal Fit Identity...',
      'FitPrint Identity Ready! ✨',
    ];

    const interval = setInterval(() => {
      progress += 16;
      setLoadingProgress(Math.min(100, progress));
      const msgIdx = Math.min(Math.floor((progress / 100) * messages.length), messages.length - 1);
      setLoadingText(messages[msgIdx]);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (!user) loginAsGuest(name || 'Vansh');

          saveProfile({
            measurements: {
              chest: parseFloat(chest) || 98,
              waist: parseFloat(waist) || 82,
              hips: parseFloat(hips) || 100,
              shoulders: parseFloat(shoulders) || 46,
              height: parseFloat(height) || 178,
              weight: parseFloat(weight) || 74,
            },
            fitPreference,
            bodyProfile: 'Balanced Athletic',
            createdVia: 'manual',
          });

          setLoading(false);
          setStep(4); // Reveal card step
        }, 300);
      }
    }, 160);
  }

  const stepsHeader = [
    { num: 1, label: '01 / YOU', icon: User },
    { num: 2, label: '02 / MEASURE', icon: Ruler },
    { num: 3, label: '03 / PREFERENCE', icon: Heart },
    { num: 4, label: '04 / FITPRINT', icon: Sparkles },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A] text-white">
        <div className="text-center max-w-sm mx-auto">
          <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full rounded-full border-2 border-[#0047FF]/20 border-t-[#0047FF] absolute inset-0"
            />
            <Zap className="w-12 h-12 text-[#0047FF] animate-pulse" />
          </div>
          <h2 className="font-display font-black text-3xl text-white mb-2 tracking-tight">GENERATING FITPRINT</h2>
          <p className="text-white/50 text-xs mb-6 font-mono tracking-wider uppercase">{loadingText}</p>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
            <div className="h-full bg-gradient-to-r from-[#0047FF] to-[#6C63FF] transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
          </div>
          <span className="text-white/40 text-xs font-mono">{loadingProgress}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-bold uppercase mb-4">
            Method 01 · Smart Fit Onboarding
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
            Build Your <span className="gradient-text">Fit Profile</span>
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Provide body measurements for precision brand-specific size matching across 50+ brands.
          </p>
        </motion.div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-10 overflow-x-auto py-2">
          {stepsHeader.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 whitespace-nowrap"
                  style={
                    isActive
                      ? { background: 'rgba(0,71,255,0.25)', border: '1px solid #0047FF', color: '#FFF' }
                      : isDone
                      ? { background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{s.label}</span>
                </div>
                {i < stepsHeader.length - 1 && <div className="w-4 h-[1px] bg-white/10 hidden sm:block" />}
              </div>
            );
          })}
        </div>

        {/* STEP 4: REVEAL DIGITAL CARD */}
        {step === 4 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center">
            <TiltCard strength={12}>
              <div className="glass-card rounded-3xl p-8 border-blue-500/40 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span className="font-display font-bold text-white text-base">FitPrint Identity</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">VERIFIED</span>
                </div>

                <div className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">Your FitPrint ID</div>
                <div className="font-display font-black text-5xl text-white mb-6 tracking-wider gradient-text">
                  {user?.fitprintId || 'FP-8294'}
                </div>

                <div className="bg-white/5 rounded-2xl p-4 mb-6 space-y-2 text-left text-xs font-mono border border-white/10">
                  <div className="flex justify-between"><span className="text-white/40">Holder:</span><span className="text-white font-semibold">{name || 'Vansh'}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Chest:</span><span className="text-white font-semibold">{chest} cm</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Shoulders:</span><span className="text-white font-semibold">{shoulders} cm</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Waist:</span><span className="text-white font-semibold">{waist} cm</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Fit Style:</span><span className="text-blue-400 font-semibold capitalize">{fitPreference}</span></div>
                </div>

                <button
                  onClick={() => router.push('/compare')}
                  className="btn-primary w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #0047FF, #6C63FF)' }}
                >
                  Compare 50+ Brands Live <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </TiltCard>
          </motion.div>
        ) : (
          /* FORM CARDS */
          <div className="glass-card rounded-3xl border-white/10 p-8 md:p-10 shadow-2xl">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-white mb-1">01 / Basic Information</h2>
                  <p className="text-white/40 text-sm">Tell us your name so we can initialize your Fit Identity</p>
                </div>

                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vansh"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors({}); }}
                    className="input-glass w-full px-4 py-3.5 rounded-xl text-base"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                      className="input-glass w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={e => setWeight(e.target.value)}
                      className="input-glass w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: MEASUREMENTS + INTERACTIVE BLUEPRINT */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-white mb-1">02 / Body Measurements</h2>
                    <p className="text-white/40 text-xs">Click any zone or enter numbers below (cm)</p>
                  </div>

                  <div className="space-y-3">
                    {bodyParts.map(part => (
                      <div
                        key={part.id}
                        onClick={() => setActivePart(part.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          activePart === part.id
                            ? 'bg-[#0047FF]/15 border-[#0047FF] text-white shadow-glow'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-white">{part.label}</span>
                          <span className="text-[10px] text-white/40 font-mono">cm</span>
                        </div>
                        <input
                          type="number"
                          value={
                            part.id === 'chest' ? chest :
                            part.id === 'waist' ? waist :
                            part.id === 'hips' ? hips : shoulders
                          }
                          onChange={e => {
                            const val = e.target.value;
                            if (part.id === 'chest') setChest(val);
                            if (part.id === 'waist') setWaist(val);
                            if (part.id === 'hips') setHips(val);
                            if (part.id === 'shoulders') setShoulders(val);
                          }}
                          className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white w-full outline-none focus:border-[#0047FF]"
                        />
                        {errors[part.id] && <p className="text-red-400 text-[10px] mt-1">{errors[part.id]}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Body Silhouette Blueprint */}
                <div className="relative h-[360px] rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center p-6 overflow-hidden">
                  <div className="text-center">
                    <div className="w-28 h-56 mx-auto rounded-full border-2 border-dashed border-blue-500/30 flex flex-col items-center justify-around py-4 relative">
                      {/* Body scan indicator line */}
                      <div className="absolute left-0 right-0 h-0.5 bg-blue-400 animate-pulse shadow-glow"
                        style={{
                          top: activePart === 'shoulders' ? '20%' : activePart === 'chest' ? '38%' : activePart === 'waist' ? '56%' : '74%'
                        }} />
                      <div className={`text-xs font-mono font-bold transition-colors ${activePart === 'shoulders' ? 'text-blue-400 font-extrabold' : 'text-white/30'}`}>SHOULDERS: {shoulders}cm</div>
                      <div className={`text-xs font-mono font-bold transition-colors ${activePart === 'chest' ? 'text-blue-400 font-extrabold' : 'text-white/30'}`}>CHEST: {chest}cm</div>
                      <div className={`text-xs font-mono font-bold transition-colors ${activePart === 'waist' ? 'text-blue-400 font-extrabold' : 'text-white/30'}`}>WAIST: {waist}cm</div>
                      <div className={`text-xs font-mono font-bold transition-colors ${activePart === 'hips' ? 'text-blue-400 font-extrabold' : 'text-white/30'}`}>HIPS: {hips}cm</div>
                    </div>
                    <div className="text-[11px] text-blue-400 font-mono mt-3">
                      Selected: <strong className="uppercase">{activePart}</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-white mb-1">03 / Fit Preference</h2>
                  <p className="text-white/40 text-sm">How do you prefer your clothes to fit?</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {fitPreferences.map(pref => (
                    <button
                      key={pref.id}
                      onClick={() => setFitPreference(pref.id)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        fitPreference === pref.id
                          ? 'border-[#0047FF] bg-[#0047FF]/15 text-white shadow-glow'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{pref.emoji}</div>
                      <div className="font-bold text-white text-sm mb-0.5">{pref.label}</div>
                      <div className="text-white/40 text-xs">{pref.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Form Nav Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
              <button
                onClick={() => setStep(s => Math.max(1, s - 1) as FormStep)}
                disabled={step === 1}
                className="btn-ghost px-5 py-2.5 rounded-xl text-xs font-semibold disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
              </button>

              {step < 3 ? (
                <button
                  onClick={() => {
                    if (step === 1 && validateStep1()) setStep(2);
                    else if (step === 2 && validateStep2()) setStep(3);
                  }}
                  className="btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1"
                  style={{ background: '#0047FF' }}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  className="btn-primary px-7 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #0047FF, #6C63FF)' }}
                >
                  <Zap className="w-4 h-4" /> Generate FitPrint ID
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
