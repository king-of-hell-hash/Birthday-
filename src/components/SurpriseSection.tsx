import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, PartyPopper, Music, RotateCcw, Heart } from 'lucide-react';
import { fireTastefulConfetti } from '../utils/celebrationEffects';
import { globalMusicEngine } from '../utils/audioSynth';

interface SurpriseSectionProps {
  name: string;
  surpriseMessage: string;
  surpriseSubtitle: string;
  onOpenSurprise: () => void;
}

export const SurpriseSection: React.FC<SurpriseSectionProps> = ({
  name,
  surpriseMessage,
  surpriseSubtitle,
  onOpenSurprise,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    fireTastefulConfetti();
    onOpenSurprise(); // Triggers balloon release & parent effects

    // Gentle prompt to start the music if not playing
    if (!globalMusicEngine.getIsPlaying()) {
      globalMusicEngine.start();
    }
  };

  const handleResetGift = () => {
    setIsOpen(false);
  };

  return (
    <section id="surprise" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>Exclusive Token</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          I Have A Little Surprise For You...
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-light max-w-md mx-auto">
          Wrapped with warmth and crafted with love. Tap below to unveil what's waiting inside.
        </p>
      </div>

      {/* Gift Box Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[380px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED GIFT BOX VIEW */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={handleOpenGift}
            >
              {/* Animated Gift Box Visual */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-44 h-44 sm:w-52 sm:h-52 select-none"
              >
                {/* Golden Halo behind Box */}
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/35 transition-all" />

                {/* Gift Box Lid with Ribbon Bow */}
                <div className="relative z-10 mx-auto w-36 sm:w-44 h-12 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-t-xl shadow-xl flex items-center justify-center border-t border-amber-300">
                  {/* Vertical Ribbon */}
                  <div className="w-6 h-full bg-red-600 shadow-sm" />

                  {/* 3D Bow Loops */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-7 h-8 border-4 border-red-500 rounded-full rotate-[-30deg] -mr-1 shadow-md" />
                    <div className="w-3 h-3 bg-red-600 rounded-full z-10 shadow" />
                    <div className="w-7 h-8 border-4 border-red-500 rounded-full rotate-[30deg] -ml-1 shadow-md" />
                  </div>
                </div>

                {/* Gift Box Base */}
                <div className="relative z-0 mx-auto w-32 sm:w-40 h-28 sm:h-32 bg-gradient-to-br from-[#1b1e2a] via-[#12141d] to-[#0b0c12] rounded-b-2xl border border-amber-500/40 shadow-2xl flex items-center justify-center overflow-hidden">
                  {/* Vertical Ribbon on body */}
                  <div className="w-6 h-full bg-red-600 shadow-md" />
                  {/* Horizontal Ribbon */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-red-600 shadow-md" />

                  {/* Gold Sparkles Icon in center */}
                  <div className="absolute z-10 w-8 h-8 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>

              {/* Action Button */}
              <button
                id="open-gift-btn"
                onClick={e => {
                  e.stopPropagation();
                  handleOpenGift();
                }}
                className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-5 h-5 text-slate-950" />
                <span>Open Your Gift 🎁</span>
              </button>
            </motion.div>
          ) : (
            /* OPENED SURPRISE VIEW */
            <motion.div
              key="opened-surprise"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
              className="w-full glass-panel rounded-3xl p-8 sm:p-12 border border-amber-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Bursting Light Rays */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-transparent to-transparent pointer-events-none" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.6)]"
              >
                <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10" />
              </motion.div>

              {/* Requirement: Large message appears "Happy Birthday, Aryan! 🎉❤️" */}
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-gold-metallic gold-glow tracking-tight"
              >
                {surpriseMessage}
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-4 text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light"
              >
                {surpriseSubtitle}
              </motion.p>

              {/* Celebration Controls */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <button
                  id="surprise-confetti-btn"
                  onClick={() => fireTastefulConfetti()}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-amber-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>More Confetti!</span>
                </button>

                <button
                  id="reset-gift-btn"
                  onClick={handleResetGift}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Close Gift</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
