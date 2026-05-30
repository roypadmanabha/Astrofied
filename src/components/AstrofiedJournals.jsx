import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import journalsCollage from '../assets/journals-collage.jpg';

const AstrofiedJournals = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-stretch"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Left Side - Title and Image */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start">
            <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 flex gap-3 text-center lg:text-left drop-shadow-sm">
              <span className={isDarkMode ? 'text-red-600' : 'text-[#5C0000]'}>
                Astrofied
              </span>
              <span className={isDarkMode ? 'text-[#FFB800]' : 'text-red-600'}>
                Journals
              </span>
            </h2>
            
            <div className="w-full max-w-lg lg:max-w-none rounded-[15px] overflow-hidden shadow-2xl">
              <img 
                src={journalsCollage} 
                alt="Astrofied Journals Collage" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Vertical/Horizontal Separator Line */}
          <div className={`w-full lg:w-px h-px lg:h-auto self-stretch my-6 lg:my-0 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>

          {/* Right Side - Text and Buttons */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start justify-center pt-0 lg:pt-16">
            <p className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-12 text-center lg:text-left leading-[1.6] ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Read our articles, journals, predictions, analyses, and insights on planets, transits, and horoscopes.
            </p>
            
            <div className="flex flex-col gap-6 w-full max-w-sm lg:ml-10">
              <button 
                className={`w-full py-4 md:py-5 text-2xl md:text-3xl font-bold rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0]'
                  }
                `}
              >
                SIGN UP
              </button>
              <button 
                className={`w-full py-4 md:py-5 text-2xl md:text-3xl font-bold rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl
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
