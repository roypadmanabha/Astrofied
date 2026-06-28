import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import googleQr from '../assets/google_qr.jpg';
import logo from '../assets/logo.png';

export default function GooglePresence() {
  const { isDarkMode } = useTheme();

  return (
    <section 
      id="google-presence" 
      className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6 transition-colors duration-500 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}
    >
      {/* Inline styles for custom animations */}
      <style>{`
        @keyframes float-hexagon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-hexagon-float {
          animation: float-hexagon 6s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full mix-blend-screen filter blur-[100px] opacity-10 bg-[#4285F4] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full mix-blend-screen filter blur-[120px] opacity-10 bg-[#FBBC05] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] flex justify-center relative z-10">
        <motion.div
          className={`relative overflow-hidden w-full p-6 md:p-10 lg:p-12 rounded-[30px] transition-all duration-500 border
            ${isDarkMode 
              ? 'border-white bg-transparent' 
              : 'border-[#969000]'
            }`}
          style={{
            backgroundColor: isDarkMode ? 'transparent' : '#f5f5dd'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Main Flex Layout (Responsive columns) */}
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-16">
            
            {/* Left Column - Hexagonal Image Placeholder (Responsive dimensions) */}
            <div className="w-full lg:w-[40%] flex justify-center items-center">
              <div 
                className="relative w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] md:w-[270px] md:h-[270px] flex items-center justify-center animate-hexagon-float select-none"
                style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))' }}
              >
                {/* Outer Hexagon with gradient border */}
                <div 
                  className={`w-full h-full p-[2px] bg-gradient-to-br ${
                    isDarkMode 
                      ? 'from-[#ffd700] via-[#A30000] to-[#ffd700]' 
                      : 'from-[#A30000] via-[#ffd700] to-[#A30000]'
                  }`}
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  {/* Inner Hexagon container */}
                  <div 
                    className={`w-full h-full flex flex-col items-center justify-center p-6 ${
                      isDarkMode ? 'bg-[#121212]' : 'bg-[#FAF9F5]'
                    }`}
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    {/* The square QR image itself (unclipped, fully visible and scannable) */}
                    <div 
                      className={`w-[66%] h-[66%] bg-white rounded-2xl p-2 md:p-3 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                        isDarkMode ? 'shadow-black/50' : 'shadow-black/10'
                      }`}
                    >
                      <img 
                        src={googleQr} 
                        alt="Google Reviews QR Code" 
                        className="w-full h-full object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Separator Line (Hidden on mobile) */}
            <div className={`hidden lg:block w-px self-stretch ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>

            {/* Right Column - Text & Content (Responsive items alignment) */}
            <div className="w-full lg:w-[60%] flex flex-col justify-center text-center lg:text-left">
              
              {/* Google Brand Badge + Astrofied Logo */}
              <div className="flex flex-row items-center justify-between gap-4 mb-4 w-full">
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span className={`font-['Mulish'] text-xs sm:text-sm md:text-base font-black tracking-widest uppercase ${
                    isDarkMode ? 'text-white/70' : 'text-[#5A5A5A]'
                  }`}>
                    Google Verified
                  </span>
                </div>
                <div className="flex items-center">
                  <img 
                    src={logo} 
                    alt="Astrofied Logo" 
                    className="h-6 sm:h-7 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" 
                  />
                </div>
              </div>

              {/* Title Header */}
              <h2 className={`text-[26px] sm:text-3xl md:text-4xl lg:text-[38px] leading-tight font-bold tracking-tight mb-4 font-['Nunito'] ${
                isDarkMode ? 'text-white' : 'text-[#1A1A1A]'
              }`}>
                Find us on{' '}
                <span className="font-['Product_Sans','ProductSans','Nunito',sans-serif] font-bold tracking-tight text-[1.05em]">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </h2>

              {/* Subtext Paragraph */}
              <p className={`text-sm sm:text-base md:text-lg leading-relaxed text-justify mb-8 font-mulish font-medium lg:font-normal ${
                isDarkMode ? 'text-[#D8D0C0]' : 'text-[#5A5A5A]'
              }`}>
                Scan the QR code to visit our Google Profile and share your valuable feedback. Your reviews and comments help us grow and continue providing the best experience possible. Thank you for your support!
              </p>

              {/* Call to Action Button */}
              <div className="flex w-full justify-center">
                <button
                  onClick={() => window.open('https://g.page/r/CdXCyK5Vcs0yEBM/review', '_blank')}
                  className={`w-full sm:max-w-xs py-3.5 px-6 text-sm sm:text-base font-bold rounded-[10px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl font-['Nunito'] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider
                    ${isDarkMode
                      ? 'bg-[#FFF000] text-black shadow-[#FFF000]/10 hover:bg-[#FFE000]'
                      : 'bg-gradient-to-r from-black to-[#A91B0D] text-white hover:opacity-90'
                    }
                  `}
                >
                  Add Review
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
