import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Star, TrendingUp, ShieldCheck, Heart, ChevronRight, MessageSquare } from 'lucide-react';
import gmbScreenshot from '../assets/gmb_screenshot.png';
import googleQr from '../assets/google_qr.jpg';

export default function GoogleReviews() {
  const { isDarkMode } = useTheme();

  const benefits = [
    {
      id: 1,
      icon: <MessageSquare className="w-5 h-5 text-white" />,
      bgClass: "bg-[#EA4335]", // Google Red
      text: "Share Your Experience",
    },
    {
      id: 2,
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      bgClass: "bg-[#FBBC05]", // Google Yellow
      text: "Help Us Grow",
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      bgClass: "bg-[#34A853]", // Google Green
      text: "Trusted by Customers",
    },
    {
      id: 4,
      icon: <Heart className="w-5 h-5 text-white" />,
      bgClass: "bg-[#4285F4]", // Google Blue
      text: "Your Support Inspires Us",
    },
  ];

  return (
    <section
      id="google-reviews"
      className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6 transition-colors duration-500 ${
        isDarkMode ? 'bg-transparent' : 'bg-white'
      }`}
    >
      <div className="container mx-auto max-w-[1200px] flex justify-center relative z-10">
        
        {/* Rounded Tile Container - Identical style structure to Journals section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative overflow-hidden flex flex-col w-full p-6 md:p-10 lg:p-12 rounded-[30px] transition-all duration-300 ${
            isDarkMode 
              ? 'border border-white bg-transparent shadow-none' 
              : 'border border-[#e8e4d3] bg-[#FAF9F5] shadow-lg'
          }`}
        >
          {/* Decorative Background sweeps for Light Mode tile */}
          {!isDarkMode && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[30px]">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-[#EA4335]/5 to-transparent rounded-full blur-2xl -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-t from-[#EA4335]/4 to-transparent rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
            </div>
          )}

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Text info & QR card */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6 sm:gap-8">
              <div className="flex flex-col items-start gap-4 sm:gap-6">
                
                {/* Pill Badge */}
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide select-none ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-gold'
                      : 'bg-white border-[#e0ddcf] text-[#A30000] shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>We Value Your Feedback!</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-mulish font-extrabold tracking-tight leading-tight">
                  <span className={isDarkMode ? 'text-white' : 'text-black'}>Find us on </span>
                  <span className="inline-flex">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </h2>

                {/* Description */}
                <p className={`text-sm sm:text-base leading-relaxed font-mulish font-medium text-justify ${
                  isDarkMode ? 'text-gray-300' : 'text-[#444]'
                }`}>
                  Scan the QR code to visit our Google Profile and share your valuable feedback. 
                  Your reviews and comments help us grow and provide the best experience possible.
                </p>
              </div>

              {/* QR and Tagline Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-4 sm:mt-0">
                
                {/* QR Code Container (Zoomed-in on QR code, clear and easy to scan) */}
                <a
                  href="https://www.google.com/search?q=Astrofied+Udaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] overflow-hidden bg-white rounded-2xl border flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] group ${
                    isDarkMode ? 'border-white/20' : 'border-gray-200'
                  }`}
                  title="Click to open Astrofied Google Profile"
                >
                  <img
                    src={googleQr}
                    alt="Scan to open Astrofied Google Review"
                    className="w-full h-full object-cover scale-[1.65] translate-y-[-2%] select-none pointer-events-none group-hover:opacity-90 transition-opacity duration-300"
                    loading="lazy"
                  />
                  {/* Subtle scan guideline overlay */}
                  <div className="absolute inset-0 border-[6px] border-black/5 rounded-2xl pointer-events-none" />
                </a>

                {/* Arrow & Tagline */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 flex-1">
                  
                  {/* Tagline */}
                  <span className={`font-extrabold text-lg sm:text-xl leading-tight font-mulish ${
                    isDarkMode ? 'text-gold' : 'text-[#A30000]'
                  }`}>
                    Thank you for your support!
                  </span>

                  {/* Pointing Arrow (Laptop/Desktop only) */}
                  <div className="hidden lg:block pointer-events-none">
                    <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                      <path 
                        d="M10 10C45 -10 75 10 95 25" 
                        stroke={isDarkMode ? "#FBBC05" : "#EA4335"} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeDasharray="4 4"
                      />
                      <path 
                        d="M84 25C90 25 95 25 95 25C95 25 93 20 90 15" 
                        stroke={isDarkMode ? "#FBBC05" : "#EA4335"} 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Divider (Hidden on mobile) */}
            <div className={`hidden lg:block w-px self-stretch ${isDarkMode ? 'bg-white/30' : 'bg-black/20'}`} />

            {/* RIGHT COLUMN: Mobile phone mockup */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[440px] sm:min-h-[500px] lg:min-h-auto pt-6 lg:pt-0">
              
              {/* Tooltip / Speech Bubble (Animate floating) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className={`absolute top-0 right-2 sm:right-6 z-30 p-4 rounded-2xl shadow-lg border text-center transition-all ${
                  isDarkMode
                    ? 'bg-[#181330] border-gold/30 text-white shadow-[0_8px_25px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-[#eae7db] text-black shadow-[0_8px_20px_rgba(0,0,0,0.06)]'
                }`}
                style={{ maxWidth: "180px" }}
              >
                {/* Speech bubble pointer */}
                <div className={`absolute bottom-[-8px] left-[30px] w-4 h-4 rotate-45 border-r border-b ${
                  isDarkMode ? 'bg-[#181330] border-gold/30' : 'bg-white border-[#eae7db]'
                }`} />
                
                <div className="flex justify-center gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm font-extrabold font-mulish leading-snug">
                  Your Feedback Means the World <span className={isDarkMode ? 'text-gold' : 'text-[#A30000]'}>to Us!</span>
                </p>
              </motion.div>

              {/* Overlapping Google Search Result Card (Hidden on Mobile) */}
              <motion.div
                initial={{ opacity: 0, x: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`absolute left-[6%] sm:left-[10%] bottom-[6%] w-[230px] sm:w-[250px] p-4 rounded-2xl border hidden md:block select-none shadow-md z-10 transition-colors ${
                  isDarkMode
                    ? 'bg-[#151125] border-white/10 text-gray-200'
                    : 'bg-white border-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-1.5 mb-2.5 border-gray-200/10">
                  <span className="font-extrabold text-[11px] tracking-wide opacity-80">Google</span>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className={`rounded-lg px-2 py-1 text-[11px] mb-2.5 flex items-center justify-between ${
                  isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                }`}>
                  <span>Astrofied Udaipur</span>
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] opacity-60">https://www.astrofied.com</div>
                  <div className="text-xs font-bold text-[#4285F4] leading-tight">
                    Astrofied | Best Astrologer in Tripura | Vedic Astrology
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] pt-0.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2 h-2 fill-[#FBBC05] text-[#FBBC05]" />
                      ))}
                    </div>
                    <span>5.0</span>
                    <span className="opacity-60">(4)</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-gray-200/10 space-y-2 text-[11px]">
                  {['About Us', 'Services', 'Contact Us'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between opacity-80">
                      <span>{item}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Primary Mobile Mockup Container (GMB Mobile view) */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative z-20 w-[240px] h-[480px] sm:w-[270px] sm:h-[540px] rounded-[2.2rem] p-[8px] shadow-xl border-[9px] sm:border-[10px] ${
                  isDarkMode
                    ? 'bg-black border-gray-900 shadow-[0_15px_35px_rgba(0,0,0,0.7)]'
                    : 'bg-white border-gray-800 shadow-[0_15px_35px_rgba(0,0,0,0.12)]'
                }`}
              >
                {/* Speaker & Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-950 rounded-full ml-auto mr-2.5 border border-gray-900" />
                </div>

                {/* Screen Content Container */}
                <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-10" />
                  
                  {/* Screenshot Image */}
                  <img
                    src={gmbScreenshot}
                    alt="Astrofied Google Profile Mobile View"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-black rounded-full z-20" />
              </motion.div>
            </div>
          </div>

          {/* Horizontal Divider inside the Tile */}
          <div className={`w-full h-px my-8 sm:my-10 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />

          {/* BENEFIT BADGES ROW (Inside the Tile Container) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {benefits.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`flex items-center gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4.5 rounded-xl border transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#181330]/30 border-white/5 hover:border-gold/20 hover:bg-[#181330]/50'
                    : 'bg-white border-[#e8e4d3] hover:border-gray-300 hover:bg-white shadow-sm'
                }`}
              >
                {/* Circular Icon */}
                <div className={`p-2 rounded-lg shrink-0 ${item.bgClass} flex items-center justify-center shadow-sm`}>
                  {item.icon}
                </div>
                
                {/* Badge Label */}
                <span className={`text-xs sm:text-sm font-extrabold tracking-wide leading-tight ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
