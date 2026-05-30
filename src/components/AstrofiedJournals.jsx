import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import journalsCollage from '../assets/journals-collage.jpg';

const AstrofiedJournals = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6`}>
      <div className="container mx-auto max-w-[1200px] flex justify-center">
        <motion.div 
          className="flex flex-col lg:flex-row w-full gap-8 lg:gap-12 items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Left Side - Title and Image */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 flex gap-2 text-center lg:text-left drop-shadow-sm font-['Mulish']">
              <span className={isDarkMode ? 'text-red-600' : 'text-[#6b0000]'}>
                Astrofied
              </span>
              <span className={isDarkMode ? 'text-[#FFD700]' : 'text-red-600'}>
                Journals
              </span>
            </h2>
            
            <div className="w-full max-w-md lg:max-w-full rounded-[15px] overflow-hidden shadow-2xl bg-transparent">
              <img 
                src={journalsCollage} 
                alt="Astrofied Journals Collage" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Vertical Separator Line (Hidden on mobile) */}
          <div className={`hidden lg:block w-px h-auto self-stretch mx-4 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
          {/* Horizontal Separator Line for Mobile */}
          <div className={`block lg:hidden w-full max-w-md h-px my-4 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>

          {/* Right Side - Text and Buttons */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center h-full pt-4 lg:pt-16">
            <p className={`text-lg md:text-xl lg:text-2xl font-bold mb-10 text-center lg:text-left leading-relaxed font-['Nunito'] ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Read our articles, journals, predictions, analyses, and insights on planets, transits, and horoscopes.
            </p>
            
            <div className="flex flex-col gap-5 w-full max-w-[320px]">
              <button 
                className={`w-full py-4 text-xl md:text-2xl font-bold rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito']
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0]'
                  }
                `}
              >
                SIGN UP
              </button>
              <button 
                className={`w-full py-4 text-xl md:text-2xl font-bold rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito']
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
