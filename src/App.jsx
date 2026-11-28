import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import PromoVideo from './components/PromoVideo';
import AstrofiedJournals from './components/AstrofiedJournals';
import GemstoneRemediesTeaser from './components/GemstoneRemediesTeaser';
import FAQs from './components/FAQs';
import SolarSystem from './components/SolarSystem';
import Testimonials from './components/Testimonials';
import GooglePresence from './components/GooglePresence';
import Hero from './components/Hero';
import Kundali from './components/Kundali';
import Numerology from './components/Numerology';
import Pricing from './components/Pricing';
import LegalModal from './components/LegalModal';
import ExploreModal from './components/ExploreModal';
import StarfieldBg from './components/StarfieldBg';
import Panchang from './components/Panchang';
import WhatsAppButton from './components/WhatsAppButton';
import ContentProtection from './components/ContentProtection';
import Newsfied from './components/Newsfied';
import NewsfiedAdmin from './components/NewsfiedAdmin';
import { getWhatsAppLink } from './lib/constants';

import ExploreAstrofied from './components/explore/ExploreAstrofied';
import PoliticalAnalysisPage from './components/explore/PoliticalAnalysisPage';
import WeeklyRashifalPage from './components/explore/WeeklyRashifalPage';
import WhatsGoingToHappenPage from './components/explore/WhatsGoingToHappenPage';
import TransitPage from './components/explore/TransitPage';
import ScrollToTopButton from './components/explore/ScrollToTopButton';

const checkIsAdminPath = () => {
  if (typeof window === 'undefined') return false;
  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!isLocalhost) return false;
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return (
    hash === '#admin' ||
    hash === '#admin/' ||
    hash === '#newsfied-admin' ||
    hash === '#newsfied-admin/' ||
    path === '/admin' ||
    path === '/admin/' ||
    path === '/newsfied-admin' ||
    path === '/newsfied-admin/' ||
    path.endsWith('/admin') ||
    path.endsWith('/admin/')
  );
};

const getExploreRoute = () => {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');
  if (hash === '#explore') return 'hub';
  if (hash === '#explore/political' || hash === '#political-analysis' || hash === '#political') return 'political';
  if (hash === '#explore/rashifal' || hash === '#explore/weekly-rashifal' || hash === '#rashifal' || hash === '#weekly-rashifal') return 'rashifal';
  if (hash === '#explore/forecasts' || hash === '#explore/whats-going-to-happen' || hash === '#forecasts' || hash === '#whats-going-to-happen') return 'forecasts';
  if (hash === '#explore/transits' || hash === '#explore/transit' || hash === '#transits' || hash === '#transit') return 'transits';
  return null;
};

import logo from './assets/logo.png';
import zodiacWheel from './assets/zodiac-wheel.png';
import aboutSj from './assets/about-prasanta-new.png';

const WHY_SJ_TEXT = `We offer trusted and result-oriented astrological services to clients seeking guidance in different areas of life. Whether your concern is related to personal matters, legal issues, finance, health, marriage, or career, we provide detailed insights and practical solutions tailored to your situation. What makes us different is our strong commitment to accuracy and client satisfaction. Our predictions, whether daily, yearly, or long-term, are explained clearly and in detail, helping clients feel confident and assured about their life decisions. Our experienced astrologer is knowledgeable, well-mannered, and highly intuitive. With deep analysis, we identify the root cause of your challenges and guide you with suitable remedies and actionable solutions. We focus not just on predicting events, but on helping you understand and navigate them in the right way. We believe in clarity, honesty, and proven results. Our goal is not just to make promises, but to deliver guidance that truly makes a difference in your life. Share your birth details with us, stay open to guidance, and take your first step toward a clearer and more confident future.`;

const ABOUT_US_TEXT = `Astrofied, established in late 2019, is a trusted astrological center founded and led by Prasanta Chakraborty, a highly skilled and experienced astrologer with over 7 years of professional practice. He specialises in Vedic Astrology, KP (Krishnamurti Paddhati), Nadi Astrology, Bhrigu Nandi Nadi, Jaimini, Parashari systems, and Palmistry, offering complete and detailed guidance based on deep analysis and practical understanding. Our mission is to carefully understand each client's problems, identify the root cause, and guide them toward the best possible path according to their destiny. We combine traditional astrological wisdom with logical and systematic techniques to provide clear, honest, and result-oriented guidance. We never force clients to purchase remedies from us, if remedies are required, we simply suggest them, and the choice always remains with the client. Starting from Tripura, we are now expanding our services to other states across India. Consultations are available in Bengali, Hindi, and English through telephonic sessions. With numerous satisfied clients who have found clarity and direction through our guidance, we continue to work towards creating a positive impact in the society. Book your consultation today, because one small decision at the right time can create a powerful change in your life.`;

