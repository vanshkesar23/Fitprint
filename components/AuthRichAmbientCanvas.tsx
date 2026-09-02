'use client';

import { useEffect, useRef } from 'react';

export default function AuthRichAmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // ── 1. NEURAL NETWORK NODES ─────────────────────────────────────────────
    const nodeCount = 48;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      color: ['#C49A6C', '#9C735D', '#D69A4D', '#66B8C9'][Math.floor(Math.random() * 4)],
    }));

    // ── 2. FLOATING MINI SIZING LABELS (XS, S, M, L, XL, XXL) ──────────────
    const sizeLabels = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, i) => ({
      size,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      scale: 0.8 + (i % 3) * 0.2,
    }));

    // ── 3. TINY MEASUREMENT INDICATORS & TELEMETRY ─────────────────────────
    const telemetryItems = [
      { text: 'CHEST: 98.4 cm',   x: 0.08, y: 0.20 },
      { text: 'WAIST: 82.1 cm',   x: 0.06, y: 0.45 },
      { text: 'HIP: 98.6 cm',     x: 0.10, y: 0.75 },
      { text: 'SHOULDER: 46cm',   x: 0.42, y: 0.15 },
      { text: 'INSEAM: 80cm',     x: 0.45, y: 0.85 },
      { text: '98.4% MATCH',      x: 0.90, y: 0.18 },
      { text: 'FIT DATA SYNCED',  x: 0.88, y: 0.48 },
      { text: 'SCAN READY',       x: 0.92, y: 0.78 },
    ];

    // ── 4. COORDINATE MARKERS ──────────────────────────────────────────────
    const coords = Array.from({ length: 10 }, (_, i) => ({
      x: (0.1 + (i * 0.09)) * width,
      y: (0.15 + ((i * 7) % 10) * 0.08) * height,
      label: `+ [${120 + i * 45}, ${340 + i * 28}]`,
    }));

    let time = 0;

    function render() {
      if (!ctx) return;
      time += 0.016;

      // Smooth Mouse Parallax Lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // ── A. ROTATING WIREFRAME RADAR RETICLES (Far Left & Right) ───────────
      [
        { cx: width * 0.08, cy: height * 0.35, radius: 90 },
        { cx: width * 0.92, cy: height * 0.65, radius: 110 },
      ].forEach((ret, idx) => {
        ctx.save();
        ctx.translate(ret.cx + mouseX * 0.2, ret.cy + mouseY * 0.2);
        ctx.rotate(time * (idx === 0 ? 0.15 : -0.1));

        ctx.strokeStyle = 'rgba(196, 154, 108, 0.08)';
        ctx.lineWidth = 1;

        // Circle ring
        ctx.beginPath();
        ctx.arc(0, 0, ret.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner dashed ring
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.arc(0, 0, ret.radius * 0.65, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(-ret.radius * 1.2, 0); ctx.lineTo(ret.radius * 1.2, 0);
        ctx.moveTo(0, -ret.radius * 1.2); ctx.lineTo(0, ret.radius * 1.2);
        ctx.stroke();

        ctx.restore();
      });

      // ── B. BIOMETRIC WAVEFORM SCANNER (Bottom) ────────────────────────────
      ctx.save();
      ctx.strokeStyle = 'rgba(196, 154, 108, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const waveY = height * 0.92;
      for (let x = 0; x < width; x += 10) {
        const y = waveY + Math.sin(x * 0.015 + time * 2) * 8 + Math.cos(x * 0.03 + time * 3) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // ── C. NEURAL NETWORK WEB (Connecting Lines & Nodes) ─────────────────
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const nx = node.x + mouseX * 0.3;
        const ny = node.y + mouseY * 0.3;

        // Draw connecting lines to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const bx = nodeB.x + mouseX * 0.3;
          const by = nodeB.y + mouseY * 0.3;
          const dist = Math.hypot(nx - bx, ny - by);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.save();
            ctx.strokeStyle = `rgba(196, 154, 108, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(bx, by);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw node
        ctx.save();
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.4 + Math.sin(time * 2 + i) * 0.2;
        ctx.shadowBlur = 6;
        ctx.shadowColor = node.color;
        ctx.beginPath();
        ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── D. FLOATING MINI SIZING LABELS ───────────────────────────────────
      sizeLabels.forEach((lbl, i) => {
        lbl.x += lbl.vx;
        lbl.y += lbl.vy;

        if (lbl.x < 0 || lbl.x > width) lbl.vx *= -1;
        if (lbl.y < 0 || lbl.y > height) lbl.vy *= -1;

        const lx = lbl.x + mouseX * 0.4;
        const ly = lbl.y + mouseY * 0.4 + Math.sin(time + i) * 10;

        ctx.save();
        ctx.font = `bold ${Math.round(11 * lbl.scale)}px "Outfit", font-mono, sans-serif`;
        ctx.fillStyle = 'rgba(196, 154, 108, 0.25)';
        ctx.strokeStyle = 'rgba(196, 154, 108, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeText(lbl.size, lx, ly);
        ctx.fillText(lbl.size, lx, ly);
        ctx.restore();
      });

      // ── E. TINY MEASUREMENT INDICATORS & TELEMETRY ───────────────────────
      telemetryItems.forEach((item, i) => {
        const tx = item.x * width + mouseX * 0.25;
        const ty = item.y * height + mouseY * 0.25 + Math.sin(time * 1.2 + i) * 6;

        ctx.save();
        ctx.font = 'bold 9px "Outfit", font-mono, sans-serif';
        ctx.fillStyle = i % 2 === 0 ? 'rgba(196, 154, 108, 0.35)' : 'rgba(102, 184, 201, 0.35)';
        ctx.fillText(`▪ ${item.text}`, tx, ty);

        // Small measurement bracket
        ctx.strokeStyle = 'rgba(196, 154, 108, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tx - 6, ty - 8); ctx.lineTo(tx - 10, ty - 8); ctx.lineTo(tx - 10, ty + 4); ctx.lineTo(tx - 6, ty + 4);
        ctx.stroke();
        ctx.restore();
      });

      // ── F. COORDINATE MARKERS ────────────────────────────────────────────
      coords.forEach(c => {
        const cxPos = c.x + mouseX * 0.15;
        const cyPos = c.y + mouseY * 0.15;

        ctx.save();
        ctx.font = '8px "Outfit", font-mono, sans-serif';
        ctx.fillStyle = 'rgba(185, 169, 157, 0.25)';
        ctx.fillText(c.label, cxPos, cyPos);
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Canvas 2D Rich Ambient Visualizer */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* ── 4 CORNER ANIMATED HUD ELEMENTS ───────────────────────────────── */}

      {/* Top-Left HUD */}
      <div className="absolute top-6 left-6 hidden lg:flex flex-col gap-1 font-mono text-[10px] text-[#C49A6C]/50 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C] animate-ping" />
          <span>[ SYS_VER: 2.4.0 ]</span>
        </div>
        <span>FIT ENGINE: ONLINE</span>
        <div className="w-16 h-[1px] bg-[#C49A6C]/30 mt-1" />
      </div>

      {/* Top-Right HUD */}
      <div className="absolute top-6 right-6 hidden lg:flex flex-col items-end gap-1 font-mono text-[10px] text-[#C49A6C]/50 pointer-events-none">
        <div className="flex items-center gap-2">
          <span>[ LATENCY: 12ms ]</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#66B8C9]" />
        </div>
        <span>NEURAL MATRIX SYNCED</span>
        <div className="w-16 h-[1px] bg-[#C49A6C]/30 mt-1" />
      </div>

      {/* Bottom-Left HUD */}
      <div className="absolute bottom-6 left-6 hidden lg:flex flex-col gap-1 font-mono text-[10px] text-[#B9A99D]/40 pointer-events-none">
        <span>● LIVE PROPORTION STREAM</span>
        <div className="flex gap-1 items-end h-3">
          <span className="w-1 bg-[#C49A6C]/50 animate-pulse h-2" />
          <span className="w-1 bg-[#C49A6C]/50 animate-pulse h-3" />
          <span className="w-1 bg-[#C49A6C]/50 animate-pulse h-1" />
          <span className="w-1 bg-[#C49A6C]/50 animate-pulse h-2.5" />
        </div>
      </div>

      {/* Bottom-Right HUD */}
      <div className="absolute bottom-6 right-6 hidden lg:flex flex-col items-end gap-1 font-mono text-[10px] text-[#B9A99D]/40 pointer-events-none">
        <span>[ SECURE AI PROTOCOL ]</span>
        <span>CLIENT-SIDE DATA ENCRYPTED</span>
      </div>
    </div>
  );
}
