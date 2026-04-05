import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import logo from '../assets/logo.png';

const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#footer' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Prevent background scrolling when mobile menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Mobile Menu Overlay - Move outside the nav to avoid inheritance issues */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className={`fixed inset-0 z-[100] flex flex-col items-center pt-32 pb-12 gap-8 md:hidden overflow-y-auto ${
                            isDarkMode ? 'bg-black' : 'bg-white'
                        }`}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`absolute top-6 right-6 text-3xl p-3 focus:outline-none transition-all ${
                                isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                            }`}
                        >
                            ✕
                        </button>
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-2xl font-bold tracking-wide transition-all block py-3 ${
                                    isDarkMode ? 'text-white hover:text-gold' : 'text-[#4B0082] hover:text-[#DC2626]'
                                }`}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled 
                    ? isDarkMode ? 'py-2 bg-black border-b border-gold/20 shadow-2xl' : 'py-2 bg-white border-b border-[#4B0082]/10 shadow-xl'
                    : 'py-3 md:py-4 bg-transparent'
                }`}
            >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 md:gap-4 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="shining-frame">
                        <img
                            src={logo}
                            alt="Astrofied Logo"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gold/30 object-cover"
                        />
                    </div>
                    <span
                        className="text-base md:text-xl font-bold tracking-tighter"
                        style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                    >
                        Astrofied
                    </span>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className={`text-lg font-bold transition-all relative group ${
                                isDarkMode ? 'text-gray-100 hover:text-gold' : 'text-[#4B0082] hover:text-[#DC2626]'
                            }`}
                            whileHover={{ scale: 1.05 }}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                                isDarkMode ? 'bg-gold' : 'bg-[#DC2626]'
                            }`} />
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex flex-col justify-center items-center w-8 h-8 gap-1 focus:outline-none transition-all duration-300 rounded-md ${
                            isDarkMode ? 'glass' : 'bg-[#4B0082]/5 border border-[#4B0082]/10'
                        }`}
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 5, scaleX: 1.2 } : { rotate: 0, y: 0, scaleX: 1 }}
                            className={`w-5 h-0.5 ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`}
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                            className={`w-5 h-0.5 ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`}
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -5, scaleX: 1.2 } : { rotate: 0, y: 0, scaleX: 1 }}
                            className={`w-5 h-0.5 ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`}
                        />
                    </button>
                </div>
            </div>
        </nav>
        </div>
    );
}
