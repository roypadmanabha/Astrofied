import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// TODO: replace with the live deployed URL of the standalone "Astrofied Gemstones" page once hosted
const GEMSTONES_PAGE_URL = "/gemstones";

export default function GemstoneRemediesTeaser() {
  const { isDarkMode } = useTheme();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGemstoneRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      const destination = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? 'http://localhost:5004'
          : typeof window !== 'undefined' && window.location.pathname.startsWith('/Astrofied')
              ? '/Astrofied/gemstones/'
              : '/gemstones/';
      window.location.href = destination;
    }, 2000);
  };

  return (
    <section 
      id="gemstone-teaser" 
      className={`py-16 md:py-24 lg:py-28 px-6 relative flex justify-center items-center overflow-hidden z-10 transition-colors duration-500 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}
    >
      {/* Inline styles for lightweight pure CSS animations */}
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-3deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .gem-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: no-preference) {
          .animate-gem-1 { animation: float-1 5s ease-in-out infinite; }
          .animate-gem-2 { animation: float-2 6.5s ease-in-out infinite; }
          .animate-gem-3 { animation: float-3 5.8s ease-in-out infinite; }
          .animate-gem-4 { animation: float-4 4.8s ease-in-out infinite; }
          .animate-gem-5 { animation: float-5 7s ease-in-out infinite; }
          .animate-star { animation: twinkle var(--star-dur) ease-in-out infinite; }
        }
      `}</style>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column (Content & CTA) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 animate-fade-in">
            
            {/* Pill Badge */}
            <div className={`inline-flex items-center px-4 py-1.5 rounded-[10px] border text-xs font-bold tracking-widest uppercase mb-6 select-none font-mulish
              ${isDarkMode 
                ? 'border-[#C9A227]/40 bg-[#C9A227]/5 text-[#C9A227]' 
                : 'border-[#A91B0D]/40 bg-[#A91B0D]/5 text-[#A91B0D]'
              }`}
            >
              REMEDIAL ASTROLOGY
            </div>
            
            {/* Heading */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[45px] leading-tight font-bold tracking-tight mb-6 font-['Nunito'] w-full ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              Unlock Your Planetary{' '}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#D6321E] to-[#C9A227] font-bold"
                style={{
                  textShadow: isDarkMode ? '0 0 20px rgba(214, 50, 30, 0.4)' : 'none',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Power
              </span>
            </h2>
            
            {/* Copy Paragraph */}
            <p className={`text-base md:text-lg xl:text-xl leading-relaxed text-justify lg:text-left font-mulish font-normal mb-8 lg:mb-10 w-full ${isDarkMode ? 'text-[#D8D0C0]' : 'text-[#5A5A5A]'}`}>
              Every gemstone is carefully prescribed by our astrologer based on your unique birth chart, serving as a personalized remedy rather than a generic accessory. The right stone works to align planetary energies, strengthen weak houses, and actively support your life goals—whether in career, health, relationships, or overall prosperity.
            </p>
            
            {/* CTA Button */}
            <div className="flex w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] justify-center lg:justify-start">
              <button
                disabled={isRedirecting}
                onClick={handleGemstoneRedirect}
                className={`w-full py-3.5 sm:py-4 px-6 sm:px-8 text-base sm:text-lg md:text-xl font-bold rounded-[10px] transition-all duration-500 ease-in-out hover:scale-105 active:scale-95 shadow-xl font-['Nunito'] flex items-center justify-center gap-2 cursor-pointer
                  ${isDarkMode
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]'
                    : 'bg-gradient-to-r from-black to-[#A91B0D] text-white hover:opacity-90'
                  }
                `}
              >
                {isRedirecting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 h-5 animate-spin" />
                    <span>Redirecting...</span>
                  </>
                ) : (
                  <span>Explore Gemstones →</span>
                )}
              </button>
            </div>
          </div>

          {/* Right Column (Animated Showcase centerpiece) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative order-1 lg:order-2 mb-8 lg:mb-0">
            
            {/* Outer container sizing */}
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] flex items-center justify-center select-none pointer-events-none">
              
              {/* Sparkle Twinkles */}
              <svg viewBox="0 0 100 100" className="w-5 h-5 absolute animate-star" style={{ '--star-dur': '2.1s', top: '10%', left: '42%' }}>
                <path d="M50,0 L58,42 L100,50 L58,58 L50,100 L42,58 L0,50 L42,42 Z" fill={isDarkMode ? '#FFFFFF' : '#A91B0D'} />
              </svg>
              <svg viewBox="0 0 100 100" className="w-4 h-4 absolute text-[#C9A227] animate-star" style={{ '--star-dur': '1.8s', top: '22%', right: '28%' }}>
                <path d="M50,0 L58,42 L100,50 L58,58 L50,100 L42,58 L0,50 L42,42 Z" fill="#C9A227" />
              </svg>
              <svg viewBox="0 0 100 100" className="w-3 h-3 absolute animate-star" style={{ '--star-dur': '2.5s', bottom: '15%', left: '25%' }}>
                <path d="M50,0 L58,42 L100,50 L58,58 L50,100 L42,58 L0,50 L42,42 Z" fill={isDarkMode ? '#FFFFFF' : '#A91B0D'} />
              </svg>
              <svg viewBox="0 0 100 100" className="w-4 h-4 absolute text-[#C9A227] animate-star" style={{ '--star-dur': '1.5s', bottom: '8%', right: '35%' }}>
                <path d="M50,0 L58,42 L100,50 L58,58 L50,100 L42,58 L0,50 L42,42 Z" fill="#C9A227" />
              </svg>
              <svg viewBox="0 0 100 100" className="w-3 h-3 absolute animate-star" style={{ '--star-dur': '2.3s', top: '45%', left: '15%' }}>
                <path d="M50,0 L58,42 L100,50 L58,58 L50,100 L42,58 L0,50 L42,42 Z" fill={isDarkMode ? '#FFFFFF' : '#A91B0D'} />
              </svg>
              <svg viewBox="0 0 100 100" className="w-5 h-5 absolute text-[#C9A227] animate-star" style={{ '--star-dur': '2.0s', bottom: '48%', right: '12%' }}>
                <path d="M50,0 L58,42 L100,50 L58,58 L50,100 L42,58 L0,50 L42,42 Z" fill="#C9A227" />
              </svg>

              {/* Gem 1: Large Red Ruby (Center) */}
              <div 
                className="absolute w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 z-20 animate-gem-1"
                style={{
                  top: '35%',
                  left: '35%',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(214,50,30,0.65)] gem-glow-pulse">
                  <polygon points="50,10 20,40 50,40" fill="#D6321E" />
                  <polygon points="50,10 80,40 50,40" fill="#FC8181" />
                  <polygon points="20,40 50,90 50,40" fill="#A91B0D" />
                  <polygon points="80,40 50,90 50,40" fill="#7A1206" />
                  <polygon points="50,10 50,40 40,25" fill="#FFFFFF" opacity="0.2" />
                  <polygon points="50,90 50,40 60,65" fill="#FFFFFF" opacity="0.1" />
                </svg>
              </div>

              {/* Gem 2: Hexagonal Blue Sapphire (Top Right) */}
              <div 
                className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 z-10 animate-gem-2"
                style={{
                  top: '12%',
                  right: '12%',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(49,130,206,0.6)]">
                  <polygon points="50,10 50,50 15,35" fill="#4299E1" />
                  <polygon points="50,10 85,35 50,50" fill="#63B3ED" />
                  <polygon points="85,35 85,65 50,50" fill="#3182CE" />
                  <polygon points="85,65 50,90 50,50" fill="#2B6CB0" />
                  <polygon points="50,90 15,65 50,50" fill="#2C5282" />
                  <polygon points="15,65 15,35 50,50" fill="#1A365D" />
                </svg>
              </div>

              {/* Gem 3: Emerald Cut Green Emerald (Bottom Left) */}
              <div 
                className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 z-10 animate-gem-3"
                style={{
                  bottom: '12%',
                  left: '12%',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(72,187,120,0.6)]">
                  <polygon points="30,15 70,15 60,35 40,35" fill="#48BB78" />
                  <polygon points="70,15 85,30 75,40 60,35" fill="#68D391" />
                  <polygon points="85,30 85,70 65,60 75,40" fill="#38A169" />
                  <polygon points="85,70 70,85 60,65 65,60" fill="#2F855A" />
                  <polygon points="70,85 30,85 40,65 60,65" fill="#276749" />
                  <polygon points="30,85 15,70 35,60 40,65" fill="#22543D" />
                  <polygon points="15,70 15,30 35,40 35,60" fill="#1C4532" />
                  <polygon points="15,30 30,15 40,35 35,40" fill="#2F855A" />
                  <polygon points="40,35 60,35 65,40 65,60 60,65 40,65 35,60 35,40" fill="#9AE6B4" />
                </svg>
              </div>

              {/* Gem 4: Trillion Cut Purple Amethyst (Bottom Right) */}
              <div 
                className="absolute w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24 z-10 animate-gem-4"
                style={{
                  bottom: '15%',
                  right: '18%',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(159,122,234,0.6)]">
                  <polygon points="50,15 50,55 15,75" fill="#9F7AEA" />
                  <polygon points="50,15 85,75 50,55" fill="#B794F4" />
                  <polygon points="15,75 85,75 50,55" fill="#805AD5" />
                  <polygon points="50,15 50,55 32.5,45" fill="#FFFFFF" opacity="0.15" />
                  <polygon points="85,75 50,55 67.5,65" fill="#FFFFFF" opacity="0.1" />
                </svg>
              </div>

              {/* Gem 5: Rhombus Golden Topaz (Top Left) */}
              <div 
                className="absolute w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24 z-10 animate-gem-5"
                style={{
                  top: '15%',
                  left: '15%',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(236,151,31,0.6)]">
                  <polygon points="50,10 50,50 25,50" fill="#ED8936" />
                  <polygon points="50,10 75,50 50,50" fill="#F6AD55" />
                  <polygon points="75,50 50,90 50,50" fill="#DD6B20" />
                  <polygon points="25,50 50,90 50,50" fill="#C05621" />
                  <polygon points="50,10 50,50 37.5,30" fill="#FFFFFF" opacity="0.2" />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
