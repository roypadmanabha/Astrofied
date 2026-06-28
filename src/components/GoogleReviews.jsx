import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Star, TrendingUp, ShieldCheck, Heart, ChevronRight, MessageSquare } from 'lucide-react';
import gmbScreenshot from '../assets/gmb_screenshot.png';
import googleQr from '../assets/google_qr.jpg';

export default function GoogleReviews() {
  const { isDarkMode } = useTheme();

  // Benefit badges data matching the mockup icons and text
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
      className={`w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-transparent via-[#0d091e]/50 to-transparent border-y border-white/5' 
          : 'bg-[#FAF8F2]'
      }`}
    >
      {/* Decorative Red sweeps (mocking the red flares in the demo image corners) */}
      {!isDarkMode && (
        <>
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-b from-[#EA4335]/8 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-t from-[#EA4335]/6 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />
        </>
      )}

      {/* Decorative Golden sweeps for Dark Mode */}
      {isDarkMode && (
        <>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_top_right,rgba(251,188,5,0.06),transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(251,188,5,0.04),transparent_60%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Text, Badges & QR code card */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold tracking-wide select-none ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-gold shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                  : 'bg-white border-[#e0ddcf] text-[#A30000] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              }`}
            >
              {/* SVG Google G Logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>We Value Your Feedback!</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-mulish font-extrabold tracking-tight leading-[1.1] text-balance"
            >
              <span className={isDarkMode ? 'text-white' : 'text-black'}>Find us on </span>
              <span className="inline-flex">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </motion.h2>

            {/* Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`space-y-4 max-w-xl text-base sm:text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-[#444]'
              }`}
            >
              <p>
                Scan the QR code to visit our Google Profile and share your valuable feedback. 
                Your reviews and comments help us grow and provide the best experience possible.
              </p>
              <p className={`font-extrabold text-lg sm:text-xl tracking-wide ${
                isDarkMode ? 'text-gold' : 'text-[#A30000]'
              }`}>
                Thank you for your support!
              </p>
            </motion.div>

            {/* QR Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full sm:w-auto relative"
            >
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? 'bg-[#18142a]/80 border-gold/25 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[#e6e2d3] shadow-[0_12px_24px_rgba(0,0,0,0.06)]'
              }`}>
                <div className="flex flex-col items-center">
                  <div className="text-xs sm:text-sm font-bold mb-3 tracking-wider flex items-center gap-1.5">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Check us out on</span>
                    <span className="font-extrabold inline-flex">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                    </span>
                  </div>
                  
                  {/* Hexagonal Google QR Badge */}
                  <div className={`relative p-2 rounded-xl bg-white flex items-center justify-center overflow-hidden w-[180px] h-[240px] sm:w-[200px] sm:h-[266px] border ${
                    isDarkMode ? 'border-white/10' : 'border-gray-100'
                  }`}>
                    <img
                      src={googleQr}
                      alt="Google Reviews QR Code Flyer"
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-xs font-bold mt-2.5 tracking-widest uppercase ${isDarkMode ? 'text-gold' : 'text-gray-500'}`}>
                    Astrofied
                  </span>
                </div>
              </div>

              {/* Handdrawn pointing SVG arrow - Laptop/Desktop Only */}
              <div className="hidden lg:block absolute -right-28 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                  <path 
                    d="M10 20C40 -5 70 5 85 35" 
                    stroke={isDarkMode ? "#FBBC05" : "#EA4335"} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeDasharray="4 4"
                  />
                  <path 
                    d="M72 32C78 34 85 36 85 36C85 36 84 29 83 22" 
                    stroke={isDarkMode ? "#FBBC05" : "#EA4335"} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: CSS Phone Mockup & GMB Content */}
          <div className="col-span-1 lg:col-span-6 relative flex items-center justify-center min-h-[450px] sm:min-h-[580px] md:min-h-[640px]">
            
            {/* Tooltip / Speech Bubble (Animate floating) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className={`absolute top-0 right-4 sm:right-12 z-30 p-4 rounded-2xl shadow-xl border text-center transition-all ${
                isDarkMode
                  ? 'bg-[#1b1535] border-gold/30 text-white shadow-[0_8px_25px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-[#eae7db] text-black shadow-[0_10px_25px_rgba(0,0,0,0.08)]'
              }`}
              style={{ maxWidth: "200px" }}
            >
              {/* Speech bubble pointer */}
              <div className={`absolute bottom-[-8px] left-[30px] w-4 h-4 rotate-45 border-r border-b ${
                isDarkMode ? 'bg-[#1b1535] border-gold/30' : 'bg-white border-[#eae7db]'
              }`} />
              
              <div className="flex justify-center gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-extrabold font-mulish leading-snug">
                Your Feedback Means the World <span className={isDarkMode ? 'text-gold' : 'text-[#A30000]'}>to Us!</span>
              </p>
            </motion.div>

            {/* Behind Mockup - Google Search Result card (adds layout depth matching the demo mockup) */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`absolute left-[4%] sm:left-[10%] bottom-[8%] w-[250px] sm:w-[280px] p-5 rounded-2xl border hidden md:block select-none shadow-lg z-10 transition-colors ${
                isDarkMode
                  ? 'bg-[#151125] border-white/10 text-gray-200'
                  : 'bg-white border-gray-200 text-gray-800'
              }`}
            >
              {/* Google Search Mock header */}
              <div className="flex items-center justify-between border-b pb-2 mb-3 border-gray-200/20">
                <span className="font-extrabold text-sm tracking-wide">Google</span>
                <div className={`h-2.5 w-2.5 rounded-full ${isDarkMode ? 'bg-green-500' : 'bg-green-600'}`} />
              </div>
              <div className={`rounded-lg px-2.5 py-1.5 text-xs mb-3 flex items-center justify-between ${
                isDarkMode ? 'bg-white/5' : 'bg-gray-100'
              }`}>
                <span>Astrofied Udaipur</span>
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {/* Search result item snippet */}
              <div className="space-y-1">
                <div className="text-[11px] opacity-70">https://www.astrofied.com</div>
                <div className="text-xs font-bold text-[#4285F4] hover:underline cursor-pointer leading-tight">
                  Astrofied | Best Astrologer in Tripura | Vedic Astrology & Kundali
                </div>
                <div className="flex items-center gap-1.5 text-[11px] pt-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                  <span>5.0</span>
                  <span className="opacity-60">(4)</span>
                </div>
              </div>
              {/* Accordion link placeholders */}
              <div className="mt-3.5 pt-3 border-t border-gray-200/10 space-y-2.5 text-xs">
                {['About Us', 'Services', 'Contact Us', 'Our Astrologer'].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between opacity-80 hover:opacity-100 cursor-pointer">
                    <span>{item}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Primary Phone Mockup (GMB mobile view) */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`relative z-20 w-[270px] h-[550px] sm:w-[300px] sm:h-[600px] rounded-[2.5rem] p-[8px] sm:p-[10px] shadow-2xl transition-all border-[10px] sm:border-[12px] ${
                isDarkMode
                  ? 'bg-black border-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  : 'bg-white border-gray-800 shadow-[0_20px_45px_rgba(0,0,0,0.15)]'
              }`}
            >
              {/* Phone Notch/Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-gray-950 rounded-full ml-auto mr-3 border border-gray-900" />
              </div>

              {/* Speaker notch */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-black rounded-b-md z-30" />

              {/* Screen Container */}
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-gray-100 relative">
                
                {/* Glossy Reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10" />
                
                {/* GMB Screenshot image */}
                <img
                  src={gmbScreenshot}
                  alt="Astrofied Google Business Profile mobile view"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* Home Indicator bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-black rounded-full z-20" />
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION: Benefit Badges Grid */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-gray-200/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`flex items-center gap-3.5 px-4 py-4 sm:px-5 sm:py-5 rounded-2xl border transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#181330]/40 border-white/5 hover:border-gold/20 hover:bg-[#181330]/70'
                    : 'bg-white/70 border-[#e8e4d3] hover:border-gray-300 hover:bg-white'
                }`}
              >
                {/* Icon wrapper */}
                <div className={`p-2.5 rounded-xl shrink-0 ${item.bgClass} flex items-center justify-center shadow-md`}>
                  {item.icon}
                </div>
                
                {/* Badge text */}
                <span className={`text-sm sm:text-base font-extrabold tracking-wide leading-tight ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
