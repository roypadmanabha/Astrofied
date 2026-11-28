import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, BookOpen, Clock, Calendar, Users, Award, CheckCircle2,
  ChevronRight, ArrowRight, Star, Sparkles, MessageCircle, Phone, X,
  ShieldCheck, HelpCircle, Layers, Video, FileText, Check, ChevronDown,
  Compass, Hash, Moon, Sun, Home, ExternalLink, Zap, Mail
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  ACADEMY_COURSES,
  ACADEMY_CATEGORIES,
  ACADEMY_STATS,
  ACADEMY_PERKS,
  ACADEMY_REVIEWS,
  ACADEMY_FAQS
} from '../data/academyCourses';

// Assets
import logo from '../assets/logo.png';
import prasantaImg from '../assets/Astrologer Prasanta Chakraborty.png';
import zodiacWheel from '../assets/zodiac-wheel.png';

const WHATSAPP_NUMBER = '919612736566';

export default function LearningAcademy({ onBackToHome }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Set document title to requested title
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Astrofied Learning Academy | Tripura's Best Astrology Learning Hub";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Listen to window scroll for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Control body scroll lock on mobile menu or modal open
  useEffect(() => {
    if (isMobileMenuOpen || activeCourseModal) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, activeCourseModal]);

  // Filter courses based on category
  const filteredCourses = selectedCategory === 'all'
    ? ACADEMY_COURSES
    : ACADEMY_COURSES.filter((c) => c.category === selectedCategory);

  // Build WhatsApp enrollment link with pre-filled message
  const getEnrollmentLink = (courseTitle = 'Astrology Courses') => {
    const text = encodeURIComponent(
      `Namaste Prasanta Sir, I am interested in enrolling in Astrofied Learning Academy for: "${courseTitle}". Please share the syllabus PDF, next batch dates, and enrollment details.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const handleReturnHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-[#FF0000] selection:text-white ${
        /* User Requirement: Dark mode must be fully plain solid black in color */
        isDarkMode ? 'bg-[#000000] text-white' : 'bg-[#f5f5dd] text-black'
      }`}
      style={{ fontFamily: '"Mulish", sans-serif' }}
    >
      {/* =========================================================================
          1. OFFICIAL RESPONSIVE STICKY NAVBAR & MOBILE DRAWER (Matching Main Page)
         ========================================================================= */}
      <div className="relative">
        {/* Mobile Menu Backdrop & Drawer (xl:hidden) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
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
                    ? 'bg-[#000000] border-r border-white/10 text-white'
                    : 'bg-[#f5f5dd] border-r border-black/10 text-black'
                }`}
              >
                {/* Decorative Glow */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-15 pointer-events-none -z-10 rounded-full ${
                    isDarkMode ? 'bg-[#f0fe4f]' : 'bg-[#FF0000]'
                  }`}
                />

                {/* Mobile Menu Header */}
                <div
                  className={`p-4 sm:p-5 flex items-center justify-between border-b shrink-0 ${
                    isDarkMode ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/50'
                  }`}
                >
                  <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        className={`text-xl font-nunito font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r leading-tight ${
                          isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black to-[#FF0000]'
                        }`}
                      >
                        Astrofied Academy
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className={`text-[10px] sm:text-[11px] font-semibold font-mulish tracking-tight ${
                            isDarkMode ? 'text-stone-300' : 'text-stone-600'
                          }`}
                        >
                          Tripura's Best Astrology Learning Hub
                        </span>
                        <CheckCircle2
                          size={12}
                          className="text-emerald-500 fill-emerald-500/20 shrink-0"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isDarkMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-black/5 text-black hover:bg-black/10'
                    }`}
                    aria-label="Close Navigation Menu"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Scrollable Nav Sections */}
                <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-6">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50 block mb-2 px-2">
                      ACADEMY SECTIONS
                    </span>
                    <div className="space-y-1">
                      {[
                        { name: 'Courses & Curriculum', href: '#courses', icon: BookOpen },
                        { name: 'Learning Methodology', href: '#perks', icon: Award },
                        { name: 'Chief Mentor (Prasanta Sir)', href: '#mentor', icon: Users },
                        { name: 'Diploma & Certification', href: '#certification', icon: ShieldCheck },
                        { name: 'Student Reviews', href: '#reviews', icon: MessageCircle },
                        { name: 'Frequently Asked Questions', href: '#faq', icon: HelpCircle },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all font-semibold text-xs sm:text-sm ${
                              isDarkMode
                                ? 'hover:bg-white/5 text-gray-200 hover:text-white'
                                : 'hover:bg-black/5 text-stone-800 hover:text-black'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Icon size={16} className={isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'} />
                              <span>{item.name}</span>
                            </span>
                            <ChevronRight size={14} className="opacity-40" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-50 block mb-2 px-2">
                      MAIN ASTROFIED PORTAL
                    </span>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleReturnHome();
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-semibold text-xs sm:text-sm text-left cursor-pointer ${
                          isDarkMode
                            ? 'hover:bg-white/5 text-gray-200 hover:text-white'
                            : 'hover:bg-black/5 text-stone-800 hover:text-black'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Home size={16} className={isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'} />
                          <span>Astrofied Main Page</span>
                        </span>
                        <ChevronRight size={14} className="opacity-40" />
                      </button>

                      <a
                        href="/#services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all font-semibold text-xs sm:text-sm ${
                          isDarkMode
                            ? 'hover:bg-white/5 text-gray-200 hover:text-white'
                            : 'hover:bg-black/5 text-stone-800 hover:text-black'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Compass size={16} className={isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'} />
                          <span>Consultation Services</span>
                        </span>
                        <ChevronRight size={14} className="opacity-40" />
                      </a>

                      <a
                        href="/#kundali"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all font-semibold text-xs sm:text-sm ${
                          isDarkMode
                            ? 'hover:bg-white/5 text-gray-200 hover:text-white'
                            : 'hover:bg-black/5 text-stone-800 hover:text-black'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Sparkles size={16} className="text-amber-500" />
                          <span>Free Kundali Generator</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold">
                          FREE
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div
                  className={`p-4 sm:p-5 border-t shrink-0 space-y-3 ${
                    isDarkMode ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/50'
                  }`}
                >
                  <a
                    href={getEnrollmentLink('Mobile Drawer Enrollment')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-green-600 shadow-md active:scale-95 transition-all"
                  >
                    <MessageCircle size={16} />
                    <span>Enroll on WhatsApp Desk</span>
                  </a>

                  <div className="flex items-center justify-between gap-2">
                    <a
                      href="tel:+919612736566"
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        isDarkMode
                          ? 'bg-white/5 hover:bg-white/10 text-stone-300'
                          : 'bg-black/5 hover:bg-black/10 text-stone-700'
                      }`}
                    >
                      <Phone size={13} className={isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'} />
                      <span>Call Us</span>
                    </a>
                    <a
                      href="mailto:contact.astrofied@gmail.com"
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        isDarkMode
                          ? 'bg-white/5 hover:bg-white/10 text-stone-300'
                          : 'bg-black/5 hover:bg-black/10 text-stone-700'
                      }`}
                    >
                      <Mail size={13} className={isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'} />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sticky Fixed Navbar (Exact Main Page Specs) */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
            scrolled
              ? isDarkMode
                ? 'py-2 bg-black/80 border-b border-white/10 shadow-2xl'
                : 'py-2 bg-[#f5f5dd]/90 border-b border-black/10 shadow-xl'
              : 'py-3 md:py-4 bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
            {/* Left Section: Brand Logo Only */}
            <div className="flex items-center shrink-0">
              {/* Brand Logo & Name (All screens) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img
                  src={logo}
                  alt="Astrofied Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 xl:w-12 xl:h-12 object-contain"
                  style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply', marginRight: '-2px' }}
                />
                <span
                  className={`text-xl sm:text-2xl md:text-3xl xl:text-3xl 2xl:text-4xl font-nunito font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r leading-none ${
                    isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black to-[#FF0000]'
                  }`}
                >
                  Astrofied Academy
                </span>
              </motion.div>
            </div>

            {/* Right Section: Desktop Links (xl+) + Theme Toggle + Desktop Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-4 xl:gap-6 2xl:gap-8 shrink-0">
              {/* Desktop Links (Visible only on xl and above) */}
              <div className="hidden xl:flex items-center gap-4 2xl:gap-7">
                {[
                  { name: 'Courses', href: '#courses' },
                  { name: 'Methodology', href: '#perks' },
                  { name: 'Chief Mentor', href: '#mentor' },
                  { name: 'Certification', href: '#certification' },
                  { name: 'Reviews', href: '#reviews' },
                  { name: 'FAQs', href: '#faq' },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-base 2xl:text-lg font-bold transition-all relative group bg-transparent border-none p-0 whitespace-nowrap cursor-pointer ${
                      isDarkMode
                        ? 'text-gray-100 hover:text-[#f0fe4f]'
                        : 'text-black hover:text-[#FF0000]'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isDarkMode ? 'bg-[#f0fe4f]' : 'bg-[#FF0000]'
                      }`}
                    />
                  </a>
                ))}
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
                  <Sun className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" strokeWidth={1.8} />
                ) : (
                  <Moon className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" strokeWidth={1.8} />
                )}
              </motion.button>

              {/* Mobile & Tablet Menu Toggle (Hidden on xl desktop, rightmost) */}
              <div className="xl:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="group flex flex-col justify-center items-end w-7 h-7 gap-[5px] focus:outline-none transition-all duration-300 cursor-pointer bg-transparent border-none p-0"
                  aria-label="Toggle Navigation Menu"
                >
                  <motion.span
                    animate={
                      isMobileMenuOpen ? { rotate: 45, y: 3.5, width: 22 } : { rotate: 0, y: 0, width: 22 }
                    }
                    transition={{ duration: 0.25 }}
                    className={`h-[2px] rounded-full origin-center ${
                      isDarkMode ? 'bg-[#f0fe4f]' : 'bg-black'
                    }`}
                  />
                  <motion.span
                    animate={
                      isMobileMenuOpen ? { rotate: -45, y: -3.5, width: 22 } : { rotate: 0, y: 0, width: 14 }
                    }
                    transition={{ duration: 0.25 }}
                    className={`h-[2px] rounded-full origin-center transition-all duration-300 group-hover:!w-[22px] ${
                      isDarkMode ? 'bg-[#f0fe4f]' : 'bg-black'
                    }`}
                  />
                </button>
              </div>

              {/* Desktop Actions (Hidden on mobile/tablet below xl) */}
              <div className="hidden xl:flex items-center gap-2 sm:gap-2.5">
                {/* Return to Main Portal Button */}
                <button
                  onClick={handleReturnHome}
                  title="Go to Astrofied Main Page"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
                    isDarkMode
                      ? 'border-[#f0fe4f]/30 text-[#f0fe4f] hover:bg-[#f0fe4f]/10'
                      : 'border-black text-black hover:bg-gradient-to-r hover:from-black hover:to-[#FF0000] hover:text-white hover:border-black'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Main Site</span>
                </button>

                {/* Direct WhatsApp Enrollment Button */}
                <a
                  href={getEnrollmentLink('Navbar General Enrollment')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-black to-[#FF0000] hover:opacity-90 shadow-md transition-all duration-300 active:scale-95 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Enroll Now</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* =========================================================================
          2. HERO SECTION: Professional LMS Hub
         ========================================================================= */}
      <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-16 overflow-hidden">
        {/* Decorative Atmospheric Lights */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[650px] h-[300px] sm:h-[450px] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none opacity-20 -z-10 ${
            isDarkMode ? 'bg-[#f0fe4f]' : 'bg-[#FF0000]'
          }`}
        />

        {/* Floating Rotating Zodiac Wheel Backdrop */}
        <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] lg:w-[650px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10 select-none animate-spin [animation-duration:90s]">
          <img src={zodiacWheel} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle, Key Proof Pills, CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Accredited Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] sm:text-xs font-bold tracking-wider uppercase mb-3 sm:mb-5 border select-none ${
                  isDarkMode
                    ? 'border-[#f0fe4f]/30 bg-[#f0fe4f]/10 text-[#f0fe4f]'
                    : 'border-[#FF0000]/30 bg-[#FF0000]/5 text-[#FF0000]'
                }`}
              >
                <Sparkles className={`w-3 h-3 ${isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'}`} />
                <span>ACCREDITED ASTROLOGY HUB • BATCH 2026-2027</span>
              </div>

              {/* Main Headline */}
              <h1
                className={`text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-nunito font-extrabold tracking-tight leading-[1.2] mb-3 sm:mb-5 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
              >
                Master the Science of{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-[#FF0000] to-[#FF0000] dark:from-[#f0fe4f] dark:to-[#ff914d]">
                  Astrology
                </span>{' '}
                with Clinical Precision.
              </h1>

              {/* Subtext */}
              <p
                className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mb-4 sm:mb-7 font-mulish ${
                  isDarkMode ? 'text-gray-300' : 'text-stone-800'
                }`}
              >
                Learn directly from Tripura's most trusted practitioner,{' '}
                <strong className={isDarkMode ? 'text-white' : 'text-black'}>
                  Shri Prasanta Chakraborty
                </strong>{' '}
                (B.Sc. Human Physiology, 7+ Yrs Clinical Practice). Demystify chart analysis with logic, mathematics, and reproducible predictive rules across Vedic, KP, BNN, and Nadi.
              </p>

              {/* Action Buttons: 2 buttons side-by-side on mobile, saving massive vertical scroll */}
              <div className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-7">
                <a
                  href="#courses"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-black to-[#FF0000] hover:opacity-90 shadow-md shadow-red-950/20 transition-all duration-300 active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>

                <a
                  href={getEnrollmentLink('Syllabus & Course Brochure')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm border transition-all duration-300 active:scale-95 ${
                    isDarkMode
                      ? 'border-white/20 text-white hover:border-[#f0fe4f] hover:bg-white/5'
                      : 'border-2 border-black text-black bg-transparent hover:bg-gradient-to-r hover:from-black hover:to-[#FF0000] hover:text-white hover:border-black'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                  <span className="truncate">Get Brochure</span>
                </a>
              </div>

              {/* Highlight Perks Grid (Micro-pills) */}
              <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 flex-wrap w-full text-left">
                <div
                  className={`px-2.5 py-1 sm:p-2.5 rounded-lg sm:rounded-xl border flex items-center gap-1.5 ${
                    isDarkMode ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold">100% Live Classes</span>
                </div>
                <div
                  className={`px-2.5 py-1 sm:p-2.5 rounded-lg sm:rounded-xl border flex items-center gap-1.5 ${
                    isDarkMode ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold">Real Chart Practice</span>
                </div>
                <div
                  className={`px-2.5 py-1 sm:p-2.5 rounded-lg sm:rounded-xl border flex items-center gap-1.5 ${
                    isDarkMode ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold">Verified Diploma</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Featured Mentor Card Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div
                className={`relative w-full max-w-[390px] sm:max-w-[420px] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border shadow-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#0a0a0a] border-[#f0fe4f]/30 text-white shadow-black'
                    : 'bg-white border-black/10 text-black shadow-xl'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-4">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-[#FF0000] text-white">
                    CHIEF INSTRUCTOR
                  </span>
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-500">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500" />
                    <span>4.9 / 5 Rating</span>
                  </span>
                </div>

                {/* Mentor Photo & Credentials */}
                <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-4">
                  <div className="w-14 h-14 sm:w-22 sm:h-22 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#FF0000]/40 shrink-0 shadow-md">
                    <img
                      src={prasantaImg}
                      alt="Shri Prasanta Chakraborty"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2
                      className={`text-sm sm:text-xl font-bold font-nunito leading-tight truncate ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                      style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
                    >
                      Shri Prasanta Chakraborty
                    </h2>
                    <p className={`text-[11px] sm:text-xs font-bold mt-0.5 truncate ${
                      isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                    }`}>
                      Founder & Chief Astrologer
                    </p>
                    <p className={`text-[10px] sm:text-[11px] font-medium mt-0.5 leading-tight line-clamp-2 ${
                      isDarkMode ? 'text-stone-300' : 'text-stone-700'
                    }`}>
                      B.Sc. Human Physiology • 7+ Yrs Vedic & KP Specialist
                    </p>
                  </div>
                </div>

                {/* Next Live Cohort Notice Box */}
                <div
                  className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border mb-2.5 sm:mb-4 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-[#f0fe4f]/10 to-transparent border-[#f0fe4f]/20 text-white'
                      : 'bg-[#f5f5dd] border-black/10 text-black'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold mb-1">
                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'}`}>
                      <Calendar className="w-3 h-3" />
                      <span>Next Batch: 1st Dec 2026</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold">
                      OPEN
                    </span>
                  </div>
                  <p className={`text-[10px] sm:text-[11px] leading-snug font-medium line-clamp-2 sm:line-clamp-none ${
                    isDarkMode ? 'text-stone-300' : 'text-stone-700'
                  }`}>
                    Weekend evening classes via Google Meet with direct microphone interaction and live chart dissection.
                  </p>
                </div>

                {/* Quick WhatsApp Inquiry */}
                <a
                  href={getEnrollmentLink('Talk to Instructor Shri Prasanta Chakraborty')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 sm:py-2.5 rounded-xl text-center text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 text-white bg-gradient-to-r from-black to-[#FF0000] hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Talk with Instructor on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. STATS STRIP: Verified Academy Track Record
         ========================================================================= */}
      <section
        className={`py-4 sm:py-7 border-y transition-colors duration-300 ${
          isDarkMode
            ? 'bg-[#050505] border-white/10'
            : 'bg-white border-black/10 shadow-sm'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6 text-center">
            {ACADEMY_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-1 sm:p-2">
                <span
                  className={`text-xl sm:text-3xl lg:text-4xl font-nunito font-extrabold leading-none mb-0.5 sm:mb-1 ${
                    isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                  }`}
                  style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
                >
                  {stat.value}
                </span>
                <span className={`text-[11px] sm:text-sm font-bold tracking-tight mb-0.5 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  {stat.label}
                </span>
                <span className={`text-[9px] sm:text-xs font-medium leading-tight ${
                  isDarkMode ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  {stat.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. COURSE CATALOG (LMS CARDS & CATEGORY TABS)
         ========================================================================= */}
      <section id="courses" className={`py-10 sm:py-20 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-[#000000]' : 'bg-[#f5f5dd]'
      }`}>
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mulish ${
                isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
              }`}
            >
              PROFESSIONAL CURRICULUM
            </span>
            <h2
              className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-nunito font-bold mt-1.5 mb-2 sm:mb-3 tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
            >
              Explore Astrofied Courses
            </h2>
            <div
              className={`h-0.5 sm:h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r mx-auto mb-2.5 sm:mb-4 ${
                isDarkMode ? 'from-[#f0fe4f] to-transparent' : 'from-[#FF0000] to-transparent'
              }`}
            />
            <p
              className={`text-xs sm:text-sm md:text-base leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-stone-800'
              }`}
            >
              Systematic, calculation-backed modules designed for beginners, passionate enthusiasts, and practicing astrologers seeking genuine mastery.
            </p>
          </div>

          {/* Category Filter Pills (Scrollable on small mobile screens) */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-6 sm:mb-10 scrollbar-none select-none -mx-3 px-3 sm:mx-0 sm:px-0">
            {ACADEMY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-black to-[#FF0000] text-white shadow-md'
                      : isDarkMode
                      ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                      : 'bg-white text-black hover:bg-stone-100 border border-black/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`group flex flex-col justify-between rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-[#080808] border-white/10 hover:border-[#f0fe4f]/50 text-white'
                    : 'bg-white border-black/10 hover:border-[#FF0000]/40 text-black shadow-md'
                }`}
              >
                <div>
                  {/* Card Header: Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                    <span
                      className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${
                        isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                      }`}
                    >
                      {course.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-[#FF0000] text-white shadow-xs">
                      {course.badge}
                    </span>
                  </div>

                  {/* Course Title in Nunito */}
                  <h3
                    className="text-sm sm:text-lg lg:text-xl font-nunito font-bold tracking-tight leading-snug mb-1.5 sm:mb-2 group-hover:text-[#FF0000] transition-colors line-clamp-2"
                    style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
                  >
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-stone-700'
                    }`}
                  >
                    {course.shortDescription}
                  </p>

                  {/* Course Meta Info Chips */}
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border space-y-1 sm:space-y-1.5 mb-3.5 sm:mb-5 text-[11px] sm:text-xs font-semibold ${
                      isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-[#f5f5dd] border-black/5 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 opacity-75">
                        <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'}`} />
                        <span>Duration</span>
                      </span>
                      <span>{course.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 opacity-75">
                        <Video className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'}`} />
                        <span>Live Classes</span>
                      </span>
                      <span className="truncate max-w-[140px] text-right">{course.sessions}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 opacity-75">
                        <Calendar className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'}`} />
                        <span>Next Batch</span>
                      </span>
                      <span className="text-emerald-600 font-bold">
                        {course.nextBatch}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Buttons */}
                <div className="pt-3 sm:pt-4 border-t border-black/5 dark:border-white/10 flex flex-col gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] sm:text-[10px] opacity-60 uppercase font-bold tracking-wider block">
                        Course Tuition
                      </span>
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className={`text-lg sm:text-2xl font-nunito font-extrabold ${
                          isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                        }`}>
                          {course.priceCurrent}
                        </span>
                        <span className="text-[11px] sm:text-xs line-through opacity-50 font-medium">
                          {course.priceOriginal}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {course.offerBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className={`w-full py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer ${
                        isDarkMode
                          ? 'border-white/15 text-white hover:bg-white/10'
                          : 'border border-black text-black hover:bg-gradient-to-r hover:from-black hover:to-[#FF0000] hover:text-white hover:border-black'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Syllabus</span>
                    </button>

                    <a
                      href={getEnrollmentLink(course.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 sm:py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-black to-[#FF0000] hover:opacity-90 transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enroll</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. METHODOLOGY & LEARNING PERKS (Why Astrofied Learning Academy)
         ========================================================================= */}
      <section id="perks" className={`py-10 sm:py-20 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-[#050505] border-white/10' : 'bg-white border-y border-black/10'
      }`}>
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mulish ${
                isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
              }`}
            >
              LEARNING ADVANTAGE
            </span>
            <h2
              className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-nunito font-bold mt-1.5 mb-2 sm:mb-3 tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
            >
              Why Learn with Astrofied?
            </h2>
            <div
              className={`h-0.5 sm:h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r mx-auto mb-2.5 sm:mb-4 ${
                isDarkMode ? 'from-[#f0fe4f] to-transparent' : 'from-[#FF0000] to-transparent'
              }`}
            />
            <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-stone-800'}`}>
              We replace rote memorization with logical principles, anatomical correlations, and real case studies so you can practice astrology ethically and authoritatively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {ACADEMY_PERKS.map((perk, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-[#080808] border-white/10 hover:border-[#f0fe4f]/30'
                    : 'bg-[#f5f5dd] border-black/5 hover:border-[#FF0000]/30 shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 ${
                    isDarkMode
                      ? 'bg-[#f0fe4f]/10 text-[#f0fe4f] border border-[#f0fe4f]/20'
                      : 'bg-[#FF0000]/10 text-[#FF0000] border border-[#FF0000]/15'
                  }`}
                >
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3
                  className={`text-base sm:text-lg font-nunito font-bold mb-1.5 tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                  style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                >
                  {perk.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-stone-700'}`}>
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CHIEF MENTOR SPOTLIGHT: Shri Prasanta Chakraborty
         ========================================================================= */}
      <section id="mentor" className={`py-10 sm:py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#000000]' : 'bg-[#f5f5dd]'
      }`}>
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 border shadow-xl relative overflow-hidden ${
              isDarkMode
                ? 'bg-[#080808] border-[#f0fe4f]/30 text-white'
                : 'bg-white border-black/10 text-black shadow-xl'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Mentor Photo with decorative borders */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group">
                  <div
                    className={`absolute -inset-1.5 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-700 -z-10 ${
                      isDarkMode ? 'bg-[#f0fe4f]' : 'bg-[#FF0000]'
                    }`}
                  />
                  <div
                    className={`w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full p-1.5 sm:p-2 border-2 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-xl ${
                      isDarkMode ? 'bg-black border-gold/40' : 'bg-white border-[#FF0000]/30'
                    }`}
                  >
                    <img
                      src={prasantaImg}
                      alt="Shri Prasanta Chakraborty"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Mentor Bio & Philosophy */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4">
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mulish ${
                    isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                  }`}
                >
                  FOUNDER & CHIEF INSTRUCTOR
                </span>
                <h2
                  className={`text-xl sm:text-3xl lg:text-4xl font-nunito font-bold tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                  style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
                >
                  Shri Prasanta Chakraborty
                </h2>
                <div
                  className={`h-0.5 sm:h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r mx-auto lg:mx-0 ${
                    isDarkMode ? 'from-[#f0fe4f] to-transparent' : 'from-[#FF0000] to-transparent'
                  }`}
                />

                <p
                  className={`text-xs sm:text-sm md:text-base leading-relaxed text-justify ${
                    isDarkMode ? 'text-gray-300' : 'text-stone-700'
                  }`}
                >
                  "True astrology is not about instilling fear or selling expensive stones; it is the sacred geometry of time, karma, and human psychology. My goal at Astrofied Learning Academy is to create honest, scientifically-grounded astrologers who can analyze a chart with surgical clarity and guide society with empathy."
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full text-left pt-1 sm:pt-2">
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl border ${
                      isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-[#f5f5dd] border-black/5'
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px] opacity-60 uppercase font-bold block">Academic Credential</span>
                    <span className="text-[11px] sm:text-sm font-bold">B.Sc. Human Physiology</span>
                  </div>
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl border ${
                      isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-[#f5f5dd] border-black/5'
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px] opacity-60 uppercase font-bold block">Clinical Experience</span>
                    <span className="text-[11px] sm:text-sm font-bold">7+ Yrs • 5,000+ Charts</span>
                  </div>
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl border ${
                      isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-[#f5f5dd] border-black/5'
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px] opacity-60 uppercase font-bold block">Systems Taught</span>
                    <span className="text-[11px] sm:text-sm font-bold">Vedic, KP, BNN & Nadi</span>
                  </div>
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl border ${
                      isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-[#f5f5dd] border-black/5'
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px] opacity-60 uppercase font-bold block">Teaching Medium</span>
                    <span className="text-[11px] sm:text-sm font-bold">Bengali, Hindi & English</span>
                  </div>
                </div>

                <div className="pt-2 w-full sm:w-auto">
                  <a
                    href={getEnrollmentLink('Connect with Mentor Shri Prasanta Chakraborty')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-black to-[#FF0000] hover:opacity-90 hover:shadow-lg transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire for Mentorship</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CERTIFICATION SHOWCASE
         ========================================================================= */}
      <section id="certification" className={`py-10 sm:py-20 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-[#050505] border-white/10' : 'bg-white border-y border-black/10'
      }`}>
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mulish ${
                isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
              }`}
            >
              CAREER CREDENTIALS
            </span>
            <h2
              className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-nunito font-bold mt-1.5 mb-2 sm:mb-3 tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
            >
              Certified by Astrofied
            </h2>
            <div
              className={`h-0.5 sm:h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r mx-auto mb-2.5 sm:mb-4 ${
                isDarkMode ? 'from-[#f0fe4f] to-transparent' : 'from-[#FF0000] to-transparent'
              }`}
            />
            <p className={`text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-10 ${isDarkMode ? 'text-gray-300' : 'text-stone-800'}`}>
              Every graduating student receives an official, serialized Astrofied Diploma signed by Shri Prasanta Chakraborty upon submitting practical chart assessments.
            </p>

            {/* Realistic Certificate Mockup Container */}
            <div
              className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 sm:border-4 relative overflow-hidden shadow-xl ${
                isDarkMode
                  ? 'bg-gradient-to-b from-[#0c0c0e] to-[#040404] border-[#f0fe4f]/40 text-white'
                  : 'bg-[#f5f5dd] border-[#C9A227]/60 text-stone-900 shadow-xl'
              }`}
            >
              <div className="border border-dashed border-[#C9A227]/40 p-4 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col items-center text-center">
                <div className="w-9 h-9 sm:w-12 sm:h-12 mb-2 sm:mb-3">
                  <img
                    src={logo}
                    alt="Astrofied"
                    className="w-full h-full object-contain mx-auto"
                    style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                  />
                </div>
                <span className={`text-[9px] sm:text-xs uppercase tracking-widest font-extrabold ${
                  isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                }`}>
                  ASTROFIED LEARNING ACADEMY • CERTIFICATE OF MASTERY
                </span>
                <h3 className={`text-base sm:text-2xl font-nunito font-bold mt-1.5 mb-1 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Certificate of Astrological Competency
                </h3>
                <p className={`text-[11px] sm:text-sm max-w-lg mb-4 sm:mb-6 ${
                  isDarkMode ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Awarded to students demonstrating clinical proficiency in Natal Horoscope Analysis, Dasha Timing, and Ethical Astrological Counseling.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6 text-xs border-t border-black/10 dark:border-white/10 pt-3 sm:pt-4 w-full text-center">
                  <div>
                    <span className={`block font-bold ${isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'}`}>
                      Shri Prasanta Chakraborty
                    </span>
                    <span className="text-[10px] opacity-70">Founder & Chief Examiner</span>
                  </div>
                  <div>
                    <span className={`block font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Government Verified
                    </span>
                    <span className="text-[10px] opacity-70">Unique Serialized Credential ID</span>
                  </div>
                  <div>
                    <span className={`block font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      Tripura, India
                    </span>
                    <span className="text-[10px] opacity-70">Astrofied Academy HQ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. STUDENT REVIEWS & TESTIMONIALS
         ========================================================================= */}
      <section id="reviews" className={`py-10 sm:py-20 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-[#000000]' : 'bg-[#f5f5dd]'
      }`}>
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mulish ${
                isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
              }`}
            >
              VOICES OF OUR LEARNERS
            </span>
            <h2
              className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-nunito font-bold mt-1.5 mb-2 sm:mb-3 tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
            >
              What Our Students Say
            </h2>
            <div
              className={`h-0.5 sm:h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r mx-auto mb-2.5 sm:mb-4 ${
                isDarkMode ? 'from-[#f0fe4f] to-transparent' : 'from-[#FF0000] to-transparent'
              }`}
            />
            <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-stone-800'}`}>
              Real experiences from practicing learners across Agartala, Kolkata, Guwahati, and pan-India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            {ACADEMY_REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-[#080808] border-white/10 text-white'
                    : 'bg-white border-black/10 text-black shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base font-nunito" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      {review.name}
                    </h4>
                    <span className="text-[11px] opacity-65">{review.location} • {review.course}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed text-justify ${isDarkMode ? 'text-gray-300' : 'text-stone-700'}`}>
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================================= */}
      <section id="faq" className={`py-10 sm:py-20 border-t transition-colors duration-300 ${
        isDarkMode ? 'bg-[#050505] border-white/10' : 'bg-white border-y border-black/10'
      }`}>
        <div className="container mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-12">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mulish ${
                isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
              }`}
            >
              GOT QUESTIONS?
            </span>
            <h2
              className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-nunito font-bold mt-1.5 mb-2 sm:mb-3 tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
            >
              Frequently Asked Questions
            </h2>
            <div
              className={`h-0.5 sm:h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r mx-auto mb-2.5 sm:mb-4 ${
                isDarkMode ? 'from-[#f0fe4f] to-transparent' : 'from-[#FF0000] to-transparent'
              }`}
            />
          </div>

          <div className="space-y-2.5 sm:space-y-3.5">
            {ACADEMY_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isDarkMode
                      ? 'bg-[#080808] border-white/10 text-white'
                      : 'bg-[#f5f5dd] border-black/10 text-black shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-base font-nunito leading-snug" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? isDarkMode ? 'rotate-180 text-[#f0fe4f]' : 'rotate-180 text-[#FF0000]'
                          : 'opacity-60'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className={`p-3.5 sm:p-5 pt-0 text-xs sm:text-sm leading-relaxed border-t border-black/5 dark:border-white/5 ${
                            isDarkMode ? 'text-gray-300' : 'text-stone-700'
                          }`}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FINAL CALL TO ACTION (Enrollment CTA)
         ========================================================================= */}
      <section className="py-10 sm:py-20 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center border relative overflow-hidden shadow-2xl ${
              isDarkMode
                ? 'bg-gradient-to-b from-[#0f0a0a] to-[#000000] border-[#FF0000]/40 text-white'
                : 'bg-gradient-to-r from-black to-[#FF0000] text-white border-none shadow-2xl'
            }`}
          >
            <span className="px-3 py-1 rounded-full text-[9px] sm:text-xs font-extrabold uppercase tracking-widest bg-white/10 text-white mb-3 inline-block backdrop-blur-sm">
              NEW COHORTS COMMENCING SOON
            </span>

            <h2
              className="text-xl sm:text-3xl lg:text-4xl font-nunito font-black tracking-tight mb-2 sm:mb-4 text-white"
              style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 900 }}
            >
              Ready to Begin Your Astrological Journey?
            </h2>

            <p className="text-xs sm:text-sm opacity-90 max-w-2xl mx-auto leading-relaxed mb-6 text-white/90">
              Limited seats per batch to preserve direct teacher-student interaction. Connect with us on WhatsApp to register your seat or download the complete course syllabus.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <a
                href={getEnrollmentLink('Immediate Batch Enrollment Inquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-black bg-white hover:bg-stone-100 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Enroll via WhatsApp Desk</span>
              </a>

              <button
                onClick={handleReturnHome}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white border border-white/40 hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Back to Astrofied Main Page</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. ACADEMY FOOTER
         ========================================================================= */}
      <footer
        className={`py-8 sm:py-12 border-t text-xs transition-colors duration-300 ${
          isDarkMode
            ? 'bg-[#000000] border-white/10 text-gray-400'
            : 'bg-[#f5f5dd] border-t border-black/10 text-stone-700'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Astrofied"
              className="w-7 h-7 object-contain"
              style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
            />
            <div>
              <span className={`font-nunito font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r block ${
                isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black to-[#FF0000]'
              }`}>
                Astrofied Learning Academy
              </span>
              <span className="text-[10px] opacity-75">
                Tripura's Best Astrology Learning Hub • Dakbanglow Road, Udaipur, Tripura
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button onClick={handleReturnHome} className="hover:text-[#FF0000] transition-colors cursor-pointer">
              Main Site
            </button>
            <a href="/#services" className="hover:text-[#FF0000] transition-colors">
              Consultations
            </a>
            <a href="/#numerology" className="hover:text-[#FF0000] transition-colors">
              Numero
            </a>
            <a href="/#newsfied" className="hover:text-[#FF0000] transition-colors">
              Newsfied
            </a>
            <a href="/about" className="hover:text-[#FF0000] transition-colors">
              Team
            </a>
          </div>

          <div className="text-[11px] opacity-60">
            © {new Date().getFullYear()} Astrofied. All rights reserved.
          </div>
        </div>
      </footer>

      {/* =========================================================================
          12. COURSE DETAILS & SYLLABUS MODAL
         ========================================================================= */}
      <AnimatePresence>
        {activeCourseModal && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md select-text"
            onClick={() => setActiveCourseModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
                isDarkMode
                  ? 'bg-[#0a0a0a] border-white/15 text-white'
                  : 'bg-white border-black/10 text-black'
              }`}
            >
              {/* Modal Sticky Header */}
              <div className="p-4 sm:p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between shrink-0 bg-inherit">
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                  }`}>
                    {activeCourseModal.categoryLabel} • {activeCourseModal.level}
                  </span>
                  <h3
                    className="text-base sm:text-xl font-nunito font-bold tracking-tight leading-tight mt-0.5"
                    style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
                  >
                    {activeCourseModal.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveCourseModal(null)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:rotate-90 shrink-0 ${
                    isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
                {/* Overview */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider opacity-60 mb-1.5">
                    Course Overview
                  </h4>
                  <p className="leading-relaxed opacity-90 text-justify">
                    {activeCourseModal.overview}
                  </p>
                </div>

                {/* Key Learning Outcomes */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider opacity-60 mb-2">
                    What You Will Master
                  </h4>
                  <ul className="space-y-2">
                    {activeCourseModal.outcomes.map((outcome, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Module-by-Module Syllabus */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider opacity-60 mb-2.5">
                    Detailed Curriculum Modules
                  </h4>
                  <div className="space-y-3">
                    {activeCourseModal.syllabus.map((mod) => (
                      <div
                        key={mod.moduleNumber}
                        className={`p-3.5 rounded-2xl border ${
                          isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-[#f5f5dd] border-black/5'
                        }`}
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
                          isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                        }`}>
                          Module {mod.moduleNumber}
                        </span>
                        <h5 className="font-bold text-sm font-nunito mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>
                          {mod.title}
                        </h5>
                        <ul className="space-y-1 pl-4 list-disc opacity-80 text-xs">
                          {mod.topics.map((t, tIdx) => (
                            <li key={tIdx} className="leading-snug">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Training & Certification */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isDarkMode ? 'bg-[#f0fe4f]/5 border-[#f0fe4f]/20' : 'bg-[#f5f5dd] border-black/10'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-1 text-xs font-bold ${
                    isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                  }`}>
                    <Award className="w-4 h-4" />
                    <span>Certification & Practical Training</span>
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {activeCourseModal.practicalTraining} Graduates receive the{' '}
                    <strong>{activeCourseModal.certification}</strong> credential.
                  </p>
                </div>
              </div>

              {/* Modal Sticky Footer CTA */}
              <div className="p-4 sm:p-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3 shrink-0 bg-inherit">
                <div>
                  <span className="text-[10px] opacity-60 uppercase font-bold block">Tuition</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-lg sm:text-xl font-bold font-nunito ${
                      isDarkMode ? 'text-[#f0fe4f]' : 'text-[#FF0000]'
                    }`}>
                      {activeCourseModal.priceCurrent}
                    </span>
                    <span className="text-xs line-through opacity-50 font-medium">
                      {activeCourseModal.priceOriginal}
                    </span>
                  </div>
                </div>

                <a
                  href={getEnrollmentLink(activeCourseModal.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-black to-[#FF0000] hover:opacity-90 transition-all flex items-center gap-2 shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm Seat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
