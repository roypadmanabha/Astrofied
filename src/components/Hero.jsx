import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react';
import astrologer from '../assets/hero-astrologer.png';
import zodiacBg from '../assets/zodiac-wheel.png';
import astrofiedDetails from '../assets/astrofied-details.png';
import { useState } from 'react';

export default function Hero({ onOpenConsultation }) {
    const { isDarkMode } = useTheme();
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-12 md:pb-20 overflow-hidden">
            {/* Background elements */}
            <div className={`absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`} />
            <div className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-20 ${isDarkMode ? 'bg-[#4B0082]' : 'bg-gold'}`} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left order-1 z-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-mulish leading-[1.1] mb-6"
                            style={{ color: isDarkMode ? '#F5F5F5' : '#0A0A0A' }}
                        >
                            A Deeper Understanding <br className="hidden lg:block xl:hidden" />
                            <span style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>of Your Life</span> Begins Here
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg md:text-xl max-w-xl mb-12 opacity-80 font-mulish leading-relaxed text-justify lg:text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}
                        >
                            Refined Vedic insights designed to guide your decisions with clarity, confidence, and purpose through the ancient wisdom of the cosmos.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                        >
                            <button
                                onClick={onOpenConsultation}
                                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105 active:scale-95 border-none cursor-pointer ${isDarkMode
                                    ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20'
                                    : 'bg-[#4B0082] text-white hover:bg-[#3A0066] shadow-[#4B0082]/30'
                                    }`}
                            >
                                Book a Consultation
                            </button>
                             <button
                                onClick={() => setIsDetailsModalOpen(true)}
                                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all border glass hover:scale-105 active:scale-95 cursor-pointer ${isDarkMode
                                    ? 'border-gold/30 text-gold hover:border-gold shadow-gold/5'
                                    : 'border-[#4B0082]/30 text-[#4B0082] hover:border-[#4B0082] shadow-[#4B0082]/5'
                                    }`}
                            >
                                Explore Astrofied
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Image Segment */}
                    <div className="w-full lg:w-1/2 relative flex justify-center items-center order-2 mt-12 lg:mt-0">
                        {/* Background Rotating Wheel */}
                        <motion.img
                            src={zodiacBg}
                            alt=""
                            className="absolute w-[120%] h-[120%] max-w-none opacity-20 pointer-events-none select-none blur-[2px]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        />

                        <div className="relative w-full max-w-[500px] flex flex-col items-center">
                            {/* Main Astrologer Image (Transparent) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative z-10 w-full"
                            >
                                <img
                                    src={astrologer}
                                    alt="Astrologer"
                                    className="w-full h-auto object-contain select-none pointer-events-none transition-transform duration-700 hover:scale-[1.02]"
                                    style={{
                                        filter: isDarkMode
                                            ? 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5)) drop-shadow(0 0 30px rgba(212, 175, 55, 0.3))'
                                            : 'drop-shadow(0 0 15px rgba(75, 0, 130, 0.2))',
                                        maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%), linear-gradient(to right, black 95%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%), linear-gradient(to right, black 95%, transparent 100%)'
                                    }}
                                    draggable={false}
                                />

                                {/* Floating Stats Badges - POSITIONED PRECISELY */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className={`absolute right-4 lg:right-4 xl:right-6 top-[42%] md:top-[45%] z-20 px-4 py-2 md:px-5 md:py-3 rounded-2xl border glass shadow-2xl backdrop-blur-xl ${isDarkMode ? 'border-gold/20' : 'border-[#4B0082]/20'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold font-mulish" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>5 Thousand+</span>
                                        <span className="text-xs opacity-70">Consultations</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className={`absolute left-0 md:left-4 top-[55%] z-20 px-5 py-3 rounded-2xl border glass shadow-2xl backdrop-blur-xl ${isDarkMode ? 'border-gold/20' : 'border-[#4B0082]/20'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold font-mulish" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>7+ Years</span>
                                        <span className="text-xs opacity-70">of Experience</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className={`absolute -right-2 md:-right-8 lg:-right-10 xl:-right-16 bottom-[18%] z-20 px-4 py-2 md:px-5 md:py-3 rounded-2xl border glass shadow-2xl backdrop-blur-xl ${isDarkMode ? 'border-gold/20' : 'border-[#4B0082]/20'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-lg md:text-xl font-bold font-mulish" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>100%</span>
                                        <span className="text-[10px] md:text-xs opacity-70">Accuracy</span>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Bottom Roadmap Label - POSITIONED TO COVER THE IMAGE BOTTOM */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className={`relative -mt-10 md:-mt-12 z-30 w-full px-4 md:px-10 py-3.5 md:py-4 rounded-2xl md:rounded-full border glass backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-center items-center ${isDarkMode 
                                    ? 'border-gold/30 text-gold shadow-gold/20' 
                                    : 'border-[#4B0082]/30 text-[#4B0082] shadow-[#4B0082]/20'
                                    }`}
                            >
                                <span className="text-[9px] sm:text-[10px] md:text-sm font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase font-mulish text-center leading-tight">
                                    your roadmap to the right decisions
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instagram Modal */}
            <AnimatePresence>
                {isDetailsModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDetailsModalOpen(false)}
                            className={`absolute inset-0 backdrop-blur-md ${isDarkMode ? 'bg-black/80' : 'bg-white/80'}`}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`relative w-full max-w-4xl h-[80vh] rounded-[2rem] border shadow-2xl flex flex-col overflow-hidden ${isDarkMode ? 'bg-[#121212] border-gold/20' : 'bg-white border-[#4B0082]/20'
                                }`}
                        >
                            {/* Modal Header */}
                            <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-gold/10' : 'border-[#4B0082]/10'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center p-1.5">
                                        <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                        </svg>
                                    </div>
                                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>astrofied___</span>
                                </div>
                                <div className="flex gap-2">
                                    <a 
                                        href="https://www.instagram.com/astrofied___/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            isDarkMode ? 'bg-gold/10 text-gold hover:bg-gold/20' : 'bg-[#4B0082]/10 text-[#4B0082] hover:bg-[#4B0082]/20'
                                        }`}
                                    >
                                        Visit Profile
                                    </a>
                                    <button 
                                        onClick={() => setIsDetailsModalOpen(false)}
                                        className={`p-1.5 rounded-lg transition-all ${
                                            isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-black'
                                        }`}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body: Stylish Fallback (since Instagram blocks iframes) */}
                            <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden ${
                                isDarkMode ? 'bg-[#0f0a1f]' : 'bg-[#FAF9F6]'
                            }`}>
                                {/* Decorative Gradients */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />

                                {/* Profile Avatar Placeholder */}
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative mb-6"
                                >
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-1 shadow-2xl">
                                        <div className={`w-full h-full rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
                                            <svg viewBox="0 0 24 24" fill={isDarkMode ? '#D4AF37' : '#4B0082'} className="w-12 h-12 md:w-16 md:h-16">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>

                                <h3 className={`text-2xl md:text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>
                                    @astrofied___
                                </h3>
                                <p className={`text-sm md:text-base opacity-70 mb-8 max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Join our community for daily cosmic insights, expert astrology guidance, and exclusive spiritual updates.
                                </p>

                                <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10 w-full max-w-md">
                                    <div className="text-center">
                                        <p className="font-bold text-lg md:text-xl">Daily</p>
                                        <p className="text-[10px] uppercase tracking-wider opacity-60">Insights</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-lg md:text-xl">Expert</p>
                                        <p className="text-[10px] uppercase tracking-wider opacity-60">Guidance</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-lg md:text-xl">Spiritual</p>
                                        <p className="text-[10px] uppercase tracking-wider opacity-60">Community</p>
                                    </div>
                                </div>

                                <motion.a
                                    href="https://www.instagram.com/astrofied___/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 rounded-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-bold text-lg shadow-xl shadow-purple-500/20 flex items-center gap-3"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                    Follow Now
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

