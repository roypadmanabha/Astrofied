import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import gemstonesCover from '../assets/gemstones_cover.png';

export default function AstrofiedGemstones() {
  const { isDarkMode } = useTheme();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGemstoneRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      const destination = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? 'http://localhost:5002'
          : typeof window !== 'undefined' && window.location.pathname.startsWith('/Astrofied')
              ? '/Astrofied/gemstones/'
              : '/gemstones/';
      window.location.href = destination;
    }, 2000);
  };

  const titleContent = (
    <span className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-2 sm:gap-3">
      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black via-[#7B0000] to-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}>
        Astrofied
      </span>
      <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}>
        Gemstones
      </span>
    </span>
  );

  const textContent = "Astrofied Gemstones offers premium, 100% natural, lab-certified Vedic gemstones carefully selected to align with your planetary energies. Every gemstone is authentic, ethically sourced, and chosen specifically to help you overcome life's obstacles and bring positive alignment. Consult with our astrologer to find the perfect remedy that enhances your strength, health, wealth, and prosperity.";

  return (
    <section id="gemstones-intro" className={`py-16 md:py-28 relative flex justify-center items-center overflow-hidden px-6 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
            
            {/* Content Column (Title, Text, Button) */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 px-2 sm:px-6">
              
              {/* Theme-Adaptive Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 select-none font-mulish
                ${isDarkMode 
                  ? 'border-yellow-500/30 bg-yellow-500/5 text-[#ffd700]' 
                  : 'border-red-600/30 bg-red-600/5 text-[#A30000]'
                }`}
              >
                🪐 Planetary Remedies
              </div>
              
              {/* Dynamic Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[45px] leading-tight font-bold tracking-tight mb-6 font-['Nunito'] w-full">
                {titleContent}
              </h2>
              
              {/* Main Description */}
              <p className={`text-base md:text-lg xl:text-xl mb-8 lg:mb-10 text-justify lg:text-left leading-relaxed font-mulish font-normal w-full ${isDarkMode ? 'text-[whitesmoke]' : 'text-[#17202A]'}`}>
                {textContent}
              </p>
              
              {/* Redirect Button */}
              <div className="flex w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] justify-center lg:justify-start">
                <button
                  disabled={isRedirecting}
                  onClick={handleGemstoneRedirect}
                  className={`w-full px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 text-base md:text-lg lg:text-xl font-bold rounded-[10px] transition-all duration-500 ease-in-out hover:scale-105 active:scale-95 shadow-xl font-['Nunito'] flex items-center justify-center gap-2 cursor-pointer
                    ${isDarkMode
                      ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]'
                      : 'bg-gradient-to-r from-black to-red-600 text-white shadow-none hover:opacity-90'
                    }
                  `}
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 h-5 animate-spin" />
                      <span>Redirecting...</span>
                    </>
                  ) : (
                    <span>Explore Gemstones</span>
                  )}
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative order-1 lg:order-2 mb-8 lg:mb-0">
              
              {/* Concentric planetary orbit SVG */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-30">
                <svg className="w-[130%] h-[130%] text-[#ffd700]/40 dark:text-[#ffd700]/30 animate-[spin_120s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
                  <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="35" />
                  <circle cx="50" cy="50" r="25" strokeDasharray="5 2" />
                  <circle cx="50" cy="5" r="1" fill="currentColor" />
                  <circle cx="25" cy="25" r="0.7" fill="currentColor" />
                  <circle cx="85" cy="50" r="1.2" fill="currentColor" />
                </svg>
              </div>

              {/* Glowing radial backdrop */}
              {isDarkMode && (
                <div className="absolute w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.15)_0%,transparent_70%)] blur-[40px] -z-10 pointer-events-none" />
              )}

              {/* Interactive Frame Wrapper */}
              <motion.div 
                className="relative z-10 w-[85%] sm:w-[70%] lg:w-full rounded-[28px] p-1.5 bg-gradient-to-tr from-[#ffd700] via-[#ffd700]/20 to-[#ffd700] shadow-2xl"
                whileHover={{ y: -8, rotate: 1, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-full h-full rounded-[24px] overflow-hidden bg-transparent">
                  <img
                    src={gemstonesCover}
                    alt="Astrofied Gemstones Collage"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
