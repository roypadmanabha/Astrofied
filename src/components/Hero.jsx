import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import astrologer from '../assets/about-section-image.jpg';

export default function Hero() {
    const { isDarkMode } = useTheme();

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-12 md:pb-20 overflow-hidden">
            {/* Background elements */}
            <div className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[120px] opacity-30 ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`} />
            <div className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-20 ${isDarkMode ? 'bg-[#4B0082]' : 'bg-gold'}`} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Left Content */}
                    <div className="w-full lg:w-3/5 text-center lg:text-left order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 glass ${isDarkMode ? 'border-gold/20 text-gold shadow-gold/10' : 'border-[#4B0082]/20 text-[#4B0082] shadow-[#4B0082]/10'
                                }`}
                        >
                            <span className="text-sm font-bold tracking-wider uppercase">✦ Vedic Astrology & Spiritual Guidance</span>
                        </motion.div>

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
                            className={`text-lg md:text-xl max-w-2xl mb-12 opacity-80 font-mulish leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
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
                                href="#feedback"
                                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105 active:scale-95 ${isDarkMode
                                    ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20'
                                    : 'bg-[#4B0082] text-white hover:bg-[#3A0066] shadow-[#4B0082]/30'
                                    }`}
                            >
                                Book a Consultation
                            </a>
                            <a
                                href="#services"
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
                    <div className="w-full lg:w-2/5 relative flex justify-center order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]"
                        >
                            {/* Main Image with Frame */}
                            <div className={`relative z-10 w-full h-full rounded-[40px] overflow-hidden border-2 p-3 ${isDarkMode ? 'border-gold/30 bg-black/40' : 'border-[#4B0082]/20 bg-white/40'
                                } glass`}>
                                <img
                                    src={astrologer}
                                    alt="Astrologer"
                                    className="w-full h-full object-cover rounded-[30px] select-none pointer-events-none"
                                    draggable={false}
                                />
                            </div>

                            {/* Floating Stats Badges */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className={`absolute -right-8 top-10 z-20 px-5 py-3 rounded-2xl border glass shadow-2xl ${isDarkMode ? 'border-gold/30' : 'border-[#4B0082]/20'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>2 Thousand+</span>
                                    <span className="text-xs opacity-70">Consultations Completed</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                className={`absolute -left-12 bottom-20 z-20 px-5 py-3 rounded-2xl border glass shadow-2xl ${isDarkMode ? 'border-gold/30' : 'border-[#4B0082]/20'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>7+ Years</span>
                                    <span className="text-xs opacity-70">of Legacy</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className={`absolute -right-4 bottom-4 z-20 px-5 py-3 rounded-2xl border glass shadow-2xl ${isDarkMode ? 'border-gold/30' : 'border-[#4B0082]/20'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>100%</span>
                                    <span className="text-xs opacity-70">Positive Feedback</span>
                                </div>
                            </motion.div>

                            {/* Decorative Background Circles */}
                            <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full border-2 border-dashed opacity-20 ${isDarkMode ? 'border-gold' : 'border-[#4B0082]'
                                } animate-[spin_20s_linear_infinite]`} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
