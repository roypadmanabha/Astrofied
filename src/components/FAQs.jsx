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
        answer: "We offer both online and offline consultations, so you can choose the option that suits you best.\n\nOnline Consultation: ₹750\nOffline Consultation: ₹950"
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
            {line.split(/(Astrofied|₹750|₹950)/g).map((part, i) => {
                if (part === 'Astrofied') {
                    return <span key={i} className="brand-text">Astrofied</span>;
                }
                if (part === '₹750' || part === '₹950') {
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
        <section id="faqs" className={`py-24 relative overflow-hidden ${isDarkMode ? '' : 'bg-white'}`}>
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12 font-mulish"
                    style={{ color: isDarkMode ? '#FFFFFF' : '#A30000' }}
                >
                    Frequently Asked Questions
                </motion.h2>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => {
                        const isActive = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className={`rounded-[1rem] transition-all duration-300 overflow-hidden shadow-sm ${isDarkMode
                                    ? isActive
                                        ? 'border border-gray-600 bg-transparent shadow-white/5'
                                        : 'border border-gray-600 bg-transparent hover:border-gray-400'
                                    : isActive
                                        ? 'border-2 border-[#A30000] bg-[#F5F5DC] shadow-[#A30000]/10'
                                        : 'border-2 border-[#A30000]/20 bg-[#FFFFFF] hover:border-[#A30000]'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-6 py-5 md:py-6 flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <span className={`text-base md:text-lg font-bold transition-colors font-mulish ${isDarkMode
                                        ? isActive ? 'text-[#ffd700]' : 'text-gray-100 hover:text-white'
                                        : isActive ? 'text-[#DC2626]' : 'text-[#17202A] hover:text-[#DC2626]'
                                        }`}>
                                        {formatAstrofied(faq.question, isDarkMode)}
                                    </span>
                                    <span className={`flex-shrink-0 transition-colors ${isDarkMode
                                        ? isActive ? 'text-[#ffd700]' : 'text-gray-100'
                                        : isActive ? 'text-[#DC2626]' : 'text-[#17202A]'
                                        }`}>
                                        {isActive ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className={`px-6 pb-6 pt-1 text-sm md:text-base leading-relaxed text-justify ${isDarkMode ? 'text-gray-300' : 'text-black'
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
