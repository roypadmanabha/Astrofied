import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getPlanetaryPositions, getKundali } from 'vedic-astro';
import { DateTime } from 'luxon';
import { X, Search, Wind, Sun, Moon, MapPin, Calendar, Clock, User, Mail, Phone } from 'lucide-react';

const PLANET_COLORS = {
    As: '#FFFFFF',
    Su: '#FFD700',
    Mo: '#C0C0C0',
    Ma: '#FF4500',
    Me: '#32CD32',
    Ju: '#FFD700',
    Ve: '#FF69B4',
    Sa: '#4B0082',
    Ra: '#708090',
    Ke: '#2F4F4F',
    Ur: '#00CED1',
    Ne: '#1E90FF',
    Pl: '#800080'
};

const ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const NorthIndianChart = ({ kundliData, isDarkMode }) => {
    if (!kundliData) return null;

    const size = 400;
    const mid = size / 2;

    // Houses in North Indian Chart are fixed diamonds/triangles.
    // Index 0 in this array corresponds to House 1 (Top Center Diamond), and so on.
    const housePaths = [
        // House 1: Top Center Diamond
        `M ${mid} ${mid} L ${mid/2} ${mid/2} L ${mid} 0 L ${mid*1.5} ${mid/2} Z`,
        // House 2: Top Left Triangle
        `M 0 0 L ${mid} 0 L ${mid/2} ${mid/2} Z`,
        // House 3: Left Top Triangle
        `M 0 0 L ${mid/2} ${mid/2} L 0 ${mid} Z`,
        // House 4: Center Left Diamond
        `M ${mid} ${mid} L 0 ${mid} L ${mid/2} ${mid/2} L 0 ${mid} Z`, // Placeholder, fixed below
    ];

    // House paths for North Indian Chart (400x400)
    const houses = [
        { id: 1, p: `M ${mid} 0 L ${mid/2} ${mid/2} L ${mid} ${mid} L ${mid*1.5} ${mid/2} Z`, tx: mid, ty: mid*0.65 },
        { id: 2, p: `M 0 0 L ${mid} 0 L ${mid/2} ${mid/2} Z`, tx: mid*0.45, ty: mid*0.25 },
        { id: 3, p: `M 0 0 L ${mid/2} ${mid/2} L 0 ${mid} Z`, tx: mid*0.2, ty: mid*0.45 },
        { id: 4, p: `M 0 ${mid} L ${mid/2} ${mid/2} L ${mid} ${mid} L ${mid/2} ${mid*1.5} Z`, tx: mid*0.35, ty: mid },
        { id: 5, p: `M 0 ${size} L 0 ${mid} L ${mid/2} ${mid*1.5} Z`, tx: mid*0.2, ty: mid*1.55 },
        { id: 6, p: `M 0 ${size} L ${mid/2} ${mid*1.5} L ${mid} ${size} Z`, tx: mid*0.45, ty: mid*1.75 },
        { id: 7, p: `M ${mid} ${size} L ${mid/2} ${mid*1.5} L ${mid} ${mid} L ${mid*1.5} ${mid*1.5} Z`, tx: mid, ty: mid*1.35 },
        { id: 8, p: `M ${size} ${size} L ${mid} ${size} L ${mid*1.5} ${mid*1.5} Z`, tx: mid*1.55, ty: mid*1.75 },
        { id: 9, p: `M ${size} ${size} L ${mid*1.5} ${mid*1.5} L ${size} ${mid} Z`, tx: mid*1.8, ty: mid*1.55 },
        { id: 10, p: `M ${size} ${mid} L ${mid*1.5} ${mid*1.5} L ${mid} ${mid} L ${mid*1.5} ${mid/2} Z`, tx: mid*1.65, ty: mid },
        { id: 11, p: `M ${size} 0 L ${size} ${mid} L ${mid*1.5} ${mid/2} Z`, tx: mid*1.8, ty: mid*0.45 },
        { id: 12, p: `M ${size} 0 L ${mid*1.5} ${mid/2} L ${mid} 0 Z`, tx: mid*1.55, ty: mid*0.25 },
    ];

    const strokeColor = isDarkMode ? 'rgba(212, 175, 55, 0.4)' : 'rgba(75, 0, 130, 0.4)';
    const textColor = isDarkMode ? '#FFFFFF' : '#000000';
    const signColor = '#FF0000'; // Red house numbers as per tradition/screenshot

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="max-w-[500px] mx-auto drop-shadow-2xl">
            {/* Outline */}
            <rect x="0" y="0" width={size} height={size} fill="none" stroke={strokeColor} strokeWidth="2" />
            
            {/* Houses */}
            {houses.map((h, i) => {
                const data = kundliData[i]; // Data for House i+1
                return (
                    <g key={h.id}>
                        <path d={h.p} fill="none" stroke={strokeColor} strokeWidth="1.5" />
                        
                        {/* Sign Number */}
                        <text x={h.tx} y={h.ty + 15} textAnchor="middle" fontSize="16" fontWeight="bold" fill={signColor}>
                            {data.sign}
                        </text>

                        {/* Planets */}
                        {data.planets.map((p, pIdx) => (
                            <text 
                                key={p.name} 
                                x={h.tx} 
                                y={h.ty - 15 - (pIdx * 18)} 
                                textAnchor="middle" 
                                fontSize="12" 
                                fontWeight="bold" 
                                fill={PLANET_COLORS[p.name] || textColor}
                            >
                                {p.name} {Math.floor(p.degree)}°
                            </text>
                        ))}
                    </g>
                );
            })}

            {/* Diagonals for better aesthetics */}
            <line x1="0" y1="0" x2={size} y2={size} stroke={strokeColor} strokeWidth="1" />
            <line x1={size} y1="0" x2="0" y2={size} stroke={strokeColor} strokeWidth="1" />
        </svg>
    );
};

