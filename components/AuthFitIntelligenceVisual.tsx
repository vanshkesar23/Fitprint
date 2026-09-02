'use client';

import { useEffect, useRef } from 'react';

export default function AuthFitIntelligenceVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.08;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.08;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', onResize);

    // ── 3D BODY LANDMARK NODES ──────────────────────────────────────────────
    const landmarks = [
      { label: 'SHOULDER: 46cm', relY: -0.22, relX: 0.26, side: 'right' },
      { label: 'CHEST: 98cm',    relY: -0.10, relX: -0.24, side: 'left' },
      { label: 'WAIST: 82cm',    relY: 0.06,  relX: 0.23, side: 'right' },
      { label: 'HIP: 98cm',      relY: 0.22,  relX: -0.25, side: 'left' },
      { label: 'FIT MATCH 98%', relY: -0.36, relX: 0.0,   side: 'center' },
    ];

    // ── ORBITING SIZE NODES (XS, S, M, L, XL) ──────────────────────────────
    const sizeNodes = [
      { size: 'XS', angle: 0,   speed: 0.008, color: '#C49A6C' },
      { size: 'S',  angle: 72,  speed: 0.008, color: '#D69A4D' },
      { size: 'M',  angle: 144, speed: 0.008, color: '#F5EFE8' },
      { size: 'L',  angle: 216, speed: 0.008, color: '#C49A6C' },
      { size: 'XL', angle: 288, speed: 0.008, color: '#9C735D' },
    ];

    let time = 0;
    let scanYProg = 0;

    function render() {
      if (!ctx) return;
      time += 0.018;
      scanYProg = (scanYProg + 0.008) % 1;

      // Mouse Parallax Damping
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY + 10;
      const bodyScale = Math.min(width, height) * 0.42;

      // ── 1. AMBIENT BACKDROP GLOW ──────────────────────────────────────────
      const bgGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, bodyScale * 1.5);
      bgGlow.addColorStop(0, 'rgba(196, 154, 108, 0.12)');
      bgGlow.addColorStop(0.5, 'rgba(156, 115, 93, 0.04)');
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, bodyScale * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // ── 2. HOLOGRAPHIC ROTATING RINGS ─────────────────────────────────────
      [0.9, 1.25, 1.6].forEach((rMul, idx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * (idx % 2 === 0 ? 0.3 : -0.2) + idx);
        ctx.scale(1, 0.38);

        ctx.strokeStyle = `rgba(196, 154, 108, ${0.14 - idx * 0.03})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([idx === 1 ? 6 : 12, 10]);

        ctx.beginPath();
        ctx.arc(0, 0, bodyScale * rMul, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // ── 3. ABSTRACT MANNEQUIN WIREFRAME ───────────────────────────────────
      const bodyRot = Math.sin(time * 0.6) * 0.08;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(bodyRot);

      ctx.strokeStyle = 'rgba(196, 154, 108, 0.55)';
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#C49A6C';

      // Head
      ctx.beginPath();
      ctx.ellipse(0, -bodyScale * 0.42, bodyScale * 0.08, bodyScale * 0.1, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Neck
      ctx.beginPath();
      ctx.moveTo(0, -bodyScale * 0.32);
      ctx.lineTo(0, -bodyScale * 0.26);
      ctx.stroke();

      // Torso Contour (Shoulders -> Waist -> Hips)
      const sW = bodyScale * 0.28;
      const wW = bodyScale * 0.18;
      const hW = bodyScale * 0.25;

      ctx.beginPath();
      // Shoulders
      ctx.moveTo(-sW, -bodyScale * 0.24);
      ctx.lineTo(sW, -bodyScale * 0.24);
      // Right side torso
      ctx.lineTo(wW, -bodyScale * 0.02);
      ctx.lineTo(hW, bodyScale * 0.22);
      // Inseam base
      ctx.lineTo(0, bodyScale * 0.28);
      // Left side torso
      ctx.lineTo(-hW, bodyScale * 0.22);
      ctx.lineTo(-wW, -bodyScale * 0.02);
      ctx.closePath();
      ctx.stroke();

      // Horizontal measurement cross-bars
      [
        { y: -bodyScale * 0.22, w: sW * 0.95 },
        { y: -bodyScale * 0.10, w: sW * 0.8 },
        { y: 0.0, w: wW * 0.9 },
        { y: bodyScale * 0.20, w: hW * 0.95 }
      ].map(bar => {
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 239, 232, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(-bar.w, bar.y);
        ctx.lineTo(bar.w, bar.y);
        ctx.stroke();
        ctx.restore();
      });

      ctx.restore();

      // ── 4. CONTINUOUS SWEEPING SCANNING BEAM ─────────────────────────────
      const scanTop = cy - bodyScale * 0.55;
      const scanBot = cy + bodyScale * 0.45;
      const currentScanY = scanTop + (scanBot - scanTop) * scanYProg;

      ctx.save();
      const scanGrad = ctx.createLinearGradient(0, currentScanY - 20, 0, currentScanY + 4);
      scanGrad.addColorStop(0, 'rgba(196, 154, 108, 0)');
      scanGrad.addColorStop(0.7, 'rgba(196, 154, 108, 0.35)');
      scanGrad.addColorStop(1, 'rgba(245, 239, 232, 0.9)');

      ctx.fillStyle = scanGrad;
      ctx.fillRect(cx - bodyScale * 0.7, currentScanY - 20, bodyScale * 1.4, 24);

      // Scan beam edge line
      ctx.strokeStyle = '#F5EFE8';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#C49A6C';
      ctx.beginPath();
      ctx.moveTo(cx - bodyScale * 0.7, currentScanY);
      ctx.lineTo(cx + bodyScale * 0.7, currentScanY);
      ctx.stroke();
      ctx.restore();

      // ── 5. LANDMARK DATA LABELS & GLOW NODES ─────────────────────────────
      landmarks.forEach((lm, i) => {
        const lx = cx + lm.relX * bodyScale;
        const ly = cy + lm.relY * bodyScale;
        const pulse = 1 + Math.sin(time * 3 + i) * 0.25;

        // Glowing node dot
        ctx.save();
        ctx.fillStyle = '#C49A6C';
        ctx.shadowBlur = 12 * pulse;
        ctx.shadowColor = '#C49A6C';
        ctx.beginPath();
        ctx.arc(lx, ly, 4 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connector line & label text
        ctx.save();
        ctx.strokeStyle = 'rgba(196, 154, 108, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);

        const lineEndX = lm.side === 'right' ? lx + 45 : lm.side === 'left' ? lx - 45 : lx;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lineEndX, ly);
        ctx.stroke();

        // Label box
        ctx.font = 'bold 10px "Outfit", font-mono, sans-serif';
        ctx.fillStyle = lm.side === 'center' ? '#C49A6C' : '#F5EFE8';
        ctx.textAlign = lm.side === 'right' ? 'left' : lm.side === 'left' ? 'right' : 'center';
        ctx.textBaseline = 'middle';

        const textX = lm.side === 'right' ? lineEndX + 6 : lm.side === 'left' ? lineEndX - 6 : lx;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#C49A6C';
        ctx.fillText(lm.label, textX, ly);
        ctx.restore();
      });

      // ── 6. ORBITING 3D SIZE NODES (XS, S, M, L, XL) ─────────────────────
      sizeNodes.forEach((node, i) => {
        node.angle += node.speed;
        const rad = (node.angle * Math.PI) / 180;
        const rx = Math.cos(rad) * (bodyScale * 0.85);
        const ry = Math.sin(rad) * (bodyScale * 0.32);
        const zScale = 0.85 + (Math.sin(rad) + 1) * 0.25;

        const nx = cx + rx;
        const ny = cy + ry + Math.sin(time * 2 + i) * 8;

        ctx.save();
        ctx.translate(nx, ny);

        // Halo
        ctx.fillStyle = `rgba(196, 154, 108, ${0.15 * zScale})`;
        ctx.beginPath();
        ctx.arc(0, 0, 22 * zScale, 0, Math.PI * 2);
        ctx.fill();

        // Laser beam connection from body center to size node
        ctx.strokeStyle = `rgba(196, 154, 108, ${0.15 * zScale})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(cx - nx, cy - ny);
        ctx.stroke();

        // Node Disk
        ctx.fillStyle = '#2A201C';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.5 * zScale;
        ctx.shadowBlur = 14 * zScale;
        ctx.shadowColor = node.color;

        ctx.beginPath();
        ctx.arc(0, 0, 16 * zScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = node.color;
        ctx.font = `black ${Math.round(11 * zScale)}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.size, 0, 0);

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
    <div className="relative w-full aspect-square max-w-[420px] mx-auto my-6 flex items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
