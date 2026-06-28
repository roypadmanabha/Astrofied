import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Import assets
import googleQr from '../assets/google_qr.jpg';
import phoneMockup from '../assets/phone_mockup.png';
import gmbScreenshot from '../assets/gmb_screenshot.png';
import googleDemoMockup from '../assets/google_demo_mockup.jpg';

export default function GoogleReviews() {
  const { isDarkMode } = useTheme();

  return (
    <section 
      id="google-reviews" 
      className={`py-16 md:py-24 px-6 relative flex justify-center items-center overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-transparent' : 'bg-[#F7F6E6]'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Hexagon-like QR Card */}
          <div className="col-span-1 lg:col-span-4 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-[340px] h-[340px] md:w-[380px] md:h-[380px] bg-white dark:bg-[#0c0a1c] border-4 border-blue-500/20 dark:border-gold/30 rounded-[3rem] shadow-[0_20px_50px_rgba(59,130,246,0.15)] dark:shadow-[0_20px_50px_rgba(212,175,55,0.05)] flex flex-col items-center justify-center p-6"
            >
              {/* Google Brand Header */}
              <div className="flex items-center gap-0.5 text-4xl font-extrabold mb-1 font-nunito">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              
              <h4 className="text-lg md:text-xl font-extrabold font-mulish text-slate-800 dark:text-slate-100 mb-5 text-center tracking-tight">
                Check us out on Google
              </h4>
              
              {/* QR Code Container with Google Brand Border */}
              <div className="relative p-1 rounded-2xl bg-white shadow-md flex items-center justify-center w-[180px] h-[180px]" style={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #4285F4 25%, #EA4335 25% 50%, #FBBC05 50% 75%, #34A853 75%) border-box',
                border: '4px solid transparent',
              }}>
                <img 
                  src={googleQr} 
                  alt="Google QR Code" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              
              <span className="mt-4 text-xs font-black tracking-widest font-mulish text-[#4285F4] dark:text-[#ffd700] uppercase">
                Astrofied
              </span>
            </motion.div>
          </div>

          {/* Middle Column: Vertical Line + Phone Mockup */}
          <div className="col-span-1 lg:col-span-4 flex flex-col lg:flex-row items-center justify-center gap-8 relative">
            {/* Desktop Vertical Line */}
            <div className="hidden lg:block absolute left-[-40px] top-1/2 -translate-y-1/2 w-[1.5px] h-[320px] bg-slate-300/40 dark:bg-gold/20" />
            
            {/* Phone Mockup Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-[280px] h-[570px] md:w-[290px] md:h-[590px] filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_25px_40px_rgba(212,175,55,0.05)]"
            >
              {/* Screenshot Inside Phone */}
              <img 
                src={gmbScreenshot} 
                alt="Google My Business Mobile Page" 
                className="absolute top-[1.2%] left-[3.2%] w-[93.6%] h-[97.6%] rounded-[2.5rem] object-cover object-top z-0"
              />
              
              {/* Smartphone Frame Bezel overlay */}
              <img 
                src={phoneMockup} 
                alt="Smartphone Frame" 
                className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Right Column: Google Reviews Details */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex flex-col items-center lg:items-start"
            >
              <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black font-mulish leading-tight tracking-tight mb-4 text-[#A30000] dark:text-[#ffd700]">
                Find us on <span className="text-[#4285F4] inline-block font-nunito">G</span>
                <span className="text-[#EA4335] inline-block font-nunito -ml-1">o</span>
                <span className="text-[#FBBC05] inline-block font-nunito -ml-1">o</span>
                <span className="text-[#4285F4] inline-block font-nunito -ml-1">g</span>
                <span className="text-[#34A853] inline-block font-nunito -ml-1">l</span>
                <span className="text-[#EA4335] inline-block font-nunito -ml-1">e</span>
              </h3>
              
              <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-mulish mb-8">
                Scan the <strong className="text-slate-800 dark:text-white font-extrabold">QR code</strong> to visit our Google Profile and share your valuable feedback. Your <strong className="text-slate-800 dark:text-white font-extrabold">reviews</strong> and comments help us grow and continue providing the best experience possible. Thank you for your support!
              </p>
              
              {/* Add a Review Button */}
              <button 
                onClick={() => window.open('https://www.google.com/search?q=Astrofied+Udaipur+Tripura', '_blank')}
                className="px-10 py-4 bg-[#D60C0C] hover:bg-[#b00a0a] text-white font-extrabold text-lg rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 font-mulish uppercase tracking-widest cursor-pointer mb-8"
              >
                Add a Review
              </button>
              
              {/* Hand Holding iPad Mockup */}
              <div className="w-full flex justify-center lg:justify-start">
                <img 
                  src={googleDemoMockup} 
                  alt="Astrofied Google Review iPad Mockup" 
                  className="w-full max-w-[340px] md:max-w-[380px] h-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
