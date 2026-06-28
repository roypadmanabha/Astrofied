import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import googleQrSectionImg from '../assets/google_qr_section.png';

export default function GoogleQRSection() {
  const { isDarkMode } = useTheme();

  return (
    <section 
      id="google-qr" 
      className={`w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 transition-colors duration-500 overflow-hidden relative ${
        isDarkMode ? 'bg-transparent' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-full relative overflow-hidden rounded-2xl sm:rounded-3xl transition-shadow duration-500 bg-[#F5F5DD] ${
            isDarkMode 
              ? 'shadow-[0_0_50px_rgba(255,215,0,0.15)] border border-gold/30' 
              : 'shadow-2xl border border-black/5'
          }`}
          style={{
            maxWidth: "1200px",
          }}
        >
          {/* Subtle overlay/gradient reflection to give a premium feel in dark mode */}
          {isDarkMode && (
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-transparent to-white/5 pointer-events-none mix-blend-overlay z-10" />
          )}
          
          <img 
            src={googleQrSectionImg} 
            alt="Find us on Google and scan QR code" 
            className="w-full h-auto block object-contain mx-auto select-none"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
