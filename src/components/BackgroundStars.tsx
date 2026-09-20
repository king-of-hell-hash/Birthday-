import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

interface GoldParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
}

export const BackgroundStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palette of midnight sky & warm gold
    const starColors = ['#ffffff', '#fff8db', '#fde68a', '#d4af37', '#e2e8f0'];

    const numStars = Math.min(120, Math.floor((width * height) / 9000));
    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    const numParticles = Math.min(30, Math.floor(width / 35));
    const particles: GoldParticle[] = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1, // gentle upward drift
      alpha: Math.random() * 0.4 + 0.1,
      maxAlpha: Math.random() * 0.4 + 0.3,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.phase += s.twinkleSpeed;
        }
        const alpha = Math.max(0.1, Math.min(1, s.baseAlpha + Math.sin(s.phase) * 0.35));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.radius > 1.2 ? 6 : 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render floating gold specks
      if (!prefersReducedMotion) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = '#f59e0b';
          ctx.shadowColor = '#d4af37';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep luxury ambient glow patches */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-600/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[150px]" />
      
      {/* Canvas for fine starfield and gold floating specks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
