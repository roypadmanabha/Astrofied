import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ShieldAlert, User, Mail, MessageSquare, Phone, CheckCircle2, Loader2, KeyRound } from 'lucide-react';

const Grievance = () => {
    const { isDarkMode } = useTheme();
    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        complaint: ''
    });
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);

    // Note: To make this functional, you need to:
    // 1. Setup a Google Apps Script to receive POST requests and write to a Sheet.
    // 2. Setup Firebase Authentication (Phone) for the OTP logic.
    
    // For this demonstration, we'll simulate the OTP flow as I cannot generate API keys.
    // I will include the logic structure for you to plug in your Firebase/AppsScript URLs.

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setOtpLoading(true);
        
        // Simulation of OTP sending
        // In reality: const verId = await signInWithPhoneNumber(auth, formData.mobile, recaptcha);
        setTimeout(() => {
            setOtpLoading(false);
            setStep(2);
            console.log("OTP Sent to:", formData.mobile);
        }, 1500);
    };

    const handleVerifyAndSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulation of OTP Verification and Google Sheet Export
        // In reality: 
        // 1. await confirm(otp)
        // 2. await axios.post(GOOGLE_SCRIPT_URL, formData)

        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 2000);
    };

    return (
        <section id="grievance" className={`py-24 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#05010d]' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Left: Branding & Info */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${
                                isDarkMode ? 'border-red-500/30 text-red-400 bg-red-500/5' : 'border-red-600/20 text-red-600 bg-red-600/5'
                            }`}
                        >
                            <ShieldAlert size={14} />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Grievance Cell</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-4xl md:text-7xl font-black leading-tight tracking-tight ${
                                isDarkMode ? 'text-white' : 'text-[#4B0082]'
                            }`}
                        >
                            Submit a <br />
                            <span className="text-red-500 italic">Grievance</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-base md:text-xl leading-relaxed max-w-xl ${
                                isDarkMode ? 'text-gray-400' : 'text-[#4B0082]/70'
                            }`}
                        >
                            We value your feedback and concerns. If you have any complaints regarding our services, 
                            please submit them here. All grievances are handled with strict confidentiality and addressed by our team.
                        </motion.p>
                    </div>

                    {/* Right: The Form Card */}
                    <div className="w-full lg:w-1/2 max-w-xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className={`p-8 md:p-12 rounded-[3rem] border shadow-2xl backdrop-blur-3xl relative overflow-hidden ${
                                isDarkMode 
                                ? 'border-white/10 bg-[#0f0a1f]/80 shadow-red-500/5' 
                                : 'border-gray-200 bg-gray-50/50'
                            }`}
                        >
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleSendOTP}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 opacity-60">
                                                <User size={12} /> Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className={`w-full border-b bg-transparent px-0 py-2 text-base font-bold transition-all focus:outline-none ${
                                                    isDarkMode ? 'border-white/10 text-white focus:border-red-500' : 'border-black/10 text-black focus:border-red-600'
                                                }`}
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 opacity-60">
                                                    <Mail size={12} /> Email
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    className={`w-full border-b bg-transparent px-0 py-2 text-base font-bold transition-all focus:outline-none ${
                                                        isDarkMode ? 'border-white/10 text-white focus:border-red-500' : 'border-black/10 text-black focus:border-red-600'
                                                    }`}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 opacity-60">
                                                    <Phone size={12} /> Mobile No.
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+91"
                                                    className={`w-full border-b bg-transparent px-0 py-2 text-base font-bold transition-all focus:outline-none ${
                                                        isDarkMode ? 'border-white/10 text-white focus:border-red-500' : 'border-black/10 text-black focus:border-red-600'
                                                    }`}
                                                    value={formData.mobile}
                                                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 opacity-60">
                                                <MessageSquare size={12} /> Complaint
                                            </label>
                                            <textarea
                                                required
                                                rows="3"
                                                className={`w-full border bg-transparent p-4 rounded-2xl text-base font-bold transition-all focus:outline-none ${
                                                    isDarkMode ? 'border-white/10 text-white focus:border-red-500 bg-white/5' : 'border-black/10 text-black focus:border-red-600 bg-black/5'
                                                }`}
                                                value={formData.complaint}
                                                onChange={(e) => setFormData({...formData, complaint: e.target.value})}
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={otpLoading}
                                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all ${
                                                isDarkMode ? 'bg-red-500 text-white' : 'bg-red-600 text-white'
                                            } disabled:opacity-50`}
                                        >
                                            {otpLoading ? <Loader2 className="animate-spin" size={20} /> : 'Send Verification OTP'}
                                        </motion.button>
                                    </motion.form>
                                )}

                                {step === 2 && (
                                    <motion.form
                                        key="otp"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleVerifyAndSubmit}
                                        className="space-y-8 text-center"
                                    >
                                        <div className="space-y-4">
                                            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-red-500/20 text-red-500' : 'bg-red-100 text-red-600'}`}>
                                                <KeyRound size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold">Verify Mobile</h3>
                                            <p className="text-sm opacity-60">We sent a 6-digit code to {formData.mobile}</p>
                                        </div>

                                        <div className="flex justify-center gap-3">
                                            <input
                                                type="text"
                                                maxLength="6"
                                                required
                                                placeholder="Enter OTP"
                                                className={`w-full max-w-[200px] text-center border-b bg-transparent px-0 py-4 text-3xl font-black tracking-[0.5em] transition-all focus:outline-none ${
                                                    isDarkMode ? 'border-white/10 text-white focus:border-red-500' : 'border-black/10 text-black focus:border-red-600'
                                                }`}
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all ${
                                                    isDarkMode ? 'bg-red-500 text-white' : 'bg-red-600 text-white'
                                                } disabled:opacity-50`}
                                            >
                                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Submit Grievance'}
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
                                            >
                                                Change Details?
                                            </button>
                                        </div>
                                    </motion.form>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 text-center space-y-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10 }}
                                            className="mx-auto w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"
                                        >
                                            <CheckCircle2 size={48} />
                                        </motion.div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black">Grievance Submitted</h3>
                                            <p className="opacity-60">Thank you for your feedback. Our team will review your complaint and get back to you shortly.</p>
                                        </div>
                                        <button
                                            onClick={() => { setStep(1); setFormData({name:'', email:'', mobile:'', complaint:''}); setOtp(''); }}
                                            className={`px-8 py-3 rounded-full font-bold text-sm border ${
                                                isDarkMode ? 'border-white/20 hover:bg-white/5' : 'border-black/20 hover:bg-black/5'
                                            }`}
                                        >
                                            Submit Another?
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Grievance;
