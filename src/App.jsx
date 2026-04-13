import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ThemeToggle3D from './components/ThemeToggle3D';
import Services from './components/Services';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import FAQs from './components/FAQs';
import SolarSystem from './components/SolarSystem';
import Testimonials from './components/Testimonials';
import Hero from './components/Hero';
import Kundali from './components/Kundali';
import LegalModal from './components/LegalModal';

import logo from './assets/logo.png';
import zodiacWheel from './assets/zodiac-wheel.png';
import aboutSj from './assets/about-section-image.jpg';

const WHY_SJ_TEXT = `We offer trusted and result-oriented astrological services to clients seeking guidance in different areas of life. Whether your concern is related to personal matters, legal issues, finance, health, marriage, or career, we provide detailed insights and practical solutions tailored to your situation. What makes us different is our strong commitment to accuracy and client satisfaction. Our predictions, whether daily, yearly, or long-term, are explained clearly and in detail, helping clients feel confident and assured about their life decisions. Our experienced astrologer is knowledgeable, well-mannered, and highly intuitive. With deep analysis, we identify the root cause of your challenges and guide you with suitable remedies and actionable solutions. We focus not just on predicting events, but on helping you understand and navigate them in the right way. We believe in clarity, honesty, and proven results. Our goal is not just to make promises, but to deliver guidance that truly makes a difference in your life. Share your birth details with us, stay open to guidance, and take your first step toward a clearer and more confident future.`;

const ABOUT_US_TEXT = `Astrofied, established in late 2019, is a trusted astrological center founded and led by Prasanta Chakraborty, a highly skilled and experienced astrologer with over 7 years of professional practice. He specialises in Vedic Astrology, KP (Krishnamurti Paddhati), Nadi Astrology, Bhrigu Nandi Nadi, Jaimini, Parashari systems, and Palmistry, offering complete and detailed guidance based on deep analysis and practical understanding. Our mission is to carefully understand each client's problems, identify the root cause, and guide them toward the best possible path according to their destiny. We combine traditional astrological wisdom with logical and systematic techniques to provide clear, honest, and result-oriented guidance. We never force clients to purchase remedies from us, if remedies are required, we simply suggest them, and the choice always remains with the client. Starting from Tripura, we are now expanding our services to other states across India. Consultations are available in Bengali, Hindi, and English through telephonic sessions as well as in-person chamber visits. With numerous satisfied clients who have found clarity and direction through our guidance, we continue to work toward creating a positive impact in society. Book your consultation today, because one small decision at the right time can create a powerful change in your life.`;

