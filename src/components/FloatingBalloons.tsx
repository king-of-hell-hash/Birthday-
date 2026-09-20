import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Balloon {
  id: number;
  x: number; // percentage (5 to 90)
  size: number; // px width
  color: string;
  glowColor: string;
  delay: number;
  duration: number;
  drift: number;
}

interface FloatingBalloonsProps {
  active: boolean;
  count?: number;
  onPop?: () => void;
}

const BALLOON_PALETTES = [
  { color: 'radial-gradient(circle at 35% 30%, #fff6d1, #d4af37 60%, #8c6809)', glow: 'rgba(212,175,55,0.4)' },
  { color: 'radial-gradient(circle at 35% 30%, #ffffff, #e2e8f0 60%, #94a3b8)', glow: 'rgba(255,255,255,0.3)' },
  { color: 'radial-gradient(circle at 35% 30%, #fef3c7, #f59e0b 60%, #b45309)', glow: 'rgba(245,158,11,0.4)' },
  { color: 'radial-gradient(circle at 35% 30%, #fef08a, #eab308 60%, #a16207)', glow: 'rgba(234,179,8,0.35)' },
  { color: 'radial-gradient(circle at 35% 30%, #f8fafc, #cbd5e1 60%, #64748b)', glow: 'rgba(203,213,225,0.3)' },
];

export const FloatingBalloons: React.FC<FloatingBalloonsProps> = ({ active, count = 14, onPop }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!active) {
      setBalloons([]);
      return;
    }

    const generated: Balloon[] = Array.from({ length: count }, (_, i) => {
      const palette = BALLOON_PALETTES[i % BALLOON_PALETTES.length];
      return {
        id: Date.now() + i,
        x: 5 + (i * 90) / count + (Math.random() * 6 - 3),
        size: Math.floor(Math.random() * 20 + 44),
        color: palette.color,
        glowColor: palette.glow,
        delay: Math.random() * 2.5,
        duration: Math.random() * 4 + 8, // 8 - 12s rise
        drift: (Math.random() - 0.5) * 60,
      };
    });

    setBalloons(generated);
  }, [active, count]);

  const handlePop = (id: number) => {
    setPoppedIds(prev => new Set(prev).add(id));
    if (onPop) onPop();
  };

  if (!active || balloons.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {balloons.map(b => {
          if (poppedIds.has(b.id)) return null;

          return (
            <motion.div
              key={b.id}
              initial={{ y: '110vh', x: `${b.x}vw`, opacity: 0 }}
              animate={{
                y: '-25vh',
                x: [`${b.x}vw`, `${b.x + b.drift * 0.05}vw`, `${b.x}vw`],
                opacity: [0, 0.95, 1, 0.9, 0],
              }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1,
              }}
              className="absolute pointer-events-auto cursor-pointer flex flex-col items-center group"
              onClick={() => handlePop(b.id)}
              whileHover={{ scale: 1.1 }}
              title="Click to pop!"
            >
              {/* Balloon Body */}
              <div
                style={{
                  width: `${b.size}px`,
                  height: `${b.size * 1.25}px`,
                  background: b.color,
                  boxShadow: `0 10px 25px ${b.glowColor}`,
                }}
                className="rounded-[50%] relative transition-transform duration-300 group-hover:brightness-110"
              >
                {/* Specular Highlight reflection */}
                <div className="absolute top-2 left-3 w-3 h-5 bg-white/50 rounded-full blur-[1px] rotate-[-25deg]" />
                
                {/* Balloon knot */}
                <div
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-sm rotate-45"
                  style={{ background: '#ca8a04' }}
                />
              </div>

              {/* String */}
              <svg width="12" height="48" viewBox="0 0 12 48" className="overflow-visible stroke-amber-200/40">
                <path d="M6 0 Q 2 12, 6 24 T 6 48" fill="none" strokeWidth="1" />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
