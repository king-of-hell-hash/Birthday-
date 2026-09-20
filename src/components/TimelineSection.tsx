import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Milestone, ArrowUpRight } from 'lucide-react';
import { ChapterItem } from '../types';

interface TimelineSectionProps {
  chapters: ChapterItem[];
  name: string;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ chapters, name }) => {
  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Milestone className="w-3.5 h-3.5 text-amber-400" />
          <span>The Life Odyssey</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Another Chapter Begins...
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-light">
          Celebrating the milestones behind you and the boundless horizon awaiting ahead, {name}.
        </p>
      </div>

      {/* Vertical Timeline with Central Golden Line */}
      <div className="relative">
        {/* Glowing Center Line (Desktop) / Left Line (Mobile) */}
        <div className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-700/30 shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

        <div className="space-y-12 sm:space-y-16">
          {chapters.map((chapter, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Milestone Node on Center Line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#07080b] border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold font-cinzel text-xs shadow-[0_0_18px_rgba(212,175,55,0.7)] z-10">
                  {chapter.number}
                </div>

                {/* Content Card Container (Pushed left or right on desktop, offset left on mobile) */}
                <div
                  className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}
                >
                  <div className="group rounded-3xl p-6 sm:p-8 glass-panel border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 shadow-xl hover:-translate-y-1 relative overflow-hidden">
                    {/* Chapter Accent Tag */}
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {chapter.subtitle}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {chapter.title}
                    </h3>

                    <p className="mt-2.5 text-sm sm:text-base text-slate-300/90 font-light leading-relaxed">
                      {chapter.description}
                    </p>

                    {chapter.quote && (
                      <div
                        className={`mt-4 pt-3 border-t border-white/10 text-xs italic text-amber-300/80 font-playfair ${
                          isEven ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        "{chapter.quote}"
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