function MainContent() {
  const [showFullWhySj, setShowFullWhySj] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

  const openLegalModal = (type) => {
    if (type === 'terms') {
      setLegalModal({
        isOpen: true,
        title: 'Terms and Conditions',
        content: `1. Acceptance of Terms
By accessing and using Astrofied (the Website), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must immediately discontinue use of our services.

2. Eligibility
You must be at least 18 years of age to use this Website or purchase services. By using Astrofied, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement.

3. Nature of Services (Disclaimer)
Entertainment Purposes: All astrological consultations, reports, and content provided by Astrofied are for guidance and entertainment purposes only.
No Professional Advice: Astrology is not a substitute for professional medical, legal, financial, or psychological advice. Astrofied does not guarantee the accuracy or reliability of any predictions or insights.
User Responsibility: Any actions taken based on the information provided by Astrofied are solely the responsibility of the user.

4. Payments and Refunds
Pricing: All fees for consultations and reports are clearly stated on the Website. We reserve the right to change pricing at any time.
Refund Policy: Due to the personalized nature of astrological reports and the time allocated for live consultations, payments are generally non-refundable once the service has been initiated or delivered, except in cases of technical failure on our part.

5. User Conduct
You agree not to use the Website for any unlawful purpose. You are prohibited from:
Providing false information during registration or consultation.
Attempting to interfere with the Website’s security or functionality.
Harassing or using abusive language toward our consultants.

6. Intellectual Property
All content on Astrofied, including text, graphics, logos, and software, is the property of Astrofied and protected by copyright and intellectual property laws. You may not reproduce, distribute, or sell any content without prior written consent.

7. Privacy and Data Security
Your personal data, including birth details, is handled in accordance with our Privacy Policy. While we implement industry-standard security measures, we cannot guarantee absolute security of data transmitted over the internet.

8. Limitation of Liability
To the maximum extent permitted by law, Astrofied and its practitioners shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, even if advised of the possibility of such damages.

9. Modifications to Terms
Astrofied reserves the right to modify these Terms and Conditions at any time. Updates will be posted on this page with a revised Last Updated date. Continued use of the Website constitutes acceptance of the new terms.

10. Governing Law
These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Agartala, Tripura.`
      });
    } else if (type === 'privacy') {
      setLegalModal({
        isOpen: true,
        title: 'Privacy Policy',
        content: `Your privacy is important to us. Here is how we handle your data:

1. Data Collection: We collect birth details (Date, Time, Location) solely for generating your Kundali or performing consultations.
2. Data Sharing: Your personal details are never shared with third parties for marketing purposes.
3. Security: We implement standard security measures to protect your information.

More content to be added as provided...`
      });
    }
  };
  const { isDarkMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 0.8, // Slightly faster for responsiveness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // Increase for better handling
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'dark' : 'light'}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="cosmic-bg">
        <div className="star-layer-3" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="nebula" />
      </div>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX, background: isDarkMode ? '#D4AF37' : '#4B0082' }}
      />

      <Navbar onOpenLegal={openLegalModal} />
      <ThemeToggle3D />

      <Hero />

      {/* Why Astrofied Section */}
      <section id="why-astrofied" className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 aspect-square glass rounded-full overflow-hidden shadow-2xl relative flex items-center justify-center p-4 border-4 border-gold/30"
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
                <img
                  src={logo}
                  alt="Astrofied Logo"
                  className="w-28 h-28 md:w-24 md:h-24 object-contain"
                  style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                />
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  Why <span className="text-gold">Astrofied?</span>
                </h1>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-justify opacity-80 whitespace-pre-line font-mulish">
                {showFullWhySj ? WHY_SJ_TEXT : `${WHY_SJ_TEXT.slice(0, 350)}...`}
              </p>
              <button
                onClick={() => setShowFullWhySj(!showFullWhySj)}
                className="mt-4 text-gold font-bold hover:underline transition-all flex items-center gap-2"
              >
                {showFullWhySj ? 'Read Less' : 'Read More'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />
      <Kundali />

      {/* About Us Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden glass shadow-2xl relative"
            >
              <img
                src={aboutSj}
                alt="About Astrofied"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                About Us
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-justify opacity-80 whitespace-pre-line font-mulish">
                {showFullAbout ? (
                  ABOUT_US_TEXT.split('Prasanta Chakraborty').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="font-bold text-gold">Prasanta Chakraborty</span>}
                    </span>
                  ))
                ) : (
                  `${ABOUT_US_TEXT.slice(0, 400)}...`
                )}
              </p>
              <button
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="mt-4 text-gold font-bold hover:underline transition-all"
              >
                {showFullAbout ? 'Read Less' : 'Read More'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 relative flex justify-center items-center overflow-hidden px-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/919612736566?text=I%20want%20to%20book%20an%20appointment%20for%20an%20online%20consultation%20with%20Astrofied.%20Please%20guide%20me%20through%20the%20process%20of%20sending%20my%20birth%20details%20and%20completing%20the%20payment.', '_blank')}
          className={`relative z-10 px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-full border-2 text-sm sm:text-base md:text-xl font-bold tracking-widest transition-all shadow-xl font-mulish ${isDarkMode
              ? 'bg-transparent border-gold text-gold hover:bg-gold hover:text-black shadow-gold/20'
              : 'bg-[#4B0082] border-[#4B0082] text-white hover:bg-transparent hover:text-[#4B0082] shadow-[#4B0082]/20'
            }`}
        >
          BOOK A CONSULTATION
        </motion.button>
      </section>

      {/* Feedback Section */}
      <Feedback />

      {/* FAQs Section */}
      <FAQs />

      <Testimonials />
      <Footer onOpenLegal={openLegalModal} />
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.title}
        content={legalModal.content}
      />
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
