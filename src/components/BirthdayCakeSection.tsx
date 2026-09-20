import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, Sparkles, Wind, Send, Star, Check, Flame } from 'lucide-react';
import { fireTastefulConfetti } from '../utils/celebrationEffects';
import { GuestWish } from '../types';

interface BirthdayCakeSectionProps {
  name: string;
}

export const BirthdayCakeSection: React.FC<BirthdayCakeSectionProps> = ({ name }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  // Guestbook wishes state
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    const saved = localStorage.getItem('aryan_birthday_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: '1',
        author: 'Uncle Tariq & Family',
        message: 'Happy Birthday Aryan! Keep striving for the stars and making us all endlessly proud.',
        timestamp: 'Just now',
      },
      {
        id: '2',
        author: 'Zayd & the Squad',
        message: 'To the realest brother and the absolute life of every room—have the greatest year yet, Aryan!',
        timestamp: '1 hour ago',
      },
      {
        id: '3',
        author: 'Sara S.',
        message: 'Wishing you endless joy, peace, and dreams turned into reality. Happy birthday Aryan! 🎂',
        timestamp: 'Today',
      },
    ];
  });

  const [authorInput, setAuthorInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [wishSubmitted, setWishSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('aryan_birthday_wishes', JSON.stringify(wishes));
  }, [wishes]);

  const handleMakeWish = () => {
    if (!candlesLit) {
      // Re-light candles
      setCandlesLit(true);
      setWishMade(false);
      return;
    }

    setIsBlowing(true);
    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setWishMade(true);
      fireTastefulConfetti();
    }, 600);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorInput.trim() || !messageInput.trim()) return;

    const newEntry: GuestWish = {
      id: Date.now().toString(),
      author: authorInput.trim(),
      message: messageInput.trim(),
      timestamp: 'Just now',
    };

    setWishes(prev => [newEntry, ...prev]);
    setAuthorInput('');
    setMessageInput('');
    setWishSubmitted(true);
    fireTastefulConfetti();
    setTimeout(() => setWishSubmitted(false), 3000);
  };

  return (
    <section id="wishes" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Cake className="w-3.5 h-3.5 text-amber-400" />
          <span>Candles & Prayers</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Make A Wish For {name}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-light">
          Close your eyes, hold a sincere thought in your heart, and blow out the golden candles.
        </p>
      </div>

      {/* Birthday Cake Presentation Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-12 border border-amber-500/25 shadow-2xl relative overflow-hidden mb-16">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col items-center justify-center">
          {/* Animated 3-Tier Cake Illustration */}
          <div className="relative w-64 sm:w-72 h-64 flex flex-col items-center justify-end select-none">
            {/* Candles Layer */}
            <div className="flex items-end justify-center gap-4 sm:gap-6 mb-1 z-20">
              {[0, 1, 2].map(idx => (
                <div key={idx} className="flex flex-col items-center cursor-pointer" onClick={handleMakeWish}>
                  {/* Candle Flame */}
                  <div className="h-7 flex items-end justify-center">
                    <AnimatePresence>
                      {candlesLit ? (
                        <motion.div
                          key={`flame-${idx}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.2 }}
                          className="w-3.5 h-6 rounded-[50%_50%_35%_35%] bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 flame-animation shadow-[0_0_15px_rgba(251,191,36,0.9)]"
                        />
                      ) : (
                        /* Delicate smoke puff after extinguishing */
                        <motion.div
                          initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                          animate={{ opacity: 0, y: -20, scale: 1.5 }}
                          transition={{ duration: 1.2 }}
                          className="w-1.5 h-3 bg-slate-400/60 rounded-full blur-[1px]"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Candle Wick */}
                  <div className="w-[2px] h-1.5 bg-slate-400" />

                  {/* Candle Wax Body */}
                  <div className="w-3 sm:w-3.5 h-10 sm:h-12 bg-gradient-to-b from-amber-200 via-yellow-100 to-amber-300 rounded-t-sm shadow-md border-x border-amber-400/30 relative">
                    <div className="absolute inset-x-0 top-2 h-[2px] bg-amber-500/40" />
                    <div className="absolute inset-x-0 top-5 h-[2px] bg-amber-500/40" />
                  </div>
                </div>
              ))}
            </div>

            {/* Top Tier (Smallest) */}
            <div className="w-28 sm:w-32 h-10 bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-600 rounded-t-xl border-t border-amber-300 shadow-md relative z-10 flex items-center justify-center">
              {/* White frosting drip */}
              <div className="absolute -top-1 inset-x-0 h-2 bg-amber-100/90 rounded-full blur-[0.5px]" />
              <span className="text-[10px] font-cinzel font-bold text-slate-950 uppercase tracking-wider">
                Aryan
              </span>
            </div>

            {/* Middle Tier */}
            <div className="w-40 sm:w-48 h-12 bg-gradient-to-r from-[#171924] via-[#242838] to-[#171924] border-t-2 border-amber-500/40 shadow-lg relative z-0 flex items-center justify-center">
              <div className="flex gap-2">
                <Sparkles className="w-3 h-3 text-amber-400/80" />
                <Sparkles className="w-3 h-3 text-amber-300" />
                <Sparkles className="w-3 h-3 text-amber-400/80" />
              </div>
            </div>

            {/* Bottom Tier (Base) */}
            <div className="w-56 sm:w-64 h-16 bg-gradient-to-r from-amber-800 via-amber-600 to-yellow-700 rounded-b-2xl border-t border-amber-300 shadow-2xl relative flex items-center justify-center">
              <div className="h-[2px] w-4/5 bg-amber-200/50 rounded-full" />
            </div>

            {/* Cake Stand / Silver Gold Platter */}
            <div className="w-64 sm:w-72 h-3 bg-gradient-to-r from-slate-600 via-slate-200 to-slate-600 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.8)] mt-0.5" />
          </div>

          {/* Blowing Status or Result */}
          <div className="mt-8 text-center min-h-[70px]">
            <AnimatePresence mode="wait">
              {wishMade ? (
                <motion.div
                  key="wish-granted"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="space-y-2"
                >
                  <p className="font-cinzel text-2xl sm:text-3xl font-extrabold text-gold-metallic gold-glow">
                    May your wish come true, {name}! 🌟
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 font-light">
                    The universe has recorded your wish. May this year be your happiest and most successful yet!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="wish-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                    {isBlowing ? 'Blowing out the candles...' : 'Think of a genuine heartfelt wish, then blow the candles.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Button */}
          <div className="mt-4">
            <button
              id="make-a-wish-btn"
              onClick={handleMakeWish}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              {candlesLit ? (
                <>
                  <Wind className="w-5 h-5 text-slate-950" />
                  <span>Make A Wish ✨</span>
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5 text-slate-950" />
                  <span>Re-light Candles & Wish Again 🕯️</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Guest Wishes & Prayers Digital Board */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100">
              Wishes For Aryan's New Year
            </h3>
            <p className="text-xs text-slate-400">
              Leave a birthday note or blessing for Aryan to cherish forever.
            </p>
          </div>
          <div className="text-xs font-mono text-amber-400/80 bg-amber-500/10 px-3 py-1 rounded-full self-start sm:self-auto border border-amber-500/20">
            {wishes.length} Wishes Collected
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddWish} className="mb-8 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Your Name / Relation"
              value={authorInput}
              onChange={e => setAuthorInput(e.target.value)}
              className="sm:col-span-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              required
              placeholder="Write a sweet birthday wish for Aryan..."
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">
              {wishSubmitted && (
                <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Wish recorded with love!
                </span>
              )}
            </span>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Wish</span>
            </button>
          </div>
        </form>

        {/* Wishes List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishes.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#090b11]/70 border border-amber-500/15 hover:border-amber-400/30 transition-colors shadow-sm text-left flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-slate-200 font-light italic leading-relaxed mb-3">
                "{item.message}"
              </p>
              <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-slate-400">
                <span className="font-semibold text-amber-300 font-cinzel">
                  — {item.author}
                </span>
                <span className="text-slate-500 font-mono">{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
