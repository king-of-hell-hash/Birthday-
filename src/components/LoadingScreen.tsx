import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  name?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  name = 'Aryan',
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Elegant fast-loading progress (~1.8s)
    const interval = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        const increment = Math.random() * 22 + 10;
        return Math.min(100, Math.floor(prev + increment));
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080B] text-center px-6 selection:bg-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Golden Crest Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-600/5 border border-amber-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.25)]">
              <span className="font-cinzel text-3xl font-bold text-gold-metallic">
                A
              </span>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1.5 -right-1.5"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
            </motion.div>
          </motion.div>

          {/* Elegant Loading Copy */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2 max-w-md"
          >
            <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-amber-400/80 font-semibold">
              The Celebration Unfolds
            </p>
            <h2 className="font-playfair text-xl md:text-2xl text-slate-100 font-medium">
              Preparing something special for {name}...
            </h2>
          </motion.div>

          {/* Minimalist Gold Progress Bar */}
          <div className="mt-8 w-56 max-w-full">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
            <div className="mt-2.5 flex justify-between text-[11px] font-mono text-amber-300/60 tracking-wider">
              <span>INITIALIZING</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
