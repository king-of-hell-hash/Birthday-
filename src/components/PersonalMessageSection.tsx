import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Sparkles, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';

interface PersonalMessageSectionProps {
  name: string;
  message: string;
}

export const PersonalMessageSection: React.FC<PersonalMessageSectionProps> = ({
  name,
  message,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (!isInView || isSkipped) {
      if (isSkipped) {
        setDisplayedText(message);
        setIsTypingComplete(true);
      }
      return;
    }

    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const speed = 18; // ms per char
    const timer = setInterval(() => {
      index++;
      if (index <= message.length) {
        setDisplayedText(message.slice(0, index));
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isInView, isSkipped, message]);

  const handleReplay = () => {
    setIsSkipped(false);
    setDisplayedText('');
    setIsTypingComplete(false);
    let index = 0;
    const speed = 18;
    const timer = setInterval(() => {
      index++;
      if (index <= message.length) {
        setDisplayedText(message.slice(0, index));
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, speed);
  };

  const handleShowInstant = () => {
    setIsSkipped(true);
    setDisplayedText(message);
    setIsTypingComplete(true);
  };

  return (
    <section
      id="message"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      {/* Subtle backdrop ornament */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>Written With Care</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          A Message For {name}
        </h2>
        <p className="mt-2 text-sm text-slate-400 font-light">
          A heartfelt note written specifically for this momentous milestone.
        </p>
      </div>

      {/* Luxury Royal Letter Parchment Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative rounded-3xl bg-[#0c0e16]/90 border border-amber-500/30 p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
      >
        {/* Ornate Gold Corner Filigrees */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500/40 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500/40 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500/40 rounded-br-lg" />

        {/* Ambient Warm Corner Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px]" />

        {/* Wax Seal Monogram Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-700 flex items-center justify-center text-slate-950 font-bold font-cinzel text-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-amber-300">
              A
            </div>
            <div>
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                Official Birthday Note
              </span>
              <span className="text-xs text-slate-400">Dedicated to {name}</span>
            </div>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-2">
            {!isTypingComplete && (
              <button
                id="skip-typewriter-btn"
                onClick={handleShowInstant}
                className="text-[11px] text-amber-300/80 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Skip animation
              </button>
            )}
            {isTypingComplete && (
              <button
                id="replay-typewriter-btn"
                onClick={handleReplay}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 text-xs transition-colors flex items-center gap-1 cursor-pointer"
                title="Replay typewriter effect"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Replay</span>
              </button>
            )}
          </div>
        </div>

        {/* The Typewritten Message Content */}
        <div className="min-h-[220px] font-playfair text-base sm:text-xl md:text-2xl text-slate-200 leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-5 ml-1 bg-amber-400 animate-pulse align-middle" />
          )}
        </div>

        {/* Footer with Heart & Wax Stamp */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans-custom">
          <div className="flex items-center gap-2 text-amber-400/90">
            <Heart className="w-4 h-4 fill-amber-400/30 text-amber-400" />
            <span className="font-medium">Crafted with endless admiration & warm wishes</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Delivered on Aryan's Special Day</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
