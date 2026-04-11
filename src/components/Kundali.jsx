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
            if (formData.city.length > 1) {
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
            // Dynamic URL to support local network testing on mobile
            const backendUrl = window.location.hostname === 'localhost' 
                ? 'http://localhost:5005' 
                : `http://${window.location.hostname}:5005`;

            const res = await axios.post(`${backendUrl}/api/kundali`, formData);
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
        <section id="kundali" className="py-12 md:py-24 relative overflow-hidden bg-transparent min-h-screen flex items-center">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        {/* Left Side: Descriptive Text */}
                        <div className="text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6 glass shadow-xl transition-all ${
                                    isDarkMode ? 'border-gold/30 text-gold bg-gold/10' : 'border-indigo-600/20 text-indigo-700 bg-indigo-600/5'
                                }`}
                            >
                                <Sparkles size={16} className="animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase font-mulish">Professional Kundali Generator</span>
                            </motion.div>
                            <h2 className={`text-4xl md:text-6xl lg:text-8xl font-black font-raleway mb-6 tracking-tighter leading-[1.1] lg:leading-[0.9] ${isDarkMode ? 'text-white' : 'text-indigo-950'}`}>
                                Your Celestial <span className="text-gold italic">Map</span>
                            </h2>
                            <p className={`text-base md:text-xl font-mulish font-medium leading-relaxed mb-8 ${isDarkMode ? 'text-gray-400' : 'text-indigo-900/70'}`}>
                                Reveal the planetary alignments at the moment of your birth. Professional grade D1 Lagna charts rendered with precision and cosmic wisdom.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start opacity-50 font-black text-[9px] tracking-[0.2em] uppercase">
                                <span className="flex items-center gap-1"><Sparkles size={10} /> D1 Lagna</span>
                                <span className="flex items-center gap-1"><Sparkles size={10} /> Lahiri Ayanamsa</span>
                                <span className="flex items-center gap-1"><Sparkles size={10} /> North Indian Style</span>
                            </div>
                        </div>

                        {/* Right Side: The Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className={`p-6 md:p-10 lg:p-14 rounded-[2.5rem] md:rounded-[4rem] border shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-3xl transition-all duration-700 ${
                                isDarkMode 
                                ? 'border-white/10 bg-[#0f0a1f]/80 shadow-gold/5' 
                                : 'border-indigo-600/10 bg-white/60 shadow-indigo-600/10'
                            }`}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                                <div className="space-y-2">
                                    <label className={`text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                        <User size={12} /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        className={`w-full border-b bg-transparent px-0 py-3 md:py-5 text-lg md:text-2xl font-bold focus:outline-none transition-all ${
                                            isDarkMode 
                                            ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700' 
                                            : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600 placeholder:text-gray-400'
                                        }`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                                    <div className="space-y-2">
                                        <label className={`text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                            <Calendar size={12} /> Birth Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-3 md:py-5 text-base md:text-xl font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${
                                                isDarkMode 
                                                ? 'border-white/10 text-white focus:border-gold' 
                                                : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600'
                                            }`}
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                            <Clock size={12} /> Birth Time
                                        </label>
                                        <input
                                            type="time"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-3 md:py-5 text-base md:text-xl font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${
                                                isDarkMode 
                                                ? 'border-white/10 text-white focus:border-gold' 
                                                : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600'
                                            }`}
                                            value={formData.tob}
                                            onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 relative">
                                    <label className={`text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>
                                        <MapPin size={12} /> Birth Location
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Search city..."
                                        className={`w-full border-b bg-transparent px-0 py-3 md:py-5 text-base md:text-xl font-bold focus:outline-none transition-all ${
                                            isDarkMode 
                                            ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700' 
                                            : 'border-indigo-950/10 text-indigo-950 focus:border-indigo-600 placeholder:text-gray-400'
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
                                                        className={`w-full text-left px-5 py-4 text-xs font-semibold transition-all border-b last:border-0 ${
                                                            isDarkMode 
                                                            ? 'text-gray-300 hover:bg-gold/20 hover:text-gold border-white/5' 
                                                            : 'text-purple-950 hover:bg-indigo-600/10 hover:text-indigo-600 border-indigo-600/5'
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
                                        className="bg-red-500/10 p-4 rounded-xl border border-red-500/30 flex items-center gap-3 text-red-500 font-bold text-[11px]"
                                    >
                                        <X size={16} className="shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className={`w-full py-5 md:py-7 font-black rounded-2xl md:rounded-3xl tracking-[0.3em] uppercase flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-sm md:text-lg ${
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
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
                    >
                        {/* High-quality Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#05010d]/95 backdrop-blur-2xl"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.92, y: 60, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.92, y: 60, opacity: 0 }}
                            className={`relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[2rem] md:rounded-[4rem] border shadow-[0_50px_150px_rgba(0,0,0,0.5)] p-6 md:p-16 transition-all duration-700 ${
                                isDarkMode ? 'bg-[#0f0a1f]/95 border-gold/20' : 'bg-white/95 border-indigo-600/30'
                            }`}
                        >
                            {/* Close Button UI */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={`absolute top-4 right-4 md:top-10 md:right-10 p-2 md:p-4 rounded-full transition-all group z-[110] ${
                                    isDarkMode ? 'bg-white/10 text-white hover:bg-gold hover:text-black' : 'bg-indigo-600/10 text-indigo-950 hover:bg-indigo-600 hover:text-white'
                                }`}
                            >
                                <X size={20} className="md:hidden" />
                                <X size={28} className="hidden md:block group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
                                {/* Left Side: Beautiful Specs (Hidden on Mobile) */}
                                <div className="hidden lg:block w-full lg:w-2/5 space-y-10 text-left">
                                    <div className="space-y-6">
                                        <div className={`text-xs font-black uppercase tracking-[0.5em] mb-4 ${isDarkMode ? 'text-gold' : 'text-indigo-600'}`}>Astrological Identity</div>
                                        <h3 className={`text-5xl md:text-6xl font-black font-raleway tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-indigo-950'}`}>
                                            {formData.name}
                                        </h3>
                                        
                                        <div className={`grid grid-cols-1 gap-6 pt-6 font-mulish text-base font-bold ${isDarkMode ? 'text-white/80' : 'text-indigo-950/80'}`}>
                                            <div className="flex items-center gap-5 justify-start group">
                                                <div className="p-3 rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform"><Calendar size={22} /></div>
                                                <span className="tracking-tight">{formData.dob.split('-').reverse().join(' / ')}</span>
                                            </div>
                                            <div className="flex items-center gap-5 justify-start group">
                                                <div className="p-3 rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform"><Clock size={22} /></div>
                                                <span className="tracking-tight">{formData.tob}</span>
                                            </div>
                                            <div className="flex items-center gap-5 justify-start group">
                                                <div className="p-3 rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform"><MapPin size={22} /></div>
                                                <span className="tracking-tight">{formData.city.split(',')[0]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 flex flex-col gap-5 items-stretch">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={downloadPDF}
                                            className={`w-full py-6 rounded-3xl flex items-center justify-center gap-4 font-black tracking-[0.3em] uppercase text-sm transition-all shadow-xl ${
                                                isDarkMode 
                                                ? 'bg-gold text-black hover:bg-yellow-300 shadow-gold/20' 
                                                : 'bg-indigo-950 text-white hover:bg-black shadow-indigo-950/20'
                                            }`}
                                        >
                                            <Download size={20} /> Download Chart PDF
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Right Side: The Chart Rendering (The Hero on Mobile) */}
                                <div className="w-full lg:w-3/5 relative group flex flex-col items-center">
                                    <h3 className="lg:hidden text-2xl font-black font-raleway mb-6 text-center tracking-tighter">
                                        <span className={isDarkMode ? 'text-white' : 'text-indigo-950'}>{formData.name}'s</span> <span className="text-gold">Kundali</span>
                                    </h3>
                                    
                                    <div className={`absolute -inset-4 md:-inset-10 blur-[40px] md:blur-[80px] rounded-full opacity-20 transition-opacity duration-700 group-hover:opacity-30 ${isDarkMode ? 'bg-gold' : 'bg-indigo-600'}`} />
                                    <div 
                                        ref={chartRef}
                                        className={`relative w-full aspect-square p-2 md:p-12 rounded-[1.5rem] md:rounded-[4rem] border transition-all duration-1000 overflow-hidden flex items-center justify-center bg-white shadow-[0_0_80px_rgba(0,0,0,0.1)] border-indigo-600/10`}
                                        dangerouslySetInnerHTML={{ __html: chartSvg }}
                                    />
                                    
                                    {/* Mobile Only: Tiny Info Text */}
                                    <div className="lg:hidden mt-6 text-center space-y-4 w-full px-4">
                                        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 ${isDarkMode ? 'text-white' : 'text-indigo-950'}`}>
                                            {formData.dob.split('-').reverse().join('/')} • {formData.tob} • {formData.city.split(',')[0]}
                                        </p>
                                        
                                        <button
                                            onClick={downloadPDF}
                                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-black tracking-widest uppercase text-xs transition-all ${
                                                isDarkMode 
                                                ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                                                : 'bg-indigo-950 text-white shadow-lg shadow-indigo-950/20'
                                            }`}
                                        >
                                            <Download size={14} /> Download PDF
                                        </button>
                                    </div>

                                    <div className="hidden lg:flex items-center justify-center gap-3 opacity-30 text-[10px] font-black uppercase tracking-[0.5em] mt-8">
                                        <FileText size={12} /> Encrypted Digital Replica
                                    </div>
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
                
                /* Fixed high-contrast styling for the chart (dark lines on light bg) */
                :global(svg path), 
                :global(svg line), 
                :global(svg polygon), 
                :global(svg rect), 
                :global(svg circle) {
                    stroke-width: 2px !important;
                    transition: all 0.5s ease;
                    stroke: #4B0082 !important; /* Indigo #4B0082 for best visibility */
                }
                
                :global(svg text) {
                    fill: #4B0082 !important;
                    font-family: 'Raleway', sans-serif !important;
                    font-weight: 800 !important;
                    font-size: 20px !important;
                    letter-spacing: -0.5px;
                }
                
                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? '#D4AF37' : '#4B0082'};
                    border-radius: 20px;
                }

                input::-webkit-calendar-picker-indicator {
                    filter: ${isDarkMode ? 'invert(1) sepia(1) saturate(5) hue-rotate(350deg)' : 'invert(0)'};
                    cursor: pointer;
                    transform: scale(1.5);
                }
            `}</style>
        </section>
    );
};

export default Kundali;
