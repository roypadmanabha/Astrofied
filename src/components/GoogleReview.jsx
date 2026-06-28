import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { MessageSquare, TrendingUp, ShieldCheck, Heart, Star, Compass, RefreshCw, Search, MapPin, Clock, Globe, ArrowRight } from 'lucide-react';
import googleQrImg from '../assets/google_qr.jpg';

const GoogleGLogo = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function GoogleReview() {
  const { isDarkMode } = useTheme();

  return (
    <section className="relative w-full py-20 px-6 overflow-hidden bg-[#fdf6e3] text-gray-900 border-t border-b border-orange-100/50">
      {/* Inline styles for keyframes & specific custom shapes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatPhone {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-12px) rotate(-1.5deg);
          }
        }
        @keyframes floatPhone2 {
          0%, 100% {
            transform: translateY(0) rotate(3deg);
          }
          50% {
            transform: translateY(-8px) rotate(2.5deg);
          }
        }
        @keyframes starPop {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.3) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }
        @keyframes pulseRed {
          0% {
            box-shadow: 0 0 0 0 rgba(234, 67, 53, 0.6), 0 0 0 0 rgba(234, 67, 53, 0.3);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(234, 67, 53, 0), 0 0 0 18px rgba(234, 67, 53, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(234, 67, 53, 0), 0 0 0 0 rgba(234, 67, 53, 0);
          }
        }
        @keyframes shimmerQR {
          0% {
            transform: translateX(-150%) skewX(-25deg);
          }
          100% {
            transform: translateX(150%) skewX(-25deg);
          }
        }
        .animate-float-phone {
          animation: floatPhone 6s ease-in-out infinite;
        }
        .animate-float-phone-delayed {
          animation: floatPhone2 6s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .animate-pulse-red {
          animation: pulseRed 2.5s infinite;
        }
        .shimmer-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%);
          pointer-events: none;
        }
        .shimmer-card:hover::after {
          animation: shimmerQR 1.5s ease-out;
        }
        .corner-bracket-tl {
          border-top: 4px solid #4285F4;
          border-left: 4px solid #4285F4;
          border-top-left-radius: 12px;
        }
        .corner-bracket-tr {
          border-top: 4px solid #EA4335;
          border-right: 4px solid #EA4335;
          border-top-right-radius: 12px;
        }
        .corner-bracket-bl {
          border-bottom: 4px solid #34A853;
          border-left: 4px solid #34A853;
          border-bottom-left-radius: 12px;
        }
        .corner-bracket-br {
          border-bottom: 4px solid #FBBC05;
          border-right: 4px solid #FBBC05;
          border-bottom-right-radius: 12px;
        }
        .star-item {
          opacity: 0;
          animation: starPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        /* Custom scrollbar to keep mockups clean */
        .mockup-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .mockup-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .mockup-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
      ` }} />

      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main Grid: Collapses to single column on <=600px (standard sm in tailwind) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: BRAND TEXT & CTA (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* Pill Badge */}
            <div className="bg-white/80 backdrop-blur-sm border border-orange-100 shadow-[0_4px_12px_rgba(139,92,26,0.05)] rounded-full px-5 py-2 inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-105">
              <GoogleGLogo className="w-5 h-5" />
              <span className="font-mulish text-xs sm:text-sm font-bold text-gray-700 tracking-wide">
                We Value Your <span className="text-[#EA4335]">Feedback!</span>
              </span>
            </div>

            {/* Giant Multicolor Headline */}
            <h2 className="font-mulish text-5xl sm:text-6xl lg:text-[70px] leading-[1.05] font-[800] tracking-tight text-gray-900">
              Find us on <br className="hidden sm:inline" />
              <span className="inline-block mt-1">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#34A853]">g</span>
                <span className="text-[#4285F4]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </h2>

            {/* Body Copy */}
            <p className="font-nunito text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
              Scan the QR code to visit our Google Profile and share your valuable feedback. Your reviews and comments help us grow and provide the best experience possible.
            </p>

            {/* Red Italic Line */}
            <p className="font-mulish text-lg font-bold text-[#EA4335] italic tracking-wide">
              Thank you for your support!
            </p>

            {/* Blue Pill CTA Button with Pulse */}
            <a
              href="https://g.page/r/CbavyzcyjkkxEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-red relative inline-flex items-center justify-center gap-2 bg-[#4285F4] hover:bg-[#3574de] text-white font-mulish font-bold text-base sm:text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(66,133,244,0.3)] group mt-2"
            >
              <span>Write a Review</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* CENTER COLUMN: QR CODE BLOCK (Span 3) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 flex flex-col items-center justify-center relative"
          >
            {/* Muted Uppercase Label */}
            <span className="font-mulish text-[11px] font-extrabold tracking-[0.2em] text-gray-500 mb-3.5">
              SCAN TO REVIEW
            </span>

            {/* QR Card with custom border corners & shimmer */}
            <div className="shimmer-card relative bg-white p-6 rounded-[22px] shadow-[0_12px_30px_rgba(139,92,26,0.08)] border border-orange-100/50 w-full max-w-[260px] flex flex-col items-center justify-center transition-all duration-500 hover:shadow-[0_20px_45px_rgba(139,92,26,0.12)] hover:-translate-y-1 overflow-hidden">
              
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-7 h-7 corner-bracket-tl" />
              <div className="absolute top-3 right-3 w-7 h-7 corner-bracket-tr" />
              <div className="absolute bottom-3 left-3 w-7 h-7 corner-bracket-bl" />
              <div className="absolute bottom-3 right-3 w-7 h-7 corner-bracket-br" />

              {/* QR Label top */}
              <div className="flex items-center gap-1 mb-3 mt-1.5 font-mulish text-[13px] font-bold text-gray-800">
                <span>Check us out on</span>
                <span className="inline-flex">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#34A853]">g</span>
                  <span className="text-[#4285F4]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>

              {/* QR Image Box */}
              <div className="bg-[#fcfbf9] p-3 rounded-2xl border border-gray-100 w-full aspect-square flex items-center justify-center">
                <img
                  src={googleQrImg}
                  alt="Astrofied Google Review QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              {/* Brand label bottom */}
              <div className="mt-4 flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <GoogleGLogo className="w-4 h-4" />
                  <span className="font-mulish text-sm font-extrabold text-gray-900 tracking-wider">
                    Astrofied
                  </span>
                </div>
              </div>
            </div>

            {/* Curved arrow from QR to Phone mockup */}
            <div className="hidden lg:block absolute top-[60%] right-[-50px] w-20 h-16 pointer-events-none z-20">
              <svg className="w-full h-full text-red-500 overflow-visible opacity-80" viewBox="0 0 100 50" fill="none">
                <path d="M5,10 C35,5 75,25 82,38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
                <path d="M75,34 L83,39 L78,45" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DUAL FLOATING PHONE MOCKUPS (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 relative flex items-center justify-center min-h-[500px] w-full pt-10 sm:pt-0"
          >
            {/* Phone Container Box */}
            <div className="relative w-full max-w-[340px] h-[480px]">
              
              {/* BACK PHONE: Dark Google Search Result Mockup */}
              <div className="animate-float-phone-delayed absolute right-0 top-6 w-[210px] h-[370px] border-[5.5px] border-gray-800 rounded-[28px] shadow-xl bg-[#202124] text-white overflow-hidden text-[9px] font-sans flex flex-col z-0 select-none">
                {/* iPhone notch / Dynamic Island */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full absolute right-2" />
                </div>
                {/* Search Header */}
                <div className="pt-5 px-3 pb-2 border-b border-gray-800 bg-[#202124] sticky top-0 flex flex-col gap-1.5 z-10">
                  <div className="flex items-center justify-between text-[7px] text-gray-400">
                    <span>4:09</span>
                    <div className="flex items-center gap-1">
                      <span>LTE</span>
                      <div className="w-3.5 h-2 border border-gray-400 rounded-sm p-[1px] flex items-center"><div className="h-full w-2.5 bg-gray-400 rounded-2xs" /></div>
                    </div>
                  </div>
                  <div className="bg-[#303134] h-5 rounded-full flex items-center px-2.5 gap-1.5 text-gray-300">
                    <Search size={8} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">Astrofied Udaipur</span>
                  </div>
                </div>
                {/* Result Content */}
                <div className="p-3 flex flex-col gap-3 overflow-y-auto mockup-scroll h-full">
                  <div className="bg-[#303134]/40 p-2.5 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-1.5 mb-1 text-gray-400 text-[7px]">
                      <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center flex-shrink-0"><GoogleGLogo className="w-2 h-2" /></div>
                      <span className="truncate">https://www.astrofied.com</span>
                    </div>
                    <h3 className="text-[#8ab4f8] font-semibold text-[10px] leading-tight mb-1">
                      Astrofied | Best Astrologer in Tripura | Vedic Astrology
                    </h3>
                    <div className="flex items-center gap-1 text-[8px] text-[#fbbc05] mb-1">
                      <div className="flex gap-0.5">
                        <Star size={7} fill="#fbbc05" stroke="none" />
                        <Star size={7} fill="#fbbc05" stroke="none" />
                        <Star size={7} fill="#fbbc05" stroke="none" />
                        <Star size={7} fill="#fbbc05" stroke="none" />
                        <Star size={7} fill="#fbbc05" stroke="none" />
                      </div>
                      <span className="text-gray-400">5.0 (4)</span>
                    </div>
                    <p className="text-gray-400 leading-snug">
                      Astrofied is one of the best astrology service provider in Tripura. Our astrologer provides best services...
                    </p>
                  </div>
                </div>
              </div>

              {/* FRONT PHONE: Light Google Business Profile Mockup */}
              <div className="animate-float-phone absolute left-0 top-0 w-[230px] h-[410px] border-[6px] border-gray-800 rounded-[32px] shadow-2xl bg-white text-gray-800 overflow-hidden text-[9px] font-sans flex flex-col z-10 select-none">
                {/* iPhone notch / Dynamic Island */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full absolute right-2" />
                </div>
                {/* Google Maps Header */}
                <div className="pt-6 px-3.5 pb-2 border-b border-gray-100 bg-[#f8f9fa] sticky top-0 flex flex-col gap-1.5 z-10">
                  <div className="flex items-center justify-between text-[7px] text-gray-500">
                    <span>4:09</span>
                    <div className="flex items-center gap-1">
                      <span>4G+</span>
                      <div className="w-3.5 h-2 border border-gray-500 rounded-sm p-[1px] flex items-center"><div className="h-full w-2 bg-gray-500 rounded-2xs" /></div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 shadow-sm h-5 rounded-full flex items-center px-2.5 gap-1.5 text-gray-600">
                    <GoogleGLogo className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Google Business Profile</span>
                  </div>
                </div>
                {/* Business Profile Content */}
                <div className="p-3.5 flex flex-col gap-2.5 overflow-y-auto mockup-scroll h-[330px]">
                  {/* Business Name & Stars */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Astrofied</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="font-bold text-[#e37400]">5.0</span>
                      <div className="flex gap-0.5">
                        <Star size={7} fill="#ffd700" stroke="none" />
                        <Star size={7} fill="#ffd700" stroke="none" />
                        <Star size={7} fill="#ffd700" stroke="none" />
                        <Star size={7} fill="#ffd700" stroke="none" />
                        <Star size={7} fill="#ffd700" stroke="none" />
                      </div>
                      <span className="text-[#1967d2] font-semibold">(4)</span>
                    </div>
                    <p className="text-gray-500 text-[8px] mt-0.5">Astrologer in Tripura · <span className="text-[#188038] font-bold">Open</span></p>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-4 gap-1.5 py-1.5 border-t border-b border-gray-100">
                    <div className="flex flex-col items-center text-center gap-1 cursor-pointer">
                      <div className="w-6 h-6 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#1967d2]"><Compass size={10} strokeWidth={2.5} /></div>
                      <span className="text-[7px] font-bold text-[#1967d2]">Directions</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 cursor-pointer">
                      <div className="w-6 h-6 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#1967d2]"><Globe size={10} strokeWidth={2.5} /></div>
                      <span className="text-[7px] font-bold text-[#1967d2]">Website</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 cursor-pointer">
                      <div className="w-6 h-6 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#1967d2]"><Share size={10} strokeWidth={2.5} /></div>
                      <span className="text-[7px] font-bold text-[#1967d2]">Share</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 cursor-pointer">
                      <div className="w-6 h-6 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#1967d2]"><Star size={10} strokeWidth={2.5} /></div>
                      <span className="text-[7px] font-bold text-[#1967d2]">Save</span>
                    </div>
                  </div>

                  {/* Banner Image Mock */}
                  <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 flex flex-col justify-between h-24 relative overflow-hidden">
                    <div className="absolute right-[-10px] bottom-[-15px] w-20 h-20 opacity-20 pointer-events-none bg-orange-200 rounded-full" />
                    <div>
                      <h4 className="font-mulish font-bold text-[8px] text-[#A30000] leading-tight">Deeper understanding of your Life Begins Here</h4>
                      <p className="text-[6px] text-gray-500 mt-0.5">7+ Years of Experience · 5k+ Consultations</p>
                    </div>
                    <div className="flex justify-between items-end mt-auto z-10">
                      <span className="text-[7px] bg-[#A30000] text-white px-1.5 py-0.5 rounded-full font-bold">Astrofied</span>
                    </div>
                  </div>

                  {/* Address & Hours */}
                  <div className="flex flex-col gap-2 py-1.5 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin size={10} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="leading-tight">GFJW+XCM, Dak Bunglow Rd, Udaipur, Tripura 799120</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={10} className="text-gray-400 flex-shrink-0" />
                      <span>Sunday: Open 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge (Top-Right of Mockups) */}
              <div className="absolute right-[-15px] top-[-25px] bg-white rounded-2xl shadow-xl p-3 border border-orange-100/50 flex flex-col items-center justify-center w-28 z-20 transition-transform duration-300 hover:scale-110">
                {/* 5 animated stars */}
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      fill="#ffd700"
                      stroke="none"
                      className="star-item"
                      style={{ animationDelay: `${0.5 + i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="font-mulish text-base font-extrabold text-gray-900 leading-none">
                  5.0
                </span>
                <span className="font-nunito text-[7.5px] text-center text-gray-500 mt-1 leading-tight">
                  Your feedback means the world <span className="text-red-500 font-bold">to Us!</span>
                </span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* BOTTOM TRUST BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-orange-200/40"
        >
          {/* Flex Wrap Row of Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            
            {/* Pill 1 */}
            <div className="bg-white/80 backdrop-blur-sm px-4.5 py-2.5 rounded-full border border-orange-100/30 flex items-center gap-2.5 shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="w-6.5 h-6.5 bg-[#EA4335] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <MessageSquare size={11} fill="white" stroke="none" />
              </div>
              <span className="font-mulish text-xs sm:text-sm font-bold text-gray-700">
                Share Your Experience
              </span>
            </div>

            {/* Pill 2 */}
            <div className="bg-white/80 backdrop-blur-sm px-4.5 py-2.5 rounded-full border border-orange-100/30 flex items-center gap-2.5 shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="w-6.5 h-6.5 bg-[#FBBC05] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <TrendingUp size={11} strokeWidth={2.5} />
              </div>
              <span className="font-mulish text-xs sm:text-sm font-bold text-gray-700">
                Help Us Grow
              </span>
            </div>

            {/* Pill 3 */}
            <div className="bg-white/80 backdrop-blur-sm px-4.5 py-2.5 rounded-full border border-orange-100/30 flex items-center gap-2.5 shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="w-6.5 h-6.5 bg-[#34A853] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <ShieldCheck size={11} strokeWidth={2.5} />
              </div>
              <span className="font-mulish text-xs sm:text-sm font-bold text-gray-700">
                Trusted by Customers
              </span>
            </div>

            {/* Pill 4 */}
            <div className="bg-white/80 backdrop-blur-sm px-4.5 py-2.5 rounded-full border border-orange-100/30 flex items-center gap-2.5 shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="w-6.5 h-6.5 bg-[#4285F4] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Heart size={11} fill="white" stroke="none" />
              </div>
              <span className="font-mulish text-xs sm:text-sm font-bold text-gray-700">
                Your Support Inspires Us
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
