import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import astrologer from '../assets/hero-astrologer.png';
import solarSystem from '../assets/solar-system.png';

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
                                onClick={() => window.open('https://wa.me/919612736566?text=I%20want%20to%20book%20an%20appointment%20for%20an%20online%20consultation%20with%20Astrofied.%20Please%20guide%20me%20through%20the%20process%20of%20sending%20my%20birth%20details%20and%20completing%20the%20payment.', '_blank')}
                                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105 active:scale-95 border-none cursor-pointer ${isDarkMode
                                    ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20'
                                    : 'bg-[#4B0082] text-white hover:bg-[#3A0066] shadow-[#4B0082]/30'
                                    }`}
                            >
                                Book a Consultation
                            </button>
                            <button
                                onClick={() => {
                                    const element = document.querySelector('#why-astrofied');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
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
                        {/* Background Rotating Solar System */}
                        <motion.img
                            src={solarSystem}
                            alt=""
                            className="absolute w-[120%] h-[120%] md:w-[130%] md:h-[130%] max-w-none opacity-30 pointer-events-none select-none blur-[1px]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
        </section>
    );
}

