import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Star, MapPin, Clock, Calendar, ChevronRight, Info, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD 
    ? 'https://astrofied-production.up.railway.app' 
    : 'http://localhost:5001';

const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const planetIcons = {
    "Ascendant": "ASC",
    "Sun": "☉",
    "Moon": "☽",
    "Mars": "♂",
    "Mercury": "☿",
    "Jupiter": "♃",
    "Venus": "♀",
    "Saturn": "♄",
    "Rahu": "☊",
    "Ketu": "☋",
    "Uranus": "♅",
    "Neptune": "♆",
    "Pluto": "♇"
};

export default function Highlights() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        lat: '',
        lon: '',
        tzo: '+05:30'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [d9Data, setD9Data] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchD9Info = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const [year, month, date] = formData.date.split('-').map(Number);
            const [hours, minutes] = formData.time.split(':').map(Number);
            const latitude = parseFloat(formData.lat);
            const longitude = parseFloat(formData.lon);
            const timezone = parseFloat(formData.tzo);

            const response = await axios.post(`${API_BASE_URL}/api/navamsa`, {
                year, month, date, hours, minutes, latitude, longitude, timezone
            });

            if (response.data.statusCode === 200) {
                setD9Data(Object.values(response.data.output));
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="highlights" className={`py-24 relative overflow-hidden ${isDarkMode ? '' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mulish">
                        Astro <span className="text-gold">Highlights</span>
                    </h2>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto">
                        Explore your Navamsa (D9) chart details. The D9 chart reveals the planetary strength and true potential of your astrological path.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/3"
                    >
                        <div className={`p-8 rounded-[2rem] border glass backdrop-blur-xl shadow-2xl h-full ${
                            isDarkMode ? 'bg-black/40 border-gold/20' : 'bg-white/40 border-[#4B0082]/10'
                        }`}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gold/10' : 'bg-[#4B0082]/10'}`}>
                                    <Sparkles className={isDarkMode ? 'text-gold' : 'text-[#4B0082]'} size={24} />
                                </div>
                                <h3 className="text-2xl font-bold">Navamsa Details</h3>
                            </div>

                            <form onSubmit={fetchD9Info} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2 opacity-70">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border focus:outline-none transition-all ${
                                                isDarkMode 
                                                    ? 'bg-white/5 border-white/10 focus:border-gold/50' 
                                                    : 'bg-black/5 border-black/10 focus:border-[#4B0082]/50'
                                            }`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 opacity-70">Time of Birth</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                                        <input
                                            type="time"
                                            name="time"
                                            required
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border focus:outline-none transition-all ${
                                                isDarkMode 
                                                    ? 'bg-white/5 border-white/10 focus:border-gold/50' 
                                                    : 'bg-black/5 border-black/10 focus:border-[#4B0082]/50'
                                            }`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 opacity-70">Latitude</label>
                                        <input
                                            type="number"
                                            step="any"
                                            name="lat"
                                            placeholder="e.g. 17.38"
                                            required
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none transition-all ${
                                                isDarkMode 
                                                    ? 'bg-white/5 border-white/10 focus:border-gold/50' 
                                                    : 'bg-black/5 border-black/10 focus:border-[#4B0082]/50'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 opacity-70">Longitude</label>
                                        <input
                                            type="number"
                                            step="any"
                                            name="lon"
                                            placeholder="e.g. 78.46"
                                            required
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none transition-all ${
                                                isDarkMode 
                                                    ? 'bg-white/5 border-white/10 focus:border-gold/50' 
                                                    : 'bg-black/5 border-black/10 focus:border-[#4B0082]/50'
                                            }`}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 mt-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
                                        isDarkMode 
                                            ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20' 
                                            : 'bg-[#4B0082] text-white hover:bg-[#3A0066] shadow-[#4B0082]/30'
                                    } disabled:opacity-50`}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Get Navamsa Info'}
                                </button>
                            </form>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-start gap-3 text-sm"
                                >
                                    <AlertCircle className="shrink-0" size={18} />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Results Display */}
                    <div className="w-full lg:w-2/3">
                        <AnimatePresence mode="wait">
                            {!d9Data ? (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={`h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-[2rem] border glass border-dashed ${
                                        isDarkMode ? 'border-white/10' : 'border-black/10'
                                    }`}
                                >
                                    <div className="w-20 h-20 mb-6 relative">
                                        <Star className={`animate-pulse absolute inset-0 ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`} size={80} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Ready to Discover</h4>
                                    <p className="text-center opacity-60">Enter your birth details to reveal your D9 Navamsa chart highlights.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                                >
                                    {d9Data.map((planet, idx) => (
                                        <motion.div
                                            key={planet.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className={`p-6 rounded-3xl border glass overflow-hidden relative group hover:scale-[1.02] transition-all shadow-xl ${
                                                isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white/40 border-black/5'
                                            }`}
                                        >
                                            {/* Planet Icon background */}
                                            <div className="absolute -right-2 -bottom-2 text-7xl opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform">
                                                {planetIcons[planet.name] || '✦'}
                                            </div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                                                        isDarkMode ? 'bg-gold/10 text-gold' : 'bg-[#4B0082]/10 text-[#4B0082]'
                                                    }`}>
                                                        {planetIcons[planet.name] || 'P'}
                                                    </div>
                                                    <h5 className="text-lg font-bold">{planet.name}</h5>
                                                </div>
                                                {planet.isRetro === "true" && (
                                                    <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase bg-orange-500/20 text-orange-500 border border-orange-500/20">
                                                        Retro
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-3 relative z-10">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="opacity-50">Zodiac Sign</span>
                                                    <span className="font-bold">{zodiacSigns[planet.current_sign - 1]}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="opacity-50">House Number</span>
                                                    <span className={`flex items-center justify-center w-7 h-7 rounded-lg font-bold ${
                                                        isDarkMode ? 'bg-white/5' : 'bg-black/5'
                                                    }`}>
                                                        {planet.house_number}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bottom bar indicator */}
                                            <div className={`mt-4 h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(planet.house_number / 12) * 100}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                                    className={`h-full rounded-full ${isDarkMode ? 'bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'bg-[#4B0082]'}`}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Decorative background spheres */}
            <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] opacity-[0.05] -z-10 rounded-full ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`} />
        </section>
    );
}
