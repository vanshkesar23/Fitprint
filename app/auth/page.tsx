'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, ShieldCheck, User, Mail, Key, Eye, EyeOff, Check, X, ArrowRight, RefreshCw, Lock } from 'lucide-react';
import { useFitPrint } from '@/lib/context';
import AuthRichAmbientCanvas from '@/components/AuthRichAmbientCanvas';
import AuthFitIntelligenceVisual from '@/components/AuthFitIntelligenceVisual';

export default function AuthPage() {
  const router = useRouter();
  const { signupWithEmail, loginWithEmail, verifyEmail } = useFitPrint();

  // Mode: 'signup' | 'signin'
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');

  // Step: 'form' | 'otp' | 'verified'
  const [step, setStep] = useState<'form' | 'otp' | 'verified'>('form');

  // Form inputs (ALL EMPTY BY DEFAULT - NO PREFILLED PERSONAL INFO)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  // OTP inputs (6 digits)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [cooldown, setCooldown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Status & loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passedRules = [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length;

  let strengthLabel = '';
  let strengthColor = 'bg-gray-700';

  if (password.length > 0) {
    if (passedRules <= 1) {
      strengthLabel = 'Weak';
      strengthColor = 'bg-red-500';
    } else if (passedRules <= 3) {
      strengthLabel = 'Medium';
      strengthColor = 'bg-amber-500';
    } else {
      strengthLabel = 'Strong';
      strengthColor = 'bg-[#C49A6C]';
    }
  }

  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasNumber;
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  // Cooldown timer for OTP Resend
  useEffect(() => {
    if (step !== 'otp') return;
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(c => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, cooldown]);

  // Handle OTP digit changes
  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input box
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  // Handle OTP Keydown (Backspace navigation)
  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  // Auto-fill Demo Code Helper for Hackathon testing
  function handleAutoFillDemoCode() {
    const digits = generatedOtp.split('');
    setOtp(digits);
  }

  // Handle Signup Submit -> Creates Unverified Account & Triggers OTP Verification Screen
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Please enter both your first name and last name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address (e.g. example@gmail.com).');
      return;
    }
    if (!isPasswordValid) {
      setErrorMsg('Password must be 8+ characters with uppercase, lowercase and a number.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setErrorMsg('Please accept the Terms & Privacy Policy.');
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    setWelcomeName(fullName);

    // Create unverified account session
    await signupWithEmail(fullName, email);

    // Generate 6-digit OTP code for demo
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setCooldown(30);

    // Transition to OTP Screen
    setStep('otp');
  }

  // Resend OTP
  function handleResendOtp() {
    if (cooldown > 0) return;
    setIsResending(true);
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newCode);
    setCooldown(30);
    setTimeout(() => setIsResending(false), 500);
  }

  // Verify OTP -> Updates account state to emailVerified = true
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    const enteredCode = otp.join('');

    if (enteredCode.length < 6) {
      setErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }

    // Accept generated OTP code or universal demo code (123456)
    if (enteredCode !== generatedOtp && enteredCode !== '123456') {
      setErrorMsg(`Invalid verification code. Use demo code: ${generatedOtp}`);
      return;
    }

    setIsSubmitting(true);
    verifyEmail(); // Marks user as emailVerified = true

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('verified');
    }, 1000);
  }

  // Final Action from Verified Screen -> Enter FitPrint
  function handleEnterFitPrint() {
    router.push('/');
  }

  // Handle Signin
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address (e.g. example@gmail.com).');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const derived = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'User';
    const formatted = derived.charAt(0).toUpperCase() + derived.slice(1);
    setWelcomeName(formatted);

    await loginWithEmail(email, formatted);

    setTimeout(() => {
      router.push('/');
    }, 1200);
  }

  return (
    <div className="min-h-screen w-full bg-[#120E0C] text-[#F5EFE8] flex flex-col lg:flex-row relative overflow-hidden">
      {/* ── RICH AMBIENT AI CANVAS ENGINE ───────────────────────────────────── */}
      <AuthRichAmbientCanvas />

      {/* ── CINEMATIC LOADING OVERLAY ────────────────────────────────────────── */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#120E0C] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#C49A6C]/30 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C49A6C] to-[#9C735D] flex items-center justify-center shadow-glow">
                <Zap className="w-8 h-8 text-[#120E0C]" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h2 className="font-display font-black text-3xl md:text-4xl text-[#F5EFE8] uppercase">
                WELCOME TO FITPRINT, {welcomeName || 'USER'}.
              </h2>
              <p className="text-xs font-mono text-[#C49A6C] tracking-widest uppercase">
                Initializing Your Fit Identity & Size Engine...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LEFT SIDE — BRAND EXPERIENCE ───────────────────────────────────── */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative bg-gradient-to-br from-[#1E1714] via-[#120E0C] to-[#2A201C] border-b lg:border-b-0 lg:border-r border-[rgba(196,154,108,0.2)]">

        {/* Ambient background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div style={{
            backgroundImage: 'linear-gradient(rgba(196,154,108,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,108,0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            width: '100%', height: '100%',
          }} />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C49A6C] to-[#9C735D] flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-[#120E0C]" />
          </div>
          <span className="font-display font-black text-2xl text-[#F5EFE8] uppercase tracking-tight">
            Fit<span className="text-[#C49A6C]">Print</span>
          </span>
        </div>

        {/* Center Editorial Headline */}
        <div className="relative z-10 my-16 lg:my-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A201C] border border-[#C49A6C]/30 text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Universal Sizing Platform
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl leading-[0.96] text-[#F5EFE8] uppercase tracking-tight">
            YOUR BODY.<br />
            ONE FITPRINT.<br />
            <span className="gradient-text">EVERY BRAND.</span>
          </h1>

          <p className="text-[#B9A99D] text-base md:text-lg max-w-md leading-relaxed">
            "Create your personal fit identity and discover the right size across the brands you love."
          </p>

          {/* ── PROMINENT LIVE 3D FIT INTELLIGENCE VISUALIZATION ──────────── */}
          <AuthFitIntelligenceVisual />

          {/* Floating Size Badge Indicators */}
          <div className="flex items-center gap-3 pt-4">
            {['XS', 'S', 'M', 'L', 'XL'].map((sz, i) => (
              <motion.div
                key={sz}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="w-10 h-10 rounded-xl bg-[#2A201C] border border-[rgba(196,154,108,0.25)] flex items-center justify-center text-xs font-mono font-bold text-[#C49A6C]"
              >
                {sz}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center gap-3 text-xs text-[#B9A99D] font-mono">
          <ShieldCheck className="w-4 h-4 text-[#C49A6C]" />
          <span>Encrypted Universal Body Identity Storage</span>
        </div>
      </div>

      {/* ── RIGHT SIDE — AUTH & VERIFICATION CONTAINER ─────────────────────── */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex items-center justify-center bg-[#120E0C] relative">

        <div className="w-full max-w-md space-y-8 relative z-10">

          <AnimatePresence mode="wait">

            {/* ── STEP 1: INITIAL AUTH FORM ─────────────────────────────────── */}
            {step === 'form' && (
              <motion.div
                key="step-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Mode Switcher Buttons */}
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#1E1714] border border-[rgba(196,154,108,0.25)]">
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setErrorMsg(''); }}
                    className={`py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      mode === 'signup'
                        ? 'bg-[#C49A6C] text-[#120E0C] shadow-lg'
                        : 'text-[#B9A99D] hover:text-[#F5EFE8]'
                    }`}
                  >
                    CREATE ACCOUNT
                  </button>

                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setErrorMsg(''); }}
                    className={`py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      mode === 'signin'
                        ? 'bg-[#C49A6C] text-[#120E0C] shadow-lg'
                        : 'text-[#B9A99D] hover:text-[#F5EFE8]'
                    }`}
                  >
                    SIGN IN
                  </button>
                </div>

                {/* Form Header */}
                <div>
                  <h2 className="font-display font-black text-3xl text-[#F5EFE8] uppercase mb-2">
                    {mode === 'signup' ? 'WELCOME TO FITPRINT' : 'WELCOME BACK'}
                  </h2>
                  <p className="text-xs text-[#B9A99D]">
                    {mode === 'signup'
                      ? 'Create your personal account and start building your FitPrint.'
                      : 'Your FitPrint is waiting for you.'}
                  </p>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* ── CREATE ACCOUNT FORM (100% CLEAN EMPTY PLACEHOLDERS) ─────── */}
                {mode === 'signup' && (
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSignUp}
                    className="space-y-4"
                  >
                    {/* 1. FIRST NAME & LAST NAME */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#B9A99D] uppercase mb-2 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#C49A6C]" /> First Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="First Name"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          className="input-glass w-full px-4 py-3.5 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#B9A99D] uppercase mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Last Name"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          className="input-glass w-full px-4 py-3.5 rounded-xl text-sm"
                        />
                      </div>
                    </div>

                    {/* 2. EMAIL ADDRESS */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#B9A99D] uppercase mb-2 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#C49A6C]" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-glass w-full px-4 py-3.5 rounded-xl text-sm"
                      />
                    </div>

                    {/* 3. PASSWORD */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#B9A99D] uppercase mb-2 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-[#C49A6C]" /> Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Enter your password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="input-glass w-full px-4 py-3.5 rounded-xl text-sm pr-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(v => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9A99D] hover:text-[#F5EFE8] cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {password.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-[#B9A99D]">Strength:</span>
                            <span className="font-bold text-[#F5EFE8]">{strengthLabel}</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#1E1714] rounded-full overflow-hidden flex gap-1">
                            <div className={`h-full flex-1 rounded-full transition-colors ${passedRules >= 1 ? strengthColor : 'bg-gray-800'}`} />
                            <div className={`h-full flex-1 rounded-full transition-colors ${passedRules >= 2 ? strengthColor : 'bg-gray-800'}`} />
                            <div className={`h-full flex-1 rounded-full transition-colors ${passedRules >= 3 ? strengthColor : 'bg-gray-800'}`} />
                            <div className={`h-full flex-1 rounded-full transition-colors ${passedRules >= 4 ? strengthColor : 'bg-gray-800'}`} />
                          </div>
                        </div>
                      )}

                      <p className="text-[11px] text-[#B9A99D] mt-1.5 font-mono">
                        "Use 8+ characters with uppercase, lowercase and a number."
                      </p>
                    </div>

                    {/* 4. CONFIRM PASSWORD */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold text-[#B9A99D] uppercase flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-[#C49A6C]" /> Confirm Password
                        </label>
                        {confirmPassword.length > 0 && (
                          <span className={`text-[10px] font-mono font-bold flex items-center gap-1 ${
                            passwordsMatch ? 'text-[#C49A6C]' : 'text-red-400'
                          }`}>
                            {passwordsMatch ? <Check className="w-3 h-3 text-[#C49A6C]" /> : <X className="w-3 h-3 text-red-400" />}
                            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          className="input-glass w-full px-4 py-3.5 rounded-xl text-sm pr-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(v => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9A99D] hover:text-[#F5EFE8] cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* 5. TERMS CHECKBOX */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                        className="rounded border-[rgba(196,154,108,0.4)] accent-[#C49A6C] cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-xs text-[#B9A99D] cursor-pointer">
                        I agree to the Terms & Privacy Policy
                      </label>
                    </div>

                    {/* 6. PRIMARY CTA */}
                    <button
                      type="submit"
                      className="btn-primary w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl mt-4 cursor-pointer"
                    >
                      CREATE MY ACCOUNT →
                    </button>
                  </motion.form>
                )}

                {/* ── SIGN IN FORM ─────────────────────────────────────────── */}
                {mode === 'signin' && (
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSignIn}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#B9A99D] uppercase mb-2 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#C49A6C]" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-glass w-full px-4 py-3.5 rounded-xl text-sm"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold text-[#B9A99D] uppercase flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-[#C49A6C]" /> Password
                        </label>
                        <button
                          type="button"
                          onClick={() => alert('Password reset link sent to your email.')}
                          className="text-[11px] font-mono text-[#C49A6C] hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Enter your password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="input-glass w-full px-4 py-3.5 rounded-xl text-sm pr-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(v => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9A99D] hover:text-[#F5EFE8] cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl mt-4 cursor-pointer"
                    >
                      SIGN IN →
                    </button>
                  </motion.form>
                )}

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-[1px] bg-[rgba(196,154,108,0.2)]" />
                  <span className="text-[10px] font-mono font-bold text-[#B9A99D] tracking-widest uppercase">
                    OR CONTINUE WITH
                  </span>
                  <div className="flex-1 h-[1px] bg-[rgba(196,154,108,0.2)]" />
                </div>

                {/* Gracefully Disabled Google Sign In Button */}
                <div className="space-y-1.5">
                  <button
                    type="button"
                    disabled
                    className="w-full py-3.5 rounded-xl bg-[#1E1714]/60 border border-[rgba(196,154,108,0.15)] text-[#B9A99D]/60 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-3 cursor-not-allowed opacity-75"
                  >
                    <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 10.5 0 12.4s.6 3.2 1.6 5.2l3.7-2.9z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.4-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
                      />
                    </svg>
                    Continue with Google (Coming Soon)
                  </button>
                  <p className="text-[10px] text-center font-mono text-[#B9A99D]/60">
                    Google Sign-In integration coming soon. Please use Email Sign Up above.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: EMAIL VERIFICATION SCREEN (OTP) ───────────────────── */}
            {step === 'otp' && (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-3xl p-8 bg-[#2A201C] border border-[#C49A6C]/40 space-y-6 shadow-2xl"
              >
                {/* Glowing Envelope Icon */}
                <div className="flex justify-center">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#1E1714] border border-[#C49A6C]/50 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-[#C49A6C] animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C49A6C] border-2 border-[#2A201C]" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="font-display font-black text-3xl text-[#F5EFE8] uppercase tracking-tight">
                    VERIFY YOUR EMAIL
                  </h2>
                  <p className="text-xs text-[#B9A99D] leading-relaxed">
                    "Almost there. We've sent a verification link and code to your email address."
                  </p>
                </div>

                {/* Dynamically Entered Email Display */}
                <div className="p-3.5 rounded-xl bg-[#1E1714] border border-[rgba(196,154,108,0.2)] text-center space-y-2">
                  <span className="text-[11px] font-mono text-[#B9A99D] uppercase block">
                    Verification sent to:
                  </span>
                  <span className="text-sm font-mono font-bold text-[#C49A6C]">{email || 'user@example.com'}</span>

                  {/* Hackathon Demo Helper Box with Auto-Fill Button */}
                  <div className="pt-2 border-t border-[rgba(196,154,108,0.15)] flex items-center justify-between gap-2 px-2">
                    <span className="text-[11px] font-mono text-[#F5EFE8]">
                      ⚡ Demo Code: <strong className="text-[#C49A6C]">{generatedOtp}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={handleAutoFillDemoCode}
                      className="px-2.5 py-1 rounded-lg bg-[#C49A6C]/20 border border-[#C49A6C]/50 text-[#C49A6C] text-[10px] font-mono font-bold uppercase hover:bg-[#C49A6C] hover:text-[#120E0C] transition-colors cursor-pointer"
                    >
                      Auto-fill Code
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-medium text-center">
                    {errorMsg}
                  </div>
                )}

                {/* 6-Digit OTP Input Boxes */}
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="flex items-center justify-center gap-2.5">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => { otpRefs.current[i] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        className="w-11 h-13 text-center text-xl font-mono font-bold rounded-xl bg-[#1E1714] border border-[rgba(196,154,108,0.3)] text-[#F5EFE8] focus:border-[#C49A6C] focus:ring-1 focus:ring-[#C49A6C] outline-none transition-all"
                      />
                    ))}
                  </div>

                  {/* Option B — Verification Link Notice */}
                  <p className="text-[11px] text-[#B9A99D] text-center leading-relaxed">
                    "You can also verify your account using the secure link sent to your email."
                  </p>

                  {/* Resend Cooldown Timer */}
                  <div className="text-center">
                    {cooldown > 0 ? (
                      <span className="text-xs font-mono text-[#B9A99D]">
                        Resend code in <strong className="text-[#C49A6C]">0:{cooldown < 10 ? `0${cooldown}` : cooldown}</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="text-xs font-mono font-bold text-[#C49A6C] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                        Didn't receive anything? RESEND CODE
                      </button>
                    )}
                  </div>

                  {/* Verify Button */}
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl cursor-pointer"
                  >
                    VERIFY EMAIL →
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="w-full text-center text-xs font-mono text-[#B9A99D] hover:text-[#F5EFE8] cursor-pointer"
                  >
                    ← Back to Sign Up
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── STEP 3: SUCCESS SCREEN (EMAIL VERIFIED) ───────────────────── */}
            {step === 'verified' && (
              <motion.div
                key="step-verified"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-8 bg-[#2A201C] border border-[#C49A6C] text-center space-y-6 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-[#C49A6C]/20 border border-[#C49A6C] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-[#C49A6C]" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-display font-black text-3xl text-[#F5EFE8] uppercase tracking-tight flex items-center justify-center gap-2">
                    ✓ EMAIL VERIFIED
                  </h2>
                  <p className="text-sm font-mono font-bold text-[#C49A6C]">
                    "Your FitPrint identity is ready."
                  </p>
                </div>

                <p className="text-xs text-[#B9A99D] leading-relaxed max-w-sm mx-auto">
                  "You can now build your personal fit profile and discover your size across brands."
                </p>

                <button
                  type="button"
                  onClick={handleEnterFitPrint}
                  className="btn-primary w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl cursor-pointer flex items-center justify-center gap-2"
                >
                  ENTER FITPRINT →
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
