import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Feedback() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', countryCode: '+91', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error, duplicate

    const countryCodes = [
        { code: '+91', flag: '🇮🇳' },
        { code: '+1', flag: '🇺🇸' },
        { code: '+44', flag: '🇬🇧' },
        { code: '+61', flag: '🇦🇺' },
        { code: '+1', flag: '🇨🇦' },
        { code: '+971', flag: '🇦🇪' },
        { code: '+65', flag: '🇸🇬' },
        { code: '+49', flag: '🇩🇪' },
        { code: '+33', flag: '🇫🇷' },
        { code: '+81', flag: '🇯🇵' },
        { code: '+86', flag: '🇨🇳' },
        { code: '+7', flag: '🇷🇺' },
        { code: '+55', flag: '🇧🇷' },
        { code: '+27', flag: '🇿🇦' },
        { code: '+880', flag: '🇧🇩' },
        { code: '+977', flag: '🇳🇵' },
        { code: '+94', flag: '🇱🇰' },
        { code: '+92', flag: '🇵🇰' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'message' && value.length > 87) return;
        if (name === 'mobile') {
            // Only allow digits and max 10
            const digits = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: digits });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mobile Number Validation
        const mobile = formData.mobile;
        const sequential = "1234567890";
        const reverseSequential = "0987654321";
        const altReverseSequential = "9876543210";
        const repetitive = /^(\d)\1{9}$/;

        if (mobile.length !== 10) {
            setStatus('invalid_mobile');
            return;
        }

        if (mobile === sequential || mobile === reverseSequential || mobile === altReverseSequential || repetitive.test(mobile)) {
            setStatus('invalid_pattern');
            return;
        }

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
                    mobile: `${formData.countryCode} ${formData.mobile}`,
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
                setFormData({ name: '', email: '', mobile: '', countryCode: '+91', message: '' });

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
        <section id="feedback" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-x-16 gap-y-12 items-start justify-between">
                    {/* Left Side: Content */}
                    <motion.div 
                        initial={{ opacity: 0.8, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full lg:w-5/12 lg:pt-12 text-center lg:text-left"
                    >
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6 font-mulish leading-tight"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            We Value Your <br className="hidden lg:block" /> Feedback
                        </h2>
                        <p className={`text-lg md:text-xl opacity-80 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Your insights help us improve and serve you better. Share your experience with Astrofied!
                        </p>
                    </motion.div>

                    {/* Right Side: Form in its own Glass Card */}
                    <motion.div 
                        initial={{ opacity: 0.8, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`w-full lg:w-6/12 rounded-3xl p-8 md:p-10 shadow-2xl border relative ${
                            isDarkMode ? 'border-white/20 !bg-[#17202A]' : 'glass border-[#4B0082]/20 !bg-[#F3E8FF]/90'
                        }`}
                    >
                        {status === 'invalid_mobile' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Please enter a valid 10-digit mobile number.</span>
                            </motion.div>
                        )}

                        {status === 'invalid_pattern' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">This number pattern is invalid. Please enter a real mobile number.</span>
                            </motion.div>
                        )}

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
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                    ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                    : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                    }`}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Mail Id"
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                    ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                    : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                    }`}
                            />

                            {/* Mobile Number with Country Code */}
                            <div className="flex gap-2">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className={`w-24 px-2 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all cursor-pointer ${isDarkMode 
                                        ? 'border-white text-white bg-black focus:ring-white focus:border-white' 
                                        : 'border-black text-gray-900 bg-[#F3E8FF] focus:ring-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                >
                                    {countryCodes.map((c) => (
                                        <option key={c.code + c.flag} value={c.code} className="text-black">
                                            {c.flag} {c.code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    maxLength={10}
                                    placeholder="Mobile Number"
                                    className={`flex-1 px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                        ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                        : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                />
                            </div>

                            <div className="relative">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    maxLength={87}
                                    placeholder="Write your feedback..."
                                    className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all overflow-hidden resize-none ${isDarkMode 
                                        ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                        : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                ></textarea>
                                <div className={`absolute bottom-2 right-4 text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-[#4B0082]/40'}`}>
                                    {formData.message.length}/87
                                </div>
                            </div>

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


                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
