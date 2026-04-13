import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Feedback() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error, duplicate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Check for Duplicate Email using LocalStorage
        const sentEmails = JSON.parse(localStorage.getItem('astrofied_feedback_emails')) || [];
        const normalizedEmail = formData.email.toLowerCase().trim();

        if (sentEmails.includes(normalizedEmail)) {
            setStatus('duplicate');
            return;
        }

        setStatus('loading');

        try {
            // Using FormSubmit.co for reliable cross-domain mail delivery
            const response = await fetch("https://formsubmit.co/ajax/contact.astrofied@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _replyto: formData.email,
                    _subject: `Feedback from ${formData.name} - Astrofied`,
                    _captcha: "false",
                    _template: "table"
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Save the email to local storage to prevent duplicates
                sentEmails.push(normalizedEmail);
                localStorage.setItem('astrofied_feedback_emails', JSON.stringify(sentEmails));

                setStatus('success');
                setFormData({ name: '', email: '', message: '' });

                // Reset success state after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error("FormSubmit Error:", data);
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus('error');
        }
    };

    return (
        <section id="feedback" className={`py-12 md:py-24 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#05010d]' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    
                    {/* Left Side: Heading */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${isDarkMode ? 'border-gold/30 text-gold bg-gold/5' : 'border-purple-600/20 text-[#4B0082] bg-purple-600/5'
                                }`}
                        >
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">User Experience</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-4xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight ${isDarkMode ? 'text-white' : 'text-[#4B0082]'
                                }`}
                        >
                            We <br />
                            <span className="text-gold italic">Value Your</span> <br />
                            Feedback
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-[#4B0082]/70'
                                }`}
                        >
                            Your insights help us improve and serve you better. Share your experience with Astrofied!
                        </motion.p>
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="w-full lg:w-2/5 max-w-md mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-6 md:p-10 rounded-[2.5rem] border shadow-2xl backdrop-blur-3xl transition-all duration-500 flex flex-col justify-center relative ${isDarkMode
                                ? 'border-gold bg-[#0f0a1f]/80'
                                : 'border-[#D4AF37]/20 bg-[#F5F5DC]'
                                }`}
                        >
                            {!isDarkMode && (
                                <img
                                    src={logo}
                                    alt="Astrofied"
                                    className="absolute top-6 right-6 w-12 h-12 object-contain opacity-20"
                                />
                            )}
                            
                            <div className="relative z-10">
                                {status === 'duplicate' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-[10px] leading-tight font-medium">Feedback with your mail id was already sent. Try with a new mail id.</span>
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 rounded-xl bg-green-100 border border-green-200 text-green-700 flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-[10px] leading-tight font-medium">Thank you! Your feedback has been sent successfully.</span>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-[10px] leading-tight font-medium">Something went wrong. Please try again later.</span>
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                        className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-gold bg-transparent transition-all text-sm ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                            }`}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Mail Id"
                                        className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-gold bg-transparent transition-all text-sm ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                            }`}
                                    />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="Write your feedback..."
                                        className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-gold bg-transparent transition-all overflow-hidden resize-none text-sm ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                            }`}
                                    ></textarea>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={status === 'loading'}
                                        type="submit"
                                        className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                                            } ${isDarkMode
                                                ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20'
                                                : 'bg-[#4B0082] text-white hover:bg-[#3A0066] shadow-[#4B0082]/30'
                                            }`}
                                    >
                                        <span className="uppercase tracking-widest text-xs">
                                            {status === 'loading' ? 'Sending...' : 'Send Feedback'}
                                        </span>
                                        {status !== 'loading' && <Send className="w-4 h-4" />}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
