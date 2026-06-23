import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Heart, UserCheck, Star, Sparkles, BookOpen, Compass, Info, Briefcase, Landmark, Stethoscope, Scale, Baby, Mail, MessageSquare, ShieldCheck, FileText, X, ChevronsRight, Calendar, Users, Tag, Hash, Gem } from 'lucide-react';

import logo from '../assets/logo.png';

const desktopNavLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Team', href: '/about' },
    { name: 'Panchang', href: '#panchang' },
    { name: 'Journals', href: '#journals' },
    { name: 'Contact', href: '#footer' },
];

const mobileNavLinks = [
    { name: 'Services', href: '#services', icon: Briefcase },
    { name: 'Pricing', href: '#pricing', icon: Tag },
    { name: 'Numerology', href: '#numerology', icon: Hash },
    { name: 'Panchang', href: '#panchang', icon: Compass },
    { name: 'Journals', href: '#journals', icon: BookOpen },
    { name: 'Gemstones', href: '/gemstones', icon: Gem },
    { name: 'Feedback', href: '#feedback', icon: MessageSquare },
    { name: 'Team', href: '/about', icon: Users },
    { name: 'Contact', href: '#footer', icon: Mail },
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
            document.body.classList.add('mobile-nav-active');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('mobile-nav-active');
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Mobile Menu Backdrop & Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop Overlay to disable background interactions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
                        />

                        {/* Drawer Menu (Half-width on tablets/iPads) */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed top-0 left-0 bottom-0 w-[85%] sm:w-1/2 lg:hidden z-[100] flex flex-col items-start justify-start pt-24 gap-0 overflow-y-auto px-8 shadow-2xl ${
                                isDarkMode 
                                    ? 'bg-gradient-to-br from-black via-[#08002e] to-black border-r border-gold/10' 
                                    : 'bg-[#f5f5dd] border-r border-[#A30000]/10'
                            }`}
                        >
                            {/* Decorative Glow */}
                            <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-20 -z-10 rounded-full ${isDarkMode ? 'bg-gold' : 'bg-transparent'}`} />
                            <div className={`absolute bottom-0 left-0 w-48 h-48 blur-[100px] opacity-10 -z-10 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-400'}`} />

                            {/* Mobile Menu Header */}
                            <div 
                                className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer"
                                onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            >
                                <img
                                    src={logo}
                                    alt="Astrofied Logo"
                                    className="w-9 h-9 object-contain"
                                    style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                                />
                                <span
                                    className={`text-2xl font-nunito font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                                        isDarkMode 
                                            ? 'from-red-600 to-yellow-500' 
                                            : 'from-black to-red-600'
                                        }`}
                                >
                                    Astrofied
                                </span>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className={`absolute top-8 right-8 p-1.5 focus:outline-none transition-all duration-300 border-none bg-transparent cursor-pointer rounded-full hover:scale-110 ${
                                    isDarkMode ? 'text-gold hover:bg-white/5' : 'text-black hover:bg-black/5'
                                }`}
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col w-full max-w-[300px] mt-2">
                                {mobileNavLinks.map((link, index) => {
                                    return (
                                        <div key={link.name} className="flex flex-col w-full">
                                            {index > 0 && (
                                                <div className={`h-[0.5px] w-[92%] my-1.5 mx-auto ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />
                                            )}
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03, type: 'spring', stiffness: 120 }}
                                                onClick={(e) => {
                                                    const targetHref = link.href === '/about'
                                                        ? ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ? 'http://localhost:5003' : '/about')
                                                        : link.href === '/gemstones'
                                                            ? ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ? 'http://localhost:5002' : '/gemstones/')
                                                            : link.href;
                                                    if (targetHref.startsWith('#')) {
                                                        const element = document.querySelector(targetHref);
                                                        if (element) {
                                                            element.scrollIntoView({ behavior: 'smooth' });
                                                        }
                                                    } else {
                                                        window.location.href = targetHref;
                                                    }
                                                    setIsOpen(false);
                                                }}
                                                className={`group flex items-center gap-3.5 text-sm sm:text-base font-bold tracking-wider font-mulish py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                                    isDarkMode 
                                                        ? 'text-gray-300 hover:text-gold hover:bg-white/5' 
                                                        : 'text-[#491000] hover:text-[#FF0000] hover:bg-black/5'
                                                }`}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <div className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-110 shrink-0 ${
                                                    isDarkMode 
                                                        ? 'bg-gold/10 text-gold shadow-[0_0_12px_rgba(212,175,55,0.08)]' 
                                                        : 'bg-[#FF0000]/10 text-[#FF0000] shadow-[0_0_12px_rgba(255,0,0,0.05)]'
                                                }`}>
                                                    <link.icon size={16} strokeWidth={2.5} />
                                                </div>
                                                <span>{link.name}</span>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${scrolled 
                    ? isDarkMode ? 'py-2 bg-black/60 border-b border-gold/20 shadow-2xl' : 'py-2 bg-white/60 border-b border-[#A30000]/10 shadow-xl'
                    : 'py-3 md:py-4 bg-transparent'
                }`}
            >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Left Section: Hamburger (Mobile) + Logo (All) */}
                <div className="flex items-center gap-2 md:gap-0">
                    {/* Mobile Menu Toggle (Left on mobile, Hidden on desktop) */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex flex-col justify-center items-center w-10 h-10 gap-1 focus:outline-none transition-all duration-300 bg-transparent border-none"
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 5, scaleX: 1.2 } : { rotate: 0, y: 0, scaleX: 1 }}
                                className={`w-5 h-0.5 ${isDarkMode ? 'bg-gold' : 'bg-black'}`}
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                                className={`w-5 h-0.5 ${isDarkMode ? 'bg-gold' : 'bg-black'}`}
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -5, scaleX: 1.2 } : { rotate: 0, y: 0, scaleX: 1 }}
                                className={`w-5 h-0.5 ${isDarkMode ? 'bg-gold' : 'bg-black'}`}
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
                                    ? 'from-red-600 to-yellow-500' 
                                    : 'from-black to-red-600'
                            }`}
                        >
                            Astrofied
                        </span>
                    </motion.div>
                </div>

                {/* Right Section: Desktop Links + Toggle (Desktop) / Toggle only (Mobile) */}
                <div className="flex items-center gap-8">
                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {desktopNavLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                onClick={() => {
                                    const targetHref = link.href === '/about'
                                        ? ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ? 'http://localhost:5003' : '/about')
                                        : link.href;
                                    if (targetHref.startsWith('#')) {
                                        const element = document.querySelector(targetHref);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    } else {
                                        window.location.href = targetHref;
                                    }
                                }}
                                className={`text-lg font-bold transition-all relative group bg-transparent border-none p-0 cursor-pointer ${
                                    isDarkMode ? 'text-gray-100 hover:text-gold' : 'text-black hover:text-[#FF0000]'
                                }`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                                    isDarkMode ? 'bg-gold' : 'bg-[#FF0000]'
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
                            isDarkMode ? 'text-gold' : 'text-[#491000]'
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
