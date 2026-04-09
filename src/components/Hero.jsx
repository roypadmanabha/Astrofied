import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import astrologer from '../assets/hero-astrologer.png';
import zodiacBg from '../assets/zodiac-wheel.png';

export default function Hero() {
    const { isDarkMode } = useTheme();

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
                            className="text-4xl md:text-6xl lg:text-7xl font-bold font-raleway leading-[1.1] mb-6"
                            style={{ color: isDarkMode ? '#F5F5F5' : '#0A0A0A' }}
                        >
                            A Deeper Understanding <br className="hidden md:block" />
                            <span style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>of Your Life</span> Begins Here
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`text-lg md:text-xl max-w-xl mb-12 opacity-80 font-mulish leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
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
                            <a
                                href="https://wa.me/919612736566?text=I%20want%20to%20book%20an%20appointment%20for%20an%20online%20consultation%20with%20Astrofied.%20Please%20guide%20me%20through%20the%20process%20of%20sending%20my%20birth%20details%20and%20completing%20the%20payment."
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105 active:scale-95 ${isDarkMode
                                    ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20'
                                    : 'bg-[#4B0082] text-white hover:bg-[#3A0066] shadow-[#4B0082]/30'
                                    }`}
                            >
                                Book a Consultation
                            </a>
                            <a
                                href="#why-astrofied"
                                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all border glass hover:scale-105 active:scale-95 ${isDarkMode
                                    ? 'border-gold/30 text-gold hover:border-gold shadow-gold/5'
                                    : 'border-[#4B0082]/30 text-[#4B0082] hover:border-[#4B0082] shadow-[#4B0082]/5'
                                    }`}
                            >
                                Explore Astrofied
                            </a>
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
                                    className="w-full h-auto object-contain select-none pointer-events-none"
                                    style={{ 
                                        filter: isDarkMode ? 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.2))' : 'drop-shadow(0 0 20px rgba(75, 0, 130, 0.1))',
                                        maskImage: 'linear-gradient(to bottom, black 92%, transparent 100%), linear-gradient(to right, black 92%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 92%, transparent 100%), linear-gradient(to right, black 92%, transparent 100%)'
                                    }}
                                    draggable={false}
                                />
                                
                                {/* Bottom Roadmap Label - MASKING THE SHARP EDGE */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-6 py-3 rounded-full border glass backdrop-blur-2xl whitespace-nowrap shadow-2xl ${
                                        isDarkMode ? 'border-gold/30 text-gold shadow-gold/20' : 'border-[#4B0082]/30 text-[#4B0082] shadow-[#4B0082]/20'
                                    }`}
                                >
                                    <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase">your roadmap to the right decisions</span>
                                </motion.div>
                            </motion.div>

                            {/* Floating Stats Badges - POSITIONED CLOSER AND OVERLAPPING */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className={`absolute right-4 md:right-10 lg:right-16 top-1/4 z-20 px-5 py-3 rounded-2xl border glass shadow-2xl backdrop-blur-xl ${isDarkMode ? 'border-gold/20' : 'border-[#4B0082]/20'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>2 Thousand+</span>
                                    <span className="text-xs opacity-70">Consultations</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                className={`absolute left-0 md:left-4 top-1/2 z-20 px-5 py-3 rounded-2xl border glass shadow-2xl backdrop-blur-xl ${isDarkMode ? 'border-gold/20' : 'border-[#4B0082]/20'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>7+ Years</span>
                                    <span className="text-xs opacity-70">of Experience</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className={`absolute right-12 md:right-20 lg:right-28 bottom-24 z-20 px-5 py-3 rounded-2xl border glass shadow-2xl backdrop-blur-xl ${isDarkMode ? 'border-gold/20' : 'border-[#4B0082]/20'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>100%</span>
                                    <span className="text-xs opacity-70">Satisfaction</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

