import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
      className="gemstone-card relative overflow-hidden bg-white rounded-3xl border border-[#E5DFC2] p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300"
    >
      
      {/* Top-Left Ribbon "ASTROFIED" */}
      <div className="card-ribbon">
        ASTROFIED
      </div>

      {/* Bottom-Right Gold Corner Triangle */}
      <div className="card-gold-corner" />

      {/* Gemstone Image Frame */}
      <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-inner border border-black/5 flex items-center justify-center p-2 mb-6 relative bg-gradient-to-br from-black/5 to-transparent">
        {gemstone.imagePath && !imgError ? (
          <img
            src={gemstone.imagePath}
            alt={gemstone.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-xl select-none"
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
      <h3 className="text-lg md:text-xl font-mulish font-extrabold mb-2 text-black">
        {gemstone.name}
      </h3>

      {/* Planet Badge/Label */}
      <div className="mb-4 px-3.5 py-1 rounded-full bg-gradient-to-r from-black to-[#A30000] text-white text-[10px] font-mulish font-black tracking-[0.15em] uppercase border-none shadow-sm shadow-[#A30000]/10">
        <span className="hidden sm:inline">Planet: </span>{gemstone.planet}
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-[#555555] leading-relaxed text-justify font-mulish font-medium flex-grow">
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
