'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Sparkles, Shield, Zap, BarChart3, RefreshCw,
  Star, Ruler, Camera, CheckCircle, Code, Server, HelpCircle, Globe, Lock
} from 'lucide-react';
import Hero3D from '@/components/Hero3D';
import BrandComparison from '@/components/BrandComparison';
import TiltCard from '@/components/TiltCard';
import AboutUs from '@/components/AboutUs';
import FitAiAssistant from '@/components/FitAiAssistant';
import SmoothScroll from '@/components/SmoothScroll';

const features = [
  { icon: Sparkles,  title: 'AI Fit Intelligence',       description: 'Compares your body profile against brand specific garment data for precision size recommendations.', color: '#0047FF' },
  { icon: Shield,    title: 'Universal Fit Identity',     description: 'One FitPrint profile works intelligently across 50+ brands, no guesswork, no wrong sizes.',         color: '#6C63FF' },
  { icon: Zap,       title: 'Instant Multi Analysis',     description: 'Get your personalized size recommendation in milliseconds, powered by real brand level size data.',     color: '#00D4FF' },
  { icon: RefreshCw, title: 'Learns From You',            description: 'Post purchase feedback continuously improves your FitPrint. Every experience sharpens recommendations.', color: '#FFD700' },
  { icon: BarChart3, title: 'Fit Confidence Score',       description: 'See confidence %, plus detailed chest, waist, and shoulder breakdowns for every recommendation.',       color: '#FF2D78' },
  { icon: Star,      title: 'Two Ways to Create',         description: 'Enter measurements or let AI estimate from a photo. Both feed the same intelligent recommendation engine.', color: '#A8FF78' },
];

const stats = [
  { value: '94%', label: 'Fit Accuracy', sub: 'verified purchases' },
  { value: '50', label: 'Brands Supported', sub: 'Indian & Global' },
  { value: '50K+', label: 'Profiles Created', sub: 'in beta' },
  { value: '2', label: 'Creation Methods', sub: 'manual or AI photo' },
];

const stages = [
  { number: '01', title: 'YOUR BODY', desc: 'Enter body measurements or upload a photo to capture exact physical dimensions.', color: '#0047FF' },
  { number: '02', title: 'YOUR FITPRINT', desc: 'Body measurements convert into a universal digital Fit Identity (e.g. FP-8294).', color: '#6C63FF' },
  { number: '03', title: 'BRAND INTELLIGENCE', desc: 'FitPrint algorithms match your profile against brand-specific garment data.', color: '#00D4FF' },
  { number: '04', title: 'THE RIGHT FIT', desc: 'Get your exact size recommendation with confidence breakdown per brand.', color: '#FFD700' },
];

