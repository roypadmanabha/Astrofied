import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A map of beautiful gradients representing the gemstones' color profile
const gemstoneColorGradients = {
  pukhraj: 'linear-gradient(135deg, #FFE066 0%, #F5C400 100%)', // Yellow
  manik: 'linear-gradient(135deg, #FF6B6B 0%, #D60000 100%)',   // Ruby Red
  moti: 'radial-gradient(circle, #FDFBF7 0%, #E2DCD0 100%)',    // Pearl White
  moonga: 'linear-gradient(135deg, #FF7F50 0%, #E03C1B 100%)',  // Coral Red
  panna: 'linear-gradient(135deg, #78E08F 0%, #079992 100%)',   // Emerald Green
  neelam: 'linear-gradient(135deg, #4A00E0 0%, #00008B 100%)',  // Royal Blue
  gomed: 'linear-gradient(135deg, #D35400 0%, #7E5109 100%)',   // Hessonite Honey
  'cats-eye': 'linear-gradient(135deg, #D4D8F0 0%, #4D5656 100%)', // Chrysoberyl Grey
  opal: 'linear-gradient(135deg, #FFEBEB 0%, #D6E4F0 50%, #FFF5E4 100%)' // Multicolored sheen
};

export default function GemstoneCard({ gemstone, index }) {
  const [imgError, setImgError] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        delay: index * 0.05
      }
    }
  };

  const gradient = gemstoneColorGradients[gemstone.imageName] || 'linear-gradient(135deg, #CCC 0%, #999 100%)';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)' }}
      className="gemstone-card relative overflow-hidden bg-[#f5f5dd] rounded-2xl sm:rounded-3xl border border-[#E5DFC2] p-2.5 sm:p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300"
      style={{ backgroundColor: '#f5f5dd' }}
    >
      
      {/* Top-Left Ribbon "ASTROFIED" */}
      <div className="card-ribbon">
        ASTROFIED
      </div>

      {/* Bottom-Right Gold Corner Triangle */}
      <div className="card-gold-corner" />

      {/* Gemstone Image Frame */}
      <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center mb-2 sm:mb-6 relative">
        {gemstone.imagePath && !imgError ? (
          <img
            src={gemstone.imagePath}
            alt={gemstone.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain select-none"
            loading="lazy"
          />
        ) : (
          /* Fallback Gem Render */
          <div 
            style={{ background: gradient }}
            className="w-full h-full rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform duration-500"
          >
            {/* Gem facet reflections (simulated) */}
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white/30 blur-[1px]" />
          </div>
        )}
      </div>

      {/* Gemstone Name */}
      <h3 className="text-base sm:text-lg md:text-xl font-mulish font-extrabold mb-1 sm:mb-2 text-black leading-tight">
        {gemstone.name}
      </h3>

      {/* Planet Badge/Label */}
      <div className="mb-2 sm:mb-4 px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-[8px] sm:rounded-[10px] bg-gradient-to-r from-black to-[#D10000] text-white text-[8px] sm:text-[10px] font-mulish font-black tracking-[0.1em] sm:tracking-[0.15em] uppercase border-none shadow-sm shadow-[#D10000]/10">
        <span className="hidden sm:inline">Planet: </span>{gemstone.planet}
      </div>

      {/* Mobile Description & Read More Toggle */}
      <div className="sm:hidden w-full flex flex-col items-center mt-1">
        <AnimatePresence initial={false}>
          {showFullDesc && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden w-full"
            >
              <p className="text-[10px] sm:text-xs text-[#555555] leading-normal text-left font-mulish font-medium mb-2.5 pt-1">
                {gemstone.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setShowFullDesc(!showFullDesc)}
          className="text-[10px] font-bold text-[#D10000] hover:underline font-mulish focus:outline-none py-0.5"
        >
          {showFullDesc ? 'Read Less' : 'Read More'}
        </button>
      </div>

      {/* Desktop Description */}
      <p className="hidden sm:block text-xs md:text-sm text-[#555555] leading-relaxed text-justify font-mulish font-medium flex-grow">
        {gemstone.description}
      </p>

      {/* Scoped CSS styles */}
      <style>{`
        .card-ribbon {
          position: absolute;
          top: 14px;
          left: -28px;
          transform: rotate(-45deg);
          background-color: var(--brand-red);
          color: white;
          width: 100px;
          text-align: center;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.1em;
          padding: 3px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          z-index: 10;
        }
        @media (max-width: 639px) {
          .card-ribbon {
            top: 10px;
            left: -32px;
            width: 92px;
            font-size: 7px;
            padding: 2px 0;
          }
        }
        .card-gold-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 24px;
          height: 24px;
          background-color: var(--gold);
          clip-path: polygon(100% 0, 0 100%, 100% 100%);
          z-index: 10;
        }
      `}</style>
    </motion.div>
  );
}
