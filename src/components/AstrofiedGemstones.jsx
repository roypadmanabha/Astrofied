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
    <span className="whitespace-nowrap inline-flex items-center justify-center gap-3">
      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black via-[#7B0000] to-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 650, letterSpacing: '-0.03em' }}>
        Astrofied
      </span>
      <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 650, letterSpacing: '-0.03em' }}>
        Gemstones
      </span>
    </span>
  );

  const textContent = "Astrofied Gemstones offers premium, 100% natural, lab-certified Vedic gemstones carefully selected to align with your planetary energies. Every gemstone is authentic, ethically sourced, and chosen specifically to help you overcome life's obstacles and bring positive alignment. Consult with our astrologer to find the perfect remedy that enhances your strength, health, wealth, and prosperity.";

  return (
    <section id="gemstones-intro" className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
      <div className="container mx-auto max-w-[1200px] flex justify-center relative z-10">
        <motion.div
          className={`relative overflow-hidden flex flex-col lg:flex-row w-full gap-8 lg:gap-12 items-center lg:items-stretch p-6 md:p-10 lg:p-12 rounded-[30px] bg-transparent ${isDarkMode ? 'border border-white' : 'border-none'} shadow-none`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Wrapper to keep content above backgrounds */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
            
            {/* Mobile Only: Title & Text (Shown before Image) */}
            <div className="w-full flex flex-col items-center lg:hidden gap-6 mb-2 px-4">
              <h2 className="text-[28px] sm:text-4xl md:text-5xl text-center w-full overflow-hidden text-ellipsis" style={{ fontFamily: '"Nunito", sans-serif' }}>
                {titleContent}
              </h2>
              <p className={`text-base md:text-lg text-justify leading-relaxed font-mulish font-normal ${isDarkMode ? 'text-[whitesmoke]' : 'text-[#17202A]'}`}>
                {textContent}
              </p>
            </div>

            {/* Left Side - Text & Redirect Button (Desktop) / Buttons on Mobile */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full pt-2 lg:pt-0">
              {/* Desktop Only Text */}
              <p className={`hidden lg:block text-lg xl:text-xl mb-12 text-justify leading-relaxed font-mulish font-normal px-4 ${isDarkMode ? 'text-[whitesmoke]' : 'text-[#17202A]'}`}>
                {textContent}
              </p>

              {/* Redirect Button */}
              <div className="flex w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] mx-auto justify-center">
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

            {/* Vertical Separator Line (Hidden on mobile) */}
            <div className={`hidden lg:block w-px h-auto self-stretch mx-6 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>

            {/* Right Side - Title & Image (Desktop) / Image on Mobile */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              {/* Desktop Only Title */}
              <h2 className="hidden lg:block lg:text-[37px] xl:text-[45px] mb-6 text-center w-[85%] leading-none tracking-tight" style={{ fontFamily: '"Nunito", sans-serif' }}>
                {titleContent}
              </h2>

              <div className="w-[95%] sm:w-[80%] lg:w-[85%] rounded-[28px] overflow-hidden shadow-2xl bg-transparent border-[1.5px] border-[#ffd700]">
                <img
                  src={gemstonesCover}
                  alt="Astrofied Gemstones Collage"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
