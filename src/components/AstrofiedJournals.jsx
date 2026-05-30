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
    <section className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6`}>
      <div className="container mx-auto max-w-[1200px] flex justify-center">
        <motion.div 
          className="flex flex-col lg:flex-row w-full gap-8 lg:gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Mobile Only: Title & Text (Shown before Image) */}
          <div className="w-full flex flex-col items-center lg:hidden gap-6 mb-2">
            <h2 className="text-4xl md:text-5xl font-bold text-center drop-shadow-sm font-['Nunito']">
              {titleContent}
            </h2>
            <p className={`text-lg md:text-xl font-bold text-center leading-relaxed font-['Nunito'] px-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {textContent}
            </p>
          </div>

          {/* Left Side - Image (and Desktop Title) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {/* Desktop Only Title */}
            <h2 className="hidden lg:block text-5xl xl:text-6xl font-bold mb-8 text-center drop-shadow-sm font-['Nunito']">
              {titleContent}
            </h2>
            
            <div className="w-[95%] sm:w-[80%] lg:w-[85%] rounded-[15px] overflow-hidden shadow-2xl bg-transparent">
              <img 
                src={journalsCollage} 
                alt="Astrofied Journals Collage" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Vertical Separator Line (Hidden on mobile) */}
          <div className={`hidden lg:block w-px h-64 self-center mx-4 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>

          {/* Right Side - Buttons (and Desktop Text) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full pt-2 lg:pt-0">
            {/* Desktop Only Text */}
            <p className={`hidden lg:block text-xl lg:text-2xl font-bold mb-12 text-center leading-relaxed font-['Nunito'] ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {textContent}
            </p>
            
            {/* Buttons (Side-by-side on mobile, stacked on desktop) */}
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] mx-auto justify-center">
              <button 
                className={`flex-1 lg:w-full py-3 lg:py-4 text-xl lg:text-2xl font-bold rounded-xl lg:rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito']
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0]'
                  }
                `}
              >
                SIGN UP
              </button>
              <button 
                className={`flex-1 lg:w-full py-3 lg:py-4 text-xl lg:text-2xl font-bold rounded-xl lg:rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito']
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0]'
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
