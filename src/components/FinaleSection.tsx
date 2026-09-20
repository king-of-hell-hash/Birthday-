import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUp, Share2, Heart, Check } from 'lucide-react';
import { triggerFireworksShow, fireTastefulConfetti } from '../utils/celebrationEffects';

interface FinaleSectionProps {
  name: string;
  quote: string;
  signoff: string;
  onRestart: () => void;
  onTriggerBalloons: () => void;
}

export const FinaleSection: React.FC<FinaleSectionProps> = ({
  name,
  quote,
  signoff,
  onRestart,
  onTriggerBalloons,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingFireworks, setIsPlayingFireworks] = useState(false);

  const handleFireworks = () => {
    setIsPlayingFireworks(true);
    triggerFireworksShow(5000);
    onTriggerBalloons();
    setTimeout(() => setIsPlayingFireworks(false), 5000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday, ${name}! 🎂`,
          text: `Celebrate ${name}'s birthday with this dedicated experience!`,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // ignore
    }
  };

  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-28 overflow-hidden bg-gradient-to-b from-transparent via-[#08090e] to-[#040507]"
    >
      {/* Spectacular Golden Center Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-amber-500/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Salutation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.4em] text-amber-400 font-bold">
          The Grand Finale
        </p>

        <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-200 uppercase">
          HAPPY BIRTHDAY
        </h2>

        {/* Recipient Name in glowing gold */}
        <h1 className="font-cinzel text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gold-metallic gold-glow tracking-tight py-2">
          {name} 🎂
        </h1>

        {/* Poetic Birthday Blessing Quote */}
        <div className="pt-4 max-w-2xl mx-auto">
          <p className="font-playfair text-base sm:text-xl md:text-2xl text-slate-200/90 leading-relaxed sm:leading-loose whitespace-pre-line font-normal italic">
            "{quote}"
          </p>
        </div>

        {/* Signoff */}
        <div className="pt-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-amber-300 font-medium text-xs sm:text-sm tracking-wide">
            <Heart className="w-4 h-4 fill-amber-400/40 text-amber-400" />
            <span>{signoff}</span>
          </div>
        </div>

        {/* Interactive Action Controls */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            id="launch-fireworks-btn"
            onClick={handleFireworks}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(212,175,55,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{isPlayingFireworks ? 'Firing Fireworks! 🎆' : 'Launch Grand Fireworks 🎆'}</span>
          </button>

          <button
            id="share-celebration-btn"
            onClick={handleShare}
            className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-300" />
                <span>Share Aryan's Celebration</span>
              </>
            )}
          </button>

          <button
            id="scroll-to-top-btn"
            onClick={onRestart}
            className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-sm transition-all flex items-center gap-2 cursor-pointer"
            title="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Return to Top</span>
          </button>
        </div>
      </motion.div>

      {/* Footer copyright / dedication */}
      <footer className="mt-20 pt-8 border-t border-white/5 text-xs text-slate-400 font-mono">
        <p>A bespoke birthday celebration website created with love for Aryan Saleem.</p>
      </footer>
    </section>
  );
};
