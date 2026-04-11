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
        <section id="kundali" className="py-24 relative overflow-hidden bg-transparent min-h-[90vh] flex items-center">
            {/* Background Effects */}
            <div className={`absolute inset-0 -z-10 transition-all duration-700 ${isDarkMode ? 'bg-[#05010d]' : 'bg-gold/5'}`}>
                {isDarkMode && (
                    <>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full" />
                    </>
                )}
            </div>
            
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Side: Descriptive Text */}
                        <div className="text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border mb-6 md:mb-8 glass shadow-xl transition-all ${
                                    isDarkMode ? 'border-gold/30 text-gold bg-gold/10' : 'border-indigo-600/20 text-indigo-700 bg-indigo-600/5'
                                }`}
                            >
                                <Sparkles size={16} className="animate-pulse" />
                                <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase font-mulish">Free Kundali Generator</span>
                            </motion.div>
                            <h2 className={`text-4xl md:text-7xl lg:text-8xl font-black font-raleway mb-6 md:mb-8 tracking-tighter leading-tight lg:leading-[0.9] ${isDarkMode ? 'text-white' : 'text-indigo-950'}`}>
                                Your Celestial <span className="text-gold italic">Map</span>
                            </h2>
                            <p className={`text-base md:text-xl font-mulish font-medium leading-relaxed mb-8 ${isDarkMode ? 'text-gray-400' : 'text-indigo-900/70'}`}>
                                Reveal the planetary alignments at the moment of your birth. Professional grade D1 Lagna charts rendered with precision and cosmic wisdom.
                            </p>
                            <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start opacity-50 font-black text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
                                <span className="flex items-center gap-2"><Sparkles size={10} /> D1 Lagna</span>
                                <span className="flex items-center gap-2"><Sparkles size={10} /> Lahiri Ayanamsa</span>
                                <span className="flex items-center gap-2"><Sparkles size={10} /> North Indian</span>
                            </div>
                        </div>

                        {/* Right Side: The Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className={`p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border shadow-2xl backdrop-blur-3xl transition-all duration-700 ${
                                isDarkMode 
                                ? 'border-white/10 bg-[#0f0a1f]/80 shadow-gold/5' 
                                : 'border-indigo-600/10 bg-white/60 shadow-indigo-600/10'
                            }`}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                                <div className="space-y-3 md:space-y-4">
                                    <label className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                        <User size={12} /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        className={`w-full border-b-2 bg-transparent px-0 py-3 md:py-5 text-lg md:text-2xl font-bold focus:outline-none transition-all ${
                                            isDarkMode 
                                            ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700' 
                                            : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600 placeholder:text-indigo-200'
                                        }`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6 md:gap-12">
                                    <div className="space-y-3 md:space-y-4">
                                        <label className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                            <Calendar size={12} /> Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            className={`w-full border-b-2 bg-transparent px-0 py-3 md:py-5 text-base md:text-xl font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${
                                                isDarkMode 
                                                ? 'border-white/10 text-white focus:border-gold' 
                                                : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600'
                                            }`}
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        <label className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                            <Clock size={12} /> Time
                                        </label>
                                        <input
                                            type="time"
                                            required
                                            className={`w-full border-b-2 bg-transparent px-0 py-3 md:py-5 text-base md:text-xl font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${
                                                isDarkMode 
                                                ? 'border-white/10 text-white focus:border-gold' 
                                                : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600'
                                            }`}
                                            value={formData.tob}
                                            onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 md:space-y-4 relative">
                                    <label className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                        <MapPin size={12} /> Birth Location
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Search city..."
                                        className={`w-full border-b-2 bg-transparent px-0 py-3 md:py-5 text-base md:text-xl font-bold focus:outline-none transition-all ${
                                            isDarkMode 
                                            ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700' 
                                            : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600 placeholder:text-indigo-200'
                                        }`}
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                    <AnimatePresence>
                                        {suggestions.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className={`absolute z-50 w-full mt-2 border rounded-2xl overflow-hidden shadow-2xl backdrop-blur-3xl ${
                                                    isDarkMode ? 'bg-[#1a1233]/95 border-white/10' : 'bg-white/95 border-indigo-600/10'
                                                }`}
                                            >
                                                {suggestions.map((city, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        className={`w-full text-left px-6 py-4 text-xs font-semibold transition-all border-b last:border-0 ${
                                                            isDarkMode 
                                                            ? 'text-gray-300 hover:bg-gold/20 hover:text-gold border-white/5' 
                                                            : 'text-indigo-950 hover:bg-indigo-600/10 hover:text-indigo-600 border-indigo-600/5'
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

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className={`w-full py-5 md:py-7 font-black rounded-2xl md:rounded-3xl tracking-[0.3em] md:tracking-[0.4em] uppercase flex items-center justify-center gap-4 transition-all disabled:opacity-50 text-sm md:text-lg ${
                                        isDarkMode 
                                        ? 'bg-gradient-to-r from-gold via-yellow-300 to-gold text-black shadow-gold/20' 
                                        : 'bg-gradient-to-r from-indigo-700 to-indigo-900 text-white shadow-indigo-900/20'
                                    }`}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                        <>
                                            <Sparkles size={20} /> Generate Kundali
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Premium Aesthetic Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-12 overflow-hidden"
                    >
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#05010d]/95 backdrop-blur-2xl"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className={`relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[2rem] md:rounded-[4rem] border shadow-2xl p-6 md:p-16 transition-all duration-700 flex flex-col items-center ${
                                isDarkMode ? 'bg-[#0f0a1f]/90 border-gold/20' : 'bg-white/95 border-indigo-600/30'
                            }`}
                        >
                            {/* Close Button UI */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={`absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full transition-all group z-[110] ${
                                    isDarkMode ? 'bg-white/10 text-white hover:bg-gold hover:text-black' : 'bg-indigo-600/10 text-indigo-950 hover:bg-indigo-600 hover:text-white'
                                }`}
                            >
                                <X size={20} className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Main Content Area */}
                            <div className="w-full flex flex-col items-center gap-6 md:gap-10">
                                {/* 1. Horoscope Chart - ABSOLUTE PRIORITY ON ALL SCREENS */}
                                <div className="w-full max-w-[550px] relative group px-2 md:px-0">
                                    <div className={`absolute -inset-4 md:-inset-10 blur-[60px] md:blur-[80px] rounded-full opacity-20 transition-opacity duration-700 group-hover:opacity-30 ${isDarkMode ? 'bg-gold' : 'bg-indigo-600'}`} />
                                    <div 
                                        ref={chartRef}
                                        className={`relative w-full aspect-square p-4 md:p-12 rounded-[1.5rem] md:rounded-[4rem] border transition-all duration-1000 overflow-hidden flex items-center justify-center bg-white shadow-2xl border-indigo-600/10`}
                                        dangerouslySetInnerHTML={{ __html: chartSvg }}
                                    />
                                </div>

                                {/* 2. Tiny One-Line Celestial Profile */}
                                <div className="w-full text-center space-y-2 md:space-y-4">
                                    <h3 className={`text-xl md:text-3xl font-black font-raleway tracking-tight ${isDarkMode ? 'text-white' : 'text-indigo-950'}`}>
                                        {formData.name}
                                    </h3>
                                    
                                    <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] md:text-xs font-bold font-mulish uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-indigo-950/40'}`}>
                                        <span className="flex items-center gap-1.5"><Calendar size={10} className="text-gold" /> {formData.dob.split('-').reverse().join('/')}</span>
                                        <span className="w-1 h-1 rounded-full bg-gold/30" />
                                        <span className="flex items-center gap-1.5"><Clock size={10} className="text-gold" /> {formData.tob}</span>
                                        <span className="w-1 h-1 rounded-full bg-gold/30" />
                                        <span className="flex items-center gap-1.5"><MapPin size={10} className="text-gold" /> {formData.city.split(',')[0]}</span>
                                    </div>
                                </div>

                                {/* 3. Optimized Action Button */}
                                <div className="w-full flex justify-center pb-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={downloadPDF}
                                        className={`px-8 md:px-12 py-3 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 font-black tracking-[0.15em] uppercase text-[10px] md:text-xs transition-all shadow-xl ${
                                            isDarkMode 
                                            ? 'bg-gold text-black hover:shadow-gold/30' 
                                            : 'bg-indigo-950 text-white hover:bg-black'
                                        }`}
                                    >
                                        <Download size={14} className="md:w-4 md:h-4" /> Export PDF Report
                                    </motion.button>
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
                
                :global(svg path), 
                :global(svg line), 
                :global(svg polygon), 
                :global(svg rect), 
                :global(svg circle) {
                    stroke-width: 2px !important;
                    stroke: #4B0082 !important; 
                }
                
                :global(svg text) {
                    fill: #4B0082 !important;
                    font-family: 'Raleway', sans-serif !important;
                    font-weight: 800 !important;
                    font-size: 16px !important;
                    letter-spacing: -0.5px;
                }
                
                @media (max-width: 768px) {
                    :global(svg text) {
                        font-size: 20px !important;
                    }
                }
                
                .overflow-y-auto::-webkit-scrollbar {
                    width: 4px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? '#D4AF37' : '#4B0082'};
                    border-radius: 20px;
                }

                input::-webkit-calendar-picker-indicator {
                    filter: ${isDarkMode ? 'invert(1) sepia(1)' : 'invert(0)'};
                    cursor: pointer;
                }
            `}</style>
        </section>
    );
};

export default Kundali;
