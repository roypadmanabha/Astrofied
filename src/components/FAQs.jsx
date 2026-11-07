import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Who can book a Consultation?",
        answer: "Anyone seeking clarity in life, career, relationships, business, finances, or personal growth can book a consultation. No prior astrology knowledge is required."
    },
    {
        question: "Why shall I choose Astrofied?",
        answer: "We do not pressure you to purchase remedies, buy expensive gemstones, or pay large sums for spiritual corrections. Our focus remains on core predictions and guiding you toward the right path with accuracy. We prioritise genuine insight over selling costly gemstones with unverified claims about changing your luck."
    },
    {
        question: "What are the consultation options?",
        answer: "We offer both online and offline consultations, so you can choose the option that suits you best.\n\nOnline Consultation: ₹750\nOffline Consultation: ₹850"
    },
    {
        question: "How is the consultation conducted?",
        answer: "Consultations are available in Bengali, Hindi, and English via phone calls for online mode, as well as in-person visits for offline consultations."
    },
    {
        question: "How do I make the payment?",
        answer: "Payments can be made through any UPI app, our QR code, or via a specific UPI ID. Cash payments are NOT accepted for offline consultations."
    },
    {
        question: "What details do I need to provide for the consultation?",
        answer: "You need to provide your exact Date of Birth, Time of Birth, and Place of Birth. These precise details are essential to cast an accurate birth chart (Kundali) for detailed predictions."
    },
    {
        question: "How long does each Consultation session last?",
        answer: "Depending on the specific consultation service you choose, a typical session lasts between 30 minutes to 60 minutes, giving enough time to deeply analyse your chart and answer queries."
    }
];

const formatAstrofied = (text, isDarkMode = false) => {
    if (!text) return text;
    if (typeof text !== 'string') return text;
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => (
        <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split(/(Astrofied|₹750|₹850)/g).map((part, i) => {
                if (part === 'Astrofied') {
                    return <span key={i} className="brand-text">Astrofied</span>;
                }
                if (part === '₹750' || part === '₹850') {
                    return (
                        <span key={i} className={`font-bold ${isDarkMode ? 'text-[#ffd700]' : 'text-[#A30000]'}`}>
                            {part}
                        </span>
                    );
                }
                return part;
            })}
        </span>
    ));
};

export default function FAQs() {
    const { isDarkMode } = useTheme();
    const [openIndex, setOpenIndex] = useState(0); // First one open by default
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className={`py-12 sm:py-16 md:py-24 relative overflow-hidden ${isDarkMode ? '' : 'bg-white'}`}>
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 font-mulish"
                    style={{ color: isDarkMode ? '#FFFFFF' : '#A30000' }}
                >
                    Frequently Asked Questions
                </motion.h2>

                <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4">
                    {faqs.map((faq, index) => {
                        const isActive = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className={`rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden shadow-sm ${isDarkMode
                                    ? isActive
                                        ? 'border border-gold/40 bg-white/[0.03] shadow-gold/5'
                                        : 'border border-white/10 bg-transparent hover:border-white/20'
                                    : isActive
                                        ? 'border border-[#A30000] bg-[#F5F5DC]/80 shadow-[#A30000]/5'
                                        : 'border border-[#A30000]/15 bg-white hover:border-[#A30000]/40'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-3.5 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                                >
                                    <span className={`text-[13.5px] sm:text-base md:text-lg font-bold transition-colors font-mulish leading-snug ${isDarkMode
                                        ? isActive ? 'text-[#ffd700]' : 'text-gray-100 hover:text-white'
                                        : isActive ? 'text-[#A30000]' : 'text-[#17202A] hover:text-[#A30000]'
                                        }`}>
                                        {formatAstrofied(faq.question, isDarkMode)}
                                    </span>
                                    <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${isDarkMode
                                        ? isActive ? 'bg-gold/20 text-gold rotate-180' : 'bg-white/5 text-gray-300'
                                        : isActive ? 'bg-[#A30000]/10 text-[#A30000] rotate-180' : 'bg-black/5 text-[#17202A]'
                                        }`}>
                                        {isActive ? (
                                            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                                        ) : (
                                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                                        )}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                        >
                                            <div className={`px-3.5 sm:px-5 md:px-6 pb-3.5 sm:pb-5 md:pb-6 pt-0 text-xs sm:text-sm md:text-base leading-relaxed text-justify ${isDarkMode ? 'text-gray-300' : 'text-[#17202A]/85'
                                                }`}>
                                                {formatAstrofied(faq.answer, isDarkMode)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
