'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, User, Chrome } from 'lucide-react';
import { useFitPrint } from '@/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsGuest, loginWithGoogle, user } = useFitPrint();
  const [guestName, setGuestName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in → redirect
  if (user) {
    router.replace('/create');
    return null;
  }

  async function handleGoogle() {
    setLoading(true);
    // Check if Google OAuth is configured
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (clientId) {
      // TODO: Implement real Google OAuth flow here
      // window.location.href = `/api/auth/google`;
    }
    // For hackathon demo: use demo Google user
    loginWithGoogle();
    setTimeout(() => router.push('/create'), 800);
  }

  function handleGuest() {
    if (!showNameInput) {
      setShowNameInput(true);
      return;
    }
    const name = guestName.trim();
    if (!name) {
      setNameError('Please enter your name to continue');
      return;
    }
    setNameError('');
    loginAsGuest(name);
    router.push('/create');
  }

  function handleSkip() {
    loginAsGuest('Demo User');
    router.push('/create');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* BG */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent-cyan/6 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shadow-glow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-2xl">Fit<span className="gradient-text-vc">Print</span></span>
            </Link>
            <h1 className="font-display font-black text-3xl text-white mb-2">Welcome to FitPrint</h1>
            <p className="text-white/40 text-sm">Sign in to access your personal Fit Identity</p>
          </div>

          {/* Card */}
          <div className="glass-card rounded-3xl p-8 space-y-4" style={{ border: '1px solid rgba(108,99,255,0.2)' }}>
            {/* Google Sign In */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
              style={{ background: 'white', color: '#1a1a1a', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              {/* Google icon SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </button>

            {/* Env note for demo */}
            <div className="text-center text-white/25 text-[10px] font-mono">
              {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                ? 'Google OAuth configured'
                : '· Demo mode — Google OAuth ready for configuration ·'}
            </div>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-[1px] bg-white/[0.08]" />
              <span className="text-white/25 text-xs">or</span>
              <div className="flex-1 h-[1px] bg-white/[0.08]" />
            </div>

            {/* Guest / Name input */}
            <motion.div
              animate={showNameInput ? { height: 'auto' } : { height: 'auto' }}
              className="space-y-3"
            >
              {showNameInput && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="e.g. Alex"
                    value={guestName}
                    onChange={e => { setGuestName(e.target.value); setNameError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleGuest()}
                    className="input-glass w-full px-4 py-3.5 rounded-xl text-base"
                  />
                  {nameError && (
                    <p className="text-red-400 text-xs">{nameError}</p>
                  )}
                </motion.div>
              )}

              <button
                onClick={handleGuest}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.35)', color: 'white' }}
              >
                <User className="w-4 h-4" />
                {showNameInput ? 'Continue as Guest' : 'Continue as Guest'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {!showNameInput && (
                <button
                  onClick={handleSkip}
                  className="w-full py-3 text-white/30 hover:text-white/60 text-sm transition-colors"
                >
                  Skip → Enter as Demo User
                </button>
              )}
            </motion.div>

            {/* Privacy */}
            <p className="text-center text-white/25 text-[10px] leading-relaxed pt-2 border-t border-white/[0.05]">
              FitPrint stores your fit profile locally on your device.
              No personal data is sent to any server in demo mode.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
