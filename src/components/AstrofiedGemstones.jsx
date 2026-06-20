import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import gemstonesCover from '../assets/gemstones_cover.png';
import journalBg from '../assets/journal-bg.jpg';

const AstrofiedGemstones = () => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const gemstonesUrl = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:5002'
      : typeof window !== 'undefined' && window.location.pathname.startsWith('/Astrofied')
          ? '/Astrofied/gemstones/'
          : '/gemstones/';

  const handleExplore = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = gemstonesUrl;
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

  const textContent = "Astrofied Gemstones has made authentic gemstone remedies simpler and more accessible by providing carefully selected, astrologically recommended, and energetically activated gemstones for every individual. Our goal is to spread awareness about the power of genuine gemstone remedies by making reliable guidance easy to understand and available to everyone. Through personalised recommendations and trusted astrological methods, Astrofied helps people harness the positive energies of gemstones with clarity, confidence, and transformation.";

  return (
    <section id="gemstones-landing" className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
      <div className="container mx-auto max-w-[1200px] flex justify-center relative z-10">
        <motion.div
          className={`relative overflow-hidden flex flex-col lg:flex-row w-full gap-8 lg:gap-12 items-center lg:items-stretch p-6 md:p-10 lg:p-12 rounded-[30px] bg-transparent ${isDarkMode ? 'border border-white' : 'border-none'} shadow-none`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Sketch Background Layer (Simulated Chroma Key via Mix-Blend) */}
          <div
            className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500
            ${isDarkMode ? 'hidden' : 'mix-blend-multiply opacity-20'}
          `}
            style={{
              backgroundImage: `url(${journalBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />

          {/* Wrapper to keep content above the absolute background */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">

            {/* Mobile Only: Title & Text (Shown before Image) */}
            <div className="w-full flex flex-col items-center lg:hidden gap-6 mb-2 px-4">
              <h2 className="text-[28px] sm:text-4xl md:text-5xl nunito-custom text-center w-full overflow-hidden text-ellipsis" style={{ fontFamily: '"Nunito", sans-serif' }}>
                {titleContent}
              </h2>
              <p className={`text-base md:text-lg text-justify leading-relaxed font-mulish font-normal ${isDarkMode ? 'text-[whitesmoke]' : 'text-[#17202A]'}`}>
                {typeof textContent === "string" ? textContent.split(/(Astrofied)/g).map((p,i)=>p==="Astrofied"?<span key={i} className="brand-text">Astrofied</span>:p) : textContent}
              </p>
            </div>

            {/* Left Side - Image (and Desktop Title) */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              {/* Desktop Only Title */}
              <h2 className="hidden lg:block lg:text-[37px] xl:text-[45px] nunito-custom mb-6 text-center w-[85%] leading-none tracking-tight" style={{ fontFamily: '"Nunito", sans-serif' }}>
                {titleContent}
              </h2>

              <div className="w-[95%] sm:w-[80%] lg:w-[85%] rounded-[28px] overflow-hidden shadow-2xl bg-transparent border-[1.5px] border-[#ffd700]">
                <img
                  src={gemstonesCover}
                  alt="Astrofied Gemstones Cover"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Vertical Separator Line (Hidden on mobile) */}
            <div className={`hidden lg:block w-px h-auto self-stretch mx-6 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>

            {/* Right Side - Buttons (and Desktop Text) */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full pt-2 lg:pt-0">
              {/* Desktop Only Text */}
              <p className={`hidden lg:block text-lg xl:text-xl mb-12 text-justify leading-relaxed font-mulish font-normal px-4 ${isDarkMode ? 'text-[whitesmoke]' : 'text-[#17202A]'}`}>
                {typeof textContent === "string" ? textContent.split(/(Astrofied)/g).map((p,i)=>p==="Astrofied"?<span key={i} className="brand-text">Astrofied</span>:p) : textContent}
              </p>

              {/* Buttons */}
              <div className="flex w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] mx-auto justify-center">
                <button
                  onClick={handleExplore}
                  disabled={isLoading}
                  className={`w-full py-3 lg:py-4 text-base md:text-lg lg:text-xl font-bold rounded-lg lg:rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito'] journals-explore-btn flex items-center justify-center gap-2
                ${isDarkMode
                      ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]'
                      : 'bg-gradient-to-r from-black to-red-600 text-white shadow-none hover:opacity-90'
                    }
              `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    "Explore Now"
                  )}
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AstrofiedGemstones;
