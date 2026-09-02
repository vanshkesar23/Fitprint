'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const brands = [
  { name: 'H&M',         abbr: 'H&M', size: 'M',  angle: 0,   color: '#D69A4D', note: 'True to Size' },
  { name: 'Zara',        abbr: 'ZR',  size: 'L',  angle: 72,  color: '#66B8C9', note: 'Runs Small' },
  { name: 'Nova Studio', abbr: 'NS',  size: 'M',  angle: 144, color: '#7D6B9E', note: 'Standard EU' },
  { name: 'Axiom Wear',  abbr: 'AX',  size: 'L',  angle: 216, color: '#C96B3B', note: 'Runs Large' },
  { name: 'Solace',      abbr: 'SL',  size: 'XL', angle: 288, color: '#C49A6C', note: 'Slim Fit' },
];

export default function BrandComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.34;

    function hexRgb(h: string) {
      return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.7;

      // ── GRID RINGS ─────────────────────────────────────────────────────────
      [R * 0.35, R * 0.65, R, R * 1.25].forEach((r, i) => {
        ctx!.beginPath();
        ctx!.arc(cx, cy, r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(196,154,108,${0.06 + i * 0.02})`;
        ctx!.lineWidth = 1;
        ctx!.setLineDash([i % 2 ? 5 : 0, i % 2 ? 7 : 0]);
        ctx!.stroke();
        ctx!.setLineDash([]);
      });

      // ── RADIAL GRID SPOKES ──────────────────────────────────────────────
      for (let a = 0; a < 360; a += 30) {
        const ar = a * Math.PI / 180;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(cx + Math.cos(ar) * R * 1.25, cy + Math.sin(ar) * R * 1.25);
        ctx!.strokeStyle = 'rgba(196,154,108,0.04)';
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // ── BRANDS ─────────────────────────────────────────────────────────────
      brands.forEach((brand, i) => {
        const ang = ((brand.angle + t * 0.06) * Math.PI) / 180;
        const bx = cx + Math.cos(ang) * R;
        const by = cy + Math.sin(ang) * (R * 0.72);
        const pulse = 1 + Math.sin(t * 0.06 + i) * 0.04;
        const br = 36 * pulse;
        const rgb = hexRgb(brand.color);

        // Glow halo
        const halo = ctx!.createRadialGradient(bx, by, 0, bx, by, br * 2.2);
        halo.addColorStop(0, `rgba(${rgb},0.22)`);
        halo.addColorStop(1, 'transparent');
        ctx!.fillStyle = halo;
        ctx!.beginPath(); ctx!.arc(bx, by, br * 2.2, 0, Math.PI * 2); ctx!.fill();

        // Connector beam
        const beamAlpha = 0.08 + Math.sin(t * 0.04 + i) * 0.04;
        const lg = ctx!.createLinearGradient(cx, cy, bx, by);
        lg.addColorStop(0, `rgba(196,154,108,${beamAlpha * 4})`);
        lg.addColorStop(1, `rgba(${rgb},${beamAlpha})`);
        ctx!.beginPath(); ctx!.moveTo(cx, cy); ctx!.lineTo(bx, by);
        ctx!.strokeStyle = lg; ctx!.lineWidth = 1.5; ctx!.stroke();

        // Three animated data packets flowing outward
        [0, 0.33, 0.66].forEach(offset => {
          const prog = ((t * 0.014 + i * 0.2 + offset) % 1);
          const px = cx + (bx - cx) * prog;
          const py = cy + (by - cy) * prog;
          const pAlpha = 0.6 * Math.sin(prog * Math.PI);
          ctx!.globalAlpha = pAlpha;
          ctx!.fillStyle = brand.color;
          ctx!.shadowBlur = 8; ctx!.shadowColor = brand.color;
          ctx!.beginPath(); ctx!.arc(px, py, 2.5, 0, Math.PI * 2); ctx!.fill();
          ctx!.globalAlpha = 1; ctx!.shadowBlur = 0;
        });

        // 3D brand disk — shadow
        ctx!.globalAlpha = 0.25;
        ctx!.fillStyle = `rgba(0,0,0,0.5)`;
        ctx!.beginPath(); ctx!.ellipse(bx + 4, by + 6, br, br * 0.3, 0, 0, Math.PI * 2); ctx!.fill();
        ctx!.globalAlpha = 1;

        // Brand disk
        const dg = ctx!.createRadialGradient(bx - br * 0.25, by - br * 0.25, 0, bx, by, br);
        dg.addColorStop(0, `rgba(${rgb},0.35)`);
        dg.addColorStop(0.6, `rgba(${rgb},0.18)`);
        dg.addColorStop(1, `rgba(${rgb},0.06)`);
        ctx!.beginPath(); ctx!.arc(bx, by, br, 0, Math.PI * 2);
        ctx!.fillStyle = dg; ctx!.fill();
        ctx!.strokeStyle = `rgba(${rgb},0.7)`; ctx!.lineWidth = 1.5;
        ctx!.shadowBlur = 12; ctx!.shadowColor = brand.color; ctx!.stroke(); ctx!.shadowBlur = 0;

        // Shimmer top arc
        const shimGrad = ctx!.createLinearGradient(bx - br, by - br, bx + br, by + br * 0.5);
        shimGrad.addColorStop(0, `rgba(245,239,232,0.18)`);
        shimGrad.addColorStop(1, `rgba(245,239,232,0)`);
        ctx!.beginPath(); ctx!.arc(bx, by, br, 0, Math.PI * 2);
        ctx!.fillStyle = shimGrad; ctx!.fill();

        // Brand text
        ctx!.fillStyle = brand.color;
        ctx!.font = `bold 11px "Outfit",sans-serif`;
        ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
        ctx!.shadowBlur = 6; ctx!.shadowColor = brand.color;
        ctx!.fillText(brand.abbr, bx, by - 8);
        ctx!.shadowBlur = 0;
        ctx!.fillStyle = '#F5EFE8';
        ctx!.font = `bold 16px "Outfit",sans-serif`;
        ctx!.fillText(brand.size, bx, by + 8);
      });

      // ── CENTER CORE ─────────────────────────────────────────────────────────
      const pulseMul = 1 + Math.sin(t * 0.04) * 0.1;
      const cR = 52 * pulseMul;

      // Expanding pulse rings
      [1, 2, 3].forEach(ring => {
        const rOffset = ((t * 0.5 + ring * 40) % 80);
        const rAlpha = Math.max(0, 0.18 - rOffset / 80 * 0.18);
        ctx!.beginPath();
        ctx!.arc(cx, cy, cR + rOffset, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(196,154,108,${rAlpha})`;
        ctx!.lineWidth = 2;
        ctx!.stroke();
      });

      // Core glow
      const cg = ctx!.createRadialGradient(cx - 15, cy - 15, 0, cx, cy, cR * 2);
      cg.addColorStop(0, 'rgba(196,154,108,0.6)');
      cg.addColorStop(0.4, 'rgba(102,184,201,0.25)');
      cg.addColorStop(1, 'transparent');
      ctx!.fillStyle = cg;
      ctx!.beginPath(); ctx!.arc(cx, cy, cR * 2, 0, Math.PI * 2); ctx!.fill();

      // Core disk gradient
      const coreDisk = ctx!.createRadialGradient(cx - cR * 0.35, cy - cR * 0.35, 0, cx, cy, cR);
      coreDisk.addColorStop(0, 'rgba(196,154,108,0.9)');
      coreDisk.addColorStop(0.5, 'rgba(156,115,93,0.7)');
      coreDisk.addColorStop(1, 'rgba(102,184,201,0.4)');
      ctx!.beginPath(); ctx!.arc(cx, cy, cR, 0, Math.PI * 2);
      ctx!.fillStyle = coreDisk; ctx!.fill();
      ctx!.strokeStyle = 'rgba(245,239,232,0.9)'; ctx!.lineWidth = 1.5;
      ctx!.shadowBlur = 20; ctx!.shadowColor = '#C49A6C'; ctx!.stroke(); ctx!.shadowBlur = 0;

      // Shimmer overlay
      const shimmer = ctx!.createLinearGradient(cx - cR, cy - cR, cx + cR, cy + cR * 0.6);
      shimmer.addColorStop(0, 'rgba(255,255,255,0.22)');
      shimmer.addColorStop(1, 'rgba(255,255,255,0)');
      ctx!.beginPath(); ctx!.arc(cx, cy, cR, 0, Math.PI * 2);
      ctx!.fillStyle = shimmer; ctx!.fill();

      // FP text
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
      ctx!.fillStyle = 'rgba(245,239,232,0.7)';
      ctx!.font = '10px "Outfit",sans-serif';
      ctx!.fillText('FitPrint', cx, cy - 11);
      ctx!.fillStyle = '#F5EFE8';
      ctx!.font = 'bold 18px "Outfit",sans-serif';
      ctx!.shadowBlur = 10; ctx!.shadowColor = '#C49A6C';
      ctx!.fillText('AI', cx, cy + 8);
      ctx!.shadowBlur = 0;

      // ── SCANLINE ────────────────────────────────────────────────────────
      const scanY = ((t * 1.5) % (H + 40)) - 20;
      ctx!.globalAlpha = 0.05;
      ctx!.fillStyle = '#66B8C9';
      ctx!.fillRect(0, scanY, W, 2);
      ctx!.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted, inView]);

  return (
    <section id="brand-comparison" className="py-32 relative overflow-hidden bg-[#1E1714]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A6C]/30 bg-[#2A201C] text-[#C49A6C] text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C] animate-pulse" />
            Core Value Demonstration
          </div>
          <h2 className="font-display font-black text-5xl md:text-6xl text-[#F5EFE8] mb-4 uppercase">
            Same You. <span className="gradient-text">Different Sizes.</span>
            <br />
            <span className="text-[#B9A99D] text-4xl">Finally Explained.</span>
          </h2>
          <p className="text-[#B9A99D] text-lg max-w-2xl mx-auto leading-relaxed">
            Your FitPrint ID is the universal key. FitPrint compares your profile against each
            brand's unique size chart data and tells you exactly what to order.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 100 }}
            className="relative aspect-square max-w-[520px] mx-auto lg:mx-0"
          >
            {mounted && (
              <canvas
                ref={canvasRef}
                className="w-full h-full relative z-10"
                style={{ background: 'transparent' }}
              />
            )}
          </motion.div>

          {/* Brand list */}
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="text-[#B9A99D] text-xs font-mono font-bold tracking-widest uppercase mb-5"
            >
              YOUR FITPRINT → EACH BRAND'S RECOMMENDED SIZE
            </motion.p>

            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card rounded-2xl p-4 flex items-center justify-between group hover:-translate-y-0.5"
                style={{ background: '#2A201C', borderColor: 'rgba(196, 154, 108, 0.2)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                    style={{ background: `${brand.color}20`, border: `1px solid ${brand.color}50`, color: brand.color }}
                  >
                    {brand.abbr}
                  </div>
                  <div>
                    <div className="text-[#F5EFE8] font-bold text-sm">{brand.name}</div>
                    <div className="text-[#B9A99D] text-xs">{brand.note}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-[#B9A99D] text-xs font-mono">→</div>
                  <div
                    className="w-12 h-10 rounded-xl flex items-center justify-center font-display font-black text-base"
                    style={{
                      background: `linear-gradient(135deg, ${brand.color}30, ${brand.color}15)`,
                      border: `1px solid ${brand.color}60`,
                      color: brand.color,
                      boxShadow: `0 0 12px ${brand.color}25`,
                    }}
                  >
                    {brand.size}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-4"
            >
              <Link href="/compare" className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider">
                Compare H&M vs Zara Live →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
