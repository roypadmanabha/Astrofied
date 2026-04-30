import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Heart, UserCheck, Star, Sparkles, BookOpen, Compass, Info, Briefcase, Landmark, Stethoscope, Scale, Baby, Mail, MessageSquare, ShieldCheck, FileText, X, ChevronsRight } from 'lucide-react';

import logo from '../assets/logo.png';

const desktopNavLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Kundali', href: '#kundali' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#footer' },
];

const mobileNavLinks = [
    { name: 'Book Consultation', href: '#', icon: ChevronsRight },
    { name: 'Services', href: '#services', icon: ChevronsRight },
    { name: 'Pricing', href: '#pricing', icon: ChevronsRight },
    { name: 'Kundali', href: '#kundali', icon: ChevronsRight },
    { name: 'About', href: '#about', icon: ChevronsRight },
    { name: 'Contact', href: '#footer', icon: ChevronsRight },
    { name: 'Feedback', href: '#feedback', icon: ChevronsRight },
    { name: 'Terms & Conditions', href: '/terms-and-conditions.html', icon: ChevronsRight },
    { name: 'Privacy Policy', href: '/privacy-policy.html', icon: ChevronsRight },
];

export default function Navbar({ onOpenLegal, onOpenConsultation }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
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
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className={`fixed inset-0 z-[100] flex flex-col items-start justify-start pt-32 gap-0 md:hidden overflow-y-auto px-8 ${
                            isDarkMode 
                                ? 'bg-gradient-to-br from-black via-[#08002e] to-black border-r border-gold/10' 
                                : 'bg-gradient-to-br from-white via-[#f0e6ff] to-white border-r border-[#4B0082]/10'
                        }`}
                    >
                        {/* Decorative Glow */}
                        <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-20 -z-10 rounded-full ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`} />
                        <div className={`absolute bottom-0 left-0 w-48 h-48 blur-[100px] opacity-10 -z-10 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-400'}`} />

                        {/* Mobile Menu Header */}
                        <div 
                            className="absolute top-10 left-8 flex items-center gap-0 cursor-pointer"
                            onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            <span
                                className={`text-3xl font-nunito font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                                    isDarkMode 
                                        ? 'from-[#D4AF37] via-[#F1C40F] to-white' 
                                        : 'from-black via-gray-900 to-[#DC2626]'
                                }`}
                            >
                                Astrofied
                            </span>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className={`absolute top-10 right-8 p-2 focus:outline-none transition-all border-none bg-transparent ${
                                isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                            }`}
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col gap-1 w-full max-w-[280px]">
                            {mobileNavLinks.map((link, index) => {
                                const isLegal = link.href.includes('.html');
                                const type = link.name.includes('Terms') ? 'terms' : 'privacy';
                                
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.04, type: 'spring', stiffness: 100 }}
                                        onClick={(e) => {
                                            if (link.name === 'Book Consultation') {
                                                onOpenConsultation();
                                            } else if (isLegal) {
                                                onOpenLegal(type);
                                            } else {
                                                const element = document.querySelector(link.href);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }
                                            setIsOpen(false);
                                        }}
                                        className={`group flex items-center gap-4 text-base font-bold tracking-wide transition-all py-3 px-4 rounded-2xl cursor-pointer ${
                                            isDarkMode 
                                                ? 'text-gray-300 hover:text-gold hover:bg-gold/5' 
                                                : 'text-[#4B0082]/80 hover:text-[#4B0082] hover:bg-[#4B0082]/5'
                                        }`}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        <div className={`p-2 rounded-xl transition-all group-hover:scale-110 ${
                                            isDarkMode ? 'bg-gold/10 text-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'bg-[#4B0082]/10 text-[#4B0082]'
                                        }`}>
                                            <link.icon size={18} strokeWidth={3} />
                                        </div>
                                        <span>{link.name}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${scrolled 
                    ? isDarkMode ? 'py-2 bg-black/60 border-b border-gold/20 shadow-2xl' : 'py-2 bg-white/60 border-b border-[#4B0082]/10 shadow-xl'
                    : 'py-3 md:py-4 bg-transparent'
                }`}
            >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Left Section: Hamburger (Mobile) + Logo (All) */}
                <div className="flex items-center gap-2 md:gap-0">
                    {/* Mobile Menu Toggle (Left on mobile, Hidden on desktop) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex flex-col justify-center items-center w-10 h-10 gap-1 focus:outline-none transition-all duration-300 bg-transparent border-none"
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

                    {/* Brand Logo (Desktop) & Name (All) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-0 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <img
                            src={logo}
                            alt="Astrofied Logo"
                            className="hidden md:block w-12 h-12 md:w-14 md:h-14 object-contain"
                            style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply', marginRight: '-4px' }}
                        />
                        <span
                            className={`text-2xl md:text-4xl font-nunito font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                                isDarkMode 
                                    ? 'from-[#D4AF37] via-[#F1C40F] to-white' 
                                    : 'from-black via-gray-900 to-[#DC2626]'
                            }`}
                        >
                            Astrofied
                        </span>
                    </motion.div>
                </div>

                {/* Right Section: Desktop Links + Toggle (Desktop) / Toggle only (Mobile) */}
                <div className="flex items-center gap-8">
                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {desktopNavLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                onClick={() => {
                                    const element = document.querySelector(link.href);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className={`text-lg font-bold transition-all relative group bg-transparent border-none p-0 cursor-pointer ${
                                    isDarkMode ? 'text-gray-100 hover:text-gold' : 'text-[#4B0082] hover:text-[#DC2626]'
                                }`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                                    isDarkMode ? 'bg-gold' : 'bg-[#DC2626]'
                                }`} />
                            </motion.button>
                        ))}
                    </div>

                    {/* Theme Toggle (Visible on all screens) */}
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-1.5 transition-all duration-300 bg-transparent border-none ${
                            isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                        }`}
                    >
                        {isDarkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
                    </motion.button>
                </div>
            </div>
        </nav>
        </div>
    );
}
