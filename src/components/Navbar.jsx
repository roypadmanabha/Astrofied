import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Home, Heart, UserCheck, Star, Sparkles, BookOpen, Compass, Info, Briefcase, Landmark, Stethoscope, Scale, Baby, Mail, MessageSquare, ShieldCheck, FileText, X, ChevronsRight, ChevronRight, Calendar, Users, Tag, Hash, Gem, Newspaper, Phone, CheckCircle2 } from 'lucide-react';
import { getNewsfiedPosts, subscribeToNewsfied, getInitialPostsSync } from '../lib/newsfiedStorage';

import logo from '../assets/logo.png';

export default function Navbar({ onOpenLegal, onOpenConsultation, isExplore }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const [newsfiedPosts, setNewsfiedPosts] = useState(getInitialPostsSync);
    const [currentHash, setCurrentHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));

    useEffect(() => {
        const handleHash = () => setCurrentHash(window.location.hash);
        window.addEventListener('hashchange', handleHash);
        window.addEventListener('popstate', handleHash);
        return () => {
            window.removeEventListener('hashchange', handleHash);
            window.removeEventListener('popstate', handleHash);
        };
    }, []);

    const isExploreRoute = !!isExplore || (!!currentHash && (
        currentHash.startsWith('#explore') || 
        currentHash.startsWith('#political') || 
        currentHash.startsWith('#rashifal') || 
        currentHash.startsWith('#weekly-rashifal') || 
        currentHash.startsWith('#forecasts') || 
        currentHash.startsWith('#whats-going-to-happen') || 
        currentHash.startsWith('#transits') || 
        currentHash.startsWith('#transit')
    ));

    // Temporary announcement bar active till Dec 31, 2026, 11:59:59 PM (IST)
    const [isAnnouncementActive] = useState(() => {
        return new Date() <= new Date('2026-12-31T23:59:59+05:30');
    });

    useEffect(() => {
        let mounted = true;
        getNewsfiedPosts().then((posts) => {
            if (mounted && Array.isArray(posts)) {
                setNewsfiedPosts(posts);
            }
        });

        const unsubscribe = subscribeToNewsfied((updatedList) => {
            if (mounted && Array.isArray(updatedList)) {
                setNewsfiedPosts(updatedList);
            }
        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    const hasNewsfiedPosts = Array.isArray(newsfiedPosts) && newsfiedPosts.length > 0;

    const desktopNavLinks = isExploreRoute
        ? [
            { name: 'Home', href: '#' },
            { name: 'Services', href: '#pricing' },
            { name: 'Numero', href: '#numerology' },
            { name: 'Panchang', href: '#panchang' },
            { name: 'Journals', href: '#journals' },
            { 
                name: 'Newsfied', 
                href: '#newsfied', 
                disabled: !hasNewsfiedPosts 
            },
            { name: 'Team', href: '/about' },
            { name: 'Contact', href: '#footer' },
        ]
        : [
            { name: 'Services', href: '#pricing' },
            { 
                name: 'Explore', 
                href: '#explore' 
            },
            { name: 'Numero', href: '#numerology' },
            { name: 'Panchang', href: '#panchang' },
            { name: 'Journals', href: '#journals' },
            { 
                name: 'Newsfied', 
                href: '#newsfied', 
                disabled: !hasNewsfiedPosts 
            },
            { name: 'Team', href: '/about' },
            { name: 'Contact', href: '#footer' },
        ];

    const mobileNavSections = [
        {
            title: "ASTRO SERVICES",
            links: [
                { name: 'Home', href: '#', icon: Home },
                { name: 'Services', href: '#pricing', icon: Briefcase },
                ...(!isExploreRoute ? [{ 
                    name: 'Explore', 
                    href: '#explore', 
                    icon: Sparkles,
                    isGradient: true,
                    disabled: false 
                }] : []),
                { name: 'Free Kundali', href: '#kundali', icon: Sparkles, badge: 'FREE', isHighlight: true },
                { name: 'Numero', href: '#numerology', icon: Hash },
                { name: 'Panchang', href: '#panchang', icon: Compass },
                { name: 'Gemstones', href: '/gemstones', icon: Gem, badge: 'Remedies' },
            ]
        },
        {
            title: "DISCOVER & CONNECT",
            links: [
                { name: 'Journals', href: '#journals', icon: BookOpen },
                { 
                    name: 'Newsfied', 
                    href: '#newsfied', 
                    icon: Newspaper, 
                    badge: hasNewsfiedPosts ? 'LIVE' : null, 
                    isPulse: hasNewsfiedPosts,
                    disabled: !hasNewsfiedPosts 
                },
                { name: 'Our Team', href: '/about', icon: Users },
                { name: 'Client Feedback', href: '#feedback', icon: MessageSquare },
                { name: 'Contact Us', href: '#footer', icon: Mail },
            ]
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('mobile-nav-active');
            if (window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('mobile-nav-active');
            if (window.lenis) window.lenis.start();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleNavClick = (link) => {
        if (link.disabled) return;
        const targetHref = link.href === '/about'
            ? ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ? 'http://localhost:5003' : '/about')
            : link.href === '/gemstones'
                ? ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ? 'http://localhost:5004' : '/gemstones/')
                : link.href;

        // Immediately unlock body scroll and resume Lenis before scrolling
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-nav-active');
        if (window.lenis) {
            window.lenis.start();
            window.lenis.resize();
        }
        setIsOpen(false);

        if (targetHref.startsWith('#')) {
            const cleanHash = targetHref.replace(/\/+$/, '');

            if (cleanHash === '#' || cleanHash === '') {
                if (isExploreRoute) {
                    window.location.hash = '#';
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
                const scrollToTop = () => {
                    document.body.style.overflow = '';
                    document.body.classList.remove('mobile-nav-active');
                    if (window.lenis) {
                        window.lenis.start();
                        window.lenis.scrollTo(0, { duration: 1.0 });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                };
                scrollToTop();
                setTimeout(scrollToTop, 60);
                return;
            }

            if (cleanHash === '#explore') {
                if (isExploreRoute) return;
                window.location.hash = '#explore';
                window.dispatchEvent(new HashChangeEvent('hashchange'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            if (isExploreRoute) {
                // When navigating from Explore hub/subpages to homepage sections
                window.location.hash = cleanHash;
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            } else {
                // Already on homepage, update URL without instant snapping
                window.history.pushState(null, '', cleanHash);

                const scrollToElement = () => {
                    document.body.style.overflow = '';
                    document.body.classList.remove('mobile-nav-active');
                    if (window.lenis) {
                        window.lenis.start();
                        window.lenis.resize();
                    }
                    const element = document.querySelector(cleanHash);
                    if (element) {
                        const header = document.querySelector('header');
                        const headerOffset = header ? header.offsetHeight : 95;
                        const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - headerOffset - 12);

                        if (window.lenis) {
                            window.lenis.scrollTo(element, { offset: -headerOffset - 12, duration: 1.1, immediate: false });
                        } else {
                            window.scrollTo({ top: targetY, behavior: 'smooth' });
                        }
                    }
                };

                scrollToElement();
                setTimeout(scrollToElement, 60);
            }
        } else {
            window.location.href = targetHref;
        }
    };

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
                            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm xl:hidden"
                        />

                        {/* Drawer Menu */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed top-0 left-0 bottom-0 w-[88%] sm:w-[380px] md:w-[400px] xl:hidden z-[100] flex flex-col justify-between overflow-hidden shadow-2xl ${
                                isDarkMode 
                                    ? 'bg-[#0E0A1A] border-r border-gold/20 text-white' 
                                    : 'bg-[#FCFBF7] border-r border-[#A30000]/15 text-stone-900'
                            }`}
                        >
                            {/* Decorative Glow */}
                            <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-15 pointer-events-none -z-10 rounded-full ${isDarkMode ? 'bg-gold' : 'bg-red-400'}`} />
                            <div className={`absolute bottom-0 left-0 w-48 h-48 blur-[100px] opacity-10 pointer-events-none -z-10 rounded-full ${isDarkMode ? 'bg-purple-600' : 'bg-amber-400'}`} />

                            {/* Mobile Menu Header (Fixed) */}
                            <div className={`p-4 sm:p-5 flex items-center justify-between border-b shrink-0 ${
                                isDarkMode ? 'border-white/10 bg-black/30' : 'border-black/5 bg-white/50'
                            }`}>
                                <div 
                                    className="flex items-center gap-2.5 cursor-pointer"
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (isExploreRoute) {
                                            window.location.hash = '#';
                                            window.dispatchEvent(new HashChangeEvent('hashchange'));
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        } else {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <img
                                        src={logo}
                                        alt="Astrofied Logo"
                                        className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
                                        style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                                    />
                                    <div className="flex flex-col">
                                        <span 
                                            className={`text-xl font-nunito tracking-tight bg-clip-text text-transparent bg-gradient-to-r leading-tight ${
                                                isDarkMode 
                                                    ? 'from-red-600 to-[#f0fe4f]' 
                                                    : 'from-black to-[#A30000]'
                                            }`}
                                            style={{
                                                fontWeight: 650,
                                                fontVariationSettings: "'wght' 650",
                                                backgroundImage: isDarkMode
                                                    ? 'linear-gradient(to right, #dc2626, #f0fe4f)'
                                                    : 'linear-gradient(to right, #000000, #A30000)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                            }}
                                        >
                                            Astrofied
                                        </span>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <span className={`text-[10px] sm:text-[11px] font-semibold font-mulish tracking-tight ${
                                                isDarkMode ? 'text-stone-300' : 'text-stone-600'
                                            }`}>
                                                Astrologically Verified
                                            </span>
                                            <CheckCircle2 size={13} className="text-emerald-500 fill-emerald-500/20 shrink-0" strokeWidth={2.5} />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close menu"
                                    className={`w-7 h-7 rounded-full flex items-center justify-center focus:outline-none transition-all active:scale-90 cursor-pointer ${
                                        isDarkMode 
                                            ? 'text-stone-400 hover:text-gold hover:bg-white/10' 
                                            : 'text-stone-500 hover:text-black hover:bg-black/5'
                                    }`}
                                >
                                    <X size={15} strokeWidth={1.8} />
                                </button>
                            </div>

                            {/* Scrollable Navigation Sections */}
                            <div 
                                className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 space-y-4 overscroll-contain no-scrollbar"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {mobileNavSections.map((section) => (
                                    <div key={section.title} className="space-y-1">
                                        <div className={`text-[10px] font-extrabold tracking-[0.16em] uppercase px-3 py-1 font-mulish ${
                                            isDarkMode ? 'text-gold/70' : 'text-[#A30000]/70'
                                        }`}>
                                            {section.title}
                                        </div>
                                        <div className="space-y-0.5">
                                            {section.links.map((link) => {
                                                const IconComponent = link.icon;
                                                return (
                                                    <motion.div
                                                        key={link.name}
                                                        onClick={() => handleNavClick(link)}
                                                        whileTap={link.disabled ? {} : { scale: 0.98 }}
                                                        className={`group flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl transition-all ${
                                                            link.disabled
                                                                ? 'opacity-35 cursor-not-allowed select-none'
                                                                : isDarkMode
                                                                    ? 'hover:bg-white/5 text-stone-200 hover:text-white cursor-pointer'
                                                                    : 'hover:bg-black/5 text-stone-800 hover:text-black cursor-pointer'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                                                                link.disabled
                                                                    ? isDarkMode ? 'bg-white/5 text-stone-500' : 'bg-black/5 text-stone-400'
                                                                    : link.isHighlight
                                                                        ? 'bg-amber-500/20 text-amber-500 group-hover:scale-110'
                                                                        : isDarkMode
                                                                            ? 'bg-gold/10 text-gold group-hover:scale-110'
                                                                            : 'bg-[#A30000]/10 text-[#A30000] group-hover:scale-110'
                                                            }`}>
                                                                <IconComponent size={15} strokeWidth={2.2} />
                                                            </div>
                                                            <span 
                                                                className={`font-mulish font-medium text-sm tracking-wide truncate ${
                                                                    link.disabled
                                                                        ? 'text-gray-400 opacity-60'
                                                                        : (link.name === 'Journals' || link.name === 'Explore')
                                                                            ? `bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-red-600 to-[#f0fe4f]' : 'from-black to-[#FF0000]'}`
                                                                            : (isDarkMode ? 'text-stone-200 group-hover:text-white' : 'text-stone-800 group-hover:text-black')
                                                                }`}
                                                                style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 500 }}
                                                            >
                                                                {link.name}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-2 shrink-0">
                                                            {link.badge && (
                                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                                    link.isPulse 
                                                                        ? 'bg-red-600 text-white animate-pulse'
                                                                        : link.isHighlight
                                                                            ? 'bg-amber-500 text-black font-extrabold'
                                                                            : isDarkMode 
                                                                                ? 'bg-gold/20 text-gold border border-gold/30'
                                                                                : 'bg-[#A30000]/10 text-[#A30000] border border-[#A30000]/20'
                                                                }`}>
                                                                    {link.badge}
                                                                </span>
                                                            )}
                                                            {!link.disabled && (
                                                                <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all" />
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Conversion & Contact Strip */}
                            <div className={`p-4 sm:p-5 border-t shrink-0 space-y-2.5 ${
                                isDarkMode ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/70'
                            }`}>
                                {/* Primary CTA Button */}
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (onOpenConsultation) {
                                            onOpenConsultation();
                                        } else {
                                            const el = document.getElementById('footer');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-nunito font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                                        isDarkMode
                                            ? 'bg-white text-black hover:bg-[#f0fe4f] shadow-white/10 hover:shadow-gold/20'
                                            : 'bg-gradient-to-r from-black to-[#A30000] text-white hover:opacity-95 shadow-[#A30000]/25'
                                    }`}
                                >
                                    <Sparkles size={15} />
                                    <span>Book a Consultation</span>
                                </motion.button>

                                {/* Quick Phone & Email Reach-out */}
                                <div className="flex items-center justify-between gap-2">
                                    <a
                                        href="tel:+919612736566"
                                        className={`flex-1 py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                                            isDarkMode ? 'bg-white/5 hover:bg-white/10 text-stone-300' : 'bg-black/5 hover:bg-black/10 text-stone-700'
                                        }`}
                                    >
                                        <Phone size={12} className={isDarkMode ? 'text-gold' : 'text-[#A30000]'} />
                                        <span>Call Us</span>
                                    </a>
                                    <a
                                        href="mailto:contact.astrofied@gmail.com"
                                        className={`flex-1 py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                                            isDarkMode ? 'bg-white/5 hover:bg-white/10 text-stone-300' : 'bg-black/5 hover:bg-black/10 text-stone-700'
                                        }`}
                                    >
                                        <Mail size={12} className={isDarkMode ? 'text-gold' : 'text-[#A30000]'} />
                                        <span>Email</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
                <nav
                    className={`w-full transition-all duration-500 ${
                        isExploreRoute && !isDarkMode
                            ? `${scrolled ? 'py-2 shadow-md' : 'py-3 md:py-4 shadow-sm'} bg-[#f5f5dd] border-b border-black/10`
                            : `backdrop-blur-md ${scrolled 
                                ? isDarkMode ? 'py-2 bg-black/60 border-b border-gold/20 shadow-2xl' : 'py-2 bg-white/60 border-b border-[#A30000]/10 shadow-xl'
                                : 'py-3 md:py-4 bg-transparent'}`
                    }`}
                    style={
                        isExploreRoute && !isDarkMode
                            ? { backgroundColor: '#f5f5dd' }
                            : undefined
                    }
                >
                <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
                {/* Left Section: Logo Only (All screens) */}
                <div className="flex items-center shrink-0">
                    {/* Brand Logo & Name (All screens) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-1 sm:gap-1.5 cursor-pointer shrink-0"
                        onClick={() => {
                            setIsOpen(false);
                            if (isExploreRoute) {
                                window.location.hash = '#';
                                window.dispatchEvent(new HashChangeEvent('hashchange'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                                if (window.lenis) {
                                    window.lenis.scrollTo(0);
                                } else {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }
                        }}
                    >
                        <img
                            src={logo}
                            alt="Astrofied Logo"
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 xl:w-12 xl:h-12 object-contain"
                            style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply', marginRight: '-2px' }}
                        />
                        <span
                            className={`text-2xl sm:text-3xl xl:text-3xl 2xl:text-4xl font-nunito font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                                isDarkMode 
                                    ? 'from-red-600 to-[#f0fe4f]' 
                                    : 'from-black to-[#FF0000]'
                            }`}
                        >
                            Astrofied
                        </span>
                    </motion.div>
                </div>

                {/* Right Section: Desktop Links (xl+) + Toggle (All screens) */}
                <div className="flex items-center gap-3 sm:gap-4 xl:gap-6 2xl:gap-8 shrink-0">
                    {/* Desktop Links (Visible only on xl and above) */}
                    <div className="hidden xl:flex items-center gap-4 2xl:gap-7">
                        {desktopNavLinks.map((link) => {
                            const isJournals = link.name === 'Journals';
                            const isExplore = link.name === 'Explore';
                            const isGradientLink = isJournals || isExplore;

                            return (
                                <motion.button
                                    key={link.name}
                                    disabled={link.disabled}
                                    onClick={() => handleNavClick(link)}
                                    className={`text-lg font-mulish font-medium transition-all relative group bg-transparent border-none p-0 whitespace-nowrap ${
                                        link.disabled
                                            ? 'opacity-40 cursor-not-allowed text-gray-400 select-none pointer-events-none'
                                            : isGradientLink
                                                ? `bg-clip-text text-transparent bg-gradient-to-r ${
                                                    isDarkMode 
                                                        ? 'from-red-600 to-[#f0fe4f]' 
                                                        : 'from-black to-[#FF0000]'
                                                  } opacity-100 hover:opacity-60 transition-opacity duration-200 cursor-pointer`
                                                : (isDarkMode 
                                                    ? 'text-white hover:text-[#f0fe4f] transition-colors duration-200 cursor-pointer' 
                                                    : 'text-black hover:text-[#FF0000] transition-colors duration-200 cursor-pointer'
                                                  )
                                    }`}
                                    style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 500 }}
                                    whileHover={
                                        link.disabled
                                            ? {}
                                            : {
                                                scale: 1.05,
                                                ...(isGradientLink ? { opacity: 0.6 } : {})
                                              }
                                    }
                                >
                                    {link.name}
                                    {!link.disabled && (
                                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                                            isDarkMode
                                                ? 'bg-[#f0fe4f]'
                                                : 'bg-[#FF0000]'
                                        }`} />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Theme Toggle (Visible on all screens) */}
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.08, rotate: 12 }}
                        whileTap={{ scale: 0.92 }}
                        aria-label="Toggle Theme"
                        className={`p-1 sm:p-1.5 transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center justify-center ${
                            isDarkMode 
                                ? 'text-[#f0fe4f] hover:text-white' 
                                : 'text-[#FF0000] hover:text-black'
                        }`}
                    >
                        {isDarkMode ? (
                            <Sun className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" strokeWidth={1.8} />
                        ) : (
                            <Moon className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" strokeWidth={1.8} />
                        )}
                    </motion.button>

                    {/* Mobile & Tablet Menu Toggle (Hidden on xl desktop, rightmost element) */}
                    <div className="xl:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="group flex flex-col justify-center items-end w-7 h-7 gap-[5px] focus:outline-none transition-all duration-300 cursor-pointer bg-transparent border-none p-0"
                            aria-label="Toggle Navigation Menu"
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 3.5, width: 22 } : { rotate: 0, y: 0, width: 22 }}
                                transition={{ duration: 0.25 }}
                                className={`h-[2px] rounded-full origin-center ${isDarkMode ? 'bg-gold' : 'bg-black'}`}
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -3.5, width: 22 } : { rotate: 0, y: 0, width: 14 }}
                                transition={{ duration: 0.25 }}
                                className={`h-[2px] rounded-full origin-center transition-all duration-300 group-hover:!w-[22px] ${isDarkMode ? 'bg-gold' : 'bg-black'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        {/* Fixed Temporary Announcement Bar (Active till Dec 31, 2026 11:59 PM) */}
        {isAnnouncementActive && (
            <aside
                role="region"
                aria-label="In-Person Consultations Announcement"
                className={`w-full py-0.5 sm:py-1 select-none shadow-sm flex items-center transition-colors duration-300 relative overflow-hidden ${
                    isDarkMode
                        ? 'bg-[#f0fe4f] text-black'
                        : 'announcement-live-light text-white'
                }`}
                style={
                    isDarkMode
                        ? { backgroundColor: '#f0fe4f', color: '#000000' }
                        : { color: '#ffffff' }
                }
            >
                {/* Continuous luminous sheen sweep */}
                <div className="announcement-shimmer-beam" />

                {/* 1-Line Container: Infinite smooth marquee on mobile, centered on desktop */}
                <div className="w-full overflow-hidden whitespace-nowrap leading-none flex items-center">
                    <div className="announcement-ticker-track flex items-center md:justify-center">
                        {/* Item 1 */}
                        <div className="inline-flex items-center shrink-0 px-2.5 md:px-0">
                            <span className="relative flex h-1.5 w-1.5 mr-1.5 shrink-0">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDarkMode ? 'bg-black' : 'bg-red-300'}`} />
                                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isDarkMode ? 'bg-black' : 'bg-red-500'}`} />
                            </span>
                            <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight sm:tracking-normal font-mulish leading-none">
                                From 1st January 2027, Astrofied will launch <strong className="font-extrabold uppercase tracking-wide">OFFLINE CONSULTATIONS</strong> exclusively for the people of Tripura.
                            </span>
                        </div>

                        {/* Item 2 (Rendered on mobile for seamless continuous 1-line looping) */}
                        <div className="inline-flex items-center shrink-0 px-2.5 md:hidden" aria-hidden="true">
                            <span className="mx-2.5 opacity-50 font-bold">•</span>
                            <span className="relative flex h-1.5 w-1.5 mr-1.5 shrink-0">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDarkMode ? 'bg-black' : 'bg-red-300'}`} />
                                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isDarkMode ? 'bg-black' : 'bg-red-500'}`} />
                            </span>
                            <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight sm:tracking-normal font-mulish leading-none">
                                From 1st January 2027, Astrofied will launch <strong className="font-extrabold uppercase tracking-wide">OFFLINE CONSULTATIONS</strong> exclusively for the people of Tripura.
                            </span>
                        </div>
                    </div>
                </div>
            </aside>
        )}
        </header>
        </div>
    );
}
