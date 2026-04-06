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
            // Using FormSubmit.co for hassle-free backend sending without registration
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
                    _subject: "New Astrofied Customer Feedback!"
                })
            });

            if (response.ok) {
                // Save the email to local storage to prevent duplicates
                sentEmails.push(normalizedEmail);
                localStorage.setItem('astrofied_feedback_emails', JSON.stringify(sentEmails));

                setStatus('success');
                setFormData({ name: '', email: '', message: '' });

                // Reset success state after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="feedback" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`glass rounded-3xl p-8 md:p-12 shadow-2xl border flex flex-col md:flex-row gap-12 items-center ${isDarkMode ? 'border-gray-800' : 'border-gray-200 bg-white/60'
                        }`}
                >
                    <div className="w-full md:w-5/12 flex flex-col justify-center text-center md:text-left">
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-4 font-raleway"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            We Value Your Feedback
                        </h2>
                        <p className={`text-base md:text-lg opacity-80 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Your insights help us improve and serve you better. Share your experience with Astrofied!
                        </p>
                    </div>

                    <div className="w-full md:w-7/12 relative">
                        {status === 'duplicate' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Feedback with your mail id was already sent. Try with a new mail id.</span>
                            </motion.div>
                        )}

                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-green-100 border border-green-200 text-green-700 flex items-center gap-3"
                            >
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Thank you! Your feedback has been sent successfully.</span>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Something went wrong. Please try again later.</span>
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
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold bg-transparent transition-all ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                    }`}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Mail Id"
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold bg-transparent transition-all ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                    }`}
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Write your feedback..."
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold bg-transparent transition-all overflow-hidden resize-none ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
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
                                {status === 'loading' ? 'Sending...' : 'Send Feedback'}
                                {status !== 'loading' && <Send className="w-5 h-5" />}
                            </motion.button>

                            {/* <p className="text-xs text-center opacity-60 mt-2">
                                *Note: To activate logic on first use, you may receive an email to activate this form at sj.astrologyservices@gmail.com
                            </p> */}
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
