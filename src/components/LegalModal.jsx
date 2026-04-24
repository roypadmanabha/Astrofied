import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const LegalModal = ({ isOpen, onClose, title, content }) => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 overflow-hidden">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className={`relative w-[90vw] md:w-full md:max-w-2xl aspect-square md:aspect-auto bg-modal-bg rounded-[2.5rem] shadow-2xl border overflow-hidden flex flex-col ${isDarkMode
                            ? 'bg-[#0f0a1f] border-gold/30 text-white'
                            : 'bg-[#FCF9F2] border-[#D4AF37]/30 text-[#0A1931]'
                        }`}
                    style={{ maxHeight: '90vh' }}
                >
                    {/* Header */}
                    <div className={`flex items-center justify-between p-6 md:p-8 border-b ${isDarkMode ? 'border-white/10' : 'border-[#0A1931]/10'
                        }`}>
                        <div className="flex items-center gap-4">
                            <img
                                src={logo}
                                alt="Astrofied"
                                className="w-10 h-10 object-contain"
                                style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                            />
                            <h2 className="text-xl md:text-2xl font-bold font-mulish">{title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-white/10 text-gold' : 'hover:bg-[#0A1931]/10 text-[#4B0082]'
                                }`}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div
                        className="flex-1 overflow-y-auto p-6 md:p-10 font-mulish custom-scrollbar"
                        data-lenis-prevent
                    >
                        <div
                            className={`text-sm md:text-base leading-relaxed opacity-90 whitespace-pre-line text-justify`}
                            dangerouslySetInnerHTML={{ __html: content || "Content will be updated soon..." }}
                        />
                    </div>

                    {/* Footer / Fade effect */}
                    <div className={`h-8 pointer-events-none absolute bottom-0 left-0 right-0 ${isDarkMode
                            ? 'bg-gradient-to-t from-[#0f0a1f] to-transparent'
                            : 'bg-gradient-to-t from-[#FCF9F2] to-transparent'
                        }`} />
                </motion.div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? 'rgba(212, 175, 55, 0.2)' : 'rgba(75, 0, 130, 0.2)'};
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${isDarkMode ? 'rgba(212, 175, 55, 0.5)' : 'rgba(75, 0, 130, 0.5)'};
                }
            `}</style>
        </AnimatePresence>
    );
};

export default LegalModal;