const headlineWords = ['ONE BODY.', 'EVERY BRAND.', 'THE RIGHT FIT.'];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <SmoothScroll>
      <div className="relative bg-[#120E0C] text-[#F5EFE8] selection:bg-[#C49A6C] selection:text-[#120E0C]">

        {/* ── 1. HERO SECTION (Dark Espresso 3D Luxury) ───────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
          {/* Subtle grid line */}
          <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none overflow-hidden opacity-15">
            <div style={{
              backgroundImage: 'linear-gradient(rgba(196,154,108,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,108,0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              width: '100%', height: '100%',
            }} />
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10"
          >
            {/* Left Column: Dark Luxury Typography */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-8 bg-[#1E1714] border border-[#C49A6C]/35 text-[#F5EFE8]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">Universal Fit Intelligence Platform</span>
              </motion.div>

              {/* Bold Headline */}
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl leading-[0.98] tracking-tight text-[#F5EFE8] mb-8 uppercase">
                ONE BODY.<br />
                EVERY BRAND.<br />
                <span className="gradient-text">THE RIGHT FIT.</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[#B9A99D] text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              >
                FitPrint creates your personal Fit Identity and translates it into the right clothing size across 50 popular brands, powered by AI and real garment data.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  href="/create"
                  className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs font-bold tracking-wider shadow-2xl"
                >
                  Create My FitPrint →
                </Link>
                <Link
                  href="/compare"
                  className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-xs font-semibold tracking-wider"
                >
                  Compare 50 Brands Live
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-4 border-t border-[#C49A6C]/20 pt-6"
              >
                <div className="flex -space-x-2">
                  {['#C49A6C','#9C735D','#4A90A4','#66B8C9','#7D6B9E'].map((color, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold text-[#120E0C]"
                      style={{ background: color, borderColor: '#120E0C' }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#B9A99D]">
                  <strong className="text-[#F5EFE8] font-semibold">50,000+ Fit Identity profiles</strong> created in beta
                </p>
              </motion.div>
            </div>

            {/* Right Column: WebGL 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[520px] lg:h-[600px]"
            >
              <Hero3D />
            </motion.div>
          </motion.div>
        </section>

        {/* ── 2. HOW IT WORKS SECTION (Dark Chocolate #1E1714) ─────────────────── */}
        <section id="how-it-works" className="scroll-mt-24 bg-[#1E1714] text-[#F5EFE8] py-32 relative border-y border-[#C49A6C]/20">
          <div className="max-w-7xl mx-auto px-6">

            {/* Narrative Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A6C]/30 bg-[#2A201C] text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase mb-4">
                HOW FITPRINT WORKS
              </div>
              <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-[#F5EFE8] mb-6 tracking-tight uppercase">
                YOUR BODY DOESN'T CHANGE. <br />
                <span className="gradient-text">BRAND SIZES DO.</span>
              </h2>
              <p className="text-[#B9A99D] text-lg max-w-2xl mx-auto leading-relaxed">
                When shopping online, Medium in H&M is completely different from Medium in Zara. FitPrint connects the two with universal data intelligence.
              </p>
            </motion.div>

            {/* 4-Step Interactive Visual Journey with Controlled Colorful Accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                { number: '01', title: 'CREATE YOUR FITPRINT', desc: 'Create your personalized body and fit profile.', color: '#D69A4D' },
                { number: '02', title: 'FITPRINT ANALYZES YOU', desc: 'Analyze body measurements, proportions and fit preferences.', color: '#66B8C9' },
                { number: '03', title: 'COMPARE WITH BRANDS', desc: 'FitPrint compares your profile with different brand sizing systems.', color: '#7D6B9E' },
                { number: '04', title: 'GET YOUR PERFECT SIZE', desc: 'Receive personalized size recommendations with confidence scores.', color: '#C49A6C' },
              ].map((stg, i) => (
                <motion.div
                  key={stg.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="glass-card rounded-2xl p-8 border border-[rgba(196,154,108,0.2)] hover:border-[#C49A6C] transition-all duration-300 h-full flex flex-col justify-between bg-[#2A201C] group hover:-translate-y-1">
                    <div>
                      <div className="font-mono font-black text-3xl mb-4" style={{ color: stg.color }}>
                        {stg.number}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#F5EFE8] mb-2 group-hover:text-[#C49A6C] transition-colors">{stg.title}</h3>
                      <p className="text-[#B9A99D] text-xs leading-relaxed">{stg.desc}</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-[rgba(196,154,108,0.15)] text-[10px] font-mono text-[#B9A99D] uppercase flex items-center justify-between">
                      <span>Phase 0{i + 1} of 04</span>
                      <span style={{ color: stg.color }} className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Band */}
            <div className="glass-card rounded-2xl p-10 border border-[rgba(196,154,108,0.25)] bg-[#2A201C] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <div key={s.label}>
                  <div className="font-display font-black text-4xl md:text-5xl text-[#C49A6C] mb-1">
                    {s.value}
                  </div>
                  <div className="font-bold text-sm text-[#F5EFE8]">{s.label}</div>
                  <div className="text-[#B9A99D] text-xs mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── 3. TWO CREATION METHODS SECTION ───────────────── */}
        <section id="create" className="py-32 relative bg-[#120E0C]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A6C]/30 bg-[#1E1714] text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" /> Two Methods, One Profile
              </div>
              <h2 className="font-display font-black text-5xl md:text-6xl text-[#F5EFE8] mb-4 uppercase">
                Create Your <span className="gradient-text">FitPrint</span>
              </h2>
              <p className="text-[#B9A99D] text-lg max-w-xl mx-auto">
                Both paths power the same intelligent recommendation engine. Choose what works best for you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Method 1: Smart Fit Profile */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <TiltCard strength={10} className="h-full">
                  <Link href="/create" className="block h-full">
                    <div className="relative h-full rounded-2xl p-8 transition-all duration-300 glass-card bg-[#2A201C] border border-[rgba(196,154,108,0.25)] hover:border-[#C49A6C]">
                      <div className="w-14 h-14 rounded-xl bg-[#1E1714] border border-[#C49A6C]/30 flex items-center justify-center mb-6">
                        <Ruler className="w-7 h-7 text-[#C49A6C]" />
                      </div>
                      <div className="text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase mb-2">Method 01</div>
                      <h3 className="font-display font-black text-3xl text-[#F5EFE8] mb-3">Smart Fit Profile</h3>
                      <p className="text-[#B9A99D] text-sm leading-relaxed mb-6">
                        Enter body measurements for a precise data driven FitPrint. Cross references your profile against 50 brand size charts.
                      </p>
                      <ul className="space-y-2 mb-8">
                        {['Height, weight & body measurements', 'Preferred fit style (Slim/Regular/Loose)', 'Precision brand level size matching', 'Highest accuracy rating (94%)'].map(f => (
                          <li key={f} className="flex items-center gap-2.5 text-xs text-[#F5EFE8]">
                            <CheckCircle className="w-4 h-4 text-[#C49A6C] flex-shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                      <div className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
                        Build My Profile →
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>

              {/* Method 2: AI Body Analysis */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <TiltCard strength={10} className="h-full">
                  <Link href="/ai-analysis" className="block h-full">
                    <div className="relative h-full rounded-2xl p-8 transition-all duration-300 glass-card bg-[#2A201C] border border-[rgba(196,154,108,0.25)] hover:border-[#66B8C9]">
                      <div className="w-14 h-14 rounded-xl bg-[#1E1714] border border-[#66B8C9]/40 flex items-center justify-center mb-6">
                        <Camera className="w-7 h-7 text-[#66B8C9]" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#66B8C9] animate-pulse" />
                        <span className="text-[#66B8C9] text-xs font-mono font-bold tracking-widest uppercase">Method 02 · Live AI</span>
                      </div>
                      <h3 className="font-display font-black text-3xl text-[#F5EFE8] mb-3">AI Live Body Scan</h3>
                      <p className="text-[#B9A99D] text-sm leading-relaxed mb-6">
                        Live camera scanning estimates body proportions. Fast, frictionless, and completely private.
                      </p>
                      <ul className="space-y-2 mb-6">
                        {['Live camera landmark scan', 'Computer vision proportion mapping', 'Instant proportion analysis', 'Zero photo storage guarantee'].map(f => (
                          <li key={f} className="flex items-center gap-2.5 text-xs text-[#F5EFE8]">
                            <CheckCircle className="w-4 h-4 text-[#66B8C9] flex-shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                      <div className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
                        Start Live Body Scan →
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 4. BRAND COMPARISON VIZ ─────────────────────────────────────── */}
        <BrandComparison />

        {/* ── 5. BRAND SCALE SECTION ──────────────────────────────────────── */}
        <section className="py-28 bg-[#1E1714] border-y border-[#C49A6C]/20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A6C]/30 bg-[#2A201C] text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Globe className="w-3.5 h-3.5" /> Scalable Fit Intelligence Architecture
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#F5EFE8] mb-4 uppercase">
              Today, 50 Brands. Tomorrow, Every Wardrobe.
            </h2>
            <p className="text-[#B9A99D] text-base max-w-xl mx-auto mb-10 leading-relaxed">
              FitPrint is built on a scalable fit intelligence engine. New brands can be integrated through structured size data and future API partnerships without changing a user's FitPrint.
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-6 font-mono text-xs font-bold text-[#F5EFE8] flex-wrap">
              <span className="px-4 py-2 rounded-lg bg-[#2A201C] border border-[#C49A6C]/30">USER</span>
              <span className="text-[#C49A6C]">→</span>
              <span className="px-4 py-2 rounded-lg bg-[#C49A6C] text-[#120E0C]">ONE FITPRINT</span>
              <span className="text-[#C49A6C]">→</span>
              <span className="px-4 py-2 rounded-lg bg-[#2A201C] border border-[#C49A6C]/30">FITPRINT ENGINE</span>
              <span className="text-[#C49A6C]">→</span>
              <span className="px-4 py-2 rounded-lg bg-[#9C735D] text-white">50+ BRANDS</span>
              <span className="text-[#C49A6C]">→</span>
              <span className="px-4 py-2 rounded-lg bg-[#4A90A4] text-white">PERSONALIZED FIT</span>
            </div>
          </div>
        </section>

        {/* ── 6. FEATURES GRID ────────────────────────────────────────────── */}
        <section id="features" className="py-28 relative bg-[#120E0C]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A6C]/30 bg-[#1E1714] text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Platform Capabilities
              </div>
              <h2 className="font-display font-black text-5xl md:text-6xl text-[#F5EFE8] mb-4">
                Built for the <span className="gradient-text">Future of Fashion</span>
              </h2>
              <p className="text-[#B9A99D] text-lg max-w-xl mx-auto">
                FitPrint doesn't sell clothes. It makes any brand's sizing work perfectly for you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <TiltCard strength={8} className="h-full">
                      <div className="glass-card rounded-3xl p-7 h-full flex flex-col justify-between border-white/10 bg-black/60">
                        <div>
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                            style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}35` }}>
                            <Icon className="w-5 h-5" style={{ color: feature.color }} />
                          </div>
                          <h3 className="font-display font-bold text-xl text-white mb-3">{feature.title}</h3>
                          <p className="text-white/45 text-xs leading-relaxed">{feature.description}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/5" />
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. ABOUT US TEAM SECTION ───────────────────────────────────── */}
        <AboutUs />

        {/* ── 8. FOOTER ─────────────────────────────────────────────────── */}
        <footer className="border-t border-[rgba(196,154,108,0.2)] py-12 bg-[#1E1714]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C49A6C] to-[#9C735D] flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-[#120E0C]" />
              </div>
              <span className="font-display font-bold text-xl text-[#F5EFE8]">
                Fit<span className="text-[#C49A6C]">Print</span>
              </span>
            </div>

            {/* Premium Privacy & Security Message */}
            <div className="text-center md:text-left space-y-1 max-w-lg">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-mono font-bold text-[#C49A6C]">
                <Lock className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>YOUR PRIVACY MATTERS</span>
              </div>
              <p className="text-[#F5EFE8]/90 text-xs font-medium leading-relaxed">
                Your personal information and FitPrint data are handled securely and are never sold or shared without your consent.
              </p>
              <p className="text-[#B9A99D] text-[11px] font-mono">
                We believe your body and personal data should remain yours.
              </p>
            </div>

            <div className="flex gap-6 text-xs text-[#B9A99D]">
              <Link href="/brands" className="hover:text-[#F5EFE8] transition-colors">Brand Library</Link>
              <Link href="/compare" className="hover:text-[#F5EFE8] transition-colors">Compare Brands</Link>
              <Link href="/create" className="hover:text-[#F5EFE8] transition-colors">Create Profile</Link>
            </div>
          </div>
        </footer>

        {/* Floating FIT AI Assistant */}
        <FitAiAssistant />

      </div>
    </SmoothScroll>
  );
}
