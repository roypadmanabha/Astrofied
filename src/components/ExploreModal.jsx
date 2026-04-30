import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const ExploreModal = ({ isOpen, onClose }) => {
    const { isDarkMode } = useTheme();

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const points = [
        "Astrofied, a renowned astrological epicenter founded in 2019 by astrologer Shri Prasanta Chakraborty, has been a beacon of clarity and guidance for thousands seeking cosmic insight.",
        "Our mission is to guide individuals toward the right path and align them with their true destiny through precise astrological analysis.",
        "By 2025, we have consulted over 5,000 clients facing various life challenges, helping them align their karma with their destiny. We look forward to continuing this journey across India and beyond.",
        "Our lead astrologer is an expert in Vedic, KP, Jaimini, Nakshatra Nadi, and Bhrigu Nandi Nadi (BNN), utilizing a meticulously calculative approach to deliver accurate predictions.",
        "We offer a wide range of online services at affordable and competitive rates, ensuring that everyone can access professional guidance to align their actions with their destiny.",
        "In an era dominated by technology and AI, many are misguided by platforms that lack authenticity or are prohibitively expensive. Astrofied stands apart by maintaining full transparency and upholding the integrity of traditional, calculative astrology.",
        "While astrology can provide remarkably accurate predictions, it cannot change destiny. Every individual is born with a \"karmic debt\" and lives according to their Prarabdha and Sanchit Karma.",
        "The reason to choose Astrofied is as clear as freshwater. You will gain a lucid vision of your future, helping you validate past decisions and evaluate upcoming choices to determine what is truly best for your journey.",
        "Astrofied guarantees the quality of our predictions through 1:1 transparency. We do not rely on AI; your future is analyzed strictly by our expert astrologer to ensure personalized and authentic guidance.",
        "We provide continuous astrological insights across our social media platforms, allowing you to understand your cosmic identity with a single tap. It is the most accessible way to learn astrology with zero prerequisites."
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: -15 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            duration: 0.6
                        }}
                        className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] border shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col
                            ${isDarkMode
                                ? 'bg-[#0a0218]/80 border-gold/30 text-white'
                                : 'bg-white/80 border-[#4B0082]/30 text-black'}
                        `}
                    >
                        {/* Water/Shining Effect Background */}
                        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    x: [0, 50, 0],
                                    y: [0, 30, 0],
                                }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className={`absolute top-0 left-0 w-full h-full opacity-20 blur-[100px]
                                    ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`}
                            />
                            <motion.div
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    x: [0, -50, 0],
                                    y: [0, -30, 0],
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className={`absolute bottom-0 right-0 w-full h-full opacity-20 blur-[100px]
                                    ${isDarkMode ? 'bg-[#4B0082]' : 'bg-gold'}`}
                            />
                            {/* Branded Watermark - Fixed in center */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none select-none">
                                <img 
                                    src={logo} 
                                    alt="" 
                                    className="w-[80%] md:w-1/2 h-auto object-contain" 
                                    style={{ filter: isDarkMode ? 'brightness(1.5)' : 'none' }}
                                />
                            </div>
                            {/* Refraction Shine */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Content Area - Scrollable */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-10" data-lenis-prevent>
                            <div className="flex items-center justify-center mb-6 md:mb-8">
                                <h2 className={`text-[4.5vw] sm:text-2xl md:text-4xl font-black tracking-tight font-mulish whitespace-nowrap overflow-hidden bg-clip-text text-transparent
                                    ${isDarkMode 
                                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFFFFF]' 
                                        : 'bg-gradient-to-r from-[#000000] to-[#FF0000]'}
                                `}>
                                    Astrofied: Astrologically Verified
                                </h2>
                            </div>

                            <div className="space-y-5 md:space-y-8">
                                {points.map((text, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="flex gap-3 md:gap-4 items-start group"
                                    >
                                        <span className={`flex-shrink-0 w-7 h-7 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-black text-[10px] md:text-base transition-colors
                                            ${isDarkMode 
                                                ? 'border-gold text-gold group-hover:bg-gold group-hover:text-black' 
                                                : 'border-[#4B0082] text-[#4B0082] group-hover:bg-[#4B0082] group-hover:text-white'}
                                        `}>
                                            {index + 1}
                                        </span>
                                        <p className="text-[3.4vw] sm:text-base md:text-lg leading-relaxed opacity-90 font-mulish font-medium">
                                            {text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Ending Line */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5 }}
                                className="mt-10 md:mt-16 text-center"
                            >
                                <p className={`text-base md:text-3xl font-black italic tracking-tight font-mulish
                                    ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}
                                `}>
                                    What are you waiting for? Book your online consultation now and clear all your doubts!
                                </p>
                            </motion.div>
                        </div>

                        {/* Footer - Close Button */}
                        <div className={`p-4 md:p-6 border-t backdrop-blur-xl
                            ${isDarkMode ? 'border-gold/20 bg-black/40' : 'border-[#4B0082]/10 bg-white/40'}
                        `}>
                            <button
                                onClick={onClose}
                                className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-lg tracking-widest uppercase transition-all shadow-xl active:scale-95
                                    ${isDarkMode 
                                        ? 'bg-gold text-black hover:bg-white shadow-gold/20' 
                                        : 'bg-[#4B0082] text-white hover:bg-black shadow-[#4B0082]/20'}
                                `}
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: ${isDarkMode ? 'rgba(212, 175, 55, 0.3)' : 'rgba(75, 0, 130, 0.2)'};
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: ${isDarkMode ? 'rgba(212, 175, 55, 0.5)' : 'rgba(75, 0, 130, 0.4)'};
                        }
                    `}} />
                </div>
            )}
        </AnimatePresence>
    );
};

export default ExploreModal;
