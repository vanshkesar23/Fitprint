'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className = '', strength = 12, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frameId: number;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -strength;
      const rotY = ((x - cx) / cx) * strength;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        el!.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025,1.025,1.025)`;
      });
    }

    function onLeave() {
      cancelAnimationFrame(frameId);
      el!.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }

    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
