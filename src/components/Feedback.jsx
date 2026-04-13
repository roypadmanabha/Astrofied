import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Feedback() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [countryCode, setCountryCode] = useState('+91');
    const [status, setStatus] = useState('idle'); 
    
    // OTP States
    const [otpStep, setOtpStep] = useState('idle'); // idle, sending, verifying, verified
    const [otpValue, setOtpValue] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpDemoCode, setOtpDemoCode] = useState(''); // For local demo visibility

    const countryCodes = [
        { code: '+91', country: 'IN' },
        { code: '+1', country: 'US' },
        { code: '+44', country: 'UK' },
        { code: '+61', country: 'AU' },
        { code: '+971', country: 'UAE' },
        { code: '+65', country: 'SG' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOTP = async () => {
        if (!formData.phone || formData.phone.length < 10) {
            setOtpError('Please enter a valid 10-digit mobile number');
            return;
        }

        setOtpStep('sending');
        setOtpError('');

        try {
            const isLocal = window.location.hostname === 'localhost';
            const BASE_URL = isLocal ? 'http://localhost:5001' : 'https://astrofied-production.up.railway.app';
            
            const response = await fetch(`${BASE_URL}/api/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: `${countryCode}${formData.phone}` })
            });

            const data = await response.json();
            if (response.ok) {
                setOtpStep('verifying');
                if (data.demo) {
                    console.log("Demo Mode: OTP is sent but mocked in response/logs");
                }
            } else {
                setOtpError(data.error || 'Failed to send OTP');
                setOtpStep('idle');
            }
        } catch (err) {
            setOtpError('Backend server connection failed');
            setOtpStep('idle');
        }
    };

    const handleVerifyOTP = async () => {
        if (otpValue.length !== 6) {
            setOtpError('Please enter 6-digit code');
            return;
        }

        setOtpStep('verifying-now');
        setOtpError('');

        try {
            const isLocal = window.location.hostname === 'localhost';
            const BASE_URL = isLocal ? 'http://localhost:5001' : 'https://astrofied-production.up.railway.app';
            
            const response = await fetch(`${BASE_URL}/api/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    phoneNumber: `${countryCode}${formData.phone}`,
                    otp: otpValue
                })
            });

            if (response.ok) {
                setOtpStep('verified');
            } else {
                const data = await response.json();
                setOtpError(data.error || 'Invalid OTP');
                setOtpStep('verifying');
            }
        } catch (err) {
            setOtpError('Verification failed. Try again.');
            setOtpStep('verifying');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otpStep !== 'verified') {
            setOtpError('Please verify your mobile number first');
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
            const response = await fetch("https://formsubmit.co/ajax/contact.astrofied@gmail.com", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: `${countryCode} ${formData.phone} (Verified)`,
                    message: formData.message,
                    _replyto: formData.email,
                    _subject: `Feedback from ${formData.name} - Astrofied`,
                    _captcha: "false",
                    _template: "table"
                })
            });

            if (response.ok) {
                sentEmails.push(normalizedEmail);
                localStorage.setItem('astrofied_feedback_emails', JSON.stringify(sentEmails));
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setOtpStep('idle');
                setOtpValue('');
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
                    className={`glass rounded-3xl p-8 md:p-12 shadow-2xl border flex flex-col md:flex-row gap-12 items-center ${isDarkMode ? 'border-gray-800' : 'border-gray-200 bg-white/60'}`}
                >
                    <div className="w-full md:w-5/12 flex flex-col justify-center text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-raleway" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                            We Value Your Feedback
                        </h2>
                        <p className={`text-base md:text-lg opacity-80 leading-relaxed text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Your insights help us improve and serve you better. We verify all contacts to ensure high-quality authentic feedback.
                        </p>
                    </div>

                    <div className="w-full md:w-7/12 relative">
                        {status === 'duplicate' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-xs font-bold">Feedback already sent with this email.</span>
                            </motion.div>
                        )}

                        {status === 'success' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-green-100 border border-green-200 text-green-700 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-xs font-bold">Thank you! Feedback verified and sent.</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name"
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold bg-transparent transition-all ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'}`}
                            />
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Mail Id"
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold bg-transparent transition-all ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'}`}
                            />
                            
                            {/* Phone & OTP Block */}
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <select 
                                        value={countryCode} 
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        className={`px-3 py-3 rounded-xl border bg-transparent text-sm font-bold focus:outline-none ${isDarkMode ? 'border-gray-700 text-gold' : 'border-gray-300 text-[#4B0082]'}`}
                                    >
                                        {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code} ({c.country})</option>)}
                                    </select>
                                    <div className="relative flex-1">
                                        <input
                                            type="tel" name="phone" value={formData.phone} onChange={handleChange} 
                                            placeholder="Mobile Number" required disabled={otpStep === 'verified'}
                                            className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold bg-transparent transition-all ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}`}
                                        />
                                        {otpStep === 'verified' && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />}
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={handleSendOTP}
                                        disabled={otpStep === 'verified' || otpStep === 'sending' || !formData.phone}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                                            otpStep === 'verified' 
                                                ? 'bg-green-500 border-green-500 text-white' 
                                                : isDarkMode ? 'border-gold text-gold' : 'border-purple-600 text-purple-600'
                                        } disabled:opacity-50`}
                                    >
                                        {otpStep === 'verified' ? 'Verified' : otpStep === 'sending' ? 'Sending...' : (otpStep === 'verifying' || otpStep === 'verifying-now') ? 'Resend' : 'Verify'}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {(otpStep === 'verifying' || otpStep === 'verifying-now') && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-2 overflow-hidden">
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" maxLength={6} placeholder="6-digit OTP" value={otpValue} onChange={(e) => setOtpValue(e.target.value.replace(/\D/g,''))}
                                                    className={`flex-1 px-5 py-3 rounded-xl border text-center font-black tracking-[0.5em] focus:outline-none bg-gold/5 ${isDarkMode ? 'border-gold/30 text-gold' : 'border-purple-600/30 text-purple-900'}`}
                                                />
                                                <button 
                                                    type="button" onClick={handleVerifyOTP} disabled={otpValue.length !== 6 || otpStep === 'verifying-now'}
                                                    className={`px-6 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 transition-all text-xs`}
                                                >
                                                    {otpStep === 'verifying-now' ? 'Wait...' : 'Submit OTP'}
                                                </button>
                                            </div>
                                            <p className="text-[10px] font-bold text-center text-gray-500 italic">Demo: Check Server Console/Logs for the 6-digit code</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {otpError && <p className="text-red-500 text-[10px] font-bold text-center">{otpError}</p>}
                            </div>

                            <textarea
                                name="message" value={formData.message} onChange={handleChange} required rows={3} placeholder="Write your feedback..."
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold bg-transparent transition-all resize-none ${isDarkMode ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'}`}
                            ></textarea>

                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                disabled={status === 'loading' || otpStep !== 'verified'} type="submit"
                                className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg ${
                                    (status === 'loading' || otpStep !== 'verified') ? 'opacity-50 cursor-not-allowed grayscale' : ''
                                } ${isDarkMode ? 'bg-gold text-black shadow-gold/20' : 'bg-[#4B0082] text-white shadow-[#4B0082]/30'}`}
                            >
                                {status === 'loading' ? 'Submitting...' : 'Complete Feedback'}
                                {status !== 'loading' && <Send className="w-5 h-5" />}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
