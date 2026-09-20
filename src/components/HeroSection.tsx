import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronDown, Award, Star } from 'lucide-react';
import { fireTastefulConfetti } from '../utils/celebrationEffects';

interface HeroSectionProps {
  name: string;
  tagline: string;
  subtitle: string;
  onEnter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  tagline,
  subtitle,
  onEnter,
}) => {
  const handleCelebrationClick = () => {
    fireTastefulConfetti();
    onEnter();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle Golden Radial Glow Focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Floating Sparkle Badges */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
      >
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>{tagline}</span>
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      </motion.div>

      {/* Main Salutation Headline */}
      <div className="max-w-4xl mx-auto space-y-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-playfair text-xl sm:text-2xl md:text-3xl text-slate-300 font-light italic"
        >
          Happy Birthday,
        </motion.p>

        {/* Aryan Saleem - Premium Glowing Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-gold-metallic gold-glow relative inline-block py-2"
        >
          <span>{name}</span>
          {/* Subtle animated shimmer line beneath */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            className="h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2 opacity-80"
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl mx-auto pt-3"
        >
          <p className="font-sans-custom text-slate-300/90 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line font-light">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Enter Celebration Button & Micro-interactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          id="enter-celebration-btn"
          onClick={handleCelebrationClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
          <span>Enter Celebration</span>
          <Award className="w-5 h-5 text-slate-950/80" />
        </button>
      </motion.div>

      {/* Down indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-14 cursor-pointer text-amber-300/50 hover:text-amber-300 transition-colors"
        onClick={onEnter}
      >
        <span className="sr-only">Scroll down</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};
