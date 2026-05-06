import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send, CheckCircle, AlertCircle, Smile } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Feedback({ onSuccess }) {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error, duplicate, otp_sent, otp_error
    const [otp, setOtp] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Please fill in your name, email, and mobile number first.");
            return;
        }

        setStatus('loading');

        const newOtp = generateOtp();
        setOtp(newOtp);

        try {
            // Using your EmailJS Service ID and Template ID
            await emailjs.send(
                "service_g7j8tmb", 
                "template_fk1x5ub", 
                {
                    to_name: formData.name,
                    to_email: formData.email,
                    otp: newOtp,
                    site_name: "Astrofied"
                },
                "wOEMDGNTN7YJ4O9rb" // Your Public Key
            );

            setIsOtpSent(true);
            setStatus('otp_sent');
            console.log(`[DEBUG] OTP sent to ${formData.email}`);

        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus('otp_error');
            alert("Failed to send OTP. Please check your EmailJS configuration.");
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (userOtp === otp) {
            setIsVerified(true);
            setStatus('idle');
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isVerified) return;

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
                    phone: `${formData.countryCode} ${formData.phone}`,
                    message: formData.message,
                    _replyto: formData.email,
                    _subject: `Feedback from ${formData.name} - Astrofied (Verified)`,
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
                if (onSuccess) {
                    onSuccess({
                        id: Date.now(),
                        name: formData.name,
                        img: Smile,
                        text: formData.message
                    });
                }
                // Reset everything
                setFormData({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
                setIsVerified(false);
                setIsOtpSent(false);
                setOtp('');
                setUserOtp('');

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

                        <form onSubmit={isVerified ? handleSubmit : (isOtpSent ? handleVerifyOtp : handleSendOtp)} className="flex flex-col gap-5">
                            <div className={`space-y-5 transition-all duration-500 ${isOtpSent && !isVerified ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
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
                                <div className="relative">
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
                                    {isVerified && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
                                </div>
                                <div className="flex gap-2">
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        required
                                        className={`w-28 px-3 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all cursor-pointer ${isDarkMode 
                                            ? 'border-white text-white focus:ring-white focus:border-white [color-scheme:dark]' 
                                            : 'border-black text-gray-900 focus:ring-[#4B0082] focus:border-[#4B0082]'
                                            }`}
                                    >
                                        <option value="+91" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>🇮🇳 +91</option>
                                        <option value="+1" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>🇺🇸 +1</option>
                                        <option value="+44" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>🇬🇧 +44</option>
                                        <option value="+61" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>🇦🇺 +61</option>
                                        <option value="+971" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>🇦🇪 +971</option>
                                        <option value="+880" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>🇧🇩 +880</option>
                                        <option value="+65" className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>🇸🇬 +65</option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone || ''}
                                        onChange={handleChange}
                                        required
                                        placeholder="Mobile Number"
                                        className={`flex-1 px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                            ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                            : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                            }`}
                                    />
                                </div>
                            </div>

                            {isOtpSent && !isVerified && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gold/80' : 'text-[#4B0082]/80'}`}>
                                            Enter 6-Digit OTP sent to your Email
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={userOtp}
                                            onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ''))}
                                            placeholder="XXXXXX"
                                            className={`w-full px-5 py-4 text-center text-2xl tracking-[1em] font-bold rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                                ? 'border-gold text-white focus:ring-gold' 
                                                : 'border-[#4B0082] text-gray-900 focus:ring-[#4B0082]'
                                            }`}
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => { setIsOtpSent(false); setStatus('idle'); }}
                                        className={`text-sm font-bold underline ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}
                                    >
                                        Change Email/Phone?
                                    </button>
                                </motion.div>
                            )}

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
                                <div className={`absolute bottom-3 right-3 text-[10px] font-bold ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
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
                                {status === 'loading' ? 'Processing...' : (
                                    !isOtpSent ? 'Send OTP to Email' : (isVerified ? 'Submit Feedback' : 'Verify OTP & Submit')
                                )}
                                {status !== 'loading' && <Send className="w-5 h-5" />}
                            </motion.button>


                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
