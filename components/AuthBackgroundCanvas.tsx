'use client';

import { useEffect, useRef, useState } from 'react';

const TELEMETRY_MESSAGES = [
  '● FITPRINT ENGINE ONLINE',
  'SYSTEM STATUS: ACTIVE & ENCRYPTED',
  'BODY PROPORTION MATRIX READY',
  '50+ BRAND CHARTS SYNCED LIVE',
  'FIT CONFIDENCE SCORE: 98.4%',
];

export default function AuthBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [telemetryIndex, setTelemetryIndex] = useState(0);

  // Cycle telemetry text every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex(prev => (prev + 1) % TELEMETRY_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Mouse Parallax position
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', onResize);

    // 1. Warm Gold/Bronze Particles
    const particleCount = 36;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.35 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      color: ['#C49A6C', '#9C735D', '#D69A4D', '#F5EFE8'][Math.floor(Math.random() * 4)],
    }));

    // 2. Floating 3D Size Badges (XS, S, M, L, XL)
    const sizeBadges = [
      { label: 'XS', x: 0.12, y: 0.25, baseSpeed: 0.0008, scale: 0.8 },
      { label: 'S',  x: 0.35, y: 0.72, baseSpeed: 0.0006, scale: 1.1 },
      { label: 'M',  x: 0.82, y: 0.28, baseSpeed: 0.0007, scale: 1.0 },
      { label: 'L',  x: 0.68, y: 0.82, baseSpeed: 0.0005, scale: 1.2 },
      { label: 'XL', x: 0.88, y: 0.55, baseSpeed: 0.0009, scale: 0.9 },
    ];

    let time = 0;
    let gridOffset = 0;
    let scanY = 0;

    function render() {
      if (!ctx) return;
      time += 0.015;
      gridOffset = (gridOffset + 0.25) % 40;
      scanY = (scanY + 0.8) % (height + 100);

      // Lerp mouse parallax for ultra-smooth movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // ── A. SLOW MOVING TECHNICAL GRID ─────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = 'rgba(196, 154, 108, 0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);

      // Vertical grid lines
      for (let x = gridOffset; x < width; x += 45) {
        ctx.beginPath();
        ctx.moveTo(x + mouseX * 0.5, 0);
        ctx.lineTo(x + mouseX * 0.5, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = gridOffset; y < height; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y + mouseY * 0.5);
        ctx.lineTo(width, y + mouseY * 0.5);
        ctx.stroke();
      }
      ctx.restore();

      // ── B. ABSTRACT BODY MEASUREMENT LINES (Left Side Wireframe) ──────────
      ctx.save();
      const bodyCenterX = width * 0.25 + mouseX;
      const bodyCenterY = height * 0.5 + mouseY;

      ctx.strokeStyle = 'rgba(196, 154, 108, 0.07)';
      ctx.lineWidth = 1.2;

      // Shoulder line
      ctx.beginPath();
      ctx.moveTo(bodyCenterX - 90, bodyCenterY - 100);
      ctx.lineTo(bodyCenterX + 90, bodyCenterY - 100);
      ctx.stroke();

      // Chest line
      ctx.beginPath();
      ctx.moveTo(bodyCenterX - 75, bodyCenterY - 40);
      ctx.lineTo(bodyCenterX + 75, bodyCenterY - 40);
      ctx.stroke();

      // Waist line
      ctx.beginPath();
      ctx.moveTo(bodyCenterX - 60, bodyCenterY + 20);
      ctx.lineTo(bodyCenterX + 60, bodyCenterY + 20);
      ctx.stroke();

      // Hip line
      ctx.beginPath();
      ctx.moveTo(bodyCenterX - 78, bodyCenterY + 80);
      ctx.lineTo(bodyCenterX + 78, bodyCenterY + 80);
      ctx.stroke();

      // Vertical spine axis
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(bodyCenterX, bodyCenterY - 150);
      ctx.lineTo(bodyCenterX, bodyCenterY + 150);
      ctx.stroke();
      ctx.restore();

      // ── C. SUBTLE SCANNING LINE (AI Body Analysis sweep) ────────────────
      ctx.save();
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY);
      scanGrad.addColorStop(0, 'rgba(196, 154, 108, 0)');
      scanGrad.addColorStop(0.5, 'rgba(196, 154, 108, 0.08)');
      scanGrad.addColorStop(1, 'rgba(102, 184, 201, 0.04)');

      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, width, 30);
      ctx.restore();

      // ── D. TINY WARM BRONZE / GOLD PARTICLES ──────────────────────────────
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const pX = p.x + mouseX * 0.3;
        const pY = p.y + mouseY * 0.3;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(pX, pY, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── E. FLOATING 3D SIZE BADGES (XS, S, M, L, XL) ─────────────────────
      sizeBadges.forEach(b => {
        const floatY = Math.sin(time * 1.5 + b.x * 10) * 15;
        const bx = b.x * width + mouseX * (0.4 * b.scale);
        const by = b.y * height + floatY + mouseY * (0.4 * b.scale);
        const badgeSize = 36 * b.scale;

        ctx.save();
        ctx.translate(bx, by);

        // Badge halo glow
        ctx.fillStyle = 'rgba(196, 154, 108, 0.03)';
        ctx.beginPath();
        ctx.arc(0, 0, badgeSize, 0, Math.PI * 2);
        ctx.fill();

        // Badge border
        ctx.strokeStyle = 'rgba(196, 154, 108, 0.18)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-badgeSize / 2, -badgeSize / 2, badgeSize, badgeSize);

        // Badge text
        ctx.fillStyle = 'rgba(245, 239, 232, 0.25)';
        ctx.font = `bold ${Math.round(11 * b.scale)}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, 0, 0);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      {/* Live Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />

      {/* Live Telemetry AI Status Indicator in corner */}
      <div className="absolute bottom-6 left-6 z-20 hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1E1714]/80 border border-[rgba(196,154,108,0.25)] backdrop-blur-md text-[10px] font-mono text-[#C49A6C] tracking-widest uppercase shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C] animate-pulse" />
        <span>{TELEMETRY_MESSAGES[telemetryIndex]}</span>
      </div>
    </>
  );
}
