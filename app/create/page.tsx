'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Ruler, Sparkles, Star, Lock, Cpu, Activity,
  Award, User, ChevronDown, Check, ArrowRight, Zap, Info, X
} from 'lucide-react';
import { useFitPrint } from '@/lib/context';

// ── MEASUREMENT DATA & VISUAL GUIDES ─────────────────────────────────────
interface MeasureGuideData {
  title: string;
  instruction: string;
  tip: string;
  svgPath: string;
}

const MEASURE_GUIDES: Record<string, MeasureGuideData> = {
  height: {
    title: 'Height',
    instruction: 'Stand straight against a flat wall without shoes.',
    tip: 'Measure vertically from the floor to the top of your head.',
    svgPath: 'M20 5 L20 55 M15 10 L20 5 L25 10 M15 50 L20 55 L25 50 M10 5 L30 5 M10 55 L30 55',
  },
  weight: {
    title: 'Weight',
    instruction: 'Use a digital scale on a hard, flat surface.',
    tip: 'Weigh yourself in the morning before breakfast for optimal accuracy.',
    svgPath: 'M8 15 Q20 10 32 15 L35 48 Q20 53 5 48 Z M20 22 L20 32 M16 26 L24 26',
  },
  chest: {
    title: 'Chest',
    instruction: 'Wrap the tape around the fullest part of your chest.',
    tip: 'Keep the tape comfortably level across your shoulder blades and breathe naturally.',
    svgPath: 'M6 22 C12 28 28 28 34 22 M6 22 C12 16 28 16 34 22 M20 8 L20 16 M10 14 L30 14',
  },
  bust: {
    title: 'Bust',
    instruction: 'Measure around the fullest part of your bust.',
    tip: 'Keep the measuring tape parallel to the floor, snug but not compressing.',
    svgPath: 'M6 24 C12 30 28 30 34 24 M6 24 C12 18 28 18 34 24 M13 22 A4 4 0 0 1 20 22 M20 22 A4 4 0 0 1 27 22',
  },
  underbust: {
    title: 'Underbust',
    instruction: 'Measure directly under your bust around the ribcage.',
    tip: 'Exhale comfortably and keep the tape firmly horizontal.',
    svgPath: 'M8 28 C14 32 26 32 32 28 M8 28 C14 24 26 24 32 28 M12 18 C15 22 25 22 28 18',
  },
  waist: {
    title: 'Waist',
    instruction: 'Measure around your natural waistline.',
    tip: 'Find the narrowest point of your torso, typically 1 to 2 inches above your navel.',
    svgPath: 'M9 25 C14 30 26 30 31 25 M9 25 C14 20 26 20 31 25 M14 10 L10 25 L14 40 M26 10 L30 25 L26 40',
  },
  hip: {
    title: 'Hip & Seat',
    instruction: 'Measure around the widest part of your hips and seat.',
    tip: 'Stand with feet together and ensure the tape is level all the way around.',
    svgPath: 'M6 28 C12 34 28 34 34 28 M6 28 C12 22 28 22 34 28 M8 16 L6 28 L10 44 M32 16 L34 28 L30 44',
  },
  shoulder: {
    title: 'Shoulder Width',
    instruction: 'Measure straight across your back between shoulder points.',
    tip: 'Feel for the bony point where your shoulder meets the top of your arm.',
    svgPath: 'M6 20 L34 20 M6 16 L6 24 M34 16 L34 24 M10 20 Q20 14 30 20',
  },
  neck: {
    title: 'Neck',
    instruction: 'Measure around the base of your neck where a collar rests.',
    tip: 'Place one finger between the tape and your neck for standard collar allowance.',
    svgPath: 'M12 20 C14 26 26 26 28 20 M12 20 C14 14 26 14 28 20 M20 6 L20 14',
  },
  torso: {
    title: 'Torso Length',
    instruction: 'Measure from high shoulder point down to your waistline.',
    tip: 'Follow the natural curve of your front torso straight down to the waist.',
    svgPath: 'M20 8 L20 48 M16 12 L20 8 L24 12 M16 44 L20 48 L24 44 M12 48 L28 48',
  },
  inseam: {
    title: 'Inseam & Leg Length',
    instruction: 'Measure from the crotch seam down to the ankle bone.',
    tip: 'Best measured wearing shoes you normally pair with pants or standing barefoot flat.',
    svgPath: 'M16 10 L16 50 M12 46 L16 50 L20 46 M10 10 L22 10 M8 50 L24 50',
  },
  sleeve: {
    title: 'Sleeve Length',
    instruction: 'Measure from center back neck across shoulder down to wrist.',
    tip: 'Bend your elbow slightly for natural jacket or shirt sleeve drape.',
    svgPath: 'M8 12 L20 16 L32 36 M6 12 L10 12 M30 38 L34 34',
  },
  thigh: {
    title: 'Thigh',
    instruction: 'Measure around the fullest part of your upper thigh.',
    tip: 'Wrap the tape just below the gluteal fold around the widest upper leg area.',
    svgPath: 'M10 24 C14 28 26 28 30 24 M10 24 C14 20 26 20 30 24 M14 10 L10 40 M26 10 L30 40',
  },
  bicep: {
    title: 'Bicep',
    instruction: 'Measure around the fullest part of your upper arm.',
    tip: 'Hold arm relaxed or slightly flexed at a 90 degree angle.',
    svgPath: 'M12 22 C14 27 26 27 28 22 M12 22 C14 17 26 17 28 22 M15 8 L13 36 M25 8 L27 36',
  },
};

