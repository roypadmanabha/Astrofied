import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import journalsCollage from '../assets/journals-collage.jpg';

const AstrofiedJournals = () => {
  const { isDarkMode } = useTheme();

  const titleContent = (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black to-red-600'}`}>
      Astrofied Journals
    </span>
  );

  const textContent = "Read our articles, journals, predictions, analyses, and insights on planets, transits, and horoscopes.";

  return (
    <section className={`py-12 md:py-24 relative flex justify-center items-center overflow-hidden px-6`}>
      
      {/* Abstract Background Glow for Glassmorphism Effect */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-700
        ${isDarkMode ? 'bg-gradient-to-r from-red-600/30 to-yellow-500/20 opacity-60' : 'bg-gradient-to-r from-red-400/20 to-amber-300/20 opacity-80'}`} 
      />

      <div className="container mx-auto max-w-[1200px] flex justify-center relative z-10">
        <motion.div 
          className={`flex flex-col lg:flex-row w-full gap-8 lg:gap-12 items-center lg:items-stretch p-6 sm:p-10 lg:p-12 rounded-[30px] sm:rounded-[40px] border backdrop-blur-xl shadow-2xl transition-all duration-500
            ${isDarkMode 
              ? 'bg-[#151320]/40 border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]' 
              : 'bg-white/60 border-white/50 shadow-[0_15px_40px_rgba(0,0,0,0.1)]'
            }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          {/* Mobile Only: Title & Text (Shown before Image) */}
          <div className="w-full flex flex-col items-center lg:hidden gap-6 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center drop-shadow-sm !font-['Nunito']">
              {titleContent}
            </h2>
            <p className={`text-lg md:text-xl text-center leading-relaxed font-['Mulish'] px-2 ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>
              {textContent}
            </p>
          </div>

          {/* Left Side - Image (and Desktop Title) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center group">
            {/* Desktop Only Title */}
            <h2 className="hidden lg:block text-5xl xl:text-6xl font-bold mb-10 text-center drop-shadow-sm !font-['Nunito']">
              {titleContent}
            </h2>
            
            <div className={`w-[95%] sm:w-[80%] lg:w-[85%] rounded-[20px] overflow-hidden transition-all duration-500 hover:scale-[1.03]
              ${isDarkMode ? 'shadow-[0_0_30px_rgba(255,215,0,0.1)] hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]' : 'shadow-2xl'}`}>
              <img 
                src={journalsCollage} 
                alt="Astrofied Journals Collage" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Vertical Separator Line (Hidden on mobile) */}
          <div className={`hidden lg:block w-[2px] h-auto self-stretch mx-4 lg:mx-8 rounded-full opacity-50 ${isDarkMode ? 'bg-gradient-to-b from-transparent via-white/20 to-transparent' : 'bg-gradient-to-b from-transparent via-black/10 to-transparent'}`}></div>

          {/* Right Side - Buttons (and Desktop Text) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full pt-4 lg:pt-0">
            {/* Desktop Only Text */}
            <p className={`hidden lg:block text-xl lg:text-2xl mb-12 text-center leading-relaxed font-['Mulish'] ${isDarkMode ? 'text-white/90' : 'text-black/80'}`}>
              {textContent}
            </p>
            
            {/* Buttons (Side-by-side on mobile, stacked on desktop) */}
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] mx-auto justify-center">
              <button 
                className={`flex-1 lg:w-full py-4 text-xl lg:text-2xl font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-xl font-['Nunito']
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000] hover:shadow-[#FFF000]/40' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0] hover:shadow-[#6200EA]/40'
                  }
                `}
              >
                SIGN UP
              </button>
              <button 
                className={`flex-1 lg:w-full py-4 text-xl lg:text-2xl font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-xl font-['Nunito']
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000] hover:shadow-[#FFF000]/40' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0] hover:shadow-[#6200EA]/40'
                  }
                `}
              >
                LOGIN
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AstrofiedJournals;
