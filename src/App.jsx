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
import Pricing from './components/Pricing';
import LegalModal from './components/LegalModal';
import StarfieldBg from './components/StarfieldBg';

import logo from './assets/logo.png';
import zodiacWheel from './assets/zodiac-wheel.png';
import aboutSj from './assets/about-prasanta-new.png';

const WHY_SJ_TEXT = `We offer trusted and result-oriented astrological services to clients seeking guidance in different areas of life. Whether your concern is related to personal matters, legal issues, finance, health, marriage, or career, we provide detailed insights and practical solutions tailored to your situation. What makes us different is our strong commitment to accuracy and client satisfaction. Our predictions, whether daily, yearly, or long-term, are explained clearly and in detail, helping clients feel confident and assured about their life decisions. Our experienced astrologer is knowledgeable, well-mannered, and highly intuitive. With deep analysis, we identify the root cause of your challenges and guide you with suitable remedies and actionable solutions. We focus not just on predicting events, but on helping you understand and navigate them in the right way. We believe in clarity, honesty, and proven results. Our goal is not just to make promises, but to deliver guidance that truly makes a difference in your life. Share your birth details with us, stay open to guidance, and take your first step toward a clearer and more confident future.`;

const ABOUT_US_TEXT = `Astrofied, established in late 2019, is a trusted astrological center founded and led by Prasanta Chakraborty, a highly skilled and experienced astrologer with over 7 years of professional practice. He specialises in Vedic Astrology, KP (Krishnamurti Paddhati), Nadi Astrology, Bhrigu Nandi Nadi, Jaimini, Parashari systems, and Palmistry, offering complete and detailed guidance based on deep analysis and practical understanding. Our mission is to carefully understand each client's problems, identify the root cause, and guide them toward the best possible path according to their destiny. We combine traditional astrological wisdom with logical and systematic techniques to provide clear, honest, and result-oriented guidance. We never force clients to purchase remedies from us, if remedies are required, we simply suggest them, and the choice always remains with the client. Starting from Tripura, we are now expanding our services to other states across India. Consultations are available in Bengali, Hindi, and English through telephonic sessions. With numerous satisfied clients who have found clarity and direction through our guidance, we continue to work towards creating a positive impact in the society. Book your consultation today, because one small decision at the right time can create a powerful change in your life.`;

function MainContent() {
  const [showFullWhySj, setShowFullWhySj] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

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
    } else if (type === 'refund') {
      setLegalModal({
        isOpen: true,
        title: 'Refund Policy',
        content: `<b>1. Personalized Nature of Services</b>
Astrological reports and consultations are highly personalized and involve significant time and effort from our expert. Once a report is generated or a consultation session has been initiated/completed, the service is considered "delivered".

<b>2. Non-Refundable Services</b>
Due to the nature of digital goods and professional consulting services:
- Customized reports are non-refundable once delivered.
- Completed consultations (phone, chat, or in-person) are non-refundable.

<b>3. Exceptions for Refund</b>
You may request a refund in the following scenarios:
- <b>Double Payment:</b> If you were charged twice for the same service due to a technical error.
- <b>Incomplete Service:</b> If the service is not delivered by us within the promised timeframe (usually 3-7 working days for reports) or the consultation does not happen due to our absence.
- <b>Cancellation:</b> If you cancel your booking at least 24 hours before the scheduled consultation time.

<b>4. Refund Process</b>
To request a refund, please email us at sj.astrologyservices@gmail.com with your Order ID and Payment ID. Refund requests will be processed within 5-7 working days after approval.

<b>5. Dispute Resolution</b>
For any payment-related disputes, please contact us directly before raising a chargeback with your bank or payment provider. We are committed to resolving issues for our valued customers.`
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
      <StarfieldBg />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX, background: isDarkMode ? '#D4AF37' : '#4B0082' }}
      />

      <Navbar onOpenLegal={openLegalModal} />
      <ThemeToggle3D />

      <Hero />

      {/* Why Astrofied Section */}
      <section id="why-astrofied" className={`py-24 overflow-hidden ${isDarkMode ? '' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-7/12"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
                <img
                  src={logo}
                  alt="Astrofied Logo"
                  className="w-28 h-28 md:w-32 md:h-32 lg:w-36 xl:w-44 lg:h-36 xl:h-44 object-contain"
                  style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                />
                <h1 className="text-4xl md:text-4xl lg:text-[2.75rem] xl:text-7xl font-bold leading-tight">
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
      <Pricing onOpenLegal={openLegalModal} />

      {/* About Us Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-5/12 relative group mx-auto max-w-sm md:max-w-none"
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
                />
                
                {/* Destiny Label */}
                <div className="absolute -bottom-2 md:bottom-0 left-0 right-0 z-20 flex justify-center px-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#4B0082] py-2 md:py-2.5 rounded-xl shadow-2xl border border-gold/30 w-full max-w-[420px] overflow-hidden flex items-center justify-center"
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
                        fill="#D4AF37"
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
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full blur-[100px] opacity-20 -z-10 ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-7/12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                About Us
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-justify opacity-80 whitespace-pre-line font-mulish">
                {showFullAbout ? (
                  ABOUT_US_TEXT.split('Prasanta Chakraborty').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <span className={`font-bold ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>Prasanta Chakraborty</span>}
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
