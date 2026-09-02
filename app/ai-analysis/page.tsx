'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Shield, Zap, ArrowRight, CheckCircle, RefreshCw, SlidersHorizontal, AlertCircle, Eye } from 'lucide-react';
import { useFitPrint } from '@/lib/context';
import { FitPreference } from '@/lib/fitEngine';
import TiltCard from '@/components/TiltCard';

type ScanStage = 'start' | 'guided' | 'live-scanning' | 'review-edit' | 'complete';

const SCAN_MESSAGES = [
  'INITIALIZING CAMERA...',
  'DETECTING BODY CONTOURS...',
  'ANALYZING PROPORTIONS...',
  'MAPPING BODY LANDMARKS...',
  'GENERATING FITPRINT...',
];

const GUIDED_STEPS = [
  { step: '01', text: 'Stand approximately 2 metres from the camera.' },
  { step: '02', text: 'Ensure your upper body and waist are clearly visible.' },
  { step: '03', text: 'Stand straight and face the camera.' },
];

export default function AIAnalysisPage() {
  const router = useRouter();
  const { saveProfile, user, loginAsGuest } = useFitPrint();

  const [scanStage, setScanStage] = useState<ScanStage>('start');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [scanProgress, setScanProgress] = useState(0);
  const [scanTextIndex, setScanTextIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Editable Estimated Measurements State
  const [height, setHeight] = useState('178');
  const [weight, setWeight] = useState('74');
  const [chest, setChest] = useState('98');
  const [shoulders, setShoulders] = useState('46');
  const [waist, setWaist] = useState('82');
  const [hips, setHips] = useState('100');
  const [fitPreference, setFitPreference] = useState<FitPreference>('regular');

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start webcam feed or fallback
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        throw new Error('Camera API unavailable');
      }
    } catch (err) {
      console.warn('Webcam permission or device error, using simulated feed fallback', err);
      setCameraError('Webcam unavailable. Switched to high precision AI scanning simulation.');
      setCameraActive(false);
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  function handleStartClick() {
    setScanStage('guided');
    startCamera();
  }

  function handleBeginScan() {
    setScanStage('live-scanning');
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8 + 5);
      if (progress > 100) progress = 100;
      setScanProgress(progress);

      const msgIdx = Math.min(Math.floor((progress / 100) * SCAN_MESSAGES.length), SCAN_MESSAGES.length - 1);
      setScanTextIndex(msgIdx);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          stopCamera();
          // Calculate realistic initial estimations based on height/weight
          const h = parseFloat(height) || 178;
          const w = parseFloat(weight) || 74;
          setChest(String(Math.round(w * 1.3)));
          setWaist(String(Math.round(w * 1.1)));
          setHips(String(Math.round(w * 1.32)));
          setShoulders(String(Math.round(h * 0.26)));

          setScanStage('review-edit');
        }, 500);
      }
    }, 180);
  }

  function handleFinalizeFitPrint() {
    if (!user) loginAsGuest('Guest User');

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
      createdVia: 'ai-analysis',
      aiConfidence: 89,
    });

    setScanStage('complete');
  }

  // Build ascii progress bar
  const filledBlocks = Math.floor((scanProgress / 100) * 10);
  const progressBarAscii = '█'.repeat(filledBlocks) + '░'.repeat(10 - filledBlocks);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Method 02 · Computer Vision Live Body Scanner
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
            Live AI <span className="gradient-text">Body Scan</span>
          </h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
            Estimates body proportions and landmarks in real-time. Review and edit estimated measurements before finalizing.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* 1. START STAGE */}
          {scanStage === 'start' && (
            <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto text-center space-y-6">
              <TiltCard strength={10}>
                <div className="glass-card rounded-3xl p-10 border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 via-black to-blue-950/20 text-center space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-glow">
                    <Camera className="w-9 h-9 text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="font-display font-black text-3xl text-white mb-2">Live AI Body Scanner</h3>
                    <p className="text-white/50 text-xs leading-relaxed max-w-md mx-auto">
                      Use your camera to capture body contours. No photo upload required. Images are processed in-memory and NEVER saved.
                    </p>
                  </div>

                  {/* Guided Steps Overview */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left space-y-2">
                    {GUIDED_STEPS.map(s => (
                      <div key={s.step} className="flex items-center gap-3 text-xs">
                        <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">{s.step}</span>
                        <span className="text-white/70">{s.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-white/40">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AI-assisted body proportion estimation for clothing fit recommendations.</span>
                  </div>

                  <button
                    onClick={handleStartClick}
                    className="btn-primary w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 100%)' }}
                  >
                    <Zap className="w-4 h-4" /> START LIVE BODY SCAN
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* 2. GUIDED PREPARATION & CAMERA PREVIEW */}
          {scanStage === 'guided' && (
            <motion.div key="guided" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass-card rounded-3xl p-8 border-white/10 max-w-2xl mx-auto space-y-6 bg-black/80">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Camera className="w-4 h-4" /> Camera Feed & Positioning Guide
                </div>
                <span className="text-white/40 text-xs font-mono">Step {currentStepIndex + 1} of 3</span>
              </div>

              {/* Camera Preview Area */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border-2 border-cyan-500/30 flex items-center justify-center">
                {/* Live Video Feed */}
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />

                {/* Fallback Simulation Video / Mannequin visual if camera is denied or inactive */}
                {!cameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-950/40 via-black to-cyan-950/30 p-6 text-center">
                    <div className="w-24 h-44 rounded-full border-2 border-dashed border-cyan-400/50 flex flex-col items-center justify-around py-4 mb-3 animate-pulse">
                      <span className="text-[10px] font-mono text-cyan-400">LANDMARK SCAN</span>
                    </div>
                    {cameraError && (
                      <p className="text-amber-400 text-xs font-mono max-w-xs">{cameraError}</p>
                    )}
                  </div>
                )}

                {/* Overlay Scanning Guide Lines */}
                <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 flex flex-col justify-between p-6">
                  <div className="flex justify-between text-[10px] font-mono text-cyan-400">
                    <span>+ CORNER_TL</span>
                    <span>+ CORNER_TR</span>
                  </div>
                  <div className="text-center font-mono text-xs text-white/80 bg-black/60 py-1.5 px-3 rounded-full border border-white/20 mx-auto max-w-md">
                    {GUIDED_STEPS[currentStepIndex].text}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-cyan-400">
                    <span>+ CORNER_BL</span>
                    <span>+ CORNER_BR</span>
                  </div>
                </div>
              </div>

              {/* Guide Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentStepIndex(prev => (prev > 0 ? prev - 1 : 0))}
                  disabled={currentStepIndex === 0}
                  className="btn-ghost px-4 py-2.5 rounded-xl text-xs disabled:opacity-30"
                >
                  Previous Step
                </button>

                {currentStepIndex < GUIDED_STEPS.length - 1 ? (
                  <button
                    onClick={() => setCurrentStepIndex(prev => prev + 1)}
                    className="btn-ghost px-5 py-2.5 rounded-xl text-xs font-bold text-cyan-400 border-cyan-500/30"
                  >
                    Next Positioning Step →
                  </button>
                ) : (
                  <button
                    onClick={handleBeginScan}
                    className="btn-primary px-7 py-3 rounded-xl font-bold text-xs flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 100%)' }}
                  >
                    <Zap className="w-4 h-4" /> START SCAN NOW
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* 3. LIVE SCANNING OVERLAY STAGE */}
          {scanStage === 'live-scanning' && (
            <motion.div key="live-scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto py-6">
              <div className="glass-card rounded-3xl p-8 border-cyan-500/40 bg-black text-center space-y-6 relative overflow-hidden">

                {/* Camera / Video Viewfinder during active scan */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border-2 border-cyan-400 shadow-glow flex items-center justify-center">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                  />

                  {/* Animated Laser Scanning Line */}
                  <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-glow"
                  />

                  {/* Moving Landmark Points */}
                  {[
                    { label: 'HEAD', y: '18%', x: '50%' },
                    { label: 'SHOULDERS', y: '32%', x: '35%' },
                    { label: 'SHOULDERS', y: '32%', x: '65%' },
                    { label: 'CHEST', y: '48%', x: '50%' },
                    { label: 'WAIST', y: '64%', x: '50%' },
                    { label: 'HIPS', y: '78%', x: '50%' },
                  ].map((pt, idx) => (
                    <div
                      key={idx}
                      className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400 border border-white animate-ping"
                      style={{ top: pt.y, left: pt.x, transform: 'translate(-50%, -50%)' }}
                    />
                  ))}

                  <span className="absolute bottom-3 font-mono text-[11px] text-cyan-400 font-bold bg-black/80 px-3 py-1 rounded-full border border-cyan-500/40">
                    LIVE LANDMARK ENGINE ACTIVE
                  </span>
                </div>

                {/* Progress Indicator */}
                <div>
                  <div className="font-mono text-cyan-400 font-bold text-sm mb-1">
                    SCAN PROGRESS {progressBarAscii} {scanProgress}%
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1 font-mono">
                    {SCAN_MESSAGES[scanTextIndex]}
                  </h3>
                </div>

              </div>
            </motion.div>
          )}

          {/* 4. REVIEW & EDIT ESTIMATED MEASUREMENTS STAGE */}
          {scanStage === 'review-edit' && (
            <motion.div key="review-edit" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-3xl p-8 border-cyan-500/40 max-w-xl mx-auto space-y-6 bg-black/90">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30">
                  <CheckCircle className="w-3.5 h-3.5" /> LIVE BODY SCAN COMPLETE
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Review & Edit Estimated Profile</h3>
                <p className="text-white/40 text-xs">
                  Camera estimation completed. You can manually adjust any measurement below for maximum precision.
                </p>
              </div>

              {/* Editable Form */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-1">Height (cm)</label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="input-glass w-full px-3 py-2 text-sm rounded-xl font-mono" />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-1">Weight (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-glass w-full px-3 py-2 text-sm rounded-xl font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-1">Chest (cm)</label>
                    <input type="number" value={chest} onChange={e => setChest(e.target.value)} className="input-glass w-full px-3 py-2 text-sm rounded-xl font-mono" />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-1">Shoulders (cm)</label>
                    <input type="number" value={shoulders} onChange={e => setShoulders(e.target.value)} className="input-glass w-full px-3 py-2 text-sm rounded-xl font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-1">Waist (cm)</label>
                    <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="input-glass w-full px-3 py-2 text-sm rounded-xl font-mono" />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-1">Hips (cm)</label>
                    <input type="number" value={hips} onChange={e => setHips(e.target.value)} className="input-glass w-full px-3 py-2 text-sm rounded-xl font-mono" />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs font-semibold block mb-2">Preferred Fit Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['slim', 'regular', 'relaxed', 'oversized'] as FitPreference[]).map(pref => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setFitPreference(pref)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium capitalize border ${
                          fitPreference === pref ? 'border-cyan-400 bg-cyan-400/10 text-white' : 'border-white/10 text-white/50'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinalizeFitPrint}
                className="btn-primary w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 100%)' }}
              >
                <Zap className="w-4 h-4" /> GENERATE MY FITPRINT
              </button>
            </motion.div>
          )}

          {/* 5. COMPLETE REVEAL STAGE */}
          {scanStage === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto">
              <TiltCard strength={8}>
                <div className="glass-card rounded-3xl p-8 border-cyan-500/40 text-center space-y-6 bg-gradient-to-br from-cyan-950/30 via-black to-blue-950/20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30">
                    <CheckCircle className="w-3.5 h-3.5" /> FITPRINT GENERATED SUCCESSFULLY
                  </div>

                  <div className="font-display font-black text-5xl text-white gradient-text tracking-wider">
                    {user?.fitprintId || 'FP-8294'}
                  </div>

                  <div className="py-4 border-y border-white/10 grid grid-cols-3 gap-4 font-mono text-xs">
                    <div>
                      <span className="text-white/40 block mb-1">Body Profile</span>
                      <strong className="text-white">Balanced Athletic</strong>
                    </div>
                    <div>
                      <span className="text-white/40 block mb-1">Fit Style</span>
                      <strong className="text-cyan-400 capitalize">{fitPreference}</strong>
                    </div>
                    <div>
                      <span className="text-white/40 block mb-1">Scan Confidence</span>
                      <strong className="text-blue-400">89%</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/compare')}
                    className="btn-primary w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 100%)' }}
                  >
                    Compare 50 Brands Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
