import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Award } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Decorative Orbs for Light Mode (warm hues) */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-10 bg-[#FFD700] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-[100px] opacity-10 bg-[#A30000] -z-10" />

      <div className="container max-w-4xl text-center px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Small Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full bg-[#A30000]/10 border border-[#A30000]/20 text-[#A30000] text-xs font-black tracking-[0.15em] uppercase font-mulish"
          >
            Gemstone Remedies
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-mulish font-extrabold tracking-tight leading-[1.1] text-black"
          >
            Wear the Right <span className="text-[#A30000]">Stone</span> for Your Stars
          </motion.h1>

          {/* Subtitle/Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl text-justify sm:text-center font-mulish font-medium"
          >
            Every gemstone recommendation is based on your personal birth chart, planetary positions, and deep Vedic analysis. These are not generic decorative stones, but precise remedial tools selected to strengthen specific planetary energies and support your life path. Every gem is certified authentic and natural.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 justify-center gap-3 sm:gap-4 mt-6 w-full max-w-2xl px-2 sm:px-0 mx-auto"
          >
            {/* Stat Chip 1 */}
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-5 aspect-square rounded-2xl shiny-3d-box overflow-hidden">
              <div className="shiny-shine-overlay shiny-shine-overlay-1" />
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#A30000] shrink-0 z-20" />
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs md:text-sm font-bold tracking-wide text-black font-mulish text-center leading-tight z-20">
                100% Certified Stones
              </span>
            </div>

            {/* Stat Chip 2 */}
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-5 aspect-square rounded-2xl shiny-3d-box overflow-hidden">
              <div className="shiny-shine-overlay shiny-shine-overlay-2" />
              <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#A30000] shrink-0 z-20" />
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs md:text-sm font-bold tracking-wide text-black font-mulish text-center leading-tight z-20">
                Astrologer-Prescribed
              </span>
            </div>

            {/* Stat Chip 3 */}
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-5 aspect-square rounded-2xl shiny-3d-box overflow-hidden">
              <div className="shiny-shine-overlay shiny-shine-overlay-3" />
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#A30000] shrink-0 z-20" />
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs md:text-sm font-bold tracking-wide text-black font-mulish text-center leading-tight z-20">
                Lab-Tested Authenticity
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
