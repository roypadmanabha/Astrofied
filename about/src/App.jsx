import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Home, Briefcase, GraduationCap, Award, ChartNoAxesCombined, CheckCircle, Heart, Star, BookOpenCheck, CircleAlert, Menu, X, Mail } from 'lucide-react';
import LegalModal from './components/LegalModal';
import Footer from './components/Footer';
import { getWhatsAppLink } from './lib/constants';

// Import assets
import logo from './assets/logo.png';
import prasantaImg from './assets/about-prasanta-new.png';
import padmanabhaImg from './assets/padmanabha.jpg';

function MainContent() {
  const [scrolled, setScrolled] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });
  const [showRightClickPopup, setShowRightClickPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // Redirect link back to Home page
  const homeUrl = (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? 'http://localhost:5174'
    : '';

  const getHomeLink = (hash = '') => {
    if (homeUrl) {
      return `${homeUrl}/${hash}`;
    }
    return `/${hash}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const triggerToast = () => {
      setShowRightClickPopup(true);
      if (window.rightClickTimeout) {
        clearTimeout(window.rightClickTimeout);
      }
      window.rightClickTimeout = setTimeout(() => {
        setShowRightClickPopup(false);
      }, 2500);
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerToast();
    };

    const handleCopyCut = (e) => {
      e.preventDefault();
      triggerToast();
    };

    const handleDragDrop = (e) => {
      e.preventDefault();
      triggerToast();
    };

    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (
        (e.key === 'p' && cmdOrCtrl) ||
        (e.key === 'c' && cmdOrCtrl) ||
        (e.key === 'x' && cmdOrCtrl) ||
        (e.key === 'u' && cmdOrCtrl) ||
        (e.key === 's' && cmdOrCtrl) ||
        e.key === 'F12' ||
        (e.shiftKey && cmdOrCtrl && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
        triggerToast();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('dragstart', handleDragDrop);
    document.addEventListener('drop', handleDragDrop);
    window.addEventListener('keydown', handleKeyDown);

    // Only use Lenis on Desktop (Non-touch/Large screens)
    let lenis = null;
    if (window.innerWidth >= 1024) {
      lenis = new Lenis({
        autoRaf: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
      window.lenis = lenis;
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('dragstart', handleDragDrop);
      document.removeEventListener('drop', handleDragDrop);
      window.removeEventListener('keydown', handleKeyDown);
      if (window.rightClickTimeout) {
        clearTimeout(window.rightClickTimeout);
      }
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
    };
  }, []);

  const openLegalModal = (type) => {
    if (type === 'terms') {
      setLegalModal({
        isOpen: true,
        title: 'Terms and Conditions',
        content: `<b>1. Acceptance of Terms</b>
By accessing and using Astrofied (the Website), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must immediately discontinue use of our services.

<b>2. Eligibility</b>
You must be at least 18 years of age to use this Website or purchase services. By using Astrofied, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement.

<b>3. Nature of Services</b>
Entertainment Purposes: All astrological consultations, reports, and content provided by Astrofied are for guidance and entertainment purposes only.
Any actions taken based on the information provided by Astrofied are solely the responsibility of the user.

<b>4. No Professional Advice</b>
Astrology is not a substitute for professional medical, legal, financial, or psychological advice. Astrofied does not guarantee the accuracy or reliability of any predictions or insights.

<b>5. Payments and Refunds</b>
Pricing: All fees for consultations and reports are clearly stated on the Website. We reserve the right to change pricing at any time.

<b>6. Refund Policy</b>
 Due to the personalised nature of astrological reports and the time allocated for live consultations, payments are generally non-refundable once the service has been initiated or delivered, except in cases of technical failure on our part.

<b>7. User Conduct</b>
You agree not to use the Website for any unlawful purpose. You are prohibited from:
Providing false information during registration or consultation.
Attempting to interfere with the Website’s security or functionality.
Harassing or using abusive language toward our consultants.

<b>8. Intellectual Property</b>
All content on Astrofied, including text, graphics, logos, and software, is the property of Astrofied and protected by copyright and intellectual property laws. You may not reproduce, distribute, or sell any content without prior written consent.

<b>9. Privacy and Data Security</b>
Your personal data, including birth details, is handled in accordance with our Privacy Policy. While we implement industry-standard security measures, we cannot guarantee absolute security of data transmitted over the internet.

<b>9. Limitation of Liability</b>
To the maximum extent permitted by law, Astrofied and its practitioners shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, even if advised of the possibility of such damages.

<b>10. Modifications to Terms</b>
Astrofied reserves the right to modify these Terms and Conditions at any time. Updates will be posted on this page with a revised Last Updated date. Continued use of the Website constitutes acceptance of the new terms.

<b>11. Governing Law</b>
These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Agartala, Tripura.`
      });
    } else if (type === 'privacy') {
      setLegalModal({
        isOpen: true,
        title: 'Privacy Policy',
        content: `At Astrofied, we value the trust you place in us when sharing your personal information and birth details. This Privacy Policy outlines how we collect, use, and protect your data in compliance with the laws of India and the jurisdiction of Tripura.

<b>1. Data Protection and Non-Tampering</b>
All customer data collected through our website or consultations is handled with the highest level of privacy. We ensure that your personal information, including names, contact details, and birth data, is never tampered with, altered, or sold to third parties for marketing purposes.

<b>2. Confidentiality of Personal Matters</b>
We understand that astrological consultations often involve discussing sensitive personal problems. All information shared during a session, whether personal, financial, or emotional, is kept strictly secret and remains confidential between the consultant and the client.

<b>3. Ethical Practice and Expectations</b>
Astrofied operates on the principle of transparency. We do not make any false promises to change your destiny or provide guaranteed outcomes. Our services are intended for guidance and insight based on astrological calculations, and we encourage clients to maintain a realistic perspective.

<b>4. No Cold Calling or Unsolicited Outreach</b>
To protect your privacy and peace of mind, we do not initiate calls to individuals for consultations. We only engage in outreach through official social media channels, our website, or organised events. Any consultation initiated will be at the request of the customer.

<b>5. Fair Pricing and No Hidden Charges</b>
We maintain a strict policy of financial transparency. There are no hidden or extra charges beyond the prices clearly stated on our platform. We do not charge "surprise fees" after a service has been booked or completed.

<b>6. Reasonable Remedies</b>
Astrofied does not suggest or provide remedies that involve illogical practices or costs that are higher than usual market rates. We focus on practical and traditional guidance rather than high-cost commercialised solutions.

<b>7. Information Collection and Use</b>
We collect information that you voluntarily provide, such as your date, time, and place of birth, to generate accurate astrological charts. This data is used solely for the purpose of providing the service you have requested.

<b>8. Data Retention</b>
We retain your personal information only for as long as necessary to provide our services and to comply with legal obligations under Indian law.

<b>9. Security Measures</b>
We implement industry-standard security protocols to prevent unauthorised access to your data. However, please be aware that no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.

<b>10. Governing Law</b>
This Privacy Policy is governed by the laws of India. Any disputes regarding data privacy or the terms mentioned herein shall be subject to the exclusive jurisdiction of the courts in Agartala, Tripura.

<b>11. Contact Us</b>
If you have any questions regarding this Privacy Policy or how your data is handled, please contact us through our official website channels.`
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden ${isDarkMode ? 'dark text-white' : 'light text-[#0A0A0A]'}`}>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${scrolled
          ? isDarkMode
            ? 'py-2 bg-black/60 border-b border-gold/20 shadow-2xl'
            : 'py-2 bg-white/60 border-b border-[#A30000]/10 shadow-xl'
          : 'py-4 bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-16 lg:pr-6 xl:pl-20 xl:pr-8 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={logo}
              alt="Astrofied"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
            />
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="astrofied-brand-text text-lg sm:text-xl md:text-2xl font-bold">
                Astrofied
              </span>
              <span className={`text-lg sm:text-xl md:text-2xl font-mulish font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Team
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 xs:gap-3 sm:gap-4 lg:gap-6 xl:gap-8"
          >
            {/* Desktop Links (Visible only on lg screens and up) */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              <a
                href={getHomeLink()}
                className={`text-base xl:text-lg font-bold transition-all relative group py-1 ${isDarkMode ? 'text-gray-100 hover:text-gold' : 'text-black hover:text-[#A30000]'
                  }`}
              >
                Home
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isDarkMode ? 'bg-gold' : 'bg-[#A30000]'
                  }`} />
              </a>
              <a
                href={getHomeLink('#services')}
                className={`text-base xl:text-lg font-bold transition-all relative group py-1 ${isDarkMode ? 'text-gray-100 hover:text-gold' : 'text-black hover:text-[#A30000]'
                  }`}
              >
                Services
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isDarkMode ? 'bg-gold' : 'bg-[#A30000]'
                  }`} />
              </a>
              <a
                href={getHomeLink('#journals')}
                className={`text-base xl:text-lg font-bold transition-all relative group py-1 ${isDarkMode ? 'text-gray-100 hover:text-gold' : 'text-black hover:text-[#A30000]'
                  }`}
              >
                Journals
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isDarkMode ? 'bg-gold' : 'bg-[#A30000]'
                  }`} />
              </a>
              <a
                href={getHomeLink('#footer')}
                className={`text-base xl:text-lg font-bold transition-all relative group py-1 ${isDarkMode ? 'text-gray-100 hover:text-gold' : 'text-black hover:text-[#A30000]'
                  }`}
              >
                Contact
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isDarkMode ? 'bg-gold' : 'bg-[#A30000]'
                  }`} />
              </a>
            </div>

            {/* Consult Now Button - Visible on all screens, size adjusted responsively */}
            <button
              onClick={() => window.open(getWhatsAppLink('Hi, I want to book a consultation with Astrofied.'), '_blank')}
              className="inline-flex items-center justify-center px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-[8px] sm:rounded-[10px] bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000] border border-[#FF0000] font-bold text-xs sm:text-sm md:text-base tracking-wider transition-all duration-300 shadow-md shadow-[#FF0000]/20 hover:scale-105 active:scale-95 cursor-pointer font-mulish"
            >
              <span className="xs:hidden">Consult</span>
              <span className="hidden xs:inline">Consult Now</span>
            </button>

            {/* Hamburger Toggle Button - Visible only below lg */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-1.5 rounded-lg transition-all bg-transparent cursor-pointer border-none ${isDarkMode
                ? 'text-gold hover:bg-white/5'
                : 'text-[#A30000] hover:bg-black/5'
                }`}
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu Drawer (Visible only below lg) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-[280px] z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden ${isDarkMode
                ? 'bg-gradient-to-b from-[#0A0A0A] to-[#121212] border-l border-gold/10 text-white'
                : 'bg-[#f5f5dd] border-l border-[#A30000]/10 text-[#0A0A0A]'
                }`}
            >
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                  <span className="astrofied-brand-text text-xl font-bold font-nunito tracking-tight">Astrofied</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-1.5 rounded-full border transition-all bg-transparent cursor-pointer ${isDarkMode ? 'border-gold/20 text-gold hover:bg-gold/10' : 'border-[#A30000]/20 text-[#A30000] hover:bg-[#A30000]/5'
                      }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <a
                    href={getHomeLink()}
                    className={`flex items-center gap-3 text-sm font-bold tracking-wider font-mulish py-3 px-4 rounded-xl transition-all duration-300 ${isDarkMode
                      ? 'text-gray-300 hover:text-gold hover:bg-white/5'
                      : 'text-[#491000] hover:text-[#FF0000] hover:bg-black/5'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-4 h-4 opacity-75" />
                    Home
                  </a>

                  <div className={`h-[0.5px] w-[92%] mx-auto ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

                  <a
                    href={getHomeLink('#services')}
                    className={`flex items-center gap-3 text-sm font-bold tracking-wider font-mulish py-3 px-4 rounded-xl transition-all duration-300 ${isDarkMode
                      ? 'text-gray-300 hover:text-gold hover:bg-white/5'
                      : 'text-[#491000] hover:text-[#FF0000] hover:bg-black/5'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="w-4 h-4 opacity-75" />
                    Services
                  </a>

                  <div className={`h-[0.5px] w-[92%] mx-auto ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

                  <a
                    href={getHomeLink('#journals')}
                    className={`flex items-center gap-3 text-sm font-bold tracking-wider font-mulish py-3 px-4 rounded-xl transition-all duration-300 ${isDarkMode
                      ? 'text-gray-300 hover:text-gold hover:bg-white/5'
                      : 'text-[#491000] hover:text-[#FF0000] hover:bg-black/5'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpenCheck className="w-4 h-4 opacity-75" />
                    Journals
                  </a>

                  <div className={`h-[0.5px] w-[92%] mx-auto ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />

                  <a
                    href={getHomeLink('#footer')}
                    className={`flex items-center gap-3 text-sm font-bold tracking-wider font-mulish py-3 px-4 rounded-xl transition-all duration-300 ${isDarkMode
                      ? 'text-gray-300 hover:text-gold hover:bg-white/5'
                      : 'text-[#491000] hover:text-[#FF0000] hover:bg-black/5'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Mail className="w-4 h-4 opacity-75" />
                    Contact
                  </a>
                </div>
              </div>

              {/* Bottom Brand */}
              <div className="text-center text-xs opacity-50 font-mulish">
                © {new Date().getFullYear()} Astrofied. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-24 text-center px-6 md:px-12 lg:px-16 relative">
        {/* Subtle decorative lights */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[140px] opacity-25 -z-10 ${isDarkMode ? 'bg-gold' : 'bg-red-300'}`} />

        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center px-4 py-1.5 rounded-[10px] border text-xs font-bold tracking-widest uppercase mb-6 select-none font-mulish
              ${isDarkMode
                ? 'border-[#C9A227]/40 bg-[#C9A227]/5 text-[#C9A227]'
                : 'border-[#A30000]/40 bg-[#A30000]/5 text-[#A30000]'
              }`}
            >
              MEET THE FOUNDERS
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 font-['Nunito']">
              The Minds Behind{' '}
              <span className="astrofied-brand-text font-extrabold">
                Astrofied
              </span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl font-mulish max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Combining traditional Vedic wisdom with modern technology to provide honest, accurate, and life-changing astrological guidance.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Team Profiles Container */}
      <main className="pb-24 px-6 md:px-12 lg:px-16 relative">
        <div className="container mx-auto max-w-[1100px]">

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Image Column */}
            <div className="md:col-span-5 flex justify-center md:order-1">
              <div className="relative group">
                {/* Back glow */}
                <div className={`absolute -inset-1.5 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 -z-10 ${isDarkMode ? 'bg-gradient-to-r from-gold to-orange-600' : 'bg-gradient-to-r from-red-500 to-orange-400'
                  }`} />

                {/* Main image container */}
                <div className={`w-64 h-64 sm:w-80 sm:h-80 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full p-2 border-2 overflow-hidden flex items-center justify-center transition-all duration-500 transform group-hover:scale-[1.03] ${isDarkMode ? 'bg-black/40 border-gold/40' : 'bg-white border-[#A30000]/20'
                  }`}>
                  <img
                    src={prasantaImg}
                    alt="Shri Prasanta Chakraborty"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>

                {/* Decorative border rings */}
                <div className={`absolute inset-0 rounded-full border border-dashed animate-spin [animation-duration:20s] pointer-events-none ${isDarkMode ? 'border-gold/20' : 'border-[#A30000]/20'
                  }`} />
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left md:order-2 space-y-6">
              <div>
                <span className={`text-sm font-bold uppercase tracking-widest font-mulish ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}>
                  FOUNDER & CHIEF ASTROLOGER
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3 font-['Nunito'] font-extrabold">Shri Prasanta Chakraborty</h2>
                <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${isDarkMode ? 'from-gold to-transparent' : 'from-[#A30000] to-transparent'} mx-auto md:mx-0`} />
              </div>

              <p className={`text-base md:text-lg leading-relaxed text-justify font-mulish ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                A highly intuitive and trusted astrologer, Shri Prasanta Chakraborty has spent years helping individuals gain clarity, confidence, and direction in life. Through his deep understanding and practical guidance, he has assisted thousands of people in making informed decisions and navigating life's challenges with greater purpose and peace of mind.

              </p>

              {/* Bio Cards list */}
              <div className="w-full space-y-4">
                {/* Item 1: Education */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Education</h4>
                    <p className="font-semibold text-sm sm:text-base">B.Sc. Human Physiology | NSM, Udaipur, Gomati, Tripura</p>
                  </div>
                </div>

                {/* Item 2: Experience */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Experience</h4>
                    <p className="font-semibold text-sm sm:text-base">Professional Astrologer since 2019</p>
                  </div>
                </div>

                {/* Item 3: Expertise */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <BookOpenCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Expertise</h4>
                    <p className="font-semibold text-sm sm:text-base">Vedic, KP, Jaimini, Nakshatra Nadi, Bhrigu Nandi Nadi, Parashari, Numerology</p>
                  </div>
                </div>

                {/* Item 4: Impact */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <ChartNoAxesCombined className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Impact</h4>
                    <p className="font-semibold text-sm sm:text-base">Assisted 5,000+ customers through both offline and online consultations</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Elegant Divider */}
          <div className="w-full py-16 md:py-24 flex items-center justify-center select-none">
            <div className="h-[1.5px] w-24 sm:w-36 md:w-48 bg-gradient-to-r from-transparent to-[#C9A227]/60" />
            <div className="w-2.5 h-2.5 bg-[#C9A227] rotate-45 mx-4 shrink-0 shadow-[0_0_8px_rgba(201,162,39,0.3)]" />
            <div className="h-[1.5px] w-24 sm:w-36 md:w-48 bg-gradient-to-l from-transparent to-[#C9A227]/60" />
          </div>

          {/* Section 2: Management & Technical (Padmanabha Roy) */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Image Column (Order 2 on desktop to alternate layout) */}
            <div className="md:col-span-5 flex justify-center order-1 md:order-2">
              <div className="relative group">
                {/* Back glow */}
                <div className={`absolute -inset-1.5 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 -z-10 ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-gold' : 'bg-gradient-to-r from-red-600 to-orange-400'
                  }`} />

                {/* Main image container */}
                <div className={`w-64 h-64 sm:w-80 sm:h-80 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full p-2 border-2 overflow-hidden flex items-center justify-center transition-all duration-500 transform group-hover:scale-[1.03] ${isDarkMode ? 'bg-black/40 border-gold/40' : 'bg-white border-[#A30000]/20'
                  }`}>
                  <img
                    src={padmanabhaImg}
                    alt="Padmanabha Roy"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>

                {/* Decorative border rings */}
                <div className={`absolute inset-0 rounded-full border border-dashed animate-spin [animation-duration:25s] pointer-events-none ${isDarkMode ? 'border-gold/20' : 'border-[#A30000]/20'
                  }`} />
              </div>
            </div>

            {/* Content Column (Order 1 on desktop to alternate layout) */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 space-y-6">
              <div>
                <span className={`text-sm font-bold uppercase tracking-widest font-mulish ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}>
                  Management Lead
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3 font-['Nunito'] font-extrabold">Padmanabha Roy</h2>
                <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${isDarkMode ? 'from-gold to-transparent' : 'from-[#A30000] to-transparent'} mx-auto md:mx-0`} />
              </div>

              <p className={`text-base md:text-lg leading-relaxed text-justify font-mulish ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                With a strong blend of vision and leadership, Roy oversees <span className="astrofied-brand-text font-bold">Astrofied</span>'s digital journey and strategic direction. His dedication to innovation and growth has played a key role in shaping <span className="astrofied-brand-text font-bold">Astrofied</span> into a trusted and expanding platform, committed to delivering meaningful experiences to people across India.
              </p>

              {/* Bio Cards list */}
              <div className="w-full space-y-4">
                {/* Item 1: Education */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Education</h4>
                    <p className="font-semibold text-sm sm:text-base">B.E. CSE | Sathyabama University, Chennai, TN</p>
                  </div>
                </div>

                {/* Item 2: Experience */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Experience</h4>
                    <p className="font-semibold text-sm sm:text-base">Product Analyst with Proficiency in SaaS Solutions</p>
                  </div>
                </div>

                {/* Item 3: Expertise */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <BookOpenCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Expertise</h4>
                    <p className="font-semibold text-sm sm:text-base">Technology, Marketing, and Brand Management</p>
                  </div>
                </div>

                {/* Item 4: Impact */}
                <div className={`glass p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:translate-x-1 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}>
                  <div className={`p-2.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#A30000]/10 text-[#A30000]'}`}>
                    <ChartNoAxesCombined className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold uppercase tracking-wide opacity-60">Impact</h4>
                    <p className="font-semibold text-sm sm:text-base">
                      Expanded <span className="astrofied-brand-text font-bold">Astrofied</span> into a pan-India digital platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      {/* Footer */}
      <Footer onOpenLegal={openLegalModal} />

      {/* Legal Modals */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.title}
        content={legalModal.content}
      />

      {/* Right Click Protection Popup */}
      <AnimatePresence>
        {showRightClickPopup && (
          <div className="fixed top-28 left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#A30000] text-white shadow-2xl rounded-full max-w-[90vw] md:max-w-md border border-white/10"
            >
              <CircleAlert className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
              <span className="text-xs sm:text-sm md:text-base font-bold font-['Mulish'] tracking-wide">
                Not allowed. Content protection enabled.
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;
