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
            className="px-4 py-1.5 rounded-[20px] bg-[#A30000]/10 border border-[#A30000]/20 text-[#A30000] text-xs font-black tracking-[0.15em] uppercase font-mulish"
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
            className="flex flex-wrap justify-center gap-4 mt-4 max-sm:grid max-sm:grid-cols-3 max-sm:gap-2.5 max-sm:w-full max-sm:max-w-2xl max-sm:px-2 max-sm:mt-6 max-sm:mx-auto"
          >
            {/* Stat Chip 1 */}
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-[#E5DFC2] shadow-md shadow-black/[0.02] max-sm:flex-col max-sm:justify-center max-sm:gap-2 max-sm:p-3 max-sm:aspect-square shiny-3d-box overflow-hidden">
              <div className="hidden max-sm:block shiny-shine-overlay shiny-shine-overlay-1" />
              <ShieldCheck className="w-5 h-5 max-sm:w-6 max-sm:h-6 text-[#A30000] shrink-0 z-20" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-black font-mulish text-center sm:text-left leading-tight sm:leading-normal max-sm:text-[9px] max-sm:min-[360px]:text-[10px] z-20">
                100% Certified Stones
              </span>
            </div>

            {/* Stat Chip 2 */}
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-[#E5DFC2] shadow-md shadow-black/[0.02] max-sm:flex-col max-sm:justify-center max-sm:gap-2 max-sm:p-3 max-sm:aspect-square shiny-3d-box overflow-hidden">
              <div className="hidden max-sm:block shiny-shine-overlay shiny-shine-overlay-2" />
              <UserCheck className="w-5 h-5 max-sm:w-6 max-sm:h-6 text-[#A30000] shrink-0 z-20" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-black font-mulish text-center sm:text-left leading-tight sm:leading-normal max-sm:text-[9px] max-sm:min-[360px]:text-[10px] z-20">
                Astrologer-Prescribed
              </span>
            </div>

            {/* Stat Chip 3 */}
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-[#E5DFC2] shadow-md shadow-black/[0.02] max-sm:flex-col max-sm:justify-center max-sm:gap-2 max-sm:p-3 max-sm:aspect-square shiny-3d-box overflow-hidden">
              <div className="hidden max-sm:block shiny-shine-overlay shiny-shine-overlay-3" />
              <Award className="w-5 h-5 max-sm:w-6 max-sm:h-6 text-[#A30000] shrink-0 z-20" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-black font-mulish text-center sm:text-left leading-tight sm:leading-normal max-sm:text-[9px] max-sm:min-[360px]:text-[10px] z-20">
                Lab-Tested Authenticity
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
