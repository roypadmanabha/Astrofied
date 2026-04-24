import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { X, User, Phone, MapPin, Calendar, Clock, Mail, FileText, CheckCircle, Loader2, Shield, CreditCard, AlertCircle, Heart } from 'lucide-react';
import axios from 'axios';
import logo from '../assets/logo.png';

const BookingModal = ({ isOpen, onClose, service, price }) => {
    const { isDarkMode } = useTheme();
    const isMatching = service === 'Horoscope Matching';

    const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success' | 'error'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [paymentResult, setPaymentResult] = useState(null);

    // Simple scroll lock matching LegalModal
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const initialFormData = {
        name: '',
        phone: '',
        email: '',
        address: '',
        dob: '',
        pob: '',
        tob: '',
        // For Matching
        boyName: '',
        boyDob: '',
        boyPob: '',
        boyTob: '',
        girlName: '',
        girlDob: '',
        girlPob: '',
        girlTob: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        // Common details
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Enter a valid 10-digit Indian phone number';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
        if (!formData.address.trim()) newErrors.address = 'Address is required';

        if (isMatching) {
            // Boy's details
            if (!formData.boyName.trim()) newErrors.boyName = "Boy's name is required";
            if (!formData.boyDob) newErrors.boyDob = "Boy's DOB is required";
            if (!formData.boyPob.trim()) newErrors.boyPob = "Boy's POB is required";
            if (!formData.boyTob) newErrors.boyTob = "Boy's TOB is required";
            
            // Girl's details
            if (!formData.girlName.trim()) newErrors.girlName = "Girl's name is required";
            if (!formData.girlDob) newErrors.girlDob = "Girl's DOB is required";
            if (!formData.girlPob.trim()) newErrors.girlPob = "Girl's POB is required";
            if (!formData.girlTob) newErrors.girlTob = "Girl's TOB is required";
        } else {
            // Single person details
            if (!formData.name.trim()) newErrors.name = 'Full name is required';
            if (!formData.dob) newErrors.dob = 'Date of birth is required';
            if (!formData.pob.trim()) newErrors.pob = 'Place of birth is required';
            if (!formData.tob) newErrors.tob = 'Time of birth is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const getApiUrl = (endpoint) => {
        const isLocal = window.location.hostname === 'localhost';
        const base = isLocal
            ? 'http://localhost:5001'
            : 'https://astrofied-production.up.railway.app';
        return `${base}${endpoint}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setError('');

        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error('Failed to load payment gateway. Please check your internet connection.');
            }

            const orderRes = await axios.post(getApiUrl('/api/create-order'), {
                amount: parseInt(price),
                service: service,
                customerDetails: formData
            });

            const { order, key_id } = orderRes.data;
            setStep('processing');

            const options = {
                key: key_id,
                amount: order.amount,
                currency: order.currency,
                name: 'Astrofied Ltd.',
                description: service,
                image: logo,
                order_id: order.id,
                prefill: {
                    name: isMatching ? `${formData.boyName} & ${formData.girlName}` : formData.name,
                    email: formData.email,
                    contact: `+91${formData.phone}`,
                    method: 'upi',
                    'upi[vpa]': 'prasantachakraborty.udp@okicici'
                },
                notes: {
                    service: service
                },
                theme: {
                    color: isDarkMode ? '#D4AF37' : '#4B0082',
                    backdrop_color: 'rgba(0,0,0,0.8)'
                },
                config: {
                    display: {
                        blocks: {
                            upi: {
                                name: 'Pay via UPI',
                                instruments: [
                                    {
                                        method: 'upi',
                                        flows: ['collect', 'intent', 'qr'],
                                        apps: ['google_pay', 'phonepe', 'paytm']
                                    }
                                ]
                            },
                            other: {
                                name: 'Other Payment Methods',
                                instruments: [
                                    { method: 'card' },
                                    { method: 'netbanking' },
                                    { method: 'wallet' }
                                ]
                            }
                        },
                        sequence: ['block.upi', 'block.other'],
                        preferences: { show_default_blocks: false }
                    }
                },
                modal: {
                    ondismiss: () => {
                        setStep('form');
                        setLoading(false);
                    }
                },
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(getApiUrl('/api/verify-payment'), {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            customerDetails: formData,
                            service: service,
                            amount: price
                        });

                        setPaymentResult({
                            paymentId: verifyRes.data.paymentId,
                            whatsappUrl: verifyRes.data.whatsappUrl
                        });
                        setStep('success');
                    } catch (verifyError) {
                        console.error('Verification error:', verifyError);
                        setError('Payment received but verification failed. Please contact support with your payment ID.');
                        setStep('error');
                    }
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.on('payment.failed', (response) => {
                setError(response.error.description || 'Payment failed. Please try again.');
                setStep('error');
            });
            razorpayInstance.open();

        } catch (err) {
            console.error('Booking error:', err);
            setError(err.response?.data?.error || err.message || 'Something went wrong. Please try again.');
            setStep('error');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setStep('form');
        setError('');
        setPaymentResult(null);
        setFormData(initialFormData);
        setErrors({});
        onClose();
    };

    const inputClass = (field) => `w-full border-b-2 bg-transparent px-0 py-2.5 text-sm md:text-base font-semibold focus:outline-none transition-all placeholder:font-normal ${
        errors[field]
            ? 'border-red-500 text-red-400'
            : isDarkMode
                ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-600'
                : 'border-black/10 text-black focus:border-[#4B0082] placeholder:text-gray-400'
    }`;

    const labelClass = `text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-1 ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`;

    if (!isOpen) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-8 overflow-hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={step === 'processing' ? undefined : handleClose}
                            className={`fixed inset-0 backdrop-blur-2xl ${isDarkMode ? 'bg-black/90' : 'bg-white/90'}`}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 40, opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[1.5rem] md:rounded-[2.5rem] border shadow-2xl custom-scrollbar ${isDarkMode
                                ? 'bg-[#17202A] border-gold/10'
                                : 'bg-[#F5F5DC] border-[#4B0082]/10'
                            }`}
                            data-lenis-prevent
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: isDarkMode ? '#D4AF37 transparent' : '#4B0082 transparent',
                                overscrollBehavior: 'contain',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            {/* Close Button */}
                            {step !== 'processing' && (
                                <button
                                    onClick={handleClose}
                                    className={`absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full transition-all z-20 ${isDarkMode
                                        ? 'bg-white/10 text-white hover:bg-gold hover:text-black'
                                        : 'bg-[#4B0082]/10 text-[#4B0082] hover:bg-[#4B0082] hover:text-white'
                                    }`}
                                >
                                    <X size={16} />
                                </button>
                            )}

                            {/* Form Step */}
                            {step === 'form' && (
                                <div className="p-5 sm:p-6 md:p-8">
                                    {/* Header */}
                                    <div className="text-center mb-6 md:mb-8">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] mb-3 md:mb-4 ${isDarkMode
                                            ? 'bg-gold/10 text-gold border border-gold/20'
                                            : 'bg-[#4B0082]/10 text-[#4B0082] border border-[#4B0082]/20'
                                        }`}>
                                            <Shield size={10} />
                                            Secure Booking
                                        </div>
                                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>
                                            {service}
                                        </h3>
                                        <p className={`text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            Provide birth details to proceed
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                        
                                        {isMatching ? (
                                            <>
                                                {/* Boy's Details */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 border-b border-gold/20 pb-2 mb-4">
                                                        <User className="text-gold" size={18} />
                                                        <h4 className={`font-black text-sm uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>Boy's Birth Details</h4>
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Name *</label>
                                                        <input type="text" placeholder="Boy's full name" className={inputClass('boyName')} 
                                                            value={formData.boyName} onChange={(e) => setFormData({...formData, boyName: e.target.value})} />
                                                        {errors.boyName && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.boyName}</p>}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className={labelClass}><Calendar size={11} /> DOB *</label>
                                                            <input type="date" className={`${inputClass('boyDob')} [color-scheme:${isDarkMode ? 'dark' : 'light'}]`}
                                                                value={formData.boyDob} onChange={(e) => setFormData({...formData, boyDob: e.target.value})} />
                                                            {errors.boyDob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.boyDob}</p>}
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}><Clock size={11} /> TOB *</label>
                                                            <input type="time" className={`${inputClass('boyTob')} [color-scheme:${isDarkMode ? 'dark' : 'light'}]`}
                                                                value={formData.boyTob} onChange={(e) => setFormData({...formData, boyTob: e.target.value})} />
                                                            {errors.boyTob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.boyTob}</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}><MapPin size={11} /> Place of Birth *</label>
                                                        <input type="text" placeholder="City, State" className={inputClass('boyPob')}
                                                            value={formData.boyPob} onChange={(e) => setFormData({...formData, boyPob: e.target.value})} />
                                                        {errors.boyPob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.boyPob}</p>}
                                                    </div>
                                                </div>

                                                {/* Girl's Details */}
                                                <div className="space-y-4 pt-4">
                                                    <div className="flex items-center gap-2 border-b border-gold/20 pb-2 mb-4">
                                                        <Heart className="text-red-500" size={18} />
                                                        <h4 className={`font-black text-sm uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>Girl's Birth Details</h4>
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Name *</label>
                                                        <input type="text" placeholder="Girl's full name" className={inputClass('girlName')}
                                                            value={formData.girlName} onChange={(e) => setFormData({...formData, girlName: e.target.value})} />
                                                        {errors.girlName && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.girlName}</p>}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className={labelClass}><Calendar size={11} /> DOB *</label>
                                                            <input type="date" className={`${inputClass('girlDob')} [color-scheme:${isDarkMode ? 'dark' : 'light'}]`}
                                                                value={formData.girlDob} onChange={(e) => setFormData({...formData, girlDob: e.target.value})} />
                                                            {errors.girlDob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.girlDob}</p>}
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}><Clock size={11} /> TOB *</label>
                                                            <input type="time" className={`${inputClass('girlTob')} [color-scheme:${isDarkMode ? 'dark' : 'light'}]`}
                                                                value={formData.girlTob} onChange={(e) => setFormData({...formData, girlTob: e.target.value})} />
                                                            {errors.girlTob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.girlTob}</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}><MapPin size={11} /> Place of Birth *</label>
                                                        <input type="text" placeholder="City, State" className={inputClass('girlPob')}
                                                            value={formData.girlPob} onChange={(e) => setFormData({...formData, girlPob: e.target.value})} />
                                                        {errors.girlPob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.girlPob}</p>}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Single Person Details */}
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className={labelClass}><User size={11} /> Full Name *</label>
                                                        <input type="text" placeholder="Enter your full name" className={inputClass('name')}
                                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                                        {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name}</p>}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className={labelClass}><Calendar size={11} /> Date of Birth *</label>
                                                            <input type="date" className={`${inputClass('dob')} [color-scheme:${isDarkMode ? 'dark' : 'light'}]`}
                                                                value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
                                                            {errors.dob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.dob}</p>}
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}><Clock size={11} /> Time of Birth *</label>
                                                            <input type="time" className={`${inputClass('tob')} [color-scheme:${isDarkMode ? 'dark' : 'light'}]`}
                                                                value={formData.tob} onChange={(e) => setFormData({ ...formData, tob: e.target.value })} />
                                                            {errors.tob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.tob}</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}><MapPin size={11} /> Place of Birth *</label>
                                                        <input type="text" placeholder="City, District, State" className={inputClass('pob')}
                                                            value={formData.pob} onChange={(e) => setFormData({ ...formData, pob: e.target.value })} />
                                                        {errors.pob && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.pob}</p>}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Common Details */}
                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Contact & Communication</div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}><Phone size={11} /> Phone *</label>
                                                    <div className="flex items-center gap-1">
                                                        <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>+91</span>
                                                        <input type="tel" placeholder="10-digit number" maxLength={10} className={inputClass('phone')}
                                                            value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })} />
                                                    </div>
                                                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone}</p>}
                                                </div>
                                                <div>
                                                    <label className={labelClass}><Mail size={11} /> Email Id</label>
                                                    <input type="email" placeholder="your@email.com" className={inputClass('email')}
                                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}><MapPin size={11} /> Full Address *</label>
                                                <input type="text" placeholder="House/Flat, Street, City, State, PIN" className={inputClass('address')}
                                                    value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                                {errors.address && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.address}</p>}
                                            </div>
                                        </div>

                                        {/* Price & Pay Button */}
                                        <div className={`flex items-center justify-between p-3 md:p-4 rounded-2xl mt-4 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                                            <div>
                                                <span className={`text-[9px] font-black uppercase tracking-[0.15em] block ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>Total Amount</span>
                                                <span className={`text-xl md:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹ {price}</span>
                                            </div>
                                            <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={loading}
                                                className={`flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-black text-[10px] md:text-xs tracking-widest uppercase shadow-lg transition-all disabled:opacity-50 ${isDarkMode
                                                    ? 'bg-gold text-black hover:bg-white shadow-gold/20'
                                                    : 'bg-[#4B0082] text-white hover:bg-black shadow-[#4B0082]/20'
                                                }`}>
                                                {loading ? <Loader2 size={16} className="animate-spin" /> : <><CreditCard size={14} /> Pay Now</>}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Processing Step */}
                            {step === 'processing' && (
                                <div className="p-8 md:p-12 text-center">
                                    <Loader2 size={48} className={`animate-spin mx-auto mb-6 ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`} />
                                    <h3 className={`text-xl md:text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>Processing Payment...</h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Please complete the payment in the Razorpay window.</p>
                                </div>
                            )}

                            {/* Success Step */}
                            {step === 'success' && (
                                <div className="p-6 sm:p-8 md:p-12 text-center">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                                        <CheckCircle size={56} className="text-green-500 mx-auto mb-4 md:mb-6" />
                                    </motion.div>
                                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>Booking Confirmed! 🎉</h3>
                                    <p className={`text-sm md:text-base mb-6 md:mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>We have received your booking for <strong>{service}</strong>.</p>
                                    {paymentResult && (
                                        <div className="space-y-4">
                                            <div className={`inline-block px-4 py-2 rounded-xl text-xs font-bold ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-black/5 text-gray-700'}`}>
                                                Payment ID: <span className="font-black">{paymentResult.paymentId}</span>
                                            </div>
                                            <div className="flex justify-center mt-6">
                                                <button onClick={handleClose} className={`px-6 py-2 px rounded-xl font-black text-xs tracking-widest uppercase transition-all ${isDarkMode ? 'bg-gold text-black' : 'bg-[#4B0082] text-white'}`}>Done</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Error Step */}
                            {step === 'error' && (
                                <div className="p-6 sm:p-8 md:p-12 text-center">
                                    <AlertCircle size={56} className="text-red-500 mx-auto mb-4 md:mb-6" />
                                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>Payment Issue</h3>
                                    <p className={`text-sm md:text-base mb-6 md:mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{error}</p>
                                    <div className="flex gap-3 justify-center">
                                        <button onClick={() => { setStep('form'); setError(''); }} className={`px-6 py-2 rounded-xl font-black text-xs uppercase ${isDarkMode ? 'bg-gold text-black' : 'bg-[#4B0082] text-white'}`}>Try Again</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(212, 175, 55, 0.2)' : 'rgba(75, 0, 130, 0.2)'}; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${isDarkMode ? 'rgba(212, 175, 55, 0.5)' : 'rgba(75, 0, 130, 0.5)'}; }
            `}</style>
        </>
    );
};

export default BookingModal;