function MainContent() {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdminView, setIsAdminView] = useState(checkIsAdminPath);
  const [exploreRoute, setExploreRoute] = useState(getExploreRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminView(checkIsAdminPath());
      const route = getExploreRoute();
      if (route === 'rashifal' || route === 'forecasts') {
        alert("This section is currently in progress. We will announce once it's live on the website. Thank you for your patience and understanding.");
        window.location.hash = '#explore';
        setExploreRoute('hub');
        return;
      }
      setExploreRoute(route);
    };

    // Check on initial load if directly navigated to rashifal or forecasts
    const initialRoute = getExploreRoute();
    if (initialRoute === 'rashifal' || initialRoute === 'forecasts') {
      alert("This section is currently in progress. We will announce once it's live on the website. Thank you for your patience and understanding.");
      window.location.hash = '#explore';
      setExploreRoute('hub');
    }

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleOpenLegalEvent = (e) => openLegalModal(e.detail);
    window.addEventListener('openLegalModal', handleOpenLegalEvent);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('openLegalModal', handleOpenLegalEvent);
    };
  }, []);

  const handleBookConsultation = () => {
    window.open(getWhatsAppLink('I want to book an online consultation.'), '_blank');
  };

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

  const { isDarkMode } = useTheme();

  const isModalOpenRef = useRef(false);

  useEffect(() => {
    isModalOpenRef.current = legalModal.isOpen || isDetailsModalOpen;
    if (isModalOpenRef.current) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [legalModal.isOpen, isDetailsModalOpen]);

  useEffect(() => {
    // Force manual scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    let lenis = null;

    // Only use Lenis on Desktop (Non-touch/Large screens)
    // Mobile browsers have native momentum scroll which is smoother than JS-based solutions
    if (window.innerWidth >= 1024) {
      lenis = new Lenis({
        autoRaf: true, // Native 120hz synchronization
        duration: 1.2, // Buttery smooth feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1, // Slightly snappier
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      window.lenis = lenis;
    }

    const scrollToHash = () => {
      if (window.location.hash && window.location.hash !== '#' && !getExploreRoute()) {
        const cleanHash = window.location.hash.replace(/\/+$/, '');
        try {
          const target = document.querySelector(cleanHash);
          if (target) {
            document.body.style.overflow = '';
            document.body.classList.remove('mobile-nav-active');
            if (lenis || window.lenis) {
              (lenis || window.lenis).start();
              (lenis || window.lenis).resize();
            }
            const header = document.querySelector('header');
            const headerOffset = header ? header.offsetHeight : 95;
            const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset - 12);
            if (lenis || window.lenis) {
              (lenis || window.lenis).scrollTo(targetY, { duration: 1.1 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          }
        } catch (e) {
          console.error("Invalid hash selector", e);
        }
      }
    };

    // Handle initial routing to hash or scroll to top
    if (window.location.hash) {
      setTimeout(scrollToHash, 300);
      setTimeout(scrollToHash, 700);
    } else {
      window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      if (lenis) {
        lenis.destroy();
        window.lenis = null;
      }
    };
  }, []);

  // Control Lenis when modal state changes
  useEffect(() => {
    if (window.lenis) {
      if (isDetailsModalOpen || legalModal.isOpen) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }
  }, [isDetailsModalOpen, legalModal.isOpen]);

  // When switching from Explore route to official homepage with a section hash, scroll to target div
  useEffect(() => {
    if (!exploreRoute && typeof window !== 'undefined' && window.location.hash && window.location.hash !== '#') {
      const cleanHash = window.location.hash.replace(/\/+$/, '');
      if (cleanHash === '#explore') return;

      const getTargetY = (el) => {
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 95;
        return Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerOffset - 12);
      };

      const performScroll = (smooth = true) => {
        const target = document.querySelector(cleanHash);
        if (!target) return false;

        document.body.style.overflow = '';
        document.body.classList.remove('mobile-nav-active');
        if (window.lenis) {
          window.lenis.start();
          window.lenis.resize();
        }

        const targetY = getTargetY(target);

        if (window.lenis) {
          window.lenis.scrollTo(targetY, { duration: smooth ? 1.0 : 0 });
        } else {
          window.scrollTo({
            top: targetY,
            behavior: smooth ? 'smooth' : 'auto'
          });
        }
        return true;
      };

      let attempts = 0;
      const pollInterval = setInterval(() => {
        attempts++;
        if (performScroll(true)) {
          clearInterval(pollInterval);
        } else if (attempts >= 40) {
          clearInterval(pollInterval);
        }
      }, 50);

      return () => clearInterval(pollInterval);
    }
  }, [exploreRoute]);

  if (isAdminView) {
    return (
      <NewsfiedAdmin
        onBackToSite={() => {
          window.location.hash = 'newsfied';
          setIsAdminView(false);
        }}
      />
    );
  }

  // Render Explore Astrofied and its 4 Subpages in the same page (NOT in a new tab)
  if (exploreRoute) {
    return (
      <div
        className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'dark' : 'light'}`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <StarfieldBg />

        <Navbar
          onOpenLegal={openLegalModal}
          onOpenConsultation={handleBookConsultation}
          isExplore={!!exploreRoute}
        />

        {exploreRoute && !isDarkMode && (
          <style>{`
            body.light {
              background: #ffffff !important;
              background-color: #ffffff !important;
            }
          `}</style>
        )}

        <main className={`relative z-10 ${exploreRoute && !isDarkMode ? 'bg-white' : ''}`}>
          {exploreRoute === 'hub' && (
            <ExploreAstrofied
              onSelectSection={(id) => {
                window.location.hash = `#explore/${id}`;
                setExploreRoute(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToHome={() => {
                window.location.hash = '#';
                setExploreRoute(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {exploreRoute === 'political' && (
            <PoliticalAnalysisPage
              onBackToHome={() => {
                window.location.hash = '#';
                setExploreRoute(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToExplore={() => {
                window.location.hash = '#explore';
                setExploreRoute('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {exploreRoute === 'rashifal' && (
            <WeeklyRashifalPage
              onBackToHome={() => {
                window.location.hash = '#';
                setExploreRoute(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToExplore={() => {
                window.location.hash = '#explore';
                setExploreRoute('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {exploreRoute === 'forecasts' && (
            <WhatsGoingToHappenPage
              onBackToHome={() => {
                window.location.hash = '#';
                setExploreRoute(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToExplore={() => {
                window.location.hash = '#explore';
                setExploreRoute('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {exploreRoute === 'transits' && (
            <TransitPage
              onBackToHome={() => {
                window.location.hash = '#';
                setExploreRoute(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToExplore={() => {
                window.location.hash = '#explore';
                setExploreRoute('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        <Footer onOpenLegal={openLegalModal} />
        <LegalModal
          isOpen={legalModal.isOpen}
          onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
          title={legalModal.title}
          content={legalModal.content}
        />
        <WhatsAppButton />
        <ScrollToTopButton />
        <ContentProtection />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'dark' : 'light'}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <StarfieldBg />


      <Navbar
        onOpenLegal={openLegalModal}
        onOpenConsultation={handleBookConsultation}
      />

      <Hero
        onOpenConsultation={handleBookConsultation}
        isDetailsModalOpen={isDetailsModalOpen}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
        onOpenExplore={() => {
          window.location.hash = '#explore';
          setExploreRoute('hub');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Why Astrofied Section */}
      <section id="why-astrofied" className={`py-12 sm:py-16 md:py-18 lg:py-20 overflow-hidden ${isDarkMode ? '' : 'bg-white'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            <motion.div
              initial={{ opacity: 0.8, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full md:w-5/12 aspect-square glass rounded-full overflow-hidden shadow-2xl relative flex items-center justify-center p-4 border-4 border-gold/30"
            >
              <motion.img
                src={zodiacWheel}
                alt="Zodiac Wheel"
                className="w-full h-full object-contain will-change-transform"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gold/5 rounded-full pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full md:w-7/12"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 md:mb-8">
                <img
                  src={logo}
                  alt="Astrofied Logo"
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 xl:w-44 lg:h-36 xl:h-44 object-contain"
                  style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                  loading="lazy"
                />
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight">
                  Why <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black to-[#FF0000]'}`} style={{ fontFamily: '"Nunito", sans-serif' }}>Astrofied?</span>
                </h1>
              </div>
              <div className="text-base md:text-lg leading-relaxed text-justify opacity-80 whitespace-pre-line font-mulish relative">
                <p>{WHY_SJ_TEXT.slice(0, 301)} ...</p>
              </div>
              <button
                onClick={() => {
                  new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3').play().catch(() => {});
                  setIsDetailsModalOpen(true);
                }}
                className={`mt-4 font-bold transition-all flex items-center gap-2 hover:translate-x-1 cursor-pointer ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}
              >
                Read More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />
      <Pricing />
      <Kundali />
      <Numerology />

      {/* About Us Section */}
      <section id="about" className="pt-10 pb-4 sm:pt-14 sm:pb-6 md:pt-16 md:pb-8 lg:pt-18 lg:pb-8 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            <motion.div
              initial={{ opacity: 0.8, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full md:w-5/12 relative group mx-auto max-w-sm md:max-w-md lg:max-w-none"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full"
              >
                <img
                  src={aboutSj}
                  alt="Prasanta Chakraborty"
                  className="w-full h-auto max-w-full drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition-transform duration-700"
                  style={{
                     filter: isDarkMode
                      ? 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.2))'
                      : 'drop-shadow(0 0 20px rgba(75, 0, 130, 0.1))'
                  }}
                  loading="lazy"
                />

                {/* Destiny Label */}
                <div className="absolute -bottom-2 md:bottom-0 left-0 right-0 z-20 flex justify-center px-2">
                  <motion.div
                    initial={{ opacity: 0.8, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`py-2 md:py-2.5 rounded-xl shadow-2xl border border-gold/30 w-full max-w-[360px] sm:max-w-[420px] overflow-hidden flex items-center justify-center ${isDarkMode ? 'bg-[#17202A]' : 'bg-[#A30000]'}`}
                  >
                    <svg
                      viewBox="0 0 350 25"
                      className="w-[95%] h-auto max-h-[1.5rem]"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-bold font-mulish"
                        fill={isDarkMode ? "#f0fe4f" : "#ffd700"}
                        style={{ fontSize: '18px' }}
                        textLength="340"
                        lengthAdjust="spacingAndGlyphs"
                      >
                        Make sure your goals are aligned with your destiny!
                      </text>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
              {/* Background decorative element */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full blur-[100px] opacity-20 -z-10 ${isDarkMode ? 'bg-gold' : 'bg-transparent'}`} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.8, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full md:w-7/12"
            >
              <h2 className={`text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-[#A30000]'}`}>
                About Us
              </h2>
              <div className="text-base md:text-lg leading-relaxed text-justify opacity-80 whitespace-pre-line font-mulish relative">
                <p>
                  {showFullAbout
                    ? ABOUT_US_TEXT.slice(0, 432)
                    : `${ABOUT_US_TEXT.slice(0, 432)}...`}
                </p>
                <AnimatePresence>
                  {showFullAbout && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p>
                        {ABOUT_US_TEXT.slice(432).split('Prasanta Chakraborty').map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <span className={`font-bold ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}>Prasanta Chakraborty</span>}
                          </span>
                        ))}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setShowFullAbout(!showFullAbout)}
                className={`mt-4 font-bold transition-all hover:translate-x-1 ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}
              >
                {showFullAbout ? 'Read Less' : 'Read More'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-2 pb-10 sm:pt-2 sm:pb-14 md:pt-3 md:pb-16 lg:pt-4 lg:pb-18 relative flex justify-center items-center overflow-hidden px-4 sm:px-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookConsultation}
          className={`relative z-10 px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-[15px] border-2 text-sm sm:text-base md:text-xl font-bold tracking-widest transition-all shadow-xl font-mulish ${isDarkMode
            ? 'bg-transparent border-gold text-gold hover:bg-gold hover:text-black shadow-gold/20'
            : 'consultation-btn-light shadow-[#A30000]/20'
            }`}
        >
          <span>BOOK A CONSULTATION</span>
        </motion.button>
      </section>

      {/* Feedback Section */}
      <Feedback />

      <Panchang />

      {/* Promo Video Section */}
      <PromoVideo />
      <AstrofiedJournals />
      <GemstoneRemediesTeaser />

      <Testimonials />
      <GooglePresence />

      {/* Newsfied Section */}
      <Newsfied onOpenAdmin={() => {
        window.location.hash = 'admin';
        setIsAdminView(true);
      }} />

      {/* FAQs Section */}
      <FAQs />
      <Footer onOpenLegal={openLegalModal} />
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.title}
        content={legalModal.content}
      />
      <ExploreModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
      <WhatsAppButton />
      <ContentProtection />
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
