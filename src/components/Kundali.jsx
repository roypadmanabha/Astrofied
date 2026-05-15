import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Sparkles, MapPin, Calendar, Clock, User, Loader2, X, Download, ShieldCheck, RotateCcw } from 'lucide-react';
import emailjs from '@emailjs/browser';
import logo from '../assets/logo.png';
import { useTheme } from '../context/ThemeContext';

import html2canvas from 'html2canvas';

const Kundali = () => {
    const { isDarkMode } = useTheme();
    const chartRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        gender: '',
        dob: '',
        tob: '',
        city: '',
        lat: '',
        lon: '',
        tzo: '+05:30'
    });
    
    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            gender: '',
            dob: '',
            tob: '',
            city: '',
            lat: '',
            lon: '',
            tzo: '+05:30'
        });
        setFieldErrors({});
        setSuggestions([]);
        setError(null);
    };

    const [fieldErrors, setFieldErrors] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chartSvg, setChartSvg] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [downloading, setDownloading] = useState(false);
    
    // OTP States
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState('');
    const otpRefs = useRef([]);

    // Brand Colors
    const brandGold = "#D4AF37";
    const brandPurple = "#4B0082";
    const darkBlue = "#0A1931";

    const validateField = (name, value) => {
        let err = '';
        if (name === 'firstName' || name === 'lastName') {
            if (/[^a-zA-Z\s]/.test(value)) {
                err = 'No numbers or symbols allowed';
            } else if ((value.match(/ /g) || []).length > 1) {
                err = 'Only one space allowed';
            }
        } else if (name === 'mobile') {
            if (!/^\d*$/.test(value)) {
                err = 'Numbers only';
            } else if (value.length > 10) {
                err = 'Max 10 digits';
            } else if (value.length === 10) {
                if (/^(.)\1{9}$/.test(value)) {
                    err = 'Invalid pattern';
                } else if (['1234567890', '0987654321'].includes(value)) {
                    err = 'Invalid sequence';
                }
            }
        } else if (name === 'email') {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                err = 'Invalid email address';
            }
        }
        return err;
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        
        // Prevent typing non-digits in mobile
        if (name === 'mobile' && !/^\d*$/.test(value)) return;
        // Limit mobile to 10
        if (name === 'mobile' && value.length > 10) return;

        // Auto-capitalize names
        if (name === 'firstName' || name === 'lastName') {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        
        const fieldErr = validateField(name, value);
        setFieldErrors(prev => ({ ...prev, [name]: fieldErr }));
    };

    const handleDownload = async () => {
        if (!chartRef.current) return;
        setDownloading(true);
        try {
            const svgElement = chartRef.current.querySelector('svg');
            if (!svgElement) throw new Error("SVG not found");

            const clonedSvg = svgElement.cloneNode(true);
            const viewBox = svgElement.viewBox.baseVal;
            const width = viewBox.width || 500;
            const height = viewBox.height || 500;
            clonedSvg.setAttribute('width', width);
            clonedSvg.setAttribute('height', height);

            const styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style");
            styleElement.textContent = `
                svg path, svg line, svg polygon, svg rect, svg circle { stroke-width: 1.5px !important; stroke: #4B0082 !important; fill: none !important; }
                svg text { fill: #4B0082 !important; font-family: 'Mulish', sans-serif !important; font-weight: 800 !important; font-size: 16px !important; }
                rect[fill="white"] { fill: white !important; }
            `;
            clonedSvg.prepend(styleElement);

            const svgData = new XMLSerializer().serializeToString(clonedSvg);
            const canvas = document.createElement('canvas');
            const scale = 3;
            canvas.width = width * scale;
            canvas.height = height * scale;
            const ctx = canvas.getContext('2d');
            
            const img = new Image();
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const pngUrl = canvas.toDataURL('image/png', 1.0);
                const downloadLink = document.createElement('a');
                downloadLink.download = `${formData.firstName || 'Astrofied'}_Kundali.png`;
                downloadLink.href = pngUrl;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(url);
                setDownloading(false);
            };
            img.onerror = () => {
                setDownloading(false);
                alert("Could not generate image. Please try again.");
            };
            img.src = url;
        } catch (err) {
            console.error('Download error:', err);
            setDownloading(false);
            alert("Download failed. Please try again.");
        }
    };

    // City Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (formData.city.length > 2) {
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                        params: { q: formData.city, format: 'json', addressdetails: 1, limit: 5 }
                    });
                    setSuggestions(res.data);
                } catch (err) { console.error('City search error:', err); }
            } else { setSuggestions([]); }
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.city]);

    const handleCitySelect = (city) => {
        setFormData({ ...formData, city: city.display_name, lat: city.lat, lon: city.lon });
        setSuggestions([]);
    };

    const [showNotice, setShowNotice] = useState(false);

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendOtp = async (userData, otp) => {
        setOtpLoading(true);
        const templateParams = {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            passcode: otp,
            time: new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        try {
            await emailjs.send(
                'service_zoki18i',
                'template_rkgjfst',
                templateParams,
                'BS0KCxakf6y8wGFx-'
            );
            setShowOtpModal(true);
            setOtpError('');
        } catch (err) {
            console.error('EmailJS Error:', err);
            setError("Failed to send verification code. Please try again.");
        } finally {
            setOtpLoading(false);
        }
    };

    const sendToGoogleSheet = async () => {
        const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyzw6F0g25xoT0eAcbZbrarrt9autYIZQC8z5YTVW_EpggHG3bh9EfnN9ITJUyzYQvd5Q/exec";
        try {
            fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`.trim()
                }),
            });
            console.log("Data sent to Google Sheets");
        } catch (err) {
            console.error("Error sending to Google Sheets:", err);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otpInputs];
        newOtp[index] = value.slice(-1);
        setOtpInputs(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pasteData.length > 0) {
            const newOtp = [...otpInputs];
            pasteData.forEach((char, i) => {
                if (/^\d$/.test(char) && i < 6) newOtp[i] = char;
            });
            setOtpInputs(newOtp);
            otpRefs.current[Math.min(pasteData.length, 5)].focus();
        }
    };

    const handleOtpVerify = async () => {
        const enteredOtp = otpInputs.join('');
        if (enteredOtp.length < 6) return;

        if (enteredOtp === generatedOtp) {
            setOtpLoading(true);
            await sendToGoogleSheet();
            setOtpLoading(false);
            setShowOtpModal(false);
            setShowNotice(true); // Show high volume error notice
        } else {
            setOtpError("Wrong OTP! Auto-refreshing...");
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Final validation check
        const errors = {};
        Object.keys(formData).forEach(key => {
            const err = validateField(key, formData[key]);
            if (err) errors[key] = err;
        });

        // Mobile 10 digit check
        if (formData.mobile.length !== 10) {
            errors.mobile = 'Must be 10 digits';
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        if (!formData.lat || !formData.lon) {
            setError("Please select a city from the suggestions.");
            return;
        }

        const otp = generateOtp();
        setGeneratedOtp(otp);
        await sendOtp(formData, otp);
    };

    return (
        <section id="kundali" className={`py-12 md:py-24 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#05010d]/80' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left Side: Heading */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0.8, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${isDarkMode ? 'border-gold/30 text-gold bg-gold/5' : 'border-purple-600/20 text-[#4B0082] bg-purple-600/5'
                                }`}
                        >
                            <Sparkles size={14} />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Vedic Astrology</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0.8, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={`text-4xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight ${isDarkMode ? 'text-white' : 'text-[#4B0082]'
                                }`}
                        >
                            Astrofied Free <br />
                            <span className="text-gold italic">Kundali</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0.8, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={`text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-[#4B0082]/70'
                                }`}
                        >
                            Generate your precise East Indian style D1 Lagna chart based on your birth coordinates.
                        </motion.p>
                    </div>

                    {/* Right Side: Compact Form Container */}
                    <div className="w-full lg:w-[45%] max-w-lg mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0.8, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={`p-6 md:p-10 lg:p-12 rounded-[12px] border shadow-2xl backdrop-blur-3xl transition-all duration-500 relative lg:aspect-square flex flex-col justify-center ${isDarkMode
                                ? 'border-gold !bg-[#17202A]'
                                : 'border-[#4B0082] bg-[#F5F5DC]'
                                }`}
                        >
                            <img
                                src={logo}
                                alt="Astrofied"
                                className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain select-none pointer-events-none"
                                style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                            />
                            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                                {/* Name Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            <User size={10} /> First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            placeholder="First Name"
                                            className={`w-full border-b bg-transparent px-0 py-1 text-sm md:text-base font-bold focus:outline-none transition-all ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931] placeholder:text-gray-400'
                                                }`}
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                        {fieldErrors.firstName && <p className="text-[8px] text-red-500 font-bold">{fieldErrors.firstName}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            <User size={10} /> Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            placeholder="Last Name"
                                            className={`w-full border-b bg-transparent px-0 py-1 text-sm md:text-base font-bold focus:outline-none transition-all ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931] placeholder:text-gray-400'
                                                }`}
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                        {fieldErrors.lastName && <p className="text-[8px] text-red-500 font-bold">{fieldErrors.lastName}</p>}
                                    </div>
                                </div>

                                {/* Mobile & Email Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            <span className="font-black">+91</span> Mobile
                                        </label>
                                        <div className={`flex items-center gap-2 border-b transition-all ${isDarkMode ? 'border-white/10 focus-within:border-gold' : 'border-[#0A1931]/10 focus-within:border-[#0A1931]'}`}>
                                            <span className={`text-sm md:text-base font-bold opacity-50 ${isDarkMode ? 'text-white' : 'text-black'}`}>+91</span>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                required
                                                placeholder=""
                                                className={`w-full bg-transparent py-1 text-sm md:text-base font-bold focus:outline-none ${isDarkMode
                                                    ? 'text-white placeholder:text-gray-700'
                                                    : 'text-black placeholder:text-gray-400'
                                                    }`}
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        {fieldErrors.mobile && <p className="text-[8px] text-red-500 font-bold">{fieldErrors.mobile}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder=""
                                            className={`w-full border-b bg-transparent px-0 py-1 text-sm md:text-base font-bold focus:outline-none transition-all ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931] placeholder:text-gray-400'
                                                }`}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {fieldErrors.email && <p className="text-[8px] text-red-500 font-bold">{fieldErrors.email}</p>}
                                    </div>
                                </div>

                                {/* Date, Time & Gender Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            <Calendar size={10} /> Date
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-1 text-[10px] sm:text-xs md:text-base font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931]'
                                                }`}
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            <Clock size={10} /> Time
                                        </label>
                                        <input
                                            type="time"
                                            name="tob"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-1 text-[10px] sm:text-xs md:text-base font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931]'
                                                }`}
                                            value={formData.tob}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-1 text-[10px] sm:text-xs md:text-base font-bold focus:outline-none transition-all ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931]'
                                                }`}
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled className={isDarkMode ? 'bg-[#17202A]' : 'bg-white'}>Select</option>
                                            <option value="male" className={isDarkMode ? 'bg-[#17202A]' : 'bg-white'}>Male</option>
                                            <option value="female" className={isDarkMode ? 'bg-[#17202A]' : 'bg-white'}>Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1 relative">
                                    <label className={`text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                        <MapPin size={10} /> Location
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        placeholder="Search city..."
                                        className={`w-full border-b bg-transparent px-0 py-1 text-sm md:text-base font-bold focus:outline-none transition-all ${isDarkMode
                                            ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700'
                                            : 'border-[#0A1931]/10 text-black focus:border-[#0A1931] placeholder:text-gray-400'
                                            }`}
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        onFocus={() => { if (error) setError(null); }}
                                    />
                                    <AnimatePresence>
                                        {suggestions.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                className={`absolute z-50 w-full mt-2 border rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl ${isDarkMode ? 'bg-[#1a1233]/95 border-white/10' : 'bg-white/95 border-purple-600/10'
                                                    }`}
                                            >
                                                {suggestions.map((city, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        className={`w-full text-left px-4 py-3 text-xs font-semibold transition-all border-b last:border-0 ${isDarkMode
                                                            ? 'text-gray-300 hover:bg-gold/10 hover:text-gold border-white/5'
                                                            : 'text-[#0A1931] hover:bg-purple-600/10 hover:text-[#4B0082] border-purple-600/5'
                                                            }`}
                                                        onClick={() => handleCitySelect(city)}
                                                    >
                                                        {city.display_name.split(',').slice(0, 2).join(',')}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold text-center bg-red-500/5 py-2 rounded-lg">
                                        {error}
                                    </motion.p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading || otpLoading}
                                    className={`w-full py-4 font-black rounded-2xl tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-xs ${isDarkMode ? 'bg-gold text-black' : 'bg-[#4B0082] text-white shadow-xl'
                                        }`}
                                >
                                    {(loading || otpLoading) ? <Loader2 className="animate-spin" size={18} /> : (
                                        <><Sparkles size={16} /> Generate</>
                                    )}
                                </motion.button>

                                <p className={`hidden lg:block text-center italic font-mulish text-[10px] opacity-50 ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>
                                    Note: We don't share or tamper your personal data
                                </p>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className={`mt-4 text-[10px] font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-all flex items-center justify-center gap-2 mx-auto ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}
                                >
                                    <RotateCcw size={10} /> Reset Form
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            <AnimatePresence>
                {showOtpModal && (
                    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className={`relative w-full max-w-md p-8 md:p-10 rounded-[2.5rem] border shadow-2xl text-center
                                ${isDarkMode ? 'bg-[#0f0a1f] border-gold/30 text-white' : 'bg-white border-purple-600/30 text-black'}
                            `}
                        >
                            <div className="flex justify-center mb-6">
                                <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gold/10 text-gold' : 'bg-purple-600/10 text-[#4B0082]'}`}>
                                    <ShieldCheck size={32} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-2">Verify OTP</h3>
                            <p className="text-sm opacity-70 mb-8">
                                Enter the 6-digit code sent to <br />
                                <span className="font-bold text-gold">{formData.email}</span>
                            </p>

                            <div className="flex justify-between gap-2 mb-8" onPaste={handleOtpPaste}>
                                {otpInputs.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        ref={el => otpRefs.current[idx] = el}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                        className={`w-12 h-14 md:w-14 md:h-16 text-2xl font-black text-center rounded-xl border-2 transition-all outline-none
                                            ${isDarkMode 
                                                ? 'bg-white/5 border-white/10 focus:border-gold focus:bg-gold/5' 
                                                : 'bg-black/5 border-black/10 focus:border-[#4B0082] focus:bg-[#4B0082]/5'}
                                            ${otpError && 'border-red-500 bg-red-500/5'}
                                        `}
                                    />
                                ))}
                            </div>

                            {otpError && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs font-bold mb-6 flex items-center justify-center gap-2"
                                >
                                    <X size={14} className="border border-red-500 rounded-full" />
                                    {otpError}
                                </motion.p>
                            )}

                            <button
                                onClick={handleOtpVerify}
                                disabled={otpLoading || otpInputs.some(d => !d)}
                                className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3
                                    ${isDarkMode ? 'bg-gold text-black' : 'bg-[#4B0082] text-white'}
                                `}
                            >
                                {otpLoading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Generate'}
                            </button>

                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-6 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-all"
                            >
                                Cancel & Go Back
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* High Volume Notice Modal */}
            <AnimatePresence>
                {showNotice && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowNotice(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className={`relative w-full max-w-lg p-8 md:p-12 rounded-[2.5rem] border shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center overflow-hidden
                                ${isDarkMode ? 'bg-gradient-to-br from-black via-[#08002e] to-black border-gold/30 text-white' : 'bg-white/90 border-[#4B0082]/30 text-black'}
                            `}
                        >
                            <div className="flex justify-center mb-6">
                                <img 
                                    src={logo} 
                                    alt="Astrofied" 
                                    className="w-16 h-16 object-contain"
                                    style={{ filter: isDarkMode ? 'none' : 'multiply' }}
                                />
                            </div>

                            <h3 className={`text-2xl md:text-3xl font-black mb-4 font-nunito flex items-center justify-center gap-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                <span className="text-red-500">Error</span>
                                <X className="text-red-500 border-2 border-red-500 rounded-full p-1" size={24} strokeWidth={3} />
                            </h3>
                            
                            <p className="text-base md:text-lg leading-relaxed font-mulish font-medium opacity-90 mb-8">
                                We are currently experiencing a high volume of chart requests! Please try again in a few moments.
                            </p>

                            <button
                                onClick={() => setShowNotice(false)}
                                className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all active:scale-95 shadow-xl
                                    ${isDarkMode ? 'bg-gold text-black hover:bg-white' : 'bg-[#4B0082] text-white hover:bg-black'}
                                `}
                            >
                                Understood
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal for Chart */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setIsModalOpen(false)} className={`absolute inset-0 backdrop-blur-3xl ${isDarkMode ? 'bg-black/95' : 'bg-white/95'}`} />
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            className={`relative w-full max-w-5xl rounded-[2.5rem] border shadow-2xl transition-all duration-700 overflow-hidden ${isDarkMode ? 'bg-[#0f0a1f]/95 border-gold/10' : 'bg-white border-purple-600/20'
                                }`}
                        >
                            <button onClick={() => setIsModalOpen(false)} className={`absolute top-4 right-4 p-3 rounded-full transition-all z-20 ${isDarkMode ? 'bg-white/10 text-white hover:bg-gold hover:text-black' : 'bg-purple-600/10 text-[#4B0082] hover:bg-[#4B0082] hover:text-white'}`}>
                                <X size={20} />
                            </button>
                            <div className="flex flex-col h-full">
                                <div className="p-6 md:p-12 text-center border-b border-purple-600/5">
                                    <div className="hidden sm:block space-y-4">
                                        <h3 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>{formData.firstName} {formData.lastName}</h3>
                                        <div className={`flex justify-center gap-6 text-xs font-bold ${isDarkMode ? 'text-white/60' : 'text-[#4B0082]/60'}`}>
                                            <span>{formData.dob.split('-').reverse().join('/')}</span>
                                            <span>{formData.tob}</span>
                                            <span>{formData.city.split(',')[0]}</span>
                                        </div>
                                    </div>
                                    <div className="block sm:hidden pt-4">
                                        <p className={`text-[9px] font-black uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                            {formData.firstName} {formData.lastName} • {formData.dob.split('-').reverse().join('/')} • {formData.tob} • {formData.city.split(',')[0]}
                                        </p>
                                    </div>
                                </div>
                                <div className={`flex-1 flex flex-col items-center justify-center p-6 md:p-12 ${isDarkMode ? 'bg-[#05010d]/50' : 'bg-purple-600/5'}`}>
                                    <div
                                        ref={chartRef}
                                        className={`w-full max-w-[500px] aspect-square p-6 md:p-10 bg-white border border-purple-600/10 shadow-lg rounded-[2rem] flex items-center justify-center`}
                                        dangerouslySetInnerHTML={{ __html: chartSvg }}
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleDownload}
                                        disabled={downloading}
                                        className={`mt-8 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl disabled:opacity-50 ${isDarkMode
                                                ? 'bg-gold text-black hover:bg-white'
                                                : 'bg-[#4B0082] text-white hover:bg-purple-700'
                                            }`}
                                    >
                                        {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                        {downloading ? 'Processing...' : 'Download'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                :global(svg) { width: 100% !important; height: 100% !important; overflow: visible !important; }
                :global(svg path), :global(svg line), :global(svg polygon), :global(svg rect), :global(svg circle) { stroke-width: 1.5px !important; stroke: #4B0082 !important; }
                :global(svg text) { fill: #4B0082 !important; font-family: 'Mulish', sans-serif !important; font-weight: 800 !important; font-size: 16px !important; }
                @media (max-width: 480px) { :global(svg text) { font-size: 20px !important; } }
                input::-webkit-calendar-picker-indicator { 
                    filter: ${isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)'}; 
                    cursor: pointer; 
                    opacity: 1 !important; 
                }
            `}</style>
        </section>
    );
};

export default Kundali;