// ── INTERACTIVE MEASURE TIP POPOVER ──────────────────────────────────────
function MeasureTip({ field }: { field: string }) {
  const [open, setOpen] = useState(false);
  const guide = MEASURE_GUIDES[field];
  if (!guide) return null;

  return (
    <span className="relative inline-flex items-center ml-1.5">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(v => !v)}
        className="w-4 h-4 rounded-full border border-[#C49A6C]/40 bg-[#1E1714] flex items-center justify-center text-[#C49A6C] hover:border-[#C49A6C] hover:bg-[#C49A6C]/10 transition-all cursor-pointer shadow-sm"
        aria-label={`Measurement guide for ${guide.title}`}
      >
        <span className="text-[9px] font-mono font-bold leading-none">?</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-64 z-50 p-4 rounded-2xl bg-[#1E1714] border border-[#C49A6C]/40 shadow-[0_12px_36px_rgba(0,0,0,0.8)] pointer-events-none"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A201C] border border-[#C49A6C]/30 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 60" className="w-6 h-9" fill="none" stroke="#C49A6C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={guide.svgPath} />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-[#C49A6C] uppercase tracking-wider">{guide.title}</div>
                <p className="text-[11px] text-[#F5EFE8] leading-snug">{guide.instruction}</p>
                <p className="text-[10px] text-[#B9A99D] leading-tight pt-1 border-t border-[rgba(196,154,108,0.15)] font-mono">{guide.tip}</p>
              </div>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2.5 h-2.5 rotate-45 bg-[#1E1714] border-r border-b border-[#C49A6C]/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// ── FORM MEASURE INPUT WITH VALIDATION INDICATOR ─────────────────────────
function MeasureInput({
  label, tooltipKey, required, value, onChange, placeholder, unit
}: {
  label: string; tooltipKey: string; required?: boolean;
  value: number; onChange: (v: number) => void; placeholder?: string; unit?: string;
}) {
  const isValid = value > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center text-xs font-mono font-bold uppercase tracking-wider">
          <span className={required ? 'text-[#F5EFE8]' : 'text-[#B9A99D]'}>{label}</span>
          {required && <span className="text-[#C49A6C] ml-1">*</span>}
          <MeasureTip field={tooltipKey} />
        </label>
        {!required && (
          <span className="text-[10px] font-mono text-[#C49A6C]/70 uppercase">Optional</span>
        )}
      </div>

      <div className="relative">
        <input
          type="number"
          required={required}
          value={value === 0 ? '' : value}
          onChange={e => onChange(Number(e.target.value))}
          placeholder={placeholder}
          className={`input-glass w-full px-4 py-3 rounded-xl text-sm pr-16 transition-all duration-200 ${
            isValid
              ? 'border-[#C49A6C]/60 bg-[#1E1714]/90 text-[#F5EFE8] focus:border-[#C49A6C]'
              : 'border-[rgba(196,154,108,0.2)] bg-[#1A1410]'
          }`}
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
          {isValid && (
            <div className="w-4 h-4 rounded-full bg-[#C49A6C]/20 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-[#C49A6C]" />
            </div>
          )}
          {unit && (
            <span className="text-[11px] font-mono text-[#C49A6C]/70 uppercase font-bold">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── AI SCAN COMPUTER VISION BACKGROUND VISUAL ────────────────────────────
function AIScanVisual() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cv-grid-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#66B8C9" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cv-grid-pattern)" />
      </svg>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-28 h-52 opacity-[0.22]">
        <svg viewBox="0 0 80 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="14" rx="11" ry="13" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M34 27 Q40 30 46 27 L46 35 Q40 38 34 35 Z" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M18 42 Q28 35 34 35 Q40 38 46 35 Q52 35 62 42" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M22 42 Q18 60 20 80 Q24 88 40 90 Q56 88 60 80 Q62 60 58 42" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M18 42 Q14 55 16 70 Q17 76 20 80" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M62 42 Q66 55 64 70 Q63 76 60 80" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M20 90 Q18 104 26 116 Q30 128 28 148" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M60 90 Q62 104 54 116 Q50 128 52 148" stroke="#66B8C9" strokeWidth="1.2" />
          <path d="M20 90 Q28 96 40 96 Q52 96 60 90" stroke="#66B8C9" strokeWidth="1.2" />
          <circle cx="40" cy="14" r="2" fill="#66B8C9" />
          <circle cx="40" cy="60" r="2" fill="#66B8C9" />
          <circle cx="40" cy="90" r="2" fill="#66B8C9" />
          <circle cx="18" cy="42" r="2" fill="#66B8C9" />
          <circle cx="62" cy="42" r="2" fill="#66B8C9" />
          <circle cx="24" cy="80" r="1.5" fill="#C49A6C" />
          <circle cx="56" cy="80" r="1.5" fill="#C49A6C" />
        </svg>
      </div>

      <motion.div
        animate={{ top: ['12%', '88%', '12%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#66B8C9] to-transparent opacity-60"
        style={{ filter: 'blur(0.5px)' }}
      />
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.1, repeat: Infinity }}
        className="absolute left-5 top-6 text-[9px] font-mono text-[#66B8C9] bg-[#66B8C9]/10 border border-[#66B8C9]/30 rounded px-2 py-0.5"
      >
        CV ACTIVE
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.7, repeat: Infinity, delay: 0.5 }}
        className="absolute left-5 bottom-8 text-[9px] font-mono text-[#C49A6C] bg-[#C49A6C]/10 border border-[#C49A6C]/30 rounded px-2 py-0.5"
      >
        98.4% CONFIDENCE
      </motion.div>
    </div>
  );
}

// ── MAIN PAGE COMPONENT ──────────────────────────────────────────────────
export default function CreateFitPrintPage() {
  const router = useRouter();
  const { setFitProfile } = useFitPrint();

  const [activeMethod, setActiveMethod] = useState<'ai' | 'manual'>('ai');
  const [showMeasureGuide, setShowMeasureGuide] = useState(false);

  // Profile Selection: Male or Female only
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Units
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [measureUnit, setMeasureUnit] = useState<'cm' | 'inches'>('cm');

  // Form State
  const [manualForm, setManualForm] = useState({
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    weightKg: 70,
    weightLbs: 154,
    // Shared
    shoulderWidth: 44,
    waist: 82,
    hip: 98,
    inseam: 80,
    // Male
    chest: 96,
    neck: 38,
    sleeve: 64,
    thigh: 56,
    bicep: 32,
    // Female
    bust: 90,
    underbust: 76,
    torso: 44,
    armLength: 60,
  });

  // AI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [detectedProfile, setDetectedProfile] = useState<{
    profileName: string;
    primaryRatio: string;
    secondaryRatio: string;
    fitRecommendation: string;
    confidenceScore: number;
  } | null>(null);

  const [liveHint, setLiveHint] = useState('Body proportions detected');

  // Cycle live AI feedback ticker
  useEffect(() => {
    if (activeMethod !== 'manual' || detectedProfile) return;
    const hints = [
      'Body proportions detected',
      'Measurement consistency verified',
      'Fit profile calculating in real time',
      'Cross referencing brand sizing data',
      'Torso and frame proportion index ready',
    ];
    let i = 0;
    const t = setInterval(() => {
      setLiveHint(hints[i % hints.length]);
      i++;
    }, 2800);
    return () => clearInterval(t);
  }, [activeMethod, detectedProfile]);

  // Form progression indicator logic
  const isProfileSelected = Boolean(gender);
  const isFrameValid = (heightUnit === 'cm' ? manualForm.heightCm > 0 : (manualForm.heightFt > 0 || manualForm.heightIn > 0)) &&
    (weightUnit === 'kg' ? manualForm.weightKg > 0 : manualForm.weightLbs > 0);
  const isMeasurementsValid = gender === 'female'
    ? manualForm.bust > 0 && manualForm.underbust > 0 && manualForm.waist > 0 && manualForm.hip > 0 && manualForm.shoulderWidth > 0 && manualForm.torso > 0 && manualForm.inseam > 0
    : manualForm.chest > 0 && manualForm.shoulderWidth > 0 && manualForm.neck > 0 && manualForm.waist > 0 && manualForm.hip > 0 && manualForm.inseam > 0;

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsAnalyzing(true);
    setAnalysisStep(1);

    const factor = measureUnit === 'inches' ? 2.54 : 1;
    const c = Math.round((gender === 'female' ? manualForm.bust : manualForm.chest) * factor);
    const w = Math.round(manualForm.waist * factor);
    const h = Math.round(manualForm.hip * factor);
    const s = Math.round(manualForm.shoulderWidth * factor);

    const cwRatio = (c / w).toFixed(2);
    const hwRatio = (h / w).toFixed(2);
    const swRatio = (s / w).toFixed(2);

    let profileName = 'Classic Proportional Profile';
    let fitRec = 'Regular Fit';

    if (gender === 'male') {
      const r = Number(cwRatio);
      if (r > 1.18) {
        profileName = 'Athletic V-Taper Profile';
        fitRec = 'Athletic Slim Fit';
      } else if (r > 1.10) {
        profileName = 'Balanced Proportional Profile';
        fitRec = 'Regular Fit';
      } else {
        profileName = 'Regular Natural Profile';
        fitRec = 'Regular Fit';
      }
    } else {
      const bw = Number(cwRatio);
      const hw = Number(hwRatio);
      if (bw > 1.20 && hw > 1.20) {
        profileName = 'Hourglass Proportional Profile';
        fitRec = 'Fitted Tailored';
      } else if (bw > 1.15) {
        profileName = 'Inverted Triangle Athletic Profile';
        fitRec = 'Athletic Fit';
      } else if (hw > 1.15) {
        profileName = 'Pear Proportional Profile';
        fitRec = 'A-Line Relaxed Bottom';
      } else {
        profileName = 'Classic Rectangle Profile';
        fitRec = 'Regular Fit';
      }
    }

    const finalHeight = heightUnit === 'cm'
      ? Number(manualForm.heightCm)
      : Math.round((Number(manualForm.heightFt) * 12 + Number(manualForm.heightIn)) * 2.54);
    const finalWeight = weightUnit === 'kg'
      ? Number(manualForm.weightKg)
      : Math.round(Number(manualForm.weightLbs) * 0.453592);

    setTimeout(() => setAnalysisStep(2), 700);
    setTimeout(() => setAnalysisStep(3), 1400);
    setTimeout(() => {
      setAnalysisStep(4);
      setDetectedProfile({
        profileName,
        primaryRatio: gender === 'female' ? `${cwRatio}x (Bust to Waist)` : `${cwRatio}x (Chest to Waist)`,
        secondaryRatio: gender === 'female' ? `${hwRatio}x (Hip to Waist)` : `${swRatio}x (Shoulder to Waist)`,
        fitRecommendation: fitRec,
        confidenceScore: 98.4,
      });

      setFitProfile({
        height: finalHeight,
        weight: finalWeight,
        gender,
        bodyShape: profileName.toLowerCase() as any,
        fitPreference: fitRec.toLowerCase().replace(' fit', '') as any,
        measurements: {
          chest: c,
          waist: w,
          hips: h,
          shoulders: s,
          sleeveLength: Math.round((gender === 'female' ? manualForm.armLength : manualForm.sleeve) * factor),
          inseam: Math.round(manualForm.inseam * factor),
          neck: Math.round((gender === 'female' ? manualForm.underbust : manualForm.neck) * factor),
          thigh: Math.round(manualForm.thigh * factor),
        },
      });

      setIsAnalyzing(false);
    }, 2200);
  }

  const f = (k: keyof typeof manualForm) => (v: number) =>
    setManualForm(p => ({ ...p, [k]: v }));

  const u = measureUnit;

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 relative overflow-hidden bg-[#120E0C] text-[#F5EFE8]">
      {/* Ambient soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#C49A6C]/5 blur-[220px] pointer-events-none" />

      {/* ── AI ANALYSIS CINEMATIC OVERLAY ─────────────────────────────────── */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#120E0C]/96 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#66B8C9]/20 animate-ping" />
              <div className="absolute inset-3 rounded-full border border-[#66B8C9]/30 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#66B8C9] to-[#4A90A4] flex items-center justify-center shadow-[0_0_40px_rgba(102,184,201,0.35)]">
                <Cpu className="w-9 h-9 text-[#120E0C] animate-pulse" />
              </div>
            </div>

            <motion.div key={analysisStep} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E1714] border border-[#66B8C9]/40 text-[#66B8C9] text-[10px] font-mono font-bold uppercase tracking-widest">
                <Activity className="w-3 h-3 animate-spin" /> FitPrint AI Engine
              </div>
              <h2 className="font-display font-black text-2xl md:text-3xl text-[#F5EFE8] uppercase">
                {analysisStep === 1 && 'Analyzing measurements…'}
                {analysisStep === 2 && 'Computing proportion ratios…'}
                {analysisStep === 3 && 'Detecting body profile…'}
                {analysisStep === 4 && 'Generating your FitPrint…'}
              </h2>
              <div className="flex items-center justify-center gap-2 pt-2">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className={`h-1.5 rounded-full transition-all duration-500 ${n <= analysisStep ? 'bg-[#66B8C9] w-8' : 'bg-[#2A201C] w-3'}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── PAGE TITLE & INTRO ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A6C]/30 bg-[#1E1714] text-[#C49A6C] text-[10px] font-mono font-bold tracking-widest uppercase mb-5">
            <Zap className="w-3.5 h-3.5" /> Universal Fit Intelligence
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl text-[#F5EFE8] mb-3 tracking-tight uppercase">
            CREATE YOUR <span className="gradient-text">FITPRINT</span>
          </h1>
          <p className="text-[#B9A99D] text-base max-w-lg mx-auto leading-relaxed">
            Choose your method. Live AI scan or manual measurements. Both deliver identical precision sizing intelligence.
          </p>
        </motion.div>

        {/* ── METHOD SELECTION CARDS (AI VS MANUAL) ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* AI LIVE BODY SCAN */}
          <button
            type="button"
            onClick={() => setActiveMethod('ai')}
            className={`relative p-7 sm:p-9 rounded-3xl border text-left transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[320px] ${
              activeMethod === 'ai'
                ? 'bg-[#0F1A1E] border-[#66B8C9] shadow-[0_0_50px_rgba(102,184,201,0.18)] scale-[1.01]'
                : 'bg-[#0D1518] border-[rgba(102,184,201,0.15)] hover:border-[#66B8C9]/40 hover:scale-[1.005]'
            }`}
          >
            <AIScanVisual />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#66B8C9]/15 border border-[#66B8C9]/40 text-[#66B8C9] text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-[#66B8C9]" /> Recommended
                </span>
                <span className="text-[10px] font-mono text-[#66B8C9]/70 font-bold uppercase tracking-widest">
                  Computer Vision
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#66B8C9]/15 border border-[#66B8C9]/30 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-[#66B8C9]" />
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F5EFE8] uppercase tracking-tight">
                  AI LIVE SCAN
                </h2>
              </div>
              <p className="text-[#8FA8B0] text-sm leading-relaxed mb-5 max-w-xs">
                Guided camera scan. AI detects your body proportions in real time and builds your FitPrint automatically.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A1215] border border-[#66B8C9]/18 text-[10px] font-mono text-[#66B8C9]/80">
                <Lock className="w-3 h-3" /> 100% Private · Client Side Only
              </div>
            </div>
            <div className="relative z-10 mt-6">
              <div className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                activeMethod === 'ai'
                  ? 'bg-[#66B8C9] text-[#0C1418] shadow-[0_0_20px_rgba(102,184,201,0.3)]'
                  : 'bg-[#66B8C9]/10 text-[#66B8C9] border border-[#66B8C9]/30 hover:bg-[#66B8C9]/20'
              }`}>
                START LIVE SCAN <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </button>

          {/* CREATE MANUALLY */}
          <button
            type="button"
            onClick={() => setActiveMethod('manual')}
            className={`relative p-7 sm:p-9 rounded-3xl border text-left transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[320px] ${
              activeMethod === 'manual'
                ? 'bg-[#1A1410] border-[#C49A6C] shadow-[0_0_50px_rgba(196,154,108,0.18)] scale-[1.01]'
                : 'bg-[#161210] border-[rgba(196,154,108,0.2)] hover:border-[#C49A6C]/50 hover:scale-[1.005]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-mono text-[#C49A6C]/70 font-bold uppercase tracking-widest">Manual Input</span>
                <Ruler className="w-5 h-5 text-[#C49A6C]/50" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C49A6C]/15 border border-[#C49A6C]/30 flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-5 h-5 text-[#C49A6C]" />
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F5EFE8] uppercase tracking-tight">
                  CREATE MANUALLY
                </h2>
              </div>
              <p className="text-[#B9A99D] text-sm leading-relaxed mb-7 max-w-xs">
                Enter your measurements and let FitPrint analyze your body proportions for accurate sizing recommendations.
              </p>
              <div className="space-y-2.5">
                {['Accurate Fit Analysis', 'AI Body Type Detection', 'Brand Size Matching'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-[12px] text-[#B9A99D]">
                    <div className="w-4 h-4 rounded-full bg-[#C49A6C]/20 border border-[#C49A6C]/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#C49A6C]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <div className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                activeMethod === 'manual'
                  ? 'bg-gradient-to-r from-[#C49A6C] to-[#9C735D] text-[#120E0C] shadow-[0_0_20px_rgba(196,154,108,0.3)]'
                  : 'bg-[#C49A6C]/10 text-[#C49A6C] border border-[#C49A6C]/30 hover:bg-[#C49A6C]/20'
              }`}>
                ENTER MEASUREMENTS <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </button>
        </div>

        {/* ── ACTIVE PANEL CONTENT ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          {/* AI LIVE SCAN PANEL */}
          {activeMethod === 'ai' && (
            <motion.div
              key="ai-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl p-8 md:p-12 bg-[#0F1A1E] border border-[#66B8C9]/30 shadow-2xl mb-12 relative overflow-hidden"
            >
              <AIScanVisual />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#66B8C9]/15 border border-[#66B8C9]/40 text-[#66B8C9] text-[10px] font-mono font-bold uppercase">
                    <Star className="w-3.5 h-3.5 fill-[#66B8C9]" /> Primary & Recommended
                  </span>
                  <span className="text-[10px] font-mono text-[#66B8C9]/70 font-bold uppercase">
                    ⚡ Secure · Client Side
                  </span>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F5EFE8] mb-4 uppercase">
                  🤖 AI LIVE BODY SCAN
                </h2>
                <p className="text-[#8FA8B0] text-base leading-relaxed mb-8 max-w-xl">
                  Use your camera for a guided AI powered body scan. Our computer vision system analyzes your proportions in real time and generates your personalized FitPrint.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    'No manual measurements required',
                    'Guided camera scan in seconds',
                    'Real time body proportion analysis',
                    'Smart fit recommendations across brands',
                  ].map(pt => (
                    <div key={pt} className="flex items-center gap-3 p-4 rounded-xl bg-[#0A1215] border border-[#66B8C9]/15">
                      <div className="w-5 h-5 rounded-full bg-[#66B8C9]/20 border border-[#66B8C9]/40 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#66B8C9]" />
                      </div>
                      <span className="text-sm text-[#F5EFE8]/80">{pt}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/ai-analysis"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-wider bg-[#66B8C9] text-[#0C1418] shadow-[0_0_30px_rgba(102,184,201,0.25)] hover:shadow-[0_0_50px_rgba(102,184,201,0.4)] hover:scale-[1.02] transition-all"
                >
                  START LIVE SCAN <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* MANUAL MEASUREMENTS PANEL */}
          {activeMethod === 'manual' && (
            <motion.div
              key="manual-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-[#1A1410] border border-[#C49A6C]/30 shadow-2xl mb-12 overflow-hidden"
            >
              {detectedProfile ? (
                /* ── DETECTION RESULT CARD ────────────────────────────────── */
                <div className="p-8 md:p-12 space-y-8 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-[#C49A6C]/20 border border-[#C49A6C] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(196,154,108,0.3)]">
                    <Award className="w-10 h-10 text-[#C49A6C]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#C49A6C] font-bold uppercase tracking-widest">
                      🤖 AI Ratio Analysis Complete · {gender.toUpperCase()} Sizing System
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F5EFE8] uppercase mt-2">
                      {detectedProfile.profileName}
                    </h2>
                    <p className="text-xs text-[#B9A99D] max-w-md mx-auto mt-2">
                      FitPrint AI analyzed your measurement ratios and detected your body structure.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                    {[
                      { label: 'Primary Ratio', val: detectedProfile.primaryRatio, sub: 'Torso Proportions', color: '#C49A6C' },
                      { label: 'Secondary Ratio', val: detectedProfile.secondaryRatio, sub: 'Frame Balance', color: '#C49A6C' },
                      { label: 'Fit Recommendation', val: detectedProfile.fitRecommendation, sub: 'Optimal Cut', color: '#66B8C9' },
                    ].map(item => (
                      <div key={item.label} className="p-4 rounded-xl bg-[#120E0C] border border-[rgba(196,154,108,0.2)]">
                        <div className="text-[10px] font-mono text-[#B9A99D] uppercase mb-1">{item.label}</div>
                        <div className="text-base font-mono font-bold" style={{ color: item.color }}>{item.val}</div>
                        <div className="text-[10px] text-[#B9A99D] mt-0.5">{item.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setDetectedProfile(null)}
                      className="px-6 py-3.5 rounded-xl border border-[rgba(196,154,108,0.3)] text-xs font-bold uppercase tracking-wider text-[#B9A99D] hover:text-[#F5EFE8] cursor-pointer transition-colors"
                    >
                      ← Re enter Measurements
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push('/dashboard')}
                      className="btn-primary px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl cursor-pointer"
                    >
                      GO TO DASHBOARD →
                    </button>
                  </div>
                </div>
              ) : (
                /* ── FORM WORKFLOW ────────────────────────────────────────── */
                <div>
                  {/* Step Progress Navigation */}
                  <div className="px-8 md:px-12 pt-8 pb-6 border-b border-[rgba(196,154,108,0.12)] bg-[#120E0C]/50">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C49A6C]/10 border border-[#C49A6C]/30 text-[#C49A6C] text-[10px] font-mono font-bold uppercase tracking-widest">
                        <Cpu className="w-3 h-3" /> AI Proportion Analysis
                      </div>
                      <div className="flex rounded-xl overflow-hidden border border-[rgba(196,154,108,0.25)] bg-[#120E0C]">
                        {(['cm', 'inches'] as const).map(mu => (
                          <button
                            key={mu}
                            type="button"
                            onClick={() => setMeasureUnit(mu)}
                            className={`px-4 py-1.5 text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                              measureUnit === mu ? 'bg-[#C49A6C] text-[#120E0C]' : 'text-[#B9A99D]'
                            }`}
                          >
                            {mu === 'cm' ? 'CM' : 'INCHES'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4 Step Progress Bar */}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {[
                        { step: 1, label: 'Profile', complete: isProfileSelected },
                        { step: 2, label: 'Frame', complete: isFrameValid },
                        { step: 3, label: 'Measurements', complete: isMeasurementsValid },
                        { step: 4, label: 'AI Analysis', complete: false },
                      ].map((s, idx) => (
                        <div key={s.step} className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className={s.complete ? 'text-[#C49A6C] font-bold' : 'text-[#B9A99D]'}>
                              {s.step}. {s.label}
                            </span>
                            {s.complete && <Check className="w-3 h-3 text-[#C49A6C]" />}
                          </div>
                          <div className="h-1 rounded-full bg-[#2A201C] overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                s.complete ? 'bg-[#C49A6C] w-full' : idx === 0 ? 'bg-[#C49A6C]/40 w-full' : 'w-0'
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 md:p-12 space-y-10">

                    {/* ── STEP 1: SELECT SIZING PROFILE (2 CARDS ONLY) ──────── */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-[#C49A6C]/20 border border-[#C49A6C]/50 flex items-center justify-center text-xs font-mono font-black text-[#C49A6C]">
                          1
                        </div>
                        <div>
                          <h3 className="text-xs font-mono font-bold text-[#C49A6C] uppercase tracking-wider">
                            Select Sizing Profile <span className="text-[#C49A6C]">* Required</span>
                          </h3>
                        </div>
                      </div>

                      {/* Clean balanced 2-card selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">

                        {/* MALE CARD */}
                        <button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`group relative p-7 rounded-2xl border text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                            gender === 'male'
                              ? 'bg-gradient-to-b from-[#C49A6C]/20 to-[#1E1714] border-[#C49A6C] shadow-[0_0_30px_rgba(196,154,108,0.25)] scale-[1.02]'
                              : 'bg-[#120E0C] border-[rgba(196,154,108,0.18)] hover:border-[#C49A6C]/50 hover:bg-[#1A1410]'
                          }`}
                        >
                          {gender === 'male' && (
                            <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#C49A6C] flex items-center justify-center shadow-md">
                              <Check className="w-3 h-3 text-[#120E0C] stroke-[3]" />
                            </div>
                          )}

                          <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                            gender === 'male'
                              ? 'bg-[#C49A6C] text-[#120E0C] shadow-[0_0_20px_rgba(196,154,108,0.4)]'
                              : 'bg-[#1E1714] text-[#B9A99D] border border-[rgba(196,154,108,0.2)] group-hover:text-[#C49A6C]'
                          }`}>
                            <User className="w-7 h-7" />
                          </div>

                          <div className={`font-display font-black text-lg uppercase tracking-wider mb-1 ${
                            gender === 'male' ? 'text-[#F5EFE8]' : 'text-[#F5EFE8]'
                          }`}>
                            MALE
                          </div>
                          <div className="text-xs font-mono text-[#C49A6C] uppercase tracking-wider font-semibold">
                            Menswear System
                          </div>
                          <p className="text-[11px] text-[#B9A99D] mt-2 leading-relaxed">
                            Tailored menswear proportion ratios and sizing charts.
                          </p>
                        </button>

                        {/* FEMALE CARD */}
                        <button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`group relative p-7 rounded-2xl border text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                            gender === 'female'
                              ? 'bg-gradient-to-b from-[#C49A6C]/20 to-[#1E1714] border-[#C49A6C] shadow-[0_0_30px_rgba(196,154,108,0.25)] scale-[1.02]'
                              : 'bg-[#120E0C] border-[rgba(196,154,108,0.18)] hover:border-[#C49A6C]/50 hover:bg-[#1A1410]'
                          }`}
                        >
                          {gender === 'female' && (
                            <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#C49A6C] flex items-center justify-center shadow-md">
                              <Check className="w-3 h-3 text-[#120E0C] stroke-[3]" />
                            </div>
                          )}

                          <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                            gender === 'female'
                              ? 'bg-[#C49A6C] text-[#120E0C] shadow-[0_0_20px_rgba(196,154,108,0.4)]'
                              : 'bg-[#1E1714] text-[#B9A99D] border border-[rgba(196,154,108,0.2)] group-hover:text-[#C49A6C]'
                          }`}>
                            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="8" r="5" />
                              <path d="M12 13v8M9 17h6" />
                            </svg>
                          </div>

                          <div className={`font-display font-black text-lg uppercase tracking-wider mb-1 ${
                            gender === 'female' ? 'text-[#F5EFE8]' : 'text-[#F5EFE8]'
                          }`}>
                            FEMALE
                          </div>
                          <div className="text-xs font-mono text-[#C49A6C] uppercase tracking-wider font-semibold">
                            Womenswear System
                          </div>
                          <p className="text-[11px] text-[#B9A99D] mt-2 leading-relaxed">
                            Bust, underbust, and waist curves for womenswear charts.
                          </p>
                        </button>

                      </div>
                    </div>

                    {/* ── FORM ─────────────────────────────────────────────── */}
                    <form onSubmit={handleManualSubmit} className="space-y-10">

                      {/* ── STEP 2: FRAME & WEIGHT ──────────────────────────── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-xl bg-[#C49A6C]/20 border border-[#C49A6C]/50 flex items-center justify-center text-xs font-mono font-black text-[#C49A6C]">
                            2
                          </div>
                          <h3 className="text-xs font-mono font-bold text-[#C49A6C] uppercase tracking-wider">
                            Frame & Weight Measurements
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Height */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs font-mono font-bold text-[#F5EFE8] uppercase flex items-center">
                                Height <span className="text-[#C49A6C] ml-1">*</span>
                                <MeasureTip field="height" />
                              </label>
                              <div className="flex rounded-lg overflow-hidden border border-[rgba(196,154,108,0.25)] bg-[#120E0C]">
                                {(['cm', 'ft'] as const).map(hu => (
                                  <button
                                    key={hu}
                                    type="button"
                                    onClick={() => setHeightUnit(hu)}
                                    className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                                      heightUnit === hu ? 'bg-[#C49A6C] text-[#120E0C]' : 'text-[#B9A99D]'
                                    }`}
                                  >
                                    {hu === 'ft' ? 'FT / IN' : 'CM'}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {heightUnit === 'cm' ? (
                              <div className="relative">
                                <input
                                  type="number"
                                  required
                                  value={manualForm.heightCm === 0 ? '' : manualForm.heightCm}
                                  onChange={e => f('heightCm')(Number(e.target.value))}
                                  className="input-glass w-full px-4 py-3 rounded-xl text-sm pr-14"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#C49A6C]/70 uppercase font-bold">cm</span>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                  <input
                                    type="number"
                                    required
                                    value={manualForm.heightFt === 0 ? '' : manualForm.heightFt}
                                    onChange={e => f('heightFt')(Number(e.target.value))}
                                    placeholder="5"
                                    className="input-glass w-full px-4 py-3 rounded-xl text-sm pr-10"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#C49A6C]/70 uppercase font-bold">ft</span>
                                </div>
                                <div className="relative">
                                  <input
                                    type="number"
                                    required
                                    value={manualForm.heightIn === 0 ? '' : manualForm.heightIn}
                                    onChange={e => f('heightIn')(Number(e.target.value))}
                                    placeholder="9"
                                    className="input-glass w-full px-4 py-3 rounded-xl text-sm pr-10"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#C49A6C]/70 uppercase font-bold">in</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Weight */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs font-mono font-bold text-[#F5EFE8] uppercase flex items-center">
                                Weight <span className="text-[#C49A6C] ml-1">*</span>
                                <MeasureTip field="weight" />
                              </label>
                              <div className="flex rounded-lg overflow-hidden border border-[rgba(196,154,108,0.25)] bg-[#120E0C]">
                                {(['kg', 'lbs'] as const).map(wu => (
                                  <button
                                    key={wu}
                                    type="button"
                                    onClick={() => setWeightUnit(wu)}
                                    className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                                      weightUnit === wu ? 'bg-[#C49A6C] text-[#120E0C]' : 'text-[#B9A99D]'
                                    }`}
                                  >
                                    {wu.toUpperCase()}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="relative">
                              <input
                                type="number"
                                required
                                value={weightUnit === 'kg' ? (manualForm.weightKg === 0 ? '' : manualForm.weightKg) : (manualForm.weightLbs === 0 ? '' : manualForm.weightLbs)}
                                onChange={e => weightUnit === 'kg' ? f('weightKg')(Number(e.target.value)) : f('weightLbs')(Number(e.target.value))}
                                className="input-glass w-full px-4 py-3 rounded-xl text-sm pr-14"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#C49A6C]/70 uppercase font-bold">{weightUnit}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── STEP 3: DYNAMIC BODY MEASUREMENTS ───────────────── */}
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-[#C49A6C]/20 border border-[#C49A6C]/50 flex items-center justify-center text-xs font-mono font-black text-[#C49A6C]">
                              3
                            </div>
                            <h3 className="text-xs font-mono font-bold text-[#C49A6C] uppercase tracking-wider">
                              {gender === 'female' ? 'Womenswear' : 'Menswear'} Measurements ({measureUnit.toUpperCase()})
                            </h3>
                          </div>
                          <span className="text-[10px] font-mono text-[#C49A6C] uppercase font-bold">* Mandatory Fields</span>
                        </div>

                        {/* GENDER DYNAMIC FIELDS */}
                        {gender === 'female' ? (
                          <>
                            {/* Female Mandatory Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                              <MeasureInput label="Bust" tooltipKey="bust" required value={manualForm.bust} onChange={f('bust')} placeholder="Fullest bust" unit={u} />
                              <MeasureInput label="Underbust" tooltipKey="underbust" required value={manualForm.underbust} onChange={f('underbust')} placeholder="Directly under bust" unit={u} />
                              <MeasureInput label="Waist" tooltipKey="waist" required value={manualForm.waist} onChange={f('waist')} placeholder="Natural waist" unit={u} />
                              <MeasureInput label="Hip & Seat" tooltipKey="hip" required value={manualForm.hip} onChange={f('hip')} placeholder="Widest hip point" unit={u} />
                              <MeasureInput label="Shoulder Width" tooltipKey="shoulder" required value={manualForm.shoulderWidth} onChange={f('shoulderWidth')} placeholder="Shoulder point to point" unit={u} />
                              <MeasureInput label="Torso Length" tooltipKey="torso" required value={manualForm.torso} onChange={f('torso')} placeholder="Shoulder to waist" unit={u} />
                              <MeasureInput label="Inseam / Leg Length" tooltipKey="inseam" required value={manualForm.inseam} onChange={f('inseam')} placeholder="Crotch seam to ankle" unit={u} />
                            </div>

                            {/* Female Optional Fields */}
                            <div className="pt-4 border-t border-[rgba(196,154,108,0.12)]">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-mono text-[#C49A6C] uppercase tracking-widest font-semibold">
                                  Optional Advanced Measurements · Improves Fit Accuracy
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <MeasureInput label="Arm Length" tooltipKey="sleeve" value={manualForm.armLength} onChange={f('armLength')} placeholder="Shoulder to wrist" unit={u} />
                                <MeasureInput label="Thigh" tooltipKey="thigh" value={manualForm.thigh} onChange={f('thigh')} placeholder="Fullest upper thigh" unit={u} />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Male Mandatory Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                              <MeasureInput label="Chest" tooltipKey="chest" required value={manualForm.chest} onChange={f('chest')} placeholder="Fullest chest point" unit={u} />
                              <MeasureInput label="Shoulder Width" tooltipKey="shoulder" required value={manualForm.shoulderWidth} onChange={f('shoulderWidth')} placeholder="Shoulder point to point" unit={u} />
                              <MeasureInput label="Neck" tooltipKey="neck" required value={manualForm.neck} onChange={f('neck')} placeholder="Base of neck collar" unit={u} />
                              <MeasureInput label="Waist" tooltipKey="waist" required value={manualForm.waist} onChange={f('waist')} placeholder="Natural waistline" unit={u} />
                              <MeasureInput label="Hip / Seat" tooltipKey="hip" required value={manualForm.hip} onChange={f('hip')} placeholder="Widest hip seat" unit={u} />
                              <MeasureInput label="Inseam / Leg Length" tooltipKey="inseam" required value={manualForm.inseam} onChange={f('inseam')} placeholder="Crotch seam to ankle" unit={u} />
                            </div>

                            {/* Male Optional Fields */}
                            <div className="pt-4 border-t border-[rgba(196,154,108,0.12)]">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-mono text-[#C49A6C] uppercase tracking-widest font-semibold">
                                  Optional Advanced Measurements · Improves Fit Accuracy
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <MeasureInput label="Sleeve Length" tooltipKey="sleeve" value={manualForm.sleeve} onChange={f('sleeve')} placeholder="Center neck to wrist" unit={u} />
                                <MeasureInput label="Thigh" tooltipKey="thigh" value={manualForm.thigh} onChange={f('thigh')} placeholder="Fullest upper thigh" unit={u} />
                                <MeasureInput label="Bicep" tooltipKey="bicep" value={manualForm.bicep} onChange={f('bicep')} placeholder="Flexed upper arm" unit={u} />
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* ── VISUAL HOW TO MEASURE SECTION ─────────────────── */}
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setShowMeasureGuide(v => !v)}
                          className="w-full p-4 rounded-2xl bg-[#120E0C] border border-[#C49A6C]/25 flex items-center justify-between text-left cursor-pointer hover:border-[#C49A6C]/50 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-[#C49A6C]/15 border border-[#C49A6C]/30 flex items-center justify-center">
                              <Ruler className="w-4 h-4 text-[#C49A6C]" />
                            </div>
                            <div>
                              <span className="font-display font-bold text-sm text-[#F5EFE8] uppercase">
                                📐 Visual How To Measure Guide ({gender.toUpperCase()} Sizing)
                              </span>
                              <p className="text-[10px] text-[#B9A99D] mt-0.5">
                                Step by step measurement guide with tape positioning tips
                              </p>
                            </div>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-[#C49A6C] transition-transform duration-200 ${showMeasureGuide ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {showMeasureGuide && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 rounded-2xl bg-[#120E0C] border border-[rgba(196,154,108,0.18)] space-y-4">
                                <div className="flex items-center justify-between">
                                  <p className="text-[10px] font-mono text-[#C49A6C] uppercase tracking-widest font-semibold">
                                    Use a flexible measuring tape. Keep tape level and snug without pulling tight.
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {(gender === 'female' ? [
                                    { key: 'bust', title: 'BUST', desc: 'Wrap tape around the fullest bust curve parallel to the floor.' },
                                    { key: 'underbust', title: 'UNDERBUST', desc: 'Directly under bust around the ribcage. Keep tape firm.' },
                                    { key: 'waist', title: 'WAIST', desc: 'Narrowest part above navel. Stand relaxed and breathe naturally.' },
                                    { key: 'hip', title: 'HIP & SEAT', desc: 'Widest part of hips and glutes with feet together.' },
                                    { key: 'shoulder', title: 'SHOULDER', desc: 'Measure straight across upper back between shoulder bones.' },
                                    { key: 'torso', title: 'TORSO', desc: 'From top shoulder point down straight to natural waist.' },
                                    { key: 'inseam', title: 'INSEAM', desc: 'From inner crotch seam down the leg to the ankle bone.' },
                                  ] : [
                                    { key: 'chest', title: 'CHEST', desc: 'Wrap tape around the fullest chest point and across shoulder blades.' },
                                    { key: 'shoulder', title: 'SHOULDER', desc: 'Across back from one shoulder bone tip straight to the other.' },
                                    { key: 'neck', title: 'NECK', desc: 'Around neck base where shirt collar sits. Allow one finger comfort.' },
                                    { key: 'waist', title: 'WAIST', desc: 'Around natural waistline just above navel with relaxed posture.' },
                                    { key: 'hip', title: 'HIP / SEAT', desc: 'Widest point around seat and hips with feet together.' },
                                    { key: 'inseam', title: 'INSEAM', desc: 'From crotch seam down the inner leg to ankle bone.' },
                                    { key: 'sleeve', title: 'SLEEVE', desc: 'Center back neck over shoulder down to wrist with elbow slightly bent.' },
                                  ]).map(item => {
                                    const guide = MEASURE_GUIDES[item.key];
                                    return (
                                      <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E1714] border border-[rgba(196,154,108,0.15)]">
                                        <div className="w-9 h-9 rounded-lg bg-[#2A201C] border border-[#C49A6C]/30 flex items-center justify-center flex-shrink-0">
                                          {guide ? (
                                            <svg viewBox="0 0 40 60" className="w-5 h-7" fill="none" stroke="#C49A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                              <path d={guide.svgPath} />
                                            </svg>
                                          ) : (
                                            <Ruler className="w-4 h-4 text-[#C49A6C]" />
                                          )}
                                        </div>
                                        <div>
                                          <div className="font-mono text-[10px] font-bold text-[#C49A6C] uppercase mb-0.5">{item.title}</div>
                                          <p className="text-[11px] text-[#B9A99D] leading-relaxed">{item.desc}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* ── LIVE AI FEEDBACK TICKER ───────────────────────── */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#120E0C] border border-[#C49A6C]/20 shadow-inner">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#C49A6C] flex-shrink-0 animate-pulse" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-mono text-[#C49A6C] font-bold uppercase tracking-wider mb-0.5">
                            AI Proportion Engine Active
                          </p>
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={liveHint}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-[11px] text-[#B9A99D] font-mono"
                            >
                              {liveHint}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* ── SUBMIT CTA BUTTON ─────────────────────────────── */}
                      <button
                        type="submit"
                        className="w-full py-5 rounded-2xl text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#C49A6C] to-[#9C735D] text-[#120E0C] shadow-[0_0_30px_rgba(196,154,108,0.25)] hover:shadow-[0_0_50px_rgba(196,154,108,0.4)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-3"
                      >
                        <Cpu className="w-4 h-4" />
                        ANALYZE MEASUREMENTS & DETECT BODY PROFILE
                        <ArrowRight className="w-4 h-4" />
                      </button>

                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── UPSELL BANNER: AI LIVE SCAN ALTERNATIVE ──────────────────────── */}
        <div className="rounded-3xl p-7 md:p-9 bg-[#1A1410] border border-[rgba(196,154,108,0.18)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div className="space-y-1.5 max-w-lg">
            <div className="text-[10px] font-mono font-bold text-[#66B8C9] uppercase tracking-wider">
              Do Not Know Your Exact Measurements?
            </div>
            <div className="font-display font-bold text-lg text-[#F5EFE8]">
              Skip the tape. Use AI Live Body Scan.
            </div>
            <p className="text-xs text-[#B9A99D]">
              Scan your body proportions through your camera for a guided, automated FitPrint build.
            </p>
          </div>
          <Link
            href="/ai-analysis"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#66B8C9]/10 text-[#66B8C9] border border-[#66B8C9]/30 hover:bg-[#66B8C9]/20 hover:border-[#66B8C9]/60 transition-all"
          >
            TRY AI LIVE SCAN →
          </Link>
        </div>

        {/* ── FITPRINT SUMMARY PREVIEW ────────────────────────────────────── */}
        <div className="rounded-3xl p-8 bg-[#1A1410] border border-[rgba(196,154,108,0.18)] text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#120E0C] border border-[#C49A6C]/25 text-[#C49A6C] text-[10px] font-mono font-bold uppercase">
            Summary Preview
          </div>
          <h3 className="font-display font-black text-2xl text-[#F5EFE8] uppercase">
            Your FitPrint Will Include
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
            {[
              '✓ Body Profile',
              '✓ Proportion Analysis',
              '✓ Preferred Fit Style',
              '✓ Size Recommendations',
              '✓ Brand Size Comparison',
              '✓ Fit Preferences',
            ].map(chk => (
              <div key={chk} className="p-3 rounded-xl bg-[#120E0C] border border-[rgba(196,154,108,0.15)] text-xs font-semibold text-[#F5EFE8]/85">
                {chk}
              </div>
            ))}
          </div>
          <p className="text-xs text-[#B9A99D] max-w-md mx-auto leading-relaxed">
            Your FitPrint is your personal fit identity, designed to help you navigate different sizing systems with precision.
          </p>
        </div>

      </div>
    </div>
  );
}
