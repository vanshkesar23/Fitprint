'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, RefreshCw } from 'lucide-react';

const feedbackOptions = [
  { id: 'perfect', label: 'Perfect Fit', emoji: '😊', color: '#00D4FF', desc: 'Fits exactly as expected' },
  { id: 'slightly-tight', label: 'Slightly Tight', emoji: '😐', color: '#FFD700', desc: 'A bit snug in some areas' },
  { id: 'slightly-loose', label: 'Slightly Loose', emoji: '😐', color: '#FFD700', desc: 'A bit roomy in some areas' },
  { id: 'too-small', label: 'Too Small', emoji: '❌', color: '#FF2D78', desc: 'Noticeably small overall' },
  { id: 'too-large', label: 'Too Large', emoji: '❌', color: '#FF2D78', desc: 'Noticeably large overall' },
];

const learningMessages = [
  'Processing your feedback...',
  'Updating fit model...',
  'Recalibrating brand mapping...',
  'Improving accuracy for future picks...',
  'Learning complete ✨',
];

export default function FeedbackPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [learning, setLearning] = useState(false);
  const [learningStep, setLearningStep] = useState(0);
  const [done, setDone] = useState(false);

  function handleSubmit() {
    if (!selected) return;
    setSubmitted(true);
    setLearning(true);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLearningStep(step);
      if (step >= learningMessages.length - 1) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
      }
    }, 700);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          {/* Success visual */}
          <motion.div
            className="w-28 h-28 rounded-full mx-auto mb-8 flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(0,212,255,0.1))', border: '2px solid rgba(108,99,255,0.4)' }}
            animate={{ boxShadow: ['0 0 20px rgba(108,99,255,0.3)', '0 0 50px rgba(108,99,255,0.6)', '0 0 20px rgba(108,99,255,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-5xl">🧠</span>
          </motion.div>

          <h2 className="font-display font-black text-3xl text-white mb-3">
            FitPrint <span className="gradient-text">Learned!</span>
          </h2>
          <p className="text-white/50 text-base mb-2">Your feedback has been saved.</p>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Your future recommendations will become more accurate. FitPrint continuously learns from every purchase you make.
          </p>

          {/* Accuracy card */}
          <div className="glass-card rounded-2xl p-6 mb-8" style={{ border: '1px solid rgba(0,212,255,0.2)' }}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-white/40 text-xs mb-1">Previous Accuracy</div>
                <div className="font-display font-black text-2xl text-white/60">92%</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-1">Updated Accuracy</div>
                <div className="font-display font-black text-2xl text-accent-cyan">94%</div>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#6C63FF,#00D4FF)' }}
                initial={{ width: '92%' }}
                animate={{ width: '94%' }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => router.push('/shop')} className="btn-primary flex-1 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4" /> Keep Shopping
            </button>
            <button onClick={() => router.push('/dashboard')} className="btn-ghost flex-1 py-3.5 rounded-2xl font-medium">
              Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (learning) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm mx-auto">
          {/* Neural network animation */}
          <div className="relative w-40 h-40 mx-auto mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border-2 border-dashed border-accent-cyan/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,rgba(108,99,255,0.3),rgba(0,212,255,0.2))', border: '1px solid rgba(108,99,255,0.5)' }}
              >
                <RefreshCw className="w-7 h-7 text-primary-300" />
              </motion.div>
            </div>
            {/* Orbiting dots */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#6C63FF' : '#00D4FF',
                  top: '50%', left: '50%',
                  transform: `rotate(${angle}deg) translateX(60px) translateY(-50%)`,
                  transformOrigin: '0 0',
                }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>

          <h2 className="font-display font-bold text-3xl text-white mb-3">
            FitPrint is <span className="gradient-text">Learning</span>
          </h2>
          <p className="text-primary-300 font-mono text-sm mb-8 min-h-[20px]">
            {learningMessages[Math.min(learningStep, learningMessages.length - 1)]}
          </p>

          <div className="space-y-2">
            {learningMessages.slice(0, -1).map((msg, i) => (
              <motion.div
                key={msg}
                initial={{ opacity: 0, x: -20 }}
                animate={learningStep > i ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-3 text-sm text-left"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${learningStep > i ? 'bg-accent-cyan/20' : 'bg-white/5'}`}>
                  {learningStep > i ? <span className="text-accent-cyan text-[10px]">✓</span> : <span className="text-white/20 text-[10px]">○</span>}
                </div>
                <span className={learningStep > i ? 'text-white/70' : 'text-white/20'}>{msg}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary-500/6 blur-[120px] pointer-events-none" />

      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)' }}>
            <Zap className="w-7 h-7 text-primary-400" />
          </div>
          <h1 className="font-display font-black text-4xl text-white mb-3">
            How did it <span className="gradient-text">fit?</span>
          </h1>
          <p className="text-white/40 text-sm">
            Your feedback trains FitPrint to improve future recommendations
          </p>
        </motion.div>

        <div className="space-y-3 mb-8">
          {feedbackOptions.map((opt, i) => (
            <motion.button
              key={opt.id}
              id={`feedback-${opt.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(opt.id)}
              className="w-full p-4 rounded-2xl text-left transition-all duration-200 flex items-center gap-4"
              style={
                selected === opt.id
                  ? { background: `${opt.color}15`, border: `1px solid ${opt.color}50` }
                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }
              }
            >
              <span className="text-3xl">{opt.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">{opt.label}</div>
                <div className="text-white/40 text-xs mt-0.5">{opt.desc}</div>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={selected === opt.id
                  ? { borderColor: opt.color, background: opt.color }
                  : { borderColor: 'rgba(255,255,255,0.2)' }
                }
              >
                {selected === opt.id && <span className="text-[10px] text-white font-bold">✓</span>}
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleSubmit}
          disabled={!selected}
          id="submit-feedback-btn"
          className="btn-primary w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Submit Feedback
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-center text-white/25 text-xs mt-4">
          This helps FitPrint learn your unique fit preferences
        </p>
      </div>
    </div>
  );
}
