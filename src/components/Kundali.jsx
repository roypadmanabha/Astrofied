import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Sparkles, MapPin, Calendar, Clock, User, Loader2, X } from 'lucide-react';
import logo from '../assets/logo.png';
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

    // Brand Colors
    const brandGold = "#D4AF37";
    const brandPurple = "#4B0082";
    const darkBlue = "#0A1931";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.lat || !formData.lon) {
            setError("Please select a city from the suggestions.");
            return;
        }

        setLoading(true);
        setError(null);

        // Future date check
        const selectedDate = new Date(formData.dob);
        const today = new Date();
        if (selectedDate > today) {
            setError("Astrology charts are for past/present dates only. Please select a past date.");
            setLoading(false);
            return;
        }

        try {
            const isLocal = window.location.hostname === 'localhost';
            const API_URL = isLocal
                ? 'http://localhost:5001/api/kundali'
                : 'https://astrofied-production.up.railway.app/api/kundali';

            const res = await axios.post(API_URL, formData);
            setChartSvg(res.data);
            setIsModalOpen(true);
        } catch (err) {
            console.error('API Error:', err);
            const serverError = err.response?.data?.error || 'Failed to fetch your data. Please try after sometime!';
            setError(serverError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="kundali" className={`py-12 md:py-24 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#05010d]/80' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left Side: Heading */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${isDarkMode ? 'border-gold/30 text-gold bg-gold/5' : 'border-purple-600/20 text-[#4B0082] bg-purple-600/5'
                                }`}
                        >
                            <Sparkles size={14} />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Vedic Astrology</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-4xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight ${isDarkMode ? 'text-white' : 'text-[#4B0082]'
                                }`}
                        >
                            Astrofied Free <br />
                            <span className="text-gold italic">Kundali</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-[#4B0082]/70'
                                }`}
                        >
                            Generate your precise East Indian style D1 Lagna chart based on your birth coordinates.
                        </motion.p>
                    </div>

                    {/* Right Side: Compact Form Container */}
                    <div className="w-full lg:w-2/5 max-w-md mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-6 md:p-10 rounded-[2.5rem] border shadow-2xl backdrop-blur-3xl transition-all duration-500 aspect-[3/4] flex flex-col justify-center relative ${isDarkMode
                                ? 'border-gold bg-[#0f0a1f]/80'
                                : 'border-[#D4AF37]/20 bg-[#F5F5DC]'
                                }`}
                        >
                            <img
                                src={logo}
                                alt="Astrofied"
                                className="absolute top-2 right-2 md:top-4 md:right-4 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain select-none pointer-events-none"
                                style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                            />
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                <div className="space-y-2">
                                    <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                        <User size={12} className={isDarkMode ? 'text-gold' : 'text-[#0A1931]'} /> Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        className={`w-full border-b bg-transparent px-0 py-2 text-base md:text-lg font-bold focus:outline-none transition-all ${isDarkMode
                                            ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700'
                                            : 'border-[#0A1931]/10 text-black focus:border-[#0A1931] placeholder:text-gray-400'
                                            }`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            <Calendar size={12} className={isDarkMode ? 'text-gold' : 'text-[#0A1931]'} /> Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-2 text-sm md:text-base font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931]'
                                                }`}
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                            <Clock size={12} className={isDarkMode ? 'text-gold' : 'text-[#0A1931]'} /> Time
                                        </label>
                                        <input
                                            type="time"
                                            required
                                            className={`w-full border-b bg-transparent px-0 py-2 text-sm md:text-base font-bold focus:outline-none transition-all [color-scheme:${isDarkMode ? 'dark' : 'light'}] ${isDarkMode
                                                ? 'border-white/10 text-white focus:border-gold'
                                                : 'border-[#0A1931]/10 text-black focus:border-[#0A1931]'
                                                }`}
                                            value={formData.tob}
                                            onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 relative">
                                    <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${isDarkMode ? 'text-gold' : 'text-[#0A1931]'}`}>
                                        <MapPin size={12} className={isDarkMode ? 'text-gold' : 'text-[#0A1931]'} /> Location
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Search city..."
                                        className={`w-full border-b bg-transparent px-0 py-2 text-sm md:text-base font-bold focus:outline-none transition-all ${isDarkMode
                                            ? 'border-white/10 text-white focus:border-gold placeholder:text-gray-700'
                                            : 'border-[#0A1931]/10 text-black focus:border-[#0A1931] placeholder:text-gray-400'
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
                                    disabled={loading}
                                    className={`w-full py-4 font-black rounded-2xl tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-xs ${isDarkMode ? 'bg-gold text-black' : 'bg-[#4B0082] text-white shadow-xl'
                                        }`}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                        <><Sparkles size={16} /> Generate</>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

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
                                        <h3 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>{formData.name || 'Your Kundali'}</h3>
                                        <div className={`flex justify-center gap-6 text-xs font-bold ${isDarkMode ? 'text-white/60' : 'text-[#4B0082]/60'}`}>
                                            <span>{formData.dob.split('-').reverse().join('/')}</span>
                                            <span>{formData.tob}</span>
                                            <span>{formData.city.split(',')[0]}</span>
                                        </div>
                                    </div>
                                    <div className="block sm:hidden pt-4">
                                        <p className={`text-[9px] font-black uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                            {formData.name} • {formData.dob.split('-').reverse().join('/')} • {formData.tob} • {formData.city.split(',')[0]}
                                        </p>
                                    </div>
                                </div>
                                <div className={`flex-1 flex items-center justify-center p-6 md:p-12 ${isDarkMode ? 'bg-[#05010d]/50' : 'bg-purple-600/5'}`}>
                                    <div className={`w-full max-w-[500px] aspect-square p-6 md:p-10 bg-white border border-purple-600/10 shadow-lg rounded-[2rem] flex items-center justify-center`} dangerouslySetInnerHTML={{ __html: chartSvg }} />
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
