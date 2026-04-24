import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { X, Check, ArrowRight } from 'lucide-react';
import guidelinesImg from '../assets/consultation-guidelines.png';

export default function ConsultationModal({ isOpen, onClose, onConfirm }) {
    const { isDarkMode } = useTheme();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] border shadow-2xl flex flex-col ${
                            isDarkMode ? 'bg-black/80 border-gold/20' : 'bg-white/80 border-[#4B0082]/10'
                        } glass`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                Online Consultation Guidelines
                            </h3>
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Guidelines Image Body */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
                            <div className={`rounded-3xl overflow-hidden border shadow-lg ${
                                isDarkMode ? 'border-white/5' : 'border-black/5'
                            }`}>
                                <img
                                    src={guidelinesImg}
                                    alt="Consultation Guidelines"
                                    className="w-full h-auto object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/800x1200?text=Guidelines+Image+Loading...';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className={`p-6 border-t flex flex-col sm:flex-row gap-4 items-center justify-center ${
                            isDarkMode ? 'border-white/10' : 'border-black/5'
                        }`}>
                            <button
                                onClick={onClose}
                                className={`w-full sm:w-auto px-10 py-3 rounded-full font-bold transition-all border ${
                                    isDarkMode 
                                        ? 'border-white/10 text-white hover:bg-white/5' 
                                        : 'border-black/10 text-gray-700 hover:bg-black/5'
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`w-full sm:w-auto px-12 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                                    isDarkMode 
                                        ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20' 
                                        : 'bg-[#4B0082] text-white hover:bg-[#34005a] shadow-[#4B0082]/20'
                                }`}
                            >
                                Proceed <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
