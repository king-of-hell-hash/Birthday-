import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles, PartyPopper, Calendar, RefreshCw } from 'lucide-react';
import { fireTastefulConfetti } from '../utils/celebrationEffects';

interface CountdownSectionProps {
  birthdayDate: string;
  name: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  birthdayDate,
  name,
}) => {
  // Allow manual preview toggle for celebration time
  const [forceCelebration, setForceCelebration] = useState(false);

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(birthdayDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0 || isNaN(diff)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const isCelebrationTime = timeLeft.isExpired || forceCelebration;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [birthdayDate]);

  useEffect(() => {
    if (isCelebrationTime) {
      fireTastefulConfetti();
    }
  }, [isCelebrationTime]);

  const toggleCelebrationMode = () => {
    const next = !forceCelebration;
    setForceCelebration(next);
    if (next) fireTastefulConfetti();
  };

  return (
    <section id="countdown" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Live Birthday Chronometer</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl text-slate-100 font-bold tracking-tight">
          {isCelebrationTime ? "It's Celebration Time! 🎉" : "The Celebration Begins In"}
        </h2>
        <p className="mt-2 text-sm text-slate-400 font-light">
          {isCelebrationTime
            ? `Raise a toast to ${name} — today is all about you!`
            : `Counting down every single second until ${name}'s big moment.`}
        </p>
      </div>

      {/* Glassmorphism Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-amber-500/20">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-amber-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-yellow-500/10 rounded-full blur-[80px]" />

        <AnimatePresence mode="wait">
          {isCelebrationTime ? (
            <motion.div
              key="celebration-active"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="py-10 text-center space-y-6"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-600/10 border border-amber-400/40 text-amber-300">
                <PartyPopper className="w-12 h-12 animate-bounce" />
              </div>

              <div>
                <h3 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-gold-metallic gold-glow">
                  It's Celebration Time! 🎉
                </h3>
                <p className="mt-3 text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                  The wait is officially over. Today we honor the ambition, wisdom, kindness, and unstoppable energy of {name}!
                </p>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  id="countdown-confetti-blast-btn"
                  onClick={() => fireTastefulConfetti()}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-amber-500/40 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Blast Confetti Again!</span>
                </button>

                <button
                  id="countdown-toggle-test-btn"
                  onClick={toggleCelebrationMode}
                  className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:bg-white/10 text-xs sm:text-sm transition-all flex items-center gap-2"
                  title="Toggle between live timer and celebration state"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Show Live Countdown</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="countdown-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map(unit => (
                  <div
                    key={unit.label}
                    className="relative group p-4 sm:p-6 rounded-2xl bg-[#090b11]/80 border border-amber-500/20 text-center shadow-lg transition-transform hover:-translate-y-1"
                  >
                    <span className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-gold-metallic tracking-wider block">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-amber-400/80 font-medium mt-1 block">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Config & Simulation Info */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-amber-300/80">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Date set to: {new Date(birthdayDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <button
                  id="simulate-celebration-btn"
                  onClick={toggleCelebrationMode}
                  className="px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preview Celebration State 🎉</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
