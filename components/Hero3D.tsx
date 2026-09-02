'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let t = 0;

    // ── PARTICLE FIELD ────────────────────────────────────────────────────────
    const COLORS = ['#4A90A4', '#66B8C9', '#D69A4D', '#C96B3B', '#7D6B9E', '#C49A6C'];
    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string; alpha: number; life: number;
    }
    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.2,
      life: Math.random() * Math.PI * 2,
    }));

    // ── DATA NODES ────────────────────────────────────────────────────────────
    const nodes = [
      { label: 'Chest: 98cm',   angle: -30, radius: 200, color: '#66B8C9', dotR: 3.5 },
      { label: 'Waist: 82cm',   angle: 20,  radius: 195, color: '#D69A4D', dotR: 3.5 },
      { label: 'Shoulders: 46cm', angle: -90, radius: 210, color: '#C49A6C', dotR: 3.5 },
      { label: 'Hips: 100cm',   angle: 60,  radius: 200, color: '#7D6B9E', dotR: 3.5 },
    ];

    // ── SIZE BADGES ───────────────────────────────────────────────────────────
    const badges = [
      { label: 'XS', ang: 0,   r: 170, color: '#4A90A4' },
      { label: 'S',  ang: 72,  r: 188, color: '#66B8C9' },
      { label: 'M',  ang: 144, r: 175, color: '#C49A6C' },
      { label: 'L',  ang: 216, r: 185, color: '#D69A4D' },
      { label: 'XL', ang: 288, r: 172, color: '#C96B3B' },
    ];

    // ── NEURAL NETWORK NODES ─────────────────────────────────────────────────
    interface NNode { x: number; y: number; r: number; color: string; px: number; py: number; }
    const nNodes: NNode[] = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      const radius = 130 + Math.random() * 50;
      return {
        x: Math.cos(a) * radius, y: Math.sin(a) * radius * 0.6,
        r: Math.random() * 3 + 1.5,
        color: COLORS[i % COLORS.length],
        px: 0, py: 0,
      };
    });

    // ── BODY POINT CLOUD ──────────────────────────────────────────────────────
    // Points spread around the human silhouette outline
    interface BodyPoint { x: number; y: number; r: number; a: number; phase: number; color: string; }
    const bodyPoints: BodyPoint[] = [];
    for (let i = 0; i < 260; i++) {
      const section = Math.random();
      let x = 0, y = 0;
      if (section < 0.08) { // head
        const a = Math.random() * Math.PI * 2;
        const rr = Math.random() * 26;
        x = Math.cos(a) * rr; y = -120 + Math.sin(a) * rr;
      } else if (section < 0.35) { // torso
        x = (Math.random() - 0.5) * 80; y = -80 + Math.random() * 140;
        const halfW = 40 - Math.abs(y) * 0.15;
        if (Math.abs(x) > halfW) x = halfW * Math.sign(x);
      } else if (section < 0.55) { // hips
        x = (Math.random() - 0.5) * 70; y = 60 + Math.random() * 40;
      } else { // legs
        const leg = Math.random() < 0.5 ? -16 : 16;
        x = leg + (Math.random() - 0.5) * 22;
        y = 100 + Math.random() * 120;
      }
      bodyPoints.push({
        x, y, r: Math.random() * 1.6 + 0.4,
        a: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    // ── HELPERS ───────────────────────────────────────────────────────────────
    function hexToRgb(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    }

    function drawRing(cx: number, cy: number, rx: number, ry: number, color: string, alpha: number, dash = false) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      if (dash) ctx.setLineDash([4, 6]);
      ctx.shadowBlur = 8; ctx.shadowColor = color;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawBadge3D(bx: number, by: number, label: string, color: string, alpha: number) {
      if (!ctx) return;
      const W2 = label.length > 1 ? 52 : 44;
      const H2 = 32;
      const R = 10;
      const rgb = hexToRgb(color);

      ctx.save();
      ctx.globalAlpha = alpha;

      // 3D shadow/depth offset
      ctx.fillStyle = `rgba(${rgb},0.15)`;
      ctx.beginPath();
      ctx.roundRect(bx - W2 / 2 + 4, by - H2 / 2 + 4, W2, H2, R);
      ctx.fill();

      // Main card
      ctx.shadowBlur = 16; ctx.shadowColor = color;
      const g = ctx.createLinearGradient(bx - W2/2, by - H2/2, bx + W2/2, by + H2/2);
      g.addColorStop(0, `rgba(${rgb},0.25)`);
      g.addColorStop(1, `rgba(${rgb},0.08)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect(bx - W2 / 2, by - H2 / 2, W2, H2, R);
      ctx.fill();

      // Shimmer top edge
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(${rgb},0.9)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bx - W2 / 2, by - H2 / 2, W2, H2, R);
      ctx.stroke();

      // Label
      ctx.fillStyle = color;
      ctx.font = `bold ${label.length > 1 ? 12 : 14}px "Outfit","Inter",sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, bx, by);
      ctx.restore();
    }

    function drawDataLabel(lx: number, ly: number, text: string, color: string, alpha: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      const tw = ctx.measureText(text).width + 20;
      const th = 24;

      ctx.fillStyle = `rgba(5,5,16,0.85)`;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 8; ctx.shadowColor = color;
      ctx.beginPath();
      ctx.roundRect(lx - tw / 2, ly - th / 2, tw, th, 6);
      ctx.fill(); ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = color;
      ctx.font = '10px "Inter",monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, lx, ly);
      ctx.restore();
    }

    // ── DRAW LOOP ─────────────────────────────────────────────────────────────
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t++;

      // Smooth mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const cx = W / 2 + mx * 12;
      const cy = H / 2 + my * 8 - 15;
      const scale = Math.max(0.65, Math.min(1.25, Math.min(W, H) / 600));

      // ── GRID BG ──────────────────────────────────────────────────────────
      ctx.strokeStyle = 'rgba(108,99,255,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // ── PARTICLES ────────────────────────────────────────────────────────
      particles.forEach(p => {
        p.life += 0.018;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const a = p.alpha * (0.6 + Math.sin(p.life) * 0.4);
        ctx.globalAlpha = a;
        ctx.shadowBlur = 6; ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      });

      // ── AMBIENT GLOW BEHIND FIGURE ────────────────────────────────────────
      const glowR = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200 * scale);
      glowR.addColorStop(0, 'rgba(108,99,255,0.18)');
      glowR.addColorStop(0.5, 'rgba(0,212,255,0.08)');
      glowR.addColorStop(1, 'transparent');
      ctx.fillStyle = glowR;
      ctx.beginPath(); ctx.arc(cx, cy, 220 * scale, 0, Math.PI * 2); ctx.fill();

      // ── NEURAL NETWORK ────────────────────────────────────────────────────
      nNodes.forEach((n, i) => {
        n.px = cx + Math.cos((i / nNodes.length) * Math.PI * 2 + t * 0.005) * (130 + Math.sin(t * 0.008 + i) * 20) * scale;
        n.py = cy + Math.sin((i / nNodes.length) * Math.PI * 2 + t * 0.005) * (75 + Math.sin(t * 0.01 + i) * 15) * scale;
      });

      // connections
      for (let a = 0; a < nNodes.length; a++) {
        for (let b = a + 1; b < nNodes.length; b++) {
          if ((a + b) % 3 !== 0) continue;
          const dx = nNodes[b].px - nNodes[a].px;
          const dy = nNodes[b].py - nNodes[a].py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 180 * scale) continue;
          const lineAlpha = (1 - dist / (180 * scale)) * 0.2 * (0.5 + Math.sin(t * 0.02 + a) * 0.5);
          ctx.globalAlpha = lineAlpha;
          ctx.strokeStyle = nNodes[a].color;
          ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(nNodes[a].px, nNodes[a].py); ctx.lineTo(nNodes[b].px, nNodes[b].py); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // node dots
      nNodes.forEach(n => {
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 8; ctx.shadowColor = n.color;
        ctx.beginPath(); ctx.arc(n.px, n.py, n.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── ORBITING ELLIPSES ─────────────────────────────────────────────────
      const orbits = [
        { rx: 160, ry: 85, speed: 0.003, color: 'rgba(108,99,255,0.12)', dash: true },
        { rx: 200, ry: 105, speed: -0.002, color: 'rgba(0,212,255,0.08)', dash: false },
        { rx: 240, ry: 125, speed: 0.0015, color: 'rgba(255,45,120,0.06)', dash: true },
      ];
      orbits.forEach(orb => {
        const rot = t * orb.speed;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.shadowBlur = 10; ctx.shadowColor = orb.color;
        ctx.strokeStyle = orb.color;
        ctx.lineWidth = 1;
        if (orb.dash) ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx * scale, orb.ry * scale, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // ── BODY POINT CLOUD ──────────────────────────────────────────────────
      const scanY = ((t * 2) % (320)) - 160;
      bodyPoints.forEach(p => {
        const px = cx + p.x * scale;
        const py = cy + p.y * scale;

        // Scan line hit effect
        const distToScan = Math.abs(p.y * scale - scanY);
        const scanBrightness = distToScan < 15 ? Math.max(0, 1 - distToScan / 15) : 0;

        const baseAlpha = p.a * (0.55 + Math.sin(t * 0.03 + p.phase) * 0.3) + scanBrightness * 0.8;
        ctx.globalAlpha = Math.min(1, baseAlpha);
        ctx.fillStyle = scanBrightness > 0.3 ? '#FFFFFF' : p.color;
        ctx.shadowBlur = scanBrightness > 0.3 ? 12 : 4;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.r * (1 + scanBrightness * 0.8), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      });

      // ── LASER SCAN LINE ───────────────────────────────────────────────────
      const scanLineY = cy + scanY;
      if (scanLineY > cy - 160 * scale && scanLineY < cy + 160 * scale) {
        const scanGrad = ctx.createLinearGradient(cx - 80 * scale, 0, cx + 80 * scale, 0);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.3, 'rgba(0,212,255,0.7)');
        scanGrad.addColorStop(0.5, 'rgba(0,212,255,1)');
        scanGrad.addColorStop(0.7, 'rgba(0,212,255,0.7)');
        scanGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 15; ctx.shadowColor = '#00D4FF';
        ctx.beginPath();
        ctx.moveTo(cx - 80 * scale, scanLineY);
        ctx.lineTo(cx + 80 * scale, scanLineY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Scan glow area
        const scanHalo = ctx.createLinearGradient(0, scanLineY - 8, 0, scanLineY + 8);
        scanHalo.addColorStop(0, 'rgba(0,212,255,0)');
        scanHalo.addColorStop(0.5, 'rgba(0,212,255,0.06)');
        scanHalo.addColorStop(1, 'rgba(0,212,255,0)');
        ctx.fillStyle = scanHalo;
        ctx.fillRect(cx - 85 * scale, scanLineY - 8, 170 * scale, 16);
      }

      // ── MEASUREMENT INDICATOR LINES ───────────────────────────────────────
      const measurements = [
        { y: -70, label: 'Shoulders', color: '#6C63FF' },
        { y: -25, label: 'Chest',     color: '#00D4FF' },
        { y: 30,  label: 'Waist',     color: '#FF2D78' },
        { y: 75,  label: 'Hips',      color: '#FFD700' },
      ];

      measurements.forEach(m => {
        const lineY = cy + m.y * scale;
        const halfW = (40 - Math.abs(m.y) * 0.12) * scale;
        const lineAlpha = 0.3 + Math.sin(t * 0.04 + m.y) * 0.15;

        ctx.globalAlpha = lineAlpha;
        ctx.strokeStyle = m.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 5]);
        ctx.shadowBlur = 5; ctx.shadowColor = m.color;
        ctx.beginPath();
        ctx.moveTo(cx - halfW, lineY);
        ctx.lineTo(cx + halfW, lineY);
        ctx.stroke();
        ctx.setLineDash([]);

        // End ticks + dots
        [-halfW, halfW].forEach(dx => {
          ctx.fillStyle = m.color;
          ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(cx + dx, lineY, 2.5, 0, Math.PI * 2); ctx.fill();
        });

        ctx.globalAlpha = 1; ctx.shadowBlur = 0;

        // Right label
        const lx = cx + halfW + 14;
        drawDataLabel(lx + 36, lineY, m.label, m.color, lineAlpha * 1.5);
      });

      // ── ORBITING SIZE BADGES ──────────────────────────────────────────────
      badges.forEach((b, i) => {
        const ang = ((b.ang + t * 0.12) * Math.PI) / 180;
        const float = Math.sin(t * 0.025 + i * 1.3) * 10;
        const bx = cx + Math.cos(ang) * (b.r + float * 0.3) * scale;
        const by = cy + Math.sin(ang) * (b.r * 0.5 + float * 0.2) * scale;

        // Dashed connector
        const flowT = ((t * 0.015 + i * 0.3) % 1);
        const connX = cx + (bx - cx) * flowT;
        const connY = cy + (by - cy) * flowT;
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = b.color;
        ctx.setLineDash([4, 7]);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        // Flowing dot
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 10; ctx.shadowColor = b.color;
        ctx.beginPath(); ctx.arc(connX, connY, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Badge
        const badgeAlpha = 0.75 + Math.sin(t * 0.03 + i) * 0.2;
        drawBadge3D(bx, by, b.label, b.color, badgeAlpha);
      });

      // ── CENTER RING PULSE ─────────────────────────────────────────────────
      const pulseR = 50 + Math.sin(t * 0.04) * 8;
      const pulseAlpha = 0.12 + Math.sin(t * 0.04) * 0.06;
      ctx.globalAlpha = pulseAlpha;
      ctx.strokeStyle = '#6C63FF';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 20; ctx.shadowColor = '#6C63FF';
      ctx.beginPath(); ctx.arc(cx, cy, pulseR * scale, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.targetX = ((e.clientX - W / 2) / W) * 2;
      mouseRef.current.targetY = ((e.clientY - H / 2) / H) * 2;
    };
    const handleResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted]);

  return (
    <div className="relative w-full h-full min-h-[550px]">
      {mounted && (
        <canvas ref={canvasRef} className="w-full h-full" style={{ background: 'transparent' }} />
      )}

      {/* Outer rotating ring — CSS */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-[420px] h-[420px] rounded-full"
          style={{ border: '1px dashed rgba(108,99,255,0.1)' }} />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-[540px] h-[540px] rounded-full"
          style={{ border: '1px dashed rgba(0,212,255,0.06)' }} />
      </motion.div>

      {/* Corner brackets */}
      {[
        'top-4 left-4 border-t-2 border-l-2',
        'top-4 right-4 border-t-2 border-r-2',
        'bottom-4 left-4 border-b-2 border-l-2',
        'bottom-4 right-4 border-b-2 border-r-2',
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className={`absolute w-8 h-8 ${cls} pointer-events-none`}
          style={{ borderColor: 'rgba(0,212,255,0.3)' }}
        />
      ))}

      {/* Scanning label */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
        <span className="text-accent-cyan text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
          FitPrint AI Scanning
        </span>
      </motion.div>
    </div>
  );
}