export default function KundliCalculator() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        dob: '',
        tob: '00:00',
        gender: '',
        pob: ''
    });
    const [location, setLocation] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const pobRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pobRef.current && !pobRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSuggestions = async (query) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
            const data = await res.json();
            setSuggestions(data.features || []);
            setShowSuggestions(true);
        } catch (err) {
            console.error("Location search failed:", err);
        }
    };

    const handleSelectLocation = (feature) => {
        const [lon, lat] = feature.geometry.coordinates;
        const name = [
            feature.properties.name,
            feature.properties.city,
            feature.properties.state,
            feature.properties.country
        ].filter(Boolean).join(", ");
        
        setFormData({ ...formData, pob: name });
        setLocation({ lat, lon, name });
        setShowSuggestions(false);
    };

    const calculateKundli = async (e) => {
        e.preventDefault();
        if (!location) {
            alert("Please select a birth place from the suggestions.");
            return;
        }
        setLoading(true);

        try {
            // ISO Date: YYYY-MM-DDTHH:mm:ss
            const isoString = `${formData.dob}T${formData.tob}:00`;
            const loc = { latitude: location.lat, longitude: location.lon };
            
            // Get positions
            const positions = await getPlanetaryPositions({ iso: isoString }, loc);
            const kundli = getKundali(positions);

            // Format data for our SVG
            const formattedData = kundli.houses.map(h => ({
                sign: h.sign,
                planets: h.planets.map(p => ({
                    name: p,
                    degree: positions.planets[p]?.longitude % 30 || 0
                }))
            }));

            // Special handling for Rahu/Ketu/Ascendant if not in planets list
            // vedic-astro getKundali houses have 'planets' as an array of strings like ["Su", "Ma"]
            // The positions object has planets: { Su: { longitude, ... }, ... }
            
            setChartData(formattedData);
            setShowModal(true);
        } catch (err) {
            console.error("Calculation failed:", err);
            alert("Failed to calculate Kundli. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    const glassStyle = isDarkMode ? 'glass border-gold/30' : 'glass border-[#4B0082]/20';

    return (
        <section className="py-24 relative overflow-hidden" id="kundli">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`max-w-xl mx-auto p-8 md:p-12 rounded-3xl ${glassStyle} shadow-2xl relative z-10`}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold font-raleway mb-4" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                            Kundli Calculator
                        </h2>
                        <p className="text-sm md:text-base opacity-70">
                            Get clear insights into your life, career, and future with your personalized Kundli.
                        </p>
                    </div>

                    <form onSubmit={calculateKundli} className="space-y-6">
                        <div className="relative group">
                            <span className="absolute left-3 top-3 text-gold/60"><User size={20} /></span>
                            <input 
                                required
                                type="text"
                                placeholder="Enter your full name" 
                                className={`w-full bg-transparent border-b-2 py-3 pl-12 outline-none transition-all ${isDarkMode ? 'border-gold/30 focus:border-gold' : 'border-[#4B0082]/20 focus:border-[#4B0082]'}`}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gold/60"><Phone size={20} /></span>
                                <input 
                                    required
                                    type="tel"
                                    placeholder="Phone number" 
                                    className={`w-full bg-transparent border-b-2 py-3 pl-12 outline-none transition-all ${isDarkMode ? 'border-gold/30 focus:border-gold' : 'border-[#4B0082]/20 focus:border-[#4B0082]'}`}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gold/60"><Mail size={20} /></span>
                                <input 
                                    required
                                    type="email"
                                    placeholder="Email address" 
                                    className={`w-full bg-transparent border-b-2 py-3 pl-12 outline-none transition-all ${isDarkMode ? 'border-gold/30 focus:border-gold' : 'border-[#4B0082]/20 focus:border-[#4B0082]'}`}
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gold/60"><Calendar size={20} /></span>
                                <input 
                                    required
                                    type="date"
                                    className={`w-full bg-transparent border-b-2 py-3 pl-12 outline-none transition-all ${isDarkMode ? 'border-gold/30 focus:border-gold' : 'border-[#4B0082]/20 focus:border-[#4B0082]'}`}
                                    value={formData.dob}
                                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gold/60"><Clock size={20} /></span>
                                <input 
                                    required
                                    type="time"
                                    className={`w-full bg-transparent border-b-2 py-3 pl-12 outline-none transition-all ${isDarkMode ? 'border-gold/30 focus:border-gold' : 'border-[#4B0082]/20 focus:border-[#4B0082]'}`}
                                    value={formData.tob}
                                    onChange={(e) => setFormData({...formData, tob: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="relative" ref={pobRef}>
                            <span className="absolute left-3 top-3 text-gold/60"><MapPin size={20} /></span>
                            <input 
                                required
                                type="text"
                                placeholder="Enter your birth place" 
                                className={`w-full bg-transparent border-b-2 py-3 pl-12 outline-none transition-all ${isDarkMode ? 'border-gold/30 focus:border-gold' : 'border-[#4B0082]/20 focus:border-[#4B0082]'}`}
                                value={formData.pob}
                                onChange={(e) => {
                                    setFormData({...formData, pob: e.target.value});
                                    fetchSuggestions(e.target.value);
                                }}
                                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            />
                            <AnimatePresence>
                                {showSuggestions && suggestions.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`absolute left-0 right-0 top-full mt-2 rounded-xl border z-50 backdrop-blur-xl shadow-2xl max-h-60 overflow-y-auto ${isDarkMode ? 'bg-[#0A0A0A]/90 border-gold/30' : 'bg-white/90 border-[#4B0082]/20'}`}
                                    >
                                        {suggestions.map((s, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => handleSelectLocation(s)}
                                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gold/10 transition-colors border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}
                                            >
                                                <div className="font-bold">{s.properties.name}</div>
                                                <div className="text-xs opacity-60">
                                                    {[s.properties.city, s.properties.state, s.properties.country].filter(Boolean).join(", ")}
                                                </div>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative">
                            <select 
                                required
                                className={`w-full bg-transparent border-b-2 py-3 px-4 outline-none transition-all appearance-none ${isDarkMode ? 'border-gold/30 focus:border-gold text-white' : 'border-[#4B0082]/20 focus:border-[#4B0082] text-black'}`}
                                value={formData.gender}
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                            >
                                <option value="" disabled className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'}>--Select Gender--</option>
                                <option value="male" className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'}>Male</option>
                                <option value="female" className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'}>Female</option>
                                <option value="other" className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'}>Other</option>
                            </select>
                            <div className="pointer-events-none absolute right-3 top-4 text-gold/60">▼</div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            type="submit"
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${isDarkMode 
                                ? 'bg-gold text-black hover:bg-white' 
                                : 'bg-[#4B0082] text-white hover:bg-black'}`}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><span>Submit Birth Details</span> <Sun size={20} /></>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Chart Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                            className={`relative w-full max-w-2xl p-6 md:p-10 rounded-3xl ${isDarkMode ? 'bg-[#0A0A0A] border border-gold/30' : 'bg-white border border-[#4B0082]/20'} shadow-2xl`}
                        >
                            <button 
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-gold"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold font-raleway underline underline-offset-8 decoration-gold/30">
                                    KUNDLI CHART
                                </h3>
                                <p className="mt-4 text-sm opacity-60">North Indian Style - {formData.name}</p>
                            </div>

                            <div className="w-full aspect-square max-w-[450px] mx-auto">
                                <NorthIndianChart kundliData={chartData} isDarkMode={isDarkMode} />
                            </div>

                            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                                    <div className="text-[10px] uppercase opacity-60">Sun Sign</div>
                                    <div className="font-bold text-gold">{ZODIAC_SIGNS[chartData?.find(h => h.planets.some(p => p.name === 'Su'))?.sign - 1] || '---'}</div>
                                </div>
                                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                                    <div className="text-[10px] uppercase opacity-60">Ascendant</div>
                                    <div className="font-bold text-gold">{ZODIAC_SIGNS[chartData?.[0]?.sign - 1] || '---'}</div>
                                </div>
                                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                                    <div className="text-[10px] uppercase opacity-60">Moon Sign</div>
                                    <div className="font-bold text-gold">{ZODIAC_SIGNS[chartData?.find(h => h.planets.some(p => p.name === 'Mo'))?.sign - 1] || '---'}</div>
                                </div>
                                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                                    <div className="text-[10px] uppercase opacity-60">DOB</div>
                                    <div className="font-bold text-gold">{formData.dob}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
