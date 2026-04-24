import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Who can book an 'Online Consultation?'",
        answer: "Anyone seeking clarity in life, career, relationships, business, finances, or personal growth can book a consultation. No prior astrology knowledge is required."
    },

    {
        question: "Why shall I choose Astrofied?",
        answer: "We do not pressure you to purchase remedies, buy expensive gemstones, or pay large sums for spiritual corrections. Our focus remains on core predictions and guiding you toward the right path with accuracy. We prioritise genuine insight over selling costly gemstones with unverified claims about changing your luck."
    },


    {
        question: "How is the consultation conducted?",
        answer: "Consultations are available in Bengali, Hindi, and English via calls and are conducted strictly through online mode. Please note that there is no option for physical chamber visits or in-person consultations."
    },

    {
        question: "How do I make the payment?",
        answer: "Payments can be made through any UPI app, our QR code, or via a specific UPI ID. Please note that cash payments are not accepted, as all consultations are conducted strictly online and no in-person sessions are available."
    },

    {
        question: "What details do I need to provide before the consultation?",
        answer: "You need to provide your exact Date of Birth, Time of Birth, and Place of Birth. These precise details are essential to cast an accurate birth chart (Kundali) for detailed predictions."
    },
    {
        question: "How long does each Consultation session last?",
        answer: "Depending on the specific consultation service you choose, a typical session lasts between 30 minutes to 60 minutes, giving enough time to deeply analyse your chart and answer queries."
    },





];

export default function FAQs() {
    const { isDarkMode } = useTheme();
    const [openIndex, setOpenIndex] = useState(0); // First one open by default

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className={`py-24 relative overflow-hidden ${isDarkMode ? '' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12 font-mulish"
                    style={{ color: isDarkMode ? '#FFFFFF' : '#4B0082' }}
                >
                    Frequently Asked Questions
                </motion.h2>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => {
                        const isActive = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`border-2 rounded-[1rem] transition-all duration-300 overflow-hidden shadow-sm ${isDarkMode
                                    ? isActive
                                        ? 'border-[#D4AF37] bg-[#4B0082]/30 shadow-[#D4AF37]/10'
                                        : 'border-[#4B0082] bg-[#121212] hover:border-[#D4AF37]/50'
                                    : isActive
                                        ? 'border-[#4B0082] bg-[#F5F5DC] shadow-[#4B0082]/10'
                                        : 'border-[#4B0082]/20 bg-[#FFFFFF] hover:border-[#4B0082]'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-6 py-5 md:py-6 flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <span className={`text-base md:text-lg font-bold transition-colors font-mulish ${isDarkMode
                                        ? isActive ? 'text-[#D4AF37]' : 'text-gray-100 hover:text-white'
                                        : isActive ? 'text-[#DC2626]' : 'text-[#17202A] hover:text-[#DC2626]'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <span className={`flex-shrink-0 transition-colors ${isDarkMode
                                        ? isActive ? 'text-[#D4AF37]' : 'text-gray-100'
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
                                            <div className={`px-6 pb-6 pt-1 text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-black'
                                                }`}>
                                                {faq.answer}
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
