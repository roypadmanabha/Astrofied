import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Sparkles, MapPin, Calendar, Clock, User, Download, Loader2, X, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTheme } from '../context/ThemeContext';

const Kundali = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        tob: '',
        city: '',
        lat: '',
        lon: '',
        tzo: '+05:30'
    });
    
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chartSvg, setChartSvg] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const chartRef = useRef(null);

    // Brand Colors
    const brandPurple = "#4B0082";
    const brandGold = "#D4AF37";

    // City Search (Nominatim)
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (formData.city.length > 2) {
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                        params: {
                            q: formData.city,
                            format: 'json',
                            addressdetails: 1,
                            limit: 5
                        }
                    });
                    setSuggestions(res.data);
                } catch (err) {
                    console.error('City search error:', err);
                }
            } else {
                setSuggestions([]);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.city]);

    const handleCitySelect = (city) => {
        setFormData({
            ...formData,
            city: city.display_name,
            lat: city.lat,
            lon: city.lon
        });
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.lat || !formData.lon) {
            setError("Please select a city from the dropdown suggestions.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post('http://localhost:5005/api/kundali', formData);
            setChartSvg(res.data);
            setIsModalOpen(true);
        } catch (err) {
            const serverError = err.response?.data?.details?.errors?.[0]?.detail || 
                              err.response?.data?.details?.message || 
                              err.response?.data?.error || 
                              'Failed to generate Kundali. Please check your details.';
            setError(serverError);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async () => {
        if (!chartRef.current) return;
        
        const canvas = await html2canvas(chartRef.current, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.save(`${formData.name || 'Kundali'}_Astrofied.pdf`);
    };

    return (
        <section id="kundali" className={`py-24 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#05010d]' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Left Side: Heading & Description (Laptop/Desktop) */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border shadow-sm ${
                                isDarkMode ? 'border-gold/30 text-gold bg-gold/5' : 'border-purple-600/20 text-[#4B0082] bg-purple-600/5'
                            }`}
                        >
                            <Sparkles size={18} />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase font-mulish">Vedic Astrology</span>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`text-5xl md:text-7xl lg:text-8xl font-black font-raleway leading-[1.1] tracking-tight ${
                                isDarkMode ? 'text-white' : 'text-[#4B0082]'
                            }`}
                        >
                            Astrofied Free <br />
                            <span className="text-gold italic">Kundali</span>
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className={`text-lg md:text-xl font-mulish leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                                isDarkMode ? 'text-gray-400' : 'text-[#4B0082]/70'
                            }`}
                        >
                            Get your comprehensive North Indian style D1 Lagna chart based on your exact birth coordinates and time.
                        </motion.p>
                    </div>

                    {/* Right Side: Form Container */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-10 md:p-12 rounded-[3rem] border shadow-2xl backdrop-blur-3xl transition-all duration-500 ${
                                isDarkMode 
                                ? 'border-white/10 bg-[#0f0a1f]/80 shadow-gold/5' 
                                : 'border-purple-600/10 bg-white/40 shadow-purple-600/10'
                            }`}
                        >
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-4">
                                    <label className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 font-mulish ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                        <User size={14} /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        className={`w-full border-b bg-transparent px-0 py-4 text-xl font-bold font-mulish focus:outline-none transition-all ${
                                            isDarkMode 
                                            ? 'border-white/10 text-white focus:border-gold' 
                                            : 'border-[#4B0082]/10 text-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 font-mulish ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                            <Calendar size={14} /> Birth Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-4 text-lg font-bold font-mulish focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${
                                                isDarkMode 
                                                ? 'border-white/10 text-white focus:border-gold' 
                                                : 'border-[#4B0082]/10 text-[#4B0082] focus:border-[#4B0082]'
                                            }`}
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 font-mulish ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                            <Clock size={14} /> Birth Time
                                        </label>
                                        <input
                                            type="time"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-4 text-lg font-bold font-mulish focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${
                                                isDarkMode 
                                                ? 'border-white/10 text-white focus:border-gold' 
                                                : 'border-[#4B0082]/10 text-[#4B0082] focus:border-[#4B0082]'
                                            }`}
                                            value={formData.tob}
                                            onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 relative">
                                    <label className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 font-mulish ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                        <MapPin size={14} /> Birth Location
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Search city..."
                                        className={`w-full border-b bg-transparent px-0 py-4 text-lg font-bold font-mulish focus:outline-none transition-all ${
                                            isDarkMode 
                                            ? 'border-white/10 text-white focus:border-gold' 
                                            : 'border-[#4B0082]/10 text-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                        value={formData.city}
                                        onChange={(e) => {
                                            setFormData({ ...formData, city: e.target.value });
                                            if (error) setError(null);
                                        }}
                                    />
                                    <AnimatePresence>
                                        {suggestions.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className={`absolute z-50 w-full mt-4 border rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl ${
                                                    isDarkMode ? 'bg-[#1a1233]/95 border-white/10' : 'bg-white/95 border-purple-600/10'
                                                }`}
                                            >
                                                {suggestions.map((city, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        className={`w-full text-left px-6 py-4 text-sm font-semibold font-mulish transition-all border-b last:border-0 ${
                                                            isDarkMode 
                                                            ? 'text-gray-300 hover:bg-gold/10 hover:text-gold border-white/5' 
                                                            : 'text-[#4B0082] hover:bg-purple-600/10 hover:text-[#4B0082] border-purple-600/5'
                                                        }`}
                                                        onClick={() => handleCitySelect(city)}
                                                    >
                                                        {city.display_name}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }} 
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-5 rounded-2xl border border-red-500/30 bg-red-500/5 flex items-center gap-4 text-red-500 font-bold text-sm font-mulish"
                                    >
                                        <X size={20} className="shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className={`w-full py-6 font-black rounded-3xl tracking-[0.3em] uppercase flex items-center justify-center gap-4 transition-all disabled:opacity-50 text-base font-mulish ${
                                        isDarkMode 
                                        ? 'bg-gradient-to-r from-gold to-yellow-300 text-black shadow-gold/20' 
                                        : 'bg-gradient-to-r from-[#4B0082] to-[#6a0dad] text-white shadow-purple-900/20'
                                    }`}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={24} /> : (
                                        <>
                                            <Sparkles size={24} /> Generate Kundali
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Premium Modal for Chart */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
                    >
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setIsModalOpen(false)}
                            className={`absolute inset-0 backdrop-blur-3xl ${isDarkMode ? 'bg-black/95' : 'bg-white/95'}`}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 100, opacity: 0 }}
                            className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto lg:overflow-hidden rounded-[3rem] border shadow-2xl transition-all duration-700 ${
                                isDarkMode ? 'bg-[#0f0a1f]/95 border-gold/20' : 'bg-white border-purple-600/30 shadow-purple-600/20'
                            }`}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={`absolute top-6 right-6 p-4 rounded-full transition-all z-20 ${
                                    isDarkMode ? 'bg-white/10 text-white hover:bg-gold hover:text-black' : 'bg-purple-600/10 text-[#4B0082] hover:bg-[#4B0082] hover:text-white'
                                }`}
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Details Side */}
                                <div className="w-full lg:w-2/5 p-10 lg:p-16 space-y-12 flex flex-col justify-center">
                                    <div className="space-y-6">
                                        <div className={`text-[10px] font-black uppercase tracking-[0.5em] mb-4 font-mulish ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                            Birth Details
                                        </div>
                                        <h3 className={`text-5xl md:text-6xl font-black font-raleway tracking-tighter capitalize ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>
                                            {formData.name || 'Your Chart'}
                                        </h3>
                                        
                                        <div className={`grid grid-cols-1 gap-6 pt-6 font-mulish text-base font-bold ${isDarkMode ? 'text-white/80' : 'text-[#4B0082]/80'}`}>
                                            <div className="flex items-center gap-5">
                                                <Calendar size={22} className="text-gold" />
                                                <span>{formData.dob.split('-').reverse().join(' / ')}</span>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <Clock size={22} className="text-gold" />
                                                <span>{formData.tob}</span>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <MapPin size={22} className="text-gold" />
                                                <span>{formData.city.split(',')[0]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Download Button (Hidden on Mobile as requested) */}
                                    <div className="hidden sm:block pt-10">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={downloadPDF}
                                            className={`w-full py-5 rounded-3xl flex items-center justify-center gap-4 font-black tracking-[0.3em] font-mulish uppercase text-xs transition-all ${
                                                isDarkMode 
                                                ? 'bg-gold text-black shadow-gold/20' 
                                                : 'bg-[#4B0082] text-white shadow-[#4B0082]/20'
                                            }`}
                                        >
                                            <Download size={18} /> Export PDF
                                        </motion.button>
                                    </div>
                                </div>

                                {/* SVG SIDE (Laptop/Desktop) OR Top (Mobile) */}
                                <div className={`w-full lg:w-3/5 flex items-center justify-center p-8 transition-colors ${isDarkMode ? 'bg-[#05010d]/50' : 'bg-purple-600/5'}`}>
                                    <div 
                                        ref={chartRef}
                                        className={`w-full max-w-[500px] aspect-square p-6 sm:p-12 rounded-[2rem] bg-white border border-purple-600/10 shadow-xl flex items-center justify-center`}
                                        dangerouslySetInnerHTML={{ __html: chartSvg }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <style jsx>{`
                :global(svg) {
                    width: 100% !important;
                    height: 100% !important;
                    overflow: visible !important;
                }
                
                /* Chart Styling: Always high-contrast for readability */
                :global(svg path), 
                :global(svg line), 
                :global(svg polygon), 
                :global(svg rect), 
                :global(svg circle) {
                    stroke-width: 1.8px !important;
                    stroke: #4B0082 !important;
                }
                
                :global(svg text) {
                    fill: #4B0082 !important;
                    font-family: 'Raleway', sans-serif !important;
                    font-weight: 800 !important;
                    font-size: 18px !important; /* Smaller on mobile automatically due to width scale */
                }

                @media (max-width: 640px) {
                    :global(svg text) {
                        font-size: 22px !important; /* Larger text on mobile for readabilty since svg is smaller */
                    }
                }
                
                input::-webkit-calendar-picker-indicator {
                    filter: ${isDarkMode ? 'invert(1)' : 'invert(0)'};
                    cursor: pointer;
                    opacity: 0.3;
                }

                .font-raleway { font-family: 'Raleway', sans-serif; }
                .font-mulish { font-family: 'Mulish', sans-serif; }
            `}</style>
        </section>
    );
};

export default Kundali;
