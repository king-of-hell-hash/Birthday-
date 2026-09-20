import React from 'react';
import { motion } from 'motion/react';
import { Star, HeartHandshake, Sparkles, Compass, Users, Flame, Camera, Award } from 'lucide-react';
import { ReasonItem } from '../types';

interface ReasonsSectionProps {
  reasons: ReasonItem[];
  name: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  HeartHandshake,
  Sparkles,
  Compass,
  Users,
  Flame,
  Camera,
};

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ reasons, name }) => {
  return (
    <section id="reasons" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Six Golden Virtues</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Reasons You're Special
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-light">
          Just a few of the countless qualities that make {name} irreplaceable to everyone who knows him.
        </p>
      </div>

      {/* Grid of 6 Distinct Animated Quality Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const Icon = ICON_MAP[reason.icon] || Star;

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl p-7 glass-panel border border-amber-500/20 hover:border-amber-400/40 shadow-xl transition-all duration-300"
            >
              {/* Subtle gold glow behind icon */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-amber-500/10 rounded-2xl blur-xl group-hover:bg-amber-500/20 transition-all" />

              {/* Header inside card */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-600/10 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:text-amber-200 transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400/40 text-amber-400" />
                  <span className="font-mono text-xs text-amber-300/80 font-bold">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-cinzel text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors tracking-wide">
                {reason.title}
              </h3>
              <p className="mt-2.5 text-sm text-slate-300/85 font-light leading-relaxed">
                {reason.description}
              </p>

              {/* Subtle gold border accent on hover */}
              <div className="absolute inset-x-8 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
